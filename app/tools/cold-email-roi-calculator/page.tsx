import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildWebApplicationSchema } from "@/lib/schema";
import { buildToolSocialMetadata } from "@/lib/tool-social-metadata";
import ColdEmailRoiPageClient from "./ColdEmailRoiPageClient";
import { withPageSeo } from "@/lib/page-seo";

const TITLE = "Cold Email ROI Calculator";
const DESCRIPTION = "Free cold email ROI calculator: enter your sends, reply and close rates, or start from 2026 benchmarks, and see meetings, pipeline and ROI calculate live.";
const PATH = "/tools/cold-email-roi-calculator";

export const metadata: Metadata = withPageSeo("/tools/cold-email-roi-calculator", {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "cold email roi calculator",
    "cold email benchmarks 2026",
    "cold email reply rate benchmark",
    "meetings per 1000 emails",
    "cold email calculator",
    "outbound roi calculator",
  ],
  alternates: { canonical: `https://www.myntmore.com${PATH}` },
  ...buildToolSocialMetadata(TITLE, DESCRIPTION, PATH),
});

const APP_SCHEMA = buildWebApplicationSchema({
  name: TITLE,
  description: DESCRIPTION,
  url: `https://www.myntmore.com${PATH}`,
});

export default function ColdEmailRoiCalculatorPage() {
  return (
    <InnerLayout>
      <JsonLd data={APP_SCHEMA} />
      <div className="pt-32 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: "Free Tools", href: "/resources/tools" }, { label: "Cold Email ROI Calculator", href: PATH }]} />
        </div>
      </div>
      <ColdEmailRoiPageClient />
    </InnerLayout>
  );
}
