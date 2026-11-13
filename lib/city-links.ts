// Which city pages (/b2b-lead-generation-<city>) to link from the rest of the site, written down once.
//
// The city pages used to be linked only from the footer, the HTML sitemap and /services, so search engines saw
// them as unimportant. <CityLinks> renders these links on the service pages, the industry landing pages, the case
// studies and the blog posts listed below, matched by industry: a pharma case study links to the cities where
// pharma clusters, not to every city.
//
// The sectors for each city restate what that city page already says. scripts/audit-internal-links.mjs reports
// any link here that stops landing on a real page.

export type CityIndustry =
  | "saas"
  | "it"
  | "manufacturing"
  | "pharma"
  | "financial"
  | "insurance"
  | "recruitment"
  | "professional"
  | "ecommerce"
  | "founder";

export interface CityLink {
  slug: string;
  name: string;
  href: string;
  // Short line under the city name: what that city page is written for.
  sectors: string;
  industries: CityIndustry[];
}

export const CITY_LINKS: CityLink[] = [
  { slug: "mumbai", name: "Mumbai", href: "/b2b-lead-generation-mumbai", sectors: "BFSI, fintech, media and professional services", industries: ["financial", "insurance", "saas", "professional", "ecommerce", "pharma", "recruitment", "founder"] },
  { slug: "bengaluru", name: "Bengaluru (Bangalore)", href: "/b2b-lead-generation-bengaluru", sectors: "B2B SaaS, IT services and deep tech", industries: ["saas", "it", "recruitment", "ecommerce", "founder"] },
  { slug: "delhi", name: "Delhi NCR", href: "/b2b-lead-generation-delhi", sectors: "IT and SaaS in Gurugram and Noida, exporters, staffing", industries: ["it", "saas", "manufacturing", "recruitment", "professional", "ecommerce", "financial"] },
  { slug: "gurugram", name: "Gurugram (Gurgaon)", href: "/b2b-lead-generation-gurugram", sectors: "SaaS, fintech, IT services and staffing firms", industries: ["saas", "recruitment", "it", "financial", "professional"] },
  { slug: "noida", name: "Noida", href: "/b2b-lead-generation-noida", sectors: "IT services, software and electronics makers", industries: ["it", "manufacturing", "saas"] },
  { slug: "pune", name: "Pune", href: "/b2b-lead-generation-pune", sectors: "IT services, SaaS and auto-component makers", industries: ["manufacturing", "it", "saas", "recruitment"] },
  { slug: "hyderabad", name: "Hyderabad", href: "/b2b-lead-generation-hyderabad", sectors: "Pharma, API, biotech and IT services", industries: ["pharma", "it", "saas", "recruitment"] },
  { slug: "chennai", name: "Chennai", href: "/b2b-lead-generation-chennai", sectors: "Auto components, healthcare suppliers and exporters", industries: ["manufacturing", "pharma", "it"] },
  { slug: "ahmedabad", name: "Ahmedabad", href: "/b2b-lead-generation-ahmedabad", sectors: "Pharma, chemicals and textile exporters", industries: ["pharma", "manufacturing", "founder"] },
  { slug: "kolkata", name: "Kolkata", href: "/b2b-lead-generation-kolkata", sectors: "Healthcare suppliers, engineering and trading houses", industries: ["manufacturing", "pharma", "it", "financial", "insurance"] },
  { slug: "jaipur", name: "Jaipur", href: "/b2b-lead-generation-jaipur", sectors: "Gem, jewellery and handicraft exporters, IT services", industries: ["manufacturing", "it"] },
  { slug: "indore", name: "Indore", href: "/b2b-lead-generation-indore", sectors: "IT services, Pithampur pharma and auto components", industries: ["it", "pharma", "manufacturing"] },
  { slug: "surat", name: "Surat", href: "/b2b-lead-generation-surat", sectors: "Diamonds, jewellery, textiles and chemicals", industries: ["manufacturing"] },
  { slug: "coimbatore", name: "Coimbatore", href: "/b2b-lead-generation-coimbatore", sectors: "Pumps, motors, textile machinery and IT services", industries: ["manufacturing", "it"] },
];

// The UAE city pages. Kept apart from CITY_LINKS because the headings and intros wherever <CityLinks> is used speak
// of India; these are linked from the case studies whose market is the UAE (components/case-studies/CaseStudyLayout.tsx).
export const UAE_CITY_LINKS: CityLink[] = [
  { slug: "dubai", name: "Dubai", href: "/b2b-lead-generation-dubai", sectors: "UAE companies, and companies selling into the UAE", industries: [] },
  { slug: "abu-dhabi", name: "Abu Dhabi", href: "/b2b-lead-generation-abu-dhabi", sectors: "Enterprise, energy, healthcare and finance buyers", industries: [] },
];

// The cities whose pages are written for an industry, strongest match first (each city lists its industries in
// order of weight). No industry: every city, in the order above.
export function citiesFor(industry?: CityIndustry | null): CityLink[] {
  if (!industry) return CITY_LINKS;
  return CITY_LINKS.filter((c) => c.industries.includes(industry)).sort((a, b) => a.industries.indexOf(industry) - b.industries.indexOf(industry));
}

// Case study slug -> industry. The library and detailed case studies start with their industry key;
// the long-form ones are listed by name.
const CASE_STUDY_PREFIXES: [string, CityIndustry][] = [
  ["pharma-", "pharma"],
  ["saas-", "saas"],
  ["manufacturers-exporters-", "manufacturing"],
  ["agencies-it-", "it"],
  ["financial-services-", "financial"],
  ["insurance-", "insurance"],
  ["recruitment-", "recruitment"],
  ["professional-services-", "professional"],
  ["ecommerce-", "ecommerce"],
  ["b2b-founder-", "founder"],
];

const LONG_FORM_INDUSTRY: Record<string, CityIndustry | null> = {
  "founder-personal-brand-linkedin": "founder",
  "heritage-jewellery-valuation-pipeline": "manufacturing",
  "leadership-development-messaging-shift": "professional",
  "medical-tourism-platform-pipeline": "pharma",
  "predictable-b2b-lead-gen-engine": null,
  "retail-strategy-design-pipeline": "professional",
  "specialist-recruitment-linkedin-leads": "recruitment",
  "uk-pharma-qualified-meetings": "pharma",
  "wealth-management-pms-pipeline": "financial",
};

export function caseStudyIndustry(slug: string): CityIndustry | null {
  if (slug in LONG_FORM_INDUSTRY) return LONG_FORM_INDUSTRY[slug];
  return CASE_STUDY_PREFIXES.find(([p]) => slug.startsWith(p))?.[1] ?? null;
}

// Industry landing page (/lp/<slug>) -> industry. Pages not listed show every city.
export const LANDING_PAGE_INDUSTRY: Record<string, CityIndustry> = {
  "saas-founders": "saas",
  "agencies-it": "it",
  "manufacturers-exporters": "manufacturing",
  pharma: "pharma",
  "financial-services": "financial",
  "accounting-cfo-firms": "financial",
  insurance: "insurance",
  "recruitment-firms": "recruitment",
};

// Blog posts that talk about choosing or running B2B lead generation, where a reader is likely to look for a
// team in their city. Other posts are tactics (hooks, deliverability) and get no city block.
export const POSTS_WITH_CITY_LINKS = new Set([
  "agency-vs-in-house",
  "what-is-b2b-outbound-sales",
  "linkedin-outreach-agency-vs-manual-prospecting",
  "ai-vs-traditional-lead-generation",
  "b2b-outbound-benchmark-report-2026",
  "predictable-b2b-lead-gen-engine",
  "cold-email-compliance-guide",
  "icp-mapping-b2b",
  "b2b-lead-gen-metrics",
  "founder-led-sales-before-scaling",
  "how-bangalore-saas-companies-get-b2b-leads",
  "how-hyderabad-pharma-companies-find-b2b-buyers",
  "how-pune-manufacturers-find-b2b-buyers",
  "how-kolkata-healthcare-suppliers-reach-hospital-buyers",
]);
