import { describe, expect, it } from "vitest";
import type { Answer } from "@/lib/research-types";
import {
  buildQuestions, candidateSources, cleanProfile, enforceRules, filterCandidates, normaliseDomain, normaliseName, normaliseWebsite,
  rankCandidates, scoreAccount, sourcesForQuestions, validateInputs,
} from "./core";
import { estimateCost } from "./config";

const RUN = new Date(Date.UTC(2026, 10, 12)); // 12 Nov 2026

describe("inputs", () => {
  it("normalises websites and rejects things that are not public web addresses", () => {
    expect(normaliseWebsite("Acme.com")).toBe("https://acme.com");
    expect(normaliseWebsite("https://www.acme.co.uk/about?x=1")).toBe("https://acme.co.uk");
    for (const bad of ["localhost", "http://127.0.0.1", "javascript:alert(1)", "not a site", "https://user:pw@acme.com", "acme.com:8080"]) {
      expect(normaliseWebsite(bad), bad).toBeNull();
    }
  });
  it("validates and trims every field with friendly errors", () => {
    expect(validateInputs({ website: "", offer: "x" })).toEqual({ ok: false, error: "Enter your company website." });
    expect(validateInputs({ website: "acme.com", offer: "short" }).ok).toBe(false);
    expect(validateInputs({ website: "acme.com", offer: "x".repeat(401) }).ok).toBe(false);
    const ok = validateInputs({ website: " acme.com ", offer: "  We sell   robots to warehouses. ", exclusions: "Globex\n\n initech.com , Hooli" });
    expect(ok).toEqual({ ok: true, inputs: { website: "https://acme.com", offer: "We sell robots to warehouses.", audience: "", exclusions: ["Globex", "initech.com", "Hooli"] } });
  });
  it("needs the core profile fields", () => {
    expect(cleanProfile({ companyName: "Acme", offer: "Robots" })).toBeNull();
    expect(cleanProfile({ companyName: "Acme", offer: "Robots", industries: "Logistics", buyerRole: "COO <b>" })?.buyerRole).toBe("COO b");
  });
});

describe("names and domains", () => {
  it("matches the same company written two ways", () => {
    expect(normaliseName("Acme Robotics Pvt. Ltd.")).toBe(normaliseName("acme robotics"));
    expect(normaliseName("The Globex Corporation")).toBe("globex");
    expect(normaliseDomain("https://www.Acme.com/x")).toBe("acme.com");
  });
});

describe("filterCandidates", () => {
  const c = (name: string, domain: string) => ({ name, domain, location: "", signal: "" });
  it("removes the visitor's own company, exclusions and duplicates", () => {
    const out = filterCandidates(
      [
        c("Myntmore", "myntmore.com"), // own company by domain
        c("Myntmore Labs", "labs.myntmore.com"), // own subdomain
        c("Globex Corp", "globex.com"), // excluded by name
        c("Initech", "www.initech.com"), // excluded by domain
        c("Hooli", "hooli.com"),
        c("Hooli Inc.", "hooli.xyz"), // duplicate by name
        c("Pied Piper", "https://hooli.com/pp"), // duplicate by domain
        c("Umbrella", "umbrella.io"),
        c("No Domain", ""),
      ],
      "https://myntmore.com",
      "Myntmore",
      ["Globex", "initech.com"],
    );
    expect(out.map((x) => x.domain)).toEqual(["hooli.com", "umbrella.io"]);
  });
  it("excludes the visitor's company by name even on another domain", () => {
    expect(filterCandidates([c("Myntmore Pvt Ltd", "myntmore.in")], "https://myntmore.com", "Myntmore", [])).toEqual([]);
  });
});

describe("rankCandidates", () => {
  it("puts strong, recent signals first and keeps at most the limit", () => {
    const base = { location: "", signal: "" };
    const out = rankCandidates(
      [
        { ...base, name: "Old", domain: "old.com", signalDate: "Jan 2025", strength: 3 },
        { ...base, name: "Recent weak", domain: "rw.com", signalDate: "1 Nov 2026", strength: 1 },
        { ...base, name: "Recent strong", domain: "rs.com", signalDate: "20 Oct 2026", strength: 3 },
        { ...base, name: "Undated", domain: "u.com", strength: 2 },
      ],
      RUN,
      3,
    );
    expect(out.map((x) => x.name)).toEqual(["Recent strong", "Recent weak", "Old"]);
  });
});

describe("questions", () => {
  it("keeps the seven fixed slots", () => {
    const q = buildQuestions({ companyName: "Acme", offer: "Robots", industries: "Logistics", companySize: "200+ staff", regions: "India", buyerRole: "Head of Operations", investArea: "Warehouse automation", hiringRoles: "Pickers and packers", competitors: "another robotics vendor" });
    expect(q).toHaveLength(7);
    expect(q[0]).toContain("Logistics; 200+ staff; India");
    expect(q[1]).toBe("Raised funding in the last 12 months?");
    expect(q[2]).toBe("Said it will invest in warehouse automation?");
    expect(q[4]).toBe("Appointed a new Head of Operations in the last 12 months?");
    expect(q[6]).toMatch(/\(risk\)$/);
  });
});

describe("enforceRules", () => {
  const src = "https://example.com/a";
  it("turns a yes with no source into no evidence found", () => {
    expect(enforceRules([{ verdict: "yes", text: "Raised money", date: "1 Oct 2026" }], RUN)[0]).toEqual({ verdict: "no", text: "No evidence found." });
  });
  it("drops time-bound signals older than 18 months", () => {
    const a: Answer[] = [{ verdict: "yes", text: "ICP", source: src, date: "Jan 2024" }, { verdict: "yes", text: "Funding", source: src, date: "Jan 2025" }];
    const out = enforceRules(a, RUN);
    expect(out[0].verdict).toBe("yes"); // Q1 (fit) is not time-bound
    expect(out[1]).toEqual({ verdict: "no", text: "No evidence found." });
  });
  it("lowers a time-bound yes with no readable date to likely and records the check date", () => {
    const out = enforceRules([{ verdict: "no", text: "" }, { verdict: "yes", text: "Hiring", source: src, date: "recently" }], RUN);
    expect(out[1]).toMatchObject({ verdict: "likely", date: "Checked 12 Nov 2026" });
  });
  it("rewrites careers-page dates to the run date and removes em dashes and asterisks", () => {
    const out = enforceRules([{ verdict: "yes", text: "Sells to **logistics** firms — mostly in India", source: src, date: "checked today" }], RUN);
    expect(out[0]).toMatchObject({ date: "Checked 12 Nov 2026", text: "Sells to logistics firms, mostly in India" });
  });
  it("ignores dates in the future", () => {
    const out = enforceRules([{ verdict: "no", text: "" }, { verdict: "yes", text: "Funding", source: src, date: "5 Mar 2027" }], RUN);
    expect(out[1].verdict).toBe("likely");
  });
});

describe("scoreAccount", () => {
  it("scores with lib/research-scoring.ts, never from the model", () => {
    const s = "https://example.com";
    const answers: Answer[] = [
      { verdict: "yes", text: "", source: s, date: "Checked 12 Nov 2026" },
      { verdict: "yes", text: "", source: s, date: "1 Oct 2026" },
      { verdict: "yes", text: "", source: s, date: "1 Oct 2026" },
      { verdict: "likely", text: "", source: s, date: "Checked 12 Nov 2026" },
      { verdict: "no", text: "" },
      { verdict: "no", text: "" },
      { verdict: "likely", text: "", source: s, date: "Checked 12 Nov 2026" },
    ];
    const a = scoreAccount({ name: "Acme", where: "acme.com", recent: "Raised — a Series A", pitch: "p", who: "w" }, answers, RUN);
    // 25 + 15 + 20 + 10 (half of 20) - 7 (likely risk)
    expect(a.fit).toBe(63);
    // funding within 90 days 3 + invest 2 + hiring likely 1
    expect(a.timing).toBe(6);
    expect(a.tier).toBe("T2");
    expect(a.when).toBe("6 weeks ago");
    expect(a.recent).toBe("Raised, a Series A");
  });
});

describe("grounding sources", () => {
  it("maps search results to the answer block they support", () => {
    const text = "Q1: yes\nAnswer: Acme sells to logistics firms.\nQ2: yes\nAnswer: Acme raised $20M in Oct 2026.\nRecent: Raised $20M.";
    const chunks = [{ uri: "https://r/0" }, { uri: "https://r/1" }, { uri: "https://r/2" }];
    const supports = [
      { text: "Acme sells to logistics firms.", chunks: [0] },
      { text: "Acme raised $20M in Oct 2026.", chunks: [1, 2] },
      { text: "Raised $20M.", chunks: [0] }, // in the Recent line, not an answer
    ];
    const out = sourcesForQuestions(text, chunks, supports, 2);
    expect(out).toEqual([["https://r/0"], ["https://r/1", "https://r/2"]]);
    expect(candidateSources("https://acme.com/news", out[1])).toEqual(["https://acme.com/news", "https://r/1", "https://r/2"]);
    expect(candidateSources("", out[0])).toEqual(["https://r/0"]);
  });
});

describe("estimateCost", () => {
  it("adds token cost and $14 per 1,000 searches", () => {
    const u = { promptTokens: 1_000_000, outputTokens: 0, thinkingTokens: 0, toolUseTokens: 0, searches: 0 };
    expect(estimateCost("gemini-3.8-flash", u, RUN)).toBe(0.75);
    expect(estimateCost("gemini-3.8-flash", u, new Date(Date.UTC(2027, 0, 2)))).toBe(1.5);
    expect(estimateCost("gemini-3.1-flash-lite", { ...u, promptTokens: 0, searches: 6 }, RUN)).toBe(0.084);
  });
});
