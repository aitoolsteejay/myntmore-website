import type { Metadata } from "next";
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
  { v: "800", l: "Connection requests / mo" },
  { v: "80+", l: "US meetings booked / mo" },
  { v: "4", l: "New clients / mo" },
  { v: "90%", l: "Fully automated" },
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
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: accentBg, color: textTone(accent), border: `1px solid ${accent}30` }}>
              Step {number}
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

export default function AiAgentsMeetingsBlueprint() {
  return (
    <InnerLayout>
      {/* Hero */}
      <section className="pt-32 pb-14 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Guides", href: "/resources/guides" }, { label: "80+ US Meetings with AI Agents", href: "/resources/guides/80-us-meetings-ai-agents" }]} />
          <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 hero-fade" style={{ backgroundColor: "#FEF3EC", color: "#9A3412", border: "1px solid rgba(249,115,22,0.3)" }}>
            Free Guide
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-5 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            80+ US Meetings Booked In 1 Month{" "}
            <span className="relative inline-block">
              with AI Agents
              <Underline color="#F97316" />
            </span>
          </h1>
          <p className="text-base sm:text-lg font-semibold mb-5 hero-fade-d1" style={{ color: "#9A3412" }}>
            80+ US B2B Meetings/Month, Fully AI-Driven. A step-by-step blueprint you can copy, tweak, and run tomorrow.
          </p>
          <p className="text-base leading-relaxed hero-fade-d2 mb-8" style={{ color: "#52525B" }}>
            <a href="https://www.linkedin.com/in/tejasjhaveri/" target="_blank" rel="noopener noreferrer" className="link-subtle font-semibold" style={{ color: "#0a0a0a" }}>Tejas</a>{" "}
            isn&apos;t your average marketer. He&apos;s a 4x entrepreneur who built Flintstop, a D2C eCommerce brand, into a $6M-a-year machine, shipping out 8,000 orders a day before selling the business in 2020. At{" "}
            <a href="https://www.myntmore.com/" className="link-subtle font-semibold" style={{ color: "#0a0a0a" }}>Myntmore</a>, his B2B outbound agency, he&apos;s helped 130+ B2B companies book 12K+ meetings and generate $120M+ in pipeline. He&apos;s a TEDx speaker, angel investor, and has taught B2B growth methodologies at IIT and IIM. Now, he&apos;s here to do it for you.
          </p>

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
      <StepSection number="1" icon={Target} title="Foundations (Before Automation)" accent="#F97316" accentBg="rgba(249,115,22,0.08)">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border p-5" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
            <h4 className="flex items-center gap-1.5 text-sm font-black mb-3" style={{ color: "#9A3412" }}><Check className="w-4 h-4 flex-shrink-0" strokeWidth={3} aria-hidden="true" />ICP Locked</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#71675E" }}>Roles</p>
                <ChipGroup items={["Founders", "CEOs", "COOs", "Partners", "VP Sales"]} accent="#F97316" accentBg="rgba(249,115,22,0.08)" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#71675E" }}>Industries</p>
                <ChipGroup items={["SaaS", "Consulting", "Manufacturing", "Recruitment"]} accent="#F97316" accentBg="rgba(249,115,22,0.08)" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#71675E" }}>Geo</p>
                <ChipGroup items={["United States"]} accent="#F97316" accentBg="rgba(249,115,22,0.08)" />
              </div>
            </div>
          </div>

          <MiniCard
            title={<><Check className="w-4 h-4 flex-shrink-0" strokeWidth={3} aria-hidden="true" />Triggers</>}
            items={["Scaling teams", "Launching new products", "Hiring aggressively", "Active on LinkedIn"]}
            accent="#F97316"
          />

          <div className="rounded-xl p-5 flex flex-col justify-center" style={{ backgroundColor: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.3)" }}>
            <h4 className="flex items-center gap-1.5 text-sm font-black mb-3" style={{ color: "#9A3412" }}><Check className="w-4 h-4 flex-shrink-0" strokeWidth={3} aria-hidden="true" />Value Proposition</h4>
            <p className="text-sm italic leading-relaxed" style={{ color: "#0a0a0a" }}>
              &quot;We help B2B founders book predictable sales meetings using AI agents + laser-targeted outbound.&quot;
            </p>
          </div>
        </div>
      </StepSection>

      {/* Step 2: Prospect Discovery Engine */}
      <StepSection number="2" icon={Search} title="Prospect Discovery Engine" subtitle="n8n + Apollo/Clay" accent="#16a34a" accentBg="rgba(34,197,94,0.08)">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#71675E" }}>Daily automated lead pull, 6 AM IST</p>
          <FlowChips steps={["n8n", "Apollo/Clay API", "Airtable/Sheet"]} accent="#16a34a" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>Filters</h4>
            <ChipGroup items={["US-based", "Founder/CXO-level", "5–200 employees", "Relevant industries"]} accent="#16a34a" accentBg="rgba(34,197,94,0.08)" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>Nodes in the workflow</h4>
            <NumberedList
              items={["Cron Node, triggers daily run", "HTTP Request Node (Apollo/Clay API)", "Set Node, clean fields", "IF Node, remove duplicates", "Airtable/Google Sheet Node, store leads"]}
              accent="#16a34a"
              accentBg="rgba(34,197,94,0.08)"
            />
          </div>
        </div>

        <Callout accent="#16a34a" accentBg="rgba(34,197,94,0.08)">
          Your day&apos;s prospect list is fully ready by the time you wake up.
        </Callout>
      </StepSection>

      {/* Step 3: AI Background Enrichment */}
      <StepSection number="3" icon={Brain} title="AI Background Enrichment" subtitle="Profile + Website + News" accent="#a855f7" accentBg="rgba(168,85,247,0.08)">
        <p className="text-sm sm:text-base" style={{ color: "#3D3D3D" }}>For each new lead, n8n runs 3 parallel scrapes:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MiniCard title="a) LinkedIn Activity Scrape" items={["Recent posts", "Topics they talk about", "About section", "Featured links"]} accent="#a855f7" />
          <MiniCard title="b) Website Intelligence Scrape" items={["Homepage messaging", "What they sell", "ICP", "Offer positioning"]} accent="#a855f7" />
          <MiniCard title="c) Company News Signals" items={["Funding", "Hiring", "Product launches"]} accent="#a855f7" />
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>AI Agent (OpenAI/Gemini) prompt</h4>
          <CopyBlock
            accent="#a855f7"
            label="Copy this prompt"
            text={"Summarise this founder's recent focus + top pain point + 1 personalised context line for outreach."}
          />
        </div>

        <Callout accent="#a855f7" accentBg="rgba(168,85,247,0.08)">
          &quot;Noticed you&apos;re scaling US sales hiring, personalised outbound could compound that momentum.&quot;
        </Callout>
        <p className="text-sm" style={{ color: "#71675E" }}>This becomes the spine of your messaging.</p>
      </StepSection>

      {/* Step 4: Hyper-Personalised Outreach Generator */}
      <StepSection number="4" icon={MessageSquare} title="Hyper-Personalised Outreach Generator" accent="#D97706" accentBg="rgba(217,119,6,0.08)">
        <p className="text-sm sm:text-base" style={{ color: "#3D3D3D" }}>AI generates all 5 messages for every lead:</p>
        <NumberedList
          accent="#D97706"
          accentBg="rgba(217,119,6,0.08)"
          items={[
            "Connection Note, personalised in 300 characters based on their post + website + your value prop",
            "Follow-up #1, light context + credibility",
            "Follow-up #2, a micro-insight from their website",
            "Follow-up #3, soft ask: \"Worth exploring?\"",
            "Final Nudge, polite push + Calendly CTA",
          ]}
        />
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>Nodes</h4>
          <ChipGroup items={["AI Agent Node, message generation", "Set Node, store final sequence", "Database Node, push to CRM"]} accent="#D97706" accentBg="rgba(217,119,6,0.08)" />
        </div>
        <Callout accent="#D97706" accentBg="rgba(217,119,6,0.08)">
          Outcome: a unique outreach sequence for every single prospect.
        </Callout>
      </StepSection>

      {/* Step 5: LinkedIn Outreach Automation */}
      <StepSection number="5" icon={Rocket} title="LinkedIn Outreach Automation" subtitle="800 requests / month, using n8n" accent="#0077b5" accentBg="rgba(0,119,181,0.08)">
        <NumberedList
          accent="#0077b5"
          accentBg="rgba(0,119,181,0.08)"
          items={[
            "Fetch personalised messages",
            "Match message + prospect + step",
            "Send via tool API",
            "Log status: sent, accepted, replied",
            "Auto-tag positives",
          ]}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl p-5 text-center" style={{ backgroundColor: "rgba(0,119,181,0.08)", border: "1px solid rgba(0,119,181,0.3)" }}>
            <div className="text-xl font-black" style={{ color: "#0a0a0a" }}>~26/day = 800/month</div>
          </div>
          <div className="rounded-xl p-5 text-center" style={{ backgroundColor: "rgba(0,119,181,0.08)", border: "1px solid rgba(0,119,181,0.3)" }}>
            <div className="text-xl font-black" style={{ color: "#0a0a0a" }}>4 auto follow-ups after acceptance</div>
          </div>
        </div>
        <Callout accent="#0077b5" accentBg="rgba(0,119,181,0.08)">
          This is the backbone of the 80-meetings engine.
        </Callout>
      </StepSection>

      {/* Step 6: Call Booking Autopilot */}
      <StepSection number="6" icon={CalendarCheck} title="Call Booking Autopilot" subtitle="n8n + Calendly" accent="#14B8A6" accentBg="rgba(20,184,166,0.08)">
        <p className="text-sm sm:text-base font-semibold" style={{ color: "#3D3D3D" }}>When someone replies:</p>
        <NumberedList
          accent="#14B8A6"
          accentBg="rgba(20,184,166,0.08)"
          items={[
            "LinkedIn Inbox API sends the reply to n8n",
            "AI Sentiment Node classifies the reply",
            "If \"positive\": auto-send the Calendly link, add to the Hot Lead pipeline",
            "Auto-create a CRM entry",
            "Send a confirmation message",
          ]}
        />
        <Callout accent="#14B8A6" accentBg="rgba(20,184,166,0.08)">
          &quot;Great, here&apos;s my calendar, pick a time that works.&quot;
        </Callout>
      </StepSection>

      {/* Step 7: Self-Optimising Weekly Report */}
      <StepSection number="7" icon={ChartColumn} title="Self-Optimising Weekly Report" subtitle="Every Friday evening" accent="#6366f1" accentBg="rgba(99,102,241,0.08)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>Pull all metrics</h4>
            <ChipGroup
              items={["Connection acceptance rate", "Reply rate", "Positive reply rate", "Meetings booked", "Show-up rate"]}
              accent="#6366f1"
              accentBg="rgba(99,102,241,0.08)"
            />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>AI Agent analyses</h4>
            <ChipGroup
              items={["Best-responding ICP segment", "Highest-replying message", "Winning personalisation angle", "What to change next week"]}
              accent="#6366f1"
              accentBg="rgba(99,102,241,0.08)"
            />
          </div>
        </div>
        <Callout accent="#6366f1" accentBg="rgba(99,102,241,0.08)">
          n8n automatically updates next week&apos;s templates. This is how the system gets sharper every week.
        </Callout>
      </StepSection>

      {/* Step 8: Results */}
      <section className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-black" style={{ color: "#BE185D" }}>8</span>
              <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(236,72,153,0.08)", color: "#BE185D", border: "1px solid rgba(236,72,153,0.3)" }}>
                Step 8
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
              <Trophy className="inline-block w-7 h-7 mr-2 -mt-1 align-middle" style={{ color: "#A14A08" }} strokeWidth={2.25} aria-hidden="true" />Results (real)
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8 rounded-2xl" style={{ backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.3)" }}>
              {[
                { v: "800", l: "Connection requests / month" },
                { v: "80+", l: "US meetings booked / month" },
                { v: "4", l: "New clients / month, at $2,000 each" },
                { v: "90%", l: "Of the system fully automated" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-3xl sm:text-4xl font-black mb-1" style={{ color: "#0a0a0a" }}><StatTicker value={s.v} /></div>
                  <div className="text-sm font-semibold" style={{ color: "#3D3D3D" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm sm:text-base font-semibold mt-5" style={{ color: "#71675E" }}>
              You only show up for calls.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Step 9: Video */}
      <section className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-black" style={{ color: "#9A3412" }}>9</span>
              <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(249,115,22,0.08)", color: "#9A3412", border: "1px solid rgba(249,115,22,0.3)" }}>
                Step 9
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mb-5 leading-tight" style={{ color: "#0a0a0a" }}>
              Check out the AI Agents in action
            </h2>
            <a
              href="https://www.loom.com/share/143c7b6ae41242bbbad797539987d214?sid=2c7fb593-ef70-4933-ac6f-8a518eb65803"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}
            >
              <PlayCircle className="w-10 h-10 flex-shrink-0" style={{ color: "#9A3412" }} />
              <div>
                <p className="text-sm sm:text-base font-black" style={{ color: "#0A0A0A" }}>Watch the walkthrough on Loom</p>
                <p className="text-xs sm:text-sm" style={{ color: "#71675E" }}>See the full agent workflow, live</p>
              </div>
            </a>
            <p className="text-sm sm:text-base leading-relaxed mt-5" style={{ color: "#3D3D3D" }}>
              Our AI Agents are custom-built to act like your silent growth team, working 24/7 behind the scenes to analyse, identify, and act with precision.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="rounded-2xl p-8 sm:p-12 text-center" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <h2 className="text-2xl sm:text-3xl font-black mb-6 text-[#0A0A0A]">More playbooks like this</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <a
                  href="https://www.instagram.com/tejas_jhaveri/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl p-5 text-center transition-all duration-300 hover:bg-[#F8F6F2] hover:-translate-y-1"
                  style={{ border: "1px solid #E8E2D9", backgroundColor: "#FFFFFF" }}
                >
                  <span className="flex justify-center mb-2" style={{ color: "#A14A08" }}><Camera className="w-6 h-6" aria-hidden="true" /></span>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">Follow along</span>
                  <span className="block text-xs" style={{ color: "#71675E" }}>@tejas_jhaveri</span>
                </a>
                <a
                  href="/book-a-call"
                  className="rounded-xl p-5 text-center transition-all duration-300 hover:bg-[#F8F6F2] hover:-translate-y-1"
                  style={{ border: "1px solid #E8E2D9", backgroundColor: "#FFFFFF" }}
                >
                  <span className="flex justify-center mb-2" style={{ color: "#A14A08" }}><CalendarCheck className="w-6 h-6" aria-hidden="true" /></span>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">Book a call</span>
                  <span className="block text-xs" style={{ color: "#71675E" }}>Complimentary strategy session</span>
                </a>
                <a
                  href="mailto:founder@myntmore.com"
                  className="rounded-xl p-5 text-center transition-all duration-300 hover:bg-[#F8F6F2] hover:-translate-y-1"
                  style={{ border: "1px solid #E8E2D9", backgroundColor: "#FFFFFF" }}
                >
                  <span className="flex justify-center mb-2" style={{ color: "#A14A08" }}><Mail className="w-6 h-6" aria-hidden="true" /></span>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">Email us</span>
                  <span className="block text-xs" style={{ color: "#71675E" }}>founder@myntmore.com</span>
                </a>
              </div>
              <Link href="/resources/guides/58-meetings-600-linkedin-connections" className="inline-block mt-6 text-sm font-semibold underline underline-offset-4" style={{ color: "#A14A08" }}>
                Prefer the manual version? 58 meetings from 600 LinkedIn connections
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </InnerLayout>
  );
}
