import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudiesClient from "../../CaseStudiesClient";
import { libraryCards } from "@/lib/case-study-library";
import { CASE_STUDY_MARKETS, caseStudiesInMarket, marketFromSlug } from "@/lib/case-study-markets";
import { OG_BASE } from "@/lib/og";

type Props = { params: { market: string } };

export function generateStaticParams() {
  return CASE_STUDY_MARKETS.map(({ slug }) => ({ market: slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const market = marketFromSlug(params.market);
  if (!market) return {};
  const n = caseStudiesInMarket(market.slug).length;
  const title = `B2B Case Studies in ${market.phrase}`;
  const description = `${n} Myntmore case studies from outbound campaigns in ${market.phrase}: meetings booked, reply rates and the approach behind each result.`;
  const url = `https://www.myntmore.com/case-studies/markets/${market.slug}`;
  return {
    title,
    description,
    keywords: [`b2b lead generation ${market.label}`, `outbound sales case studies ${market.label}`, `cold email ${market.label} case study`, `linkedin outreach ${market.label}`],
    alternates: { canonical: url },
    openGraph: { ...OG_BASE, title: `${title} | Myntmore`, description, url, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore case studies" }] },
  };
}

export default function MarketCaseStudiesPage({ params }: Props) {
  const market = marketFromSlug(params.market);
  if (!market) notFound();
  return <CaseStudiesClient initialMarket={market.slug} libraryCards={libraryCards()} />;
}
