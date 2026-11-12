"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { toast } from "sonner";
import LeadGate, { LeadData } from "@/components/tools/shared/LeadGate";
import { LandingPage } from "@/components/tools/founder-presence/LandingPage";
import { ScoreRing } from "@/components/tools/founder-presence/ScoreRing";

// GapChart pulls in recharts (~5MB of source), so it's kept out of this
// route's initial bundle and only fetched once results are actually shown.
const GapChart = dynamic(
  () => import("@/components/tools/founder-presence/GapChart").then((m) => m.GapChart),
  { ssr: false }
);

type FrequencyOption = "0" | "1–2" | "3–5" | "6–10" | "10+";
type EngagementOption = "<20 likes" | "20–50 likes" | "50–100 likes" | "100–250 likes" | "250+ likes";

interface Competitor {
  id: string;
  name: string;
  frequency: FrequencyOption;
  engagement: EngagementOption;
}

interface UserInput {
  frequency: FrequencyOption;
  engagement: EngagementOption;
  userTopics: string[];
  competitorTopics: string[];
  competitors: Competitor[];
}

interface AIAnalysisResult {
  scoreInsight: string;
  opportunityAreas: string[];
  narrativePositioning: string;
  headlineSuggestions: {
    categoryLeadership: string;
    icpClarity: string;
    boldDifferentiation: string;
  };
}

const FREQUENCY_OPTIONS: FrequencyOption[] = ["0", "1–2", "3–5", "6–10", "10+"];
const ENGAGEMENT_OPTIONS: EngagementOption[] = ["<20 likes", "20–50 likes", "50–100 likes", "100–250 likes", "250+ likes"];

const TOPIC_OPTIONS = [
  "Hiring / Recruiting",
  "Recruiting Operations",
  "AI & Automation",
  "Product Updates",
  "Industry Insights",
  "Founder Journey",
  "Customer Stories",
  "Fundraising",
  "Leadership & Culture",
];

const FREQUENCY_MAP: Record<FrequencyOption, number> = { "0": 0, "1–2": 1.5, "3–5": 4, "6–10": 8, "10+": 12 };
const ENGAGEMENT_MAP: Record<EngagementOption, number> = {
  "<20 likes": 10,
  "20–50 likes": 35,
  "50–100 likes": 75,
  "100–250 likes": 175,
  "250+ likes": 300,
};

type FlowStep = "landing" | "lead" | "activity" | "competitors" | "themes" | "ready" | "results";

const WIZARD_STEPS: FlowStep[] = ["activity", "competitors", "themes"];

export default function FounderPresenceClient() {
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [step, setStep] = useState<FlowStep>("landing");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UserInput>({
    frequency: "3–5",
    engagement: "50–100 likes",
    userTopics: [],
    competitorTopics: [],
    competitors: [{ id: "1", name: "", frequency: "6–10", engagement: "100–250 likes" }],
  });
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);

  const calculated = useMemo(() => {
    const userFreqScore = FREQUENCY_MAP[formData.frequency];
    const userEngScore = ENGAGEMENT_MAP[formData.engagement];

    const validCompetitors = formData.competitors.filter((c) => c.name.trim() !== "");
    const compCount = Math.max(validCompetitors.length, 1);

    const compAvgFreqScore =
      validCompetitors.length > 0 ? validCompetitors.reduce((acc, c) => acc + FREQUENCY_MAP[c.frequency], 0) / compCount : 8;

    const compAvgEngScore =
      validCompetitors.length > 0 ? validCompetitors.reduce((acc, c) => acc + ENGAGEMENT_MAP[c.engagement], 0) / compCount : 150;

    const freqRatio = compAvgFreqScore === 0 ? 1 : userFreqScore / compAvgFreqScore;
    const engRatio = compAvgEngScore === 0 ? 1 : userEngScore / compAvgEngScore;

    const score = freqRatio * 50 + engRatio * 50;
    return {
      userFreqScore,
      userEngScore,
      compAvgFreqScore,
      compAvgEngScore,
      finalPresenceScore: Math.min(Math.max(score, 0), 100),
    };
  }, [formData]);

  const handleLeadComplete = (data: LeadData) => {
    setLeadData(data);
    setStep("activity");
  };

  const handleRunAnalysis = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tools/founder-presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: formData, calculated }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to analyze presence");
      setAnalysis(result);
      setStep("results");

      if (leadData?.id) {
        // The Supabase client (~200 kB) is loaded on first use, not with the page.
        void import("@/lib/supabase")
          .then(({ supabase }) => {
            supabase
              .from("leads")
              .update({ inputs: { ...formData, calculated }, outputs: result })
              .eq("id", leadData.id)
              .then(({ error }) => {
                if (error) console.error("Supabase inputs/outputs update failed:", error);
              });
          })
          .catch((error) => console.error("Supabase inputs/outputs update failed:", error));
      }
    } catch (error) {
      console.error("Analysis failed", error);
      toast.error("Something went wrong. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const addCompetitor = () => {
    if (formData.competitors.length < 5) {
      setFormData({
        ...formData,
        competitors: [...formData.competitors, { id: `${Date.now()}`, name: "", frequency: "3–5", engagement: "20–50 likes" }],
      });
    }
  };

  const removeCompetitor = (id: string) => {
    setFormData({ ...formData, competitors: formData.competitors.filter((c) => c.id !== id) });
  };

  const toggleTopic = (list: "userTopics" | "competitorTopics", topic: string) => {
    setFormData((prev) => {
      const current = prev[list];
      return current.includes(topic) ? { ...prev, [list]: current.filter((t) => t !== topic) } : { ...prev, [list]: [...current, topic] };
    });
  };

  const wizardIndex = WIZARD_STEPS.indexOf(step);

  if (step === "landing") {
    return <LandingPage onStart={() => setStep("lead")} />;
  }

  return (
    <div className="min-h-screen bg-white text-foreground relative overflow-hidden selection:bg-[#FFC947]/30">
      {/* Vivid background blobs, matching the homepage hero's color treatment */}
      <div aria-hidden="true" style={{ position: "absolute", top: "-100px", left: "-140px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.22) 0%, rgba(234,88,12,0.09) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "180px", right: "-120px", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.20) 0%, rgba(255,160,0,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-16 relative z-10">
        {step === "lead" && (
          <header className="pb-12 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
              style={{ background: "rgba(245,183,49,0.07)", borderColor: "rgba(245,183,49,0.35)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#D97706" }} aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#0F766E" }}>Founder Presence Analyzer</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              <span className="relative inline-block">
                LinkedIn Competitor Analysis for Founders
                <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 460 10" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 7 Q115 2 230 6 Q345 10 458 5" stroke="#D97706" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="text-gray-700 text-sm md:text-base max-w-xl mx-auto font-medium">
              Benchmark your founder presence: see how your LinkedIn posting frequency and engagement stack up against up to 5 competitors.
            </p>
          </header>
        )}

        {step === "lead" && (
          <LeadGate
            source="founder_presence_analyzer"
            heading="Tell Us About You"
            description="Enter your details to get started."
            onComplete={handleLeadComplete}
          />
        )}

        {step !== "lead" && step !== "results" && (
          <div className="max-w-2xl mx-auto">
            {wizardIndex >= 0 && (
              <div className="flex items-center gap-2 mb-8">
                {WIZARD_STEPS.map((s, i) => (
                  <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= wizardIndex ? "lp-tool-accent-bg" : "bg-gray-200"}`} />
                ))}
              </div>
            )}

            {/* Step: Your Activity */}
            {step === "activity" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl sm:text-4xl font-black mb-2">Your Activity</h2>
                <p className="text-muted-foreground mb-10">Start with your own LinkedIn footprint in the last 30 days.</p>
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-semibold mb-4 text-foreground/80">How many LinkedIn posts have you published?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {FREQUENCY_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setFormData({ ...formData, frequency: opt })}
                          className={`py-3 rounded-xl border-2 transition-all ${
                            formData.frequency === opt ? "border-[#FFC947] bg-[#FFC947]/10 text-foreground" : "border-gray-200 bg-gray-50 text-muted-foreground hover:border-gray-300"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-4 text-foreground/80">What is your average engagement per post?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {ENGAGEMENT_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setFormData({ ...formData, engagement: opt })}
                          className={`py-3 px-4 text-left rounded-xl border-2 transition-all ${
                            formData.engagement === opt ? "border-[#FFC947] bg-[#FFC947]/10 text-foreground" : "border-gray-200 bg-gray-50 text-muted-foreground hover:border-gray-300"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <button onClick={() => setStep("competitors")} className="w-full py-4 lp-tool-accent-bg text-black font-bold rounded-xl hover:brightness-110 transition-all active:scale-[0.98]">
                    Continue to Competitors
                  </button>
                </div>
              </div>
            )}

            {/* Step: Competitors */}
            {step === "competitors" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl sm:text-4xl font-black mb-2">Competitors</h2>
                <p className="text-muted-foreground mb-10">Add up to 5 key competitors you&apos;re benchmarking against.</p>
                <div className="space-y-6">
                  {formData.competitors.map((comp, idx) => (
                    <div key={comp.id} className="p-6 rounded-2xl bg-gray-50 space-y-4" style={{ border: "1px solid #E8E2D9" }}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest lp-tool-accent-text">Competitor {idx + 1}</span>
                        {formData.competitors.length > 1 && (
                          <button onClick={() => removeCompetitor(comp.id)} aria-label="Remove competitor" className="-m-2 p-2 text-muted-foreground hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Company or Founder Name"
                        value={comp.name}
                        onChange={(e) => {
                          const newComps = [...formData.competitors];
                          newComps[idx] = { ...newComps[idx], name: e.target.value };
                          setFormData({ ...formData, competitors: newComps });
                        }}
                        className="w-full bg-white rounded-xl px-4 py-3 focus:border-[#FFC947] focus:ring-1 focus:ring-[#FFC947] outline-none transition-all"
                        style={{ border: "1px solid #E8E2D9" }}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Frequency</label>
                          <select
                            value={comp.frequency}
                            onChange={(e) => {
                              const newComps = [...formData.competitors];
                              newComps[idx] = { ...newComps[idx], frequency: e.target.value as FrequencyOption };
                              setFormData({ ...formData, competitors: newComps });
                            }}
                            className="w-full bg-white rounded-lg px-3 py-2 text-sm outline-none"
                            style={{ border: "1px solid #E8E2D9" }}
                          >
                            {FREQUENCY_OPTIONS.map((o) => (
                              <option key={o} value={o}>
                                {o} posts
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Engagement</label>
                          <select
                            value={comp.engagement}
                            onChange={(e) => {
                              const newComps = [...formData.competitors];
                              newComps[idx] = { ...newComps[idx], engagement: e.target.value as EngagementOption };
                              setFormData({ ...formData, competitors: newComps });
                            }}
                            className="w-full bg-white rounded-lg px-3 py-2 text-sm outline-none"
                            style={{ border: "1px solid #E8E2D9" }}
                          >
                            {ENGAGEMENT_OPTIONS.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                  {formData.competitors.length < 5 && (
                    <button
                      onClick={addCompetitor}
                      className="w-full py-4 border-2 border-dashed rounded-2xl text-muted-foreground hover:border-[#FFC947]/40 hover:text-foreground transition-all flex items-center justify-center gap-2"
                      style={{ borderColor: "#E8E2D9" }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Add Another Competitor
                    </button>
                  )}
                </div>
                <div className="mt-12 flex gap-4">
                  <button onClick={() => setStep("activity")} className="flex-1 py-4 text-muted-foreground font-bold rounded-xl hover:bg-gray-50 transition-all" style={{ border: "1px solid #E8E2D9" }}>
                    Back
                  </button>
                  <button
                    onClick={() => setStep("themes")}
                    disabled={formData.competitors.some((c) => !c.name.trim())}
                    className="flex-[2] py-4 lp-tool-accent-bg text-black font-bold rounded-xl hover:brightness-110 disabled:opacity-50 disabled:hover:brightness-100 transition-all"
                  >
                    Continue to Narrative
                  </button>
                </div>
              </div>
            )}

            {/* Step: Content Themes */}
            {step === "themes" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl sm:text-4xl font-black mb-2">Content Themes</h2>
                <p className="text-muted-foreground mb-10">Map out the narrative overlap and gaps.</p>
                <div className="space-y-12">
                  <div>
                    <label className="block text-sm font-semibold mb-4 text-foreground/80">What topics do you mostly post about?</label>
                    <div className="flex flex-wrap gap-3">
                      {TOPIC_OPTIONS.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => toggleTopic("userTopics", topic)}
                          className={`px-4 py-2 rounded-full border text-sm transition-all ${
                            formData.userTopics.includes(topic) ? "lp-tool-accent-bg border-[#FFC947] text-black font-medium" : "bg-transparent text-muted-foreground hover:border-gray-400"
                          }`}
                          style={formData.userTopics.includes(topic) ? undefined : { borderColor: "#E8E2D9" }}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-4 text-foreground/80">What topics do competitors mostly post about?</label>
                    <div className="flex flex-wrap gap-3">
                      {TOPIC_OPTIONS.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => toggleTopic("competitorTopics", topic)}
                          className={`px-4 py-2 rounded-full border text-sm transition-all ${
                            formData.competitorTopics.includes(topic) ? "lp-tool-accent-bg border-[#FFC947] text-black font-medium" : "bg-transparent text-muted-foreground hover:border-gray-400"
                          }`}
                          style={formData.competitorTopics.includes(topic) ? undefined : { borderColor: "#E8E2D9" }}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-12 flex gap-4">
                  <button onClick={() => setStep("competitors")} className="flex-1 py-4 text-muted-foreground font-bold rounded-xl hover:bg-gray-50 transition-all" style={{ border: "1px solid #E8E2D9" }}>
                    Back
                  </button>
                  <button onClick={() => setStep("ready")} className="flex-[2] py-4 lp-tool-accent-bg text-black font-bold rounded-xl hover:brightness-110 transition-all">
                    Review Analysis Ready
                  </button>
                </div>
              </div>
            )}

            {/* Step: Ready to Analyze */}
            {step === "ready" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-10">
                <div className="w-24 h-24 bg-[#FFC947]/10 rounded-full flex items-center justify-center mx-auto mb-8" style={{ boxShadow: "0 0 20px rgba(255,201,71,0.15)" }}>
                  <svg className="w-12 h-12 text-[#FFC947]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black mb-4">Ready for Analysis</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-12">
                  Thanks, {leadData?.name.split(" ")[0]}. We&apos;re ready to calculate your competitive gap.
                </p>
                <button
                  onClick={handleRunAnalysis}
                  disabled={loading}
                  className="w-full py-5 lp-tool-accent-bg text-black text-xl font-black rounded-2xl hover:brightness-110 transition-all disabled:opacity-50 relative overflow-hidden"
                >
                  <span className={loading ? "opacity-0" : "opacity-100"}>Analyze My Competitive Presence</span>
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Dashboard Output */}
        {step === "results" && analysis && (
          <div className="animate-in fade-in zoom-in-95 duration-1000 space-y-12">
            <header className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">Analysis Dashboard</h1>
              <p className="text-muted-foreground text-lg">Detailed breakdown for {leadData?.name}.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 rounded-2xl p-8 flex flex-col items-center text-center bg-gray-50" style={{ border: "1px solid #E8E2D9" }}>
                <h2 className="text-sm uppercase tracking-widest text-muted-foreground font-bold mb-8">Founder Presence Score</h2>
                <ScoreRing score={calculated.finalPresenceScore} />
                <div className="mt-10 p-4 bg-white rounded-2xl" style={{ border: "1px solid #E8E2D9" }}>
                  <p className="text-foreground/80 italic text-sm leading-relaxed">&quot;{analysis.scoreInsight}&quot;</p>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-8">
                <div className="rounded-2xl p-8 bg-gray-50" style={{ border: "1px solid #E8E2D9" }}>
                  <h2 className="text-sm uppercase tracking-widest text-muted-foreground font-bold mb-6">Posting Frequency Comparison</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr style={{ borderBottom: "1px solid #E8E2D9" }}>
                          <th className="pb-4 font-bold text-foreground/80">Company</th>
                          <th className="pb-4 font-bold text-foreground/80">Frequency</th>
                          <th className="pb-4 font-bold text-foreground/80">Avg Engagement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ borderColor: "#E8E2D9" }}>
                        <tr className="lp-tool-accent-bg text-black">
                          <td className="py-4 px-3 font-bold rounded-l-xl">You</td>
                          <td className="py-4 px-3 font-medium">{formData.frequency} / mo</td>
                          <td className="py-4 px-3 font-medium rounded-r-xl">{formData.engagement}</td>
                        </tr>
                        {formData.competitors
                          .filter((c) => c.name.trim() !== "")
                          .map((comp) => (
                            <tr key={comp.id} className="text-muted-foreground">
                              <td className="py-4 px-3">{comp.name}</td>
                              <td className="py-4 px-3">{comp.frequency} / mo</td>
                              <td className="py-4 px-3">{comp.engagement}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="rounded-2xl p-8 bg-gray-50" style={{ border: "1px solid #E8E2D9" }}>
                  <h2 className="text-sm uppercase tracking-widest text-muted-foreground font-bold mb-6">Engagement Gap Chart</h2>
                  <GapChart userAvg={calculated.userEngScore} compAvg={calculated.compAvgEngScore} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-2xl p-8 bg-gray-50" style={{ border: "1px solid #E8E2D9" }}>
                <h2 className="text-sm uppercase tracking-widest lp-tool-accent-text font-bold mb-6">Key Opportunity Areas</h2>
                <ul className="space-y-4">
                  {analysis.opportunityAreas.map((area, idx) => (
                    <li key={idx} className="flex gap-3 text-foreground/80">
                      <div className="mt-1 w-5 h-5 bg-[#FFC947]/10 rounded flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-[#FFC947]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm leading-relaxed">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-8 bg-gray-50" style={{ border: "1px solid #E8E2D9" }}>
                <h2 className="text-sm uppercase tracking-widest lp-tool-accent-text font-bold mb-6">Positioning Recommendation</h2>
                <p className="text-foreground/80 text-sm leading-relaxed">{analysis.narrativePositioning}</p>
              </div>
            </div>

            <div className="rounded-2xl p-8 bg-gray-50" style={{ border: "1px solid #E8E2D9" }}>
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground font-bold mb-8 text-center">Updated Founder Headline Suggestions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Category Leadership", content: analysis.headlineSuggestions.categoryLeadership },
                  { label: "ICP Clarity", content: analysis.headlineSuggestions.icpClarity },
                  { label: "Bold Differentiation", content: analysis.headlineSuggestions.boldDifferentiation },
                ].map((item, idx) => (
                  <div key={idx} className="p-6 bg-white rounded-2xl hover:border-[#FFC947]/50 transition-colors flex flex-col justify-between group" style={{ border: "1px solid #E8E2D9" }}>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest lp-tool-accent-text block mb-3">{item.label}</span>
                      <p className="text-foreground text-sm font-medium leading-snug">{item.content}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.content);
                      }}
                      className="mt-6 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Copy Headline
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <section className="mt-20">
              <div className="p-12 rounded-2xl bg-white text-center relative overflow-hidden" style={{ border: "2px solid #FFC947", boxShadow: "0 0 40px rgba(255,201,71,0.1)" }}>
                <h2 className="text-3xl md:text-4xl font-black mb-6">Let Myntmore build your entire founder presence + pipeline engine</h2>
                <Link href="/book-a-call" className="inline-block px-10 py-5 lp-tool-accent-bg text-black font-black text-lg rounded-2xl hover:scale-105 transition-all">
                  Book a Strategy Call
                </Link>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
