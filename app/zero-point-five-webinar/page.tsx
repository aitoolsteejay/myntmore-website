import type { Metadata } from "next";
import { withPageSeo } from "@/lib/page-seo";
import WebinarClient from "./WebinarClient";

// Orphan registration page for the Zero Point Five Community masterclass: no internal links point
// here, it is not in sitemap.xml, and it is noindexed. Share the URL directly with the community.
export const metadata: Metadata = withPageSeo("/zero-point-five-webinar", {
  title: "LinkedIn Sales Outreach Masterclass | Zero Point Five Community",
  description:
    "Register for the Zero Point Five Community masterclass on LinkedIn Sales Outreach with Tejas Jhaveri, Founder of Myntmore. Saturday, 28 November 2026, 12:00 to 1:00 PM IST, online.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.myntmore.com/zero-point-five-webinar" },
});

export default function ZeroPointFiveWebinarPage({ searchParams }: { searchParams?: { registered?: string } }) {
  return <WebinarClient registered={searchParams?.registered === "1"} />;
}
