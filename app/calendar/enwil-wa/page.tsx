import type { Metadata } from "next";
import EnwilCalendarClient from "../enwil-li/EnwilCalendarClient";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/calendar/enwil-wa", {
  title: "Outbound Strategy Session with Enwil Fernandes",
  description:
    "Schedule a 30-minute 1-on-1 strategy call with Enwil Fernandes, Senior Sales Head at Myntmore. Review your B2B outbound systems, target ICP, and conversion bottlenecks.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.myntmore.com/calendar/enwil-wa" },
  openGraph: {
    ...OG_BASE,
    title: "Outbound Strategy Session | Enwil Fernandes | Myntmore",
    description:
      "Schedule a 30-minute 1-on-1 strategy call with Enwil Fernandes, Senior Sales Head at Myntmore. Review your B2B outbound systems, target ICP, and conversion bottlenecks.",
    url: "https://www.myntmore.com/calendar/enwil-wa",
    images: ogImages("/calendar/enwil-wa"),
  },
});

export default function EnwilWhatsAppCalendarPage() {
  return (
    <EnwilCalendarClient
      canonicalPath="/calendar/enwil-wa"
      embedUrl="https://meetingwithteejay.zohobookings.com/portal-embed#/4203790000004915051"
      badge="WhatsApp & Multi-Channel Outbound Consultation"
      title="Pick a time that works for you"
      description="Schedule a 1-on-1 session with our Senior Sales Head. We'll review your outbound pipeline, target ICP, and conversion bottlenecks."
    />
  );
}
