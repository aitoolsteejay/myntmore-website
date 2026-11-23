import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import { buildArticleSchema, SITE_URL } from "@/lib/schema";
import CareersAndJobGuideClient from "./CareersAndJobGuideClient";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/resources/guides/careers-and-job-guide", {
  title: "Career Jumpstart Toolkit",
  description: "A practical playbook for landing internships, jobs, and your first break: LinkedIn fixes, an outreach playbook, and a curated job-search tool directory.",
  alternates: { canonical: "/resources/guides/careers-and-job-guide" },
});

// Article schema. The first publication date is not on record, so only the last update (from lib/sitemap-dates.json) is given.
const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "Career Jumpstart Toolkit",
  description: "A practical playbook for landing internships, jobs, and your first break: LinkedIn fixes, an outreach playbook, and a curated job-search tool directory.",
  url: `${SITE_URL}/resources/guides/careers-and-job-guide`,
  dateModified: "2026-11-13T07:46:03Z",
});

export default function CareersAndJobGuidePage() {
  return (
    <>
      <JsonLd data={ARTICLE_SCHEMA} />
      <CareersAndJobGuideClient />
    </>
  );
}
