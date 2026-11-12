"use client";

import { Button } from "@/components/ui/button";
import { Copy, Clock, Frown, ArrowRight, MousePointer2, Zap, CheckCircle } from "lucide-react";
import JsonLd from "@/app/components/JsonLd";
import { buildHowToSchema } from "@/lib/schema";
import { RelatedTools } from "@/components/tools/shared/RelatedTools";
import { textTone } from "@/lib/colors";

const HOWTO_SCHEMA = buildHowToSchema("How the Lead Magnet Ideas Tool Works", [
  { name: "Describe your business and ICP", text: "What you do, who you sell to, and your industry." },
  { name: "Pick your tone", text: "So the pitch for each idea sounds like you, not a template." },
  { name: "Get 3 ready-to-build ideas", text: "Each with the pitch, why it works, and how to distribute it." },
]);

const ACCENT = "#EA580C";

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="w-full bg-white text-foreground">
      <JsonLd data={HOWTO_SCHEMA} />
      {/* Hero Section */}
      <section className="py-14 md:py-20 px-6 flex flex-col items-center text-center animate-fade-in relative overflow-hidden">
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,139,250,0.26) 0%, rgba(161,74,8,0.10) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.20) 0%, rgba(255,160,0,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{ background: "rgba(234,88,12,0.07)", borderColor: "rgba(234,88,12,0.35)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>Free AI Tool</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Lead Magnet{" "}
            <span className="relative inline-block">
              Idea Generator
              <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 420 10" preserveAspectRatio="none" aria-hidden>
                <path d="M2 7 Q105 2 210 6 Q315 10 418 5" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl">
            Get lead magnets your ICP actually wants. Describe your business and your ICP, and get 3 concrete lead magnet ideas you can actually build and use in outreach this week, not another generic ebook nobody downloads.
          </p>
          <Button onClick={onStart} variant="hero" size="xl" className="rounded-full shadow-2xl">
            Generate My Ideas
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-16">Your Lead Magnet Ideas Aren&apos;t Landing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Generic ideas that don't fit your business",
                description: "\"Write an ebook\" or \"do a checklist\" is advice that could apply to literally any company. It doesn't tell you what to actually make.",
                icon: Copy,
                color: "#C2410C",
              },
              {
                title: "No time to brainstorm what would convert",
                description: "You know you need a lead magnet, but sitting down to invent one from scratch keeps getting pushed to next week.",
                icon: Clock,
                color: "#F97316",
              },
              {
                title: "Lead magnets nobody actually downloads",
                description: "When the idea isn't specific enough to your ICP's real problem, it doesn't feel worth trading an email for.",
                icon: Frown,
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
          <h2 className="text-3xl sm:text-5xl font-black mb-8">Ideas Built For Your Business, Not A Template</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Tell us what your business does, who you sell to, and your industry. Get 3 lead magnet ideas specific to your ICP, each with the pitch, why it works, and exactly how to distribute it.
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
                title: "Describe your business and ICP",
                description: "What you do, who you sell to, and your industry.",
                icon: MousePointer2,
                color: "#C2410C",
              },
              {
                title: "Pick your tone",
                description: "So the pitch for each idea sounds like you, not a template.",
                icon: Zap,
                color: "#F97316",
              },
              {
                title: "Get 3 ready-to-build ideas",
                description: "Each with the pitch, why it works, and how to distribute it.",
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
                title: "Specific to your ICP",
                benefit: "Not a generic list you could copy for any business",
                description: "Every idea is grounded in the industry and audience you actually described.",
                color: ACCENT,
              },
              {
                title: "Explains why it works",
                benefit: "Not just the idea, the psychology behind it",
                description: "You get the reasoning too, so you can adapt it or pitch it internally with confidence.",
                color: "#F97316",
              },
              {
                title: "Includes distribution",
                benefit: "How to actually get it in front of your ICP",
                description: "An idea with no distribution plan is just a document sitting on your desktop.",
                color: "#A14A08",
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
        <h2 className="text-3xl sm:text-5xl font-black mb-10">Ready to build a lead magnet people actually want?</h2>
        <Button onClick={onStart} variant="hero" size="xl" className="rounded-full shadow-2xl">
          Generate My Ideas Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>

      <RelatedTools currentSlug="lead-magnet-ideas" />
    </div>
  );
}
