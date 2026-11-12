"use client";

import { useState } from "react";
import { toast } from "sonner";
import LeadGate, { LeadData } from "@/components/tools/shared/LeadGate";
import { LandingPage } from "@/components/tools/battle-card-generator/LandingPage";
import { BattleCardForm } from "@/components/tools/battle-card-generator/BattleCardForm";
import { BattleCardResults } from "@/components/tools/battle-card-generator/BattleCardResults";
import type { BattleCardInput, BattleCardOutput } from "@/components/tools/battle-card-generator/types";
import { textTone } from "@/lib/colors";

const ACCENT = "#ef4444";

type Step = "landing" | "lead" | "form" | "results";

export default function BattleCardGeneratorClient() {
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [step, setStep] = useState<Step>("landing");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BattleCardOutput | null>(null);

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
    setStep("form");
  };

  const handleGenerate = async (data: BattleCardInput) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/tools/battle-card-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const generated = await res.json();
      if (!res.ok) throw new Error(generated.error || "Failed to generate battle card");
      setResult(generated);
      saveOutputs(data, generated);
      setStep("results");
    } catch (error) {
      console.error("Battle card generation failed:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setStep("form");
  };

  if (step === "landing") {
    return <LandingPage onStart={() => setStep("lead")} />;
  }

  return (
    <div className="min-h-screen pb-20 pt-12 text-foreground relative overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "-100px", left: "-140px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,0.20) 0%, rgba(220,38,38,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "180px", right: "-120px", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,139,250,0.16) 0%, rgba(161,74,8,0.07) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {step === "lead" && (
          <>
            <header className="pb-12 text-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
                style={{ background: "rgba(239,68,68,0.07)", borderColor: "rgba(239,68,68,0.35)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>Free AI Sales Tool</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
                <span className="relative inline-block">
                  Competitor Battle Card Generator
                  <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 460 10" preserveAspectRatio="none" aria-hidden>
                    <path d="M2 7 Q115 2 230 6 Q345 10 458 5" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-gray-700 text-sm md:text-base max-w-xl mx-auto font-medium">
                Never lose a deal to a competitor. Paste a competitor&apos;s name and get what they do, their pricing if public, their real strengths and gaps, and how to position against them.
              </p>
            </header>
            <LeadGate
              source="battle_card_generator"
              heading="Tell Us About You"
              description="Enter your details to start researching."
              onComplete={handleLeadComplete}
            />
          </>
        )}

        {step === "form" && <BattleCardForm onGenerate={handleGenerate} isLoading={isLoading} />}

        {step === "results" && result && <BattleCardResults result={result} onReset={handleReset} />}
      </div>
    </div>
  );
}
