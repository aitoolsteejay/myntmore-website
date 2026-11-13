import type { Metadata } from "next";
import CareersAndJobGuideClient from "./CareersAndJobGuideClient";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/resources/guides/careers-and-job-guide", {
  title: "Career Jumpstart Toolkit",
  description: "A practical playbook for landing internships, jobs, and your first break: LinkedIn fixes, an outreach playbook, and a curated job-search tool directory.",
  alternates: { canonical: "/resources/guides/careers-and-job-guide" },
});

export default function CareersAndJobGuidePage() {
  return <CareersAndJobGuideClient />;
}
