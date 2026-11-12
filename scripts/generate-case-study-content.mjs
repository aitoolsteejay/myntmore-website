// Builds lib/case-study-library.json from content/case-studies/*.json (the files the
// Keystatic admin edits). scripts/generate-case-study-pages.mjs then writes a page and a
// sitemap entry for each case. Pass --check to fail if the generated file is out of date.
//
//   node scripts/generate-case-study-content.mjs           write lib/case-study-library.json
//   node scripts/generate-case-study-content.mjs --check   exit 1 if it is stale
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dir = path.join(root, "content/case-studies");
const out = path.join(root, "lib/case-study-library.json");

const INDUSTRIES = ["Pharma", "SaaS", "Professional Services", "eCommerce Tech", "B2B Founder", "Agencies & IT", "Financial Services", "Insurance", "Manufacturers & Exporters", "Recruitment & Staffing"];
// How each industry reads inside a keyword phrase ("b2b lead generation for pharma companies").
// The /case-studies/<industry> pages read this too, through lib/case-study-library.ts.
const AUDIENCES = {
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

// The meta description: the title plus up to three of the case's own numeric results that the
// title doesn't already state, sized to land between 120 and 160 characters.
const lead = (s) => (s.match(/^[₹$]?\d[\d.,]*\+?x?/) || [""])[0].toLowerCase();
function metaDescription(c) {
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
      if (s.length > 160) continue;
      // Prefer: in range, then more results, then the shorter tail.
      const score = (s.length >= 120 ? 1000 : 0) + n * 100 + (tail === tails[0] ? 10 : 0);
      if (!best || score > best.score) best = { s, score };
    }
  }
  if (!best || best.s.length < 120) throw new Error(`${c.slug}: no meta description between 120 and 160 characters`);
  return best.s;
}

function keywords(c) {
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
const KEYS = ["n", "industry", "segment", "slug", "title", "challenge", "solution", "results"];

const seen = new Set();
const cases = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => {
    const raw = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    // The file name is the page address; keep the stored slug in step with it.
    const slug = f.replace(/\.json$/, "");
    const c = { ...raw, slug };
    for (const k of KEYS) if (c[k] === undefined || c[k] === "" || (Array.isArray(c[k]) && !c[k].length)) throw new Error(`${f}: "${k}" is empty`);
    if (!INDUSTRIES.includes(c.industry)) throw new Error(`${f}: unknown industry "${c.industry}"`);
    if (seen.has(slug)) throw new Error(`duplicate slug ${slug}`);
    seen.add(slug);
    const picked = Object.fromEntries(KEYS.map((k) => [k, c[k]]));
    // Optional overrides from the admin; empty fields fall back to the generated values.
    const metaTitle = (c.metaTitle || "").trim();
    const customDescription = (c.metaDescription || "").trim();
    return {
      ...picked,
      ...(metaTitle ? { metaTitle } : {}),
      metaDescription: customDescription || metaDescription(picked),
      keywords: keywords(picked),
    };
  })
  .sort((a, b) => a.n - b.n || a.slug.localeCompare(b.slug));

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
