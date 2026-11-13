"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Faq from "@/app/lp/Faq";
import FadeIn from "@/app/components/FadeIn";
import StatTicker from "@/app/components/StatTicker";
import InnerLayout from "@/app/components/InnerLayout";
import { textTone } from "@/lib/colors";

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
  { text: "Clear, good-quality photo." },
  { text: "Looking at the camera." },
  { text: "The same profile picture across every social channel, it's your logo, don't change it often." },
];

const ABOUT_SECTION_CHECKLIST: Tip[] = [
  { text: "Write in 1st person." },
  { text: "Who are you." },
  { text: "What are you interested in." },
  { text: "What you've done, or are working on right now." },
];

const FEATURED_SECTION_CHECKLIST: Tip[] = [
  { text: "Add a link to a resume website, make one in an afternoon with Claude Code or Lovable." },
  { text: "Make a Loom video introducing yourself and how you can help in your area of expertise." },
  { text: "Pin a post where you've shared real thoughts on a topic you care about." },
];

const NO_EXPERIENCE_CHECKLIST: Tip[] = [
  { text: "An internship, even a short or unpaid one." },
  { text: "College fests you helped organize or ran a stall for." },
  { text: "Freelance gigs, however small." },
  { text: "A self-started project, built for no one but yourself." },
  { text: "Even a newsletter or one genuinely good piece of content counts." },
];

const OUTREACH_SEQUENCE: { step: string; title: string; delay: string }[] = [
  { step: "", title: "Visit the profile", delay: "Day 0" },
  { step: "", title: "Like & comment on their last post", delay: "Same day" },
  { step: "", title: "Send a hyper-personalised connection note", delay: "+1 day" },
  { step: "1", title: "Ask an open-ended question", delay: "+1 day" },
  { step: "2", title: "Build trust with a Loom video or voice note", delay: "+3 days" },
  { step: "3", title: "Come to the point, how you can help", delay: "+5 days" },
  { step: "4", title: "Share a free resource", delay: "+7 days" },
  { step: "", title: "Withdraw the request and retarget later", delay: "+15 days" },
];

const OUTREACH_LIMITS: Tip[] = [
  { label: "Connection requests", text: "40-50 a day. Warm, established accounts can stretch to around 70." },
  { label: "Messages", text: "150-200 a day." },
  { label: "InMails", text: "Use every credited InMail you get (Premium: 15-18, Sales Nav: 50), plus any free InMails available." },
  { label: "Always ramp up gradually", text: "No sudden spikes. Over-automated outreach is the single most common reason a LinkedIn account gets banned outright." },
];

const TOOLS: Record<ToolCategory, Tool[]> = {
  jobs: [
    { name: "LinkedIn", blurb: "Network + the broadest listings.", url: "https://www.linkedin.com/jobs" },
    { name: "Indeed", blurb: "Volume across every industry.", url: "https://www.indeed.com" },
    { name: "Wellfound", blurb: "Startup roles, salaries upfront.", url: "https://wellfound.com" },
    { name: "Remote OK", blurb: "Remote-only, no location filter.", url: "https://remoteok.com" },
    { name: "Y Combinator", blurb: "Work at a Startup job board.", url: "https://www.ycombinator.com/jobs" },
  ],
  resume: [
    { name: "Teal", blurb: "Tailors your resume to each job post.", url: "https://www.tealhq.com" },
    { name: "Novoresume", blurb: "Tight, clean one-page templates.", url: "https://novoresume.com" },
    { name: "Kickresume", blurb: "AI drafting plus cover letters.", url: "https://www.kickresume.com" },
    { name: "Canva Resume", blurb: "Design-led, but watch the ATS.", url: "https://www.canva.com/resumes/" },
    { name: "FlowCV", blurb: "Free, with a clean PDF export.", url: "https://flowcv.com" },
  ],
  interview: [
    { name: "LeetCode", blurb: "Coding drills.", url: "https://leetcode.com" },
    { name: "HackerRank", blurb: "The employer test format.", url: "https://www.hackerrank.com" },
    { name: "interviewing.io", blurb: "Mock rounds with real engineers.", url: "https://interviewing.io" },
    { name: "Exponent", blurb: "PM, data, and system design prep.", url: "https://www.tryexponent.com" },
    { name: "Glassdoor", blurb: "Reviews plus reported questions.", url: "https://www.glassdoor.com" },
    { name: "Levels.fyi", blurb: "Comp data before you negotiate.", url: "https://www.levels.fyi" },
  ],
  portfolio: [
    { name: "GitHub", blurb: "Code, plus a real README.", url: "https://github.com" },
    { name: "Kaggle", blurb: "Notebooks and competitions.", url: "https://www.kaggle.com" },
    { name: "Hugging Face", blurb: "Spaces demos and models.", url: "https://huggingface.co" },
    { name: "Devpost", blurb: "Hackathon projects, dated.", url: "https://devpost.com" },
    { name: "Notion Portfolio", blurb: "Free templates, one shareable link.", url: "https://www.notion.so" },
    { name: "Vercel", blurb: "Deploy a live demo URL.", url: "https://vercel.com" },
  ],
  learn: [
    { name: "Coursera", blurb: "Google & Meta certificates.", url: "https://www.coursera.org" },
    { name: "edX", blurb: "University courses, auditable free.", url: "https://www.edx.org" },
    { name: "DeepLearning.AI", blurb: "Short AI courses, free.", url: "https://www.deeplearning.ai" },
    { name: "freeCodeCamp", blurb: "Free and project-based.", url: "https://www.freecodecamp.org" },
    { name: "LinkedIn Learning", blurb: "Badges land right on your profile.", url: "https://www.linkedin.com/learning" },
    { name: "Udacity", blurb: "Nanodegrees with real reviews.", url: "https://www.udacity.com" },
    { name: "Udemy", blurb: "Cheap on sale, tool-specific.", url: "https://www.udemy.com" },
    { name: "DataCamp", blurb: "SQL, Python, and analytics.", url: "https://www.datacamp.com" },
  ],
  reviews: [
    { name: "Glassdoor", blurb: "Interview questions are the gold here.", url: "https://www.glassdoor.com" },
    { name: "AmbitionBox", blurb: "The deepest data on Indian firms.", url: "https://www.ambitionbox.com" },
    { name: "Indeed Reviews", blurb: "Reviews sit right next to the listing.", url: "https://www.indeed.com/companies" },
    { name: "Comparably", blurb: "Culture and leadership, US-skewed.", url: "https://www.comparably.com" },
    { name: "Blind", blurb: "Anonymous, blunt, tech-heavy.", url: "https://www.teamblind.com" },
    { name: "Fishbowl", blurb: "Industry chatter, sorted by field.", url: "https://www.fishbowlapp.com" },
  ],
};

const CATEGORIES: { key: ToolCategory; label: string }[] = [
  { key: "jobs", label: "Find Jobs" },
  { key: "resume", label: "Resume" },
  { key: "interview", label: "Interview Prep" },
  { key: "portfolio", label: "Portfolio" },
  { key: "learn", label: "Learn Skills" },
  { key: "reviews", label: "Reviews & Culture" },
];

const ABOUT_FAQ = [
  { q: "Who is this toolkit for?", a: "Anyone early in their career: students and recent graduates looking for internships, jobs or their first real break, who want a practical, no-fluff starting point. It assumes no prior experience with LinkedIn, cold outreach or AI tools, and every section can be used on its own." },
  { q: "Do I need an existing LinkedIn presence or portfolio?", a: "No. Every fix and tool here is meant to be usable the same day, whether you're starting from a blank profile or already have one you want to sharpen. If you are starting from zero, begin with the LinkedIn profile section, because recruiters usually check it before replying to you." },
  { q: "Is this list exhaustive?", a: "No. It is intentionally a quick-start, not a full course: a solid set of starting points across six areas, not the final word on any one tool. Pick the area where you are weakest, use it for a week, and come back for the next one once that habit sticks." },
  { q: "Who put this together?", a: "Myntmore, a B2B outbound agency based in Mumbai. It grew out of a college workshop we ran on LinkedIn, cold outreach and the AI tools that speed up a job search. The same principles we use to start sales conversations for clients apply to starting conversations with employers." },
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
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>A Myntmore career guide</span>
          </div>
          <h1 className="mb-4 text-4xl font-black leading-tight sm:text-6xl hero-fade-d1" style={{ color: "#0a0a0a" }}>
            Career Jumpstart Toolkit
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed sm:text-lg hero-fade-d2" style={{ color: "#52525B" }}>
            A practical playbook for landing internships, jobs, and your first break: LinkedIn fixes, an outreach playbook, and a curated job-search tool directory.
          </p>

          <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-4 hero-fade-d3">
            {[
              { v: String(totalTools) + "+", l: "Tools curated" },
              { v: "6", l: "Categories" },
              { v: "3 weeks", l: "Outreach cadence" },
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
          <h2 className="mb-3 text-2xl font-black sm:text-3xl" style={{ color: "#0a0a0a" }}>
            Make your LinkedIn profile shiny
          </h2>
          <p className="mb-2 max-w-2xl text-sm leading-relaxed" style={{ color: "#52525B" }}>
            None of the outreach tactics below matter if the profile someone lands on afterward looks unfinished. Fix these five things first.
          </p>

          <ProfileSubsection num="1" title="Profile picture" tips={PROFILE_PICTURE_CHECKLIST} accent="#3b82f6" />
          <ProfileSubsection
            num="2"
            title="Banner & headline"
            intro="Your banner is a billboard, not decoration: lead with what you do and the outcome you create, no guesswork. Your headline should stack role, expertise, and one notable credential."
            tips={[{ text: "Example structure: Role @ Company | Your specific expertise | A notable credential (an exit, a school, a title) | What you're open to." }]}
            accent="#3b82f6"
          />
          <ProfileSubsection num="3" title="The About section" tips={ABOUT_SECTION_CHECKLIST} accent="#3b82f6" />
          <ProfileSubsection num="4" title="The Featured section" tips={FEATURED_SECTION_CHECKLIST} accent="#3b82f6" />
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
          <h2 className="mb-3 text-2xl font-black sm:text-3xl" style={{ color: "#0a0a0a" }}>
            How to actually get a reply
          </h2>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed" style={{ color: "#52525B" }}>
            A polished profile gets you noticed. These are the tactics that get you a reply once you've reached out.
          </p>

          <FadeIn className="mb-8 block">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: "🎙️", title: "Voice notes", text: "A 20-second personalised voice note can push reply rates from 30% up to 75%." },
                { icon: "🎥", title: "Loom video edge", text: "A problem statement plus a 45-second Loom video on how you can help gets 3x the click-through of text alone, and roughly 1 in 3 viewers book a call." },
                { icon: "😄", title: "Pattern disruption", text: "A well-placed, personalised meme or bit of humour after a couple of unanswered follow-ups can be exactly the pattern-interrupt that finally gets a reply." },
                { icon: "⏰", title: "The timing advantage", text: "It's not just what you send, it's when. Hitting someone's \"morning scroll window,\" coffee, commute, or meeting prep, instead of just whenever you're free, can roughly double reply rates." },
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
            <h3 className="mb-4 text-lg font-black" style={{ color: "#0a0a0a" }}>A full outreach sequence, timed out</h3>
            <div className="grid grid-cols-1 gap-3">
              {OUTREACH_SEQUENCE.map((item, i) => (
                <SequenceRow key={item.title} item={item} delay={i * 45} />
              ))}
            </div>
            <p className="mt-5 max-w-2xl text-xs leading-relaxed" style={{ color: "#71675E" }}>
              If a withdrawn request still gets no response, wait roughly three weeks, then retarget from the top.
            </p>
          </FadeIn>

          <FadeIn className="block">
            <h3 className="mb-4 text-lg font-black" style={{ color: "#0a0a0a" }}>Daily limits worth respecting</h3>
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
          <h2 className="mb-3 text-2xl font-black sm:text-3xl" style={{ color: "#0a0a0a" }}>
            A curated tool directory, by category
          </h2>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed" style={{ color: "#52525B" }}>
            Every tool below was picked for a reason, not just a long list. Pick a category to jump in.
          </p>

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
      <Faq badge="Good to know" title="About this toolkit" items={ABOUT_FAQ} />
    </div>
    </InnerLayout>
  );
}
