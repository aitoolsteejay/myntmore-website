import type { Metadata } from "next";
import CaseStudiesClient from "./CaseStudiesClient";
import { libraryCards } from "@/lib/case-study-library";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema, buildCollectionPageSchema, SITE_URL } from "@/lib/schema";
import { OG_BASE } from "@/lib/og";

const SCHEMA = [
  buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Case Studies", url: `${SITE_URL}/case-studies` },
  ]),
  buildCollectionPageSchema({
    name: "B2B Case Studies & Client Results",
    description: "Real client results from Myntmore's cold email, LinkedIn outreach, and ABM systems.",
    url: `${SITE_URL}/case-studies`,
  }),
];

export const metadata: Metadata = {
  title: "B2B Case Studies & Client Results",
  description: "Real results in the CRM, not the deck. See how Myntmore's cold email, LinkedIn, and ABM systems booked meetings for real B2B clients.",
  keywords: ["b2b lead generation case studies", "myntmore client results", "cold email case studies", "linkedin outreach case studies", "b2b outbound agency results", "abm case studies", "b2b sales pipeline case studies", "lead generation agency proof", "b2b growth agency case studies", "myntmore case studies", "saas lead generation case studies", "linkedin personal branding case studies", "b2b demand generation results", "outbound agency client success stories"],
  alternates: { canonical: "https://www.myntmore.com/case-studies" },
  openGraph: {
    ...OG_BASE,
    title: "B2B Case Studies & Client Results | Myntmore",
    description: "Real client results from Myntmore's cold email, LinkedIn outreach, and ABM systems.",
    url: "https://www.myntmore.com/case-studies",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <CaseStudiesClient libraryCards={libraryCards()} />
    </>
  );
}
