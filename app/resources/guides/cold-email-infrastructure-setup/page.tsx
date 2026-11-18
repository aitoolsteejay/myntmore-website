import type { Metadata } from "next";
import SetupGuide, { type SetupGuideData } from "@/components/guides/SetupGuide";
import { buildArticleSchema } from "@/lib/schema";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

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
  badge: "Cold Email · Setup Guide",
  h1Lead: "Set up cold email domains and inboxes",
  h1Underlined: "the right way",
  intro:
    "The setup that runs before any campaign: separate sending domains, Google Workspace inboxes, and the four DNS records that decide whether your email reaches the inbox. It is the same order we follow for every client, using Spaceship for domains and Google for inboxes.",
  numbers: [
    { value: "10", label: "Sending domains" },
    { value: "4", label: "Inboxes per domain" },
    { value: "~30", label: "Emails per inbox per day" },
    { value: "14-21", label: "Days of warm-up first" },
  ],
  numbersNote: "Our standard setup: 40 inboxes sending up to about 1,200 emails a day. Scale it down to your own volume.",
  steps: [
    {
      title: "Buy separate domains for sending",
      body: [
        "Never send cold email from your main domain. If a campaign hurts sender reputation, it hurts the domain your team, clients and invoices depend on. Buy a few secondary domains that are close variations of your brand, such as getbrand.com, trybrand.com or brandhq.com.",
        "Stick to .com where you can, and avoid hyphens and numbers. Any registrar works; we use Spaceship. To size it, divide your daily email target by about 30 per inbox, then by 4 inboxes per domain.",
      ],
      tip: "Buy one or two extra domains up front. If one domain's reputation drops, you can rest it without stopping the campaign.",
    },
    {
      title: "Redirect every sending domain to your website",
      body: [
        "Prospects who check out a sending domain should land on your real website, not a parked page. At your registrar, set a permanent (301) redirect from each secondary domain to your main site.",
      ],
    },
    {
      title: "Add the domains to Google Workspace and create inboxes",
      body: [
        "In the Google Admin console, add each sending domain as a secondary domain of your existing Workspace account, then verify it with the TXT record Google gives you. Menu names in the console change from time to time, but domain settings sit under Account, then Domains.",
        "Create inboxes on each domain as real users with real names, like the person who will reply. We use 4 per domain. Each one is a paid Workspace user, so budget for it. Add a profile photo and a plain signature to every inbox.",
      ],
      tip: "Aliases are not separate inboxes. Each sending address needs its own user so it has its own sending limit and reputation.",
    },
    {
      title: "Add the MX record so the inbox can receive replies",
      body: [
        "Without an MX record, replies bounce. Google's current setup for new domains uses a single MX record. Older setups list five aspmx records instead; both work, but don't mix them.",
      ],
      copy: [{ label: "MX record", text: "Type: MX\nHost: @\nValue: smtp.google.com\nPriority: 1" }],
    },
    {
      title: "Add SPF",
      body: [
        "SPF lists the servers allowed to send for the domain. A domain can have only one SPF record, so if one already exists, add Google's include to it rather than creating a second. If your sending tool connects to Google inboxes directly, mail still goes out through Google and this record covers it.",
      ],
      copy: [{ label: "SPF record", text: "Type: TXT\nHost: @\nValue: v=spf1 include:_spf.google.com ~all" }],
    },
    {
      title: "Turn on DKIM",
      body: [
        "DKIM signs every email so receiving servers can check it wasn't changed. In the Admin console, open the Gmail settings for email authentication, pick the sending domain, and generate a new record with a 2048-bit key. Google gives you the host name and a long TXT value.",
        "Add that TXT record at your registrar, wait for it to publish, then return to the Admin console and start authentication. DNS changes usually show up within minutes to a few hours, and can take up to 48 hours.",
      ],
      copy: [{ label: "DKIM record (value comes from Google)", text: "Type: TXT\nHost: google._domainkey\nValue: v=DKIM1; k=rsa; p=<the key Google generates>" }],
    },
    {
      title: "Add DMARC, starting with p=none",
      body: [
        "DMARC tells receiving servers what to do with mail that fails SPF and DKIM, and sends you reports. Start with p=none, which monitors without blocking. Once the reports show every legitimate sender passing, move to p=quarantine.",
        "Send reports to an address on the same domain, or to a DMARC reporting tool that gives you an address to use. Sending them to a different domain needs an extra authorisation record on that domain.",
      ],
      copy: [{ label: "DMARC record", text: "Type: TXT\nHost: _dmarc\nValue: v=DMARC1; p=none; rua=mailto:dmarc@yoursendingdomain.com" }],
    },
    {
      title: "Check it worked",
      body: [
        "Send a test email from each new inbox to a personal Gmail account. Open it, choose Show original from the message menu, and check that SPF, DKIM and DMARC all say PASS. Fix any that don't before moving on.",
        "Then connect the inboxes to your sending tool and warm them up for 14 to 21 days before the first live email. Our Smartlead setup guide covers that part.",
      ],
    },
  ],
  checklist: [
    "Cold email goes out from secondary domains only, never your main domain.",
    "Every sending domain redirects to your main website.",
    "Each inbox is a real Workspace user with a name, photo and signature.",
    "MX, SPF, DKIM and DMARC are set on every sending domain, and a test email shows PASS for all three checks.",
    "Inboxes have warmed up for 14 to 21 days, and live sending starts at well under 30 emails per inbox per day.",
    "Your list is verified, and you have a way to honour unsubscribe requests within 2 days.",
  ],
  related: [
    { label: "How to set up Smartlead", href: "/resources/guides/smartlead-setup", note: "Connect these inboxes, warm them up and launch the first campaign." },
    { label: "Gmail and Yahoo sender requirements", href: "/resources/blogs/gmail-and-yahoo-sender-requirements", note: "Authentication, spam rate and unsubscribe rules, in plain English." },
    { label: "Inbox & domain calculator", href: "/tools/cold-email-inbox-calculator", note: "Work out how many domains and inboxes your volume needs, and your go-live date." },
    { label: "Cold email deliverability guide", href: "/resources/blogs/cold-email-deliverability-guide", note: "Why emails land in spam, and how to fix it before you scale." },
  ],
  cta: {
    heading: "We set up and run the whole thing for you",
    body: "Our cold email service covers domains, inboxes, DNS, warm-up, lists, copy and reporting. Campaigns usually go live about 18 days after onboarding.",
    href: "/services/cold-email",
    label: "See the Cold Email Service",
  },
};

export default function ColdEmailInfrastructureSetup() {
  return <SetupGuide data={DATA} articleSchema={ARTICLE_SCHEMA} />;
}
