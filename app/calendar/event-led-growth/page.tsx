import type { Metadata } from "next";
import CalendarPageClient from "../th/CalendarPageClient";
import { OG_BASE } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/calendar/event-led-growth", {
  title: "Event-Led Growth Strategy Session",
  description:
    "Pick a 25-minute slot with Tejas Jhaveri, Founder of Myntmore. We'll map how to turn executive roundtables, webinars, and events into predictable enterprise pipeline.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.myntmore.com/calendar/event-led-growth" },
  openGraph: {
    ...OG_BASE,
    title: "Event-Led Growth Strategy Session | Tejas Jhaveri",
    description:
      "Pick a 25-minute slot with Tejas Jhaveri, Founder of Myntmore. We'll map how to turn executive roundtables, webinars, and events into predictable enterprise pipeline.",
    url: "https://www.myntmore.com/calendar/event-led-growth",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
});

export default function EventLedGrowthCalendarPage() {
  return (
    <CalendarPageClient
      canonicalPath="/calendar/event-led-growth"
      dataUrl="https://calendly.com/founder-myntmore/elg-25-minutes"
      badge="Event-Led Growth Consultation"
      title="Event-Led Growth (ELG) Strategy Session"
      description="25 minutes with our founder. Explore how to turn webinars, executive roundtables, and events into high-intent B2B pipeline."
      duration="25 Mins"
    />
  );
}
