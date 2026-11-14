import type { Metadata } from "next";
import { SITE_URL } from "./schema";
import { OG_BASE, ogImages } from "./og";

export function buildToolSocialMetadata(
  title: string,
  description: string,
  path: string
): Pick<Metadata, "openGraph" | "twitter"> {
  const fullTitle = `${title} | Myntmore`;
  const images = ogImages(path, "Myntmore B2B growth systems");

  return {
    openGraph: {
      ...OG_BASE,
      title: fullTitle,
      description,
      url: `${SITE_URL}${path}`,
      images,
    },
    // Setting `twitter` replaces the root layout's object, so the handles go here too.
    twitter: {
      card: "summary_large_image",
      site: "@myntmore",
      creator: "@myntmore",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}
