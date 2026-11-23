"use client";

import { useState } from "react";
import Link from "next/link";
import LeadGate, { LeadData } from "@/components/tools/shared/LeadGate";
import { LandingPage } from "@/components/tools/lead-magnet-ideas/LandingPage";
import { Lightbulb, TrendingUp, Send, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { textTone } from "@/lib/colors";
import { saveLeadResult } from "@/lib/save-lead-result";
import pageCopy from "@/content/page-copy/toolLeadMagnetIdeas.json";

// This page's text is edited in the admin ("B2B Lead Magnet Idea Generator") and lives in content/page-copy/toolLeadMagnetIdeas.json.
const copy = pageCopy;

const INDUSTRY_OPTIONS = [
  copy.LeadMagnetIdeasClient_s02.t01,
  "Manufacturing",
  copy.LeadMagnetIdeasClient_s02.t02,
  copy.LeadMagnetIdeasClient_s02.t03,
  "E-commerce",
  copy.LeadMagnetIdeasClient_s02.t04,
  copy.LeadMagnetIdeasClient_s02.t05,
  copy.LeadMagnetIdeasClient_s02.t06,
  "Other",
];

const TONE_OPTIONS = ["Authoritative", copy.LeadMagnetIdeasClient_s02.t07, copy.LeadMagnetIdeasClient_s02.t08, "Friendly", "Visionary"];

interface LeadMagnetIdea {
  title: string;
  pitch: string;
  whyItWorks: string;
  distribution: string;
}

interface FormState {
  businessDescription: string;
  icp: string;
  industry: string;
  customIndustry: string;
  tone: string;
}

const DEFAULT_FORM_STATE: FormState = {
  businessDescription: "",
  icp: "",
  industry: "",
  customIndustry: "",
  tone: "",
};

const IDEA_COLORS = ["#F5B731", "#EA580C", "#D97706"];

type FlowStep = "landing" | "lead" | "input" | "results";

export default function LeadMagnetIdeasClient() {
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [formData, setFormData] = useState<FormState>(DEFAULT_FORM_STATE);
  const [ideas, setIdeas] = useState<LeadMagnetIdea[] | null>(null);
  const [step, setStep] = useState<FlowStep>("landing");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyIdea = async (idea: LeadMagnetIdea, index: number) => {
    const text = `${idea.title}\n\n${idea.pitch}\n\nWhy It Works: ${idea.whyItWorks}\n\nHow to Use It: ${idea.distribution}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success("Idea copied to clipboard");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleLeadComplete = (data: LeadData) => {
    setLeadData(data);
    setStep("input");
  };

  const isFormValid =
    formData.businessDescription.trim() &&
    formData.icp.trim() &&
    formData.industry &&
    (formData.industry !== "Other" || formData.customIndustry.trim()) &&
    formData.tone;

  const handleGenerate = async () => {
    if (!isFormValid) return;
    setLoading(true);
    setError(null);
    try {
      const effectiveIndustry = formData.industry === "Other" ? formData.customIndustry : formData.industry;
      const requestInputs = {
        businessDescription: formData.businessDescription,
        icp: formData.icp,
        industry: effectiveIndustry,
        tone: formData.tone,
      };
      const res = await fetch("/api/tools/lead-magnet-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestInputs),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to generate ideas");
      setIdeas(result.ideas);
      setStep("results");

      if (leadData?.id) {
        saveLeadResult(leadData.id, requestInputs, result);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(`Failed to generate ideas: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  if (step === "landing") {
    return <LandingPage onStart={() => setStep("lead")} />;
  }

  return (
    <div className="min-h-screen pb-20 pt-12 text-foreground relative overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
      {/* Vivid background blobs, matching the homepage hero's color treatment */}
      <div aria-hidden="true" style={{ position: "absolute", top: "-100px", left: "-140px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.28) 0%, rgba(255,160,0,0.10) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "180px", right: "-120px", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,139,250,0.20) 0%, rgba(161,74,8,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <header className="pb-12 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{ background: "rgba(234,88,12,0.07)", borderColor: "rgba(234,88,12,0.35)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#EA580C" }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#C2410C" }}>{copy.LeadMagnetIdeasClient_s02.t09}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">{copy.LeadMagnetIdeasClient_s02.t10}{" "}
            <span className="relative inline-block">
              <span className="text-primary">{copy.LeadMagnetIdeasClient_s02.t11}</span>{copy.LeadMagnetIdeasClient_s02.t12}<svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 300 10" preserveAspectRatio="none" aria-hidden>
                <path d="M2 7 Q75 2 150 6 Q225 10 298 5" stroke="#EA580C" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-gray-700 text-sm md:text-base mb-6 max-w-xl mx-auto font-medium">{copy.LeadMagnetIdeasClient_s02.t13}</p>
        </header>

        <div>
          {/* Lead Gate */}
          {step === "lead" && (
            <LeadGate
              source="lead_magnet_ideas"
              heading="Tell Us About You"
              description="Enter your details to unlock your custom lead magnet ideas."
              onComplete={handleLeadComplete}
            />
          )}

          {/* Input Panel */}
          {step === "input" && (
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden animate-in fade-in duration-500" style={{ border: "1px solid #E8E2D9" }}>
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: "#F5B731", opacity: 0.5 }}></div>

              <div className="space-y-8 mb-10">
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">{copy.LeadMagnetIdeasClient_s02.t14}</label>
                  <textarea
                    className="w-full bg-white rounded-lg px-4 py-4 text-black focus:border-[#F5B731] outline-none transition-colors placeholder:text-gray-400 resize-none"
                    style={{ border: "1px solid #E8E2D9" }}
                    rows={4}
                    placeholder={copy.LeadMagnetIdeasClient_s02.t15}
                    value={formData.businessDescription}
                    onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">{copy.LeadMagnetIdeasClient_s02.t16}</label>
                    <input
                      type="text"
                      className="w-full bg-white rounded-lg px-4 py-3 text-black focus:border-[#F5B731] outline-none transition-colors placeholder:text-gray-400"
                      style={{ border: "1px solid #E8E2D9" }}
                      placeholder={copy.LeadMagnetIdeasClient_s02.t17}
                      value={formData.icp}
                      onChange={(e) => setFormData({ ...formData, icp: e.target.value })}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">{copy.LeadMagnetIdeasClient_s02.t18}</label>
                    <select
                      className="w-full bg-white rounded-lg px-4 py-3 text-black focus:border-[#F5B731] outline-none transition-colors appearance-none cursor-pointer"
                      style={{ border: "1px solid #E8E2D9" }}
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value, customIndustry: "" })}
                    >
                      <option value="" disabled>{copy.LeadMagnetIdeasClient_s02.t19}</option>
                      {INDUSTRY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {formData.industry === "Other" && (
                      <input
                        type="text"
                        className="w-full bg-white rounded-lg px-4 py-3 text-black focus:border-[#F5B731] outline-none transition-colors placeholder:text-gray-400 mt-3"
                        style={{ border: "1px solid #E8E2D9" }}
                        placeholder={copy.LeadMagnetIdeasClient_s02.t20}
                        value={formData.customIndustry}
                        onChange={(e) => setFormData({ ...formData, customIndustry: e.target.value })}
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">{copy.LeadMagnetIdeasClient_s02.t21}</label>
                  <div className="flex flex-wrap gap-2">
                    {TONE_OPTIONS.map((tone) => {
                      const active = formData.tone === tone;
                      return (
                        <button
                          key={tone}
                          onClick={() => setFormData({ ...formData, tone })}
                          className="px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300"
                          style={
                            active
                              ? { backgroundColor: "#F5B731", color: "#000", borderColor: "#F5B731", boxShadow: "0 0 15px rgba(245,183,49,0.25)" }
                              : { backgroundColor: "#ffffff", color: "#000", borderColor: "#E8E2D9" }
                          }
                        >
                          {tone}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !isFormValid}
                className={`w-full py-5 rounded-xl font-bold text-lg uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                  loading || !isFormValid
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                    : "text-black hover:opacity-90 active:scale-[0.99] shadow-lg"
                }`}
                style={loading || !isFormValid ? undefined : { backgroundColor: "#F5B731" }}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>{copy.LeadMagnetIdeasClient_s02.t22}</>
                ) : (
                  "Generate Ideas"
                )}
              </button>
              {error && <p className="mt-4 text-red-500 text-center text-sm font-medium">{error}</p>}
            </div>
          )}

          {/* Results Section */}
          {step === "results" && ideas && (
            <div id="results-section" className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
              {ideas.map((idea, idx) => {
                const color = IDEA_COLORS[idx % IDEA_COLORS.length];
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-8 md:p-10 shadow-sm"
                    style={{ borderTop: `3px solid ${color}`, borderLeft: "1px solid #E8E2D9", borderRight: "1px solid #E8E2D9", borderBottom: "1px solid #E8E2D9" }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${color}18`, border: `1px solid ${color}40` }}
                        >
                          <Lightbulb className="w-4 h-4" style={{ color }} />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: textTone(color) }}>{copy.LeadMagnetIdeasClient_s02.t23}{idx + 1}
                        </p>
                      </div>
                      <button
                        onClick={() => copyIdea(idea, idx)}
                        className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0"
                        aria-label="Copy idea"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5" style={{ color }} />{copy.LeadMagnetIdeasClient_s02.t24}</>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />{copy.LeadMagnetIdeasClient_s02.t25}</>
                        )}
                      </button>
                    </div>
                    <h3 className="text-2xl font-black mb-4">{idea.title}</h3>
                    <p className="text-gray-700 text-base leading-relaxed mb-6">{idea.pitch}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6" style={{ borderTop: "1px solid #F0EDE7" }}>
                      <div>
                        <p className="flex items-center gap-1.5 text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                          <TrendingUp className="w-3.5 h-3.5" />{copy.LeadMagnetIdeasClient_s02.t26}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{idea.whyItWorks}</p>
                      </div>
                      <div>
                        <p className="flex items-center gap-1.5 text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                          <Send className="w-3.5 h-3.5" />{copy.LeadMagnetIdeasClient_s02.t27}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{idea.distribution}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="relative group overflow-hidden bg-white rounded-2xl p-12 md:p-20 text-center shadow-sm" style={{ border: "2px solid #F5B731" }}>
                <h2 className="text-3xl sm:text-4xl font-black mb-6 relative z-10 leading-tight">{copy.LeadMagnetIdeasClient_s03.t01}</h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto relative z-10 text-lg font-normal leading-relaxed">{copy.LeadMagnetIdeasClient_s03.t02}</p>
                <Link
                  href="/book-a-call"
                  className="inline-block text-black font-black px-12 py-5 rounded-full text-lg uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(245,183,49,0.4)] transition-all active:scale-[0.98] relative z-10"
                  style={{ backgroundColor: "#F5B731" }}
                >{copy.LeadMagnetIdeasClient_s03.t03}</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
