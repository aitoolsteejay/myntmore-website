import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudiesClient from "../CaseStudiesClient";
import { INDUSTRY_AUDIENCE, libraryCards } from "@/lib/case-study-library";
import { CASE_STUDY_FILTERS, caseStudyFilterFromSlug } from "@/lib/case-study-filters";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema, buildCollectionPageSchema, SITE_URL } from "@/lib/schema";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

type Props = { params: { filter: string } };

export function generateStaticParams() {
  return CASE_STUDY_FILTERS.filter(({ slug }) => slug !== "all").map(({ slug }) => ({ filter: slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const filter = caseStudyFilterFromSlug(params.filter);
  if (!filter || filter === "All") return {};
  const title = `${filter} Case Studies`;
  const description = `${filter} case studies from Myntmore: the meetings and pipeline our cold email and LinkedIn outbound booked, and how each campaign ran.`;
  const url = `https://www.myntmore.com/case-studies/${params.filter}`;
  const audience = INDUSTRY_AUDIENCE[filter];
  return withPageSeo(`/case-studies/${params.filter}`, {
    title,
    description,
    keywords: [
      `${filter.toLowerCase()} case studies`,
      `b2b lead generation for ${audience}`,
      `outbound lead generation for ${audience}`,
      `cold email for ${audience}`,
      `linkedin outreach for ${audience}`,
    ],
    alternates: { canonical: url },
    openGraph: { ...OG_BASE, title: `${title} | Myntmore`, description, url, images: ogImages(`/case-studies/${params.filter}`, "Myntmore case studies") },
  });
}

export default function FilteredCaseStudiesPage({ params }: Props) {
  const filter = caseStudyFilterFromSlug(params.filter);
  if (!filter || filter === "All") notFound();

  const schema = [
    buildBreadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Case Studies", url: `${SITE_URL}/case-studies` },
      { name: `${filter} Case Studies`, url: `${SITE_URL}/case-studies/${params.filter}` },
    ]),
    buildCollectionPageSchema({
      name: `${filter} Case Studies & Client Results`,
      description: `Explore ${filter} case studies and campaign examples from Myntmore.`,
      url: `${SITE_URL}/case-studies/${params.filter}`,
    }),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <CaseStudiesClient initialFilter={filter} libraryCards={libraryCards()} />
    </>
  );
}
