import type { Metadata } from "next";
import { buildArticleSchema, SITE_URL } from "@/lib/schema";
import JsonLd from "@/app/components/JsonLd";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

// page.tsx is a client component and so cannot export metadata itself --
// without this layout the route silently inherits the root layout's homepage
// title/description, which describes B2B outbound, not a jewellery tool stack.
const PAGE_URL = `${SITE_URL}/resources/guides/ai-tech-stack-jewellery`;

export const metadata: Metadata = withPageSeo("/resources/guides/ai-tech-stack-jewellery", {
  title: "AI Tech Stack for Jewellery Brands",
  description:
    "106 AI tools across 14 categories, curated for jewellery brand owners and retailers, from product photography and reels to paid ads.",
  alternates: { canonical: PAGE_URL },
  keywords: [
    "ai tools for jewellery brands",
    "jewellery marketing tools",
    "ai product photography jewellery",
    "jewellery ecommerce tech stack",
  ],
  openGraph: {
    ...OG_BASE,
    title: "AI Tech Stack for Jewellery Brands | Myntmore",
    description:
      "106 AI tools across 14 categories for jewellery brand owners and retailers, from product photography to paid ads.",
    url: PAGE_URL,
    images: ogImages("/resources/guides/ai-tech-stack-jewellery"),
  },
});

// Article schema lives here because the page itself is a client component. The first publication date is not
// on record, so only the last update (from lib/sitemap-dates.json) is given.
const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "AI Tech Stack for Jewellery Brands",
  description: "106 AI tools across 14 categories, curated for jewellery brand owners and retailers, from product photography and reels to paid ads.",
  url: PAGE_URL,
  dateModified: "2026-10-22T15:20:46+05:30",
});

export default function GIATechStackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={ARTICLE_SCHEMA} />
      {children}
    </>
  );
}
