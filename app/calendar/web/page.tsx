import type { Metadata } from "next";
import CalendarPageClient from "../th/CalendarPageClient";
import { OG_BASE } from "@/lib/og";

export const metadata: Metadata = {
  title: "B2B Pipeline Strategy Session with Tejas Jhaveri",
  description:
    "Pick a 30-minute 1-on-1 slot with Tejas Jhaveri, Founder of Myntmore. We'll diagnose your outbound engine, stress-test your ICP, and map your 90-day growth roadmap.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.myntmore.com/calendar/web" },
  openGraph: {
    ...OG_BASE,
    title: "B2B Pipeline Strategy Session | Tejas Jhaveri",
    description:
      "Pick a 30-minute 1-on-1 slot with Tejas Jhaveri, Founder of Myntmore. We'll diagnose your outbound engine, stress-test your ICP, and map your 90-day growth roadmap.",
    url: "https://www.myntmore.com/calendar/web",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
};

export default function CalendarWebPage() {
  return (
    <CalendarPageClient
      canonicalPath="/calendar/web"
      dataUrl="https://calendly.com/founder-myntmore/web"
      badge="1-on-1 Founder Consultation"
      title="Pick a time that works for you"
      description="30 minutes with our founder. No pitch, no pressure. Just an honest, actionable review of your outbound pipeline and growth roadmap."
      duration="30 Mins"
    />
  );
}
