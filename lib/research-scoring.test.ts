import { describe, expect, it } from "vitest";
import { ago, fitScore, latestSignalDate, parseSourceDate, tierFor, timingScore } from "./research-scoring";
import type { Answer } from "./research-types";

const a = (verdict: Answer["verdict"], date?: string): Answer => ({ verdict, text: "x", date });
const SNAP = new Date(Date.UTC(2026, 9, 21));

describe("parseSourceDate", () => {
  it("reads the date formats the research uses", () => {
    expect(parseSourceDate("6 Aug 2026")?.toISOString().slice(0, 10)).toBe("2026-08-06");
    expect(parseSourceDate("Sep 2026")?.toISOString().slice(0, 10)).toBe("2026-09-01");
    expect(parseSourceDate("2026-10-14")?.toISOString().slice(0, 10)).toBe("2026-10-14");
    expect(parseSourceDate("sometime")).toBeNull();
  });
});

describe("scoring", () => {
  const all = (v: Answer["verdict"]) => [a(v), a(v, "1 Oct 2026"), a(v), a(v), a(v), a(v), a("no")];

  it("gives 100 fit when every signal is a yes and no risk", () => {
    expect(fitScore(all("yes"))).toBe(100);
  });
  it("gives half credit for likely and takes a risk penalty", () => {
    expect(fitScore(all("likely"))).toBe(50);
    expect(fitScore([...all("yes").slice(0, 6), a("yes")])).toBe(85);
    expect(fitScore([...all("yes").slice(0, 6), a("likely")])).toBe(93);
    expect(fitScore([a("no"), a("no"), a("no"), a("no"), a("no"), a("no"), a("yes")])).toBe(0);
  });
  it("scores timing from recency and live signals, capped at 10", () => {
    expect(timingScore(all("yes"), SNAP)).toBe(10);
    expect(timingScore(all("no"), SNAP)).toBe(0);
    const older = [a("yes"), a("yes", "1 Mar 2026"), a("no"), a("no"), a("no"), a("no"), a("no")];
    expect(timingScore(older, SNAP)).toBe(2);
    const recent = [a("yes"), a("yes", "1 Oct 2026"), a("no"), a("no"), a("no"), a("no"), a("no")];
    expect(timingScore(recent, SNAP)).toBe(3);
  });
  it("assigns tiers from fit and timing", () => {
    expect(tierFor(80, 8)).toBe("T1");
    expect(tierFor(80, 5)).toBe("T2");
    expect(tierFor(55, 2)).toBe("T2");
    expect(tierFor(54, 9)).toBe("T3");
  });
});

describe("ago", () => {
  it("describes how long before the snapshot", () => {
    expect(ago(new Date(Date.UTC(2026, 9, 14)), SNAP)).toBe("7 days ago");
    expect(ago(new Date(Date.UTC(2026, 8, 20)), SNAP)).toBe("4 weeks ago");
    expect(ago(new Date(Date.UTC(2026, 7, 6)), SNAP)).toBe("2 months ago");
    expect(ago(null, SNAP)).toBe("Recently");
  });
});

describe("latestSignalDate", () => {
  it("picks the newest dated answer and ignores checked-on dates and no-evidence answers", () => {
    const answers = [a("yes", "2 Mar 2026"), a("yes", "19 Oct 2026"), a("yes", "Checked 21 Oct 2026"), a("no", "20 Oct 2026")];
    expect(latestSignalDate(answers)?.toISOString().slice(0, 10)).toBe("2026-10-19");
    expect(latestSignalDate([a("no")])).toBeNull();
  });
});

describe("fitScore strict mode", () => {
  const a = (v: "yes" | "likely" | "no") => ({ verdict: v, text: "x" });
  it("caps fit at 40 when the company does not match the ideal customer", () => {
    const answers = [a("no"), a("yes"), a("yes"), a("yes"), a("yes"), a("yes"), a("no")];
    expect(fitScore(answers, { strict: true })).toBe(40);
    expect(fitScore(answers)).toBe(75);
  });
  it("never gives Tier 1 fit on a likely match", () => {
    const answers = [a("likely"), a("yes"), a("yes"), a("yes"), a("yes"), a("yes"), a("no")];
    expect(fitScore(answers, { strict: true })).toBeLessThan(70);
  });
});
