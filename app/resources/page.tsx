import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Compass, Sparkles, Library, Instagram } from "lucide-react";
import InnerLayout from "../components/InnerLayout";
import FadeIn from "../components/FadeIn";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema, buildCollectionPageSchema, SITE_URL } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import { OG_BASE } from "@/lib/og";

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Resources", url: `${SITE_URL}/resources` },
]);

const RESOURCES_PAGE_SCHEMA = [
  BREADCRUMB_SCHEMA,
  buildCollectionPageSchema({
    name: "B2B Growth Resources: Blogs & Free Tools",
    description: "Free playbooks, tools, and real client results for B2B founders who want predictable pipeline.",
    url: `${SITE_URL}/resources`,
  }),
];

export const metadata: Metadata = {
  title: "B2B Growth Resources: Blogs & Free Tools",
  description: "Free B2B lead generation resources: blogs on cold email, ICP mapping, and outreach, plus free AI tools. Explore guides and tools built for you.",
  keywords: [
    "b2b lead generation resources",
    "free b2b sales tools",
    "cold email playbooks",
    "linkedin outreach guides",
    "icp mapping resources",
    "ai lead generation tools",
    "b2b growth resources",
    "sales pipeline tools",
    "outbound sales playbooks",
    "linkedin profile optimizer",
    "dm angle generator",
    "b2b marketing case studies",
    "free ai sales tools",
    "gtm resources for founders",
  ],
  alternates: { canonical: "https://www.myntmore.com/resources" },
  openGraph: {
    ...OG_BASE,
    title: "B2B Growth Resources: Blogs & Free Tools | Myntmore",
    description: "Free playbooks, tools, and real client results for B2B founders who want predictable pipeline.",
    url: "https://www.myntmore.com/resources",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
};

// A real directory, not a fourth copy of content: each tile links out to
// its own hub page rather than duplicating a hand-picked preview of posts
// that would need to be kept in sync by hand and inevitably goes stale
// (the old BLOG_PREVIEW/GUIDES_PREVIEW/TOOLS_PREVIEW arrays here were
// already missing newer posts). Counts are hand-maintained alongside the
// arrays they describe -- update here when a category's count changes.
const DIRECTORY = [
  {
    href: "/resources/blogs",
    icon: BookOpen,
    accent: "#3B82F6",
    count: "26 posts",
    title: "Blog",
    desc: "In-depth playbooks on cold email, ICP mapping, and outreach, no fluff.",
  },
  {
    href: "/resources/guides",
    icon: Compass,
    accent: "#F97316",
    count: "15 guides",
    title: "Guides",
    desc: "Step-by-step, copy-paste-ready setup guides for AI and outbound.",
  },
  {
    href: "/resources/tools",
    icon: Sparkles,
    accent: "#F5B731",
    count: "9 tools",
    title: "Free Tools",
    desc: "AI-powered tools for outreach. No sign-up, no credit card.",
  },
  {
    href: "/resources/glossary",
    icon: Library,
    accent: "#7C3AED",
    count: "50 terms",
    title: "Glossary",
    desc: "Plain-English definitions for every term and framework we use.",
  },
  {
    href: "/resources/feed",
    icon: Instagram,
    accent: "#14B8A6",
    count: "@myntmore",
    title: "The Feed",
    desc: "Short, practical reels on outbound and LinkedIn, under 60 seconds.",
  },
];

export default function Resources() {
  return (
    <InnerLayout>
      <JsonLd data={RESOURCES_PAGE_SCHEMA} />
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        {/* Decorative blobs */}
        <div aria-hidden style={{ position: "absolute", top: "20%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.14) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "75%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none" }} />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(245,183,49,0.4)", background: "rgba(245,183,49,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#F5B731" }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#A14A08" }}>Free Resources</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-6 hero-fade-d1" style={{ color: "#0a0a0a" }}>
            Learn the system.<br />
            <span style={{ color: "#A14A08" }}>Then let us run it</span>
          </h1>

          <p className="text-lg sm:text-xl max-w-2xl mb-10 hero-fade-d2" style={{ color: "#52525B" }}>
            Free playbooks, AI tools, and real case studies for B2B founders who want predictable pipeline, built by the team that has booked 12K+ meetings.
          </p>

          <div className="flex flex-wrap gap-4 hero-fade-d3">
            <Link href="/resources/blogs" className="btn-dark px-7 py-3.5 text-sm font-bold inline-flex items-center gap-2">
              Read the Blog
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="/resources/tools" className="px-7 py-3.5 text-sm font-bold inline-flex items-center gap-2 rounded-full border transition-all duration-200 hover:border-yellow-400 hover:text-black" style={{ borderColor: "#E8E2D9", color: "#3D3D3D" }}>
              Try Free Tools
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-10 border-t hero-fade-d4" style={{ borderColor: "#E8E2D9" }}>
            {[
              { n: "12K+", label: "B2B meetings booked" },
              { n: "$120M+", label: "Pipeline generated" },
              { n: "76+", label: "Posts, guides & tools" },
            ].map((s) => (
              <div key={s.n}>
                <div className="text-3xl sm:text-4xl font-black mb-1" style={{ color: "#0a0a0a" }}>{s.n}</div>
                <div className="text-xs sm:text-sm" style={{ color: "#71675E" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Directory ── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#0a0a0a" }}>Where to start</h2>
              <p className="text-sm mt-2" style={{ color: "#52525B" }}>Five kinds of resources, all built from the same systems we run for real clients.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DIRECTORY.map((d) => {
                const Icon = d.icon;
                return (
                  <Link
                    key={d.href}
                    href={d.href}
                    className="group relative block rounded-2xl border p-7 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}
                  >
                    <div aria-hidden style={{ position: "absolute", top: "-40px", right: "-40px", width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${d.accent}18 0%, transparent 70%)`, pointerEvents: "none" }} />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110" style={{ backgroundColor: `${d.accent}15`, border: `1.5px solid ${d.accent}38` }}>
                        <Icon className="w-6 h-6" color={d.accent} strokeWidth={2} />
                      </div>
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <h3 className="text-lg font-black" style={{ color: "#0a0a0a" }}>{d.title}</h3>
                        <span className="text-xs font-bold whitespace-nowrap" style={{ color: textTone(d.accent) }}>{d.count}</span>
                      </div>
                      <p className="text-sm leading-relaxed mb-5" style={{ color: "#52525B" }}>{d.desc}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-200 group-hover:gap-2.5" style={{ color: textTone(d.accent) }}>
                        Browse
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="relative rounded-3xl overflow-hidden p-10 sm:p-16 text-center" style={{ background: "#FEF9EC", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <div aria-hidden style={{ position: "absolute", top: "50%", left: "20%", width: 300, height: 300, marginTop: -150, marginLeft: -150, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.15) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
              <div aria-hidden style={{ position: "absolute", top: "50%", left: "80%", width: 300, height: 300, marginTop: -150, marginLeft: -150, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.10) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
              <div className="relative z-10">
                <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: "rgba(245,183,49,0.12)", color: "#A14A08", border: "1px solid rgba(245,183,49,0.25)" }}>Your next step</span>
                <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: "#0A0A0A" }}>Let us build the pipeline<br />engine for you</h2>
                <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#52525B" }}>Book a free 30-minute GTM audit. We&apos;ll map out exactly how to build a predictable outbound system for your business.</p>
                <a href="/book-a-call" className="btn-dark px-10 py-4 text-base font-bold inline-flex items-center gap-2">
                  Book a Free GTM Audit
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </InnerLayout>
  );
}
