// Search titles and descriptions for the hand-written pages, edited in the Keystatic admin
// ("Page search titles", content/page-seo/*.json). `npm run page-seo:build` (run by prebuild)
// collects them into lib/page-seo.generated.json, keyed by page address.
//
// A page wraps its metadata: `export const metadata = withPageSeo("/about-us", { ... })`.
// The admin's title and description replace the ones in the code; everything else
// (canonical, Open Graph, keywords, robots) stays as the page sets it.
import type { Metadata } from "next";
import entries from "./page-seo.generated.json";
import { OG_BASE, ogImages } from "./og";

type PageSeo = { title: string; description: string };
const SEO = entries as Record<string, PageSeo>;

// What a page's title becomes in og:title: the layout's " | Myntmore" template applies to
// plain titles, an `absolute` title is used as written.
function socialTitle(title: Metadata["title"]): string | undefined {
  if (!title) return undefined;
  if (typeof title === "string") return `${title} | Myntmore`;
  if ("absolute" in title && title.absolute) return title.absolute;
  if ("default" in title && title.default) return title.default;
  return undefined;
}

export function withPageSeo(path: string, metadata: Metadata): Metadata {
  const entry = SEO[path];
  const seo: Metadata = !entry
    ? metadata
    : {
        ...metadata,
        // Stored exactly as Google shows it, so it skips the layout's " | Myntmore" template.
        ...(entry.title ? { title: { absolute: entry.title } } : {}),
        ...(entry.description ? { description: entry.description } : {}),
      };
  // A page that sets no openGraph still gets a complete one (title, description, url and its own
  // social card) instead of the layout's generic image. Pages that set their own keep it.
  if (seo.openGraph) return seo;
  const dynamic = path.includes("[");
  const title = socialTitle(seo.title);
  return {
    ...seo,
    openGraph: {
      ...OG_BASE,
      ...(title ? { title } : {}),
      ...(seo.description ? { description: seo.description } : {}),
      ...(dynamic ? {} : { url: `https://www.myntmore.com${path === "/" ? "" : path}` }),
      images: ogImages(path),
    },
  };
}
