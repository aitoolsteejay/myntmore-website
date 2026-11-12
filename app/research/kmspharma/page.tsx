import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import KmsResearchClient from "./KmsResearchClient";
import { withPageSeo } from "@/lib/page-seo";

// Client deliverable for KMS Pharma, shared by link. Kept out of search results, and out of the sitemap,
// the footer and every internal link list.
export const metadata: Metadata = withPageSeo("/research/kmspharma", {
  title: "KMS Pharma: Partner Accounts to Approach",
  description: "Research prepared by Myntmore for KMS Pharma: ten pharma companies that look ready to license a dossier, scored on fit and timing, with sources.",
  robots: { index: false, follow: false },
});

export default function KmsPharmaResearchPage() {
  return (
    <InnerLayout>
      <KmsResearchClient />
    </InnerLayout>
  );
}
