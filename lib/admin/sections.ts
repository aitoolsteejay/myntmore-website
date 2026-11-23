// Splits a content type's fields into the sections of the page they belong to, in page order, so the
// form reads like the page: "Top of the page", "Stats", "How it works"… Settings that are rarely
// changed (Google and sharing, design options, the page address) go into closed sections at the end.
//
// Types without a section list below get one section per group of fields (each top-level group field,
// e.g. "Hero", becomes its own section), so every type benefits.

export interface Section {
  id: string;
  title: string;
  help?: string;
  keys: string[];
  /** Rarely edited: shown closed, after the page's own text. */
  kind: "content" | "settings";
}

type Rule = { title: string; help?: string; match: string[] };

// "word*" matches every key starting with word; anything else must match exactly.
const matches = (key: string, pats: string[]) => pats.some((p) => (p.endsWith("*") ? key.startsWith(p.slice(0, -1)) : key === p));

const SEO: Rule = {
  title: "Google and social sharing",
  help: "How this page appears in Google results and when the link is shared on LinkedIn or WhatsApp. Not shown on the page itself.",
  match: ["metaTitle*", "metaDescription", "keywords", "ogTitle*", "ogDescription", "breadcrumbLabel", "schema*", "structuredData", "howToName", "datePublished", "dateModified", "indexAliases", "employmentType", "salary*", "datePosted", "validThrough"],
};
const DESIGN: Rule = {
  title: "Design options",
  help: "Layout and decoration choices. Usually best left as they are.",
  match: ["badgeEffect", "h1BreakAfter", "underlineWidth", "floaterLayout", "heroDecoration", "floatingIcons", "emoji", "accent", "colors", "grid"],
};
const ADVANCED: Rule = {
  title: "Page address and links to other pages",
  help: "Technical settings that connect this page to others.",
  match: ["slug", "citySlug", "industrySlug", "industryLpHref", "industryLpLabel", "indexOrder", "n", "applySubject", "page", "path", "question", "order"],
};

const TYPE_SECTIONS: Record<string, Rule[]> = {
  landingPages: [
    { title: "Top of the page", help: "Badge, headline, intro and buttons", match: ["badge", "h1*", "heroSubheading", "primaryCta", "secondaryCta", "heroNote"] },
    { title: "Stats row", match: ["statsCaption", "stats"] },
    { title: "Problem section", match: ["pain*"] },
    { title: "Flow diagram", match: ["flow*"] },
    { title: "How it works", match: ["process*"] },
    { title: "Results and track record", match: ["trackStyle", "caseCards", "track*"] },
    { title: "Scenario cards", help: "Leave every field empty to hide this section", match: ["scenarios*"] },
    { title: "Why this works", help: "Leave every field empty to hide this section", match: ["why*"] },
    { title: "Closing section", match: ["faqTitle", "cta*"] },
    { title: "Contact form", match: ["form*", "*Placeholder", "namePlaceholder", "designationPlaceholder", "phonePlaceholder", "companyLabel", "companyPlaceholder", "emailPlaceholder", "submitLabel"] },
  ],
  cityPages: [
    { title: "Top of the page", match: ["country", "badge", "hubs", "h1", "intro", "primaryCta", "secondaryCta"] },
    { title: "Why this city", match: ["why*"] },
    { title: "Case studies", match: ["proof*"] },
    { title: "Who we generate leads for", match: ["segments*"] },
    { title: "Healthcare block", help: "Leave every field empty to hide this section", match: ["healthcare*"] },
    { title: "How it works", match: ["steps*"] },
    { title: "Services", match: ["services*"] },
    { title: "Why Myntmore", match: ["diffTitle", "differentiators"] },
    { title: "Contact form", match: ["form*"] },
  ],
  industryCityPages: [
    { title: "Top of the page", match: ["cityName", "industryName", "badge", "hubs", "h1", "intro", "primaryCta", "secondaryCta"] },
    { title: "Why this market", match: ["why*"] },
    { title: "Who buys", match: ["buyers*"] },
    { title: "Segments", match: ["segments*"] },
    { title: "Case studies", match: ["proof*"] },
    { title: "How it works", match: ["steps*"] },
    { title: "Services", match: ["services*"] },
    { title: "Why Myntmore", match: ["diffTitle", "differentiators"] },
    { title: "Questions and answers", match: ["faqs"] },
    { title: "Contact form", match: ["form*"] },
  ],
  servicePages: [
    { title: "Top of the page", match: ["badge", "h1", "heroIntro", "ctaPrimary", "ctaSecondary"] },
    { title: "Stats and benefits", match: ["stats*", "benefits"] },
    { title: "The problem and the Myntmore way", match: ["problem*", "solution*"] },
    { title: "How it works", match: ["processIntro", "steps", "deliverables"] },
    { title: "Who it's for", match: ["whoFor*", "notFor"] },
    { title: "Track record and client results", match: ["track*", "results*"] },
    { title: "Closing section", match: ["cta*"] },
  ],
  careers: [
    { title: "Job card on the careers page", match: ["title", "tag", "badge", "cardDesc", "cardBullets"] },
    { title: "About the role", match: ["about*", "primaryGoal"] },
    { title: "Responsibilities", match: ["responsibilities*"] },
    { title: "Who you are", match: ["whoYouAre*", "skills"] },
    { title: "What you'll learn and why join", match: ["whatYoullLearn", "whyJoin"] },
  ],
  events: [
    { title: "Event details", match: ["title", "tag", "format", "date", "startTime", "endTime"] },
    { title: "Description", match: ["cardDescription", "description", "topics"] },
    { title: "Registration and pop-up", match: ["registrationUrl", "recordingUrl", "showPopup"] },
  ],
  glossaryTerms: [
    { title: "The term", match: ["title", "indexTitle", "tag", "tagline", "excerpt", "alsoKnownAs"] },
    { title: "Definition", match: ["definition*", "body"] },
    { title: "Longer explanation", match: ["sections"] },
    { title: "Sources and further reading", match: ["source*", "further*"] },
    { title: "Questions and answers", match: ["faqs"] },
  ],
  caseStudyPages: [
    { title: "Top of the page", match: ["tag", "title", "intro", "heroStats"] },
    { title: "Challenge", match: ["challenge*"] },
    { title: "Approach", match: ["approach*"] },
    { title: "Results", match: ["metrics", "outcome*", "roleBody", "services"] },
    { title: "Card on the case studies page", match: ["industry", "index*", "excerpt"] },
  ],
  caseStudies: [
    { title: "Case study", match: ["industry", "segment", "title"] },
    { title: "Story", match: ["challenge", "solution", "results"] },
  ],
  marketPages: [
    { title: "Top of the page", match: ["heroLead", "heroUnderlined", "intro"] },
    { title: "Who this is for", match: ["audiences"] },
    { title: "Plays", match: ["plays*"] },
    { title: "Rules and timing", match: ["rules*", "timing*"] },
    { title: "Links", match: ["industryLinks", "cities"] },
  ],
};

const id = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * @param fields the type's top-level fields in schema order, with their kind and label
 * @param entryNameKey the field that holds the entry's name (shown in the first section, or in the address section when it is the file name)
 */
export function sectionsFor(typeKey: string, fields: { key: string; kind: string; label?: string }[], entryNameKey?: string, nameIsFileName = false): Section[] {
  const rules = TYPE_SECTIONS[typeKey] ?? [];
  const taken = new Set<string>();
  const take = (pats: string[]) => fields.map((f) => f.key).filter((k) => !taken.has(k) && matches(k, pats) && (taken.add(k), true));

  // Settings first, so a page's "title" or "page" is not claimed by them unless they are settings for that type.
  const settings: Section[] = [];
  const adv = take(ADVANCED.match.filter((p) => !entryNameKey || p !== entryNameKey || nameIsFileName));
  const seo = take(SEO.match);
  const design = take(DESIGN.match);

  const content: Section[] = [];
  // An entry's own name (a FAQ's question, a page's title) belongs with its text, first.
  const first: string[] = entryNameKey && !nameIsFileName && !taken.has(entryNameKey) ? (taken.add(entryNameKey), [entryNameKey]) : [];

  for (const r of rules) {
    const keys = take(r.match);
    if (keys.length) content.push({ id: id(r.title), title: r.title, help: r.help, keys, kind: "content" });
  }
  // Whatever is left: each group field becomes its own section; loose fields are collected in order.
  let loose: string[] = [...first];
  const flush = () => {
    if (loose.length) content.push({ id: `text-${content.length}`, title: content.length ? "More text" : "Page text", keys: loose, kind: "content" });
    loose = [];
  };
  for (const f of fields) {
    if (taken.has(f.key)) continue;
    taken.add(f.key);
    if (f.kind === "object" && f.label) {
      flush();
      content.push({ id: id(f.label) || f.key, title: f.label, keys: [f.key], kind: "content" });
    } else loose.push(f.key);
  }
  flush();

  if (design.length) settings.push({ id: "design-options", title: DESIGN.title, help: DESIGN.help, keys: design, kind: "settings" });
  if (seo.length) settings.push({ id: "google-and-sharing", title: SEO.title, help: SEO.help, keys: seo, kind: "settings" });
  if (adv.length) settings.push({ id: "page-address", title: ADVANCED.title, help: ADVANCED.help, keys: adv, kind: "settings" });

  // Small forms (a FAQ, a search title) need no sections at all: one open section.
  if (fields.length <= 6) return [{ id: "all", title: "", keys: fields.map((f) => f.key), kind: "content" }];
  return [...content, ...settings];
}
