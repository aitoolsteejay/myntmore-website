"use client";

import { useEffect, useRef, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { Check, Crosshair, Layers, ListOrdered, MessageCircle, Pause, Play, Radar, ScanSearch, Sparkles, type LucideIcon } from "lucide-react";
import { BLUE, BLUE_LIGHT, BLUE_PALE, GOLD, INK, MUTED } from "./theme";
import { useAutoAdvance } from "@/lib/use-auto-advance";
import d from "@/content/service-copy/linkedin-outreach.json";

const ILL = d.agents.illustrations;

const EDGE = "#DCE8F5";

// ---- Small illustrations, one per agent. Decorative (the text beside them
// says the same thing), so they are hidden from assistive tech.

const DOTS = Array.from({ length: 32 }, (_, i) => ({ x: 17 + (i % 8) * 29.4, y: 15 + Math.floor(i / 8) * 29.3 }));
const PICKED = [2, 9, 13, 20, 26, 29];

function VisualTargeting() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-6">
      <div className="flex flex-wrap justify-center gap-2">
        {ILL.targetingChips.map((c, i) => (
          <span key={c} className="ax-chip rounded-full border bg-white px-3 py-1 text-xs font-black" style={{ borderColor: EDGE, color: BLUE, animationDelay: `${0.15 + i * 0.45}s` }}>
            {c}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 240 118" className="w-full max-w-[300px]">
        {DOTS.map((d, i) => {
          const k = PICKED.indexOf(i);
          // Each dot reacts when the scanner reaches its column.
          return <circle key={i} cx={d.x} cy={d.y} r="7" className={`ax-dot ${k >= 0 ? "ax-dot-pick" : "ax-dot-fade"}`} style={{ animationDelay: `${((d.x + 4) / 250) * 3.13}s` }} />;
        })}
        <rect className="ax-scan" x="0" y="0" width="2.5" height="118" rx="1.25" fill={BLUE} opacity="0" />
      </svg>
      <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: MUTED }}>{ILL.targetingCaption}</p>
    </div>
  );
}

const PRIORITY = [
  { w: 94, tag: ILL.priorityTags[0], bg: `linear-gradient(135deg, ${BLUE}, ${BLUE_LIGHT})` },
  { w: 72, tag: ILL.priorityTags[1], bg: "linear-gradient(135deg, #F5B731, #f59e0b)" },
  { w: 48, tag: ILL.priorityTags[2], bg: "linear-gradient(135deg, #a78bfa, #7c3aed)" },
  { w: 26, tag: ILL.priorityTags[3], bg: "linear-gradient(135deg, #94a3b8, #64748b)" },
];

function VisualPriority() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 p-6">
      {PRIORITY.map((r, i) => (
        <div key={r.tag} className="ax-chip relative flex items-center gap-3 rounded-2xl border bg-white p-3" style={{ borderColor: EDGE, animationDelay: `${i * 0.15}s` }}>
          <span aria-hidden="true" className="ax-ring pointer-events-none absolute inset-0 rounded-2xl" style={{ animationDelay: `${1 + i * 1.1}s` }} />
          <span className="h-9 w-9 shrink-0 rounded-full" style={{ background: r.bg }} />
          <div className="min-w-0 flex-1">
            <div className="h-2 w-24 rounded-full bg-zinc-200" />
            <div className="mt-2 h-2 rounded-full" style={{ backgroundColor: "#E6EEF7" }}>
              <div className="ax-live h-2" style={{ width: `${r.w}%`, animationDelay: `${1.4 + i * 0.35}s` }}>
                <div className="ax-bar h-2 w-full rounded-full" style={{ background: i === 0 ? `linear-gradient(90deg, ${BLUE}, ${BLUE_LIGHT})` : "#B9C6D4", animationDelay: `${0.4 + i * 0.2}s` }} />
              </div>
            </div>
          </div>
          <span className="rounded-full px-2.5 py-1 text-xs font-black" style={i === 0 ? { backgroundColor: BLUE, color: "#fff" } : { backgroundColor: "#EEF2F6", color: "#64748b" }}>
            {r.tag}
          </span>
        </div>
      ))}
    </div>
  );
}

const FIELDS = [
  { label: ILL.prospectingFields[0], w: 58 },
  { label: ILL.prospectingFields[1], w: 76 },
  { label: ILL.prospectingFields[2], w: 68 },
  { label: ILL.prospectingFields[3], w: 92 },
];

function VisualProspecting() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-[340px] rounded-2xl border bg-white p-5" style={{ borderColor: EDGE, boxShadow: "0 18px 40px rgba(10,102,194,0.10)" }}>
        <div className="mb-4 flex items-center gap-3">
          <span className="relative h-11 w-11 shrink-0 rounded-full" style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_LIGHT})` }}>
            <span aria-hidden="true" className="ax-ping absolute inset-0 rounded-full" style={{ border: `2px solid ${BLUE_LIGHT}` }} />
          </span>
          <div className="flex-1 space-y-2">
            <div className="h-2.5 w-28 rounded-full bg-zinc-300" />
            <div className="h-2 w-20 rounded-full bg-zinc-200" />
          </div>
        </div>
        <div className="space-y-3">
          {FIELDS.map((f, i) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="w-[92px] shrink-0 text-xs font-black uppercase tracking-[0.14em]" style={{ color: MUTED }}>{f.label}</span>
              <div className="h-2 flex-1 rounded-full" style={{ backgroundColor: "#E6EEF7" }}>
                <div className="ax-enrich h-2 rounded-full" style={{ width: `${f.w}%`, backgroundColor: BLUE_LIGHT, animationDelay: `${0.3 + i * 0.5}s` }} />
              </div>
              <span className="ax-tick grid h-4 w-4 place-items-center rounded-full" style={{ backgroundColor: BLUE, color: "#fff", animationDelay: `${0.5 + i * 0.5}s` }}>
                <Check className="h-2.5 w-2.5" strokeWidth={4} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const RIVALS = [
  { label: ILL.competitorRivalA, h: 52, color: "#C3CFDC", isYou: false },
  { label: ILL.competitorRivalB, h: 38, color: "#C3CFDC", isYou: false },
  { label: ILL.competitorYou, h: 86, color: BLUE, isYou: true },
];

function VisualCompetitors() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
      <div className="flex h-[150px] items-end gap-7">
        {RIVALS.map((r, i) => (
          <div key={r.label} className="flex h-full flex-col items-center justify-end gap-2">
            <div className={`${r.isYou ? "ax-lead" : "ax-sway"} w-12 rounded-t-xl`} style={{ height: `${r.h}%`, animationDelay: `${1.2 + i * 0.4}s`, animationDuration: r.isYou ? undefined : `${3.4 + i * 0.7}s` }}>
              <div className="ax-col h-full w-full rounded-t-xl" style={{ backgroundColor: r.color, animationDelay: `${0.2 + i * 0.25}s` }} />
            </div>
            <span className="text-xs font-black" style={{ color: r.isYou ? BLUE : MUTED }}>{r.label}</span>
          </div>
        ))}
      </div>
      <span className="ax-float inline-flex">
        <span className="ax-chip inline-flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-xs font-black" style={{ borderColor: EDGE, color: INK, animationDelay: "1.3s" }}>
          <Radar className="h-3.5 w-3.5" style={{ color: BLUE }} strokeWidth={2.4} />
          {ILL.competitorChip}
        </span>
      </span>
    </div>
  );
}

function VisualEngagement() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-[340px] space-y-3">
        <div className="rounded-2xl border bg-white p-4" style={{ borderColor: EDGE }}>
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-full" style={{ background: "linear-gradient(135deg, #F5B731, #f59e0b)" }} />
            <div className="space-y-1.5">
              <div className="h-2.5 w-24 rounded-full bg-zinc-300" />
              <div className="h-2 w-16 rounded-full bg-zinc-200" />
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-2 w-full rounded-full bg-zinc-200" />
            <div className="h-2 w-4/5 rounded-full bg-zinc-200" />
          </div>
        </div>
        <div className="relative rounded-2xl p-4" style={{ backgroundColor: BLUE_PALE }}>
          <div className="ax-typing absolute left-4 top-4 flex items-center gap-1.5 py-1.5">
            {[0, 1, 2].map((d) => (
              <span key={d} className="ax-tdot h-2 w-2 rounded-full" style={{ backgroundColor: BLUE, animationDelay: `${d * 0.16}s` }} />
            ))}
          </div>
          <div className="ax-reply">
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded-full" style={{ backgroundColor: "#BBD5F0" }} />
              <div className="h-2 w-11/12 rounded-full" style={{ backgroundColor: "#BBD5F0" }} />
              <div className="h-2 w-2/3 rounded-full" style={{ backgroundColor: "#BBD5F0" }} />
            </div>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-black" style={{ color: BLUE }}>
              <Sparkles className="h-3 w-3" strokeWidth={2.6} />
              {ILL.engagementBadge}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const TOKENS = ILL.scaleTokens;

function VisualScale() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="relative h-[190px] w-full max-w-[330px]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="ax-msg absolute left-0 right-0 rounded-2xl border bg-white p-4"
            style={{ top: i * 30, zIndex: i, borderColor: EDGE, boxShadow: "0 14px 30px rgba(10,102,194,0.10)", animationDelay: `${i * 0.25}s`, "--r": `${(i - 1) * 2}deg` } as CSSProperties}
          >
            {i === 2 ? (
              <>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-black uppercase tracking-[0.14em]" style={{ color: MUTED }}>{ILL.scaleGreeting}</span>
                  {TOKENS.map((t, k) => (
                    <span key={t} className="ax-token rounded-md px-2 py-0.5 text-xs font-black" style={{ color: INK, animationDelay: `${k * 0.6}s` }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-3 space-y-1.5">
                  <div className="h-2 w-full rounded-full bg-zinc-200" />
                  <div className="h-2 w-3/4 rounded-full bg-zinc-200" />
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <div className="h-2.5 w-24 rounded-full bg-zinc-300" />
                <div className="h-2 w-full rounded-full bg-zinc-200" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- The six agents.

interface Agent {
  title: string;
  icon: LucideIcon;
  summary: string;
  points: string[];
  result: string;
  Visual: () => ReactNode;
}

const AGENT_VISUALS: { icon: LucideIcon; Visual: () => ReactNode }[] = [
  { icon: Crosshair, Visual: VisualTargeting },
  { icon: ListOrdered, Visual: VisualPriority },
  { icon: ScanSearch, Visual: VisualProspecting },
  { icon: Radar, Visual: VisualCompetitors },
  { icon: MessageCircle, Visual: VisualEngagement },
  { icon: Layers, Visual: VisualScale },
];

const AGENTS: Agent[] = d.agents.items.map((item, i) => ({ ...item, ...AGENT_VISUALS[i] }));

export default function AgentExplorer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const firstRun = useRef(true);
  const last = AGENTS.length - 1;
  // Auto-advance (and its pause rules) is shared with the cold email process
  // explorer: see lib/use-auto-advance.ts for exactly when it holds still.
  const { active, select, advance, ready, paused, setPaused, playing, running, dwell, cycle, focusProps } = useAutoAdvance(AGENTS.length, rootRef);
  const agent = AGENTS[active];
  const Icon = agent.icon;
  const Visual = agent.Visual;

  // On narrow screens the agent list scrolls sideways: keep the active one centred.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const scroller = scrollerRef.current;
    const tab = tabRefs.current[active];
    if (!scroller || !tab || scroller.scrollWidth <= scroller.clientWidth) return;
    const s = scroller.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    scroller.scrollBy({ left: t.left + t.width / 2 - (s.left + s.width / 2), behavior: "smooth" });
  }, [active]);

  // Choosing an agent shows it and restarts the clock with a longer first pause.
  const go = (i: number, focus = false) => {
    const next = Math.max(0, Math.min(last, i));
    select(next);
    if (focus) tabRefs.current[next]?.focus({ preventScroll: true });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1, true);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
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
    <div ref={rootRef} className="grid gap-5 lg:grid-cols-[290px_1fr]" {...focusProps}>
      <style>{`
        @keyframes ax-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .ax-in { animation: ax-in .4s ease both; }
        @keyframes ax-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes ax-chip { from { opacity: 0; transform: translateY(6px) scale(.94); } to { opacity: 1; transform: none; } }
        .ax-chip { animation: ax-chip .45s cubic-bezier(.22,1,.36,1) both; }

        /* Keep quotes, apostrophes, ampersands and angle brackets out of this style text: React escapes
           them when rendering on the server, which breaks hydration. */
        /* Each illustration keeps moving for as long as it is on screen (an agent stays up
           7 s or more) instead of playing once and freezing. */

        /* 1 Targeting: a scanner sweeps the audience; best-fit dots light up as it passes, the rest dim. */
        @keyframes ax-scan { 0% { transform: translateX(-4px); opacity: 0; } 5% { opacity: 1; } 68% { transform: translateX(246px); opacity: 1; } 74%, 100% { transform: translateX(246px); opacity: 0; } }
        .ax-scan { animation: ax-scan 4.6s linear infinite; }
        .ax-dot { fill: #D4D4D8; transform-box: fill-box; transform-origin: center; }
        @keyframes ax-pick { 0% { fill: #D4D4D8; transform: scale(1); } 3% { fill: ${BLUE}; transform: scale(1.6); } 9%, 80% { fill: ${BLUE}; transform: scale(1.4); } 92%, 100% { fill: #D4D4D8; transform: scale(1); } }
        .ax-dot-pick { animation: ax-pick 4.6s ease-in-out infinite both; }
        @keyframes ax-fade { 0% { opacity: 1; } 3% { opacity: .5; } 10%, 80% { opacity: .18; } 92%, 100% { opacity: 1; } }
        .ax-dot-fade { animation: ax-fade 4.6s ease-in-out infinite both; }

        /* 2 Prioritised outreach: bars grow once, then keep re-scoring; a highlight walks down the list. */
        @keyframes ax-grow-x { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .ax-bar { transform-origin: left; animation: ax-grow-x .9s cubic-bezier(.22,1,.36,1) both; }
        @keyframes ax-live { 0%, 100% { transform: scaleX(1); } 30% { transform: scaleX(.8); } 55% { transform: scaleX(1); } 78% { transform: scaleX(.9); } }
        .ax-live { transform-origin: left; animation: ax-live 4.2s ease-in-out infinite; }
        @keyframes ax-ring { 0%, 24%, 100% { box-shadow: 0 0 0 0 rgba(10,102,194,0); } 6% { box-shadow: 0 0 0 3px rgba(10,102,194,.32); } }
        .ax-ring { animation: ax-ring 5.2s ease-in-out infinite; }

        /* 3 Prospecting: a lead is enriched field by field, then the next one starts. */
        @keyframes ax-enrich { 0% { transform: scaleX(0); } 14%, 80% { transform: scaleX(1); } 94%, 100% { transform: scaleX(0); } }
        .ax-enrich { transform-origin: left; animation: ax-enrich 5.6s cubic-bezier(.22,1,.36,1) infinite both; }
        @keyframes ax-tick { 0%, 4% { opacity: 0; transform: scale(.3); } 10% { opacity: 1; transform: scale(1.25); } 15%, 80% { opacity: 1; transform: scale(1); } 92%, 100% { opacity: 0; transform: scale(.3); } }
        .ax-tick { animation: ax-tick 5.6s ease-out infinite both; }
        @keyframes ax-ping { 0% { transform: scale(1); opacity: .55; } 70%, 100% { transform: scale(1.75); opacity: 0; } }
        .ax-ping { animation: ax-ping 1.9s ease-out infinite; }

        /* 4 Competitor intelligence: the rival bars keep moving while yours stays ahead. */
        @keyframes ax-grow-y { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .ax-col { transform-origin: bottom; animation: ax-grow-y .9s cubic-bezier(.22,1,.36,1) both; }
        @keyframes ax-sway { 0%, 100% { transform: scaleY(1); } 28% { transform: scaleY(1.16); } 58% { transform: scaleY(.8); } 80% { transform: scaleY(1.06); } }
        .ax-sway { transform-origin: bottom; animation: ax-sway 3.8s ease-in-out infinite; }
        @keyframes ax-lead { 0%, 100% { transform: scaleY(1); box-shadow: 0 0 0 0 rgba(10,102,194,0); } 40% { transform: scaleY(1.05); box-shadow: 0 0 22px 2px rgba(10,102,194,.35); } 70% { transform: scaleY(.98); box-shadow: 0 0 0 0 rgba(10,102,194,0); } }
        .ax-lead { transform-origin: bottom; animation: ax-lead 3.2s ease-in-out infinite; }
        @keyframes ax-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .ax-float { animation: ax-float 2.6s ease-in-out infinite; }

        /* 5 Human-sounding engagement: typing dots, then a drafted reply, over and over. */
        @keyframes ax-dots { 0%, 80%, 100% { transform: translateY(0); opacity: .35; } 40% { transform: translateY(-4px); opacity: 1; } }
        .ax-tdot { animation: ax-dots 1s ease-in-out infinite; }
        @keyframes ax-typing { 0%, 26% { opacity: 1; visibility: visible; } 30%, 94% { opacity: 0; visibility: hidden; } 98%, 100% { opacity: 1; visibility: visible; } }
        .ax-typing { animation: ax-typing 6.4s ease infinite both; }
        @keyframes ax-reply { 0%, 28% { opacity: 0; transform: translateY(4px); } 35%, 88% { opacity: 1; transform: none; } 95%, 100% { opacity: 0; transform: translateY(4px); } }
        .ax-reply { animation: ax-reply 6.4s ease infinite both; }

        /* 6 Personalised at scale: messages keep streaming through; tokens keep filling in. */
        @keyframes ax-msg { 0% { opacity: 0; transform: translateX(-24px) rotate(var(--r, 0deg)); } 10%, 76% { opacity: 1; transform: translateX(0) rotate(var(--r, 0deg)); } 90%, 100% { opacity: 0; transform: translateX(24px) rotate(var(--r, 0deg)); } }
        .ax-msg { animation: ax-msg 5.8s cubic-bezier(.22,1,.36,1) infinite both; }
        @keyframes ax-token { 0%, 100% { background-color: rgba(245,183,49,.2); } 50% { background-color: rgba(245,183,49,.65); } }
        .ax-token { animation: ax-token 2.4s ease-in-out infinite; }

        .ax-track::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .ax-in, .ax-chip, .ax-dot-pick, .ax-dot-fade, .ax-bar, .ax-live, .ax-ring, .ax-enrich, .ax-tick, .ax-col, .ax-sway, .ax-lead, .ax-float, .ax-tdot, .ax-typing, .ax-reply, .ax-msg, .ax-token { animation: none !important; }
          .ax-scan, .ax-ping { display: none; }
          .ax-dot-pick { fill: ${BLUE}; transform: scale(1.4); }
          .ax-dot-fade { opacity: .18; }
          .ax-typing { display: none; }
          .ax-token { background-color: rgba(245,183,49,.4); }
        }
      `}</style>

      {/* Agent list */}
      <div className="min-w-0">
        <div
          ref={scrollerRef}
          role="tablist"
          aria-label="AI agents"
          onKeyDown={onKeyDown}
          className="ax-track -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          style={{ scrollbarWidth: "none" }}
        >
          {AGENTS.map((a, i) => {
            const isActive = i === active;
            const TabIcon = a.icon;
            return (
              <button
                key={a.title}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`ax-tab-${i}`}
                aria-selected={isActive}
                aria-controls="ax-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => go(i)}
                className="relative flex min-w-[215px] shrink-0 items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A66C2] lg:min-w-0"
                style={isActive ? { backgroundColor: "#fff", borderColor: BLUE, boxShadow: "0 16px 36px rgba(10,102,194,0.14)" } : { backgroundColor: "rgba(255,255,255,0.6)", borderColor: "#E8E2D9" }}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300" style={isActive ? { background: `linear-gradient(135deg, ${BLUE}, ${BLUE_LIGHT})`, color: "#fff" } : { backgroundColor: BLUE_PALE, color: BLUE }}>
                  <TabIcon className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-black uppercase tracking-[0.2em]" style={{ color: isActive ? BLUE : MUTED }}>{`${d.agents.agentLabel} ${i + 1}`}</span>
                  <span className="block text-sm font-black leading-tight" style={{ color: INK }}>{a.title}</span>
                </span>
                {isActive && playing && (
                  <span
                    key={`bar-${active}-${cycle}`}
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[3px] w-full"
                    style={{
                      transformOrigin: "left",
                      background: `linear-gradient(90deg, ${BLUE}, ${GOLD})`,
                      animation: `ax-progress ${dwell}ms linear forwards`,
                      animationPlayState: running ? "running" : "paused",
                    }}
                    onAnimationEnd={advance}
                  />
                )}
              </button>
            );
          })}
        </div>

        {ready && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={!paused}
            className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-xs font-bold transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A66C2]"
            style={{ borderColor: EDGE, color: INK }}
          >
            {paused ? <Play className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />}
            {paused ? d.agents.playLabel : d.agents.pauseLabel}
          </button>
        )}
      </div>

      {/* Active agent */}
      <div key={active} id="ax-panel" role="tabpanel" aria-labelledby={`ax-tab-${active}`} className="ax-in overflow-hidden rounded-[28px] border bg-white" style={{ borderColor: EDGE, boxShadow: "0 24px 70px rgba(10,102,194,0.10)" }}>
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[300px] overflow-hidden" style={{ background: "linear-gradient(135deg, #EEF5FC 0%, #FFF8E6 100%)" }}>
            <span aria-hidden="true" className="pointer-events-none absolute -left-2 -top-6 select-none text-[8.5rem] font-black leading-none" style={{ color: "rgba(10,102,194,0.07)", letterSpacing: "-0.06em" }}>
              {String(active + 1).padStart(2, "0")}
            </span>
            <div className="relative h-full" aria-hidden="true">
              <Visual />
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_LIGHT})`, boxShadow: "0 14px 30px rgba(10,102,194,0.28)" }}>
              <Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
            </span>
            <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: BLUE }}>{`${d.agents.agentLabel} ${active + 1} of ${AGENTS.length}`}</p>
            <h3 className="mt-2 text-2xl font-black leading-tight" style={{ color: INK, letterSpacing: "-0.03em" }}>{agent.title}</h3>
            <p className="mt-3 text-base leading-relaxed" style={{ color: "#52525B" }}>{agent.summary}</p>
            <ul className="mt-5 space-y-2.5">
              {agent.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm font-bold" style={{ color: INK }}>
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{ backgroundColor: BLUE_PALE, color: BLUE }}>
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-start gap-3 rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #FEF3D6, #FDE7BE)" }}>
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{ backgroundColor: GOLD, color: INK }}>
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
              </span>
              <p className="text-sm font-black" style={{ color: "#7c3a06" }}>
                {d.agents.resultLabel}
                <span className="block font-semibold" style={{ color: "#3D2B14" }}>{agent.result}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
