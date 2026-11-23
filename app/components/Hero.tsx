"use client";

import { useRef, useEffect } from "react";
import { caveat } from "@/app/fonts/caveat";
import home from "@/content/site-copy/home.json";
import { countUpFormat } from "@/lib/count-up";

// Caveat is imported here rather than loaded in the root layout: it is only
// used by the two handwritten annotations below (and only on desktop, they
// are hidden on mobile), so loading it site-wide would preload a font file on
// every other page for a decoration those pages never render.

// The copy is edited in the admin (Homepage) and lives in content/site-copy/home.json.
const copy = home.hero;
// The rotating second line of the hero headline.
const PHRASES = copy.rotatingPhrases;
// Count-up length for each stat in the row, in order.
const STAT_DURATIONS = [1800, 1400, 2200];

export default function Hero() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const blob4Ref = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<HTMLSpanElement>(null);

  // Handwritten annotation refs
  const arrowRRef  = useRef<SVGPathElement>(null);
  const arrowRRef2 = useRef<SVGPathElement>(null);
  const textRRef   = useRef<HTMLDivElement>(null);
  const arrowLRef  = useRef<SVGPathElement>(null);
  const arrowLRef2 = useRef<SVGPathElement>(null);
  const textLRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return; // skip blob animation on mobile
    let animId: number;
    const start = performance.now();

    function animate() {
      const t = (performance.now() - start) / 1000;

      if (blob1Ref.current) {
        const x = Math.sin(t * 0.7) * 220 + Math.sin(t * 0.3) * 80;
        const y = Math.cos(t * 0.5) * 160 + Math.cos(t * 0.2) * 60;
        blob1Ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (blob2Ref.current) {
        const x = Math.sin(t * 0.6 + 2) * 220 + Math.cos(t * 0.4) * 80;
        const y = Math.cos(t * 0.7 + 1) * 160 + Math.sin(t * 0.3) * 60;
        blob2Ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (blob3Ref.current) {
        const x = Math.sin(t * 0.55 + 4) * 200 + Math.sin(t * 0.35) * 70;
        const y = Math.cos(t * 0.65 + 2) * 180 + Math.cos(t * 0.45) * 60;
        blob3Ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (blob4Ref.current) {
        const x = Math.sin(t * 0.65 + 1) * 190 + Math.cos(t * 0.3) * 70;
        const y = Math.cos(t * 0.5 + 3) * 160 + Math.sin(t * 0.4) * 60;
        blob4Ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Draw-in underline animation using rAF (same as blobs)
  useEffect(() => {
    const path = underlineRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);

    let animId: number;
    let startTime: number | null = null;
    const duration = 1400;

    const timer = setTimeout(() => {
      function draw(ts: number) {
        if (!path) return;
        if (!startTime) startTime = ts;
        const raw = (ts - startTime) / duration;
        const progress = Math.min(raw, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        path.style.strokeDashoffset = String(length * (1 - eased));
        if (progress < 1) {
          animId = requestAnimationFrame(draw);
        }
      }
      animId = requestAnimationFrame(draw);
    }, 500);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Number ticker animation fires after page load since hero is immediately visible
  useEffect(() => {
    // Each figure counts up from zero to the number written in it ("$120M+" counts 0 to 120).
    const stats = [stat1Ref, stat2Ref, stat3Ref].flatMap((ref, i) => {
      const figure = countUpFormat(copy.stats[i]?.value ?? "");
      return figure ? [{ ref, target: figure.target, duration: STAT_DURATIONS[i] ?? 1800, format: figure.format }] : [];
    });

    // The markup carries the real figures, so crawlers, no-JS visitors and
    // anyone who asked for reduced motion read them as-is; the count-up from
    // zero only runs once JS is here and motion is welcome. In that case CSS
    // (.motion-ok [data-count-up], set before first paint in the root layout)
    // keeps the figures invisible until they are reset to zero here, so they
    // never show real -> zero -> real.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stats.forEach(({ ref, format }) => {
      if (!ref.current) return;
      ref.current.textContent = format(0);
      ref.current.setAttribute("data-counting", "");
    });

    const animIds: number[] = [];

    const timer = setTimeout(() => {
      stats.forEach(({ ref, target, duration, format }) => {
        if (!ref.current) return;
        let startTime: number | null = null;
        function tick(ts: number) {
          if (!startTime) startTime = ts;
          const progress = Math.min((ts - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          if (ref.current) ref.current.textContent = format(eased * target);
          if (progress < 1) animIds.push(requestAnimationFrame(tick));
        }
        animIds.push(requestAnimationFrame(tick));
      });
    }, 600);

    return () => {
      clearTimeout(timer);
      animIds.forEach(cancelAnimationFrame);
    };
  }, []);

  // Cycling value-prop line
  useEffect(() => {
    const el = cycleRef.current;
    if (!el) return;

    let idx = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const rafIds: number[] = [];

    function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }

    function animateOut(onDone: () => void) {
      let start: number | null = null;
      const dur = 320;
      function step(ts: number) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const e = easeOut(p);
        if (el) {
          el.style.opacity = String(1 - e);
          el.style.transform = `translateY(${e * -18}px)`;
        }
        if (p < 1) rafIds.push(requestAnimationFrame(step));
        else onDone();
      }
      rafIds.push(requestAnimationFrame(step));
    }

    function animateIn() {
      if (el) {
        el.style.transform = "translateY(18px)";
      }
      let start: number | null = null;
      const dur = 380;
      function step(ts: number) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const e = easeOut(p);
        if (el) {
          el.style.opacity = String(e);
          el.style.transform = `translateY(${(1 - e) * 18}px)`;
        }
        if (p < 1) rafIds.push(requestAnimationFrame(step));
      }
      rafIds.push(requestAnimationFrame(step));
    }

    function cycle() {
      animateOut(() => {
        idx = (idx + 1) % PHRASES.length;
        if (el) el.textContent = PHRASES[idx];
        animateIn();
        timers.push(setTimeout(cycle, 3200));
      });
    }

    // Hold the first phrase for 3.2s before starting
    timers.push(setTimeout(cycle, 3200));

    return () => {
      timers.forEach(clearTimeout);
      rafIds.forEach(cancelAnimationFrame);
    };
  }, []);

  // Handwrite-in animation for annotations
  useEffect(() => {
    // Checked at the top of every rAF tick so an in-flight animation chain
    // stops the instant this effect's cleanup runs, instead of continuing
    // to schedule frames (and eventually calling onDone) after unmount.
    let cancelled = false;

    function animatePath(path: SVGPathElement | null, duration: number, onDone?: () => void) {
      if (!path) { onDone?.(); return; }
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      const el = path;
      let start: number | null = null;
      function step(ts: number) {
        if (cancelled) return;
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const e = 1 - Math.pow(1 - p, 2);
        el.style.strokeDashoffset = String(len * (1 - e));
        if (p < 1) requestAnimationFrame(step);
        else onDone?.();
      }
      requestAnimationFrame(step);
    }

    function revealText(el: HTMLDivElement | null, duration: number, onDone?: () => void) {
      if (!el) { onDone?.(); return; }
      el.style.clipPath = "inset(0 100% 0 0)";
      el.style.opacity = "1";
      const node = el;
      let start: number | null = null;
      function step(ts: number) {
        if (cancelled) return;
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const e = 1 - Math.pow(1 - p, 2);
        node.style.clipPath = `inset(0 ${Math.round((1 - e) * 100)}% 0 0)`;
        if (p < 1) requestAnimationFrame(step);
        else onDone?.();
      }
      requestAnimationFrame(step);
    }

    // Right annotation: text first, then arrow, starts at 1.2s
    const t1 = setTimeout(() => {
      if (cancelled) return;
      revealText(textRRef.current, 900, () => {
        animatePath(arrowRRef.current, 500, () => {
          animatePath(arrowRRef2.current, 250);
        });
      });
    }, 1200);

    // Left annotation: text first, then arrow, starts at 1.8s
    const t2 = setTimeout(() => {
      if (cancelled) return;
      revealText(textLRef.current, 800, () => {
        animatePath(arrowLRef.current, 450, () => {
          animatePath(arrowLRef2.current, 220);
        });
      });
    }, 1800);

    return () => { cancelled = true; clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 sm:pt-24 ${caveat.variable}`}
      style={{ backgroundColor: "#F8F6F2" }}
      aria-label="Hero"
    >
      {/* Yellow blob top left */}
      <div
        ref={blob1Ref}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-100px",
          left: "-150px",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,183,49,0.35) 0%, rgba(255,160,0,0.15) 40%, transparent 68%)",
          filter: "blur(55px)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />

      {/* Purple blob top right */}
      <div
        ref={blob2Ref}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-80px",
          right: "-150px",
          width: "750px",
          height: "750px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(124,58,237,0.12) 40%, transparent 68%)",
          filter: "blur(55px)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />

      {/* Orange blob bottom left */}
      <div
        ref={blob3Ref}
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "5%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,53,0.28) 0%, rgba(255,60,0,0.12) 40%, transparent 68%)",
          filter: "blur(55px)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />

      {/* Yellow blob bottom right */}
      <div
        ref={blob4Ref}
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-120px",
          right: "0%",
          width: "650px",
          height: "650px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,183,49,0.28) 0%, rgba(255,180,0,0.1) 40%, transparent 68%)",
          filter: "blur(55px)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />

      {/* Handwritten annotation right side */}
      <div
        aria-hidden="true"
        className="hidden lg:flex flex-col items-center gap-1 absolute z-20"
        style={{ right: "4%", top: "38%", animation: "handwrite-float-r 5.5s ease-in-out 2.5s infinite" }}
      >
        {/* Text reveals first */}
        <div
          ref={textRRef}
          className="flex flex-col items-center text-center leading-snug"
          style={{
            fontFamily: "var(--font-caveat)",
            fontSize: "22px",
            fontWeight: 700,
            color: "#7C3AED",
            lineHeight: 1.25,
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
          }}
        >
          <span>{copy.noteRightLine1}</span>
          <span style={{ fontSize: "13px", letterSpacing: "0.08em", fontWeight: 600, color: "#a855f7", fontFamily: "var(--font-caveat)" }}>+</span>
          <span>{copy.noteRightLine2}</span>
        </div>
        {/* Arrow draws in after */}
        <svg width="52" height="44" viewBox="0 0 52 44" fill="none" style={{ transform: "scaleX(-1) rotate(-20deg)", marginBottom: "-4px", alignSelf: "flex-end", marginRight: "8px" }}>
          <path ref={arrowRRef}  d="M4 6 C10 8, 28 2, 44 18 C50 24, 50 32, 46 38" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path ref={arrowRRef2} d="M40 40 L46 38 L44 32" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      {/* Handwritten annotation left side */}
      <div
        aria-hidden="true"
        className="hidden lg:flex flex-col items-start gap-1 absolute z-20"
        style={{ left: "3.5%", top: "55%", animation: "handwrite-float-l 7s ease-in-out 3s infinite" }}
      >
        {/* Text reveals first */}
        <div
          ref={textLRef}
          className="flex flex-col leading-snug"
          style={{
            fontFamily: "var(--font-caveat)",
            fontSize: "19px",
            fontWeight: 700,
            color: "#A14A08",
            lineHeight: 1.3,
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
          }}
        >
          <span>{copy.noteLeftLine1}</span>
          <span>{copy.noteLeftLine2}</span>
        </div>
        {/* Arrow draws in after */}
        <svg width="48" height="30" viewBox="0 0 48 30" fill="none" style={{ marginTop: "2px", alignSelf: "flex-end" }}>
          <path ref={arrowLRef}  d="M4 6 C14 4, 32 8, 42 20" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path ref={arrowLRef2} d="M36 18 L42 20 L40 26" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4 sm:pt-0">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border mb-6 sm:mb-8"
          style={{
            background: "rgba(255,255,255,0.7)",
            borderColor: "rgba(245,183,49,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "#F5B731" }}
            aria-hidden="true"
          />
          <span className="text-sm font-semibold text-[#0a0a0a]">
            {copy.badgeBefore}<span style={{ color: "#A14A08" }}>{copy.badgeHighlight}</span>{copy.badgeAfter}
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] mb-6 text-[#0a0a0a]">
          <span className="block font-black">{copy.headline}</span>
          {/* Every phrase sits invisibly in the same grid cell as the visible one (drawn from data-text by CSS, so the
              heading's text is unchanged), and the line keeps the height of the longest phrase. The sizes on this line are
              set so that every phrase fits on one line from 640px up (at 60px and 96px, "You Win Every Quarter" wrapped
              and left an empty second line under the shorter phrases). On a phone some phrases wrap to two lines, and without this the whole hero grew and
              shrank every few seconds, shifting the page below (a Core Web Vitals layout shift). */}
          <span className="grid mt-2 italic font-semibold sm:text-[3.5rem] md:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {PHRASES.map((p) => (
              <span key={p} aria-hidden="true" className="invisible reserve-text" data-text={p} style={{ gridArea: "1 / 1" }} />
            ))}
            <span
              ref={cycleRef}
              style={{ gridArea: "1 / 1", color: "#3a3a3a", willChange: "transform, opacity" }}
            >{PHRASES[0]}</span>
          </span>
        </h1>

        {/* Yellow wavy underline */}
        <div className="flex justify-center -mt-3 mb-6" aria-hidden="true">
          <svg viewBox="0 0 420 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[280px] sm:w-[360px] lg:w-[420px]">
            <path ref={underlineRef} d="M4 10 C40 4, 80 16, 120 10 S200 4, 240 10 S320 16, 360 10 S400 4, 416 10" stroke="#F5B731" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl leading-relaxed mb-8 sm:mb-10 font-normal" style={{ color: "#71675E" }}>
          {copy.subheading}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="/book-a-call"
            className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            {copy.primaryButton}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="#results" className="text-base font-semibold text-[#0a0a0a] hover:underline underline-offset-4 transition-all duration-200 w-full sm:w-auto text-center px-4 py-4">
            {copy.secondaryButton}
          </a>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="inline-flex flex-col sm:flex-row items-center gap-0 sm:gap-0 rounded-2xl overflow-hidden"
          style={{ border: "1px solid #E8E2D9", background: "rgba(255,255,255,0.8)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", backdropFilter: "blur(8px)" }}
        >
          {[stat1Ref, stat2Ref, stat3Ref].slice(0, copy.stats.length).map((ref, i) => ({ ref, ...copy.stats[i] })).map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center px-8 py-5 w-full sm:w-auto ${i !== 2 ? "border-b sm:border-b-0 sm:border-r" : ""}`}
              style={{ borderColor: "#E8E2D9" }}
            >
              <span ref={stat.ref} data-count-up className="text-2xl sm:text-3xl font-bold text-[#0a0a0a]">{stat.value}</span>
              <span className="text-xs sm:text-sm font-medium mt-0.5 text-center max-w-[160px] sm:max-w-none" style={{ color: "#71675E" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(248,246,242,0.85))" }}
        aria-hidden="true"
      />
    </section>
  );
}
