"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import LpLayout from "@/app/lp/LpLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import JsonLd from "@/app/components/JsonLd";
import SubmitButton from "@/app/components/SubmitButton";
import { buildFaqSchema } from "@/lib/schema";
import FlowDiagram from "@/app/lp/FlowDiagram";
import Faq from "@/app/lp/Faq";
import { pageFaqsQA } from "@/lib/page-faqs";
import type { LandingPageData } from "./landing-page-data";
import { LeadSourceField } from "@/app/components/LeadSource";
import CityLinks from "@/app/components/CityLinks";
import { LANDING_PAGE_INDUSTRY } from "@/lib/city-links";

// One template for every ICP landing page (/lp/<slug>). The text comes from
// content/landing-pages/<slug>.json; the markup below is what each page used to carry.

function useScrollFade(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fadeTimer = setTimeout(() => {
          el.style.transition = "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, delay);
        obs.disconnect();
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (fadeTimer) clearTimeout(fadeTimer);
    };
  }, [delay]);
  return ref;
}

function useCountUp(target: number, duration = 1800, format: (n: number) => string = (n) => String(Math.round(n))) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let rafId: number | null = null;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let start: number | null = null;
      function tick(ts: number) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const e = 1 - Math.pow(1 - p, 3);
        if (el) el.textContent = format(e * target);
        if (p < 1) rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [target, duration, format]);
  return ref;
}

// Where the floating hero emoji sit, by layout: [top, left|right, offset, size class, delay, rotation].
type Floater = { top: string; side: "left" | "right"; offset: string; size: string; delay: string; rot: string };
const FLOATER_LAYOUTS: Record<string, Floater[]> = {
  four: [
    { top: "16%", side: "left", offset: "9%", size: "text-4xl", delay: "0.2s", rot: "-8deg" },
    { top: "62%", side: "left", offset: "6%", size: "text-3xl", delay: "1.6s", rot: "6deg" },
    { top: "20%", side: "right", offset: "8%", size: "text-4xl", delay: "0.9s", rot: "10deg" },
    { top: "68%", side: "right", offset: "11%", size: "text-3xl", delay: "2.3s", rot: "-6deg" },
  ],
  "three-a": [
    { top: "16%", side: "left", offset: "9%", size: "text-4xl", delay: "0.2s", rot: "-8deg" },
    { top: "62%", side: "left", offset: "7%", size: "text-3xl", delay: "1.5s", rot: "8deg" },
    { top: "20%", side: "right", offset: "8%", size: "text-4xl", delay: "0.9s", rot: "-10deg" },
  ],
  "three-b": [
    { top: "18%", side: "left", offset: "8%", size: "text-4xl", delay: "0.2s", rot: "-6deg" },
    { top: "64%", side: "left", offset: "10%", size: "text-3xl", delay: "1.4s", rot: "8deg" },
    { top: "22%", side: "right", offset: "9%", size: "text-4xl", delay: "0.7s", rot: "-10deg" },
  ],
};

// Flow diagram step colours are part of the design, not the content.
const TOP_COLORS = ["rgba(139,92,246,0.12)", "rgba(59,130,246,0.12)", "rgba(245,183,49,0.15)"];
const BOTTOM_COLORS = ["rgba(239,68,68,0.12)", "rgba(16,185,129,0.12)", "rgba(245,183,49,0.15)"];

const formatter = (prefix: string, decimals: number, suffix: string) => (n: number) =>
  `${prefix}${decimals ? n.toFixed(decimals) : Math.round(n)}${suffix}`;

function HeroSection({ d }: { d: LandingPageData }) {
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    let animId: number;
    const start = performance.now();
    function animate() {
      const t = (performance.now() - start) / 1000;
      if (blob1.current) {
        blob1.current.style.transform = `translate(${Math.sin(t * 0.6) * 180 + Math.sin(t * 0.25) * 70}px, ${Math.cos(t * 0.45) * 130 + Math.cos(t * 0.18) * 50}px)`;
      }
      if (blob2.current) {
        blob2.current.style.transform = `translate(${Math.sin(t * 0.5 + 2) * 160 + Math.cos(t * 0.35) * 60}px, ${Math.cos(t * 0.6 + 1) * 140 + Math.sin(t * 0.28) * 50}px)`;
      }
      if (blob3.current) {
        blob3.current.style.transform = `translate(${Math.sin(t * 0.55 + 4) * 140 + Math.sin(t * 0.3) * 50}px, ${Math.cos(t * 0.5 + 2) * 120 + Math.cos(t * 0.4) * 40}px)`;
      }
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const path = underlineRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);
    let animId: number;
    const timer = setTimeout(() => {
      let startTime: number | null = null;
      function draw(ts: number) {
        if (!startTime) startTime = ts;
        const p = Math.min((ts - startTime) / 1200, 1);
        const e = 1 - Math.pow(1 - p, 3);
        path!.style.strokeDashoffset = String(length * (1 - e));
        if (p < 1) animId = requestAnimationFrame(draw);
      }
      animId = requestAnimationFrame(draw);
    }, 400);
    return () => { clearTimeout(timer); cancelAnimationFrame(animId); };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden pt-32 px-4" style={{ backgroundColor: "#F8F6F2" }}>
      {/* Blobs */}
      <div ref={blob1} aria-hidden="true" style={{ position: "absolute", top: "-80px", left: "-120px", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.32) 0%, rgba(255,160,0,0.12) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none", willChange: "transform" }} />
      <div ref={blob2} aria-hidden="true" style={{ position: "absolute", bottom: "-60px", right: "-100px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.22) 0%, rgba(255,200,50,0.08) 45%, transparent 68%)", filter: "blur(50px)", pointerEvents: "none", willChange: "transform" }} />
      <div ref={blob3} aria-hidden="true" style={{ position: "absolute", top: "30%", right: "20%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.12) 0%, transparent 65%)", filter: "blur(45px)", pointerEvents: "none", willChange: "transform" }} />

      {/* Floating signals */}
      {(FLOATER_LAYOUTS[d.floaterLayout] ?? FLOATER_LAYOUTS.four).map((f, i) => (
        <span key={i} className={`lp-float-icon hidden sm:block ${f.size} lp-pop-in`} aria-hidden="true" style={{ top: f.top, [f.side]: f.offset, animationDelay: f.delay, ["--lp-rot" as any]: f.rot }}>{d.floatingIcons[i]}</span>
      ))}

      {d.heroDecoration === "trade-route" && (
        <svg aria-hidden="true" className="hidden sm:block" style={{ position: "absolute", top: "58%", right: "6%", width: "220px", height: "90px", pointerEvents: "none" }} viewBox="0 0 220 90">
          <path id="trade-route-path" d="M6 78 Q70 8 214 20" stroke="rgba(245,183,49,0.35)" strokeWidth="2" strokeDasharray="5 6" fill="none" strokeLinecap="round" />
          <circle cx="6" cy="78" r="4" fill="#D97706" opacity="0.5" />
          <circle cx="214" cy="20" r="4" fill="#D97706" opacity="0.5" />
          <text x="0" y="20" fontSize="16">✈️
            <animateMotion dur="4.5s" repeatCount="indefinite" rotate="auto">
              <mpath href="#trade-route-path" />
            </animateMotion>
          </text>
        </svg>
      )}

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Breadcrumbs items={[{ label: d.breadcrumbLabel, href: `/lp/${d.slug}` }]} className="justify-center" />
        {d.badgeEffect === "radar" ? (
          <div className="mb-6 hero-fade-d1 relative inline-block">
            <span className="lp-radar-ring" aria-hidden="true" />
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full relative" style={{ backgroundColor: "rgba(245,183,49,0.12)", color: "#A14A08", border: "1px solid rgba(245,183,49,0.35)" }}>
              {d.badge}
            </span>
          </div>
        ) : (
          <div className="mb-6 hero-fade-d1">
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full" style={{ backgroundColor: "rgba(245,183,49,0.12)", color: "#A14A08", border: "1px solid rgba(245,183,49,0.35)" }}>
              {d.badge}
            </span>
          </div>
        )}

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] hero-fade-d2" style={{ color: "#0a0a0a" }}>
          {d.h1Line1 && <>{d.h1Line1}<br /></>}
          {d.h1Before && <>{d.h1Before}{" "}</>}
          <span className="relative inline-block">
            {d.h1Underlined}
            <svg aria-hidden="true" style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%", height: "12px", overflow: "visible" }} viewBox={`0 0 ${d.underlineWidth} 12`} preserveAspectRatio="none">
              <path ref={underlineRef} d={`M4 8 Q${d.underlineWidth / 4} 3 ${d.underlineWidth / 2} 7 Q${(d.underlineWidth * 3) / 4} 11 ${d.underlineWidth - 4} 6`} stroke="#F5B731" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          {d.h1BreakAfter ? <><br />{d.h1After}</> : /^[.,!?;:]/.test(d.h1After) ? d.h1After : <>{" "}{d.h1After}</>}
        </h1>

        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 hero-fade-d3" style={{ color: "#52525B" }}>
          {d.heroSubheading}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center hero-fade-d3">
          <a href="/book-a-call"
            className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2">
            {d.primaryCta}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <a href="#get-started" className="px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2 rounded-xl border transition-colors" style={{ borderColor: "#D0C9BF", color: "#0a0a0a", backgroundColor: "rgba(255,255,255,0.7)" }}>
            {d.secondaryCta}
          </a>
        </div>
        <p className="mt-5 text-xs hero-fade-d3" style={{ color: "#71675E" }}>{d.heroNote}</p>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-fade-d3" aria-hidden="true">
        <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, rgba(245,183,49,0.6), transparent)", margin: "0 auto" }} />
      </div>
    </section>
  );
}

function StatsSection({ d }: { d: LandingPageData }) {
  const s = d.stats;
  const ref0 = useCountUp(s[0].target, 1600, formatter(s[0].prefix, s[0].decimals, s[0].suffix));
  const ref1 = useCountUp(s[1].target, 1400, formatter(s[1].prefix, s[1].decimals, s[1].suffix));
  const ref2 = useCountUp(s[2].target, 1500, formatter(s[2].prefix, s[2].decimals, s[2].suffix));
  const ref3 = useCountUp(s[3].target, 1800, formatter(s[3].prefix, s[3].decimals, s[3].suffix));
  const refs = [ref0, ref1, ref2, ref3];
  const fade = useScrollFade();
  const items = refs.map((ref, i) => (
    <div key={i} className="lp-stat text-center">
      <div className="text-xl mb-1 lp-icon-bob" style={{ animationDelay: `${i * 0.25}s` }} aria-hidden="true">{s[i].icon}</div>
      <div className="text-4xl sm:text-5xl font-black mb-2" style={{ color: "#0a0a0a" }}>
        <span ref={ref}>{`${s[i].prefix}0${s[i].suffix}`}</span>
      </div>
      <div className="text-xs leading-snug" style={{ color: "#52525B" }}>{s[i].label}</div>
    </div>
  ));

  return (
    <section className="py-14 px-4 border-y" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
      {d.statsCaption ? (
        <div ref={fade} className="max-w-5xl mx-auto">
          <p className="text-center text-xs mb-8" style={{ color: "#71675E" }}>
            {d.statsCaption}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">{items}</div>
        </div>
      ) : (
        <div ref={fade} className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">{items}</div>
      )}
    </section>
  );
}

function PainSection({ d }: { d: LandingPageData }) {
  const titleFade = useScrollFade(0);
  const card1 = useScrollFade(0);
  const card2 = useScrollFade(80);
  const card3 = useScrollFade(160);
  const cards = [card1, card2, card3];

  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#F8F6F2" }}>
      <div className="max-w-5xl mx-auto">
        <div ref={titleFade} className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>{d.painEyebrow}</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-3" style={{ color: "#0a0a0a" }}>{d.painTitle}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {d.pain.map((p, i) => (
            <div key={p.heading} ref={cards[i]} className="lp-card rounded-2xl border p-8" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
              <div className="text-4xl mb-4 lp-icon-bob" style={{ animationDelay: `${i * 0.3}s` }}>{p.icon}</div>
              <h3 className="font-black text-lg mb-2" style={{ color: "#0a0a0a" }}>{p.heading}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ d }: { d: LandingPageData }) {
  const titleFade = useScrollFade(0);
  const p0 = useScrollFade(0); const p1 = useScrollFade(100); const p2 = useScrollFade(200); const p3 = useScrollFade(300);
  const delays = [p0, p1, p2, p3];
  return (
    <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
      <div className="max-w-5xl mx-auto">
        <div ref={titleFade} className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>{d.processEyebrow}</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-3" style={{ color: "#0a0a0a" }}>{d.processTitle}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {d.process.map((p, i) => (
            <div key={p.title} ref={delays[i]} className="lp-card flex gap-5 rounded-2xl border p-8" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
              <span className="lp-card-number text-3xl font-black flex-shrink-0 leading-none mt-1" style={{ color: "#A14A08" }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-black text-lg mb-2" style={{ color: "#0a0a0a" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection({ d }: { d: LandingPageData }) {
  const titleFade = useScrollFade(0);
  const t = d.track;
  const r0 = useCountUp(t[0].target, 1600, formatter(t[0].prefix, 0, t[0].suffix));
  const r1 = useCountUp(t[1].target, 1400, formatter(t[1].prefix, 0, t[1].suffix));
  const r2 = useCountUp(t[2].target, 1800, formatter(t[2].prefix, 0, t[2].suffix));
  const r3 = useCountUp(t[3].target, 1500, formatter(t[3].prefix, 0, t[3].suffix));
  const refs = [r0, r1, r2, r3];

  return (
    <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
      <div className="max-w-5xl mx-auto">
        <div ref={titleFade} className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>{d.trackEyebrow}</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-3" style={{ color: "#0a0a0a" }}>{d.trackTitle}</h2>
        </div>
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8${d.trackLinkText ? " mb-10" : ""}`}>
          {t.map((item, i) => (
            <div key={item.label} className="lp-card rounded-2xl border p-8 text-center" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
              <div className="text-xl mb-2" aria-hidden="true">{item.icon}</div>
              <div className="text-3xl sm:text-4xl font-black mb-2" style={{ color: "#0a0a0a" }}>
                <span ref={refs[i]}>{`${item.prefix}0${item.suffix}`}</span>
              </div>
              <div className="text-xs leading-snug" style={{ color: "#52525B" }}>{item.label}</div>
            </div>
          ))}
        </div>
        {d.trackLinkText && d.trackLinkHref && (
          <div className="text-center">
            <Link href={d.trackLinkHref} className="text-sm font-bold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
              style={{ color: "#A14A08" }}>
              {d.trackLinkText}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function CaseCardsSection({ d }: { d: LandingPageData }) {
  const titleFade = useScrollFade(0);
  const c1 = useScrollFade(0);
  const c2 = useScrollFade(80);
  const c3 = useScrollFade(160);
  const cRefs = [c1, c2, c3];

  return (
    <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
      <div className="max-w-5xl mx-auto">
        <div ref={titleFade} className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>{d.trackEyebrow}</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-3" style={{ color: "#0a0a0a" }}>{d.trackTitle}</h2>
        </div>
        <div className="space-y-6">
          {d.caseCards.map((cs, i) => (
            <div key={cs.tag} ref={cRefs[i]} className="lp-card rounded-2xl border p-8" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#71675E" }}>{cs.tag}</span>
              <h3 className="text-2xl font-black mt-2 mb-4" style={{ color: "#0a0a0a" }}>{cs.headline}</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#52525B" }}>{cs.body}</p>
              <div className="flex flex-wrap gap-3">
                {cs.results.map((r) => (
                  <span key={r} className="lp-pill text-xs font-bold px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(245,183,49,0.12)", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>{r}</span>
                ))}
              </div>
              {cs.href && (
                <Link href={cs.href} className="mt-6 text-sm font-bold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all" style={{ color: "#A14A08" }}>
                  Read the case study <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          ))}
        </div>
        {d.trackLinkText && d.trackLinkHref && (
          <div className="mt-8">
            <Link href={d.trackLinkHref} className="text-sm font-bold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all" style={{ color: "#A14A08" }}>
              {d.trackLinkText} <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function WhySection({ d }: { d: LandingPageData }) {
  const titleFade = useScrollFade(0);
  const c1 = useScrollFade(0); const c2 = useScrollFade(80); const c3 = useScrollFade(160);
  const cRefs = [c1, c2, c3];
  return (
    <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
      <div className="max-w-5xl mx-auto">
        <div ref={titleFade} className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>{d.whyEyebrow}</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-3" style={{ color: "#0a0a0a" }}>{d.whyTitle}</h2>
          <p className="text-base mt-4 max-w-2xl" style={{ color: "#52525B" }}>
            {d.whyIntro}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {d.whyCards.map((p, i) => (
            <div key={p.title} ref={cRefs[i]} className="lp-card rounded-2xl border p-8" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
              <div className="text-4xl mb-4 lp-icon-bob" style={{ animationDelay: `${i * 0.3}s` }}>{p.icon}</div>
              <h3 className="font-black text-lg mb-2" style={{ color: "#0a0a0a" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScenariosSection({ d }: { d: LandingPageData }) {
  const titleFade = useScrollFade(0);
  const c1 = useScrollFade(0);
  const c2 = useScrollFade(80);
  const c3 = useScrollFade(160);
  const cRefs = [c1, c2, c3];

  return (
    <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
      <div className="max-w-5xl mx-auto">
        <div ref={titleFade} className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>{d.scenariosEyebrow}</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-3" style={{ color: "#0a0a0a" }}>{d.scenariosTitle}</h2>
          <p className="text-sm mt-3 max-w-2xl" style={{ color: "#71675E" }}>
            {d.scenariosIntro}
          </p>
        </div>
        <div className="space-y-6">
          {d.scenarios.map((cs, i) => (
            <div key={cs.tag} ref={cRefs[i]} className="lp-card rounded-2xl border p-8" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#71675E" }}>{cs.tag}</span>
              <h3 className="text-2xl font-black mt-2 mb-4" style={{ color: "#0a0a0a" }}>{cs.headline}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{cs.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DarkCTASection({ d }: { d: LandingPageData }) {
  const fade = useScrollFade(0);
  return (
    <section className="relative py-24 px-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "30%", width: "600px", height: "400px", marginTop: "-200px", marginLeft: "-300px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(245,183,49,0.15) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div ref={fade} className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-black mb-5 leading-tight" style={{ color: "#0A0A0A" }}>
          {d.ctaHeading}
        </h2>
        <p className="text-lg mb-10" style={{ color: "#52525B" }}>
          {d.ctaBody}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/book-a-call"
            className="px-8 py-4 rounded-xl text-base font-bold inline-flex items-center justify-center gap-2"
            style={{ backgroundColor: "#F5B731", color: "#0a0a0a" }}>
            {d.primaryCta}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <a href="#get-started" className="px-8 py-4 rounded-xl text-base font-bold inline-flex items-center justify-center gap-2 border" style={{ backgroundColor: "#FFFFFF", borderColor: "#D0C9BF", color: "#0A0A0A" }}>
            Fill out the form below
          </a>
        </div>
      </div>
    </section>
  );
}

function FormSection({ d }: { d: LandingPageData }) {
  const fade = useScrollFade(0);
  return (
    <section id="get-started" className="py-20 px-4" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-2xl mx-auto">
        <div ref={fade} className="text-center mb-10">
          <h2 className="text-4xl font-black mb-3" style={{ color: "#0a0a0a" }}>{d.formHeading}</h2>
          <p className="text-base" style={{ color: "#52525B" }}>{d.formBody}</p>
        </div>
        <div className="rounded-2xl border p-8" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
          {d.slug === "agency-partners" ? <PartnerForm d={d} /> : (
          <form className="space-y-4"
            action="https://forms.zohopublic.com/flintstop/form/MyntmoreWebsiteform/formperma/3F8IpEgLtb2RnoXcr_yUsp56_-WdQdO2-sM6eaCOKi0/htmlRecords/submit"
            name="form" id="form" method="POST" acceptCharset="UTF-8" encType="multipart/form-data">
            <LeadSourceField />
            <input type="hidden" name="zf_redirect_url" value="https://www.myntmore.com/thank-you" />
            <input type="hidden" name="zc_gad" value="" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="SingleLine" className="block text-xs font-semibold mb-1.5" style={{ color: "#3D3D3D" }}>Full Name *</label>
                <input id="SingleLine" name="SingleLine" type="text" required maxLength={255} placeholder={d.namePlaceholder} className="w-full px-4 py-3 rounded-xl text-sm outline-none border" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#0a0a0a" }} />
              </div>
              <div>
                <label htmlFor="SingleLine2" className="block text-xs font-semibold mb-1.5" style={{ color: "#3D3D3D" }}>Designation *</label>
                <input id="SingleLine2" name="SingleLine2" type="text" required maxLength={255} placeholder={d.designationPlaceholder} className="w-full px-4 py-3 rounded-xl text-sm outline-none border" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#0a0a0a" }} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="SingleLine3" className="block text-xs font-semibold mb-1.5" style={{ color: "#3D3D3D" }}>{d.companyLabel}</label>
                <input id="SingleLine3" name="SingleLine3" type="text" maxLength={255} placeholder={d.companyPlaceholder} className="w-full px-4 py-3 rounded-xl text-sm outline-none border" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#0a0a0a" }} />
              </div>
              <div>
                <label htmlFor="PhoneNumber_countrycode" className="block text-xs font-semibold mb-1.5" style={{ color: "#3D3D3D" }}>Phone</label>
                <input id="PhoneNumber_countrycode" name="PhoneNumber_countrycode" type="tel" maxLength={20} placeholder={d.phonePlaceholder} className="w-full px-4 py-3 rounded-xl text-sm outline-none border" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#0a0a0a" }} />
              </div>
            </div>
            <div>
              <label htmlFor="Email" className="block text-xs font-semibold mb-1.5" style={{ color: "#3D3D3D" }}>Work Email *</label>
              <input id="Email" name="Email" type="email" required maxLength={255} placeholder={d.emailPlaceholder} className="w-full px-4 py-3 rounded-xl text-sm outline-none border" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#0a0a0a" }} />
            </div>
            <SubmitButton>{d.submitLabel}</SubmitButton>
            <p className="text-center text-xs" style={{ color: "#71675E" }}>{d.formNote}</p>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}

// Agency partner applications go to the Zoho "Partner With Us" form, not the general website form.
// Field names must match that Zoho form exactly, or Zoho stores empty values.
const PARTNER_INPUT = "w-full px-4 py-3 rounded-xl text-sm outline-none border";
const PARTNER_INPUT_STYLE = { backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#0a0a0a" } as const;
const PARTNER_LABEL_STYLE = { color: "#3D3D3D" } as const;

function PartnerForm({ d }: { d: LandingPageData }) {
  const [firstPlaceholder, ...rest] = (d.namePlaceholder || "").split(" ");
  const lastPlaceholder = rest.join(" ");
  return (
    <form className="space-y-4"
      action="https://forms.zohopublic.com/flintstop/form/PartnerWithUs/formperma/QuX_ef4ymZVzJx6nIuD2oXldohvw3iNEq3N0Qs8XER8/htmlRecords/submit"
      name="form" id="form" method="POST" acceptCharset="UTF-8" encType="multipart/form-data">
      <LeadSourceField />
      <input type="hidden" name="zf_redirect_url" value="https://www.myntmore.com/thank-you" />
      <input type="hidden" name="zc_gad" value="" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="Name_First" className="block text-xs font-semibold mb-1.5" style={PARTNER_LABEL_STYLE}>First Name *</label>
          <input id="Name_First" name="Name_First" type="text" required maxLength={255} placeholder={firstPlaceholder} className={PARTNER_INPUT} style={PARTNER_INPUT_STYLE} />
        </div>
        <div>
          <label htmlFor="Name_Last" className="block text-xs font-semibold mb-1.5" style={PARTNER_LABEL_STYLE}>Last Name *</label>
          <input id="Name_Last" name="Name_Last" type="text" required maxLength={255} placeholder={lastPlaceholder} className={PARTNER_INPUT} style={PARTNER_INPUT_STYLE} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="PhoneNumber_countrycode" className="block text-xs font-semibold mb-1.5" style={PARTNER_LABEL_STYLE}>Phone *</label>
          <input id="PhoneNumber_countrycode" name="PhoneNumber_countrycode" type="tel" required maxLength={20} placeholder={d.phonePlaceholder} className={PARTNER_INPUT} style={PARTNER_INPUT_STYLE} />
        </div>
        <div>
          <label htmlFor="Email" className="block text-xs font-semibold mb-1.5" style={PARTNER_LABEL_STYLE}>Email *</label>
          <input id="Email" name="Email" type="email" required maxLength={255} placeholder={d.emailPlaceholder} className={PARTNER_INPUT} style={PARTNER_INPUT_STYLE} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="SingleLine" className="block text-xs font-semibold mb-1.5" style={PARTNER_LABEL_STYLE}>Designation *</label>
          <input id="SingleLine" name="SingleLine" type="text" required maxLength={255} placeholder={d.designationPlaceholder} className={PARTNER_INPUT} style={PARTNER_INPUT_STYLE} />
        </div>
        <div>
          <label htmlFor="SingleLine1" className="block text-xs font-semibold mb-1.5" style={PARTNER_LABEL_STYLE}>Company Name *</label>
          <input id="SingleLine1" name="SingleLine1" type="text" required maxLength={255} placeholder={d.companyPlaceholder} className={PARTNER_INPUT} style={PARTNER_INPUT_STYLE} />
        </div>
      </div>
      <SubmitButton>{d.submitLabel}</SubmitButton>
      <p className="text-center text-xs" style={{ color: "#71675E" }}>{d.formNote}</p>
    </form>
  );
}

export default function LandingPage({ data: d }: { data: LandingPageData }) {
  const faqItems = pageFaqsQA(`lp-${d.slug}`);
  return (
    <LpLayout>
      <JsonLd data={buildFaqSchema(faqItems.map((f) => ({ question: f.q, answer: f.a })))} />
      <HeroSection d={d} />
      <StatsSection d={d} />
      <PainSection d={d} />
      <FlowDiagram
        badge={d.flowBadge}
        title={d.flowTitle}
        topSteps={d.flowTop.map((s, i) => ({ n: String(i + 1).padStart(2, "0"), icon: s.icon, title: s.title, body: s.body, color: TOP_COLORS[i] }))}
        parallel={{ label: d.flowParallelLabel, items: d.flowParallel }}
        bottomSteps={d.flowBottom.map((s, i) => ({ n: String(i + 4).padStart(2, "0"), icon: s.icon, title: s.title, body: s.body, color: BOTTOM_COLORS[i] }))}
      />
      <ProcessSection d={d} />
      {d.trackStyle === "case-cards" ? <CaseCardsSection d={d} /> : d.trackStyle === "none" ? null : <CaseStudiesSection d={d} />}
      {d.scenarios.length > 0 && <ScenariosSection d={d} />}
      {d.whyCards.length > 0 && <WhySection d={d} />}
      <Faq title={d.faqTitle} items={faqItems} />
      <CityLinks
        industry={LANDING_PAGE_INDUSTRY[d.slug]}
        heading="Where we run this in India"
        intro="City by city: the local industries we write for, and what outbound looks like there."
      />
      <DarkCTASection d={d} />
      <FormSection d={d} />
    </LpLayout>
  );
}
