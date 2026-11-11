import type { Metadata } from "next";
import CalendarPageClient from "../th/CalendarPageClient";
import { OG_BASE } from "@/lib/og";

export const metadata: Metadata = {
  title: "LinkedIn Outbound Diagnostic with Tejas Jhaveri",
  description:
    "Pick a 30-minute slot with Tejas Jhaveri, Founder of Myntmore. We'll audit your LinkedIn connection sequences, founder profile positioning, and reply rates.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.myntmore.com/calendar/linkedin" },
  openGraph: {
    ...OG_BASE,
    title: "LinkedIn Outbound Diagnostic | Tejas Jhaveri",
    description:
      "Pick a 30-minute slot with Tejas Jhaveri, Founder of Myntmore. We'll audit your LinkedIn connection sequences, founder profile positioning, and reply rates.",
    url: "https://www.myntmore.com/calendar/linkedin",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
};

export default function CalendarLinkedInPage() {
  return (
    <CalendarPageClient
      canonicalPath="/calendar/linkedin"
      dataUrl="https://calendly.com/founder-myntmore/linkedin"
      badge="LinkedIn Outbound & Pipeline Consultation"
      title="Pick a time that works for you"
      description="30 minutes with our founder. Review your LinkedIn outbound system, profile positioning, and messaging strategy with zero sales pressure."
      duration="30 Mins"
    />
  );
}
