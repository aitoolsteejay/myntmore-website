// Generates app/site-audit/data.json: every page on the site, whether it is
// reachable through real internal links (or an orphan), and the legacy
// redirects. Runs automatically before `next build` (see package.json), so
// the /site-audit page is rebuilt from the code on every deploy.
//
//   node scripts/generate-site-map.mjs
//
// How "linked" is decided
// -----------------------
// A page counts as linked only if it can be reached by following links from
// the homepage. A link is a string in a link-like position in the source
// (href=, to:, link:, path:, router.push(), redirect(), ...). Links found in
// the XML sitemap, the HTML /sitemap page and the audit page itself are
// ignored -- those exist to list every page, so counting them would make
// everything look linked. A link to a legacy redirect source counts as a
// link to its destination.
//
// Files under app/<route>/ belong to that route. Every other file
// (components/, lib/, app/components/, layouts) is "shared": its links are
// treated as reachable from everywhere (nav, footer, shared widgets).
//
// Known limits: links assembled at runtime (template literals such as
// `/resources/blogs/${slug}`) are matched by the slug appearing as a quoted string next
// to such a link; anything fancier will show up as an orphan and is worth a
// manual look.

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const ROOT = process.cwd();
const APP = path.join(ROOT, "app");
const OUT = path.join(APP, "site-audit", "data.json");
const SITE = "https://www.myntmore.com";
const require = createRequire(import.meta.url);

// URLs that must not be published on a publicly reachable page: the private
// pricing pages and cold emailing overviews (shared only with prospects) and
// the admin room, plus the internal strategy references (value proposition, master ICP).
// The cold emailing prefix covers the -mars and -earth pages and any legacy cold-emailing
// package paths.
const isPrivate = (p) =>
  p === "/plans" ||
  p.startsWith("/plans/") ||
  p.startsWith("/menti/room") ||
  p.startsWith("/cold-emailing-package") ||
  p === "/value-prop" ||
  p === "/master-icp";
// Legacy redirects that point at (or stand in for) a private page.
const isPrivateRedirect = (r) =>
  isPrivate(r.from) || isPrivate(r.to) || r.from === "/international-pricing" || r.from === "/indian-pricing";

const read = (f) => fs.readFileSync(f, "utf8");
const exists = (f) => fs.existsSync(f);
const rel = (f) => path.relative(ROOT, f).split(path.sep).join("/");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const normalize = (p) => {
  let s = p.split("#")[0].split("?")[0];
  if (!s.startsWith("/")) s = "/" + s;
  s = s.replace(/\/{2,}/g, "/");
  if (s.length > 1) s = s.replace(/\/$/, "");
  return s;
};

// ---- 1. Pages ---------------------------------------------------------------
const PAGE_RE = /^page\.(tsx|ts|jsx|js|mdx)$/;
const appFiles = walk(APP);
const pageDirs = appFiles
  .filter((f) => PAGE_RE.test(path.basename(f)))
  .map((f) => ({ file: f, dir: path.dirname(f) }));

function dirToRoute(dir) {
  const segs = path
    .relative(APP, dir)
    .split(path.sep)
    .filter(Boolean)
    .filter((s) => !/^\(.*\)$/.test(s)); // route groups don't appear in the URL
  return "/" + segs.join("/");
}

// Expand a dynamic segment from a page that keeps its params in a literal
// object (app/plans/[code] keeps them as the keys of a PLANS record).
function expandDynamic(route, file) {
  const m = route.match(/\[([^\]]+)\]/);
  if (!m) return [route];
  const src = read(file);
  const block = src.match(/const\s+\w+[^=]*=\s*\{([\s\S]*?)\n\};/);
  const keys = block ? [...block[1].matchAll(/^ {2}["']?([\w-]+)["']?:\s*\{/gm)].map((k) => k[1]) : [];
  return keys.length ? keys.map((k) => route.replace(m[0], k)) : [route];
}

const pages = [];
for (const { file, dir } of pageDirs) {
  const route = dirToRoute(dir);
  const src = [file, path.join(dir, "layout.tsx")].filter(exists).map(read).join("\n");
  const titleMatch = read(file).match(/metadata[^=]*=\s*\{[\s\S]*?\btitle:\s*(?:"([^"]+)"|'([^']+)'|`([^`$]+)`)/);
  const title = titleMatch ? (titleMatch[1] || titleMatch[2] || titleMatch[3]).trim() : null;
  const noindex = /index:\s*false/.test(src);
  for (const p of expandDynamic(route, file)) {
    pages.push({ path: p, dir: rel(dir), title, noindex, dynamic: p !== route, generatedParams: /generateStaticParams\s*\(/.test(src) });
  }
}
// Blog posts live in content/posts/*.mdoc (written in the Keystatic admin) and are all rendered by
// app/resources/blogs/[slug]. Each published one is a page of its own for this audit.
const cmsPosts = [];
const postsDir = path.join(ROOT, "content", "posts");
if (fs.existsSync(postsDir)) {
  for (const f of fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdoc")).sort()) {
    const src = fs.readFileSync(path.join(postsDir, f), "utf8");
    const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
    if (!/^published:\s*true\s*$/m.test(fm)) continue;
    const unq = (v) => v.trim().replace(/^"(.*)"$/s, "$1").replace(/^'(.*)'$/s, "$1");
    const title = unq(fm.match(/^metaTitle:\s*(.+)$/m)?.[1] ?? "") || unq(fm.match(/^title:\s*(.+)$/m)?.[1] ?? "") || null;
    const slug = f.replace(/\.mdoc$/, "");
    cmsPosts.push({ slug, route: `/resources/blogs/${slug}`, file: `content/posts/${f}`, src });
    pages.push({ path: `/resources/blogs/${slug}`, dir: `content/posts/${f}`, title, noindex: false, dynamic: false, generatedParams: false });
  }
}
const routeSet = new Set(pages.map((p) => p.path));

// ---- 2. Redirects & rewrites ------------------------------------------------
const nextConfig = require(path.join(ROOT, "next.config.js"));
const redirects = nextConfig.redirects ? await nextConfig.redirects() : [];
const rewrites = nextConfig.rewrites ? await nextConfig.rewrites() : [];
const redirectMap = new Map(redirects.map((r) => [normalize(r.source), normalize(r.destination)]));

// ---- 3. What the XML / HTML sitemaps list -----------------------------------
const xmlSrc = read(path.join(APP, "sitemap.ts"));
const inXml = new Set(
  [...xmlSrc.matchAll(/\$\{base\}(\/[^`"'\s]*)/g)].map((m) => normalize(m[1])).concat(/url:\s*base\b/.test(xmlSrc) ? ["/"] : []),
);
const htmlSitemapFile = path.join(APP, "sitemap", "page.tsx");
const inHtml = new Set(
  exists(htmlSitemapFile)
    ? [...read(htmlSitemapFile).matchAll(/href:\s*["'`](\/[^"'`\s]*)/g)].map((m) => normalize(m[1]))
    : [],
);

// Every published CMS post is in the XML sitemap and on the HTML sitemap page (both are built from the CMS).
for (const post of cmsPosts) { inXml.add(post.route); inHtml.add(post.route); }

// ---- 4. Links -----------------------------------------------------------------
// Sources that list pages rather than link to them.
const IGNORED_SOURCES = [rel(path.join(APP, "sitemap.ts")), "app/sitemap/", "app/site-audit/"];
const ignored = (f) => IGNORED_SOURCES.some((s) => rel(f) === s || rel(f).startsWith(s));

const codeFiles = [APP, path.join(ROOT, "components"), path.join(ROOT, "lib")]
  .filter(exists)
  .flatMap((d) => walk(d))
  // lib/case-study-library.json holds the slugs of the 50 library case studies that the
  // /case-studies listing links to (as `/case-studies/${cs.slug}`), so it is read as a data source.
  .filter((f) => /\.(tsx?|jsx?|mdx?)$/.test(f) || rel(f) === "lib/case-study-library.json")
  .filter((f) => !ignored(f));

const ownerOf = (file) => {
  // A long-form case study's body lives in components/case-studies/long/<slug>.tsx; its page is /case-studies/<slug>.
  const long = rel(file).match(/^components\/case-studies\/long\/([^/]+)\.tsx$/);
  if (long && pageDirs.some((p) => dirToRoute(p.dir) === `/case-studies/${long[1]}`)) return `/case-studies/${long[1]}`;
  // Nearest ancestor directory (under app/) that holds a page.
  let d = path.dirname(file);
  while (d.startsWith(APP) && d !== path.dirname(APP)) {
    if (pageDirs.some((p) => p.dir === d)) return dirToRoute(d);
    if (d === APP) break;
    d = path.dirname(d);
  }
  return "shared";
};

const ORIGIN = String.raw`(?:https?:\/\/(?:www\.)?myntmore\.com)?`;
const CTX = String.raw`(?:href|(?:source|further)Href|to|link|path|route|cta\w*|push|replace|redirect|permanentRedirect|location(?:\.href)?)`;
const LINK_RE = new RegExp(CTX + String.raw`\s*[=:(]\s*\{?\s*["'\x60]` + ORIGIN + String.raw`(\/[^"'\x60\s$\{\}<>]*)`, "g");
const TEMPLATE_RE = new RegExp(CTX + String.raw`\s*[=:(]\s*\{?\s*\x60` + ORIGIN + String.raw`(\/[^"'\x60\s$\{\}<>]*)\$\{`, "g");

const edges = []; // { from: route|"shared", fromFile, to }
const templatePrefixes = []; // { owner, file, prefix, src }
for (const f of codeFiles) {
  const src = read(f);
  const owner = ownerOf(f);
  for (const m of src.matchAll(LINK_RE)) {
    const to = normalize(m[1]);
    edges.push({ from: owner, fromFile: rel(f), to: redirectMap.get(to) ?? to });
  }
  for (const m of src.matchAll(TEMPLATE_RE)) {
    templatePrefixes.push({ owner, file: rel(f), prefix: m[1], src });
  }
  // Links held in a constant, e.g. `const DIY_HREF = "/services/x"` ... `href={DIY_HREF}`.
  for (const m of src.matchAll(/\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*["'`]((?:https?:\/\/(?:www\.)?myntmore\.com)?\/[^"'`\s$\{\}<>]*)["'`]/g)) {
    const [, name, value] = m;
    const used = new RegExp(CTX + String.raw`\s*[=:(]\s*\{?\s*` + name.replace(/\$/g, "\\$") + String.raw`\b`).test(src);
    if (!used) continue;
    const to = normalize(value.replace(/^https?:\/\/(?:www\.)?myntmore\.com/, ""));
    edges.push({ from: owner, fromFile: rel(f), to: redirectMap.get(to) ?? to });
  }
}

// Some long-form case studies share a layout component (components/case-studies/long/CaseStudyStory*.tsx), and each
// page is a thin wrapper (components/case-studies/long/<slug>.tsx) around it. A link written in the shared layout is
// on every page that uses it, so credit it to each of those pages instead of to "shared".
{
  const longDir = path.join(ROOT, "components/case-studies/long");
  if (exists(longDir)) {
    const usedBy = new Map(); // shared layout file -> routes of the pages that use it
    for (const f of fs.readdirSync(longDir).filter((f) => f.endsWith(".tsx") && !f.startsWith("CaseStudyStory"))) {
      const slug = f.replace(/\.tsx$/, "");
      const route = `/case-studies/${slug}`;
      if (!pageDirs.some((p) => dirToRoute(p.dir) === route)) continue;
      for (const m of read(path.join(longDir, f)).matchAll(/from\s+["']\.\/(CaseStudyStory\w+)["']/g)) {
        const key = `components/case-studies/long/${m[1]}.tsx`;
        usedBy.set(key, [...(usedBy.get(key) ?? []), route]);
      }
    }
    for (const e of [...edges]) {
      const routes = usedBy.get(e.fromFile);
      if (!routes) continue;
      edges.splice(edges.indexOf(e), 1);
      for (const r of routes) edges.push({ ...e, from: r });
    }
  }
}

// Every glossary term page renders through components/glossary/GlossaryTerm.tsx, so a link written there (the
// breadcrumb, "Back to the glossary") is on every term page: credit it to each of them instead of to "shared".
{
  const termRoutes = pageDirs
    .map((p) => ({ route: dirToRoute(p.dir), file: path.join(p.dir, "page.tsx") }))
    .filter((p) => /^\/resources\/glossary\/[^/]+$/.test(p.route) && exists(p.file) && /<GlossaryTerm\b/.test(read(p.file)))
    .map((p) => p.route);
  for (const e of [...edges]) {
    if (e.fromFile !== "components/glossary/GlossaryTerm.tsx") continue;
    edges.splice(edges.indexOf(e), 1);
    for (const r of termRoutes) edges.push({ ...e, from: r });
  }
}

// Links inside CMS posts (markdown links, related reading, the call-to-action box, tool callouts), and the
// blog index, which lists every published post.
for (const post of cmsPosts) {
  const targets = new Set([
    ...[...post.src.matchAll(/\]\((\/[^)\s#]*)/g)].map((m) => m[1]),
    ...[...post.src.matchAll(/^\s*(?:- )?href:\s*["']?(\/[^"'\s#]*)/gm)].map((m) => m[1]),
  ]);
  for (const t of targets) {
    const to = normalize(t);
    edges.push({ from: post.route, fromFile: post.file, to: redirectMap.get(to) ?? to });
  }
  edges.push({ from: "/resources/blogs", fromFile: "app/resources/blogs/page.tsx", to: post.route });
}

// Links inside the service page JSON: content/service-pages holds the copy of the five template services,
// content/service-copy the copy of cold email, LinkedIn outreach and the self-serve tool. A string value that is
// a bare site path (e.g. "/case-studies/saas-series-a") is a link from that service's page.
// content/case-study-long holds the copy of the long-form case studies (same rule, links from /case-studies/<slug>).
for (const [dir, routePrefix] of [["content/service-pages", "/services"], ["content/service-copy", "/services"], ["content/case-study-long", "/case-studies"]]) {
  const abs = path.join(ROOT, dir);
  if (!exists(abs)) continue;
  for (const f of fs.readdirSync(abs).filter((f) => f.endsWith(".json")).sort()) {
    const slug = f.replace(/\.json$/, "");
    const targets = new Set();
    const collect = (v) => {
      if (typeof v === "string") {
        if (/^\/[A-Za-z0-9\-_/]*$/.test(v)) targets.add(v);
        for (const m of v.matchAll(/\]\((\/[A-Za-z0-9\-_/]*)\)/g)) targets.add(m[1]); // [text](/path) inside a paragraph
      }
      else if (Array.isArray(v)) v.forEach(collect);
      else if (v && typeof v === "object") Object.values(v).forEach(collect);
    };
    collect(JSON.parse(read(path.join(abs, f))));
    for (const t of targets) {
      const to = normalize(t);
      edges.push({ from: `${routePrefix}/${slug}`, fromFile: `${dir}/${f}`, to: redirectMap.get(to) ?? to });
    }
  }
}

// The glossary index links to every term from lib/glossary-index.generated.json (built from content/glossary).
const glossaryCards = path.join(ROOT, "lib", "glossary-index.generated.json");
if (exists(glossaryCards)) {
  for (const card of JSON.parse(read(glossaryCards))) {
    edges.push({ from: "/resources/glossary", fromFile: "app/resources/glossary/page.tsx", to: normalize(card.href) });
  }
}

// The case studies listing links to every detailed case study from lib/case-study-detail-cards.generated.json.
const detailCards = path.join(ROOT, "lib", "case-study-detail-cards.generated.json");
if (exists(detailCards)) {
  for (const card of JSON.parse(read(detailCards))) {
    edges.push({ from: "/case-studies", fromFile: "app/case-studies/CaseStudiesClient.tsx", to: normalize(`/case-studies/${card.slug}`) });
  }
}

// Runtime-built links like `/resources/blogs/${slug}`: attribute them to every page under
// that prefix whose last segment appears as a quoted string in the same file
// (or in a data file in lib/ or the same folder).
const dataSources = codeFiles.filter((f) => /\/(lib|data)\//.test(rel(f)) || /data|posts|articles|glossary/i.test(path.basename(f)) || rel(f) === "lib/case-study-library.json");
for (const t of templatePrefixes) {
  const prefix = normalize(t.prefix);
  const pool = [t.src, ...dataSources.filter((f) => rel(f).startsWith(path.dirname(t.file)) || rel(f).startsWith("lib/")).map(read)];
  for (const p of pages) {
    if (!p.path.startsWith(prefix + "/")) continue;
    const slug = p.path.split("/").pop();
    if (pool.some((s) => s.includes(`"${slug}"`) || s.includes(`'${slug}'`) || s.includes("`" + slug + "`"))) {
      edges.push({ from: t.owner, fromFile: t.file, to: p.path });
    }
  }
}

// Pages named as a string somewhere outside their own folder without being a
// navigation link (form redirect targets, embeds, canonical hints in other
// files). Not enough to count as linked, but worth showing.
const referencedElsewhere = new Map(); // route -> first file that names it
for (const f of codeFiles) {
  const src = read(f);
  for (const m of src.matchAll(/["'`](?:https?:\/\/(?:www\.)?myntmore\.com)?(\/[a-z0-9][a-z0-9\-_/]*)["'`]/gi)) {
    const to = normalize(m[1]);
    if (!routeSet.has(to)) continue;
    const owner = ownerOf(f);
    if (owner === to) continue;
    if (!referencedElsewhere.has(to)) referencedElsewhere.set(to, rel(f));
  }
}

// ---- 5. Reachability from the homepage -----------------------------------------
const outgoing = new Map();
for (const e of edges) {
  if (e.from === "shared") continue;
  if (!outgoing.has(e.from)) outgoing.set(e.from, new Set());
  outgoing.get(e.from).add(e.to);
}
const roots = new Set(["/"]);
for (const e of edges) if (e.from === "shared") roots.add(e.to);

const reachable = new Set();
const queue = [...roots].filter((r) => routeSet.has(r) || r === "/");
for (const r of queue) reachable.add(r);
while (queue.length) {
  const cur = queue.shift();
  for (const to of outgoing.get(cur) ?? []) {
    if (reachable.has(to)) continue;
    reachable.add(to);
    queue.push(to);
  }
}

// ---- 6. Assemble ------------------------------------------------------------------
const inboundFor = (p) => {
  const seen = new Map();
  for (const e of edges) {
    if (e.to !== p || e.from === p || isPrivate(e.from)) continue;
    const key = e.from === "shared" ? `shared:${e.fromFile}` : e.from;
    if (!seen.has(key)) seen.set(key, e.from === "shared" ? e.fromFile.replace(/^(app\/components|components)\//, "") : e.from);
  }
  return [...seen.values()];
};

const titleFor = (p) =>
  p.title ||
  (p.path === "/"
    ? "Home"
    : p.path
        .split("/")
        .pop()
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()));

const out = pages
  .map((p) => {
    const inbound = inboundFor(p.path);
    // A dynamic route with explicit static params is intentionally represented
    // by its concrete URLs in the XML sitemap and should not be reported as a
    // public orphan under its bracketed source path.
    const linked = p.path === "/" || reachable.has(p.path) || ((p.dynamic || p.path.includes("[")) && p.generatedParams);
    const priv = isPrivate(p.path);
    return {
      path: priv ? null : p.path,
      private: priv || undefined,
      title: priv ? "Private pricing / admin page (URL withheld)" : titleFor(p),
      section: priv ? "private" : p.path === "/" ? "(home)" : p.path.split("/")[1],
      status: linked ? "linked" : "orphan",
      // An orphan with inbound links only has them from other orphans.
      linkedFrom: priv ? [] : inbound.slice(0, 8),
      inboundCount: priv ? 0 : inbound.length,
      noindex: p.noindex,
      referencedIn: !linked && !priv ? referencedElsewhere.get(p.path) ?? undefined : undefined,
      inXmlSitemap: inXml.has(p.path),
      inHtmlSitemap: inHtml.has(p.path),
    };
  })
  .sort((a, b) => (a.path ?? "~").localeCompare(b.path ?? "~"));

// A section with a single page (e.g. /feedback) isn't worth a group of its own.
const sectionSize = new Map();
for (const p of out) sectionSize.set(p.section, (sectionSize.get(p.section) ?? 0) + 1);
for (const p of out) {
  if (p.section !== "(home)" && p.section !== "private" && sectionSize.get(p.section) === 1) p.section = "other";
}

const publicRedirects = redirects.map((r) => ({ from: normalize(r.source), to: normalize(r.destination), permanent: !!r.permanent || r.statusCode === 301 || r.statusCode === 308 })).filter((r) => !isPrivateRedirect(r));
const hiddenRedirects = redirects.length - publicRedirects.length;

const data = {
  generatedAt: new Date().toISOString(),
  site: SITE,
  counts: {
    total: out.length,
    linked: out.filter((p) => p.status === "linked").length,
    orphan: out.filter((p) => p.status === "orphan").length,
    noindex: out.filter((p) => p.noindex).length,
    notInXmlSitemap: out.filter((p) => !p.inXmlSitemap).length,
    privateHidden: out.filter((p) => p.private).length,
  },
  pages: out,
  redirects: publicRedirects,
  hiddenRedirects,
  rewrites: rewrites.map((r) => ({ from: normalize(r.source), to: r.destination })),
  apiRoutes: appFiles.filter((f) => path.basename(f) === "route.ts").map((f) => dirToRoute(path.dirname(f))).sort(),
  method:
    "A page is 'linked' if it can be reached by following internal links from the homepage. Links in the XML sitemap, the HTML /sitemap page and this audit page are ignored.",
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
// Stable output unless something changed: keep the old timestamp if the
// page list is identical, so builds don't dirty the file for no reason.
let write = true;
if (exists(OUT)) {
  try {
    const prev = JSON.parse(read(OUT));
    const strip = (d) => JSON.stringify({ ...d, generatedAt: null });
    if (strip(prev) === strip(data)) write = false;
  } catch {}
}
if (write) fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n");
console.log(
  `site-audit: ${data.counts.total} pages (${data.counts.linked} linked, ${data.counts.orphan} orphan), ${publicRedirects.length} redirects${write ? "" : " [unchanged]"}`,
);
