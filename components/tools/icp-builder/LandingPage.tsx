"use client";

import { Button } from "@/components/ui/button";
import { Target, MessageSquare, Users, ArrowRight, MousePointer2, Zap, CheckCircle } from "lucide-react";
import JsonLd from "@/app/components/JsonLd";
import { buildHowToSchema } from "@/lib/schema";
import { RelatedTools } from "@/components/tools/shared/RelatedTools";
import { textTone } from "@/lib/colors";

const HOWTO_SCHEMA = buildHowToSchema("How the ICP Builder Works", [
  { name: "Describe your business", text: "Your core offer, who you sell to, and how you sell it." },
  { name: "Build up to 6 ICPs", text: "B2B or D2C, each with roles, triggers, pain points, and psychology." },
  { name: "Get a value prop for each", text: "Positioning, messaging, and channel partners, ready to use." },
]);

const ACCENT = "#F97316";

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="w-full bg-white text-foreground">
      <JsonLd data={HOWTO_SCHEMA} />
      {/* Hero Section */}
      <section className="py-14 md:py-20 px-6 flex flex-col items-center text-center animate-fade-in relative overflow-hidden">
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.26) 0%, rgba(234,88,12,0.10) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,139,250,0.18) 0%, rgba(161,74,8,0.07) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{ background: "rgba(249,115,22,0.07)", borderColor: "rgba(249,115,22,0.35)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>ICP Builder & Value Prop Generator</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Ideal Customer{" "}
            <span className="relative inline-block">
              Profile Generator
              <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 420 10" preserveAspectRatio="none" aria-hidden>
                <path d="M2 7 Q105 2 210 6 Q315 10 418 5" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl">
            Stop guessing who your customer is. Describe your business in plain English and get deep, structured customer profiles and a value proposition for each one, built specifically for your offer, not a generic template.
          </p>
          <Button onClick={onStart} variant="hero" size="xl" className="rounded-full shadow-2xl">
            Build My ICP Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-16">Your ICP Is Too Vague To Actually Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "ICPs that could describe any business in your industry",
                description: "\"Mid-market SaaS companies\" tells your sales team nothing about who to actually call. Vague targeting means wasted outreach.",
                icon: Target,
                color: "#F97316",
              },
              {
                title: "Value props that sound like everyone else's",
                description: "\"We help businesses grow\" is not a positioning statement. Without a sharp value prop, you blend into every other pitch in their inbox.",
                icon: MessageSquare,
                color: "#C2410C",
              },
              {
                title: "One profile for every very different buyer",
                description: "A founder and a VP Sales don't buy the same way, and a B2B buyer and a D2C consumer definitely don't. One generic persona misses both.",
                icon: Users,
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
          <h2 className="text-3xl sm:text-5xl font-black mb-8">Built Specifically For Your Offer</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Tell us what you sell, who you sell to, and how. Our tool builds up to 6 deep customer profiles, aware of whether each one is a B2B buyer or a D2C consumer, then writes a structured value proposition and channel partner list for every one of them.
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
                step: "01",
                title: "Describe your business",
                description: "Your core offer, who you sell to, and how you sell it.",
                icon: MousePointer2,
                color: "#F97316",
              },
              {
                step: "02",
                title: "Build up to 6 ICPs",
                description: "B2B or D2C, each with roles, triggers, pain points, and psychology.",
                icon: Zap,
                color: "#C2410C",
              },
              {
                step: "03",
                title: "Get a value prop for each",
                description: "Positioning, messaging, and channel partners, ready to use.",
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
                title: "B2B and D2C aware",
                benefit: "Each ICP is treated as a business buyer or an individual consumer, never the same way twice",
                description: "A founder buys differently from a consumer, so the profile, channels, and messaging adapt to which one you're targeting.",
                color: ACCENT,
              },
              {
                title: "Deep, not generic",
                benefit: "Pain points, buying triggers, objections, psychology, and where they hang out",
                description: "Not a one-line persona. Enough detail to actually write outreach, content, or sales scripts from.",
                color: "#C2410C",
              },
              {
                title: "Comes with a value prop",
                benefit: "A full positioning statement and content strategy for every ICP",
                description: "You don't just get a persona, you get the pitch that goes with it, plus your channel partners.",
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
        <h2 className="text-3xl sm:text-5xl font-black mb-10">Ready to know exactly who you&apos;re selling to?</h2>
        <Button onClick={onStart} variant="hero" size="xl" className="rounded-full shadow-2xl">
          Build My ICP Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>

      <RelatedTools currentSlug="icp-builder" />
    </div>
  );
}
