"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { caveat } from "@/app/fonts/caveat";
import {
  Lock, Blocks, Bot, ChartColumn, Rocket, UserCog, Handshake,
  Play, Pause, Check, Plus, Minus, X, ArrowRight, RotateCcw, Upload,
  type LucideIcon,
} from "lucide-react";
import InnerLayout from "../../components/InnerLayout";
import FadeIn from "../../components/FadeIn";
import JsonLd from "../../components/JsonLd";
import Breadcrumbs from "../../components/Breadcrumbs";
import { LinkedInIcon } from "../../components/ContactIcons";
import { buildServiceSchema, buildHowToSchema, buildFaqSchema, SITE_URL } from "@/lib/schema";
import { pageFaqsQA } from "@/lib/page-faqs";
import d from "@/content/service-copy/do-it-yourself.json";

// This page books a product demo with the DIY tool's owner, not the founder
// call at /book-a-call that every other service page uses.
const CALENDLY_URL = "/book-a-call";

// Caveat is imported here rather than loaded site-wide (same reasoning as the
// homepage Hero): only the handwritten annotation sections below use it.

const ACCENT = "#7C3AED";
const GOLD_TEXT = "#A14A08";
const FOCUS = "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const SERVICE_SCHEMA = buildServiceSchema({
  name: d.schema.name,
  description: d.schema.description,
  serviceType: d.schema.serviceType,
  url: `${SITE_URL}/services/do-it-yourself`,
});

/* ─── Data ──────────────────────────────────────────────────── */

const STEPS = d.howItWorks.steps.map((s) => ({ n: s.number, title: s.title, desc: s.description }));

const HOWTO_SCHEMA = buildHowToSchema(
  "How the Do It Yourself LinkedIn Outreach Tool Works",
  STEPS.map((s) => ({ name: s.title, text: s.desc }))
);

/* ─── Interactive demo data ───────────────────────────────────── */

const DEMO_LEADS = [
  "Priya Sharma · VP Sales, Finstack",
  "Rohan Mehta · Founder, Kwikcart",
  "Alex Chen · Head of Growth, Helio",
  "Meera Iyer · CRO, Vaultline",
  "Tom Walsh · VP Marketing, Nexbridge",
];

const DEMO_CAMPAIGN_NAME = "Q1 SaaS Founders Outreach";

const DEFAULT_NOTE = "Hi {{firstName}}, I help B2B teams build predictable outbound pipelines. Would love to connect and swap notes on what's working for you.";

type LeadStatus = "queued" | "invited" | "connected" | "replied";

const STATUS_STYLE: Record<LeadStatus, { label: string; bg: string; color: string }> = {
  queued: { label: "Queued", bg: "#F1F5F9", color: "#475569" },
  invited: { label: "Invited", bg: "#FEF9EC", color: GOLD_TEXT },
  connected: { label: "Connected", bg: "#EFF6FF", color: "#0A66C2" },
  replied: { label: "Replied", bg: "#F0FDF4", color: "#15803D" },
};

const FEATURE_ICONS: LucideIcon[] = [Lock, Blocks, Bot, ChartColumn];

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = d.features.items.map((f, i) => ({ icon: FEATURE_ICONS[i], title: f.title, desc: f.description }));

const DELIVERABLES = d.deliverables.items;

const WHO_FOR_ICONS: LucideIcon[] = [Rocket, UserCog, Handshake];

const WHO_FOR: { icon: LucideIcon; title: string; desc: string }[] = d.whoFor.items.map((w, i) => ({ icon: WHO_FOR_ICONS[i], title: w.title, desc: w.description }));

const DASHBOARD_METRICS = d.dashboard.metrics.map((m) => ({ title: m.title, desc: m.description }));

const FAQ_ITEMS = pageFaqsQA("service-do-it-yourself");

const FAQ_SCHEMA = buildFaqSchema(FAQ_ITEMS.map((f) => ({ question: f.q, answer: f.a })));

const CAPABILITY_CHIPS = d.capabilityMarquee.chips;

type DriftPath = (t: number) => [number, number];

const HERO_DRIFT: DriftPath[] = [
  (t) => [Math.sin(t * 0.65) * 210 + Math.sin(t * 0.28) * 75, Math.cos(t * 0.5) * 145 + Math.cos(t * 0.2) * 55],
  (t) => [Math.sin(t * 0.55 + 2) * 210 + Math.cos(t * 0.38) * 72, Math.cos(t * 0.72 + 1) * 145 + Math.sin(t * 0.32) * 52],
  (t) => [Math.sin(t * 0.5 + 4) * 185 + Math.sin(t * 0.33) * 62, Math.cos(t * 0.62 + 2) * 165 + Math.cos(t * 0.43) * 52],
];

const CTA_DRIFT: DriftPath[] = [
  (t) => [Math.sin(t * 0.75) * 310 + Math.sin(t * 0.28) * 92, Math.cos(t * 0.58) * 135 + Math.cos(t * 0.22) * 58],
  (t) => [Math.sin(t * 0.68 + 2) * 310 + Math.cos(t * 0.38) * 92, Math.cos(t * 0.78 + 1) * 135 + Math.sin(t * 0.33) * 58],
];

/* ─── Hooks ─────────────────────────────────────────────────── */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/* True while the element is on screen and the tab is visible */
function useIsActive<T extends Element>(ref: React.RefObject<T>) {
  const [active, setActive] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let intersecting = true;
    const sync = () => setActive(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; sync(); }, { threshold: 0.1 });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, [ref]);
  return active;
}

/* Drifts the blurred background blobs; resumes from where it paused */
function useDrift(active: boolean, refs: React.RefObject<HTMLDivElement>[], paths: DriftPath[]) {
  const elapsed = useRef(0);
  useEffect(() => {
    if (!active || window.innerWidth < 768) return;
    let id: number;
    const t0 = performance.now() - elapsed.current * 1000;
    function loop() {
      const t = (performance.now() - t0) / 1000;
      elapsed.current = t;
      refs.forEach((r, i) => {
        if (!r.current) return;
        const [x, y] = paths[i](t);
        r.current.style.transform = `translate(${x}px, ${y}px)`;
      });
      id = requestAnimationFrame(loop);
    }
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
    // refs and paths are stable for the component's lifetime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}

/* ─── Sub-components ─────────────────────────────────────────── */

function Eyebrow({ children, tone = "purple" }: { children: React.ReactNode; tone?: "purple" | "gold" }) {
  const style = tone === "purple"
    ? { backgroundColor: "rgba(124,58,237,0.08)", color: ACCENT, border: "1px solid rgba(124,58,237,0.2)" }
    : { backgroundColor: "#FEF9EC", color: GOLD_TEXT, border: "1px solid rgba(245,183,49,0.3)" };
  return (
    <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={style}>
      {children}
    </span>
  );
}

function IconTile({ icon: Icon, size = "lg" }: { icon: LucideIcon; size?: "lg" | "sm" }) {
  const box = size === "lg" ? "w-11 h-11 rounded-xl" : "w-10 h-10 rounded-lg";
  return (
    <span className={`${box} flex-shrink-0 flex items-center justify-center`} style={{ backgroundColor: "rgba(124,58,237,0.1)", color: ACCENT }}>
      <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
    </span>
  );
}

function AccordionItem({ q, a, open, onToggle, index }: { q: string; a: string; open: boolean; onToggle: () => void; index: number }) {
  return (
    <div
      className="border rounded-xl overflow-hidden transition-colors duration-300"
      style={open
        ? { borderColor: "rgba(124,58,237,0.4)", borderLeftColor: ACCENT, borderLeftWidth: "3px", backgroundColor: "rgba(124,58,237,0.04)" }
        : { borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-6 py-5 text-left gap-4 ${FOCUS}`}
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="text-base font-bold" style={{ color: "#0a0a0a" }}>{q}</span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
          style={{ backgroundColor: open ? "rgba(124,58,237,0.12)" : "#F8F6F2" }}>
          <Plus className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-45" : ""}`} strokeWidth={2.5} aria-hidden="true" style={{ color: open ? ACCENT : "#71675E" }} />
        </span>
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        aria-hidden={!open}
        className="grid transition-[grid-template-rows] duration-300"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#52525B" }}>{a}</p>
        </div>
      </div>
    </div>
  );
}

function CapabilityChip({ label, i }: { label: string; i: number }) {
  const isPurple = i % 2 === 0;
  return (
    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap border flex-shrink-0"
      style={{
        background: isPurple ? "linear-gradient(135deg,#fff 0%,#F5F3FF 100%)" : "linear-gradient(135deg,#fff 0%,#FEF9EC 100%)",
        borderColor: isPurple ? "rgba(124,58,237,0.3)" : "rgba(245,183,49,0.35)",
        color: "#1a1a1a",
        boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
      }}>
      <span className="w-2 h-2 rounded-sm flex-shrink-0" aria-hidden="true" style={{ backgroundColor: isPurple ? ACCENT : "#D97706" }} />
      {label}
    </span>
  );
}

function StatusPill({ status }: { status: LeadStatus }) {
  const s = STATUS_STYLE[status];
  return (
    <span className="flex-shrink-0 text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full" style={{ backgroundColor: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

function StepperButton({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-label={label}
      className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-[#F5F3FF] ${FOCUS}`}
      style={{ backgroundColor: "#F8F6F2", color: ACCENT }}>
      {children}
    </button>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function DoItYourselfClient() {
  const reducedMotion = usePrefersReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);
  const ctaBlob1 = useRef<HTMLDivElement>(null);
  const ctaBlob2 = useRef<HTMLDivElement>(null);

  const heroActive = useIsActive(heroRef);
  const ctaActive = useIsActive(ctaRef);
  const demoActive = useIsActive(demoRef);

  useDrift(heroActive && !reducedMotion, [blob1, blob2, blob3], HERO_DRIFT);
  useDrift(ctaActive && !reducedMotion, [ctaBlob1, ctaBlob2], CTA_DRIFT);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* Interactive campaign-builder demo */
  const [demoStep, setDemoStep] = useState(1);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [leadsUploaded, setLeadsUploaded] = useState(false);
  const [note, setNote] = useState(DEFAULT_NOTE);
  const [followUps, setFollowUps] = useState([{ id: 1, day: 3 }, { id: 2, day: 7 }]);
  const [launched, setLaunched] = useState(false);
  const [leadStatuses, setLeadStatuses] = useState<LeadStatus[]>(Array(DEMO_LEADS.length).fill("queued"));
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (reducedMotion) setAutoPlay(false);
  }, [reducedMotion]);

  function stopAutoPlay() {
    setAutoPlay(false);
  }

  /* Drives the demo forward on its own while it's on screen, until someone touches it */
  useEffect(() => {
    if (!autoPlay || !demoActive) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (demoStep === 1) {
      if (!linkedinConnected) timers.push(setTimeout(() => setLinkedinConnected(true), 1100));
      else timers.push(setTimeout(() => setDemoStep(2), 1100));
    } else if (demoStep === 2) {
      if (campaignName.length < DEMO_CAMPAIGN_NAME.length) {
        timers.push(setTimeout(() => setCampaignName(DEMO_CAMPAIGN_NAME.slice(0, campaignName.length + 1)), 45));
      } else {
        timers.push(setTimeout(() => setDemoStep(3), 1400));
      }
    } else if (demoStep === 3) {
      if (!leadsUploaded) timers.push(setTimeout(() => setLeadsUploaded(true), 900));
      else timers.push(setTimeout(() => setDemoStep(4), 1600));
    } else if (demoStep === 4) {
      timers.push(setTimeout(() => setDemoStep(5), 2600));
    } else if (demoStep === 5) {
      timers.push(setTimeout(() => setDemoStep(6), 2600));
    } else if (demoStep === 6) {
      if (!launched) timers.push(setTimeout(() => setLaunched(true), 1200));
      else timers.push(setTimeout(() => resetDemo(), 6200));
    }

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, demoActive, demoStep, linkedinConnected, campaignName, leadsUploaded, launched]);

  useEffect(() => {
    if (!launched) return;
    let ticks = 0;
    const interval = setInterval(() => {
      ticks += 1;
      setLeadStatuses((prev) => prev.map((s) => {
        if (s === "queued" && Math.random() < 0.9) return "invited";
        if (s === "invited" && Math.random() < 0.7) return "connected";
        if (s === "connected" && Math.random() < 0.45) return "replied";
        return s;
      }));
      if (ticks >= 6) clearInterval(interval);
    }, 850);
    return () => clearInterval(interval);
  }, [launched]);

  function addFollowUp() {
    stopAutoPlay();
    setFollowUps((prev) => (prev.length >= 4 ? prev : [...prev, { id: Date.now(), day: (prev[prev.length - 1]?.day ?? 0) + 4 }]));
  }
  function removeFollowUp(id: number) {
    stopAutoPlay();
    setFollowUps((prev) => (prev.length <= 1 ? prev : prev.filter((f) => f.id !== id)));
  }
  function adjustDelay(id: number, delta: number) {
    stopAutoPlay();
    setFollowUps((prev) => prev.map((f) => (f.id === id ? { ...f, day: Math.max(1, Math.min(30, f.day + delta)) } : f)));
  }
  function resetDemo() {
    setDemoStep(1);
    setLinkedinConnected(false);
    setCampaignName("");
    setLeadsUploaded(false);
    setNote(DEFAULT_NOTE);
    setFollowUps([{ id: 1, day: 3 }, { id: 2, day: 7 }]);
    setLaunched(false);
    setLeadStatuses(Array(DEMO_LEADS.length).fill("queued"));
    setAutoPlay(!reducedMotion);
  }

  let invitedOrFurther = 0, acceptedOrFurther = 0, repliedCount = 0;
  for (const s of leadStatuses) {
    if (s !== "queued") invitedOrFurther += 1;
    if (s === "connected" || s === "replied") acceptedOrFurther += 1;
    if (s === "replied") repliedCount += 1;
  }
  const acceptanceRate = invitedOrFurther ? Math.round((acceptedOrFurther / invitedOrFurther) * 100) : 0;
  const replyRate = acceptedOrFurther ? Math.round((repliedCount / acceptedOrFurther) * 100) : 0;

  const doubled = [...CAPABILITY_CHIPS, ...CAPABILITY_CHIPS];

  return (
    <InnerLayout>
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={HOWTO_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section ref={heroRef} className={`relative pt-32 pb-20 px-4 overflow-hidden ${caveat.variable}`} style={{ backgroundColor: "#F8F6F2" }}>
        <div ref={blob1} aria-hidden style={{ position: "absolute", top: "50%", left: "20%", width: 600, height: 600, marginTop: -300, marginLeft: -300, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none", willChange: "transform" }} />
        <div ref={blob2} aria-hidden style={{ position: "absolute", top: "40%", left: "75%", width: 500, height: 500, marginTop: -250, marginLeft: -250, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.2) 0%, rgba(255,130,0,0.08) 40%, transparent 70%)", filter: "blur(55px)", pointerEvents: "none", willChange: "transform" }} />
        <div ref={blob3} aria-hidden style={{ position: "absolute", top: "70%", left: "50%", width: 400, height: 400, marginTop: -200, marginLeft: -200, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none", willChange: "transform" }} />

        {/* Handwritten annotation right side */}
        <div aria-hidden="true" className="hidden lg:flex flex-col items-center gap-1 absolute z-20" style={{ right: "2%", top: "30%", animation: "handwrite-float-r 5.5s ease-in-out 2.5s infinite" }}>
          <div className="card-fade-up flex flex-col items-center text-center leading-snug" style={{ fontFamily: "var(--font-caveat)", fontSize: "20px", fontWeight: 700, color: ACCENT, lineHeight: 1.25, animationDelay: "1s" }}>
            <span>{d.hero.annotations.right.line1}</span>
            <span style={{ fontSize: "13px", letterSpacing: "0.08em", fontWeight: 600, color: "#7E22CE" }}>{d.hero.annotations.right.line2}</span>
          </div>
          <svg width="48" height="40" viewBox="0 0 48 40" fill="none" style={{ transform: "scaleX(-1) rotate(-15deg)", marginBottom: "-4px", alignSelf: "flex-end", marginRight: "6px" }}>
            <path d="M4 6 C10 8, 26 2, 40 16 C46 22, 46 28, 42 34" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" fill="none" strokeDasharray="90" strokeDashoffset="90" style={{ animation: "doodle-draw 0.6s ease forwards 1.6s" }} />
            <path d="M36 32 L42 34 L40 28" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="30" strokeDashoffset="30" style={{ animation: "doodle-draw 0.3s ease forwards 2.2s" }} />
          </svg>
        </div>

        {/* Handwritten annotation left side */}
        <div aria-hidden="true" className="hidden lg:flex flex-col items-start gap-1 absolute z-20" style={{ left: "1%", top: "60%", animation: "handwrite-float-l 7s ease-in-out 3s infinite" }}>
          <div className="card-fade-up flex flex-col leading-snug" style={{ fontFamily: "var(--font-caveat)", fontSize: "19px", fontWeight: 700, color: "#A14A08", lineHeight: 1.3, animationDelay: "1.3s" }}>
            <span>{d.hero.annotations.left.line1}</span>
            <span>{d.hero.annotations.left.line2}</span>
          </div>
          <svg width="46" height="28" viewBox="0 0 46 28" fill="none" style={{ marginTop: "2px", alignSelf: "flex-end" }}>
            <path d="M4 5 C13 3, 30 7, 40 18" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" fill="none" strokeDasharray="60" strokeDashoffset="60" style={{ animation: "doodle-draw 0.55s ease forwards 1.9s" }} />
            <path d="M34 16 L40 18 L38 24" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="26" strokeDashoffset="26" style={{ animation: "doodle-draw 0.28s ease forwards 2.45s" }} />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: "Do It Yourself", href: "/services/do-it-yourself" }]} />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade"
            style={{ borderColor: "rgba(124,58,237,0.35)", background: "rgba(124,58,237,0.07)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" aria-hidden="true" style={{ backgroundColor: ACCENT }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: ACCENT }}>{d.hero.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-6 hero-fade-d1" style={{ color: "#0a0a0a" }}>
            {d.hero.headlineLead}{" "}
            <span className="relative inline-block" style={{ color: ACCENT }}>
              {d.hero.headlineHighlight}
              <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 260 10" preserveAspectRatio="none" aria-hidden>
                <path d="M2 6 Q60 2 120 5 Q180 9 258 4" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="300" strokeDashoffset="300" style={{ animation: "doodle-draw 0.9s ease forwards 0.9s" }} />
              </svg>
            </span>
          </h1>

          <p className="text-lg sm:text-xl max-w-2xl mb-10 hero-fade-d2" style={{ color: "#52525B" }}>
            {d.hero.intro}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 hero-fade-d3">
            <a href={CALENDLY_URL} className={`btn-dark px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2 ${FOCUS}`}>
              {d.hero.primaryCtaLabel}
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
            </a>
            <Link href={d.hero.secondaryCtaHref} className={`btn-ghost px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2 ${FOCUS}`}>
              {d.hero.secondaryCtaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Capability marquee ───────────────────────────────── */}
      <div className="py-8 border-y marquee-container" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }} aria-label={d.capabilityMarquee.ariaLabel}>
        <div className="marquee-track gap-4">
          {doubled.map((label, i) => <CapabilityChip key={i} label={label} i={i} />)}
        </div>
      </div>

      {/* ── How it works: interactive demo ───────────────────── */}
      <section className={`relative py-20 px-4 ${caveat.variable}`} style={{ backgroundColor: "#F8F6F2" }}>
        {/* Handwritten callout pointing at the live demo */}
        <div aria-hidden="true" className="hidden lg:flex flex-col items-end absolute z-20" style={{ top: "3%", right: "6%", animation: "handwrite-float-l 6.5s ease-in-out 1s infinite" }}>
          <div className="card-fade-up" style={{ fontFamily: "var(--font-caveat)", fontSize: "21px", fontWeight: 700, color: ACCENT, transform: "rotate(-5deg)", animationDelay: "0.4s" }}>
            {d.howItWorks.calloutNote}
          </div>
          <svg width="40" height="36" viewBox="0 0 40 36" fill="none" style={{ marginRight: "10px" }}>
            <path d="M6 4 C10 14, 18 22, 30 30" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" fill="none" strokeDasharray="50" strokeDashoffset="50" style={{ animation: "doodle-draw 0.5s ease forwards 1s" }} />
            <path d="M22 30 L30 30 L29 22" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="26" strokeDashoffset="26" style={{ animation: "doodle-draw 0.3s ease forwards 1.5s" }} />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <Eyebrow>{d.howItWorks.eyebrow}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#0a0a0a" }}>{d.howItWorks.heading}</h2>
            <p className="text-base mt-3 max-w-xl mx-auto" style={{ color: "#52525B" }}>{d.howItWorks.intro}</p>
          </div>

          <div ref={demoRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Step list */}
            <ol className="space-y-3" aria-label="Campaign builder steps">
              {STEPS.map((s, i) => {
                const active = demoStep === i + 1;
                return (
                  <li key={s.n}>
                    <FadeIn delay={i * 70}>
                      <button
                        type="button"
                        onClick={() => { stopAutoPlay(); setDemoStep(i + 1); }}
                        aria-current={active ? "step" : undefined}
                        className={`w-full text-left rounded-2xl border p-5 transition-all duration-300 ${FOCUS}`}
                        style={active
                          ? { borderColor: ACCENT, backgroundColor: "rgba(124,58,237,0.05)", boxShadow: "0 4px 20px rgba(124,58,237,0.12)" }
                          : { borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-300"
                            style={active
                              ? { backgroundColor: ACCENT, color: "#fff", transform: "scale(1.12)" }
                              : { backgroundColor: "rgba(124,58,237,0.1)", color: ACCENT, transform: "scale(1)" }}>
                            {s.n}
                          </div>
                          <div>
                            <span className="block text-base font-black mb-1" style={{ color: "#0a0a0a" }}>{s.title}</span>
                            <span className="block text-sm leading-relaxed" style={{ color: "#52525B" }}>{s.desc}</span>
                          </div>
                        </div>
                      </button>
                    </FadeIn>
                  </li>
                );
              })}
            </ol>

            {/* Live mockup */}
            <div className="lg:sticky lg:top-28">
              <div className="rounded-3xl border-2 overflow-hidden" style={{ borderColor: "rgba(124,58,237,0.25)", boxShadow: "0 20px 50px rgba(124,58,237,0.15)", backgroundColor: "#ffffff" }}>
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <span className="w-3 h-3 rounded-full" aria-hidden="true" style={{ backgroundColor: "#FF5F57" }} />
                  <span className="w-3 h-3 rounded-full" aria-hidden="true" style={{ backgroundColor: "#FEBC2E" }} />
                  <span className="w-3 h-3 rounded-full" aria-hidden="true" style={{ backgroundColor: "#28C840" }} />
                  <span className="ml-3 text-xs font-bold truncate" style={{ color: "#71675E" }}>Myntmore Outreach &middot; Campaign Builder</span>
                  <button
                    type="button"
                    onClick={() => setAutoPlay((a) => !a)}
                    aria-pressed={autoPlay}
                    className={`ml-auto -my-2 flex-shrink-0 min-h-[44px] inline-flex items-center gap-1.5 px-2 rounded-lg text-xs font-bold uppercase tracking-wide ${FOCUS}`}
                    style={{ color: ACCENT }}
                  >
                    {autoPlay
                      ? <Pause className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />
                      : <Play className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />}
                    {autoPlay ? "Pause" : "Auto-play"}
                  </button>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-1.5 px-5 pt-4" role="img" aria-label={`Step ${demoStep} of ${STEPS.length}`}>
                  {STEPS.map((s, i) => (
                    <span
                      key={s.n}
                      className="h-1 flex-1 rounded-full origin-left transition-all duration-300"
                      style={{ backgroundColor: demoStep > i ? ACCENT : "#E8E2D9", transform: demoStep === i + 1 ? "scaleY(1.8)" : "scaleY(1)" }}
                    />
                  ))}
                </div>

                <div key={demoStep} className="card-fade-up p-6 sm:p-7 min-h-[340px] flex flex-col" style={{ backgroundColor: "#ffffff" }}>
                  {/* Step 1: Connect LinkedIn */}
                  {demoStep === 1 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-4">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: "#0A66C2" }}>
                        <LinkedInIcon />
                      </div>
                      {!linkedinConnected ? (
                        <>
                          <p className="text-sm max-w-xs" style={{ color: "#52525B" }}>Log in with your own LinkedIn account. Nothing is handed over to us.</p>
                          <button type="button" onClick={() => { stopAutoPlay(); setLinkedinConnected(true); }} className={`btn-dark px-6 py-3 min-h-[44px] text-sm font-bold ${FOCUS}`}>Connect LinkedIn</button>
                        </>
                      ) : (
                        <>
                          <span className="inline-flex items-center gap-2 text-sm font-black" style={{ color: "#15803D" }}>
                            <Check className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
                            Connected
                          </span>
                          <p className="text-xs" style={{ color: "#71675E" }}>Nice. Let&apos;s set up your first campaign &rarr;</p>
                        </>
                      )}
                    </div>
                  )}

                  {/* Step 2: Campaign name */}
                  {demoStep === 2 && (
                    <div className="flex-1">
                      <label htmlFor="demo-campaign-name" className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: ACCENT }}>Campaign Name</label>
                      <input
                        id="demo-campaign-name"
                        value={campaignName}
                        onChange={(e) => { stopAutoPlay(); setCampaignName(e.target.value.slice(0, 60)); }}
                        placeholder="Q1 SaaS Founders Outreach"
                        className="w-full rounded-xl border px-4 py-3 min-h-[44px] text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/40 focus-visible:border-[#7C3AED]"
                        style={{ borderColor: "#E8E2D9", color: "#0a0a0a" }}
                      />
                      <p className="text-xs mt-4" style={{ color: "#71675E" }}>
                        Preview: <span className="font-bold" style={{ color: "#0a0a0a" }}>{campaignName || "Untitled Campaign"}</span>
                      </p>
                    </div>
                  )}

                  {/* Step 3: Upload leads */}
                  {demoStep === 3 && (
                    <div className="flex-1">
                      {!leadsUploaded ? (
                        <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
                          <p className="text-sm max-w-xs" style={{ color: "#52525B" }}>Upload the list of leads you want to reach for this campaign.</p>
                          <button type="button" onClick={() => { stopAutoPlay(); setLeadsUploaded(true); }} className={`btn-dark px-6 py-3 min-h-[44px] text-sm font-bold inline-flex items-center gap-2 ${FOCUS}`}>
                            <Upload className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                            Upload Leads (CSV)
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-black mb-3 inline-flex items-center gap-1.5" style={{ color: "#15803D" }}>
                            <Check className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
                            {DEMO_LEADS.length} leads uploaded
                          </p>
                          <ul className="space-y-2">
                            {DEMO_LEADS.map((l, i) => (
                              <li key={l} className="card-fade-up text-xs rounded-lg px-3 py-2" style={{ color: "#3D3D3D", backgroundColor: "#F8F6F2", animationDelay: `${i * 80}ms` }}>{l}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 4: Connection note */}
                  {demoStep === 4 && (
                    <div className="flex-1">
                      <label htmlFor="demo-note" className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: ACCENT }}>Connection Note</label>
                      <textarea
                        id="demo-note"
                        value={note}
                        onChange={(e) => { stopAutoPlay(); setNote(e.target.value.slice(0, 300)); }}
                        rows={5}
                        aria-describedby="demo-note-count"
                        className="w-full rounded-xl border px-4 py-3 text-sm resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/40 focus-visible:border-[#7C3AED]"
                        style={{ borderColor: "#E8E2D9", color: "#0a0a0a" }}
                      />
                      <p id="demo-note-count" className="text-xs mt-2 text-right" style={{ color: note.length > 280 ? "#DC2626" : "#71675E" }}>{note.length}/300</p>
                    </div>
                  )}

                  {/* Step 5: Follow-ups */}
                  {demoStep === 5 && (
                    <div className="flex-1">
                      <ul className="space-y-3 mb-4" aria-label="Follow-up messages">
                        {followUps.map((f, i) => (
                          <li key={f.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 rounded-xl border px-4 sm:pr-2 py-2 sm:py-1.5" style={{ borderColor: "#E8E2D9" }}>
                            <span className="text-sm font-bold whitespace-nowrap" style={{ color: "#0a0a0a" }}>Follow-up {i + 1}</span>
                            <div className="flex items-center gap-1 -ml-3 sm:ml-0">
                              <StepperButton onClick={() => adjustDelay(f.id, -1)} label={`Send follow-up ${i + 1} one day earlier`}>
                                <Minus className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                              </StepperButton>
                              <span className="text-xs font-bold w-12 text-center" style={{ color: "#52525B" }} aria-live="polite">Day {f.day}</span>
                              <StepperButton onClick={() => adjustDelay(f.id, 1)} label={`Send follow-up ${i + 1} one day later`}>
                                <Plus className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                              </StepperButton>
                              {followUps.length > 1 && (
                                <button type="button" onClick={() => removeFollowUp(f.id)} aria-label={`Remove follow-up ${i + 1}`}
                                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-[#FEF2F2] ${FOCUS}`} style={{ color: "#DC2626" }}>
                                  <X className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                                </button>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                      {followUps.length < 4 && (
                        <button type="button" onClick={addFollowUp} className={`inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold rounded-lg px-1 ${FOCUS}`} style={{ color: ACCENT }}>
                          <Plus className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                          Add another follow-up
                        </button>
                      )}
                    </div>
                  )}

                  {/* Step 6: Launch */}
                  {demoStep === 6 && (
                    <div className="flex-1">
                      {!launched ? (
                        <div className="flex flex-col items-center justify-center text-center gap-4 py-6">
                          <p className="text-sm max-w-xs" style={{ color: "#52525B" }}>
                            &ldquo;{campaignName || "Untitled Campaign"}&rdquo; is ready with {DEMO_LEADS.length} leads and {followUps.length} follow-up{followUps.length > 1 ? "s" : ""}.
                          </p>
                          <button type="button" onClick={() => { stopAutoPlay(); setLaunched(true); }} className={`btn-dark px-8 py-4 text-base font-black inline-flex items-center gap-2 ${FOCUS}`}>
                            Launch Campaign
                            <Rocket className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="grid grid-cols-2 gap-4 mb-5" aria-live="polite">
                            <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#F5F3FF" }}>
                              <div className="text-2xl font-black" style={{ color: ACCENT }}>{acceptanceRate}%</div>
                              <div className="text-xs" style={{ color: "#52525B" }}>Acceptance Rate</div>
                            </div>
                            <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#FEF9EC" }}>
                              <div className="text-2xl font-black" style={{ color: GOLD_TEXT }}>{replyRate}%</div>
                              <div className="text-xs" style={{ color: "#52525B" }}>Reply Rate</div>
                            </div>
                          </div>
                          <ul className="space-y-2 mb-4">
                            {DEMO_LEADS.map((l, i) => (
                              <li key={l} className="flex items-center justify-between gap-3 text-xs" style={{ color: "#3D3D3D" }}>
                                <span className="truncate">{l}</span>
                                <StatusPill status={leadStatuses[i]} />
                              </li>
                            ))}
                          </ul>
                          <button type="button" onClick={resetDemo} className={`inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold rounded-lg px-1 ${FOCUS}`} style={{ color: ACCENT }}>
                            <RotateCcw className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                            Restart demo
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Prev / Next nav */}
              <div className="flex items-center justify-center gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => { stopAutoPlay(); setDemoStep((s) => Math.max(1, s - 1)); }}
                  disabled={demoStep === 1}
                  className={`px-5 py-2.5 min-h-[44px] rounded-full text-sm font-bold border transition-opacity disabled:opacity-30 disabled:cursor-not-allowed ${FOCUS}`}
                  style={{ borderColor: "#E8E2D9", color: "#3D3D3D", backgroundColor: "#ffffff" }}
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={() => { stopAutoPlay(); setDemoStep((s) => Math.min(6, s + 1)); }}
                  disabled={demoStep === 6}
                  className={`px-5 py-2.5 min-h-[44px] rounded-full text-sm font-bold text-white transition-opacity disabled:opacity-30 disabled:cursor-not-allowed ${FOCUS}`}
                  style={{ backgroundColor: ACCENT }}
                >
                  Next step &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <Eyebrow>{d.features.eyebrow}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#0a0a0a" }}>{d.features.heading}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 90}>
                <div className="rounded-2xl border p-7 h-full card-hover-purple" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <IconTile icon={f.icon} />
                    <h3 className="text-base font-black" style={{ color: "#0a0a0a" }}>{f.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard ─────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto text-center">
          <Eyebrow>{d.dashboard.eyebrow}</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: "#0a0a0a" }}>{d.dashboard.heading}</h2>
          <p className="text-base max-w-xl mx-auto mb-10" style={{ color: "#52525B" }}>
            {d.dashboard.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {DASHBOARD_METRICS.map((d, i) => (
              <FadeIn key={d.title} delay={i * 100}>
                <div className="rounded-2xl border p-6 h-full text-left card-hover-purple" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                  <h3 className="text-sm font-black mb-2" style={{ color: ACCENT }}>{d.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{d.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deliverables + Who it's for ───────────────────────── */}
      <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <FadeIn>
            <div className="rounded-2xl border p-8 h-full" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
              <Eyebrow>{d.deliverables.eyebrow}</Eyebrow>
              <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>{d.deliverables.heading}</h2>
              <ul className="space-y-4">
                {DELIVERABLES.map((d, i) => (
                  <li key={d} className="card-fade-up flex items-start gap-3" style={{ animationDelay: `${i * 70}ms` }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "rgba(124,58,237,0.1)", color: ACCENT }}>
                      <Check className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <div>
            <Eyebrow tone="gold">{d.whoFor.eyebrow}</Eyebrow>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>{d.whoFor.heading}</h2>
            <div className="space-y-4">
              {WHO_FOR.map((w, i) => (
                <FadeIn key={w.title} delay={i * 110}>
                  <div className="rounded-2xl border p-6 card-hover-purple" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                    <div className="flex items-center gap-3 mb-2">
                      <IconTile icon={w.icon} size="sm" />
                      <h3 className="text-base font-black" style={{ color: "#0a0a0a" }}>{w.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{w.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <Eyebrow>{d.faqSection.eyebrow}</Eyebrow>
            <h2 className="text-3xl font-black" style={{ color: "#0a0a0a" }}>{d.faqSection.heading}</h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} q={item.q} a={item.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section ref={ctaRef} className="relative py-28 px-4 overflow-hidden border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div ref={ctaBlob1} aria-hidden style={{ position: "absolute", top: "50%", left: "25%", width: 600, height: 600, marginTop: -300, marginLeft: -300, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, rgba(124,58,237,0.1) 40%, transparent 70%)", filter: "blur(65px)", pointerEvents: "none", willChange: "transform" }} />
        <div ref={ctaBlob2} aria-hidden style={{ position: "absolute", top: "50%", left: "75%", width: 550, height: 550, marginTop: -275, marginLeft: -275, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.28) 0%, rgba(255,130,0,0.1) 40%, transparent 70%)", filter: "blur(65px)", pointerEvents: "none", willChange: "transform" }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-[0.95]" style={{ color: "#0a0a0a" }}>
            {d.finalCta.headingLine1}<br /><span style={{ color: ACCENT }}>{d.finalCta.headingLine2}</span>
          </h2>

          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10" style={{ color: "#52525B" }}>
            {d.finalCta.intro}
          </p>

          <a href={CALENDLY_URL} className={`inline-flex items-center gap-2.5 px-10 py-5 rounded-full font-black text-lg btn-dark ${FOCUS}`}>
            {d.finalCta.buttonLabel}
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
          </a>

          <p className="mt-5 text-sm" style={{ color: "#71675E" }}>{d.finalCta.footnoteLead} <Link href={d.finalCta.doneForYouLinkHref} className={`font-semibold underline rounded ${FOCUS}`} style={{ color: ACCENT }}>{d.finalCta.doneForYouLinkLabel}</Link> {d.finalCta.footnoteMiddle} <Link href={d.finalCta.consultationLinkHref} className={`font-semibold underline rounded ${FOCUS}`} style={{ color: ACCENT }}>{d.finalCta.consultationLinkLabel}</Link>.</p>
        </div>
      </section>
    </InnerLayout>
  );
}
