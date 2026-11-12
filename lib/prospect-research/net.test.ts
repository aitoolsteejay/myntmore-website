import { describe, expect, it } from "vitest";
import type { Answer } from "@/lib/research-types";
import { checkAnswer, checkSource, isPrivateAddress, mentionsCompany, safeFetch, type CheckTally, type NetDeps } from "./net";

// A fake web: each URL maps to a response. Hosts listed in `dead` do not resolve.
interface FakePage { status: number; body?: string; location?: string; type?: string }
function fakeNet(pages: Record<string, FakePage>, opts: { dead?: string[]; privateHosts?: string[] } = {}): NetDeps & { calls: string[] } {
  const calls: string[] = [];
  return {
    calls,
    lookup: async (host) => {
      if (opts.dead?.includes(host)) throw Object.assign(new Error("ENOTFOUND"), { code: "ENOTFOUND" });
      return [opts.privateHosts?.includes(host) ? "10.0.0.5" : "93.184.216.34"];
    },
    fetch: (async (input: RequestInfo | URL) => {
      const url = String(input);
      calls.push(url);
      const p = pages[url];
      if (!p) return new Response("not found", { status: 404 });
      const headers = new Headers({ "content-type": p.type ?? "text/html; charset=utf-8" });
      if (p.location) headers.set("location", p.location);
      return new Response(p.status >= 300 && p.status < 400 ? null : p.body ?? "", { status: p.status, headers });
    }) as typeof fetch,
  };
}

const ACME = { name: "Acme Robotics Pvt Ltd", domain: "acmerobotics.com" };
const REDIRECT = "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AbC123";
const freshTally = (): CheckTally => ({ checked: 0, downgraded: 0, removed: 0, unchecked: 0 });
const yes = (extra: Partial<Answer> = {}): Answer => ({ verdict: "yes", text: "Raised a Series A.", date: "6 Aug 2026", ...extra });

describe("isPrivateAddress", () => {
  it("blocks loopback, private and link-local addresses", () => {
    for (const ip of ["127.0.0.1", "10.1.2.3", "172.16.0.1", "192.168.1.1", "169.254.169.254", "0.0.0.0", "::1", "fd00::1", "fe80::1", "::ffff:127.0.0.1"]) {
      expect(isPrivateAddress(ip), ip).toBe(true);
    }
  });
  it("allows public addresses", () => {
    expect(isPrivateAddress("93.184.216.34")).toBe(false);
    expect(isPrivateAddress("2606:4700::6810:85e5")).toBe(false);
  });
});

describe("safeFetch", () => {
  it("follows redirects hop by hop and reports the final address", async () => {
    const net = fakeNet({ [REDIRECT]: { status: 302, location: "https://news.example.com/acme" }, "https://news.example.com/acme": { status: 200, body: "<p>hi</p>" } });
    const r = await safeFetch(REDIRECT, net);
    expect(r.kind).toBe("ok");
    expect(r.finalUrl).toBe("https://news.example.com/acme");
  });
  it("refuses a redirect to a private address", async () => {
    const net = fakeNet({ "https://a.example.com/": { status: 302, location: "http://internal.example.com/admin" } }, { privateHosts: ["internal.example.com"] });
    expect((await safeFetch("https://a.example.com/", net)).kind).toBe("blocked");
  });
  it("refuses non-web schemes", async () => {
    expect((await safeFetch("file:///etc/passwd", fakeNet({}))).kind).toBe("blocked");
  });
});

describe("mentionsCompany", () => {
  it("matches the name without its legal suffix, or the domain", () => {
    expect(mentionsCompany("Acme Robotics raises $20M to expand in Europe", ACME.name, ACME.domain)).toBe(true);
    expect(mentionsCompany("Visit acmerobotics.com for more", ACME.name, ACME.domain)).toBe(true);
    expect(mentionsCompany("Globex raises $20M", ACME.name, ACME.domain)).toBe(false);
  });
});

describe("checkSource", () => {
  it("resolves a grounding redirect link to its real address", async () => {
    const net = fakeNet({ [REDIRECT]: { status: 302, location: "https://techcrunch.com/acme" }, "https://techcrunch.com/acme": { status: 200, body: "<h1>Acme Robotics raises</h1>" } });
    expect(await checkSource(REDIRECT, ACME, net)).toEqual({ status: "verified", url: "https://techcrunch.com/acme" });
  });
  it("marks a 404 as dead", async () => {
    expect((await checkSource("https://news.example.com/gone", ACME, fakeNet({}))).status).toBe("dead");
  });
  it("marks a domain that does not resolve as dead", async () => {
    const net = fakeNet({}, { dead: ["nowhere.example"] });
    expect((await checkSource("https://nowhere.example/x", ACME, net)).status).toBe("dead");
  });
  it("keeps a 403 as unchecked", async () => {
    const net = fakeNet({ "https://www.sec.gov/x": { status: 403 } });
    expect(await checkSource("https://www.sec.gov/x", ACME, net)).toEqual({ status: "unchecked", url: "https://www.sec.gov/x" });
  });
  it("treats an expired grounding redirect as dead, since there is no real address to show", async () => {
    const net = fakeNet({ [REDIRECT]: { status: 403 } });
    expect((await checkSource(REDIRECT, ACME, net)).status).toBe("dead");
  });
  it("flags a page that loads but does not name the company", async () => {
    const net = fakeNet({ "https://blog.example.com/x": { status: 200, body: "<p>Globex news</p>" } });
    expect((await checkSource("https://blog.example.com/x", ACME, net)).status).toBe("no_mention");
  });
  it("counts the company's own site as naming the company", async () => {
    const net = fakeNet({ "https://acmerobotics.com/careers": { status: 200, body: "<p>Join us</p>" } });
    expect((await checkSource("https://acmerobotics.com/careers", ACME, net)).status).toBe("verified");
  });
  it("keeps a PDF it cannot read as unchecked", async () => {
    const net = fakeNet({ "https://ir.example.com/a.pdf": { status: 200, body: "%PDF", type: "application/pdf" } });
    expect((await checkSource("https://ir.example.com/a.pdf", ACME, net)).status).toBe("unchecked");
  });
});

describe("checkAnswer", () => {
  it("removes a dead link and lowers yes to likely", async () => {
    const tally = freshTally();
    const out = await checkAnswer(yes(), ["https://news.example.com/gone"], ACME, fakeNet({}), tally);
    expect(out.verdict).toBe("likely");
    expect(out.source).toBeUndefined();
    expect(out.sourceStatus).toBe("removed");
    expect(tally).toMatchObject({ checked: 1, removed: 1, downgraded: 1 });
  });
  it("lowers likely to no when the only link does not resolve", async () => {
    const out = await checkAnswer(yes({ verdict: "likely" }), ["https://nowhere.example/x"], ACME, fakeNet({}, { dead: ["nowhere.example"] }), freshTally());
    expect(out).toEqual({ verdict: "no", text: "No evidence found." });
  });
  it("keeps a 403 link without lowering the verdict", async () => {
    const tally = freshTally();
    const out = await checkAnswer(yes(), ["https://www.businesswire.com/x"], ACME, fakeNet({ "https://www.businesswire.com/x": { status: 403 } }), tally);
    expect(out).toMatchObject({ verdict: "yes", source: "https://www.businesswire.com/x", sourceStatus: "unchecked" });
    expect(tally).toMatchObject({ downgraded: 0, unchecked: 1 });
  });
  it("falls back to the next candidate when the first is dead", async () => {
    const net = fakeNet({ [REDIRECT]: { status: 302, location: "https://techcrunch.com/acme" }, "https://techcrunch.com/acme": { status: 200, body: "Acme Robotics" } });
    const out = await checkAnswer(yes(), ["https://made-up.example.com/acme", REDIRECT], ACME, net, freshTally());
    expect(out).toMatchObject({ verdict: "yes", source: "https://techcrunch.com/acme", sourceStatus: "verified" });
  });
  it("lowers the verdict one step when the page does not name the company", async () => {
    const net = fakeNet({ "https://blog.example.com/x": { status: 200, body: "Globex" } });
    const out = await checkAnswer(yes(), ["https://blog.example.com/x"], ACME, net, freshTally());
    expect(out).toMatchObject({ verdict: "likely", sourceStatus: "no_mention" });
  });
  it("leaves 'no' answers alone", async () => {
    const net = fakeNet({});
    const out = await checkAnswer({ verdict: "no", text: "No evidence found." }, ["https://x.example.com"], ACME, net, freshTally());
    expect(out.verdict).toBe("no");
    expect(net.calls).toHaveLength(0);
  });
});
