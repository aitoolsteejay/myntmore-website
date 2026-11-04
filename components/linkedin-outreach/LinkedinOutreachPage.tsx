import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarClock,
  Check,
  DoorOpen,
  Eye,
  KeyRound,
  MessagesSquare,
  PenLine,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  X,
  Handshake,
  Zap,
  type LucideIcon,
} from "lucide-react";
import InnerLayout from "@/app/components/InnerLayout";
import FadeIn from "@/app/components/FadeIn";
import StatTicker from "@/app/components/StatTicker";
import Faq from "@/app/lp/Faq";
import JsonLd from "@/app/components/JsonLd";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import AnswerBlock from "@/app/components/AnswerBlock";
import RelatedPath from "@/app/components/RelatedPath";
import { SERVICE_PATHS } from "@/lib/internal-paths";
import Underline from "@/app/resources/guides/how-to-set-up-vibe-prospecting/Underline";
import { buildFaqSchema, buildHowToSchema, buildServiceSchema, SITE_URL } from "@/lib/schema";
import LinkedinFlowVisual from "./LinkedinFlowVisual";
import AgentExplorer from "./AgentExplorer";
import InView from "./InView";
import { BLUE, BLUE_LIGHT, BLUE_PALE, BODY, CREAM, GOLD, INK, LINE, MUTED, SOFT_LINE } from "./theme";
import { pageFaqsQA } from "@/lib/page-faqs";
import d from "@/content/service-copy/linkedin-outreach.json";

// LinkedIn outreach service page: the same design language as the cold email
// page, with LinkedIn blue as the accent. It carries no pricing or plans.

const CALENDAR = "/book-a-call";

const STATS = d.numbers.stats;

const PILLS = d.numbers.pills;

const COMPARE = d.comparison.rows;

const INCLUDED_ICONS: LucideIcon[] = [Users, Target, CalendarClock, UserCheck, PenLine, Send, MessagesSquare, BarChart3];
const INCLUDED = d.included.items.map((item, i) => ({ ...item, icon: INCLUDED_ICONS[i] }));

const STEPS = d.process.steps.map((s) => ({ n: s.number, title: s.title, text: s.text }));

const NOTE_ICONS: LucideIcon[] = [ShieldCheck, Sparkles, RefreshCw, Building2, TrendingUp];
const NOTES = d.beforeWeStart.notes.map((n, i) => ({ ...n, icon: NOTE_ICONS[i] }));

const OUTCOME_ICONS: LucideIcon[] = [Zap, Eye, Target, Handshake, BadgeCheck, TrendingUp];
const OUTCOMES = d.outcomes.items.map((o, i) => ({ ...o, icon: OUTCOME_ICONS[i] }));

const FAQS = pageFaqsQA("service-linkedin-outreach");

const FOUNDER_STATS = d.founder.stats;

// The four steps below are the visible "How it works" timeline on this page,
// so the schema describes content the visitor can actually read.
const HOWTO_SCHEMA = buildHowToSchema(
  d.schema.howToName,
  STEPS.map((s) => ({ name: s.title, text: s.text }))
);
const FAQ_SCHEMA = buildFaqSchema(FAQS.map(({ q, a }) => ({ question: q, answer: a })));
const SERVICE_SCHEMA = buildServiceSchema({
  name: d.schema.serviceName,
  description: d.schema.serviceDescription,
  serviceType: d.schema.serviceType,
  url: `${SITE_URL}/services/linkedin-outreach`,
});

function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p className="mb-3 text-xs font-black uppercase tracking-[0.3em]" style={{ color: light ? "#A14A08" : BLUE }}>
      {children}
    </p>
  );
}

const h2Style = { letterSpacing: "-0.035em", lineHeight: 1.04 } as const;

function Tick({ muted }: { muted?: boolean }) {
  return (
    <span className="grid h-7 w-7 place-items-center rounded-full" style={muted ? { backgroundColor: "#EEF0F2", color: "#9AA3AD" } : { background: `linear-gradient(135deg, ${BLUE}, ${BLUE_LIGHT})`, color: "#fff", boxShadow: "0 6px 14px rgba(10,102,194,0.3)" }}>
      <Check className="h-4 w-4" strokeWidth={3.2} aria-hidden="true" />
      <span className="sr-only">{muted ? "Included" : "Included by Myntmore"}</span>
    </span>
  );
}

function Cross() {
  return (
    <span className="grid h-7 w-7 place-items-center rounded-full" style={{ backgroundColor: "#FDECEC", color: "#DC2626" }}>
      <X className="h-4 w-4" strokeWidth={3.2} aria-hidden="true" />
      <span className="sr-only">Not included</span>
    </span>
  );
}

export default function LinkedinOutreachPage() {
  return (
    <InnerLayout>
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={HOWTO_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <style>{`
        .li-tl-line { transform-origin: left center; transform: scaleX(0); transition: transform 1.7s cubic-bezier(.4,0,.2,1) .2s; }
        [data-inview=true] .li-tl-line { transform: scaleX(1); }
        .li-tl-badge { background: #fff; color: ${MUTED}; border: 2px solid #DCE3EA; transform: scale(.82); transition: transform .55s cubic-bezier(.22,1,.36,1), background .4s ease, color .4s ease, border-color .4s ease, box-shadow .4s ease; transition-delay: calc(var(--i) * .38s + .35s); }
        [data-inview=true] .li-tl-badge { background: linear-gradient(135deg, ${BLUE}, #1D6FD4); color: #fff; border-color: transparent; transform: scale(1); box-shadow: 0 12px 26px rgba(10,102,194,.32); }
        .li-bar-fill { transform-origin: left center; transform: scaleX(0); transition: transform 1.5s cubic-bezier(.4,0,.2,1) .5s; }
        [data-inview=true] .li-bar-fill { transform: scaleX(1); }
        @keyframes li-ping { 0% { transform: scale(1); opacity: .5; } 75%, 100% { transform: scale(1.9); opacity: 0; } }
        .li-ping { animation: li-ping 2.4s cubic-bezier(0, 0, .2, 1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .li-tl-line, .li-bar-fill { transition: none; transform: none; }
          .li-tl-badge { transition: none; transform: none; background: linear-gradient(135deg, ${BLUE}, #1D6FD4); color: #fff; border-color: transparent; }
          .li-ping { animation: none; display: none; }
        }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-28 pt-32 sm:pb-32" style={{ backgroundColor: CREAM }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(10,102,194,0.2),rgba(10,102,194,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,183,49,0.24),rgba(167,139,250,0.08) 45%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="hero-fade">
            <Breadcrumbs items={[{ label: d.hero.breadcrumbServices, href: "/services" }, { label: d.hero.breadcrumbPage, href: "/services/linkedin-outreach" }]} />
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="hero-fade mb-7 inline-flex items-center gap-2.5 rounded-full border bg-white/70 px-5 py-2 backdrop-blur" style={{ borderColor: "rgba(10,102,194,0.35)" }}>
                <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: BLUE }} />
                <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.3em]" style={{ color: INK }}>{d.hero.badge}</span>
              </div>
              <h1 className="hero-fade-d1 font-black" style={{ color: INK, fontSize: "clamp(2.5rem, 6.1vw, 4.3rem)", lineHeight: 0.98, letterSpacing: "-0.045em" }}>
                {d.hero.headlineStart}
                <br className="hidden sm:block" />{` ${d.hero.headlineBeforeEm}`}{" "}
                <span className="relative inline-block italic" style={{ color: BLUE }}>
                  {d.hero.headlineEm}
                  <Underline color={GOLD} />
                </span>{" "}
                {d.hero.headlineAfterEm}<span style={{ color: GOLD }}>.</span>
              </h1>
              <p className="hero-fade-d2 mt-7 max-w-lg text-lg font-medium sm:text-xl" style={{ color: "#3b3b45", lineHeight: 1.4 }}>
                {d.hero.subhead}
              </p>
              <div className="hero-fade-d2 mt-9 flex flex-wrap gap-3">
                <Link href={CALENDAR} className="btn-dark inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold">
                  {`${d.hero.primaryCtaLabel} `}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href="#agents" className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-7 py-3.5 text-sm font-bold backdrop-blur transition-colors hover:border-[#0A66C2]" style={{ borderColor: "#E8E2D9", color: INK }}>
                  {d.hero.secondaryCtaLabel}
                </a>
              </div>
            </div>
            <LinkedinFlowVisual />
          </div>
        </div>
      </section>

      <AnswerBlock slug="linkedin-outreach" accent={BLUE} />

      {/* Numbers */}
      <section className="relative z-20 -mt-14 px-4 sm:-mt-16" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border md:grid-cols-4" style={{ borderColor: SOFT_LINE, backgroundColor: "#E6EDF5", boxShadow: "0 30px 80px rgba(15,15,20,0.09)" }}>
              {STATS.map((s) => (
                <div key={s.label} className="bg-white px-6 py-7 sm:px-8 sm:py-9">
                  <p className="text-4xl font-black md:text-[2.3rem] lg:text-5xl" style={{ color: INK, letterSpacing: "-0.045em" }}>
                    <StatTicker value={s.value} />
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-snug" style={{ color: "#6b655e" }}>{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {PILLS.map((t) => (
                <span key={t} className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-bold" style={{ borderColor: SOFT_LINE, color: INK }}>
                  <BadgeCheck className="h-4 w-4" style={{ color: BLUE }} aria-hidden="true" />
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Reputation + pipeline */}
      <section className="px-4 py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-12 max-w-2xl">
              <Eyebrow>{d.reputation.eyebrow}</Eyebrow>
              <h2 className="text-4xl font-black sm:text-5xl" style={{ color: INK, ...h2Style }}>
                {`${d.reputation.headlineStart} `}<span className="italic" style={{ color: BLUE }}>{d.reputation.headlineEm}</span>
              </h2>
              <p className="mt-4 text-lg" style={{ color: BODY }}>{d.reputation.subhead}</p>
            </div>
          </FadeIn>
          <div className="grid items-stretch gap-5 md:grid-cols-[1fr_auto_1fr]">
            <FadeIn className="h-full">
              <div className="relative h-full overflow-hidden rounded-[26px] border bg-white p-8" style={{ borderColor: SOFT_LINE, boxShadow: "0 18px 50px rgba(15,15,20,0.05)" }}>
                <span aria-hidden="true" className="pointer-events-none absolute right-7 top-6 select-none text-[4.5rem] font-black leading-none" style={{ color: "rgba(10,102,194,0.1)", letterSpacing: "-0.06em" }}>{d.reputation.cards[0].number}</span>
                <span className="relative mb-6 grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_LIGHT})`, boxShadow: "0 14px 30px rgba(10,102,194,0.28)" }}>
                  <DoorOpen className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
                </span>
                <p className="relative text-xs font-black uppercase tracking-[0.24em]" style={{ color: BLUE }}>{d.reputation.cards[0].eyebrow}</p>
                <h3 className="relative mt-1 text-2xl font-black" style={{ color: INK, letterSpacing: "-0.03em" }}>{d.reputation.cards[0].title}</h3>
                <p className="relative mt-2 text-base leading-relaxed" style={{ color: BODY }}>{d.reputation.cards[0].text}</p>
              </div>
            </FadeIn>
            <div className="hidden items-center justify-center md:flex" aria-hidden="true">
              <span className="relative grid h-14 w-14 place-items-center rounded-full" style={{ background: GOLD, color: INK }}>
                <span className="li-ping absolute inset-0 rounded-full" style={{ backgroundColor: BLUE }} />
                <ArrowRight className="relative h-6 w-6" strokeWidth={2.4} />
              </span>
            </div>
            <FadeIn delay={120} className="h-full">
              <div className="relative h-full overflow-hidden rounded-[26px] border bg-white p-8" style={{ borderColor: SOFT_LINE, boxShadow: "0 18px 50px rgba(15,15,20,0.05)" }}>
                <span aria-hidden="true" className="pointer-events-none absolute right-7 top-6 select-none text-[4.5rem] font-black leading-none" style={{ color: "rgba(245,183,49,0.2)", letterSpacing: "-0.06em" }}>{d.reputation.cards[1].number}</span>
                <span className="relative mb-6 grid h-14 w-14 place-items-center rounded-2xl" style={{ background: `linear-gradient(135deg, ${GOLD}, #f59e0b)`, color: INK, boxShadow: "0 14px 30px rgba(245,183,49,0.35)" }}>
                  <KeyRound className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
                </span>
                <p className="relative text-xs font-black uppercase tracking-[0.24em]" style={{ color: "#A14A08" }}>{d.reputation.cards[1].eyebrow}</p>
                <h3 className="relative mt-1 text-2xl font-black" style={{ color: INK, letterSpacing: "-0.03em" }}>{d.reputation.cards[1].title}</h3>
                <p className="relative mt-2 text-base leading-relaxed" style={{ color: BODY }}>{d.reputation.cards[1].text}</p>
              </div>
            </FadeIn>
          </div>
          <FadeIn>
            <p className="mt-12 text-center text-xl font-black sm:text-2xl" style={{ color: INK, letterSpacing: "-0.02em" }}>
              {`${d.reputation.closingStart} `}<span className="italic" style={{ color: BLUE }}>{d.reputation.closingEm}</span>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Comparison */}
      <section className="border-y px-4 py-24" style={{ backgroundColor: "#ffffff", borderColor: SOFT_LINE }}>
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <div className="mb-10 max-w-2xl">
              <Eyebrow>{d.comparison.eyebrow}</Eyebrow>
              <h2 className="text-4xl font-black sm:text-5xl" style={{ color: INK, ...h2Style }}>
                {`${d.comparison.headlineStart} `}<span className="italic" style={{ color: BLUE }}>{d.comparison.headlineEm}</span>
              </h2>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="overflow-hidden rounded-[28px] border" style={{ borderColor: SOFT_LINE, boxShadow: "0 24px 70px rgba(15,15,20,0.06)" }}>
              <div className="grid grid-cols-[1fr_84px_84px] items-center sm:grid-cols-[1fr_150px_150px]" style={{ backgroundColor: "#FAF8F4" }}>
                <p className="px-4 py-4 text-xs font-black uppercase tracking-[0.22em] sm:px-6" style={{ color: MUTED }}>{d.comparison.columnWhatYouGet}</p>
                <div className="flex justify-center py-3" style={{ backgroundColor: "rgba(10,102,194,0.08)" }}>
                  <span className="rounded-full px-3 py-1 text-xs font-black text-white" style={{ background: `linear-gradient(135deg, ${BLUE}, #1D6FD4)` }}>{d.comparison.columnMyntmore}</span>
                </div>
                <p className="px-1 py-4 text-center text-xs font-black uppercase leading-tight tracking-[0.12em]" style={{ color: MUTED }}>{d.comparison.columnOthers}</p>
              </div>
              {COMPARE.map((row, i) => (
                <div key={row.label}>
                  {(i === 0 || i === 3) && (
                    <div className="border-t px-4 py-2 text-xs font-black uppercase tracking-[0.22em] sm:px-6" style={{ backgroundColor: i === 0 ? "#fff" : BLUE_PALE, borderColor: SOFT_LINE, color: i === 0 ? MUTED : BLUE }}>
                      {i === 0 ? d.comparison.basicsGroupLabel : d.comparison.skippedGroupLabel}
                    </div>
                  )}
                  <FadeIn delay={(i % 8) * 40}>
                    <div className="grid grid-cols-[1fr_84px_84px] items-center border-t sm:grid-cols-[1fr_150px_150px]" style={{ borderColor: SOFT_LINE }}>
                      <p className="px-4 py-4 text-sm font-bold sm:px-6" style={{ color: INK }}>{row.label}</p>
                      <div className="flex justify-center self-stretch py-4" style={{ backgroundColor: "rgba(10,102,194,0.05)" }}>
                        <Tick />
                      </div>
                      <div className="flex justify-center py-4">{row.othersDoIt ? <Tick muted /> : <Cross />}</div>
                    </div>
                  </FadeIn>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* AI agents */}
      <section id="agents" className="scroll-mt-20 px-4 py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-10 max-w-2xl">
              <Eyebrow>{d.agents.eyebrow}</Eyebrow>
              <h2 className="text-4xl font-black sm:text-5xl" style={{ color: INK, ...h2Style }}>
                {`${d.agents.headlineStart} `}<span className="italic" style={{ color: BLUE }}>{d.agents.headlineEm}</span>
              </h2>
              <p className="mt-4 text-lg" style={{ color: BODY }}>{d.agents.subhead}</p>
            </div>
          </FadeIn>
          <AgentExplorer />
          <FadeIn>
            <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border bg-white px-6 py-5 sm:flex-row sm:items-center" style={{ borderColor: SOFT_LINE }}>
              <p className="max-w-xl text-sm font-semibold leading-relaxed" style={{ color: BODY }}>
                {d.agents.footerText}
              </p>
              <Link href={d.agents.footerLinkHref} className="inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm font-black underline decoration-2 underline-offset-4 transition-colors hover:text-[#0A66C2]" style={{ color: INK, textDecorationColor: GOLD }}>
                {`${d.agents.footerLinkLabel} `}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What's included */}
      <section className="border-y px-4 py-24" style={{ backgroundColor: "#ffffff", borderColor: SOFT_LINE }}>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-12 max-w-2xl">
              <Eyebrow>{d.included.eyebrow}</Eyebrow>
              <h2 className="text-4xl font-black sm:text-5xl" style={{ color: INK, ...h2Style }}>
                {`${d.included.headlineStart} `}<span className="italic" style={{ color: BLUE }}>{d.included.headlineEm}</span>
              </h2>
              <p className="mt-4 text-lg" style={{ color: BODY }}>{d.included.subhead}</p>
            </div>
          </FadeIn>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.label} delay={(i % 4) * 70} className="h-full">
                  <div className="group flex h-full min-h-[176px] flex-col justify-between rounded-[22px] border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0A66C2]" style={{ borderColor: SOFT_LINE, backgroundColor: "#FBFCFE" }}>
                    <span className="grid h-11 w-11 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: BLUE_PALE, color: BLUE }}>
                      <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    <div className="mt-6">
                      <p className="text-base font-black leading-snug" style={{ color: INK, letterSpacing: "-0.01em" }}>{item.label}</p>
                      <p className="mt-1.5 text-sm leading-snug" style={{ color: BODY }}>{item.text}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* How we run it */}
      <section className="px-4 py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-14 max-w-2xl">
              <Eyebrow>{d.process.eyebrow}</Eyebrow>
              <h2 className="text-4xl font-black sm:text-5xl" style={{ color: INK, ...h2Style }}>
                {`${d.process.headlineStart} `}<span className="italic" style={{ color: BLUE }}>{d.process.headlineEm}</span>
              </h2>
            </div>
          </FadeIn>
          <InView className="relative">
            <div aria-hidden="true" className="li-tl-line absolute left-[12.5%] right-[12.5%] top-[27px] hidden h-[3px] rounded-full md:block" style={{ background: `linear-gradient(90deg, ${BLUE}, ${GOLD})` }} />
            <ol className="grid gap-6 md:grid-cols-4">
              {STEPS.map((s, i) => (
                <li key={s.n} className="relative flex flex-col items-center text-center">
                  <span className="li-tl-badge relative z-10 grid h-14 w-14 place-items-center rounded-full text-base font-black" style={{ "--i": i } as CSSProperties}>
                    {s.n}
                  </span>
                  <div className="mt-5 h-full w-full rounded-[22px] border bg-white p-6" style={{ borderColor: SOFT_LINE, boxShadow: "0 18px 50px rgba(15,15,20,0.05)" }}>
                    <h3 className="text-lg font-black" style={{ color: INK, letterSpacing: "-0.02em" }}>{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </InView>
          <FadeIn>
            <p className="mt-10 text-center text-sm font-semibold" style={{ color: BODY }}>
              {d.process.playbookIntro}{" "}
              <Link href={d.process.playbookLinkHref} className="font-black underline decoration-2 underline-offset-4 transition-colors hover:text-[#0A66C2]" style={{ color: INK, textDecorationColor: GOLD }}>
                {d.process.playbookLinkLabel}
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Before we start */}
      <section className="relative overflow-hidden px-4 py-24" style={{ backgroundColor: "#FEF9EC" }}>
        <div aria-hidden="true" className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(245,183,49,0.14), transparent 70%)", filter: "blur(50px)" }} />
        <div className="relative mx-auto max-w-6xl">
          <FadeIn>
            <Eyebrow light>{d.beforeWeStart.eyebrow}</Eyebrow>
            <h2 className="max-w-xl text-4xl font-black sm:text-5xl" style={{ ...h2Style, color: INK }}>
              {`${d.beforeWeStart.headlineStart} `}<span className="italic" style={{ color: "#A14A08" }}>{d.beforeWeStart.headlineEm}</span>
            </h2>
          </FadeIn>
          <FadeIn>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[26px] sm:grid-cols-2 lg:grid-cols-3" style={{ backgroundColor: LINE, border: `1px solid ${LINE}` }}>
              {NOTES.map((n) => {
                const Icon = n.icon;
                return (
                  <div key={n.title} className="p-8" style={{ backgroundColor: "#FFFFFF" }}>
                    <span className="mb-6 grid h-12 w-12 place-items-center rounded-full border" style={{ borderColor: "rgba(245,183,49,0.5)", color: "#A14A08" }}>
                      <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-black" style={{ letterSpacing: "-0.02em", color: INK }}>{n.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: BODY }}>{n.text}</p>
                  </div>
                );
              })}
              <InView className="flex flex-col justify-between p-8" style={{ background: `linear-gradient(135deg, ${GOLD}, #f59e0b)` }}>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em]" style={{ color: "rgba(15,15,20,0.65)" }}>{d.beforeWeStart.yourPart.label}</p>
                  <p className="mt-3 text-6xl font-black" style={{ color: INK, letterSpacing: "-0.05em" }}>
                    <StatTicker value={d.beforeWeStart.yourPart.value} />
                    <span className="ml-2 text-2xl tracking-normal">{d.beforeWeStart.yourPart.unit}</span>
                  </p>
                  <p className="mt-1 text-sm font-bold" style={{ color: INK }}>{d.beforeWeStart.yourPart.text}</p>
                </div>
                <div className="mt-7">
                  <div className="h-3 overflow-hidden rounded-full" style={{ backgroundColor: "rgba(15,15,20,0.16)" }}>
                    <div className="li-bar-fill h-3 w-[9%] rounded-full" style={{ backgroundColor: INK }} />
                  </div>
                  <div className="mt-2 flex items-start justify-between gap-4 text-xs font-black leading-tight" style={{ color: INK }}>
                    <span>{d.beforeWeStart.yourPart.youLabel}</span>
                    <span className="text-right">{d.beforeWeStart.yourPart.usLabel}</span>
                  </div>
                </div>
              </InView>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Results */}
      <section className="px-4 pt-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] border bg-white p-8 sm:p-10 md:flex-row md:items-center" style={{ borderColor: SOFT_LINE, boxShadow: "0 24px 70px rgba(15,15,20,0.06)" }}>
              <div className="max-w-xl">
                <Eyebrow>{d.proof.eyebrow}</Eyebrow>
                <h2 className="text-3xl font-black sm:text-4xl" style={{ color: INK, ...h2Style }}>{d.proof.headline}</h2>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
                  {d.proof.disclaimer}
                </p>
              </div>
              <Link href={d.proof.ctaHref} className="btn-dark inline-flex shrink-0 items-center gap-2 px-7 py-3.5 text-sm font-bold">
                {`${d.proof.ctaLabel} `}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="mt-24">
        <Faq badge={d.faq.badge} title={d.faq.title} items={FAQS} />
      </div>

      <RelatedPath heading={d.relatedPath.heading} intro={d.relatedPath.intro} items={SERVICE_PATHS["linkedin-outreach"]} accent={BLUE} />

      {/* Outcomes, founder + CTA */}
      <section className="px-4 py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-12 max-w-2xl">
              <Eyebrow>{d.outcomes.eyebrow}</Eyebrow>
              <h2 className="text-4xl font-black sm:text-5xl" style={{ color: INK, ...h2Style }}>
                {`${d.outcomes.headlineStart} `}<span className="italic" style={{ color: BLUE }}>{d.outcomes.headlineEm}</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OUTCOMES.map((o, i) => {
              const Icon = o.icon;
              return (
                <FadeIn key={o.title} delay={(i % 3) * 90} className="h-full">
                  <div className="h-full rounded-[24px] border bg-white p-7 transition-all duration-300 hover:-translate-y-1" style={{ borderColor: SOFT_LINE, boxShadow: "0 18px 50px rgba(15,15,20,0.05)" }}>
                    <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_LIGHT})`, boxShadow: "0 12px 26px rgba(10,102,194,0.26)" }}>
                      <Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-black" style={{ color: INK, letterSpacing: "-0.02em" }}>{o.title}</h3>
                    <p className="mt-1.5 text-base leading-snug" style={{ color: BODY }}>{o.text}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <div className="mx-auto mt-20 max-w-5xl space-y-10">
            <FadeIn>
              <div className="grid items-center gap-6 rounded-[28px] border bg-white p-6 sm:p-8 md:grid-cols-[auto_1fr]" style={{ borderColor: SOFT_LINE, boxShadow: "0 24px 70px rgba(15,15,20,0.06)" }}>
                <Image src="/tejas.png" alt={d.founder.imageAlt} width={128} height={128} className="h-28 w-28 rounded-3xl object-cover sm:h-32 sm:w-32" />
                <div>
                  <Eyebrow>{d.founder.eyebrow}</Eyebrow>
                  <h3 className="text-2xl font-black" style={{ color: INK, letterSpacing: "-0.03em" }}>
                    <a href={d.founder.profileHref} target="_blank" rel="noopener noreferrer" className="hover:underline">{d.founder.name}</a>
                  </h3>
                  <p className="text-sm font-medium" style={{ color: "#6b655e" }}>{d.founder.role}</p>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: BODY }}>
                    {d.founder.bioBeforeLink}{" "}
                    <Link href={d.founder.bioLinkHref} className="underline font-semibold hover:text-[#0A66C2]">
                      {d.founder.bioLinkLabel}
                    </Link>{" "}
                    {d.founder.bioAfterLink}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {FOUNDER_STATS.map((s) => (
                      <span key={s} className="rounded-full border px-3.5 py-1.5 text-xs font-bold" style={{ borderColor: SOFT_LINE, backgroundColor: "#FBFCFE", color: INK }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="relative overflow-hidden rounded-[32px] border p-10 text-center sm:p-14" style={{ background: "linear-gradient(135deg,#FEF9EC 0%,#FFFFFF 100%)", borderColor: "rgba(245,183,49,0.35)", boxShadow: "0 24px 70px rgba(15,15,20,0.06)" }}>
                <div aria-hidden="true" className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(245,183,49,0.18), transparent 70%)", filter: "blur(40px)" }} />
                <div className="relative">
                  <Eyebrow light>{d.finalCta.eyebrow}</Eyebrow>
                  <h2 className="mx-auto max-w-2xl text-4xl font-black sm:text-5xl" style={{ ...h2Style, color: INK }}>
                    {`${d.finalCta.headlineStart} `}<span className="italic" style={{ color: "#A14A08" }}>{d.finalCta.headlineEm}</span>
                  </h2>
                  <p className="mx-auto mt-5 max-w-md text-base" style={{ color: BODY }}>{d.finalCta.subhead}</p>
                  <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                    <Link href={CALENDAR} className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold transition-transform hover:-translate-y-0.5" style={{ backgroundColor: GOLD, color: INK }}>
                      {`${d.finalCta.primaryLabel} `}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link href={d.finalCta.secondaryHref} className="rounded-full border px-8 py-4 text-sm font-bold transition-colors hover:bg-[#F8F6F2]" style={{ color: INK, borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>
                      {d.finalCta.secondaryLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}
