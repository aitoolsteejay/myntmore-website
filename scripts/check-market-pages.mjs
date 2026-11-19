// Checks the market pages (content/market-pages/*.json, edited in the Keystatic admin as "Market pages")
// before a build: every required field is filled, each play links to a real case study page, and the
// city-links choice is one the page understands. lib/market-pages.ts reads the files directly, so a
// mistake here would otherwise only show up as a broken or half-empty page.
//
//   node scripts/check-market-pages.mjs     exit 1 on any problem
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dir = path.join(root, "content/market-pages");
const KNOWN = ["uae", "united-states", "united-kingdom", "singapore", "france", "india"];
const REQUIRED = ["heroLead", "heroUnderlined", "intro", "playsTitle", "rulesTitle", "rulesBody", "timingTitle", "timingBody"];
const pageExists = (href) => /^\/[a-z0-9/-]+$/.test(href) && fs.existsSync(path.join(root, "app", href.slice(1), "page.tsx"));

const problems = [];
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
for (const f of files) {
  const slug = f.replace(/\.json$/, "");
  const raw = fs.readFileSync(path.join(dir, f), "utf8");
  const d = JSON.parse(raw);
  if (!KNOWN.includes(slug)) problems.push(`${f}: "${slug}" is not a market the site knows; add it to lib/case-study-markets.ts and lib/market-pages.ts first`);
  if (raw.includes("—")) problems.push(`${f}: contains an em dash`);
  for (const k of REQUIRED) if (!d[k]) problems.push(`${f}: "${k}" is empty`);
  if (!d.audiences?.length) problems.push(`${f}: needs at least one "who this is for" card`);
  if (!d.plays?.length) problems.push(`${f}: needs at least one play`);
  for (const p of d.plays ?? []) {
    if (!/^\/case-studies\/[a-z0-9-]+$/.test(p.href ?? "") || !pageExists(p.href)) problems.push(`${f}: play "${p.title}" links to ${p.href}, which is not a case study page`);
  }
  for (const l of d.industryLinks ?? []) if (!pageExists(l.href ?? "")) problems.push(`${f}: industry link ${l.href} is not a page`);
  if (![null, "uae", "india", "none"].includes(d.cities ?? null)) problems.push(`${f}: "cities" must be uae, india or none`);
}
for (const k of KNOWN) if (!files.includes(`${k}.json`)) problems.push(`content/market-pages/${k}.json is missing`);
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`[market-pages] ok (${files.length} pages)`);
