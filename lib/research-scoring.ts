import type { Answer, Account } from "@/lib/research-types";

// Rule-based fit, timing and tier for the sample account research on /research/myntmore.
// Everything is computed from the answers, so the numbers can be checked against the evidence:
// no score is typed in by hand.
//
// Questions: 1 sells through a sales team, 2 raised funding in the last 12 months, 3 said it will invest in
// go-to-market, 4 hiring sales roles now, 5 new revenue leader, 6 new product or market,
// 7 strong in-house outbound already (a risk).

const FIT_WEIGHTS = [25, 15, 20, 20, 10, 10] as const; // questions 1 to 6, adds up to 100
const RISK_PENALTY = { yes: 15, likely: 7, no: 0 } as const;

const MONTHS: Record<string, number> = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };

/** Parses "6 Aug 2026", "Aug 2026" or "2026-08-06". Returns null if it cannot tell. */
export function parseSourceDate(text?: string): Date | null {
  if (!text) return null;
  const iso = text.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return new Date(Date.UTC(+iso[1], +iso[2] - 1, +iso[3]));
  const dmy = text.match(/(\d{1,2})\s+([A-Za-z]{3})[a-z]*\.?,?\s+(\d{4})/);
  if (dmy && MONTHS[dmy[2].toLowerCase()] !== undefined) return new Date(Date.UTC(+dmy[3], MONTHS[dmy[2].toLowerCase()], +dmy[1]));
  const my = text.match(/([A-Za-z]{3})[a-z]*\.?\s+(\d{4})/);
  if (my && MONTHS[my[1].toLowerCase()] !== undefined) return new Date(Date.UTC(+my[2], MONTHS[my[1].toLowerCase()], 1));
  return null;
}

/** The most recent dated signal among the answers. Dates that only record the day a page was checked are ignored. */
export function latestSignalDate(answers: Answer[]): Date | null {
  let latest: Date | null = null;
  for (const a of answers) {
    if (a.verdict === "no" || !a.date || /checked/i.test(a.date)) continue;
    const d = parseSourceDate(a.date);
    if (d && (!latest || d > latest)) latest = d;
  }
  return latest;
}

export function daysBetween(from: Date, to: Date) {
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

/** "2 weeks ago", "3 months ago" from a source date and the snapshot date. */
export function ago(from: Date | null, snapshot: Date): string {
  if (!from) return "Recently";
  const d = daysBetween(from, snapshot);
  if (d < 1) return "Today";
  if (d < 14) return `${d} days ago`;
  if (d < 60) return `${Math.round(d / 7)} weeks ago`;
  return `${Math.floor(d / 30)} months ago`;
}

const point = (a: Answer | undefined) => (a?.verdict === "yes" ? 1 : a?.verdict === "likely" ? 0.5 : 0);

// The Prospect Research tool weights "does it match the ideal customer" (question 1) most, because a company
// that raised money but is the wrong kind of buyer is not a lead. A "no" on question 1 caps the fit at 40
// (Tier 3 at best); a "likely" caps it at 69 (never Tier 1).
const STRICT_FIT_WEIGHTS = [40, 10, 15, 15, 10, 10] as const;

export function fitScore(answers: Answer[], opts?: { strict?: boolean }): number {
  const weights = opts?.strict ? STRICT_FIT_WEIGHTS : FIT_WEIGHTS;
  const base = weights.reduce((sum, w, i) => sum + w * point(answers[i]), 0);
  const risk = RISK_PENALTY[answers[6]?.verdict ?? "no"];
  let fit = Math.max(0, Math.round(base - risk));
  if (opts?.strict) {
    if (answers[0]?.verdict !== "yes" && answers[0]?.verdict !== "likely") fit = Math.min(fit, 40);
    else if (answers[0]?.verdict === "likely") fit = Math.min(fit, 69);
  }
  return fit;
}

export function timingScore(answers: Answer[], snapshot: Date): number {
  let t = 0;
  const funding = answers[1];
  if (funding?.verdict === "yes") {
    const d = parseSourceDate(funding.date);
    t += d && daysBetween(d, snapshot) <= 90 ? 3 : 2;
  } else if (funding?.verdict === "likely") t += 1;
  if (answers[2]?.verdict === "yes") t += 2;
  else if (answers[2]?.verdict === "likely") t += 1;
  if (answers[3]?.verdict === "yes") t += 2;
  else if (answers[3]?.verdict === "likely") t += 1;
  if (answers[4]?.verdict === "yes") t += 2;
  else if (answers[4]?.verdict === "likely") t += 1;
  if (answers[5]?.verdict === "yes") t += 1;
  return Math.min(10, t);
}

export function tierFor(fit: number, timing: number): Account["tier"] {
  if (fit >= 70 && timing >= 7) return "T1";
  if (fit >= 55) return "T2";
  return "T3";
}
