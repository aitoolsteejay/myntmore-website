// One-time conversion: moves the visible text of a hand-written page into a content file the admin can
// edit, and makes the page read it from there.
//
//   node scripts/admin/extract-page-copy.mjs <page folder> <key> "<Admin title>" <group> [--dry]
//   e.g. node scripts/admin/extract-page-copy.mjs app/resources/guides/golden-icp-framework guideGoldenIcpFramework "The Golden ICP Framework" guides
//
// For every .tsx file in the folder it finds, with the TypeScript parser:
//   - text between tags (exactly as React renders it: JSX whitespace rules, HTML entities decoded),
//   - alt, placeholder and title attributes,
//   - text in the page's own lists and cards (string values of properties such as title, desc, q, a in
//     arrays and objects, and plain strings in arrays), skipping addresses, colours, class names,
//     structured data and metadata.
// Each one is replaced by a reference into content/page-copy/<key>.json, grouped by the nearest section
// heading, and the admin form is written to content/page-copy/schemas/<key>.ts. The page renders exactly
// the same text; check it by comparing the built HTML before and after.
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { decodeHTML } from "entities";

const [dir, key, title, group, ...flags] = process.argv.slice(2);
if (!dir || !key || !title || !group) {
  console.error('usage: extract-page-copy.mjs <page folder> <key> "<title>" <group> [--dry]');
  process.exit(2);
}
const DRY = flags.includes("--dry");
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");

// Property names whose string values are page text. Anything else (href, icon, colour…) is left in code.
const TEXT_PROPS = new Set([
  "title", "label", "text", "desc", "description", "heading", "subheading", "subtitle", "body", "quote", "q", "a",
  "question", "answer", "caption", "note", "tagline", "cta", "value", "stat", "v", "l", "step", "name", "role",
  "company", "content", "summary", "excerpt", "eyebrow", "badge", "intro", "tip", "example", "prompt", "why",
  "what", "how", "result", "results", "before", "after", "problem", "solution", "outcome", "metric", "feature",
  "detail", "details", "headline", "lead", "copy", "message", "subject", "line", "bullet", "point", "pro", "con",
  "do", "dont", "good", "bad", "use", "category", "phase", "time", "day", "week", "kicker", "hint", "output",
  "input", "task", "goal", "action", "tool", "price", "plan", "benefit", "pain", "gain", "insight", "takeaway",
  "author", "source", "date", "duration", "level", "tag", "pill", "chip", "button", "link", "linkText", "short",
]);
const ATTRS = new Set(["alt", "placeholder", "title"]);
const HEADING_TAGS = new Set(["h1", "h2", "h3"]);
const TAG_LABEL = {
  h1: "Headline", h2: "Section heading", h3: "Subheading", h4: "Small heading", h5: "Small heading", h6: "Small heading",
  p: "Paragraph", li: "List item", a: "Link text", Link: "Link text", button: "Button", blockquote: "Quote", cite: "Quote source",
  td: "Table cell", th: "Table heading", label: "Form label", figcaption: "Caption", code: "Code", strong: "Bold text", em: "Italic text",
  summary: "Question", dt: "Term", dd: "Definition", option: "Choice",
};

function jsxText(raw) {
  // React/Babel's rule for JSX text: trim each line's indentation, drop blank lines, join with spaces.
  const lines = raw.split(/\r\n|\n|\r/);
  let lastNonEmpty = 0;
  lines.forEach((l, i) => {
    if (/[^ \t]/.test(l)) lastNonEmpty = i;
  });
  let out = "";
  lines.forEach((line, i) => {
    let t = line.replace(/\t/g, " ");
    if (i !== 0) t = t.replace(/^[ ]+/, "");
    if (i !== lines.length - 1) t = t.replace(/[ ]+$/, "");
    if (t) {
      if (i !== lastNonEmpty) t += " ";
      out += t;
    }
  });
  return decodeHTML(out);
}

const looksLikeText = (s) =>
  /[A-Za-z]/.test(s) &&
  !/^(\/|#|https?:|mailto:|tel:|data:|\.\.?\/|@\/)/.test(s) &&
  !/^[a-z0-9:\[\]\/#.%_-]+( [a-z0-9:\[\]\/#.%_-]+)*$/.test(s.trim()) || /[A-Z]/.test(s[0] ?? "") && /[a-z]/.test(s);

function tagName(el) {
  const t = ts.isJsxElement(el) ? el.openingElement.tagName : ts.isJsxSelfClosingElement(el) ? el.tagName : null;
  return t ? t.getText() : null;
}

const files = fs
  .readdirSync(path.join(root, dir))
  .filter((f) => f.endsWith(".tsx"))
  .sort((a, b) => (a === "page.tsx" ? -1 : b === "page.tsx" ? 1 : a.localeCompare(b)));

const json = {};
const schemaSections = [];
let sectionNo = 0;

for (const file of files) {
  const rel = path.join(dir, file);
  const src = fs.readFileSync(path.join(root, rel), "utf8");
  const sf = ts.createSourceFile(rel, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const found = []; // { start, end, replace(expr), value, label, kind }
  let headingForNext = null;

  const inSkippedDecl = (node) => {
    for (let n = node; n; n = n.parent) {
      if (ts.isVariableDeclaration(n)) {
        const name = n.name.getText();
        if (name === "metadata" || /SCHEMA|Schema|schema|JSON_LD|jsonLd/.test(name)) return true;
        if (n.initializer && /"@context"/.test(n.initializer.getText())) return true;
      }
      if (ts.isJsxAttribute(n) && n.name.getText() === "data") return true; // <JsonLd data={...} />
      if (ts.isCallExpression(n) && /^(withPageSeo|buildArticleSchema|buildFaqSchema|buildHowToSchema|JSON\.stringify|fetch|useState|cn|clsx|twMerge)$/.test(n.expression.getText())) return true;
      if (ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) return true;
    }
    return false;
  };

  function visit(node) {
    if (ts.isJsxText(node)) {
      const value = jsxText(node.getFullText());
      if (value.trim() && /[A-Za-z0-9]/.test(value)) {
        const parentEl = node.parent;
        const tag = tagName(parentEl) ?? "text";
        if (tag === "style" || tag === "script") return;
        const label = TAG_LABEL[tag] ?? "Text";
        if (HEADING_TAGS.has(tag) && tag !== "h1") headingForNext = value.trim();
        found.push({ start: node.getFullStart(), end: node.getEnd(), wrap: (e) => `{${e}}`, value, label, heading: HEADING_TAGS.has(tag) && tag !== "h1" ? value.trim() : null });
      }
      return;
    }
    if (ts.isJsxAttribute(node) && ATTRS.has(node.name.getText()) && node.initializer && ts.isStringLiteral(node.initializer)) {
      const value = node.initializer.text;
      if (looksLikeText(value) && !inSkippedDecl(node)) {
        const attr = node.name.getText();
        found.push({ start: node.initializer.getStart(), end: node.initializer.getEnd(), wrap: (e) => `{${e}}`, value, label: attr === "alt" ? "Image description" : attr === "placeholder" ? "Example inside a box" : "Hover text" });
      }
      return;
    }
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && !inSkippedDecl(node)) {
      const p = node.parent;
      let label = null;
      if (ts.isPropertyAssignment(p) && p.initializer === node && TEXT_PROPS.has(p.name.getText().replace(/['"]/g, ""))) label = p.name.getText().replace(/['"]/g, "");
      else if (ts.isArrayLiteralExpression(p) && /\s/.test(node.text.trim())) label = "item";
      else if (ts.isVariableDeclaration(p) && p.initializer === node && ts.isNoSubstitutionTemplateLiteral(node) && /\s/.test(node.text)) label = p.name.getText();
      else if (ts.isJsxExpression(p) && ts.isStringLiteral(node) && node.text.trim() && /[A-Za-z]/.test(node.text) && !ts.isJsxAttribute(p.parent)) label = "text";
      if (label && looksLikeText(node.text) && !(ts.isJsxAttribute(p) || (ts.isJsxExpression(p) && ts.isJsxAttribute(p.parent)))) {
        found.push({ start: node.getStart(), end: node.getEnd(), wrap: (e) => e, value: node.text, label: labelForProp(label) });
      }
      return;
    }
    ts.forEachChild(node, visit);
  }
  ts.forEachChild(sf, visit);
  if (!found.length) continue;
  found.sort((a, b) => a.start - b.start);

  // Group: a new section starts at each h2/h3 heading; text before the first heading is "Top of the page".
  const sections = [];
  for (const f of found) {
    if (f.heading || !sections.length) sections.push({ title: f.heading ?? (sections.length ? "More" : file === "page.tsx" ? "Top of the page" : `${file.replace(/\.tsx$/, "")}: top`), items: [] });
    sections[sections.length - 1].items.push(f);
  }
  const prefix = file === "page.tsx" ? "" : file.replace(/\.tsx$/, "").replace(/[^A-Za-z0-9]/g, "") + "_";
  for (const sec of sections) {
    sectionNo++;
    const sKey = `${prefix}s${String(sectionNo).padStart(2, "0")}`;
    json[sKey] = {};
    const counts = {};
    const fieldsOut = [];
    sec.items.forEach((f, i) => {
      const fKey = `t${String(i + 1).padStart(2, "0")}`;
      json[sKey][fKey] = f.value;
      counts[f.label] = (counts[f.label] ?? 0) + 1;
      f.expr = `copy.${sKey}.${fKey}`;
      fieldsOut.push({ fKey, label: `${f.label} ${counts[f.label]}`, multiline: f.value.length > 90 || f.value.includes("\n") });
    });
    // Single occurrences need no number.
    for (const fo of fieldsOut) {
      const base = fo.label.replace(/ \d+$/, "");
      if (counts[base] === 1) fo.label = base;
    }
    schemaSections.push({ sKey, title: sec.title, fields: fieldsOut });
  }

  // Rewrite from the end so earlier offsets stay valid.
  let out = src;
  for (const f of [...found].sort((a, b) => b.start - a.start)) out = out.slice(0, f.start) + f.wrap(f.expr) + out.slice(f.end);
  const importLine = `import pageCopy from "@/content/page-copy/${key}.json";\n\n// This page's text is edited in the admin ("${title}") and lives in content/page-copy/${key}.json.\nconst copy = pageCopy;\n`;
  const imports = [...out.matchAll(/^import[\s\S]*?from\s+["'][^"']+["'];?[ \t]*\n/gm)];
  const at = imports.length ? imports[imports.length - 1].index + imports[imports.length - 1][0].length : out.startsWith('"use client"') ? out.indexOf("\n") + 1 : 0;
  out = out.slice(0, at) + importLine + out.slice(at);
  if (!DRY) fs.writeFileSync(path.join(root, rel), out);
  console.log(`${rel}: ${found.length} texts in ${sections.length} sections`);
}

function labelForProp(p) {
  const map = { q: "Question", a: "Answer", desc: "Text", v: "Figure", l: "Label", item: "List item", text: "Text", value: "Figure", stat: "Figure" };
  if (map[p]) return map[p];
  if (/^[A-Z_]+$/.test(p)) return `Text block (${p.toLowerCase().replace(/_/g, " ")})`;
  return p.charAt(0).toUpperCase() + p.slice(1).replace(/([A-Z])/g, " $1").toLowerCase();
}

const esc = (s) => JSON.stringify(s);
const schema = `// Generated by scripts/admin/extract-page-copy.mjs for ${dir}. The admin form for content/page-copy/${key}.json:
// one group per section of the page, named after its heading when the page was converted.
import { fields } from "../../../lib/admin/fields";

export const ${key}Schema = {
${schemaSections
  .map(
    (s) => `  ${s.sKey}: fields.object(
    {
${s.fields.map((f) => `      ${f.fKey}: fields.text({ label: ${esc(f.label)}${f.multiline ? ", multiline: true" : ""} }),`).join("\n")}
    },
    { label: ${esc(s.title.length > 90 ? s.title.slice(0, 87) + "…" : s.title)} },
  ),`,
  )
  .join("\n")}
};
`;

const route = "/" + dir.replace(/^app\//, "").replace(/\/?\(.*?\)/g, "");
if (!DRY) {
  fs.mkdirSync(path.join(root, "content/page-copy/schemas"), { recursive: true });
  fs.writeFileSync(path.join(root, `content/page-copy/${key}.json`), JSON.stringify(json, null, 2) + "\n");
  fs.writeFileSync(path.join(root, `content/page-copy/schemas/${key}.ts`), schema);
  // Register the page: the admin and Keystatic read this list.
  const regPath = path.join(root, "content/page-copy/registry.json");
  const reg = fs.existsSync(regPath) ? JSON.parse(fs.readFileSync(regPath, "utf8")) : [];
  const entry = { key, title, group, route, dir };
  const i = reg.findIndex((r) => r.key === key);
  if (i >= 0) reg[i] = entry;
  else reg.push(entry);
  fs.writeFileSync(regPath, JSON.stringify(reg, null, 2) + "\n");
}
console.log(`${key}: ${Object.values(json).reduce((n, s) => n + Object.keys(s).length, 0)} texts, ${schemaSections.length} sections${DRY ? " (dry run)" : ""}`);
