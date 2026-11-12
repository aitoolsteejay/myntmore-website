// Search titles and descriptions for the hand-written pages, edited in the Keystatic admin
// ("Page search titles", content/page-seo/*.json). `npm run page-seo:build` (run by prebuild)
// collects them into lib/page-seo.generated.json, keyed by page address.
//
// A page wraps its metadata: `export const metadata = withPageSeo("/about-us", { ... })`.
// The admin's title and description replace the ones in the code; everything else
// (canonical, Open Graph, keywords, robots) stays as the page sets it.
import type { Metadata } from "next";
import entries from "./page-seo.generated.json";

type PageSeo = { title: string; description: string };
const SEO = entries as Record<string, PageSeo>;

export function withPageSeo(path: string, metadata: Metadata): Metadata {
  const entry = SEO[path];
  if (!entry) return metadata;
  return {
    ...metadata,
    // Stored exactly as Google shows it, so it skips the layout's " | Myntmore" template.
    ...(entry.title ? { title: { absolute: entry.title } } : {}),
    ...(entry.description ? { description: entry.description } : {}),
  };
}
