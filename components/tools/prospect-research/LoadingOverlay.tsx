"use client";

import { useEffect, useState } from "react";
import { GOLD, GOLD_TEXT, INK, MUTED } from "./ui";

const READING = [
  "Our GTM team is reading your website…",
  "Working out what you sell and who buys it…",
  "Sketching your ideal customer…",
  "Almost there, putting your profile together…",
];

const SEARCHING = [
  "Our GTM team is hunting for your next buyers…",
  "Scanning funding rounds and fresh hires…",
  "Spotting companies that just named a new leader…",
  "Checking who launched something new this year…",
  "Filtering out your clients and competitors…",
  "Shortlisting the ten strongest buying signals…",
];

/**
 * A centred loading card shown over the page while the tool reads the homepage or searches for prospects.
 * The line under the spinner rotates every few seconds so a one-minute wait feels like work is happening.
 */
export function LoadingOverlay({ mode, location }: { mode: "reading" | "searching"; location?: string }) {
  const lines = mode === "reading" ? READING : SEARCHING;
  const [i, setI] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setI(0);
    setSeconds(0);
    const rotate = setInterval(() => setI((n) => (n + 1) % lines.length), 3200);
    const tick = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      clearInterval(rotate);
      clearInterval(tick);
    };
  }, [lines]);

  const title = mode === "reading" ? "Getting to know your business" : location ? `Finding buyers in ${location}` : "Finding your buyers";
  const expected = mode === "reading" ? "Usually about 20 seconds" : "Usually about a minute";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4" role="status" aria-live="polite">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" aria-hidden="true" />
      <div className="relative w-full max-w-sm rounded-2xl border bg-white px-7 py-8 text-center shadow-[0_24px_60px_rgba(15,15,20,0.12)]" style={{ borderColor: "#ECE7DF" }}>
        <div className="relative mx-auto mb-6 h-16 w-16" aria-hidden="true">
          <span className="absolute inset-0 rounded-full motion-safe:animate-ping" style={{ backgroundColor: "rgba(245,183,49,0.25)" }} />
          <span className="absolute inset-0 rounded-full border-[3px] motion-safe:animate-spin" style={{ borderColor: "rgba(245,183,49,0.25)", borderTopColor: GOLD }} />
          <span className="absolute inset-[22px] rounded-full" style={{ backgroundColor: GOLD }} />
        </div>
        <p className="text-lg font-bold" style={{ color: INK }}>{title}</p>
        <p key={i} className="mt-2 min-h-[2.75rem] text-[15px] leading-snug motion-safe:animate-fade-in" style={{ color: GOLD_TEXT }}>{lines[i]}</p>
        <p className="mt-4 text-xs tabular-nums" style={{ color: MUTED }}>{expected} · {seconds}s</p>
        <p className="mt-1 text-xs" style={{ color: MUTED }}>Keep this tab open.</p>
      </div>
    </div>
  );
}
