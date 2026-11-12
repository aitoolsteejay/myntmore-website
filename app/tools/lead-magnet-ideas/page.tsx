import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildWebApplicationSchema } from "@/lib/schema";
import { buildToolSocialMetadata } from "@/lib/tool-social-metadata";
import LeadMagnetIdeasClient from "./LeadMagnetIdeasClient";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/tools/lead-magnet-ideas", {
  title: "Free Lead Magnet Idea Generator for B2B",
  description: "Free AI lead magnet idea generator: describe your business and ICP and get B2B lead magnet ideas you can offer in cold email and LinkedIn outreach.",
  keywords: [
    "lead magnet idea generator",
    "free lead magnet ideas tool",
    "b2b lead magnet generator",
    "cold email lead magnet ideas",
    "linkedin lead magnet ideas",
    "ai lead magnet generator",
    "lead magnet ideas for agencies",
    "lead magnet ideas for financial services",
    "lead magnet ideas for healthcare",
    "lead magnet ideas for recruitment",
    "what is a good lead magnet",
    "content ideas for lead generation",
    "free tool to generate lead magnet ideas",
    "lead magnet brainstorming tool",
    "how to create a lead magnet",
  ],
  alternates: { canonical: "https://www.myntmore.com/tools/lead-magnet-ideas" },
  ...buildToolSocialMetadata("Lead Magnet Idea Generator", "Free AI tool that turns your business, ICP, and industry into concrete lead magnet ideas you can use in cold email and LinkedIn outreach.", "/tools/lead-magnet-ideas"),
});

const APP_SCHEMA = buildWebApplicationSchema({
  name: "Lead Magnet Idea Generator",
  description: "Free AI tool that turns your business, ICP, and industry into concrete lead magnet ideas you can use in cold email and LinkedIn outreach.",
  url: "https://www.myntmore.com/tools/lead-magnet-ideas",
});

export default function LeadMagnetIdeas() {
  return (
    <InnerLayout>
      <JsonLd data={APP_SCHEMA} />
      <div className="pt-32 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Free Tools", href: "/resources/tools" }, { label: "Lead Magnet Idea Generator", href: "/tools/lead-magnet-ideas" }]} />
        </div>
      </div>
      <LeadMagnetIdeasClient />
    </InnerLayout>
  );
}
