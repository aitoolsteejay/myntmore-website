// Keyword and AI-prompt research: city permutations, ICP permutations, ICP x city, and the
// prompt library for the monthly AI visibility check.
//
//   node scripts/generate-keyword-research.mjs                  write the CSVs in docs/keywords/ and docs/ai-visibility-prompts.csv
//   node scripts/generate-keyword-research.mjs --write-tracker  also rewrite docs/ai-visibility-tracker.csv from the monthly prompts
//                                                              (refuses if any result has been filled in)
//
// What it reads, so the lists stay in step with the site:
//   - ICP names and 2026 status            <- lib/value-prop.json (the /value-prop data)
//   - every keyword the site targets today <- `keywords` arrays in app/**/page.tsx, content/**/*.json and content/posts/*.mdoc
// Each keyword is marked "targeted" (some page already lists it), "mapped" (an existing page should rank for it; add it to that
// page's keywords) or "gap" (no page fits; the target column names the page to build).
//
// No search-volume data is used (no keyword tool is connected). Priority comes from the ICP's 2026 status, the city's
// tier and the buying intent of the phrase. Check volumes in a keyword tool before building a "gap" page.
//
// Doorway-page rule: city x service permutations ("cold email agency pune", "appointment setting pune", ...) all point at
// that city's one page. Do not build a page per permutation; Google treats near-identical pages per keyword as doorway pages.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "docs", "keywords");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");

// ── Existing keywords on the site ─────────────────────────────────────────
function walk(dir, out = []) {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const pageOf = (file) => {
  if (file.startsWith("app/")) return "/" + path.dirname(file).replace(/^app\/?/, "").replace(/\/?page$/, "");
  return file;
};

const existing = new Map(); // normalized keyword -> page
const addExisting = (kw, page) => {
  const k = norm(kw);
  if (k && !existing.has(k)) existing.set(k, page);
};
const STOP = new Set(["in", "for", "the", "a", "an", "of", "to", "and", "india", "best", "top"]);
const SYN = { companies: "company", agencies: "agency", services: "service", firms: "firm", bangalore: "bengaluru", gurgaon: "gurugram" };
function norm(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w))
    .map((w) => SYN[w] ?? w)
    .sort()
    .join(" ");
}

for (const f of walk("app").filter((f) => f.endsWith("page.tsx"))) {
  const m = read(f).match(/keywords:\s*\[([\s\S]*?)\]/);
  if (m) for (const k of m[1].matchAll(/"([^"]+)"/g)) addExisting(k[1], pageOf(f));
}
const contentPage = (f) => {
  const slug = path.basename(f).replace(/\.(json|mdoc)$/, "");
  if (f.startsWith("content/city-pages/")) return `/b2b-lead-generation-${slug}`;
  if (f.startsWith("content/landing-pages/")) return `/lp/${slug}`;
  if (f.startsWith("content/glossary/")) return `/resources/glossary/${slug}`;
  if (f.startsWith("content/case-study-pages/")) return `/case-studies/${slug}`;
  if (f.startsWith("content/posts/")) return `/resources/blogs/${slug}`;
  return f;
};
for (const f of walk("content")) {
  const src = read(f);
  if (f.endsWith(".json")) {
    const m = src.match(/"keywords"\s*:\s*\[([\s\S]*?)\]/);
    if (m) for (const k of m[1].matchAll(/"([^"]+)"/g)) addExisting(k[1], contentPage(f));
  } else if (f.endsWith(".mdoc")) {
    const fm = src.match(/^---([\s\S]*?)---/);
    const kw = fm && fm[1].match(/keywords:\s*\n((?:\s+-\s+.*\n?)+)/);
    if (kw) for (const k of kw[1].matchAll(/-\s+['"]?([^'"\n]+)['"]?/g)) addExisting(k[1].trim(), contentPage(f));
  }
}

function coverage(keyword, target) {
  const hit = existing.get(norm(keyword));
  if (hit) return { status: "targeted", page: hit };
  if (target && !target.startsWith("NEW")) return { status: "mapped", page: target };
  return { status: "gap", page: target || "" };
}

// ── ICPs (from /value-prop) ───────────────────────────────────────────────
const ICPS = JSON.parse(read("lib/value-prop.json"));
const icpStatus = (i) => (i.status.group === "subsegment" ? `subsegment of ICP ${i.status.parent}` : i.status.group);
const icpPriority = (i) => ({ core: "P1", retain: "P1", test: "P2", subsegment: "P2", deprioritised: "P3" })[i.status.group];

// ── Cities ────────────────────────────────────────────────────────────────
// tier: page = has a /b2b-lead-generation-<city> page; india = Indian city without one; intl = market the ICPs sell into.
// page: true marks an intl market that also has a city page (Dubai, Abu Dhabi); it keeps the intl phrasings.
// variants are other spellings people search; they map to the same page.
const CITIES = [
  { name: "Mumbai", slug: "mumbai", tier: "page", variants: ["navi mumbai", "thane"], why: "HQ; BFSI, media, pharma, exporters" },
  { name: "Delhi", slug: "delhi", tier: "page", variants: ["delhi ncr", "new delhi"], why: "NCR: IT services, SaaS, recruitment, exporters" },
  { name: "Bengaluru", slug: "bengaluru", tier: "page", variants: ["bangalore"], why: "SaaS, IT services, GCCs" },
  { name: "Pune", slug: "pune", tier: "page", variants: [], why: "IT services, engineering, manufacturing" },
  { name: "Hyderabad", slug: "hyderabad", tier: "page", variants: [], why: "Pharma, IT services, GCCs" },
  { name: "Chennai", slug: "chennai", tier: "page", variants: [], why: "SaaS, auto/engineering, IT services" },
  { name: "Kolkata", slug: "kolkata", tier: "page", variants: [], why: "Healthcare, engineering, exporters" },
  { name: "Ahmedabad", slug: "ahmedabad", tier: "page", variants: [], why: "Pharma, chemicals, engineering exporters" },
  { name: "Gurugram", slug: "gurugram", tier: "page", variants: ["gurgaon"], why: "SaaS, IT services, MNC and GCC offices; searched apart from Delhi" },
  { name: "Noida", slug: "noida", tier: "page", variants: [], why: "IT services and product engineering" },
  { name: "Jaipur", slug: "jaipur", tier: "page", variants: [], why: "Jewellery and handicraft exporters, IT services" },
  { name: "Surat", slug: "surat", tier: "page", variants: [], why: "Diamond, jewellery and textile exporters" },
  { name: "Vadodara", slug: "vadodara", tier: "india", variants: ["baroda"], why: "Pharma, engineering, chemicals" },
  { name: "Rajkot", slug: "rajkot", tier: "india", variants: [], why: "Engineering components and machinery exporters" },
  { name: "Ludhiana", slug: "ludhiana", tier: "india", variants: [], why: "Industrial manufacturing, cycles, hosiery exporters" },
  { name: "Coimbatore", slug: "coimbatore", tier: "page", variants: [], why: "Pumps, motors, textile machinery exporters" },
  { name: "Kochi", slug: "kochi", tier: "india", variants: ["cochin"], why: "IT services, seafood and spice exporters" },
  { name: "Indore", slug: "indore", tier: "page", variants: [], why: "IT services, pharma, manufacturing" },
  { name: "Chandigarh", slug: "chandigarh", tier: "india", variants: ["mohali"], why: "IT services, pharma (Baddi belt)" },
  { name: "Dubai", slug: "dubai", tier: "intl", page: true, variants: ["uae"], why: "GCC ICPs (recruitment, IT, agencies); UAE case studies exist" },
  { name: "Abu Dhabi", slug: "abu-dhabi", tier: "intl", page: true, variants: [], why: "GCC enterprise buyers" },
  { name: "Riyadh", slug: "riyadh", tier: "intl", variants: ["saudi arabia"], why: "Recruitment and manufacturing ICPs target Saudi" },
  { name: "Singapore", slug: "singapore", tier: "intl", variants: [], why: "Singapore case studies exist; fintech, prof. services" },
  { name: "London", slug: "london", tier: "intl", variants: ["uk"], why: "UK case studies exist; IT, accounting outsourcing" },
];

// Service stems for city permutations. {c} is the city. "all" stems run for every city; "core" only for cities with a
// page and the tier-2 Indian cities; intl gets the subset international buyers search.
const CITY_STEMS = [
  { kw: "b2b lead generation company in {c}", service: "B2B lead generation", reach: "all" },
  { kw: "lead generation agency in {c}", service: "B2B lead generation", reach: "all" },
  { kw: "lead generation services in {c}", service: "B2B lead generation", reach: "all" },
  { kw: "b2b lead generation agency {c}", service: "B2B lead generation", reach: "all" },
  { kw: "outbound sales agency {c}", service: "Outbound / SDR", reach: "all" },
  { kw: "appointment setting services {c}", service: "Outbound / SDR", reach: "all" },
  { kw: "outsourced sdr {c}", service: "Outbound / SDR", reach: "intl" },
  { kw: "sales outsourcing company in {c}", service: "Outbound / SDR", reach: "india" },
  { kw: "cold email agency {c}", service: "Cold email", reach: "all" },
  { kw: "linkedin lead generation agency {c}", service: "LinkedIn outreach", reach: "all" },
  { kw: "linkedin outreach agency {c}", service: "LinkedIn outreach", reach: "india" },
  { kw: "account based marketing agency {c}", service: "ABM", reach: "page" },
  { kw: "linkedin personal branding agency {c}", service: "Personal branding", reach: "page" },
  { kw: "b2b marketing agency {c}", service: "B2B marketing (broad)", reach: "page" },
  { kw: "lead generation for startups in {c}", service: "B2B lead generation", reach: "page" },
];

// ── ICP keywords ──────────────────────────────────────────────────────────
// Per ICP: the page that should rank (existing, or NEW: <suggested path>), and natural phrasings. Intent: c = commercial
// (looking for a provider), i = informational (looking for how to do it; a guide or blog post ranks, and AI answers cite it).
const ICP_KEYWORDS = {
  1: {
    page: "/lp/agencies-it",
    note: "Shares /lp/agencies-it with agencies; a dedicated IT services page would rank better for the core ICP.",
    kws: [
      ["lead generation for it companies", "c"],
      ["b2b lead generation for it services companies", "c"],
      ["lead generation for software development companies", "c"],
      ["lead generation for custom software development firms", "c"],
      ["appointment setting for it companies", "c"],
      ["outbound sales for it outsourcing companies", "c"],
      ["cold email for software development agency", "c"],
      ["linkedin lead generation for it companies", "c"],
      ["how to get international clients for it company", "i"],
      ["how to get us clients for software development company", "i"],
      ["how do indian it companies get clients abroad", "i"],
      ["how to reduce dependence on referrals it services", "i"],
    ],
  },
  2: {
    page: "/lp/saas-founders",
    kws: [
      ["b2b saas lead generation agency", "c"],
      ["outbound sales agency for saas", "c"],
      ["saas appointment setting", "c"],
      ["cold email agency for saas", "c"],
      ["linkedin outreach for saas companies", "c"],
      ["outsourced sdr for saas", "c"],
      ["saas lead generation india", "c"],
      ["should saas startup hire sdr or outsource", "i"],
      ["how to get first enterprise customers for saas", "i"],
      ["how to build outbound for saas after funding", "i"],
    ],
  },
  3: {
    page: "/lp/recruitment-firms",
    kws: [
      ["lead generation for recruitment agencies", "c"],
      ["lead generation for executive search firms", "c"],
      ["business development for staffing companies", "c"],
      ["client acquisition for recruitment consultancy", "c"],
      ["lead generation for staffing agency india", "c"],
      ["recruitment agency marketing india", "c"],
      ["how to get clients for recruitment agency", "i"],
      ["how to get mandates for executive search firm", "i"],
      ["how to get clients for recruitment agency in uae", "i"],
      ["linkedin outreach for recruiters to get clients", "i"],
    ],
  },
  4: {
    page: "/lp/agency-partners",
    kws: [
      ["white label lead generation", "c"],
      ["white label lead generation agency india", "c"],
      ["white label cold email service", "c"],
      ["white label linkedin outreach", "c"],
      ["lead generation reseller program", "c"],
      ["lead generation for digital marketing agencies", "c"],
      ["how to get clients for digital marketing agency", "i"],
      ["how can a marketing agency offer lead generation", "i"],
    ],
  },
  5: {
    page: "NEW: /lp/vc-portfolio-gtm",
    note: "/lp/fundraising is founders raising money, a different buyer. Test ICP: start with one guide before a page.",
    kws: [
      ["portfolio gtm support for vc funds", "c"],
      ["outbound lead generation for vc portfolio companies", "c"],
      ["portfolio company sales support", "c"],
      ["vc platform team gtm services", "c"],
      ["how vcs help portfolio companies with sales", "i"],
      ["how to build pipeline for portfolio companies", "i"],
    ],
  },
  6: {
    page: "NEW: /lp/consulting-advisory",
    note: "Subsegment of ICP 24: can share the accounting / professional services page.",
    kws: [
      ["lead generation for consultants", "c"],
      ["lead generation for consulting firms", "c"],
      ["lead generation for fractional cfo", "c"],
      ["client acquisition for consulting firms india", "c"],
      ["how to get clients for management consulting firm", "i"],
      ["how to get clients beyond referrals consulting", "i"],
    ],
  },
  7: {
    page: "/lp/financial-services",
    note: "/lp/financial-services targets lenders/NBFCs; fintech product companies sit closer to /lp/saas-founders.",
    kws: [
      ["fintech lead generation agency", "c"],
      ["b2b lead generation for fintech companies", "c"],
      ["insurtech lead generation", "c"],
      ["regtech sales outreach", "c"],
      ["how to sell fintech to banks", "i"],
    ],
  },
  8: {
    page: "/lp/saas-founders",
    kws: [
      ["lead generation for cybersecurity companies", "c"],
      ["mssp lead generation", "c"],
      ["cloud services lead generation", "c"],
      ["how to sell cybersecurity services to enterprises", "i"],
    ],
  },
  9: {
    page: "/lp/saas-founders",
    kws: [
      ["hr tech lead generation", "c"],
      ["lead generation for payroll software company", "c"],
      ["how to sell hrms software to enterprises", "i"],
    ],
  },
  10: {
    page: "NEW: /lp/gcc-providers",
    kws: [
      ["lead generation for gcc setup companies", "c"],
      ["global capability centre leads india", "c"],
      ["how to find companies setting up gcc in india", "i"],
      ["how to sell to global capability centres in india", "i"],
    ],
  },
  11: {
    page: "/lp/manufacturers-exporters",
    note: "Pharma phrasings belong on /lp/pharma.",
    kws: [
      ["lead generation for manufacturers", "c"],
      ["export lead generation india", "c"],
      ["lead generation for engineering companies", "c"],
      ["lead generation for machinery manufacturers", "c"],
      ["industrial b2b lead generation", "c"],
      ["b2b lead generation for pharma companies", "c", "/lp/pharma"],
      ["cdmo business development outsourcing", "c", "/lp/pharma"],
      ["how to find international buyers for manufacturing company", "i"],
      ["how to get export orders from usa", "i"],
      ["how to get export orders from europe", "i"],
      ["how to find pharma distributors abroad", "i", "/lp/pharma"],
      ["how to find buyers between trade shows", "i"],
    ],
  },
  12: {
    page: "NEW: /lp/logistics",
    kws: [
      ["logistics lead generation", "c"],
      ["freight forwarding lead generation", "c"],
      ["3pl sales leads", "c"],
      ["lead generation for logistics software", "c"],
      ["how to get clients for logistics company", "i"],
    ],
  },
  13: {
    page: "/lp/saas-founders",
    kws: [
      ["lead generation for ai companies", "c"],
      ["ai startup b2b sales outsourcing", "c"],
      ["how to sell ai solutions to enterprises", "i"],
    ],
  },
  14: { page: "", kws: [["lead generation for healthtech companies", "c"], ["medtech b2b lead generation", "c"]] },
  15: {
    page: "NEW: /lp/executive-coaches",
    kws: [
      ["lead generation for executive coaches", "c"],
      ["b2b lead generation for coaching business", "c"],
      ["how to get corporate clients for leadership coaching", "i"],
      ["how to sell coaching to companies", "i"],
    ],
  },
  16: {
    page: "NEW: /lp/corporate-gifting",
    kws: [
      ["corporate gifting lead generation", "c"],
      ["b2b leads for corporate gifting company", "c"],
      ["how to get corporate gifting clients", "i"],
      ["how to get diwali corporate gifting orders", "i"],
    ],
  },
  17: {
    page: "/lp/manufacturers-exporters",
    kws: [
      ["jewellery export lead generation", "c"],
      ["private label jewellery manufacturer leads", "c"],
      ["how to find international jewellery buyers", "i"],
      ["how to find jewellery buyers in usa", "i"],
    ],
  },
  18: { page: "", kws: [["lead generation for event management companies", "c"], ["mice lead generation", "c"]] },
  19: { page: "", kws: [["lead generation for interior fit out companies", "c"], ["how to get office interior projects", "i"]] },
  20: {
    page: "/lp/agencies-it",
    kws: [
      ["engineering services outsourcing lead generation", "c"],
      ["how to get r&d outsourcing clients", "i"],
    ],
  },
  21: { page: "", kws: [["commercial real estate lead generation india", "c"]] },
  22: { page: "", kws: [["b2b lead generation for solar companies", "c"], ["cleantech b2b sales leads", "c"]] },
  23: { page: "", kws: [["corporate training lead generation", "c"], ["how to sell corporate training to companies", "i"]] },
  24: {
    page: "/lp/accounting-cfo-firms",
    note:
      "Compliance: ICAI's Code of Ethics bars chartered accountants in practice from soliciting clients, so do not target CA firms' own outreach; position for virtual CFO, finance-ops and UK/US outsourcing firms that are not bound by it.",
    kws: [
      ["lead generation for accounting firms", "c"],
      ["virtual cfo lead generation", "c"],
      ["lead generation for bookkeeping outsourcing firms", "c"],
      ["lead generation for tax consultants", "c"],
      ["client acquisition for compliance firms", "c"],
      ["how to get clients for virtual cfo services", "i"],
      ["how to get uk clients for accounting outsourcing", "i"],
      ["how to get us cpa firms as clients", "i"],
    ],
  },
  25: {
    page: "/case-studies/professional-services",
    note: "Compliance: Bar Council of India rules bar advocates from soliciting work; target research, IP-services, risk and certification firms, not Indian law firms.",
    kws: [
      ["lead generation for professional services firms", "c"],
      ["market research firm lead generation", "c"],
      ["lead generation for certification bodies", "c"],
      ["how to get clients for professional services firm", "i"],
    ],
  },
  26: { page: "", kws: [["brand sponsorship outreach for creators", "c"]] },
  27: { page: "", kws: [["podcast sponsorship outreach", "c"]] },
  28: { page: "", kws: [["lead generation for life coaches", "c"]] },
  29: { page: "", kws: [["drone company b2b lead generation", "c"]] },
};

// ICP x city: only where the ICP clusters in that city. Patterns are the phrasings that read naturally with a city.
const ICP_CITY = [
  { icp: 1, pattern: "lead generation for it companies in {c}", cities: ["Bengaluru", "Pune", "Hyderabad", "Chennai", "Noida", "Gurugram", "Ahmedabad", "Kochi", "Jaipur", "Indore", "Chandigarh"] },
  { icp: 1, pattern: "software development company lead generation {c}", cities: ["Bengaluru", "Pune", "Noida", "Ahmedabad", "Kochi", "Indore"] },
  { icp: 2, pattern: "saas lead generation agency {c}", cities: ["Bengaluru", "Mumbai", "Gurugram", "Delhi", "Pune", "Chennai", "Hyderabad", "Dubai", "Singapore"] },
  { icp: 3, pattern: "lead generation for recruitment agencies in {c}", cities: ["Mumbai", "Delhi", "Bengaluru", "Pune", "Hyderabad", "Chennai", "Gurugram", "Dubai", "Riyadh", "London"] },
  { icp: 11, pattern: "lead generation for manufacturers in {c}", cities: ["Ahmedabad", "Pune", "Chennai", "Rajkot", "Ludhiana", "Coimbatore", "Vadodara", "Mumbai", "Delhi", "Kolkata"] },
  { icp: 11, pattern: "export lead generation {c}", cities: ["Ahmedabad", "Rajkot", "Ludhiana", "Coimbatore", "Surat", "Mumbai", "Jaipur", "Kolkata"] },
  { icp: 11, pattern: "pharma lead generation {c}", cities: ["Hyderabad", "Ahmedabad", "Mumbai", "Vadodara", "Chandigarh"] },
  { icp: 17, pattern: "jewellery export lead generation {c}", cities: ["Mumbai", "Jaipur", "Surat"] },
  { icp: 24, pattern: "lead generation for accounting firms in {c}", cities: ["Mumbai", "Delhi", "Bengaluru", "Pune", "Ahmedabad", "Dubai", "London"] },
  { icp: 24, pattern: "virtual cfo lead generation {c}", cities: ["Mumbai", "Bengaluru", "Delhi", "Pune"] },
  { icp: 4, pattern: "white label lead generation {c}", cities: ["Dubai", "London"] },
];

// ── AI prompts ────────────────────────────────────────────────────────────
// tier: monthly = asked every month in all four engines (docs/ai-visibility-tracker.csv); quarterly = asked once a quarter.
// The first nine are the original tracker prompts, kept word for word so earlier months stay comparable.
const PROMPTS = [
  // Original nine
  ["monthly", "best-of", "Best B2B lead generation agencies in India", "", "", "/resources/guides/how-to-choose-b2b-lead-generation-agency-india"],
  ["monthly", "best-of", "Best cold email agencies for SaaS companies", "2", "", "/services/cold-email"],
  ["monthly", "city", "How do I generate B2B leads in Mumbai?", "", "Mumbai", "/b2b-lead-generation-mumbai"],
  ["monthly", "how-to", "What is a safe LinkedIn outreach strategy?", "", "", "/services/linkedin-outreach"],
  ["monthly", "how-to", "What is the average B2B outbound reply rate?", "", "", "/resources/blogs/b2b-outbound-benchmark-report-2026"],
  ["monthly", "comparison", "Should I use LinkedIn or cold email for outbound?", "", "", "/resources/blogs/cold-email-vs-linkedin-outreach"],
  ["monthly", "cost", "How much does outsourced lead generation cost?", "", "", "/resources/guides/how-to-choose-b2b-lead-generation-agency-india"],
  ["monthly", "entity", "What is Myntmore?", "", "", "/about-us"],
  ["monthly", "entity", "Who is Tejas Jhaveri?", "", "", "/about-us"],
  // New monthly: the core ICPs, the two biggest cities and reputation
  ["monthly", "best-of", "Best LinkedIn outreach agency in India", "", "", "/services/linkedin-outreach"],
  ["monthly", "city", "Best B2B lead generation company in Bangalore", "", "Bengaluru", "/b2b-lead-generation-bengaluru"],
  ["monthly", "icp", "How can an IT services company in India get clients in the US?", "1", "", "/lp/agencies-it"],
  ["monthly", "icp", "How do recruitment agencies get new clients?", "3", "", "/lp/recruitment-firms"],
  ["monthly", "icp", "How can Indian manufacturers find international buyers?", "11", "", "/lp/manufacturers-exporters"],
  ["monthly", "icp", "How can a virtual CFO firm get more clients?", "24", "", "/lp/accounting-cfo-firms"],
  ["monthly", "entity", "Myntmore reviews", "", "", "Clutch reviews (off-site)"],
  // Quarterly: best-of
  ["quarterly", "best-of", "Top outbound sales agencies in India", "", "", "/who-this-is-for"],
  ["quarterly", "best-of", "Best appointment setting companies in India", "", "", "/services/cold-email"],
  ["quarterly", "best-of", "Who are the best outsourced SDR companies in India?", "", "", "/resources/blogs/agency-vs-in-house"],
  ["quarterly", "best-of", "Best account-based marketing agencies in India", "", "", "/services/account-based-marketing"],
  ["quarterly", "best-of", "Best LinkedIn ghostwriting agency for founders in India", "", "", "/services/personal-branding"],
  ["quarterly", "best-of", "Recommend a lead generation agency for a B2B startup in India", "", "", "/who-this-is-for"],
  ["quarterly", "best-of", "Affordable B2B lead generation agency for a small business in India", "", "", "/who-this-is-for"],
  ["quarterly", "best-of", "Best offshore lead generation agency for a US B2B company", "", "", "/case-studies/markets/united-states"],
  ["quarterly", "best-of", "Best AI lead generation agency", "", "", "/services/ai-lead-generation"],
  // Quarterly: cities
  ...["Delhi", "Pune", "Hyderabad", "Chennai", "Ahmedabad", "Kolkata", "Gurugram"].map((c) => [
    "quarterly",
    "city",
    `Best B2B lead generation company in ${c}`,
    "",
    c,
    CITIES.find((x) => x.name === c).tier === "page" ? `/b2b-lead-generation-${CITIES.find((x) => x.name === c).slug}` : `NEW: /b2b-lead-generation-${CITIES.find((x) => x.name === c).slug}`,
  ]),
  ["quarterly", "city", "Best lead generation agency in Dubai for B2B companies", "", "Dubai", "/b2b-lead-generation-dubai"],
  ["quarterly", "city", "Lead generation agency in Mumbai for IT companies", "1", "Mumbai", "/b2b-lead-generation-mumbai"],
  // Quarterly: ICPs
  ["quarterly", "icp", "Best lead generation agency for IT services companies", "1", "", "/lp/agencies-it"],
  ["quarterly", "icp", "Best lead generation agency for recruitment firms in India", "3", "", "/lp/recruitment-firms"],
  ["quarterly", "icp", "How do executive search firms win new mandates?", "3", "", "/lp/recruitment-firms"],
  ["quarterly", "icp", "Should my SaaS startup hire SDRs or outsource outbound?", "2", "", "/resources/blogs/agency-vs-in-house"],
  ["quarterly", "icp", "How can a marketing agency offer lead generation as a white-label service?", "4", "", "/lp/agency-partners"],
  ["quarterly", "icp", "How do pharma API manufacturers find buyers abroad?", "11", "", "/lp/pharma"],
  ["quarterly", "icp", "How can an Indian accounting outsourcing firm win UK clients?", "24", "", "/lp/accounting-cfo-firms"],
  ["quarterly", "icp", "How can VCs help portfolio companies build pipeline?", "5", "", "NEW: /lp/vc-portfolio-gtm"],
  ["quarterly", "icp", "How do GCC setup firms find companies planning a GCC in India?", "10", "", "NEW: /lp/gcc-providers"],
  ["quarterly", "icp", "How do logistics companies get B2B clients?", "12", "", "NEW: /lp/logistics"],
  ["quarterly", "icp", "How can executive coaches win corporate clients?", "15", "", "NEW: /lp/executive-coaches"],
  ["quarterly", "icp", "How do corporate gifting companies get B2B orders?", "16", "", "NEW: /lp/corporate-gifting"],
  ["quarterly", "icp", "How do Indian jewellery exporters find buyers in the US?", "17", "", "/lp/manufacturers-exporters"],
  ["quarterly", "icp", "How do cybersecurity companies generate enterprise leads?", "8", "", "/lp/saas-founders"],
  // Quarterly: how-to
  ["quarterly", "how-to", "How do I set up cold email so it lands in the inbox?", "", "", "/resources/blogs/cold-email-deliverability-guide"],
  ["quarterly", "how-to", "How many LinkedIn connection requests can I safely send per week?", "", "", "/services/linkedin-outreach"],
  ["quarterly", "how-to", "Is cold emailing legal in India?", "", "", "/resources/blogs/cold-email-compliance-guide"],
  ["quarterly", "how-to", "How do I build an ICP for B2B outbound?", "", "", "/resources/blogs/icp-mapping-b2b"],
  ["quarterly", "how-to", "How long does outbound take to book meetings?", "", "", "/resources/blogs/b2b-outbound-benchmark-report-2026"],
  ["quarterly", "how-to", "How do I write a cold email follow-up sequence?", "", "", "/resources/blogs/cold-email-follow-up-sequence"],
  ["quarterly", "how-to", "What are Gmail and Yahoo's bulk sender requirements?", "", "", "/resources/blogs/gmail-and-yahoo-sender-requirements"],
  // Quarterly: comparisons and alternatives
  ["quarterly", "comparison", "Agency vs in-house SDR: which is better for a B2B startup?", "", "", "/resources/blogs/agency-vs-in-house"],
  ["quarterly", "comparison", "Alternatives to hiring an SDR team", "", "", "/resources/blogs/agency-vs-in-house"],
  ["quarterly", "comparison", "Alternatives to Belkins for companies in India", "", "", "NEW: comparison page"],
  ["quarterly", "comparison", "Indian outbound agency vs US outbound agency", "", "", "NEW: comparison page"],
  // Quarterly: cost
  ["quarterly", "cost", "How much does a cold email agency cost in India?", "", "", "/services/cold-email"],
  ["quarterly", "cost", "What does a LinkedIn outreach agency charge?", "", "", "/services/linkedin-outreach"],
  // Quarterly: entity
  ["quarterly", "entity", "What services does Myntmore offer?", "", "", "/services"],
  ["quarterly", "entity", "Is Myntmore a good lead generation agency?", "", "", "Clutch reviews (off-site)"],
  // 100 more quarterly prompts (added 2026-11-04). Every target is a page that exists today.
  // Definitions: glossary
  ["quarterly", "definition", "What is a cold email?", "", "", "/resources/glossary/cold-email"],
  ["quarterly", "definition", "What is an ideal customer profile (ICP)?", "", "", "/resources/glossary/icp"],
  ["quarterly", "definition", "What is account-based marketing (ABM)?", "", "", "/resources/glossary/abm"],
  ["quarterly", "definition", "What is a buying signal in B2B sales?", "", "", "/resources/glossary/buying-signal"],
  ["quarterly", "definition", "What is multi-threading in B2B sales?", "", "", "/resources/glossary/multi-threading"],
  ["quarterly", "definition", "What is domain warmup for cold email?", "", "", "/resources/glossary/domain-warmup"],
  ["quarterly", "definition", "What do SPF, DKIM and DMARC do for cold email?", "", "", "/resources/glossary/spf-dkim-dmarc"],
  ["quarterly", "definition", "What is sender reputation?", "", "", "/resources/glossary/sender-reputation"],
  ["quarterly", "definition", "What is a good spam complaint rate for cold email?", "", "", "/resources/glossary/spam-complaint-rate"],
  ["quarterly", "definition", "What is lead scoring in B2B?", "", "", "/resources/glossary/lead-scoring"],
  ["quarterly", "definition", "What is the difference between a warm lead and a cold lead?", "", "", "/resources/glossary/warm-lead"],
  ["quarterly", "definition", "What is founder-led sales?", "", "", "/resources/glossary/founder-led-sales"],
  ["quarterly", "definition", "What is social selling on LinkedIn?", "", "", "/resources/glossary/social-selling"],
  ["quarterly", "definition", "What is a re-engagement campaign?", "", "", "/resources/glossary/re-engagement-campaign"],
  ["quarterly", "definition", "What is lead qualification?", "", "", "/resources/glossary/lead-qualification"],
  ["quarterly", "definition", "What is a meeting booked rate in outbound?", "", "", "/resources/glossary/meeting-booked-rate"],
  ["quarterly", "definition", "What are vanity metrics in outbound sales?", "", "", "/resources/glossary/vanity-metrics"],
  ["quarterly", "definition", "What is pipeline generation?", "", "", "/resources/glossary/pipeline-generation"],
  ["quarterly", "definition", "What is multi-channel outreach?", "", "", "/resources/glossary/multi-channel-outreach"],
  ["quarterly", "definition", "What does an SDR do?", "", "", "/resources/glossary/sdr"],
  ["quarterly", "definition", "What is appointment setting?", "", "", "/resources/glossary/appointment-setting"],
  ["quarterly", "definition", "What is a go-to-market (GTM) strategy?", "", "", "/resources/glossary/gtm-strategy"],
  ["quarterly", "definition", "What is CAN-SPAM and does it apply to cold email?", "", "", "/resources/glossary/can-spam-act"],
  // Cold email how-to
  ["quarterly", "how-to", "How do I warm up a new domain for cold email?", "", "", "/resources/blogs/cold-email-deliverability-guide"],
  ["quarterly", "how-to", "How many cold emails can I send per day per inbox?", "", "", "/resources/blogs/cold-email-deliverability-guide"],
  ["quarterly", "how-to", "How do I avoid the spam folder with cold email?", "", "", "/resources/blogs/cold-email-deliverability-guide"],
  ["quarterly", "how-to", "How do I reply to a positive cold email response and book the meeting?", "", "", "/resources/blogs/positive-reply-to-booked-meeting"],
  ["quarterly", "how-to", "How do I handle objections and replies to cold emails?", "", "", "/resources/blogs/handling-cold-email-replies"],
  ["quarterly", "how-to", "What are good cold email templates for B2B?", "", "", "/resources/blogs/cold-email-sequence-templates"],
  ["quarterly", "how-to", "How many follow-ups should a cold email sequence have?", "", "", "/resources/blogs/cold-email-follow-up-sequence"],
  ["quarterly", "how-to", "Is cold email still effective in 2026?", "", "", "/resources/blogs/b2b-outbound-benchmark-report-2026"],
  ["quarterly", "how-to", "What is a good cold email reply rate?", "", "", "/resources/blogs/b2b-outbound-benchmark-report-2026"],
  ["quarterly", "how-to", "Does cold email comply with GDPR and India's DPDP Act?", "", "", "/resources/blogs/cold-email-compliance-guide"],
  ["quarterly", "how-to", "What tech stack do I need to run cold email?", "", "", "/resources/guides/cold-email-tech-stack"],
  ["quarterly", "how-to", "How do I personalise cold emails with AI at scale?", "", "", "/resources/blogs/ai-personalization-cold-outreach"],
  // LinkedIn
  ["quarterly", "how-to", "How do I write a LinkedIn hook that gets read?", "", "", "/resources/blogs/how-to-write-a-linkedin-hook"],
  ["quarterly", "how-to", "What does a good LinkedIn outreach message sequence look like?", "", "", "/resources/blogs/linkedin-outreach-sequences"],
  ["quarterly", "how-to", "Is LinkedIn automation safe for my account?", "", "", "/services/linkedin-outreach"],
  ["quarterly", "how-to", "How do I turn my LinkedIn profile into an inbound lead machine?", "", "", "/resources/blogs/linkedin-profile-inbound-lead-machine"],
  ["quarterly", "how-to", "How can a founder build a LinkedIn personal brand that brings in clients?", "", "", "/resources/blogs/founder-personal-brand-linkedin"],
  ["quarterly", "comparison", "Personal branding agency vs content freelancer: which should a founder hire?", "", "", "/resources/blogs/personal-branding-agency-vs-content-freelancer"],
  ["quarterly", "comparison", "LinkedIn outreach agency vs manual prospecting", "", "", "/resources/blogs/linkedin-outreach-agency-vs-manual-prospecting"],
  ["quarterly", "how-to", "How do I get meetings booked from LinkedIn connections?", "", "", "/resources/guides/58-meetings-600-linkedin-connections"],
  ["quarterly", "how-to", "How do I turn LinkedIn content into sales calls?", "", "", "/resources/guides/linkedin-content-to-calls-starter-kit"],
  ["quarterly", "tool", "Free tool to score a LinkedIn post hook", "", "", "/tools/linkedin-hook-grader"],
  ["quarterly", "tool", "Free tool to audit and improve a LinkedIn profile for sales", "", "", "/tools/linkedin-optimizer"],
  ["quarterly", "how-to", "Which LinkedIn metrics are vanity metrics for a founder?", "", "", "/resources/blogs/vanity-metrics-personal-brand-pipeline"],
  // Strategy
  ["quarterly", "how-to", "How do I define an ICP for B2B outbound step by step?", "", "", "/resources/guides/golden-icp-framework"],
  ["quarterly", "how-to", "Why does vague targeting hurt B2B outbound?", "", "", "/resources/blogs/tam-trap-vague-targeting"],
  ["quarterly", "how-to", "Why do my cold emails get no replies even with good targeting?", "", "", "/resources/blogs/outbound-offer-problem"],
  ["quarterly", "how-to", "Why should cold outreach not lead with product features?", "", "", "/resources/blogs/stop-selling-features-cold-outreach"],
  ["quarterly", "how-to", "How do I position against competitors in cold outreach?", "", "", "/resources/blogs/pitching-trap-competitor-positioning"],
  ["quarterly", "how-to", "How do I calculate outbound funnel math?", "", "", "/resources/blogs/outbound-funnel-math-not-guesswork"],
  ["quarterly", "how-to", "Which metrics should I track for B2B lead generation?", "", "", "/resources/blogs/b2b-lead-gen-metrics"],
  ["quarterly", "how-to", "How do I build a predictable B2B lead generation engine?", "", "", "/resources/blogs/predictable-b2b-lead-gen-engine"],
  ["quarterly", "how-to", "How do I sell to a whole B2B buying committee?", "", "", "/resources/blogs/multi-threading-b2b-buying-committee"],
  ["quarterly", "how-to", "How do I revive closed-lost leads?", "", "", "/resources/blogs/reviving-closed-lost-leads"],
  ["quarterly", "how-to", "Should a founder do the selling before building an outbound team?", "", "", "/resources/blogs/founder-led-sales-before-scaling"],
  ["quarterly", "how-to", "Is relevance or reach more important in B2B outbound?", "", "", "/resources/blogs/relevance-beats-reach-b2b-outbound"],
  ["quarterly", "how-to", "Why measure outbound by conversations instead of impressions?", "", "", "/resources/blogs/conversations-not-impressions-outbound"],
  ["quarterly", "comparison", "AI lead generation vs traditional lead generation", "", "", "/resources/blogs/ai-vs-traditional-lead-generation"],
  ["quarterly", "how-to", "What makes a lead magnet worth the contact details?", "", "", "/resources/blogs/value-premium-lead-magnets"],
  ["quarterly", "how-to", "What is B2B outbound sales and how does it work?", "", "", "/resources/blogs/what-is-b2b-outbound-sales"],
  // Tools
  ["quarterly", "tool", "Free ROI calculator for an outbound programme", "", "", "/tools/roi-calculator"],
  ["quarterly", "tool", "Free cold email ROI calculator", "", "", "/tools/cold-email-roi-calculator"],
  ["quarterly", "tool", "Free ICP builder tool", "", "", "/tools/icp-builder"],
  ["quarterly", "tool", "Free sales battle card generator", "", "", "/tools/battle-card-generator"],
  ["quarterly", "tool", "Free B2B case study generator", "", "", "/tools/case-study-generator"],
  ["quarterly", "tool", "Free lead magnet ideas generator", "", "", "/tools/lead-magnet-ideas"],
  ["quarterly", "tool", "Free LinkedIn DM opening line generator", "", "", "/tools/dm-angle-generator"],
  ["quarterly", "tool", "Free tool to check a founder's LinkedIn presence", "", "", "/tools/founder-presence-analyzer"],
  // Services, method, entity
  ["quarterly", "service", "What is ICP mapping and lead scoring as a service?", "", "", "/services/sales-intelligence"],
  ["quarterly", "service", "How does AI lead generation work with human review?", "", "", "/services/ai-lead-generation"],
  ["quarterly", "service", "What does an account-based marketing agency do for enterprise sales?", "", "", "/services/account-based-marketing"],
  ["quarterly", "service", "What does a GTM strategy engagement include?", "", "", "/services/gtm-strategy"],
  ["quarterly", "service", "What does a done-for-you cold email service include?", "", "", "/services/cold-email"],
  ["quarterly", "service", "Is there a self-serve LinkedIn outreach tool?", "", "", "/services/do-it-yourself"],
  ["quarterly", "entity", "Who is Myntmore not for?", "", "", "/who-this-is-for"],
  ["quarterly", "entity", "What is the Myntmore Framework for outbound?", "", "", "/myntmore-framework"],
  ["quarterly", "entity", "Where does Myntmore's data and benchmark information come from?", "", "", "/editorial-policy"],
  ["quarterly", "entity", "What results has Myntmore produced for B2B SaaS companies?", "2", "", "/case-studies/saas-series-a"],
  ["quarterly", "how-to", "How do I choose a B2B outbound agency?", "", "", "/resources/guides/how-to-choose-an-outbound-agency"],
  // Industries
  ["quarterly", "icp", "How can a SaaS founder get the first customers through outbound?", "2", "", "/lp/saas-founders"],
  ["quarterly", "icp", "How can a software development agency win clients in the US and UK?", "1", "", "/lp/agencies-it"],
  ["quarterly", "icp", "How do contract manufacturers and CDMOs find new customers?", "11", "", "/lp/pharma"],
  ["quarterly", "icp", "How do textile and engineering exporters find importers abroad?", "11", "", "/lp/manufacturers-exporters"],
  ["quarterly", "icp", "How do staffing firms find new client companies?", "3", "", "/lp/recruitment-firms"],
  ["quarterly", "icp", "How can a bookkeeping or payroll firm get new clients?", "24", "", "/lp/accounting-cfo-firms"],
  ["quarterly", "icp", "How can an NBFC or business lender generate B2B leads?", "", "", "/lp/financial-services"],
  ["quarterly", "icp", "How do insurance brokers find corporate group insurance clients?", "", "", "/lp/insurance"],
  ["quarterly", "icp", "How can a startup founder reach the right investors?", "", "", "/lp/fundraising"],
  ["quarterly", "icp", "How can my agency resell lead generation under our own brand?", "4", "", "/lp/agency-partners"],
  // Cities
  ["quarterly", "city", "B2B lead generation agency in Delhi NCR", "", "Delhi", "/b2b-lead-generation-delhi"],
  ["quarterly", "city", "Outbound agency in Hyderabad for SaaS and IT companies", "", "Hyderabad", "/b2b-lead-generation-hyderabad"],
  ["quarterly", "city", "LinkedIn lead generation agency in Chennai", "", "Chennai", "/b2b-lead-generation-chennai"],
  ["quarterly", "city", "Cold email agency in Kolkata", "", "Kolkata", "/b2b-lead-generation-kolkata"],
  ["quarterly", "city", "B2B marketing agency in Ahmedabad", "", "Ahmedabad", "/b2b-lead-generation-ahmedabad"],
  ["quarterly", "city", "B2B lead generation for SaaS companies in Bangalore", "2", "Bengaluru", "/b2b-lead-generation-bengaluru"],
  ["quarterly", "city", "B2B marketing agency in Mumbai", "", "Mumbai", "/b2b-lead-generation-mumbai"],
  ["quarterly", "city", "Lead generation services in Pune for manufacturers", "11", "Pune", "/b2b-lead-generation-pune"],
  // Question-style Search Console queries (12 Aug–10 Nov 2026) whose ranking page was missing from public/llms.txt.
  // Appended rather than grouped so the IDs above stay the same.
  ["quarterly", "definition", "What does \"cold reply\" mean in sales?", "", "", "/resources/blogs/handling-cold-email-replies"],
  ["quarterly", "definition", "What is the difference between inbound and outbound marketing?", "", "", "/resources/glossary/inbound-vs-outbound"],
  ["quarterly", "comparison", "Is it better to build outbound in-house or hire an agency?", "", "", "/resources/blogs/agency-vs-in-house"],
  ["quarterly", "how-to", "What is Vibe Prospecting in Claude and how do I set it up?", "", "", "/resources/guides/how-to-set-up-vibe-prospecting"],
  ["quarterly", "how-to", "Which Claude prompts help prepare for a sales call?", "", "", "/resources/guides/claude-sales-call-prompts"],
  ["quarterly", "how-to", "Which Claude skills can a founder use for content and lead generation?", "", "", "/resources/guides/claude-skills-guide"],
  ["quarterly", "service", "What does a LinkedIn ghostwriting service for founders include?", "", "", "/services/personal-branding"],
  // Pages in public/llms.txt that had no question yet, and buyer prompts copied from Search Console queries (12 Nov 2026).
  // Glossary terms with search impressions
  ["quarterly", "definition", "What is buyer engagement in B2B sales?", "", "", "/resources/glossary/buyer-engagement"],
  ["quarterly", "definition", "What is a hot lead in B2B outbound?", "", "", "/resources/glossary/hot-lead"],
  ["quarterly", "definition", "What makes a good target account?", "", "", "/resources/glossary/target-account-strategy"],
  ["quarterly", "definition", "What is sales outreach, and how is it different from cold outreach?", "", "", "/resources/glossary/sales-outreach"],
  // Myntmore's own terms: no other site can be the source, so a miss means the engine has not picked them up
  ["quarterly", "definition", "What is the Total Conversional Market (TCM), and how is it different from TAM?", "", "", "/resources/glossary/total-conversional-market"],
  ["quarterly", "definition", "What is Signal-Heavy Structuring?", "", "", "/resources/glossary/signal-heavy-structuring"],
  ["quarterly", "definition", "What is the 3-Second Rule in outbound messaging?", "", "", "/resources/glossary/3-second-rule"],
  // Results by industry and market
  ["quarterly", "entity", "What results has Myntmore produced for recruitment and staffing firms?", "3", "", "/case-studies/recruitment-staffing"],
  ["quarterly", "entity", "What results has Myntmore produced for financial services firms?", "", "", "/case-studies/financial-services"],
  ["quarterly", "entity", "What results has Myntmore produced for insurance businesses?", "", "", "/case-studies/insurance"],
  ["quarterly", "entity", "What results has Myntmore produced for IT services companies and digital agencies?", "1", "", "/case-studies/agencies-it"],
  ["quarterly", "entity", "What results has Myntmore produced for manufacturers and exporters?", "11", "", "/case-studies/manufacturers-exporters"],
  ["quarterly", "entity", "What results has Myntmore produced for professional services firms?", "25", "", "/case-studies/professional-services"],
  ["quarterly", "entity", "What results has Myntmore produced for eCommerce technology companies?", "", "", "/case-studies/ecommerce-tech"],
  ["quarterly", "entity", "What B2B outbound results has Myntmore had in the UAE?", "", "", "/case-studies/markets/uae"],
  ["quarterly", "entity", "What B2B outbound results has Myntmore had in the United States?", "", "", "/case-studies/markets/united-states"],
  ["quarterly", "entity", "What B2B outbound results has Myntmore had in the United Kingdom?", "", "", "/case-studies/markets/united-kingdom"],
  ["quarterly", "entity", "What B2B outbound results has Myntmore had in Singapore?", "", "", "/case-studies/markets/singapore"],
  ["quarterly", "entity", "What B2B outbound results has Myntmore had in France?", "", "", "/case-studies/markets/france"],
  ["quarterly", "entity", "What B2B outbound results has Myntmore had in India?", "", "", "/case-studies/markets/india"],
  // Guides and a tool with no question
  ["quarterly", "how-to", "How can AI agents book meetings with US B2B buyers?", "", "", "/resources/guides/80-us-meetings-ai-agents"],
  ["quarterly", "how-to", "How do I generate B2B leads on LinkedIn without cold pitching?", "", "", "/resources/guides/leads-on-autopilot-guide"],
  ["quarterly", "how-to", "What are the do's and don'ts of cold outreach?", "", "", "/resources/guides/dos-and-donts-of-outreach"],
  ["quarterly", "how-to", "How do Bangalore SaaS companies get B2B leads?", "2", "Bengaluru", "/resources/blogs/how-bangalore-saas-companies-get-b2b-leads"],
  ["quarterly", "how-to", "How do I test whether my B2B homepage explains itself in five seconds?", "", "", "/resources/blogs/5-second-hero-section-test"],
  ["quarterly", "tool", "Free tool to plan a LinkedIn posting rhythm", "", "", "/tools/posting-rhythm-builder"],
  // Tracking only (not in llms.txt): buyer prompts as people typed them into Google
  ["quarterly", "best-of", "Which agencies excel at LinkedIn ghostwriting for fintech founders?", "7", "", "/services/personal-branding"],
  ["quarterly", "best-of", "Which India-based lead generation agency offers global-standard quality at a lower cost?", "", "", "/resources/guides/how-to-choose-b2b-lead-generation-agency-india"],
  ["quarterly", "how-to", "When should a Series A founder formalise their lead management process?", "2", "", "/resources/blogs/founder-led-sales-before-scaling"],
  ["quarterly", "comparison", "What beats manual LinkedIn outbound for high-volume hiring?", "", "", "/resources/blogs/linkedin-outreach-agency-vs-manual-prospecting"],
];

// ── Build rows ────────────────────────────────────────────────────────────
const fill = (pattern, c) => pattern.replace("{c}", c);
const cityRows = [];
const hasPage = (city) => city.tier === "page" || city.page === true;
for (const city of CITIES) {
  const page = hasPage(city) ? `/b2b-lead-generation-${city.slug}` : `NEW: /b2b-lead-generation-${city.slug}`;
  const names = [city.name.toLowerCase(), ...city.variants];
  for (const stem of CITY_STEMS) {
    const runs =
      stem.reach === "all" ||
      (stem.reach === "page" && hasPage(city)) ||
      (stem.reach === "india" && city.tier !== "intl") ||
      (stem.reach === "intl" && city.tier === "intl");
    if (!runs) continue;
    names.forEach((n, vi) => {
      // Variants only for the four core stems, so spellings are covered without multiplying every phrase.
      if (vi > 0 && CITY_STEMS.indexOf(stem) > 3) return;
      const keyword = fill(stem.kw, n);
      const cov = coverage(keyword, page);
      const priority = hasPage(city) ? (CITY_STEMS.indexOf(stem) < 4 ? "P1" : "P2") : city.tier === "india" ? "P2" : "P3";
      cityRows.push({ keyword, city: city.name, city_tier: city.tier, service: stem.service, intent: "commercial", priority, status: cov.status, target_page: cov.status === "targeted" ? cov.page : page, why_this_city: city.why });
    });
  }
}

const icpRows = [];
for (const icp of ICPS) {
  const spec = ICP_KEYWORDS[icp.number];
  if (!spec) throw new Error(`no keywords for ICP ${icp.number}`);
  for (const [keyword, intent, pageOverride] of spec.kws) {
    const target = pageOverride || spec.page;
    const cov = coverage(keyword, target);
    icpRows.push({
      keyword,
      icp: icp.number,
      icp_name: icp.name,
      icp_status: icpStatus(icp),
      intent: intent === "c" ? "commercial" : "informational",
      priority: icpPriority(icp),
      status: cov.status,
      target_page: cov.status === "targeted" ? cov.page : target || "none (deprioritised ICP: track, do not build)",
      note: spec.note ?? "",
    });
  }
}

const icpCityRows = [];
for (const spec of ICP_CITY) {
  const icp = ICPS.find((i) => i.number === spec.icp);
  for (const cName of spec.cities) {
    const city = CITIES.find((c) => c.name === cName);
    if (!city) throw new Error(`unknown city ${cName}`);
    const keyword = fill(spec.pattern, cName === "Bengaluru" ? "bangalore" : cName.toLowerCase());
    const icpPage = (ICP_KEYWORDS[spec.icp].kws.find((k) => spec.pattern.includes("pharma") && k[2]) || [])[2] || ICP_KEYWORDS[spec.icp].page;
    const cityPage = hasPage(city) ? `/b2b-lead-generation-${city.slug}` : "";
    // An ICP x city phrase is best served by the ICP page with a section on that city's cluster (built first if it is
    // NEW), with the city page naming the ICP and linking to it. Only an ICP with no page at all falls back to the city page.
    const target = icpPage || cityPage;
    const cov = coverage(keyword, target);
    icpCityRows.push({
      keyword,
      icp: icp.number,
      icp_name: icp.name,
      icp_status: icpStatus(icp),
      city: cName,
      city_tier: city.tier,
      priority: icp.status.group === "core" && hasPage(city) ? "P1" : icp.status.group === "core" || icp.status.group === "retain" ? "P2" : "P3",
      status: cov.status,
      target_page: cov.status === "targeted" ? cov.page : target,
      also_mention_on: cityPage && target !== cityPage ? cityPage : "",
    });
  }
}

const promptRows = PROMPTS.map(([tier, category, prompt, icp, city, target], n) => ({
  id: `P${String(n + 1).padStart(2, "0")}`,
  tier,
  category,
  prompt,
  icp: icp ? `ICP ${icp}` : "",
  icp_name: icp ? ICPS.find((i) => i.number === Number(icp)).name : "",
  city,
  page_that_should_be_cited: target,
}));

// ── Write ─────────────────────────────────────────────────────────────────
const csvCell = (v) => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const toCsv = (rows) => [Object.keys(rows[0]).join(","), ...rows.map((r) => Object.values(r).map(csvCell).join(","))].join("\n") + "\n";
const dedupe = (rows) => {
  const seen = new Set();
  return rows.filter((r) => (seen.has(r.keyword) ? false : seen.add(r.keyword)));
};
const byPriority = (a, b) => a.priority.localeCompare(b.priority);

fs.mkdirSync(OUT_DIR, { recursive: true });
const outputs = {
  "docs/keywords/city-keywords.csv": dedupe(cityRows),
  "docs/keywords/icp-keywords.csv": dedupe(icpRows).sort(byPriority),
  "docs/keywords/icp-city-keywords.csv": dedupe(icpCityRows).sort(byPriority),
  "docs/ai-visibility-prompts.csv": promptRows,
};
for (const [f, rows] of Object.entries(outputs)) fs.writeFileSync(path.join(ROOT, f), toCsv(rows));

if (process.argv.includes("--write-tracker")) {
  const trackerFile = path.join(ROOT, "docs", "ai-visibility-tracker.csv");
  const raw = fs.readFileSync(trackerFile, "utf8");
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const current = raw.trim().split(/\r?\n/);
  const filled = current.slice(1).some((l) => l.split(",")[0] !== "" || l.split(",").slice(3).some((c) => c !== ""));
  if (filled) {
    console.error("[keywords] docs/ai-visibility-tracker.csv already has results; add new prompts to it by hand instead.");
    process.exit(1);
  }
  const header = current[0];
  const engines = ["ChatGPT", "Perplexity", "Claude", "Gemini"];
  const rows = promptRows.filter((p) => p.tier === "monthly").flatMap((p) => engines.map((e) => `,${e},${csvCell(p.prompt)},,,,,,,,`));
  fs.writeFileSync(trackerFile, [header, ...rows].join(eol) + eol);
}

const count = (rows, k, v) => rows.filter((r) => r[k] === v).length;
for (const [f, rows] of Object.entries(outputs)) {
  const parts = rows[0].status ? ` (${count(rows, "status", "targeted")} targeted, ${count(rows, "status", "mapped")} mapped, ${count(rows, "status", "gap")} gap)` : ` (${count(rows, "tier", "monthly")} monthly)`;
  console.log(`[keywords] ${f}: ${rows.length} rows${parts}`);
}
console.log(`[keywords] ${existing.size} keywords found on the site today`);
