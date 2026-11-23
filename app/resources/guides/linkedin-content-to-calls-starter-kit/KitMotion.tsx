"use client";

import { useEffect, useRef, useState } from "react";
import { textTone } from "@/lib/colors";
import pageCopy from "@/content/page-copy/guideLinkedinContentToCallsStarterKit.json";

// This page's text is edited in the admin ("The LinkedIn Content-to-Calls Starter Kit") and lives in content/page-copy/guideLinkedinContentToCallsStarterKit.json.
const copy = pageCopy;

const ACCENT = "#EA580C";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Runs once, the first time the element is at least `threshold` visible. */
function useInView<T extends HTMLElement>(threshold = 0.4) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

/** Thin bar at the top of the viewport that fills as the page is read. */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden="true" className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none">
      <div ref={barRef} className="h-full origin-left" style={{ transform: "scaleX(0)", background: `linear-gradient(90deg, ${ACCENT}, #F5B731)` }} />
    </div>
  );
}

function useCount(target: number, start: boolean, ms = 1300) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setV(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / ms);
      setV(Math.round(target * (1 - Math.pow(1 - t, 4))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, ms]);
  return v;
}

/** A big "5–20" style stat whose numbers count up when it scrolls into view. */
export function RangeStat({ from, to, label }: { from: number; to: number; label: string }) {
  const { ref, seen } = useInView<HTMLDivElement>(0.5);
  const a = useCount(from, seen);
  const b = useCount(to, seen);
  return (
    <div ref={ref} className="rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-1" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
      <p className="text-4xl sm:text-5xl font-black tabular-nums leading-none" style={{ color: textTone(ACCENT) }} aria-label={`${from} to ${to}`}>
        <span aria-hidden="true">{a}&ndash;{b}</span>
      </p>
      <p className="text-sm font-bold mt-3" style={{ color: "#0a0a0a" }}>{label}</p>
    </div>
  );
}

/** The 10-minute routine as a timeline that fills in, segment by segment. */
export function RoutineTimeline({ steps }: { steps: { time: string; task: string; minutes: number }[] }) {
  const { ref, seen } = useInView<HTMLDivElement>(0.35);
  const total = steps.reduce((n, s) => n + s.minutes, 0);
  const minute = useCount(total, seen, 2400);
  return (
    <div ref={ref}>
      <div className="flex items-end justify-between mb-3">
        <p className="text-xs font-black uppercase tracking-widest" style={{ color: "#71675E" }}>{copy.KitMotion_s14.t01}</p>
        <p className="text-sm font-black tabular-nums" style={{ color: textTone(ACCENT) }}>{minute} / {total}{copy.KitMotion_s14.t02}</p>
      </div>
      <div className="flex gap-1.5 mb-5" role="img" aria-label="Three blocks adding up to ten minutes">
        {steps.map((s, i) => (
          <div key={s.time} className="h-3 rounded-full overflow-hidden" style={{ flex: s.minutes, backgroundColor: "#E8E2D9" }}>
            <div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${ACCENT}, #F5B731)`,
                transform: seen ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: `transform ${s.minutes * 0.24}s cubic-bezier(0.16, 1, 0.3, 1) ${steps.slice(0, i).reduce((n, x) => n + x.minutes * 0.24, 0)}s`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {steps.map((s, i) => (
          <div
            key={s.time}
            className="rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#E8E2D9",
              opacity: seen ? 1 : 0,
              transform: seen ? "none" : "translateY(14px)",
              transitionProperty: "opacity, transform, box-shadow",
              transitionDuration: "0.6s, 0.6s, 0.3s",
              transitionDelay: `${i * 0.35}s, ${i * 0.35}s, 0s`,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: textTone(ACCENT) }}>{s.time}</p>
            <p className="text-sm font-bold leading-snug" style={{ color: "#0a0a0a" }}>{s.task}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** List where each bullet slides in a beat after the one before. */
export function StaggerList({ items }: { items: string[] }) {
  const { ref, seen } = useInView<HTMLUListElement>(0.3);
  return (
    <ul ref={ref} className="space-y-2">
      {items.map((e, i) => (
        <li
          key={e}
          className="text-sm flex gap-2"
          style={{
            color: "#3D3D3D",
            opacity: seen ? 1 : 0,
            transform: seen ? "none" : "translateX(-12px)",
            transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
          }}
        >
          <span aria-hidden="true" style={{ color: ACCENT }}>&bull;</span>
          <span>{e}</span>
        </li>
      ))}
    </ul>
  );
}
