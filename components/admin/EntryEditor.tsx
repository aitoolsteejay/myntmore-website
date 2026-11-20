"use client";

// Generic entry form. Draws an input for each field from the schema description built on the server
// (lib/admin/schema.ts describeType), which comes from keystatic.config.ts. The server re-validates
// every save with Keystatic's own field rules, so the hints here are for convenience only.
import { useEffect, useMemo, useState } from "react";
import type { FieldDescriptor } from "@/lib/admin/schema";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Path = (string | number)[];
type Errors = Record<string, string>;

const key = (path: Path) => path.join(".");
const INPUT =
  "w-full rounded-lg border bg-white px-3 py-2 text-[15px] leading-relaxed outline-none focus:border-[#A14A08] focus:ring-2 focus:ring-[#F5B731]/40 disabled:bg-[#F8F6F2] disabled:text-[#52525B]";

function setIn(value: any, path: Path, next: any): any {
  if (path.length === 0) return next;
  const [head, ...rest] = path;
  if (Array.isArray(value)) {
    const copy = value.slice();
    copy[head as number] = setIn(copy[head as number], rest, next);
    return copy;
  }
  return { ...(value ?? {}), [head]: setIn(value?.[head], rest, next) };
}

function defaultFor(desc: FieldDescriptor): any {
  switch (desc.kind) {
    case "text":
      return desc.defaultValue;
    case "slug":
      return { name: "", slug: "" };
    case "checkbox":
      return false;
    case "select":
      return desc.options[0]?.value ?? "";
    case "object":
      return Object.fromEntries(Object.entries(desc.fields).map(([k, d]) => [k, defaultFor(d)]));
    case "array":
      return [];
    default:
      return null;
  }
}

/** A list item's heading: its first non-empty text field. */
function itemTitle(desc: FieldDescriptor, value: any, index: number): string {
  if (desc.kind === "object") {
    for (const [k, d] of Object.entries(desc.fields)) if (d.kind === "text" && typeof value?.[k] === "string" && value[k].trim()) return value[k];
  }
  if (desc.kind === "text" && typeof value === "string" && value.trim()) return value;
  return `Item ${index + 1}`;
}

function Label({ text, required, htmlFor }: { text: string; required?: boolean; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold">
      {text}
      {required && <span className="text-[#A14A08]"> *</span>}
    </label>
  );
}

function Help({ text }: { text?: string }) {
  return text ? <p className="mt-0.5 text-[13px] leading-relaxed text-[#71675E]">{text}</p> : null;
}

function ErrorText({ text }: { text?: string }) {
  return text ? (
    <p role="alert" className="mt-1 text-[13px] font-semibold text-[#9F1D1D]">
      {text}
    </p>
  ) : null;
}

function Field({
  desc,
  value,
  path,
  onChange,
  errors,
  readOnly,
}: {
  desc: FieldDescriptor;
  value: any;
  path: Path;
  onChange: (path: Path, v: any) => void;
  errors: Errors;
  readOnly: boolean;
}) {
  const id = `f-${key(path)}`;
  const error = errors[key(path)];
  switch (desc.kind) {
    case "text": {
      const length = typeof value === "string" ? value.length : 0;
      const over = desc.max !== undefined && length > desc.max;
      const props = {
        id,
        value: value ?? "",
        disabled: readOnly,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(path, e.target.value),
        className: `${INPUT} ${error || over ? "border-[#D9534F]" : "border-[#E8E2D9]"}`,
        "aria-invalid": !!error || over,
      };
      return (
        <div>
          <Label text={desc.label} required={desc.required} htmlFor={id} />
          <Help text={desc.description} />
          <div className="mt-1.5">
            {desc.multiline ? <textarea rows={Math.min(10, Math.max(3, Math.ceil(length / 90)))} {...props} /> : <input type="text" {...props} />}
          </div>
          <p className={`mt-1 text-xs tabular-nums ${over ? "font-semibold text-[#9F1D1D]" : "text-[#71675E]"}`}>
            {desc.max !== undefined ? `${length} / ${desc.max}` : `${length} characters`}
            {desc.min !== undefined && desc.min > 1 ? ` (at least ${desc.min})` : ""}
          </p>
          <ErrorText text={error} />
        </div>
      );
    }
    case "slug":
      return (
        <div>
          <Label text={desc.label} required htmlFor={id} />
          <Help text={desc.description} />
          <input
            id={id}
            type="text"
            value={value?.name ?? ""}
            disabled={readOnly}
            onChange={(e) => onChange(path, { ...value, name: e.target.value })}
            className={`${INPUT} mt-1.5 ${error ? "border-[#D9534F]" : "border-[#E8E2D9]"}`}
          />
          {desc.isEntryName && (
            <p className="mt-1 text-xs text-[#71675E]">
              File name: <span className="font-mono">{value?.slug}</span> (cannot be changed here)
            </p>
          )}
          <ErrorText text={error} />
        </div>
      );
    case "checkbox":
      return (
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={!!value}
              disabled={readOnly}
              onChange={(e) => onChange(path, e.target.checked)}
              className="h-4 w-4 accent-[#A14A08]"
            />
            {desc.label}
          </label>
          <Help text={desc.description} />
          <ErrorText text={error} />
        </div>
      );
    case "select":
      return (
        <div>
          <Label text={desc.label} htmlFor={id} />
          <Help text={desc.description} />
          <select
            id={id}
            value={value ?? ""}
            disabled={readOnly}
            onChange={(e) => onChange(path, e.target.value)}
            className={`${INPUT} mt-1.5 border-[#E8E2D9]`}
          >
            {desc.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ErrorText text={error} />
        </div>
      );
    case "object":
      return (
        <fieldset className={desc.label ? "rounded-xl border border-[#E8E2D9] p-4" : ""}>
          {desc.label && <legend className="px-1 text-sm font-bold">{desc.label}</legend>}
          <Help text={desc.description} />
          <div className="space-y-5">
            {Object.entries(desc.fields).map(([k, d]) => (
              <Field key={k} desc={d} value={value?.[k]} path={[...path, k]} onChange={onChange} errors={errors} readOnly={readOnly} />
            ))}
          </div>
        </fieldset>
      );
    case "array":
      return <ArrayField desc={desc} value={Array.isArray(value) ? value : []} path={path} onChange={onChange} errors={errors} readOnly={readOnly} />;
    default:
      return (
        <div>
          <Label text={desc.label} />
          <p className="mt-1 text-[13px] text-[#71675E]">
            This kind of field ({desc.kind === "unsupported" ? desc.type : desc.kind}) is not editable here yet.
          </p>
          <pre className="mt-1 max-h-40 overflow-auto rounded-lg bg-white p-2 text-xs text-[#52525B]">{JSON.stringify(value, null, 2)}</pre>
        </div>
      );
  }
}

function ArrayField({
  desc,
  value,
  path,
  onChange,
  errors,
  readOnly,
}: {
  desc: Extract<FieldDescriptor, { kind: "array" }>;
  value: any[];
  path: Path;
  onChange: (path: Path, v: any) => void;
  errors: Errors;
  readOnly: boolean;
}) {
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});
  const move = (from: number, to: number) => {
    const next = value.slice();
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(path, next);
    setCollapsed({});
  };
  const error = errors[key(path)];
  const canAdd = !readOnly && (desc.max === undefined || value.length < desc.max);
  return (
    <section aria-label={desc.label}>
      <div className="flex items-baseline justify-between gap-4">
        <Label text={desc.label} />
        <span className="text-xs text-[#71675E]">
          {value.length} item{value.length === 1 ? "" : "s"}
        </span>
      </div>
      <Help text={desc.description} />
      <ErrorText text={error} />
      <ol className="mt-3 space-y-3">
        {value.map((item, i) => {
          const itemErrors = Object.keys(errors).some((k) => k.startsWith(`${key([...path, i])}.`) || k === key([...path, i]));
          return (
            <li key={i} className={`rounded-xl border bg-white ${itemErrors ? "border-[#D9534F]" : "border-[#E8E2D9]"}`}>
              <div className="flex items-center gap-2 border-b border-[#E8E2D9] px-4 py-2">
                <button
                  type="button"
                  onClick={() => setCollapsed({ ...collapsed, [i]: !collapsed[i] })}
                  className="min-w-0 flex-1 truncate text-left text-sm font-semibold"
                  aria-expanded={!collapsed[i]}
                >
                  <span className="mr-2 tabular-nums text-xs text-[#71675E]">{i + 1}</span>
                  {itemTitle(desc.element, item, i)}
                </button>
                {!readOnly && (
                  <div className="flex shrink-0 gap-1 text-xs font-semibold">
                    <button
                      type="button"
                      disabled={i === 0}
                      onClick={() => move(i, i - 1)}
                      className="rounded px-2 py-1 text-[#52525B] hover:bg-[#F8F6F2] disabled:opacity-30"
                      aria-label={`Move item ${i + 1} up`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={i === value.length - 1}
                      onClick={() => move(i, i + 1)}
                      className="rounded px-2 py-1 text-[#52525B] hover:bg-[#F8F6F2] disabled:opacity-30"
                      aria-label={`Move item ${i + 1} down`}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Remove "${itemTitle(desc.element, item, i)}"?`)) {
                          onChange(
                            path,
                            value.filter((_, j) => j !== i),
                          );
                          setCollapsed({});
                        }
                      }}
                      className="rounded px-2 py-1 text-[#9F1D1D] hover:bg-[#FDECEA]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              {!collapsed[i] && (
                <div className="p-4">
                  <Field desc={desc.element} value={item} path={[...path, i]} onChange={onChange} errors={errors} readOnly={readOnly} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
      {canAdd && (
        <button
          type="button"
          onClick={() => onChange(path, [...value, defaultFor(desc.element)])}
          className="mt-3 rounded-lg border border-dashed border-[#C9BFB2] px-4 py-2 text-sm font-semibold text-[#52525B] hover:border-[#A14A08] hover:text-[#A14A08]"
        >
          + Add item
        </button>
      )}
    </section>
  );
}

type Status =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved"; text: string; url: string | null; warning?: string }
  | { kind: "error"; text: string }
  | { kind: "conflict"; text: string };

export default function EntryEditor({
  typeKey,
  slug,
  fields,
  initialState,
  initialSha,
  readOnly,
}: {
  typeKey: string;
  slug: string;
  fields: Record<string, FieldDescriptor>;
  initialState: Record<string, unknown>;
  initialSha: string;
  readOnly: boolean;
}) {
  const [state, setState] = useState(initialState);
  const [saved, setSaved] = useState(() => JSON.stringify(initialState));
  const [sha, setSha] = useState(initialSha);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const dirty = useMemo(() => JSON.stringify(state) !== saved, [state, saved]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const onChange = (path: Path, v: any) => {
    setState((s) => setIn(s, path, v));
    if (status.kind === "saved") setStatus({ kind: "idle" });
  };

  async function save() {
    setStatus({ kind: "saving" });
    setErrors({});
    const res = await fetch(`/api/admin/entries/${typeKey}/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state, sha }),
    }).catch(() => null);
    const body = await res?.json().catch(() => null);
    if (!res || !body) return setStatus({ kind: "error", text: "Could not reach the server. Nothing was saved; your edits are still here." });
    if (res.status === 409) return setStatus({ kind: "conflict", text: body.error });
    if (!res.ok) {
      const next: Errors = Object.fromEntries((body.errors ?? []).map((e: { path: Path; message: string }) => [key(e.path), e.message]));
      setErrors(next);
      // Bring the first problem into view (lists expand by default, so its input is on the page).
      const first = Object.keys(next)[0];
      if (first)
        setTimeout(() => {
          const el = document.getElementById(`f-${first}`);
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
          el?.focus({ preventScroll: true });
        }, 50);
      return setStatus({ kind: "error", text: body.error ?? "Could not save." });
    }
    setSaved(JSON.stringify(state));
    if (body.unchanged) return setStatus({ kind: "saved", text: "No changes to save.", url: null });
    setSha(body.sha);
    const n = body.changes.length;
    setStatus({
      kind: "saved",
      text: body.local
        ? `Saved ${n} change${n === 1 ? "" : "s"} to the files on this computer.`
        : `Saved ${n} change${n === 1 ? "" : "s"}. The site updates in about 2 minutes, once Vercel finishes deploying.`,
      url: body.commitUrl,
      warning: body.logWarning,
    });
  }

  const errorCount = Object.keys(errors).length;
  return (
    <div className="pb-28">
      <div className="mt-6 space-y-7">
        {Object.entries(fields).map(([k, d]) => (
          <Field key={k} desc={d} value={(state as any)[k]} path={[k]} onChange={onChange} errors={errors} readOnly={readOnly} />
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-[#E8E2D9] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0 flex-1 text-sm" role="status" aria-live="polite">
            {readOnly && <span className="text-[#71675E]">View only.</span>}
            {!readOnly && status.kind === "idle" && <span className="text-[#71675E]">{dirty ? "Unsaved changes" : "No changes yet"}</span>}
            {status.kind === "saving" && <span className="text-[#71675E]">Saving and publishing…</span>}
            {status.kind === "saved" && (
              <span className="text-[#166534]">
                {status.text}{" "}
                {status.url && (
                  <a href={status.url} target="_blank" rel="noreferrer" className="font-semibold underline">
                    View commit
                  </a>
                )}
                {status.warning && <span className="block text-[#A14A08]">{status.warning}</span>}
              </span>
            )}
            {status.kind === "error" && (
              <span className="text-[#9F1D1D]">
                {status.text}
                {errorCount > 0 && ` ${errorCount} field${errorCount === 1 ? "" : "s"} marked in red.`}
              </span>
            )}
            {status.kind === "conflict" && (
              <span className="text-[#9F1D1D]">
                {status.text}{" "}
                <a href={`/admin/content/${typeKey}/${slug}`} target="_blank" rel="noreferrer" className="font-semibold underline">
                  Open the latest version in a new tab
                </a>
              </span>
            )}
          </div>
          {!readOnly && (
            <button
              type="button"
              onClick={save}
              disabled={!dirty || status.kind === "saving"}
              className="rounded-lg bg-[#0A0A0A] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-40"
            >
              {status.kind === "saving" ? "Saving…" : "Save and publish"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
