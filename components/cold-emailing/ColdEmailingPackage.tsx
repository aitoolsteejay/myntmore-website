import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Eye,
  FlaskConical,
  Inbox,
  PenLine,
  Server,
  Target,
  TrendingUp,
  Wrench,
  Zap,
  Handshake,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import InnerLayout from "@/app/components/InnerLayout";
import JsonLd from "@/app/components/JsonLd";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import AnswerBlock from "@/app/components/AnswerBlock";
import RelatedPath from "@/app/components/RelatedPath";
import { SERVICE_PATHS } from "@/lib/internal-paths";
import FadeIn from "@/app/components/FadeIn";
import StatTicker from "@/app/components/StatTicker";
import Faq from "@/app/lp/Faq";
import Underline from "@/app/resources/guides/how-to-set-up-vibe-prospecting/Underline";
import FlowVisual from "./FlowVisual";
import ProcessExplorer from "./ProcessExplorer";
import PackageGrid from "./PackageGrid";
import { PROCESS_STEPS } from "./process-steps";
import { buildFaqSchema, buildHowToSchema, buildServiceSchema, SITE_URL } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import { pageFaqsQA } from "@/lib/page-faqs";
import d from "@/content/service-copy/cold-email.json";

// Done-for-you cold email service overview.

const ORANGE = "#EA580C";
const GOLD = "#F5B731";
const INK = "#0A0A0A";
const CREAM = "#F8F6F2";
const STATS = d.numbers.stats;

const TARGETS = d.numbers.targets;

// Icons are fixed by position; the copy for each lives in content/service-copy/cold-email.json.
const PILLAR_ICONS: LucideIcon[] = [Inbox, Target, PenLine];
const PILLARS = d.pillars.items.map((p, i) => ({ ...p, icon: PILLAR_ICONS[i] }));

const RESULT_ICONS: LucideIcon[] = [MessagesSquare, Handshake, TrendingUp, FlaskConical];
const RESULTS = d.pillars.results.map((label, i) => ({ label, icon: RESULT_ICONS[i] }));

const WHY_ICONS: LucideIcon[] = [Inbox, Target, BadgeCheck, Eye];
const WHY = d.whyMyntmore.items.map((w, i) => ({ ...w, icon: WHY_ICONS[i] }));

const RESPONSIBILITY_ICONS: LucideIcon[] = [Server, Zap, Wrench];

const FOUNDER_STATS = d.founder.credentials;

const FAQS = pageFaqsQA("service-cold-email");

// Structured data for the page. HowTo describes the ten-step process the
// explorer shows (same data module), Service and FAQPage describe the offer and
// the visible FAQ below.
const SERVICE_SCHEMA = buildServiceSchema({
  name: d.structuredData.serviceName,
  description: d.structuredData.serviceDescription,
  serviceType: d.structuredData.serviceType,
  url: `${SITE_URL}/services/cold-email`,
});
const HOWTO_SCHEMA = buildHowToSchema(
  d.structuredData.howToName,
  PROCESS_STEPS.map((s) => ({ name: s.title, text: `${s.summary} ${s.result}` }))
);
const FAQ_SCHEMA = buildFaqSchema(FAQS.map(({ q, a }) => ({ question: q, answer: a })));

function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p className="mb-3 text-xs font-black uppercase tracking-[0.3em]" style={{ color: light ? "#A14A08" : textTone(ORANGE) }}>
      {children}
    </p>
  );
}

const h2Style = { letterSpacing: "-0.035em", lineHeight: 1.04 } as const;

export default function ColdEmailingPackage() {
  return (
    <InnerLayout>
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={HOWTO_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-28 pt-32 sm:pb-32" style={{ backgroundColor: CREAM }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(234,88,12,0.18),rgba(234,88,12,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.2),rgba(245,183,49,0.07) 45%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Breadcrumbs items={[{ label: d.hero.breadcrumbServicesLabel, href: "/services" }, { label: d.hero.breadcrumbPageLabel, href: "/services/cold-email" }]} />
            <div className="hero-fade mb-7 inline-flex items-center gap-2.5 rounded-full border bg-white/70 px-5 py-2 backdrop-blur" style={{ borderColor: "rgba(234,88,12,0.35)" }}>
              <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: ORANGE }} />
              <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: INK }}>{d.hero.badge}</span>
            </div>
            <h1 className="hero-fade-d1 font-black" style={{ color: INK, fontSize: "clamp(2.9rem, 7.4vw, 5.2rem)", lineHeight: 0.96, letterSpacing: "-0.045em" }}>
              {d.hero.headlineLine1}
              <br />
              <span className="relative inline-block whitespace-nowrap italic" style={{ color: "#23232b" }}>
                {d.hero.headlineAccent}<span style={{ color: GOLD }}>.</span>
                <Underline color={GOLD} />
              </span>
            </h1>
            <p className="hero-fade-d2 mt-7 max-w-md text-lg font-medium sm:text-xl" style={{ color: "#3b3b45", lineHeight: 1.35 }}>
              {d.hero.subheadline}
            </p>
            <div className="hero-fade-d2 mt-9 flex flex-wrap gap-3">
              <Link href="/book-a-call" className="btn-dark inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold">
                {d.hero.primaryButtonLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href="#process" className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-7 py-3.5 text-sm font-bold backdrop-blur transition-colors hover:border-[#EA580C]" style={{ borderColor: "#E8E2D9", color: INK }}>
                {d.hero.secondaryButtonLabel}
              </a>
            </div>
          </div>
          <FlowVisual />
        </div>
      </section>

      {/* Numbers */}
      <section className="relative z-20 -mt-14 px-4 sm:-mt-16" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border md:grid-cols-4" style={{ borderColor: "#EDE7DD", backgroundColor: "#F0EADF", boxShadow: "0 30px 80px rgba(15,15,20,0.09)" }}>
              {STATS.map((s, i) => (
                <FadeIn key={s.label} delay={i * 110} className="h-full">
                  <div className="h-full bg-white px-6 py-7 sm:px-8 sm:py-9">
                    <p className="text-5xl font-black tabular-nums md:text-[2.6rem] lg:text-6xl" style={{ color: INK, letterSpacing: "-0.045em" }}>
                      <StatTicker value={s.value} duration={1600} />
                    </p>
                    <p className="mt-1 text-sm font-semibold" style={{ color: "#6b655e" }}>{s.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              <FadeIn delay={420}>
                <span className="text-xs font-black uppercase tracking-[0.24em]" style={{ color: "#71675E" }}>{d.numbers.targetsLabel}</span>
              </FadeIn>
              {TARGETS.map((t, i) => (
                <FadeIn key={t} delay={520 + i * 130}>
                  <span className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-bold transition-transform duration-300 hover:-translate-y-0.5" style={{ borderColor: "#EDE7DD", color: INK }}>
                    <BadgeCheck className="ce-badge h-4 w-4" style={{ color: ORANGE, animationDelay: "160ms" }} aria-hidden="true" />
                    {t}
                  </span>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <AnswerBlock slug="cold-email" accent={ORANGE} />

      {/* Pillars */}
      <section className="px-4 py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-12 max-w-2xl">
              <Eyebrow>{d.pillars.eyebrow}</Eyebrow>
              <h2 className="text-4xl font-black sm:text-5xl" style={{ color: INK, ...h2Style }}>
                {d.pillars.headlineLead} <span className="italic" style={{ color: ORANGE }}>{d.pillars.headlineAccent}</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-3">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <FadeIn key={p.title} delay={i * 90} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-[26px] border bg-white p-8 transition-all duration-300 hover:-translate-y-1" style={{ borderColor: "#EDE7DD", boxShadow: "0 18px 50px rgba(15,15,20,0.05)" }}>
                    <span aria-hidden="true" className="pointer-events-none absolute right-7 top-6 select-none text-[4.5rem] font-black leading-none" style={{ color: "rgba(234,88,12,0.11)", letterSpacing: "-0.06em" }}>
                      {`0${i + 1}`}
                    </span>
                    <span className="relative mb-6 grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${GOLD})`, boxShadow: "0 14px 30px rgba(234,88,12,0.28)" }}>
                      <Icon className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <h3 className="relative text-xl font-black" style={{ color: INK, letterSpacing: "-0.02em" }}>{p.title}</h3>
                    <p className="relative mt-2 text-base leading-relaxed" style={{ color: "#52525B" }}>{p.line}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
          <FadeIn>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {RESULTS.map((r) => {
                const Icon = r.icon;
                return (
                  <span key={r.label} className="inline-flex items-center gap-2.5 rounded-full border bg-white px-5 py-3 text-sm font-bold" style={{ borderColor: "#EDE7DD", color: INK }}>
                    <Icon className="h-4 w-4" style={{ color: ORANGE }} strokeWidth={2.4} aria-hidden="true" />
                    {r.label}
                  </span>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Package */}
      <section className="border-y px-4 py-24" style={{ backgroundColor: "#ffffff", borderColor: "#EDE7DD" }}>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-12 max-w-2xl">
              <Eyebrow>{d.package.eyebrow}</Eyebrow>
              <h2 className="text-4xl font-black sm:text-5xl" style={{ color: INK, ...h2Style }}>
                {d.package.headlineLead} <span className="italic" style={{ color: ORANGE }}>{d.package.headlineAccent}</span>
              </h2>
              <p className="mt-4 text-lg" style={{ color: "#52525B" }}>{d.package.intro}</p>
            </div>
          </FadeIn>
          <PackageGrid />

          <FadeIn>
            <div className="mt-6 overflow-hidden rounded-[30px] border" style={{ borderColor: "#EDE7DD", boxShadow: "0 30px 80px rgba(15,15,20,0.08)" }}>
              <div className="space-y-5 bg-white p-8 sm:p-10">
                {d.package.responsibilities.map((row, i) => {
                  const Icon = RESPONSIBILITY_ICONS[i];
                  return (
                    <div key={row.label} className="flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl" style={{ backgroundColor: "rgba(234,88,12,0.1)", color: ORANGE }}>
                        <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: "#71675E" }}>{row.label}</p>
                        <p className="text-base font-bold" style={{ color: INK }}>{row.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-20 px-4 py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-10 max-w-2xl">
              <Eyebrow>{d.process.eyebrow}</Eyebrow>
              <h2 className="text-4xl font-black sm:text-5xl" style={{ color: INK, ...h2Style }}>
                {d.process.headlineLead} <span className="italic" style={{ color: ORANGE }}>{d.process.headlineAccent}</span>
              </h2>
              <p className="mt-4 text-lg" style={{ color: "#52525B" }}>{d.process.intro}</p>
            </div>
          </FadeIn>
          <ProcessExplorer />
        </div>
      </section>

      {/* Why Myntmore */}
      <section className="relative overflow-hidden px-4 py-24" style={{ backgroundColor: "#FEF9EC" }}>
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-96 w-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(245,183,49,0.16), transparent 70%)", filter: "blur(50px)" }} />
        <div className="relative mx-auto max-w-6xl">
          <FadeIn>
            <Eyebrow light>{d.whyMyntmore.eyebrow}</Eyebrow>
            <h2 className="max-w-xl text-4xl font-black sm:text-5xl" style={{ ...h2Style, color: INK }}>
              {d.whyMyntmore.headlineLead} <span className="italic" style={{ color: "#A14A08" }}>{d.whyMyntmore.headlineAccent}</span>
            </h2>
          </FadeIn>
          <FadeIn>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[26px] sm:grid-cols-2 lg:grid-cols-4" style={{ backgroundColor: "#E8E2D9", border: "1px solid #E8E2D9" }}>
              {WHY.map((w) => {
                const Icon = w.icon;
                return (
                  <div key={w.title} className="p-8" style={{ backgroundColor: "#FFFFFF" }}>
                    <span className="mb-6 grid h-12 w-12 place-items-center rounded-full border" style={{ borderColor: "rgba(245,183,49,0.5)", color: "#A14A08" }}>
                      <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-black" style={{ letterSpacing: "-0.02em", color: INK }}>{w.title}</h3>
                    <p className="mt-1.5 text-sm" style={{ color: "#52525B" }}>{w.line}</p>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      <Faq badge={d.faq.badge} title={d.faq.title} items={FAQS} />

      <RelatedPath heading={d.relatedPath.heading} intro={d.relatedPath.intro} items={SERVICE_PATHS["cold-email"]} accent={ORANGE} />

      {/* Founder + CTA */}
      <section className="px-4 py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-5xl space-y-10">
          <FadeIn>
            <div className="grid items-center gap-6 rounded-[28px] border bg-white p-6 sm:p-8 md:grid-cols-[auto_1fr]" style={{ borderColor: "#EDE7DD", boxShadow: "0 24px 70px rgba(15,15,20,0.06)" }}>
              <Image src="/tejas.png" alt={d.founder.imageAlt} width={128} height={128} className="h-28 w-28 rounded-3xl object-cover sm:h-32 sm:w-32" />
              <div>
                <Eyebrow>{d.founder.eyebrow}</Eyebrow>
                <h3 className="text-2xl font-black" style={{ color: INK, letterSpacing: "-0.03em" }}>
                  <a href={d.founder.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{d.founder.name}</a>
                </h3>
                <p className="text-sm font-medium" style={{ color: "#6b655e" }}>{d.founder.role}</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#52525B" }}>
                  {d.founder.bioBeforeLink}{" "}
                  <Link href={d.founder.bioLinkHref} className="font-bold underline hover:text-[#A14A08]" style={{ color: INK }}>
                    {d.founder.bioLinkText}
                  </Link>{" "}
                  {d.founder.bioAfterLink}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {FOUNDER_STATS.map((s) => (
                    <span key={s} className="rounded-full border px-3.5 py-1.5 text-xs font-bold" style={{ borderColor: "#EDE7DD", backgroundColor: "#FCFBF8", color: INK }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="relative overflow-hidden rounded-[32px] border p-10 text-center sm:p-14" style={{ background: "linear-gradient(135deg,#FEF9EC 0%,#FFFFFF 100%)", borderColor: "rgba(245,183,49,0.35)", boxShadow: "0 24px 70px rgba(15,15,20,0.06)" }}>
              <div aria-hidden="true" className="absolute -left-20 -bottom-24 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(245,183,49,0.18), transparent 70%)", filter: "blur(40px)" }} />
              <div className="relative">
                <Eyebrow light>{d.closingCta.eyebrow}</Eyebrow>
                <h2 className="mx-auto max-w-2xl text-4xl font-black sm:text-5xl" style={{ ...h2Style, color: INK }}>
                  {d.closingCta.headlineLead} <span className="italic" style={{ color: "#A14A08" }}>{d.closingCta.headlineAccent}</span>
                </h2>
                <p className="mx-auto mt-5 max-w-md text-base" style={{ color: "#52525B" }}>{d.closingCta.subtext}</p>
                <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href={d.closingCta.primaryButtonHref} className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold transition-transform hover:-translate-y-0.5" style={{ backgroundColor: GOLD, color: INK }}>
                    {d.closingCta.primaryButtonLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href={d.closingCta.secondaryButtonHref} className="rounded-full border px-8 py-4 text-sm font-bold transition-colors hover:bg-[#F8F6F2]" style={{ color: INK, borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>
                    {d.closingCta.secondaryButtonLabel}
                  </Link>
                </div>
                <p className="mt-6 text-sm" style={{ color: "#52525B" }}>
                  {d.closingCta.calculatorPrompt}{" "}
                  <Link href={d.closingCta.calculatorLinkHref} className="font-bold underline" style={{ color: "#A14A08" }}>{d.closingCta.calculatorLinkText}</Link>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </InnerLayout>
  );
}
