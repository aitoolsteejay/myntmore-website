import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import { buildArticleSchema, SITE_URL } from "@/lib/schema";
import Link from "next/link";
import { Check, ArrowRight, Camera, CalendarCheck, Mail } from "lucide-react";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CopyBlock from "@/app/components/CopyBlock";
import FadeIn from "@/app/components/FadeIn";
import Underline from "./Underline";
import { textTone } from "@/lib/colors";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";
import pageCopy from "@/content/page-copy/guideHowToSetUpVibeProspecting.json";

// This page's text is edited in the admin ("How to Set Up Vibe Prospecting on Claude for B2B Leads") and lives in content/page-copy/guideHowToSetUpVibeProspecting.json.
const copy = pageCopy;

export const metadata: Metadata = withPageSeo("/resources/guides/how-to-set-up-vibe-prospecting", {
  title: "Vibe Prospecting: What It Is and How to Use It in Claude",
  description: "Vibe Prospecting is a Claude connector that finds verified B2B leads right in your chat. What it is, the 7-step setup, and 10 prompts you can copy.",
  keywords: [
    "vibe prospecting", "what is vibe prospecting", "vibe prospecting claude", "vibe prospecting setup guide",
    "claude connectors for lead generation",
    "ai lead sourcing tool",
    "b2b prospecting by funding stage",
    "find saas leads by tech stack",
    "claude ai b2b lead generation",
    "verified email finder ai",
    "ai prospecting prompts",
    "startup funding lead lists",
    "hiring signal prospecting",
    "claude ai connector guide",
    "b2b lead list builder ai",
  ],
  alternates: { canonical: "https://www.myntmore.com/resources/guides/how-to-set-up-vibe-prospecting" },
  openGraph: {
    ...OG_BASE,
    title: "How to Set Up Vibe Prospecting on Claude for B2B Leads",
    description: "Connect Vibe Prospecting to Claude in 7 steps, then run 10 ready-to-copy prompts for verified B2B leads.",
    url: "https://www.myntmore.com/resources/guides/how-to-set-up-vibe-prospecting",
    images: ogImages("/resources/guides/how-to-set-up-vibe-prospecting"),
  },
});

interface SetupStep {
  title: string;
  detail: React.ReactNode;
}

const SETUP_STEPS: SetupStep[] = [
  { title: copy.s01.t01, detail: <>{copy.s01.t02}<a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="link-subtle font-semibold" style={{ color: "#0a0a0a" }}>{copy.s01.t03}</a>.</> },
  { title: copy.s01.t04, detail: copy.s01.t05 },
  { title: copy.s01.t06, detail: copy.s01.t07 },
  { title: copy.s01.t08, detail: null },
  {
    title: copy.s01.t09,
    detail: (
      <>{copy.s01.t10}<a href="https://www.vibeprospecting.ai/" target="_blank" rel="noopener noreferrer" className="link-subtle font-semibold" style={{ color: "#0a0a0a" }}>{copy.s01.t11}</a>{copy.s01.t12}</>
    ),
  },
  { title: copy.s01.t13, detail: copy.s01.t14 },
  { title: copy.s01.t15, detail: copy.s01.t16 },
];

interface PromptEntry {
  title: string;
  prompt: string;
}

const ADVANCED_PROMPTS: PromptEntry[] = [
  {
    title: copy.s01.t17,
    prompt: copy.s01.t18,
  },
  {
    title: copy.s01.t19,
    prompt: copy.s01.t20,
  },
  {
    title: copy.s01.t21,
    prompt: copy.s01.t22,
  },
  {
    title: copy.s01.t23,
    prompt: copy.s01.t24,
  },
  {
    title: copy.s01.t25,
    prompt: copy.s01.t26,
  },
];

const ICP_PROMPTS: PromptEntry[] = [
  {
    title: copy.s01.t27,
    prompt: copy.s01.t28,
  },
  {
    title: copy.s01.t29,
    prompt: copy.s01.t30,
  },
  {
    title: copy.s01.t31,
    prompt: copy.s01.t32,
  },
  {
    title: copy.s01.t33,
    prompt: copy.s01.t34,
  },
];

const MASTER_TEMPLATE = copy.s01.t35;

const FIRST_PROMPT = "Find 30 US-based SaaS founders. Include: full name, LinkedIn, verified email, company name, website, employee count, industry. Return in a structured table. Export as CSV.";

const ACCENT = "#8b5cf6";
const ACCENT_BG = "rgba(139,92,246,0.08)";

function PromptCard({ title, prompt }: { title: string; prompt: string }) {
  return (
    <div className="rounded-xl border p-4 sm:p-5" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
      <h4 className="text-sm font-black mb-3" style={{ color: textTone(ACCENT) }}>{title}</h4>
      <CopyBlock text={prompt} accent={ACCENT} label="Copy this prompt" />
    </div>
  );
}

// Article schema. The first publication date is not on record, so only the last update (from lib/sitemap-dates.json) is given.
const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "Vibe Prospecting: What It Is and How to Use It in Claude",
  description: "Vibe Prospecting is a Claude connector that finds verified B2B leads right in your chat. What it is, the 7-step setup, and 10 prompts you can copy.",
  url: `${SITE_URL}/resources/guides/how-to-set-up-vibe-prospecting`,
  dateModified: "2026-11-14T12:09:59+05:30",
});

export default function VibeProspectingGuide() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />
      {/* Hero */}
      <section className="pt-32 pb-14 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: copy.s01.t36, href: "/resources" }, { label: copy.s01.t37, href: "/resources/guides" }, { label: copy.s01.t38, href: "/resources/guides/how-to-set-up-vibe-prospecting" }]} />
          <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 hero-fade" style={{ backgroundColor: "rgba(139,92,246,0.08)", color: textTone(ACCENT), border: "1px solid rgba(139,92,246,0.3)" }}>{copy.s01.t39}</span>
          <h1 className="text-4xl sm:text-5xl font-black mb-5 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>{copy.s01.t40}{" "}
            <span className="relative inline-block">{copy.s01.t41}<Underline color={ACCENT} />
            </span>{" "}{copy.s01.t42}</h1>
          <p className="text-base sm:text-lg font-semibold mb-5 hero-fade-d1" style={{ color: textTone(ACCENT) }}>{copy.s01.t43}</p>
          <p className="text-base leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>
            <a href="https://www.linkedin.com/in/tejasjhaveri/" target="_blank" rel="noopener noreferrer" className="link-subtle font-semibold" style={{ color: "#0a0a0a" }}>{copy.s01.t44}</a>{" "}{copy.s01.t45}{" "}
            <a href="https://www.myntmore.com/" className="link-subtle font-semibold" style={{ color: "#0a0a0a" }}>{copy.s01.t46}</a>{copy.s01.t47}</p>
        </div>
      </section>

      {/* What it is: answers the head query "vibe prospecting" before the setup steps */}
      <section className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s02.t01}</h2>
            <p className="text-base leading-relaxed mb-3" style={{ color: "#52525B" }}>{copy.s02.t02}</p>
            <p className="text-base leading-relaxed" style={{ color: "#52525B" }}>{copy.s02.t03}</p>
          </FadeIn>
        </div>
      </section>

      {/* Step-by-step setup */}
      <section className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: "#0a0a0a" }}>{copy.s03.t01}</h2>
            <p className="text-sm sm:text-base mb-6" style={{ color: "#71675E" }}>{copy.s03.t02}</p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="rounded-2xl border p-5 sm:p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
              <ol className="space-y-4">
                {SETUP_STEPS.map((s, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black mt-0.5"
                      style={{ backgroundColor: ACCENT_BG, color: textTone(ACCENT) }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm sm:text-base font-bold" style={{ color: "#0a0a0a" }}>{s.title}</p>
                      {s.detail && <p className="text-sm leading-relaxed mt-0.5" style={{ color: "#3D3D3D" }}>{s.detail}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="rounded-xl p-4 sm:p-5 mt-4" style={{ backgroundColor: ACCENT_BG, border: `1px solid ${ACCENT}30` }}>
              <p className="text-sm sm:text-base font-semibold leading-relaxed" style={{ color: "#0a0a0a" }}>
                <Check className="w-4 h-4 inline-block mr-1.5 -mt-0.5" strokeWidth={3} aria-hidden="true" />{copy.s03.t03}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* First prompt */}
      <section className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: "#0a0a0a" }}>{copy.s04.t01}</h2>
            <p className="text-sm sm:text-base mb-6" style={{ color: "#71675E" }}>{copy.s04.t02}</p>
          </FadeIn>
          <FadeIn delay={100}>
            <CopyBlock text={FIRST_PROMPT} accent={ACCENT} label="Copy this prompt" />
          </FadeIn>
        </div>
      </section>

      {/* Advanced targeting prompts */}
      <section className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-black mb-6" style={{ color: "#0a0a0a" }}>{copy.s05.t01}</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ADVANCED_PROMPTS.map((p) => (
                <PromptCard key={p.title} title={p.title} prompt={p.prompt} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Hyper-specific ICP prompts */}
      <section className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-black mb-6" style={{ color: "#0a0a0a" }}>{copy.s06.t01}</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ICP_PROMPTS.map((p) => (
                <PromptCard key={p.title} title={p.title} prompt={p.prompt} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Master prompt template */}
      <section className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: "#0a0a0a" }}>{copy.s07.t01}</h2>
            <p className="text-sm sm:text-base mb-6" style={{ color: "#71675E" }}>{copy.s07.t02}</p>
          </FadeIn>
          <FadeIn delay={100}>
            <CopyBlock text={MASTER_TEMPLATE} accent={ACCENT} label="Copy this template" />
          </FadeIn>

          <FadeIn delay={150}>
            <div className="rounded-xl p-4 sm:p-5 mt-6" style={{ backgroundColor: ACCENT_BG, border: `1px solid ${ACCENT}30` }}>
              <p className="text-sm sm:text-base font-semibold leading-relaxed" style={{ color: "#0a0a0a" }}>
                <ArrowRight className="inline-block w-4 h-4 mr-1.5 -mt-0.5" strokeWidth={2.5} aria-hidden="true" />{copy.s07.t03}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="rounded-2xl p-8 sm:p-12 text-center" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <h2 className="text-2xl sm:text-3xl font-black mb-6 text-[#0A0A0A]">{copy.s08.t01}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <a
                  href="https://www.instagram.com/tejas_jhaveri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl p-5 text-center transition-all duration-300 hover:bg-[#F8F6F2] hover:-translate-y-1"
                  style={{ border: "1px solid #E8E2D9", backgroundColor: "#FFFFFF" }}
                >
                  <span className="flex justify-center mb-2" style={{ color: "#A14A08" }}><Camera className="w-6 h-6" aria-hidden="true" /></span>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">{copy.s08.t02}</span>
                  <span className="block text-xs" style={{ color: "#71675E" }}>{copy.s08.t03}</span>
                </a>
                <a
                  href="/book-a-call"
                  className="rounded-xl p-5 text-center transition-all duration-300 hover:bg-[#F8F6F2] hover:-translate-y-1"
                  style={{ border: "1px solid #E8E2D9", backgroundColor: "#FFFFFF" }}
                >
                  <span className="flex justify-center mb-2" style={{ color: "#A14A08" }}><CalendarCheck className="w-6 h-6" aria-hidden="true" /></span>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">{copy.s08.t04}</span>
                  <span className="block text-xs" style={{ color: "#71675E" }}>{copy.s08.t05}</span>
                </a>
                <a
                  href="mailto:founder@myntmore.com"
                  className="rounded-xl p-5 text-center transition-all duration-300 hover:bg-[#F8F6F2] hover:-translate-y-1"
                  style={{ border: "1px solid #E8E2D9", backgroundColor: "#FFFFFF" }}
                >
                  <span className="flex justify-center mb-2" style={{ color: "#A14A08" }}><Mail className="w-6 h-6" aria-hidden="true" /></span>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">{copy.s08.t06}</span>
                  <span className="block text-xs" style={{ color: "#71675E" }}>{copy.s08.t07}</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </InnerLayout>
  );
}
