import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import { buildArticleSchema, SITE_URL } from "@/lib/schema";
import EducationGuideClient from "./EducationGuideClient";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/resources/guides/education-guide", {
  title: "AI Quick-Start Guide",
  description: "Practical AI tips for parents, teachers, students who create content and school leaders: ten starting points per audience, usable the same day.",
  alternates: { canonical: "/resources/guides/education-guide" },
});

// Article schema. The first publication date is not on record, so only the last update (from lib/sitemap-dates.json) is given.
const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "AI Quick-Start Guide",
  description: "Practical AI tips for parents, teachers, students who create content and school leaders: ten starting points per audience, usable the same day.",
  url: `${SITE_URL}/resources/guides/education-guide`,
  dateModified: "2026-11-13T07:46:03Z",
});

export default function EducationGuidePage() {
  return (
    <>
      <JsonLd data={ARTICLE_SCHEMA} />
      <EducationGuideClient />
    </>
  );
}
