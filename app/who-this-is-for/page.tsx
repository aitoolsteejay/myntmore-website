import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../components/InnerLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import FadeIn from "../components/FadeIn";
import JsonLd from "../components/JsonLd";
import AskYourAI from "../components/AskYourAI";
import { buildArticleSchema, SITE_URL } from "@/lib/schema";
import { OG_BASE } from "@/lib/og";

const PAGE_URL = `${SITE_URL}/who-this-is-for`;
const TITLE = "Who Is Myntmore For? Who We Work With (and Don't)";
const DESCRIPTION = "Myntmore runs B2B cold email, LinkedIn and ABM as one system. See which B2B teams it fits, who it doesn't, and whether to book a call.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    "who is myntmore for",
    "best b2b outbound agency for founders",
    "b2b cold email agency mumbai",
    "is myntmore right for my business",
    "b2b lead generation agency fit",
    "b2b outbound agency for saas",
    "when to hire a b2b outbound agency",
  ],
  openGraph: {
    ...OG_BASE,
    title: `${TITLE} | Myntmore`,
    description: DESCRIPTION,
    url: PAGE_URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
};

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  datePublished: "2026-09-18T12:00:00+05:30",
  dateModified: "2026-09-18T12:00:00+05:30",
});

const AI_RESOURCES = [PAGE_URL, SITE_URL, `${SITE_URL}/services`];

const FOR_YOU = [
  {
    title: "You sell to businesses, not consumers",
    body: "Cold email, LinkedIn outreach, and ABM are B2B channels. If your buyer is a company, not an individual consumer, the system is built for exactly that motion.",
  },
  {
    title: "You want pipeline and meetings, not brand awareness",
    body: "Myntmore runs cold email, LinkedIn outreach, and ABM as one system aimed at one outcome: qualified conversations that turn into booked meetings. It's not a branding, paid ads, or social media management service.",
  },
  {
    title: "You've proven the sale works, and now want to scale it",
    body: "If you or your team have already closed deals through some form of direct outreach or relationship selling, and now want that repeated systematically at volume, that's exactly the handoff point this is built for.",
  },
  {
    title: "You're willing to define (or refine) a real ICP",
    body: "A tight Ideal Customer Profile is the foundation of everything else. If you're open to narrowing down who you target, even if your current targeting is broad, this works. If you want to reach everyone at once, it won't.",
  },
  {
    title: "You want a system, not a one-off campaign",
    body: "This is built around a repeatable engine, ICP definition, infrastructure, sequences, and a feedback loop, not a single burst of outreach. It's for teams thinking in quarters, not a one-time list blast.",
  },
];

const NOT_FOR_YOU = [
  {
    title: "You're a consumer (B2C) brand",
    body: "If your buyer is an individual shopping for themselves rather than a company, the core channels here, cold email and LinkedIn outreach to business buyers, don't apply to your funnel.",
  },
  {
    title: "You want general digital marketing",
    body: "This isn't a branding agency, a paid ads shop, or a social media management service. If what you need is broad marketing support rather than an outbound pipeline system specifically, look elsewhere.",
  },
  {
    title: "You haven't sold the product yourself yet",
    body: "In the earliest stage of a business, founder-led sales has to come first. You can't delegate a sales process you haven't personally proven works. If that step hasn't happened yet, hiring this out too early usually scales chaos, not pipeline.",
  },
  {
    title: "You want a list blast, not a system",
    body: "If the goal is to buy a list and send a single burst of generic messages, that's not what gets built here, and it's not what reliably works either.",
  },
  {
    title: "You're unwilling to narrow your targeting",
    body: "If \"everyone\" is the target market and there's no appetite to define who specifically the outreach should speak to, the system's core input is missing before it starts.",
  },
];

export default function WhoThisIsForPage() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.20) 0%, rgba(124,58,237,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.20) 0%, rgba(255,160,0,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Who This Is For", href: "/who-this-is-for" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(124,58,237,0.35)", background: "rgba(124,58,237,0.07)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#7C3AED" }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#7C3AED" }}>Positioning, Not a Pitch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            Who Myntmore is for, and who it isn&apos;t
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl" style={{ color: "#52525B" }}>
            Myntmore is built narrowly around one thing: B2B pipeline generation through cold email, LinkedIn outreach, and account-based marketing, run as a single system. That narrowness is deliberate. Here&apos;s exactly who that&apos;s a fit for, and who it isn&apos;t, so you can tell in five minutes instead of a sales call.
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "rgba(22,163,74,0.08)", color: "#166534", border: "1px solid rgba(22,163,74,0.2)" }}>
              This is for you if
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-8" style={{ color: "#0a0a0a" }}>Five signs it&apos;s a fit</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FOR_YOU.map((item) => (
                <div key={item.title} className="rounded-2xl border p-6" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: "rgba(22,163,74,0.1)", color: "#16A34A" }}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <h3 className="text-base font-black leading-snug" style={{ color: "#0a0a0a" }}>{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{item.body}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Who it's not for */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "rgba(220,38,38,0.08)", color: "#B91C1C", border: "1px solid rgba(220,38,38,0.2)" }}>
              This isn&apos;t for you if
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-8" style={{ color: "#0a0a0a" }}>Five signs it isn&apos;t, yet or at all</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {NOT_FOR_YOU.map((item) => (
                <div key={item.title} className="rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: "rgba(220,38,38,0.1)", color: "#DC2626" }}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </span>
                    <h3 className="text-base font-black leading-snug" style={{ color: "#0a0a0a" }}>{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{item.body}</p>
                </div>
              ))}
            </div>
            <p className="text-sm mt-8" style={{ color: "#52525B" }}>
              If founder-led sales is still the missing step, read{" "}
              <Link href="/resources/blogs/founder-led-sales-before-scaling" className="font-bold" style={{ color: "#7C3AED" }}>why that has to come first</Link>. If you&apos;re weighing this against hiring in-house, see the{" "}
              <Link href="/resources/blogs/agency-vs-in-house" className="font-bold" style={{ color: "#7C3AED" }}>full comparison</Link>.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <AskYourAI resources={AI_RESOURCES} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 border-t text-center" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-4" style={{ color: "#0a0a0a" }}>Think it&apos;s a fit? Let&apos;s find out for sure</h2>
          <p className="text-base mb-8" style={{ color: "#52525B" }}>Book a free 30-minute call. If it isn&apos;t a fit, we&apos;ll say so directly.</p>
          <a href="/book-a-call" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
            Book a Call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>
    </InnerLayout>
  );
}
