// "Related" picks for the glossary, case study and blog templates, so every page in a section is linked
// from a few others (Google finds and indexes pages through these links; many glossary terms and case
// studies had fewer than three pages linking to them).
//
// Picks are deterministic: the section's pages are put in category order (keeping their order inside each
// category), and each page shows the pages that come right after it, wrapping round at the end. Pages in
// the same category sit together, so the picks are mostly from the same category, and every page is
// shown by the same number of pages before it: no page is left out, not only the popular ones.
import glossaryIndex from "./glossary-index.generated.json";
import detailCards from "./case-study-detail-cards.generated.json";
import { libraryCards } from "./case-study-library";

export interface RelatedItem {
  href: string;
  title: string;
  excerpt: string;
  tag: string;
}

/** The n items that follow `selfHref` once `items` are ordered by `group`. */
export function pickRelated<T extends { href: string }>(items: T[], selfHref: string, group: (t: T) => string, n: number): T[] {
  const firstSeen = new Map<string, number>();
  items.forEach((t, i) => firstSeen.has(group(t)) || firstSeen.set(group(t), i));
  const ordered = items.map((t, i) => ({ t, i })).sort((a, b) => firstSeen.get(group(a.t))! - firstSeen.get(group(b.t))! || a.i - b.i).map((x) => x.t);
  const i = ordered.findIndex((t) => t.href === selfHref);
  if (i < 0) return [];
  return [...ordered.slice(i + 1), ...ordered.slice(0, i)].slice(0, n);
}

export function relatedGlossaryTerms(slug: string, n = 4): RelatedItem[] {
  const items = (glossaryIndex as { href: string; tag: string; title: string; excerpt: string }[]).map((t) => ({ ...t }));
  return pickRelated(items, `/resources/glossary/${slug}`, (t) => t.tag, n).map((t) => ({ href: t.href, title: t.title, excerpt: t.excerpt, tag: t.tag }));
}

/** Every case study with a CaseStudyLayout page: the library cases and the detailed pages. */
function caseStudyItems(): (RelatedItem & { industry: string })[] {
  const library = libraryCards().map((c) => ({ href: `/case-studies/${c.slug}`, title: c.title, excerpt: c.excerpt, tag: c.tag, industry: c.industry }));
  const detailed = (detailCards as { slug: string; title: string; excerpt: string; tag: string; industry: string }[]).map((c) => ({
    href: `/case-studies/${c.slug}`,
    title: c.title,
    excerpt: c.excerpt,
    tag: c.tag,
    industry: c.industry,
  }));
  const seen = new Set<string>();
  return [...library, ...detailed].filter((c) => !seen.has(c.href) && (seen.add(c.href), true));
}

export function relatedCaseStudies(slug: string, n = 3): RelatedItem[] {
  return pickRelated(caseStudyItems(), `/case-studies/${slug}`, (c) => c.industry, n).map(({ href, title, excerpt, tag }) => ({ href, title, excerpt, tag }));
}
