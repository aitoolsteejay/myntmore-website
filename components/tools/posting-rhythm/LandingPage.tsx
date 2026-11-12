"use client";

import { Button } from "@/components/ui/button";
import { CalendarX2, FileQuestion, TrendingDown, ArrowRight, MousePointer2, Zap, CheckCircle } from "lucide-react";
import JsonLd from "@/app/components/JsonLd";
import { buildHowToSchema } from "@/lib/schema";
import { RelatedTools } from "@/components/tools/shared/RelatedTools";
import { textTone } from "@/lib/colors";

const HOWTO_SCHEMA = buildHowToSchema("How the Posting Rhythm Builder Works", [
  { name: "Tell us your lifestyle and tone", text: "How often you can realistically post, and how you want to sound." },
  { name: "Get your best days and times", text: "A schedule built around your actual availability, not a generic calendar." },
  { name: "Get a routine and post ideas", text: "A weekly system plus hooks and CTAs, ready to use." },
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
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.30) 0%, rgba(255,160,0,0.12) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.20) 0%, rgba(234,88,12,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{ background: "rgba(245,183,49,0.07)", borderColor: "rgba(245,183,49,0.35)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>Posting Rhythm Builder</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            LinkedIn Posting{" "}
            <span className="relative inline-block">
              Schedule Planner
              <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 420 10" preserveAspectRatio="none" aria-hidden>
                <path d="M2 7 Q105 2 210 6 Q315 10 418 5" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl">
            Never wonder what to post again. Tell us your lifestyle, tone, and content strengths, and get the best days and times to post, a weekly routine, and ready-to-use post ideas, all built around how you actually work.
          </p>
          <Button onClick={onStart} variant="hero" size="xl" className="rounded-full shadow-2xl">
            Build My Rhythm
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-16">Your LinkedIn Presence Has No System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Posting sporadically because there's no plan",
                description: "A burst of activity, then two weeks of silence. Without a system, consistency depends on motivation, and motivation runs out.",
                icon: CalendarX2,
                color: "#A14A08",
              },
              {
                title: "Staring at a blank post box with no idea what to write",
                description: "You know you should post, but every time you open LinkedIn the same blank box shows up with nothing in your head.",
                icon: FileQuestion,
                color: "#C2410C",
              },
              {
                title: "Inconsistent presence killing your algorithm reach",
                description: "LinkedIn rewards consistency. Sporadic posting means your content starts from zero reach every single time.",
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
          <h2 className="text-3xl sm:text-5xl font-black mb-8">A Posting System That Fits Your Life</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Tell us how often you can realistically post, your tone, and your content strengths. We build your best posting days and times, a weekly routine, and a set of post ideas, hooks, and CTAs you can start using today.
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
                title: "Tell us your lifestyle and tone",
                description: "How often you can realistically post, and how you want to sound.",
                icon: MousePointer2,
                color: "#A14A08",
              },
              {
                title: "Get your best days and times",
                description: "A schedule built around your actual availability, not a generic calendar.",
                icon: Zap,
                color: "#C2410C",
              },
              {
                title: "Get a routine and post ideas",
                description: "A weekly system plus hooks and CTAs, ready to use.",
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
                title: "Built around your lifestyle",
                benefit: "Not a generic content calendar you'll abandon in a week",
                description: "The schedule matches how often you can actually post, so it's realistic enough to stick to.",
                color: ACCENT,
              },
              {
                title: "Hooks and CTAs included",
                benefit: "Not just topics, actual opening lines and calls to action",
                description: "You get the raw material to write from, not just a list of things to think about.",
                color: "#C2410C",
              },
              {
                title: "Psychology-backed cadence",
                benefit: "Timing and frequency based on how your audience actually engages",
                description: "The rhythm is designed around attention patterns, not arbitrary daily quotas.",
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
        <h2 className="text-3xl sm:text-5xl font-black mb-10">Ready to stop guessing what to post?</h2>
        <Button onClick={onStart} variant="hero" size="xl" className="rounded-full shadow-2xl">
          Build My Rhythm Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>

      <RelatedTools currentSlug="posting-rhythm-builder" />
    </div>
  );
}
