import type { Metadata } from "next";
import CalendarPageClient from "../th/CalendarPageClient";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/calendar/tj", {
  title: "Founder Strategy Session with Tejas Jhaveri",
  description:
    "Pick a 30-minute 1-on-1 slot with Tejas Jhaveri, Founder of Myntmore. An honest diagnostic of your B2B outbound systems, ICP, and pipeline bottlenecks. Zero sales pitch.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.myntmore.com/calendar/tj" },
  openGraph: {
    ...OG_BASE,
    title: "Founder Strategy Session | Tejas Jhaveri",
    description:
      "Pick a 30-minute 1-on-1 slot with Tejas Jhaveri, Founder of Myntmore. An honest diagnostic of your B2B outbound systems, ICP, and pipeline bottlenecks. Zero sales pitch.",
    url: "https://www.myntmore.com/calendar/tj",
    images: ogImages("/calendar/tj"),
  },
});

export default function CalendarTJPage() {
  return <CalendarPageClient canonicalPath="/calendar/tj" />;
}
