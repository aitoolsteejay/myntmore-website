// Network helpers for the Prospect Research tool: a fetch that refuses private addresses (the server
// fetches URLs that come from visitors and from the model), and the automatic source check.
// DNS and fetch are passed in, so the logic is unit tested without the network (net.test.ts).
import type { Answer, SourceStatus } from "@/lib/research-types";
import { NO_EVIDENCE, lowerVerdict, normaliseName, sameSite } from "./core";

export interface NetDeps {
  /** Resolves a host name to IP addresses. Throws when the domain does not resolve. */
  lookup: (host: string) => Promise<string[]>;
  fetch: typeof fetch;
}

export const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";

const MAX_BYTES = 1_500_000;
const MAX_REDIRECTS = 6;

/** Loopback, private, link-local, carrier-grade NAT, multicast and reserved ranges. */
export function isPrivateAddress(ip: string): boolean {
  const v = ip.toLowerCase();
  if (v.includes(":")) {
    if (v === "::" || v === "::1") return true;
    if (/^f[cd]/.test(v) || /^fe[89ab]/.test(v) || /^ff/.test(v)) return true;
    const mapped = v.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    return mapped ? isPrivateAddress(mapped[1]) : false;
  }
  const p = v.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return true;
  const [a, b] = p;
  return (
    a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) ||
    (a === 100 && b >= 64 && b <= 127) || (a === 198 && (b === 18 || b === 19))
  );
}

export type FetchOutcome =
  | { kind: "ok"; status: number; finalUrl: string; contentType: string; body: string }
  | { kind: "http"; status: number; finalUrl: string } // a non-2xx answer from the server
  | { kind: "dns"; finalUrl: string } // the domain does not resolve
  | { kind: "blocked"; finalUrl: string } // not http(s), or a private address
  | { kind: "error"; finalUrl: string }; // timeout, TLS or connection failure

/** GET with a browser user-agent, following redirects by hand so every hop is checked. */
export async function safeFetch(url: string, deps: NetDeps, timeoutMs = 8000): Promise<FetchOutcome> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let current = url;
  try {
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      let u: URL;
      try {
        u = new URL(current);
      } catch {
        return { kind: "blocked", finalUrl: current };
      }
      if (u.protocol !== "https:" && u.protocol !== "http:") return { kind: "blocked", finalUrl: current };
      let addresses: string[];
      try {
        addresses = await deps.lookup(u.hostname);
      } catch {
        return { kind: "dns", finalUrl: current };
      }
      if (!addresses.length) return { kind: "dns", finalUrl: current };
      if (addresses.some(isPrivateAddress)) return { kind: "blocked", finalUrl: current };

      const res = await deps.fetch(current, {
        redirect: "manual",
        signal: controller.signal,
        headers: { "User-Agent": BROWSER_UA, Accept: "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.5", "Accept-Language": "en" },
      });
      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get("location");
        if (!loc) return { kind: "http", status: res.status, finalUrl: current };
        current = new URL(loc, current).toString();
        continue;
      }
      if (res.status < 200 || res.status >= 300) return { kind: "http", status: res.status, finalUrl: current };
      const contentType = res.headers.get("content-type") || "";
      let body = "";
      if (/text\/html|text\/plain|xml|json/i.test(contentType) || !contentType) {
        const buf = await res.arrayBuffer();
        body = new TextDecoder().decode(buf.byteLength > MAX_BYTES ? buf.slice(0, MAX_BYTES) : buf);
      }
      return { kind: "ok", status: res.status, finalUrl: current, contentType, body };
    }
    return { kind: "error", finalUrl: current };
  } catch {
    return { kind: "error", finalUrl: current };
  } finally {
    clearTimeout(timer);
  }
}

/** Visible-ish text of an HTML page: title, meta description and body text without scripts and styles. */
export function pageText(html: string): string {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  const metas = Array.from(html.matchAll(/<meta[^>]+content=["']([^"']*)["'][^>]*>/gi)).map((m) => m[1]).join(" ");
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  return decodeEntities(`${title} ${metas} ${body}`).replace(/\s+/g, " ").trim();
}

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

/** Does the page name the company? Matches the cleaned company name or its domain. */
export function mentionsCompany(text: string, name: string, domain: string): boolean {
  const hay = ` ${normaliseName(text)} `;
  const key = normaliseName(name);
  if (key.length >= 3 && hay.includes(` ${key} `)) return true;
  if (text.toLowerCase().includes(domain.toLowerCase())) return true;
  // The domain's first label, e.g. "acmepharma" for acmepharma.com, if it is distinctive enough.
  const stem = domain.split(".")[0];
  return stem.length >= 5 && hay.replace(/ /g, "").includes(stem);
}

export type CheckStatus = Exclude<SourceStatus, "removed"> | "dead";
export interface SourceCheck { status: CheckStatus; url: string }

const GROUNDING_REDIRECT = /^https:\/\/vertexaisearch\.cloud\.google\.com\/grounding-api-redirect\//;

/**
 * Checks one source link:
 * - grounding redirect links are followed to their real address, which is what gets saved;
 * - a 404 or 410, or a domain that does not resolve, is "dead" (the link is removed);
 * - 401, 403, 429, 5xx, timeouts and non-HTML files are "unchecked" (kept, not counted against);
 * - a page that loads is "verified" if it names the company (or is on the company's own site),
 *   otherwise "no_mention".
 */
export async function checkSource(url: string, company: { name: string; domain: string }, deps: NetDeps): Promise<SourceCheck> {
  const r = await safeFetch(url, deps);
  // If a grounding redirect could not be followed past Google, there is no real address to show.
  const stuckOnGoogle = GROUNDING_REDIRECT.test(r.finalUrl);
  if (r.kind === "dns" || r.kind === "blocked") return { status: "dead", url: r.finalUrl };
  if (r.kind === "http") {
    if (r.status === 404 || r.status === 410) return { status: "dead", url: r.finalUrl };
    return stuckOnGoogle ? { status: "dead", url: r.finalUrl } : { status: "unchecked", url: r.finalUrl };
  }
  if (r.kind === "error") return stuckOnGoogle ? { status: "dead", url: r.finalUrl } : { status: "unchecked", url: r.finalUrl };
  let host = "";
  try {
    host = new URL(r.finalUrl).hostname.replace(/^www\./, "");
  } catch {
    /* finalUrl always parses here */
  }
  if (host && sameSite(host, company.domain)) return { status: "verified", url: r.finalUrl };
  if (!r.body) return { status: "unchecked", url: r.finalUrl }; // a PDF or other file we do not read
  return { status: mentionsCompany(pageText(r.body), company.name, company.domain) ? "verified" : "no_mention", url: r.finalUrl };
}

export interface CheckTally { checked: number; downgraded: number; removed: number; unchecked: number }

/**
 * Tries the candidate sources for one answer in order and keeps the best: a verified page, then one
 * that could not be read automatically, then one that loads without naming the company.
 * Dead links are removed. A dead or no-mention result lowers the verdict one step.
 */
export async function checkAnswer(
  answer: Answer,
  candidates: string[],
  company: { name: string; domain: string },
  deps: NetDeps,
  tally: CheckTally,
): Promise<Answer> {
  if (answer.verdict === "no" || !candidates.length) return answer;
  const results: SourceCheck[] = [];
  for (const c of candidates.slice(0, 3)) {
    const r = await checkSource(c, company, deps);
    tally.checked++;
    results.push(r);
    if (r.status === "verified") break;
  }
  const best = results.find((r) => r.status === "verified") ?? results.find((r) => r.status === "unchecked") ?? results.find((r) => r.status === "no_mention");
  if (!best) {
    tally.removed++;
    tally.downgraded++;
    const verdict = lowerVerdict(answer.verdict);
    return verdict === "no" ? { verdict, text: NO_EVIDENCE } : { verdict, text: answer.text, date: answer.date, sourceStatus: "removed" };
  }
  if (best.status === "unchecked") tally.unchecked++;
  if (best.status === "no_mention") {
    tally.downgraded++;
    const verdict = lowerVerdict(answer.verdict);
    if (verdict === "no") return { verdict, text: NO_EVIDENCE };
    return { ...answer, verdict, source: best.url, sourceStatus: "no_mention" };
  }
  return { ...answer, source: best.url, sourceStatus: best.status === "verified" ? "verified" : "unchecked" };
}
