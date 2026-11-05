"use client";

import { Fragment, useEffect, useRef } from "react";
import { Rocket, Zap, Target, Mail, Bot } from "lucide-react";
import InnerLayout from "@/app/components/InnerLayout";
import FadeIn from "@/app/components/FadeIn";
import OrbitHero, { type PlanetKind } from "./OrbitHero";
import { GOLD_TEXT, textTone } from "@/lib/colors";

// Every one of these is identical across all 3 tiers (8 infrastructure items
// + the first 4 content items), so they're shown once instead of being
// repeated 3x over -- the only real differences live in DIFFERENTIATORS below.
const INCLUDED_IN_EVERY_PLAN = [
  "Dedicated Account Manager",
  "Monthly Check-In with Founder",
  "End-of-Month (EOM) Reports",
  "ICP Definition Template",
  "Value Proposition Template",
  "One-Time Profile Optimisation",
  "One-Time Competitor Analysis",
  "ORM - Comments & Responses",
  "Content Ideation & Strategy",
  "Content Writing",
  "Monthly Video Interview",
  "4 Content Pieces / Month",
];

type Cell = boolean | string;

interface DiffRow {
  label: string;
  values: [Cell, Cell, Cell]; // Starter, Growth, Lead Generation
  info?: string;
}

const DIFFERENTIATORS: DiffRow[] = [
  { label: "Connection Requests / Month", values: ["300", "600", "600"], info: "LinkedIn has an 800 connection request monthly limit." },
  { label: "Follow-Up Messages per Prospect", values: ["2", "4", "4"], info: "Most people reply on the 3rd follow-up." },
  { label: "InMails / Month", values: [false, "15", "15"], info: "We use InMails to reach out to your ICPs without having to connect with them first." },
  { label: "Video-Based Posts / Month", values: [false, "2", false], info: "LinkedIn is turning into a video-first platform very soon: more authority, more trust." },
  { label: "Cheatsheet / PDF (Lead Magnet)", values: [false, true, false], info: "We build things like checklists, ROI calculators, and other lead magnets." },
  { label: "Strategic Engagements / Post", values: [false, "5", false], info: "We comment on your ICP's LinkedIn posts with thought-provoking takes, not one-liners." },
];

// Short clarifications for the less self-explanatory Growth Infrastructure
// and Content rows, keyed by label so they can be attached when building
// TABLE_SECTIONS below without changing the shape of the arrays above.
const ROW_INFO: Record<string, string> = {
  "ICP Definition Template": "A structured worksheet defining exactly who your ideal customer is, used to guide targeting and messaging.",
  "Value Proposition Template": "A framework for articulating why a prospect should choose you, used across your profile, content, and outreach.",
  "One-Time Profile Optimisation": "A single pass to rewrite and restructure your LinkedIn profile for credibility and inbound interest.",
  "One-Time Competitor Analysis": "A one-time review of how competitors position themselves, used to sharpen your own positioning.",
  "ORM - Comments & Responses": "We monitor and respond to comments on your posts to keep engagement active and protect your reputation.",
  "End-of-Month (EOM) Reports": "A monthly summary of what was posted, sent, and booked, so you can see exactly what happened.",
  "Monthly Video Interview": "A monthly video interview with you or your team, edited and repurposed into short-form content.",
  "2 Video-Based Posts / Month": "LinkedIn is turning into a video-first platform very soon: more authority, more trust.",
  "1 Cheatsheet / PDF (Lead Magnet)": "We build things like checklists, ROI calculators, and other lead magnets.",
  "5 Strategic Engagements / Post": "We comment on your ICP's LinkedIn posts with thought-provoking takes, not one-liners.",
};

interface TableSection {
  title: string;
  rows: DiffRow[];
  // Ties each section's header row back to the part of the brand palette it
  // most relates to, so the three groups read as distinct categories rather
  // than one repeated amber divider: Growth Infrastructure is the neutral
  // foundation everyone gets, Content mirrors the Growth tier's own gold
  // accent, Lead Generation mirrors the Lead Generation tier's teal.
  tint: string;
  tintText: string;
}

// Full per-card breakdown for the Content and Lead Generation sections
// (Growth Infrastructure is identical across all 3 tiers, so it stays in the
// shared "Included in every plan" band instead of repeating 3x here).
const CONTENT_ITEMS: { label: string; included: [boolean, boolean, boolean] }[] = [
  { label: "Content Ideation & Strategy", included: [true, true, true] },
  { label: "Content Writing", included: [true, true, true] },
  { label: "Monthly Video Interview", included: [true, true, true] },
  { label: "4 Content Pieces / Month", included: [true, true, true] },
  { label: "2 Video-Based Posts / Month", included: [false, true, false] },
  { label: "1 Cheatsheet / PDF (Lead Magnet)", included: [false, true, false] },
  { label: "5 Strategic Engagements / Post", included: [false, true, false] },
];

// A few standout numbers per tier, not the full breakdown -- the complete
// itemised Content/Lead Generation/Growth Infrastructure list lives once, in
// the comparison table below, so it isn't repeated card-by-card.
// Indexed by tier: 0 = Starter, 1 = Growth, 2 = Lead Generation
const CARD_HIGHLIGHTS: string[][] = [
  ["300 Connection Requests / Month", "2 Follow-Ups per Prospect", "4 Content Pieces / Month"],
  ["600 Connection Requests / Month", "15 InMails / Month", "2 Video-Based Posts / Month"],
  ["600 Connection Requests / Month", "15 InMails / Month", "4 Content Pieces / Month"],
];

// Full comparison table: every row from the PDF, grouped the same way as the
// per-card sections above (Growth Infrastructure is identical across tiers,
// shown here too since the table is meant to be the single complete view).
const TABLE_SECTIONS: TableSection[] = [
  {
    title: "Growth Infrastructure",
    rows: INCLUDED_IN_EVERY_PLAN.slice(0, 8).map((label) => ({ label, values: [true, true, true] as [Cell, Cell, Cell], info: ROW_INFO[label] })),
    tint: "#F1EEE7",
    tintText: "#71675E",
  },
  {
    title: "Content",
    rows: CONTENT_ITEMS.map((c) => ({ label: c.label, values: c.included as [Cell, Cell, Cell], info: ROW_INFO[c.label] })),
    tint: "#FEF9EC",
    tintText: "#A14A08",
  },
  {
    title: "Lead Generation",
    rows: DIFFERENTIATORS.slice(0, 3),
    tint: "#ECFBF9",
    tintText: "#0F766E",
  },
];

const COLD_EMAIL_FEATURES = [
  "1,200 emails/day (26,400/month)",
  "10 domains + 40 email accounts",
  "Full DNS setup & IP rotation",
  "ICP-based lead list (5,000 prospects/month)",
  "A/B testing & ongoing campaign optimization",
  "Advanced reporting & real-time tracking",
  "Cold email copywriting & strategy",
  "3-4 follow-ups & lead nurturing",
];

const LINKEDIN_TOOL_FEATURES = [
  "Log in via LinkedIn, full campaign control",
  "AI-suggested messaging & follow-up sequences",
  "Automated connection requests & follow-ups",
  "Full analytics: acceptance, reply rates, lead status",
  "Direct human support, no AI chatbots, no queues",
];

// Same 3-accent rotation Services.tsx uses for its cards.
const GOLD = "#F5B731";
const BLUE = "#3B82F6";
const PURPLE = "#7C3AED";
const ORANGE = "#F97316";
const TEAL = "#14B8A6";
const GREEN = "#10B981";
const TEXT_DARK = "#0a0a0a";
const TEXT_BODY = "#52525B";
const TEXT_MUTED = "#71675E";
const BORDER = "#E8E2D9";

function CheckIcon({ color }: { color: string }) {
  return (
    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CheckedItem({ label, accent }: { label: string; accent: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm" style={{ color: "#3D3D3D" }}>
      <CheckIcon color={accent} />
      <span className="font-semibold">{label}</span>
    </li>
  );
}

function DiffCell({ value, accent }: { value: Cell; accent: string }) {
  if (value === false) {
    return <span className="text-sm font-bold" style={{ color: "#C9C2B7" }}>-</span>;
  }
  if (value === true) {
    // The shared CheckIcon is a block-level svg (with a small top margin for
    // list-item alignment), so text-center on the cell doesn't center it;
    // center it explicitly and drop the margin so it lines up with the
    // numbers and dashes in the same row.
    return (
      <span className="flex justify-center [&>svg]:mt-0">
        <CheckIcon color={accent} />
      </span>
    );
  }
  return <span className="text-sm font-black" style={{ color: TEXT_DARK }}>{value}</span>;
}

function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex items-center ml-1.5 align-middle">
      <span
        tabIndex={0}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full text-xs font-black cursor-help"
        style={{ backgroundColor: "#EFEBE4", color: TEXT_MUTED }}
        aria-label={text}
      >
        i
      </span>
      <span
        className="pointer-events-none absolute left-1/2 bottom-full mb-2 w-56 -translate-x-1/2 rounded-lg px-3 py-2 text-xs font-normal leading-snug text-left opacity-0 scale-95 transition-all duration-150 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100 z-20"
        style={{ backgroundColor: TEXT_DARK, color: "#ffffff" }}
      >
        {text}
      </span>
    </span>
  );
}

// Same count-up technique as Hero.tsx / Services.tsx's stat counters:
// animate a plain digit count on scroll-into-view, then snap to the exact
// pre-formatted price string on completion so region-specific comma
// grouping (e.g. India's 1,74,999 vs the West's 1,799) is never reformatted
// by this component -- it only ever displays strings the caller already
// formatted correctly.
function AnimatedPrice({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numericTarget = parseInt(target.replace(/[^0-9]/g, ""), 10);
    if (!numericTarget) {
      el.textContent = target;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = target;
      return;
    }

    let animId: number;
    const duration = 900;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let startTime: number | null = null;
        function tick(ts: number) {
          if (!startTime) startTime = ts;
          const progress = Math.min((ts - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          if (el) {
            el.textContent = progress < 1 ? Math.round(eased * numericTarget).toLocaleString("en-US") : target;
          }
          if (progress < 1) animId = requestAnimationFrame(tick);
        }
        animId = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [target]);

  return <span ref={ref}>0</span>;
}

function GhostNumber({ n, accent }: { n: string; accent: string }) {
  return (
    <span className="text-6xl font-black leading-none select-none absolute top-6 right-6" aria-hidden="true" style={{ color: accent, opacity: 0.12 }}>
      {n}
    </span>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap">
        <h2 className="text-2xl font-black leading-tight" style={{ color: TEXT_DARK }}>{title}</h2>
        <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ color: GOLD_TEXT, backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.35)" }}>{eyebrow}</span>
      </div>
      {/* Always its own line, regardless of title length, so every section
          heading takes up the same height and the cards below line up. */}
      <p className="text-xs font-bold uppercase tracking-widest mt-1.5" style={{ color: TEXT_MUTED }}>{subtitle}</p>
    </div>
  );
}

export interface GrowthPlansPricingProps {
  pageTitle: string;
  // Which planet the hero shows; matches the plan code in the URL.
  planet?: PlanetKind;
  currencyPrefix: string;
  currencySuffix?: string;
  prices: {
    starter: string;
    growth: string;
    leadGen: string;
    coldEmail: string;
    automation: string;
  };
}

export default function GrowthPlansPricing({ pageTitle, planet, currencyPrefix, currencySuffix, prices }: GrowthPlansPricingProps) {
  const titleWords = pageTitle.split(" ");
  const accentWord = titleWords[titleWords.length - 1];
  const leadWords = titleWords.slice(0, -1).join(" ");

  const tiers = [
    { name: "LinkedIn Starter", tagline: "Foundational LinkedIn growth", icon: Rocket, price: prices.starter, accent: BLUE },
    { name: "LinkedIn Growth", tagline: "Best for maximum pipeline", icon: Zap, price: prices.growth, featured: true, accent: GOLD },
    { name: "Lead Generation", tagline: "Volume-focused outbound", icon: Target, price: prices.leadGen, accent: TEAL },
  ];

  // Same slow ambient drift as Hero.tsx / CTABanner.tsx's background blobs,
  // just with smaller travel since this section is shorter. Skipped on
  // mobile (matching those components) and under prefers-reduced-motion
  // (an addition on top of the homepage's own version).
  const blobGoldRef = useRef<HTMLDivElement>(null);
  const blobPurpleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animId: number;
    const startTime = performance.now();

    function animate() {
      const t = (performance.now() - startTime) / 1000;
      if (blobGoldRef.current) {
        const x = Math.sin(t * 0.7) * 60 + Math.sin(t * 0.3) * 20;
        const y = Math.cos(t * 0.5) * 40 + Math.cos(t * 0.2) * 15;
        blobGoldRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (blobPurpleRef.current) {
        const x = Math.sin(t * 0.6 + 2) * 60 + Math.cos(t * 0.4) * 20;
        const y = Math.cos(t * 0.8 + 1) * 40 + Math.sin(t * 0.35) * 15;
        blobPurpleRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <InnerLayout>
      <section className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        {/* Soft gold-to-lavender wash behind the hero, matching the planet
            artwork -- fades out via mask before the cards so the table and
            cards below sit back on plain cream. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "820px",
            background:
              "radial-gradient(ellipse 60% 62% at 8% 22%, rgba(245,183,49,0.34) 0%, rgba(245,183,49,0.10) 48%, transparent 74%)," +
              "radial-gradient(ellipse 52% 60% at 92% 30%, rgba(167,139,250,0.34) 0%, rgba(167,139,250,0.10) 48%, transparent 74%)," +
              "radial-gradient(ellipse 46% 40% at 86% 72%, rgba(167,139,250,0.26) 0%, transparent 70%)," +
              "radial-gradient(ellipse 40% 36% at 10% 66%, rgba(245,183,49,0.18) 0%, transparent 70%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 62%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 62%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Subtle blobs, same treatment as Services.tsx / CTABanner.tsx, now drifting like Hero.tsx's */}
        <div ref={blobGoldRef} aria-hidden="true" style={{ position: "absolute", top: "-80px", right: "-60px", width: "480px", height: "480px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.20) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none", willChange: "transform" }} />
        <div ref={blobPurpleRef} aria-hidden="true" style={{ position: "absolute", bottom: "-80px", left: "-60px", width: "480px", height: "480px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none", willChange: "transform" }} />

        <OrbitHero
          leadWords={leadWords}
          accentWord={accentWord}
          planet={planet}
          priceNode={<>{currencyPrefix}<AnimatedPrice target={prices.starter} /></>}
          billingNote={`${currencySuffix ? `${currencySuffix}, ` : ""}billed monthly`}
          summary="LinkedIn growth and lead generation, run as a done-for-you system. Every plan shares the same foundation, the difference is how much volume and content sits on top of it."
        />

        <div className="relative max-w-5xl mx-auto space-y-14">
          <div>
            <FadeIn>
              <SectionHeading eyebrow="01" title="LinkedIn Growth Plans" subtitle="Done For You" />
            </FadeIn>

            {/* Tier cards -- each fades in with its own slightly later delay
                so they cascade left-to-right instead of arriving as one block. */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch mt-6">
              {tiers.map((tier, i) => {
                const Icon = tier.icon;
                return (
                  <FadeIn key={tier.name} delay={80 + i * 90} className={tier.featured ? "sm:-mt-4 sm:relative sm:z-10" : ""}>
                    <article
                      className="price-card group relative flex flex-col rounded-2xl overflow-hidden bg-white"
                      style={{
                        border: tier.featured ? `1.5px solid ${tier.accent}` : `1px solid ${BORDER}`,
                        borderTop: `3px solid ${tier.accent}`,
                        boxShadow: tier.featured ? `0 16px 40px ${tier.accent}38` : "0 2px 10px rgba(0,0,0,0.04)",
                      }}
                    >
                      {tier.featured && (
                        <div className="price-badge-pop absolute top-0 left-1/2 rounded-b-lg px-4 py-1 text-center font-black text-xs text-white whitespace-nowrap" style={{ backgroundColor: textTone(tier.accent), zIndex: 10 }}>
                          MOST POPULAR
                        </div>
                      )}
                      <div className={tier.featured ? "p-6 sm:p-8 pt-8 sm:pt-10 flex flex-col flex-1 relative" : "p-6 sm:p-7 flex flex-col flex-1 relative"}>
                        <GhostNumber n={String(i + 1)} accent={tier.accent} />

                        <div className="flex items-center gap-3 mb-5 mt-2">
                          <div className={`price-icon rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${tier.featured ? "w-12 h-12" : "w-11 h-11"}`} style={{ background: `${tier.accent}15`, border: `1.5px solid ${tier.accent}38` }}>
                            <Icon className={tier.featured ? "w-6 h-6" : "w-5 h-5"} color={tier.accent} strokeWidth={2} />
                          </div>
                          <div>
                            <h3 className="text-base font-black leading-tight" style={{ color: TEXT_DARK }}>{tier.name}</h3>
                            <p className="text-xs font-medium" style={{ color: TEXT_MUTED }}>{tier.tagline}</p>
                          </div>
                        </div>

                        <div className="mb-5">
                          <span className={tier.featured ? "text-4xl font-black" : "text-3xl font-black"} style={{ color: TEXT_DARK }}>{currencyPrefix}<AnimatedPrice target={tier.price} /></span>
                          {currencySuffix && <span className="text-xs font-semibold" style={{ color: TEXT_MUTED }}> {currencySuffix}</span>}
                          <span className="text-xs font-semibold" style={{ color: TEXT_MUTED }}> / month</span>
                        </div>

                        <div className="flex-1 space-y-2.5 mb-5">
                          <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: textTone(tier.accent) }}>Highlights</p>
                          <ul className="space-y-1.5">
                            {CARD_HIGHLIGHTS[i].map((label) => (
                              <li key={label} className="flex items-start gap-2 text-sm" style={{ color: "#3D3D3D" }}>
                                <CheckIcon color={tier.accent} />
                                <span className="font-semibold">{label}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs leading-snug pt-1.5" style={{ color: TEXT_MUTED }}>
                            <a href="#included-in-every-plan" className="font-bold underline" style={{ color: textTone(tier.accent) }}>+ Growth Infrastructure (same on every plan)</a>
                            {" · "}
                            <a href="#plan-comparison" className="font-bold underline" style={{ color: textTone(tier.accent) }}>Full comparison</a>
                          </p>
                        </div>

                        <a href="/book-a-call" className="btn-dark price-cta inline-block w-full text-center px-6 py-3 text-sm font-bold rounded-full">
                          Get Started
                        </a>
                      </div>
                    </article>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* Shared inclusions, shown once */}
          <FadeIn delay={140}>
            <div id="included-in-every-plan" className="rounded-2xl p-6 sm:p-8 scroll-mt-28 bg-white" style={{ border: `1px solid ${BORDER}` }}>
              <div className="flex items-baseline justify-between flex-wrap gap-2 mb-5">
                <h2 className="text-sm font-black uppercase tracking-widest" style={{ color: TEXT_DARK }}>Included in every plan</h2>
                <span className="text-xs font-semibold" style={{ color: TEXT_MUTED }}>Same on all 3 tiers</span>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: TEXT_MUTED }}>Growth Infrastructure</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                    {INCLUDED_IN_EVERY_PLAN.slice(0, 8).map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "#3D3D3D" }}>
                        <CheckIcon color={GREEN} />
                        <span className="font-semibold">{item}</span>
                        {ROW_INFO[item] && <InfoTooltip text={ROW_INFO[item]} />}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-5" style={{ borderTop: `1px solid ${BORDER}` }}>
                  <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: TEXT_MUTED }}>Content Foundation</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                    {INCLUDED_IN_EVERY_PLAN.slice(8).map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "#3D3D3D" }}>
                        <CheckIcon color={GREEN} />
                        <span className="font-semibold">{item}</span>
                        {ROW_INFO[item] && <InfoTooltip text={ROW_INFO[item]} />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Full comparison table */}
          <FadeIn delay={200}>
            <div id="plan-comparison" className="rounded-2xl overflow-hidden bg-white scroll-mt-28" style={{ border: `1px solid ${BORDER}` }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <h2 className="text-sm font-black uppercase tracking-widest" style={{ color: TEXT_DARK }}>Overview</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full" style={{ minWidth: 560 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-black uppercase tracking-widest sticky left-0 bg-white" style={{ color: TEXT_MUTED, minWidth: 220 }}>
                        Feature
                      </th>
                      {tiers.map((tier) => (
                        <th
                          key={tier.name}
                          className="px-4 py-3 text-center text-xs font-black"
                          style={{ color: textTone(tier.accent), backgroundColor: `${tier.accent}0d`, width: 130 }}
                        >
                          {tier.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_SECTIONS.map((section) => (
                      <Fragment key={section.title}>
                        <tr>
                          <td colSpan={4} className="px-4 sm:px-6 py-2.5 text-xs font-black uppercase tracking-widest" style={{ color: section.tintText, backgroundColor: section.tint }}>
                            {section.title}
                          </td>
                        </tr>
                        {section.rows.map((row) => (
                          <tr key={row.label} className="price-row" style={{ borderTop: `1px solid ${BORDER}` }}>
                            <td className="px-4 sm:px-6 py-4 text-sm font-semibold sticky left-0 bg-white" style={{ color: "#3D3D3D", minWidth: 220 }}>
                              {row.label}
                              {row.info && <InfoTooltip text={row.info} />}
                            </td>
                            {row.values.map((v, ci) => (
                              <td
                                key={ci}
                                className="px-4 py-4 text-center"
                                style={{ backgroundColor: `${tiers[ci].accent}0d`, width: 130 }}
                              >
                                <DiffCell value={v} accent={tiers[ci].accent} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>

          {/* Additional standalone options -- a horizontal split (features
              left, price/CTA right on larger screens) so these read as
              distinct single-item offers rather than a repeat of the
              3-tier comparison cards above. */}
          <div className="space-y-10">
            <FadeIn>
              <div>
                <div className="mb-6">
                  <SectionHeading eyebrow="02" title="Cold Email Outbound System" subtitle="Done For You" />
                </div>
                <article className="price-card group relative flex flex-col lg:flex-row rounded-2xl overflow-hidden bg-white" style={{ border: `1px solid ${BORDER}`, borderTop: `3px solid ${ORANGE}`, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                  <div className="p-6 sm:p-8 flex-1 flex flex-col relative">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="price-icon w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110" style={{ background: `${ORANGE}15`, border: `1.5px solid ${ORANGE}38` }}>
                        <Mail className="w-6 h-6" color={ORANGE} strokeWidth={2} />
                      </div>
                      <p className="text-sm font-semibold" style={{ color: TEXT_BODY }}>Fully managed sending infrastructure and outreach</p>
                    </div>
                    <ul className="space-y-2.5">
                      {COLD_EMAIL_FEATURES.map((f) => <CheckedItem key={f} label={f} accent={ORANGE} />)}
                    </ul>
                  </div>
                  <div
                    className="p-6 sm:p-8 flex flex-col justify-center lg:w-[300px] lg:shrink-0"
                    style={{ borderTop: `1px solid ${BORDER}`, backgroundColor: `${ORANGE}08` }}
                  >
                    <div className="mb-5">
                      <span className="text-3xl font-black" style={{ color: TEXT_DARK }}>{currencyPrefix}<AnimatedPrice target={prices.coldEmail} /></span>
                      {currencySuffix && <span className="text-sm font-semibold" style={{ color: TEXT_MUTED }}> {currencySuffix}</span>}
                      <div className="text-sm font-semibold" style={{ color: TEXT_MUTED }}>/ month</div>
                    </div>
                    <div className="rounded-xl p-4 mb-5 bg-white" style={{ border: `1px solid ${BORDER}` }}>
                      <p className="text-xs font-black uppercase tracking-widest mb-1.5" style={{ color: TEXT_MUTED }}>Note</p>
                      <p className="text-xs leading-relaxed" style={{ color: TEXT_BODY }}>
                        You purchase: domains &amp; email accounts. We cover: all sending &amp; lead sourcing software.
                      </p>
                    </div>
                    <a href="/book-a-call" className="btn-dark price-cta inline-block w-full text-center px-6 py-3 text-sm font-bold rounded-full">
                      Get Started
                    </a>
                  </div>
                </article>
              </div>
            </FadeIn>

            <FadeIn delay={90}>
              <div>
                <div className="mb-6">
                  <SectionHeading eyebrow="03" title="LinkedIn Automation Tool" subtitle="Do It Yourself" />
                </div>
                <article className="price-card group relative flex flex-col lg:flex-row rounded-2xl overflow-hidden bg-white" style={{ border: `1px solid ${BORDER}`, borderTop: `3px solid ${PURPLE}`, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                  <div className="p-6 sm:p-8 flex-1 flex flex-col relative">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="price-icon w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110" style={{ background: `${PURPLE}15`, border: `1.5px solid ${PURPLE}38` }}>
                        <Bot className="w-6 h-6" color={PURPLE} strokeWidth={2} />
                      </div>
                      <p className="text-sm font-semibold" style={{ color: TEXT_BODY }}>Self-serve, you stay in the driver&apos;s seat</p>
                    </div>
                    <ul className="space-y-2.5">
                      {LINKEDIN_TOOL_FEATURES.map((f) => <CheckedItem key={f} label={f} accent={PURPLE} />)}
                    </ul>
                  </div>
                  <div
                    className="p-6 sm:p-8 flex flex-col justify-center lg:w-[300px] lg:shrink-0"
                    style={{ borderTop: `1px solid ${BORDER}`, backgroundColor: `${PURPLE}08` }}
                  >
                    <div className="mb-5">
                      <span className="text-3xl font-black" style={{ color: TEXT_DARK }}>{currencyPrefix}<AnimatedPrice target={prices.automation} /></span>
                      {currencySuffix && <span className="text-sm font-semibold" style={{ color: TEXT_MUTED }}> {currencySuffix}</span>}
                      <div className="text-sm font-semibold" style={{ color: TEXT_MUTED }}>/ LinkedIn account / month</div>
                    </div>
                    <a href="/book-a-call" className="btn-dark price-cta inline-block w-full text-center px-6 py-3 text-sm font-bold rounded-full">
                      Get Started
                    </a>
                  </div>
                </article>
              </div>
            </FadeIn>
          </div>

          {/* Terms & Conditions -- deliberately the quietest thing on the
              page: a plain footnote below a hairline, not another bordered
              white card competing for the same attention as the pricing
              and comparison content above. */}
          <FadeIn delay={60}>
            <div className="pt-8" style={{ borderTop: `1px solid ${BORDER}` }}>
              <h2 className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: TEXT_MUTED }}>Terms &amp; Conditions</h2>
              <ul className="space-y-2.5">
                {[
                  "Prices shown are indicative and exclude any applicable taxes unless stated otherwise.",
                  "Billing is monthly, in advance, on the plan selected.",
                  "For the Cold Email Outbound System, domains and email accounts are purchased separately by the client and are not included in the plan price.",
                  "Plan inclusions, volumes, and deliverables are typical monthly figures and may vary based on scope, ICP, and campaign performance.",
                  "A written service agreement covering contract term, cancellation, and other conditions is shared and signed before onboarding begins.",
                  "This page is indicative pricing for discussion purposes and does not itself constitute a binding offer.",
                ].map((term) => (
                  <li key={term} className="flex items-start gap-2.5 text-xs leading-relaxed" style={{ color: TEXT_MUTED }}>
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: GOLD }} />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs font-semibold mt-5" style={{ color: "#71675E" }}>Last updated September 25, 2026.</p>
            </div>
          </FadeIn>
        </div>

        <div className="relative max-w-3xl mx-auto text-center mt-14">
          <p className="text-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
            Have questions about which plan fits, or want something custom? Reach out at{" "}
            <a href="mailto:founder@myntmore.com" className="font-bold underline" style={{ color: TEXT_DARK }}>founder@myntmore.com</a>.
          </p>
        </div>
      </section>
    </InnerLayout>
  );
}
