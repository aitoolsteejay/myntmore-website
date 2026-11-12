"use client";

import { Button } from "@/components/ui/button";
import { Calculator, HelpCircle, TrendingUp, ArrowRight, MousePointer2, Zap, CheckCircle } from "lucide-react";
import JsonLd from "@/app/components/JsonLd";
import { buildHowToSchema } from "@/lib/schema";
import { RelatedTools } from "@/components/tools/shared/RelatedTools";
import { textTone } from "@/lib/colors";

const HOWTO_SCHEMA = buildHowToSchema("How the ROI Calculator Works", [
  { name: "Enter your funnel numbers", text: "Connection volume, acceptance rate, reply rate, deal size, and cost." },
  { name: "Watch it calculate live", text: "Every stage of the funnel updates instantly as you adjust the numbers." },
  { name: "Export it to share", text: "A clean PDF you can bring to a budget conversation or a client call." },
]);

const ACCENT = "#EA580C";

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="w-full bg-cream text-foreground">
      <JsonLd data={HOWTO_SCHEMA} />
      {/* Hero Section */}
      <section className="py-14 md:py-20 px-6 flex flex-col items-center text-center animate-fade-in relative overflow-hidden">
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.26) 0%, rgba(234,88,12,0.10) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,139,250,0.22) 0%, rgba(139,92,246,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{ background: "rgba(234,88,12,0.07)", borderColor: "rgba(234,88,12,0.35)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>ROI Calculator</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            LinkedIn Outreach{" "}
            <span className="relative inline-block">
              ROI Calculator
              <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 420 10" preserveAspectRatio="none" aria-hidden>
                <path d="M2 7 Q105 2 210 6 Q315 10 418 5" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl">
            See what your LinkedIn outreach is worth. Plug in your real funnel numbers and watch your pipeline, revenue, and ROI calculate live. See the full picture before you approve another dollar of outreach spend.
          </p>
          <Button onClick={onStart} variant="hero" size="xl" className="rounded-full shadow-2xl">
            Calculate My ROI
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-16">You&apos;re Spending On Outreach Without The Math</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "No idea what a single meeting is actually worth",
                description: "Without knowing your funnel math, every outreach decision is a guess dressed up as strategy.",
                icon: HelpCircle,
                color: "#EA580C",
              },
              {
                title: "Budgets approved on gut feeling, not numbers",
                description: "\"It feels like it's working\" doesn't hold up in a budget review. You need the actual projected return.",
                icon: Calculator,
                color: "#EA580C",
              },
              {
                title: "Can't set expectations before you spend",
                description: "Leadership wants a number before they approve spend, and \"we'll see\" isn't an answer they'll accept.",
                icon: TrendingUp,
                color: "#A14A08",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                style={{ border: "1px solid #E8E2D9", borderTop: `3px solid ${item.color}` }}
              >
                <div className="mb-4 inline-flex p-3 rounded-xl" style={{ backgroundColor: `${item.color}15` }}>
                  <item.icon className="h-8 w-8" style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-black mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-8">See The Full Funnel, Not Just A Guess</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Enter your connection volume, acceptance rate, reply rate, and closing rate. Watch every stage of your funnel calculate live, from connection requests all the way through to revenue and ROI, then export it as a PDF to share.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Enter your funnel numbers",
                description: "Connection volume, acceptance rate, reply rate, deal size, and cost.",
                icon: MousePointer2,
                color: "#EA580C",
              },
              {
                title: "Watch it calculate live",
                description: "Every stage of the funnel updates instantly as you adjust the numbers.",
                icon: Zap,
                color: "#EA580C",
              },
              {
                title: "Export it to share",
                description: "A clean PDF you can bring to a budget conversation or a client call.",
                icon: CheckCircle,
                color: "#B8860B",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: item.color, color: ["#A14A08", "#A14A08"].includes(item.color) ? "#fff" : "#0A0A0A" }}
                >
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-center mb-16">Why This Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Live calculation",
                benefit: "No submit button, the results update as you type",
                description: "Test different scenarios instantly instead of waiting on a report.",
                color: ACCENT,
              },
              {
                title: "The full funnel, not one number",
                benefit: "From connection requests all the way to revenue and ROI",
                description: "See exactly where deals are being won or lost, not just the final close rate.",
                color: "#EA580C",
              },
              {
                title: "Built to share",
                benefit: "Export a clean PDF for stakeholders or clients",
                description: "Bring real numbers into your next budget or pitch conversation.",
                color: "#D97706",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col p-8 rounded-2xl bg-secondary/20" style={{ borderLeft: `4px solid ${item.color}` }}>
                <h3 className="text-xl font-black mb-3">{item.title}</h3>
                <p className="text-foreground font-medium mb-2">{item.benefit}</p>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second CTA Section */}
      <section className="py-24 px-6 text-center bg-white" style={{ borderTop: "1px solid #E8E2D9" }}>
        <h2 className="text-3xl sm:text-5xl font-black mb-10">Ready to see the real math behind your outreach?</h2>
        <Button onClick={onStart} variant="hero" size="xl" className="rounded-full shadow-2xl">
          Calculate My ROI Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>

      <RelatedTools currentSlug="roi-calculator" />
    </div>
  );
}
