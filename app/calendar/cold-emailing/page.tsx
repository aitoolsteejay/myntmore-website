import type { Metadata } from "next";
import CalendarPageClient from "../th/CalendarPageClient";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/calendar/cold-emailing", {
  title: "Cold Email Infrastructure Audit with Tejas Jhaveri",
  description:
    "Pick a 30-minute slot with Tejas Jhaveri, Founder of Myntmore. Review your email deliverability, secondary domain setup, warming rhythm, and high-converting copy angles.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.myntmore.com/calendar/cold-emailing" },
  openGraph: {
    ...OG_BASE,
    title: "Cold Email Infrastructure Audit | Tejas Jhaveri",
    description:
      "Pick a 30-minute slot with Tejas Jhaveri, Founder of Myntmore. Review your email deliverability, secondary domain setup, warming rhythm, and high-converting copy angles.",
    url: "https://www.myntmore.com/calendar/cold-emailing",
    images: ogImages("/calendar/cold-emailing"),
  },
});

export default function CalendarColdEmailingPage() {
  return (
    <CalendarPageClient
      canonicalPath="/calendar/cold-emailing"
      dataUrl="https://calendly.com/founder-myntmore/email"
      badge="Cold Email Infrastructure & Strategy Consultation"
      title="Pick a time that works for you"
      description="30 minutes with our founder. Review your cold email infrastructure, deliverability, domain warming, and high-converting copy angles with zero sales pressure."
      duration="30 Mins"
    />
  );
}
