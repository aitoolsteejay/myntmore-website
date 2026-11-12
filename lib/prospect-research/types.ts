// Shapes shared by the Prospect Research API routes and the page.
import type { Account } from "@/lib/research-types";

export interface ResearchInputs {
  website: string; // normalised to https://host
  offer: string;
  audience: string;
  exclusions: string[];
}

/** What the tool understood about the visitor's company. Every field can be edited before the search. */
export interface Profile {
  companyName: string;
  offer: string;
  industries: string;
  companySize: string;
  regions: string;
  buyerRole: string;
  investArea: string;
  hiringRoles: string;
  competitors: string;
}

export interface Prospect {
  name: string;
  domain: string;
  location: string;
  signal: string;
  signalDate?: string;
}

export interface ProspectResult {
  domain: string;
  account: Account | null; // null when the research failed
  cached: boolean;
  checks: { checked: number; downgraded: number; removed: number; unchecked: number };
}
