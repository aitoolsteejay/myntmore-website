import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildWebApplicationSchema } from "@/lib/schema";
import { buildToolSocialMetadata } from "@/lib/tool-social-metadata";
import RoiCalculatorSwitcher from "./RoiCalculatorSwitcher";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/tools/roi-calculator", {
  title: "B2B Outreach ROI Calculator",
  description: "Free ROI calculator for B2B outbound. Estimate the pipeline and revenue you could generate from cold email and LinkedIn outreach.",
  keywords: [
    "roi calculator for cold outreach",
    "b2b outbound roi calculator",
    "linkedin outreach roi calculator",
    "free roi calculator",
    "sales pipeline calculator",
    "how to calculate lead generation roi",
    "outbound sales revenue calculator",
    "cold email revenue calculator",
    "b2b lead generation roi tool",
    "meetings booked calculator",
    "sales funnel calculator free",
    "cold outreach revenue projection tool",
    "linkedin lead gen roi estimator",
    "pipeline forecast calculator b2b",
  ],
  alternates: { canonical: "https://www.myntmore.com/tools/roi-calculator" },
  ...buildToolSocialMetadata("B2B Outreach ROI Calculator", "Free ROI calculator for B2B outbound. Estimate the pipeline and revenue you could generate from cold email and LinkedIn outreach.", "/tools/roi-calculator"),
});

const APP_SCHEMA = buildWebApplicationSchema({
  name: "ROI Calculator",
  description: "Free ROI calculator for B2B outbound. Estimate the pipeline and revenue you could generate from cold email and LinkedIn outreach.",
  url: "https://www.myntmore.com/tools/roi-calculator",
});

export default function RoiCalculator() {
  return (
    <InnerLayout>
      <JsonLd data={APP_SCHEMA} />
      <div className="pt-32 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Free Tools", href: "/resources/tools" }, { label: "ROI Calculator", href: "/tools/roi-calculator" }]} />
        </div>
      </div>
      <RoiCalculatorSwitcher />
    </InnerLayout>
  );
}
