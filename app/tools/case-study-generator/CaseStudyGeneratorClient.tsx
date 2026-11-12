"use client";

import { useState } from "react";
import { toast } from "sonner";
import LeadGate, { LeadData } from "@/components/tools/shared/LeadGate";
import { LandingPage } from "@/components/tools/case-study-generator/LandingPage";
import { ModeSelect } from "@/components/tools/case-study-generator/ModeSelect";
import { CaseStudyForm } from "@/components/tools/case-study-generator/CaseStudyForm";
import { ProposalForm } from "@/components/tools/case-study-generator/ProposalForm";
import { CaseStudyResults } from "@/components/tools/case-study-generator/CaseStudyResults";
import { ProposalResults } from "@/components/tools/case-study-generator/ProposalResults";
import type { GeneratorMode, CaseStudyInput, ProposalInput, CaseStudyOutput, ProposalOutput } from "@/components/tools/case-study-generator/types";
import { textTone } from "@/lib/colors";

const ACCENT = "#EA580C";

type Step = "landing" | "lead" | "mode" | "form" | "results";

export default function CaseStudyGeneratorClient() {
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [step, setStep] = useState<Step>("landing");
  const [mode, setMode] = useState<GeneratorMode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [caseStudyResult, setCaseStudyResult] = useState<CaseStudyOutput | null>(null);
  const [proposalResult, setProposalResult] = useState<ProposalOutput | null>(null);

  const saveOutputs = (inputs: unknown, outputs: unknown) => {
    if (!leadData?.id) return;
    // The Supabase client (~200 kB) is loaded on first use, not with the page.
    void import("@/lib/supabase")
      .then(({ supabase }) => {
        supabase
          .from("leads")
          .update({ inputs, outputs })
          .eq("id", leadData.id)
          .then(({ error }) => {
            if (error) console.error("Supabase inputs/outputs update failed:", error);
          });
      })
      .catch((error) => console.error("Supabase inputs/outputs update failed:", error));
  };

  const handleLeadComplete = (data: LeadData) => {
    setLeadData(data);
    setStep("mode");
  };

  const handleModeSelect = (m: GeneratorMode) => {
    setMode(m);
    setStep("form");
  };

  const handleGenerateCaseStudy = async (data: CaseStudyInput) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/tools/case-study-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "case_study", ...data }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to generate case study");
      setCaseStudyResult(result);
      saveOutputs({ mode: "case_study", ...data }, result);
      setStep("results");
    } catch (error) {
      console.error("Case study generation failed:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateProposal = async (data: ProposalInput) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/tools/case-study-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "proposal", ...data }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to generate proposal");
      setProposalResult(result);
      saveOutputs({ mode: "proposal", ...data }, result);
      setStep("results");
    } catch (error) {
      console.error("Proposal generation failed:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMode(null);
    setCaseStudyResult(null);
    setProposalResult(null);
    setStep("mode");
  };

  if (step === "landing") {
    return <LandingPage onStart={() => setStep("lead")} />;
  }

  return (
    <div className="min-h-screen pb-20 pt-12 text-foreground relative overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "-100px", left: "-140px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,139,250,0.22) 0%, rgba(161,74,8,0.09) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "180px", right: "-120px", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.16) 0%, rgba(234,88,12,0.07) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {step === "lead" && (
          <>
            <header className="pb-12 text-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
                style={{ background: "rgba(234,88,12,0.07)", borderColor: "rgba(234,88,12,0.35)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>Free AI Writing Tool</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
                <span className="relative inline-block">
                  AI Case Study & Proposal Generator
                  <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 460 10" preserveAspectRatio="none" aria-hidden>
                    <path d="M2 7 Q115 2 230 6 Q345 10 458 5" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-gray-700 text-sm md:text-base max-w-xl mx-auto font-medium">
                Never face the blank page again. Turn a finished project into a B2B case study, or a prospect conversation into a proposal draft. No invented numbers, no generic filler.
              </p>
            </header>
            <LeadGate
              source="case_study_generator"
              heading="Tell Us About You"
              description="Enter your details to start drafting."
              onComplete={handleLeadComplete}
            />
          </>
        )}

        {step === "mode" && <ModeSelect onSelect={handleModeSelect} />}

        {step === "form" && mode === "case_study" && <CaseStudyForm onGenerate={handleGenerateCaseStudy} isLoading={isLoading} />}
        {step === "form" && mode === "proposal" && <ProposalForm onGenerate={handleGenerateProposal} isLoading={isLoading} />}

        {step === "results" && mode === "case_study" && caseStudyResult && <CaseStudyResults result={caseStudyResult} onReset={handleReset} />}
        {step === "results" && mode === "proposal" && proposalResult && <ProposalResults result={proposalResult} onReset={handleReset} />}
      </div>
    </div>
  );
}
