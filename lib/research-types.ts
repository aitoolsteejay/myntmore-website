// Shared shapes for the research report pages (/research/*): one table of researched accounts,
// each answering the same questions with a dated source.
export type Verdict = "yes" | "likely" | "no";
// sourceStatus is set by the Prospect Research tool's automatic link check: "unchecked" means the site
// refused automated requests (often a 403), so the link was kept but could not be read; "no_mention"
// means the page loaded but did not name the company; "removed" means the link was dead (404 or no DNS).
export type SourceStatus = "verified" | "unchecked" | "no_mention" | "removed";
export interface Answer { verdict: Verdict; text: string; source?: string; date?: string; sourceStatus?: SourceStatus }
export interface Account {
  name: string; where: string; tier: "T1" | "T2" | "T3"; fit: number; timing: number;
  when: string; recent: string; answers: Answer[]; pitch: string; who: string;
}
export interface MarketWindow { title: string; body: string; soWhat: string; source: string }
