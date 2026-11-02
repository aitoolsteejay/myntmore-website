"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { ALL_FIELDS, ICPS, SECTIONS, STATUS_GROUPS, fieldValue, pad, statusLabel, type FieldKey, type Icp, type StatusGroup } from "@/lib/value-prop";

const INK = "#0A0A0A";
const BODY = "#52525B";
const MUTED = "#71675E";
const LINE = "#E8E2D9";
const TINT = "#FEF9EC";

const groupMeta = (g: StatusGroup) => STATUS_GROUPS.find((s) => s.group === g)!;

// Shown above the tabs, so the tabs leave them out (the "By field" view still lists them).
const HEADER_FIELDS: FieldKey[] = ["headline", "oneLiner"];

const searchText = (icp: Icp) => [icp.name, icp.buyers, icp.headline, icp.oneLiner, ...Object.values(icp.values)].join(" ").toLowerCase();

function StatusDot({ group, className = "" }: { group: StatusGroup; className?: string }) {
  const g = groupMeta(group);
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 shrink-0 rounded-full ${className}`}
      style={group === "deprioritised" ? { border: `1.5px solid ${g.color}` } : { background: g.color }}
    />
  );
}

function StatusTag({ icp }: { icp: Icp }) {
  const g = groupMeta(icp.status.group);
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: g.text }}>
      <StatusDot group={icp.status.group} />
      {statusLabel(icp)}
    </span>
  );
}

function GapTag() {
  return (
    <span
      className="mr-1.5 inline-block rounded px-1.5 py-px align-[1px] text-[10px] font-bold uppercase tracking-wider"
      style={{ background: "#FDECEA", color: "#9F1D1D" }}
    >
      Gap
    </span>
  );
}

/** Splits "a; b; c" into a list when there are three or more parts; otherwise plain text. */
function Prose({ text }: { text: string }) {
  const parts = text.split(/;\s+/);
  if (parts.length < 3) return <p>{text}</p>;
  return (
    <ul className="space-y-1">
      {parts.map((p, i) => (
        <li key={i} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full" style={{ background: "#C9BFB2" }} />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

function Value({ fieldKey, text }: { fieldKey: FieldKey; text: string }) {
  if (fieldKey === "howItWorks" && text.includes("→")) {
    const steps = text.split(/\s*→\s*/).filter(Boolean);
    return (
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {steps.map((s, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span className="rounded-full border px-2.5 py-0.5 text-[13px]" style={{ borderColor: LINE, background: "#fff" }}>
              <span className="mr-1.5 tabular-nums" style={{ color: MUTED }}>
                {i + 1}
              </span>
              {s}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" style={{ color: "#C9BFB2" }}>
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    );
  }

  const [before, gap] = text.split("[[GAP]]");
  return (
    <div className="space-y-2">
      {before.trim() && <Prose text={before.trim()} />}
      {gap !== undefined && (
        <p>
          <GapTag />
          {gap.trim()}
        </p>
      )}
    </div>
  );
}

function Note({ text }: { text: string }) {
  return (
    <p className="border-l-2 pl-3 text-[13px] leading-relaxed" style={{ borderColor: "#F5B731", color: MUTED }}>
      {text}
    </p>
  );
}

export default function ValuePropExplorer() {
  const [view, setView] = useState<"icp" | "field">("icp");
  const [selected, setSelected] = useState(1);
  const [tab, setTab] = useState(0);
  const [group, setGroup] = useState<StatusGroup | "all">("all");
  const [query, setQuery] = useState("");
  const [fieldKey, setFieldKey] = useState<FieldKey>("headline");
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const index = useMemo(() => new Map(ICPS.map((i) => [i.number, searchText(i)])), []);
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ICPS.filter((i) => (group === "all" || i.status.group === group) && (!q || index.get(i.number)!.includes(q)));
  }, [group, query, index]);

  const icp = ICPS.find((i) => i.number === selected) ?? ICPS[0];

  // Deep links: #icp-11 opens ICP 11 (the direction list above the explorer links here).
  useEffect(() => {
    const fromHash = (scroll: boolean) => {
      const m = window.location.hash.match(/^#icp-(\d+)$/);
      if (!m) return;
      const n = Number(m[1]);
      if (!ICPS.some((i) => i.number === n)) return;
      setSelected(n);
      setView("icp");
      if (scroll) rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    fromHash(true);
    const onHash = () => fromHash(true);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const select = useCallback((n: number, opts: { scroll?: boolean } = {}) => {
    setSelected(n);
    setView("icp");
    try {
      window.history.replaceState(null, "", `#icp-${pad(n)}`);
    } catch {
      /* ignore */
    }
    if (opts.scroll && panelRef.current && panelRef.current.getBoundingClientRect().top < 0) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const order = visible.some((i) => i.number === selected) ? visible : ICPS;
  const pos = order.findIndex((i) => i.number === selected);
  const prev = pos > 0 ? order[pos - 1] : null;
  const next = pos >= 0 && pos < order.length - 1 ? order[pos + 1] : null;

  const section = SECTIONS[tab];
  const sectionFields = section.fields.filter((f) => !HEADER_FIELDS.includes(f.key));
  const activeField = ALL_FIELDS.find((f) => f.key === fieldKey)!;

  return (
    <div ref={rootRef} id="explorer" className="scroll-mt-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex self-start rounded-full border p-1" style={{ borderColor: LINE, background: "#fff" }} role="group" aria-label="View">
          {(
            [
              ["icp", "By ICP"],
              ["field", "By field"],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
              style={view === v ? { background: INK, color: "#fff" } : { color: BODY }}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="relative block sm:w-72">
          <span className="sr-only">Search ICPs</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: MUTED }} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 29 ICPs"
            className="w-full rounded-full border bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-[#F5B731]"
            style={{ borderColor: LINE, color: INK }}
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by 2026 status">
        {[{ group: "all" as const, title: "All" }, ...STATUS_GROUPS].map((g) => {
          const on = group === g.group;
          const count = g.group === "all" ? ICPS.length : ICPS.filter((i) => i.status.group === g.group).length;
          return (
            <button
              key={g.group}
              type="button"
              onClick={() => setGroup(g.group)}
              aria-pressed={on}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors"
              style={on ? { background: INK, borderColor: INK, color: "#fff" } : { background: "#fff", borderColor: LINE, color: BODY }}
            >
              {g.group !== "all" && <StatusDot group={g.group} />}
              {g.group === "all" ? "All" : g.title.replace(" for active acquisition", "").replace("Retain as distinct motions", "Retain")}
              <span className="tabular-nums opacity-60">{count}</span>
            </button>
          );
        })}
        {(query || group !== "all") && (
          <span className="ml-1 text-xs" style={{ color: MUTED }}>
            {visible.length} of {ICPS.length} shown
          </span>
        )}
      </div>

      {view === "icp" ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
          {/* ICP list: a select on small screens, a grouped list from lg up */}
          <div className="lg:hidden">
            <label htmlFor="icp-select" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: MUTED }}>
              ICP
            </label>
            <select
              id="icp-select"
              value={selected}
              onChange={(e) => select(Number(e.target.value))}
              className="w-full rounded-xl border bg-white px-3 py-2.5 text-sm font-semibold"
              style={{ borderColor: LINE, color: INK }}
            >
              {STATUS_GROUPS.map((g) => {
                const items = visible.filter((i) => i.status.group === g.group);
                if (!items.length) return null;
                return (
                  <optgroup key={g.group} label={g.title}>
                    {items.map((i) => (
                      <option key={i.number} value={i.number}>
                        {pad(i.number)} · {i.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
              {!visible.some((i) => i.number === selected) && (
                <option value={selected}>
                  {pad(icp.number)} · {icp.name}
                </option>
              )}
            </select>
          </div>

          <nav aria-label="ICPs" className="hidden lg:block">
            <div className="sticky top-6 max-h-[calc(100vh-3rem)] space-y-5 overflow-y-auto pb-4 pr-1">
              {STATUS_GROUPS.map((g) => {
                const items = visible.filter((i) => i.status.group === g.group);
                if (!items.length) return null;
                return (
                  <div key={g.group}>
                    <p className="mb-1.5 px-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: MUTED }}>
                      {g.title}
                    </p>
                    <ul>
                      {items.map((i) => {
                        const on = i.number === selected;
                        return (
                          <li key={i.number}>
                            <button
                              type="button"
                              onClick={() => select(i.number, { scroll: true })}
                              aria-current={on ? "true" : undefined}
                              className="flex w-full items-baseline gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] leading-snug transition-colors hover:bg-white"
                              style={on ? { background: TINT, color: INK, fontWeight: 700 } : { color: BODY }}
                            >
                              <span className="tabular-nums text-[11px]" style={{ color: on ? "#A14A08" : MUTED }}>
                                {pad(i.number)}
                              </span>
                              <span>{i.name}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
              {!visible.length && (
                <p className="px-2 text-sm" style={{ color: MUTED }}>
                  No ICP matches “{query}”.
                </p>
              )}
            </div>
          </nav>

          {/* Selected ICP */}
          <article ref={panelRef} className="min-w-0 scroll-mt-6" aria-labelledby="icp-title">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: MUTED }}>
                ICP {pad(icp.number)} of 29
              </span>
              <StatusTag icp={icp} />
            </div>
            <h2 id="icp-title" className="mt-2 text-2xl font-black leading-tight sm:text-3xl" style={{ color: INK }}>
              {icp.name}
            </h2>
            <p className="mt-1 text-sm" style={{ color: MUTED }}>
              {icp.buyers}
            </p>

            <div className="mt-6 rounded-2xl border bg-white p-5 sm:p-7" style={{ borderColor: LINE }}>
              <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: MUTED }}>
                Headline
              </p>
              <p className="mt-2 text-xl font-extrabold leading-snug sm:text-2xl" style={{ color: INK }}>
                {icp.headline}
              </p>
              <div className="my-5 h-px" style={{ background: LINE }} />
              <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: MUTED }}>
                One-line value prop
              </p>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: BODY }}>
                {icp.oneLiner}
              </p>
            </div>

            {/* Section tabs */}
            <div className="mt-8 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <div role="tablist" aria-label="Sections" className="flex min-w-max gap-1 border-b" style={{ borderColor: LINE }}>
                {SECTIONS.map((s, i) => {
                  const on = i === tab;
                  return (
                    <button
                      key={s.number}
                      type="button"
                      role="tab"
                      id={`vp-tab-${i}`}
                      aria-selected={on}
                      aria-controls="vp-tabpanel"
                      onClick={() => setTab(i)}
                      className="-mb-px whitespace-nowrap border-b-2 px-2.5 py-2.5 text-[13px] font-semibold transition-colors"
                      style={on ? { borderColor: "#F5B731", color: INK } : { borderColor: "transparent", color: MUTED }}
                    >
                      <span className="mr-1.5 tabular-nums text-[11px] opacity-60">{pad(s.number)}</span>
                      {s.short}
                    </button>
                  );
                })}
              </div>
            </div>

            <div id="vp-tabpanel" role="tabpanel" aria-labelledby={`vp-tab-${tab}`} className="pt-6">
              <h3 className="text-base font-black" style={{ color: INK }}>
                {section.title}
              </h3>
              {section.openingNote && (
                <div className="mt-3">
                  <Note text={section.openingNote} />
                </div>
              )}
              <dl className="mt-2">
                {sectionFields.map((f) => (
                  <div key={f.key} className="grid gap-1 border-b py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6" style={{ borderColor: LINE }}>
                    <dt className="text-[13px] font-semibold" style={{ color: INK }} title={f.hint}>
                      {f.label}
                    </dt>
                    <dd className="text-[15px] leading-relaxed" style={{ color: BODY }}>
                      <Value fieldKey={f.key} text={fieldValue(icp, f.key)} />
                    </dd>
                  </div>
                ))}
              </dl>
              {section.closingNote && (
                <div className="mt-4">
                  <Note text={section.closingNote} />
                </div>
              )}
              {tab < SECTIONS.length - 1 && (
                <button
                  type="button"
                  onClick={() => setTab(tab + 1)}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: "#A14A08" }}
                >
                  Next: {SECTIONS[tab + 1].title}
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 border-t pt-5" style={{ borderColor: LINE }}>
              <div>
                {prev && (
                  <button type="button" onClick={() => select(prev.number, { scroll: true })} className="group text-left">
                    <span className="flex items-center gap-1 text-xs" style={{ color: MUTED }}>
                      <ChevronLeft aria-hidden="true" className="h-3.5 w-3.5" /> Previous
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold group-hover:underline" style={{ color: INK }}>
                      {pad(prev.number)} · {prev.name}
                    </span>
                  </button>
                )}
              </div>
              <div className="text-right">
                {next && (
                  <button type="button" onClick={() => select(next.number, { scroll: true })} className="group text-right">
                    <span className="flex items-center justify-end gap-1 text-xs" style={{ color: MUTED }}>
                      Next <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold group-hover:underline" style={{ color: INK }}>
                      {pad(next.number)} · {next.name}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </article>
        </div>
      ) : (
        <div className="mt-6">
          <div className="rounded-2xl border bg-white p-5 sm:p-6" style={{ borderColor: LINE }}>
            <label htmlFor="field-select" className="block text-[11px] font-bold uppercase tracking-wider" style={{ color: MUTED }}>
              Compare one field across ICPs
            </label>
            <select
              id="field-select"
              value={fieldKey}
              onChange={(e) => setFieldKey(e.target.value as FieldKey)}
              className="mt-2 w-full rounded-xl border bg-white px-3 py-2.5 text-sm font-semibold sm:max-w-md"
              style={{ borderColor: LINE, color: INK }}
            >
              {SECTIONS.map((s) => (
                <optgroup key={s.number} label={`${pad(s.number)} ${s.title}`}>
                  {s.fields.map((f) => (
                    <option key={f.key} value={f.key}>
                      {f.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>
              {activeField.hint}
            </p>
          </div>

          <ol className="mt-4">
            {visible.map((i) => (
              <li key={i.number} className="grid gap-1.5 border-b py-4 sm:grid-cols-[240px_minmax(0,1fr)] sm:gap-6" style={{ borderColor: LINE }}>
                <div>
                  <button type="button" onClick={() => select(i.number)} className="text-left text-sm font-bold hover:underline" style={{ color: INK }}>
                    <span className="mr-2 tabular-nums text-xs font-semibold" style={{ color: MUTED }}>
                      {pad(i.number)}
                    </span>
                    {i.name}
                  </button>
                  <div className="mt-1">
                    <StatusTag icp={i} />
                  </div>
                </div>
                <div className="text-[15px] leading-relaxed" style={{ color: BODY }}>
                  <Value fieldKey={fieldKey} text={fieldValue(i, fieldKey)} />
                </div>
              </li>
            ))}
            {!visible.length && (
              <li className="py-6 text-sm" style={{ color: MUTED }}>
                No ICP matches “{query}”.
              </li>
            )}
          </ol>
        </div>
      )}
    </div>
  );
}
