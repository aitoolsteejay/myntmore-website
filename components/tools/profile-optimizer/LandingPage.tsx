"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  X,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Target,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Copy,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import JsonLd from "@/app/components/JsonLd";
import { buildHowToSchema } from "@/lib/schema";
import { RelatedTools } from "@/components/tools/shared/RelatedTools";
import { GOLD_TEXT } from "@/lib/colors";

const HOWTO_SCHEMA = buildHowToSchema("How the LinkedIn Profile Optimizer Works", [
  { name: "Paste your headline and About section", text: "Quick and easy input of your current profile details." },
  { name: "Get your free clarity audit in seconds", text: "Our AI engine processes your positioning against high-performing benchmarks." },
  { name: "Implement changes and watch your pipeline grow", text: "Apply the specific suggestions and start seeing better engagement." },
]);

// Real scoring criteria mirrored directly from calculateClarityScore in ProfileOptimizerClient
const SCORE_CHECKS = [
  {
    id: "icp",
    label: "References target ICP",
    detail: "Explicitly names who you help (role, industry, or company stage) rather than an ambiguous audience.",
    icon: Target,
  },
  {
    id: "problem",
    label: "States a concrete problem verb",
    detail: "Uses decisive problem verbs like help, solve, fix, reduce, or streamline to clarify real business pain.",
    icon: Zap,
  },
  {
    id: "metric",
    label: "Backs positioning with metrics",
    detail: "Includes verifiable numbers, revenue figures, scale markers, or percentages to establish concrete proof.",
    icon: BarChart3,
  },
  {
    id: "fluff",
    label: "Eliminates empty buzzwords",
    detail: "Purges filler words like passionate, excited, journey, or mission-driven that dilute executive authority.",
    icon: ShieldCheck,
  },
  {
    id: "authority",
    label: "Proves verified authority",
    detail: "Demonstrates verifiable track records, executive seniority, client volume, or domain achievements.",
    icon: Sparkles,
  },
];

type DemoTabKey = "before" | "authority" | "problem" | "social";

const DEMO_TABS: DemoTabKey[] = ["before", "authority", "problem", "social"];

interface DemoScenario {
  key: DemoTabKey;
  tabLabel: string;
  badge: string;
  subTitle: string;
  headline: string;
  charCount: number;
  score: number;
  verdict: string;
  verdictTone: "warning" | "success";
  verdictDesc: string;
  checks: Array<{ id: string; label: string; note: string; passed: boolean }>;
}

const DEMO_SCENARIOS: Record<DemoTabKey, DemoScenario> = {
  before: {
    key: "before",
    tabLabel: "Current (Generic)",
    badge: "Generic Positioning",
    subTitle: "Unoptimized Profile",
    headline: "Marketing Leader | Passionate about growth | Helping brands scale to the next level",
    charCount: 81,
    score: 42,
    verdict: "Needs immediate work",
    verdictTone: "warning",
    verdictDesc: "No defined ICP, unproven metrics, and generic buzzwords cause prospects to scroll past.",
    checks: [
      { id: "icp", label: "References target ICP", note: "Missing target role or industry", passed: false },
      { id: "problem", label: "States a concrete problem verb", note: "Vague phrasing without a specific pain point", passed: false },
      { id: "metric", label: "Backs positioning with metrics", note: "Zero revenue, scale, or percentage metrics", passed: false },
      { id: "fluff", label: "Eliminates empty buzzwords", note: "Trips flag on filler words (passionate)", passed: false },
      { id: "authority", label: "Proves verified authority", note: "Unverified generic title without track record", passed: false },
    ],
  },
  authority: {
    key: "authority",
    tabLabel: "Authority Angle",
    badge: "Optimized Rewrite",
    subTitle: "Authority Angle",
    headline: "Scaled outbound pipeline past $10M ARR for 40+ B2B SaaS teams. Here is what moves inbound replies.",
    charCount: 104,
    score: 94,
    verdict: "High inbound conversion",
    verdictTone: "success",
    verdictDesc: "Clear ICP, verifiable revenue metrics, and proven executive track record that invites inbound replies.",
    checks: [
      { id: "icp", label: "References target ICP", note: "Direct focus on B2B SaaS teams", passed: true },
      { id: "problem", label: "States a concrete problem verb", note: "Moves inbound replies and pipeline conversion", passed: true },
      { id: "metric", label: "Backs positioning with metrics", note: "Concrete $10M ARR scale metric", passed: true },
      { id: "fluff", label: "Eliminates empty buzzwords", note: "Zero fluff words or corporate jargon", passed: true },
      { id: "authority", label: "Proves verified authority", note: "Verifiable proof with 40+ enterprise clients", passed: true },
    ],
  },
  problem: {
    key: "problem",
    tabLabel: "Problem Solver",
    badge: "Optimized Rewrite",
    subTitle: "Problem Solver",
    headline: "Helping Series A-B B2B SaaS founders fix leaking sales funnels and convert cold pipeline into qualified demos.",
    charCount: 110,
    score: 92,
    verdict: "High inbound conversion",
    verdictTone: "success",
    verdictDesc: "Names exact buyer persona, diagnoses acute funnel pain points, and promises clear business outcomes.",
    checks: [
      { id: "icp", label: "References target ICP", note: "Specific to Series A-B B2B SaaS founders", passed: true },
      { id: "problem", label: "States a concrete problem verb", note: "Fix leaking sales funnels", passed: true },
      { id: "metric", label: "Backs positioning with metrics", note: "Qualified demos and cold pipeline conversion", passed: true },
      { id: "fluff", label: "Eliminates empty buzzwords", note: "Clear, problem-first diagnostic vocabulary", passed: true },
      { id: "authority", label: "Proves verified authority", note: "Tailored to high-growth startup stage", passed: true },
    ],
  },
  social: {
    key: "social",
    tabLabel: "Social Proof",
    badge: "Optimized Rewrite",
    subTitle: "Social Proof",
    headline: "Trusted by 40+ SaaS leaders to build repeatable outbound engines. +240% average reply rate lift.",
    charCount: 102,
    score: 96,
    verdict: "High inbound conversion",
    verdictTone: "success",
    verdictDesc: "Leads with peer validation and hard quantifiable lift percentages to eliminate buyer skepticism.",
    checks: [
      { id: "icp", label: "References target ICP", note: "Targeted to SaaS leaders and revenue teams", passed: true },
      { id: "problem", label: "States a concrete problem verb", note: "Build repeatable outbound sales engines", passed: true },
      { id: "metric", label: "Backs positioning with metrics", note: "+240% average reply rate lift", passed: true },
      { id: "fluff", label: "Eliminates empty buzzwords", note: "Zero buzzwords, pure outcome metrics", passed: true },
      { id: "authority", label: "Proves verified authority", note: "Endorsed and trusted by 40+ leaders", passed: true },
    ],
  },
};

function AnimatedScore({ value }: { value: number }) {
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }
    const controls = animate(displayValue, value, {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value, shouldReduceMotion]);

  return <>{displayValue}</>;
}

// Mini interactive preview for Card 1: Clarity Score
function ClarityScoreMiniPreview() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="mt-4 pt-3.5 border-t border-[#F0EBE1] flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-semibold text-[#71675E]">Clarity Index</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-24 sm:w-28 h-2 rounded-full bg-[#EAE5DC] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#F5B731] to-emerald-500"
            animate={shouldReduceMotion ? { width: "94%" } : {
              width: ["42%", "94%", "42%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <span className="text-xs font-bold text-[#0A0A0A] tabular-nums font-mono">94/100</span>
      </div>
    </div>
  );
}

// Mini interactive preview for Card 2: Three Headline Angles
function HeadlineAnglesMiniPreview() {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const angles = ["Authority Angle", "Problem Solver", "Social Proof"];

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % angles.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <div className="mt-4 pt-3.5 border-t border-[#F0EBE1] flex items-center justify-between">
      <span className="text-xs font-semibold text-[#71675E]">Active Variation</span>
      <div className="relative overflow-hidden h-6 flex items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={angles[index]}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[rgba(245,183,49,0.15)] text-[#A14A08] border border-[rgba(245,183,49,0.35)] whitespace-nowrap"
          >
            {angles[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Mini interactive preview for Card 3: Ready-to-paste About Section
function AboutSectionMiniPreview() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="mt-4 pt-3.5 border-t border-[#F0EBE1] space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5B731]" />
          <span className="text-xs font-semibold text-[#71675E]">1-Click Copy Ready</span>
        </div>
        <motion.div
          animate={shouldReduceMotion ? undefined : {
            scale: [1, 1.04, 1],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#A14A08] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E2D9]"
        >
          <Copy className="h-3 w-3" />
          <span>Formatted markdown</span>
        </motion.div>
      </div>
      <div className="space-y-1.5 opacity-60">
        <div className="h-1.5 rounded-full bg-[#D8D2C7] w-full" />
        <div className="h-1.5 rounded-full bg-[#D8D2C7] w-4/5" />
      </div>
    </div>
  );
}

// Mini interactive preview for Card 4: Keyword Gaps
function KeywordGapsMiniPreview() {
  const shouldReduceMotion = useReducedMotion();
  const keywords = ["B2B SaaS", "Pipeline", "ARR"];
  return (
    <div className="mt-4 pt-3.5 border-t border-[#F0EBE1] flex items-center justify-between flex-wrap gap-1.5">
      <span className="text-xs font-semibold text-[#71675E]">Missing ICP search terms</span>
      <div className="flex items-center gap-1.5">
        {keywords.map((kw, i) => (
          <motion.span
            key={kw}
            animate={shouldReduceMotion ? undefined : {
              y: [0, -2.5, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.35,
            }}
            className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FAF8F5] text-[#0A0A0A] border border-[#E8E2D9] font-mono"
          >
            +{kw}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  const [activeTab, setActiveTab] = useState<DemoTabKey>("problem");
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const scenario = DEMO_SCENARIOS[activeTab];

  // Auto-switch tabs every 4 seconds so the preview continually demonstrates the transformation
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = DEMO_TABS.indexOf(prev);
        const nextIndex = (currentIndex + 1) % DEMO_TABS.length;
        return DEMO_TABS[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, shouldReduceMotion]);

  // Apple-style critically damped spring physics: smooth, instantaneous feel, zero unwanted bounce
  const fluidSpring = {
    type: "spring" as const,
    stiffness: 420,
    damping: 32,
  };

  return (
    <div className="flex flex-col w-full selection:bg-[#F5B731]/30">
      <JsonLd data={HOWTO_SCHEMA} />

      {/* Hero Section */}
      <section
        className="pt-16 sm:pt-20 pb-20 sm:pb-24 px-4 sm:px-6 relative overflow-hidden"
        style={{ backgroundColor: "#F8F6F2" }}
      >
        {/* Soft atmospheric ambient light */}
        <motion.div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-[580px] h-[580px] rounded-full pointer-events-none"
          animate={shouldReduceMotion ? undefined : {
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(245,183,49,0.22) 0%, rgba(255,160,0,0.07) 42%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -top-24 -right-32 w-[520px] h-[520px] rounded-full pointer-events-none"
          animate={shouldReduceMotion ? undefined : {
            scale: [1, 1.06, 1],
            opacity: [0.75, 0.95, 0.75],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{
            background: "radial-gradient(circle, rgba(245,183,49,0.16) 0%, rgba(245,183,49,0.04) 42%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Frosted brand pill badge */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 backdrop-blur-md"
            style={{
              backgroundColor: "rgba(255,255,255,0.75)",
              borderColor: "rgba(245,183,49,0.4)",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#F5B731" }} aria-hidden="true" />
            <span className="text-xs sm:text-sm font-bold tracking-wide text-[#0A0A0A]">
              Free AI Profile Clarity Audit
            </span>
          </motion.div>

          {/* Optical typography heading */}
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-3 tracking-[-0.035em] leading-[1.08] text-[#0A0A0A] text-balance"
          >
            Free LinkedIn Profile Optimizer
          </motion.h1>

          {/* Signature Myntmore gold squiggle underline with self-drawing animation */}
          <div className="flex justify-center -mt-1 mb-6" aria-hidden="true">
            <svg viewBox="0 0 300 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[200px] sm:w-[250px]">
              <motion.path
                d="M3 8 C30 3, 58 12, 86 8 S142 3, 170 8 S226 12, 254 8 S284 3, 297 8"
                stroke="#F5B731"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
                initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
              />
            </svg>
          </div>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto text-[#52525B] tracking-[-0.01em]"
          >
            Your headline is the first line of your pitch, and most LinkedIn profiles read like passive job titles, not reasons to reply. Watch the live interactive preview below cycle through generic vs. high-converting angles.
          </motion.p>

          {/* Continuous Auto-Switching Showcase Device */}
          <div
            className="max-w-3xl mx-auto text-left relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Segmented Control Bar with Auto-Cycle Progress */}
            <div className="flex justify-center mb-5">
              <div
                role="tablist"
                aria-label="Before and after positioning angles"
                className="inline-flex p-1 rounded-full border border-[#E0D9CE] backdrop-blur-xl bg-white/80 shadow-sm max-w-full overflow-x-auto scrollbar-none relative"
              >
                {DEMO_TABS.map((tabKey) => {
                  const isSelected = activeTab === tabKey;
                  const item = DEMO_SCENARIOS[tabKey];
                  return (
                    <button
                      key={tabKey}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveTab(tabKey)}
                      className="relative px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-bold rounded-full transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#F5B731] active:scale-[0.97] cursor-pointer"
                      style={{
                        color: isSelected ? "#0A0A0A" : "#71675E",
                      }}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId={shouldReduceMotion ? undefined : "activePillHighlight"}
                          className="absolute inset-0 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#F5B731]"
                          transition={fluidSpring}
                        />
                      )}
                      <span className="relative z-10 whitespace-nowrap">
                        {item.tabLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Showcase Card with Smooth Morphing Transitions */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.3 }}
              className="relative rounded-2xl p-6 sm:p-8 bg-white border border-[#E8E2D9] shadow-[0_14px_36px_rgba(0,0,0,0.06)] overflow-hidden"
            >
              {/* Subtle light-catching top edge highlight */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5B731]/50 to-transparent pointer-events-none"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={scenario.key}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  className="space-y-6"
                >
                  {/* Card Header: Badge & Score Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#F0EBE1]">
                    <div className="inline-flex items-center gap-2">
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                        style={{
                          backgroundColor: scenario.verdictTone === "success" ? "rgba(245,183,49,0.18)" : "rgba(113,103,94,0.12)",
                          color: scenario.verdictTone === "success" ? "#A14A08" : "#71675E",
                        }}
                      >
                        {scenario.badge}
                      </span>
                      <span className="text-xs text-[#71675E] font-medium hidden sm:inline">
                        {scenario.subTitle}
                      </span>
                    </div>

                    {/* Live Score Dial */}
                    <div className="flex items-center gap-2.5">
                      <div className="text-right">
                        <div className="text-xs font-semibold text-[#71675E]">Clarity Score</div>
                        <div
                          className="text-xs font-bold"
                          style={{ color: scenario.verdictTone === "success" ? "#047857" : "#B45309" }}
                        >
                          {scenario.verdict}
                        </div>
                      </div>
                      <div
                        className="h-10 px-3 rounded-xl flex items-center justify-center font-black text-lg tabular-nums border"
                        style={{
                          backgroundColor: scenario.verdictTone === "success" ? "#ECFDF5" : "#FFFBEB",
                          borderColor: scenario.verdictTone === "success" ? "#A7F3D0" : "#FDE68A",
                          color: scenario.verdictTone === "success" ? "#065F46" : "#92400E",
                        }}
                      >
                        <AnimatedScore value={scenario.score} />
                        <span className="text-xs font-bold opacity-60 ml-0.5">/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Headline Preview Box */}
                  <div
                    className="p-5 sm:p-6 rounded-xl border relative transition-colors duration-200"
                    style={{
                      backgroundColor: scenario.verdictTone === "success" ? "#FFFFFF" : "#F8F6F2",
                      borderColor: scenario.verdictTone === "success" ? "#F5B731" : "#E8E2D9",
                      boxShadow: scenario.verdictTone === "success" ? "0 4px 20px rgba(245,183,49,0.12)" : "none",
                    }}
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#71675E] mb-2 flex items-center justify-between">
                      <span style={{ color: scenario.verdictTone === "success" ? "#A14A08" : "#71675E" }}>
                        LinkedIn Headline Preview
                      </span>
                      <span className="font-mono text-[10px] text-[#71675E] font-semibold">
                        {scenario.charCount} characters
                      </span>
                    </div>
                    <p
                      className="text-base sm:text-lg font-bold leading-snug tracking-[-0.015em]"
                      style={{ color: scenario.verdictTone === "success" ? "#0A0A0A" : "#71675E" }}
                    >
                      &ldquo;{scenario.headline}&rdquo;
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-[#71675E]">
                      {scenario.verdictDesc}
                    </p>
                  </div>

                  {/* 5-Point Diagnostic Breakdown Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#71675E]">
                        Audit Diagnostic Breakdown
                      </h3>
                      <span className="text-[11px] text-[#A14A08] font-semibold">
                        {scenario.checks.filter((c) => c.passed).length} of 5 passed
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {scenario.checks.map((check, idx) => {
                        const isPassed = check.passed;
                        return (
                          <motion.div
                            key={check.id}
                            initial={shouldReduceMotion ? undefined : { opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.04, duration: 0.2 }}
                            className="flex items-start gap-2.5 p-2.5 rounded-lg border text-xs"
                            style={{
                              backgroundColor: isPassed ? "rgba(236,253,245,0.7)" : "rgba(255,251,235,0.7)",
                              borderColor: isPassed ? "#A7F3D0" : "#FDE68A",
                              gridColumn: idx === scenario.checks.length - 1 ? "1 / -1" : undefined,
                            }}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              {isPassed ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-amber-600" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="font-bold text-[#0A0A0A] block truncate">
                                {check.label}
                              </span>
                              <span className="text-[#52525B] leading-tight text-[11px]">
                                {check.note}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Instant-response Hero CTA */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.45 }}
              className="text-center mt-10"
            >
              <Button
                onClick={onStart}
                variant="hero"
                size="xl"
                className="rounded-full shadow-2xl group active:scale-[0.97] hover:scale-[1.02] transition-transform duration-150 ease-out cursor-pointer"
              >
                Audit My Profile
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-150" />
              </Button>
              <p className="mt-3 text-xs text-[#71675E] font-medium">
                Takes 2 minutes · No sign-up required · 100% Free
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What the audit actually checks */}
      <section className="py-20 px-4 sm:px-6 bg-white border-t border-[#E8E2D9]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-xl mx-auto mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-tight text-[#0A0A0A] mb-3">
              What the audit actually checks
            </h2>
            <p className="text-base text-[#71675E] leading-relaxed">
              Five algorithmic checks evaluated directly against your headline and About section.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCORE_CHECKS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ type: "spring", stiffness: 350, damping: 28, delay: index * 0.08 }}
                  whileHover={shouldReduceMotion ? undefined : { y: -3, transition: { duration: 0.15 } }}
                  className="rounded-2xl p-6 border border-[#E8E2D9] bg-[#FAF8F5]/50 hover:bg-[#FAF8F5] transition-colors duration-200 active:scale-[0.99] flex flex-col justify-between group"
                  style={{
                    gridColumn: index === SCORE_CHECKS.length - 1 ? "1 / -1" : undefined,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.08, rotate: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center border border-[#F5B731]/40"
                      style={{ backgroundColor: "rgba(245,183,49,0.12)" }}
                    >
                      <Icon className="h-5 w-5 text-[#A14A08]" />
                    </motion.div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-[#A14A08]">
                          0{index + 1}
                        </span>
                        <h3 className="text-base font-bold text-[#0A0A0A]">
                          {item.label}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-[#52525B]">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-xl mx-auto mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-tight text-[#0A0A0A] mb-3">
              How it works
            </h2>
            <p className="text-base text-[#71675E] leading-relaxed">
              Three straightforward steps designed for busy founders and operators.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Paste your existing text",
                desc: "No password or profile scraping required. Simply paste your current headline and About section.",
                icon: FileText,
              },
              {
                step: "02",
                title: "Run real-time clarity audit",
                desc: "Scored against the five core positioning checks on your exact wording within seconds.",
                icon: BarChart3,
              },
              {
                step: "03",
                title: "Pick your angle and paste",
                desc: "Receive three high-converting headline rewrites, keyword gaps, and an optimized About script.",
                icon: Sparkles,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ type: "spring", stiffness: 350, damping: 28, delay: index * 0.12 }}
                whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.15 } }}
                className="rounded-2xl p-6 sm:p-8 bg-white border border-[#E8E2D9] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl font-black mb-4 tabular-nums" style={{ color: GOLD_TEXT }}>
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[#0A0A0A]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#52525B]">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get free with Rich Micro-Animations and Tactile Apple Physics */}
      <section className="py-20 px-4 sm:px-6 bg-white border-t border-[#E8E2D9]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-xl mx-auto mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-tight text-[#0A0A0A] mb-3">
              What you get, 100% free
            </h2>
            <p className="text-base text-[#71675E] leading-relaxed">
              Comprehensive positioning diagnostics and copy-paste assets ready for deployment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Card 1: A definitive clarity score */}
            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0 }}
              whileHover={shouldReduceMotion ? undefined : {
                y: -4,
                borderColor: "rgba(245,183,49,0.7)",
                boxShadow: "0 12px 28px rgba(245,183,49,0.12)",
                transition: { duration: 0.15 },
              }}
              className="rounded-2xl p-6 border border-[#E8E2D9] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-colors relative flex flex-col justify-between group overflow-hidden"
            >
              <div>
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.12, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="h-9 w-9 rounded-lg flex items-center justify-center mb-3 border border-[#F5B731]/30 cursor-pointer"
                  style={{ backgroundColor: "rgba(245,183,49,0.12)" }}
                >
                  <BarChart3 className="h-4 w-4 text-[#A14A08]" />
                </motion.div>
                <h3 className="text-base font-bold mb-1.5 text-[#0A0A0A]">
                  A definitive clarity score
                </h3>
                <p className="text-sm leading-relaxed text-[#71675E]">
                  See exactly where your profile ranks against high-converting benchmarks, plus the specific elements dragging it down.
                </p>
              </div>
              <ClarityScoreMiniPreview />
            </motion.div>

            {/* Card 2: Three rewritten headlines */}
            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.08 }}
              whileHover={shouldReduceMotion ? undefined : {
                y: -4,
                borderColor: "rgba(245,183,49,0.7)",
                boxShadow: "0 12px 28px rgba(245,183,49,0.12)",
                transition: { duration: 0.15 },
              }}
              className="rounded-2xl p-6 border border-[#E8E2D9] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-colors relative flex flex-col justify-between group overflow-hidden"
            >
              <div>
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.12, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="h-9 w-9 rounded-lg flex items-center justify-center mb-3 border border-[#F5B731]/30 cursor-pointer"
                  style={{ backgroundColor: "rgba(245,183,49,0.12)" }}
                >
                  <Sparkles className="h-4 w-4 text-[#A14A08]" />
                </motion.div>
                <h3 className="text-base font-bold mb-1.5 text-[#0A0A0A]">
                  Three rewritten headlines
                </h3>
                <p className="text-sm leading-relaxed text-[#71675E]">
                  Authority, problem-solver, and social-proof variations tailored to match your authentic voice and buyer stage.
                </p>
              </div>
              <HeadlineAnglesMiniPreview />
            </motion.div>

            {/* Card 3: A ready-to-paste About section */}
            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.16 }}
              whileHover={shouldReduceMotion ? undefined : {
                y: -4,
                borderColor: "rgba(245,183,49,0.7)",
                boxShadow: "0 12px 28px rgba(245,183,49,0.12)",
                transition: { duration: 0.15 },
              }}
              className="rounded-2xl p-6 border border-[#E8E2D9] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-colors relative flex flex-col justify-between group overflow-hidden"
            >
              <div>
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.12, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="h-9 w-9 rounded-lg flex items-center justify-center mb-3 border border-[#F5B731]/30 cursor-pointer"
                  style={{ backgroundColor: "rgba(245,183,49,0.12)" }}
                >
                  <FileText className="h-4 w-4 text-[#A14A08]" />
                </motion.div>
                <h3 className="text-base font-bold mb-1.5 text-[#0A0A0A]">
                  A ready-to-paste About section
                </h3>
                <p className="text-sm leading-relaxed text-[#71675E]">
                  Custom-scripted around your specific target audience and value proposition, avoiding generic template clichés.
                </p>
              </div>
              <AboutSectionMiniPreview />
            </motion.div>

            {/* Card 4: High-intent keyword gaps */}
            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.24 }}
              whileHover={shouldReduceMotion ? undefined : {
                y: -4,
                borderColor: "rgba(245,183,49,0.7)",
                boxShadow: "0 12px 28px rgba(245,183,49,0.12)",
                transition: { duration: 0.15 },
              }}
              className="rounded-2xl p-6 border border-[#E8E2D9] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-colors relative flex flex-col justify-between group overflow-hidden"
            >
              <div>
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.12, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="h-9 w-9 rounded-lg flex items-center justify-center mb-3 border border-[#F5B731]/30 cursor-pointer"
                  style={{ backgroundColor: "rgba(245,183,49,0.12)" }}
                >
                  <Search className="h-4 w-4 text-[#A14A08]" />
                </motion.div>
                <h3 className="text-base font-bold mb-1.5 text-[#0A0A0A]">
                  High-intent keyword gaps
                </h3>
                <p className="text-sm leading-relaxed text-[#71675E]">
                  Identify the critical industry terms your ICP actively searches for that your profile currently lacks.
                </p>
              </div>
              <KeywordGapsMiniPreview />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust line */}
      <section
        className="py-16 px-4 sm:px-6 border-y border-[#E8E2D9]"
        style={{ backgroundColor: "#F8F6F2" }}
      >
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-base sm:text-lg leading-relaxed text-[#3D3D3D]">
            Built by the same team that has scripted the outbound and positioning funnels behind{" "}
            <span className="font-bold text-[#0A0A0A]">12K+ B2B meetings booked</span> for high-growth companies.
          </p>
        </motion.div>
      </section>

      {/* Final closing CTA */}
      <section
        className="py-20 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)",
          borderTop: "1px solid rgba(245,183,49,0.35)",
        }}
      >
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 tracking-[-0.03em] leading-tight text-[#0A0A0A]">
            Stop guessing what your profile says about you.
          </h2>
          <p className="text-base text-[#52525B] mb-8 leading-relaxed">
            Get your instant clarity score, diagnostic deductions, and three copy-paste headline rewrites in under two minutes.
          </p>
          <Button
            onClick={onStart}
            variant="hero"
            size="xl"
            className="rounded-full shadow-2xl group active:scale-[0.97] hover:scale-[1.02] transition-transform duration-150 ease-out cursor-pointer"
          >
            Audit My Profile
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-150" />
          </Button>
        </motion.div>
      </section>

      <RelatedTools currentSlug="linkedin-optimizer" />
    </div>
  );
};

export default LandingPage;
