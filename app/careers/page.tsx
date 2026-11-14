import type { Metadata } from "next";
import CareersClient from "./CareersClient";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema, buildCollectionPageSchema, SITE_URL } from "@/lib/schema";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const CAREERS_SCHEMA = [
  buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Careers", url: `${SITE_URL}/careers` },
  ]),
  buildCollectionPageSchema({
    name: "Careers at Myntmore",
    description: "Open roles in B2B sales, outbound lead generation, and GTM strategy at Myntmore.",
    url: `${SITE_URL}/careers`,
  }),
];

export const metadata: Metadata = withPageSeo("/careers", {
  title: { absolute: "Careers at Myntmore | B2B Sales & Growth Jobs" },
  description: "Join the team that builds pipelines, not decks. Open roles in sales, lead gen, and GTM strategy at Myntmore. See open roles and apply today.",
  keywords: ["myntmore careers", "b2b sales jobs mumbai", "growth marketing jobs mumbai", "lead generation jobs mumbai", "gtm jobs mumbai", "hr internship mumbai", "sales jobs bkc mumbai", "b2b agency jobs mumbai", "linkedin marketing jobs india", "cold email jobs mumbai", "startup jobs mumbai", "marketing internship mumbai", "sales head jobs mumbai", "b2b growth agency careers"],
  alternates: { canonical: "https://www.myntmore.com/careers" },
  openGraph: {
    ...OG_BASE,
    title: "Careers at Myntmore",
    description: "Open roles in sales, lead generation, and GTM strategy at Myntmore.",
    url: "https://www.myntmore.com/careers",
    images: ogImages("/careers"),
  },
});

export default function CareersPage() {
  return (
    <>
      <JsonLd data={CAREERS_SCHEMA} />
      <CareersClient />
    </>
  );
}
