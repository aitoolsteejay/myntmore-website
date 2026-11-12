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

type Step = "landing" | "lead" | "input" | "profile" | "results" | "capacity";
type Phase = "discovering" | "researching" | "done";
interface ProspectRow { name: string; domain: string; location: string; state: "pending" | "done" | "failed" }

const API = "/api/tools/prospect-research";
const PARALLEL = 5;

const PROFILE_LABELS: Record<keyof Profile, { label: string; hint?: string; long?: boolean }> = {
  companyName: { label: "Your company" },
  offer: { label: "What you sell", long: true },
  industries: { label: "Industries you sell to" },
  companySize: { label: "Company size" },
  regions: { label: "Regions" },
  buyerRole: { label: "Who buys", hint: "The job title that usually owns the problem" },
  investArea: { label: "What a ready buyer invests in", hint: "Used for Q3" },
  hiringRoles: { label: "Roles they hire when they have this problem", hint: "Used for Q4" },
  competitors: { label: "What they might use instead", hint: "Competitors or doing it in-house, used for Q7" },
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
        {label} {required ? <span style={{ color: GOLD_TEXT }}>*</span> : <span className="font-medium" style={{ color: MUTED }}>(optional)</span>}
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
    let firstAt: number | null = null;
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
      setQuestions(d.questions);
      found = d.prospects;
      setRows(found.map((p) => ({ ...p, state: "pending" })));
      setPhase("researching");
    } catch (err) {
      setStep("profile");
      setBusy(false);
      handleError(err);
      return;
    }

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

    const queue = [...found];
    const worker = async () => {
      for (let p = queue.shift(); p; p = queue.shift()) {
        const domain = p.domain;
        const account = await researchOne(domain);
        if (account) {
          firstAt ??= Date.now();
          setAccounts((prev) => [...prev, account]);
        }
        setRows((prev) => prev.map((r) => (r.domain === domain ? { ...r, state: account ? "done" : "failed" } : r)));
      }
    };
    await Promise.all(Array.from({ length: Math.min(PARALLEL, found.length) }, worker));

    setPhase("done");
    setBusy(false);
    try {
      await post("finish", { leadId: lead.id, runId, firstProspectMs: firstAt ? firstAt - started : null, totalMs: Date.now() - started });
    } catch {
      /* the report is already on screen; saving it is best effort */
    }
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
      ? Array.from({ length: 10 }, () => ({ name: "Finding a company", where: "Searching for a recent signal" }))
      : [...rows.filter((r) => r.state === "pending"), ...failed].map((r) => ({ name: r.name, where: [r.domain, r.location].filter(Boolean).join(" · "), failed: r.state === "failed" }));
    const runLabel = formatDay(runDate);
    const config: ReportConfig = {
      embedded: true,
      preparedFor: profile.companyName,
      meta: `Prospect research · run ${runLabel}`,
      headline: "Who to contact this month,",
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
          {phase !== "done" && <p className="mt-2 text-xs" style={{ color: MUTED }}>Keep this tab open. The download unlocks when every company is done.</p>}
        </div>
      ),
      leadWithLabel: `How ${profile.companyName} could open`,
      contactLabel: "Who usually owns this",
      footnote: `Tier 1 means a fit of 70 or more and timing of 7 or more. Tier 2 means a fit of 55 or more. Tier 3 is the rest. Fit and timing are calculated from the answers by fixed rules, not by the AI. Times such as "5 weeks ago" are counted from ${runLabel}. Check any signal at its source before acting on it.`,
      methodHeading: "How this report was built",
      method: (
        <>
          <p>We read your homepage to understand what you sell and who buys it. AI with Google Search then looked for companies that match that ideal customer and had a dated public signal in the last 12 months, removed your own company, anything you excluded and duplicates, and kept the strongest ten. Each one was then researched separately against the same seven questions.</p>
          <p>Every answer links to the page it came from. Before you saw them, the links were checked automatically: a link that no longer works was removed and the answer marked down one step, and so was an answer whose page does not name the company. Some sites block automated checks; those links are kept and marked as not checked. &ldquo;No evidence found&rdquo; means the search did not find it, not that it does not exist. &ldquo;Likely&rdquo; means the evidence is older, indirect or partly confirmed. Contact names are not included; the role shown is who usually owns the problem.</p>
          <p><strong style={{ color: INK }}>How the scores work.</strong> Fit is out of 100: matching your ideal customer 25, said it will invest in the area you serve 20, hiring for roles you help with 20, funding in the last 12 months 15, a new leader in the buyer&apos;s role 10, a new product or market 10. A &ldquo;yes&rdquo; earns the full points and a &ldquo;likely&rdquo; half. Already using a competitor or doing it in-house is a risk and takes off 15 for a yes, 7 for a likely. Timing is out of 10: funding in the last 90 days 3 (older 2), stated investment 2, hiring now 2, a new leader 2, a new product or market 1.</p>
          <p>AI research can be wrong. Check a source before you act on it. The companies named here have not reviewed or endorsed this research.</p>
        </>
      ),
      closing: {
        lead: "Want us to run the outreach to",
        accent: "these accounts?",
        body: "Myntmore turns research like this into outreach and brings back booked meetings.",
        button: "Book a call with Myntmore",
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
            <button type="button" onClick={startOver} className="btn-ghost inline-flex min-h-[44px] items-center gap-2 px-6 py-2.5 text-sm font-bold">
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Run another search
            </button>
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
              <div className="mb-6"><GoldBadge>Free Prospect Research</GoldBadge></div>
              <h1 className="text-4xl font-black leading-[1.08] sm:text-5xl" style={{ letterSpacing: "-0.03em", textWrap: "balance" }}>
                Ten companies that may buy from you, <span style={{ color: GOLD_TEXT }}>and why now.</span>
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
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GOLD_TEXT }}>Step 1 of 2</p>
              <h1 className="text-4xl font-black leading-[1.08] sm:text-5xl" style={{ letterSpacing: "-0.03em", textWrap: "balance" }}>
                Tell us what you <span style={{ color: GOLD_TEXT }}>sell.</span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg" style={{ color: MUTED }}>We read your homepage first, then show you what we understood before searching.</p>
            </header>
            <Card className="p-6 sm:p-8">
              <form onSubmit={submitInputs} className="space-y-6" noValidate>
                <Field id="website" label="Your company website" required>
                  <input id="website" type="text" inputMode="url" autoComplete="url" required maxLength={INPUT_LIMITS.website} placeholder="yourcompany.com" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={fieldClass} style={{ borderColor: BORDER }} disabled={busy} />
                </Field>
                <Field id="offer" label="What you sell, in a sentence" required>
                  <textarea id="offer" rows={3} required maxLength={INPUT_LIMITS.offer} placeholder="We run outbound for B2B software companies and book qualified sales meetings." value={form.offer} onChange={(e) => setForm({ ...form, offer: e.target.value })} className={fieldClass} style={{ borderColor: BORDER }} disabled={busy} />
                </Field>
                <Field id="audience" label="Who you sell to" hint="Industry, company size, regions. Leave it empty and we will work it out.">
                  <textarea id="audience" aria-describedby="audience-hint" rows={2} maxLength={INPUT_LIMITS.audience} placeholder="Series A to C SaaS companies, 50 to 500 staff, US and UK" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} className={fieldClass} style={{ borderColor: BORDER }} disabled={busy} />
                </Field>
                <Field id="exclusions" label="Companies to leave out" hint="Existing clients or competitors, one per line. Names or websites both work.">
                  <textarea id="exclusions" aria-describedby="exclusions-hint" rows={3} maxLength={INPUT_LIMITS.exclusions * 60} placeholder={"acme.com\nGlobex"} value={form.exclusions} onChange={(e) => setForm({ ...form, exclusions: e.target.value })} className={fieldClass} style={{ borderColor: BORDER }} disabled={busy} />
                </Field>
                {error && <Notice>{error}</Notice>}
                <div className="flex flex-col items-center gap-3 pt-2">
                  <button type="submit" disabled={busy} className="btn-dark inline-flex min-h-[48px] w-full items-center justify-center gap-2 px-8 py-3.5 text-base disabled:cursor-wait disabled:opacity-70 sm:w-auto">
                    {busy ? <><Loader2 className="h-4 w-4 motion-safe:animate-spin" aria-hidden="true" /> Reading your website</> : <>Check my profile <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
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
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GOLD_TEXT }}>Step 2 of 2</p>
              <h1 className="text-4xl font-black leading-[1.08] sm:text-5xl" style={{ letterSpacing: "-0.03em", textWrap: "balance" }}>
                Is this <span style={{ color: GOLD_TEXT }}>right?</span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg" style={{ color: MUTED }}>This is who we will search for. Edit anything that is off, then start the research.</p>
            </header>
            {!homepageRead && <div className="mb-6"><Notice>We could not open your homepage, so this is based on what you told us and a web search. Check it carefully.</Notice></div>}
            <Card className="p-6 sm:p-8">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-black">What we understood</h2>
                <button type="button" onClick={() => setEditing(!editing)} className="btn-ghost inline-flex min-h-[44px] items-center gap-2 px-5 py-2 text-sm font-bold" aria-pressed={editing}>
                  {editing ? <><Check className="h-4 w-4" aria-hidden="true" /> Done editing</> : <><Pencil className="h-4 w-4" aria-hidden="true" /> Edit</>}
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
                          <span className="text-base" style={{ color: INK }}>{profile[k] || <span style={{ color: MUTED }}>Not set</span>}</span>
                        )}
                        {editing && meta.hint && <span className="mt-1 block text-xs" style={{ color: MUTED }}>{meta.hint}</span>}
                      </dd>
                    </div>
                  );
                })}
              </dl>
              <details className="mt-7 border-t pt-5 text-sm" style={{ borderColor: BORDER }}>
                <summary className="flex min-h-[44px] cursor-pointer items-center font-bold">The seven questions we will answer for each company</summary>
                <ol className="mt-3 space-y-1.5" style={{ color: MUTED }}>
                  {previewQuestions.map((q, i) => (
                    <li key={i} className="flex gap-2"><span className="w-7 flex-shrink-0 font-black tabular-nums" style={{ color: INK }}>Q{i + 1}</span>{q}</li>
                  ))}
                </ol>
              </details>
            </Card>
            {error && <div className="mt-6"><Notice>{error}</Notice></div>}
            <div className="mt-8 flex flex-col items-center gap-3">
              <button type="button" onClick={startResearch} disabled={busy} className="btn-dark inline-flex min-h-[48px] w-full items-center justify-center gap-2 px-8 py-3.5 text-base disabled:opacity-70 sm:w-auto">
                Find my 10 prospects <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="text-center text-sm" style={{ color: MUTED }}>Takes about two minutes. You can run two searches a day.</p>
              <button type="button" onClick={startOver} className="inline-flex min-h-[44px] items-center text-sm font-bold underline underline-offset-4" style={{ color: GOLD_TEXT }}>Change my answers</button>
            </div>
          </>
        )}

        {step === "capacity" && (
          <Card className="p-8 text-center sm:p-10">
            <div className="mb-5"><GoldBadge>Free Prospect Research</GoldBadge></div>
            <h1 className="text-3xl font-black sm:text-4xl" style={{ letterSpacing: "-0.02em", textWrap: "balance" }}>{capacityMessage || "We're at capacity today."}</h1>
            <p className="mx-auto mt-4 max-w-md" style={{ color: MUTED }}>We have saved your request and will send the report to the email you gave us.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
