// Builds public/llms-full.txt: the long-form reference for AI systems that
// complements the short, curated public/llms.txt.
//
//   node scripts/generate-llms-full.mjs            write the file
//   node scripts/generate-llms-full.mjs --check    exit 1 if the committed file is out of date
//
// Everything in it is read from the site's own source, so it cannot drift from the pages:
//   - company facts and "do not infer" rules  <- lib/entity-facts.json
//   - service definitions                      <- lib/service-answers.json (the same text shown on each service page)
//   - every listed page's title and summary    <- that page's metadata (title/description), or for glossary
//                                                 terms, the full definition constant on the page
//   - which pages are listed                   <- app/sitemap.ts
// It runs before every build (see "prebuild" in package.json) and the result is committed.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const APP = path.join(ROOT, "app");
const OUT = path.join(ROOT, "public", "llms-full.txt");
const CHECK = process.argv.includes("--check");
const SITE = "https://www.myntmore.com";

const read = (f) => fs.readFileSync(f, "utf8");
const exists = (f) => fs.existsSync(f);
const json = (f) => JSON.parse(read(path.join(ROOT, f)));

const facts = json("lib/entity-facts.json");
const services = json("lib/service-answers.json");

// ── Page metadata ────────────────────────────────────────────────────────
const unq = (s) => s.replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\n/g, " ").replace(/\s+/g, " ").trim();
const STR = String.raw`"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|` + "`([^`]*)`";

function constValue(src, name) {
  const m = src.match(new RegExp(String.raw`\bconst\s+${name}\s*=\s*(?:${STR})`));
  return m ? unq(m[1] ?? m[2] ?? m[3] ?? "") : null;
}

// Resolve a metadata value that is a literal, a template literal using a const, or a const.
function resolve(src, token) {
  if (!token) return null;
  const t = token.trim();
  let m = t.match(new RegExp(`^(?:${STR})$`));
  if (m) {
    const raw = unq(m[1] ?? m[2] ?? m[3] ?? "");
    return raw.replace(/\$\{(\w+)\}/g, (_, n) => constValue(src, n) ?? "").replace(/\s+\|\s+(B2B Outbound Glossary|B2B Glossary|Myntmore Glossary|Glossary|Myntmore)$/, "").trim();
  }
  if (/^\w+$/.test(t)) return constValue(src, t);
  return null;
}

function metaOf(file) {
  let src = read(file);
  let block = src.match(/export const metadata[^=]*=\s*(?:withPageSeo\([^,]*,\s*)?\{([\s\S]*?)\n\}\)?;/)?.[1] ?? "";
  if (!block) {
    // Client components cannot export metadata; it lives in a sibling layout.
    const layout = path.join(path.dirname(file), "layout.tsx");
    if (exists(layout)) {
      src = read(layout);
      block = src.match(/export const metadata[^=]*=\s*(?:withPageSeo\([^,]*,\s*)?\{([\s\S]*?)\n\}\)?;/)?.[1] ?? "";
    }
  }
  const pick = (key) => {
    const m = block.match(new RegExp(String.raw`^\s{2}${key}:\s*((?:${STR})|\w+)\s*,?\s*$`, "m")) ?? block.match(new RegExp(String.raw`\b${key}:\s*((?:${STR})|\w+)\s*,`));
    return m ? resolve(src, m[1]) : null;
  };
  return {
    title: pick("title"),
    description: pick("description"),
    // Glossary pages keep the full definition in a DESCRIPTION constant.
    definition: constValue(src, "DESCRIPTION"),
  };
}

function pageFile(urlPath) {
  const dir = path.join(APP, ...urlPath.split("/").filter(Boolean));
  for (const ext of ["tsx", "ts", "jsx", "js"]) {
    const f = path.join(dir, `page.${ext}`);
    if (exists(f)) return f;
  }
  // dynamic filter route for /case-studies/<industry>
  return null;
}

// Search titles and descriptions edited in the admin (content/page-seo, built into lib/page-seo.generated.json)
// replace the ones in the page file on the live site, so they win here too.
const PAGE_SEO_FILE = path.join(ROOT, "lib", "page-seo.generated.json");
const PAGE_SEO = exists(PAGE_SEO_FILE) ? JSON.parse(read(PAGE_SEO_FILE)) : {};

// ── Which pages ──────────────────────────────────────────────────────────
const sitemapSrc = read(path.join(APP, "sitemap.ts"));
const urls = [...sitemapSrc.matchAll(/url:\s*(?:base|`\$\{base\}([^`]*)`)/g)].map((m) => m[1] ?? "");

const pages = urls.map((u) => {
  const file = pageFile(u);
  const meta = file ? metaOf(file) : {};
  const seo = PAGE_SEO[u || "/"] ?? {};
  const slug = u.split("/").filter(Boolean).pop() ?? "";
  return {
    path: u || "/",
    url: SITE + u,
    title: seo.title?.replace(/\s+\|\s+Myntmore$/, "") || meta.title || slug.replace(/-/g, " "),
    description: meta.definition && u.startsWith("/resources/glossary/") ? meta.definition : seo.description || meta.description || "",
  };
});

// ── Blog posts written in the CMS (content/posts/*.mdoc) ─────────────────
// Published ones are listed under "Blog" like any other post. The frontmatter
// is read with a small parser that covers the scalar styles Keystatic writes
// (plain, quoted, and | or > block scalars); only top-level keys are needed.
function frontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const out = {};
  if (!m) return out;
  const lines = m[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const [, key, rest] = kv;
    if (/^[|>][+-]?$/.test(rest)) {
      const block = [];
      while (i + 1 < lines.length && (/^\s/.test(lines[i + 1]) || lines[i + 1] === "")) block.push(lines[++i].replace(/^\s+/, ""));
      out[key] = block.join(" ").replace(/\s+/g, " ").trim();
    } else if (/^"/.test(rest)) {
      try { out[key] = JSON.parse(rest); } catch { out[key] = rest.replace(/^"|"$/g, ""); }
    } else if (/^'/.test(rest)) {
      out[key] = rest.slice(1, rest.lastIndexOf("'")).replace(/''/g, "'");
    } else {
      out[key] = rest.trim();
    }
  }
  return out;
}

const cmsDir = path.join(ROOT, "content", "posts");
if (exists(cmsDir)) {
  for (const f of fs.readdirSync(cmsDir).filter((f) => f.endsWith(".mdoc")).sort()) {
    const fm = frontmatter(read(path.join(cmsDir, f)));
    if (fm.published !== "true") continue;
    const slug = f.replace(/\.mdoc$/, "");
    pages.push({ path: `/resources/blogs/${slug}`, url: `${SITE}/resources/blogs/${slug}`, title: fm.metaTitle || fm.title || slug.replace(/-/g, " "), description: fm.description ?? "" });
  }
}

const group = (pred) => pages.filter((p) => pred(p.path));
const line = (p, withNote = "") => `- [${p.title}](${p.url})${p.description ? `: ${p.description}` : ""}${withNote}`;

const serviceUrls = new Set(services.map((s) => s.url));
const sections = [];

// ── Compose ──────────────────────────────────────────────────────────────
const out = [];
out.push(`# ${facts.name}: full reference`);
out.push("");
out.push(`> ${facts.description}`);
out.push("");
out.push(`This is the long-form reference. The short, curated index is ${SITE}/llms.txt. This file is generated from the site's source by scripts/generate-llms-full.mjs, so it matches the pages it describes; do not edit it by hand.`);
out.push("");
out.push("## About Myntmore");
out.push(`- Founded: ${facts.founded}, by ${facts.founder.name}`);
out.push(`- Headquarters: ${facts.headquarters}`);
out.push(`- Founder: ${facts.founder.name}, ${facts.founder.title.replace(/,.*/, "")} (${facts.founder.linkedin})`);
out.push(`- Website: ${facts.url}`);
out.push(`- Proof points stated on the site: ${facts.proofPoints.join("; ")}`);
out.push(`- Geographic scope: ${facts.geographicScope}`);
out.push(`- Contact: ${facts.contact.email}, ${facts.contact.phone}`);
out.push(`- Address: ${facts.contact.address}`);
out.push(`- Profiles: ${facts.sameAs.join(", ")}`);
out.push("");
out.push("## How to cite this site");
out.push(`Cite the canonical page URL of the specific page a claim comes from. How numbers are sourced, how AI tool data is handled and how errors are corrected is set out at ${SITE}/editorial-policy.`);
out.push("");

out.push("## Services");
out.push("Seven managed B2B services. Each definition below is the same text shown at the top of the service page.");
out.push("");
for (const s of services) {
  out.push(`### ${s.name}`);
  out.push(`Page: ${SITE}${s.url}`);
  out.push(`**${s.question}** ${s.answer}`);
  out.push(`- Who it is for: ${s.who}`);
  out.push(`- What you get: ${s.gets}`);
  out.push(`- What to expect: ${s.outcome}`);
  out.push("");
}
const diy = pages.find((p) => p.path === "/services/do-it-yourself");
if (diy) out.push(`Also available: ${line(diy).slice(2)}`, "");

const framework = pages.find((p) => p.path === "/myntmore-framework");
out.push("## Methodology and positioning");
for (const p of [framework, pages.find((p) => p.path === "/who-this-is-for"), pages.find((p) => p.path === "/about-us"), pages.find((p) => p.path === "/editorial-policy")].filter(Boolean)) out.push(line(p));
out.push("");

out.push("## Original research");
for (const p of group((x) => x === "/resources/blogs/b2b-outbound-benchmark-report-2026")) out.push(line(p));
out.push("");

const csReal = group((x) => /^\/case-studies\/[^/]+$/.test(x) && !["/case-studies/pharma", "/case-studies/saas", "/case-studies/professional-services", "/case-studies/ecommerce-tech", "/case-studies/b2b-founder", "/case-studies/agencies-it", "/case-studies/financial-services", "/case-studies/insurance", "/case-studies/manufacturers-exporters", "/case-studies/recruitment-staffing"].includes(x));
out.push("## Case studies");
out.push(`Client names are withheld under confidentiality agreements. Overview: ${SITE}/case-studies. Industry filters (pharma, SaaS, professional services, eCommerce tech, B2B founders, agencies and IT, financial services, insurance, manufacturers and exporters, recruitment and staffing) are shareable views of that page.`);
for (const p of csReal) out.push(line(p));
out.push("");

const guideLike = (re) => group((x) => re.test(x));
out.push("## Guides");
for (const p of guideLike(/^\/resources\/guides\/[^/]+$/)) out.push(line(p));
out.push("");
out.push("## Blog");
for (const p of guideLike(/^\/resources\/blogs\/[^/]+$/).filter((x) => x.path !== "/resources/blogs/b2b-outbound-benchmark-report-2026")) out.push(line(p));
out.push("");

out.push("## Glossary (definitions)");
for (const p of guideLike(/^\/resources\/glossary\/[^/]+$/)) out.push(`- [${p.title}](${p.url}): ${p.description}`);
out.push("");

out.push("## Free tools");
out.push("These tools generate output with an AI model and can be wrong; each explains how your details and input are used before you sign up.");
for (const p of guideLike(/^\/tools\/[^/]+$/)) out.push(line(p));
out.push("");

out.push("## Industry pages");
for (const p of guideLike(/^\/lp\/[^/]+$/)) out.push(line(p));
out.push("");
out.push("## Locations");
for (const p of guideLike(/^\/b2b-lead-generation-[^/]+$/)) out.push(line(p));
out.push("");

out.push("## Do not infer");
for (const d of facts.doNotInfer) out.push(`- ${d}`);
out.push("");

const text = out.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";

if (CHECK) {
  const current = exists(OUT) ? read(OUT) : "";
  if (current !== text) {
    console.error("[llms-full] public/llms-full.txt is out of date. Run: npm run llms:build");
    process.exit(1);
  }
  console.log(`[llms-full] ok (${text.split("\n").length} lines, ${pages.length} pages considered)`);
} else {
  fs.writeFileSync(OUT, text);
  const untitled = pages.filter((p) => !p.description && /^\/(blog|resources\/guides|resources\/glossary|tools|lp)\//.test(p.path)).map((p) => p.path);
  console.log(`[llms-full] wrote public/llms-full.txt (${text.split("\n").length} lines, ${pages.length} pages considered)` + (untitled.length ? `; no description found for: ${untitled.join(", ")}` : ""));
}
