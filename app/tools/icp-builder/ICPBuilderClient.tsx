"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import LeadGate, { LeadData } from "@/components/tools/shared/LeadGate";
import { LandingPage } from "@/components/tools/icp-builder/LandingPage";
import { IntakeScreen } from "@/components/tools/icp-builder/IntakeScreen";
import { DEFAULT_ICP_COUNT } from "@/components/tools/icp-builder/constants";
import type { IntakeData, IcpInput, GeneratedIcp, ValuePropResult, Screen } from "@/components/tools/icp-builder/types";

// ScreenTransition wraps framer-motion, which only ever renders once the
// wizard itself is showing (after the landing page and lead-gate): loading
// it dynamically keeps it out of this route's initial bundle.
const ScreenTransition = dynamic(
  () => import("@/components/tools/icp-builder/ScreenTransition").then((m) => m.ScreenTransition),
  { ssr: false }
);

// IcpBuilderScreen and ValuePropScreen (and their framer-motion-using
// children) are only needed once the user actually reaches those wizard
// steps, so they're fetched on demand instead of bundled up front.
const IcpBuilderScreen = dynamic(
  () => import("@/components/tools/icp-builder/IcpBuilderScreen").then((m) => m.IcpBuilderScreen),
  { ssr: false }
);
const ValuePropScreen = dynamic(
  () => import("@/components/tools/icp-builder/ValuePropScreen").then((m) => m.ValuePropScreen),
  { ssr: false }
);

function newIcp(icpType: "B2B" | "D2C" | null): IcpInput {
  return {
    id: Math.random().toString(36).slice(2),
    icpType,
    roles: [],
    sizes: [],
    industries: [],
    geography: [],
    geographyCities: "",
    d2cDescription: "",
    d2cOptions: [],
    d2cOptionsKey: "",
    d2cSelectedIdx: null,
  };
}

const STEP_LABELS: { key: Screen; label: string }[] = [
  { key: "intake", label: "Intake" },
  { key: "icp", label: "ICP Builder" },
  { key: "valueprop", label: "Value Proposition" },
];

export default function ICPBuilderClient() {
  const [started, setStarted] = useState(false);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [screen, setScreen] = useState<Screen>("intake");
  const [intake, setIntake] = useState<IntakeData>({
    offer: "",
    offerOptions: [],
    offerOptionsKey: "",
    selectedOfferIdx: null,
    sellingTo: null,
    businessType: null,
  });
  const [icps, setIcps] = useState<IcpInput[]>([]);
  const [icpResults, setIcpResults] = useState<GeneratedIcp[] | null>(null);
  const [valuePropResults, setValuePropResults] = useState<ValuePropResult[] | null>(null);

  const handleIntakeContinue = () => {
    const forcedType: "B2B" | "D2C" | null = intake.sellingTo === "D2C" ? "D2C" : intake.sellingTo === "B2B" ? "B2B" : null;
    setIcps(Array.from({ length: DEFAULT_ICP_COUNT }, () => newIcp(forcedType)));
    setScreen("icp");
  };

  // Fires after either generation stage completes, so a lead who drops off
  // after ICPs (before Value Prop) is still captured with useful data.
  const saveProgress = (nextIcpResults: GeneratedIcp[] | null, nextValuePropResults: ValuePropResult[] | null) => {
    if (!leadData?.id) return;
    // The Supabase client (~200 kB) is loaded on first use, not with the page.
    void import("@/lib/supabase")
      .then(({ supabase }) => {
        supabase
          .from("leads")
          .update({
            inputs: { intake, icps },
            outputs: { icpResults: nextIcpResults, valuePropResults: nextValuePropResults },
          })
          .eq("id", leadData.id)
          .then(({ error }) => {
            if (error) console.error("Supabase inputs/outputs update failed:", error);
          });
      })
      .catch((error) => console.error("Supabase inputs/outputs update failed:", error));
  };

  const handleIcpResultsChange = (results: GeneratedIcp[] | null) => {
    setIcpResults(results);
    if (results) saveProgress(results, valuePropResults);
  };

  const handleValuePropResultsChange = (results: ValuePropResult[] | null) => {
    setValuePropResults(results);
    if (results) saveProgress(icpResults, results);
  };

  const currentStepIndex = STEP_LABELS.findIndex((s) => s.key === screen);

  if (!started) {
    return <LandingPage onStart={() => setStarted(true)} />;
  }

  if (!leadData) {
    return (
      <div className="min-h-screen pb-20 pt-12 text-foreground relative overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", left: "-140px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.26) 0%, rgba(234,88,12,0.10) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "180px", right: "-120px", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,139,250,0.18) 0%, rgba(161,74,8,0.07) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <header className="pb-12 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
              style={{ background: "rgba(249,115,22,0.07)", borderColor: "rgba(249,115,22,0.35)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#F97316" }} aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#9A3412" }}>ICP Builder</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              <span className="relative inline-block">
                Ideal Customer Profile Generator
                <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 460 10" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 7 Q115 2 230 6 Q345 10 458 5" stroke="#F97316" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="text-gray-700 text-sm md:text-base max-w-xl mx-auto font-medium">
              Build your ICP and value prop in one go: describe your business, get deep customer profiles, and a value proposition for each one.
            </p>
          </header>

          <LeadGate
            source="icp_builder"
            heading="Tell Us About You"
            description="Enter your details to start building your ICP."
            onComplete={setLeadData}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 pt-12 text-foreground relative overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
      {/* Vivid background blobs, matching the homepage hero's color treatment */}
      <div aria-hidden="true" style={{ position: "absolute", top: "-100px", left: "-140px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.26) 0%, rgba(234,88,12,0.10) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "180px", right: "-120px", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,139,250,0.18) 0%, rgba(161,74,8,0.07) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <header className="pb-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{ background: "rgba(249,115,22,0.07)", borderColor: "rgba(249,115,22,0.35)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#F97316" }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#9A3412" }}>ICP Builder</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
            <span className="relative inline-block">
              Ideal Customer Profile Generator
              <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 460 10" preserveAspectRatio="none" aria-hidden>
                <path d="M2 7 Q115 2 230 6 Q345 10 458 5" stroke="#F97316" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-gray-700 text-sm md:text-base mb-8 max-w-xl mx-auto font-medium">
            Build your ICP and value prop in one go: describe your business, get deep customer profiles, and a value proposition for each one.
          </p>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2">
            {STEP_LABELS.map((step, i) => (
              <div key={step.key} className="flex items-center gap-2">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-colors"
                  style={
                    i <= currentStepIndex
                      ? { backgroundColor: "#F97316", color: "#0A0A0A" }
                      : { backgroundColor: "#ffffff", color: "#71675E", border: "1px solid #E8E2D9" }
                  }
                >
                  {i + 1}
                </span>
                <span className="text-xs font-semibold hidden sm:inline" style={{ color: i <= currentStepIndex ? "#0a0a0a" : "#71675E" }}>
                  {step.label}
                </span>
                {i < STEP_LABELS.length - 1 && <span className="w-6 h-px" style={{ backgroundColor: "#E8E2D9" }} />}
              </div>
            ))}
          </div>
        </header>

        <div>
          <ScreenTransition screenKey={screen}>
            {screen === "intake" && (
              <IntakeScreen data={intake} onChange={setIntake} onContinue={handleIntakeContinue} />
            )}

            {screen === "icp" && (
              <IcpBuilderScreen
                intake={intake}
                icps={icps}
                onIcpsChange={setIcps}
                results={icpResults}
                onResultsChange={handleIcpResultsChange}
                onNextStep={() => setScreen("valueprop")}
              />
            )}

            {screen === "valueprop" && icpResults && (
              <ValuePropScreen
                intake={intake}
                icps={icpResults}
                results={valuePropResults}
                onResultsChange={handleValuePropResultsChange}
                onFinish={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              />
            )}
          </ScreenTransition>
        </div>
      </div>
    </div>
  );
}
