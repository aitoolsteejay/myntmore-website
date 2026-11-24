// Build rules for content entries, shared by the page generators (scripts/generate-*.mjs) and the
// content admin (/admin). Each generator checks its files with these rules and the build fails on
// any problem; the admin runs the same rules before it commits, so a save the admin accepts is one
// the build accepts. Edit a rule here and both follow.
//
// A rule set takes the entry's JSON (with `slug` set to its file name) and a context for checks
// that look at other files, and returns a list of problems:
//   { field: "stats" | null, message: '"stats" must have exactly 4 items' }
// `field` is the top-level key the problem is about (null when it is about the whole entry), so
// the admin can show it next to that field. Messages are written without the file name; the
// generators print them as `<file>: <message>`.

/**
 * @typedef {{ field: string | null, message: string }} Problem
 * @typedef {{
 *   caseStudyPageExists: (slug: string) => boolean | Promise<boolean>,
 *   pageExists: (route: string) => boolean | Promise<boolean>,
 *   cityPageExists: (slug: string) => boolean | Promise<boolean>,
 *   industryKeys: Set<string>,
 *   longCaseComponentExists: (slug: string) => boolean | Promise<boolean>,
 * }} RuleContext
 */

const SUFFIX = " | Myntmore";
const problem = (field, message) => ({ field, message });
const required = (d, keys) => keys.filter((k) => !d[k]).map((k) => problem(k, `"${k}" is empty`));
const exactly = (d, k, n) => (!Array.isArray(d[k]) || d[k].length !== n ? [problem(k, `"${k}" must have exactly ${n} items`)] : []);
const emDash = (d) => {
  const raw = JSON.stringify(d);
  return raw.includes("\u2014") || raw.includes("&mdash;") ? [problem(null, "contains an em dash")] : [];
};

// ── Case study library (content/case-studies) ─────────────────────────────

export const INDUSTRIES = ["Pharma", "SaaS", "Professional Services", "eCommerce Tech", "B2B Founder", "Agencies & IT", "Financial Services", "Insurance", "Manufacturers & Exporters", "Recruitment & Staffing"];

// How each industry reads inside a keyword phrase ("b2b lead generation for pharma companies").
// The /case-studies/<industry> pages read this too, through lib/case-study-library.ts.
export const AUDIENCES = {
  Pharma: "pharma companies",
  SaaS: "saas companies",
  "Professional Services": "professional services firms",
  "eCommerce Tech": "ecommerce tech companies",
  "B2B Founder": "b2b founders",
  "Agencies & IT": "agencies and it services firms",
  "Financial Services": "financial services firms",
  Insurance: "insurance companies",
  "Manufacturers & Exporters": "manufacturers and exporters",
  "Recruitment & Staffing": "recruitment and staffing firms",
};

export const CASE_STUDY_KEYS = ["n", "industry", "segment", "slug", "title", "challenge", "solution", "results"];

// The meta description: the title plus up to three of the case's own numeric results that the
// title doesn't already state, sized to land between 120 and 155 characters (Google cuts most descriptions past about 155).
const lead = (s) => (s.match(/^[₹$]?\d[\d.,]*\+?x?/) || [""])[0].toLowerCase();
/** @returns {string | null} null when no description between 120 and 155 characters can be made. */
export function caseStudyMetaDescription(c) {
  const words = new Set(c.title.toLowerCase().split(/\s+/));
  if (/^doubling/i.test(c.title)) words.add("2x");
  if (/^tripling/i.test(c.title)) words.add("3x");
  const items = c.results.map((r) => r.replace(/\.$/, "")).filter((r) => lead(r) && !words.has(lead(r)));
  const join = (xs) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} and ${xs.at(-1)}` : xs[0]);
  const tails = [` A Myntmore ${c.industry} case study.`, ` The challenge, approach and results from a Myntmore ${c.industry} case study.`];
  let best = null;
  for (let n = 0; n <= Math.min(3, items.length); n++) {
    for (const tail of tails) {
      const s = n ? `${c.title}: ${join(items.slice(0, n))}.${tail}` : `${c.title}.${tail}`;
      if (s.length > 155) continue;
      // Prefer: in range, then more results, then the shorter tail.
      const score = (s.length >= 120 ? 1000 : 0) + n * 100 + (tail === tails[0] ? 10 : 0);
      if (!best || score > best.score) best = { s, score };
    }
  }
  return best && best.s.length >= 120 ? best.s : null;
}

export function caseStudyKeywords(c) {
  const seg = c.segment.toLowerCase();
  const aud = AUDIENCES[c.industry];
  const text = [c.challenge, ...c.solution].join(" ").toLowerCase();
  return [
    `${seg} lead generation`,
    `${seg} case study`,
    `b2b lead generation for ${aud}`,
    `${c.industry.toLowerCase().replace(" & ", " and ")} outbound case study`,
    ...(text.includes("linkedin") ? [`linkedin outreach for ${aud}`] : []),
    ...(/\bemail/.test(text) ? [`cold email for ${aud}`] : []),
  ];
}

// Keep in step with libraryMetaTitle / libraryMetaDescription in lib/case-study-library.ts.
// The admin can set its own search title; otherwise "<client type> Case Study".
export const caseStudyMetaTitle = (c) => c.metaTitle || `${c.segment} Case Study`;
// og:site_name already carries the brand, and X cuts card titles at 70 characters.
export const caseStudyOgTitle = (c) => (c.title.length <= 70 ? c.title : `${caseStudyMetaTitle(c)}${SUFFIX}`);

function caseStudies(d) {
  const out = CASE_STUDY_KEYS.filter((k) => d[k] === undefined || d[k] === "" || (Array.isArray(d[k]) && !d[k].length)).map((k) => problem(k, `"${k}" is empty`));
  if (out.length) return out;
  if (!INDUSTRIES.includes(d.industry)) return [problem("industry", `unknown industry "${d.industry}"`)];
  const metaTitle = (d.metaTitle || "").trim();
  const description = (d.metaDescription || "").trim() || caseStudyMetaDescription(d);
  if (!description) return [problem("metaDescription", "no meta description between 120 and 155 characters can be made from the title and results; write one")];
  const c = { ...d, metaTitle };
  if (caseStudyMetaTitle(c).length + SUFFIX.length > 60) out.push(problem("metaTitle", `meta title is ${caseStudyMetaTitle(c).length + 11} characters, over 60`));
  if (description.length < 120 || description.length > 155) out.push(problem("metaDescription", `meta description is ${description.length} characters, outside 120 to 155`));
  if (caseStudyOgTitle(c).length > 70) out.push(problem("title", `og:title is ${caseStudyOgTitle(c).length} characters, over 70`));
  return out;
}

// ── Other content types ──────────────────────────────────────────────────

export const LANDING_COUNTS = { stats: 4, pain: 3, flowTop: 3, flowParallel: 3, flowBottom: 3, process: 4 };

function landingPages(d) {
  const out = Object.entries(LANDING_COUNTS).flatMap(([k, n]) => exactly(d, k, n));
  const style = d.trackStyle || "counters";
  if (style === "counters" && (!Array.isArray(d.track) || d.track.length !== 4)) out.push(problem("track", `"track" must have exactly 4 items when the results style is "counters"`));
  if (style === "case-cards" && (!Array.isArray(d.caseCards) || d.caseCards.length !== 3)) out.push(problem("caseCards", `"caseCards" must have exactly 3 items when the results style is "case-cards"`));
  if (!Array.isArray(d.whyCards) || ![0, 3].includes(d.whyCards.length)) out.push(problem("whyCards", `"whyCards" must have exactly 3 items, or none`));
  if (!Array.isArray(d.scenarios) || ![0, 3].includes(d.scenarios.length)) out.push(problem("scenarios", `"scenarios" must have exactly 3 items, or none`));
  const nIcons = d.floaterLayout === "four" || !d.floaterLayout ? 4 : 3;
  if (!Array.isArray(d.floatingIcons) || d.floatingIcons.length !== nIcons) out.push(problem("floatingIcons", `"floatingIcons" must have exactly ${nIcons} items for the "${d.floaterLayout || "four"}" layout`));
  if (d.metaTitle && d.metaTitle.length + SUFFIX.length > 60) out.push(problem("metaTitle", `search title is ${d.metaTitle.length + 11} characters with the site suffix, over 60`));
  if (d.metaDescription && d.metaDescription.length > 155) out.push(problem("metaDescription", `search description is ${d.metaDescription.length} characters, over 155`));
  return out;
}

export const CITY_REQUIRED = ["metaTitle", "metaDescription", "ogTitle", "ogDescription", "breadcrumbLabel", "badge", "h1", "intro", "primaryCta", "secondaryCta", "whyTitle", "servicesTitle", "servicesIntro", "diffTitle", "formTitle", "formSubtitle"];

// Search and share text limits, the same as the weekly SEO crawl checks (scripts/seo-crawl.py).
const searchLimits = (d) => [
  ...(d.metaDescription && d.metaDescription.length > 155 ? [problem("metaDescription", `search description is ${d.metaDescription.length} characters, over 155`)] : []),
  ...(d.ogTitle && d.ogTitle.length > 70 ? [problem("ogTitle", `share title is ${d.ogTitle.length} characters, over 70`)] : []),
];

async function cityPages(d, ctx) {
  const out = [...required(d, CITY_REQUIRED), ...searchLimits(d)];
  for (const [k, n] of [["why", 3], ["services", 7], ["differentiators", 4]]) out.push(...exactly(d, k, n));
  if (!Array.isArray(d.proof)) out.push(problem("proof", `"proof" must be a list (empty hides the block)`));
  else {
    if (d.proof.length && !d.proofTitle) out.push(problem("proofTitle", `"proofTitle" is empty`));
    for (const p of d.proof) {
      const m = /^\/case-studies\/([a-z0-9-]+)$/.exec(p.href || "");
      if (!m || !(await ctx.caseStudyPageExists(m[1]))) out.push(problem("proof", `proof link ${p.href} is not a case study page`));
    }
  }
  if (Array.isArray(d.segments) && d.segments.length && d.segments.length !== 3) out.push(problem("segments", `"segments" must have exactly 3 items, or none`));
  return out;
}

export const INDUSTRY_CITY_REQUIRED = ["citySlug", "cityName", "industrySlug", "industryName", "metaTitle", "metaDescription", "ogTitle", "ogDescription", "badge", "emoji", "h1", "intro", "primaryCta", "secondaryCta", "whyTitle", "buyersTitle", "buyersIntro", "segmentsTitle", "segmentsIntro", "proofTitle", "proofIntro", "proofNote", "stepsTitle", "servicesTitle", "servicesIntro", "diffTitle", "formTitle", "formSubtitle"];

async function industryCityPages(d, ctx) {
  const out = [...emDash(d), ...required(d, INDUSTRY_CITY_REQUIRED)];
  if (!ctx.industryKeys.has(d.industrySlug)) out.push(problem("industrySlug", `industrySlug "${d.industrySlug}" is not in lib/industry-keys.json`));
  if (!(await ctx.cityPageExists(d.citySlug))) out.push(problem("citySlug", `citySlug "${d.citySlug}" does not match a file in content/city-pages/`));
  if (d.industryLpHref && !(await ctx.pageExists(d.industryLpHref))) out.push(problem("industryLpHref", `industryLpHref "${d.industryLpHref}" is not a valid page`));
  for (const [k, n] of [["why", 3], ["segments", 3], ["steps", 4], ["services", 6], ["differentiators", 4]]) out.push(...exactly(d, k, n));
  if (!Array.isArray(d.buyers) || d.buyers.length < 4) out.push(problem("buyers", `"buyers" must have at least 4 items`));
  if (!Array.isArray(d.faqs) || d.faqs.length < 4) out.push(problem("faqs", `"faqs" must have at least 4 items`));
  if (!Array.isArray(d.proof) || d.proof.length < 2) out.push(problem("proof", `"proof" must have at least 2 verified case studies`));
  else {
    for (const p of d.proof) {
      const m = /^\/case-studies\/([a-z0-9-]+)$/.exec(p.href || "");
      if (!m || !(await ctx.caseStudyPageExists(m[1]))) out.push(problem("proof", `proof link ${p.href} is not a real case study page`));
    }
  }
  out.push(...searchLimits(d));
  return out;
}

export const EVENT_REQUIRED = ["title", "breadcrumbLabel", "tag", "format", "accent", "date", "startTime", "endTime", "cardDescription", "description", "metaTitle", "metaDescription"];

function events(d) {
  const out = [...emDash(d), ...required(d, EVENT_REQUIRED)];
  if (!/^[a-z0-9-]+$/.test(d.slug)) out.push(problem("slug", "the file name must be lowercase letters, numbers and hyphens"));
  if (d.date && !/^\d{4}-\d{2}-\d{2}$/.test(d.date)) out.push(problem("date", `"date" must look like 2026-09-19`));
  for (const k of ["startTime", "endTime"]) if (d[k] && !/^([01]\d|2[0-3]):[0-5]\d$/.test(d[k])) out.push(problem(k, `"${k}" must be 24-hour time like 13:00`));
  if (d.startTime && d.endTime && d.endTime <= d.startTime) out.push(problem("endTime", "the end time must be after the start time"));
  if (d.accent && !/^#[0-9a-fA-F]{6}$/.test(d.accent)) out.push(problem("accent", `"accent" must be a hex colour like #8b5cf6`));
  if (d.metaTitle && d.metaTitle.length > 49) out.push(problem("metaTitle", `search title is ${d.metaTitle.length} characters; the site adds " | Myntmore", so keep it to 49`));
  if (d.showPopup && !d.registrationUrl) out.push(problem("registrationUrl", "the pop-up is switched on but there is no registration link"));
  return out;
}

export const CAREER_REQUIRED = ["title", "slug", "tag", "validThrough", "datePosted", "schemaDescription", "metaTitle", "metaDescription"];
const careers = (d) => [...required(d, CAREER_REQUIRED), ...searchLimits(d)];

export const GLOSSARY_REQUIRED = ["title", "tag", "accent", "tagline", "excerpt", "definition", "sourceLabel", "sourceHref", "schemaDescription", "metaTitleSuffix", "ogTitleSuffix", "metaDescription"];

function glossaryTerms(d) {
  const out = required(d, GLOSSARY_REQUIRED);
  const sections = d.sections ?? [];
  if (!d.body && !sections.length) out.push(problem("body", `needs a supporting paragraph ("body") or at least one section`));
  for (const sec of sections) {
    if (!sec.heading) out.push(problem("sections", "a section has no heading"));
    if (!(sec.paragraphs?.length || sec.steps?.length || sec.table?.rows?.length)) out.push(problem("sections", `section "${sec.heading}" is empty`));
    for (const row of sec.table?.rows ?? []) if (row.cells.length !== sec.table.columns.length) out.push(problem("sections", `section "${sec.heading}": row "${row.label}" must have ${sec.table.columns.length} cells`));
  }
  if (d.metaDescription && d.metaDescription.length > 160) out.push(problem("metaDescription", `search description is ${d.metaDescription.length} characters, over 160`));
  return out;
}

export const GUIDE_REQUIRED = ["title", "tag", "accent", "readTime", "excerpt", "intro", "metaTitle", "metaDescription", "datePublished"];

function resourceGuides(d) {
  const out = required(d, GUIDE_REQUIRED);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.slug ?? "")) out.push(problem("slug", "the guide address must be lowercase letters, numbers and hyphens"));
  if (d.accent && !/^#[0-9a-fA-F]{6}$/.test(d.accent)) out.push(problem("accent", `"accent" must be a hex colour like #EA580C`));
  if (d.metaTitle && d.metaTitle.length > 49) out.push(problem("metaTitle", `search title is ${d.metaTitle.length} characters; the site adds " | Myntmore", so keep it to 49`));
  if (d.metaDescription && d.metaDescription.length > 160) out.push(problem("metaDescription", `search description is ${d.metaDescription.length} characters, over 160`));
  const sections = d.sections ?? [];
  if (!sections.length) out.push(problem("sections", "a guide needs at least one section"));
  for (const sec of sections) {
    if (!sec.heading) out.push(problem("sections", "a section has no heading"));
    if (!(sec.paragraphs?.length || sec.steps?.length || sec.copyBlocks?.length || sec.table?.rows?.length)) out.push(problem("sections", `section "${sec.heading}" is empty`));
    for (const row of sec.table?.rows ?? []) if (row.cells.length !== sec.table.columns.length) out.push(problem("sections", `section "${sec.heading}": row "${row.label}" must have ${sec.table.columns.length} cells`));
  }
  const cta = [d.ctaHeading, d.ctaText, d.ctaButtonLabel, d.ctaButtonHref];
  if (cta.some(Boolean) && !cta.every(Boolean)) out.push(problem("ctaHeading", "the call-to-action box needs all four parts (heading, text, button label, button address), or none"));
  if (d.ctaButtonHref && !d.ctaButtonHref.startsWith("/") && !/^https?:\/\//.test(d.ctaButtonHref)) out.push(problem("ctaButtonHref", `"ctaButtonHref" must start with / or https://`));
  for (const l of d.relatedLinks ?? []) if (!String(l.href ?? "").startsWith("/")) out.push(problem("relatedLinks", `related link "${l.label}" must start with /`));
  out.push(...emDash(d));
  return out;
}

export const CASE_DETAIL_REQUIRED = ["metaTitle", "metaDescription", "ogTitle", "ogDescription", "schemaHeadline", "schemaDescription", "datePublished", "dateModified", "tag", "accent", "title", "intro", "challengeTitle", "approachTitle", "outcomeTitle", "outcomeBody", "roleBody", "industry", "indexTitle", "excerpt"];

function caseStudyPages(d) {
  const out = [...required(d, CASE_DETAIL_REQUIRED), ...exactly(d, "heroStats", 3)];
  for (const k of ["challengeBody", "approachBody", "metrics", "services", "indexStats"]) if (!Array.isArray(d[k]) || !d[k].length) out.push(problem(k, `"${k}" is empty`));
  if (d.metaTitle && d.metaTitle.length + SUFFIX.length > 60) out.push(problem("metaTitle", `search title is ${d.metaTitle.length + 11} characters with the site suffix, over 60`));
  return out;
}

function servicePages(d) {
  const out = [];
  if (d.metaTitle && d.metaTitle.length + SUFFIX.length > 60) out.push(problem("metaTitle", `search title is ${d.metaTitle.length + 11} characters with the site suffix, over 60`));
  if (d.metaDescription && d.metaDescription.length > 160) out.push(problem("metaDescription", `search description is ${d.metaDescription.length} characters, over 160`));
  return out;
}

function pageSeo(d) {
  const out = [];
  if (typeof d.path !== "string" || !d.path.startsWith("/")) out.push(problem("path", `"path" must start with /`));
  if (!d.title?.trim()) out.push(problem("title", `"title" is empty`));
  if (!d.description?.trim()) out.push(problem("description", `"description" is empty`));
  return out;
}

const faqItem = (field) => (i) => (!i?.question || !i?.answer ? [problem(field, `FAQ missing question or answer: ${i?.question ?? ""}`)] : []);
const homepageFaqs = (d) => faqItem("answer")(d);
function pageFaqs(d) {
  if (!d.items || !d.items.length) return [problem("items", "this page has no questions; add at least one")];
  return d.items.flatMap(faqItem("items"));
}

// Market pages (content/market-pages): one per market the site knows (lib/case-study-markets.ts).
export const MARKETS = ["uae", "united-states", "united-kingdom", "singapore", "france", "india"];
export const MARKET_REQUIRED = ["heroLead", "heroUnderlined", "intro", "playsTitle", "rulesTitle", "rulesBody", "timingTitle", "timingBody"];

async function marketPages(d, ctx) {
  const isPage = async (href) => /^\/[a-z0-9/-]+$/.test(href) && (await ctx.pageExists(href));
  const out = [];
  if (!MARKETS.includes(d.slug)) out.push(problem("slug", `"${d.slug}" is not a market the site knows; add it to lib/case-study-markets.ts and lib/market-pages.ts first`));
  out.push(...emDash(d), ...required(d, MARKET_REQUIRED));
  if (!d.audiences?.length) out.push(problem("audiences", `needs at least one "who this is for" card`));
  if (!d.plays?.length) out.push(problem("plays", "needs at least one play"));
  for (const p of d.plays ?? []) {
    if (!/^\/case-studies\/[a-z0-9-]+$/.test(p.href ?? "") || !(await isPage(p.href))) out.push(problem("plays", `play "${p.title}" links to ${p.href}, which is not a case study page`));
  }
  for (const l of d.industryLinks ?? []) if (!(await isPage(l.href ?? ""))) out.push(problem("industryLinks", `industry link ${l.href} is not a page`));
  if (![null, "uae", "india", "market", "none"].includes(d.cities ?? null)) out.push(problem("cities", `"cities" must be uae, india, market or none`));
  return out;
}

export const CASE_LONG_REQUIRED = ["metaTitle", "metaDescription", "ogTitle", "ogDescription", "schemaHeadline", "schemaDescription", "datePublished", "dateModified"];

async function caseLong(d, ctx) {
  const out = required(d, CASE_LONG_REQUIRED);
  if (!Array.isArray(d.keywords)) out.push(problem("keywords", `"keywords" must be a list`));
  if (!(await ctx.longCaseComponentExists(d.slug))) out.push(problem(null, `components/case-studies/long/${d.slug}.tsx is missing`));
  return out;
}

/**
 * Pages whose template reads a Page FAQs file by name (lib/page-faqs.ts throws, and the build fails, if
 * it is missing): content type key → FAQ file prefix. A new entry needs content/faqs/pages/<prefix><slug>.json.
 */
export const COMPANION_FAQS = { landingPages: "lp-", cityPages: "city-", marketPages: "market-" };

/**
 * Types whose pages use the entry's name as its id (e.g. pageFaqsQA(`lp-${d.slug}`)), so the name in the
 * file must be the file name itself. Keystatic's slug field allows them to differ; the site does not.
 */
export const NAME_IS_FILE_NAME = ["landingPages", "servicePages", "cityPages", "industryCityPages", "events", "marketPages", "caseStudyPages", "caseStudies", "glossaryTerms", "careers", "resourceGuides"];

/** The name check above, on the file's own JSON (before `slug` is set to the file name). */
export function nameProblems(typeKey, json, fileSlug) {
  if (!NAME_IS_FILE_NAME.includes(typeKey) || json.slug === fileSlug) return [];
  return [problem("slug", `the name must be the same as the file name ("${fileSlug}"); the page uses it to find its FAQs and links`)];
}

/** Types where two entries may not share a name: the build refuses a second search title for one path. */
export const UNIQUE_NAMES = { pageSeo: "path" };

export const CALENDAR_REQUIRED = ["name", "client", "embedUrl", "badge", "heading", "description", "canonicalPath", "metaTitle", "metaDescription"];
const calendarPages = (d) => required(d, CALENDAR_REQUIRED);

export const TEAM_CARD_REQUIRED = ["name", "role", "photoSrc", "photoAlt", "vCardHref", "whatsappUrl", "linkedinUrl", "metaTitle", "metaDescription"];
const teamCards = (d) => required(d, TEAM_CARD_REQUIRED);

/** Rule sets by Keystatic content type key. Types not listed have no build rules beyond the schema. */
export const RULES = {
  caseStudies,
  landingPages,
  cityPages,
  industryCityPages,
  events,
  careers,
  glossaryTerms,
  resourceGuides,
  caseStudyPages,
  servicePages,
  pageSeo,
  homepageFaqs,
  pageFaqs,
  marketPages,
  calendarPages,
  teamCards,
};

/** The long-form case study singletons (caseLong<Name>) share one rule set; their slug is the file name. */
export function rulesFor(typeKey) {
  if (RULES[typeKey]) return RULES[typeKey];
  if (typeKey.startsWith("caseLong")) return caseLong;
  return null;
}

/**
 * Check one entry. `data` is the entry's JSON with `slug` set to its file name.
 * @param {string} typeKey
 * @param {Record<string, any>} data
 * @param {RuleContext} ctx
 * @returns {Promise<Problem[]>}
 */
export async function checkEntry(typeKey, data, ctx) {
  const rules = rulesFor(typeKey);
  return rules ? await rules(data, ctx) : [];
}
