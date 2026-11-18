"use client";

import { Fragment, useState } from "react";
import { LayoutList, Rocket, Table2, Target, Zap } from "lucide-react";
import { GOLD_TEXT, textTone } from "@/lib/colors";

// Stitch "Pricing page redesign" structure for the LinkedIn Growth Plans block:
// a sticky sub-nav with jump pills and a Quick Overview Cards / Full Detailed
// Matrix toggle, three tier cards, and one side-by-side matrix with a short
// description under every row. All type sizes, weights and colours are the
// ones the rest of this pricing page already uses (same values as
// GrowthPlansPricing.tsx and lib/colors.ts); only the structure follows Stitch.

const GOLD = "#F5B731";
const BLUE = "#3B82F6";
const TEAL = "#14B8A6";
const TEXT_DARK = "#0a0a0a";
const TEXT_MUTED = "#71675E";
const BORDER = "#E8E2D9";

type Cell = boolean | string;
type View = "cards" | "matrix";

interface Prices {
  starter: string;
  growth: string;
  leadGen: string;
}

interface Tier {
  key: keyof Prices;
  name: string;
  tagline: string;
  icon: typeof Rocket;
  accent: string;
  highlights: string[];
  missing?: string;
  note: string;
  featured?: boolean;
}

const TIERS: Tier[] = [
  {
    key: "starter",
    name: "LinkedIn Starter",
    tagline: "Foundational LinkedIn growth",
    icon: Rocket,
    accent: BLUE,
    highlights: ["300 Connection Requests / Month", "2 Follow-Ups per Prospect", "4 Content Pieces / Month"],
    missing: "Video posts & lead magnets",
    note: "+ Complete Growth Infrastructure included",
  },
  {
    key: "growth",
    name: "LinkedIn Growth",
    tagline: "Best for maximum pipeline",
    icon: Zap,
    accent: GOLD,
    highlights: [
      "600 Connection Requests / Month",
      "4 Follow-Up Messages per Prospect",
      "15 InMails / Month",
      "2 Video-Based Posts / Month",
      "1 Cheatsheet / PDF (Lead Magnet)",
      "5 Strategic Engagements / Post",
    ],
    note: "+ Complete Growth Infrastructure included",
    featured: true,
  },
  {
    key: "leadGen",
    name: "Lead Generation",
    tagline: "Volume-focused outbound",
    icon: Target,
    accent: TEAL,
    highlights: ["600 Connection Requests / Month", "4 Follow-Up Messages per Prospect", "15 InMails / Month", "4 Content Pieces / Month"],
    missing: "Video-based posts",
    note: "+ Complete Growth Infrastructure included",
  },
];

interface Row {
  label: string;
  info: string;
  values: [Cell, Cell, Cell]; // Starter, Growth, Lead Generation
}

interface Section {
  title: string;
  rows: Row[];
  bg: string;
  text: string;
}

const ALL: [Cell, Cell, Cell] = [true, true, true];

const SECTIONS: Section[] = [
  {
    title: "Growth Infrastructure",
    bg: "#F1EEE7",
    text: "#71675E",
    rows: [
      { label: "Dedicated Account Manager", info: "Your single point of contact for day-to-day execution.", values: ALL },
      { label: "Monthly Check-In with Founder", info: "A monthly call with the founder to review progress and priorities.", values: ALL },
      { label: "End-of-Month (EOM) Reports", info: "A monthly summary of what was posted, sent, and booked, so you can see exactly what happened.", values: ALL },
      { label: "ICP Definition Template", info: "A structured worksheet defining exactly who your ideal customer is, used to guide targeting and messaging.", values: ALL },
      { label: "Value Proposition Template", info: "A framework for articulating why a prospect should choose you, used across your profile, content, and outreach.", values: ALL },
      { label: "One-Time Profile Optimisation", info: "A single pass to rewrite and restructure your LinkedIn profile for credibility and inbound interest.", values: ALL },
      { label: "One-Time Competitor Analysis", info: "A one-time review of how competitors position themselves, used to sharpen your own positioning.", values: ALL },
      { label: "ORM - Comments & Responses", info: "We monitor and respond to comments on your posts to keep engagement active and protect your reputation.", values: ALL },
    ],
  },
  {
    title: "Content",
    bg: "#FEF9EC",
    text: "#A14A08",
    rows: [
      { label: "Content Ideation & Strategy", info: "Planning the themes and topics your content covers each month.", values: ALL },
      { label: "Content Writing", info: "Posts written for you, in your voice.", values: ALL },
      { label: "Monthly Video Interview", info: "A monthly video interview with you or your team, edited and repurposed into short-form content.", values: ALL },
      { label: "4 Content Pieces / Month", info: "Written posts published to your profile every month.", values: ALL },
      { label: "2 Video-Based Posts / Month", info: "LinkedIn is turning into a video-first platform very soon: more authority, more trust.", values: [false, true, false] },
      { label: "1 Cheatsheet / PDF (Lead Magnet)", info: "We build things like checklists, ROI calculators, and other lead magnets.", values: [false, true, false] },
      { label: "5 Strategic Engagements / Post", info: "We comment on your ICP's LinkedIn posts with thought-provoking takes, not one-liners.", values: [false, true, false] },
    ],
  },
  {
    title: "Lead Generation",
    bg: "#ECFBF9",
    text: "#0F766E",
    rows: [
      { label: "Connection Requests / Month", info: "LinkedIn has an 800 connection request monthly limit.", values: ["300", "600", "600"] },
      { label: "Follow-Up Messages per Prospect", info: "Most people reply on the 3rd follow-up.", values: ["2", "4", "4"] },
      { label: "InMails / Month", info: "We use InMails to reach out to your ICPs without having to connect with them first.", values: [false, "15", "15"] },
    ],
  },
];

const JUMPS: { label: string; href: string; matrix?: boolean }[] = [
  { label: "Growth Plans", href: "plans-section" },
  { label: "Shared Foundation", href: "included-in-every-plan" },
  { label: "Detailed Table", href: "comparison-matrix-anchor", matrix: true },
  { label: "Cold Email", href: "cold-email-system" },
  { label: "Automation Tool", href: "automation-tool" },
];

function scrollToId(id: string) {
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
}

function CheckIcon({ color, size = "sm" }: { color: string; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "w-6 h-6 shrink-0" : "w-4 h-4 shrink-0 mt-0.5";
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function MatrixCell({ value, accent }: { value: Cell; accent: string }) {
  if (value === false) return <span className="text-base font-bold" style={{ color: "#C9C2B7" }}>—</span>;
  if (value === true) {
    return (
      <span className="flex justify-center">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ backgroundColor: `${accent}18` }}>
          <CheckIcon color={accent} size="lg" />
        </span>
      </span>
    );
  }
  return <span className="text-base font-black" style={{ color: TEXT_DARK }}>{value}</span>;
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap">
        <h2 className="text-2xl font-black leading-tight" style={{ color: TEXT_DARK }}>{title}</h2>
        <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ color: GOLD_TEXT, backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.35)" }}>{eyebrow}</span>
      </div>
      <p className="text-xs font-bold uppercase tracking-widest mt-1.5" style={{ color: TEXT_MUTED }}>{subtitle}</p>
    </div>
  );
}

export default function PlanExplorer({
  prices,
  currencyPrefix,
  currencySuffix,
}: {
  prices: Prices;
  currencyPrefix: string;
  currencySuffix?: string;
}) {
  const [view, setView] = useState<View>("cards");

  const go = (next: View, anchor?: string) => {
    setView(next);
    if (anchor) scrollToId(anchor);
  };

  return (
    <>
      {/* Sticky sub-navigation: jump pills + the cards / matrix toggle. */}
      <div className="sticky top-[81px] z-40 -mx-4 px-4 py-3 lg:h-[59px] backdrop-blur-md" style={{ backgroundColor: "rgba(248,246,242,0.95)", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Jump to a section" className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {JUMPS.map((j) => (
              <a
                key={j.label}
                href={`#${j.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (j.matrix) go("matrix", j.href);
                  else scrollToId(j.href);
                }}
                className="px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-white transition-colors hover:bg-[#FEF9EC]"
                style={{ color: TEXT_DARK, border: `1px solid ${BORDER}` }}
              >
                {j.label}
              </a>
            ))}
          </nav>

          <div role="tablist" aria-label="Plan view" className="flex items-center p-1 rounded-full" style={{ backgroundColor: "#F1EEE7", border: `1px solid ${BORDER}` }}>
            {(
              [
                { id: "cards", label: "Quick Overview Cards", Icon: LayoutList },
                { id: "matrix", label: "Full Detailed Matrix", Icon: Table2 },
              ] as const
            ).map(({ id, label, Icon }) => {
              const active = view === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setView(id)}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
                  style={{ backgroundColor: active ? "#ffffff" : "transparent", color: active ? TEXT_DARK : TEXT_MUTED, boxShadow: active ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}
                >
                  <Icon className="w-4 h-4" style={{ color: active ? GOLD_TEXT : undefined }} strokeWidth={2} aria-hidden="true" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div id="plans-section" className="relative max-w-6xl mx-auto pt-10 scroll-mt-40">
        {view === "cards" ? (
          <div key="cards" className="animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <SectionHeading eyebrow="01" title="LinkedIn Growth Plans" subtitle="Done For You" />
              <button onClick={() => go("matrix", "comparison-matrix-anchor")} className="text-xs font-bold underline shrink-0 text-left" style={{ color: GOLD_TEXT }}>
                Compare all parameters side-by-side
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch mt-6">
              {TIERS.map((tier, i) => {
                const Icon = tier.icon;
                return (
                  <div key={tier.key} className={tier.featured ? "sm:-mt-4 sm:relative sm:z-10" : ""}>
                    <article
                      className="price-card group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white"
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
                        <span className="text-6xl font-black leading-none select-none absolute top-6 right-6" aria-hidden="true" style={{ color: tier.accent, opacity: 0.12 }}>
                          {i + 1}
                        </span>

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
                          <span className={tier.featured ? "text-4xl font-black" : "text-3xl font-black"} style={{ color: TEXT_DARK }}>{currencyPrefix}{prices[tier.key]}</span>
                          {currencySuffix && <span className="text-xs font-semibold" style={{ color: TEXT_MUTED }}> {currencySuffix}</span>}
                          <span className="text-xs font-semibold" style={{ color: TEXT_MUTED }}> / month</span>
                        </div>

                        <div className="flex-1 space-y-2.5 mb-5">
                          <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: textTone(tier.accent) }}>Highlights</p>
                          <ul className="space-y-1.5">
                            {tier.highlights.map((label) => (
                              <li key={label} className="flex items-start gap-2 text-sm" style={{ color: "#3D3D3D" }}>
                                <CheckIcon color={tier.accent} />
                                <span className="font-semibold">{label}</span>
                              </li>
                            ))}
                            {tier.missing && (
                              <li className="flex items-start gap-2 text-sm opacity-50" style={{ color: "#3D3D3D" }}>
                                <span className="w-4 shrink-0 text-center font-bold" style={{ color: "#C9C2B7" }} aria-hidden="true">-</span>
                                <span className="font-semibold line-through">{tier.missing}</span>
                              </li>
                            )}
                          </ul>
                          <p className="text-xs leading-snug pt-1.5" style={{ color: TEXT_MUTED }}>
                            {tier.note}
                            {" · "}
                            <button onClick={() => go("matrix", "comparison-matrix-anchor")} className="font-bold underline" style={{ color: textTone(tier.accent) }}>
                              View details in comparison
                            </button>
                          </p>
                        </div>

                        <a href="/book-a-call" className="btn-dark price-cta inline-block w-full text-center px-6 py-3 text-sm font-bold rounded-full">
                          Get Started
                        </a>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div key="matrix" className="animate-in fade-in duration-300">
            <div id="comparison-matrix-anchor" className="flex flex-col md:flex-row md:items-end justify-between gap-4 scroll-mt-40">
              <SectionHeading eyebrow="Side-by-side" title="Full Detailed Comparison Matrix" subtitle="Hover over any row to compare it across all three plans" />
              <button onClick={() => go("cards", "plans-section")} className="text-xs font-bold underline shrink-0 text-left" style={{ color: GOLD_TEXT }}>
                Switch back to card view
              </button>
            </div>

            {/* Below lg the table scrolls sideways inside its box; from lg up it
                sits in the page so the header row can stay pinned under the nav. */}
            <div className="w-full mt-6 rounded-2xl bg-white max-lg:overflow-x-auto lg:overflow-clip" style={{ border: `1px solid ${BORDER}` }}>
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <th className="px-4 sm:px-6 py-4 w-[40%] text-left text-sm font-black uppercase tracking-widest sticky left-0 lg:top-[140px] z-30 bg-white" style={{ color: TEXT_MUTED, boxShadow: `0 1px 0 ${BORDER}` }}>
                      Feature
                    </th>
                    {TIERS.map((tier) => (
                      <th
                        key={tier.key}
                        className="px-4 py-4 w-[20%] text-center text-sm font-black lg:sticky lg:top-[140px] z-20"
                        style={{ color: textTone(tier.accent), backgroundColor: "#ffffff", backgroundImage: `linear-gradient(${tier.accent}0d, ${tier.accent}0d)`, boxShadow: `0 1px 0 ${BORDER}` }}
                      >
                        {tier.featured && (
                          <span className="block text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: textTone(tier.accent) }}>Recommended</span>
                        )}
                        {tier.name}
                        <span className="block text-sm font-black mt-1" style={{ color: TEXT_DARK }}>
                          {currencyPrefix}{prices[tier.key]}
                          <span className="font-semibold" style={{ color: TEXT_MUTED }}> / month</span>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SECTIONS.map((section) => (
                    <Fragment key={section.title}>
                      <tr>
                        <td colSpan={4} className="px-4 sm:px-6 py-3 text-sm font-black uppercase tracking-widest" style={{ color: section.text, backgroundColor: section.bg }}>
                          {section.title}
                        </td>
                      </tr>
                      {section.rows.map((row) => (
                        <tr key={row.label} className="price-row" style={{ borderTop: `1px solid ${BORDER}` }}>
                          <td className="px-4 sm:px-6 py-5 bg-white max-lg:sticky max-lg:left-0">
                            <div className="text-base font-semibold" style={{ color: "#3D3D3D" }}>{row.label}</div>
                            <div className="text-sm mt-1 leading-snug" style={{ color: TEXT_MUTED }}>{row.info}</div>
                          </td>
                          {row.values.map((v, i) => (
                            <td key={i} className="px-4 py-5 text-center" style={{ backgroundColor: `${TIERS[i].accent}0d` }}>
                              <MatrixCell value={v} accent={TIERS[i].accent} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                  <tr style={{ borderTop: `1px solid ${BORDER}` }}>
                    <td className="px-4 sm:px-6 py-5 bg-white max-lg:sticky max-lg:left-0">
                      <div className="text-base font-semibold" style={{ color: "#3D3D3D" }}>Ready to scale your pipeline?</div>
                      <div className="text-sm mt-1" style={{ color: TEXT_MUTED }}>A written service agreement is shared and signed before onboarding.</div>
                    </td>
                    {TIERS.map((tier) => (
                      <td key={tier.key} className="px-3 py-4 text-center" style={{ backgroundColor: `${tier.accent}0d` }}>
                        <a href="/book-a-call" className="btn-dark price-cta inline-block w-full text-center px-3 py-2.5 text-sm font-bold rounded-full whitespace-nowrap">
                          Get Started
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
