// First-touch lead source, so a lead in Zoho can be traced back to where the visitor first arrived.
// The site's Zoho forms post `zf_referrer_name` (Zoho's own referrer field); it used to be sent empty,
// so organic search could not be told apart from Instagram or direct visits. The first page a visitor
// lands on is stored in localStorage and sent with every form as one short string.
const KEY = "mm_first_touch";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

interface FirstTouch {
  t: number;
  landing: string;
  medium: string;
  source: string;
  campaign: string;
}

const SEARCH_HOSTS = ["google.", "bing.com", "duckduckgo.com", "yahoo.com", "ecosia.org", "search.brave.com"];
const SOCIAL_HOSTS = ["instagram.com", "linkedin.com", "lnkd.in", "facebook.com", "twitter.com", "t.co", "x.com", "youtube.com", "whatsapp.com"];
const AI_HOSTS = ["chatgpt.com", "chat.openai.com", "perplexity.ai", "claude.ai", "gemini.google.com", "copilot.microsoft.com"];

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function classify(referrer: string, params: URLSearchParams): Pick<FirstTouch, "medium" | "source" | "campaign"> {
  const utmSource = params.get("utm_source") || "";
  const utmMedium = params.get("utm_medium") || "";
  const campaign = params.get("utm_campaign") || "";
  if (utmSource || utmMedium) return { medium: utmMedium || "campaign", source: utmSource || hostOf(referrer) || "unknown", campaign };
  const host = hostOf(referrer);
  if (!host || host.endsWith("myntmore.com")) return { medium: "direct", source: "direct", campaign };
  if (AI_HOSTS.some((h) => host === h || host.endsWith("." + h))) return { medium: "ai", source: host, campaign };
  if (SEARCH_HOSTS.some((h) => host.includes(h))) return { medium: "organic", source: host, campaign };
  if (SOCIAL_HOSTS.some((h) => host === h || host.endsWith("." + h))) return { medium: "social", source: host, campaign };
  return { medium: "referral", source: host, campaign };
}

// Call once per page load. Keeps the first touch for 30 days; storage failures are ignored.
export function captureFirstTouch(): void {
  try {
    const existing = window.localStorage.getItem(KEY);
    if (existing) {
      const parsed = JSON.parse(existing) as FirstTouch;
      if (Date.now() - parsed.t < MAX_AGE_MS) return;
    }
    const touch: FirstTouch = {
      t: Date.now(),
      landing: window.location.pathname,
      ...classify(document.referrer, new URLSearchParams(window.location.search)),
    };
    window.localStorage.setItem(KEY, JSON.stringify(touch));
  } catch {
    /* private mode or blocked storage: the form simply sends the current page */
  }
}

// One short string for the form field: "organic | google.com | landing /services | page /contact-us".
export function leadSourceValue(): string {
  let touch: FirstTouch | null = null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) touch = JSON.parse(raw) as FirstTouch;
  } catch {
    touch = null;
  }
  const page = window.location.pathname;
  if (!touch) return `unknown | page ${page}`;
  const campaign = touch.campaign ? ` | campaign ${touch.campaign}` : "";
  return `${touch.medium} | ${touch.source}${campaign} | landing ${touch.landing} | page ${page}`.slice(0, 250);
}
