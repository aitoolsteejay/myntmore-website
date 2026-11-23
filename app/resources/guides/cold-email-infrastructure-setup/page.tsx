import type { Metadata } from "next";
import SetupGuide, { type SetupGuideData } from "@/components/guides/SetupGuide";
import { buildArticleSchema } from "@/lib/schema";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";
import pageCopy from "@/content/page-copy/guideColdEmailInfrastructureSetup.json";

// This page's text is edited in the admin ("Cold Email Infrastructure Setup: Domains, Inboxes & DNS") and lives in content/page-copy/guideColdEmailInfrastructureSetup.json.
const copy = pageCopy;

const PATH = "/resources/guides/cold-email-infrastructure-setup";
const URL = `https://www.myntmore.com${PATH}`;
const TITLE = "Cold Email Infrastructure Setup: Domains & DNS";
const DESCRIPTION = "Set up cold email domains, Google Workspace inboxes, and SPF, DKIM, DMARC and MX records step by step, with copy-ready DNS records. Free guide.";

export const metadata: Metadata = withPageSeo(PATH, {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "cold email infrastructure setup",
    "cold email infrastructure",
    "cold email domain setup",
    "how to set up domains for cold email",
    "google workspace cold email setup",
    "spf dkim dmarc setup for cold email",
    "secondary domain for cold email",
    "how many inboxes per domain cold email",
    "dmarc record for cold email",
  ],
  alternates: { canonical: URL },
  openGraph: { ...OG_BASE, title: `${TITLE} | Myntmore`, description: DESCRIPTION, url: URL, images: ogImages(PATH) },
});

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "How to set up cold email infrastructure: domains, Google Workspace inboxes and DNS records",
  description: DESCRIPTION,
  url: URL,
  datePublished: "2026-11-17T00:00:00+05:30",
  dateModified: "2026-11-17T00:00:00+05:30",
});

const DATA: SetupGuideData = {
  slug: "cold-email-infrastructure-setup",
  badge: copy.s01.t01,
  h1Lead: "Set up cold email domains and inboxes",
  h1Underlined: "the right way",
  intro:
    copy.s01.t02,
  numbers: [
    { value: "10", label: copy.s01.t03 },
    { value: "4", label: copy.s01.t04 },
    { value: "~30", label: copy.s01.t05 },
    { value: "14-21", label: copy.s01.t06 },
  ],
  numbersNote: "Our standard setup: 40 inboxes sending up to about 1,200 emails a day. Scale it down to your own volume.",
  steps: [
    {
      title: copy.s01.t07,
      body: [
        copy.s01.t08,
        copy.s01.t09,
      ],
      tip: copy.s01.t10,
    },
    {
      title: copy.s01.t11,
      body: [
        copy.s01.t12,
      ],
    },
    {
      title: copy.s01.t13,
      body: [
        copy.s01.t14,
        copy.s01.t15,
      ],
      tip: copy.s01.t16,
    },
    {
      title: copy.s01.t17,
      body: [
        copy.s01.t18,
      ],
      copy: [{ label: copy.s01.t19, text: copy.s01.t20 }],
    },
    {
      title: copy.s01.t21,
      body: [
        copy.s01.t22,
      ],
      copy: [{ label: copy.s01.t23, text: copy.s01.t24 }],
    },
    {
      title: copy.s01.t25,
      body: [
        copy.s01.t26,
        copy.s01.t27,
      ],
      copy: [{ label: copy.s01.t28, text: copy.s01.t29 }],
    },
    {
      title: copy.s01.t30,
      body: [
        copy.s01.t31,
        copy.s01.t32,
      ],
      copy: [{ label: copy.s01.t33, text: copy.s01.t34 }],
    },
    {
      title: copy.s01.t35,
      body: [
        copy.s01.t36,
        copy.s01.t37,
      ],
    },
  ],
  checklist: [
    copy.s01.t38,
    copy.s01.t39,
    copy.s01.t40,
    copy.s01.t41,
    copy.s01.t42,
    copy.s01.t43,
  ],
  related: [
    { label: copy.s01.t44, href: "/resources/blogs/cold-email-infrastructure-explained", note: copy.s01.t45 },
    { label: copy.s01.t46, href: "/resources/guides/smartlead-setup", note: copy.s01.t47 },
    { label: copy.s01.t48, href: "/resources/blogs/gmail-and-yahoo-sender-requirements", note: copy.s01.t49 },
    { label: copy.s01.t50, href: "/tools/cold-email-inbox-calculator", note: copy.s01.t51 },
    { label: copy.s01.t52, href: "/resources/blogs/cold-email-deliverability-guide", note: copy.s01.t53 },
  ],
  cta: {
    heading: copy.s01.t54,
    body: copy.s01.t55,
    href: "/services/cold-email",
    label: copy.s01.t56,
  },
};

export default function ColdEmailInfrastructureSetup() {
  return <SetupGuide data={DATA} articleSchema={ARTICLE_SCHEMA} />;
}
