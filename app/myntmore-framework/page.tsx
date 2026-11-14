import type { Metadata } from "next";
import MyntmoreFrameworkClient from "./MyntmoreFrameworkClient";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/myntmore-framework", {
  title: { absolute: "The Myntmore Framework: How Our B2B Outbound Works" },
  description: "How a Myntmore campaign runs: ICP targeting, personalized connection notes, paced sending and timely follow-ups. See the full framework.",
  keywords: ["linkedin outreach automation framework", "b2b outbound automation", "linkedin automation without bans", "personalized connection request automation", "myntmore framework"],
  alternates: { canonical: "https://www.myntmore.com/myntmore-framework" },
  openGraph: {
    ...OG_BASE,
    title: "The Myntmore Framework: How Our B2B Outbound Works",
    description: "The automation pipeline behind every Myntmore outbound campaign, from ICP targeting to human-safe, timely follow-ups.",
    url: "https://www.myntmore.com/myntmore-framework",
    images: ogImages("/myntmore-framework"),
  },
});

export default function MyntmoreFrameworkPage() {
  return <MyntmoreFrameworkClient />;
}
