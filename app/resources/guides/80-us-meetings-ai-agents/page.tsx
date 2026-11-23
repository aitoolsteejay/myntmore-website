import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import { buildArticleSchema, SITE_URL } from "@/lib/schema";
import Link from "next/link";
import { PlayCircle, Target, Search, Brain, MessageSquare, Rocket, CalendarCheck, ChartColumn, Check, ArrowRight, Trophy, Camera, Mail, type LucideIcon } from "lucide-react";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CopyBlock from "@/app/components/CopyBlock";
import FadeIn from "@/app/components/FadeIn";
import StatTicker from "@/app/components/StatTicker";
import Underline from "./Underline";
import { textTone } from "@/lib/colors";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";
import pageCopy from "@/content/page-copy/guide80UsMeetingsAiAgents.json";

// This page's text is edited in the admin ("80+ US Meetings Booked in 1 Month with AI Agents") and lives in content/page-copy/guide80UsMeetingsAiAgents.json.
const copy = pageCopy;

export const metadata: Metadata = withPageSeo("/resources/guides/80-us-meetings-ai-agents", {
  title: "80+ US Meetings Booked in 1 Month with AI Agents",
  description: "The exact AI-agent blueprint behind 800 LinkedIn connections and 80+ US B2B meetings a month, automated with n8n and AI. Read the guide.",
  keywords: [
    "ai agents for lead generation",
    "n8n lead generation workflow",
    "linkedin automation with ai",
    "apollo clay lead enrichment",
    "ai sales agent blueprint",
    "automated linkedin outreach",
    "b2b meeting booking automation",
    "ai prospect research automation",
    "cold outreach automation n8n",
    "ai sdr agent",
    "automated lead qualification",
    "linkedin connection request automation",
    "ai enriched lead lists",
    "outbound automation blueprint",
  ],
  alternates: { canonical: "https://www.myntmore.com/resources/guides/80-us-meetings-ai-agents" },
  openGraph: {
    ...OG_BASE,
    title: "80+ US Meetings Booked in 1 Month with AI Agents",
    description: "800 connections/month → 80+ US meetings/month → 4 new clients/month. The full AI-agent blueprint.",
    url: "https://www.myntmore.com/resources/guides/80-us-meetings-ai-agents",
    images: ogImages("/resources/guides/80-us-meetings-ai-agents"),
  },
});

const HERO_STATS = [
  { v: "800", l: copy.s01.t01 },
  { v: "80+", l: copy.s01.t02 },
  { v: "4", l: copy.s01.t03 },
  { v: "90%", l: copy.s01.t04 },
];

function Chip({ text, accent, accentBg }: { text: string; accent: string; accentBg: string }) {
  return (
    <span
      className="text-xs sm:text-[13px] font-semibold px-3 py-1.5 rounded-full inline-block"
      style={{ backgroundColor: accentBg, color: textTone(accent), border: `1px solid ${accent}30` }}
    >
      {text}
    </span>
  );
}

function ChipGroup({ items, accent, accentBg }: { items: string[]; accent: string; accentBg: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <Chip key={t} text={t} accent={accent} accentBg={accentBg} />
      ))}
    </div>
  );
}

function MiniCard({ title, items, accent }: { title: React.ReactNode; items: string[]; accent: string }) {
  return (
    <div className="rounded-xl border p-5" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
      <h4 className="flex items-center gap-1.5 text-sm font-black mb-3" style={{ color: textTone(accent) }}>{title}</h4>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-snug" style={{ color: "#3D3D3D" }}>
            <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NumberedList({ items, accent, accentBg }: { items: string[]; accent: string; accentBg: string }) {
  return (
    <ol className="space-y-2.5">
      {items.map((s, i) => (
        <li key={i} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed" style={{ color: "#3D3D3D" }}>
          <span
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black mt-0.5"
            style={{ backgroundColor: accentBg, color: textTone(accent) }}
          >
            {i + 1}
          </span>
          {s}
        </li>
      ))}
    </ol>
  );
}

function Callout({ children, accent, accentBg }: { children: React.ReactNode; accent: string; accentBg: string }) {
  return (
    <div className="rounded-xl p-4 sm:p-5" style={{ backgroundColor: accentBg, border: `1px solid ${accent}30` }}>
      <p className="flex items-start gap-2 text-sm sm:text-base font-semibold leading-relaxed" style={{ color: "#0a0a0a" }}><ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: accent }} strokeWidth={2.5} aria-hidden="true" /><span>{children}</span></p>
    </div>
  );
}

function FlowChips({ steps, accent }: { steps: string[]; accent: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg" style={{ backgroundColor: "#F5B731", color: "#0A0A0A" }}>
            {s}
          </span>
          {i < steps.length - 1 && <span style={{ color: "#71675E" }}>→</span>}
        </span>
      ))}
    </div>
  );
}

function StepSection({
  number,
  icon: Icon,
  title,
  subtitle,
  accent,
  accentBg,
  children,
}: {
  number: string;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  accent: string;
  accentBg: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-black" style={{ color: textTone(accent) }}>{number}</span>
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: accentBg, color: textTone(accent), border: `1px solid ${accent}30` }}>{copy.s01.t05}{number}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-2 leading-tight" style={{ color: "#0a0a0a" }}>
            <Icon className="inline-block w-7 h-7 mr-2 -mt-1 align-middle" style={{ color: accent }} strokeWidth={2.25} aria-hidden="true" />
            {title}
          </h2>
          {subtitle && <p className="text-sm sm:text-base font-medium mb-6" style={{ color: textTone(accent) }}>{subtitle}</p>}
        </FadeIn>

        <FadeIn delay={100}>
          <div className={subtitle ? "space-y-6" : "space-y-6 mt-6"}>{children}</div>
        </FadeIn>
      </div>
    </section>
  );
}

// Article schema. The first publication date is not on record, so only the last update (from lib/sitemap-dates.json) is given.
const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "80+ US Meetings Booked in 1 Month with AI Agents",
  description: "The exact AI-agent blueprint behind 800 LinkedIn connections and 80+ US B2B meetings a month, automated with n8n and AI. Read the guide.",
  url: `${SITE_URL}/resources/guides/80-us-meetings-ai-agents`,
  dateModified: "2026-11-14T12:09:59+05:30",
});

export default function AiAgentsMeetingsBlueprint() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />
      {/* Hero */}
      <section className="pt-32 pb-14 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: copy.s01.t06, href: "/resources" }, { label: copy.s01.t07, href: "/resources/guides" }, { label: copy.s01.t08, href: "/resources/guides/80-us-meetings-ai-agents" }]} />
          <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 hero-fade" style={{ backgroundColor: "#FEF3EC", color: "#9A3412", border: "1px solid rgba(249,115,22,0.3)" }}>{copy.s01.t09}</span>
          <h1 className="text-4xl sm:text-5xl font-black mb-5 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>{copy.s01.t10}{" "}
            <span className="relative inline-block">{copy.s01.t11}<Underline color="#F97316" />
            </span>
          </h1>
          <p className="text-base sm:text-lg font-semibold mb-5 hero-fade-d1" style={{ color: "#9A3412" }}>{copy.s01.t12}</p>
          <p className="text-base leading-relaxed hero-fade-d2 mb-8" style={{ color: "#52525B" }}>
            <a href="https://www.linkedin.com/in/tejasjhaveri/" target="_blank" rel="noopener noreferrer" className="link-subtle font-semibold" style={{ color: "#0a0a0a" }}>{copy.s01.t13}</a>{" "}{copy.s01.t14}{" "}
            <a href="https://www.myntmore.com/" className="link-subtle font-semibold" style={{ color: "#0a0a0a" }}>{copy.s01.t15}</a>{copy.s01.t16}</p>

          <FadeIn delay={150}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl border" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
              {HERO_STATS.map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black" style={{ color: "#0a0a0a" }}><StatTicker value={s.v} /></div>
                  <div className="text-xs mt-1 leading-tight" style={{ color: "#71675E" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Step 1: Foundations */}
      <StepSection number="1" icon={Target} title={copy.s01.t17} accent="#F97316" accentBg="rgba(249,115,22,0.08)">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border p-5" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
            <h4 className="flex items-center gap-1.5 text-sm font-black mb-3" style={{ color: "#9A3412" }}><Check className="w-4 h-4 flex-shrink-0" strokeWidth={3} aria-hidden="true" />{copy.s01.t18}</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#71675E" }}>{copy.s01.t19}</p>
                <ChipGroup items={["Founders", "CEOs", "COOs", "Partners", copy.s01.t20]} accent="#F97316" accentBg="rgba(249,115,22,0.08)" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#71675E" }}>{copy.s01.t21}</p>
                <ChipGroup items={["SaaS", "Consulting", "Manufacturing", "Recruitment"]} accent="#F97316" accentBg="rgba(249,115,22,0.08)" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#71675E" }}>{copy.s01.t22}</p>
                <ChipGroup items={[copy.s01.t23]} accent="#F97316" accentBg="rgba(249,115,22,0.08)" />
              </div>
            </div>
          </div>

          <MiniCard
            title={<><Check className="w-4 h-4 flex-shrink-0" strokeWidth={3} aria-hidden="true" />{copy.s01.t24}</>}
            items={[copy.s01.t25, copy.s01.t26, copy.s01.t27, copy.s01.t28]}
            accent="#F97316"
          />

          <div className="rounded-xl p-5 flex flex-col justify-center" style={{ backgroundColor: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.3)" }}>
            <h4 className="flex items-center gap-1.5 text-sm font-black mb-3" style={{ color: "#9A3412" }}><Check className="w-4 h-4 flex-shrink-0" strokeWidth={3} aria-hidden="true" />{copy.s01.t29}</h4>
            <p className="text-sm italic leading-relaxed" style={{ color: "#0a0a0a" }}>{copy.s01.t30}</p>
          </div>
        </div>
      </StepSection>

      {/* Step 2: Prospect Discovery Engine */}
      <StepSection number="2" icon={Search} title={copy.s01.t31} subtitle="n8n + Apollo/Clay" accent="#16a34a" accentBg="rgba(34,197,94,0.08)">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#71675E" }}>{copy.s01.t32}</p>
          <FlowChips steps={["n8n", copy.s01.t33, "Airtable/Sheet"]} accent="#16a34a" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>{copy.s01.t34}</h4>
            <ChipGroup items={["US-based", "Founder/CXO-level", copy.s01.t35, copy.s01.t36]} accent="#16a34a" accentBg="rgba(34,197,94,0.08)" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>{copy.s01.t37}</h4>
            <NumberedList
              items={[copy.s01.t38, copy.s01.t39, copy.s01.t40, copy.s01.t41, copy.s01.t42]}
              accent="#16a34a"
              accentBg="rgba(34,197,94,0.08)"
            />
          </div>
        </div>

        <Callout accent="#16a34a" accentBg="rgba(34,197,94,0.08)">{copy.s01.t43}</Callout>
      </StepSection>

      {/* Step 3: AI Background Enrichment */}
      <StepSection number="3" icon={Brain} title={copy.s01.t44} subtitle="Profile + Website + News" accent="#a855f7" accentBg="rgba(168,85,247,0.08)">
        <p className="text-sm sm:text-base" style={{ color: "#3D3D3D" }}>{copy.s01.t45}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MiniCard title={copy.s01.t46} items={[copy.s01.t47, copy.s01.t48, copy.s01.t49, copy.s01.t50]} accent="#a855f7" />
          <MiniCard title={copy.s01.t51} items={[copy.s01.t52, copy.s01.t53, "ICP", copy.s01.t54]} accent="#a855f7" />
          <MiniCard title={copy.s01.t55} items={["Funding", "Hiring", copy.s01.t56]} accent="#a855f7" />
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>{copy.s01.t57}</h4>
          <CopyBlock
            accent="#a855f7"
            label="Copy this prompt"
            text={"Summarise this founder's recent focus + top pain point + 1 personalised context line for outreach."}
          />
        </div>

        <Callout accent="#a855f7" accentBg="rgba(168,85,247,0.08)">{copy.s01.t58}</Callout>
        <p className="text-sm" style={{ color: "#71675E" }}>{copy.s01.t59}</p>
      </StepSection>

      {/* Step 4: Hyper-Personalised Outreach Generator */}
      <StepSection number="4" icon={MessageSquare} title={copy.s01.t60} accent="#D97706" accentBg="rgba(217,119,6,0.08)">
        <p className="text-sm sm:text-base" style={{ color: "#3D3D3D" }}>{copy.s01.t61}</p>
        <NumberedList
          accent="#D97706"
          accentBg="rgba(217,119,6,0.08)"
          items={[
            copy.s01.t62,
            copy.s01.t63,
            copy.s01.t64,
            copy.s01.t65,
            copy.s01.t66,
          ]}
        />
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>{copy.s01.t67}</h4>
          <ChipGroup items={[copy.s01.t68, copy.s01.t69, copy.s01.t70]} accent="#D97706" accentBg="rgba(217,119,6,0.08)" />
        </div>
        <Callout accent="#D97706" accentBg="rgba(217,119,6,0.08)">{copy.s01.t71}</Callout>
      </StepSection>

      {/* Step 5: LinkedIn Outreach Automation */}
      <StepSection number="5" icon={Rocket} title={copy.s01.t72} subtitle="800 requests / month, using n8n" accent="#0077b5" accentBg="rgba(0,119,181,0.08)">
        <NumberedList
          accent="#0077b5"
          accentBg="rgba(0,119,181,0.08)"
          items={[
            copy.s01.t73,
            copy.s01.t74,
            copy.s01.t75,
            copy.s01.t76,
            copy.s01.t77,
          ]}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl p-5 text-center" style={{ backgroundColor: "rgba(0,119,181,0.08)", border: "1px solid rgba(0,119,181,0.3)" }}>
            <div className="text-xl font-black" style={{ color: "#0a0a0a" }}>{copy.s01.t78}</div>
          </div>
          <div className="rounded-xl p-5 text-center" style={{ backgroundColor: "rgba(0,119,181,0.08)", border: "1px solid rgba(0,119,181,0.3)" }}>
            <div className="text-xl font-black" style={{ color: "#0a0a0a" }}>{copy.s01.t79}</div>
          </div>
        </div>
        <Callout accent="#0077b5" accentBg="rgba(0,119,181,0.08)">{copy.s01.t80}</Callout>
      </StepSection>

      {/* Step 6: Call Booking Autopilot */}
      <StepSection number="6" icon={CalendarCheck} title={copy.s01.t81} subtitle="n8n + Calendly" accent="#14B8A6" accentBg="rgba(20,184,166,0.08)">
        <p className="text-sm sm:text-base font-semibold" style={{ color: "#3D3D3D" }}>{copy.s01.t82}</p>
        <NumberedList
          accent="#14B8A6"
          accentBg="rgba(20,184,166,0.08)"
          items={[
            copy.s01.t83,
            copy.s01.t84,
            copy.s01.t85,
            copy.s01.t86,
            copy.s01.t87,
          ]}
        />
        <Callout accent="#14B8A6" accentBg="rgba(20,184,166,0.08)">{copy.s01.t88}</Callout>
      </StepSection>

      {/* Step 7: Self-Optimising Weekly Report */}
      <StepSection number="7" icon={ChartColumn} title={copy.s01.t89} subtitle="Every Friday evening" accent="#6366f1" accentBg="rgba(99,102,241,0.08)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>{copy.s01.t90}</h4>
            <ChipGroup
              items={[copy.s01.t91, copy.s01.t92, copy.s01.t93, copy.s01.t94, copy.s01.t95]}
              accent="#6366f1"
              accentBg="rgba(99,102,241,0.08)"
            />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>{copy.s01.t96}</h4>
            <ChipGroup
              items={[copy.s01.t97, copy.s01.t98, copy.s01.t99, copy.s01.t100]}
              accent="#6366f1"
              accentBg="rgba(99,102,241,0.08)"
            />
          </div>
        </div>
        <Callout accent="#6366f1" accentBg="rgba(99,102,241,0.08)">{copy.s01.t101}</Callout>
      </StepSection>

      {/* Step 8: Results */}
      <section className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-black" style={{ color: "#BE185D" }}>{copy.s01.t102}</span>
              <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(236,72,153,0.08)", color: "#BE185D", border: "1px solid rgba(236,72,153,0.3)" }}>{copy.s01.t103}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
              <Trophy className="inline-block w-7 h-7 mr-2 -mt-1 align-middle" style={{ color: "#A14A08" }} strokeWidth={2.25} aria-hidden="true" />{copy.s02.t01}</h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8 rounded-2xl" style={{ backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.3)" }}>
              {[
                { v: "800", l: copy.s02.t02 },
                { v: "80+", l: copy.s02.t03 },
                { v: "4", l: copy.s02.t04 },
                { v: "90%", l: copy.s02.t05 },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-3xl sm:text-4xl font-black mb-1" style={{ color: "#0a0a0a" }}><StatTicker value={s.v} /></div>
                  <div className="text-sm font-semibold" style={{ color: "#3D3D3D" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm sm:text-base font-semibold mt-5" style={{ color: "#71675E" }}>{copy.s02.t06}</p>
          </FadeIn>
        </div>
      </section>

      {/* Step 9: Video */}
      <section className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-black" style={{ color: "#9A3412" }}>{copy.s02.t07}</span>
              <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(249,115,22,0.08)", color: "#9A3412", border: "1px solid rgba(249,115,22,0.3)" }}>{copy.s02.t08}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mb-5 leading-tight" style={{ color: "#0a0a0a" }}>{copy.s03.t01}</h2>
            <a
              href="https://www.loom.com/share/143c7b6ae41242bbbad797539987d214?sid=2c7fb593-ef70-4933-ac6f-8a518eb65803"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}
            >
              <PlayCircle className="w-10 h-10 flex-shrink-0" style={{ color: "#9A3412" }} />
              <div>
                <p className="text-sm sm:text-base font-black" style={{ color: "#0A0A0A" }}>{copy.s03.t02}</p>
                <p className="text-xs sm:text-sm" style={{ color: "#71675E" }}>{copy.s03.t03}</p>
              </div>
            </a>
            <p className="text-sm sm:text-base leading-relaxed mt-5" style={{ color: "#3D3D3D" }}>{copy.s03.t04}</p>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="rounded-2xl p-8 sm:p-12 text-center" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <h2 className="text-2xl sm:text-3xl font-black mb-6 text-[#0A0A0A]">{copy.s04.t01}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <a
                  href="https://www.instagram.com/tejas_jhaveri/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl p-5 text-center transition-all duration-300 hover:bg-[#F8F6F2] hover:-translate-y-1"
                  style={{ border: "1px solid #E8E2D9", backgroundColor: "#FFFFFF" }}
                >
                  <span className="flex justify-center mb-2" style={{ color: "#A14A08" }}><Camera className="w-6 h-6" aria-hidden="true" /></span>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">{copy.s04.t02}</span>
                  <span className="block text-xs" style={{ color: "#71675E" }}>{copy.s04.t03}</span>
                </a>
                <a
                  href="/book-a-call"
                  className="rounded-xl p-5 text-center transition-all duration-300 hover:bg-[#F8F6F2] hover:-translate-y-1"
                  style={{ border: "1px solid #E8E2D9", backgroundColor: "#FFFFFF" }}
                >
                  <span className="flex justify-center mb-2" style={{ color: "#A14A08" }}><CalendarCheck className="w-6 h-6" aria-hidden="true" /></span>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">{copy.s04.t04}</span>
                  <span className="block text-xs" style={{ color: "#71675E" }}>{copy.s04.t05}</span>
                </a>
                <a
                  href="mailto:founder@myntmore.com"
                  className="rounded-xl p-5 text-center transition-all duration-300 hover:bg-[#F8F6F2] hover:-translate-y-1"
                  style={{ border: "1px solid #E8E2D9", backgroundColor: "#FFFFFF" }}
                >
                  <span className="flex justify-center mb-2" style={{ color: "#A14A08" }}><Mail className="w-6 h-6" aria-hidden="true" /></span>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">{copy.s04.t06}</span>
                  <span className="block text-xs" style={{ color: "#71675E" }}>{copy.s04.t07}</span>
                </a>
              </div>
              <Link href="/resources/guides/58-meetings-600-linkedin-connections" className="inline-block mt-6 text-sm font-semibold underline underline-offset-4" style={{ color: "#A14A08" }}>{copy.s04.t08}</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </InnerLayout>
  );
}
