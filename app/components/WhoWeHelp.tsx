"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

// ─── Persona illustrations (SVG line-art) ────────────────────────────────────
function RocketIllustration() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M48 72 C38 60 30 44 34 26 C38 10 58 10 62 26 C66 44 58 60 48 72Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="48" cy="36" r="6" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M34 50 L22 58 L30 66 L38 60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M62 50 L74 58 L66 66 L58 60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M40 70 L44 82 L48 78 L52 82 L56 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    </svg>
  );
}

function ChartIllustration() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="16" y="56" width="14" height="24" rx="3" stroke="currentColor" strokeWidth="2.5"/>
      <rect x="35" y="40" width="14" height="40" rx="3" stroke="currentColor" strokeWidth="2.5"/>
      <rect x="54" y="26" width="14" height="54" rx="3" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M14 82 L82 82" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M22 54 L42 38 L61 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" opacity="0.5"/>
      <circle cx="61" cy="24" r="4" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

function MegaphoneIllustration() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M20 38 L20 58 L32 58 L56 72 L56 24 L32 38 Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 38 L32 58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <path d="M24 58 L24 72 L34 72 L34 58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M62 36 C66 40 66 56 62 60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M68 30 C76 37 76 59 68 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

function NetworkIllustration() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="48" cy="48" r="10" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="20" cy="26" r="7" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="76" cy="26" r="7" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="20" cy="70" r="7" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="76" cy="70" r="7" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="27" y1="29" x2="39" y2="41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="69" y1="29" x2="57" y2="41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="27" y1="67" x2="39" y2="55" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="69" y1="67" x2="57" y2="55" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// ─── Persona data ─────────────────────────────────────────────────────────────
type Benefit = { title: string; description: string };
type Persona = {
  tab: string;
  blobColor: string;
  illustration: ReactNode;
  heading: string;
  tagline: string;
  cta: string;
  benefits: Benefit[];
};

const PERSONAS: Persona[] = [
  {
    tab: "Founders",
    blobColor: "rgba(245,183,49,0.45)",
    illustration: <RocketIllustration />,
    heading: "Stop being your own SDR.\nStart closing.",
    tagline: "You started a company to build, not to spend 4 hours a day on LinkedIn. Let Myntmore run the outbound engine.",
    cta: "Explore Founder solutions",
    benefits: [
      { title: "Pipeline without headcount", description: "Run a full outbound motion without hiring an SDR or BDR. We do it end to end: strategy, copy, execution." },
      { title: "Live in 18 days", description: "Fast onboarding means fast results. Campaigns go live within 18 days, and most founders have their first qualified conversation in weeks 3 to 4." },
      { title: "Stay focused on building", description: "You close. We fill. That's the entire model. No distractions, no micromanaging sequences, just calendar invites." },
    ],
  },
  {
    tab: "Sales Leaders",
    blobColor: "rgba(99,102,241,0.35)",
    illustration: <ChartIllustration />,
    heading: "Give your team a full calendar.\nEvery single week.",
    tagline: "Your reps are built to close, not prospect. Feed them a consistent flow of qualified, pre-warmed meetings.",
    cta: "Explore Sales Leader solutions",
    benefits: [
      { title: "Predictable meeting volume", description: "Know exactly how many qualified meetings hit your team's calendar each week: no more feast or famine." },
      { title: "Reps close 40% more", description: "When reps stop prospecting and start closing, conversion rates climb. We've seen it across 130+ B2B companies." },
      { title: "Full pipeline visibility", description: "Every meeting, touchpoint, and reply reported to your team automatically. Zero manual tracking." },
    ],
  },
  {
    tab: "Marketing Heads",
    blobColor: "rgba(239,68,68,0.3)",
    illustration: <MegaphoneIllustration />,
    heading: "ABM that reaches the\nright accounts. Every time.",
    tagline: "Stop burning budget reaching the wrong people. Our ABM campaigns target your exact ICP with surgical precision.",
    cta: "Explore Marketing solutions",
    benefits: [
      { title: "Account lists built for you", description: "We identify your highest-value target accounts and build targeted lists from scratch using intent data." },
      { title: "Multi-channel coordination", description: "Email + LinkedIn running in sync to hit the full buying committee so when your AE calls, they're already warm." },
      { title: "Campaigns live in 18 days", description: "From brief to first email sent in under three weeks. No 3-month ramp-up. No unnecessary delays." },
    ],
  },
  {
    tab: "RevOps Teams",
    blobColor: "rgba(34,197,94,0.3)",
    illustration: <NetworkIllustration />,
    heading: "Clean data. Tight sequences.\nReliable revenue.",
    tagline: "Every contact verified, every touchpoint tracked, every forecast built on data you can actually trust.",
    cta: "Explore RevOps solutions",
    benefits: [
      { title: "99% data accuracy", description: "Every contact enriched and verified before outreach goes out. No more bounces, dead leads, or dirty data." },
      { title: "Reporting live in 48 hours", description: "Full outbound reporting and pipeline dashboards set up within 2 days, so you're tracking results from day one." },
      { title: "Forecasts you can trust", description: "With every meeting, reply, and touchpoint tracked and reported consistently, your pipeline numbers become genuinely reliable." },
    ],
  },
];

const CYCLE_MS = 1800;

// ─── Component ────────────────────────────────────────────────────────────────
export default function WhoWeHelp() {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef  = useRef<HTMLDivElement>(null);
  const activeRef   = useRef(0);          // always current, readable in interval
  const pausedRef   = useRef(false);      // paused when user hovers
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionRafRef = useRef<number | null>(null);
  const transitionRafRef2 = useRef<number | null>(null);
  const [progressKey, setProgressKey] = useState(0); // forces CSS restart
  const [mounted, setMounted] = useState(false); // see the content panel below
  useEffect(() => setMounted(true), []);

  const switchTab = useCallback((idx: number, manual = false) => {
    if (manual) {
      pausedRef.current = true;
      // Resume auto-cycling a few seconds after a manual switch instead of
      // pausing forever. pausedRef used to only be cleared by onMouseLeave
      // on the tab row, which never fires on touch (a tap has no hover to
      // leave) or for keyboard-only activation, so a single tap permanently
      // stopped the carousel for the rest of the page's life.
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => { pausedRef.current = false; }, 6000);
    }
    if (idx === activeRef.current) return;
    const el = contentRef.current;
    if (el) { el.style.opacity = "0"; el.style.transform = "translateY(10px)"; }
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = setTimeout(() => {
      activeRef.current = idx;
      setActiveIndex(idx);
      setProgressKey(k => k + 1);          // restart progress bar
      transitionRafRef.current = requestAnimationFrame(() => {
        transitionRafRef2.current = requestAnimationFrame(() => {
          if (contentRef.current) {
            contentRef.current.style.opacity = "1";
            contentRef.current.style.transform = "translateY(0px)";
          }
        });
      });
    }, 320);
  }, []);

  // Auto-cycle
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (pausedRef.current) return;
      const next = (activeRef.current + 1) % PERSONAS.length;
      switchTab(next);
    }, CYCLE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      if (transitionRafRef.current) cancelAnimationFrame(transitionRafRef.current);
      if (transitionRafRef2.current) cancelAnimationFrame(transitionRafRef2.current);
    };
  }, [switchTab]);

  // Ensure content starts visible
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.opacity = "1";
      contentRef.current.style.transform = "translateY(0px)";
    }
  }, []);

  const persona = PERSONAS[activeIndex];

  return (
    <section
      style={{ backgroundColor: "#F8F6F2" }}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
      aria-labelledby="who-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2
            id="who-heading"
            className="text-3xl sm:text-5xl font-black tracking-tight text-[#0a0a0a] mb-4"
          >
            Built for every B2B growth team
          </h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: "#71675E" }}>
            Whether you&rsquo;re a founder doing outbound yourself or a VP Sales scaling a team Myntmore has a playbook for you.
          </p>
        </div>

        {/* Illustrated tab cards */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {PERSONAS.map((p, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={p.tab}
                onClick={() => switchTab(i, true)}
                className="relative rounded-2xl p-5 flex flex-col items-center text-center focus:outline-none overflow-hidden"
                style={{
                  background: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
                  border: isActive ? "1.5px solid #0a0a0a" : "1.5px solid #E8E2D9",
                  boxShadow: isActive ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
                  transition: "border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
                  cursor: "pointer",
                }}
                aria-selected={isActive}
                aria-label={`${p.tab} persona`}
              >
                {/* Persona name */}
                <span
                  className="text-sm font-semibold mb-4 transition-colors duration-200"
                  style={{ color: isActive ? "#0a0a0a" : "#71675E" }}
                >
                  {p.tab}
                </span>

                {/* Progress bar bottom of active card */}
                {isActive && (
                  <span
                    key={progressKey}
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      bottom: 0, left: 0,
                      height: "3px",
                      borderRadius: "0 0 12px 12px",
                      background: "#F5B731",
                      animation: `none`,
                      width: "100%",
                      transformOrigin: "left",
                      animationName: "tab-progress",
                      animationDuration: `${CYCLE_MS}ms`,
                      animationTimingFunction: "linear",
                      animationFillMode: "forwards",
                    }}
                  />
                )}

                {/* Illustration + blob */}
                <div className="relative w-16 h-16">
                  {/* Animated blob behind illustration only when active */}
                  <div
                    style={{
                      position: "absolute",
                      inset: "-8px",
                      borderRadius: "50%",
                      background: p.blobColor,
                      filter: "blur(14px)",
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.35s ease",
                    }}
                    aria-hidden="true"
                  />
                  <div
                    style={{ color: isActive ? "#0a0a0a" : "#C8C2BB" }}
                    className="relative z-10 transition-colors duration-300"
                  >
                    {p.illustration}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <div
          ref={contentRef}
          className="rounded-3xl overflow-hidden p-8 sm:p-12 relative"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E8E2D9",
            boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          {/* Gradient blob decorative */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-120px",
              right: "-120px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${persona.blobColor} 0%, transparent 70%)`,
              filter: "blur(80px)",
              opacity: 0.7,
              pointerEvents: "none",
            }}
          />

          {/* Every persona's panel sits in the same grid cell and only the active one is visible, so the panel keeps the
              height of the tallest persona instead of growing and shrinking as it rotates (which shifted the page below,
              a Core Web Vitals layout shift). The inactive copies are added after hydration only, so the server HTML still
              carries just the first persona; they are hidden from screen readers and the tab order. */}
          <div className="relative z-10 grid">
            {PERSONAS.map((p, idx) => (idx === activeIndex || mounted) && (
              <div
                key={p.tab}
                aria-hidden={idx === activeIndex ? undefined : true}
                className="flex flex-col lg:flex-row gap-12"
                style={{ gridArea: "1 / 1", visibility: idx === activeIndex ? "visible" : "hidden" }}
              >

                {/* LEFT Heading + tagline + CTA */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3
                    className="text-2xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight mb-4 sm:mb-5 leading-tight"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {p.heading}
                  </h3>
                  <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: "#71675E" }}>
                    {p.tagline}
                  </p>
                  <div>
                    <a
                      href="/book-a-call"
                      className="btn-dark inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold"
                    >
                      {p.cta}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* RIGHT Benefits */}
                <div className="flex-1 flex flex-col justify-center gap-7">
                  {p.benefits.map((b, i) => (
                    <div key={b.title} className="flex gap-4">
                      {/* Numbered dot */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: "#F5B731", color: "#0a0a0a" }}
                        aria-hidden="true"
                      >
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#0a0a0a] mb-1">{b.title}</h4>
                        <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{b.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
