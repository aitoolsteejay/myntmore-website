import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildWebApplicationSchema } from "@/lib/schema";
import { buildToolSocialMetadata } from "@/lib/tool-social-metadata";
import PostingRhythmClient from "./PostingRhythmClient";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/tools/posting-rhythm-builder", {
  title: "Free LinkedIn Posting Schedule Planner",
  description: "Free LinkedIn posting schedule planner: find how often to post, get a weekly routine, and ready-to-use post ideas and hooks for your ICP.",
  keywords: [
    "linkedin posting schedule planner",
    "linkedin posting rhythm builder",
    "content calendar generator linkedin",
    "free content cadence planner",
    "linkedin content strategy planner",
    "how often should i post on linkedin",
    "personal brand posting schedule tool",
    "linkedin content plan generator",
    "linkedin posting frequency calculator",
    "content consistency planner",
    "linkedin visibility strategy tool",
    "free linkedin content planner",
    "b2b content calendar tool",
    "linkedin posting cadence generator",
  ],
  alternates: { canonical: "https://www.myntmore.com/tools/posting-rhythm-builder" },
  ...buildToolSocialMetadata("Posting Rhythm Builder", "Free tool to plan a consistent LinkedIn posting rhythm: how often to post, a weekly routine and ready-to-use post ideas and hooks for your ICP.", "/tools/posting-rhythm-builder"),
});

const APP_SCHEMA = buildWebApplicationSchema({
  name: "Posting Rhythm Builder",
  description: "Free tool to plan a consistent LinkedIn posting rhythm: how often to post, a weekly routine and ready-to-use post ideas and hooks for your ICP.",
  url: "https://www.myntmore.com/tools/posting-rhythm-builder",
});

export default function PostingRhythmBuilder() {
  return (
    <InnerLayout>
      <JsonLd data={APP_SCHEMA} />
      <div className="pt-32 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Free Tools", href: "/resources/tools" }, { label: "Posting Rhythm Builder", href: "/tools/posting-rhythm-builder" }]} />
        </div>
      </div>
      <PostingRhythmClient />
    </InnerLayout>
  );
}
