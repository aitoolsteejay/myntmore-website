// Settings for the Prospect Research tool (/tools/prospect-research). Model names and the daily cap
// come from env vars so they can change without a code change.

export const RESEARCH_MODEL = process.env.PROSPECT_RESEARCH_MODEL || "gemini-3.8-flash";
export const FORMAT_MODEL = process.env.PROSPECT_FORMAT_MODEL || "gemini-3.1-flash-lite";

export const LEAD_SOURCE = "prospect_research";

/** How many prospects a run researches, at most. */
export const PROSPECT_COUNT = 10;

/** Runs (a discovery that went ahead) allowed per email and per IP in any 24 hours. */
export const RUNS_PER_EMAIL = 2;
export const RUNS_PER_IP = 5;
/** Profile checks allowed per email and per IP in any 24 hours (cheap, but still a search call). */
export const PROFILES_PER_EMAIL = 6;
export const PROFILES_PER_IP = 12;
/** Research calls one run may make: 10 prospects, each retried once, plus a little slack. */
export const ACCOUNT_CALLS_PER_RUN = 22;
/** A lead can start runs for this long after it was created. */
export const LEAD_MAX_AGE_MS = 24 * 60 * 60 * 1000;
/** A run's account calls are refused once the run is this old. */
export const RUN_MAX_AGE_MS = 60 * 60 * 1000;
/** Cached prospect research is reused for this long. */
export const CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export const CAPACITY_MESSAGE = "We're at capacity today. We'll email your report tomorrow.";

export function dailyRunCap(): number {
  const n = Number(process.env.PROSPECT_RESEARCH_DAILY_RUN_CAP);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 30;
}

/** USD per 1M tokens. Output includes thinking tokens, input includes tool-use prompt tokens. */
interface Price { input: number; output: number }

function priceFor(model: string, at: Date): Price {
  if (model.startsWith("gemini-3.8-flash")) {
    // Introductory price until 31 Dec 2026, then double.
    return at < new Date(Date.UTC(2027, 0, 1)) ? { input: 0.75, output: 3.75 } : { input: 1.5, output: 7.5 };
  }
  if (model.startsWith("gemini-3.1-flash-lite")) return { input: 0.25, output: 1.5 };
  // Unknown model: price it like 3.8 Flash at the standard rate, so the estimate errs high.
  return { input: 1.5, output: 7.5 };
}

/** Google Search grounding on Gemini 3 and newer: $14 per 1,000 queries after 5,000 free a month. */
export const SEARCH_PRICE_USD = 14 / 1000;

export interface UsageNumbers {
  promptTokens: number;
  outputTokens: number;
  thinkingTokens: number;
  toolUseTokens: number;
  searches: number;
}

/**
 * Estimated cost of one call at list price. Searches are always charged at the paid rate,
 * ignoring the 5,000 free a month, so the number is what a run costs once the free tier is used up.
 */
export function estimateCost(model: string, u: UsageNumbers, at = new Date()): number {
  const p = priceFor(model, at);
  const tokens = ((u.promptTokens + u.toolUseTokens) * p.input + (u.outputTokens + u.thinkingTokens) * p.output) / 1_000_000;
  return Math.round((tokens + u.searches * SEARCH_PRICE_USD) * 1_000_000) / 1_000_000;
}
