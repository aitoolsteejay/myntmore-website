// Keeps a generated block of entries in app/sitemap.ts in step with a content folder, between
// "// BEGIN generated: <name> (<script>)" and "// END generated: <name>" marker comments, so a new
// entry added in the content admin is in the sitemap without anyone editing code.
import fs from "node:fs";
import path from "node:path";

/**
 * @param {{ root: string, name: string, script: string, routes: string[], priority: number, check: boolean }} opts
 * @returns {boolean} true if the block was (or, with check, would be) changed
 */
export function syncSitemapBlock({ root, name, script, routes, priority, check }) {
  const START = `    // BEGIN generated: ${name} (${script})`;
  const END = `    // END generated: ${name}`;
  const file = path.join(root, "app/sitemap.ts");
  const sm = fs.readFileSync(file, "utf8");
  const a = sm.indexOf(START);
  const b = sm.indexOf(END);
  if (a < 0 || b < 0) {
    console.error(`app/sitemap.ts is missing the markers:\n${START}\n${END}`);
    process.exit(1);
  }
  const entries = [...routes].sort().map((r) => `    { url: \`\${base}${r}\`, lastModified: lastMod("${r}"), changeFrequency: "monthly", priority: ${priority} },`);
  const next = sm.slice(0, a) + [START, ...entries, END].join("\n") + sm.slice(b + END.length);
  if (next === sm) return false;
  if (!check) fs.writeFileSync(file, next);
  return true;
}
