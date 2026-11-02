"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownUp, ChevronDown, Search } from "lucide-react";
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

const SECTIONS = [
  { id: "product", label: "Product & priorities" },
  { id: "profiles", label: "ICP profiles" },
  { id: "framework", label: "Prioritisation framework" },
  { id: "scores", label: "Numeric scores" },
];

const BY_SLUG = new Map(ICPS.map((i) => [i.slug, i]));
const tierCount = (t: Tier) => ICPS.filter((i) => i.tier === t).length;

/** Priority marker as drawn in the strategy: filled gold for P1, a gold ring for P2, grey for P3. */
function TierDot({ tier }: { tier: Tier }) {
  const style =
    tier === "P1" ? { background: GOLD } : tier === "P2" ? { border: `2px solid ${GOLD}` } : { background: "#D6D3D1" };
  return <span aria-hidden="true" className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={style} />;
}

function TierBadge({ icp }: { icp: Icp }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: INK }}>
      <TierDot tier={icp.tier} />
      {icp.tier} {icp.band}
    </span>
  );
}

function TypeLabel({ icp }: { icp: Icp }) {
  const partner = icp.type === "Channel partner";
  return (
    <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: partner ? GOLD_TEXT : "#78716C" }}>
      {icp.type}
    </span>
  );
}

/** "A → B → C" drawn as steps with gold arrows. */
function Journey({ text }: { text: string }) {
  const steps = text.split(" → ");
  return (
    <span>
      {steps.map((s, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="mx-1" style={{ color: GOLD }}>→</span>}
          {s}
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
      ? { background: GOLD, color: INK, border: `1px solid ${GOLD}` }
      : rating === "Moderate"
        ? { background: "#fff", color: "#7A5200", border: `1px solid ${GOLD}` }
        : { background: "#F1EEE8", color: "#78716C", border: "1px solid #F1EEE8" };
  return (
    <span className="fredoka-pill inline-block min-w-[78px] rounded-full px-2.5 py-0.5 text-center text-xs" style={style}>
      {rating}
    </span>
  );
}

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: GOLD_TEXT }}>{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black sm:text-3xl" style={{ color: INK, letterSpacing: "-0.02em" }}>{title}</h2>
      {children && <div className="mt-3 space-y-3 text-base leading-relaxed" style={{ color: MUTED }}>{children}</div>}
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
  const barRef = useRef<HTMLUListElement>(null);

  // Highlight the section in view in the jump bar.
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
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
    return ICPS.filter((i) => tier === "all" || i.tier === tier)
      .filter((i) => !q || [i.name, `${i.tier} ${i.band}`, i.type, `#${i.num}`, ...Object.values(i.attrs)].some((v) => v.toLowerCase().includes(q)));
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

  return (
    <>
      {/* Hero (the site styles the first section in <main> with the brand glow) */}
      <section className="px-4 pb-12 pt-28 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: GOLD_TEXT }}>Myntmore company home · Strategy</p>
          <h1 className="mt-3 text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl" style={{ letterSpacing: "-0.03em" }}>
            Master ICP Strategy
            <span className="block" style={{ color: GOLD_TEXT }}>Market-led 2026</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: MUTED }}>
            Every ICP compared on buyer, pains, triggers, buying behaviour, channels, messaging, journey and priority, with the prioritisation framework and numeric scores.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ["29", "ICPs compared side by side"],
              ["16", "attributes per ICP"],
              ["28", "segments scored on 8 criteria"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl border p-4 sm:p-5" style={{ borderColor: BORDER, background: "rgba(255,255,255,0.75)" }}>
                <dd className="text-3xl font-black tabular-nums">{n}</dd>
                <dt className="mt-1 text-sm" style={{ color: MUTED }}>{l}</dt>
              </div>
            ))}
            <div className="col-span-2 rounded-2xl border p-4 sm:p-5 lg:col-span-1" style={{ borderColor: BORDER, background: "rgba(255,255,255,0.75)" }}>
              <dt className="text-sm" style={{ color: MUTED }}>Source</dt>
              <dd className="mt-1 text-sm font-bold">Notion · Myntmore Master ICP Strategy</dd>
              <dd className="mt-1 text-sm" style={{ color: MUTED }}>Last edited 17 Oct 2026 · Ranking remains provisional</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Jump bar */}
      <nav aria-label="Sections" className="sticky top-16 z-40 border-y backdrop-blur-md sm:top-20" style={{ borderColor: BORDER, background: "rgba(248,246,242,0.92)" }}>
        <ul ref={barRef} className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none]">
          {SECTIONS.map((s) => {
            const on = active === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  aria-current={on ? "true" : undefined}
                  className="fredoka-pill inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full border px-4 text-sm transition-colors"
                  style={on ? { background: "rgba(245,183,49,0.2)", borderColor: GOLD, color: INK } : { background: "#fff", borderColor: BORDER, color: MUTED }}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Section 1: product and priorities */}
      <section id="product" className="scroll-mt-32 px-4 py-16 sm:scroll-mt-36">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Section 1" title="Define your product" />
          <div className="grid gap-4 md:grid-cols-3">
            {PRODUCT.map((p) => (
              <div key={p.label} className="rounded-2xl border bg-white p-5 sm:p-6" style={{ borderColor: BORDER }}>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD_TEXT }}>{p.label}</p>
                <p className="mt-0.5 text-xs" style={{ color: FAINT }}>{p.hint}</p>
                <p className="mt-3 text-[15px] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          <h3 className="mb-4 mt-12 text-xl font-black">ICPs by priority</h3>
          <p className="-mt-2 mb-5 text-sm" style={{ color: MUTED }}>Select an ICP to open its full profile.</p>
          <div className="grid gap-4 md:grid-cols-3">
            {TIERS.map((t) => (
              <div key={t.tier} className="rounded-2xl border bg-white" style={{ borderColor: BORDER }}>
                <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: BORDER }}>
                  <span className="flex items-center gap-2 text-lg font-black"><TierDot tier={t.tier} />{t.title}</span>
                  <span className="text-sm font-semibold" style={{ color: MUTED }}>{tierCount(t.tier)} ICPs</span>
                </div>
                <div className="px-3 py-3">
                  {t.bands.map((b) => (
                    <div key={b.label} className="mb-2 last:mb-0">
                      <p className="px-2 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: "#78716C" }}>{b.label}</p>
                      <ul>
                        {b.slugs.map((slug) => {
                          const icp = BY_SLUG.get(slug)!;
                          return (
                            <li key={slug}>
                              <a {...icpLink(slug)} className="flex min-h-[44px] items-center gap-3 rounded-lg px-2 text-sm transition-colors hover:bg-[#F8F6F2]">
                                <span className="w-8 shrink-0 tabular-nums" style={{ color: FAINT }}>#{icp.num}</span>
                                <span className="flex-1">{icp.name}</span>
                                {icp.type === "Channel partner" && <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: GOLD_TEXT }}>Channel</span>}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ICP comparison */}
      <section id="profiles" className="scroll-mt-32 border-y bg-white px-4 py-16 sm:scroll-mt-36" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="ICP comparison · Map your ICPs" title="ICP profiles">
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
                    className="fredoka-pill min-h-[44px] rounded-full px-4 text-sm transition-colors"
                    style={view === v ? { background: "#fff", color: INK, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" } : { color: MUTED }}
                  >
                    {v === "profiles" ? "Profiles" : "Side by side"}
                  </button>
                ))}
              </div>
              <div role="group" aria-label="Priority" className="flex flex-wrap gap-2">
                {(["all", "P1", "P2", "P3"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={tier === t}
                    onClick={() => setTier(t)}
                    className="fredoka-pill inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-4 text-sm transition-colors"
                    style={tier === t ? { background: "rgba(245,183,49,0.2)", borderColor: GOLD, color: INK } : { background: "#fff", borderColor: BORDER, color: MUTED }}
                  >
                    {t !== "all" && <TierDot tier={t} />}
                    {t === "all" ? `All ${ICPS.length}` : `${t} · ${tierCount(t)}`}
                  </button>
                ))}
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
                  className="min-h-[44px] w-full rounded-full border bg-white pl-10 pr-4 text-sm outline-none focus:border-[#F5B731]"
                  style={{ borderColor: BORDER }}
                />
              </label>
              {view === "profiles" && (
                <button
                  type="button"
                  onClick={() => setOpen(allOpen ? new Set() : new Set(visible.map((i) => i.slug)))}
                  className="fredoka-pill min-h-[44px] shrink-0 rounded-full border bg-white px-4 text-sm"
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
            <ul className="space-y-3">
              {visible.map((icp) => {
                const isOpen = open.has(icp.slug);
                return (
                  <li key={icp.slug} id={icp.slug} className="scroll-mt-36 overflow-hidden rounded-2xl border sm:scroll-mt-40" style={{ borderColor: isOpen ? "rgba(245,183,49,0.6)" : BORDER, background: isOpen ? "#FFFDF7" : "#fff" }}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`${icp.slug}-body`}
                        onClick={() => toggle(icp.slug)}
                        className="flex min-h-[44px] w-full items-start gap-3 p-4 text-left sm:gap-4 sm:p-5"
                      >
                        <span className="mt-0.5 inline-flex h-9 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-black tabular-nums" style={{ background: CREAM, color: GOLD_TEXT }}>
                          #{icp.num}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-black sm:text-lg">{icp.name}</span>
                          <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <TierBadge icp={icp} />
                            <TypeLabel icp={icp} />
                          </span>
                          {!isOpen && <span className="mt-1.5 block text-sm" style={{ color: MUTED }}>{icp.attrs.industry}</span>}
                        </span>
                        <ChevronDown aria-hidden="true" className={`mt-2 h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} style={{ color: MUTED }} />
                      </button>
                    </h3>
                    {isOpen && (
                      <div id={`${icp.slug}-body`} className="grid gap-6 border-t px-4 pb-6 pt-5 sm:px-5 md:grid-cols-3" style={{ borderColor: BORDER }}>
                        {ATTRIBUTE_GROUPS.map((g) => (
                          <div key={g.title}>
                            <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: GOLD_TEXT }}>{g.title}</p>
                            <dl className="space-y-3">
                              {g.attributes.map((a) => (
                                <div key={a.key}>
                                  <dt className="text-xs font-semibold" style={{ color: "#78716C" }}>{a.label}</dt>
                                  <dd className="mt-0.5 text-sm leading-relaxed"><AttrValue k={a.key} text={icp.attrs[a.key]} /></dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            visible.length > 0 && (
              <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: BORDER }}>
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr>
                      <th scope="col" className="sticky left-0 z-10 w-[150px] min-w-[150px] border-b border-r p-3 align-bottom text-xs font-semibold sm:w-[210px] sm:min-w-[210px] sm:p-4" style={{ background: CREAM, borderColor: BORDER, color: MUTED }}>
                        13 attributes
                      </th>
                      {visible.map((icp) => (
                        <th key={icp.slug} scope="col" className="min-w-[230px] border-b p-4 align-top font-normal" style={{ borderColor: BORDER, background: "#FFFDF7" }}>
                          <span className="block text-[11px] font-bold uppercase tracking-wider" style={{ color: GOLD_TEXT }}>ICP {icp.num}</span>
                          <span className="mt-1 block text-base font-black leading-snug">{icp.name}</span>
                          <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1"><TierBadge icp={icp} /><TypeLabel icp={icp} /></span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ATTRIBUTES.map((a) => (
                      <tr key={a.key}>
                        <th scope="row" className="sticky left-0 z-10 border-b border-r p-3 align-top sm:p-4" style={{ background: CREAM, borderColor: BORDER }}>
                          <span className="block text-xs font-bold sm:text-sm">{a.label}</span>
                          <span className="mt-0.5 block text-[11px] font-normal leading-snug" style={{ color: FAINT }}>{a.hint}</span>
                        </th>
                        {visible.map((icp) => (
                          <td key={icp.slug} className="border-b p-4 align-top leading-relaxed" style={{ borderColor: BORDER }}>
                            <AttrValue k={a.key} text={icp.attrs[a.key]} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </section>

      {/* Sections 2 and 3: prioritisation framework */}
      <section id="framework" className="scroll-mt-32 px-4 py-16 sm:scroll-mt-36">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Sections 2 and 3" title="Prioritisation framework">
            <p>
              Use the weighted criteria below to rank the ICPs by commercial attractiveness and likelihood of buying Myntmore&apos;s services. This lets us focus resources on the best opportunities rather than the largest possible list.
            </p>
          </SectionHead>

          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs" style={{ color: MUTED }}>
            <RatingPill rating="High" />
            <RatingPill rating="Moderate" />
            <RatingPill rating="Low" />
          </div>
          <div className="overflow-x-auto rounded-2xl border bg-white" style={{ borderColor: BORDER }}>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th scope="col" className="sticky left-0 z-10 min-w-[150px] border-b border-r p-3 text-left text-xs font-bold uppercase tracking-wider sm:min-w-[200px] sm:p-4" style={{ background: "#FFFDF7", borderColor: BORDER, color: GOLD_TEXT }}>
                    Criteria
                  </th>
                  {FRAMEWORK_ICPS.map((c) => (
                    <th key={c.slug} scope="col" className="min-w-[104px] border-b p-2 align-bottom text-xs font-black" style={{ borderColor: BORDER, background: "#FFFDF7" }}>
                      <a {...icpLink(c.slug)} className="inline-flex min-h-[44px] items-end justify-center px-1 pb-1 underline underline-offset-4"
                        style={{ textDecorationColor: "rgba(245,183,49,0.7)" }}>
                        {c.label}
                      </a>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FRAMEWORK.map((row) => (
                  <tr key={row.criterion}>
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

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-6" style={{ borderColor: BORDER }}>
              <h3 className="text-lg font-black">Notes for Myntmore</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>
                {NOTES.map((n) => <li key={n}>{n}</li>)}
              </ol>
            </div>
            <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(245,183,49,0.45)", background: "#FEF9EC" }}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD_TEXT }}>Note</p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>
                The initial 18-ICP comparison is a presentation view. Expanded ICPs, VC and agency partner analysis and TJ&apos;s additional segments are retained in the linked research annex. Ranking remains provisional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting research: numeric scores */}
      <section id="scores" className="scroll-mt-32 border-t bg-white px-4 pb-20 pt-16 sm:scroll-mt-36" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Supporting ICP research" title="ICP prioritisation: numeric scores (1–5)">
            <p>
              {SCORES.length} segments scored on 8 criteria. Strategic hypothesis scores, not measured conversion data: 1 = low fit, 5 = high fit. Compare direct customers and channel partners separately when allocating budget. Sum is calculated from the 8 scores (out of 40).
            </p>
          </SectionHead>

          <p className="mb-3 flex items-center gap-2 text-sm" style={{ color: MUTED }}>
            <ArrowDownUp aria-hidden="true" className="h-4 w-4" />
            Select a column heading to sort high to low. Select Segment to return to A–Z.
          </p>
          <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: BORDER }}>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th scope="col" aria-sort={scoreSort === "segment" ? "ascending" : "none"} className="sticky left-0 z-10 min-w-[170px] border-b border-r p-0 text-left sm:min-w-[260px]" style={{ background: CREAM, borderColor: BORDER }}>
                    <button type="button" onClick={() => setScoreSort("segment")} className="flex min-h-[56px] w-full items-end px-3 pb-3 text-xs font-black sm:px-4">
                      Segment{scoreSort === "segment" && <span className="ml-1" style={{ color: GOLD_TEXT }}>A–Z</span>}
                    </button>
                  </th>
                  {[...CRITERIA.map((c, i) => ({ label: c.label, n: i + 1, key: i })), { label: "Sum", n: 0, key: 8 }].map((c) => {
                    const on = scoreSort === c.key;
                    return (
                      <th key={c.key} scope="col" aria-sort={on ? "descending" : "none"} className="min-w-[92px] border-b p-0 align-bottom" style={{ borderColor: BORDER, background: c.key === 8 ? "rgba(245,183,49,0.28)" : on ? "rgba(245,183,49,0.14)" : CREAM }}>
                        <button type="button" onClick={() => setScoreSort(c.key)} className="flex min-h-[56px] w-full items-end justify-center px-2 pb-3 text-center text-xs font-black leading-tight">
                          <span>
                            {c.label}
                            {c.n > 0 && <sup className="ml-0.5" style={{ color: GOLD_TEXT }}>{c.n}</sup>}
                            {on && <span className="sr-only"> (sorted high to low)</span>}
                          </span>
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {scores.map((r) => (
                  <tr key={r.segment} className="hover:bg-[#FFFDF7]">
                    <th scope="row" className="sticky left-0 z-10 border-b border-r bg-white px-3 py-2.5 text-left text-xs font-semibold sm:px-4 sm:text-sm" style={{ borderColor: BORDER }}>{r.segment}</th>
                    {r.scores.map((s, i) => (
                      <td key={i} className="border-b px-2 py-2.5 text-center tabular-nums" style={{ borderColor: BORDER, color: s <= 2 ? FAINT : INK }}>
                        {s === 5 ? <span className="inline-flex h-6 w-7 items-center justify-center rounded-full font-bold" style={{ background: GOLD }}>5</span> : s}
                      </td>
                    ))}
                    <td className="border-b px-2 py-2.5 text-center font-black tabular-nums" style={{ borderColor: BORDER, background: "rgba(245,183,49,0.12)" }}>{r.sum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mb-4 mt-12 text-xl font-black">Guiding questions</h3>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CRITERIA.map((c, i) => (
              <li key={c.label} className="rounded-2xl border p-4" style={{ borderColor: BORDER, background: CREAM }}>
                <p className="text-sm font-black"><sup className="mr-1" style={{ color: GOLD_TEXT }}>{i + 1}</sup>{c.label}</p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: MUTED }}>{c.question}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm" style={{ color: MUTED }}>
            Linked page in Notion: Myntmore ICP Research Annex – Detailed Profiles &amp; TJ Additions.
          </p>
        </div>
      </section>
    </>
  );
}
