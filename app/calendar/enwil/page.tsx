import type { Metadata } from "next";
import EnwilCalendarClient from "../enwil-li/EnwilCalendarClient";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/calendar/enwil", {
  title: "Outbound Strategy Session with Enwil Fernandes",
  description:
    "Schedule a 30-minute 1-on-1 strategy call with Enwil Fernandes, Head of Sales at Myntmore. Review your B2B outbound systems, target ICP, and conversion bottlenecks.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.myntmore.com/calendar/enwil-li" },
  openGraph: {
    ...OG_BASE,
    title: "Outbound Strategy Session | Enwil Fernandes | Myntmore",
    description:
      "Schedule a 30-minute 1-on-1 strategy call with Enwil Fernandes, Head of Sales at Myntmore. Review your B2B outbound systems, target ICP, and conversion bottlenecks.",
    url: "https://www.myntmore.com/calendar/enwil-li",
    images: ogImages("/calendar/enwil"),
  },
});

export default function EnwilShortCalendarPage() {
  return <EnwilCalendarClient canonicalPath="/calendar/enwil-li" />;
}
