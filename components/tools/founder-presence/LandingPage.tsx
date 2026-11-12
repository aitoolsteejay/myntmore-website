"use client";

import { Button } from "@/components/ui/button";
import { EyeOff, Users2, PenLine, ArrowRight, MousePointer2, Zap, CheckCircle } from "lucide-react";
import JsonLd from "@/app/components/JsonLd";
import { buildHowToSchema } from "@/lib/schema";
import { RelatedTools } from "@/components/tools/shared/RelatedTools";
import { textTone } from "@/lib/colors";

const HOWTO_SCHEMA = buildHowToSchema("How the Founder Presence Analyzer Works", [
  { name: "Add your activity", text: "Your posting frequency and average engagement over the last 30 days." },
  { name: "Add up to 5 competitors", text: "Their posting frequency and engagement, for a real comparison." },
  { name: "Get your score and recommendations", text: "A presence score, opportunity areas, and headline suggestions." },
]);

const ACCENT = "#D97706";

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="w-full bg-white text-foreground">
      <JsonLd data={HOWTO_SCHEMA} />
      {/* Hero Section */}
      <section className="py-14 md:py-20 px-6 flex flex-col items-center text-center animate-fade-in relative overflow-hidden">
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.26) 0%, rgba(234,88,12,0.10) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.20) 0%, rgba(255,160,0,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{ background: "rgba(245,183,49,0.07)", borderColor: "rgba(245,183,49,0.35)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>Founder Presence Analyzer</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            LinkedIn Competitor{" "}
            <span className="relative inline-block">
              Analysis for Founders
              <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 420 10" preserveAspectRatio="none" aria-hidden>
                <path d="M2 7 Q105 2 210 6 Q315 10 418 5" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl">
            See how you really stack up. Benchmark your LinkedIn posting frequency and engagement against up to 5 competitors, then get AI-powered positioning and headline recommendations built around the gap.
          </p>
          <Button onClick={onStart} variant="hero" size="xl" className="rounded-full shadow-2xl">
            Analyze My Presence
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-16">You&apos;re Posting Without Knowing If It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Posting without knowing if it's actually working",
                description: "You show up on LinkedIn, but with no benchmark you can't tell if your frequency and engagement are competitive or quietly falling behind.",
                icon: EyeOff,
                color: "#A14A08",
              },
              {
                title: "No idea how you compare to your competitors",
                description: "You can see their posts, but not whether you're actually ahead or behind them in the metrics that matter.",
                icon: Users2,
                color: "#C2410C",
              },
              {
                title: "A headline that doesn't differentiate you",
                description: "A vague title with no positioning blends you into every other profile your ICP scrolls past.",
                icon: PenLine,
                color: "#9A3412",
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
          <h2 className="text-3xl sm:text-5xl font-black mb-8">Know Exactly Where You Stand</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Add your own posting activity, then up to 5 competitors you're benchmarking against. Get a presence score, opportunity areas, a positioning recommendation, and 3 headline styles to test.
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
                title: "Add your activity",
                description: "Your posting frequency and average engagement over the last 30 days.",
                icon: MousePointer2,
                color: "#A14A08",
              },
              {
                title: "Add up to 5 competitors",
                description: "Their posting frequency and engagement, for a real comparison.",
                icon: Zap,
                color: "#C2410C",
              },
              {
                title: "Get your score and recommendations",
                description: "A presence score, opportunity areas, and headline suggestions.",
                icon: CheckCircle,
                color: "#7A5200",
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
                title: "Real competitive benchmarking",
                benefit: "Compared against up to 5 competitors you actually pick",
                description: "Not an industry average, a direct comparison to the people you're actually competing with for attention.",
                color: ACCENT,
              },
              {
                title: "AI positioning recommendations",
                benefit: "A narrative angle based on your actual gap",
                description: "Specific to where you're underperforming, not generic LinkedIn advice.",
                color: "#C2410C",
              },
              {
                title: "3 headline styles to test",
                benefit: "Category leadership, ICP clarity, and bold differentiation",
                description: "Three distinct angles, so you can pick the one that fits your voice.",
                color: "#F97316",
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
        <h2 className="text-3xl sm:text-5xl font-black mb-10">Ready to see where you actually stand?</h2>
        <Button onClick={onStart} variant="hero" size="xl" className="rounded-full shadow-2xl">
          Analyze My Presence Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>

      <RelatedTools currentSlug="founder-presence-analyzer" />
    </div>
  );
}
