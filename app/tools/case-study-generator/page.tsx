import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildWebApplicationSchema } from "@/lib/schema";
import { buildToolSocialMetadata } from "@/lib/tool-social-metadata";
import CaseStudyGeneratorClient from "./CaseStudyGeneratorClient";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/tools/case-study-generator", {
  title: "Case Study & Proposal Generator",
  description: "Free AI tool that turns a finished project into a case study, or a conversation into a proposal draft. No invented numbers. Try it free.",
  keywords: [
    "free case study generator",
    "ai case study generator",
    "b2b case study generator",
    "case study generator from project details",
    "proposal generator ai",
    "sales proposal generator free",
    "how to write a case study",
    "case study template generator",
    "client success story generator",
    "b2b proposal writing tool",
    "turn project into case study",
    "ai proposal writer",
    "case study writing tool for agencies",
    "generate case study from client results",
    "free proposal draft generator",
  ],
  alternates: { canonical: "https://www.myntmore.com/tools/case-study-generator" },
  ...buildToolSocialMetadata("Case Study & Proposal Generator", "Free AI tool that turns a finished project into a case study, or a conversation into a proposal draft. No invented numbers. Try it free.", "/tools/case-study-generator"),
});

const APP_SCHEMA = buildWebApplicationSchema({
  name: "Case Study & Proposal Generator",
  description: "Free AI tool that turns a finished project into a case study, or a conversation into a proposal draft. No invented numbers. Try it free.",
  url: "https://www.myntmore.com/tools/case-study-generator",
});

export default function CaseStudyGeneratorPage() {
  return (
    <InnerLayout>
      <JsonLd data={APP_SCHEMA} />
      <div className="pt-32 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Free Tools", href: "/resources/tools" }, { label: "Case Study & Proposal Generator", href: "/tools/case-study-generator" }]} />
        </div>
      </div>
      <CaseStudyGeneratorClient />
    </InnerLayout>
  );
}
