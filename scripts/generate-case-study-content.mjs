// Builds lib/case-study-library.json from content/case-studies/*.json (the files the
// Keystatic admin edits). scripts/generate-case-study-pages.mjs then writes a page and a
// sitemap entry for each case. Pass --check to fail if the generated file is out of date.
//
//   node scripts/generate-case-study-content.mjs           write lib/case-study-library.json
//   node scripts/generate-case-study-content.mjs --check   exit 1 if it is stale
import fs from "node:fs";
import path from "node:path";
import { AUDIENCES, CASE_STUDY_KEYS, caseStudyKeywords, caseStudyMetaDescription, checkEntry } from "./lib/content-rules.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dir = path.join(root, "content/case-studies");
const out = path.join(root, "lib/case-study-library.json");

// The industry list, keyword audiences, meta description and keyword formulas live in
// scripts/lib/content-rules.mjs, shared with the content admin so it checks a case the same way.
const seen = new Set();
const cases = [];
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const raw = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  // The file name is the page address; keep the stored slug in step with it.
  const slug = f.replace(/\.json$/, "");
  const c = { ...raw, slug };
  const [first] = await checkEntry("caseStudies", c, null);
  if (first) throw new Error(`${f}: ${first.message}`);
  if (seen.has(slug)) throw new Error(`duplicate slug ${slug}`);
  seen.add(slug);
  const picked = Object.fromEntries(CASE_STUDY_KEYS.map((k) => [k, c[k]]));
  // Optional overrides from the admin; empty fields fall back to the generated values.
  const metaTitle = (c.metaTitle || "").trim();
  const customDescription = (c.metaDescription || "").trim();
  cases.push({
    ...picked,
    ...(metaTitle ? { metaTitle } : {}),
    metaDescription: customDescription || caseStudyMetaDescription(picked),
    keywords: caseStudyKeywords(picked),
  });
}
cases.sort((a, b) => a.n - b.n || a.slug.localeCompare(b.slug));
const next = JSON.stringify({ audiences: AUDIENCES, cases }, null, 1);
if (process.argv.includes("--check")) {
  const current = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : "";
  if (current !== next) {
    console.error("[case-studies] lib/case-study-library.json is stale, run npm run case-studies:content");
    process.exit(1);
  }
  console.log(`[case-studies] ok (${cases.length} cases)`);
} else {
  fs.writeFileSync(out, next);
  console.log(`[case-studies] wrote ${cases.length} cases`);
}
