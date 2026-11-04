"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  FlaskConical,
  Handshake,
  Pause,
  Play,
  PartyPopper,
  PenLine,
  Rocket,
  Search,
  ShieldCheck,
  Telescope,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { PROCESS_STEPS } from "./process-steps";
import d from "@/content/service-copy/cold-email.json";
import { useAutoAdvance } from "@/lib/use-auto-advance";
import { GOLD_TEXT, textTone } from "@/lib/colors";

const ORANGE = "#EA580C";
const GOLD = "#F5B731";
const INK = "#0A0A0A";

interface Step {
  short: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  points: { label: string; text: string }[];
  result: string;
}

const ICONS: LucideIcon[] = [Telescope, Search, PenLine, ShieldCheck, Rocket, Handshake, FlaskConical, BarChart3, TrendingUp, PartyPopper];

const STEPS: Step[] = PROCESS_STEPS.map((step, i) => ({ ...step, icon: ICONS[i] }));

export default function ProcessExplorer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);
  const last = STEPS.length - 1;
  // The ten steps play through on their own and loop. When it holds still, how a
  // visitor's own pick is handled and the pause button are all in
  // lib/use-auto-advance.ts, shared with the LinkedIn agent explorer.
  const { active, select, advance, ready, paused, setPaused, playing, running, dwell, cycle, focusProps } = useAutoAdvance(STEPS.length, rootRef);
  const step = STEPS[active];
  const Icon = step.icon;

  const go = (i: number, focus = false) => {
    const next = Math.max(0, Math.min(last, i));
    select(next);
    if (focus) tabRefs.current[next]?.focus({ preventScroll: true });
  };

  // On narrow screens the step track scrolls sideways: keep the active step
  // centred as it changes, whether the visitor or the auto-advance changed it
  // (not on first render, so the page itself never jumps).
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const scroller = scrollerRef.current;
    const tab = tabRefs.current[active];
    if (!scroller || !tab) return;
    const s = scroller.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    scroller.scrollBy({ left: t.left + t.width / 2 - (s.left + s.width / 2), behavior: "smooth" });
  }, [active]);

  const onKeyDown = (e: KeyboardEvent<HTMLOListElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(active + 1, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(active - 1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      go(last, true);
    }
  };

  return (
    <div ref={rootRef} {...focusProps}>
      <style>{`
        @keyframes ce-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes ce-panel-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .ce-panel-in { animation: ce-panel-in .35s ease both; }
        .ce-track::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) { .ce-panel-in { animation: none; } }
      `}</style>

      {/* Step track */}
      <div ref={scrollerRef} className="ce-track relative -mx-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0" style={{ scrollbarWidth: "none" }}>
        <div className="relative min-w-[700px] pb-4 pt-2 md:min-w-0 lg:pb-11">
          <div aria-hidden="true" className="absolute left-[22px] right-[22px] top-[30px] h-[3px] rounded-full" style={{ backgroundColor: "#E8E2D9" }} />
          <div
            aria-hidden="true"
            className="absolute left-[22px] top-[30px] h-[3px] rounded-full transition-[width] duration-500"
            style={{ width: `calc((100% - 44px) * ${active / last})`, background: `linear-gradient(90deg, ${ORANGE}, ${GOLD})` }}
          />
          <ol role="tablist" aria-label="Process steps" className="relative flex justify-between" onKeyDown={onKeyDown}>
            {STEPS.map((s, i) => {
              const isActive = i === active;
              const isDone = i < active;
              return (
                <li key={s.title} className="relative flex w-11 justify-center">
                  <button
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`ce-tab-${i}`}
                    aria-selected={isActive}
                    aria-controls="ce-panel"
                    aria-label={`Step ${i + 1}: ${s.title}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => go(i)}
                    className="grid h-11 w-11 place-items-center rounded-full text-sm font-black transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EA580C]"
                    style={
                      isActive
                        ? { background: `linear-gradient(135deg, ${textTone(ORANGE)}, ${GOLD_TEXT})`, color: "#fff", transform: "scale(1.12)", boxShadow: "0 12px 26px rgba(234,88,12,0.35)" }
                        : isDone
                          ? { backgroundColor: "#fff", color: textTone(ORANGE), border: `2px solid ${ORANGE}` }
                          : { backgroundColor: "#fff", color: "#71675E", border: "2px solid #E8E2D9" }
                    }
                  >
                    {i + 1}
                  </button>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-[56px] hidden w-24 -translate-x-1/2 text-center text-xs font-bold leading-tight transition-colors lg:block"
                    style={{ color: isActive ? INK : "#71675E" }}
                  >
                    {s.short}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Active step */}
      <div
        key={active}
        id="ce-panel"
        role="tabpanel"
        aria-labelledby={`ce-tab-${active}`}
        className="ce-panel-in relative mt-4 grid gap-8 overflow-hidden rounded-[28px] border bg-white p-6 sm:p-10 md:grid-cols-[0.9fr_1.1fr]"
        style={{ borderColor: "#E8E2D9", boxShadow: "0 24px 70px rgba(234,88,12,0.08)" }}
      >
        {playing && (
          <span
            key={`bar-${active}-${cycle}`}
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[3px] w-full"
            style={{
              transformOrigin: "left",
              background: `linear-gradient(90deg, ${ORANGE}, ${GOLD})`,
              animation: `ce-progress ${dwell}ms linear forwards`,
              animationPlayState: running ? "running" : "paused",
            }}
            onAnimationEnd={advance}
          />
        )}
        <span aria-hidden="true" className="pointer-events-none absolute -left-3 -top-8 select-none text-[9.5rem] font-black leading-none" style={{ color: "rgba(234,88,12,0.07)", letterSpacing: "-0.06em" }}>
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="relative">
          <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${GOLD})`, boxShadow: "0 14px 30px rgba(234,88,12,0.28)" }}>
            <Icon className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
          </span>
          <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: textTone(ORANGE) }}>
            Step {active + 1} of {STEPS.length}
          </p>
          <h3 className="mt-2 text-2xl font-black leading-tight sm:text-3xl" style={{ color: INK, letterSpacing: "-0.03em" }}>
            {step.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed" style={{ color: "#52525B" }}>
            {step.summary}
          </p>
        </div>

        <div className="relative space-y-3">
          {step.points.map((p) => (
            <div key={p.label} className="flex items-start gap-3 rounded-2xl border p-4" style={{ borderColor: "#EFE9DF", backgroundColor: "#FCFBF8" }}>
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{ backgroundColor: "rgba(234,88,12,0.1)", color: ORANGE }}>
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
              <p className="text-sm font-black" style={{ color: INK }}>
                {p.label}
                <span className="block font-medium" style={{ color: "#52525B" }}>{p.text}</span>
              </p>
            </div>
          ))}
          <div className="flex items-start gap-3 rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #FEF3D6, #FDE7BE)" }}>
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{ backgroundColor: ORANGE, color: "#fff" }}>
              <TrendingUp className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
            </span>
            <p className="text-sm font-black" style={{ color: "#7c3a06" }}>
              {d.process.resultLabel}
              <span className="block font-semibold" style={{ color: "#3D2B14" }}>{step.result}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          className="inline-flex items-center gap-2 rounded-full border bg-white px-5 py-2.5 text-sm font-bold transition-colors hover:border-[#EA580C] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#E8E2D9]"
          style={{ borderColor: "#E8E2D9", color: INK }}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {d.process.previousButtonLabel}
        </button>
        <div className="flex items-center gap-3">
          {ready && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={!paused}
              aria-label={paused ? "Play auto-advance" : "Pause auto-advance"}
              title={paused ? "Play auto-advance" : "Pause auto-advance"}
              className="grid h-11 w-11 place-items-center rounded-full border bg-white transition-colors hover:border-[#EA580C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C]"
              style={{ borderColor: "#E8E2D9", color: INK }}
            >
              {paused ? <Play className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />}
            </button>
          )}
          <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#71675E" }}>
            {active + 1} / {STEPS.length}
          </span>
        </div>
        <button
          type="button"
          onClick={() => go(active === last ? 0 : active + 1)}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: "#F5B731", color: "#0A0A0A" }}
        >
          {active === last ? d.process.restartButtonLabel : d.process.nextButtonLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
