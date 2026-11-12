import type { Metadata } from "next";
import FeedClient from "./FeedClient";
import { OG_BASE } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/resources/feed", {
  title: "The Feed: B2B Outbound Reels",
  description: "Short, practical Instagram Reels on B2B outbound, cold email, LinkedIn and AI lead generation from the Myntmore team. Watch the latest reels.",
  keywords: [
    "b2b instagram reels",
    "short-form video marketing b2b",
    "linkedin outreach video tips",
    "ai lead generation content",
    "b2b content marketing videos",
    "outbound sales video tips",
    "linkedin growth reels",
    "video marketing for founders",
    "b2b social media content",
    "instagram reels for founders",
    "ai powered lead generation videos",
    "cold email tips video",
  ],
  alternates: { canonical: "https://www.myntmore.com/resources/feed" },
  openGraph: {
    ...OG_BASE,
    title: "The Feed | Myntmore",
    description: "Short, practical Reels on B2B outbound, LinkedIn, and AI-powered lead generation.",
    url: "https://www.myntmore.com/resources/feed",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
});

export default function FeedPage() {
  return <FeedClient />;
}
