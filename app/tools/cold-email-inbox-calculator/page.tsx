import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import Faq from "@/app/lp/Faq";
import { RelatedTools } from "@/components/tools/shared/RelatedTools";
import { buildFaqSchema, buildWebApplicationSchema } from "@/lib/schema";
import { buildToolSocialMetadata } from "@/lib/tool-social-metadata";
import { pageFaqs } from "@/lib/page-faqs";
import { withPageSeo } from "@/lib/page-seo";
import InboxCalculator from "./InboxCalculator";

const TITLE = "Cold Email Inbox & Domain Calculator";
const DESCRIPTION = "How many domains and inboxes do you need for cold email? Enter your volume and get domains, inboxes, daily sends and your go-live date. Free.";
const PATH = "/tools/cold-email-inbox-calculator";

export const metadata: Metadata = withPageSeo(PATH, {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "cold email inbox calculator",
    "how many inboxes do i need for cold email",
    "how many domains for cold email",
    "inboxes per domain cold email",
    "cold email domain calculator",
    "how many cold emails per inbox per day",
    "cold email sending volume calculator",
    "cold email warm up time",
  ],
  alternates: { canonical: `https://www.myntmore.com${PATH}` },
  ...buildToolSocialMetadata(TITLE, DESCRIPTION, PATH),
});

const APP_SCHEMA = buildWebApplicationSchema({ name: TITLE, description: DESCRIPTION, url: `https://www.myntmore.com${PATH}` });

const MATH = [
  { title: "Emails per sending day", body: "Prospects per month times emails per prospect, divided by your sending days in a month. Follow-ups count: a 5-email sequence to 5,000 prospects is 25,000 emails." },
  { title: "Inboxes", body: "Daily emails divided by what one inbox should send. We keep live sending at about 30 per inbox per day and never over 40, so volume comes from more inboxes, not harder-working ones." },
  { title: "Domains", body: "Inboxes divided by inboxes per domain (we use 4), plus about 10% spare, at least one, so a domain whose reputation dips can rest without stopping the campaign." },
  { title: "Go-live date", body: "Every new inbox warms up for 14 to 21 days before its first live email, starting at 3 to 5 warm-up emails a day and ramping to 20 to 30." },
];

const NEXT = [
  { label: "Cold email infrastructure setup", href: "/resources/guides/cold-email-infrastructure-setup", note: "Buy the domains, create the inboxes and add the four DNS records." },
  { label: "How to set up Smartlead", href: "/resources/guides/smartlead-setup", note: "Connect the inboxes, warm them up and launch the first sequence." },
  { label: "Cold Email ROI Calculator", href: "/tools/cold-email-roi-calculator", note: "Turn the same volume into meetings, pipeline and ROI." },
];

export default function ColdEmailInboxCalculatorPage() {
  const faqs = pageFaqs("tool-cold-email-inbox-calculator");
  return (
    <InnerLayout>
      <JsonLd data={APP_SCHEMA} />
      <JsonLd data={buildFaqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })))} />

      <section className="relative pt-32 pb-12 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(circle,rgba(234,88,12,0.16),rgba(234,88,12,0.05) 42%,transparent 70%)", pointerEvents: "none" }} />
        <div className="relative max-w-6xl mx-auto">
          <Breadcrumbs items={[{ label: "Free Tools", href: "/resources/tools" }, { label: TITLE, href: PATH }]} />
          <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
            Free calculator
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-5 leading-tight" style={{ color: "#0a0a0a" }}>
            How many domains and inboxes do you need for cold email?
          </h1>
          <p className="text-lg max-w-3xl leading-relaxed" style={{ color: "#52525B" }}>
            Enter the volume you want to send. You get the domains to buy, the inboxes to create, the emails each one sends per day and the date you can send your first live email, using the same numbers we set up for every client.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-6xl mx-auto">
          <InboxCalculator />
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>How the numbers are worked out</h2>
          <p className="text-base mb-8" style={{ color: "#52525B" }}>Nothing hidden: four steps, each using a number we publish and use on client campaigns.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {MATH.map((m, i) => (
              <div key={m.title} className="rounded-2xl border p-5" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#A14A08" }}>Step {i + 1}</div>
                <h3 className="text-lg font-black mb-2" style={{ color: "#0a0a0a" }}>{m.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq badge="FAQ" title="Common questions" items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />

      <section className="py-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black mb-5" style={{ color: "#0a0a0a" }}>Next: set it up</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {NEXT.map((n) => (
              <Link key={n.href} href={n.href} className="block rounded-xl border p-4 transition-colors hover:border-[#A14A08]" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <p className="text-sm font-black mb-1" style={{ color: "#0a0a0a" }}>{n.label} <span aria-hidden="true" style={{ color: "#A14A08" }}>&rarr;</span></p>
                <p className="text-xs leading-relaxed" style={{ color: "#52525B" }}>{n.note}</p>
              </Link>
            ))}
          </div>
          <div className="mt-10 rounded-2xl p-8 text-center border" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", borderColor: "rgba(245,183,49,0.35)" }}>
            <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>Rather have it built for you?</h2>
            <p className="text-base max-w-xl mx-auto mb-6" style={{ color: "#52525B" }}>Our cold email service sets up the domains, inboxes, DNS and warm-up, then runs the campaigns. Campaigns usually go live about 18 days after onboarding.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/cold-email" className="btn-dark px-8 py-4 text-sm font-bold">See the Cold Email Service</Link>
              <a href="/book-a-call" className="px-8 py-4 text-sm font-bold rounded-full border transition-colors hover:bg-[#F8F6F2]" style={{ color: "#0A0A0A", borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>Book a Free Audit</a>
            </div>
          </div>
        </div>
      </section>

      <RelatedTools currentSlug="cold-email-inbox-calculator" />
    </InnerLayout>
  );
}
