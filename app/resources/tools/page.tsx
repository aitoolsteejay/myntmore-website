import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../../components/InnerLayout";
import FadeIn from "../../components/FadeIn";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema, buildCollectionPageSchema, SITE_URL } from "@/lib/schema";
import { OG_BASE } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Resources", url: `${SITE_URL}/resources` },
  { name: "Free Tools", url: `${SITE_URL}/resources/tools` },
]);

const TOOLS_PAGE_SCHEMA = [
  BREADCRUMB_SCHEMA,
  buildCollectionPageSchema({
    name: "Free B2B Lead Generation Tools",
    description: "Free AI-powered tools for B2B founders: optimize your LinkedIn profile, generate outreach angles, and calculate outbound ROI.",
    url: `${SITE_URL}/resources/tools`,
  }),
];

export const metadata: Metadata = withPageSeo("/resources/tools", {
  title: "Free B2B Lead Generation Tools",
  description: "Free AI-powered tools for B2B founders: optimise your LinkedIn profile, generate outreach angles, and build a stronger pipeline. No sign-up required.",
  keywords: [
    "free linkedin profile optimizer",
    "dm angle generator",
    "cold email roi calculator",
    "linkedin posting rhythm planner",
    "lead magnet idea generator",
    "icp builder tool",
    "competitor battle card generator",
    "case study generator ai",
    "founder linkedin presence analyzer",
    "free b2b sales tools",
    "ai tools for outbound sales",
    "b2b lead generation tools",
    "linkedin growth tools",
    "sales prospecting tools",
  ],
  alternates: { canonical: "https://www.myntmore.com/resources/tools" },
  openGraph: {
    ...OG_BASE,
    title: "Free B2B Lead Generation Tools | Myntmore",
    description: "AI-powered tools for B2B outreach, free to use, no sign-up required.",
    url: "https://www.myntmore.com/resources/tools",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
});

const FREE_TOOLS = [
  {
    title: "LinkedIn Profile Optimizer",
    desc: "Audit and rewrite your LinkedIn profile to convert visitors into high-intent inbound replies. Paste your current profile and get a rewrite optimised for your ICP.",
    href: "/tools/linkedin-optimizer",
    icon: "🔗",
    cta: "Optimize my profile",
    accentColor: "#0077b5",
    accentBg: "rgba(0,119,181,0.1)",
    hoverClass: "card-hover-linkedin",
  },
  {
    title: "DM Angle Generator",
    desc: "Generate 5 psychology-aligned outreach opening angles tailored to your industry, ICP role, and offer. Stop sending the same opener to every lead.",
    href: "/tools/dm-angle-generator",
    icon: "⚡",
    cta: "Generate angles",
    accentColor: "#a855f7",
    accentBg: "rgba(168,85,247,0.1)",
    hoverClass: "card-hover-purple",
  },
  {
    title: "ROI Calculator",
    desc: "Estimate the pipeline and revenue you could generate from cold email and LinkedIn outreach. Plug in your numbers and see the projected return.",
    href: "/tools/roi-calculator",
    icon: "📊",
    cta: "Calculate my ROI",
    accentColor: "#16a34a",
    accentBg: "rgba(34,197,94,0.1)",
    hoverClass: "card-hover-green",
  },
  {
    title: "Cold Email ROI Calculator",
    desc: "Enter your sending volume and funnel rates, check each against 2026 benchmarks, and see the meetings, pipeline and ROI your cold email could produce.",
    href: "/tools/cold-email-roi-calculator",
    icon: "📧",
    cta: "Calculate cold email ROI",
    accentColor: "#16a34a",
    accentBg: "rgba(34,197,94,0.1)",
    hoverClass: "card-hover-green",
  },
  {
    title: "Posting Rhythm Builder",
    desc: "Plan a consistent LinkedIn posting rhythm that keeps your personal brand visible to your ICP, without guessing what to post or when.",
    href: "/tools/posting-rhythm-builder",
    icon: "📅",
    cta: "Build my rhythm",
    accentColor: "#D97706",
    accentBg: "rgba(245,183,49,0.12)",
    hoverClass: "card-hover-warm",
  },
  {
    title: "LinkedIn Hook Grader",
    desc: "Paste the first two lines of your LinkedIn post and get a transparent score out of 100, plus three rewritten hooks graded by the same rules.",
    href: "/tools/linkedin-hook-grader",
    icon: "🎣",
    cta: "Grade my hook",
    accentColor: "#EA580C",
    accentBg: "rgba(234,88,12,0.1)",
    hoverClass: "card-hover-warm",
  },
  {
    title: "Lead Magnet Idea Generator",
    desc: "Tell us what your business does, who you sell to, and your industry, and get concrete lead magnet ideas you can actually use in outreach.",
    href: "/tools/lead-magnet-ideas",
    icon: "💡",
    cta: "Generate ideas",
    accentColor: "#3b82f6",
    accentBg: "rgba(59,130,246,0.1)",
    hoverClass: "card-hover-blue",
  },
  {
    title: "Founder Presence Analyzer",
    desc: "Benchmark your LinkedIn posting frequency and engagement against up to 5 competitors and get AI-powered positioning and headline recommendations.",
    href: "/tools/founder-presence-analyzer",
    icon: "📈",
    cta: "Analyze my presence",
    accentColor: "#14B8A6",
    accentBg: "rgba(20,184,166,0.1)",
    hoverClass: "card-hover-teal",
  },
  {
    title: "ICP Builder & Value Prop Generator",
    desc: "Build deep B2B and D2C customer profiles from your business description, then get a structured value proposition for each one, including your channel partners.",
    href: "/tools/icp-builder",
    icon: "🎯",
    cta: "Build my ICP",
    accentColor: "#F97316",
    accentBg: "rgba(249,115,22,0.1)",
    hoverClass: "card-hover-orange",
  },
  {
    title: "Case Study & Proposal Generator",
    desc: "Turn a finished project into a case study, or a prospect conversation into a proposal draft. No invented numbers, no generic filler.",
    href: "/tools/case-study-generator",
    icon: "📝",
    cta: "Draft mine",
    accentColor: "#6366f1",
    accentBg: "rgba(99,102,241,0.1)",
    hoverClass: "card-hover-indigo",
  },
  {
    title: "Competitor Battle Card Generator",
    desc: "Researches a competitor live and builds a sales battle card: what they do, their pricing if public, their real strengths and gaps, and how to position against them.",
    href: "/tools/battle-card-generator",
    icon: "🛡️",
    cta: "Build my battle card",
    accentColor: "#ef4444",
    accentBg: "rgba(239,68,68,0.1)",
    hoverClass: "card-hover-red",
  },
];

export default function ToolsPage() {
  return (
    <InnerLayout>
      <JsonLd data={TOOLS_PAGE_SCHEMA} />
      <section className="relative pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/resources" className="link-subtle -my-3.5 inline-flex items-center py-3.5 text-xs font-semibold">Resources</Link>
            <span style={{ color: "#E8E2D9" }}>/</span>
            <span className="text-xs font-semibold" style={{ color: "#3D3D3D" }}>Tools</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            9 tools. Zero forms<br />until you want the output.
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mb-8" style={{ color: "#52525B" }}>
            AI tools built to help B2B founders run smarter outreach. Try any of them free.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {["No sign-up to try", "No credit card", "Built by us, used by us"].map((chip) => (
              <span key={chip} className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#3D3D3D" }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#D97706" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {chip}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#tools-grid" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
              Explore Tools
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      <section id="tools-grid" className="py-16 px-4 border-t scroll-mt-24" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {FREE_TOOLS.map((t) => (
                <div key={t.title} className={`rounded-2xl border p-8 ${t.hoverClass}`} style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: t.accentBg, border: `1px solid ${t.accentColor}33` }}>{t.icon}</div>
                  <h2 className="text-xl font-black mb-3" style={{ color: "#0a0a0a" }}>{t.title}</h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#52525B" }}>{t.desc}</p>
                  <a href={t.href} target="_blank" rel="noopener noreferrer" className="btn-dark px-6 py-3 text-sm font-bold inline-flex items-center gap-2">
                    {t.cta}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-16 rounded-2xl border p-8 text-center" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.3)" }}>
              <h2 className="text-xl font-black mb-3" style={{ color: "#0a0a0a" }}>We build custom outreach tools too</h2>
              <p className="text-sm mb-6" style={{ color: "#52525B" }}>We build bespoke AI outbound tools for our clients: scrapers, personalisation engines, intent trackers. Book a call to find out what we can build for you.</p>
              <a href="/book-a-call" className="btn-dark px-8 py-4 text-sm font-bold inline-flex items-center gap-2">
                Book a Free GTM Audit
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </InnerLayout>
  );
}
