import type { Metadata } from "next";
import { SITE_URL } from "@/lib/schema";
import DosAndDontsClient from "./DosAndDontsClient";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const PAGE_URL = `${SITE_URL}/resources/guides/dos-and-donts-of-outreach`;
// Shortened from the page's full name so the title tag plus the "| Myntmore"
// template stays inside Google's ~60-character cutoff; the H1 keeps the
// long form.
const TITLE = "Pattern Disruption: Cold Outreach Do's & Don'ts";
const DESCRIPTION = "Why most cold outreach gets deleted unread, how pattern disruption earns a reply, and what to send on LinkedIn vs. cold email. Free Myntmore guide.";

export const metadata: Metadata = withPageSeo("/resources/guides/dos-and-donts-of-outreach", {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    "dos and donts of cold outreach",
    "pattern disruption cold email",
    "what to send on linkedin outreach",
    "cold email vs linkedin messaging",
    "what is data enrichment b2b",
    "b2b enrichment tools",
    "cold outreach best practices",
    "outbound message examples that work",
  ],
  openGraph: {
    ...OG_BASE,
    title: `${TITLE} | Myntmore`,
    description: DESCRIPTION,
    url: PAGE_URL,
    images: ogImages("/resources/guides/dos-and-donts-of-outreach"),
  },
});

export default function DosAndDontsOfOutreachPage() {
  return <DosAndDontsClient />;
}
