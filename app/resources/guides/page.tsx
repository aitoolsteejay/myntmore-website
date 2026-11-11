import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import FadeIn from "../../components/FadeIn";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema, buildCollectionPageSchema, SITE_URL } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import { OG_BASE } from "@/lib/og";

const GUIDES_PAGE_SCHEMA = [
  buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Resources", url: `${SITE_URL}/resources` },
    { name: "Guides", url: `${SITE_URL}/resources/guides` },
  ]),
  buildCollectionPageSchema({
    name: "Free B2B Growth Guides",
    description: "Free step-by-step guides on AI agents, Claude skills, and outbound systems for B2B founders.",
    url: `${SITE_URL}/resources/guides`,
  }),
];

export const metadata: Metadata = {
  title: "Free B2B Growth Guides",
  description: "Free step-by-step guides on AI agents, Claude skills, and Vibe Prospecting for B2B founders who want to book more meetings without hiring a bigger team.",
  keywords: [
    "b2b growth guides",
    "ai agents for lead generation",
    "claude skills for founders",
    "vibe prospecting guide",
    "ai prospecting tools",
    "b2b automation guides",
    "linkedin outreach automation",
    "ai lead generation blueprint",
    "claude ai for sales",
    "b2b founder resources",
    "outbound automation guide",
    "n8n lead generation workflow",
    "claude connectors for sales",
  ],
  alternates: { canonical: "https://www.myntmore.com/resources/guides" },
  openGraph: {
    ...OG_BASE,
    title: "Free B2B Growth Guides | Myntmore",
    description: "Step-by-step AI and outbound guides, built by the team behind 12K+ B2B meetings booked.",
    url: "https://www.myntmore.com/resources/guides",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
};

const GUIDES = [
  {
    href: "/resources/guides/outbound-meme-prompt-kit",
    tag: "LinkedIn Content",
    title: "The Outbound Meme Prompt Kit",
    excerpt: "Four copy-paste AI image prompts that turn the pain of cold outreach into memes people share: the graveyard, reject and approve, astronaut and conspiracy board.",
    readTime: "4 min read",
    accent: "#EA580C",
  },
  {
    href: "/resources/guides/linkedin-content-to-calls-starter-kit",
    tag: "LinkedIn Lead Generation",
    title: "The LinkedIn Content-to-Calls Starter Kit",
    excerpt: "The 3-part framework behind LinkedIn calls, plus 5 post templates, 3 CTAs, 3 follow-up messages and a 10-minute daily routine you can start today.",
    readTime: "5 min read",
    accent: "#EA580C",
  },
  {
    href: "/resources/guides/dos-and-donts-of-outreach",
    tag: "Outreach Craft",
    title: "Pattern Disruption: The Do's and Don'ts of Cold Outreach",
    excerpt: "Why most outreach gets deleted without being read, how pattern disruption actually works, what to send on LinkedIn vs. cold email, and what data enrichment even is.",
    readTime: "9 min read",
    accent: "#7C3AED",
  },
  {
    href: "/resources/guides/how-to-choose-an-outbound-agency",
    tag: "Buyer's Guide",
    title: "How to Choose a B2B Outbound Agency",
    excerpt: "A neutral evaluation checklist for vetting outbound partners: what to ask about track record, infrastructure, contracts, and how they actually run campaigns.",
    readTime: "6 min read",
    accent: "#0EA5E9",
  },
  {
    href: "/resources/guides/how-to-choose-b2b-lead-generation-agency-india",
    tag: "Buyer's Guide",
    title: "How to Choose a B2B Lead Generation Agency in India",
    excerpt: "Eight criteria for the Indian market: the four kinds of lead gen company, data sources, DPDP and TRAI rules, pricing models with GST, and a red-flag scorecard.",
    readTime: "8 min read",
    accent: "#F5B731",
  },
  {
    href: "/resources/blogs/agency-vs-in-house",
    tag: "Comparison",
    title: "Agency vs. In-House SDR",
    excerpt: "The real tradeoff on cost, ramp-up time, tooling, and risk, side by side, so you can figure out which fits your stage before you commit either way.",
    readTime: "6 min read",
    accent: "#6366f1",
  },
  {
    href: "/resources/guides/golden-icp-framework",
    tag: "ICP & Targeting",
    title: "The Golden ICP Framework",
    excerpt: "Build prospect lists around pressure, buying triggers, and real-time context so your cold outreach reaches the right buyers at the right moment.",
    readTime: "7 min read",
    accent: "#D97706",
  },
  {
    href: "/resources/guides/80-us-meetings-ai-agents",
    tag: "AI Agents",
    title: "80+ US Meetings Booked in 1 Month with AI Agents",
    excerpt: "The exact AI-agent blueprint behind 800 LinkedIn connections, 80+ US B2B meetings, and 4 new clients a month, fully automated with n8n, Apollo/Clay, and AI enrichment.",
    readTime: "8 min read",
    accent: "#F97316",
  },
  {
    href: "/resources/guides/how-to-set-up-vibe-prospecting",
    tag: "Prospecting",
    title: "How to Set Up Vibe Prospecting on Claude for B2B Leads",
    excerpt: "A step-by-step setup guide for the Vibe Prospecting Claude connector, plus 10 ready-to-copy prompts for pulling verified B2B leads by funding, headcount, tech stack, and hiring signals.",
    readTime: "6 min read",
    accent: "#8b5cf6",
  },
  {
    href: "/resources/guides/claude-skills-guide",
    tag: "AI & Claude",
    title: "The 6 Claude Skills Guide",
    excerpt: "Six ready-to-use Claude skills for founders and marketers: content distribution, LinkedIn growth, lead generation, competitor research, proposals, and personal brand.",
    readTime: "7 min read",
    accent: "#F5B731",
  },
  {
    href: "/resources/guides/leads-on-autopilot-guide",
    tag: "LinkedIn Lead Generation",
    title: "Leads on Autopilot: A Step-by-Step Framework",
    excerpt: "A complete system to generate high-quality leads on LinkedIn without cold pitching: audience clarity, content authority, outreach, nurturing, and follow-ups.",
    readTime: "9 min read",
    accent: "#0077b5",
  },
  {
    href: "/resources/guides/58-meetings-600-linkedin-connections",
    tag: "LinkedIn Lead Generation",
    title: "58 Meetings Booked from 600 LinkedIn Connections in 1 Month",
    excerpt: "The 5-step LinkedIn framework behind 58 meetings from 600 connections: a sharper ICP, positioning that opens doors, a warm-up layer, a 5-message sequence and a follow-up stack.",
    readTime: "3 min read",
    accent: "#0077b5",
  },
  {
    href: "/resources/guides/cold-email-tech-stack",
    tag: "Cold Email",
    title: "The Cold Email Stack Behind an Extra $7,000 in Revenue",
    excerpt: "The exact 7-tool stack (scraping, enrichment, verification, sending) and the 3-email sequence with copy-ready variants that we use to scale cold outreach.",
    readTime: "5 min read",
    accent: "#EA580C",
  },
  {
    href: "/resources/guides/claude-sales-call-prompts",
    tag: "Sales & Claude",
    title: "5 Claude Prompts for Sales Calls",
    excerpt: "Five copy-paste prompts for before and after every call: a meeting prep brief, discovery questions, objection prep, call openers and a follow-up email, each under 3 minutes.",
    readTime: "4 min read",
    accent: "#0891B2",
  },
  {
    href: "/resources/guides/job-applications-sales-funnel",
    tag: "Careers & Jobs",
    title: "Job Applications Are a Sales Funnel",
    excerpt: "A practical system to reach hiring managers, stand out with proof, follow up with Loom and voice notes, and turn interviews into offers.",
    readTime: "8 min read",
    accent: "#7C3AED",
  },
  {
    href: "/resources/guides/careers-and-job-guide",
    tag: "Careers & Jobs",
    title: "Career Jumpstart Toolkit",
    excerpt: "A practical playbook for landing internships, jobs, and your first break: LinkedIn fixes, an outreach playbook, and a curated job-search tool directory.",
    readTime: "10 min read",
    accent: "#16A34A",
  },
  {
    href: "/resources/guides/education-guide",
    tag: "AI for Everyday Life",
    title: "AI Quick-Start Guide",
    excerpt: "Real tools, copy-paste prompts, and habits worth building, for parents, educators, and content creators navigating AI.",
    readTime: "8 min read",
    accent: "#3b82f6",
  },
  {
    href: "/resources/guides/ai-tech-stack-jewellery",
    tag: "AI Tool Stacks",
    title: "AI Tech Stack for Jewellery Brands",
    excerpt: "106 AI tools across 14 categories, curated for jewellery brand owners and retailers, from product photography and reels to paid ads.",
    readTime: "12 min read",
    accent: "#D97706",
  },
];

export default function GuidesPage() {
  return (
    <InnerLayout>
      <JsonLd data={GUIDES_PAGE_SCHEMA} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-180px", right: "-180px", width: "620px", height: "620px", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.24) 0%, rgba(217,119,6,0.08) 45%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Guides", href: "/resources/guides" }]} />
          <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6" style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#9A3412", border: "1px solid rgba(249,115,22,0.3)" }}>{GUIDES.length} guides</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            Copy the setup.<br />Skip the trial and error.
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mb-10" style={{ color: "#52525B" }}>
            Step-by-step AI and outbound guides, built from the exact systems we run for our own clients, not theory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#guides-grid" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
              Browse the Guides
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <Link href="/resources/blogs" className="btn-ghost px-8 py-4 text-base font-bold inline-flex items-center gap-2">
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      <section id="guides-grid" className="py-16 px-4 border-t scroll-mt-24" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GUIDES.map((g) => (
                <Link key={g.href} href={g.href} className="group block rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <div className="h-1" style={{ background: `linear-gradient(90deg,${g.accent},${g.accent}66)` }} />
                  <div className="p-6">
                    <span className="fredoka-pill inline-flex text-xs font-bold px-2 py-0.5 rounded-full mb-3" style={{ backgroundColor: `${g.accent}12`, color: textTone(g.accent) }}>{g.tag}</span>
                    <h2 className="text-base font-black mb-2 leading-snug" style={{ color: "#0a0a0a" }}>{g.title}</h2>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: "#52525B" }}>{g.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: "#71675E" }}>{g.readTime}</span>
                      <span className="text-xs font-bold" style={{ color: textTone(g.accent) }}>Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto rounded-2xl p-10 text-center border" style={{ background: "#FEF9EC", borderColor: "rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
          <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0A0A0A" }}>Or skip the setup entirely</h2>
          <p className="text-sm mb-6" style={{ color: "#52525B" }}>We&apos;ll run this system for you. Book a free 30-minute audit and we&apos;ll map out exactly how.</p>
          <a href="/book-a-call" className="btn-dark px-8 py-4 text-sm font-bold inline-flex items-center gap-2">
            Book a Free GTM Audit
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>
    </InnerLayout>
  );
}
