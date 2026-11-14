import type { Metadata } from "next";
import CalendarPageClient from "../th/CalendarPageClient";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/calendar/whatsapp", {
  title: "Multi-Channel Outbound Strategy with Tejas Jhaveri",
  description:
    "Pick a 30-minute slot with Tejas Jhaveri, Founder of Myntmore. Review your multi-channel pipeline, WhatsApp cadences, and prospect follow-up workflows.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.myntmore.com/calendar/whatsapp" },
  openGraph: {
    ...OG_BASE,
    title: "Multi-Channel Outbound Strategy | Tejas Jhaveri",
    description:
      "Pick a 30-minute slot with Tejas Jhaveri, Founder of Myntmore. Review your multi-channel pipeline, WhatsApp cadences, and prospect follow-up workflows.",
    url: "https://www.myntmore.com/calendar/whatsapp",
    images: ogImages("/calendar/whatsapp"),
  },
});

export default function CalendarWhatsAppPage() {
  return (
    <CalendarPageClient
      canonicalPath="/calendar/whatsapp"
      dataUrl="https://calendly.com/founder-myntmore/wa"
      badge="WhatsApp & Multi-Channel Pipeline Consultation"
      title="Pick a time that works for you"
      description="30 minutes with our founder. Review your outbound pipeline, messaging strategy, and conversion workflows with zero sales pressure."
      duration="30 Mins"
    />
  );
}
