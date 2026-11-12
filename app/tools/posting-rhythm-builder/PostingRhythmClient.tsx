"use client";

import { useState } from "react";
import Link from "next/link";
import LeadGate, { LeadData } from "@/components/tools/shared/LeadGate";
import { LandingPage } from "@/components/tools/posting-rhythm/LandingPage";

type FounderLifestyle =
  | "I can post daily"
  | "4–5 days/week"
  | "3 days/week"
  | "Weekends only"
  | "Mornings only"
  | "Nights only";

type Tone = "Authoritative" | "Professional & Warm" | "Sharp & Direct" | "Friendly" | "Visionary";

type ContentStrength = "Educational" | "Storytelling" | "Analytical" | "Contrarian" | "Inspirational" | "Humorous";

interface PostIdea {
  category: string;
  idea: string;
}

interface PostingStrategy {
  bestPostingDays: {
    explanation: string;
    days: string[];
    timeWindow: string;
  };
  topicCadence: {
    schedule: { day: string; type: string }[];
    psychology: string;
  };
  weeklySystem: {
    routine: { day: string; action: string }[];
  };
  postIdeas: PostIdea[];
  hooks: string[];
  ctas: string[];
}

interface AppState {
  lifestyle: FounderLifestyle | "";
  icp: string;
  strengths: ContentStrength[];
  tone: Tone | "";
}

const LIFESTYLE_OPTIONS: FounderLifestyle[] = [
  "I can post daily",
  "4–5 days/week",
  "3 days/week",
  "Weekends only",
  "Mornings only",
  "Nights only",
];

const TONE_OPTIONS: Tone[] = ["Authoritative", "Professional & Warm", "Sharp & Direct", "Friendly", "Visionary"];

const STRENGTH_COLORS: Record<ContentStrength, string> = {
  Educational: "#EA580C",
  Storytelling: "#A14A08",
  Analytical: "#D97706",
  Contrarian: "#F97316",
  Inspirational: "#F5B731",
  Humorous: "#EC4899",
};

const STRENGTH_OPTIONS: ContentStrength[] = [
  "Educational",
  "Storytelling",
  "Analytical",
  "Contrarian",
  "Inspirational",
  "Humorous",
];

const DEFAULT_APP_STATE: AppState = {
  lifestyle: "",
  icp: "",
  strengths: [],
  tone: "",
};

type FlowStep = "landing" | "lead" | "input" | "results";

export default function PostingRhythmClient() {
  const [formData, setFormData] = useState<AppState>(DEFAULT_APP_STATE);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [strategy, setStrategy] = useState<PostingStrategy | null>(null);
  const [step, setStep] = useState<FlowStep>("landing");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLeadComplete = (data: LeadData) => {
    setLeadData(data);
    setStep("input");
  };

  const toggleStrength = (strength: ContentStrength) => {
    setFormData((prev) => ({
      ...prev,
      strengths: prev.strengths.includes(strength)
        ? prev.strengths.filter((s) => s !== strength)
        : [...prev.strengths, strength],
    }));
  };

  const isFormValid = formData.lifestyle && formData.icp && formData.tone && formData.strengths.length > 0;

  const handleBuildInitial = async () => {
    if (!isFormValid) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tools/posting-rhythm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: formData,
          lead: leadData ? { name: leadData.name, companyName: leadData.companyName } : undefined,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to build strategy");
      setStrategy(result);
      setStep("results");

      if (leadData?.id) {
        // The Supabase client (~200 kB) is loaded on first use, not with the page.
        void import("@/lib/supabase")
          .then(({ supabase }) => {
            supabase
              .from("leads")
              .update({ inputs: formData, outputs: result })
              .eq("id", leadData.id)
              .then(({ error }) => {
                if (error) console.error("Supabase inputs/outputs update failed:", error);
              });
          })
          .catch((error) => console.error("Supabase inputs/outputs update failed:", error));
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(`Failed to build strategy: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  if (step === "landing") {
    return <LandingPage onStart={() => setStep("lead")} />;
  }

  return (
    <div className="min-h-screen pb-20 pt-12 text-foreground relative overflow-hidden selection:bg-[#FFC947] selection:text-black" style={{ backgroundColor: "#F8F6F2" }}>
      {/* Vivid background blobs, matching the homepage hero's color treatment */}
      <div aria-hidden="true" style={{ position: "absolute", top: "-100px", left: "-140px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.28) 0%, rgba(255,160,0,0.10) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "180px", right: "-120px", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.20) 0%, rgba(234,88,12,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <header className="pb-12 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{ background: "rgba(245,183,49,0.07)", borderColor: "rgba(245,183,49,0.35)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#D97706" }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#A14A08" }}>Posting Rhythm Builder</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
            LinkedIn Posting{" "}
            <span className="relative inline-block">
              <span className="lp-tool-accent-text">Schedule</span> Planner
              <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 300 10" preserveAspectRatio="none" aria-hidden>
                <path d="M2 7 Q75 2 150 6 Q225 10 298 5" stroke="#D97706" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-gray-700 text-sm md:text-base mb-6 max-w-xl mx-auto font-medium">
            Find how often to post on LinkedIn and the weekly schedule to keep, based on your goals and your week.
          </p>
        </header>

        <div>
          {/* Lead Gate */}
          {step === "lead" && (
            <LeadGate
              source="posting_rhythm_builder"
              heading="Tell Us About You"
              description="Enter your details to unlock your custom posting rhythm."
              onComplete={handleLeadComplete}
            />
          )}

          {/* Input Panel */}
          {step === "input" && (
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden animate-in fade-in duration-500" style={{ border: "1px solid #E8E2D9" }}>
              <div className="absolute top-0 left-0 w-full h-1 lp-tool-accent-bg opacity-50"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Founder Lifestyle</label>
                  <select
                    className="w-full bg-white rounded-lg px-4 py-3 text-black focus:border-[#FFC947] outline-none transition-colors appearance-none cursor-pointer"
                    style={{ border: "1px solid #E8E2D9" }}
                    value={formData.lifestyle || ""}
                    onChange={(e) => setFormData({ ...formData, lifestyle: e.target.value as FounderLifestyle })}
                  >
                    <option value="" disabled>
                      Select lifestyle...
                    </option>
                    {LIFESTYLE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Preferred Tone</label>
                  <select
                    className="w-full bg-white rounded-lg px-4 py-3 text-black focus:border-[#FFC947] outline-none transition-colors appearance-none cursor-pointer"
                    style={{ border: "1px solid #E8E2D9" }}
                    value={formData.tone || ""}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value as Tone })}
                  >
                    <option value="" disabled>
                      Select tone...
                    </option>
                    {TONE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Ideal Customer Profile (ICP)</label>
                  <input
                    type="text"
                    className="w-full bg-white rounded-lg px-4 py-4 text-black focus:border-[#FFC947] outline-none transition-colors placeholder:text-gray-400"
                    style={{ border: "1px solid #E8E2D9" }}
                    placeholder="e.g. Sales Leaders at Series B SaaS companies"
                    value={formData.icp}
                    onChange={(e) => setFormData({ ...formData, icp: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2 space-y-4">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Content Strengths</label>
                  <div className="flex flex-wrap gap-2">
                    {STRENGTH_OPTIONS.map((strength) => {
                      const active = formData.strengths.includes(strength);
                      const color = STRENGTH_COLORS[strength];
                      return (
                        <button
                          key={strength}
                          onClick={() => toggleStrength(strength)}
                          className="px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300"
                          style={
                            active
                              ? { backgroundColor: color, color: "#000", borderColor: color, boxShadow: `0 0 15px ${color}40` }
                              : { backgroundColor: "#ffffff", color: "#000", borderColor: "#E8E2D9" }
                          }
                        >
                          {strength}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                onClick={handleBuildInitial}
                disabled={loading || !isFormValid}
                className={`w-full py-5 rounded-xl font-bold text-lg uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                  loading || !isFormValid
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                    : "lp-tool-accent-bg text-black hover:opacity-90 active:scale-[0.99] shadow-lg hover:shadow-[#FFC947]/10"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Generating Strategy...
                  </>
                ) : (
                  "Build My Rhythm"
                )}
              </button>
              {error && <p className="mt-4 text-red-500 text-center text-sm font-medium">{error}</p>}
            </div>
          )}

          {/* Results Section */}
          {step === "results" && strategy && (
            <div id="results-section" className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <div className="bg-white rounded-2xl p-8 md:p-10 flex flex-col shadow-sm" style={{ borderTop: "3px solid #F5B731", borderLeft: "1px solid #E8E2D9", borderRight: "1px solid #E8E2D9", borderBottom: "1px solid #E8E2D9" }}>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: "#A14A08" }}>Best Posting Days</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">{strategy.bestPostingDays.explanation}</p>
                  <div className="space-y-4 mb-10">
                    {strategy.bestPostingDays.days.map((day) => (
                      <div key={day} className="flex items-center gap-4 text-2xl font-bold">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#F5B731", boxShadow: "0 0 8px rgba(245,183,49,0.5)" }}></div>
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="pt-8 mt-auto" style={{ borderTop: "1px solid #E8E2D9" }}>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Best Time Window</p>
                    <p className="text-2xl font-black tracking-tight">{strategy.bestPostingDays.timeWindow}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 md:p-10 flex flex-col shadow-sm" style={{ borderTop: "3px solid #EA580C", borderLeft: "1px solid #E8E2D9", borderRight: "1px solid #E8E2D9", borderBottom: "1px solid #E8E2D9" }}>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-8" style={{ color: "#C2410C" }}>Topic Cadence</h3>
                  <div className="space-y-8 mb-10 flex-grow">
                    {strategy.topicCadence.schedule.map((item) => (
                      <div key={item.day} className="grid grid-cols-[120px_1fr] gap-4 items-start pb-4 last:border-0" style={{ borderBottom: "1px solid #F0EDE7" }}>
                        <span className="text-xl font-black tracking-tight">{item.day}</span>
                        <span className="text-gray-700 text-sm leading-snug pt-1 font-medium">{item.type}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6" style={{ borderTop: "1px solid #F0EDE7" }}>
                    <p className="text-sm text-gray-500 leading-relaxed font-normal">{strategy.topicCadence.psychology}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm" style={{ borderTop: "3px solid #D97706", borderLeft: "1px solid #E8E2D9", borderRight: "1px solid #E8E2D9", borderBottom: "1px solid #E8E2D9" }}>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-10" style={{ color: "#A14A08" }}>Weekly Posting System</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {strategy.weeklySystem.routine.map((item) => (
                    <div key={item.day} className="bg-[#FAFAFA] p-6 rounded-xl group transition-colors" style={{ border: "1px solid #E8E2D9" }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-3 group-hover:translate-x-1 transition-transform" style={{ color: "#A14A08" }}>
                        {item.day}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed font-medium">{item.action}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm" style={{ borderTop: "3px solid #A14A08", borderLeft: "1px solid #E8E2D9", borderRight: "1px solid #E8E2D9", borderBottom: "1px solid #E8E2D9" }}>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-10" style={{ color: "#9A3412" }}>High Probability Post Ideas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {strategy.postIdeas.map((idea, idx) => (
                    <div key={idx} className="group border-l-2 pl-8 py-1 transition-all duration-300" style={{ borderColor: "rgba(161,74,8,0.25)" }}>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 transition-colors group-hover:text-[#9A3412]">
                        {idea.category}
                      </p>
                      <p className="text-lg leading-snug font-semibold text-black/90 group-hover:text-black transition-colors">{idea.idea}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm" style={{ borderTop: "3px solid #F97316", borderLeft: "1px solid #E8E2D9", borderRight: "1px solid #E8E2D9", borderBottom: "1px solid #E8E2D9" }}>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-center" style={{ color: "#9A3412" }}>Scroll-Stopping Hooks</h3>
                  <div className="space-y-8">
                    {strategy.hooks.map((hook, idx) => (
                      <div key={idx} className="flex gap-6 group">
                        <span className="font-black text-xl transition-colors" style={{ color: "rgba(249,115,22,0.35)" }}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <p className="text-gray-700 text-[15px] leading-relaxed pt-1">&quot;{hook}&quot;</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm" style={{ borderTop: "3px solid #B8860B", borderLeft: "1px solid #E8E2D9", borderRight: "1px solid #E8E2D9", borderBottom: "1px solid #E8E2D9" }}>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-center" style={{ color: "#7A5200" }}>Low-Friction CTAs</h3>
                  <div className="space-y-8">
                    {strategy.ctas.map((cta, idx) => (
                      <div key={idx} className="flex gap-6 group">
                        <span className="font-black text-xl transition-colors" style={{ color: "rgba(184,134,11,0.35)" }}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <p className="text-gray-700 text-[15px] leading-relaxed pt-1 font-medium">{cta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-12 text-center shadow-sm" style={{ border: "1px solid #E8E2D9" }}>
                <h3 className="text-2xl font-black mb-8">Ready to execute your new rhythm?</h3>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-4 px-10 py-5 border-2 text-black font-bold rounded-full hover:bg-[#F5B731] hover:border-[#F5B731] transition-all active:scale-[0.98] uppercase text-sm tracking-widest"
                  style={{ borderColor: "#3D3D3D" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Full Operating Pack
                </button>
              </div>

              <div className="relative group overflow-hidden bg-white rounded-2xl p-12 md:p-20 text-center shadow-sm" style={{ border: "2px solid #FFC947" }}>
                <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                  <svg className="w-64 h-64 text-[#FFC947]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black mb-6 relative z-10 leading-tight">
                  We can execute your content engine for you
                </h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto relative z-10 text-lg font-normal leading-relaxed">
                  Myntmore handles the complete content cycle: Strategy, Copywriting, and Daily Distribution for elite B2B founders.
                </p>
                <Link
                  href="/book-a-call"
                  className="inline-block lp-tool-accent-bg text-black font-black px-12 py-5 rounded-full text-lg uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(255,201,71,0.4)] transition-all active:scale-[0.98] relative z-10"
                >
                  Book A Call
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
