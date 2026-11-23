// Builds the FAQ content the site reads, from the files the Keystatic admin edits:
//   content/faqs/homepage/*.json -> lib/faq-content.generated.json   (homepage FAQ section)
//   content/faqs/pages/*.json    -> lib/page-faqs.generated.json     (every other page, keyed by file name)
// Pass --check to fail if a generated file is out of date instead of writing it.
import fs from "node:fs";
import path from "node:path";
import { checkEntry } from "./lib/content-rules.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const CHECK = process.argv.includes("--check");

const readDir = (dir) =>
  fs
    .readdirSync(path.join(root, dir))
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => ({ id: f.replace(/\.json$/, ""), data: JSON.parse(fs.readFileSync(path.join(root, dir, f), "utf8")) }));

const cleanItem = ({ question, answer }) => {
  if (!question || !answer) throw new Error(`FAQ missing question or answer: ${question}`);
  return { question, answer };
};

// Homepage: one file per FAQ, ordered by `order`, optional links under the answer.
const homepage = readDir("content/faqs/homepage")
  .map(({ data }) => data)
  .sort((a, b) => a.order - b.order)
  .map(({ question, answer, links }) => {
    if (!question || !answer) throw new Error(`FAQ missing question or answer: ${question}`);
    return links && links.length ? { question, answer, links } : { question, answer };
  });

// Other pages: one file per page holding its list of questions, in the order the editor left them.
const pages = {};
for (const { id, data } of readDir("content/faqs/pages")) {
  // Build rules shared with the content admin: scripts/lib/content-rules.mjs
  const [first] = await checkEntry("pageFaqs", data, null);
  if (first) throw new Error(`content/faqs/pages/${id}.json: ${first.message}`);
  pages[id] = data.items.map(cleanItem);
}

const outputs = [
  ["lib/faq-content.generated.json", homepage, `${homepage.length} homepage FAQs`],
  ["lib/page-faqs.generated.json", pages, `FAQs for ${Object.keys(pages).length} pages`],
];

let stale = false;
for (const [file, value, label] of outputs) {
  const out = path.join(root, file);
  const next = JSON.stringify(value, null, 2) + "\n";
  if (CHECK) {
    const current = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : "";
    if (current !== next) {
      console.error(`[faqs] ${file} is stale, run npm run faqs:build`);
      stale = true;
    } else console.log(`[faqs] ok (${label})`);
  } else {
    fs.writeFileSync(out, next);
    console.log(`[faqs] wrote ${label}`);
  }
}
if (stale) process.exit(1);
