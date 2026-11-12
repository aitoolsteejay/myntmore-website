import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildWebApplicationSchema } from "@/lib/schema";
import { buildToolSocialMetadata } from "@/lib/tool-social-metadata";
import BattleCardGeneratorClient from "./BattleCardGeneratorClient";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/tools/battle-card-generator", {
  title: "Free Competitor Battle Card Generator (AI)",
  description: "Free AI battle card generator: name a competitor and get their positioning, public pricing, real strengths and gaps, and how to win against them.",
  keywords: [
    "competitor battle card generator",
    "free battle card generator",
    "ai battle card generator",
    "sales battle card template",
    "competitor analysis tool for sales",
    "how to build a sales battle card",
    "what is a battle card",
    "competitive positioning tool",
    "competitor research tool free",
    "sales enablement battle card",
    "competitor pricing research tool",
    "win competitor deals sales tool",
    "b2b competitor comparison generator",
    "ai competitor research tool",
    "sales battle card examples",
    "how to position against competitors",
  ],
  alternates: { canonical: "https://www.myntmore.com/tools/battle-card-generator" },
  ...buildToolSocialMetadata("Competitor Battle Card Generator", "Free AI tool that researches a competitor live and builds a sales battle card: strengths, gaps, and how to position against them. Try it free.", "/tools/battle-card-generator"),
});

const APP_SCHEMA = buildWebApplicationSchema({
  name: "Competitor Battle Card Generator",
  description: "Free AI tool that researches a competitor live and builds a sales battle card: strengths, gaps, and how to position against them. Try it free.",
  url: "https://www.myntmore.com/tools/battle-card-generator",
});

export default function BattleCardGeneratorPage() {
  return (
    <InnerLayout>
      <JsonLd data={APP_SCHEMA} />
      <div className="pt-32 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Free Tools", href: "/resources/tools" }, { label: "Competitor Battle Card Generator", href: "/tools/battle-card-generator" }]} />
        </div>
      </div>
      <BattleCardGeneratorClient />
    </InnerLayout>
  );
}
