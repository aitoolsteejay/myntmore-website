"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { caveat } from "@/app/fonts/caveat";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Camera,
  Check,
  ChevronDown,
  Copy,
  Gift,
  Linkedin,
  Mail,
  MailCheck,
  MessageCircleQuestion,
  Mic,
  PenLine,
  Play,
  RotateCcw,
  Smile,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import FadeIn from "@/app/components/FadeIn";
import JsonLd from "@/app/components/JsonLd";
import AskYourAI from "@/app/components/AskYourAI";
import NewsletterForm from "@/app/components/NewsletterForm";
import { buildArticleSchema, SITE_URL } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import pageCopy from "@/content/page-copy/guideDosAndDontsOfOutreach.json";

// This page's text is edited in the admin ("Pattern Disruption: The Do's and Don'ts of Cold Outreach") and lives in content/page-copy/guideDosAndDontsOfOutreach.json.
const copy = pageCopy;

/* ─── Site tokens ─────────────────────────────────────────────── */
const T = {
  bg: "#F8F6F2",
  paper: "#FFFFFF",
  ink: "#0a0a0a",
  ink2: "#3D3D3D",
  muted: "#71675E",
  hairline: "#E8E2D9",
  gold: "#F5B731",
  purple: "#7C3AED",
  purpleSoft: "rgba(124,58,237,0.08)",
  purpleBorder: "rgba(124,58,237,0.35)",
  amber: "#D97706",
  amberSoft: "#FEF9EC",
  amberBorder: "rgba(245,183,49,0.35)",
  linkedin: "#0077b5",
  green: "#16A34A",
  doText: "#166534",
  doFill: "#15803D",
  doSoft: "rgba(21,128,61,0.10)",
  dontText: "#991B1B",
  dontFill: "#B91C1C",
  dontSoft: "rgba(185,28,28,0.10)",
} as const;

const PAGE_URL = `${SITE_URL}/resources/guides/dos-and-donts-of-outreach`;
const TITLE = "Pattern Disruption: The Do's and Don'ts of Cold Outreach";
const DESCRIPTION = "Why most outreach gets deleted without being read, how pattern disruption actually works, what to send on LinkedIn vs. cold email, what data enrichment is, and the free tools to build better outreach.";

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  datePublished: "2026-09-18T12:00:00+05:30",
  dateModified: "2026-09-18T12:00:00+05:30",
});

const AI_RESOURCES = [PAGE_URL, `${SITE_URL}/services/linkedin-outreach`, `${SITE_URL}/services/cold-email`];

/* ─── Content ──────────────────────────────────────────────────── */
const GUIDE_INDEX = [
  { href: "#makeover", label: copy.DosAndDontsClient_s01.t01 },
  { href: "#interrupts", label: copy.DosAndDontsClient_s01.t02 },
  { href: "#channels", label: copy.DosAndDontsClient_s01.t03 },
  { href: "#subjects", label: copy.DosAndDontsClient_s01.t04 },
  { href: "#enrichment", label: copy.DosAndDontsClient_s01.t05 },
  { href: "#score", label: copy.DosAndDontsClient_s01.t06 },
];

const MAKEOVER = {
  before: {
    label: copy.DosAndDontsClient_s01.t07,
    text: copy.DosAndDontsClient_s01.t08,
    tags: [copy.DosAndDontsClient_s01.t09, copy.DosAndDontsClient_s01.t10, copy.DosAndDontsClient_s01.t11],
    readTime: "11 sec",
  },
  after: {
    label: copy.DosAndDontsClient_s01.t12,
    text: copy.DosAndDontsClient_s01.t13,
    tags: [copy.DosAndDontsClient_s01.t14, copy.DosAndDontsClient_s01.t15, copy.DosAndDontsClient_s01.t16],
    readTime: "4 sec",
  },
};

const INTERRUPTS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Smile, title: copy.DosAndDontsClient_s01.t17, body: copy.DosAndDontsClient_s01.t18 },
  { icon: Mic, title: copy.DosAndDontsClient_s01.t19, body: copy.DosAndDontsClient_s01.t20 },
  { icon: Camera, title: copy.DosAndDontsClient_s01.t21, body: copy.DosAndDontsClient_s01.t22 },
  { icon: MessageCircleQuestion, title: copy.DosAndDontsClient_s01.t23, body: copy.DosAndDontsClient_s01.t24 },
  { icon: Gift, title: copy.DosAndDontsClient_s01.t25, body: copy.DosAndDontsClient_s01.t26 },
  { icon: PenLine, title: copy.DosAndDontsClient_s01.t27, body: copy.DosAndDontsClient_s01.t28 },
];

const LESSONS = [
  {
    n: "01",
    title: copy.DosAndDontsClient_s01.t29,
    summary: copy.DosAndDontsClient_s01.t30,
    body: copy.DosAndDontsClient_s01.t31,
  },
  {
    n: "02",
    title: copy.DosAndDontsClient_s01.t32,
    summary: copy.DosAndDontsClient_s01.t33,
    body: copy.DosAndDontsClient_s01.t34,
  },
  {
    n: "03",
    title: copy.DosAndDontsClient_s01.t35,
    summary: copy.DosAndDontsClient_s01.t36,
    body: copy.DosAndDontsClient_s01.t37,
  },
];

const CHANNEL_TIPS: { channel: string; icon: LucideIcon; accent: string; dos: string[]; donts: string[] }[] = [
  {
    channel: "LinkedIn",
    icon: Linkedin,
    accent: "#0077b5",
    dos: [
      copy.DosAndDontsClient_s01.t38,
      copy.DosAndDontsClient_s01.t39,
      copy.DosAndDontsClient_s01.t40,
      copy.DosAndDontsClient_s01.t41,
    ],
    donts: [
      copy.DosAndDontsClient_s01.t42,
      copy.DosAndDontsClient_s01.t43,
      copy.DosAndDontsClient_s01.t44,
    ],
  },
  {
    channel: "Cold Email",
    icon: Mail,
    accent: "#D97706",
    dos: [
      copy.DosAndDontsClient_s01.t45,
      copy.DosAndDontsClient_s01.t46,
      copy.DosAndDontsClient_s01.t47,
      copy.DosAndDontsClient_s01.t48,
    ],
    donts: [
      copy.DosAndDontsClient_s01.t49,
      copy.DosAndDontsClient_s01.t50,
      copy.DosAndDontsClient_s01.t51,
    ],
  },
];

const SUBJECT_LINES: { text: string; why: string }[] = [
  { text: "the founder who cracked global outreach", why: copy.DosAndDontsClient_s01.t52 },
  { text: "re: your expansion plans", why: copy.DosAndDontsClient_s01.t53 },
  { text: "quick one on your expansion plans", why: copy.DosAndDontsClient_s01.t54 },
  { text: "not sure if this is relevant to you", why: copy.DosAndDontsClient_s01.t55 },
  { text: "why your last hire changes things", why: copy.DosAndDontsClient_s01.t56 },
  { text: copy.DosAndDontsClient_s01.t57, why: copy.DosAndDontsClient_s01.t58 },
  { text: "saw this and thought of you", why: copy.DosAndDontsClient_s01.t59 },
  { text: "this might be bad timing", why: copy.DosAndDontsClient_s01.t60 },
  { text: copy.DosAndDontsClient_s01.t61, why: copy.DosAndDontsClient_s01.t62 },
  { text: "random thought after seeing your funding news", why: copy.DosAndDontsClient_s01.t63 },
];

const DECOY_SUBJECTS = [
  { from: "Growth Team", subject: copy.DosAndDontsClient_s01.t64, preview: "Hope this email finds you well. We help companies like yours..." },
  { from: "Sales Dept", subject: copy.DosAndDontsClient_s01.t65, preview: "Just following up on my previous email regarding our..." },
];

const ENRICHED_FIELDS: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Users, label: copy.DosAndDontsClient_s01.t66, value: "180 employees" },
  { icon: TrendingUp, label: copy.DosAndDontsClient_s01.t67, value: copy.DosAndDontsClient_s01.t68 },
  { icon: Wrench, label: copy.DosAndDontsClient_s01.t69, value: copy.DosAndDontsClient_s01.t70 },
  { icon: MailCheck, label: copy.DosAndDontsClient_s01.t71, value: copy.DosAndDontsClient_s01.t72 },
  { icon: Sparkles, label: copy.DosAndDontsClient_s01.t73, value: copy.DosAndDontsClient_s01.t74 },
];

const ENRICHMENT_TOOLS = [
  { name: copy.DosAndDontsClient_s01.t75, body: copy.DosAndDontsClient_s01.t76 },
  { name: copy.DosAndDontsClient_s01.t77, body: copy.DosAndDontsClient_s01.t78 },
  { name: copy.DosAndDontsClient_s01.t79, body: copy.DosAndDontsClient_s01.t80 },
  { name: copy.DosAndDontsClient_s01.t81, body: copy.DosAndDontsClient_s01.t82 },
  { name: copy.DosAndDontsClient_s01.t83, body: copy.DosAndDontsClient_s01.t84 },
];

const TOOLS = [
  {
    href: "/tools/icp-builder",
    name: copy.DosAndDontsClient_s01.t85,
    accent: "#7C3AED",
    plain: "Tell it what your business does, and it hands you back who to sell to and what to say to them.",
    useCase: "Before writing a single message, so every line is aimed at someone real.",
  },
  {
    href: "/tools/dm-angle-generator",
    name: copy.DosAndDontsClient_s01.t86,
    accent: "#0077b5",
    plain: "Type in your offer, get back five different ways to open a message.",
    useCase: "When your reply rate goes quiet and the opening line is the likely culprit.",
  },
  {
    href: "/tools/roi-calculator",
    name: copy.DosAndDontsClient_s01.t87,
    accent: "#16A34A",
    plain: "Plug in sends, replies, and deal value. See what your outreach is actually worth.",
    useCase: "Before committing budget or time, so the return is a number, not a guess.",
  },
  {
    href: "/tools/lead-magnet-ideas",
    name: copy.DosAndDontsClient_s01.t88,
    accent: "#D97706",
    plain: "Turns your business and ICP into concrete, specific things you could give away for free.",
    useCase: "When you like the “give before you ask” idea but can't think what to give.",
  },
];

const DONTS = [
  copy.DosAndDontsClient_s01.t89,
  copy.DosAndDontsClient_s01.t90,
  copy.DosAndDontsClient_s01.t91,
  copy.DosAndDontsClient_s01.t92,
  copy.DosAndDontsClient_s01.t93,
  copy.DosAndDontsClient_s01.t94,
  copy.DosAndDontsClient_s01.t95,
];

const DOS = [
  copy.DosAndDontsClient_s01.t96,
  copy.DosAndDontsClient_s01.t97,
  copy.DosAndDontsClient_s01.t98,
  copy.DosAndDontsClient_s01.t99,
  copy.DosAndDontsClient_s01.t100,
  copy.DosAndDontsClient_s01.t101,
  copy.DosAndDontsClient_s01.t102,
  copy.DosAndDontsClient_s01.t103,
];

/* ─── Reading progress bar (sits just above the fixed navbar) ──── */
function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden="true" className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none" style={{ backgroundColor: "transparent" }}>
      <div className="h-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${T.purple}, ${T.gold})`, transition: "width 120ms linear" }} />
    </div>
  );
}

/* ─── Section header with per-section accent ───────────────────── */
function SectionHeader({ n, eyebrow, title, lede, accent = T.purple }: { n: string; eyebrow: string; title: React.ReactNode; lede?: string; accent?: string }) {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-black tabular-nums" style={{ color: textTone(accent) }}>{n}</span>
        <span aria-hidden="true" className="h-px w-8" style={{ backgroundColor: accent }} />
        <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: textTone(accent) }}>{eyebrow}</span>
      </div>
      <h2 className="text-[1.75rem] sm:text-4xl font-black leading-tight tracking-tight" style={{ color: T.ink }}>{title}</h2>
      {lede && <p className="text-base sm:text-lg leading-relaxed mt-4 max-w-2xl" style={{ color: T.muted }}>{lede}</p>}
    </div>
  );
}

function Mark({ kind }: { kind: "do" | "dont" }) {
  const isDo = kind === "do";
  const Icon = isDo ? Check : X;
  return (
    <span aria-hidden="true" className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: isDo ? T.doSoft : T.dontSoft, color: isDo ? T.doFill : T.dontFill }}>
      <Icon className="w-3 h-3" strokeWidth={3} />
    </span>
  );
}

/* ─── Interactive: before / after message makeover ─────────────── */
function MessageMakeover() {
  const [fixed, setFixed] = useState(false);
  const m = fixed ? MAKEOVER.after : MAKEOVER.before;
  const accent = fixed ? T.green : T.dontFill;

  return (
    <div className="rounded-3xl overflow-hidden" style={{ backgroundColor: T.paper, border: `1px solid ${T.hairline}` }}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 px-5 sm:px-8 pt-5 sm:pt-6">
        <div role="group" aria-label="Message version" className="inline-flex p-1 rounded-full self-start" style={{ backgroundColor: T.bg, border: `1px solid ${T.hairline}` }}>
          {[MAKEOVER.before, MAKEOVER.after].map((v, i) => {
            const on = (i === 1) === fixed;
            return (
              <button
                key={v.label}
                type="button"
                aria-pressed={on}
                onClick={() => setFixed(i === 1)}
                className="min-h-[44px] px-4 py-2 rounded-full text-sm font-bold transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ backgroundColor: on ? T.gold : "transparent", color: on ? "#0A0A0A" : T.ink2 }}
              >
                {v.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: T.muted }}>{copy.DosAndDontsClient_s01.t104}<span className="tabular-nums" style={{ color: accent }}>{m.readTime}</span>
        </p>
      </div>

      <div className="px-5 sm:px-8 py-5 sm:py-6">
        <div key={m.label} className="card-fade-up">
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-black" style={{ backgroundColor: T.purpleSoft, color: T.purple }}>{copy.DosAndDontsClient_s01.t105}</span>
            <div className="relative rounded-2xl rounded-tl-md px-5 py-4 max-w-xl" style={{ backgroundColor: T.bg, border: `1px solid ${T.hairline}` }}>
              <p className="text-[15px] leading-relaxed" style={{ color: T.ink }}>{m.text}</p>
            </div>
          </div>
          <ul className="flex flex-wrap gap-2 mt-4 sm:mt-5 sm:pl-12">
            {m.tags.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full" style={{ backgroundColor: fixed ? T.doSoft : T.dontSoft, color: fixed ? T.doText : T.dontText }}>
                {fixed ? <Check className="w-3 h-3" strokeWidth={3} /> : <X className="w-3 h-3" strokeWidth={3} />}
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-5 sm:px-8 py-4 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ borderColor: T.hairline, backgroundColor: T.bg }}>
        <p className="text-sm" style={{ color: T.muted }}>{copy.DosAndDontsClient_s01.t106}</p>
        <button
          type="button"
          onClick={() => setFixed((f) => !f)}
          className="btn-dark px-5 py-2.5 text-sm font-bold inline-flex items-center gap-2 self-start sm:self-auto"
        >
          {fixed ? "Show the typical one" : "Fix this message"}
          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

/* ─── Interactive: tap-to-reveal tactic cards ──────────────────── */
function InterruptCards() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {INTERRUPTS.map((item, i) => {
        const Icon = item.icon;
        const on = open === i;
        return (
          <FadeIn key={item.title} delay={i * 60}>
            <button
              type="button"
              aria-expanded={on}
              onClick={() => setOpen(on ? null : i)}
              className="group w-full h-full text-left rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: T.paper, border: `1px solid ${on ? T.purpleBorder : T.hairline}` }}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="w-11 h-11 rounded-2xl flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: on ? T.purple : T.purpleSoft, color: on ? "#ffffff" : T.purple }}>
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <span className="flex items-center gap-3">
                  <span className="text-sm font-black tabular-nums" style={{ color: T.purple }}>{String(i + 1).padStart(2, "0")}</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300" style={{ color: T.muted, transform: on ? "rotate(180deg)" : "none" }} strokeWidth={2} />
                </span>
              </div>
              <span className="block text-lg font-black leading-snug mt-5" style={{ color: T.ink }}>{item.title}</span>
              <span className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
                <span className="block overflow-hidden">
                  <span className="block text-[15px] leading-relaxed pt-3" style={{ color: T.muted }}>{item.body}</span>
                </span>
              </span>
            </button>
          </FadeIn>
        );
      })}
    </div>
  );
}

/* ─── Interactive: three-lesson stepper ────────────────────────── */
function LessonStepper() {
  const [i, setI] = useState(0);
  const l = LESSONS[i];
  return (
    <div className="rounded-3xl overflow-hidden" style={{ backgroundColor: T.paper, border: `1px solid ${T.hairline}` }}>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div role="tablist" aria-label="Lessons" className="lg:col-span-5 flex lg:block gap-2 lg:gap-0 overflow-x-auto lg:overflow-visible snap-x snap-mandatory p-3 lg:border-r border-b lg:border-b-0 [-webkit-overflow-scrolling:touch]" style={{ borderColor: T.hairline }}>
          {LESSONS.map((item, idx) => {
            const on = idx === i;
            return (
              <button
                key={item.n}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setI(idx)}
                className="flex-shrink-0 w-[78vw] max-w-[300px] lg:w-full lg:max-w-none snap-start flex items-start gap-3 lg:gap-4 text-left rounded-2xl px-4 py-3.5 lg:py-4 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                style={{ backgroundColor: on ? T.purpleSoft : "transparent", border: `1px solid ${on ? T.purpleBorder : T.hairline}` }}
              >
                <span className="text-sm font-black tabular-nums mt-0.5" style={{ color: on ? T.purple : T.muted }}>{item.n}</span>
                <span>
                  <span className="block text-[15px] font-black leading-snug" style={{ color: T.ink }}>{item.title}</span>
                  <span className="block text-sm leading-relaxed mt-1" style={{ color: T.muted }}>{item.summary}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="lg:col-span-7 p-5 sm:p-9 flex flex-col">
          <div key={l.n} className="card-fade-up flex-1">
            <span className="text-4xl sm:text-5xl font-black tabular-nums" style={{ color: T.purple }}>{l.n}</span>
            <h3 className="text-xl sm:text-2xl font-black leading-tight mt-3 mb-4" style={{ color: T.ink }}>{l.title}</h3>
            <p className="text-base leading-relaxed" style={{ color: T.ink2 }}>{l.body}</p>
          </div>
          <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: T.hairline }}>
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {LESSONS.map((_, idx) => (
                <span key={idx} className="h-1.5 rounded-full transition-all duration-300" style={{ width: idx === i ? 20 : 6, backgroundColor: idx === i ? T.purple : T.hairline }} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setI((i + 1) % LESSONS.length)}
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold rounded-full px-4 py-2 transition-colors duration-200 cursor-pointer hover:bg-[#F8F6F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
              style={{ color: T.ink, border: `1px solid ${T.hairline}` }}
            >
              {i === LESSONS.length - 1 ? "Start over" : "Next lesson"}
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Interactive: LinkedIn vs Cold Email ──────────────────────── */
function ChannelTabs() {
  const [active, setActive] = useState(0);
  const c = CHANNEL_TIPS[active];

  return (
    <div>
      <div role="tablist" aria-label="Channel" className="flex sm:inline-flex p-1 rounded-full mb-6 sm:mb-8" style={{ backgroundColor: T.paper, border: `1px solid ${T.hairline}` }}>
        {CHANNEL_TIPS.map((tab, i) => {
          const Icon = tab.icon;
          const on = active === i;
          return (
            <button
              key={tab.channel}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: on ? textTone(tab.accent) : "transparent", color: on ? "#ffffff" : T.ink2 }}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              {tab.channel}
            </button>
          );
        })}
      </div>

      <div key={active} role="tabpanel" className="rounded-3xl card-fade-up overflow-hidden" style={{ backgroundColor: T.paper, border: `1px solid ${T.hairline}` }}>
        <div className="h-1" style={{ background: `linear-gradient(90deg,${c.accent},${c.accent}66)` }} />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-5 sm:p-9 md:border-r" style={{ borderColor: T.hairline }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-5" style={{ color: T.doText }}>{copy.DosAndDontsClient_s01.t107}</p>
            <ul className="space-y-4">
              {c.dos.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: T.ink2 }}>
                  <Mark kind="do" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 sm:p-9 border-t md:border-t-0" style={{ borderColor: T.hairline }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-5" style={{ color: T.dontText }}>{copy.DosAndDontsClient_s01.t108}</p>
            <ul className="space-y-4">
              {c.donts.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: T.ink2 }}>
                  <Mark kind="dont" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Interactive: subject line swipe file + inbox preview ─────── */
function SubjectLines() {
  const [picked, setPicked] = useState(0);
  const [copied, setCopied] = useState<number | "all" | null>(null);

  async function copyToClipboard(text: string, key: number | "all") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1400);
    } catch {
      /* clipboard unavailable, nothing to do */
    }
  }

  const line = SUBJECT_LINES[picked];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* Swipe file */}
      <div className="lg:col-span-6 rounded-3xl overflow-hidden" style={{ backgroundColor: T.paper, border: `1px solid ${T.hairline}` }}>
        <div className="flex items-center justify-between gap-3 px-5 sm:px-6 pt-5 pb-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: T.muted }}>{copy.DosAndDontsClient_s01.t109}</p>
          <button
            type="button"
            onClick={() => copyToClipboard(SUBJECT_LINES.map((l) => l.text).join("\n"), "all")}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-bold rounded-full px-4 py-2 transition-colors duration-200 cursor-pointer hover:bg-[#F8F6F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
            style={{ color: T.ink, border: `1px solid ${T.hairline}` }}
          >
            {copied === "all" ? <Check className="w-3.5 h-3.5" strokeWidth={3} style={{ color: T.doFill }} /> : <Copy className="w-3.5 h-3.5" strokeWidth={2.5} />}
            {copied === "all" ? "Copied all 10" : "Copy all"}
          </button>
        </div>
        <ol>
          {SUBJECT_LINES.map((l, i) => {
            const on = picked === i;
            return (
              <li key={l.text} className="border-t" style={{ borderColor: T.hairline }}>
                <div className="flex items-center gap-2 sm:gap-3 pl-4 sm:pl-6 pr-3 transition-colors duration-200" style={{ backgroundColor: on ? T.amberSoft : "transparent" }}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPicked(i)}
                    className="flex-1 min-w-0 flex items-baseline gap-3 text-left py-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 rounded-lg"
                  >
                    <span className="text-xs font-black tabular-nums w-5 flex-shrink-0" style={{ color: on ? textTone(T.amber) : T.muted }}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-semibold leading-snug" style={{ color: T.ink }}>{l.text}</span>
                      <span className="block text-xs mt-0.5" style={{ color: T.muted }}>{l.why}</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(l.text, i)}
                    aria-label={copied === i ? "Copied" : `Copy subject line ${i + 1}`}
                    className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                    style={{ color: copied === i ? T.doFill : T.muted }}
                  >
                    {copied === i ? <Check className="w-4 h-4" strokeWidth={3} /> : <Copy className="w-4 h-4" strokeWidth={2} />}
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Inbox preview */}
      <div className="lg:col-span-6 lg:sticky lg:top-28">
        <div className="rounded-3xl overflow-hidden" style={{ backgroundColor: T.paper, border: `1px solid ${T.hairline}` }}>
          <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: T.hairline, backgroundColor: T.bg }}>
            <Mail className="w-4 h-4" strokeWidth={2} style={{ color: T.muted }} />
            <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: T.muted }}>{copy.DosAndDontsClient_s01.t110}</p>
          </div>
          <ul>
            <li className="flex items-start gap-3 px-5 py-3.5 border-b" style={{ borderColor: T.hairline, color: T.muted }}>
              <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "transparent" }} />
              <span className="w-24 flex-shrink-0 text-sm truncate">{DECOY_SUBJECTS[0].from}</span>
              <span className="min-w-0 flex-1 text-sm truncate"><span style={{ color: T.ink2 }}>{DECOY_SUBJECTS[0].subject}</span> <span className="hidden sm:inline">{DECOY_SUBJECTS[0].preview}</span></span>
            </li>
            <li key={line.text} className="card-fade-up flex items-start gap-3 px-5 py-3.5 border-b" style={{ borderColor: T.hairline, backgroundColor: T.amberSoft }}>
              <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: T.amber }} />
              <span className="w-24 flex-shrink-0 text-sm font-black truncate" style={{ color: T.ink }}>{copy.DosAndDontsClient_s01.t111}</span>
              <span className="min-w-0 flex-1 text-sm"><span className="font-black" style={{ color: T.ink }}>{line.text}</span> <span className="hidden sm:inline" style={{ color: T.muted }}>{copy.DosAndDontsClient_s01.t112}</span></span>
            </li>
            <li className="flex items-start gap-3 px-5 py-3.5" style={{ color: T.muted }}>
              <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "transparent" }} />
              <span className="w-24 flex-shrink-0 text-sm truncate">{DECOY_SUBJECTS[1].from}</span>
              <span className="min-w-0 flex-1 text-sm truncate"><span style={{ color: T.ink2 }}>{DECOY_SUBJECTS[1].subject}</span> <span className="hidden sm:inline">{DECOY_SUBJECTS[1].preview}</span></span>
            </li>
          </ul>
          <div className="px-5 py-4 border-t" style={{ borderColor: T.hairline, backgroundColor: T.bg }}>
            <p className="text-sm leading-relaxed" style={{ color: T.ink2 }}>
              <span className="font-bold" style={{ color: T.ink }}>{copy.DosAndDontsClient_s01.t113}</span>{copy.DosAndDontsClient_s01.t114}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Interactive: enrich-a-lead demo ──────────────────────────── */
function EnrichDemo() {
  const [shown, setShown] = useState(0);
  const [running, setRunning] = useState(false);
  const done = shown >= ENRICHED_FIELDS.length;

  useEffect(() => {
    if (!running || done) return;
    const t = setTimeout(() => setShown((n) => n + 1), 260);
    return () => clearTimeout(t);
  }, [running, shown, done]);

  function start() {
    setShown(0);
    setRunning(true);
  }
  function reset() {
    setRunning(false);
    setShown(0);
  }

  return (
    <div className="rounded-3xl overflow-hidden" style={{ backgroundColor: T.paper, border: `1px solid ${T.hairline}` }}>
      <div className="h-1" style={{ background: `linear-gradient(90deg,${T.amber},${T.amber}66)` }} />
      <div className="p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4 mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: T.muted }}>{copy.DosAndDontsClient_s01.t115}</p>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full transition-colors duration-300" style={{ backgroundColor: done ? T.doSoft : T.amberSoft, color: done ? T.doText : textTone(T.amber), border: `1px solid ${done ? "rgba(21,128,61,0.2)" : T.amberBorder}` }}>
            {done ? "Enriched" : running ? "Enriching" : "Raw"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: T.bg, border: `1px solid ${T.hairline}`, color: T.ink }}>
            <Building2 className="w-5 h-5" strokeWidth={1.8} />
          </span>
          <div>
            <p className="text-base font-black" style={{ color: T.ink }}>{copy.DosAndDontsClient_s01.t116}</p>
            <p className="text-sm" style={{ color: T.muted }}>{copy.DosAndDontsClient_s01.t117}</p>
          </div>
        </div>

        <ul className="mt-6 space-y-2" aria-live="polite">
          {ENRICHED_FIELDS.map((f, i) => {
            const Icon = f.icon;
            const visible = i < shown;
            return (
              <li key={f.label} className="grid grid-cols-[1.75rem_5.5rem_1fr] sm:grid-cols-[1.75rem_7.5rem_1fr] items-center gap-2 sm:gap-3 rounded-xl px-2.5 sm:px-3 py-2.5" style={{ backgroundColor: visible ? T.bg : "transparent", border: `1px dashed ${visible ? "transparent" : T.hairline}` }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: visible ? T.amberSoft : "transparent", color: visible ? T.amber : T.hairline }}>
                  <Icon className="w-4 h-4" strokeWidth={2} />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: visible ? T.muted : "#71675E" }}>{f.label}</span>
                {visible ? (
                  <span className="card-fade-up text-sm font-semibold truncate" style={{ color: T.ink }}>{f.value}</span>
                ) : (
                  <span aria-hidden="true" className="h-2.5 w-2/3 rounded-full" style={{ backgroundColor: T.hairline }} />
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
          {!done ? (
            <button type="button" onClick={start} disabled={running} className="btn-dark px-5 py-2.5 text-sm font-bold inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-wait">
              <Sparkles className="w-4 h-4" strokeWidth={2.5} />
              {running ? "Enriching" : "Enrich this lead"}
            </button>
          ) : (
            <button type="button" onClick={reset} className="inline-flex items-center gap-2 text-sm font-bold rounded-full px-4 py-2.5 transition-colors duration-200 cursor-pointer hover:bg-[#F8F6F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1" style={{ color: T.ink, border: `1px solid ${T.hairline}` }}>
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} />{copy.DosAndDontsClient_s01.t118}</button>
          )}
          <p className="text-sm card-fade-up" style={{ color: T.muted, visibility: done ? "visible" : "hidden" }}>{copy.DosAndDontsClient_s01.t119}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Interactive: click-through self-audit ────────────────────── */
function SelfAudit() {
  const [dos, setDos] = useState<Set<number>>(new Set());
  const [donts, setDonts] = useState<Set<number>>(new Set());

  function toggle(set: Set<number>, setter: (s: Set<number>) => void, i: number) {
    const next = new Set(set);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setter(next);
  }

  const doScore = dos.size;
  const dontScore = donts.size;
  const total = doScore + dontScore;

  let verdict = "Think of the last cold message you sent. Tap everything that applies.";
  if (total > 0) {
    if (dontScore === 0 && doScore >= 6) verdict = "You're already pattern-disrupting. Most outbound isn't.";
    else if (dontScore >= 4) verdict = "This reads exactly like the outbound your prospects are trained to delete.";
    else verdict = "Partway there. A few small changes will do a lot.";
  }

  const columns: { kind: "do" | "dont"; heading: string; hint: string; items: string[]; picked: Set<number>; set: (s: Set<number>) => void }[] = [
    { kind: "do", heading: copy.DosAndDontsClient_s01.t120, hint: copy.DosAndDontsClient_s01.t121, items: DOS, picked: dos, set: setDos },
    { kind: "dont", heading: copy.DosAndDontsClient_s01.t122, hint: copy.DosAndDontsClient_s01.t123, items: DONTS, picked: donts, set: setDonts },
  ];

  return (
    <div>
      <div className="rounded-3xl p-5 sm:p-7 mb-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5" style={{ backgroundColor: T.amberSoft, border: `1px solid ${T.amberBorder}`, boxShadow: "0 8px 30px rgba(0,0,0,0.04)", color: T.ink }}>
        <div className="flex items-baseline gap-2 flex-shrink-0">
          <span className="text-5xl font-black leading-none tabular-nums" style={{ color: "#A14A08" }}>{doScore}</span>
          <span className="text-sm font-semibold" style={{ color: "#71675E" }}>{copy.DosAndDontsClient_s01.t124}{DOS.length}{copy.DosAndDontsClient_s01.t125}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold leading-snug">{verdict}</p>
          <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(10,10,10,0.08)" }}>
            <div className="h-full rounded-full transition-[width] duration-300 ease-out" style={{ width: `${Math.min(100, (doScore / DOS.length) * 100)}%`, backgroundColor: dontScore > doScore ? T.dontFill : T.gold }} />
          </div>
        </div>
        {total > 0 && (
          <button
            type="button"
            onClick={() => { setDos(new Set()); setDonts(new Set()); }}
            className="inline-flex items-center gap-1.5 text-xs font-bold self-start sm:self-auto rounded-full px-3 py-1.5 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B731]"
            style={{ color: "#0A0A0A", backgroundColor: "#FFFFFF", border: "1px solid #E8E2D9" }}
          >
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} />{copy.DosAndDontsClient_s01.t126}</button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {columns.map((col) => (
          <div key={col.kind} className="rounded-3xl p-4 sm:p-7" style={{ backgroundColor: T.paper, border: `1px solid ${T.hairline}` }}>
            <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: col.kind === "do" ? T.doText : T.dontText }}>{col.heading}</h3>
              <span className="text-xs text-right" style={{ color: T.muted }}>{col.hint}</span>
            </div>
            <ul className="space-y-1">
              {col.items.map((d, i) => {
                const on = col.picked.has(i);
                return (
                  <li key={d}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(col.picked, col.set, i)}
                      className="w-full flex items-start gap-3 text-left rounded-xl px-3 py-2.5 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                      style={{ backgroundColor: on ? (col.kind === "do" ? T.doSoft : T.dontSoft) : "transparent" }}
                    >
                      <span aria-hidden="true" className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-200" style={{ backgroundColor: on ? (col.kind === "do" ? T.doFill : T.dontFill) : "transparent", border: on ? "none" : `1.5px solid ${T.hairline}` }}>
                        {on && (col.kind === "do" ? <Check className="w-3 h-3" stroke="#fff" strokeWidth={3} /> : <X className="w-3 h-3" stroke="#fff" strokeWidth={3} />)}
                      </span>
                      <span className="text-[15px] leading-relaxed" style={{ color: on ? T.ink : T.ink2 }}>{d}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
export default function DosAndDontsClient() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />
      <ReadingProgress />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-14 sm:pb-20 px-4 overflow-hidden" style={{ backgroundColor: T.bg }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.20) 0%, rgba(124,58,237,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.20) 0%, rgba(255,160,0,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 max-w-6xl mx-auto">
          <Breadcrumbs items={[{ label: copy.DosAndDontsClient_s01.t127, href: "/resources" }, { label: copy.DosAndDontsClient_s01.t128, href: "/resources/guides" }, { label: copy.DosAndDontsClient_s01.t129, href: "/resources/guides/dos-and-donts-of-outreach" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: T.purpleBorder, background: "rgba(124,58,237,0.07)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: T.purple }} />
                <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: T.purple }}>{copy.DosAndDontsClient_s01.t130}</span>
              </div>
              <h1 className="hero-fade-d1 text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: T.ink }}>
                <span style={{ color: T.purple }}>{copy.DosAndDontsClient_s01.t131}</span>
                <br />{copy.DosAndDontsClient_s01.t132}</h1>
              <p className="hero-fade-d2 text-lg sm:text-xl leading-relaxed max-w-xl" style={{ color: T.muted }}>{copy.DosAndDontsClient_s01.t133}</p>
              <div className="hero-fade-d3 flex items-center gap-3 mt-8 text-sm" style={{ color: T.muted }}>
                <span aria-hidden="true" className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black" style={{ backgroundColor: T.purple, color: "#ffffff" }}>{copy.DosAndDontsClient_s01.t134}</span>
                <span><span className="font-semibold" style={{ color: T.ink }}>{copy.DosAndDontsClient_s01.t135}</span>{copy.DosAndDontsClient_s01.t136}</span>
              </div>
            </div>

            <nav aria-label="In this guide" className="hero-fade-d3 lg:col-span-5 rounded-3xl p-2" style={{ backgroundColor: T.paper, border: `1px solid ${T.hairline}` }}>
              <p className="text-xs font-bold uppercase tracking-[0.18em] px-5 pt-4 pb-2" style={{ color: T.muted }}>{copy.DosAndDontsClient_s01.t137}</p>
              <ol>
                {GUIDE_INDEX.map((item, i) => (
                  <li key={item.href}>
                    <a href={item.href} className="group flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl transition-colors duration-200 hover:bg-[#F8F6F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1">
                      <span className="text-sm font-black tabular-nums w-6" style={{ color: T.purple }}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex-1 text-[15px] font-semibold" style={{ color: T.ink }}>{item.label}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} style={{ color: T.muted }} />
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* Opening story + makeover */}
      <article id="makeover" className="py-14 sm:py-20 px-4 border-t scroll-mt-24" style={{ borderColor: T.hairline, backgroundColor: T.paper }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <FadeIn>
                <h2 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight mb-6" style={{ color: T.ink }}>{copy.DosAndDontsClient_s02.t01}</h2>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: T.ink2 }}>{copy.DosAndDontsClient_s02.t02}</p>
                <p className="text-base sm:text-lg leading-relaxed mt-4" style={{ color: T.ink2 }}>{copy.DosAndDontsClient_s02.t03}</p>
                <figure className="relative mt-8 rounded-3xl border p-6 sm:p-7 overflow-hidden" style={{ backgroundColor: T.amberSoft, borderColor: T.amberBorder }}>
                  <span aria-hidden="true" className="absolute -top-5 right-5 text-8xl font-black opacity-10 select-none" style={{ color: T.amber }}>&ldquo;</span>
                  <blockquote className="text-2xl sm:text-3xl font-black leading-tight tracking-tight" style={{ color: T.ink }}>{copy.DosAndDontsClient_s02.t04}</blockquote>
                  <figcaption className="mt-3 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: textTone(T.amber) }}>{copy.DosAndDontsClient_s02.t05}</figcaption>
                </figure>
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <FadeIn delay={120}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: T.purple }}>{copy.DosAndDontsClient_s02.t06}</p>
                <MessageMakeover />
              </FadeIn>
            </div>
          </div>

          {/* Loom video */}
          <FadeIn>
            <div className="mt-10 sm:mt-14 max-w-3xl mx-auto rounded-2xl sm:rounded-3xl p-2.5 sm:p-4" style={{ backgroundColor: T.amberSoft, border: `1px solid ${T.amberBorder}`, boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-2 px-3 pt-2 pb-4">
                <Play className="w-3.5 h-3.5" strokeWidth={2.5} style={{ color: "#A14A08" }} fill="#A14A08" />
                <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "#A14A08" }}>{copy.DosAndDontsClient_s02.t07}</p>
              </div>
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: "16px", overflow: "hidden" }}>
                <iframe
                  src="https://www.loom.com/embed/143c7b6ae41242bbbad797539987d214"
                  title={copy.DosAndDontsClient_s02.t08}
                  allow="fullscreen"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </article>

      {/* 01 · Pattern interrupts */}
      <section id="interrupts" className="py-14 sm:py-20 px-4 border-t scroll-mt-24" style={{ borderColor: T.hairline, backgroundColor: T.bg }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionHeader n="01" eyebrow="Pattern disruption" title={copy.DosAndDontsClient_s02.t09} lede="Tap a card. Each one works for the same reason: it doesn't fit the shape a prospect has learned to skim past." />
          </FadeIn>
          <InterruptCards />

          <FadeIn>
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: T.purple }}>{copy.DosAndDontsClient_s02.t10}</span>
              </div>
              <LessonStepper />
              <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <p className="text-sm" style={{ color: T.muted }}>{copy.DosAndDontsClient_s02.t11}{" "}
                  <a href="https://zcu.ge/M0W" target="_blank" rel="noopener noreferrer" className="font-bold underline-offset-4 hover:underline" style={{ color: T.purple }}>{copy.DosAndDontsClient_s02.t12}</a>.
                </p>
                <p className={`${caveat.className} text-3xl leading-none`} style={{ color: T.purple }}>{copy.DosAndDontsClient_s02.t13}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 02 · By channel */}
      <section id="channels" className="py-14 sm:py-20 px-4 border-t scroll-mt-24" style={{ borderColor: T.hairline, backgroundColor: T.paper }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <SectionHeader n="02" eyebrow="By channel" accent={T.linkedin} title={<>{copy.DosAndDontsClient_s02.t14}<span style={{ color: T.linkedin }}>{copy.DosAndDontsClient_s02.t15}</span></>} lede="What works on LinkedIn reads as a pitch in email, and vice versa. Pick one." />
            <ChannelTabs />
          </FadeIn>
        </div>
      </section>

      {/* 03 · Subject lines */}
      <section id="subjects" className="py-14 sm:py-20 px-4 border-t scroll-mt-24" style={{ borderColor: T.hairline, backgroundColor: T.bg }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionHeader n="03" eyebrow="Cold email" accent={T.amber} title={copy.DosAndDontsClient_s02.t16} lede="Pulled from sequences that are running right now. Every one of them looks like a real email, not a broadcast." />
            <SubjectLines />
          </FadeIn>
        </div>
      </section>

      {/* 04 · Enrichment */}
      <section id="enrichment" className="py-14 sm:py-20 px-4 border-t scroll-mt-24" style={{ borderColor: T.hairline, backgroundColor: T.paper }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <FadeIn>
                <SectionHeader n="04" eyebrow="The unglamorous part" accent={T.amber} title={copy.DosAndDontsClient_s02.t17} />
                <p className="text-base leading-relaxed -mt-4" style={{ color: T.ink2 }}>{copy.DosAndDontsClient_s02.t18}<strong style={{ color: T.ink }}>{copy.DosAndDontsClient_s02.t19}</strong>{copy.DosAndDontsClient_s02.t20}</p>
                <p className="text-xl font-black leading-snug mt-6 pl-5 border-l-2" style={{ color: T.ink, borderColor: T.amber }}>{copy.DosAndDontsClient_s02.t21}</p>
                <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: T.muted }}>{copy.DosAndDontsClient_s02.t22}</p>
                  <ul className="flex flex-wrap gap-2">
                    {ENRICHMENT_TOOLS.map((t) => (
                      <li key={t.name} className="group relative">
                        <span className="inline-flex text-sm font-bold px-3.5 py-2 rounded-full cursor-default transition-colors duration-200 group-hover:border-[#0a0a0a]" style={{ backgroundColor: T.paper, border: `1px solid ${T.hairline}`, color: T.ink }} tabIndex={0} aria-describedby={`tool-${t.name.replace(/[^a-z]/gi, "")}`}>
                          {t.name}
                        </span>
                        <span id={`tool-${t.name.replace(/[^a-z]/gi, "")}`} role="tooltip" className="pointer-events-none absolute left-0 top-full mt-2 w-56 rounded-xl px-3 py-2 text-xs leading-relaxed opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 z-10" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E2D9", color: "#3D3D3D", boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}>
                          {t.body}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <FadeIn delay={120}>
                <EnrichDemo />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 05 · Free tools */}
      <section className="py-14 sm:py-20 px-4 border-t" style={{ borderColor: T.hairline, backgroundColor: T.bg }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionHeader n="05" eyebrow="Free tools" accent={T.green} title={copy.DosAndDontsClient_s02.t23} lede="No jargon, just what each one does and when to reach for it." />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOOLS.map((t, i) => (
              <FadeIn key={t.href} delay={i * 60}>
                <Link
                  href={t.href}
                  className="group flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ backgroundColor: `${t.accent}0D`, border: `1.5px solid ${t.accent}55` }}
                >
                  <div className="h-1.5" style={{ background: `linear-gradient(90deg,${t.accent},${t.accent}99)` }} />
                  <div className="flex flex-col flex-1 p-5 sm:p-7">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105" style={{ backgroundColor: t.accent, color: "#ffffff" }}>
                        <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
                      </span>
                      <span className="text-xs font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full" style={{ backgroundColor: T.paper, color: textTone(t.accent), border: `1px solid ${t.accent}55` }}>{copy.DosAndDontsClient_s02.t24}</span>
                    </div>
                    <h3 className="text-xl font-black leading-snug mb-2" style={{ color: T.ink }}>{t.name}</h3>
                    <p className="text-[15px] leading-relaxed mb-5" style={{ color: T.ink2 }}>{t.plain}</p>
                    <p className="text-sm leading-relaxed mt-auto pt-4 border-t" style={{ color: T.muted, borderColor: `${t.accent}33` }}>
                      <span className="font-bold" style={{ color: T.ink }}>{copy.DosAndDontsClient_s02.t25}</span>{t.useCase}
                    </p>
                    <span className="mt-5 inline-flex items-center justify-center gap-2 self-start rounded-full px-5 py-2.5 text-sm font-bold text-white transition-transform duration-300 group-hover:translate-x-0.5" style={{ backgroundColor: textTone(t.accent), boxShadow: `0 6px 16px ${t.accent}55` }}>{copy.DosAndDontsClient_s02.t26}<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 06 · Self-audit */}
      <section id="score" className="py-14 sm:py-20 px-4 border-t scroll-mt-24" style={{ borderColor: T.hairline, backgroundColor: T.paper }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <SectionHeader n="06" eyebrow="Self-audit" title={copy.DosAndDontsClient_s02.t27} />
            <SelfAudit />
          </FadeIn>

          <div className="mt-10">
            <AskYourAI resources={AI_RESOURCES} />
          </div>

          <FadeIn>
            <div className="mt-6 rounded-3xl p-5 sm:p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:items-center" style={{ backgroundColor: T.amberSoft, border: `1px solid ${T.amberBorder}` }}>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: textTone(T.amber) }}>{copy.DosAndDontsClient_s02.t28}</p>
                <h3 className="text-2xl font-black leading-tight mb-2" style={{ color: T.ink }}>{copy.DosAndDontsClient_s03.t01}</h3>
                <p className="text-sm leading-relaxed" style={{ color: T.muted }}>{copy.DosAndDontsClient_s03.t02}</p>
              </div>
              <div className="md:min-w-[20rem]">
                <NewsletterForm inputId="dos-donts-newsletter-email" compact />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4 text-center border-t" style={{ borderColor: T.hairline, backgroundColor: T.bg }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <span aria-hidden="true" className="block h-px w-12 mx-auto mb-8" style={{ backgroundColor: T.purple }} />
            <h2 className="text-[1.75rem] sm:text-5xl font-black leading-tight tracking-tight mb-5" style={{ color: T.ink }}>{copy.DosAndDontsClient_s04.t01}</h2>
            <p className="text-base sm:text-lg mb-10" style={{ color: T.muted }}>{copy.DosAndDontsClient_s04.t02}</p>
            <a href="/book-a-call" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">{copy.DosAndDontsClient_s04.t03}<ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </a>
          </FadeIn>
        </div>
      </section>
    </InnerLayout>
  );
}
