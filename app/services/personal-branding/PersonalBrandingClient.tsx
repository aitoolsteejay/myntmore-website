"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import InnerLayout from "../../components/InnerLayout";
import JsonLd from "../../components/JsonLd";
import Breadcrumbs from "../../components/Breadcrumbs";
import AnswerBlock from "../../components/AnswerBlock";
import RelatedPath from "../../components/RelatedPath";
import { SERVICE_PATHS } from "@/lib/internal-paths";
import { buildServiceSchema, buildHowToSchema, buildFaqSchema, SITE_URL } from "@/lib/schema";
import { pageFaqsQA } from "@/lib/page-faqs";
import d from "@/content/service-pages/personal-branding.json";

const SERVICE_SCHEMA = buildServiceSchema({
  name: d.schemaName,
  description: d.schemaDescription,
  serviceType: d.schemaServiceType,
  url: `${SITE_URL}/services/personal-branding`,
});


/* ─── Data ──────────────────────────────────────────────────── */

const STEPS = d.steps;

const HOWTO_SCHEMA = buildHowToSchema(
  d.howToName,
  STEPS.map((s) => ({ name: s.title, text: s.desc }))
);

const DELIVERABLES = d.deliverables;

const WHO_FOR = d.whoFor;

const NOT_FOR = d.notFor;


const FAQ_ITEMS = pageFaqsQA("service-personal-branding");
const FAQ_SCHEMA = buildFaqSchema(FAQ_ITEMS.map((f) => ({ question: f.q, answer: f.a })));

const BENEFITS = d.benefits;

/* ─── Sub-components ─────────────────────────────────────────── */

function AccordionItem({ q, a, open, onToggle, index }: { q: string; a: string; open: boolean; onToggle: () => void; index: number }) {
  return (
    <div
      className="border rounded-xl overflow-hidden transition-all duration-300"
      style={open
        ? { borderColor: "rgba(217,119,6,0.4)", borderLeftColor: "#D97706", borderLeftWidth: "3px", backgroundColor: "rgba(217,119,6,0.04)" }
        : { borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="text-base font-bold" style={{ color: "#0a0a0a" }}>{q}</span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
          style={{ backgroundColor: open ? "rgba(217,119,6,0.12)" : "#F8F6F2" }}>
          <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke={open ? "#D97706" : "#71675E"} strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "300px" : "0px" }}
      >
        <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#52525B" }}>{a}</p>
      </div>
    </div>
  );
}

function BenefitChip({ label, i }: { label: string; i: number }) {
  const isAmber = i % 2 === 0;
  return (
    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap border flex-shrink-0"
      style={{
        background: isAmber ? "linear-gradient(135deg,#fff 0%,#FEF9EC 100%)" : "linear-gradient(135deg,#fff 0%,#EFF6FF 100%)",
        borderColor: isAmber ? "rgba(217,119,6,0.3)" : "rgba(0,119,181,0.3)",
        color: "#1a1a1a",
        boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
      }}>
      <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: isAmber ? "#D97706" : "#0077b5" }} />
      {label}
    </span>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function PersonalBrandingClient() {
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const ctaBlob1 = useRef<HTMLDivElement>(null);
  const ctaBlob2 = useRef<HTMLDivElement>(null);

  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [statsTriggered, setStatsTriggered] = useState(false);

  /* Blob parallax: hero */
  useEffect(() => {
    if (window.innerWidth < 768) return; // skip blob animation on mobile
    let id: number;
    const t0 = performance.now();
    function loop() {
      const t = (performance.now() - t0) / 1000;
      if (blob1.current) {
        blob1.current.style.transform = `translate(${Math.sin(t * 0.65) * 210 + Math.sin(t * 0.28) * 75}px, ${Math.cos(t * 0.5) * 145 + Math.cos(t * 0.2) * 55}px)`;
      }
      if (blob2.current) {
        blob2.current.style.transform = `translate(${Math.sin(t * 0.55 + 2) * 210 + Math.cos(t * 0.38) * 72}px, ${Math.cos(t * 0.72 + 1) * 145 + Math.sin(t * 0.32) * 52}px)`;
      }
      if (blob3.current) {
        blob3.current.style.transform = `translate(${Math.sin(t * 0.5 + 4) * 185 + Math.sin(t * 0.33) * 62}px, ${Math.cos(t * 0.62 + 2) * 165 + Math.cos(t * 0.43) * 52}px)`;
      }
      id = requestAnimationFrame(loop);
    }
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  /* Blob parallax: CTA */
  useEffect(() => {
    if (window.innerWidth < 768) return; // skip blob animation on mobile
    let id: number;
    const t0 = performance.now();
    function loop() {
      const t = (performance.now() - t0) / 1000;
      if (ctaBlob1.current) {
        ctaBlob1.current.style.transform = `translate(${Math.sin(t * 0.75) * 310 + Math.sin(t * 0.28) * 92}px, ${Math.cos(t * 0.58) * 135 + Math.cos(t * 0.22) * 58}px)`;
      }
      if (ctaBlob2.current) {
        ctaBlob2.current.style.transform = `translate(${Math.sin(t * 0.68 + 2) * 310 + Math.cos(t * 0.38) * 92}px, ${Math.cos(t * 0.78 + 1) * 135 + Math.sin(t * 0.33) * 58}px)`;
      }
      id = requestAnimationFrame(loop);
    }
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  /* Draw-in underline */
  useEffect(() => {
    const path = underlineRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    let animId: number | null = null;
    const timer = setTimeout(() => {
      let start: number | null = null;
      const dur = 1200;
      function draw(ts: number) {
        if (!path) return;
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        path.style.strokeDashoffset = String(len * (1 - e));
        if (p < 1) animId = requestAnimationFrame(draw);
      }
      animId = requestAnimationFrame(draw);
    }, 500);
    return () => {
      clearTimeout(timer);
      if (animId !== null) cancelAnimationFrame(animId);
    };
  }, []);

  /* Number tickers */
  useEffect(() => {
    const el = statsContainerRef.current;
    if (!el) return;
    const animIds: number[] = [];
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !statsTriggered) {
        setStatsTriggered(true);
        [
          { ref: stat1Ref, end: 10, suffix: "x" },
          { ref: stat2Ref, end: 2, suffix: "x" },
          { ref: stat3Ref, end: 6, suffix: "/mo" },
        ].forEach(({ ref, end, suffix }) => {
          let s: number | null = null;
          const dur = 1800;
          function tick(ts: number) {
            if (!s) s = ts;
            const p = Math.min((ts - s) / dur, 1);
            const e = 1 - Math.pow(1 - p, 3);
            if (ref.current) ref.current.textContent = Math.round(e * end) + suffix;
            if (p < 1) animIds.push(requestAnimationFrame(tick));
          }
          animIds.push(requestAnimationFrame(tick));
        });
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => {
      obs.disconnect();
      animIds.forEach(cancelAnimationFrame);
    };
  }, [statsTriggered]);

  const doubled = [...BENEFITS, ...BENEFITS];

  return (
    <InnerLayout>
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={HOWTO_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div ref={blob1} aria-hidden style={{ position: "absolute", top: "50%", left: "20%", width: 600, height: 600, marginTop: -300, marginLeft: -300, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,119,6,0.18) 0%, rgba(217,119,6,0.08) 40%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none", willChange: "transform" }} />
        <div ref={blob2} aria-hidden style={{ position: "absolute", top: "40%", left: "75%", width: 500, height: 500, marginTop: -250, marginLeft: -250, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,119,181,0.16) 0%, rgba(0,119,181,0.06) 40%, transparent 70%)", filter: "blur(55px)", pointerEvents: "none", willChange: "transform" }} />
        <div ref={blob3} aria-hidden style={{ position: "absolute", top: "70%", left: "50%", width: 400, height: 400, marginTop: -200, marginLeft: -200, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,119,6,0.12) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none", willChange: "transform" }} />

        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: d.breadcrumbLabel, href: "/services/personal-branding" }]} />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade"
            style={{ borderColor: "rgba(217,119,6,0.35)", background: "rgba(217,119,6,0.07)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#D97706" }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#A14A08" }}>{d.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-6 hero-fade-d1" style={{ color: "#0a0a0a" }}>{d.h1[0]}{" "}
            <span className="relative inline-block">{d.h1[1]}<svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 460 10" preserveAspectRatio="none" aria-hidden>
                <path ref={underlineRef} d="M2 7 Q115 2 230 6 Q345 10 458 5" stroke="#D97706" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-lg sm:text-xl max-w-2xl mb-10 hero-fade-d2" style={{ color: "#52525B" }}>{d.heroIntro}</p>

          <div className="flex flex-col sm:flex-row gap-4 hero-fade-d3">
            <a href="/book-a-call"
              className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">{d.ctaPrimary}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <Link href="/case-studies" className="btn-ghost px-8 py-4 text-base font-bold inline-flex items-center gap-2">{d.ctaSecondary}</Link>
          </div>
        </div>
      </section>

      <AnswerBlock slug="personal-branding" accent="#D97706" />

      {/* ── Stats strip ──────────────────────────────────────── */}
      <div ref={statsContainerRef} className="border-y py-10 px-4" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { ref: stat1Ref, init: d.stats[0].init, label: d.stats[0].label },
            { ref: stat2Ref, init: d.stats[1].init, label: d.stats[1].label },
            { ref: stat3Ref, init: d.stats[2].init, label: d.stats[2].label },
          ].map((s, i) => (
            <div key={i} className={`${i < 2 ? "sm:border-r" : ""} px-4`} style={{ borderColor: "#E8E2D9" }}>
              <span ref={s.ref} className="block text-4xl font-black mb-1" style={{ color: "#0a0a0a" }}>{s.init}</span>
              <span className="text-sm" style={{ color: "#71675E" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Benefits marquee ─────────────────────────────────── */}
      <div className="py-8 overflow-hidden border-b" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="flex gap-4 w-max" style={{ animation: "marquee-left 32s linear infinite" }}>
          {doubled.map((label, i) => <BenefitChip key={i} label={label} i={i} />)}
        </div>
      </div>

      {/* ── The problem ──────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
                style={{ backgroundColor: "rgba(239,68,68,0.08)", color: "#B91C1C", border: "1px solid rgba(239,68,68,0.2)" }}>
                The Problem
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>{d.problemTitle}</h2>
              <div className="space-y-4">
                {d.problemPoints.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "rgba(239,68,68,0.1)" }}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
                style={{ backgroundColor: "rgba(217,119,6,0.08)", color: "#A14A08", border: "1px solid rgba(217,119,6,0.2)" }}>
                The Myntmore Way
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>{d.solutionTitle}</h2>
              <div className="space-y-4">
                {d.solutionPoints.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "rgba(217,119,6,0.1)" }}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="#D97706" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ backgroundColor: "rgba(217,119,6,0.08)", color: "#A14A08", border: "1px solid rgba(217,119,6,0.2)" }}>
              The Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#0a0a0a" }}>How it works</h2>
            <p className="text-base mt-3 max-w-xl" style={{ color: "#52525B" }}>{d.processIntro}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative rounded-2xl border p-7 transition-all duration-300"
                style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(217,119,6,0.4)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(217,119,6,0.03)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E8E2D9"; (e.currentTarget as HTMLElement).style.backgroundColor = "#F8F6F2"; }}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black"
                    style={{ backgroundColor: "rgba(217,119,6,0.1)", color: "#A14A08" }}>
                    {s.n}
                  </div>
                  <div>
                    <h3 className="text-base font-black mb-2" style={{ color: "#0a0a0a" }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{s.desc}</p>
                  </div>
                </div>
                {i % 2 === 0 && i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#ffffff", border: "1px solid #E8E2D9" }}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="#D97706" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deliverables + Who it's for ───────────────────────── */}
      <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="rounded-2xl border p-8" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
              style={{ backgroundColor: "rgba(217,119,6,0.08)", color: "#A14A08", border: "1px solid rgba(217,119,6,0.2)" }}>
              What You Get
            </span>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>Every engagement includes</h2>
            <ul className="space-y-4">
              {DELIVERABLES.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(217,119,6,0.1)" }}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="#D97706" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
              style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
              Who It&apos;s For
            </span>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>{d.whoForTitle}</h2>
            <div className="space-y-4">
              {WHO_FOR.map((w) => (
                <div key={w.title} className="rounded-2xl border p-6 transition-all duration-200"
                  style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(217,119,6,0.35)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E8E2D9"; }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{w.icon}</span>
                    <h3 className="text-base font-black" style={{ color: "#0a0a0a" }}>{w.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Not the right fit ────────────────────────────────── */}
      <section className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border p-8" style={{ backgroundColor: "#FEF2F2", borderColor: "rgba(220,38,38,0.2)" }}>
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "rgba(220,38,38,0.08)", color: "#B91C1C", border: "1px solid rgba(220,38,38,0.2)" }}>
              Honest Note
            </span>
            <h3 className="text-lg font-black mb-3" style={{ color: "#0a0a0a" }}>This isn&apos;t the right fit if&hellip;</h3>
            <ul className="space-y-2">
              {NOT_FOR.map((n) => (
                <li key={n} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#DC2626" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Track record ─────────────────────────────────────── */}
      <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg leading-relaxed mb-6" style={{ color: "#3D3D3D" }}>{d.trackIntro}{" "}
            <span className="font-bold" style={{ color: "#0a0a0a" }}>{d.trackStrong}</span>{d.trackRest}</p>
          <Link href={d.trackHref} className="text-sm font-bold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
            style={{ color: "#A14A08" }}>{d.trackLinkText}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ backgroundColor: "rgba(217,119,6,0.08)", color: "#A14A08", border: "1px solid rgba(217,119,6,0.2)" }}>
              FAQ
            </span>
            <h2 className="text-3xl font-black" style={{ color: "#0a0a0a" }}>Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} q={item.q} a={item.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} index={i} />
            ))}
          </div>
        </div>
      </section>

      <RelatedPath heading="See it in action" intro="A case study, the thinking behind it, and the next step." items={SERVICE_PATHS["personal-branding"]} accent="#D97706" />

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative py-28 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div ref={ctaBlob1} aria-hidden style={{ position: "absolute", top: "50%", left: "25%", width: 600, height: 600, marginTop: -300, marginLeft: -300, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,119,6,0.25) 0%, rgba(217,119,6,0.1) 40%, transparent 70%)", filter: "blur(65px)", pointerEvents: "none", willChange: "transform" }} />
        <div ref={ctaBlob2} aria-hidden style={{ position: "absolute", top: "50%", left: "75%", width: 550, height: 550, marginTop: -275, marginLeft: -275, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,119,181,0.2) 0%, rgba(0,119,181,0.08) 40%, transparent 70%)", filter: "blur(65px)", pointerEvents: "none", willChange: "transform" }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
            style={{ borderColor: "rgba(245,183,49,0.4)", background: "rgba(245,183,49,0.1)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#F5B731" }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#A14A08" }}>Limited spots available</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[0.95]" style={{ color: "#0a0a0a" }}>{d.ctaTitle[0]}<br /><span style={{ color: "#A14A08" }}>{d.ctaTitle[1]}</span>
          </h2>

          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10" style={{ color: "#52525B" }}>{d.ctaIntro[0]}</p>

          <a href="/book-a-call"
            className="inline-flex items-center gap-2.5 px-10 py-5 rounded-full font-black text-lg btn-dark">{d.ctaButton}<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <p className="mt-5 text-sm" style={{ color: "#71675E" }}>{d.ctaNote}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-10 pt-8 border-t" style={{ borderColor: "#E8E2D9" }}>
            {d.ctaChecks.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#A14A08" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm" style={{ color: "#52525B" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}
