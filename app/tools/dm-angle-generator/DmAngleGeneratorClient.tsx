"use client";

import { useRef, useState } from "react";
import { LandingPage } from "@/components/tools/dm-angles/LandingPage";
import { InputPanel } from "@/components/tools/dm-angles/InputPanel";
import { OutputSection } from "@/components/tools/dm-angles/OutputSection";
import type { DMAngle } from "@/components/tools/dm-angles/DMCard";
import LeadGate, { LeadData } from "@/components/tools/shared/LeadGate";
import { toast } from "sonner";
import { saveLeadResult } from "@/lib/save-lead-result";
import pageCopy from "@/content/page-copy/toolDmAngleGenerator.json";

// This page's text is edited in the admin ("Cold DM Angle Generator") and lives in content/page-copy/toolDmAngleGenerator.json.
const copy = pageCopy;

export default function DmAngleGeneratorClient() {
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [angles, setAngles] = useState<DMAngle[]>([]);
  const [lastInputs, setLastInputs] = useState<{ industry: string; icpRole: string; offer: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [isRegeneratingAll, setIsRegeneratingAll] = useState(false);
  const toolSectionRef = useRef<HTMLDivElement>(null);

  const saveOutputs = (inputs: { industry: string; icpRole: string; offer: string }, outputAngles: DMAngle[]) => {
    if (!leadData?.id) return;
    saveLeadResult(leadData.id, inputs, { angles: outputAngles });
  };

  const scrollToTool = () => {
    toolSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLeadComplete = (data: LeadData) => {
    setLeadData(data);
  };

  const generateAngles = async (data: { industry: string; icpRole: string; offer: string }) => {
    if (!leadData) return;

    setIsLoading(true);
    setAngles([]);

    try {
      const response = await fetch("/api/tools/dm-angles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          senderName: leadData.name,
          senderCompany: leadData.companyName,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to generate DM angles");

      setAngles(result.angles);
      setLastInputs(data);
      saveOutputs(data, result.angles);
      toast.success("5 psychology-aligned messages ready for you");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error instanceof Error ? error.message : "Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateOne = async (angle: DMAngle, style?: string): Promise<DMAngle> => {
    const response = await fetch("/api/tools/dm-angles/regenerate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ angle, style: style || "variation" }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Failed to regenerate");
    return { ...result.angle, id: angle.id };
  };

  const handleRegenerate = async (id: string, style?: string) => {
    const angle = angles.find((a) => a.id === id);
    if (!angle) return;

    setRegeneratingId(id);
    try {
      const updated = await regenerateOne(angle, style);
      const nextAngles = angles.map((a) => (a.id === id ? updated : a));
      setAngles(nextAngles);
      if (lastInputs) saveOutputs(lastInputs, nextAngles);
      toast.success(style ? `Made it ${style}` : "New variation created");
    } catch {
      toast.error("Please try again");
    } finally {
      setRegeneratingId(null);
    }
  };

  const handleRegenerateAll = async (style: string) => {
    setIsRegeneratingAll(true);
    try {
      // allSettled, not all: with 5 concurrent regenerate calls, one
      // transient failure shouldn't discard the 4 that succeeded and force
      // the user to burn another full batch of API calls re-requesting
      // angles that already came back fine.
      const results = await Promise.allSettled(angles.map((angle) => regenerateOne(angle, style)));
      const updated = results.map((r, i) => (r.status === "fulfilled" ? r.value : angles[i]));
      const failedCount = results.filter((r) => r.status === "rejected").length;

      setAngles(updated);
      if (lastInputs) saveOutputs(lastInputs, updated);

      if (failedCount === 0) {
        toast.success(`All angles made ${style}`);
      } else if (failedCount < results.length) {
        toast.warning(`${results.length - failedCount} of ${results.length} angles made ${style}. ${failedCount} failed, try regenerating those individually.`);
      } else {
        toast.error("Please try again");
      }
    } finally {
      setIsRegeneratingAll(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!leadData && (
        <div className="flex flex-col">
          <LandingPage onGetStarted={scrollToTool} />
          <div ref={toolSectionRef} className="min-h-screen flex items-center justify-center py-20 bg-white">
            <div className="w-full">
              <LeadGate
                source="dm_angle_generator"
                heading="Tell Us About You"
                description="Enter your details to unlock your custom DM angles."
                onComplete={handleLeadComplete}
              />
            </div>
          </div>
        </div>
      )}

      {leadData && (
        <div className="min-h-screen py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-black text-center mb-10">{copy.DmAngleGeneratorClient_s02.t01}</h1>
            <InputPanel onGenerate={generateAngles} isLoading={isLoading} />
          </div>

          {angles.length > 0 && (
            <div className="max-w-6xl mx-auto mt-16">
              <OutputSection
                angles={angles}
                onRegenerate={handleRegenerate}
                onRegenerateAll={handleRegenerateAll}
                regeneratingId={regeneratingId}
                isRegeneratingAll={isRegeneratingAll}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
