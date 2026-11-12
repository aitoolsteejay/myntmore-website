import type { Metadata } from "next";
import EducationGuideClient from "./EducationGuideClient";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/resources/guides/education-guide", {
  title: "AI Quick-Start Guide",
  description: "Practical AI tips for parents, educators, and creators.",
  robots: { index: false, follow: false },
});

export default function EducationGuidePage() {
  return <EducationGuideClient />;
}
