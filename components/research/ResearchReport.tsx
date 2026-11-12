"use client";

import { Fragment, useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Download, ExternalLink, Filter, Info, ArrowDownUp } from "lucide-react";
import type { Account, MarketWindow, Verdict } from "@/lib/research-types";

export interface ReportConfig {
  preparedFor: string;
  meta: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  extraStat?: [number | string, string];
  questions: string[];
  accounts: Account[];
  leadWithLabel: string;
  contactLabel: string;
  footnote: string;
  windows?: { heading: string; intro: string; items: MarketWindow[] };
  methodHeading: string;
  method: React.ReactNode;
  closing: { lead: string; accent: string; body: string; button: string; href: string };
  // What a "yes" on the last question, the risk question, means (shown in the legend).
  riskLegend: string;
  csvName: string;
  sourcesLine: string;
  // Used by the Prospect Research tool, where the report fills in while it runs. Both /research pages
  // leave these out and render exactly as before.
  /** Inside a tool page that already has the navbar spacing and breadcrumbs: less top padding, gold and orange glow only. */
  embedded?: boolean;
  /** Companies still being researched (soft placeholder rows) or that could not be researched. */
  pending?: { name: string; where: string; failed?: boolean }[];
  /** A line above the table, such as "Researching 6 of 10". */
  progress?: React.ReactNode;
  /** False while research is still running: the CSV download waits until every company is done. */
  csvReady?: boolean;
}

const INK = "#0a0a0a";
const MUTED = "#52525B";
const BORDER = "#E8E2D9";
const GOLD = "#F5B731";
const ORANGE = "#EA580C";
const GOLD_TEXT = "#A14A08";
const RISK = "#B91C1C";

const TIER_LABEL: Record<Account["tier"], string> = { T1: "Contact now", T2: "High priority", T3: "Worth nurturing" };
const TIER_STYLE: Record<Account["tier"], { bg: string; fg: string; border: string }> = {
  T1: { bg: "rgba(234,88,12,0.10)", fg: "#9A3412", border: "rgba(234,88,12,0.45)" },
  T2: { bg: "rgba(245,183,49,0.18)", fg: "#7A5200", border: "rgba(245,183,49,0.7)" },
  T3: { bg: "#F1EEE8", fg: "#57534E", border: "#D6D0C6" },
};
const VERDICT_WORD: Record<Verdict, string> = { yes: "Yes", likely: "Likely", no: "No" };
const TIER_RANK = { T1: 0, T2: 1, T3: 2 } as const;

type SortKey = "priority" | "fit" | "timing";

/** One answer as a filled, half-filled or empty circle. The last question is a risk, so a "yes" there is drawn as a warning ring. */
function Dot({ verdict, risk }: { verdict: Verdict; risk?: boolean }) {
  const color = risk ? RISK : ORANGE;
  const base = "inline-block h-[18px] w-[18px] rounded-full align-middle";
  if (verdict === "no") return <span aria-hidden="true" className={base} style={{ background: "#EFEAE2", border: `1px solid ${BORDER}` }} />;
  if (verdict === "yes" && risk) return <span aria-hidden="true" className={base} style={{ border: `2px solid ${color}`, boxShadow: `inset 0 0 0 3px #fff`, background: color }} />;
  if (verdict === "yes") return <span aria-hidden="true" className={base} style={{ background: color, border: `1px solid ${color}` }} />;
  return <span aria-hidden="true" className={base} style={{ background: `linear-gradient(90deg, ${color} 50%, #EFEAE2 50%)`, border: `1px ${risk ? "dashed" : "solid"} ${color}` }} />;
}

function csvCell(v: string | number) {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function downloadCsv(rows: Account[], questions: string[], fileName: string) {
  const head = ["Company", "Where", "Tier", "Fit (out of 100)", "Timing (out of 10)", "Buying window", ...questions.map((_, i) => `Q${i + 1}`), "Lead with", "Who to contact"];
  const lines = rows.map((a) => [a.name, a.where, TIER_LABEL[a.tier], a.fit, a.timing, `${a.when}: ${a.recent}`, ...a.answers.map((x) => VERDICT_WORD[x.verdict]), a.pitch, a.who].map(csvCell).join(","));
  const blob = new Blob([[head.map(csvCell).join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function ResearchReport({ config }: { config: ReportConfig }) {
  const ACCOUNTS = config.accounts;
  const QUESTIONS = config.questions;
  const [tier, setTier] = useState<"all" | Account["tier"]>("all");
  const [sort, setSort] = useState<SortKey>("priority");
  const [open, setOpen] = useState<Set<string>>(new Set());

  const rows = useMemo(() => {
    const r = ACCOUNTS.filter((a) => tier === "all" || a.tier === tier);
    return [...r].sort((a, b) =>
      sort === "fit" ? b.fit - a.fit : sort === "timing" ? b.timing - a.timing || b.fit - a.fit : TIER_RANK[a.tier] - TIER_RANK[b.tier] || b.timing - a.timing || b.fit - a.fit,
    );
  }, [ACCOUNTS, tier, sort]);

  const toggle = (name: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  const t1 = ACCOUNTS.filter((a) => a.tier === "T1").length;
  const t2 = ACCOUNTS.filter((a) => a.tier === "T2").length;

  return (
    <div className={`relative overflow-hidden px-4 pb-24 ${config.embedded ? "pt-4" : "pt-32"}`} style={{ color: INK }}>
      <div aria-hidden="true" className="pointer-events-none absolute -left-36 -top-20 h-[560px] w-[560px] rounded-full blur-[55px]" style={{ background: "radial-gradient(circle, rgba(245,183,49,0.26) 0%, rgba(255,160,0,0.09) 40%, transparent 68%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-24 h-[520px] w-[520px] rounded-full blur-[55px]" style={{ background: config.embedded ? "radial-gradient(circle, rgba(234,88,12,0.14) 0%, rgba(245,183,49,0.07) 40%, transparent 68%)" : "radial-gradient(circle, rgba(168,139,250,0.20) 0%, rgba(139,92,246,0.07) 40%, transparent 68%)" }} />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Intro */}
        <section className="grid items-end gap-8 pb-10 md:grid-cols-2 md:gap-12">
          <div>
            <p className="mb-3 text-sm font-medium" style={{ color: MUTED }}>
              Prepared by Myntmore for <strong className="text-base font-black" style={{ color: INK }}>{config.preparedFor}</strong>
              <span className="block text-xs">{config.meta}</span>
            </p>
            <h1 className="text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl" style={{ letterSpacing: "-0.03em" }}>
              {config.headline}
              <span className="block" style={{ color: GOLD_TEXT }}>{config.headlineAccent}</span>
            </h1>
          </div>
          <div>
            <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
              {config.intro}
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 text-sm sm:flex sm:flex-wrap" style={{ color: MUTED }}>
              {[
                [ACCOUNTS.length, "companies researched"],
                [t1, "Tier 1, contact now"],
                [t2, "Tier 2, high priority"],
                ...(config.extraStat ? [config.extraStat] : []),
              ].map(([n, l]) => (
                <div key={String(l)}>
                  <dd className="text-2xl font-black tabular-nums" style={{ color: INK }}>{n}</dd>
                  <dt>{l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Table */}
        <section aria-labelledby="accounts-title" className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: BORDER, boxShadow: "0 24px 70px rgba(15,15,20,0.06)" }}>
          <h2 id="accounts-title" className="sr-only">Partner accounts</h2>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3" style={{ borderColor: BORDER }}>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <label className="flex items-center gap-2" style={{ color: MUTED }}>
                <Filter className="h-4 w-4" aria-hidden="true" /> Tier
                <select value={tier} onChange={(e) => setTier(e.target.value as typeof tier)} className="min-h-[44px] rounded-lg border bg-white px-2.5 py-1.5 font-bold focus-visible:outline-none focus-visible:ring-2" style={{ borderColor: BORDER, color: INK }}>
                  <option value="all">All</option>
                  <option value="T1">Tier 1</option>
                  <option value="T2">Tier 2</option>
                  <option value="T3">Tier 3</option>
                </select>
              </label>
              <label className="flex items-center gap-2" style={{ color: MUTED }}>
                <ArrowDownUp className="h-4 w-4" aria-hidden="true" /> Sort
                <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="min-h-[44px] rounded-lg border bg-white px-2.5 py-1.5 font-bold focus-visible:outline-none focus-visible:ring-2" style={{ borderColor: BORDER, color: INK }}>
                  <option value="priority">Priority</option>
                  <option value="fit">Best fit</option>
                  <option value="timing">Most urgent</option>
                </select>
              </label>
            </div>
            <div className="flex items-center gap-3 text-sm" style={{ color: MUTED }}>
              <span>{rows.length} {rows.length === 1 ? "company" : "companies"}</span>
              <button type="button" disabled={config.csvReady === false} title={config.csvReady === false ? "Available when the research has finished" : undefined} onClick={() => downloadCsv(rows, QUESTIONS, config.csvName)} className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border bg-white px-3.5 py-1.5 font-bold transition-colors hover:bg-[#F8F6F2] focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white" style={{ borderColor: BORDER, color: INK }}>
                <Download className="h-4 w-4" aria-hidden="true" /> Download CSV ({rows.length})
              </button>
            </div>
          </div>

          {config.progress && (
            <div className="border-b px-4 py-3 text-sm" style={{ borderColor: BORDER, color: INK }} role="status" aria-live="polite">
              {config.progress}
            </div>
          )}

          <div className="flex items-center gap-2 border-b px-4 py-2.5 text-sm" style={{ borderColor: BORDER, backgroundColor: "#FBF7EE", color: MUTED }}>
            <Info className="h-4 w-4 flex-shrink-0" style={{ color: GOLD_TEXT }} aria-hidden="true" />
            <span><strong style={{ color: INK }}>Click any company</strong> to see why it&apos;s on the list, with the evidence and sources.</span>
          </div>

          <details className="border-b px-4 py-3 text-sm" style={{ borderColor: BORDER }}>
            <summary className="cursor-pointer font-bold" style={{ color: INK }}>What Q1 to Q{QUESTIONS.length} mean, and how to read the circles</summary>
            <ol className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2" style={{ color: MUTED }}>
              {QUESTIONS.map((q, i) => (
                <li key={q} className="flex gap-2">
                  <span className="w-7 flex-shrink-0 font-black tabular-nums" style={{ color: INK }}>Q{i + 1}</span>
                  {q}
                </li>
              ))}
            </ol>
            <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2" style={{ color: MUTED }}>
              <span className="inline-flex items-center gap-1.5"><Dot verdict="yes" /> Yes, with a dated source</span>
              <span className="inline-flex items-center gap-1.5"><Dot verdict="likely" /> Likely, older or less certain evidence</span>
              <span className="inline-flex items-center gap-1.5"><Dot verdict="no" /> No evidence found</span>
              <span className="inline-flex items-center gap-1.5"><Dot verdict="yes" risk /> {config.riskLegend} (Q{QUESTIONS.length})</span>
            </p>
          </details>

          <div className="px-4 py-2 text-center text-sm font-bold md:hidden" style={{ backgroundColor: GOLD, color: INK }}>
            Scroll right to see all signals <ArrowRight className="inline h-4 w-4" aria-hidden="true" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1080px] border-collapse text-left text-sm">
              <thead>
                <tr className="text-xs font-bold uppercase tracking-wider" style={{ color: MUTED }}>
                  <th scope="col" className="w-10 px-4 py-3">#</th>
                  <th scope="col" className="min-w-[200px] px-2 py-3">Company</th>
                  <th scope="col" className="min-w-[340px] px-2 py-3">Buying window</th>
                  <th scope="col" className="px-2 py-3">Tier</th>
                  <th scope="col" className="px-2 py-3">Timing</th>
                  <th scope="col" className="px-2 py-3">Fit</th>
                  {QUESTIONS.map((q, i) => (
                    <th key={q} scope="col" className="px-1.5 py-3 text-center">
                      <abbr title={q} className="no-underline">Q{i + 1}</abbr>
                    </th>
                  ))}
                  <th scope="col" className="w-10 px-3 py-3"><span className="sr-only">Open</span></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((a, idx) => {
                  const isOpen = open.has(a.name);
                  const ts = TIER_STYLE[a.tier];
                  const panelId = `panel-${idx}-${a.name.replace(/\W+/g, "-")}`;
                  return (
                    <Fragment key={a.name}>
                      <tr className="cursor-pointer border-t align-top transition-colors hover:bg-[#FBF7EE]" style={{ borderColor: BORDER }} onClick={() => toggle(a.name)}>
                        <td className="px-4 py-4 tabular-nums" style={{ color: MUTED }}>{idx + 1}</td>
                        <td className="px-2 py-4">
                          <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={(e) => { e.stopPropagation(); toggle(a.name); }} className="inline-flex min-h-[44px] items-center text-left font-black focus-visible:outline-none focus-visible:ring-2" style={{ color: INK }}>
                            {a.name}
                          </button>
                          <span className="block text-xs" style={{ color: MUTED }}>{a.where}</span>
                        </td>
                        <td className="px-2 py-4 leading-relaxed" style={{ color: MUTED }}>
                          <strong style={{ color: INK }}>{a.when}.</strong> {a.recent}
                        </td>
                        <td className="px-2 py-4">
                          <span className="inline-block whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: ts.bg, color: ts.fg, borderColor: ts.border }}>{TIER_LABEL[a.tier]}</span>
                        </td>
                        <td className="px-2 py-4 font-black tabular-nums">{a.timing}</td>
                        <td className="px-2 py-4 font-black tabular-nums">{a.fit}</td>
                        {a.answers.map((x, i) => (
                          <td key={i} className="px-1.5 py-4 text-center">
                            <Dot verdict={x.verdict} risk={i === QUESTIONS.length - 1} />
                            <span className="sr-only">Q{i + 1}: {VERDICT_WORD[x.verdict]}</span>
                          </td>
                        ))}
                        <td className="px-3 py-4"><ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} style={{ color: MUTED }} aria-hidden="true" /></td>
                      </tr>
                      {isOpen && (
                        <tr id={panelId} style={{ backgroundColor: "#FDFBF7" }}>
                          <td colSpan={7 + QUESTIONS.length} className="px-4 pb-8 pt-2 md:pl-14">
                            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                              <ul>
                                {a.answers.map((x, i) => (
                                  <li key={i} className="grid grid-cols-[18px_64px_1fr] gap-3 border-b border-dashed py-2.5 text-sm" style={{ borderColor: BORDER }}>
                                    <span className="mt-0.5"><Dot verdict={x.verdict} risk={i === QUESTIONS.length - 1} /></span>
                                    <span className="font-black">Q{i + 1} {VERDICT_WORD[x.verdict]}</span>
                                    <span style={{ color: MUTED }}>
                                      <span className="block font-medium" style={{ color: INK }}>{QUESTIONS[i]}</span>
                                      {x.text}{" "}
                                      {x.source && (
                                        <a href={x.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 whitespace-nowrap font-bold underline" style={{ color: GOLD_TEXT }}>
                                          Source{x.date ? `, ${x.date}` : ""} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                                        </a>
                                      )}
                                      {x.sourceStatus === "removed" && <span className="block text-xs">The source link stopped working{x.date ? ` (dated ${x.date})` : ""}, so the link was removed and this answer was marked down one step.</span>}
                                      {x.sourceStatus === "unchecked" && <span className="block text-xs">This site blocks automated checks, so the link was not checked automatically.</span>}
                                      {x.sourceStatus === "no_mention" && <span className="block text-xs">The linked page does not name the company, so this answer was marked down one step.</span>}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              <div className="text-sm">
                                <div className="mb-5 rounded-xl border p-4" style={{ borderColor: "rgba(245,183,49,0.6)", backgroundColor: "rgba(245,183,49,0.12)" }}>
                                  <h3 className="mb-1 font-black">{config.leadWithLabel}</h3>
                                  <p style={{ color: INK }}>{a.pitch}</p>
                                </div>
                                <h3 className="mb-1 font-black">{config.contactLabel}</h3>
                                <p style={{ color: MUTED }}>{a.who}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
                {config.pending?.map((p, i) => (
                  <tr key={`pending-${i}`} className="border-t align-top" style={{ borderColor: BORDER }}>
                    <td className="px-4 py-4 tabular-nums" style={{ color: MUTED }}>{rows.length + i + 1}</td>
                    <td className="px-2 py-4">
                      <span className="inline-flex min-h-[44px] items-center font-black" style={{ color: p.failed ? MUTED : INK }}>{p.name}</span>
                      <span className="block text-xs" style={{ color: MUTED }}>{p.where}</span>
                    </td>
                    {p.failed ? (
                      <td colSpan={5 + QUESTIONS.length} className="px-2 py-4" style={{ color: MUTED }}>
                        Could not research this company. It is left out of the scores and the CSV.
                      </td>
                    ) : (
                      <>
                        <td className="px-2 py-4">
                          <span className="sr-only">Researching</span>
                          <span aria-hidden="true" className="block h-3 w-4/5 rounded-full motion-safe:animate-pulse" style={{ backgroundColor: "#F1EADD" }} />
                          <span aria-hidden="true" className="mt-2 block h-3 w-3/5 rounded-full motion-safe:animate-pulse" style={{ backgroundColor: "#F5EFE5" }} />
                        </td>
                        {[0, 1, 2].map((k) => (
                          <td key={k} className="px-2 py-4"><span aria-hidden="true" className="block h-3 w-10 rounded-full motion-safe:animate-pulse" style={{ backgroundColor: "#F1EADD" }} /></td>
                        ))}
                        {QUESTIONS.map((q) => (
                          <td key={q} className="px-1.5 py-4 text-center"><span aria-hidden="true" className="inline-block h-[18px] w-[18px] rounded-full motion-safe:animate-pulse" style={{ backgroundColor: "#F5EFE5", border: `1px solid ${BORDER}` }} /></td>
                        ))}
                        <td className="px-3 py-4" />
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t px-4 py-3 text-xs" style={{ borderColor: BORDER, color: MUTED }}>
            {config.footnote}
          </p>
        </section>

        {/* Market windows */}
        {config.windows && (
        <section className="mt-20" aria-labelledby="windows-title">
          <h2 id="windows-title" className="mb-2 text-3xl font-black sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>{config.windows.heading}</h2>
          <p className="mb-8 max-w-2xl text-lg" style={{ color: MUTED }}>{config.windows.intro}</p>
          <div className="grid gap-6 md:grid-cols-3">
            {config.windows.items.map((w) => (
              <article key={w.title} className="rounded-2xl border bg-white p-6" style={{ borderColor: BORDER, borderTop: `3px solid ${GOLD}` }}>
                <h3 className="mb-2 text-lg font-black">{w.title}</h3>
                <p className="mb-3 text-sm leading-relaxed" style={{ color: MUTED }}>{w.body}</p>
                <p className="mb-4 text-sm font-medium leading-relaxed">{w.soWhat}</p>
                <a href={w.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-bold underline" style={{ color: GOLD_TEXT }}>
                  Source <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </section>
        )}

        {/* Method */}
        <section className="mt-20 max-w-3xl" aria-labelledby="method-title">
          <h2 id="method-title" className="mb-4 text-3xl font-black sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>{config.methodHeading}</h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: MUTED }}>{config.method}</div>
        </section>

        {/* Closing */}
        <section className="mt-20 rounded-[28px] border p-8 text-center sm:p-12" style={{ borderColor: "rgba(245,183,49,0.35)", background: "linear-gradient(135deg,#FEF9EC 0%,#FFFFFF 100%)" }}>
          <h2 className="mx-auto max-w-2xl text-3xl font-black sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>
            {config.closing.lead} <span className="italic" style={{ color: GOLD_TEXT }}>{config.closing.accent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: MUTED }}>{config.closing.body}</p>
          <a href={config.closing.href} className="mt-7 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold transition-transform hover:-translate-y-0.5" style={{ backgroundColor: GOLD, color: INK }}>
            {config.closing.button} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

        <p className="mt-10 text-xs" style={{ color: MUTED }}>{config.sourcesLine}</p>
      </div>
    </div>
  );
}
