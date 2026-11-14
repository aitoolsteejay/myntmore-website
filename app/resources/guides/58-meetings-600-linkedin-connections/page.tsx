import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Bookmark,
  CalendarDays,
  Check,
  Eye,
  Flame,
  Gift,
  Heart,
  Lightbulb,
  Mail,
  MessageCircle,
  MessagesSquare,
  Puzzle,
  RefreshCw,
  Repeat,
  Search,
  Settings,
  Target,
  UserPlus,
  Video,
  DoorOpen,
  Blocks,
  type LucideIcon,
} from "lucide-react";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CopyBlock from "@/app/components/CopyBlock";
import FadeIn from "@/app/components/FadeIn";
import JsonLd from "@/app/components/JsonLd";
import StatTicker from "@/app/components/StatTicker";
import Underline from "../how-to-set-up-vibe-prospecting/Underline";
import { buildArticleSchema } from "@/lib/schema";
import ArticleMeta from "@/app/components/ArticleMeta";
import { textTone } from "@/lib/colors";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const URL = "https://www.myntmore.com/resources/guides/58-meetings-600-linkedin-connections";
const BLUE = "#0077b5";
const DESCRIPTION = "The 5-step LinkedIn lead generation framework behind 58 meetings from 600 connections in a month: ICP, positioning, warm-up, follow-ups. Read the guide.";

export const metadata: Metadata = withPageSeo("/resources/guides/58-meetings-600-linkedin-connections", {
  // A string literal on purpose: the site audit script reads the page title from it.
  title: "58 Meetings Booked from 600 LinkedIn Connections",
  description: DESCRIPTION,
  keywords: [
    "how to book meetings on linkedin",
    "linkedin lead generation strategy",
    "5 step linkedin lead generation framework",
    "linkedin outreach message sequence",
    "5 message linkedin sequence",
    "linkedin warm up before outreach",
    "linkedin follow up message examples",
    "linkedin positioning for outbound",
    "linkedin icp and buying triggers",
    "linkedin insight drop message",
    "linkedin connection to meeting conversion",
    "linkedin follow up stack",
    "ai personalised linkedin outreach",
    "linkedin soft cta message",
  ],
  alternates: { canonical: URL },
  openGraph: {
    ...OG_BASE,
    title: "58 Meetings Booked from 600 LinkedIn Connections in 1 Month",
    description: "600 LinkedIn connections → 58 meetings in 1 month. The full 5-step framework: ICP, positioning, warm-up, 5-message sequence, follow-ups.",
    url: URL,
    images: ogImages("/resources/guides/58-meetings-600-linkedin-connections"),
  },
});

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "58 Meetings Booked from 600 LinkedIn Connections in 1 Month",
  description: DESCRIPTION,
  url: URL,
  datePublished: "2026-10-13T00:00:00+05:30",
  dateModified: "2026-10-13T00:00:00+05:30",
});

const HERO_STATS = [
  { v: "58", l: "Meetings booked" },
  { v: "600", l: "LinkedIn connections" },
  { v: "1", l: "Month" },
  { v: "5", l: "Step framework" },
];

const STEPS_AT_A_GLANCE = ["ICP", "Positioning", "Warm-up", "5-message sequence", "Follow-up stack"];

const NOW_BUYERS = [
  "Feel the pain today",
  "Have urgency",
  "Have budget",
  "Are actively exploring",
  "Have a recent trigger (change in leadership, slow pipeline, launches, etc.)",
];

const ICP_LAYERS = [
  { label: "Primary ICP", text: "Most likely to buy now", tone: 1 },
  { label: "Secondary ICP", text: "Could convert with nurture", tone: 0.6 },
  { label: "Outer ICP", text: "Top-of-funnel relevance", tone: 0.3 },
];

const TRIGGERS = ["New quarterly targets", "Hiring freeze, so outbound needed", "Sales slowdown", "Product launch", "Fundraise"];

const WARM_UPS: { icon: LucideIcon; text: string }[] = [
  { icon: Eye, text: "View their profile" },
  { icon: Heart, text: "Like 2–3 posts" },
  { icon: MessageCircle, text: "Comment something meaningful" },
  { icon: Bell, text: "Engage with company updates" },
  { icon: Bookmark, text: "Save or share industry content they posted" },
];

const FOLLOW_UPS: { icon: LucideIcon; name: string; text: string }[] = [
  { icon: RefreshCw, name: "Nudge", text: "Circling back on this = open to explore?" },
  { icon: Gift, name: "Value Drop", text: "Made a quick breakdown for teams in [specify industry] - it might help." },
  { icon: Target, name: "Trigger-Based", text: "Saw the hiring update at [company name]. This might be relevant." },
  { icon: Video, name: "Audit CTA", text: "Happy to share a quick teardown of your LinkedIn. Want one?" },
];

function Callout({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div className="rounded-xl p-4 sm:p-5" style={{ backgroundColor: `${accent}12`, border: `1px solid ${accent}30` }}>
      <p className="flex items-start gap-2 text-sm sm:text-base font-semibold leading-relaxed" style={{ color: "#0a0a0a" }}>
        <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: accent }} strokeWidth={2.5} aria-hidden="true" />
        <span>{children}</span>
      </p>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>
      {children}
    </p>
  );
}

function CheckList({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-sm sm:text-base leading-snug" style={{ color: "#3D3D3D" }}>
          <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accent}18`, color: textTone(accent) }}>
            <Check className="w-3 h-3" strokeWidth={3.5} aria-hidden="true" />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}

function StepSection({
  id,
  number,
  icon: Icon,
  title,
  accent,
  children,
}: {
  id: string;
  number: number;
  icon: LucideIcon;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-12 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-black" style={{ color: textTone(accent) }}>{number}</span>
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: `${accent}14`, color: textTone(accent), border: `1px solid ${accent}30` }}>
              Step {number}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            <Icon className="inline-block w-7 h-7 mr-2 -mt-1 align-middle" style={{ color: accent }} strokeWidth={2.25} aria-hidden="true" />
            {title}
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="space-y-6">{children}</div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function LinkedinFiftyEightMeetingsGuide() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />

      {/* Hero */}
      <section className="pt-32 pb-14 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Guides", href: "/resources/guides" }, { label: "58 Meetings from 600 LinkedIn Connections", href: "/resources/guides/58-meetings-600-linkedin-connections" }]} />
          <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 hero-fade" style={{ backgroundColor: "#E8F3FA", color: textTone(BLUE), border: `1px solid ${BLUE}4D` }}>
            Free Guide
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-5 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            58 Meetings Booked from 600 LinkedIn Connections{" "}
            <span className="relative inline-block">
              in 1 Month
              <Underline color={BLUE} />
            </span>
          </h1>
          <ArticleMeta schema={ARTICLE_SCHEMA} />
          <p className="text-base sm:text-lg font-semibold mb-5 hero-fade-d1" style={{ color: BLUE }}>
            A holistic LinkedIn lead gen strategy: a clear 5-step framework to go from random outreach to predictable meetings.
          </p>
          <p className="text-base leading-relaxed hero-fade-d2 mb-8" style={{ color: "#52525B" }}>
            <a href="https://www.linkedin.com/in/tejasjhaveri/" target="_blank" rel="noopener noreferrer" className="link-subtle font-semibold" style={{ color: "#0a0a0a" }}>Tejas</a>{" "}
            isn’t your average marketer. He’s a 4x entrepreneur who built Flintstop, a D2C eCommerce brand, into a $6M-a-year machine, shipping out 8,000 orders a day before selling the business in 2020. At{" "}
            <a href="https://www.myntmore.com/" className="link-subtle font-semibold" style={{ color: "#0a0a0a" }}>Myntmore</a>, his growth marketing agency, he’s partnered with 130+ B2B companies to generate $120M+ in pipeline. He’s a TEDx speaker, been a Growth Marketing professor to over 100,000 students, and a strategist who knows how to make marketing actually work. Now, he’s here to do it for you.
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

          <FadeIn delay={250}>
            <nav aria-label="The 5 steps" className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest mr-1" style={{ color: "#71675E" }}>The 5 steps</span>
              {STEPS_AT_A_GLANCE.map((s, i) => (
                <a key={s} href={`#step-${i + 1}`} className="inline-flex items-center gap-2 rounded-full border bg-white px-3.5 py-1.5 text-xs sm:text-[13px] font-bold transition-colors hover:border-[#0077b5]" style={{ borderColor: "#E8E2D9", color: "#0a0a0a" }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: BLUE }}>{i + 1}</span>
                  {s}
                </a>
              ))}
            </nav>
          </FadeIn>
        </div>
      </section>

      {/* Step 1: ICP */}
      <StepSection id="step-1" number={1} icon={Target} title="ICP: The Foundation of Everything" accent="#F97316">
        <div>
          <p className="text-base sm:text-lg font-black" style={{ color: "#0a0a0a" }}>Most teams skip this.</p>
          <p className="text-sm sm:text-base mt-1" style={{ color: "#3D3D3D" }}>But 80% of your lead gen improves instantly with a sharper ICP.</p>
        </div>

        <div className="rounded-xl border p-5 sm:p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
          <h3 className="flex items-center gap-2 text-base font-black mb-1" style={{ color: "#0a0a0a" }}>
            <Target className="w-5 h-5" style={{ color: "#F97316" }} strokeWidth={2.4} aria-hidden="true" />
            Identify NOW Buyers (not “everyone”)
          </h3>
          <p className="text-sm font-semibold mb-4" style={{ color: "#71675E" }}>People who:</p>
          <CheckList items={NOW_BUYERS} accent="#F97316" />
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-base font-black mb-3" style={{ color: "#0a0a0a" }}>
            <Puzzle className="w-5 h-5" style={{ color: "#F97316" }} strokeWidth={2.4} aria-hidden="true" />
            3-Layer ICP Filter
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ICP_LAYERS.map((l, i) => (
              <div key={l.label} className="rounded-xl p-5" style={{ backgroundColor: `rgba(249,115,22,${0.04 + l.tone * 0.12})`, border: `1px solid rgba(249,115,22,${0.15 + l.tone * 0.3})` }}>
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#9A3412" }}>Layer {i + 1}</span>
                <p className="text-base font-black mt-1" style={{ color: "#0a0a0a" }}>{l.label}</p>
                <p className="text-sm mt-1" style={{ color: "#3D3D3D" }}>{l.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-base font-black mb-3" style={{ color: "#0a0a0a" }}>
            <Search className="w-5 h-5" style={{ color: "#F97316" }} strokeWidth={2.4} aria-hidden="true" />
            Buying Triggers to Look For
          </h3>
          <div className="flex flex-wrap gap-2">
            {TRIGGERS.map((t) => (
              <span key={t} className="text-xs sm:text-[13px] font-semibold px-3 py-1.5 rounded-full inline-block" style={{ backgroundColor: "rgba(249,115,22,0.08)", color: "#9A3412", border: "1px solid rgba(249,115,22,0.3)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <Callout accent="#F97316">When your ICP is painfully clear, everything else becomes easier.</Callout>
      </StepSection>

      {/* Step 2: Positioning */}
      <StepSection id="step-2" number={2} icon={DoorOpen} title="Positioning That Opens Doors" accent="#16a34a">
        <p className="text-base sm:text-lg font-black leading-snug" style={{ color: "#0a0a0a" }}>
          People don’t reply to outreach - they reply to relevance.
        </p>

        <div>
          <Label>Your positioning must answer</Label>
          <div className="flex flex-wrap items-center gap-2">
            {["Who", "Pain", "Unique System", "Outcome"].map((w, i, arr) => (
              <span key={w} className="flex items-center gap-2">
                <span className="text-sm font-black px-4 py-2 rounded-lg" style={{ backgroundColor: "#F5B731", color: "#0A0A0A" }}>{w}</span>
                {i < arr.length - 1 && <span className="font-black" style={{ color: "#71675E" }}>+</span>}
              </span>
            ))}
          </div>
        </div>

        <div>
          <Label>Example</Label>
          <CopyBlock
            accent="#4ade80"
            label="Positioning example"
            successMessage="Copied to clipboard"
            text="We help B2B teams get 25-60 qualified meetings/month using AI-personalised LinkedIn outreach without increasing sales headcount."
          />
        </div>

        <Callout accent="#16a34a">Short. Sharp. Outcome-driven.</Callout>
      </StepSection>

      {/* Step 3: Warm-up */}
      <StepSection id="step-3" number={3} icon={Flame} title="Warm-Up Layer (The 40% Boost)" accent="#a855f7">
        <div>
          <p className="text-base sm:text-lg font-black" style={{ color: "#0a0a0a" }}>Most outreach fails because it’s cold.</p>
          <p className="text-sm sm:text-base mt-1" style={{ color: "#3D3D3D" }}>Warm them before you message.</p>
        </div>

        <div>
          <Label>Easy warm-up actions</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WARM_UPS.map((w, i) => {
              const Icon = w.icon;
              return (
                <div key={w.text} className={`flex items-center gap-3 rounded-xl border p-4 bg-white ${i === WARM_UPS.length - 1 ? "sm:col-span-2" : ""}`} style={{ borderColor: "#E8E2D9" }}>
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(168,85,247,0.1)", color: "#a855f7" }}>
                    <Icon className="w-5 h-5" strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <p className="text-sm sm:text-base font-bold leading-snug" style={{ color: "#0a0a0a" }}>{w.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <Callout accent="#a855f7">Warm leads reply more. Always.</Callout>
      </StepSection>

      {/* Step 4: The 5-message sequence */}
      <StepSection id="step-4" number={4} icon={MessagesSquare} title="The 5-Message Sequence That Gets Replies" accent={BLUE}>
        <p className="text-sm sm:text-base font-semibold" style={{ color: "#3D3D3D" }}>A clean, respectful, value-first sequence.</p>

        <ol className="space-y-4">
          {/* Message 0 */}
          <li className="rounded-xl border bg-white p-5 sm:p-6" style={{ borderColor: "#E8E2D9" }}>
            <MessageHead n={0} icon={UserPlus} title="Connection Note" />
            <CheckList items={["Relevance", "Light context", "No pitching", "No attachments"]} accent={BLUE} />
          </li>

          {/* Message 1 */}
          <li className="rounded-xl border bg-white p-5 sm:p-6" style={{ borderColor: "#E8E2D9" }}>
            <MessageHead n={1} icon={Lightbulb} title="Insight Drop" />
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#3D3D3D" }}>Share a mini takeaway relevant to their world.</p>
            <p className="text-sm sm:text-base leading-relaxed mt-1" style={{ color: "#3D3D3D" }}>Position yourself as someone who “gets it.”</p>
          </li>

          {/* Message 2 */}
          <li className="rounded-xl border bg-white p-5 sm:p-6" style={{ borderColor: "#E8E2D9" }}>
            <MessageHead n={2} icon={Blocks} title="Credibility Layer" />
            <p className="text-sm sm:text-base font-semibold mb-3" style={{ color: "#3D3D3D" }}>Make it niche-specific:</p>
            <CheckList items={["Similar industries", "Similar team size", "Similar role challenges"]} accent={BLUE} />
            <p className="text-sm sm:text-base leading-relaxed mt-4" style={{ color: "#3D3D3D" }}>
              No generic &ldquo;we have helped hundreds of companies.&rdquo; <span className="font-bold" style={{ color: "#0a0a0a" }}>Make it relatable.</span>
            </p>
          </li>

          {/* Message 3 */}
          <li className="rounded-xl border bg-white p-5 sm:p-6" style={{ borderColor: "#E8E2D9" }}>
            <MessageHead n={3} icon={Settings} title="System Snapshot" />
            <p className="text-sm sm:text-base font-semibold mb-3" style={{ color: "#3D3D3D" }}>Explain your process in one short line:</p>
            <CopyBlock accent="#38bdf8" label="Message 3" successMessage="Message copied to clipboard" text="How we use relevance scoring + AI personalisation to book meetings." />
          </li>

          {/* Message 4 */}
          <li className="rounded-xl border bg-white p-5 sm:p-6" style={{ borderColor: "#E8E2D9" }}>
            <MessageHead n={4} icon={ArrowRight} title="Soft CTA" />
            <p className="text-sm sm:text-base font-semibold mb-3" style={{ color: "#3D3D3D" }}>Light, respectful, and simple:</p>
            <CopyBlock accent="#38bdf8" label="Message 4" successMessage="Message copied to clipboard" text="Worth exploring for [company name]?" />
          </li>
        </ol>
      </StepSection>

      {/* Step 5: Follow-up stack */}
      <StepSection id="step-5" number={5} icon={Repeat} title="Follow-Up Stack (Where 70% of Deals Convert)" accent="#D97706">
        <div>
          <p className="text-base sm:text-lg font-black" style={{ color: "#0a0a0a" }}>People don’t ignore you.</p>
          <p className="text-sm sm:text-base mt-1" style={{ color: "#3D3D3D" }}>They’re just busy.</p>
        </div>

        <p className="text-sm sm:text-base font-semibold" style={{ color: "#3D3D3D" }}>Use these 4 follow-up formats:</p>

        <ol className="space-y-4">
          {FOLLOW_UPS.map((f, i) => {
            const Icon = f.icon;
            return (
              <li key={f.name} className="rounded-xl border bg-white p-5 sm:p-6" style={{ borderColor: "#E8E2D9" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-black" style={{ backgroundColor: "rgba(217,119,6,0.1)", color: "#A14A08" }}>{i + 1}</span>
                  <h3 className="flex items-center gap-2 text-base sm:text-lg font-black" style={{ color: "#0a0a0a" }}>
                    {f.name}
                    <Icon className="w-4 h-4" style={{ color: "#A14A08" }} strokeWidth={2.4} aria-hidden="true" />
                  </h3>
                </div>
                <CopyBlock accent="#fbbf24" label={`Follow-up ${i + 1}`} successMessage="Message copied to clipboard" text={f.text} />
              </li>
            );
          })}
        </ol>
      </StepSection>

      {/* Want more like this */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="rounded-2xl p-8 sm:p-12" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <h2 className="text-2xl sm:text-3xl font-black mb-2 text-[#0A0A0A] text-center">Want More Like This?</h2>
              <p className="text-sm sm:text-base text-center mb-7" style={{ color: "#52525B" }}>
                Follow{" "}
                <a href="https://www.instagram.com/tejas_jhaveri/" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4" style={{ color: "#A14A08" }}>@tejas_jhaveri</a>{" "}
                on Instagram for:
              </p>
              <ul className="space-y-2.5 max-w-md mx-auto mb-9">
                {["Hidden AI tools you can actually use", "Insider tech updates made simple", "Real marketing + growth hacks powered by AI"].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm sm:text-base font-semibold text-[#0A0A0A]">
                    <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: "#A14A08" }} strokeWidth={2.5} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/book-a-call" className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5" style={{ backgroundColor: "#F5B731", color: "#0a0a0a" }}>
                  <CalendarDays className="w-4 h-4" aria-hidden="true" />
                  Book a complimentary strategy call
                </Link>
                <a href="mailto:founder@myntmore.com" className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-bold text-[#0A0A0A] transition-colors hover:bg-[#F8F6F2]" style={{ borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  founder@myntmore.com
                </a>
              </div>
              <p className="text-xs sm:text-sm text-center mt-6" style={{ color: "#52525B" }}>
                Reach out and let’s break it down for your business.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
              <p className="font-semibold" style={{ color: "#52525B" }}>Want this run for you?</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 font-bold">
                <Link href="/services/linkedin-outreach" className="underline underline-offset-4 decoration-2" style={{ color: "#0a0a0a", textDecorationColor: BLUE }}>LinkedIn outreach service</Link>
                <Link href="/resources/guides/leads-on-autopilot-guide" className="underline underline-offset-4 decoration-2" style={{ color: "#0a0a0a", textDecorationColor: BLUE }}>Leads on Autopilot guide</Link>
                <Link href="/resources/guides" className="underline underline-offset-4 decoration-2" style={{ color: "#0a0a0a", textDecorationColor: BLUE }}>All guides</Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </InnerLayout>
  );
}

function MessageHead({ n, icon: Icon, title }: { n: number; icon: LucideIcon; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: BLUE }}>
        <Icon className="w-5 h-5" strokeWidth={2.2} aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs font-black uppercase tracking-widest" style={{ color: BLUE }}>Message {n}</p>
        <h3 className="text-base sm:text-lg font-black leading-tight" style={{ color: "#0a0a0a" }}>{title}</h3>
      </div>
    </div>
  );
}
