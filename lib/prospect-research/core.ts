// Pure helpers for the Prospect Research tool: input checks, names and domains, candidate filtering,
// the seven questions, and turning researched answers into a scored Account. No network calls here,
// so all of it is unit tested (core.test.ts).
import type { Account, Answer, Verdict } from "@/lib/research-types";
import { ago, daysBetween, fitScore, latestSignalDate, parseSourceDate, tierFor, timingScore } from "@/lib/research-scoring";
import type { Profile, Prospect, ResearchInputs } from "./types";

// ── Inputs ────────────────────────────────────────────────────────────────────────────────────────

export const INPUT_LIMITS = { website: 200, offer: 400, audience: 400, exclusionLine: 120, exclusions: 50, profileField: 200 } as const;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");

/** "acme.com", "https://www.Acme.com/about" -> "https://acme.com". Null when it is not a usable public web address. */
export function normaliseWebsite(raw: string): string | null {
  const t = raw.trim();
  if (!t || /\s/.test(t)) return null;
  let u: URL;
  try {
    u = new URL(/^https?:\/\//i.test(t) ? t : `https://${t}`);
  } catch {
    return null;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  if (u.username || u.password || u.port) return null;
  const host = u.hostname.toLowerCase().replace(/^www\./, "");
  // Needs a dot and a letter-only top-level domain: rules out "localhost" and bare IP addresses.
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(host)) return null;
  return `https://${host}`;
}

export function validateInputs(body: Record<string, unknown>): { ok: true; inputs: ResearchInputs } | { ok: false; error: string } {
  const websiteRaw = str(body.website, INPUT_LIMITS.website);
  if (!websiteRaw) return { ok: false, error: "Enter your company website." };
  const website = normaliseWebsite(websiteRaw);
  if (!website) return { ok: false, error: "That website does not look right. Try something like yourcompany.com." };
  const offer = str(body.offer, INPUT_LIMITS.offer + 1);
  if (offer.length < 10) return { ok: false, error: "Say what you sell in a sentence, at least 10 characters." };
  if (offer.length > INPUT_LIMITS.offer) return { ok: false, error: `Keep what you sell under ${INPUT_LIMITS.offer} characters.` };
  const audience = str(body.audience, INPUT_LIMITS.audience + 1);
  if (audience.length > INPUT_LIMITS.audience) return { ok: false, error: `Keep who you sell to under ${INPUT_LIMITS.audience} characters.` };
  const rawExclusions = typeof body.exclusions === "string" ? body.exclusions.split(/\n|,/) : Array.isArray(body.exclusions) ? body.exclusions : [];
  const exclusions = rawExclusions.map((x) => str(x, INPUT_LIMITS.exclusionLine)).filter(Boolean);
  if (exclusions.length > INPUT_LIMITS.exclusions) return { ok: false, error: `List up to ${INPUT_LIMITS.exclusions} companies to exclude.` };
  return { ok: true, inputs: { website, offer, audience, exclusions } };
}

export const PROFILE_KEYS = ["companyName", "offer", "industries", "companySize", "regions", "buyerRole", "investArea", "hiringRoles", "competitors"] as const;

/** Trims every profile field. Null if a required field is empty. */
export function cleanProfile(raw: unknown): Profile | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const p = Object.fromEntries(PROFILE_KEYS.map((k) => [k, str(r[k], INPUT_LIMITS.profileField)])) as unknown as Profile;
  // Remove characters that could break out of the prompt sections the profile is pasted into.
  for (const k of PROFILE_KEYS) p[k] = p[k].replace(/[`<>{}]/g, "");
  if (!p.companyName || !p.offer || !p.industries || !p.buyerRole) return null;
  return p;
}

// ── Names and domains ─────────────────────────────────────────────────────────────────────────────

const LEGAL_SUFFIXES = /\b(the|inc|incorporated|llc|ltd|limited|pvt|private|corp|corporation|co|company|gmbh|plc|sa|ag|bv|nv|pte|pty|llp|holdings|group)\b/g;

/** "Acme Pvt. Ltd." -> "acme". Used to match the same company written two ways. */
export function normaliseName(name: string): string {
  return name.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9 ]+/g, " ").replace(LEGAL_SUFFIXES, " ").replace(/\s+/g, " ").trim();
}

/** "https://www.acme.com/x" or "Acme.com" -> "acme.com". Null if it is not a domain. */
export function normaliseDomain(raw: string): string | null {
  const w = normaliseWebsite(raw);
  return w ? w.replace(/^https:\/\//, "") : null;
}

/** True if `host` is `domain` or a subdomain of it. */
export function sameSite(host: string, domain: string): boolean {
  return host === domain || host.endsWith(`.${domain}`) || domain.endsWith(`.${host}`);
}

// ── Candidates ────────────────────────────────────────────────────────────────────────────────────

export interface Candidate extends Prospect {
  strength?: number; // 1 (weak) to 3 (strong), from the model
}

/**
 * Removes the visitor's own company, anything on the exclusion list (by name or domain) and
 * duplicates, and normalises each domain. Order is kept; ranking happens later.
 */
export function filterCandidates(candidates: Candidate[], ownWebsite: string, ownName: string, exclusions: string[]): Candidate[] {
  const ownDomain = normaliseDomain(ownWebsite);
  const ownNameKey = normaliseName(ownName);
  const exDomains = exclusions.map((x) => (/\.[a-z]{2,}/i.test(x) ? normaliseDomain(x) : null)).filter((d): d is string => !!d);
  const exNames = new Set(exclusions.map(normaliseName).filter((n) => n.length > 1));
  const seenDomains = new Set<string>();
  const seenNames = new Set<string>();
  const out: Candidate[] = [];
  for (const c of candidates) {
    const domain = normaliseDomain(c.domain || "");
    const nameKey = normaliseName(c.name || "");
    if (!domain || !nameKey) continue;
    if (ownDomain && sameSite(domain, ownDomain)) continue;
    if (ownNameKey && nameKey === ownNameKey) continue;
    if (exDomains.some((d) => sameSite(domain, d))) continue;
    if (exNames.has(nameKey)) continue;
    if (seenDomains.has(domain) || seenNames.has(nameKey)) continue;
    seenDomains.add(domain);
    seenNames.add(nameKey);
    out.push({ ...c, name: c.name.trim(), domain });
  }
  return out;
}

/** Best first: a stronger signal, then a more recent one. Signals with no readable date, or older than 12 months, go last. */
export function rankCandidates(candidates: Candidate[], runDate: Date, limit: number): Candidate[] {
  const recency = (c: Candidate) => {
    const d = parseSourceDate(c.signalDate);
    if (!d) return 0;
    const days = daysBetween(d, runDate);
    if (days < -1 || days > 365) return 0;
    return 1 - days / 365; // 1 = today, 0 = a year ago
  };
  return candidates
    .map((c, i) => ({ c, i, score: recency(c) * 2 + (c.strength ?? 2) + (recency(c) > 0 ? 1 : 0) }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, limit)
    .map((x) => x.c);
}

// ── Questions ─────────────────────────────────────────────────────────────────────────────────────

const lower1 = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/**
 * The seven questions, worded for this offer. The meaning of each slot is fixed, because
 * lib/research-scoring.ts weights them by position (Q1 fit 25, Q2 funding 15, ... Q7 risk).
 */
export function buildQuestions(p: Profile): string[] {
  const icp = [p.industries, p.companySize, p.regions].filter(Boolean).join("; ");
  return [
    `Matches your ideal customer (${icp})?`,
    "Raised funding in the last 12 months?",
    `Said it will invest in ${lower1(p.investArea || "the area your offer serves")}?`,
    `Hiring now for ${lower1(p.hiringRoles || "roles your offer helps with or replaces")}?`,
    `Appointed a new ${p.buyerRole} in the last 12 months?`,
    "Launched a new product, entered a new market or opened a new region in the last 12 months?",
    `Already uses ${lower1(p.competitors || "a direct competitor")}, or does this in-house? (risk)`,
  ];
}

/** Short stable hash of the question texts, for the research cache key. */
export async function questionsHash(questions: string[]): Promise<string> {
  const data = new TextEncoder().encode(questions.join("\n"));
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

// ── Answers and scores ────────────────────────────────────────────────────────────────────────────

export const NO_EVIDENCE = "No evidence found.";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const formatDay = (d: Date) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

export function lowerVerdict(v: Verdict): Verdict {
  return v === "yes" ? "likely" : "no";
}

/** Strips em dashes, asterisks and markdown from model text, as the site's voice rules ask. */
export function plainText(s: string): string {
  return s.replace(/\s*[—–]\s*/g, ", ").replace(/[*_#`]+/g, "").replace(/\s+/g, " ").trim();
}

/**
 * Applies the research rules in code, so they hold even when the model slips:
 * - a "yes" or "likely" with no source becomes "no evidence found";
 * - dates must parse, be no later than the run date, and (for Q2 to Q6, which are about recent events)
 *   be no older than 18 months; a time-bound "yes" with no readable date drops to "likely";
 * - careers pages and similar with no date keep "Checked <run date>".
 */
export function enforceRules(answers: Answer[], runDate: Date): Answer[] {
  return answers.map((a, i) => {
    let { verdict } = a;
    let date = a.date?.trim() || undefined;
    const text = plainText(a.text || "");
    if (verdict !== "no" && !a.source) return { verdict: "no", text: NO_EVIDENCE };
    if (verdict === "no") return { verdict: "no", text: text || NO_EVIDENCE, ...(a.source ? { source: a.source, date, sourceStatus: a.sourceStatus } : {}) };
    const timeBound = i >= 1 && i <= 5;
    if (date && /checked/i.test(date)) {
      date = `Checked ${formatDay(runDate)}`;
    } else if (date) {
      const d = parseSourceDate(date);
      if (!d || daysBetween(d, runDate) < -1) date = undefined;
      else if (timeBound && daysBetween(d, runDate) > 548) return { verdict: "no", text: NO_EVIDENCE };
    }
    if (!date) {
      if (timeBound && verdict === "yes") verdict = "likely";
      date = `Checked ${formatDay(runDate)}`;
    }
    return { verdict, text: text || NO_EVIDENCE, source: a.source, date, ...(a.sourceStatus ? { sourceStatus: a.sourceStatus } : {}) };
  });
}

export function scoreAccount(
  base: { name: string; where: string; recent: string; pitch: string; who: string },
  answers: Answer[],
  runDate: Date,
): Account {
  const fit = fitScore(answers);
  const timing = timingScore(answers, runDate);
  return {
    name: base.name,
    where: base.where,
    recent: plainText(base.recent) || "No dated buying signal found.",
    pitch: plainText(base.pitch),
    who: plainText(base.who),
    answers,
    fit,
    timing,
    tier: tierFor(fit, timing),
    when: ago(latestSignalDate(answers), runDate),
  };
}

// ── Grounding sources ─────────────────────────────────────────────────────────────────────────────

/**
 * Which search results back which answer. The research text is written as blocks "Q1: ...", "Q2: ...";
 * each grounding support names the text it backs and the search results (chunks) behind it, so a support
 * inside the Q3 block gives Q3's candidate sources. Returns one list of unique URLs per question.
 */
export function sourcesForQuestions(
  text: string,
  chunks: { uri: string }[],
  supports: { text: string; chunks: number[] }[],
  count = 7,
): string[][] {
  const starts: number[] = [];
  for (let i = 1; i <= count; i++) {
    const m = new RegExp(`(^|\\n)[ \\t]*\\**Q${i}\\**[ \\t]*[:.]`).exec(text);
    starts.push(m ? m.index : -1);
  }
  const tail = /(^|\n)[ \t]*\**Recent\**[ \t]*:/i.exec(text)?.index ?? text.length;
  const blockOf = (pos: number) => {
    let best = -1;
    starts.forEach((s, i) => {
      if (s >= 0 && s <= pos && pos < tail && (best < 0 || s > starts[best])) best = i;
    });
    return best;
  };
  const out: string[][] = Array.from({ length: count }, () => []);
  for (const s of supports) {
    if (!s.text || s.text.length < 6) continue;
    const pos = text.indexOf(s.text);
    if (pos < 0) continue;
    const q = blockOf(pos);
    if (q < 0) continue;
    for (const c of s.chunks) {
      const uri = chunks[c]?.uri;
      if (uri && !out[q].includes(uri)) out[q].push(uri);
    }
  }
  return out;
}

/** The model's own URL first (it names the exact page), then the search results behind the answer. */
export function candidateSources(modelUrl: string | undefined, grounded: string[]): string[] {
  const list: string[] = [];
  if (modelUrl && /^https?:\/\/\S+\.\S+/.test(modelUrl.trim())) list.push(modelUrl.trim());
  for (const g of grounded) if (!list.includes(g)) list.push(g);
  return list;
}
