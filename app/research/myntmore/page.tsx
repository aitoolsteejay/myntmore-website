import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import MyntmoreResearchClient from "./MyntmoreResearchClient";
import { withPageSeo } from "@/lib/page-seo";

// A sample of Myntmore's account research. It names real third-party companies, so it stays out of search
// results and the sitemap until the signals have been reviewed.
export const metadata: Metadata = withPageSeo("/research/myntmore", {
  title: "Sample Account Research: B2B SaaS",
  description: "A sample of Myntmore's account research: ten B2B software companies with recent public signals, scored on fit and timing, with a source for every answer.",
  robots: { index: false, follow: false },
});

export default function MyntmoreResearchPage() {
  return (
    <InnerLayout>
      <MyntmoreResearchClient />
    </InnerLayout>
  );
}
