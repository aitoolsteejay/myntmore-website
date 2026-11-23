"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Faq from "@/app/lp/Faq";
import FadeIn from "@/app/components/FadeIn";
import StatTicker from "@/app/components/StatTicker";
import InnerLayout from "@/app/components/InnerLayout";
import { textTone } from "@/lib/colors";
import pageCopy from "@/content/page-copy/guideCareersAndJobGuide.json";

// This page's text is edited in the admin ("Career Jumpstart Toolkit") and lives in content/page-copy/guideCareersAndJobGuide.json.
const copy = pageCopy;

/* ─── Types ───────────────────────────────────────────────────────── */
interface Tool {
  name: string;
  blurb: string;
  url: string;
}

type ToolCategory = "jobs" | "resume" | "interview" | "portfolio" | "learn" | "reviews";

interface Tip {
  label?: string;
  text: string;
}

/* ─── Content ─────────────────────────────────────────────────────── */

const PROFILE_PICTURE_CHECKLIST: Tip[] = [
  { text: copy.CareersAndJobGuideClient_s01.t01 },
  { text: copy.CareersAndJobGuideClient_s01.t02 },
  { text: copy.CareersAndJobGuideClient_s01.t03 },
];

const ABOUT_SECTION_CHECKLIST: Tip[] = [
  { text: copy.CareersAndJobGuideClient_s01.t04 },
  { text: copy.CareersAndJobGuideClient_s01.t05 },
  { text: copy.CareersAndJobGuideClient_s01.t06 },
  { text: copy.CareersAndJobGuideClient_s01.t07 },
];

const FEATURED_SECTION_CHECKLIST: Tip[] = [
  { text: copy.CareersAndJobGuideClient_s01.t08 },
  { text: copy.CareersAndJobGuideClient_s01.t09 },
  { text: copy.CareersAndJobGuideClient_s01.t10 },
];

const NO_EXPERIENCE_CHECKLIST: Tip[] = [
  { text: copy.CareersAndJobGuideClient_s01.t11 },
  { text: copy.CareersAndJobGuideClient_s01.t12 },
  { text: copy.CareersAndJobGuideClient_s01.t13 },
  { text: copy.CareersAndJobGuideClient_s01.t14 },
  { text: copy.CareersAndJobGuideClient_s01.t15 },
];

const OUTREACH_SEQUENCE: { step: string; title: string; delay: string }[] = [
  { step: "", title: copy.CareersAndJobGuideClient_s01.t16, delay: "Day 0" },
  { step: "", title: copy.CareersAndJobGuideClient_s01.t17, delay: "Same day" },
  { step: "", title: copy.CareersAndJobGuideClient_s01.t18, delay: "+1 day" },
  { step: "1", title: copy.CareersAndJobGuideClient_s01.t19, delay: "+1 day" },
  { step: "2", title: copy.CareersAndJobGuideClient_s01.t20, delay: "+3 days" },
  { step: "3", title: copy.CareersAndJobGuideClient_s01.t21, delay: "+5 days" },
  { step: "4", title: copy.CareersAndJobGuideClient_s01.t22, delay: "+7 days" },
  { step: "", title: copy.CareersAndJobGuideClient_s01.t23, delay: "+15 days" },
];

const OUTREACH_LIMITS: Tip[] = [
  { label: copy.CareersAndJobGuideClient_s01.t24, text: copy.CareersAndJobGuideClient_s01.t25 },
  { label: copy.CareersAndJobGuideClient_s01.t26, text: "150-200 a day." },
  { label: copy.CareersAndJobGuideClient_s01.t27, text: copy.CareersAndJobGuideClient_s01.t28 },
  { label: copy.CareersAndJobGuideClient_s01.t29, text: copy.CareersAndJobGuideClient_s01.t30 },
];

const TOOLS: Record<ToolCategory, Tool[]> = {
  jobs: [
    { name: copy.CareersAndJobGuideClient_s01.t31, blurb: "Network + the broadest listings.", url: "https://www.linkedin.com/jobs" },
    { name: copy.CareersAndJobGuideClient_s01.t32, blurb: "Volume across every industry.", url: "https://www.indeed.com" },
    { name: copy.CareersAndJobGuideClient_s01.t33, blurb: "Startup roles, salaries upfront.", url: "https://wellfound.com" },
    { name: copy.CareersAndJobGuideClient_s01.t34, blurb: "Remote-only, no location filter.", url: "https://remoteok.com" },
    { name: copy.CareersAndJobGuideClient_s01.t35, blurb: "Work at a Startup job board.", url: "https://www.ycombinator.com/jobs" },
  ],
  resume: [
    { name: copy.CareersAndJobGuideClient_s01.t36, blurb: "Tailors your resume to each job post.", url: "https://www.tealhq.com" },
    { name: copy.CareersAndJobGuideClient_s01.t37, blurb: "Tight, clean one-page templates.", url: "https://novoresume.com" },
    { name: copy.CareersAndJobGuideClient_s01.t38, blurb: "AI drafting plus cover letters.", url: "https://www.kickresume.com" },
    { name: copy.CareersAndJobGuideClient_s01.t39, blurb: "Design-led, but watch the ATS.", url: "https://www.canva.com/resumes/" },
    { name: copy.CareersAndJobGuideClient_s01.t40, blurb: "Free, with a clean PDF export.", url: "https://flowcv.com" },
  ],
  interview: [
    { name: copy.CareersAndJobGuideClient_s01.t41, blurb: "Coding drills.", url: "https://leetcode.com" },
    { name: copy.CareersAndJobGuideClient_s01.t42, blurb: "The employer test format.", url: "https://www.hackerrank.com" },
    { name: "interviewing.io", blurb: "Mock rounds with real engineers.", url: "https://interviewing.io" },
    { name: copy.CareersAndJobGuideClient_s01.t43, blurb: "PM, data, and system design prep.", url: "https://www.tryexponent.com" },
    { name: copy.CareersAndJobGuideClient_s01.t44, blurb: "Reviews plus reported questions.", url: "https://www.glassdoor.com" },
    { name: copy.CareersAndJobGuideClient_s01.t45, blurb: "Comp data before you negotiate.", url: "https://www.levels.fyi" },
  ],
  portfolio: [
    { name: copy.CareersAndJobGuideClient_s01.t46, blurb: "Code, plus a real README.", url: "https://github.com" },
    { name: copy.CareersAndJobGuideClient_s01.t47, blurb: "Notebooks and competitions.", url: "https://www.kaggle.com" },
    { name: copy.CareersAndJobGuideClient_s01.t48, blurb: "Spaces demos and models.", url: "https://huggingface.co" },
    { name: copy.CareersAndJobGuideClient_s01.t49, blurb: "Hackathon projects, dated.", url: "https://devpost.com" },
    { name: copy.CareersAndJobGuideClient_s01.t50, blurb: "Free templates, one shareable link.", url: "https://www.notion.so" },
    { name: copy.CareersAndJobGuideClient_s01.t51, blurb: "Deploy a live demo URL.", url: "https://vercel.com" },
  ],
  learn: [
    { name: copy.CareersAndJobGuideClient_s01.t52, blurb: "Google & Meta certificates.", url: "https://www.coursera.org" },
    { name: copy.CareersAndJobGuideClient_s01.t53, blurb: "University courses, auditable free.", url: "https://www.edx.org" },
    { name: copy.CareersAndJobGuideClient_s01.t54, blurb: "Short AI courses, free.", url: "https://www.deeplearning.ai" },
    { name: copy.CareersAndJobGuideClient_s01.t55, blurb: "Free and project-based.", url: "https://www.freecodecamp.org" },
    { name: copy.CareersAndJobGuideClient_s01.t56, blurb: "Badges land right on your profile.", url: "https://www.linkedin.com/learning" },
    { name: copy.CareersAndJobGuideClient_s01.t57, blurb: "Nanodegrees with real reviews.", url: "https://www.udacity.com" },
    { name: copy.CareersAndJobGuideClient_s01.t58, blurb: "Cheap on sale, tool-specific.", url: "https://www.udemy.com" },
    { name: copy.CareersAndJobGuideClient_s01.t59, blurb: "SQL, Python, and analytics.", url: "https://www.datacamp.com" },
  ],
  reviews: [
    { name: copy.CareersAndJobGuideClient_s01.t60, blurb: "Interview questions are the gold here.", url: "https://www.glassdoor.com" },
    { name: copy.CareersAndJobGuideClient_s01.t61, blurb: "The deepest data on Indian firms.", url: "https://www.ambitionbox.com" },
    { name: copy.CareersAndJobGuideClient_s01.t62, blurb: "Reviews sit right next to the listing.", url: "https://www.indeed.com/companies" },
    { name: copy.CareersAndJobGuideClient_s01.t63, blurb: "Culture and leadership, US-skewed.", url: "https://www.comparably.com" },
    { name: copy.CareersAndJobGuideClient_s01.t64, blurb: "Anonymous, blunt, tech-heavy.", url: "https://www.teamblind.com" },
    { name: copy.CareersAndJobGuideClient_s01.t65, blurb: "Industry chatter, sorted by field.", url: "https://www.fishbowlapp.com" },
  ],
};

const CATEGORIES: { key: ToolCategory; label: string }[] = [
  { key: "jobs", label: copy.CareersAndJobGuideClient_s01.t66 },
  { key: "resume", label: copy.CareersAndJobGuideClient_s01.t67 },
  { key: "interview", label: copy.CareersAndJobGuideClient_s01.t68 },
  { key: "portfolio", label: copy.CareersAndJobGuideClient_s01.t69 },
  { key: "learn", label: copy.CareersAndJobGuideClient_s01.t70 },
  { key: "reviews", label: copy.CareersAndJobGuideClient_s01.t71 },
];

const ABOUT_FAQ = [
  { q: copy.CareersAndJobGuideClient_s01.t72, a: copy.CareersAndJobGuideClient_s01.t73 },
  { q: copy.CareersAndJobGuideClient_s01.t74, a: copy.CareersAndJobGuideClient_s01.t75 },
  { q: copy.CareersAndJobGuideClient_s01.t76, a: copy.CareersAndJobGuideClient_s01.t77 },
  { q: copy.CareersAndJobGuideClient_s01.t78, a: copy.CareersAndJobGuideClient_s01.t79 },
];

/* ─── Small building blocks ───────────────────────────────────────── */

// Thin fixed bar that fills left-to-right with scroll depth, giving a
// constant, low-key sense of motion/progress down an otherwise long page.
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed left-0 top-0 z-[60] h-1 w-full" style={{ backgroundColor: "rgba(10,10,10,0.06)" }}>
      <div
        className="h-full origin-left"
        style={{ transform: `scaleX(${progress})`, background: "linear-gradient(90deg, #F5B731, #D97706)", transition: "transform 100ms linear" }}
      />
    </div>
  );
}

// Small floating button that fades and scales in once the reader has
// scrolled past the hero, and smooth-scrolls back to top on click.
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="lp-card fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full shadow-lg"
      style={{
        backgroundColor: "#F5B731",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#0A0A0A" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

function SectionEyebrow({ num, label, accent = "#0a0a0a" }: { num: string; label: string; accent?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm font-black tabular-nums" style={{ color: textTone(accent) }}>{num}</span>
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#71675E" }}>{label}</span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#16A34A" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ChecklistCard({ tip, delay = 0 }: { tip: Tip; delay?: number }) {
  return (
    <div
      className="card-fade-up tip-card-hover group flex items-start gap-3.5 rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md"
      style={{ borderColor: "#E8E2D9", animationDelay: `${delay}ms` }}
    >
      <span
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{ backgroundColor: "#F0FDF4", border: "1px solid rgba(16,185,129,0.3)" }}
      >
        <CheckIcon />
      </span>
      <div className="min-w-0 flex-1">
        {tip.label && <p className="mb-1 text-sm font-black leading-snug" style={{ color: "#0a0a0a" }}>{tip.label}</p>}
        <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{tip.text}</p>
      </div>
    </div>
  );
}

function ChecklistGrid({ tips }: { tips: Tip[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {tips.map((tip, i) => (
        <ChecklistCard key={i} tip={tip} delay={i * 45} />
      ))}
    </div>
  );
}

function ProfileSubsection({ num, title, intro, tips, accent }: { num: string; title: string; intro?: string; tips: Tip[]; accent: string }) {
  return (
    <FadeIn className="mb-10 block">
      <SectionEyebrow num={num} label="Profile fix" accent={accent} />
      <h3 className="mb-2 text-xl font-black" style={{ color: "#0a0a0a" }}>{title}</h3>
      {intro && <p className="mb-5 max-w-2xl text-sm leading-relaxed" style={{ color: "#52525B" }}>{intro}</p>}
      <ChecklistGrid tips={tips} />
    </FadeIn>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l6 0l0 6M20 5L11 14M9 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-3" />
    </svg>
  );
}

function ToolCard({ tool, accent, delay = 0 }: { tool: Tool; accent: string; delay?: number }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-fade-up tip-card-hover group flex flex-col rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md"
      style={{ borderColor: "#E8E2D9", animationDelay: `${delay}ms` }}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <p className="text-sm font-black leading-snug" style={{ color: "#0a0a0a" }}>{tool.name}</p>
        <span className="inline-block opacity-40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" style={{ color: textTone(accent) }}>
          <ExternalLinkIcon />
        </span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{tool.blurb}</p>
    </a>
  );
}

interface TabDef<T extends string> {
  key: T;
  label: string;
}

function TabGroup<T extends string>({
  tabs,
  active,
  onChange,
  ariaLabel,
}: {
  tabs: TabDef<T>[];
  active: T;
  onChange: (key: T) => void;
  ariaLabel: string;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const focusIndex = useCallback(
    (i: number) => {
      const key = tabs[(i + tabs.length) % tabs.length].key;
      refs.current[key]?.focus();
      onChange(tabs[(i + tabs.length) % tabs.length].key);
    },
    [tabs, onChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight") { e.preventDefault(); focusIndex(i + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); focusIndex(i - 1); }
    else if (e.key === "Home") { e.preventDefault(); focusIndex(0); }
    else if (e.key === "End") { e.preventDefault(); focusIndex(tabs.length - 1); }
  };

  return (
    <div role="tablist" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {tabs.map((tab, i) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            ref={(el) => { refs.current[tab.key] = el; }}
            role="tab"
            id={`tab-${tab.key}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.key}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.key)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="lp-pop-in rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            style={
              isActive
                ? { backgroundColor: "#F5B731", color: "#0A0A0A", boxShadow: "0 4px 14px rgba(245,183,49,0.3)", animationDelay: `${i * 60}ms` }
                : { backgroundColor: "#ffffff", color: "#52525B", border: "1px solid #E8E2D9", animationDelay: `${i * 60}ms` }
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function SequenceRow({ item, delay = 0 }: { item: { step: string; title: string; delay: string }; delay?: number }) {
  return (
    <div
      className="card-fade-up tip-card-hover group flex items-center gap-4 rounded-2xl border bg-white px-5 py-4 shadow-sm hover:shadow-md"
      style={{ borderColor: "#E8E2D9", animationDelay: `${delay}ms` }}
    >
      <span
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-black transition-transform duration-300 group-hover:scale-110"
        style={item.step ? { backgroundColor: "#F5B731", color: "#0a0a0a" } : { backgroundColor: "#F8F6F2", color: "#71675E", border: "1px solid #E8E2D9" }}
      >
        {item.step || "•"}
      </span>
      <p className="min-w-0 flex-1 text-sm font-semibold" style={{ color: "#0a0a0a" }}>{item.title}</p>
      <span className="flex-shrink-0 text-xs font-bold uppercase tracking-widest" style={{ color: "#71675E" }}>{item.delay}</span>
    </div>
  );
}

/* ─── Main page ───────────────────────────────────────────────────── */

export default function CareersAndJobGuideClient() {
  const [category, setCategory] = useState<ToolCategory>("jobs");
  const hydrated = useRef(false);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && CATEGORIES.some((c) => c.key === hash)) {
        setCategory(hash as ToolCategory);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    if (!hydrated.current) { hydrated.current = true; return; }
    window.history.replaceState(null, "", `#${category}`);
  }, [category]);

  const activeTools = useMemo(() => TOOLS[category], [category]);
  const totalTools = useMemo(() => Object.values(TOOLS).reduce((sum, arr) => sum + arr.length, 0), []);

  return (
    <InnerLayout>
    <div style={{ backgroundColor: "#F8F6F2" }}>
      <ScrollProgress />
      <BackToTop />
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pb-12 pt-32">
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.22) 0%, rgba(217,119,6,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none", animation: "lp-float 10s ease-in-out infinite" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.16) 0%, rgba(37,99,235,0.06) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none", animation: "lp-float 12s ease-in-out infinite reverse" }} />
        <span className="lp-float-icon lp-pop-in hidden sm:block text-3xl" aria-hidden="true" style={{ top: "28%", left: "8%", animationDelay: "0.2s", ["--lp-rot" as any]: "-10deg" }}>🚀</span>
        <span className="lp-float-icon lp-pop-in hidden sm:block text-2xl" aria-hidden="true" style={{ top: "62%", left: "5%", animationDelay: "1.5s", ["--lp-rot" as any]: "8deg" }}>🔗</span>
        <span className="lp-float-icon lp-pop-in hidden sm:block text-3xl" aria-hidden="true" style={{ top: "32%", right: "7%", animationDelay: "0.9s", ["--lp-rot" as any]: "10deg" }}>💼</span>
        <span className="lp-float-icon lp-pop-in hidden sm:block text-2xl" aria-hidden="true" style={{ top: "64%", right: "10%", animationDelay: "2.2s", ["--lp-rot" as any]: "-6deg" }}>📎</span>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 hero-fade" style={{ borderColor: "rgba(245,183,49,0.35)", backgroundColor: "rgba(245,183,49,0.07)" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#F5B731", animation: "lp-radar-ping 2.4s cubic-bezier(0.22,1,0.36,1) infinite" }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>{copy.CareersAndJobGuideClient_s01.t80}</span>
          </div>
          <h1 className="mb-4 text-4xl font-black leading-tight sm:text-6xl hero-fade-d1" style={{ color: "#0a0a0a" }}>{copy.CareersAndJobGuideClient_s01.t81}</h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed sm:text-lg hero-fade-d2" style={{ color: "#52525B" }}>{copy.CareersAndJobGuideClient_s01.t82}</p>

          <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-4 hero-fade-d3">
            {[
              { v: String(totalTools) + "+", l: copy.CareersAndJobGuideClient_s01.t83 },
              { v: "6", l: copy.CareersAndJobGuideClient_s01.t84 },
              { v: "3 weeks", l: copy.CareersAndJobGuideClient_s01.t85 },
            ].map((s) => (
              <div key={s.l} className="lp-stat">
                <StatTicker value={s.v} className="text-3xl font-black" style={{ color: "#0a0a0a" }} />
                <p className="mt-1 text-xs font-semibold" style={{ color: "#71675E" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LinkedIn profile fixes ───────────────────────────── */}
      <section className="px-4 py-14">
        <FadeIn className="mx-auto block max-w-4xl">
          <SectionEyebrow num="01" label="Fix your profile first" accent="#3b82f6" />
          <h2 className="mb-3 text-2xl font-black sm:text-3xl" style={{ color: "#0a0a0a" }}>{copy.CareersAndJobGuideClient_s02.t01}</h2>
          <p className="mb-2 max-w-2xl text-sm leading-relaxed" style={{ color: "#52525B" }}>{copy.CareersAndJobGuideClient_s02.t02}</p>

          <ProfileSubsection num="1" title={copy.CareersAndJobGuideClient_s02.t03} tips={PROFILE_PICTURE_CHECKLIST} accent="#3b82f6" />
          <ProfileSubsection
            num="2"
            title={copy.CareersAndJobGuideClient_s02.t04}
            intro="Your banner is a billboard, not decoration: lead with what you do and the outcome you create, no guesswork. Your headline should stack role, expertise, and one notable credential."
            tips={[{ text: copy.CareersAndJobGuideClient_s02.t05 }]}
            accent="#3b82f6"
          />
          <ProfileSubsection num="3" title={copy.CareersAndJobGuideClient_s02.t06} tips={ABOUT_SECTION_CHECKLIST} accent="#3b82f6" />
          <ProfileSubsection num="4" title={copy.CareersAndJobGuideClient_s02.t07} tips={FEATURED_SECTION_CHECKLIST} accent="#3b82f6" />
          <ProfileSubsection
            num="5"
            title={"Experience, projects, and the “I haven't done anything yet” problem"}
            intro="Nobody starts with a full work history. All of these count as real experience:"
            tips={NO_EXPERIENCE_CHECKLIST}
            accent="#3b82f6"
          />
        </FadeIn>
      </section>

      {/* ─── The outreach playbook ────────────────────────────── */}
      <section className="border-t px-4 py-14" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <FadeIn className="mx-auto block max-w-4xl">
          <SectionEyebrow num="02" label="The outreach playbook" accent="#a855f7" />
          <h2 className="mb-3 text-2xl font-black sm:text-3xl" style={{ color: "#0a0a0a" }}>{copy.CareersAndJobGuideClient_s03.t01}</h2>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed" style={{ color: "#52525B" }}>{copy.CareersAndJobGuideClient_s03.t02}</p>

          <FadeIn className="mb-8 block">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: "🎙️", title: copy.CareersAndJobGuideClient_s03.t03, text: copy.CareersAndJobGuideClient_s03.t04 },
                { icon: "🎥", title: copy.CareersAndJobGuideClient_s03.t05, text: copy.CareersAndJobGuideClient_s03.t06 },
                { icon: "😄", title: copy.CareersAndJobGuideClient_s03.t07, text: copy.CareersAndJobGuideClient_s03.t08 },
                { icon: "⏰", title: copy.CareersAndJobGuideClient_s03.t09, text: copy.CareersAndJobGuideClient_s03.t10 },
              ].map((card, i) => (
                <div
                  key={card.title}
                  className="card-fade-up tip-card-hover group rounded-2xl border p-5"
                  style={{ backgroundColor: "rgba(168,85,247,0.05)", borderColor: "rgba(168,85,247,0.25)", animationDelay: `${i * 45}ms` }}
                >
                  <div className="mb-2 flex items-center gap-2.5">
                    <span className="text-lg transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" aria-hidden="true">{card.icon}</span>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#7e22ce" }}>{card.title}</p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>{card.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="mb-8 block">
            <h3 className="mb-4 text-lg font-black" style={{ color: "#0a0a0a" }}>{copy.CareersAndJobGuideClient_s04.t01}</h3>
            <div className="grid grid-cols-1 gap-3">
              {OUTREACH_SEQUENCE.map((item, i) => (
                <SequenceRow key={item.title} item={item} delay={i * 45} />
              ))}
            </div>
            <p className="mt-5 max-w-2xl text-xs leading-relaxed" style={{ color: "#71675E" }}>{copy.CareersAndJobGuideClient_s04.t02}</p>
          </FadeIn>

          <FadeIn className="block">
            <h3 className="mb-4 text-lg font-black" style={{ color: "#0a0a0a" }}>{copy.CareersAndJobGuideClient_s05.t01}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {OUTREACH_LIMITS.map((tip, i) => (
                <div
                  key={tip.label}
                  className="card-fade-up tip-card-hover rounded-2xl border p-5"
                  style={{ backgroundColor: "#FEF2F2", borderColor: "rgba(220,38,38,0.2)", animationDelay: `${i * 45}ms` }}
                >
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: "#DC2626" }}>{tip.label}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>{tip.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </FadeIn>
      </section>

      {/* ─── Job-search toolkit ───────────────────────────────── */}
      <section className="px-4 py-14">
        <FadeIn className="mx-auto block max-w-4xl">
          <SectionEyebrow num="03" label="The job-search toolkit" accent="#10b981" />
          <h2 className="mb-3 text-2xl font-black sm:text-3xl" style={{ color: "#0a0a0a" }}>{copy.CareersAndJobGuideClient_s06.t01}</h2>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed" style={{ color: "#52525B" }}>{copy.CareersAndJobGuideClient_s06.t02}</p>

          <div className="mb-8">
            <TabGroup tabs={CATEGORIES} active={category} onChange={setCategory} ariaLabel="Choose a tool category" />
          </div>

          <FadeIn key={category} className="block">
            <div
              id={`panel-${category}`}
              role="tabpanel"
              aria-labelledby={`tab-${category}`}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {activeTools.map((tool, i) => (
                <ToolCard key={tool.name} tool={tool} accent="#10b981" delay={i * 45} />
              ))}
            </div>
          </FadeIn>
        </FadeIn>
      </section>

      {/* ─── About this toolkit (accordion) ───────────────────── */}
      <Faq badge="Good to know" title={copy.CareersAndJobGuideClient_s06.t03} items={ABOUT_FAQ} />
    </div>
    </InnerLayout>
  );
}
