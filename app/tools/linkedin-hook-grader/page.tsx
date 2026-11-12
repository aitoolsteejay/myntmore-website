import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildWebApplicationSchema } from "@/lib/schema";
import { buildToolSocialMetadata } from "@/lib/tool-social-metadata";
import HookGraderClient from "./HookGraderClient";
import { withPageSeo } from "@/lib/page-seo";

const DESCRIPTION = "Free LinkedIn hook grader and generator: paste your post's first two lines, get a score out of 100 and three rewritten hooks graded by the same rules.";

export const metadata: Metadata = withPageSeo("/tools/linkedin-hook-grader", {
  title: "Free LinkedIn Hook Grader & Generator",
  description: DESCRIPTION,
  keywords: [
    "linkedin hook grader",
    "linkedin hook generator",
    "linkedin post hook checker",
    "linkedin opening line examples",
    "linkedin post first line",
    "linkedin hook score",
    "ai linkedin hook rewriter",
    "linkedin hook formulas",
    "improve linkedin post hook",
    "linkedin hooks for founders",
    "linkedin post opener tool",
    "free linkedin writing tool",
  ],
  alternates: { canonical: "https://www.myntmore.com/tools/linkedin-hook-grader" },
  ...buildToolSocialMetadata("LinkedIn Hook Grader", DESCRIPTION, "/tools/linkedin-hook-grader"),
});

const APP_SCHEMA = buildWebApplicationSchema({
  name: "LinkedIn Hook Grader",
  description: DESCRIPTION,
  url: "https://www.myntmore.com/tools/linkedin-hook-grader",
});

export default function LinkedinHookGrader() {
  return (
    <InnerLayout>
      <JsonLd data={APP_SCHEMA} />
      <div className="pt-32 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Free Tools", href: "/resources/tools" }, { label: "LinkedIn Hook Grader", href: "/tools/linkedin-hook-grader" }]} />
        </div>
      </div>
      <HookGraderClient />
    </InnerLayout>
  );
}
