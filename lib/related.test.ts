import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import glossaryIndex from "./glossary-index.generated.json";
import { pickRelated, relatedCaseStudies, relatedGlossaryTerms } from "./related";
import { libraryCards } from "./case-study-library";
import detailCards from "./case-study-detail-cards.generated.json";

// How many other pages' "related" blocks link to each page.
function inbound(hrefs: string[], picks: (href: string) => string[]) {
  const count = new Map(hrefs.map((h) => [h, 0]));
  for (const h of hrefs) for (const p of picks(h)) count.set(p, (count.get(p) ?? 0) + 1);
  return count;
}

describe("related blocks", () => {
  it("link every glossary term from at least 2 other terms, never itself", () => {
    const hrefs = (glossaryIndex as { href: string }[]).map((t) => t.href);
    const counts = inbound(hrefs, (h) => relatedGlossaryTerms(h.split("/").pop()!).map((t) => t.href));
    for (const h of hrefs) expect(relatedGlossaryTerms(h.split("/").pop()!).map((t) => t.href)).not.toContain(h);
    expect(Array.from(counts).filter(([, n]) => n < 2)).toEqual([]);
  });

  it("link every case study from at least 2 other case studies", () => {
    const slugs = Array.from(new Set([...libraryCards().map((c) => c.slug), ...(detailCards as { slug: string }[]).map((c) => c.slug)]));
    const counts = inbound(slugs.map((s) => `/case-studies/${s}`), (h) => relatedCaseStudies(h.split("/").pop()!).map((c) => c.href));
    expect(Array.from(counts).filter(([, n]) => n < 2)).toEqual([]);
  });

  it("link every published blog post from at least 2 other posts", () => {
    const dir = path.resolve(__dirname, "../content/posts");
    const posts = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".mdoc"))
      .map((f) => ({ text: fs.readFileSync(path.join(dir, f), "utf8"), slug: f.slice(0, -5) }))
      .filter((p) => /^published: true$/m.test(p.text))
      .map((p) => ({ href: `/resources/blogs/${p.slug}`, category: /^category: "?([^"\n]+)"?$/m.exec(p.text)?.[1] ?? "" }));
    const counts = inbound(posts.map((p) => p.href), (h) => pickRelated(posts, h, (p) => p.category, 3).map((p) => p.href));
    expect(Array.from(counts).filter(([, n]) => n < 2)).toEqual([]);
  });
});
