import type { Metadata } from "next";
import InnerLayout from "../components/InnerLayout";
import SiteAuditClient, { type AuditData } from "./SiteAuditClient";
import data from "./data.json";
import { withPageSeo } from "@/lib/page-seo";

// Internal page-inventory. Deliberately an orphan itself: not linked from any
// nav, footer or sitemap, and kept out of search indexing. The data comes
// from scripts/generate-site-map.mjs, which runs before every build.
export const metadata: Metadata = withPageSeo("/site-audit", {
  title: "Site Audit",
  robots: { index: false, follow: false },
});

export default function SiteAuditPage() {
  const audit = data as unknown as AuditData;
  return (
    <InnerLayout>
      <SiteAuditClient audit={audit} />
    </InnerLayout>
  );
}
