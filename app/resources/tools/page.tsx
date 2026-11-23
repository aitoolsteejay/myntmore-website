import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../../components/InnerLayout";
import FadeIn from "../../components/FadeIn";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema, buildCollectionPageSchema, SITE_URL } from "@/lib/schema";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";
import pageCopy from "@/content/page-copy/toolHub.json";

// This page's text is edited in the admin ("Free Growth Tools") and lives in content/page-copy/toolHub.json.
const copy = pageCopy;

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
    images: ogImages("/resources/tools"),
  },
});

const FREE_TOOLS = [
  {
    title: copy.s01.t01,
    desc: copy.s01.t02,
    href: "/tools/linkedin-optimizer",
    icon: "🔗",
    cta: copy.s01.t03,
    accentColor: "#0077b5",
    accentBg: "rgba(0,119,181,0.1)",
    hoverClass: "card-hover-linkedin",
  },
  {
    title: copy.s01.t04,
    desc: copy.s01.t05,
    href: "/tools/dm-angle-generator",
    icon: "⚡",
    cta: copy.s01.t06,
    accentColor: "#a855f7",
    accentBg: "rgba(168,85,247,0.1)",
    hoverClass: "card-hover-purple",
  },
  {
    title: copy.s01.t07,
    desc: copy.s01.t08,
    href: "/tools/roi-calculator",
    icon: "📊",
    cta: copy.s01.t09,
    accentColor: "#16a34a",
    accentBg: "rgba(34,197,94,0.1)",
    hoverClass: "card-hover-green",
  },
  {
    title: copy.s01.t10,
    desc: copy.s01.t11,
    href: "/tools/cold-email-roi-calculator",
    icon: "📧",
    cta: copy.s01.t12,
    accentColor: "#16a34a",
    accentBg: "rgba(34,197,94,0.1)",
    hoverClass: "card-hover-green",
  },
  {
    title: copy.s01.t13,
    desc: copy.s01.t14,
    href: "/tools/cold-email-inbox-calculator",
    icon: "📬",
    cta: copy.s01.t15,
    accentColor: "#16a34a",
    accentBg: "rgba(34,197,94,0.1)",
    hoverClass: "card-hover-green",
  },
  {
    title: copy.s01.t16,
    desc: copy.s01.t17,
    href: "/tools/posting-rhythm-builder",
    icon: "📅",
    cta: copy.s01.t18,
    accentColor: "#D97706",
    accentBg: "rgba(245,183,49,0.12)",
    hoverClass: "card-hover-warm",
  },
  {
    title: copy.s01.t19,
    desc: copy.s01.t20,
    href: "/tools/linkedin-hook-grader",
    icon: "🎣",
    cta: copy.s01.t21,
    accentColor: "#EA580C",
    accentBg: "rgba(234,88,12,0.1)",
    hoverClass: "card-hover-warm",
  },
  {
    title: copy.s01.t22,
    desc: copy.s01.t23,
    href: "/tools/lead-magnet-ideas",
    icon: "💡",
    cta: copy.s01.t24,
    accentColor: "#3b82f6",
    accentBg: "rgba(59,130,246,0.1)",
    hoverClass: "card-hover-blue",
  },
  {
    title: copy.s01.t25,
    desc: copy.s01.t26,
    href: "/tools/founder-presence-analyzer",
    icon: "📈",
    cta: copy.s01.t27,
    accentColor: "#14B8A6",
    accentBg: "rgba(20,184,166,0.1)",
    hoverClass: "card-hover-teal",
  },
  {
    title: copy.s01.t28,
    desc: copy.s01.t29,
    href: "/tools/icp-builder",
    icon: "🎯",
    cta: copy.s01.t30,
    accentColor: "#F97316",
    accentBg: "rgba(249,115,22,0.1)",
    hoverClass: "card-hover-orange",
  },
  {
    title: copy.s01.t31,
    desc: copy.s01.t32,
    href: "/tools/case-study-generator",
    icon: "📝",
    cta: copy.s01.t33,
    accentColor: "#6366f1",
    accentBg: "rgba(99,102,241,0.1)",
    hoverClass: "card-hover-indigo",
  },
  {
    title: copy.s01.t34,
    desc: copy.s01.t35,
    href: "/tools/battle-card-generator",
    icon: "🛡️",
    cta: copy.s01.t36,
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
            <Link href="/resources" className="link-subtle -my-3.5 inline-flex items-center py-3.5 text-xs font-semibold">{copy.s01.t37}</Link>
            <span style={{ color: "#E8E2D9" }}>/</span>
            <span className="text-xs font-semibold" style={{ color: "#3D3D3D" }}>{copy.s01.t38}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>{copy.s01.t39}<br />{copy.s01.t40}</h1>
          <p className="text-lg sm:text-xl max-w-2xl mb-8" style={{ color: "#52525B" }}>{copy.s01.t41}</p>
          <div className="flex flex-wrap gap-3 mb-10">
            {[copy.s01.t42, copy.s01.t43, copy.s01.t44].map((chip) => (
              <span key={chip} className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#3D3D3D" }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#D97706" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {chip}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#tools-grid" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">{copy.s01.t45}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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
              <h2 className="text-xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s02.t01}</h2>
              <p className="text-sm mb-6" style={{ color: "#52525B" }}>{copy.s02.t02}</p>
              <a href="/book-a-call" className="btn-dark px-8 py-4 text-sm font-bold inline-flex items-center gap-2">{copy.s02.t03}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </InnerLayout>
  );
}
