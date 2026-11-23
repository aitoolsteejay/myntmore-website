import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildWebApplicationSchema } from "@/lib/schema";
import { buildToolSocialMetadata } from "@/lib/tool-social-metadata";
import DmAngleGeneratorClient from "./DmAngleGeneratorClient";
import { withPageSeo } from "@/lib/page-seo";
import pageCopy from "@/content/page-copy/toolDmAngleGenerator.json";

// This page's text is edited in the admin ("Cold DM Angle Generator") and lives in content/page-copy/toolDmAngleGenerator.json.
const copy = pageCopy;

export const metadata: Metadata = withPageSeo("/tools/dm-angle-generator", {
  title: "Free DM Angle Generator for B2B Outreach",
  description: "Free AI tool that generates 5 psychology-aligned DM opening angles for your outreach, tailored to your industry, ICP role, and offer.",
  keywords: [
    "dm angle generator",
    "cold dm opener generator",
    "linkedin dm opening lines generator",
    "free ai dm generator",
    "cold outreach message generator",
    "linkedin cold message generator",
    "dm opening line ideas",
    "b2b outreach message generator",
    "psychology based dm openers",
    "how to write a cold dm",
    "linkedin outreach script generator",
    "cold email opening line generator",
    "ai generated dm angles",
    "outreach messaging generator for sales",
    "dm hook generator",
  ],
  alternates: { canonical: "https://www.myntmore.com/tools/dm-angle-generator" },
  ...buildToolSocialMetadata("Free DM Angle Generator for B2B Outreach", "Free AI tool that generates 5 psychology-aligned DM opening angles for your outreach, tailored to your industry, ICP role, and offer.", "/tools/dm-angle-generator"),
});

const APP_SCHEMA = buildWebApplicationSchema({
  name: "DM Angle Generator",
  description: "Free AI tool that generates 5 psychology-aligned DM opening angles for your outreach, tailored to your industry, ICP role, and offer.",
  url: "https://www.myntmore.com/tools/dm-angle-generator",
});

export default function DmAngleGenerator() {
  return (
    <InnerLayout>
      <JsonLd data={APP_SCHEMA} />
      <div className="pt-32 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: copy.s01.t01, href: "/resources/tools" }, { label: copy.s01.t02, href: "/tools/dm-angle-generator" }]} />
        </div>
      </div>
      <DmAngleGeneratorClient />
    </InnerLayout>
  );
}
