"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Loader2, Pencil, RotateCcw } from "lucide-react";
import LeadGate, { type LeadData } from "@/components/tools/shared/LeadGate";
import ResearchReport, { type ReportConfig } from "@/components/research/ResearchReport";
import { LandingPage } from "./LandingPage";
import { BORDER, Card, GOLD, GOLD_TEXT, GoldBadge, INK, MUTED, Notice, fieldClass } from "@/components/tools/prospect-research/ui";
import type { Account } from "@/lib/research-types";
import { buildQuestions, formatDay, INPUT_LIMITS, PROFILE_KEYS } from "@/lib/prospect-research/core";
import type { Profile, ProspectResult } from "@/lib/prospect-research/types";
import pageCopy from "@/content/page-copy/toolProspectResearch.json";

// This page's text is edited in the admin ("Free Prospect Research Tool") and lives in content/page-copy/toolProspectResearch.json.
const copy = pageCopy;

type Step = "landing" | "lead" | "input" | "profile" | "results" | "capacity";
type Phase = "discovering" | "researching" | "done";
interface ProspectRow { name: string; domain: string; location: string; state: "pending" | "done" | "failed" }

const API = "/api/tools/prospect-research";
const PARALLEL = 5;

const PROFILE_LABELS: Record<keyof Profile, { label: string; hint?: string; long?: boolean }> = {
  companyName: { label: copy.ProspectResearchClient_s07.t01 },
  offer: { label: copy.ProspectResearchClient_s07.t02, long: true },
  industries: { label: copy.ProspectResearchClient_s07.t03 },
  companySize: { label: copy.ProspectResearchClient_s07.t04 },
  regions: { label: copy.ProspectResearchClient_s07.t05 },
  buyerRole: { label: copy.ProspectResearchClient_s07.t06, hint: copy.ProspectResearchClient_s07.t07 },
  investArea: { label: copy.ProspectResearchClient_s07.t08, hint: copy.ProspectResearchClient_s07.t09 },
  hiringRoles: { label: copy.ProspectResearchClient_s07.t10, hint: copy.ProspectResearchClient_s07.t11 },
  competitors: { label: copy.ProspectResearchClient_s07.t12, hint: copy.ProspectResearchClient_s07.t13 },
};

class ApiError extends Error {
  constructor(message: string, public data: Record<string, unknown>, public status: number) {
    super(message);
  }
}

async function post<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API}/${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  } catch {
    throw new ApiError("We could not reach the server. Check your connection and try again.", {}, 0);
  }
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) throw new ApiError(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.", data, res.status);
  return data as T;
}

function Field({ id, label, hint, required, children }: { id: string; label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-bold" style={{ color: INK }}>
        {label} {required ? <span style={{ color: GOLD_TEXT }}>*</span> : <span className="font-medium" style={{ color: MUTED }}>{copy.ProspectResearchClient_s07.t14}</span>}
      </label>
      {hint && <p id={`${id}-hint`} className="text-sm" style={{ color: MUTED }}>{hint}</p>}
      {children}
    </div>
  );
}

export default function ProspectResearchClient() {
  const [step, setStep] = useState<Step>("landing");
  const [lead, setLead] = useState<LeadData | null>(null);
  const [form, setForm] = useState({ website: "", offer: "", audience: "", exclusions: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capacityMessage, setCapacityMessage] = useState("");

  const [runId, setRunId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [homepageRead, setHomepageRead] = useState(true);

  const [phase, setPhase] = useState<Phase>("discovering");
  const [questions, setQuestions] = useState<string[]>([]);
  const [rows, setRows] = useState<ProspectRow[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [runDate, setRunDate] = useState(() => new Date());
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step !== "landing") topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const previewQuestions = useMemo(() => (profile ? buildQuestions(profile) : []), [profile]);

  const handleError = (err: unknown) => {
    if (err instanceof ApiError && err.data.needLead) {
      setLead(null);
      setStep("lead");
    }
    setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
  };

  // Step 1: read the homepage and work out the ideal customer.
  const submitInputs = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead?.id) {
      setError("We could not save your details. Please fill in the form again.");
      setStep("lead");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const data = await post<{ capacity?: boolean; message?: string; runId: string; profile: Profile; homepageRead: boolean }>("profile", { leadId: lead.id, ...form });
      if (data.capacity) {
        setCapacityMessage(data.message ?? "");
        setStep("capacity");
        return;
      }
      setRunId(data.runId);
      setProfile(data.profile);
      setHomepageRead(data.homepageRead);
      setEditing(false);
      setStep("profile");
    } catch (err) {
      handleError(err);
    } finally {
      setBusy(false);
    }
  };

  // Steps 2 to 4: discover, research each prospect (5 at a time, one retry), then save.
  const startResearch = async () => {
    if (!lead?.id || !runId || !profile) return;
    setError(null);
    setBusy(true);
    const started = Date.now();
    setRunDate(new Date());
    setAccounts([]);
    setRows([]);
    setQuestions(buildQuestions(profile));
    setPhase("discovering");
    setStep("results");

    let found: { name: string; domain: string; location: string }[];
    try {
      const d = await post<{ capacity?: boolean; message?: string; questions: string[]; prospects: { name: string; domain: string; location: string }[] }>("discover", { leadId: lead.id, runId, profile });
      if (d.capacity) {
        setCapacityMessage(d.message ?? "");
        setStep("capacity");
        setBusy(false);
        return;
      }
      if (d.questions?.length === 7) setQuestions(d.questions);
      found = d.prospects;
      setRows(found.map((p) => ({ ...p, state: "pending" })));
      setPhase("researching");
    } catch (err) {
      setStep("profile");
      setBusy(false);
      handleError(err);
      return;
    }

    await researchAll(found.map((p) => p.domain), started, false);
  };

  // Researches the given companies (5 at a time, one retry each) and then saves the run. Used for the
  // first pass and again for "Retry the ones that failed".
  const researchAll = async (domains: string[], started: number, retry: boolean) => {
    if (!lead?.id || !runId) return;
    let firstAt: number | null = null;
    const researchOne = async (domain: string) => {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const r = await post<ProspectResult>("account", { leadId: lead.id, runId, domain });
          if (r.account) return r.account;
        } catch (err) {
          if (err instanceof ApiError && (err.status === 401 || err.status === 404 || err.status === 410 || err.status === 429)) break;
        }
      }
      return null;
    };

    const queue = [...domains];
    const worker = async () => {
      for (let domain = queue.shift(); domain; domain = queue.shift()) {
        const account = await researchOne(domain);
        if (account) {
          firstAt ??= Date.now();
          setAccounts((prev) => [...prev, account]);
        }
        setRows((prev) => prev.map((r) => (r.domain === domain ? { ...r, state: account ? "done" : "failed" } : r)));
      }
    };
    await Promise.all(Array.from({ length: Math.min(PARALLEL, domains.length) }, worker));

    setPhase("done");
    setBusy(false);
    try {
      await post("finish", { leadId: lead.id, runId, retry, firstProspectMs: firstAt ? firstAt - started : null, totalMs: Date.now() - started });
    } catch {
      /* the report is already on screen; saving it is best effort */
    }
  };

  const retryFailed = async () => {
    const domains = rows.filter((r) => r.state === "failed").map((r) => r.domain);
    if (!domains.length || busy) return;
    setError(null);
    setBusy(true);
    setPhase("researching");
    setRows((prev) => prev.map((r) => (r.state === "failed" ? { ...r, state: "pending" } : r)));
    await researchAll(domains, Date.now(), true);
  };

  const startOver = () => {
    setRunId(null);
    setProfile(null);
    setAccounts([]);
    setRows([]);
    setError(null);
    setStep("input");
  };

  if (step === "landing") return <LandingPage onStart={() => setStep(lead ? "input" : "lead")} />;

  if (step === "results" && profile) {
    const total = rows.length;
    const doneCount = rows.filter((r) => r.state !== "pending").length;
    const failed = rows.filter((r) => r.state === "failed");
    const pending = phase === "discovering"
      ? Array.from({ length: 10 }, () => ({ name: copy.ProspectResearchClient_s07.t15, where: "Searching for a recent signal" }))
      : [...rows.filter((r) => r.state === "pending"), ...failed].map((r) => ({ name: r.name, where: [r.domain, r.location].filter(Boolean).join(" · "), failed: r.state === "failed" }));
    const runLabel = formatDay(runDate);
    const config: ReportConfig = {
      embedded: true,
      preparedFor: profile.companyName,
      meta: `Prospect research · run ${runLabel}`,
      headline: copy.ProspectResearchClient_s07.t16,
      headlineAccent: "and why now.",
      intro: `${total || "Up to 10"} companies that match ${profile.companyName}'s ideal customer and show a recent public sign they may be ready to buy. Each one is scored from sourced answers, so you can see exactly why it is on the list. Open any company to see the evidence.`,
      extraStat: [7, "questions per company"],
      questions,
      accounts,
      pending,
      csvReady: phase === "done",
      progress: (
        <div>
          <p className="font-bold">
            {phase === "discovering" && "Finding companies with a recent public signal. This takes about a minute."}
            {phase === "researching" && `Researching ${Math.min(doneCount + 1, total)} of ${total}. Each company appears as soon as its research is done.`}
            {phase === "done" && `Done. ${accounts.length} of ${total} companies researched${failed.length ? `, ${failed.length} could not be researched` : ""}.`}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: "#EFEAE2" }} aria-hidden="true">
            <div className="h-full rounded-full motion-safe:transition-[width] motion-safe:duration-700" style={{ width: `${phase === "discovering" ? 8 : total ? Math.max(8, (doneCount / total) * 100) : 8}%`, backgroundColor: GOLD }} />
          </div>
          {phase !== "done" && <p className="mt-2 text-xs" style={{ color: MUTED }}>{copy.ProspectResearchClient_s07.t17}</p>}
        </div>
      ),
      leadWithLabel: `How ${profile.companyName} could open`,
      contactLabel: "Who usually owns this",
      footnote: `Tier 1 means a fit of 70 or more and timing of 7 or more. Tier 2 means a fit of 55 or more. Tier 3 is the rest. Fit and timing are calculated from the answers by fixed rules, not by the AI. Times such as "5 weeks ago" are counted from ${runLabel}. Check any signal at its source before acting on it.`,
      methodHeading: "How this report was built",
      method: (
        <>
          <p>{copy.ProspectResearchClient_s07.t18}</p>
          <p>{copy.ProspectResearchClient_s07.t19}</p>
          <p><strong style={{ color: INK }}>{copy.ProspectResearchClient_s07.t20}</strong>{copy.ProspectResearchClient_s07.t21}</p>
          <p>{copy.ProspectResearchClient_s07.t22}</p>
        </>
      ),
      closing: {
        lead: copy.ProspectResearchClient_s07.t23,
        accent: "these accounts?",
        body: copy.ProspectResearchClient_s07.t24,
        button: copy.ProspectResearchClient_s07.t25,
        href: "/book-a-call",
      },
      riskLegend: "Already uses a competitor or does it in-house",
      csvName: `prospect-research-${profile.companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "report"}.csv`,
      sourcesLine: `Sources: public web pages found with Google Search, as linked in each answer, checked automatically on ${runLabel}. Research by Myntmore's free Prospect Research tool.`,
    };
    return (
      <div ref={topRef} className="scroll-mt-28">
        <ResearchReport config={config} />
        {phase === "done" && (
          <div className="-mt-12 px-4 pb-20 text-center">
            {failed.length > 0 && (
              <div className="mb-4">
                <button type="button" onClick={retryFailed} disabled={busy} className="btn-dark inline-flex min-h-[44px] items-center gap-2 px-6 py-2.5 text-sm font-bold disabled:opacity-60">
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />{copy.ProspectResearchClient_s07.t26}{failed.length}{copy.ProspectResearchClient_s07.t27}</button>
                <p className="mt-2 text-xs" style={{ color: MUTED }}>{copy.ProspectResearchClient_s07.t28}</p>
              </div>
            )}
            <button type="button" onClick={startOver} className="btn-ghost inline-flex min-h-[44px] items-center gap-2 px-6 py-2.5 text-sm font-bold">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />{copy.ProspectResearchClient_s07.t29}</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={topRef} className="relative overflow-hidden scroll-mt-28 px-4 pb-24 pt-4" style={{ color: INK }}>
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-32 h-[560px] w-[560px] rounded-full blur-[55px]" style={{ background: "radial-gradient(circle, rgba(245,183,49,0.24) 0%, rgba(255,160,0,0.08) 40%, transparent 68%)" }} />
      <div className="relative z-10 mx-auto max-w-3xl">
        {step === "lead" && (
          <>
            <header className="text-center">
              <div className="mb-6"><GoldBadge>{copy.ProspectResearchClient_s07.t30}</GoldBadge></div>
              <h1 className="text-4xl font-black leading-[1.08] sm:text-5xl" style={{ letterSpacing: "-0.03em", textWrap: "balance" }}>{copy.ProspectResearchClient_s07.t31}<span style={{ color: GOLD_TEXT }}>{copy.ProspectResearchClient_s07.t32}</span>
              </h1>
            </header>
            {error && <div className="mx-auto mt-8 max-w-md"><Notice>{error}</Notice></div>}
            <LeadGate
              source="prospect_research"
              heading="First, tell us about you"
              description="We use this to send you the report and to keep the tool free."
              onComplete={(d) => {
                setLead(d);
                setError(d.id ? null : "We could not save your details. Please try again in a minute.");
                setStep(d.id ? "input" : "lead");
              }}
            />
          </>
        )}

        {step === "input" && (
          <>
            <header className="mb-8 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GOLD_TEXT }}>{copy.ProspectResearchClient_s07.t33}</p>
              <h1 className="text-4xl font-black leading-[1.08] sm:text-5xl" style={{ letterSpacing: "-0.03em", textWrap: "balance" }}>{copy.ProspectResearchClient_s07.t34}<span style={{ color: GOLD_TEXT }}>{copy.ProspectResearchClient_s07.t35}</span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg" style={{ color: MUTED }}>{copy.ProspectResearchClient_s07.t36}</p>
            </header>
            <Card className="p-6 sm:p-8">
              <form onSubmit={submitInputs} className="space-y-6" noValidate>
                <Field id="website" label="Your company website" required>
                  <input id="website" type="text" inputMode="url" autoComplete="url" required maxLength={INPUT_LIMITS.website} placeholder="yourcompany.com" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={fieldClass} style={{ borderColor: BORDER }} disabled={busy} />
                </Field>
                <Field id="offer" label="What you sell, in a sentence" required>
                  <textarea id="offer" rows={3} required maxLength={INPUT_LIMITS.offer} placeholder={copy.ProspectResearchClient_s07.t37} value={form.offer} onChange={(e) => setForm({ ...form, offer: e.target.value })} className={fieldClass} style={{ borderColor: BORDER }} disabled={busy} />
                </Field>
                <Field id="audience" label="Who you sell to" hint="Industry, company size, regions. Leave it empty and we will work it out.">
                  <textarea id="audience" aria-describedby="audience-hint" rows={2} maxLength={INPUT_LIMITS.audience} placeholder={copy.ProspectResearchClient_s07.t38} value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} className={fieldClass} style={{ borderColor: BORDER }} disabled={busy} />
                </Field>
                <Field id="exclusions" label="Companies to leave out" hint="Existing clients or competitors, one per line. Names or websites both work.">
                  <textarea id="exclusions" aria-describedby="exclusions-hint" rows={3} maxLength={INPUT_LIMITS.exclusions * 60} placeholder={"acme.com\nGlobex"} value={form.exclusions} onChange={(e) => setForm({ ...form, exclusions: e.target.value })} className={fieldClass} style={{ borderColor: BORDER }} disabled={busy} />
                </Field>
                {error && <Notice>{error}</Notice>}
                <div className="flex flex-col items-center gap-3 pt-2">
                  <button type="submit" disabled={busy} className="btn-dark inline-flex min-h-[48px] w-full items-center justify-center gap-2 px-8 py-3.5 text-base disabled:cursor-wait disabled:opacity-70 sm:w-auto">
                    {busy ? <><Loader2 className="h-4 w-4 motion-safe:animate-spin" aria-hidden="true" />{copy.ProspectResearchClient_s07.t39}</> : <>{copy.ProspectResearchClient_s07.t40}<ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
                  </button>
                  <p className="text-sm" style={{ color: MUTED }} aria-live="polite">{busy ? "This takes about 20 seconds." : "Nothing is searched until you confirm the next step."}</p>
                </div>
              </form>
            </Card>
          </>
        )}

        {step === "profile" && profile && (
          <>
            <header className="mb-8 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GOLD_TEXT }}>{copy.ProspectResearchClient_s07.t41}</p>
              <h1 className="text-4xl font-black leading-[1.08] sm:text-5xl" style={{ letterSpacing: "-0.03em", textWrap: "balance" }}>{copy.ProspectResearchClient_s07.t42}<span style={{ color: GOLD_TEXT }}>{copy.ProspectResearchClient_s07.t43}</span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg" style={{ color: MUTED }}>{copy.ProspectResearchClient_s07.t44}</p>
            </header>
            {!homepageRead && <div className="mb-6"><Notice>{copy.ProspectResearchClient_s07.t45}</Notice></div>}
            <Card className="p-6 sm:p-8">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-black">{copy.ProspectResearchClient_s08.t01}</h2>
                <button type="button" onClick={() => setEditing(!editing)} className="btn-ghost inline-flex min-h-[44px] items-center gap-2 px-5 py-2 text-sm font-bold" aria-pressed={editing}>
                  {editing ? <><Check className="h-4 w-4" aria-hidden="true" />{copy.ProspectResearchClient_s08.t02}</> : <><Pencil className="h-4 w-4" aria-hidden="true" />{copy.ProspectResearchClient_s08.t03}</>}
                </button>
              </div>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                {PROFILE_KEYS.map((k) => {
                  const meta = PROFILE_LABELS[k];
                  return (
                    <div key={k} className={meta.long ? "sm:col-span-2" : ""}>
                      <dt className="text-xs font-bold uppercase tracking-widest" style={{ color: MUTED }}>
                        {editing ? <label htmlFor={`p-${k}`}>{meta.label}</label> : meta.label}
                      </dt>
                      <dd className="mt-1">
                        {editing ? (
                          <input id={`p-${k}`} type="text" maxLength={INPUT_LIMITS.profileField} value={profile[k]} onChange={(e) => setProfile({ ...profile, [k]: e.target.value })} className={fieldClass} style={{ borderColor: BORDER }} />
                        ) : (
                          <span className="text-base" style={{ color: INK }}>{profile[k] || <span style={{ color: MUTED }}>{copy.ProspectResearchClient_s08.t04}</span>}</span>
                        )}
                        {editing && meta.hint && <span className="mt-1 block text-xs" style={{ color: MUTED }}>{meta.hint}</span>}
                      </dd>
                    </div>
                  );
                })}
              </dl>
              <details className="mt-7 border-t pt-5 text-sm" style={{ borderColor: BORDER }}>
                <summary className="flex min-h-[44px] cursor-pointer items-center font-bold">{copy.ProspectResearchClient_s08.t05}</summary>
                <ol className="mt-3 space-y-1.5" style={{ color: MUTED }}>
                  {previewQuestions.map((q, i) => (
                    <li key={i} className="flex gap-2"><span className="w-7 flex-shrink-0 font-black tabular-nums" style={{ color: INK }}>{copy.ProspectResearchClient_s08.t06}{i + 1}</span>{q}</li>
                  ))}
                </ol>
              </details>
            </Card>
            {error && <div className="mt-6"><Notice>{error}</Notice></div>}
            <div className="mt-8 flex flex-col items-center gap-3">
              <button type="button" onClick={startResearch} disabled={busy} className="btn-dark inline-flex min-h-[48px] w-full items-center justify-center gap-2 px-8 py-3.5 text-base disabled:opacity-70 sm:w-auto">{copy.ProspectResearchClient_s08.t07}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="text-center text-sm" style={{ color: MUTED }}>{copy.ProspectResearchClient_s08.t08}</p>
              <button type="button" onClick={startOver} className="inline-flex min-h-[44px] items-center text-sm font-bold underline underline-offset-4" style={{ color: GOLD_TEXT }}>{copy.ProspectResearchClient_s08.t09}</button>
            </div>
          </>
        )}

        {step === "capacity" && (
          <Card className="p-8 text-center sm:p-10">
            <div className="mb-5"><GoldBadge>{copy.ProspectResearchClient_s08.t10}</GoldBadge></div>
            <h1 className="text-3xl font-black sm:text-4xl" style={{ letterSpacing: "-0.02em", textWrap: "balance" }}>{capacityMessage || "We're at capacity today."}</h1>
            <p className="mx-auto mt-4 max-w-md" style={{ color: MUTED }}>{copy.ProspectResearchClient_s08.t11}</p>
          </Card>
        )}
      </div>
    </div>
  );
}
