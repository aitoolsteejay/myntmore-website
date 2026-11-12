"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle, Frown, TrendingDown, ArrowRight, MousePointer2, Zap, CheckCircle } from "lucide-react";
import JsonLd from "@/app/components/JsonLd";
import { buildHowToSchema } from "@/lib/schema";
import { RelatedTools } from "@/components/tools/shared/RelatedTools";
import { textTone } from "@/lib/colors";

const HOWTO_SCHEMA = buildHowToSchema("How the Battle Card Generator Works", [
  { name: "Name the competitor", text: "And tell us what you sell, and to whom." },
  { name: "We research them live", text: "What they do, their pricing if public, and what reviewers actually say." },
  { name: "Get your battle card", text: "Strengths, gaps, positioning, and objection responses, ready for your next call." },
]);

const ACCENT = "#ef4444";

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="w-full bg-white text-foreground">
      <JsonLd data={HOWTO_SCHEMA} />
      {/* Hero Section */}
      <section className="py-14 md:py-20 px-6 flex flex-col items-center text-center animate-fade-in relative overflow-hidden">
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,0.24) 0%, rgba(220,38,38,0.09) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,139,250,0.18) 0%, rgba(161,74,8,0.07) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{ background: "rgba(239,68,68,0.07)", borderColor: "rgba(239,68,68,0.35)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>Free AI Sales Tool</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Competitor{" "}
            <span className="relative inline-block">
              Battle Card Generator
              <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 420 10" preserveAspectRatio="none" aria-hidden>
                <path d="M2 7 Q105 2 210 6 Q315 10 418 5" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl">
            Never lose a deal to a competitor you understand better. Paste a competitor&apos;s name, get what they do, their pricing if public, their real strengths and gaps, and exactly how to position against them for your specific offer.
          </p>
          <Button onClick={onStart} variant="hero" size="xl" className="rounded-full shadow-2xl">
            Build My Battle Card
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-16">You&apos;re Selling Against Them Blind</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "A prospect brings up a competitor mid-call",
                description: "And you're improvising an answer on the spot instead of having one ready.",
                icon: HelpCircle,
                color: "#ef4444",
              },
              {
                title: "No time to actually research every competitor",
                description: "You know who you're up against, but digging through their site, pricing page, and reviews for every deal isn't realistic.",
                icon: Frown,
                color: "#F97316",
              },
              {
                title: "Losing deals to comparisons you could have won",
                description: "Not because they're actually better, but because you weren't ready to explain why you're not.",
                icon: TrendingDown,
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
          <h2 className="text-3xl sm:text-5xl font-black mb-8">Research Done For You, Live</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Give us a competitor's name and your own offer. We research them in real time and build a battle card grounded in what's actually out there, not a guess, with honest strengths, real gaps, and objection responses specific to what you sell.
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
                title: "Name the competitor",
                description: "And tell us what you sell, and to whom.",
                icon: MousePointer2,
                color: "#ef4444",
              },
              {
                title: "We research them live",
                description: "What they do, their pricing if public, and what reviewers actually say.",
                icon: Zap,
                color: "#F97316",
              },
              {
                title: "Get your battle card",
                description: "Strengths, gaps, positioning, and objection responses, ready for your next call.",
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
                title: "Grounded in real research",
                benefit: "Not a guess from memory, live search on the actual competitor",
                description: "If we can't confirm something like pricing, we say so instead of inventing it.",
                color: ACCENT,
              },
              {
                title: "Built around your offer",
                benefit: "Positioning and objection answers specific to what you actually sell",
                description: "Not generic competitor advice, tailored to your company and your pitch.",
                color: "#F97316",
              },
              {
                title: "Ready before your next call",
                benefit: "Strengths, gaps, and answers in one place",
                description: "So the next time a competitor comes up, you have an answer ready instead of improvising.",
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
        <h2 className="text-3xl sm:text-5xl font-black mb-10">Ready to stop improvising when they bring up a competitor?</h2>
        <Button onClick={onStart} variant="hero" size="xl" className="rounded-full shadow-2xl">
          Build My Battle Card Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>

      <RelatedTools currentSlug="battle-card-generator" />
    </div>
  );
}
