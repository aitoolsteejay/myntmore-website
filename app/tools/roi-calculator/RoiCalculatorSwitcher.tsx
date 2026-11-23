"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import RoiCalculatorClient from "./RoiCalculatorClient";
import pageCopy from "@/content/page-copy/toolRoiCalculator.json";

// This page's text is edited in the admin ("B2B Outbound ROI Calculator") and lives in content/page-copy/toolRoiCalculator.json.
const copy = pageCopy;

// The cold email calculator brings recharts and the PDF export with it, so it is only
// fetched when the visitor switches to it.
const ColdEmailRoiCalculator = dynamic(
  () => import("@/components/cold-email-roi/calculator/ColdEmailRoiCalculator").then((m) => m.ColdEmailRoiCalculator),
  { ssr: false, loading: () => <div className="h-96" aria-hidden="true" /> }
);

type Tool = "linkedin" | "cold-email";

const OPTIONS: { id: Tool; label: string }[] = [
  { id: "linkedin", label: copy.RoiCalculatorSwitcher_s04.t01 },
  { id: "cold-email", label: copy.RoiCalculatorSwitcher_s04.t02 },
];

const BORDER = "#E8E2D9";
const INK = "#0a0a0a";

export default function RoiCalculatorSwitcher() {
  const [tool, setTool] = useState<Tool>("linkedin");

  // Read the choice from ?tool=cold-email after mount, so the server HTML (LinkedIn) always matches the first client render.
  useEffect(() => {
    try {
      if (new URLSearchParams(window.location.search).get("tool") === "cold-email") setTool("cold-email");
    } catch {
      // no URL access: stay on the default
    }
  }, []);

  const choose = (next: Tool) => {
    setTool(next);
    try {
      const url = new URL(window.location.href);
      if (next === "cold-email") url.searchParams.set("tool", "cold-email");
      else url.searchParams.delete("tool");
      window.history.replaceState(null, "", url.toString());
    } catch {
      // the toggle still works without the shareable URL
    }
  };

  return (
    <>
      <div className="px-4 pb-8 pt-6" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 sm:items-start">
          <p id="roi-toggle-label" className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#52525B" }}>{copy.RoiCalculatorSwitcher_s04.t03}</p>
          <div role="group" aria-labelledby="roi-toggle-label" className="inline-flex rounded-full border bg-white p-1" style={{ borderColor: BORDER }}>
            {OPTIONS.map((o) => {
              const active = tool === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(o.id)}
                  className="rounded-full px-5 py-3 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={active ? { backgroundColor: "#F5B731", color: INK } : { backgroundColor: "transparent", color: "#52525B" }}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {tool === "linkedin" ? (
        <RoiCalculatorClient />
      ) : (
        <div className="relative overflow-hidden bg-cream text-foreground">
          {/* Same glows as the LinkedIn view, so the two calculators read as one tool. */}
          <div aria-hidden="true" className="pointer-events-none absolute -left-36 -top-28 h-[600px] w-[600px] rounded-full blur-[55px]" style={{ background: "radial-gradient(circle, rgba(245,183,49,0.28) 0%, rgba(255,160,0,0.10) 40%, transparent 68%)" }} />
          <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-40 h-[550px] w-[550px] rounded-full blur-[55px]" style={{ background: "radial-gradient(circle, rgba(168,139,250,0.22) 0%, rgba(139,92,246,0.08) 40%, transparent 68%)" }} />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-[20%] h-[500px] w-[500px] rounded-full blur-[55px]" style={{ background: "radial-gradient(circle, rgba(234,88,12,0.14) 0%, rgba(234,88,12,0.05) 40%, transparent 68%)" }} />
          <div className="relative z-10">
          {/* The calculator draws its own visible "ROI Calculator" heading, so this one is for the outline and screen readers. */}
          <h1 className="sr-only">{copy.RoiCalculatorSwitcher_s04.t04}</h1>
          <section aria-label="Cold email ROI calculator">
            <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
              <ColdEmailRoiCalculator />
            </div>
          </section>
          </div>
        </div>
      )}
    </>
  );
}
