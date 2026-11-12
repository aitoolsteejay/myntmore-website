import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildWebApplicationSchema } from "@/lib/schema";
import { buildToolSocialMetadata } from "@/lib/tool-social-metadata";
import FounderPresenceClient from "./FounderPresenceClient";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/tools/founder-presence-analyzer", {
  title: "LinkedIn Competitor Analysis Tool (Free)",
  description: "Free LinkedIn competitor analysis for founders: compare your posting frequency and engagement with up to 5 competitors and get positioning recommendations.",
  keywords: [
    "linkedin competitor analysis tool",
    "founder presence analyzer",
    "linkedin presence audit tool",
    "personal brand analyzer linkedin",
    "linkedin competitor benchmarking tool",
    "free linkedin audit tool",
    "founder personal brand score",
    "linkedin content gap analysis",
    "how strong is my linkedin presence",
    "linkedin positioning analyzer",
    "ceo linkedin presence checker",
    "linkedin content strategy analyzer",
    "compare linkedin profile to competitors",
    "founder branding tool free",
    "linkedin thought leadership analyzer",
    "ai linkedin presence checker",
  ],
  alternates: { canonical: "https://www.myntmore.com/tools/founder-presence-analyzer" },
  ...buildToolSocialMetadata("Founder Presence Analyzer", "Free AI tool that benchmarks your LinkedIn presence against competitors and gives you positioning recommendations. Try it free.", "/tools/founder-presence-analyzer"),
});

const APP_SCHEMA = buildWebApplicationSchema({
  name: "Founder Presence Analyzer",
  description: "Free AI tool that benchmarks your LinkedIn presence against competitors and gives you positioning recommendations. Try it free.",
  url: "https://www.myntmore.com/tools/founder-presence-analyzer",
});

export default function FounderPresenceAnalyzer() {
  return (
    <InnerLayout>
      <JsonLd data={APP_SCHEMA} />
      <div className="pt-32 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Free Tools", href: "/resources/tools" }, { label: "Founder Presence Analyzer", href: "/tools/founder-presence-analyzer" }]} />
        </div>
      </div>
      <FounderPresenceClient />
    </InnerLayout>
  );
}
