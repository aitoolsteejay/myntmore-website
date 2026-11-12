import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildWebApplicationSchema } from "@/lib/schema";
import { buildToolSocialMetadata } from "@/lib/tool-social-metadata";
import ICPBuilderClient from "./ICPBuilderClient";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/tools/icp-builder", {
  title: "Free Ideal Customer Profile (ICP) Generator",
  description: "Free ICP generator: describe your business and get detailed B2B or D2C ideal customer profiles, each with a value proposition you can use in outreach.",
  keywords: [
    "ideal customer profile generator",
    "icp builder tool",
    "free icp generator",
    "b2b icp builder",
    "value proposition generator",
    "how to build an ideal customer profile",
    "ai icp generator",
    "target customer profile tool",
    "d2c ideal customer profile tool",
    "value proposition generator for startups",
    "channel partner icp tool",
    "customer segmentation tool free",
    "icp and value prop generator",
    "b2b buyer persona generator",
    "generate ideal customer profile from business description",
  ],
  alternates: { canonical: "https://www.myntmore.com/tools/icp-builder" },
  ...buildToolSocialMetadata("ICP Builder & Value Proposition Generator", "Free AI tool that builds deep B2B and D2C ICPs from your business description, plus a value proposition for each. Try it free.", "/tools/icp-builder"),
});

const APP_SCHEMA = buildWebApplicationSchema({
  name: "ICP Builder & Value Proposition Generator",
  description: "Free AI tool that builds deep B2B and D2C ICPs from your business description, plus a value proposition for each. Try it free.",
  url: "https://www.myntmore.com/tools/icp-builder",
});

export default function ICPBuilder() {
  return (
    <InnerLayout>
      <JsonLd data={APP_SCHEMA} />
      <div className="pt-32 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Free Tools", href: "/resources/tools" }, { label: "ICP Builder & Value Proposition Generator", href: "/tools/icp-builder" }]} />
        </div>
      </div>
      <ICPBuilderClient />
    </InnerLayout>
  );
}
