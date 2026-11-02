import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../components/InnerLayout";
import LeadCaptureForm from "../components/LeadCaptureForm";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildFaqSchema, buildLocalBusinessSchema } from "@/lib/schema";
import { pageFaqsQA } from "@/lib/page-faqs";

export const metadata: Metadata = {
  title: "B2B Lead Generation Company in Chennai",
  description:
    "Lead generation services in Chennai for B2B manufacturers, healthcare suppliers and exporters: cold email and LinkedIn that book meetings, live in 18 days.",
  alternates: {
    canonical: "https://www.myntmore.com/b2b-lead-generation-chennai",
  },
  keywords: [
    "b2b lead generation chennai",
    "outbound agency chennai",
    "linkedin outreach chennai",
    "cold email agency tamil nadu",
    "demand generation agency chennai",
    "abm agency chennai",
    "ai lead generation chennai",
    "sales intelligence chennai",
    "b2b lead generation for automotive companies chennai",
    "lead generation for auto component manufacturers chennai",
    "lead generation for healthcare companies chennai",
    "b2b leads for hospital groups chennai",
    "lead generation for it services companies omr chennai",
    "export lead generation chennai",
    "cold email agency for exporters tamil nadu",
    "best b2b outbound agency in chennai",
    "how to get b2b leads in chennai",
    "linkedin outreach for it companies chennai",
    "b2b lead generation company in chennai",
    "lead generation agency in chennai",
    "appointment setting services chennai",
    "outbound sales agency chennai",
  ],
  openGraph: {
    title: "B2B Lead Generation Company in Chennai | Myntmore",
    description:
      "AI-powered outbound for Chennai's manufacturing, healthcare, and IT/ITES companies: cold email, LinkedIn outreach, ABM, and ICP-led lead generation, fully managed by Myntmore.",
    url: "https://www.myntmore.com/b2b-lead-generation-chennai",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
};

const PAIN_POINTS = [
  {
    icon: "🏭",
    heading: "Manufacturing sales cycles that drag on for months",
    body: "Automotive and auto-component B2B deals in Chennai typically move through several stakeholders, purchasing, engineering, plant heads, before anyone signs off. Chasing this through one-off calls and trade-show follow-ups is slow. A systematic, multi-touch outbound motion keeps you in front of the right buyer at the right stage, and shortens the distance between first contact and first meeting.",
  },
  {
    icon: "🏥",
    heading: "Institutional healthcare buyers you won't meet through referrals",
    body: "Chennai's hospital groups, diagnostics chains, and healthcare-services companies buy through procurement heads, clinical administrators, and hospital management, people your existing referral network rarely reaches. Direct, targeted outreach gets your offer in front of the actual decision-makers, on a schedule you control instead of waiting for word-of-mouth.",
  },
  {
    icon: "🚢",
    heading: "Export buyers found only at the next trade fair",
    body: "Exporters and manufacturers feeding Chennai's ports and logistics network often rely on trade fairs and agent introductions to find international buyers, useful, but seasonal and unpredictable. Cold email and LinkedIn outreach let you reach sourcing and procurement teams abroad directly, all year, without waiting for the next exhibition.",
  },
];

const SERVICES = [
  {
    href: "/services/linkedin-outreach",
    title: "LinkedIn Outreach & Automation",
    body: "Personalised connection and messaging sequences to decision-makers on LinkedIn, run at scale without sounding automated.",
  },
  {
    href: "/services/cold-email",
    title: "Cold Email Infrastructure",
    body: "Domain setup, deliverability, and multi-touch email sequences built to land in the inbox, not the spam folder.",
  },
  {
    href: "/services/sales-intelligence",
    title: "ICP Mapping & Lead Scoring",
    body: "Define exactly who your best-fit buyer is, by industry, company size, and buying signal, then score and prioritise every lead against it.",
  },
  {
    href: "/services/ai-lead-generation",
    title: "AI Lead Generation",
    body: "AI-assisted prospecting and personalisation that finds and qualifies leads faster than manual research ever could.",
  },
  {
    href: "/services/account-based-marketing",
    title: "Account-Based Marketing",
    body: "Coordinated, multi-channel campaigns aimed at a curated list of named target accounts instead of a generic spray-and-pray list.",
  },
  {
    href: "/services/personal-branding",
    title: "Personal Branding",
    body: "Build your founder or leadership team's presence on LinkedIn so outbound conversations start on a foundation of trust.",
  },
];

const DIFFERENTIATORS = [
  {
    heading: "AI-powered systems, not manual, referral-based prospecting",
    body: "Most local outreach in Chennai still runs on personal networks and manual list-building. We run AI-assisted ICP mapping, list building, and personalisation on top of proven cold email and LinkedIn infrastructure, so volume and relevance scale together instead of trading one off against the other.",
  },
  {
    heading: "A fully managed, productized engine, not an ad-hoc favour",
    body: "You are not hiring a freelancer or briefing an intern. Myntmore plans, builds, and operates the entire outbound motion, strategy, copy, sending infrastructure, follow-ups, as a standing system your team can rely on every week.",
  },
  {
    heading: "Transparent reporting, every step of the way",
    body: "You see exactly which sequences are running, who has been contacted, what is landing meetings, and what pipeline it is producing. No black box, no vague monthly summary.",
  },
  {
    heading: "Monthly retainer, 3-month minimum",
    body: "The first three months cover setup and enough sending to judge results. After that it runs month to month with 30 days' notice, so we keep earning the work.",
  },
];

const FAQ_ITEMS = pageFaqsQA("city-chennai");

export default function Page() {
  return (
    <InnerLayout>
      <JsonLd data={buildFaqSchema(FAQ_ITEMS.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={buildLocalBusinessSchema("https://www.myntmore.com/b2b-lead-generation-chennai")} />
      {/* Hero */}
      <section className="pt-32 pb-20 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto text-center">
          <Breadcrumbs items={[{ label: "Chennai", href: "/b2b-lead-generation-chennai" }]} className="justify-center" />
          <span
            className="inline-flex text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: "rgba(245,183,49,0.12)", color: "#A14A08", border: "1px solid rgba(245,183,49,0.35)" }}
          >
            B2B Growth · Chennai
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]" style={{ color: "#0a0a0a" }}>
            B2B Lead Generation Agency in Chennai for Manufacturing, Healthcare & IT Teams
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-10" style={{ color: "#52525B" }}>
            Chennai is often called the Detroit of India, home to a dense automotive and auto-component
            manufacturing base, alongside a major healthcare and hospital-services cluster, a fast-growing
            IT/ITES corridor, and a significant ports, logistics, leather and textile export economy. Myntmore
            builds and runs the outbound engine, AI-powered cold email, LinkedIn outreach, and ABM, that turns
            that scale into booked sales meetings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book-a-call"
              className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2"
            >
              Book a Free GTM Audit
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link
              href="/services"
              className="px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2 rounded-xl border transition-colors"
              style={{ borderColor: "#D0C9BF", color: "#0a0a0a", backgroundColor: "rgba(255,255,255,0.7)" }}
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Chennai businesses need this */}
      <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>
              Why Chennai businesses need this
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3" style={{ color: "#0a0a0a" }}>
              Chennai's economy is built for outbound, most companies just aren't running it
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PAIN_POINTS.map((p) => (
              <div key={p.heading} className="rounded-2xl border p-8" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="font-black text-lg mb-2" style={{ color: "#0a0a0a" }}>{p.heading}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>
              What we run for you
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3" style={{ color: "#0a0a0a" }}>
              A complete outbound stack, not a single tactic
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group rounded-2xl border p-6 block transition-colors"
                style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}
              >
                <h3 className="font-black text-base mb-2" style={{ color: "#0a0a0a" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "#52525B" }}>{s.body}</p>
                <span className="text-xs font-bold inline-flex items-center gap-1" style={{ color: "#A14A08" }}>
                  Learn more
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Myntmore over a typical Chennai agency */}
      <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>
              Why Myntmore
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3" style={{ color: "#0a0a0a" }}>
              What sets Myntmore apart from a typical Chennai outreach vendor
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DIFFERENTIATORS.map((d) => (
              <div key={d.heading} className="rounded-2xl border p-8" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                <h3 className="font-black text-lg mb-2" style={{ color: "#0a0a0a" }}>{d.heading}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{d.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm" style={{ color: "#71675E" }}>
            Since 2019, Myntmore has booked 12K+ meetings and generated $120M+ in pipeline for clients across
            industries, the same AI-powered system now runs for Chennai's manufacturing, healthcare, and IT/ITES
            companies.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3" style={{ color: "#0a0a0a" }}>
              Common questions from Chennai companies
            </h2>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="rounded-2xl border p-6 group" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <summary className="font-black text-base cursor-pointer list-none flex items-center justify-between gap-4" style={{ color: "#0a0a0a" }}>
                  {item.q}
                  <span className="text-lg flex-shrink-0" style={{ color: "#A14A08" }} aria-hidden="true">+</span>
                </summary>
                <p className="text-sm leading-relaxed mt-4" style={{ color: "#52525B" }}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <LeadCaptureForm
        title="Get Your Free Chennai GTM Audit"
        subtitle="We'll map your ICP across Chennai's manufacturing, healthcare, or IT/ITES landscape and show you exactly where your next quarter of pipeline should come from. No pitch, no pressure."
      />
    </InnerLayout>
  );
}
