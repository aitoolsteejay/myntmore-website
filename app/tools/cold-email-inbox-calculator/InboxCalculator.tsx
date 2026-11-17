"use client";

import { useEffect, useMemo, useState } from "react";

// Works out the sending infrastructure a cold email programme needs. Every default is a number Myntmore
// already publishes: about 30 live emails per inbox per day (never over 40), 4 inboxes per domain, a
// 5-email sequence, 14 to 21 days of warm-up, and a 1% to 3% reply rate with at least 20% of replies positive.
// Costs are the user's own figures; the tool never assumes a price.

const ACCENT = "#A14A08";
const INK = "#0a0a0a";
const MUTED = "#52525B";
const LINE = "#E8E2D9";
const CREAM = "#F8F6F2";

type Mode = "prospects" | "daily";

const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");
const fmtDate = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold mb-1.5" style={{ color: INK }}>{label}</label>
      {children}
      {hint && <p className="text-xs mt-1.5" style={{ color: "#71675E" }}>{hint}</p>}
    </div>
  );
}

const inputClass = "w-full rounded-xl border px-4 py-3 text-base outline-none focus:border-[#A14A08]";
const inputStyle = { backgroundColor: "#ffffff", borderColor: LINE, color: INK } as const;

function Stat({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div className="rounded-2xl border p-5" style={{ backgroundColor: "#ffffff", borderColor: LINE }}>
      <div className="text-3xl font-black" style={{ color: ACCENT }}>{value}</div>
      <div className="text-sm font-bold mt-1" style={{ color: INK }}>{label}</div>
      {note && <div className="text-xs mt-1 leading-relaxed" style={{ color: "#71675E" }}>{note}</div>}
    </div>
  );
}

export default function InboxCalculator() {
  const [mode, setMode] = useState<Mode>("prospects");
  const [prospects, setProspects] = useState(5000);
  const [steps, setSteps] = useState(5);
  const [dailyTarget, setDailyTarget] = useState(1200);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [perInbox, setPerInbox] = useState(30);
  const [perDomain, setPerDomain] = useState(4);
  const [spares, setSpares] = useState(true);
  // Set after mount: "today" on the server and in the browser can differ around midnight.
  const [start, setStart] = useState("");
  useEffect(() => setStart(todayIso()), []);
  const [inboxCost, setInboxCost] = useState("");
  const [domainCost, setDomainCost] = useState("");

  const r = useMemo(() => {
    const sendingDaysPerMonth = (daysPerWeek * 52) / 12;
    const monthlyEmails = mode === "prospects" ? prospects * steps : dailyTarget * sendingDaysPerMonth;
    const daily = mode === "prospects" ? monthlyEmails / sendingDaysPerMonth : dailyTarget;
    const monthlyProspects = mode === "prospects" ? prospects : monthlyEmails / Math.max(steps, 1);
    const inboxes = Math.max(1, Math.ceil(daily / Math.max(perInbox, 1)));
    const baseDomains = Math.max(1, Math.ceil(inboxes / Math.max(perDomain, 1)));
    const spareDomains = spares ? Math.max(1, Math.ceil(baseDomains * 0.1)) : 0;
    const domains = baseDomains + spareDomains;
    const totalInboxes = inboxes + spareDomains * perDomain;
    const startDate = new Date(`${start}T00:00:00`);
    const valid = !Number.isNaN(startDate.getTime());
    const ic = parseFloat(inboxCost);
    const dc = parseFloat(domainCost);
    const monthlyCost =
      (Number.isFinite(ic) ? ic * totalInboxes : 0) + (Number.isFinite(dc) ? (dc * domains) / 12 : 0);
    return {
      daily,
      monthlyEmails,
      monthlyProspects,
      inboxes,
      baseDomains,
      spareDomains,
      domains,
      totalInboxes,
      earliest: valid ? addDays(startDate, 14) : null,
      safer: valid ? addDays(startDate, 21) : null,
      repliesLow: monthlyProspects * 0.01,
      repliesHigh: monthlyProspects * 0.03,
      hasCost: Number.isFinite(ic) || Number.isFinite(dc),
      monthlyCost,
    };
  }, [mode, prospects, steps, dailyTarget, daysPerWeek, perInbox, perDomain, spares, start, inboxCost, domainCost]);

  const num = (set: (n: number) => void, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (Number.isFinite(v)) set(Math.min(max, Math.max(min, v)));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <form className="rounded-2xl border p-6 sm:p-8 space-y-6" style={{ backgroundColor: "#ffffff", borderColor: LINE }} onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend className="text-sm font-bold mb-2" style={{ color: INK }}>Start from</legend>
          <div className="grid grid-cols-2 gap-2" role="radiogroup">
            {([["prospects", "Prospects per month"], ["daily", "Emails per day"]] as const).map(([m, label]) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mode === m}
                onClick={() => setMode(m)}
                className="min-h-[44px] rounded-xl border px-3 text-sm font-bold transition-colors"
                style={mode === m ? { backgroundColor: "#F5B731", borderColor: "#F5B731", color: INK } : { backgroundColor: "#ffffff", borderColor: LINE, color: MUTED }}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        {mode === "prospects" ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="prospects" label="New prospects per month" hint="Fresh contacts entering the sequence each month.">
              <input id="prospects" type="number" inputMode="numeric" min={50} max={200000} step={50} value={prospects} onChange={num(setProspects, 0, 200000)} className={inputClass} style={inputStyle} />
            </Field>
            <Field id="steps" label="Emails per prospect" hint="Our standard sequence is 5 emails over 18 days.">
              <input id="steps" type="number" inputMode="numeric" min={1} max={10} value={steps} onChange={num(setSteps, 1, 10)} className={inputClass} style={inputStyle} />
            </Field>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="daily" label="Emails per sending day" hint="Every email counts, follow-ups included.">
              <input id="daily" type="number" inputMode="numeric" min={10} max={50000} step={10} value={dailyTarget} onChange={num(setDailyTarget, 0, 50000)} className={inputClass} style={inputStyle} />
            </Field>
            <Field id="steps2" label="Emails per prospect" hint="Used to estimate prospects and replies.">
              <input id="steps2" type="number" inputMode="numeric" min={1} max={10} value={steps} onChange={num(setSteps, 1, 10)} className={inputClass} style={inputStyle} />
            </Field>
          </div>
        )}

        <Field id="perInbox" label={`Live emails per inbox per day: ${perInbox}`} hint={perInbox > 30 ? "Above the ~30 we use. Stay under 40, and expect more risk to sender reputation." : "We send about 30 per inbox per day, and never over 40."}>
          <input id="perInbox" type="range" min={10} max={40} step={1} value={perInbox} onChange={num(setPerInbox, 10, 40)} className="w-full accent-[#A14A08]" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="perDomain" label="Inboxes per domain" hint="We use 4.">
            <input id="perDomain" type="number" inputMode="numeric" min={1} max={5} value={perDomain} onChange={num(setPerDomain, 1, 5)} className={inputClass} style={inputStyle} />
          </Field>
          <Field id="days" label="Sending days per week" hint="Weekdays only is 5.">
            <input id="days" type="number" inputMode="numeric" min={1} max={7} value={daysPerWeek} onChange={num(setDaysPerWeek, 1, 7)} className={inputClass} style={inputStyle} />
          </Field>
        </div>

        <label className="flex items-start gap-3 text-sm cursor-pointer" style={{ color: MUTED }}>
          <input type="checkbox" checked={spares} onChange={(e) => setSpares(e.target.checked)} className="mt-1 h-4 w-4 accent-[#A14A08]" />
          <span><strong style={{ color: INK }}>Add spare domains</strong> (about 10%, at least one), so a domain can rest without stopping the campaign.</span>
        </label>

        <Field id="start" label="Date you buy the domains" hint="Warm-up starts once DNS is set up, usually the same day or the next.">
          <input id="start" type="date" value={start} onChange={(e) => setStart(e.target.value)} className={inputClass} style={inputStyle} />
        </Field>

        <details className="rounded-xl border p-4" style={{ borderColor: LINE, backgroundColor: CREAM }}>
          <summary className="cursor-pointer text-sm font-bold" style={{ color: INK }}>Add your own costs (optional)</summary>
          <div className="grid gap-5 sm:grid-cols-2 mt-4">
            <Field id="inboxCost" label="Cost per inbox per month" hint="Your email provider's price per user.">
              <input id="inboxCost" type="number" inputMode="decimal" min={0} placeholder="e.g. your plan price" value={inboxCost} onChange={(e) => setInboxCost(e.target.value)} className={inputClass} style={inputStyle} />
            </Field>
            <Field id="domainCost" label="Cost per domain per year" hint="Your registrar's renewal price.">
              <input id="domainCost" type="number" inputMode="decimal" min={0} placeholder="e.g. your registrar price" value={domainCost} onChange={(e) => setDomainCost(e.target.value)} className={inputClass} style={inputStyle} />
            </Field>
          </div>
        </details>
      </form>

      <div aria-live="polite" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Stat value={fmt(r.domains)} label="Domains to buy" note={r.spareDomains ? `${fmt(r.baseDomains)} sending + ${fmt(r.spareDomains)} spare` : undefined} />
          <Stat value={fmt(r.totalInboxes)} label="Inboxes to set up" note={r.spareDomains ? `${fmt(r.inboxes)} sending + ${fmt(r.totalInboxes - r.inboxes)} on spare domains` : `Up to ${perDomain} per domain`} />
          <Stat value={fmt(r.daily)} label="Emails per sending day" note={`About ${fmt(r.daily / r.inboxes)} per inbox`} />
          <Stat value={fmt(r.monthlyEmails)} label="Emails per month" note={`About ${fmt(r.monthlyProspects)} prospects`} />
        </div>

        <div className="rounded-2xl border p-5" style={{ backgroundColor: "#ffffff", borderColor: LINE }}>
          <div className="text-sm font-bold mb-1" style={{ color: INK }}>Ready for the first live email</div>
          {r.earliest && r.safer ? (
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Between <strong style={{ color: INK }}>{fmtDate(r.earliest)}</strong> and <strong style={{ color: INK }}>{fmtDate(r.safer)}</strong>, after 14 to 21 days of warm-up. Start well under {perInbox} a day per inbox in the first week, then raise it as replies come in and bounces stay low.
            </p>
          ) : (
            <p className="text-sm" style={{ color: MUTED }}>Pick a date to see when you can start sending.</p>
          )}
        </div>

        <div className="rounded-2xl border p-5" style={{ backgroundColor: "#ffffff", borderColor: LINE }}>
          <div className="text-sm font-bold mb-1" style={{ color: INK }}>Replies to expect each month</div>
          <p className="text-base leading-relaxed" style={{ color: MUTED }}>
            <strong style={{ color: INK }}>{fmt(r.repliesLow)} to {fmt(r.repliesHigh)}</strong> replies, at least a fifth of them positive. That is the 1% to 3% reply rate we see across Myntmore-managed campaigns; your list and offer move it either way.
          </p>
        </div>

        {r.hasCost && (
          <div className="rounded-2xl border p-5" style={{ backgroundColor: "#ffffff", borderColor: LINE }}>
            <div className="text-sm font-bold mb-1" style={{ color: INK }}>Infrastructure cost per month</div>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              <strong style={{ color: INK }}>{r.monthlyCost.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</strong> in your currency: inboxes plus domains spread over 12 months. Sending tool, data and verification costs are extra.
            </p>
          </div>
        )}

        <p className="text-xs leading-relaxed" style={{ color: "#71675E" }}>
          For reference, our standard client setup is 10 domains with 4 inboxes each: 40 inboxes sending up to about 1,200 emails a day.
        </p>
      </div>
    </div>
  );
}
