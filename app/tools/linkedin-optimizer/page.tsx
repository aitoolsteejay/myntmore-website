import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildWebApplicationSchema } from "@/lib/schema";
import { buildToolSocialMetadata } from "@/lib/tool-social-metadata";
import ProfileOptimizerClient from "./ProfileOptimizerClient";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/tools/linkedin-optimizer", {
  title: "LinkedIn Profile Optimizer",
  description: "Free AI-powered LinkedIn profile audit and rewrite. Get a profile optimised to convert visitors into high-intent inbound replies.",
  keywords: [
    "linkedin profile optimizer",
    "free linkedin profile optimizer",
    "ai linkedin profile audit",
    "linkedin headline generator",
    "linkedin about section generator",
    "linkedin profile rewrite tool",
    "how to optimize linkedin profile",
    "linkedin profile checker free",
    "linkedin profile score tool",
    "linkedin headline ideas generator",
    "linkedin profile audit tool",
    "linkedin profile for lead generation",
    "linkedin authority positioning generator",
    "linkedin profile improvement tool",
    "ai linkedin headline generator",
  ],
  alternates: { canonical: "https://www.myntmore.com/tools/linkedin-optimizer" },
  ...buildToolSocialMetadata("LinkedIn Profile Optimizer", "Free AI-powered LinkedIn profile audit and rewrite. Get a profile optimised to convert visitors into high-intent inbound replies.", "/tools/linkedin-optimizer"),
});

const APP_SCHEMA = buildWebApplicationSchema({
  name: "LinkedIn Profile Optimizer",
  description: "Free AI-powered LinkedIn profile audit and rewrite. Get a profile optimised to convert visitors into high-intent inbound replies.",
  url: "https://www.myntmore.com/tools/linkedin-optimizer",
});

export default function LinkedInOptimizer() {
  return (
    <InnerLayout>
      <JsonLd data={APP_SCHEMA} />
      <div className="pt-32 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Free Tools", href: "/resources/tools" }, { label: "LinkedIn Profile Optimizer", href: "/tools/linkedin-optimizer" }]} />
        </div>
      </div>
      <ProfileOptimizerClient />
    </InnerLayout>
  );
}
