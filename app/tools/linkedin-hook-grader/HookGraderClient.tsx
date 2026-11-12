"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import LeadGate, { LeadData } from "@/components/tools/shared/LeadGate";
import { LandingPage } from "@/components/tools/hook-grader/LandingPage";
import { HandUnderline, PillBadge } from "@/components/cold-email-roi/HandUnderline";
import { FOLD_CHARACTERS, MAX_HOOK_CHARACTERS, gradeHook, type HookScore, type HookVerdict } from "@/lib/hook-grader";

type FlowStep = "landing" | "lead" | "input" | "results";

interface Alternative {
  angle: string;
  hook: string;
  why: string;
}

const BORDER = "#E8E2D9";
const INK = "#0a0a0a";
const MUTED = "#52525B";
const GOLD = "#F5B731";
const GOLD_TEXT = "#A14A08";
const ORANGE = "#EA580C";

const VERDICT_STYLE: Record<HookVerdict, { bar: string; chipBg: string; chipFg: string; word: string }> = {
  strong: { bar: ORANGE, chipBg: "rgba(234,88,12,0.12)", chipFg: "#9A3412", word: "Strong" },
  ok: { bar: GOLD, chipBg: "rgba(245,183,49,0.2)", chipFg: "#7A5200", word: "Okay" },
  weak: { bar: "#D6D0C6", chipBg: "#F1EEE8", chipFg: "#57534E", word: "Weak" },
};

// Gemini sometimes returns the angle as a slug ("specific-result"); show it as a label.
const prettyAngle = (s: string) => s.replace(/[-_]+/g, " ").trim().replace(/^./, (c) => c.toUpperCase());

function ScoreCard({ score }: { score: HookScore }) {
  return (
    <div className="rounded-2xl border bg-white p-6 sm:p-8" style={{ borderColor: BORDER, borderTop: `3px solid ${GOLD}` }}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: MUTED }}>Your hook score</p>
          <p className="mt-1 text-6xl font-black tabular-nums" style={{ color: INK }}>
            {score.total}<span className="text-2xl font-bold" style={{ color: MUTED }}>/100</span>
          </p>
        </div>
        <span className="rounded-full border px-4 py-1.5 text-sm font-black" style={{ backgroundColor: "rgba(245,183,49,0.18)", borderColor: "rgba(245,183,49,0.7)", color: "#7A5200" }}>
          {score.label}
        </span>
      </div>
      <div className="mt-6 h-2.5 overflow-hidden rounded-full" style={{ backgroundColor: "#EFEAE2" }} role="img" aria-label={`Score ${score.total} out of 100`}>
        <div className="h-full rounded-full" style={{ width: `${score.total}%`, backgroundColor: ORANGE }} />
      </div>
      <ul className="mt-8 space-y-5">
        {score.checks.map((c) => {
          const v = VERDICT_STYLE[c.verdict];
          return (
            <li key={c.id}>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <span className="text-sm font-black">{c.label}</span>
                <span className="flex items-center gap-2 text-sm">
                  <span className="rounded-md px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: v.chipBg, color: v.chipFg }}>{v.word}</span>
                  <span className="font-black tabular-nums">{c.score}<span style={{ color: MUTED }}>/{c.max}</span></span>
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: "#EFEAE2" }}>
                <div className="h-full rounded-full" style={{ width: `${(c.score / c.max) * 100}%`, backgroundColor: v.bar }} />
              </div>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTED }}>{c.tip}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function HookGraderClient() {
  const [step, setStep] = useState<FlowStep>("landing");
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [hook, setHook] = useState("");
  const [audience, setAudience] = useState("");
  const [graded, setGraded] = useState<string>("");
  const [alternatives, setAlternatives] = useState<Alternative[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  const score = useMemo(() => (graded ? gradeHook(graded) : null), [graded]);
  const altScores = useMemo(() => (alternatives ? alternatives.map((a) => gradeHook(a.hook)) : []), [alternatives]);
  const live = useMemo(() => hook.trim().length, [hook]);
  const canGrade = hook.trim().length >= 10 && hook.length <= MAX_HOOK_CHARACTERS && !loading;

  const handleGrade = async () => {
    if (!canGrade) return;
    setLoading(true);
    setError(null);
    const text = hook.trim();
    // The score is computed in the browser from the rules, so it shows even if the AI step fails.
    setGraded(text);
    try {
      const res = await fetch("/api/tools/hook-grader", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hook: text, audience: audience.trim() }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to generate alternatives");
      setAlternatives(result.alternatives);
      setStep("results");

      if (leadData?.id) {
        void import("@/lib/supabase")
          .then(({ supabase }) => {
            supabase
              .from("leads")
              .update({ inputs: { hook: text, audience: audience.trim() }, outputs: { score: gradeHook(text).total, alternatives: result.alternatives } })
              .eq("id", leadData.id)
              .then(({ error: updateError }) => {
                if (updateError) console.error("Supabase inputs/outputs update failed:", updateError);
              });
          })
          .catch((e) => console.error("Supabase inputs/outputs update failed:", e));
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Something went wrong");
      // Keep the visitor's score: show it with a note instead of losing everything.
      setAlternatives([]);
      setStep("results");
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
      toast.success("Hook copied to clipboard");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const reset = () => {
    setHook("");
    setGraded("");
    setAlternatives(null);
    setError(null);
    setStep("input");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (step === "landing") return <LandingPage onStart={() => setStep("lead")} />;

  return (
    <div className="relative min-h-screen overflow-hidden pb-20 pt-12 text-foreground" style={{ backgroundColor: "#F8F6F2" }}>
      <div aria-hidden="true" className="pointer-events-none absolute -left-36 -top-24 h-[600px] w-[600px] rounded-full blur-[55px]" style={{ background: "radial-gradient(circle, rgba(245,183,49,0.28) 0%, rgba(255,160,0,0.10) 40%, transparent 68%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-44 h-[550px] w-[550px] rounded-full blur-[55px]" style={{ background: "radial-gradient(circle, rgba(168,139,250,0.20) 0%, rgba(139,92,246,0.07) 40%, transparent 68%)" }} />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <header className="pb-10 text-center">
          <div className="mb-5"><PillBadge>Free LinkedIn Tool</PillBadge></div>
          <h1 className="mb-4 text-4xl font-black leading-tight sm:text-5xl">
            LinkedIn <HandUnderline>Hook Grader</HandUnderline>
          </h1>
          <p className="mx-auto max-w-xl text-base font-medium" style={{ color: MUTED }}>
            Paste the first two lines of your post. You get a score out of 100, and three rewrites graded by the same rules.
          </p>
        </header>

        {step === "lead" && (
          <LeadGate source="hook_grader" heading="Tell Us About You" description="Enter your details to grade your hook and get three rewrites." onComplete={(d) => { setLeadData(d); setStep("input"); }} />
        )}

        {step === "input" && (
          <div className="relative overflow-hidden rounded-2xl border bg-white p-6 sm:p-10" style={{ borderColor: BORDER }}>
            <div className="absolute left-0 top-0 h-1 w-full" style={{ backgroundColor: GOLD, opacity: 0.6 }} />
            <div className="space-y-8">
              <div className="space-y-3">
                <label htmlFor="hook" className="block text-xs font-bold uppercase tracking-[0.2em]" style={{ color: MUTED }}>Your hook (the first two lines)</label>
                <textarea
                  id="hook"
                  rows={5}
                  maxLength={MAX_HOOK_CHARACTERS}
                  value={hook}
                  onChange={(e) => setHook(e.target.value)}
                  placeholder={"e.g. I sent 1,200 cold emails last month.\nHere's what the 14 replies had in common."}
                  className="w-full resize-none rounded-lg border bg-white px-4 py-4 text-base text-black outline-none transition-colors placeholder:text-gray-400 focus:border-[#F5B731]"
                  style={{ borderColor: BORDER }}
                />
                <p className="flex items-center justify-between text-xs" style={{ color: live > FOLD_CHARACTERS ? "#B91C1C" : MUTED }}>
                  <span>{live > FOLD_CHARACTERS ? `Over about ${FOLD_CHARACTERS} characters, the end may be hidden behind "see more". The cut varies by device.` : "Paste only what shows before \"see more\"."}</span>
                  <span className="tabular-nums">{live}/{MAX_HOOK_CHARACTERS}</span>
                </p>
              </div>
              <div className="space-y-3">
                <label htmlFor="audience" className="block text-xs font-bold uppercase tracking-[0.2em]" style={{ color: MUTED }}>Who is the post for? (optional)</label>
                <input
                  id="audience"
                  type="text"
                  maxLength={150}
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. Founders of Series A SaaS companies"
                  className="w-full rounded-lg border bg-white px-4 py-3 text-base text-black outline-none transition-colors placeholder:text-gray-400 focus:border-[#F5B731]"
                  style={{ borderColor: BORDER }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleGrade}
              disabled={!canGrade}
              className="mt-10 flex min-h-[56px] w-full items-center justify-center gap-3 rounded-xl text-base font-bold uppercase tracking-widest transition-all disabled:cursor-not-allowed disabled:opacity-50"
              style={canGrade || loading ? { backgroundColor: GOLD, color: INK } : { backgroundColor: "#F1EEE8", color: "#A1A1AA" }}
            >
              {loading ? (<><span className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" aria-hidden="true" />Grading...</>) : "Grade my hook"}
            </button>
            {error && <p role="alert" className="mt-4 text-center text-sm font-medium" style={{ color: "#B91C1C" }}>{error}</p>}
          </div>
        )}

        {step === "results" && score && (
          <div className="space-y-8">
            <div className="rounded-2xl border bg-white p-6 sm:p-8" style={{ borderColor: BORDER }}>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: MUTED }}>Your hook</p>
              <p className="whitespace-pre-line text-lg font-medium leading-relaxed">{graded}</p>
            </div>

            <ScoreCard score={score} />

            <section aria-labelledby="alts-title">
              <h2 id="alts-title" className="mb-5 text-2xl font-black">Three rewrites to choose from</h2>
              {alternatives && alternatives.length > 0 ? (
                <div className="space-y-5">
                  {alternatives.map((a, i) => {
                    const s = altScores[i];
                    const diff = s ? s.total - score.total : 0;
                    return (
                      <div key={i} className="rounded-2xl border bg-white p-6 sm:p-8" style={{ borderColor: BORDER, borderTop: `3px solid ${i === 0 ? GOLD : i === 1 ? ORANGE : "#D97706"}` }}>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD_TEXT }}>Option {i + 1}{a.angle ? ` · ${prettyAngle(a.angle)}` : ""}</p>
                          <div className="flex items-center gap-3">
                            {s && (
                              <span className="text-sm font-black tabular-nums" title="Scored with the same six rules as your hook">
                                {s.total}/100{" "}
                                <span className="text-xs font-bold" style={{ color: diff >= 0 ? "#9A3412" : MUTED }}>({diff >= 0 ? "+" : ""}{diff})</span>
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => copy(a.hook, i)}
                              aria-label={`Copy option ${i + 1}`}
                              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border bg-white px-3.5 text-xs font-bold transition-colors hover:bg-[#F8F6F2]"
                              style={{ borderColor: BORDER, color: INK }}
                            >
                              {copied === i ? (<><Check className="h-3.5 w-3.5" style={{ color: ORANGE }} aria-hidden="true" /> Copied</>) : (<><Copy className="h-3.5 w-3.5" aria-hidden="true" /> Copy</>)}
                            </button>
                          </div>
                        </div>
                        <p className="whitespace-pre-line text-xl font-bold leading-snug">{a.hook}</p>
                        {a.why && <p className="mt-4 text-sm leading-relaxed" style={{ color: MUTED }}><strong style={{ color: INK }}>Why it works: </strong>{a.why}</p>}
                      </div>
                    );
                  })}
                  <p className="text-xs" style={{ color: MUTED }}>Check any [bracketed] placeholders before you post, and make sure every claim is true for you. The AI never invents numbers.</p>
                </div>
              ) : (
                <div className="rounded-2xl border bg-white p-6 text-sm" style={{ borderColor: BORDER, color: MUTED }}>
                  <p role="alert" className="font-bold" style={{ color: "#B91C1C" }}>{error ?? "No rewrites came back."}</p>
                  <p className="mt-2">Your score above is still valid. It is calculated from the rules, not by the AI. Try again for rewrites.</p>
                  <button type="button" onClick={() => { setStep("input"); }} className="mt-4 inline-flex min-h-[44px] items-center rounded-lg border bg-white px-4 text-sm font-bold" style={{ borderColor: BORDER, color: INK }}>Try again</button>
                </div>
              )}
            </section>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={reset} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border bg-white px-6 text-sm font-bold transition-colors hover:bg-[#F8F6F2]" style={{ borderColor: BORDER, color: INK }}>
                <RotateCcw className="h-4 w-4" aria-hidden="true" /> Grade another hook
              </button>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://www.myntmore.com/tools/linkedin-hook-grader")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#0A66C2" }}
              >
                Share on LinkedIn
              </a>
            </div>

            <div className="rounded-2xl border bg-white p-6 text-center sm:p-8" style={{ borderColor: BORDER }}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: GOLD_TEXT }}>Turn Views into Pipeline</p>
              <h3 className="text-xl font-black mb-2">Want the full system to turn LinkedIn content into sales calls?</h3>
              <p className="text-sm mb-4" style={{ color: MUTED }}>
                Hooks capture attention, but converting readers into qualified discovery calls takes a structured daily routine.
              </p>
              <Link
                href="/resources/guides/linkedin-content-to-calls-starter-kit"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border px-6 text-sm font-bold hover:bg-[#F8F6F2] transition-colors"
                style={{ borderColor: BORDER, color: INK }}
              >
                Read the LinkedIn Content-to-Calls Starter Kit &rarr;
              </Link>
            </div>

            <div className="rounded-[28px] border p-8 text-center sm:p-12" style={{ borderColor: "rgba(245,183,49,0.45)", background: "linear-gradient(135deg,#FEF9EC 0%,#FFFFFF 100%)" }}>
              <h2 className="mx-auto max-w-2xl text-3xl font-black leading-tight sm:text-4xl">Want a LinkedIn presence that brings you meetings?</h2>
              <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: MUTED }}>A good hook gets the click. Myntmore builds the profile, the posting rhythm and the outreach behind it.</p>
              <Link href="/book-a-call" className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-full px-8 text-sm font-bold" style={{ backgroundColor: GOLD, color: INK }}>
                Book a Call
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
