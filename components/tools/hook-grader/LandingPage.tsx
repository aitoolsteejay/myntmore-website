"use client";

import { ArrowRight, ClipboardPaste, EyeOff, Gauge, Repeat2, Sparkles, UserX } from "lucide-react";
import JsonLd from "@/app/components/JsonLd";
import Faq from "@/app/lp/Faq";
import { buildFaqSchema, buildHowToSchema } from "@/lib/schema";
import { RelatedTools } from "@/components/tools/shared/RelatedTools";
import { HandUnderline, PillBadge } from "@/components/cold-email-roi/HandUnderline";
import { gradeHook } from "@/lib/hook-grader";
import { pageFaqs } from "@/lib/page-faqs";

const HOWTO_SCHEMA = buildHowToSchema("How the LinkedIn Hook Grader Works", [
  { name: "Paste your hook", text: "The first two lines of your LinkedIn post, before the see more cut." },
  { name: "Get a rule-based score", text: "Six explicit checks score the hook out of 100. The same wording always gets the same score." },
  { name: "Compare three rewrites", text: "Three alternatives, each with a different angle, scored the same way, ready to copy." },
]);

const FAQ = pageFaqs("tool-linkedin-hook-grader");

const FAQ_SCHEMA = buildFaqSchema(FAQ);

const PROBLEMS = [
  { icon: EyeOff, color: "#EA580C", title: "Many readers never tap \"see more\"", body: "If the first two lines don't earn the click, the rest of a well-written post goes unread." },
  { icon: UserX, color: "#D97706", title: "Openers that talk about you, not them", body: "\"Excited to share...\" tells the reader nothing about what they get. Hooks that speak to the reader's problem win." },
  { icon: Repeat2, color: "#A14A08", title: "Rewriting by feel, with no way to compare", body: "Three versions of a hook and no way to tell which is stronger is guesswork dressed up as editing." },
];

const STEPS = [
  { icon: ClipboardPaste, color: "#EA580C", title: "Paste your hook", body: "Just the first two lines of your post. No profile link, no scraping." },
  { icon: Gauge, color: "#D97706", title: "Get a rule-based score", body: "Six checks, scored in code, so the same wording always gets the same number." },
  { icon: Sparkles, color: "#A14A08", title: "Compare three rewrites", body: "Each takes a different angle and is graded by the same rules. Copy the one that sounds like you." },
];

const CHECKS = [
  ["Length", "Is it short enough to land before the \"see more\" cut, and does it still say something?"],
  ["Curiosity", "Does it open a loop, a contrast or a question the reader wants answered?"],
  ["Specificity", "Are there numbers, time frames and named details, or only vague claims?"],
  ["Authority", "Does it sound like someone who did the thing, with a result attached?"],
  ["Action", "Does it speak to the reader and promise something they can use?"],
  ["No clickbait", "Is it free of hype phrases, shouting and exclamation marks?"],
];

const VALUE = [
  { color: "#F5B731", title: "A score you can read", benefit: "Six plain rules, not a black box", body: "Every point is explained, so you know exactly what to change instead of guessing." },
  { color: "#EA580C", title: "Rewrites with a different angle each", benefit: "Result, contrarian and curiosity, side by side", body: "Not three versions of the same line. Pick the angle that fits what the post is really about." },
  { color: "#D97706", title: "Rewrites graded too", benefit: "See whether a rewrite beats your original", body: "The alternatives get the same score as your hook, so the comparison is fair." },
];

const EXAMPLE_BEFORE = "Excited to share some thoughts on cold email today!";
const EXAMPLE_AFTER = "I sent 1,200 cold emails in 30 days and booked 14 meetings.\nHere's the follow-up sequence that did it, and why most people stop too early.";

function StartButton({ onStart, children }: { onStart: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onStart}
      className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-8 py-3.5 text-base font-bold shadow-lg transition-transform hover:-translate-y-0.5"
      style={{ backgroundColor: "#F5B731", color: "#0a0a0a" }}
    >
      {children} <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

export function LandingPage({ onStart }: { onStart: () => void }) {
  const before = gradeHook(EXAMPLE_BEFORE);
  const after = gradeHook(EXAMPLE_AFTER);

  return (
    <div className="w-full text-foreground" style={{ backgroundColor: "#F8F6F2" }}>
      <JsonLd data={HOWTO_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />

      {/* Hero */}
      <section className="relative flex flex-col items-center overflow-hidden px-6 py-14 text-center md:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-36 h-[650px] w-[650px] rounded-full blur-[55px]" style={{ background: "radial-gradient(circle, rgba(245,183,49,0.28) 0%, rgba(255,160,0,0.10) 40%, transparent 68%)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-24 h-[600px] w-[600px] rounded-full blur-[55px]" style={{ background: "radial-gradient(circle, rgba(168,139,250,0.22) 0%, rgba(139,92,246,0.08) 40%, transparent 68%)" }} />
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
          <div className="mb-6"><PillBadge>Free LinkedIn Tool</PillBadge></div>
          <h1 className="mb-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            LinkedIn <HandUnderline>Hook Grader</HandUnderline>
          </h1>
          <p className="mb-10 max-w-3xl text-lg sm:text-xl" style={{ color: "#52525B" }}>
            Grade the first two lines of your LinkedIn post: they decide whether many people keep reading. Get a transparent score out of 100 and three rewritten hooks you can paste and edit.
          </p>
          <StartButton onStart={onStart}>Grade My Hook</StartButton>
        </div>
      </section>

      {/* Problem */}
      <section className="px-6 py-24" style={{ backgroundColor: "#F2EEE7" }}>
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mb-16 text-3xl font-black sm:text-5xl">Your Hook Is Doing Most Of The Work</h2>
          <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ border: "1px solid #E8E2D9", borderTop: `3px solid ${p.color}` }}>
                <div className="mb-4 inline-flex rounded-xl p-3" style={{ backgroundColor: `${p.color}15` }}>
                  <p.icon className="h-7 w-7" style={{ color: p.color }} aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl font-black">{p.title}</h3>
                <p style={{ color: "#52525B" }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-3xl font-black sm:text-5xl">A Score You Can Argue With, And Rewrites To Pick From</h2>
          <p className="text-lg leading-relaxed md:text-xl" style={{ color: "#52525B" }}>
            Paste your hook. Six rules check the length, curiosity, specificity, authority, action and clickbait, and add up to a score out of 100. Then three AI rewrites arrive, each from a different angle and graded by the same rules.
          </p>
        </div>
      </section>

      {/* Example */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center text-3xl font-black sm:text-5xl">What A Better Hook Looks Like</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg" style={{ color: "#52525B" }}>A before-and-after hook, graded by the same rules the tool uses.</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { label: "Before", text: EXAMPLE_BEFORE, score: before.total, word: before.label, border: "#D6D0C6" },
              { label: "After", text: EXAMPLE_AFTER, score: after.total, word: after.label, border: "#F5B731" },
            ].map((c) => (
              <div key={c.label} className="flex flex-col rounded-2xl border bg-white p-7" style={{ borderColor: "#E8E2D9", borderTop: `3px solid ${c.border}` }}>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#A14A08" }}>{c.label}</span>
                  <span className="text-sm font-black tabular-nums">{c.score}/100 <span className="font-bold" style={{ color: "#52525B" }}>· {c.word}</span></span>
                </div>
                <p className="whitespace-pre-line text-lg font-bold leading-snug">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24" style={{ backgroundColor: "#F2EEE7" }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-3xl font-black sm:text-5xl">How It Works</h2>
          <ol className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.title} className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: s.color, color: s.color === "#D97706" ? "#0a0a0a" : "#ffffff" }}>
                  <s.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="mb-4 text-xl font-black">{s.title}</h3>
                <p style={{ color: "#52525B" }}>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The six checks */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 text-center text-3xl font-black sm:text-5xl">The Six Checks</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg" style={{ color: "#52525B" }}>Each check is a plain rule you can read and disagree with. The AI writes the rewrites, but it never sets your score.</p>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CHECKS.map(([name, body]) => (
              <div key={name} className="rounded-2xl p-5" style={{ backgroundColor: "#F8F6F2", borderLeft: "4px solid #F5B731" }}>
                <dt className="mb-1 text-lg font-black">{name}</dt>
                <dd className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{body}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-center text-base" style={{ color: "#52525B" }}>
            Prefer to apply the rules by hand?{" "}
            <a href="/resources/blogs/how-to-write-a-linkedin-hook" className="inline-flex min-h-[44px] items-center font-bold underline underline-offset-4" style={{ color: "#A14A08" }}>Read how to write a LinkedIn hook</a>.
          </p>
        </div>
      </section>

      {/* Why this works */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-3xl font-black sm:text-5xl">Why This Works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {VALUE.map((v) => (
              <div key={v.title} className="flex flex-col rounded-2xl bg-white p-8" style={{ borderLeft: `4px solid ${v.color}` }}>
                <h3 className="mb-3 text-xl font-black">{v.title}</h3>
                <p className="mb-2 font-medium">{v.benefit}</p>
                <p className="text-sm" style={{ color: "#52525B" }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Faq badge="FAQ" title="Common questions" items={FAQ.map((f) => ({ q: f.question, a: f.answer }))} />
        </div>
      </section>

      {/* Second CTA */}
      <section className="px-6 py-24 text-center" style={{ borderTop: "1px solid #E8E2D9" }}>
        <h2 className="mx-auto mb-10 max-w-3xl text-3xl font-black sm:text-5xl">Ready to see how your next opener scores?</h2>
        <StartButton onStart={onStart}>Grade My Hook Now</StartButton>
      </section>

      <RelatedTools currentSlug="linkedin-hook-grader" />
    </div>
  );
}
