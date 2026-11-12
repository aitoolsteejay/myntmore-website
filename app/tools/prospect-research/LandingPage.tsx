"use client";

import Link from "next/link";
import { ArrowRight, CalendarClock, FileSearch, ListChecks, Scale } from "lucide-react";
import type { Account, Verdict } from "@/lib/research-types";
import { ACCOUNTS as SAMPLE_ACCOUNTS, SNAPSHOT_LABEL } from "@/app/research/myntmore/data";
import { BORDER, GOLD, GOLD_TEXT, INK, MUTED, ORANGE, GoldBadge } from "@/components/tools/prospect-research/ui";

const TIER_LABEL: Record<Account["tier"], string> = { T1: "Contact now", T2: "High priority", T3: "Worth nurturing" };

const GETS = [
  { icon: FileSearch, title: "Ten companies with a recent signal", body: "Companies that match your ideal customer and did something in the last 12 months that suggests they may buy now: raised money, hired for the problem you solve, named a new leader, or launched something new." },
  { icon: ListChecks, title: "Seven questions, each with a dated source", body: "Every answer links to the public page it came from, with a date. If nothing was found, it says \"No evidence found\". The links are checked automatically before you see them." },
  { icon: Scale, title: "Scores you can check", body: "Fit out of 100 and timing out of 10 are worked out from the answers by fixed rules, not by the AI. Open any company to see exactly why it scored the way it did." },
];

const STEPS = [
  ["Tell us about your company", "Your website and what you sell in a sentence. Add who you sell to and anyone to leave out, if you like."],
  ["Check what we understood", "We read your homepage and show you the ideal customer we will search for. Edit anything before we start."],
  ["We research ten companies", "AI with Google Search finds companies with a recent signal, then answers seven questions about each. It takes about two minutes."],
  ["Open the evidence", "Each company shows its sources, a suggested opening line and the role that usually owns the problem. Download it all as a CSV."],
];

function SampleDot({ verdict }: { verdict: Verdict }) {
  const base = "inline-block h-3.5 w-3.5 rounded-full";
  if (verdict === "no") return <span aria-hidden="true" className={base} style={{ background: "#EFEAE2", border: `1px solid ${BORDER}` }} />;
  if (verdict === "yes") return <span aria-hidden="true" className={base} style={{ background: ORANGE }} />;
  return <span aria-hidden="true" className={base} style={{ background: `linear-gradient(90deg, ${ORANGE} 50%, #EFEAE2 50%)`, border: `1px solid ${ORANGE}` }} />;
}

export function LandingPage({ onStart }: { onStart: () => void }) {
  const sample = [...SAMPLE_ACCOUNTS].sort((a, b) => a.tier.localeCompare(b.tier) || b.timing - a.timing).slice(0, 3);

  return (
    <div className="w-full" style={{ color: INK }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-16 pt-4 md:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-36 h-[600px] w-[600px] rounded-full blur-[55px]" style={{ background: "radial-gradient(circle, rgba(245,183,49,0.26) 0%, rgba(255,160,0,0.09) 40%, transparent 68%)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full blur-[55px]" style={{ background: "radial-gradient(circle, rgba(234,88,12,0.13) 0%, rgba(245,183,49,0.06) 40%, transparent 68%)" }} />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-6"><GoldBadge>Free Prospect Research</GoldBadge></div>
          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-[1.08] sm:text-5xl" style={{ letterSpacing: "-0.03em", textWrap: "balance" }}>
            Ten companies that may buy from you, <span style={{ color: GOLD_TEXT }}>and why now.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: MUTED }}>
            Enter your company. The tool finds ten companies that match your ideal customer and show a recent public sign they are ready to buy, then researches each one with a dated source for every answer.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={onStart} className="btn-dark inline-flex min-h-[48px] items-center gap-2 px-8 py-3.5 text-base">
              Find my prospects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <Link href="/research/myntmore" className="btn-ghost inline-flex min-h-[48px] items-center gap-2 px-7 py-3.5 text-base font-bold">
              See a sample report
            </Link>
          </div>
          <p className="mt-5 text-sm" style={{ color: MUTED }}>Free. About two minutes. Two searches a day.</p>
        </div>
      </section>

      {/* Sample */}
      <section className="px-4 pb-20" aria-labelledby="sample-title">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: GOLD_TEXT }}>A sample of the output</p>
          <h2 id="sample-title" className="mb-6 text-3xl font-black sm:text-4xl" style={{ letterSpacing: "-0.02em", textWrap: "balance" }}>What you get back</h2>
          <div className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: BORDER, boxShadow: "0 24px 70px rgba(15,15,20,0.06)" }}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="text-xs font-bold uppercase tracking-wider" style={{ color: MUTED }}>
                    <th scope="col" className="px-4 py-3">Company</th>
                    <th scope="col" className="px-2 py-3">Buying window</th>
                    <th scope="col" className="px-2 py-3">Tier</th>
                    <th scope="col" className="px-2 py-3">Fit</th>
                    <th scope="col" className="px-4 py-3">Q1 to Q7</th>
                  </tr>
                </thead>
                <tbody>
                  {sample.map((a) => (
                    <tr key={a.name} className="border-t align-top" style={{ borderColor: BORDER }}>
                      <td className="px-4 py-4">
                        <span className="font-black">{a.name}</span>
                        <span className="block text-xs" style={{ color: MUTED }}>{a.where}</span>
                      </td>
                      <td className="max-w-[340px] px-2 py-4 leading-relaxed" style={{ color: MUTED }}><strong style={{ color: INK }}>{a.when}.</strong> {a.recent}</td>
                      <td className="whitespace-nowrap px-2 py-4 text-xs font-bold" style={{ color: "#9A3412" }}>{TIER_LABEL[a.tier]}</td>
                      <td className="px-2 py-4 font-black tabular-nums">{a.fit}</td>
                      <td className="px-4 py-4">
                        <span className="flex gap-1.5">{a.answers.map((x, i) => <SampleDot key={i} verdict={x.verdict} />)}</span>
                        <span className="sr-only">{a.answers.map((x, i) => `Q${i + 1} ${x.verdict}`).join(", ")}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t px-4 py-3 text-sm" style={{ borderColor: BORDER, color: MUTED }}>
              Three rows from Myntmore&apos;s own sample research (snapshot {SNAPSHOT_LABEL}).{" "}
              <Link href="/research/myntmore" className="inline-flex min-h-[44px] items-center font-bold underline underline-offset-4" style={{ color: GOLD_TEXT }}>Open the full sample report</Link>
            </p>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="px-4 py-20" style={{ backgroundColor: "#F2EEE7" }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-black sm:text-4xl" style={{ letterSpacing: "-0.02em", textWrap: "balance" }}>Research you can check, not a list you have to trust</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {GETS.map((g) => (
              <div key={g.title} className="rounded-2xl border bg-white p-7" style={{ borderColor: BORDER, borderTop: `3px solid ${GOLD}` }}>
                <g.icon className="mb-4 h-7 w-7" style={{ color: GOLD_TEXT }} aria-hidden="true" />
                <h3 className="mb-2 text-lg font-black">{g.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-black sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>How it works</h2>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {STEPS.map(([title, body], i) => (
              <li key={title} className="flex gap-4 rounded-2xl border bg-white p-6" style={{ borderColor: BORDER }}>
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-black" style={{ backgroundColor: "#FEF9EC", border: "1.5px solid rgba(245,183,49,0.5)" }}>{i + 1}</span>
                <span>
                  <span className="block font-black">{title}</span>
                  <span className="mt-1 block text-sm leading-relaxed" style={{ color: MUTED }}>{body}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex items-start gap-3 rounded-2xl border p-5 text-sm leading-relaxed" style={{ borderColor: "rgba(245,183,49,0.45)", backgroundColor: "#FEF9EC", color: MUTED }}>
            <CalendarClock className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: GOLD_TEXT }} aria-hidden="true" />
            <p>
              <strong style={{ color: INK }}>Good to know.</strong> AI research can be wrong, so check a source before you act on it. Signals older than 18 months are ignored. Contact names are never included; you get the role that usually owns the problem instead.
            </p>
          </div>
        </div>
      </section>

      {/* Second CTA */}
      <section className="px-4 pb-24 pt-4 text-center">
        <h2 className="mx-auto mb-8 max-w-3xl text-3xl font-black sm:text-4xl" style={{ letterSpacing: "-0.02em", textWrap: "balance" }}>See who looks ready to buy this month</h2>
        <button type="button" onClick={onStart} className="btn-dark inline-flex min-h-[48px] items-center gap-2 px-8 py-3.5 text-base">
          Find my prospects <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}
