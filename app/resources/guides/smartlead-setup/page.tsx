import type { Metadata } from "next";
import SetupGuide, { type SetupGuideData } from "@/components/guides/SetupGuide";
import { buildArticleSchema } from "@/lib/schema";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";
import pageCopy from "@/content/page-copy/guideSmartleadSetup.json";

// This page's text is edited in the admin ("How to Set Up Smartlead for Cold Email") and lives in content/page-copy/guideSmartleadSetup.json.
const copy = pageCopy;

const PATH = "/resources/guides/smartlead-setup";
const URL = `https://www.myntmore.com${PATH}`;
const TITLE = "How to Set Up Smartlead for Cold Email";
const DESCRIPTION = "Connect Google inboxes to Smartlead, set warm-up and sending limits, schedule a 5-step sequence and launch safely. The settings we use for clients.";

export const metadata: Metadata = withPageSeo(PATH, {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "smartlead setup",
    "how to set up smartlead",
    "smartlead warmup settings",
    "smartlead sending limits per inbox",
    "smartlead campaign settings",
    "connect google workspace to smartlead",
    "cold email warm up schedule",
    "how many cold emails per inbox per day",
  ],
  alternates: { canonical: URL },
  openGraph: { ...OG_BASE, title: `${TITLE} | Myntmore`, description: DESCRIPTION, url: URL, images: ogImages(PATH) },
});

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "How to set up Smartlead for cold email: inboxes, warm-up, limits and your first campaign",
  description: DESCRIPTION,
  url: URL,
  datePublished: "2026-11-17T00:00:00+05:30",
  dateModified: "2026-11-17T00:00:00+05:30",
});

const DATA: SetupGuideData = {
  slug: "smartlead-setup",
  badge: copy.s01.t01,
  h1Lead: "Set up Smartlead so your first campaign",
  h1Underlined: "lands in the inbox",
  intro:
    copy.s01.t02,
  numbers: [
    { value: "14-21", label: copy.s01.t03 },
    { value: "3-5", label: copy.s01.t04 },
    { value: "~30", label: copy.s01.t05 },
    { value: "<0.3%", label: copy.s01.t06 },
  ],
  numbersNote: "The settings we use for client campaigns. Smartlead's menu names change from time to time, so look for the setting, not the exact label.",
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
        copy.s01.t13,
      ],
    },
    {
      title: copy.s01.t14,
      body: [
        copy.s01.t15,
        copy.s01.t16,
      ],
    },
    {
      title: copy.s01.t17,
      body: [
        copy.s01.t18,
        copy.s01.t19,
      ],
    },
    {
      title: copy.s01.t20,
      body: [
        copy.s01.t21,
      ],
      copy: [
        { label: copy.s01.t22, text: copy.s01.t23 },
      ],
    },
    {
      title: copy.s01.t24,
      body: [
        copy.s01.t25,
      ],
    },
    {
      title: copy.s01.t26,
      body: [
        copy.s01.t27,
        copy.s01.t28,
      ],
    },
    {
      title: copy.s01.t29,
      body: [
        copy.s01.t30,
        copy.s01.t31,
      ],
    },
  ],
  checklist: [
    copy.s01.t32,
    copy.s01.t33,
    copy.s01.t34,
    copy.s01.t35,
    copy.s01.t36,
    copy.s01.t37,
  ],
  related: [
    { label: copy.s01.t38, href: "/resources/blogs/cold-email-infrastructure-explained", note: copy.s01.t39 },
    { label: copy.s01.t40, href: "/resources/guides/cold-email-infrastructure-setup", note: copy.s01.t41 },
    { label: copy.s01.t42, href: "/resources/guides/cold-email-tech-stack", note: copy.s01.t43 },
    { label: copy.s01.t44, href: "/resources/blogs/cold-email-follow-up-sequence", note: copy.s01.t45 },
    { label: copy.s01.t46, href: "/resources/blogs/gmail-and-yahoo-sender-requirements", note: copy.s01.t47 },
  ],
  cta: {
    heading: copy.s01.t48,
    body: copy.s01.t49,
    href: "/services/cold-email",
    label: copy.s01.t50,
  },
};

export default function SmartleadSetup() {
  return <SetupGuide data={DATA} articleSchema={ARTICLE_SCHEMA} />;
}
