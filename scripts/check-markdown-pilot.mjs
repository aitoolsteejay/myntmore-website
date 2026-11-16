import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { parse } from "node-html-parser";

const origin = process.argv[2] ?? "http://127.0.0.1:4336";
const enabled = !process.argv.includes("--disabled");
const canonicalOrigin = "https://www.myntmore.com";
const pilot = [
  "/", "/about-us", "/services", "/services/gtm-strategy", "/services/sales-intelligence",
  "/case-studies/agencies-it-usa-software-development",
  "/resources/blogs/account-targeting-strategy", "/resources/blogs/b2b-lead-generation-for-it-services",
];
const normalize = (text) => text.replace(/\s+/g, " ").trim();

async function get(path, accept, options = {}) {
  const headers = new Headers(options.headers);
  if (accept) headers.set("accept", accept);
  if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET && new URL(origin).hostname.endsWith(".vercel.app")) {
    headers.set("x-vercel-protection-bypass", process.env.VERCEL_AUTOMATION_BYPASS_SECRET);
  }
  return fetch(new URL(path, origin), { ...options, headers, redirect: "manual", signal: AbortSignal.timeout(60_000) });
}

function expectType(response, type, status = 200) {
  assert.equal(response.status, status, response.url);
  assert.ok(response.headers.get("content-type")?.startsWith(type), `${response.url}: expected ${type}`);
}

for (const path of pilot) {
  const html = await get(path, "text/html");
  expectType(html, "text/html");
  const page = parse(await html.text());
  const canonical = page.querySelector('link[rel="canonical"]')?.getAttribute("href");
  assert.equal(new URL(canonical).href, new URL(path, canonicalOrigin).href);
  assert.ok(page.querySelector("title")?.text);
  assert.ok(page.querySelector('meta[name="description"]')?.getAttribute("content"));
  assert.ok(page.querySelector('meta[property="og:title"]')?.getAttribute("content"));
  const structuredData = page.querySelectorAll('script[type="application/ld+json"]');
  assert.ok(structuredData.length, `Missing structured data on ${path}`);
  for (const script of structuredData) assert.ok(JSON.parse(script.rawText));

  const alternate = await get(path, "text/markdown");
  expectType(alternate, enabled ? "text/markdown" : "text/html");
  if (enabled) {
    assert.match(alternate.headers.get("vary") ?? "", /\bAccept\b/i);
    assert.match(alternate.headers.get("cache-control") ?? "", /\bno-store\b/);
    assert.match(alternate.headers.get("link") ?? "", /rel="canonical"/);
    const markdown = await alternate.text();
    const heading = page.querySelector("main h1");
    assert.ok(heading);
    const title = normalize(heading.childNodes.map((node) => node.text).join(" ")).replace(/[\\`*_~\[\]<>|]/g, "\\$&");
    assert.equal(markdown.split("\n")[0], `# ${title}`);
    assert.equal(markdown.match(/^# /gm)?.length, 1);
    assert.ok(markdown.endsWith(`[Original page](${new URL(path, canonicalOrigin).href})\n`));
    assert.doesNotMatch(markdown, /footer-newsletter-email|<script/);
    if (path === "/services") assert.match(markdown, /\]\(https:\/\/www\.myntmore\.com\/services\/gtm-strategy\)/);
    if (path.includes("usa-software-development")) {
      assert.match(markdown, /Results across the funnel/);
      assert.match(markdown, /Meetings booked 24/);
    }
  } else {
    await alternate.body?.cancel();
  }
  const followUp = await get(path, "text/html");
  expectType(followUp, "text/html");
  await followUp.body?.cancel();
}
console.log(`${pilot.length} pilot URLs passed HTML, metadata, and format checks (${enabled ? "enabled" : "disabled"}).`);

for (const [accept, wantsMarkdown] of [
  [undefined, false], ["*/*", false], ["application/json", false],
  ["text/html;q=0.9, text/markdown;q=0.2", false],
  ["text/html;q=0.2, text/markdown;q=0.9", true],
  ["text/html", false], ["text/markdown", true], ["text/html", false],
]) {
  const response = await get("/services", accept);
  expectType(response, enabled && wantsMarkdown ? "text/markdown" : "text/html");
  await response.body?.cancel();
}
const head = await get("/services", "text/markdown", { method: "HEAD" });
expectType(head, enabled ? "text/markdown" : "text/html");
assert.equal(await head.text(), "");

for (const path of ["/services", "/services?_rsc=pilot-test"]) {
  const rsc = await get(path, "text/markdown", { headers: { RSC: "1" } });
  expectType(rsc, "text/x-component");
  await rsc.body?.cancel();
}
const routerQuery = await get("/services?_rsc=pilot-test", "text/markdown");
expectType(routerQuery, "text/html");
await routerQuery.body?.cancel();
const redirect = await get("/about", "text/markdown");
assert.equal(redirect.status, 308);
assert.equal(new URL(redirect.headers.get("location"), origin).pathname, "/about-us");
await redirect.body?.cancel();
const missing = await get("/resources/blogs/__markdown_pilot_missing__", "text/markdown");
expectType(missing, "text/html", 404);
await missing.body?.cancel();
for (const [path, type] of [["/logo.png", "image/png"], ["/api/vcard/enwil-fernandes", "text/vcard"]]) {
  const response = await get(path, "text/markdown");
  expectType(response, type);
  await response.body?.cancel();
}
const robots = await get("/robots.txt", "text/markdown");
expectType(robots, "text/plain");
assert.match(await robots.text(), /Sitemap: https:\/\/www\.myntmore\.com\/sitemap\.xml/i);
const sitemap = await get("/sitemap.xml", "text/markdown");
expectType(sitemap, "application/xml");
const sitemapBody = await sitemap.text();
assert.match(sitemapBody, /<urlset\b/);
for (const path of pilot.filter((path) => path !== "/")) {
  assert.ok(sitemapBody.includes(`<loc>${new URL(path, canonicalOrigin).href}</loc>`), path);
}
console.log("Negotiation, routing, robots.txt, and sitemap checks passed.");

const landingPages = (await readdir(new URL("../app/lp/", import.meta.url), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory());
for (const entry of landingPages) {
  const response = await get(`/lp/${entry.name}`, "text/markdown");
  expectType(response, "text/html");
  const page = parse(await response.text());
  const footers = page.querySelectorAll('footer[aria-label="Site footer"]');
  assert.equal(footers.length, 1, entry.name);
  assert.ok(footers[0].querySelector("#footer-newsletter-email"), entry.name);
  assert.ok(footers[0].querySelector('a[href="/privacy-policy"]'), entry.name);
}
console.log(`${landingPages.length} landing pages returned HTML with the shared Myntmore footer.`);
