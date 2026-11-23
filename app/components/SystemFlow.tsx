"use client";

import { useEffect, useRef } from "react";
import { textTone } from "@/lib/colors";
import home from "@/content/site-copy/home.json";

// The step titles and descriptions are edited in the admin (Homepage > The Myntmore system); the
// layout has exactly six positions, each with its own number, icon and colour.
const STEP_LOOKS = [
  {
    number: "01",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    color: "#a855f7",
  },
  {
    number: "02",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    color: "#3b82f6",
  },
  {
    number: "03",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    color: "#F5B731",
  },
  {
    number: "04",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
    color: "#ff6b35",
  },
  {
    number: "05",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    color: "#ff6b35",
  },
  {
    number: "06",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    color: "#22c55e",
  },
];
const STEPS = STEP_LOOKS.map((look, i) => ({ ...look, ...home.systemFlow.steps[i] }));

// ─── Traveling dot on a horizontal arrow ─────────────────────────────────────
function HDot({ fromColor, toColor, delay, duration }: { fromColor: string; toColor: string; delay: string; duration: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "-4px",
        left: "-5px",
        width: "9px",
        height: "9px",
        borderRadius: "50%",
        background: `linear-gradient(90deg, ${fromColor}, ${toColor})`,
        boxShadow: `0 0 10px 3px ${fromColor}aa`,
        animation: `wf-flow-right ${duration} ease-in-out infinite`,
        animationDelay: delay,
        willChange: "left",
        zIndex: 10,
      }}
    />
  );
}

// ─── Traveling dot on a vertical arrow ───────────────────────────────────────
function VDot({ fromColor, toColor, delay, duration }: { fromColor: string; toColor: string; delay: string; duration: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-4px",
        top: "-5px",
        width: "9px",
        height: "9px",
        borderRadius: "50%",
        background: `linear-gradient(180deg, ${fromColor}, ${toColor})`,
        boxShadow: `0 0 10px 3px ${fromColor}aa`,
        animation: `wf-flow-down ${duration} ease-in-out infinite`,
        animationDelay: delay,
        willChange: "top",
        zIndex: 10,
      }}
    />
  );
}

export default function SystemFlow() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const blob1Ref     = useRef<HTMLDivElement>(null);
  const blob2Ref     = useRef<HTMLDivElement>(null);
  const blob3Ref     = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null, null]);
  const loopInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Scroll-entry animation + start the activation loop ───────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let loopStarted = false;
    const revealTimers: ReturnType<typeof setTimeout>[] = [];
    let startLoopTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const elements = section.querySelectorAll("[data-seq]");
      elements.forEach((el) => {
        const seq  = Number((el as HTMLElement).dataset.seq);
        const type = (el as HTMLElement).dataset.type;
        revealTimers.push(setTimeout(() => {
          const e = el as HTMLElement;
          if (type === "card")   { e.style.opacity = "1"; e.style.transform = "translateY(0)"; }
          if (type === "harrow") { e.style.transform = "scaleX(1)"; }
          if (type === "varrow") { e.style.transform = "scaleY(1)"; }
          if (type === "final")  { e.style.opacity = "1"; e.style.transform = "translateY(0)"; }
        }, seq * 140));
      });

      if (!loopStarted) {
        loopStarted = true;
        startLoopTimer = setTimeout(startLoop, 2400);
      }
    }, { threshold: 0.12 });

    observer.observe(section);
    return () => {
      observer.disconnect();
      revealTimers.forEach(clearTimeout);
      if (startLoopTimer) clearTimeout(startLoopTimer);
      if (loopInterval.current) clearInterval(loopInterval.current);
    };
  }, []);

  function startLoop() {
    let active = 0;

    function pulse() {
      cardRefs.current.forEach((el) => {
        if (!el) return;
        el.style.borderColor  = "#E8E2D9";
        el.style.boxShadow    = "0 1px 4px rgba(0,0,0,0.04)";
        el.style.background   = "#ffffff";
      });
      const el = cardRefs.current[active];
      if (el) {
        const c = STEPS[active].color;
        el.style.borderColor = c;
        el.style.boxShadow   = `0 0 0 1px ${c}55, 0 8px 32px ${c}22`;
        el.style.background  = `linear-gradient(135deg, ${c}09 0%, #ffffff 55%)`;
      }
      active = (active + 1) % 6;
    }

    pulse();
    loopInterval.current = setInterval(pulse, 1700);
  }

  // ── Blob parallax animation ───────────────────────────────────────────────
  useEffect(() => {
    if (window.innerWidth < 768) return; // skip blob animation on mobile
    let animId: number;
    const start = performance.now();
    function animate() {
      const t = (performance.now() - start) / 1000;
      if (blob1Ref.current) blob1Ref.current.style.transform = `translate(${Math.sin(t * 0.5) * 180 + Math.sin(t * 0.2) * 60}px, ${Math.cos(t * 0.4) * 120 + Math.cos(t * 0.15) * 50}px)`;
      if (blob2Ref.current) blob2Ref.current.style.transform = `translate(${Math.sin(t * 0.45 + 2) * 180 + Math.cos(t * 0.25) * 60}px, ${Math.cos(t * 0.5 + 1) * 120 + Math.sin(t * 0.2) * 50}px)`;
      if (blob3Ref.current) blob3Ref.current.style.transform = `translate(${Math.sin(t * 0.35 + 4) * 150 + Math.sin(t * 0.3) * 50}px, ${Math.cos(t * 0.55 + 2) * 100 + Math.cos(t * 0.25) * 40}px)`;
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── Helper: horizontal arrow with traveling dot ──────────────────────────
  function HArrow({
    seq, fromColor, toColor, delay = "0s", duration = "2s",
  }: { seq: number; fromColor: string; toColor: string; delay?: string; duration?: string }) {
    return (
      <div
        className="flex items-center justify-center px-1"
        data-seq={seq}
        data-type="harrow"
        style={{ transform: "scaleX(0)", transformOrigin: "left center", transition: "transform 0.4s ease" }}
      >
        <div className="flex items-center w-full">
          <div className="flex-1" style={{ position: "relative", height: "1px", background: `linear-gradient(to right, ${fromColor}, ${toColor})` }}>
            <HDot fromColor={fromColor} toColor={toColor} delay={delay} duration={duration} />
          </div>
          <svg className="w-3 h-3 flex-shrink-0" style={{ color: toColor }} fill="none" viewBox="0 0 12 12">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    );
  }

  // ─── Helper: vertical arrow with traveling dot ────────────────────────────
  function VArrow({
    seq, fromColor, toColor, delay = "0s", duration = "1.2s",
  }: { seq: number; fromColor: string; toColor: string; delay?: string; duration?: string }) {
    return (
      <div className="flex justify-center mt-1">
        <div
          data-seq={seq}
          data-type="varrow"
          style={{ transform: "scaleY(0)", transformOrigin: "top center", transition: "transform 0.35s ease" }}
        >
          <div className="flex flex-col items-center">
            <div style={{ position: "relative", width: "1px", height: "28px", background: `linear-gradient(to bottom, ${fromColor}, ${toColor})` }}>
              <VDot fromColor={fromColor} toColor={toColor} delay={delay} duration={duration} />
            </div>
            <svg className="w-3 h-3" style={{ color: toColor }} fill="none" viewBox="0 0 12 12">
              <path d="M6 2v8M3 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // ─── LinkedIn parallel track (shared between mobile + desktop) ───────────
  const LinkedInTrack = ({ seq }: { seq: number }) => (
    <div
      data-seq={seq} data-type="card"
      className="my-2 rounded-2xl border overflow-hidden"
      style={{
        opacity:0, transform:"translateY(14px)",
        transition:"opacity 0.5s ease, transform 0.5s ease",
        background:"linear-gradient(135deg, rgba(10,102,194,0.07) 0%, rgba(168,85,247,0.06) 100%)",
        borderColor:"rgba(10,102,194,0.22)",
        position:"relative",
      }}
    >
      <div aria-hidden="true" style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", borderRadius:"inherit" }}>
        <div style={{ position:"absolute", top:0, bottom:0, left:0, width:"40%", background:"linear-gradient(90deg, transparent 0%, rgba(10,102,194,0.07) 50%, transparent 100%)", animation:"wf-shimmer 3.5s ease-in-out infinite" }} />
      </div>
      <div className="relative z-10 px-4 sm:px-6 py-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:"rgba(10,102,194,0.12)", color:"#0a66c2" }}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest" style={{ color:"#0a66c2" }}>{home.systemFlow.brandEyebrow}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background:"rgba(10,102,194,0.1)", color:"#0a66c2" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background:"#0a66c2" }} />
                {home.systemFlow.brandBadge}
              </span>
            </div>
            <p className="text-[#0a0a0a] font-bold text-sm sm:text-base mt-0.5">{home.systemFlow.brandTitle}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {home.systemFlow.brandItems.map((b) => ({ icon: "✦", title: b.title, desc: b.description })).map((item) => (
            <div key={item.title} className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background:"rgba(10,102,194,0.05)" }}>
              <span className="text-xs mt-0.5 flex-shrink-0" style={{ color:"#0a66c2" }}>{item.icon}</span>
              <div>
                <p className="text-[#0a0a0a] font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-[#71675E] text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── Final result card (shared) ───────────────────────────────────────────
  const FinalCard = ({ seq }: { seq: number }) => (
    <div
      data-seq={seq} data-type="final"
      className="rounded-2xl p-6 sm:p-8 border text-center relative overflow-hidden"
      style={{
        background:"linear-gradient(135deg, #FEF9EC 0%, #FFFBF0 100%)",
        borderColor:"rgba(245,183,49,0.4)",
        opacity:0, transform:"translateY(14px)",
        transition:"opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div aria-hidden="true" style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center, rgba(245,183,49,0.09) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div aria-hidden="true" style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", borderRadius:"inherit" }}>
        <div style={{ position:"absolute", top:0, bottom:0, left:0, width:"30%", background:"linear-gradient(90deg, transparent 0%, rgba(245,183,49,0.1) 50%, transparent 100%)", animation:"wf-shimmer 4s ease-in-out infinite", animationDelay:"1s" }} />
      </div>
      <div className="relative z-10">
        <div className="text-3xl mb-2">💰</div>
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border mb-3" style={{ color:"#A14A08", borderColor:"rgba(245,183,49,0.4)", background:"rgba(245,183,49,0.08)" }}>
          {home.systemFlow.resultEyebrow}
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-[#0a0a0a] mb-2">{home.systemFlow.resultHeading}</h3>
        <p className="text-[#52525B] text-sm max-w-lg mx-auto">
          {home.systemFlow.resultText}
        </p>
      </div>
    </div>
  );

  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#F8F6F2" }}
      aria-labelledby="system-heading"
    >
      {/* Animated background blobs, very subtle */}
      <div ref={blob1Ref} aria-hidden="true" style={{ position:"absolute", top:"20%", left:"15%", width:"600px", height:"600px", marginTop:"-300px", marginLeft:"-300px", borderRadius:"50%", background:"radial-gradient(circle, rgba(245,183,49,0.09) 0%, rgba(255,160,0,0.04) 45%, transparent 68%)", filter:"blur(80px)", pointerEvents:"none", willChange:"transform" }} />
      <div ref={blob2Ref} aria-hidden="true" style={{ position:"absolute", top:"60%", left:"80%", width:"550px", height:"550px", marginTop:"-275px", marginLeft:"-275px", borderRadius:"50%", background:"radial-gradient(circle, rgba(168,85,247,0.08) 0%, rgba(124,58,237,0.03) 45%, transparent 68%)", filter:"blur(80px)", pointerEvents:"none", willChange:"transform" }} />
      <div ref={blob3Ref} aria-hidden="true" style={{ position:"absolute", top:"50%", left:"50%", width:"500px", height:"500px", marginTop:"-250px", marginLeft:"-250px", borderRadius:"50%", background:"radial-gradient(circle, rgba(255,107,53,0.07) 0%, rgba(255,60,0,0.03) 45%, transparent 68%)", filter:"blur(80px)", pointerEvents:"none", willChange:"transform" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4 px-3 py-1 rounded-full border" style={{ color:"#A14A08", borderColor:"rgba(245,183,49,0.35)", background:"#FEF9EC" }}>
            {home.systemFlow.eyebrow}
          </span>
          <h2 id="system-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0a0a0a]">
            {home.systemFlow.headingLine1}
            <br />
            <span style={{ color:"#A14A08" }}>{home.systemFlow.headingLine2}</span>
          </h2>
          <p className="mt-4 text-[#52525B] text-base sm:text-lg max-w-xl mx-auto">
            {home.systemFlow.intro}
          </p>
        </div>

        {/* ── Flow diagram ─────────────────────────────────────────────────── */}
        <div ref={sectionRef}>

          {/* ── MOBILE layout: vertical stacked cards ─────────────────────── */}
          <div className="lg:hidden space-y-3">
            {STEPS.map((step, i) => (
              <div key={step.number}>
                <div
                  data-seq={i * 2} data-type="card"
                  className="rounded-2xl p-4 border bg-white shadow-sm"
                  style={{ opacity:0, transform:"translateY(14px)", transition:"opacity 0.5s ease, transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease, background 0.5s ease", borderColor:"#E8E2D9" }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background:step.color+"18", color:step.color }}>{step.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black uppercase tracking-widest" style={{ color:textTone(step.color) }}>{step.number}</span>
                        <h3 className="text-sm font-bold text-[#0a0a0a]">{step.title}</h3>
                      </div>
                      <p className="text-[#71675E] text-xs leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>

                {/* Insert LinkedIn track after step 3 on mobile */}
                {i === 2 && (
                  <div className="mt-3">
                    <LinkedInTrack seq={13} />
                  </div>
                )}

                {/* Down arrow connector (except after last step) */}
                {i < STEPS.length - 1 && (
                  <div className="flex justify-center py-1" aria-hidden="true">
                    <svg className="w-4 h-4" style={{ color: "#D4CFC9" }} fill="none" viewBox="0 0 16 16">
                      <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {/* Final card, mobile */}
            <div className="flex justify-center py-1" aria-hidden="true">
              <svg className="w-4 h-4" style={{ color: "#A14A08" }} fill="none" viewBox="0 0 16 16">
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <FinalCard seq={14} />
          </div>

          {/* ── DESKTOP layout: original 2-row grid ───────────────────────── */}
          <div className="hidden lg:block" data-markdown-ignore>

            {/* Row 1 steps 1, 2, 3 */}
            <div className="grid grid-cols-[1fr_44px_1fr_44px_1fr] items-center gap-0">
              <div
                ref={(el) => { cardRefs.current[0] = el; }}
                data-seq="0" data-type="card"
                className="rounded-2xl p-5 border bg-white shadow-sm"
                style={{ opacity:0, transform:"translateY(14px)", transition:"opacity 0.5s ease, transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease, background 0.5s ease", borderColor:"#E8E2D9" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:STEPS[0].color+"18", color:STEPS[0].color }}>{STEPS[0].icon}</div>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color:textTone(STEPS[0].color) }}>{STEPS[0].number}</span>
                </div>
                <h3 className="text-[#0a0a0a] font-bold text-base mb-1.5">{STEPS[0].title}</h3>
                <p className="text-[#71675E] text-sm leading-relaxed">{STEPS[0].description}</p>
              </div>

              <HArrow seq={1} fromColor={STEPS[0].color} toColor={STEPS[1].color} delay="0s" duration="2s" />

              <div
                ref={(el) => { cardRefs.current[1] = el; }}
                data-seq="2" data-type="card"
                className="rounded-2xl p-5 border bg-white shadow-sm"
                style={{ opacity:0, transform:"translateY(14px)", transition:"opacity 0.5s ease, transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease, background 0.5s ease", borderColor:"#E8E2D9" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:STEPS[1].color+"18", color:STEPS[1].color }}>{STEPS[1].icon}</div>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color:textTone(STEPS[1].color) }}>{STEPS[1].number}</span>
                </div>
                <h3 className="text-[#0a0a0a] font-bold text-base mb-1.5">{STEPS[1].title}</h3>
                <p className="text-[#71675E] text-sm leading-relaxed">{STEPS[1].description}</p>
              </div>

              <HArrow seq={3} fromColor={STEPS[1].color} toColor={STEPS[2].color} delay="0.6s" duration="2s" />

              <div
                ref={(el) => { cardRefs.current[2] = el; }}
                data-seq="4" data-type="card"
                className="rounded-2xl p-5 border bg-white shadow-sm"
                style={{ opacity:0, transform:"translateY(14px)", transition:"opacity 0.5s ease, transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease, background 0.5s ease", borderColor:"#E8E2D9" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:STEPS[2].color+"18", color:STEPS[2].color }}>{STEPS[2].icon}</div>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color:textTone(STEPS[2].color) }}>{STEPS[2].number}</span>
                </div>
                <h3 className="text-[#0a0a0a] font-bold text-base mb-1.5">{STEPS[2].title}</h3>
                <p className="text-[#71675E] text-sm leading-relaxed">{STEPS[2].description}</p>
              </div>
            </div>

            <VArrow seq={5} fromColor={STEPS[2].color} toColor="#3b82f6" delay="1.2s" duration="1.1s" />
            <LinkedInTrack seq={6} />
            <VArrow seq={7} fromColor="#3b82f6" toColor={STEPS[3].color} delay="1.8s" duration="1.1s" />

            {/* Row 2 steps 4, 5, 6 */}
            <div className="grid grid-cols-[1fr_44px_1fr_44px_1fr] items-center gap-0">
              <div
                ref={(el) => { cardRefs.current[3] = el; }}
                data-seq="8" data-type="card"
                className="rounded-2xl p-5 border bg-white shadow-sm"
                style={{ opacity:0, transform:"translateY(14px)", transition:"opacity 0.5s ease, transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease, background 0.5s ease", borderColor:"#E8E2D9" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:STEPS[3].color+"18", color:STEPS[3].color }}>{STEPS[3].icon}</div>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color:textTone(STEPS[3].color) }}>{STEPS[3].number}</span>
                </div>
                <h3 className="text-[#0a0a0a] font-bold text-base mb-1.5">{STEPS[3].title}</h3>
                <p className="text-[#71675E] text-sm leading-relaxed">{STEPS[3].description}</p>
              </div>

              <HArrow seq={9} fromColor={STEPS[3].color} toColor={STEPS[4].color} delay="2.4s" duration="2s" />

              <div
                ref={(el) => { cardRefs.current[4] = el; }}
                data-seq="10" data-type="card"
                className="rounded-2xl p-5 border bg-white shadow-sm"
                style={{ opacity:0, transform:"translateY(14px)", transition:"opacity 0.5s ease, transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease, background 0.5s ease", borderColor:"#E8E2D9" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:STEPS[4].color+"18", color:STEPS[4].color }}>{STEPS[4].icon}</div>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color:textTone(STEPS[4].color) }}>{STEPS[4].number}</span>
                </div>
                <h3 className="text-[#0a0a0a] font-bold text-base mb-1.5">{STEPS[4].title}</h3>
                <p className="text-[#71675E] text-sm leading-relaxed">{STEPS[4].description}</p>
              </div>

              <HArrow seq={11} fromColor={STEPS[4].color} toColor={STEPS[5].color} delay="3s" duration="2s" />

              <div
                ref={(el) => { cardRefs.current[5] = el; }}
                data-seq="12" data-type="card"
                className="rounded-2xl p-5 border bg-white shadow-sm"
                style={{ opacity:0, transform:"translateY(14px)", transition:"opacity 0.5s ease, transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease, background 0.5s ease", borderColor:"#E8E2D9" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:STEPS[5].color+"18", color:STEPS[5].color }}>{STEPS[5].icon}</div>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color:textTone(STEPS[5].color) }}>{STEPS[5].number}</span>
                </div>
                <h3 className="text-[#0a0a0a] font-bold text-base mb-1.5">{STEPS[5].title}</h3>
                <p className="text-[#71675E] text-sm leading-relaxed">{STEPS[5].description}</p>
              </div>
            </div>

            <VArrow seq={13} fromColor={STEPS[5].color} toColor="#F5B731" delay="3.6s" duration="1.1s" />
            <FinalCard seq={14} />
          </div>

        </div>
      </div>
    </section>
  );
}
