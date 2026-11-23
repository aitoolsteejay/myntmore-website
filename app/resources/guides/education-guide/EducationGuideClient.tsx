"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Faq from "@/app/lp/Faq";
import FadeIn from "@/app/components/FadeIn";
import StatTicker from "@/app/components/StatTicker";
import InnerLayout from "@/app/components/InnerLayout";
import CopyBlock from "@/app/components/CopyBlock";
import { textTone } from "@/lib/colors";
import pageCopy from "@/content/page-copy/guideEducationGuide.json";

// This page's text is edited in the admin ("AI Quick-Start Guide") and lives in content/page-copy/guideEducationGuide.json.
const copy = pageCopy;

/* ─── Types ───────────────────────────────────────────────────────── */
interface Tip {
  label?: string;
  // Set when `label` is a rule/habit callout rather than an actual tool or
  // app name (e.g. "Set the rule"), so it groups under "Habits worth
  // building" instead of being miscategorised as a tool just because it
  // has a bolded label.
  isHabit?: boolean;
  text: string;
  // A ready-to-copy example prompt for this specific tool, tailored to the
  // audience/age-group/format it appears under. Left unset for tools that
  // aren't actually prompt-driven (a camera-scan app, a one-click batch
  // processor, an automated checker) rather than forcing a fake prompt
  // onto them.
  prompt?: string;
}

type ParentEducatorStage = "pre-primary" | "primary" | "middle" | "senior";
type CreatorFormat = "writing" | "video" | "images";
type AudienceKey = "parents" | "educators" | "creators" | "leadership";

/* ─── Content (transcribed as provided, reformatted into label/text
   pairs for the card layout -- wording preserved, not summarised) ─── */

const PARENTS_TIPS: Record<ParentEducatorStage, Tip[]> = {
  "pre-primary": [
    { label: copy.EducationGuideClient_s01.t01, text: copy.EducationGuideClient_s01.t02 },
    { label: copy.EducationGuideClient_s01.t03, text: copy.EducationGuideClient_s01.t04, prompt: copy.EducationGuideClient_s01.t05 },
    { label: copy.EducationGuideClient_s01.t06, text: copy.EducationGuideClient_s01.t07, prompt: copy.EducationGuideClient_s01.t08 },
    { text: copy.EducationGuideClient_s01.t09 },
    { text: copy.EducationGuideClient_s01.t10 },
    { text: copy.EducationGuideClient_s01.t11 },
    { label: copy.EducationGuideClient_s01.t12, isHabit: true, text: copy.EducationGuideClient_s01.t13 },
    { text: copy.EducationGuideClient_s01.t14 },
    { label: copy.EducationGuideClient_s01.t15, text: copy.EducationGuideClient_s01.t16, prompt: copy.EducationGuideClient_s01.t17 },
    { text: copy.EducationGuideClient_s01.t18 },
  ],
  primary: [
    { label: copy.EducationGuideClient_s01.t19, text: copy.EducationGuideClient_s01.t20, prompt: copy.EducationGuideClient_s01.t21 },
    { label: copy.EducationGuideClient_s01.t22, text: copy.EducationGuideClient_s01.t23 },
    { label: copy.EducationGuideClient_s01.t24, text: copy.EducationGuideClient_s01.t25, prompt: copy.EducationGuideClient_s01.t26 },
    { text: copy.EducationGuideClient_s01.t27 },
    { label: copy.EducationGuideClient_s01.t28, text: copy.EducationGuideClient_s01.t29 },
    { text: copy.EducationGuideClient_s01.t30 },
    { text: copy.EducationGuideClient_s01.t31 },
    { text: copy.EducationGuideClient_s01.t32 },
    { label: copy.EducationGuideClient_s01.t33, isHabit: true, text: copy.EducationGuideClient_s01.t34 },
    { text: copy.EducationGuideClient_s01.t35 },
  ],
  middle: [
    { label: copy.EducationGuideClient_s01.t36, isHabit: true, text: copy.EducationGuideClient_s01.t37 },
    { label: copy.EducationGuideClient_s01.t38, text: copy.EducationGuideClient_s01.t39, prompt: copy.EducationGuideClient_s01.t40 },
    { label: copy.EducationGuideClient_s01.t41, isHabit: true, text: copy.EducationGuideClient_s01.t42 },
    { text: copy.EducationGuideClient_s01.t43 },
    { text: copy.EducationGuideClient_s01.t44 },
    { text: copy.EducationGuideClient_s01.t45 },
    { label: copy.EducationGuideClient_s01.t46, text: copy.EducationGuideClient_s01.t47, prompt: copy.EducationGuideClient_s01.t48 },
    { text: copy.EducationGuideClient_s01.t49 },
    { label: copy.EducationGuideClient_s01.t50, text: copy.EducationGuideClient_s01.t51, prompt: copy.EducationGuideClient_s01.t52 },
    { label: copy.EducationGuideClient_s01.t53, isHabit: true, text: copy.EducationGuideClient_s01.t54 },
  ],
  senior: [
    { label: copy.EducationGuideClient_s01.t55, text: copy.EducationGuideClient_s01.t56 },
    { label: copy.EducationGuideClient_s01.t57, text: copy.EducationGuideClient_s01.t58, prompt: copy.EducationGuideClient_s01.t59 },
    { label: copy.EducationGuideClient_s01.t60, text: copy.EducationGuideClient_s01.t61, prompt: copy.EducationGuideClient_s01.t62 },
    { label: copy.EducationGuideClient_s01.t63, text: copy.EducationGuideClient_s01.t64, prompt: copy.EducationGuideClient_s01.t65 },
    { label: copy.EducationGuideClient_s01.t66, text: copy.EducationGuideClient_s01.t67 },
    { label: copy.EducationGuideClient_s01.t68, isHabit: true, text: copy.EducationGuideClient_s01.t69 },
    { text: copy.EducationGuideClient_s01.t70 },
    { text: copy.EducationGuideClient_s01.t71 },
    { text: copy.EducationGuideClient_s01.t72 },
    { text: copy.EducationGuideClient_s01.t73 },
    { label: copy.EducationGuideClient_s01.t74, isHabit: true, text: copy.EducationGuideClient_s01.t75 },
  ],
};

const EDUCATORS_TIPS: Record<ParentEducatorStage, Tip[]> = {
  "pre-primary": [
    { label: copy.EducationGuideClient_s01.t76, text: copy.EducationGuideClient_s01.t77, prompt: copy.EducationGuideClient_s01.t78 },
    { label: copy.EducationGuideClient_s01.t79, text: copy.EducationGuideClient_s01.t80, prompt: copy.EducationGuideClient_s01.t81 },
    { label: copy.EducationGuideClient_s01.t82, text: copy.EducationGuideClient_s01.t83, prompt: copy.EducationGuideClient_s01.t84 },
    { text: copy.EducationGuideClient_s01.t85 },
    { text: copy.EducationGuideClient_s01.t86 },
    { text: copy.EducationGuideClient_s01.t87 },
    { text: copy.EducationGuideClient_s01.t88 },
    { text: copy.EducationGuideClient_s01.t89 },
    { text: copy.EducationGuideClient_s01.t90 },
    { text: copy.EducationGuideClient_s01.t91 },
  ],
  primary: [
    { label: copy.EducationGuideClient_s01.t92, text: copy.EducationGuideClient_s01.t93, prompt: copy.EducationGuideClient_s01.t94 },
    { label: copy.EducationGuideClient_s01.t95, text: copy.EducationGuideClient_s01.t96, prompt: copy.EducationGuideClient_s01.t97 },
    { label: copy.EducationGuideClient_s01.t98, text: copy.EducationGuideClient_s01.t99, prompt: copy.EducationGuideClient_s01.t100 },
    { label: copy.EducationGuideClient_s01.t101, text: copy.EducationGuideClient_s01.t102, prompt: copy.EducationGuideClient_s01.t103 },
    { text: copy.EducationGuideClient_s01.t104 },
    { label: copy.EducationGuideClient_s01.t105, text: copy.EducationGuideClient_s01.t106 },
    { text: copy.EducationGuideClient_s01.t107 },
    { text: copy.EducationGuideClient_s01.t108 },
    { text: copy.EducationGuideClient_s01.t109 },
    { label: copy.EducationGuideClient_s01.t110, text: copy.EducationGuideClient_s01.t111, prompt: copy.EducationGuideClient_s01.t112 },
  ],
  middle: [
    { label: copy.EducationGuideClient_s01.t113, text: copy.EducationGuideClient_s01.t114, prompt: copy.EducationGuideClient_s01.t115 },
    { label: copy.EducationGuideClient_s01.t116, text: copy.EducationGuideClient_s01.t117, prompt: copy.EducationGuideClient_s01.t118 },
    { text: copy.EducationGuideClient_s01.t119 },
    { text: copy.EducationGuideClient_s01.t120 },
    { text: copy.EducationGuideClient_s01.t121 },
    { text: copy.EducationGuideClient_s01.t122 },
    { label: copy.EducationGuideClient_s01.t123, text: copy.EducationGuideClient_s01.t124, prompt: copy.EducationGuideClient_s01.t125 },
    { label: copy.EducationGuideClient_s01.t126, text: copy.EducationGuideClient_s01.t127 },
    { text: copy.EducationGuideClient_s01.t128 },
    { text: copy.EducationGuideClient_s01.t129 },
  ],
  senior: [
    { label: copy.EducationGuideClient_s01.t130, text: copy.EducationGuideClient_s01.t131, prompt: copy.EducationGuideClient_s01.t132 },
    { label: copy.EducationGuideClient_s01.t133, text: copy.EducationGuideClient_s01.t134, prompt: copy.EducationGuideClient_s01.t135 },
    { text: copy.EducationGuideClient_s01.t136 },
    { text: copy.EducationGuideClient_s01.t137 },
    { label: copy.EducationGuideClient_s01.t138, text: copy.EducationGuideClient_s01.t139 },
    { text: copy.EducationGuideClient_s01.t140 },
    { text: copy.EducationGuideClient_s01.t141 },
    { label: copy.EducationGuideClient_s01.t142, text: copy.EducationGuideClient_s01.t143, prompt: copy.EducationGuideClient_s01.t144 },
    { text: copy.EducationGuideClient_s01.t145 },
    { label: copy.EducationGuideClient_s01.t146, isHabit: true, text: copy.EducationGuideClient_s01.t147 },
  ],
};

const CREATORS_TIPS: Record<CreatorFormat, Tip[]> = {
  writing: [
    { label: copy.EducationGuideClient_s01.t148, text: copy.EducationGuideClient_s01.t149, prompt: copy.EducationGuideClient_s01.t150 },
    { text: copy.EducationGuideClient_s01.t151 },
    { text: copy.EducationGuideClient_s01.t152 },
    { label: copy.EducationGuideClient_s01.t153, text: copy.EducationGuideClient_s01.t154, prompt: copy.EducationGuideClient_s01.t155 },
    { label: copy.EducationGuideClient_s01.t156, text: copy.EducationGuideClient_s01.t157, prompt: copy.EducationGuideClient_s01.t158 },
    { text: copy.EducationGuideClient_s01.t159 },
    { label: copy.EducationGuideClient_s01.t160, text: copy.EducationGuideClient_s01.t161, prompt: copy.EducationGuideClient_s01.t162 },
    { text: copy.EducationGuideClient_s01.t163 },
    { label: copy.EducationGuideClient_s01.t164, text: copy.EducationGuideClient_s01.t165, prompt: copy.EducationGuideClient_s01.t166 },
    { label: copy.EducationGuideClient_s01.t167, isHabit: true, text: copy.EducationGuideClient_s01.t168 },
  ],
  video: [
    { label: copy.EducationGuideClient_s01.t169, text: copy.EducationGuideClient_s01.t170, prompt: copy.EducationGuideClient_s01.t171 },
    { label: copy.EducationGuideClient_s01.t172, text: copy.EducationGuideClient_s01.t173 },
    { label: copy.EducationGuideClient_s01.t174, text: copy.EducationGuideClient_s01.t175, prompt: copy.EducationGuideClient_s01.t176 },
    { label: copy.EducationGuideClient_s01.t177, text: copy.EducationGuideClient_s01.t178, prompt: copy.EducationGuideClient_s01.t179 },
    { text: copy.EducationGuideClient_s01.t180 },
    { text: copy.EducationGuideClient_s01.t181 },
    { text: copy.EducationGuideClient_s01.t182 },
    { text: copy.EducationGuideClient_s01.t183 },
    { text: copy.EducationGuideClient_s01.t184 },
    { text: copy.EducationGuideClient_s01.t185 },
  ],
  images: [
    { label: copy.EducationGuideClient_s01.t186, text: copy.EducationGuideClient_s01.t187, prompt: copy.EducationGuideClient_s01.t188 },
    { label: "remove.bg", text: copy.EducationGuideClient_s01.t189 },
    { text: copy.EducationGuideClient_s01.t190 },
    { label: copy.EducationGuideClient_s01.t191, text: copy.EducationGuideClient_s01.t192, prompt: copy.EducationGuideClient_s01.t193 },
    { label: copy.EducationGuideClient_s01.t194, text: copy.EducationGuideClient_s01.t195 },
    { text: copy.EducationGuideClient_s01.t196 },
    { label: copy.EducationGuideClient_s01.t197, text: copy.EducationGuideClient_s01.t198, prompt: copy.EducationGuideClient_s01.t199 },
    { text: copy.EducationGuideClient_s01.t200 },
    { text: copy.EducationGuideClient_s01.t201 },
    { label: copy.EducationGuideClient_s01.t202, text: copy.EducationGuideClient_s01.t203, prompt: copy.EducationGuideClient_s01.t204 },
    { text: copy.EducationGuideClient_s01.t205 },
  ],
};

const LEADERSHIP_TIPS: Tip[] = [
  { label: copy.EducationGuideClient_s01.t206, text: copy.EducationGuideClient_s01.t207, prompt: copy.EducationGuideClient_s01.t208 },
  { text: copy.EducationGuideClient_s01.t209 },
  { label: copy.EducationGuideClient_s01.t210, text: copy.EducationGuideClient_s01.t211, prompt: copy.EducationGuideClient_s01.t212 },
  { label: copy.EducationGuideClient_s01.t213, text: copy.EducationGuideClient_s01.t214, prompt: copy.EducationGuideClient_s01.t215 },
  { label: copy.EducationGuideClient_s01.t216, text: copy.EducationGuideClient_s01.t217, prompt: copy.EducationGuideClient_s01.t218 },
  { text: copy.EducationGuideClient_s01.t219 },
  { text: copy.EducationGuideClient_s01.t220 },
  { text: copy.EducationGuideClient_s01.t221 },
  { text: copy.EducationGuideClient_s01.t222 },
  { text: copy.EducationGuideClient_s01.t223 },
  { label: copy.EducationGuideClient_s01.t224, isHabit: true, text: copy.EducationGuideClient_s01.t225 },
];

/* ─── Config ──────────────────────────────────────────────────────── */

const AUDIENCES: { key: AudienceKey; label: string; num: string; accent: string }[] = [
  { key: "parents", label: copy.EducationGuideClient_s01.t226, num: "01", accent: "#F5B731" },
  { key: "educators", label: copy.EducationGuideClient_s01.t227, num: "02", accent: "#3b82f6" },
  { key: "creators", label: copy.EducationGuideClient_s01.t228, num: "03", accent: "#a855f7" },
  { key: "leadership", label: copy.EducationGuideClient_s01.t229, num: "04", accent: "#10b981" },
];

const STAGES: { key: ParentEducatorStage; label: string }[] = [
  { key: "pre-primary", label: copy.EducationGuideClient_s01.t230 },
  { key: "primary", label: copy.EducationGuideClient_s01.t231 },
  { key: "middle", label: copy.EducationGuideClient_s01.t232 },
  { key: "senior", label: copy.EducationGuideClient_s01.t233 },
];

const FORMATS: { key: CreatorFormat; label: string }[] = [
  { key: "writing", label: copy.EducationGuideClient_s01.t234 },
  { key: "video", label: copy.EducationGuideClient_s01.t235 },
  { key: "images", label: copy.EducationGuideClient_s01.t236 },
];

const HIGHLIGHT_TIP: Record<AudienceKey, { role: string; note: string }> = {
  parents: { role: copy.EducationGuideClient_s01.t237, note: copy.EducationGuideClient_s01.t238 },
  educators: { role: copy.EducationGuideClient_s01.t239, note: copy.EducationGuideClient_s01.t240 },
  creators: { role: copy.EducationGuideClient_s01.t241, note: copy.EducationGuideClient_s01.t242 },
  leadership: { role: copy.EducationGuideClient_s01.t243, note: copy.EducationGuideClient_s01.t244 },
};

const AUDIENCE_INTRO: Record<AudienceKey, string> = {
  parents: "AI at home works best as something you do with your child, not for them. These tips are grouped by school stage, since what's useful at 4 looks very different from what's useful at 16.",
  educators: "The fastest wins for teachers are almost always admin: lesson plans, worksheets, rubrics, and reports. That's time you get back for the part of teaching no tool can do. Pick your stage below.",
  creators: "Whether you're posting for the school or for yourself, AI should get you to a good first draft faster, not do the thinking for you. Pick the format you work in most.",
  leadership: "For school leaders, the job isn't picking the fanciest tool. It's setting clear, sensible ground rules so staff, students, and parents all know where AI helps and where it shouldn't be used.",
};

const PROMPT_PRINCIPLES = [
  {
    title: copy.EducationGuideClient_s01.t245,
    bad: copy.EducationGuideClient_s01.t246,
    good: copy.EducationGuideClient_s01.t247,
  },
  {
    title: copy.EducationGuideClient_s01.t248,
    bad: copy.EducationGuideClient_s01.t249,
    good: copy.EducationGuideClient_s01.t250,
  },
  {
    title: copy.EducationGuideClient_s01.t251,
    bad: copy.EducationGuideClient_s01.t252,
    good: copy.EducationGuideClient_s01.t253,
  },
  {
    title: copy.EducationGuideClient_s01.t254,
    bad: copy.EducationGuideClient_s01.t255,
    good: copy.EducationGuideClient_s01.t256,
  },
  {
    title: copy.EducationGuideClient_s01.t257,
    bad: copy.EducationGuideClient_s01.t258,
    good: copy.EducationGuideClient_s01.t259,
  },
];

const ABOUT_FAQ = [
  { q: copy.EducationGuideClient_s01.t260, a: copy.EducationGuideClient_s01.t261 },
  { q: copy.EducationGuideClient_s01.t262, a: copy.EducationGuideClient_s01.t263 },
  { q: copy.EducationGuideClient_s01.t264, a: copy.EducationGuideClient_s01.t265 },
  { q: copy.EducationGuideClient_s01.t266, a: copy.EducationGuideClient_s01.t267 },
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

function SectionEyebrow({ num, label, accent }: { num: string; label: string; accent: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm font-black tabular-nums" style={{ color: textTone(accent) }}>{num}</span>
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#71675E" }}>{label}</span>
    </div>
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
  size = "md",
}: {
  tabs: TabDef<T>[];
  active: T;
  onChange: (key: T) => void;
  ariaLabel: string;
  size?: "md" | "sm";
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

  const pad = size === "sm" ? "px-4 py-3 text-xs" : "px-5 py-2.5 text-sm";

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
            className={`lp-pop-in rounded-full font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${pad}`}
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

// Tips that name a specific tool/app get a bolder, accent-tinted "tool
// card" treatment (icon = a little app/grid glyph); tips that are more
// of a habit or mindset shift get a quieter, checkmark-style treatment.
// Same data, just grouped and styled so a flat list of 10 near-identical
// lines doesn't read as one undifferentiated dump.

function ToolIcon({ color }: { color: string }) {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2.2} aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function TipCard({ tip, accent, variant, delay = 0 }: { tip: Tip; accent: string; variant: "tool" | "practice"; delay?: number }) {
  const isTool = variant === "tool";
  const [showPrompt, setShowPrompt] = useState(false);
  return (
    <div
      className="card-fade-up tip-card-hover group rounded-2xl border p-5 shadow-sm hover:shadow-md"
      style={{
        ...(isTool ? { backgroundColor: `${accent}0A`, borderColor: `${accent}40` } : { backgroundColor: "#ffffff", borderColor: "#E8E2D9" }),
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-start gap-3.5">
        <span
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
          style={isTool ? { backgroundColor: `${accent}22`, border: `1px solid ${accent}55` } : { backgroundColor: "#F0FDF4", border: "1px solid rgba(16,185,129,0.3)" }}
        >
          {isTool ? <ToolIcon color={accent} /> : <CheckIcon color="#16A34A" />}
        </span>
        <div className="min-w-0 flex-1">
          {tip.label && <p className="mb-1 text-sm font-black leading-snug" style={{ color: "#0a0a0a" }}>{tip.label}</p>}
          <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{tip.text}</p>
          {tip.prompt && (
            <>
              <button
                type="button"
                onClick={() => setShowPrompt((v) => !v)}
                aria-expanded={showPrompt}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
                style={{ color: textTone(accent) }}
              >
                <svg className={`h-3 w-3 transition-transform ${showPrompt ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {showPrompt ? "Hide example prompt" : "See an example prompt"}
              </button>
              {showPrompt && (
                <div className="mt-3">
                  <CopyBlock text={tip.prompt} accent={accent} label="Example prompt" />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TipGroup({ heading, tips, accent, variant }: { heading: string; tips: Tip[]; accent: string; variant: "tool" | "practice" }) {
  if (tips.length === 0) return null;
  return (
    <div className="mb-8">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: variant === "tool" ? textTone(accent) : "#166534" }}>{heading}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tips.map((tip, i) => (
          <TipCard key={i} tip={tip} accent={accent} variant={variant} delay={i * 45} />
        ))}
      </div>
    </div>
  );
}

function TipGrid({ tips, accent }: { tips: Tip[]; accent: string }) {
  const toolTips = tips.filter((t) => t.label && !t.isHabit);
  const practiceTips = tips.filter((t) => !t.label || t.isHabit);
  return (
    <div>
      <TipGroup heading="Tools & apps to try" tips={toolTips} accent={accent} variant="tool" />
      <TipGroup heading="Habits worth building" tips={practiceTips} accent={accent} variant="practice" />
    </div>
  );
}

function HighlightCallout({ role, note, accent }: { role: string; note: string; accent: string }) {
  return (
    <div className="card-fade-up mt-8 rounded-2xl border p-6 sm:p-8" style={{ backgroundColor: `${accent}0D`, borderColor: `${accent}4D`, animationDelay: "180ms" }}>
      <div className="flex items-start gap-4">
        <span className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full" aria-hidden="true">
          <span
            className="absolute inset-0 rounded-full"
            style={{ border: `1.5px solid ${accent}99`, animation: "lp-radar-ping 2.4s cubic-bezier(0.22,1,0.36,1) infinite" }}
          />
          <span
            className="relative flex h-11 w-11 items-center justify-center rounded-full"
            style={{ backgroundColor: `${accent}22`, border: `1px solid ${accent}55` }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
        </span>
        <div>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: textTone(accent) }}>{role}</p>
          <p className="text-base font-semibold leading-relaxed" style={{ color: "#0a0a0a" }}>{note}</p>
        </div>
      </div>
    </div>
  );
}

function PromptPrincipleCard({ num, title, bad, good }: { num: string; title: string; bad: string; good: string }) {
  return (
    <div className="tip-card-hover group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-block text-sm font-black tabular-nums transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" style={{ color: "#71675E" }}>{num}</span>
        <h3 className="text-base font-black" style={{ color: "#0a0a0a" }}>{title}</h3>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.18)" }}>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: "#DC2626" }}>{copy.EducationGuideClient_s01.t268}</p>
          <p className="text-sm italic leading-relaxed" style={{ color: "#52525B" }}>&ldquo;{bad}&rdquo;</p>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(16,163,74,0.06)", border: "1px solid rgba(16,163,74,0.22)" }}>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: "#166534" }}>{copy.EducationGuideClient_s01.t269}</p>
          <p className="text-sm leading-relaxed" style={{ color: "#0a0a0a" }}>&ldquo;{good}&rdquo;</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ───────────────────────────────────────────────────── */

export default function EducationGuideClient() {
  const [audience, setAudience] = useState<AudienceKey>("parents");
  const [stage, setStage] = useState<ParentEducatorStage>("primary");
  const [format, setFormat] = useState<CreatorFormat>("writing");
  const hydrated = useRef(false);

  // Restore state from a shareable URL hash like #parents/primary or
  // #creators/video on first load, so a link to a specific tab actually
  // opens on that tab. Also listens for hashchange so a hash edited or
  // re-navigated to within an already-open tab (not just a fresh load)
  // updates the view too.
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      const [a, sub] = hash.split("/");
      if (a && AUDIENCES.some((x) => x.key === a)) {
        setAudience(a as AudienceKey);
        if (sub) {
          if (STAGES.some((s) => s.key === sub)) setStage(sub as ParentEducatorStage);
          else if (FORMATS.some((f) => f.key === sub)) setFormat(sub as CreatorFormat);
        }
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  // Keep the hash in sync (replaceState, not pushState, so tab clicks
  // don't spam the browser's back button) so the current view is always
  // shareable as a link.
  useEffect(() => {
    if (!hydrated.current) { hydrated.current = true; return; }
    let hash = audience as string;
    if (audience === "parents" || audience === "educators") hash += `/${stage}`;
    if (audience === "creators") hash += `/${format}`;
    window.history.replaceState(null, "", `#${hash}`);
  }, [audience, stage, format]);

  const activeAudience = useMemo(() => AUDIENCES.find((a) => a.key === audience)!, [audience]);

  const activeTips: Tip[] = useMemo(() => {
    if (audience === "parents") return PARENTS_TIPS[stage];
    if (audience === "educators") return EDUCATORS_TIPS[stage];
    if (audience === "creators") return CREATORS_TIPS[format];
    return LEADERSHIP_TIPS;
  }, [audience, stage, format]);

  const totalTips = useMemo(() => {
    const count = (r: Record<string, Tip[]>) => Object.values(r).reduce((sum, arr) => sum + arr.length, 0);
    return count(PARENTS_TIPS) + count(EDUCATORS_TIPS) + count(CREATORS_TIPS) + LEADERSHIP_TIPS.length;
  }, []);

  return (
    <InnerLayout>
    <div style={{ backgroundColor: "#F8F6F2" }}>
      <ScrollProgress />
      <BackToTop />
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pb-12 pt-32">
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.22) 0%, rgba(217,119,6,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none", animation: "lp-float 10s ease-in-out infinite" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.16) 0%, rgba(37,99,235,0.06) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none", animation: "lp-float 12s ease-in-out infinite reverse" }} />
        <span className="lp-float-icon lp-pop-in hidden sm:block text-3xl" aria-hidden="true" style={{ top: "28%", left: "8%", animationDelay: "0.2s", ["--lp-rot" as any]: "-10deg" }}>🤖</span>
        <span className="lp-float-icon lp-pop-in hidden sm:block text-2xl" aria-hidden="true" style={{ top: "62%", left: "5%", animationDelay: "1.5s", ["--lp-rot" as any]: "8deg" }}>✨</span>
        <span className="lp-float-icon lp-pop-in hidden sm:block text-3xl" aria-hidden="true" style={{ top: "32%", right: "7%", animationDelay: "0.9s", ["--lp-rot" as any]: "10deg" }}>💡</span>
        <span className="lp-float-icon lp-pop-in hidden sm:block text-2xl" aria-hidden="true" style={{ top: "64%", right: "10%", animationDelay: "2.2s", ["--lp-rot" as any]: "-6deg" }}>📚</span>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 hero-fade" style={{ borderColor: "rgba(245,183,49,0.35)", backgroundColor: "rgba(245,183,49,0.07)" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#F5B731", animation: "lp-radar-ping 2.4s cubic-bezier(0.22,1,0.36,1) infinite" }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>{copy.EducationGuideClient_s01.t270}</span>
          </div>
          <h1 className="mb-4 text-4xl font-black leading-tight sm:text-6xl hero-fade-d1" style={{ color: "#0a0a0a" }}>{copy.EducationGuideClient_s01.t271}</h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed sm:text-lg hero-fade-d2" style={{ color: "#52525B" }}>{copy.EducationGuideClient_s01.t272}</p>

          <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-4 hero-fade-d3">
            {[
              { v: String(totalTips) + "+", l: copy.EducationGuideClient_s01.t273 },
              { v: "5", l: copy.EducationGuideClient_s01.t274 },
              { v: "16", l: copy.EducationGuideClient_s01.t275 },
            ].map((s) => (
              <div key={s.l} className="lp-stat">
                <StatTicker value={s.v} className="text-3xl font-black" style={{ color: "#0a0a0a" }} />
                <p className="mt-1 text-xs font-semibold" style={{ color: "#71675E" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Tejas ──────────────────────────────────────── */}
      <section className="border-t px-4 py-14" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <FadeIn className="mx-auto block max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 items-start">
            <div className="relative mx-auto h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl border sm:mx-0" style={{ backgroundColor: "#EDE9E4", borderColor: "#E8E2D9" }}>
              <Image src="/tejas-2.png" alt={copy.EducationGuideClient_s01.t276} fill sizes="160px" className="object-cover object-top" />
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>{copy.EducationGuideClient_s01.t277}</p>
              <h2 className="mb-1 text-xl font-black" style={{ color: "#0a0a0a" }}>{copy.EducationGuideClient_s02.t01}</h2>
              <p className="mb-4 text-sm" style={{ color: "#71675E" }}>{copy.EducationGuideClient_s02.t02}</p>
              <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#52525B" }}>
                <p>{copy.EducationGuideClient_s02.t03}</p>
                <p>{copy.EducationGuideClient_s02.t04}</p>
                <p>{copy.EducationGuideClient_s02.t05}</p>
                <p>{copy.EducationGuideClient_s02.t06}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── Audience selector ────────────────────────────────── */}
      <section className="border-t px-4 py-10" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest" style={{ color: "#71675E" }}>{copy.EducationGuideClient_s02.t07}</p>
          <div className="flex justify-center">
            <TabGroup tabs={AUDIENCES.map((a) => ({ key: a.key, label: a.label }))} active={audience} onChange={setAudience} ariaLabel="Choose your audience" />
          </div>
        </div>
      </section>

      {/* ─── Content ──────────────────────────────────────────── */}
      <section className="px-4 py-14">
        <FadeIn key={audience} className="mx-auto max-w-4xl block">
          <SectionEyebrow num={activeAudience.num} label={activeAudience.label} accent={activeAudience.accent} />
          <h2 className="mb-3 text-2xl font-black sm:text-3xl" style={{ color: "#0a0a0a" }}>
            {audience === "parents" && "AI tips for parents, by school stage"}
            {audience === "educators" && "AI tips for educators, by school stage"}
            {audience === "creators" && "AI tips for content creators, by format"}
            {audience === "leadership" && "AI tips for schools and leadership teams"}
          </h2>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed" style={{ color: "#52525B" }}>{AUDIENCE_INTRO[audience]}</p>

          {(audience === "parents" || audience === "educators") && (
            <div
              id={`panel-${audience}`}
              role="tabpanel"
              aria-labelledby={`tab-${audience}`}
              className="mb-8"
            >
              <TabGroup tabs={STAGES} active={stage} onChange={setStage} ariaLabel="Choose school stage" size="sm" />
            </div>
          )}

          {audience === "creators" && (
            <div id="panel-creators" role="tabpanel" aria-labelledby="tab-creators" className="mb-8">
              <TabGroup tabs={FORMATS} active={format} onChange={setFormat} ariaLabel="Choose content format" size="sm" />
            </div>
          )}

          <TipGrid key={`tips-${audience}-${stage}-${format}`} tips={activeTips} accent={activeAudience.accent} />

          <HighlightCallout key={`highlight-${audience}-${stage}-${format}`} {...HIGHLIGHT_TIP[audience]} accent={activeAudience.accent} />
        </FadeIn>
      </section>

      {/* ─── Effective prompting ──────────────────────────────── */}
      <section className="border-t px-4 py-14" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <FadeIn className="mx-auto block max-w-4xl">
          <SectionEyebrow num="05" label="How to prompt effectively" accent="#0a0a0a" />
          <h2 className="mb-3 text-2xl font-black sm:text-3xl" style={{ color: "#0a0a0a" }}>{copy.EducationGuideClient_s03.t01}</h2>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed" style={{ color: "#52525B" }}>{copy.EducationGuideClient_s03.t02}</p>
          <div className="grid grid-cols-1 gap-4">
            {PROMPT_PRINCIPLES.map((p, i) => (
              <FadeIn key={p.title} delay={i * 70}>
                <PromptPrincipleCard num={`0${i + 1}`} title={p.title} bad={p.bad} good={p.good} />
              </FadeIn>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border p-6 sm:p-8" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.3)" }}>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>{copy.EducationGuideClient_s03.t03}</p>
            <p className="text-base font-semibold leading-relaxed" style={{ color: "#0a0a0a" }}>{copy.EducationGuideClient_s03.t04}</p>
            <p className="mt-3 text-sm italic leading-relaxed" style={{ color: "#52525B" }}>{copy.EducationGuideClient_s03.t05}</p>
          </div>
        </FadeIn>
      </section>

      {/* ─── About this guide (accordion) ─────────────────────── */}
      <Faq badge="Good to know" title={copy.EducationGuideClient_s03.t06} items={ABOUT_FAQ} />
    </div>
    </InnerLayout>
  );
}
