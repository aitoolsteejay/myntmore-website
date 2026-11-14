// The Open Graph fields every page shares. Next.js does not merge a page's `openGraph`
// into the root layout's: a page that sets its own replaces the layout's object wholesale,
// so without this og:type, og:site_name and og:locale vanished from every page that set a
// title or description for social cards. Spread it first so a page can still override a
// field (blog posts set `type: "article"`):
//
//   openGraph: { ...OG_BASE, title, description, url, images: ogImages("/the/page/path") }
export const OG_BASE = {
  type: "website",
  siteName: "Myntmore",
  locale: "en_US",
} as const;

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

// The social card for a page. `path` is the page's own address ("/services/cold-email"); the
// image route (app/og-image.png/route.tsx) reads that page's og:title and draws it on the
// brand card, so a card always says what the page says, edits made in the Keystatic admin
// included. Passing a path rather than the title keeps arbitrary text from being printed on
// the myntmore.com domain. Home and anything unreadable fall back to the brand tagline card.
export function ogImages(path: string, alt = "Myntmore") {
  const url = path && path !== "/" ? `/og-image.png?path=${encodeURIComponent(path)}` : "/og-image.png";
  return [{ url, ...OG_IMAGE_SIZE, alt }];
}
