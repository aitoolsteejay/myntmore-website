// The Open Graph fields every page shares. Next.js does not merge a page's `openGraph`
// into the root layout's: a page that sets its own replaces the layout's object wholesale,
// so without this og:type, og:site_name and og:locale vanished from every page that set a
// title or description for social cards. Spread it first so a page can still override a
// field (blog posts set `type: "article"`):
//
//   openGraph: { ...OG_BASE, title, description, url, images }
export const OG_BASE = {
  type: "website",
  siteName: "Myntmore",
  locale: "en_US",
} as const;
