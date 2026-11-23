import type { Metadata } from "next";
import CalendarPageClient from "../th/CalendarPageClient";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/calendar/IG", {
  title: "Instagram Strategy Session with Tejas Jhaveri",
  description:
    "Pick a 25-minute slot with Tejas Jhaveri, Founder of Myntmore. We'll review your Instagram presence, DM workflows, and prospect conversion roadmap.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.myntmore.com/calendar/IG" },
  openGraph: {
    ...OG_BASE,
    title: "Instagram Strategy Session | Tejas Jhaveri",
    description:
      "Pick a 25-minute slot with Tejas Jhaveri, Founder of Myntmore. We'll review your Instagram presence, DM workflows, and prospect conversion roadmap.",
    url: "https://www.myntmore.com/calendar/IG",
    images: ogImages("/calendar/IG"),
  },
});

export default function CalendarIGPage() {
  return (
    <CalendarPageClient
      canonicalPath="/calendar/IG"
      dataUrl="https://calendly.com/founder-myntmore/ig-25-minute-meeting"
      badge="Instagram Strategy Consultation"
      title="Pick a time that works for you"
      description="25 minutes with our founder. Review your Instagram positioning, DM outreach cadences, and conversion pipeline with zero sales pressure."
      duration="25 Mins"
    />
  );
}
