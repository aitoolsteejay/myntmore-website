// Checks the market pages (content/market-pages/*.json, edited in the admin as "Market pages")
// before a build: every required field is filled, each play links to a real case study page, and the
// city-links choice is one the page understands. lib/market-pages.ts reads the files directly, so a
// mistake here would otherwise only show up as a broken or half-empty page. The rules live in
// scripts/lib/content-rules.mjs, shared with the content admin.
//
//   node scripts/check-market-pages.mjs     exit 1 on any problem
import fs from "node:fs";
import path from "node:path";
import { checkEntry, MARKETS } from "./lib/content-rules.mjs";
import { fsContext } from "./lib/fs-context.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dir = path.join(root, "content/market-pages");
const ctx = fsContext(root);

const problems = [];
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
for (const f of files) {
  const data = { ...JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")), slug: f.replace(/\.json$/, "") };
  for (const p of await checkEntry("marketPages", data, ctx)) problems.push(`${f}: ${p.message}`);
}
for (const k of MARKETS) if (!files.includes(`${k}.json`)) problems.push(`content/market-pages/${k}.json is missing`);
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`[market-pages] ok (${files.length} pages)`);
