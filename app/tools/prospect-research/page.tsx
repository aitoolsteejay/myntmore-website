import type { Metadata } from "next";
import { withPageSeo } from "@/lib/page-seo";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProspectResearchClient from "./ProspectResearchClient";

// Hidden until launch: it works at this URL, but it is kept out of search, the sitemap, the tools
// registry and hub, the navbar, the footer and the llms files, and nothing links to it. The canonical,
// keywords, social metadata and WebApplication schema are added at launch (see the PR checklist).
export const metadata: Metadata = withPageSeo("/tools/prospect-research", {
  title: "Free Prospect Research Tool: 10 Ready Buyers",
  description: "Enter your company and get ten companies that match your ideal customer and show a recent buying signal, each with a dated source for every answer.",
  robots: { index: false, follow: false },
});

export default function ProspectResearchPage() {
  return (
    <InnerLayout>
      <div className="px-4 pt-32">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={[{ label: "Free Tools", href: "/resources/tools" }, { label: "Prospect Research", href: "/tools/prospect-research" }]} />
        </div>
      </div>
      <ProspectResearchClient />
    </InnerLayout>
  );
}
