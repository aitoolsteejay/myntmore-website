import type { Metadata } from "next";
import SetupGuide, { type SetupGuideData } from "@/components/guides/SetupGuide";
import { buildArticleSchema } from "@/lib/schema";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

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
  badge: "Cold Email · Smartlead Setup",
  h1Lead: "Set up Smartlead so your first campaign",
  h1Underlined: "lands in the inbox",
  intro:
    "Smartlead is the sending tool in our cold email stack. This guide covers what happens after your domains and inboxes exist: connecting them, warming them up, setting limits, and launching the first sequence without burning a domain.",
  numbers: [
    { value: "14-21", label: "Days of warm-up first" },
    { value: "3-5", label: "Warm-up emails a day at the start" },
    { value: "~30", label: "Live emails per inbox per day" },
    { value: "<0.3%", label: "Spam complaint rate" },
  ],
  numbersNote: "The settings we use for client campaigns. Smartlead's menu names change from time to time, so look for the setting, not the exact label.",
  steps: [
    {
      title: "Connect your Google inboxes",
      body: [
        "Add each inbox in Smartlead's email accounts section using Google sign-in. If your Workspace admin restricts third-party apps, allow Smartlead as a trusted app in the Admin console's API controls first, or the connection will fail.",
        "Connect every inbox you set up, not just one per domain. Each inbox gets its own warm-up and sending limit, which is how volume spreads safely.",
      ],
      tip: "Haven't set up domains and inboxes yet? Start with our cold email infrastructure guide, then come back here.",
    },
    {
      title: "Turn on warm-up for every inbox",
      body: [
        "Warm-up sends and replies to a small number of emails between real inboxes, so mailbox providers learn to trust a new address. Start at 3 to 5 warm-up emails per inbox per day and ramp up by 2 to 3 a day until you reach a steady 20 to 30.",
        "Give every new inbox 14 to 21 days of warm-up before its first live email, and leave warm-up running after the campaign starts.",
      ],
    },
    {
      title: "Set sending limits per inbox",
      body: [
        "Cap live sending at about 30 emails per inbox per day, and stay under 40. Volume comes from more inboxes, not more email per inbox: our standard 40 inboxes send up to about 1,200 emails a day at that rate.",
        "In the first week of live sending, start lower and raise the limit as replies come in and bounces stay low.",
      ],
    },
    {
      title: "Upload a verified list",
      body: [
        "Verify every address before it goes into Smartlead; we use BounceBan. Bounces are one of the fastest ways to damage a new domain, and a list that looks clean in a spreadsheet often isn't.",
        "Upload the list as a CSV with first name, company and any personalisation fields your copy uses, and map each column to a Smartlead variable so placeholders like {{first_name}} fill in correctly.",
      ],
    },
    {
      title: "Build the sequence",
      body: [
        "Write in plain text and keep links to a minimum. Space the emails out: a workable cadence is day 1, day 3, day 7, day 12 and day 18. Write two variants of the first email to test against each other.",
      ],
      copy: [
        { label: "Sequence timing", text: "Email 1: day 1  - the observation, one question, no calendar link\nEmail 2: day 3  - the cost of the problem\nEmail 3: day 7  - one short, real proof point\nEmail 4: day 12 - something useful, no ask\nEmail 5: day 18 - a polite close-the-loop" },
      ],
    },
    {
      title: "Schedule sends in the prospect's time zone",
      body: [
        "Set the sending window to the prospect's working hours on weekdays, not yours. For an India-based team selling to the US, that means sending while you sleep. Smartlead spreads emails across the window with a gap between each send, so they don't go out in one burst.",
      ],
    },
    {
      title: "Set the campaign options",
      body: [
        "Stop the sequence for a lead as soon as they reply. Include a simple way to opt out, honour every request within 2 days and never re-add a suppressed contact.",
        "If you track opens, set up a custom tracking domain, since shared tracking links can hurt deliverability. Many teams turn open tracking off and judge campaigns on replies and meetings instead.",
      ],
    },
    {
      title: "Launch small and watch the numbers",
      body: [
        "Launch to a small part of the list first. Keep the spam complaint rate below 0.3%, which is the limit Gmail and Yahoo set; Google recommends staying below 0.1%. If bounces or complaints rise on an inbox, pause it and fix the list or copy before sending more.",
        "Judge the campaign on positive replies and meetings booked. Across our campaigns, 1% to 3% of prospects reply, and at least 20% of those replies are positive.",
      ],
    },
  ],
  checklist: [
    "Every inbox is connected and has warmed up for 14 to 21 days, with warm-up still on.",
    "Live sending is capped at about 30 emails per inbox per day.",
    "The list is verified, and every placeholder in the copy maps to a filled column.",
    "The sequence is plain text, spaced over 18 days, with two first-email variants.",
    "Sends are scheduled for the prospect's weekday working hours.",
    "Replies stop the sequence, and opt-outs are honoured within 2 days.",
  ],
  related: [
    { label: "Cold email infrastructure setup", href: "/resources/guides/cold-email-infrastructure-setup", note: "Domains, Google inboxes and the four DNS records, before Smartlead." },
    { label: "Our cold email tech stack", href: "/resources/guides/cold-email-tech-stack", note: "The 7 tools we use, and a 3-email sequence with copy-ready variants." },
    { label: "Cold email follow-up sequence", href: "/resources/blogs/cold-email-follow-up-sequence", note: "What to write on day 1, 3, 7, 12 and 18." },
    { label: "Gmail and Yahoo sender requirements", href: "/resources/blogs/gmail-and-yahoo-sender-requirements", note: "The spam rate and unsubscribe rules your campaign has to meet." },
  ],
  cta: {
    heading: "We run Smartlead campaigns for you",
    body: "Our cold email service covers infrastructure, warm-up, verified lists, copy, sending and reporting. Campaigns usually go live about 18 days after onboarding.",
    href: "/services/cold-email",
    label: "See the Cold Email Service",
  },
};

export default function SmartleadSetup() {
  return <SetupGuide data={DATA} articleSchema={ARTICLE_SCHEMA} />;
}
