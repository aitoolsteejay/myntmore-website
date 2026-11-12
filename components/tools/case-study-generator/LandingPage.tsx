"use client";

import { Button } from "@/components/ui/button";
import { FileText, Clock, AlertCircle, ArrowRight, MousePointer2, Zap, CheckCircle } from "lucide-react";
import JsonLd from "@/app/components/JsonLd";
import { buildHowToSchema } from "@/lib/schema";
import { RelatedTools } from "@/components/tools/shared/RelatedTools";
import { textTone } from "@/lib/colors";

const HOWTO_SCHEMA = buildHowToSchema("How the Case Study Generator Works", [
  { name: "Pick case study or proposal", text: "Turning a finished project into proof, or drafting a pitch for a new prospect." },
  { name: "Paste in your rough notes", text: "The problem, what you did, and the result. Real numbers only, we won't invent any." },
  { name: "Get a ready-to-send draft", text: "Structured, formatted, and yours to edit before it goes out." },
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
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.18) 0%, rgba(234,88,12,0.07) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{ background: "rgba(234,88,12,0.07)", borderColor: "rgba(234,88,12,0.35)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>Free AI Writing Tool</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            AI Case Study{" "}
            <span className="relative inline-block">
              & Proposal Generator
              <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 420 10" preserveAspectRatio="none" aria-hidden>
                <path d="M2 7 Q105 2 210 6 Q315 10 418 5" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl">
            Never face the blank page again. Turn a finished project into a B2B case study, or a prospect conversation into a proposal draft. No invented numbers, no generic filler, ready in minutes.
          </p>
          <Button onClick={onStart} variant="hero" size="xl" className="rounded-full shadow-2xl">
            Start Drafting
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-16">The Blank Page Is Costing You Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "A blank doc every time a deal needs a proposal",
                description: "You know the project, you know the pitch, but staring at an empty document still eats an hour you don't have.",
                icon: FileText,
                color: "#C2410C",
              },
              {
                title: "Case studies that never get written",
                description: "You finish a great project, get a great result, and then never turn it into proof because there's always something more urgent.",
                icon: Clock,
                color: "#A14A08",
              },
              {
                title: "Proposals that sound generic because you're rushing",
                description: "When you're racing a deadline, proposals default to the same template, and prospects can tell it wasn't written for them.",
                icon: AlertCircle,
                color: "#F97316",
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
          <h2 className="text-3xl sm:text-5xl font-black mb-8">Structured In Minutes, Not Hours</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Paste in your rough notes, the problem, what you did, and the result. We structure it into a proper case study or proposal draft, using only the numbers and quotes you actually gave us, nothing invented.
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
                title: "Pick case study or proposal",
                description: "Turning a finished project into proof, or drafting a pitch for a new prospect.",
                icon: MousePointer2,
                color: "#C2410C",
              },
              {
                title: "Paste in your rough notes",
                description: "The problem, what you did, and the result. Real numbers only, we won't invent any.",
                icon: Zap,
                color: "#A14A08",
              },
              {
                title: "Get a ready-to-send draft",
                description: "Structured, formatted, and yours to edit before it goes out.",
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
                title: "No invented numbers",
                benefit: "Stats and quotes only appear if you actually gave us one",
                description: "If you didn't mention a result or a testimonial, we leave it out instead of making one up.",
                color: ACCENT,
              },
              {
                title: "Mirrors their language",
                benefit: "Proposal mode reflects the prospect's own words back to them",
                description: "Not generic filler, the challenge section is written the way they described it to you.",
                color: "#A14A08",
              },
              {
                title: "Two drafts, one tool",
                benefit: "Case studies for proof, proposals for the next deal",
                description: "Whichever stage you're at with a client, this tool has the draft for it.",
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
        <h2 className="text-3xl sm:text-5xl font-black mb-10">Ready to stop rewriting the same proposal from scratch?</h2>
        <Button onClick={onStart} variant="hero" size="xl" className="rounded-full shadow-2xl">
          Start Drafting Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>

      <RelatedTools currentSlug="case-study-generator" />
    </div>
  );
}
