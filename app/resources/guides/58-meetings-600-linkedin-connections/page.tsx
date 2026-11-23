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
import pageCopy from "@/content/page-copy/guide58Meetings600LinkedinConnections.json";

// This page's text is edited in the admin ("58 Meetings Booked from 600 LinkedIn Connections in 1 Month") and lives in content/page-copy/guide58Meetings600LinkedinConnections.json.
const copy = pageCopy;

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
  { v: "58", l: copy.s01.t01 },
  { v: "600", l: copy.s01.t02 },
  { v: "1", l: copy.s01.t03 },
  { v: "5", l: copy.s01.t04 },
];

const STEPS_AT_A_GLANCE = ["ICP", "Positioning", "Warm-up", "5-message sequence", copy.s01.t05];

const NOW_BUYERS = [
  copy.s01.t06,
  copy.s01.t07,
  copy.s01.t08,
  copy.s01.t09,
  copy.s01.t10,
];

const ICP_LAYERS = [
  { label: copy.s01.t11, text: copy.s01.t12, tone: 1 },
  { label: copy.s01.t13, text: copy.s01.t14, tone: 0.6 },
  { label: copy.s01.t15, text: copy.s01.t16, tone: 0.3 },
];

const TRIGGERS = [copy.s01.t17, copy.s01.t18, copy.s01.t19, copy.s01.t20, "Fundraise"];

const WARM_UPS: { icon: LucideIcon; text: string }[] = [
  { icon: Eye, text: copy.s01.t21 },
  { icon: Heart, text: copy.s01.t22 },
  { icon: MessageCircle, text: copy.s01.t23 },
  { icon: Bell, text: copy.s01.t24 },
  { icon: Bookmark, text: copy.s01.t25 },
];

const FOLLOW_UPS: { icon: LucideIcon; name: string; text: string }[] = [
  { icon: RefreshCw, name: copy.s01.t26, text: copy.s01.t27 },
  { icon: Gift, name: copy.s01.t28, text: copy.s01.t29 },
  { icon: Target, name: copy.s01.t30, text: copy.s01.t31 },
  { icon: Video, name: copy.s01.t32, text: copy.s01.t33 },
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
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: `${accent}14`, color: textTone(accent), border: `1px solid ${accent}30` }}>{copy.s01.t34}{number}
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
          <Breadcrumbs items={[{ label: copy.s01.t35, href: "/resources" }, { label: copy.s01.t36, href: "/resources/guides" }, { label: copy.s01.t37, href: "/resources/guides/58-meetings-600-linkedin-connections" }]} />
          <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 hero-fade" style={{ backgroundColor: "#E8F3FA", color: textTone(BLUE), border: `1px solid ${BLUE}4D` }}>{copy.s01.t38}</span>
          <h1 className="text-4xl sm:text-5xl font-black mb-5 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>{copy.s01.t39}{" "}
            <span className="relative inline-block">{copy.s01.t40}<Underline color={BLUE} />
            </span>
          </h1>
          <ArticleMeta schema={ARTICLE_SCHEMA} />
          <p className="text-base sm:text-lg font-semibold mb-5 hero-fade-d1" style={{ color: BLUE }}>{copy.s01.t41}</p>
          <p className="text-base leading-relaxed hero-fade-d2 mb-8" style={{ color: "#52525B" }}>
            <a href="https://www.linkedin.com/in/tejasjhaveri/" target="_blank" rel="noopener noreferrer" className="link-subtle font-semibold" style={{ color: "#0a0a0a" }}>{copy.s01.t42}</a>{" "}{copy.s01.t43}{" "}
            <a href="https://www.myntmore.com/" className="link-subtle font-semibold" style={{ color: "#0a0a0a" }}>{copy.s01.t44}</a>{copy.s01.t45}</p>

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
              <span className="text-xs font-bold uppercase tracking-widest mr-1" style={{ color: "#71675E" }}>{copy.s01.t46}</span>
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
      <StepSection id="step-1" number={1} icon={Target} title={copy.s01.t47} accent="#F97316">
        <div>
          <p className="text-base sm:text-lg font-black" style={{ color: "#0a0a0a" }}>{copy.s01.t48}</p>
          <p className="text-sm sm:text-base mt-1" style={{ color: "#3D3D3D" }}>{copy.s01.t49}</p>
        </div>

        <div className="rounded-xl border p-5 sm:p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
          <h3 className="flex items-center gap-2 text-base font-black mb-1" style={{ color: "#0a0a0a" }}>
            <Target className="w-5 h-5" style={{ color: "#F97316" }} strokeWidth={2.4} aria-hidden="true" />{copy.s02.t01}</h3>
          <p className="text-sm font-semibold mb-4" style={{ color: "#71675E" }}>{copy.s02.t02}</p>
          <CheckList items={NOW_BUYERS} accent="#F97316" />
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-base font-black mb-3" style={{ color: "#0a0a0a" }}>
            <Puzzle className="w-5 h-5" style={{ color: "#F97316" }} strokeWidth={2.4} aria-hidden="true" />{copy.s03.t01}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ICP_LAYERS.map((l, i) => (
              <div key={l.label} className="rounded-xl p-5" style={{ backgroundColor: `rgba(249,115,22,${0.04 + l.tone * 0.12})`, border: `1px solid rgba(249,115,22,${0.15 + l.tone * 0.3})` }}>
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#9A3412" }}>{copy.s03.t02}{i + 1}</span>
                <p className="text-base font-black mt-1" style={{ color: "#0a0a0a" }}>{l.label}</p>
                <p className="text-sm mt-1" style={{ color: "#3D3D3D" }}>{l.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-base font-black mb-3" style={{ color: "#0a0a0a" }}>
            <Search className="w-5 h-5" style={{ color: "#F97316" }} strokeWidth={2.4} aria-hidden="true" />{copy.s04.t01}</h3>
          <div className="flex flex-wrap gap-2">
            {TRIGGERS.map((t) => (
              <span key={t} className="text-xs sm:text-[13px] font-semibold px-3 py-1.5 rounded-full inline-block" style={{ backgroundColor: "rgba(249,115,22,0.08)", color: "#9A3412", border: "1px solid rgba(249,115,22,0.3)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <Callout accent="#F97316">{copy.s04.t02}</Callout>
      </StepSection>

      {/* Step 2: Positioning */}
      <StepSection id="step-2" number={2} icon={DoorOpen} title={copy.s04.t03} accent="#16a34a">
        <p className="text-base sm:text-lg font-black leading-snug" style={{ color: "#0a0a0a" }}>{copy.s04.t04}</p>

        <div>
          <Label>{copy.s04.t05}</Label>
          <div className="flex flex-wrap items-center gap-2">
            {["Who", "Pain", copy.s04.t06, "Outcome"].map((w, i, arr) => (
              <span key={w} className="flex items-center gap-2">
                <span className="text-sm font-black px-4 py-2 rounded-lg" style={{ backgroundColor: "#F5B731", color: "#0A0A0A" }}>{w}</span>
                {i < arr.length - 1 && <span className="font-black" style={{ color: "#71675E" }}>+</span>}
              </span>
            ))}
          </div>
        </div>

        <div>
          <Label>{copy.s04.t07}</Label>
          <CopyBlock
            accent="#4ade80"
            label="Positioning example"
            successMessage="Copied to clipboard"
            text="We help B2B teams get 25-60 qualified meetings/month using AI-personalised LinkedIn outreach without increasing sales headcount."
          />
        </div>

        <Callout accent="#16a34a">{copy.s04.t08}</Callout>
      </StepSection>

      {/* Step 3: Warm-up */}
      <StepSection id="step-3" number={3} icon={Flame} title={copy.s04.t09} accent="#a855f7">
        <div>
          <p className="text-base sm:text-lg font-black" style={{ color: "#0a0a0a" }}>{copy.s04.t10}</p>
          <p className="text-sm sm:text-base mt-1" style={{ color: "#3D3D3D" }}>{copy.s04.t11}</p>
        </div>

        <div>
          <Label>{copy.s04.t12}</Label>
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

        <Callout accent="#a855f7">{copy.s04.t13}</Callout>
      </StepSection>

      {/* Step 4: The 5-message sequence */}
      <StepSection id="step-4" number={4} icon={MessagesSquare} title={copy.s04.t14} accent={BLUE}>
        <p className="text-sm sm:text-base font-semibold" style={{ color: "#3D3D3D" }}>{copy.s04.t15}</p>

        <ol className="space-y-4">
          {/* Message 0 */}
          <li className="rounded-xl border bg-white p-5 sm:p-6" style={{ borderColor: "#E8E2D9" }}>
            <MessageHead n={0} icon={UserPlus} title={copy.s04.t16} />
            <CheckList items={["Relevance", copy.s04.t17, copy.s04.t18, copy.s04.t19]} accent={BLUE} />
          </li>

          {/* Message 1 */}
          <li className="rounded-xl border bg-white p-5 sm:p-6" style={{ borderColor: "#E8E2D9" }}>
            <MessageHead n={1} icon={Lightbulb} title={copy.s04.t20} />
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s04.t21}</p>
            <p className="text-sm sm:text-base leading-relaxed mt-1" style={{ color: "#3D3D3D" }}>{copy.s04.t22}</p>
          </li>

          {/* Message 2 */}
          <li className="rounded-xl border bg-white p-5 sm:p-6" style={{ borderColor: "#E8E2D9" }}>
            <MessageHead n={2} icon={Blocks} title={copy.s04.t23} />
            <p className="text-sm sm:text-base font-semibold mb-3" style={{ color: "#3D3D3D" }}>{copy.s04.t24}</p>
            <CheckList items={[copy.s04.t25, copy.s04.t26, copy.s04.t27]} accent={BLUE} />
            <p className="text-sm sm:text-base leading-relaxed mt-4" style={{ color: "#3D3D3D" }}>{copy.s04.t28}<span className="font-bold" style={{ color: "#0a0a0a" }}>{copy.s04.t29}</span>
            </p>
          </li>

          {/* Message 3 */}
          <li className="rounded-xl border bg-white p-5 sm:p-6" style={{ borderColor: "#E8E2D9" }}>
            <MessageHead n={3} icon={Settings} title={copy.s04.t30} />
            <p className="text-sm sm:text-base font-semibold mb-3" style={{ color: "#3D3D3D" }}>{copy.s04.t31}</p>
            <CopyBlock accent="#38bdf8" label="Message 3" successMessage="Message copied to clipboard" text="How we use relevance scoring + AI personalisation to book meetings." />
          </li>

          {/* Message 4 */}
          <li className="rounded-xl border bg-white p-5 sm:p-6" style={{ borderColor: "#E8E2D9" }}>
            <MessageHead n={4} icon={ArrowRight} title={copy.s04.t32} />
            <p className="text-sm sm:text-base font-semibold mb-3" style={{ color: "#3D3D3D" }}>{copy.s04.t33}</p>
            <CopyBlock accent="#38bdf8" label="Message 4" successMessage="Message copied to clipboard" text="Worth exploring for [company name]?" />
          </li>
        </ol>
      </StepSection>

      {/* Step 5: Follow-up stack */}
      <StepSection id="step-5" number={5} icon={Repeat} title={copy.s04.t34} accent="#D97706">
        <div>
          <p className="text-base sm:text-lg font-black" style={{ color: "#0a0a0a" }}>{copy.s04.t35}</p>
          <p className="text-sm sm:text-base mt-1" style={{ color: "#3D3D3D" }}>{copy.s04.t36}</p>
        </div>

        <p className="text-sm sm:text-base font-semibold" style={{ color: "#3D3D3D" }}>{copy.s04.t37}</p>

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
              <h2 className="text-2xl sm:text-3xl font-black mb-2 text-[#0A0A0A] text-center">{copy.s05.t01}</h2>
              <p className="text-sm sm:text-base text-center mb-7" style={{ color: "#52525B" }}>{copy.s05.t02}{" "}
                <a href="https://www.instagram.com/tejas_jhaveri/" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4" style={{ color: "#A14A08" }}>{copy.s05.t03}</a>{" "}{copy.s05.t04}</p>
              <ul className="space-y-2.5 max-w-md mx-auto mb-9">
                {[copy.s05.t05, copy.s05.t06, copy.s05.t07].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm sm:text-base font-semibold text-[#0A0A0A]">
                    <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: "#A14A08" }} strokeWidth={2.5} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/book-a-call" className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5" style={{ backgroundColor: "#F5B731", color: "#0a0a0a" }}>
                  <CalendarDays className="w-4 h-4" aria-hidden="true" />{copy.s05.t08}</Link>
                <a href="mailto:founder@myntmore.com" className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-bold text-[#0A0A0A] transition-colors hover:bg-[#F8F6F2]" style={{ borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>
                  <Mail className="w-4 h-4" aria-hidden="true" />{copy.s05.t09}</a>
              </div>
              <p className="text-xs sm:text-sm text-center mt-6" style={{ color: "#52525B" }}>{copy.s05.t10}</p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
              <p className="font-semibold" style={{ color: "#52525B" }}>{copy.s05.t11}</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 font-bold">
                <Link href="/services/linkedin-outreach" className="underline underline-offset-4 decoration-2" style={{ color: "#0a0a0a", textDecorationColor: BLUE }}>{copy.s05.t12}</Link>
                <Link href="/resources/guides/leads-on-autopilot-guide" className="underline underline-offset-4 decoration-2" style={{ color: "#0a0a0a", textDecorationColor: BLUE }}>{copy.s05.t13}</Link>
                <Link href="/resources/guides" className="underline underline-offset-4 decoration-2" style={{ color: "#0a0a0a", textDecorationColor: BLUE }}>{copy.s05.t14}</Link>
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
        <p className="text-xs font-black uppercase tracking-widest" style={{ color: BLUE }}>{copy.s05.t15}{n}</p>
        <h3 className="text-base sm:text-lg font-black leading-tight" style={{ color: "#0a0a0a" }}>{title}</h3>
      </div>
    </div>
  );
}
