"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownUp,
  Briefcase,
  ChevronDown,
  Compass,
  Flame,
  Gauge,
  Handshake,
  Layers,
  Megaphone,
  Search,
  Target,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import FadeIn from "../components/FadeIn";
import s from "./master-icp.module.css";
import {
  ATTRIBUTE_GROUPS,
  ATTRIBUTES,
  CRITERIA,
  FRAMEWORK,
  FRAMEWORK_ICPS,
  ICPS,
  NOTES,
  PRODUCT,
  SCORES,
  TIERS,
  type Icp,
  type Rating,
  type Tier,
} from "./data";

const INK = "#0a0a0a";
const MUTED = "#52525B";
const BORDER = "#E8E2D9";
const CREAM = "#F8F6F2";
const GOLD = "#F5B731";
const GOLD_TEXT = "#A14A08";
const FAINT = "#A8A29E";

interface Accent {
  solid: string;
  text: string;
  tint: string;
  border: string;
}

const ORANGE: Accent = { solid: "#EA580C", text: "#9A3412", tint: "rgba(234,88,12,0.09)", border: "rgba(234,88,12,0.35)" };
const AMBER: Accent = { solid: "#F5B731", text: "#7A5200", tint: "rgba(245,183,49,0.16)", border: "rgba(245,183,49,0.6)" };
const VIOLET: Accent = { solid: "#7C3AED", text: "#5B21B6", tint: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.3)" };
const TEAL: Accent = { solid: "#0D9488", text: "#115E59", tint: "rgba(13,148,136,0.08)", border: "rgba(13,148,136,0.3)" };
const ROSE: Accent = { solid: "#E11D48", text: "#9F1239", tint: "rgba(225,29,72,0.06)", border: "rgba(225,29,72,0.25)" };

// P1 orange, P2 gold, P3 violet, used everywhere a tier appears.
const TIER: Record<Tier, Accent> = { P1: ORANGE, P2: AMBER, P3: VIOLET };
// The three attribute groups on a profile.
const GROUP: { accent: Accent; icon: LucideIcon }[] = [
  { accent: { ...AMBER, solid: "#D97706", text: "#92400E" }, icon: Users },
  { accent: ROSE, icon: Flame },
  { accent: TEAL, icon: Megaphone },
];
const PRODUCT_LOOK: { accent: Accent; icon: LucideIcon }[] = [
  { accent: ORANGE, icon: Briefcase },
  { accent: AMBER, icon: Target },
  { accent: VIOLET, icon: Handshake },
];
const PALETTE = [ORANGE, AMBER, VIOLET, TEAL];

const SECTIONS: { id: string; label: string; accent: Accent }[] = [
  { id: "product", label: "Product & priorities", accent: ORANGE },
  { id: "profiles", label: "ICP profiles", accent: AMBER },
  { id: "framework", label: "Prioritisation framework", accent: VIOLET },
  { id: "scores", label: "Numeric scores", accent: TEAL },
];

const BY_SLUG = new Map(ICPS.map((i) => [i.slug, i]));
const tierCount = (t: Tier) => ICPS.filter((i) => i.tier === t).length;
// Sum out of 40, banded for colour: 32+ orange, 27–31 gold, 26 and under violet.
const sumAccent = (sum: number) => (sum >= 32 ? ORANGE : sum >= 27 ? AMBER : VIOLET);
const BY_SUM = [...SCORES].sort((a, b) => b.sum - a.sum || a.segment.localeCompare(b.segment));

function TierDot({ tier }: { tier: Tier }) {
  return <span aria-hidden="true" className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: TIER[tier].solid }} />;
}

function TierBadge({ icp }: { icp: Icp }) {
  const a = TIER[icp.tier];
  return (
    <span className="fredoka-pill inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs" style={{ background: a.tint, color: a.text }}>
      <TierDot tier={icp.tier} />
      {icp.tier} {icp.band}
    </span>
  );
}

function TypeLabel({ icp }: { icp: Icp }) {
  const partner = icp.type === "Channel partner";
  return (
    <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: partner ? TEAL.text : "#78716C" }}>
      {partner && <Handshake aria-hidden="true" className="mr-1 inline h-3.5 w-3.5 align-[-2px]" />}
      {icp.type}
    </span>
  );
}

/** "A → B → C" drawn as steps with gold arrows. */
function Journey({ text }: { text: string }) {
  return (
    <span>
      {text.split(" → ").map((step, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="mx-1 font-bold" style={{ color: ORANGE.solid }}>→</span>}
          {step}
        </Fragment>
      ))}
    </span>
  );
}

function AttrValue({ k, text }: { k: string; text: string }) {
  return k === "journey" || k === "geography" ? <Journey text={text} /> : <>{text}</>;
}

function RatingPill({ rating }: { rating: Rating }) {
  const style =
    rating === "High"
      ? { background: `linear-gradient(135deg, ${GOLD}, #FB923C)`, color: INK, border: "1px solid transparent" }
      : rating === "Moderate"
        ? { background: "#FFFBEB", color: "#7A5200", border: `1px solid ${GOLD}` }
        : { background: "#F1EEE8", color: "#78716C", border: "1px solid #F1EEE8" };
  return (
    <span className="fredoka-pill inline-block min-w-[78px] rounded-full px-2.5 py-0.5 text-center text-xs" style={style}>
      {rating}
    </span>
  );
}

/** A 1–5 score as a heatmap chip: 5 gold, 4 warm, 3 pale, 2 and under faint. */
function ScoreChip({ n }: { n: number }) {
  const style =
    n >= 5 ? { background: GOLD, color: INK, fontWeight: 800 } : n === 4 ? { background: "#FDE7B0", color: INK } : n === 3 ? { background: "#FFF6E0", color: "#57534E" } : { background: "transparent", color: FAINT };
  return <span className="inline-flex h-7 w-8 items-center justify-center rounded-lg tabular-nums" style={style}>{n}</span>;
}

/** Counts up to `to` once in view; shows the final number straight away under reduced motion. */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    let raf = 0;
    let failsafe: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1100);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      // Background tabs pause animation frames; never leave the number short.
      failsafe = setTimeout(() => setN(to), 1600);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, [to]);
  return <span ref={ref}>{n}</span>;
}

function SectionHead({ eyebrow, title, accent, icon: Icon, children }: { eyebrow: string; title: string; accent: Accent; icon: LucideIcon; children?: React.ReactNode }) {
  return (
    <FadeIn className="mb-8 max-w-3xl">
      <p className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: accent.tint, color: accent.text }}>
        <Icon aria-hidden="true" className="h-3.5 w-3.5" />
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-black sm:text-3xl" style={{ color: INK, letterSpacing: "-0.02em" }}>{title}</h2>
      <span aria-hidden="true" className="mt-3 block h-1 w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${accent.solid}, ${GOLD})` }} />
      {children && <div className="mt-4 space-y-3 text-base leading-relaxed" style={{ color: MUTED }}>{children}</div>}
    </FadeIn>
  );
}

/** One ticker row: the items twice over, scrolled by the site's marquee (paused on hover, still under reduced motion). */
function Ticker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="marquee-container w-full" aria-hidden="true">
      <div className={`marquee-track ${className}`}>
        <div className="flex shrink-0 items-center gap-3 pr-3">{children}</div>
        <div className="flex shrink-0 items-center gap-3 pr-3">{children}</div>
      </div>
    </div>
  );
}

type ScoreSort = "segment" | number; // a criterion index, or 8 for the sum

export default function MasterIcpClient() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [view, setView] = useState<"profiles" | "compare">("profiles");
  const [tier, setTier] = useState<"all" | Tier>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [scrollTo, setScrollTo] = useState<string | null>(null);
  const [scoreSort, setScoreSort] = useState<ScoreSort>("segment");
  const [barsOn, setBarsOn] = useState(false);
  const barRef = useRef<HTMLUListElement>(null);
  const scoresRef = useRef<HTMLDivElement>(null);

  // Highlight the section in view in the jump bar.
  useEffect(() => {
    const els = SECTIONS.map((x) => document.getElementById(x.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  // On narrow screens the bar scrolls sideways; keep the active pill in view.
  useEffect(() => {
    const bar = barRef.current;
    const pill = bar?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!bar || !pill) return;
    const left = pill.offsetLeft - bar.offsetLeft;
    if (left < bar.scrollLeft || left + pill.offsetWidth > bar.scrollLeft + bar.clientWidth) bar.scrollTo({ left: left - 16, behavior: "smooth" });
  }, [active]);

  // Grow the sum bars once the scores table is on screen.
  useEffect(() => {
    const el = scoresRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setBarsOn(true);
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // A link to one ICP (from the priority lists, the framework table or a shared #icp-… URL) shows it open in the profiles list.
  const goToIcp = (slug: string) => {
    setView("profiles");
    setTier("all");
    setQuery("");
    setOpen((prev) => new Set(prev).add(slug));
    setScrollTo(slug);
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (BY_SLUG.has(hash)) goToIcp(hash);
  }, []);

  useEffect(() => {
    if (!scrollTo) return;
    document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${scrollTo}`);
    setScrollTo(null);
  }, [scrollTo]);

  const icpLink = (slug: string) => ({
    href: `#${slug}`,
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      goToIcp(slug);
    },
  });

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ICPS.filter((i) => tier === "all" || i.tier === tier).filter(
      (i) => !q || [i.name, `${i.tier} ${i.band}`, i.type, `#${i.num}`, ...Object.values(i.attrs)].some((v) => v.toLowerCase().includes(q)),
    );
  }, [tier, query]);

  const allOpen = visible.length > 0 && visible.every((i) => open.has(i.slug));
  const toggle = (slug: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  const scores = useMemo(() => {
    const rows = [...SCORES];
    if (scoreSort === "segment") return rows;
    const val = (r: (typeof SCORES)[number]) => (scoreSort === 8 ? r.sum : r.scores[scoreSort]);
    return rows.sort((a, b) => val(b) - val(a) || b.sum - a.sum || a.segment.localeCompare(b.segment));
  }, [scoreSort]);

  const STATS: { n: number; label: string; accent: Accent; icon: LucideIcon }[] = [
    { n: ICPS.length, label: "ICPs compared side by side", accent: ORANGE, icon: Layers },
    { n: 16, label: "attributes per ICP", accent: AMBER, icon: Compass },
    { n: SCORES.length, label: "segments scored on 8 criteria", accent: VIOLET, icon: Gauge },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-10 pt-28 sm:pt-32">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-24 h-[560px] w-[560px] rounded-full blur-[60px]" style={{ background: "radial-gradient(circle, rgba(245,183,49,0.32) 0%, rgba(249,115,22,0.10) 42%, transparent 70%)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full blur-[60px]" style={{ background: "radial-gradient(circle, rgba(13,148,136,0.14) 0%, transparent 68%)" }} />
        <div className="relative mx-auto max-w-6xl">
          <p className="hero-fade inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ color: GOLD_TEXT, borderColor: "rgba(217,119,6,0.3)", background: "rgba(245,183,49,0.09)" }}>
            <span className={`h-1.5 w-1.5 rounded-full ${s.pulse}`} style={{ background: ORANGE.solid }} />
            Myntmore company home · Strategy
          </p>
          <h1 className="hero-fade-d1 mt-4 text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl" style={{ letterSpacing: "-0.03em" }}>
            Master ICP Strategy
            <span className={`block pb-1 ${s.gradientText}`}>Market-led 2026</span>
          </h1>
          <p className="hero-fade-d2 mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: MUTED }}>
            Every ICP compared on buyer, pains, triggers, buying behaviour, channels, messaging, journey and priority, with the prioritisation framework and numeric scores.
          </p>
          <dl className="hero-fade-d3 mt-8 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-4">
            {STATS.map(({ n, label, accent, icon: Icon }) => (
              <div key={label} className={`rounded-2xl border p-3 sm:p-5 ${s.lift}`} style={{ borderColor: accent.border, background: `linear-gradient(145deg, ${accent.tint}, rgba(255,255,255,0.85) 70%)` }}>
                <span className="mb-3 hidden h-9 w-9 items-center justify-center rounded-xl sm:inline-flex" style={{ background: accent.tint, color: accent.text }}>
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <dd className="text-3xl font-black tabular-nums sm:text-4xl" style={{ color: accent.text }}><CountUp to={n} /></dd>
                <dt className="mt-1 text-xs leading-snug sm:text-sm" style={{ color: MUTED }}>{label}</dt>
              </div>
            ))}
            <div className={`col-span-3 rounded-2xl border p-4 sm:p-5 lg:col-span-1 ${s.lift}`} style={{ borderColor: TEAL.border, background: `linear-gradient(145deg, ${TEAL.tint}, rgba(255,255,255,0.85) 70%)` }}>
              <span className="mb-3 hidden h-9 w-9 items-center justify-center rounded-xl sm:inline-flex" style={{ background: TEAL.tint, color: TEAL.text }}>
                <Briefcase aria-hidden="true" className="h-5 w-5" />
              </span>
              <dt className="text-sm" style={{ color: MUTED }}>Source</dt>
              <dd className="mt-1 text-sm font-bold">Notion · Myntmore Master ICP Strategy</dd>
              <dd className="mt-1 text-sm" style={{ color: MUTED }}>Last edited 17 Oct 2026 · Ranking remains provisional</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Tickers: every ICP, then every segment by score. Decorative; the same data is in the sections below. */}
      <div className="hero-fade-d4 space-y-2 border-y bg-white py-3" style={{ borderColor: BORDER }}>
        <Ticker className={s.tickerSlow}>
          {ICPS.map((icp) => (
            <span key={icp.slug} className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm" style={{ borderColor: TIER[icp.tier].border, background: TIER[icp.tier].tint }}>
              <span className="font-black tabular-nums" style={{ color: TIER[icp.tier].text }}>#{icp.num}</span>
              <span className="font-semibold">{icp.name}</span>
              <span className="fredoka-pill text-xs" style={{ color: TIER[icp.tier].text }}>{icp.tier} {icp.band}</span>
            </span>
          ))}
        </Ticker>
        <Ticker className={s.tickerReverse}>
          {BY_SUM.map((r) => {
            const a = sumAccent(r.sum);
            return (
              <span key={r.segment} className="inline-flex items-center gap-2 whitespace-nowrap px-1 text-sm">
                <span className="font-semibold" style={{ color: MUTED }}>{r.segment}</span>
                <span className="rounded-md px-1.5 py-0.5 text-xs font-black tabular-nums" style={{ background: a.solid, color: a === AMBER ? INK : "#fff" }}>{r.sum}/40</span>
                <span aria-hidden="true" style={{ color: BORDER }}>|</span>
              </span>
            );
          })}
        </Ticker>
      </div>

      {/* Jump bar */}
      <nav aria-label="Sections" className="sticky top-16 z-40 border-b backdrop-blur-md sm:top-20" style={{ borderColor: BORDER, background: "rgba(248,246,242,0.92)" }}>
        <ul ref={barRef} className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none]">
          {SECTIONS.map((x) => {
            const on = active === x.id;
            return (
              <li key={x.id} className="shrink-0">
                <a
                  href={`#${x.id}`}
                  aria-current={on ? "true" : undefined}
                  className="fredoka-pill inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm transition-colors duration-300"
                  style={on ? { background: x.accent.tint, borderColor: x.accent.solid, color: x.accent.text } : { background: "#fff", borderColor: BORDER, color: MUTED }}
                >
                  <span aria-hidden="true" className="h-2 w-2 rounded-full transition-transform duration-300" style={{ background: x.accent.solid, transform: on ? "scale(1.3)" : "scale(0.8)", opacity: on ? 1 : 0.5 }} />
                  {x.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Section 1: product and priorities */}
      <section id="product" className="scroll-mt-32 px-4 py-16 sm:scroll-mt-36">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Section 1" title="Define your product" accent={ORANGE} icon={Briefcase} />
          <div className="grid gap-4 md:grid-cols-3">
            {PRODUCT.map((p, i) => {
              const { accent, icon: Icon } = PRODUCT_LOOK[i];
              return (
                <FadeIn key={p.label} delay={i * 90} className="h-full">
                  <div className={`h-full rounded-2xl border border-t-4 bg-white p-5 sm:p-6 ${s.lift}`} style={{ borderColor: BORDER, borderTopColor: accent.solid }}>
                    <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: accent.tint, color: accent.text }}>
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: accent.text }}>{p.label}</p>
                    <p className="mt-0.5 text-xs" style={{ color: FAINT }}>{p.hint}</p>
                    <p className="mt-3 text-[15px] leading-relaxed">{p.body}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn>
            <h3 className="mt-12 text-xl font-black">ICPs by priority</h3>
            <p className="mb-5 mt-1 text-sm" style={{ color: MUTED }}>Select an ICP to open its full profile.</p>
          </FadeIn>
          <div className="grid gap-4 md:grid-cols-3">
            {TIERS.map((t, ti) => {
              const a = TIER[t.tier];
              return (
                <FadeIn key={t.tier} delay={ti * 110} className="h-full">
                  <div className={`h-full overflow-hidden rounded-2xl border bg-white ${s.lift}`} style={{ borderColor: a.border }}>
                    <div className="flex items-center justify-between px-5 py-4" style={{ background: `linear-gradient(120deg, ${a.tint}, #fff)` }}>
                      <span className="flex items-center gap-2 text-lg font-black" style={{ color: a.text }}><TierDot tier={t.tier} />{t.title}</span>
                      <span className="fredoka-pill rounded-full px-2.5 py-0.5 text-sm" style={{ background: a.solid, color: t.tier === "P2" ? INK : "#fff" }}>{tierCount(t.tier)} ICPs</span>
                    </div>
                    <div className="px-3 py-3">
                      {t.bands.map((b) => (
                        <div key={b.label} className="mb-2 last:mb-0">
                          <p className="px-2 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: a.text }}>{b.label}</p>
                          <ul>
                            {b.slugs.map((slug) => {
                              const icp = BY_SLUG.get(slug)!;
                              return (
                                <li key={slug}>
                                  <a {...icpLink(slug)} className="group flex min-h-[44px] items-center gap-3 rounded-lg px-2 text-sm transition-colors hover:bg-[#F8F6F2]">
                                    <span className="w-8 shrink-0 tabular-nums font-semibold" style={{ color: a.solid }}>#{icp.num}</span>
                                    <span className="flex-1 transition-transform duration-200 group-hover:translate-x-0.5">{icp.name}</span>
                                    {icp.type === "Channel partner" && <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: TEAL.text }}>Channel</span>}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ICP comparison */}
      <section id="profiles" className="scroll-mt-32 border-y px-4 py-16 sm:scroll-mt-36" style={{ borderColor: BORDER, background: "linear-gradient(180deg, #FFFFFF 0%, #FFFBF2 100%)" }}>
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="ICP comparison · Map your ICPs" title="ICP profiles" accent={AMBER} icon={Layers}>
            <p>
              Compare each customer segment&apos;s geography, buyer, pains, triggers, buying behaviour, channels, value proposition entry point and priority. Each ICP is described on the same 13 attributes, plus its priority and customer type, which tells direct customers apart from channel partners.
            </p>
          </SectionHead>

          {/* Toolbar */}
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <div role="group" aria-label="View" className="inline-flex rounded-full border p-1" style={{ borderColor: BORDER, background: CREAM }}>
                {(["profiles", "compare"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={view === v}
                    onClick={() => setView(v)}
                    className="fredoka-pill min-h-[44px] rounded-full px-4 text-sm transition-all duration-300"
                    style={view === v ? { background: "#fff", color: INK, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" } : { color: MUTED }}
                  >
                    {v === "profiles" ? "Profiles" : "Side by side"}
                  </button>
                ))}
              </div>
              <div role="group" aria-label="Priority" className="flex flex-wrap gap-2">
                {(["all", "P1", "P2", "P3"] as const).map((t) => {
                  const on = tier === t;
                  const a = t === "all" ? AMBER : TIER[t];
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setTier(t)}
                      className="fredoka-pill inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-4 text-sm transition-all duration-300"
                      style={on ? { background: a.tint, borderColor: a.solid, color: a.text } : { background: "#fff", borderColor: BORDER, color: MUTED }}
                    >
                      {t !== "all" && <TierDot tier={t} />}
                      {t === "all" ? `All ${ICPS.length}` : `${t} · ${tierCount(t)}`}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="relative flex-1 lg:w-64 lg:flex-none">
                <span className="sr-only">Search ICPs</span>
                <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: FAINT }} />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search ICPs, e.g. GCC, SaaS"
                  className="min-h-[44px] w-full rounded-full border bg-white pl-10 pr-4 text-sm outline-none transition-colors focus:border-[#F5B731]"
                  style={{ borderColor: BORDER }}
                />
              </label>
              {view === "profiles" && (
                <button
                  type="button"
                  onClick={() => setOpen(allOpen ? new Set() : new Set(visible.map((i) => i.slug)))}
                  className="fredoka-pill min-h-[44px] shrink-0 rounded-full border bg-white px-4 text-sm transition-colors hover:bg-[#FFFBEB]"
                  style={{ borderColor: BORDER, color: INK }}
                >
                  {allOpen ? "Collapse all" : "Expand all"}
                </button>
              )}
            </div>
          </div>
          <p className="mb-4 text-sm" style={{ color: MUTED }} aria-live="polite">
            Showing {visible.length} of {ICPS.length} ICPs{view === "compare" && visible.length > 1 ? ". Scroll the table sideways to compare." : "."}
          </p>

          {visible.length === 0 && (
            <p className="rounded-2xl border p-6 text-sm" style={{ borderColor: BORDER, background: CREAM, color: MUTED }}>No ICP matches that search.</p>
          )}

          {view === "profiles" ? (
            // Keyed by the tier filter so the cards replay their entrance when it changes.
            <ul key={tier} className="space-y-3">
              {visible.map((icp, idx) => {
                const isOpen = open.has(icp.slug);
                const a = TIER[icp.tier];
                return (
                  <li
                    key={icp.slug}
                    id={icp.slug}
                    className="card-fade-up scroll-mt-36 overflow-hidden rounded-2xl border sm:scroll-mt-40"
                    style={{ animationDelay: `${Math.min(idx, 12) * 35}ms`, borderColor: isOpen ? a.border : BORDER, background: isOpen ? `linear-gradient(180deg, ${a.tint}, #fff 120px)` : "#fff", boxShadow: `inset 4px 0 0 ${a.solid}` }}
                  >
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`${icp.slug}-body`}
                        onClick={() => toggle(icp.slug)}
                        className="flex min-h-[44px] w-full items-start gap-3 p-4 pl-5 text-left sm:gap-4 sm:p-5 sm:pl-6"
                      >
                        <span className="mt-0.5 inline-flex h-9 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-black tabular-nums" style={{ background: a.tint, color: a.text }}>
                          #{icp.num}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-black sm:text-lg">{icp.name}</span>
                          <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <TierBadge icp={icp} />
                            <TypeLabel icp={icp} />
                          </span>
                          {!isOpen && <span className="mt-1.5 block text-sm" style={{ color: MUTED }}>{icp.attrs.industry}</span>}
                        </span>
                        <span className="mt-1.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors" style={{ background: isOpen ? a.solid : CREAM, color: isOpen ? (icp.tier === "P2" ? INK : "#fff") : MUTED }}>
                          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                        </span>
                      </button>
                    </h3>
                    {isOpen && (
                      <div id={`${icp.slug}-body`} className="grid gap-3 px-4 pb-5 sm:px-5 md:grid-cols-3">
                        {ATTRIBUTE_GROUPS.map((g, gi) => {
                          const { accent, icon: Icon } = GROUP[gi];
                          return (
                            <div key={g.title} className="card-fade-up rounded-xl border p-4" style={{ animationDelay: `${gi * 80}ms`, borderColor: accent.border, background: accent.tint }}>
                              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent.text }}>
                                <Icon aria-hidden="true" className="h-4 w-4" />
                                {g.title}
                              </p>
                              <dl className="space-y-3">
                                {g.attributes.map((at) => (
                                  <div key={at.key}>
                                    <dt className="text-xs font-semibold" style={{ color: accent.text, opacity: 0.85 }}>{at.label}</dt>
                                    <dd className="mt-0.5 text-sm leading-relaxed"><AttrValue k={at.key} text={icp.attrs[at.key]} /></dd>
                                  </div>
                                ))}
                              </dl>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            visible.length > 0 && (
              <div className="card-fade-up overflow-x-auto rounded-2xl border bg-white" style={{ borderColor: BORDER }}>
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr>
                      <th scope="col" className="sticky left-0 z-10 w-[150px] min-w-[150px] border-b border-r p-3 align-bottom text-xs font-semibold sm:w-[210px] sm:min-w-[210px] sm:p-4" style={{ background: CREAM, borderColor: BORDER, color: MUTED }}>
                        13 attributes
                      </th>
                      {visible.map((icp) => {
                        const a = TIER[icp.tier];
                        return (
                          <th key={icp.slug} scope="col" className="min-w-[230px] border-b border-t-4 p-4 align-top font-normal" style={{ borderBottomColor: BORDER, borderTopColor: a.solid, background: `linear-gradient(180deg, ${a.tint}, #fff)` }}>
                            <span className="block text-[11px] font-bold uppercase tracking-wider" style={{ color: a.text }}>ICP {icp.num}</span>
                            <span className="mt-1 block text-base font-black leading-snug">{icp.name}</span>
                            <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1"><TierBadge icp={icp} /><TypeLabel icp={icp} /></span>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {ATTRIBUTE_GROUPS.map((g, gi) =>
                      g.attributes.map((at, ai) => {
                        const accent = GROUP[gi].accent;
                        return (
                          <tr key={at.key} className="transition-colors hover:bg-[#FFFDF7]">
                            <th scope="row" className="sticky left-0 z-10 border-b border-r p-3 align-top sm:p-4" style={{ background: CREAM, borderColor: BORDER, boxShadow: `inset 3px 0 0 ${accent.solid}` }}>
                              {ai === 0 && <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider" style={{ color: accent.text }}>{g.title}</span>}
                              <span className="block text-xs font-bold sm:text-sm">{at.label}</span>
                              <span className="mt-0.5 block text-[11px] font-normal leading-snug" style={{ color: FAINT }}>{at.hint}</span>
                            </th>
                            {visible.map((icp) => (
                              <td key={icp.slug} className="border-b p-4 align-top leading-relaxed" style={{ borderColor: BORDER }}>
                                <AttrValue k={at.key} text={icp.attrs[at.key]} />
                              </td>
                            ))}
                          </tr>
                        );
                      }),
                    )}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </section>

      {/* Sections 2 and 3: prioritisation framework */}
      <section id="framework" className="relative scroll-mt-32 overflow-hidden px-4 py-16 sm:scroll-mt-36">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[460px] w-[460px] rounded-full blur-[60px]" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 68%)" }} />
        <div className="relative mx-auto max-w-6xl">
          <SectionHead eyebrow="Sections 2 and 3" title="Prioritisation framework" accent={VIOLET} icon={Compass}>
            <p>
              Use the weighted criteria below to rank the ICPs by commercial attractiveness and likelihood of buying Myntmore&apos;s services. This lets us focus resources on the best opportunities rather than the largest possible list.
            </p>
          </SectionHead>

          <FadeIn>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs" style={{ color: MUTED }}>
              <RatingPill rating="High" />
              <RatingPill rating="Moderate" />
              <RatingPill rating="Low" />
            </div>
            <div className="overflow-x-auto rounded-2xl border bg-white" style={{ borderColor: VIOLET.border }}>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th scope="col" className="sticky left-0 z-10 min-w-[150px] border-b border-r p-3 text-left text-xs font-bold uppercase tracking-wider sm:min-w-[200px] sm:p-4" style={{ background: "#F5F0FF", borderColor: BORDER, color: VIOLET.text }}>
                      Criteria
                    </th>
                    {FRAMEWORK_ICPS.map((c) => (
                      <th key={c.slug} scope="col" className="min-w-[104px] border-b p-2 align-bottom text-xs font-black" style={{ borderColor: BORDER, background: "#F5F0FF" }}>
                        <a {...icpLink(c.slug)} className="inline-flex min-h-[44px] items-end justify-center px-1 pb-1 underline underline-offset-4 transition-colors hover:text-[#5B21B6]" style={{ textDecorationColor: "rgba(124,58,237,0.45)" }}>
                          {c.label}
                        </a>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FRAMEWORK.map((row) => (
                    <tr key={row.criterion} className="transition-colors hover:bg-[#FBF9FF]">
                      <th scope="row" className="sticky left-0 z-10 border-b border-r bg-white p-3 text-left text-xs font-bold sm:p-4 sm:text-sm" style={{ borderColor: BORDER }}>{row.criterion}</th>
                      {row.ratings.map((r, i) => (
                        <td key={i} className="border-b p-2 text-center" style={{ borderColor: BORDER }}><RatingPill rating={r} /></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm" style={{ color: MUTED }}>
              High / Moderate / Low comparison across Myntmore&apos;s priority ICPs. <em>The numeric 1–5 prioritisation table is being prepared to replace the coloured ratings. Scores are provisional assessments, not measured conversion data.</em>
            </p>
          </FadeIn>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <FadeIn>
              <div className={`h-full rounded-2xl border border-l-4 bg-white p-6 ${s.lift}`} style={{ borderColor: BORDER, borderLeftColor: VIOLET.solid }}>
                <h3 className="text-lg font-black">Notes for Myntmore</h3>
                <ol className="mt-4 space-y-3 text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>
                  {NOTES.map((n, i) => (
                    <li key={n} className="flex gap-3">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black" style={{ background: PALETTE[i].tint, color: PALETTE[i].text }}>{i + 1}</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className={`h-full rounded-2xl border p-6 ${s.lift}`} style={{ borderColor: "rgba(245,183,49,0.45)", background: "linear-gradient(135deg, #FEF9EC, #FFF4E6)" }}>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD_TEXT }}>Note</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>
                  The initial 18-ICP comparison is a presentation view. Expanded ICPs, VC and agency partner analysis and TJ&apos;s additional segments are retained in the linked research annex. Ranking remains provisional.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Supporting research: numeric scores */}
      <section id="scores" className="scroll-mt-32 border-t px-4 pb-20 pt-16 sm:scroll-mt-36" style={{ borderColor: BORDER, background: "linear-gradient(180deg, #FFFFFF 0%, #F3FBFA 100%)" }}>
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Supporting ICP research" title="ICP prioritisation: numeric scores (1–5)" accent={TEAL} icon={Trophy}>
            <p>
              {SCORES.length} segments scored on 8 criteria. Strategic hypothesis scores, not measured conversion data: 1 = low fit, 5 = high fit. Compare direct customers and channel partners separately when allocating budget. Sum is calculated from the 8 scores (out of 40).
            </p>
          </SectionHead>

          <FadeIn>
            <div className="mb-3 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between" style={{ color: MUTED }}>
              <p className="flex items-center gap-2">
                <ArrowDownUp aria-hidden="true" className="h-4 w-4" />
                Select a column heading to sort high to low. Select Segment to return to A–Z.
              </p>
              <p className="flex items-center gap-1.5 text-xs">
                Score:
                {[2, 3, 4, 5].map((n) => <ScoreChip key={n} n={n} />)}
              </p>
            </div>
            <div ref={scoresRef} className={`overflow-x-auto rounded-2xl border bg-white ${barsOn ? s.barsOn : ""}`} style={{ borderColor: TEAL.border }}>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th scope="col" aria-sort={scoreSort === "segment" ? "ascending" : "none"} className="sticky left-0 z-10 min-w-[170px] border-b border-r p-0 text-left sm:min-w-[260px]" style={{ background: "#EEF8F6", borderColor: BORDER }}>
                      <button type="button" onClick={() => setScoreSort("segment")} className="flex min-h-[56px] w-full items-end px-3 pb-3 text-xs font-black sm:px-4">
                        Segment{scoreSort === "segment" && <span className="ml-1" style={{ color: TEAL.text }}>A–Z</span>}
                      </button>
                    </th>
                    {[...CRITERIA.map((c, i) => ({ label: c.label, n: i + 1, key: i })), { label: "Sum", n: 0, key: 8 }].map((c) => {
                      const on = scoreSort === c.key;
                      const isSum = c.key === 8;
                      return (
                        <th key={c.key} scope="col" aria-sort={on ? "descending" : "none"} className={`${isSum ? "min-w-[132px]" : "min-w-[92px]"} border-b p-0 align-bottom transition-colors`} style={{ borderColor: BORDER, background: isSum ? "rgba(245,183,49,0.3)" : on ? "rgba(13,148,136,0.16)" : "#EEF8F6" }}>
                          <button type="button" onClick={() => setScoreSort(c.key)} className="flex min-h-[56px] w-full items-end justify-center px-2 pb-3 text-center text-xs font-black leading-tight">
                            <span>
                              {c.label}
                              {c.n > 0 && <sup className="ml-0.5" style={{ color: TEAL.text }}>{c.n}</sup>}
                              {on && <span className="ml-1" style={{ color: TEAL.text }}>↓</span>}
                              {on && <span className="sr-only"> (sorted high to low)</span>}
                            </span>
                          </button>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {scores.map((r) => {
                    const a = sumAccent(r.sum);
                    return (
                      <tr key={r.segment} className="transition-colors hover:bg-[#FFFDF7]">
                        <th scope="row" className="sticky left-0 z-10 border-b border-r bg-white px-3 py-2 text-left text-xs font-semibold sm:px-4 sm:text-sm" style={{ borderColor: BORDER }}>{r.segment}</th>
                        {r.scores.map((n, i) => (
                          <td key={i} className="border-b px-2 py-1.5 text-center" style={{ borderColor: BORDER }}><ScoreChip n={n} /></td>
                        ))}
                        <td className="border-b px-3 py-1.5" style={{ borderColor: BORDER, background: "rgba(245,183,49,0.08)" }}>
                          <span className="flex items-center gap-2">
                            <span className="w-6 text-right font-black tabular-nums" style={{ color: a.text }}>{r.sum}</span>
                            <span aria-hidden="true" className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: "#F1EEE8" }}>
                              <span className={`block h-full rounded-full ${s.bar}`} style={{ ["--fill" as string]: r.sum / 40, background: `linear-gradient(90deg, ${a.solid}, ${GOLD})` }} />
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <FadeIn>
            <h3 className="mb-4 mt-12 text-xl font-black">Guiding questions</h3>
          </FadeIn>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CRITERIA.map((c, i) => {
              const a = PALETTE[i % PALETTE.length];
              return (
                <li key={c.label}>
                  <FadeIn delay={(i % 4) * 80} className="h-full">
                    <div className={`h-full rounded-2xl border bg-white p-4 ${s.lift}`} style={{ borderColor: a.border }}>
                      <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-black" style={{ background: a.solid, color: a === AMBER ? INK : "#fff" }}>{i + 1}</span>
                      <p className="text-sm font-black">{c.label}</p>
                      <p className="mt-1 text-sm leading-relaxed" style={{ color: MUTED }}>{c.question}</p>
                    </div>
                  </FadeIn>
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-sm" style={{ color: MUTED }}>
            Linked page in Notion: Myntmore ICP Research Annex – Detailed Profiles &amp; TJ Additions.
          </p>
        </div>
      </section>
    </>
  );
}
