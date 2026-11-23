"use client";

import { ArrowRight, Calculator, CircleCheckBig, CircleHelp, MousePointer, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/cold-email-roi/ui/button";
import { ColdEmailRoiCalculator } from "@/components/cold-email-roi/calculator/ColdEmailRoiCalculator";
import { HandUnderline, PillBadge } from "@/components/cold-email-roi/HandUnderline";
import pageCopy from "@/content/page-copy/toolColdEmailRoiCalculator.json";

// This page's text is edited in the admin ("Cold Email ROI Calculator") and lives in content/page-copy/toolColdEmailRoiCalculator.json.
const copy = pageCopy;

const BORDER = "#E8E2D9";

function scrollToCalculator() {
  document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  // Move focus for keyboard and screen reader users.
  window.setTimeout(() => document.getElementById("calculator")?.focus({ preventScroll: true }), 400);
}

const PROBLEMS = [
  {
    icon: CircleHelp,
    color: "#EA580C",
    title: copy.ColdEmailRoiPageClient_s02.t01,
    body: copy.ColdEmailRoiPageClient_s02.t02,
  },
  {
    icon: Calculator,
    color: "#EA580C",
    title: copy.ColdEmailRoiPageClient_s02.t03,
    body: copy.ColdEmailRoiPageClient_s02.t04,
  },
  {
    icon: TrendingUp,
    color: "#A14A08",
    title: copy.ColdEmailRoiPageClient_s02.t05,
    body: copy.ColdEmailRoiPageClient_s02.t06,
  },
];

const STEPS = [
  { icon: MousePointer, color: "#EA580C", title: copy.ColdEmailRoiPageClient_s02.t07, body: copy.ColdEmailRoiPageClient_s02.t08 },
  { icon: Zap, color: "#EA580C", title: copy.ColdEmailRoiPageClient_s02.t09, body: copy.ColdEmailRoiPageClient_s02.t10 },
  { icon: CircleCheckBig, color: "#B8860B", title: copy.ColdEmailRoiPageClient_s02.t11, body: copy.ColdEmailRoiPageClient_s02.t12 },
];

const WHY = [
  { color: "#EA580C", title: copy.ColdEmailRoiPageClient_s02.t13, lead: copy.ColdEmailRoiPageClient_s02.t14, body: copy.ColdEmailRoiPageClient_s02.t15 },
  { color: "#EA580C", title: copy.ColdEmailRoiPageClient_s02.t16, lead: copy.ColdEmailRoiPageClient_s02.t17, body: copy.ColdEmailRoiPageClient_s02.t18 },
  { color: "#D97706", title: copy.ColdEmailRoiPageClient_s02.t19, lead: copy.ColdEmailRoiPageClient_s02.t20, body: copy.ColdEmailRoiPageClient_s02.t21 },
];

const NEXT = [
  { title: copy.ColdEmailRoiPageClient_s02.t22, body: copy.ColdEmailRoiPageClient_s02.t23, href: "/tools/battle-card-generator" },
  { title: copy.ColdEmailRoiPageClient_s02.t24, body: copy.ColdEmailRoiPageClient_s02.t25, href: "/tools/icp-builder" },
];

export default function ColdEmailRoiPageClient() {
  return (
    <div className="overflow-x-hidden bg-cream text-foreground">
      <div>
        {/* Hero */}
        <section className="relative flex flex-col items-center overflow-hidden px-6 py-14 text-center md:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-36 h-[650px] w-[650px] rounded-full blur-[55px]" style={{ background: "radial-gradient(circle, rgba(234,88,12,0.26) 0%, rgba(234,88,12,0.10) 40%, transparent 68%)" }} />
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-24 h-[600px] w-[600px] rounded-full blur-[55px]" style={{ background: "radial-gradient(circle, rgba(168,139,250,0.22) 0%, rgba(139,92,246,0.08) 40%, transparent 68%)" }} />
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
            <div className="mb-6">
              <PillBadge>{copy.ColdEmailRoiPageClient_s02.t26}</PillBadge>
            </div>
            <h1 className="mb-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{copy.ColdEmailRoiPageClient_s02.t27}<HandUnderline>{copy.ColdEmailRoiPageClient_s02.t28}</HandUnderline>
            </h1>
            <p className="mb-10 max-w-3xl text-lg text-muted-foreground sm:text-xl">{copy.ColdEmailRoiPageClient_s02.t29}</p>
            <Button variant="hero" size="hero" onClick={scrollToCalculator}>{copy.ColdEmailRoiPageClient_s02.t30}<ArrowRight aria-hidden="true" />
            </Button>
            <p className="mt-5 text-sm text-muted-foreground">{copy.ColdEmailRoiPageClient_s02.t31}{" "}
              <a href="/tools/roi-calculator" className="font-bold underline" style={{ color: "#A14A08" }}>{copy.ColdEmailRoiPageClient_s02.t32}</a>
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section id="calculator" tabIndex={-1} aria-label="Cold email ROI calculator" className="scroll-mt-24 outline-none">
          <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            <ColdEmailRoiCalculator />
          </div>
        </section>

        {/* Problem */}
        <section className="bg-[hsl(var(--secondary)/0.3)] px-6 py-24">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="mb-16 text-3xl font-black sm:text-5xl">{copy.ColdEmailRoiPageClient_s03.t01}</h2>
            <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3">
              {PROBLEMS.map((p) => (
                <div key={p.title} className="rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ border: `1px solid ${BORDER}`, borderTop: `3px solid ${p.color}` }}>
                  <div className="mb-4 inline-flex rounded-xl p-3" style={{ backgroundColor: `${p.color}15` }}>
                    <p.icon className="h-6 w-6" style={{ color: p.color }} aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 text-xl font-black">{p.title}</h3>
                  <p className="text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full funnel */}
        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 text-3xl font-black sm:text-5xl">{copy.ColdEmailRoiPageClient_s04.t01}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">{copy.ColdEmailRoiPageClient_s04.t02}</p>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-[hsl(var(--secondary)/0.3)] px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-16 text-center text-3xl font-black sm:text-5xl">{copy.ColdEmailRoiPageClient_s05.t01}</h2>
            <ol className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {STEPS.map((s) => (
                <li key={s.title} className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full text-white" style={{ backgroundColor: s.color }}>
                    <s.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mb-4 text-xl font-black">{s.title}</h3>
                  <p className="text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why this works */}
        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-16 text-center text-3xl font-black sm:text-5xl">{copy.ColdEmailRoiPageClient_s06.t01}</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {WHY.map((w) => (
                <div key={w.title} className="flex flex-col rounded-2xl bg-[hsl(var(--secondary)/0.2)] p-8" style={{ borderLeft: `4px solid ${w.color}` }}>
                  <h3 className="mb-3 text-xl font-black">{w.title}</h3>
                  <p className="mb-2 font-medium text-foreground">{w.lead}</p>
                  <p className="text-sm text-muted-foreground">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white px-6 py-24 text-center" style={{ borderTop: `1px solid ${BORDER}` }}>
          <h2 className="mb-10 text-3xl font-black sm:text-5xl">{copy.ColdEmailRoiPageClient_s07.t01}</h2>
          <Button asChild variant="hero" size="hero">
            <a href="/book-a-call">{copy.ColdEmailRoiPageClient_s07.t02}<ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </section>

        {/* Try this next */}
        <section className="bg-[hsl(var(--secondary)/0.2)] px-6 py-20" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-10 text-center text-2xl font-black sm:text-3xl">{copy.ColdEmailRoiPageClient_s08.t01}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {NEXT.map((n) => (
                <a key={n.href} href={n.href} className="group flex flex-col justify-between rounded-2xl border bg-white p-6 transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" style={{ borderColor: BORDER }}>
                  <div>
                    <h3 className="mb-2 text-base font-black">{n.title}</h3>
                    <p className="text-sm text-muted-foreground">{n.body}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: "#A14A08" }}>{copy.ColdEmailRoiPageClient_s08.t02}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
