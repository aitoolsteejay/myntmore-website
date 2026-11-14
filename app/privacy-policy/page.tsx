import type { Metadata } from "next";
import InnerLayout from "../components/InnerLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/schema";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const PAGE_URL = `${SITE_URL}/privacy-policy`;
const WEBPAGE_SCHEMA = buildWebPageSchema({
  name: "Privacy Policy",
  description: "How Myntmore collects, uses and protects your information: the data we collect, cookies, third-party services, retention, security and your rights.",
  url: PAGE_URL,
  breadcrumb: [
    { name: "Home", url: SITE_URL },
    { name: "Privacy Policy", url: PAGE_URL },
  ],
});

export const metadata: Metadata = withPageSeo("/privacy-policy", {
  title: "Privacy Policy: How We Handle Your Data",
  description: "How Myntmore collects, uses and protects your information: the data we collect, cookies, third-party services, retention, security and your rights.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    ...OG_BASE,
    title: "Privacy Policy | Myntmore",
    description: "How Myntmore collects, uses and protects your information: the data we collect, cookies, third-party services, retention, security and your rights.",
    url: PAGE_URL,
    images: ogImages("/privacy-policy"),
  },
  keywords: [
    "myntmore privacy policy",
    "data privacy policy",
    "myntmore data protection",
    "privacy policy b2b agency",
    "how myntmore uses your data",
    "myntmore terms and privacy",
  ],
});

const SECTIONS = [
  {
    heading: "Introduction",
    body: [
      "Myntmore (\"we\", \"us\", or \"our\") operates myntmore.com and provides B2B outbound and lead generation services. This policy explains what information we collect when you visit our site or work with us, how we use it, and the choices you have.",
      "By using this site, you agree to the collection and use of information as described here. If you do not agree, please do not use the site.",
    ],
  },
  {
    heading: "Information We Collect",
    body: [
      "Contact details you give us directly: name, designation, company name, phone number, and email address, when you fill out a form, book a call, or subscribe to our newsletter.",
      "Scheduling information: when you book a call through Zoho Bookings, Zoho collects and processes your name, email, and meeting details on our behalf. Their handling of that data is governed by Zoho's own privacy policy.",
      "Usage data: pages visited, time on site, device and browser type, and referring pages, collected automatically through analytics tools.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "To respond to enquiries, schedule calls, and deliver the services you ask us about.",
      "To send you outbound marketing, case studies, or newsletter content, where you have opted in, with an unsubscribe option in every email.",
      "To understand how visitors use our site so we can improve it.",
      "To meet legal and accounting obligations.",
    ],
  },
  {
    heading: "Cookies and Tracking Technologies",
    body: [
      "We use cookies and similar technologies, including Google Analytics and the Meta (Facebook) Pixel, to understand site traffic and measure the performance of our marketing.",
      "You can disable cookies in your browser settings at any time. Doing so may affect how parts of the site function.",
    ],
  },
  {
    heading: "Third-Party Services",
    body: [
      "We rely on third-party providers to run parts of this site and our outreach, including Zoho for scheduling (Zoho Bookings), forms, and email campaigns, Google Analytics for site analytics, Vercel for hosting, and Supabase to keep a record of sign-ups for our free tools. The free AI tools also send what you type into them to Google's Gemini API, through our servers, to generate your result. Each of these providers processes data under their own privacy policy, and we only share what is necessary for them to perform their function.",
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      "We keep contact and enquiry information for as long as needed to respond to you, deliver services, and meet legal or accounting requirements, after which it is deleted or anonymised.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "You can ask us to access, correct, or delete the personal information we hold about you, and you can unsubscribe from marketing emails at any time using the link in those emails.",
      "To make a request, email us at growth@myntmore.com and we will respond within a reasonable time.",
    ],
  },
  {
    heading: "Data Security",
    body: [
      "We take reasonable technical and organisational steps to protect your information from unauthorised access, loss, or misuse. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Children's Privacy",
    body: [
      "Our services are intended for businesses and professionals. We do not knowingly collect information from anyone under the age of 18.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We may update this policy from time to time. Changes take effect once posted on this page, with the \"last updated\" date revised accordingly.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      "If you have questions about this policy or how your information is handled, email us at growth@myntmore.com, call us on +91 81693 18951, or write to us at WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <InnerLayout>
      <JsonLd data={WEBPAGE_SCHEMA} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto text-center">
          <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy-policy" }]} className="justify-center" />
          <div className="mb-4">
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
              Legal
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight" style={{ color: "#0a0a0a" }}>
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: "#71675E" }}>Last updated October 17, 2026</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-black mb-4" style={{ color: "#0a0a0a" }}>{section.heading}</h2>
              <div className="space-y-3">
                {section.body.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </InnerLayout>
  );
}
