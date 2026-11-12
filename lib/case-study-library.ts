import data from "./case-study-library.json";

// The industry case study library: 50 case studies (5 in each of the 10 industries), real
// client work with the client names withheld. They are ordinary, indexable case study pages
// listed in the sitemap. (The source copy was drafted with a hypothetical-example label; the
// owner confirmed the work is real, so none of that wording belongs on the site.)
//
// The text lives in case-study-library.json: challenge, solution and results are the source
// copy. The "Sample Testimonial" quotes in the source are not published: the source labels them
// samples, and no quote goes on the site unless a client actually said it (the site removed
// fabricated testimonials in commit 3e79c28).
//
// Everything a page or a card needs beyond that text is derived here, so the numbers shown can
// only ever be the numbers in `results`.

export interface LibraryCase {
  n: number;
  industry: string;
  segment: string;
  slug: string;
  title: string;
  challenge: string;
  solution: string[];
  results: string[];
  // Optional search title set in the admin; empty means "<segment> Case Study".
  metaTitle?: string;
  // Set in the admin, or derived by scripts/generate-case-study-content.mjs from the fields above.
  metaDescription: string;
  keywords: string[];
}

export const LIBRARY: LibraryCase[] = data.cases;

// "pharma companies", "b2b founders", ...: how each industry reads inside a keyword phrase.
export const INDUSTRY_AUDIENCE: Record<string, string> = data.audiences;

export function libraryCase(slug: string): LibraryCase {
  const found = LIBRARY.find((c) => c.slug === slug);
  if (!found) throw new Error(`No library case study with slug "${slug}" in lib/case-study-library.json`);
  return found;
}

// Same accent per industry as the rest of the case studies.
export const INDUSTRY_ACCENT: Record<string, string> = {
  Pharma: "#0ea5e9",
  SaaS: "#3b82f6",
  "Professional Services": "#a855f7",
  "eCommerce Tech": "#10b981",
  "B2B Founder": "#f97316",
  "Agencies & IT": "#0891b2",
  "Financial Services": "#7c3aed",
  Insurance: "#a14a08",
  "Manufacturers & Exporters": "#1d4ed8",
  "Recruitment & Staffing": "#0d9488",
};

// "22 qualified meetings generated in 90 days." -> { v: "22", l: "Qualified meetings generated in 90 days" }
// "₹48 lakh in potential business pipeline."    -> { v: "₹48 lakh", l: "In potential business pipeline" }
// A result with no leading figure ("More consistent demo bookings.") returns null.
const LEADING_FIGURE = /^(₹\s?\d[\d.,]*(?:\s?(?:lakh|crore))?\+?|\d[\d.,]*(?:\+|%|x)?)\s+(.+?)\.?$/i;
const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function splitResult(text: string): { v: string; l: string } | null {
  const m = text.match(LEADING_FIGURE);
  return m ? { v: m[1].trim(), l: capitalise(m[2].trim()) } : null;
}

const firstSentence = (text: string) => text.split(/(?<=[.!?])\s+/)[0];
const afterFirstSentence = (text: string) => text.slice(firstSentence(text).length).trim();

function servicesFor(c: LibraryCase) {
  const text = [...c.solution].join(" ");
  const out = [{ name: "LinkedIn Outreach", href: "/services/linkedin-outreach" }];
  if (/founder|content|thought leadership|personal branding|profile/i.test(text)) out.push({ name: "Personal Branding", href: "/services/personal-branding" });
  if (/\bICP\b|segment|prospect lists|lists of|targeted lists/i.test(text)) out.push({ name: "ICP Mapping & Lead Scoring", href: "/services/sales-intelligence" });
  return out;
}

// Props for <CaseStudyLayout> from a case's source text.
export function libraryPageProps(slug: string) {
  const c = libraryCase(slug);
  const figures = c.results.map(splitResult);
  const numeric = figures.filter((f): f is { v: string; l: string } => f !== null);
  const qualitative = c.results.filter((_, i) => figures[i] === null);
  const rest = afterFirstSentence(c.challenge);
  return {
    slug: c.slug,
    tag: `${c.industry} · ${c.segment}`,
    accent: INDUSTRY_ACCENT[c.industry],
    title: c.title,
    intro: firstSentence(c.challenge),
    heroStats: numeric.slice(0, 3).map((f) => ({ value: f.v, label: f.l })),
    challengeTitle: "Where they started",
    challengeBody: [rest || c.challenge],
    approachTitle: "How Myntmore approached it",
    approachBody: c.solution,
    metrics: numeric.map((f) => ({ l: f.l, v: f.v })),
    outcomeTitle: "What changed",
    outcomeBody: qualitative.length ? qualitative.join(" ") : "The figures above show the pipeline movement this engagement produced.",
    roleBody: "Positioning, targeting, content and outreach, designed and run as one system.",
    services: servicesFor(c),
  };
}

// The same case as a card for the /case-studies listing.
export function libraryCards() {
  return LIBRARY.map((c) => {
    const numeric = c.results.map(splitResult).filter((f): f is { v: string; l: string } => f !== null);
    return {
      slug: c.slug,
      tag: `${c.industry} · ${c.segment}`,
      industry: c.industry,
      accent: INDUSTRY_ACCENT[c.industry],
      title: c.title,
      stats: numeric.slice(0, 3),
      excerpt: firstSentence(c.challenge),
      services: servicesFor(c).map((s) => s.name),
    };
  });
}

// What the generated page's <title> and description say. Kept here so the generator
// script and any check use one definition.
export const libraryMetaTitle = (c: LibraryCase) => c.metaTitle || `${c.segment} Case Study`;
export const libraryMetaDescription = (c: LibraryCase) => c.metaDescription;
