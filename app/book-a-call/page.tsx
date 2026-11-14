import type { Metadata } from "next";
import BookACallClient from "./BookACallClient";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/book-a-call", {
  title: "Book a Strategy Call | Free B2B Growth Audit",
  description: "Book a free 30-minute B2B growth and outbound pipeline audit with Myntmore's senior team: your ICP, messaging and outbound systems. No pitch.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://www.myntmore.com/book-a-call" },
  openGraph: {
    ...OG_BASE,
    title: "Book a Strategy Call | Free B2B Growth Audit | Myntmore",
    description: "Book a free 30-minute B2B growth and outbound pipeline audit with Myntmore's senior team: your ICP, messaging and outbound systems. No pitch.",
    url: "https://www.myntmore.com/book-a-call",
    images: ogImages("/book-a-call"),
  },
  keywords: [
    "book a call with myntmore founder",
    "book b2b growth strategy call",
    "free gtm audit",
    "b2b outbound strategy session",
    "book a free consultation",
    "talk to tejas jhaveri",
    "schedule a founder call",
    "b2b pipeline audit call",
    "30 minute strategy call",
    "free b2b growth audit",
    "book a discovery call",
    "outbound audit call",
  ],
});

export default function BookACallPage() {
  return <BookACallClient />;
}
