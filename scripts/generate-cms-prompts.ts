// Writes docs/cms-prompts/: one copy-and-paste prompt per content type in the admin (/admin).
//
// Each prompt turns rough text (a blog draft, notes about a city, a job description) into the exact
// fields of that type's admin form, in the form's own order and with the form's own labels, limits
// and item counts. Everything is read from the same places the admin reads (keystatic.config.ts
// through lib/admin/schema.ts, the section order in lib/admin/sections.ts and the build rules in
// scripts/lib/content-rules.mjs), so a prompt can't drift from the form: rerun this after a schema change.
//
//   npm run cms-prompts:build           write the prompts
//   npm run cms-prompts:check           exit 1 if docs/cms-prompts/ is out of date
import fs from "node:fs";
import path from "node:path";
import { contentTypes, describeType, type ContentType, type FieldDescriptor } from "@/lib/admin/schema";
import { formSections } from "@/lib/admin/entry-view";
import { catalogEntry, GROUPS } from "@/lib/admin/catalog";
import { isCreatable, isEnabled } from "@/lib/admin/entries";
import { companionFaqId, nameIsFileName } from "@/lib/admin/rules";
import {
  CALENDAR_REQUIRED,
  CAREER_REQUIRED,
  CASE_DETAIL_REQUIRED,
  CASE_LONG_REQUIRED,
  CASE_STUDY_KEYS,
  CITY_REQUIRED,
  EVENT_REQUIRED,
  GLOSSARY_REQUIRED,
  GUIDE_REQUIRED,
  INDUSTRIES,
  INDUSTRY_CITY_REQUIRED,
  LANDING_COUNTS,
  MARKET_REQUIRED,
  MARKETS,
  TEAM_CARD_REQUIRED,
} from "./lib/content-rules.mjs";

const root = process.cwd();
const OUT = path.join(root, "docs", "cms-prompts");
const CHECK = process.argv.includes("--check");

// ── What the build rules add on top of the form's own limits ─────────────────────────────────────

/** Fields the build refuses to save empty, even where the form marks them optional. */
const REQUIRED: Record<string, readonly string[]> = {
  cityPages: CITY_REQUIRED,
  industryCityPages: INDUSTRY_CITY_REQUIRED,
  events: EVENT_REQUIRED,
  careers: CAREER_REQUIRED,
  glossaryTerms: GLOSSARY_REQUIRED,
  resourceGuides: GUIDE_REQUIRED,
  caseStudyPages: CASE_DETAIL_REQUIRED,
  caseStudies: CASE_STUDY_KEYS,
  marketPages: MARKET_REQUIRED,
  calendarPages: CALENDAR_REQUIRED,
  teamCards: TEAM_CARD_REQUIRED,
};
const requiredFor = (typeKey: string) => REQUIRED[typeKey] ?? (typeKey.startsWith("caseLong") ? CASE_LONG_REQUIRED : []);

/** Exact item counts the build enforces: "exactly N" or "exactly N, or none". */
const COUNTS: Record<string, Record<string, string>> = {
  landingPages: {
    ...Object.fromEntries(Object.entries(LANDING_COUNTS).map(([k, n]) => [k, `exactly ${n} items`])),
    track: "exactly 4 items when the results style is Four counters, otherwise none",
    caseCards: "exactly 3 items when the results style is Case-study cards, otherwise none",
    whyCards: "exactly 3 items, or none to hide the section",
    scenarios: "exactly 3 items, or none to hide the section",
    floatingIcons: "exactly 4 items for the four-icon layout, exactly 3 for the three-icon layouts",
  },
  cityPages: { why: "exactly 3 items", services: "exactly 7 items", differentiators: "exactly 4 items", segments: "exactly 3 items, or none to hide the block", proof: "real case studies only; none hides the block" },
  industryCityPages: { why: "exactly 3 items", segments: "exactly 3 items", steps: "exactly 4 items", services: "exactly 6 items", differentiators: "exactly 4 items", buyers: "at least 4 items", faqs: "at least 4 items", proof: "at least 2 real case studies" },
  caseStudyPages: { heroStats: "exactly 3 items", challengeBody: "at least 1", approachBody: "at least 1", metrics: "at least 1", services: "at least 1", indexStats: "at least 1" },
  resourceGuides: { sections: "at least 1 section" },
  marketPages: { audiences: "at least 1", plays: "at least 1" },
  pageFaqs: { items: "at least 1; aim for 5 to 8" },
};

/** The longest search title the build accepts, per type (the site adds " | Myntmore" to most). */
const SEARCH_TITLE_MAX: Record<string, number> = { landingPages: 49, caseStudyPages: 49, servicePages: 49, events: 49, resourceGuides: 49, caseStudies: 49 };
const SEARCH_DESC: Record<string, string> = {
  landingPages: "at most 155 characters",
  cityPages: "at most 155 characters",
  industryCityPages: "at most 155 characters",
  careers: "at most 155 characters",
  caseStudies: "120 to 155 characters, or leave empty and the site writes one from the title and results",
  glossaryTerms: "at most 160 characters",
  resourceGuides: "at most 160 characters",
  servicePages: "at most 160 characters",
};

function caseStudyAddresses(): string[] {
  const dir = path.join(root, "app", "case-studies");
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^[a-z0-9-]+$/.test(e.name) && fs.existsSync(path.join(dir, e.name, "page.tsx")))
    .map((e) => `/case-studies/${e.name}`)
    .sort();
}
const citySlugs = () =>
  fs
    .readdirSync(path.join(root, "content", "city-pages"))
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.slice(0, -5))
    .sort();
const topLevelPages = () =>
  fs
    .readdirSync(path.join(root, "app"), { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("(") && !e.name.startsWith("["))
    .map((e) => e.name)
    .sort();

/** Advice for each type, written for the AI. The build rules above are added automatically. */
function typeNotes(type: ContentType): string[] {
  const k = type.key;
  const caseList = () => `Real case study addresses you may link to (use no others): ${caseStudyAddresses().join(", ")}.`;
  switch (k) {
    case "posts":
      return [
        "Title: a sentence-case headline of about 70 characters at most. The page address is made from it, so after the File name line give the title as lowercase words joined by hyphens.",
        "Summary / intro: answer the title's question directly in the first sentence, so Google or an AI assistant can quote it.",
        "Article: Markdown (Markdoc). Use ## and ### for headings (never a single #, the title is already the heading), short paragraphs, bullet lists and **bold** for key terms. Internal links look like [cold reply](/resources/glossary/cold-reply). Do not repeat the summary at the top of the article.",
        "Published: No unless I say the post is ready. Read time: whole minutes, about 200 words a minute.",
        "FAQs: 3 to 5 questions a buyer would type into Google; each answer 40 to 60 words, starting with the direct answer.",
        "Dates: use today's date for Date published if I give none.",
      ];
    case "landingPages":
      return [
        "This is one page per customer industry or audience, at /lp/<page address>.",
        "The counts are strict: the page will not save with a different number of stats, pain cards, flow steps or process steps.",
        "Results style: use Case-study cards only with real case studies; otherwise Four counters with real numbers, or None.",
        "If I gave no scenarios or 'why this works' cards, leave every field of that section empty.",
        "Design options: if unsure, use the plain badge, no line break, underline width 380, the four-icon layout and no extra graphic.",
        "Floating icons are single emojis.",
      ];
    case "cityPages":
      return [
        "The page lives at /b2b-lead-generation-<city key>. Myntmore serves every city from Mumbai: never claim an office, team or address in the city.",
        caseList(),
        "Services (exactly 7): use Myntmore's real service pages, for example /services/cold-email-outreach, /services/linkedin-outreach, /services/account-based-marketing, /services/ai-lead-generation, /services/icp-mapping, /services/gtm-strategy, /services/personal-branding. If unsure a path exists, write NEEDS INPUT.",
        "Keywords: always include '<city> b2b lead generation', 'lead generation agency <city>' and 'cold email agency <city>'.",
      ];
    case "industryCityPages":
      return [
        `The parent city page must already exist. City keys that exist: ${citySlugs().join(", ")}.`,
        "Page address: <industry>-<city>, e.g. pharma-hyderabad; the page lives at /b2b-lead-generation-<page address>.",
        caseList(),
        "The note under the case studies must say honestly that the results come from similar industries or markets, not from this city, unless they really are from this city.",
        "Optional landing page link: only an existing /lp/<slug> page.",
      ];
    case "caseStudies":
      return [
        "Use ONLY facts and numbers in my text. Never invent a client, a number or a result.",
        `Industry: exactly one of ${INDUSTRIES.join(", ")}.`,
        "Client type: anonymised, at most 38 characters, e.g. 'Series A SaaS, USA'.",
        "Title: at most 70 characters; lead with the result if there is a number.",
        "What Myntmore did: 3 to 6 short concrete items. Results: 3 to 5 items, each starting with its number.",
      ];
    case "caseStudyPages":
      return [
        "Use ONLY facts and numbers in my text. Never invent a client, a number or a result.",
        `Industry: exactly one of ${INDUSTRIES.join(", ")}.`,
        "Date fields with a time: ISO format with India time, e.g. 2026-11-25T10:00:00+05:30.",
      ];
    case "glossaryTerms":
      return [
        "Write for a busy B2B reader who asked 'what is <term>?'. The definition must stand alone as the answer in 40 to 70 words.",
        "Glossary text is plain: no links inside the definition, body or sections. The page has one source link and one optional further-reading link.",
        "Needs either the supporting paragraph or at least one section; every table row has one cell per column.",
        "Keywords: start with 'what is <term>' and '<term> meaning'.",
      ];
    case "resourceGuides":
      return [
        "The guide lives at /resources/guides/<guide address>; the address must not match an existing guide.",
        "Each section needs a heading and at least one of: paragraphs, numbered steps, copy-paste boxes or a table. Keep copy-paste box text exactly as I wrote it (prompts, templates).",
        "The call-to-action box needs all four parts (heading, text, button label, button address) or none.",
        "Related links start with /.",
      ];
    case "careers":
      return [
        "Accepting applications: Yes, unless I say the role is closed.",
        "Salary figures and dates must come from my text: Google for Jobs shows them. Dates with a time: ISO format, e.g. 2026-11-25T09:00:00+05:30; Valid through a few months ahead.",
        "Salary amounts: numbers only, no commas or currency signs.",
      ];
    case "events":
      return [
        "Date: YYYY-MM-DD. Start and end time: 24-hour India time like 11:30; the end must be after the start.",
        "Accent colour: a hex code like #EA580C.",
        "Description: a blank line starts a new paragraph.",
        "Show the pop-up: Yes only with a registration link.",
      ];
    case "pageFaqs":
      return [
        "One entry holds every question for one page. The page name is usually lp-<slug> for industry pages, city-<city key> for city pages and market-<slug> for country pages; if I did not say which page, write NEEDS INPUT.",
        "Each answer 40 to 60 words, starting with the direct answer, no marketing fluff.",
      ];
    case "homepageFaqs":
      return ["Each question is its own entry, so give one filled form per question. Answers 40 to 60 words, starting with the direct answer."];
    case "pageSeo":
      return [
        "One entry per existing page. Page address: the path, starting with /. Only one entry per address can exist; if the page already has one, edit that entry instead.",
        "Search title: at most 49 characters, main keyword first; the site adds ' | Myntmore'. Search description: at most 160 characters, with the main keyword and a reason to click.",
        "If I list several pages, give one filled form per page.",
      ];
    case "marketPages":
      return [`Country pages exist only for: ${MARKETS.join(", ")}. New countries need a developer.`, caseList()];
    case "calendarPages":
      return [
        "The page lives at /calendar/<name>; it is unlisted (not in Google, not linked from the site).",
        "Booking link: the full Calendly or Zoho Bookings embed link.",
        "Canonical path: /calendar/<name> unless I say otherwise.",
      ];
    case "teamCards":
      return [
        "The card lives at /<name>, at the top level of the site.",
        `IMPORTANT: the name must not be an address the site already uses, or the card replaces that page. Taken: ${topLevelPages().filter((p) => !p.startsWith("b2b-lead-generation-")).join(", ")}, and every b2b-lead-generation-… address.`,
        "Photo and save-contact (vCard) link must already exist on the site (a developer adds them); if I did not give them, write NEEDS INPUT.",
        "Signature and quiz: No, unless a developer has set them up for this person.",
      ];
    case "siteSettings":
      return [
        "These appear on every page. Keep the office address the same as the address used elsewhere on the site unless the office has really moved (then a developer must update it everywhere).",
        "Links start with / for pages on the site.",
      ];
    case "servicePages":
      return ["New service pages need a developer; this prompt rewrites an existing one."];
    default:
      if (k.startsWith("caseLong")) return ["Use ONLY facts and numbers that are already in the case study or in my text. Never invent a result."];
      return [];
  }
}

// ── The form as a field list ─────────────────────────────────────────────────────────────────────

const clean = (s?: string) => (s ?? "").replace(/\s+/g, " ").trim();
const isKeywords = (key: string, d: FieldDescriptor) => key === "keywords" && d.kind === "array" && d.element.kind === "text";

interface Ctx {
  type: ContentType;
  required: Set<string>;
  counts: Record<string, string>;
}

function notesFor(key: string, d: FieldDescriptor, ctx: Ctx | null): string[] {
  const n: string[] = [];
  const top = ctx !== null;
  const req = ("required" in d && d.required) || (top && ctx.required.has(key));
  switch (d.kind) {
    case "text":
      if (req) n.push("required");
      else n.push("optional");
      if (d.multiline) n.push("can be several lines");
      if (d.min && d.max) n.push(`${d.min} to ${d.max} characters`);
      else if (d.max) n.push(`at most ${d.max} characters`);
      else if (d.min) n.push(`at least ${d.min} characters`);
      break;
    case "slug":
      n.push("required");
      break;
    case "url":
      n.push(req ? "required" : "optional", "full link starting with https://");
      break;
    case "integer":
    case "number":
      n.push(req ? "required" : "optional", d.kind === "integer" ? "whole number" : "number");
      if (d.min !== undefined && d.max !== undefined) n.push(`${d.min} to ${d.max}`);
      break;
    case "checkbox":
      n.push("Yes or No");
      break;
    case "select":
      n.push(`one of: ${d.options.map((o) => o.label).join(" / ")}`);
      break;
    case "multiselect":
      n.push(`any of: ${d.options.map((o) => o.label).join(" / ")}`);
      break;
    case "date":
      n.push(req ? "required" : "optional", "date as YYYY-MM-DD");
      break;
    case "datetime":
      n.push(req ? "required" : "optional", "date and time, e.g. 2026-11-25T10:00");
      break;
    case "relationship":
      n.push(req ? "required" : "optional", "the name of an existing entry");
      break;
    case "array":
      if (isKeywords(key, d)) n.push("6 to 10 phrases on ONE line, separated by commas");
      else {
        n.push("list");
        if (d.min !== undefined && d.min === d.max) n.push(`exactly ${d.min} items`);
        else if (d.min !== undefined && d.max !== undefined) n.push(`${d.min} to ${d.max} items`);
        else if (d.min) n.push(`at least ${d.min} items`);
        else if (d.max) n.push(`at most ${d.max} items`);
      }
      break;
    case "body":
      n.push("required", "the full article in Markdown");
      break;
  }
  if (top) {
    if (ctx.counts[key]) {
      // The build's count replaces the form's own list size.
      for (let i = n.length - 1; i >= 0; i--) if (/ items$/.test(n[i])) n.splice(i, 1);
      n.push(ctx.counts[key]);
    }
    if (key === "metaTitle" && SEARCH_TITLE_MAX[ctx.type.key] && !n.some((x) => x.startsWith("at most"))) n.push(`at most ${SEARCH_TITLE_MAX[ctx.type.key]} characters`);
    if (key === "metaDescription" && SEARCH_DESC[ctx.type.key]) {
      const i = n.findIndex((x) => /characters$/.test(x));
      if (i >= 0) n.splice(i, 1);
      n.push(SEARCH_DESC[ctx.type.key]);
    }
    if ((key === "ogTitle") && ["cityPages", "industryCityPages", "careers"].includes(ctx.type.key)) n.push("at most 70 characters");
  }
  return n;
}

function fieldLines(key: string, d: FieldDescriptor, indent: string, ctx: Ctx | null, creating: boolean): string[] {
  const out: string[] = [];
  const help = "description" in d ? clean(d.description) : "";
  const helpLine = (pad: string) => (help ? [`${pad}  (${help})`] : []);
  if (d.kind === "unsupported") return [`${indent}- ${clean(d.label) || key}: [cannot be filled from text; write "(keep as is)"]`];

  if (d.kind === "slug") {
    const label = clean(d.label);
    if (d.isEntryName && ctx && nameIsFileName(ctx.type)) {
      out.push(`${indent}- ${label}  [required · lowercase words joined by hyphens, e.g. saas-founders; becomes the page address and cannot be changed later]`, ...helpLine(indent));
    } else {
      out.push(`${indent}- ${label}  [required]`, ...helpLine(indent));
      if (d.isEntryName && creating) out.push(`${indent}- File name  [lowercase words joined by hyphens; becomes part of the page address and cannot be changed later]`);
    }
    return out;
  }
  if (d.kind === "object") {
    const label = clean(d.label);
    if (label) out.push(`${indent}- ${label}  [group of fields]`, ...helpLine(indent));
    for (const [k, sub] of Object.entries(d.fields)) out.push(...fieldLines(k, sub, label ? indent + "    " : indent, null, creating));
    return out;
  }
  const label = isKeywords(key, d) ? clean(d.label).replace(/\s*\(one search phrase each\)/i, "") : clean(d.label);
  out.push(`${indent}- ${label}  [${notesFor(key, d, ctx).join(" · ")}]`, ...helpLine(indent));
  if (d.kind === "array" && !isKeywords(key, d)) {
    const el = d.element;
    if (el.kind === "object") {
      out.push(`${indent}    Each item has:`);
      for (const [k, sub] of Object.entries(el.fields)) out.push(...fieldLines(k, sub, indent + "    ", null, creating));
    } else if (el.kind === "array" || el.kind === "unsupported") {
      out.push(...fieldLines("item", el, indent + "    ", null, creating));
    } else {
      const notes = notesFor("item", el, null).filter((x) => x !== "optional" && x !== "required");
      out.push(`${indent}    Each item: ${clean(el.label) || "text"}${notes.length ? ` [${notes.join(" · ")}]` : ""}`);
    }
  }
  return out;
}

function formSpec(type: ContentType, creating: boolean): string {
  const fields = describeType(type);
  const ctx: Ctx = { type, required: new Set(requiredFor(type.key)), counts: COUNTS[type.key] ?? {} };
  const lines: string[] = [];
  for (const s of formSections(type)) {
    if (s.title) lines.push("", `### ${s.title}${s.kind === "settings" ? " (settings, at the end of the form)" : ""}`);
    for (const key of s.keys) {
      const d = fields[key];
      if (!d) continue;
      // A section made from one group of fields already carries the group's name as its heading.
      if (d.kind === "object" && s.keys.length === 1 && clean(d.label) === s.title) {
        for (const [k, sub] of Object.entries(d.fields)) lines.push(...fieldLines(k, sub, "", null, creating));
      } else lines.push(...fieldLines(key, d, "", ctx, creating));
    }
  }
  if (creating && companionFaqId(type, "x")) {
    lines.push("", "### First question and answer on this page (shown only when adding a new page)", "- Question  [required]", "- Answer  [required · 40 to 60 words, starting with the direct answer]");
  }
  return lines.join("\n").trim();
}

// ── The prompt ───────────────────────────────────────────────────────────────────────────────────

const SHARED_RULES = `HARD RULES (the admin refuses to save, or the page is hurt, if these are broken)
1. Never use the long dash (—). Use a comma, a full stop or a normal hyphen (-).
2. Never invent facts, clients, numbers, percentages, quotes or results. Use only what is in my text. If a required value is missing, write NEEDS INPUT: <what is missing>.
3. Respect every limit in square brackets: character limits, "exactly N items", allowed options. If my text has more items than allowed, keep the best and say what you dropped; if fewer, mark the gaps NEEDS INPUT.
4. Page addresses and file names: lowercase letters, numbers and single hyphens only, e.g. cold-email-for-saas.
5. Search title: say the main keyword first; do not end it with "Myntmore" (the site adds " | Myntmore"). Search description: one plain sentence with the main keyword and a reason to click.
6. Keywords: lowercase phrases a buyer would type (2 to 6 words each), all on ONE line separated by commas, e.g.: b2b lead generation, cold email agency india, how to book more sales meetings. One main phrase, close variants and 2 or 3 question-style phrases. No single words, no duplicates.
7. Internal links are paths starting with /, e.g. /book-a-call or /services/cold-email-outreach. If you are not sure a page exists, write NEEDS INPUT: confirm this link.
8. Colours are hex codes like #EA580C, in Myntmore's orange and gold family unless I say otherwise.
9. Tone: plain, direct and specific, for senior B2B buyers. Short sentences. No hype words (revolutionary, game-changing, unlock, supercharge, leverage).
10. Myntmore facts you may use: Mumbai-based B2B outbound agency (cold email, LinkedIn outreach, account-based marketing, GTM strategy) at WeWork Enam Sambhav, BKC; 12K+ meetings booked; $120M+ in pipeline generated; 130+ B2B companies served. No other company figures.`;

const OUTPUT_FORMAT = `HOW TO ANSWER
- Go through the form below from top to bottom and write one line per field as "Field name: value", using the field names EXACTLY as written (without the notes in square brackets), in the same order, so I can copy them into the admin box by box.
- Keep the section headings (### ...) so I know where I am in the form.
- Lists: number the items (1., 2., 3.). When an item has several fields, put each on its own indented line as "Field name: value".
- Keywords: ONE line, phrases separated by commas.
- Yes/No fields: write Yes or No. Choice fields: write one of the allowed options exactly.
- Optional fields my text says nothing about: write (leave empty).
- Never put character counts inside a value.
- After the form, add "LENGTH CHECK": every field with a character limit, its length and its limit. Then "CHECK BEFORE SAVING": anything marked NEEDS INPUT and anything I should verify.
- No introduction and no closing remarks.`;

function promptFor(type: ContentType): { file: string; title: string; md: string } {
  const cat = catalogEntry(type.key, type.label);
  const creating = isCreatable(type);
  const where = cat.url ? cat.url("<page address>", "") : null;
  const isSingleton = type.kind === "singleton";
  const intro = isSingleton
    ? `This page already exists, so the job is to rewrite its text. Fill EVERY field below: where my text says nothing new about a field, write (keep current text). Keep the number of cards, steps and list items the same as on the live page unless I say otherwise.`
    : creating
      ? `I will use this to add a NEW entry with "Add new" in the admin (or to rewrite an existing one).`
      : `New entries of this type are added by a developer; this prompt rewrites an existing one.`;
  const notes = typeNotes(type);
  const body = `You are filling in a form in the Myntmore website CMS (myntmore.com/admin): "${cat.title}"${cat.description ? ` (${clean(cat.description)})` : ""}.${where ? ` Live page: ${where}.` : ""}
Myntmore is a Mumbai-based B2B outbound lead-generation agency: cold email, LinkedIn outreach, account-based marketing and GTM strategy.
${intro}

Rebuild my text below as the filled-in form.

${SHARED_RULES}
${notes.length ? `\nRULES FOR THIS PAGE TYPE\n${notes.map((x) => `- ${x}`).join("\n")}\n` : ""}
${OUTPUT_FORMAT}

THE FORM (field names, then [limits and options], then (the admin's own help text))
${formSpec(type, creating)}

MY TEXT:
[PASTE YOUR TEXT HERE]`;

  const title = cat.title;
  const file = `${slugify(title)}.md`;
  const md = `<!-- Generated by scripts/generate-cms-prompts.ts from the admin's own form. Do not edit by hand: run npm run cms-prompts:build. -->
# ${title}

${clean(cat.description) || clean(type.label)}

- Admin: **${title}**${type.label !== title ? ` (\`${type.label}\`)` : ""}${creating ? ", can add new" : isSingleton ? ", one page, edit only" : ", edit only"}
${where ? `- Live page: \`${where}\`\n` : ""}
Copy everything in the box into any Claude chat, replace \`[PASTE YOUR TEXT HERE]\` with your draft, and send.

\`\`\`\`text
${body}
\`\`\`\`
`;
  return { file, title, md };
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── Write ────────────────────────────────────────────────────────────────────────────────────────

const types = contentTypes().filter((t) => isEnabled(t.key));
const groupOrder = GROUPS.map((g) => g.key);
const sorted = types
  .map((t, i) => ({ t, i, cat: catalogEntry(t.key, t.label) }))
  .sort((a, b) => groupOrder.indexOf(a.cat.group) - groupOrder.indexOf(b.cat.group) || a.i - b.i);

const files = new Map<string, string>();
const index: Record<string, { title: string; file: string; creatable: boolean; desc: string }[]> = {};
for (const { t, cat } of sorted) {
  const p = promptFor(t);
  if (files.has(p.file)) throw new Error(`Two content types would write ${p.file}`);
  files.set(p.file, p.md);
  (index[cat.group] ??= []).push({ title: p.title, file: p.file, creatable: isCreatable(t), desc: clean(cat.description) });
}

const readme = `<!-- Generated by scripts/generate-cms-prompts.ts. Do not edit by hand: run npm run cms-prompts:build. -->
# CMS prompts: one per content type

One prompt for every content type in the admin (myntmore.com/admin), ${files.size} in all. Each one turns rough text (a blog draft, notes about a city, a job description) into the admin form's exact fields, in the form's order, with the form's own names, limits and item counts. Keywords come out comma-separated on one line, ready for the Keywords box.

## How to use

1. Open the prompt for the page type below and copy everything in its box.
2. Paste it into any Claude chat, replace \`[PASTE YOUR TEXT HERE]\` with your draft, and send.
3. In the admin, open the type, click **Add new** (or open the page), and copy each line into the box with the same name, top to bottom.
4. Fix anything the answer marks **NEEDS INPUT**, then save. If the admin shows a red message under a field, paste it back into the chat and ask Claude to fix that field.

The prompts are generated from the admin's own form definitions (\`keystatic.config.ts\`, \`lib/admin/sections.ts\`, \`scripts/lib/content-rules.mjs\`). After a form changes, run \`npm run cms-prompts:build\` and commit; \`npm run cms-prompts:check\` fails when they are out of date.

${GROUPS.filter((g) => index[g.key]?.length)
  .map((g) => `## ${g.title}\n\n${g.description}\n\n${index[g.key].map((e) => `- [${e.title}](${e.file})${e.creatable ? " · can add new" : ""}${e.desc ? `: ${e.desc}` : ""}`).join("\n")}`)
  .join("\n\n")}
`;
files.set("README.md", readme);

const existing = fs.existsSync(OUT) ? fs.readdirSync(OUT).filter((f) => f.endsWith(".md")) : [];
const stale = existing.filter((f) => !files.has(f));
const changed = Array.from(files).filter(([f, text]) => !fs.existsSync(path.join(OUT, f)) || fs.readFileSync(path.join(OUT, f), "utf8") !== text).map(([f]) => f);

if (CHECK) {
  if (changed.length || stale.length) {
    console.error(`[cms-prompts] docs/cms-prompts/ is out of date (${[...changed, ...stale].join(", ")}). Run: npm run cms-prompts:build`);
    process.exit(1);
  }
  console.log(`[cms-prompts] ok (${files.size - 1} prompts)`);
} else {
  fs.mkdirSync(OUT, { recursive: true });
  for (const f of stale) fs.rmSync(path.join(OUT, f));
  for (const f of changed) fs.writeFileSync(path.join(OUT, f), files.get(f)!);
  console.log(`[cms-prompts] wrote ${changed.length}, removed ${stale.length}, ${files.size - 1} prompts in docs/cms-prompts/`);
}

// For the browsable page: the same prompts as JSON, when asked for.
const jsonOut = process.argv.find((a) => a.startsWith("--json="));
if (jsonOut) {
  const data = sorted.map(({ t, cat }) => {
    const md = files.get(promptFor(t).file)!;
    return { key: t.key, title: cat.title, group: cat.group, creatable: isCreatable(t), desc: clean(cat.description), prompt: md.slice(md.indexOf("````text\n") + 8, md.lastIndexOf("\n````")) };
  });
  fs.writeFileSync(jsonOut.slice(7), JSON.stringify({ groups: GROUPS, prompts: data }));
}
