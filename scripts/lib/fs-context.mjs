// The context content rules use for checks against other files (scripts/lib/content-rules.mjs),
// answered from the repository on disk. The content admin answers the same questions from GitHub.
import fs from "node:fs";
import path from "node:path";

/** @param {string} root repository root */
export function fsContext(root) {
  return {
    caseStudyPageExists: (slug) => fs.existsSync(path.join(root, "app/case-studies", slug, "page.tsx")),
    pageExists: (route) => fs.existsSync(path.join(root, "app", route.replace(/^\//, ""), "page.tsx")),
    cityPageExists: (slug) => fs.existsSync(path.join(root, "content/city-pages", `${slug}.json`)),
    industryKeys: new Set(JSON.parse(fs.readFileSync(path.join(root, "lib/industry-keys.json"), "utf8")).map((i) => i.key)),
    longCaseComponentExists: (slug) => fs.existsSync(path.join(root, "components/case-studies/long", `${slug}.tsx`)),
  };
}
