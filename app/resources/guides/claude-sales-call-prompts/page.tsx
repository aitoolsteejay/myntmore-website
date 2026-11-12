import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CopyBlock from "@/app/components/CopyBlock";
import FadeIn from "@/app/components/FadeIn";
import JsonLd from "@/app/components/JsonLd";
import Underline from "../how-to-set-up-vibe-prospecting/Underline";
import { buildArticleSchema } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import ArticleMeta from "@/app/components/ArticleMeta";
import { OG_BASE } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const URL = "https://www.myntmore.com/resources/guides/claude-sales-call-prompts";
const ACCENT = "#0891B2";
const TITLE = "5 Claude Prompts for Sales Calls (Copy-Paste)";
const DESCRIPTION = "Five copy-paste Claude prompts for sales calls: meeting prep, discovery questions, objection prep, call openers and follow-up. Copy them free.";

export const metadata: Metadata = withPageSeo("/resources/guides/claude-sales-call-prompts", {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "claude prompts for sales calls",
    "ai prompts for sales calls",
    "sales call preparation prompts",
    "discovery call questions ai prompt",
    "sales objection handling prompts",
    "post call follow up email prompt",
    "meeting prep brief with claude",
    "claude for sales reps",
  ],
  alternates: { canonical: URL },
  openGraph: {
    ...OG_BASE,
    title: `${TITLE} | Myntmore`,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
});

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "The 5 Claude prompts I use before every sales call",
  description: DESCRIPTION,
  url: URL,
  datePublished: "2026-10-08T00:00:00+05:30",
  dateModified: "2026-10-08T00:00:00+05:30",
});

interface PromptItem {
  id: string;
  title: string;
  when: string;
  time: string;
  blurb: string;
  text: string;
}

const PROMPTS: PromptItem[] = [
  {
    id: "01",
    title: "Meeting Prep Brief",
    when: "Before the call",
    time: "3 min",
    blurb: "A 200-word dossier on the prospect, two minutes before you dial.",
    text: `You are my meeting prep assistant.
Prospect: [Name] | Company: [URL] | LinkedIn: [URL]

Give me:
- What the company does (2 lines)
- Team size + approx revenue
- Number of salespeople
- Recent PR, funding, or news
- Their role + tenure
- One personal hook for my first 2 minutes

Under 200 words. I have a call in 10 minutes.`,
  },
  {
    id: "02",
    title: "Discovery Questions",
    when: "Before the call",
    time: "2 min",
    blurb: "Seven questions that make them think, not just answer.",
    text: `I sell AI-led B2B outbound services.
My prospect is a [industry] founder/sales head
at a [stage] company.

Give me 7 discovery questions that uncover:
- Their current outbound setup
- What's broken
- Whether they're ready to buy

Prioritise questions that make them think,
not just answer.`,
  },
  {
    id: "03",
    title: "Objection Prep",
    when: "Before the call",
    time: "2 min",
    blurb: "The five objections you'll actually hear, and how to handle each one.",
    text: `I'm getting on a sales call with a [industry]
company of [size] employees.
They're considering outsourcing B2B outreach.

Give me the 5 most likely objections
they'll raise and a one-line response to each.
Be direct. No fluff.`,
  },
  {
    id: "04",
    title: "Call Opening Lines",
    when: "Before the call",
    time: "1 min",
    blurb: "Three openers that are warm but get to business fast.",
    text: `I have a sales call with [Name], [Title]
at [Company]. They came via [source].

Write 3 ways to open the call that feel
warm but get to business fast.

Avoid: 'How are you', 'Did you get a chance to',
or anything that sounds scripted.`,
  },
  {
    id: "05",
    title: "Post-Call Follow-Up",
    when: "After the call",
    time: "2 min",
    blurb: "A follow-up email that keeps the deal warm and the next step clear.",
    text: `I just finished a sales call.
Here's what happened: [paste your notes]

Write a follow-up email that:
- Recaps what we discussed in 3 bullets
- Confirms the next step we agreed on
- Has one line that keeps the energy warm

Subject line included. Under 120 words.`,
  },
];

const GROUPS = [
  { label: "Before the call", note: "Four prompts, about 8 minutes in total.", items: PROMPTS.filter((p) => p.when === "Before the call") },
  { label: "After the call", note: "One prompt to keep the deal moving.", items: PROMPTS.filter((p) => p.when === "After the call") },
];

const RELATED = [
  { label: "The Reply Isn't the Win: Handling Cold Email Replies", href: "/resources/blogs/handling-cold-email-replies", note: "What to say in the first hour after a prospect responds." },
  { label: "Cold Email Sequence Templates", href: "/resources/blogs/cold-email-sequence-templates", note: "A full 5-email sequence, from first touch to breakup email." },
  { label: "The 6 Claude Skills Guide", href: "/resources/guides/claude-skills-guide", note: "Six ready-to-use Claude skills for founders and marketers." },
  { label: "Multi-Threading B2B Deals", href: "/resources/blogs/multi-threading-b2b-buying-committee", note: "Why one champion is never enough to close a deal." },
];

export default function ClaudeSalesCallPrompts() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(8,145,178,0.16),rgba(8,145,178,0.05) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,183,49,0.19),rgba(245,183,49,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Guides", href: "/resources/guides" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(8,145,178,0.3)", backgroundColor: "rgba(8,145,178,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>Sales · Claude Prompts</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            I use Claude before every sales call. These are the{" "}
            <span className="relative inline-block">5 prompts<Underline color="#F5B731" /></span>{" "}
            that changed how I sell.
          </h1>
          <ArticleMeta schema={ARTICLE_SCHEMA} />
          <p className="text-lg sm:text-xl max-w-2xl leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>
            Each one takes under 3 minutes. Copy any prompt straight into Claude, then swap the bracketed parts for your details.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 border-y" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <Image src="/tejas.png" alt="Tejas Jhaveri, Founder of Myntmore" width={112} height={112} className="rounded-2xl object-cover shrink-0" />
          <div>
            <h2 className="text-xl font-black mb-2" style={{ color: "#0a0a0a" }}>From one growth team to another</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>
              Tejas isn&apos;t your average marketer. He&apos;s a 4x entrepreneur who built Flintstop, a D2C eCommerce brand, into a $6M-a-year machine, shipping out 8,000 orders a day before selling the business in 2020. At Myntmore, his B2B outbound agency, he&apos;s helped 130+ B2B companies book 12K+ meetings and generate $120M+ in pipeline. He&apos;s a TEDx speaker, angel investor, and has taught B2B growth methodologies at IIT and IIM. Now, he&apos;s here to do it for you.
            </p>
          </div>
        </div>
      </section>

      <article className="py-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto space-y-16">
          <FadeIn>
            <section>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "#52525B" }}>
                A good sales call is mostly won before it starts. These five prompts cover the whole loop: who you&apos;re talking to, what to ask, what pushback to expect, how to open, and what to send afterwards.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {PROMPTS.map((p) => (
                  <a key={p.id} href={`#prompt-${p.id}`} className="rounded-xl border p-4 transition-colors duration-150 hover:border-[#0891B2]" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                    <span className="text-xs font-black" style={{ color: textTone(ACCENT) }}>{p.id}</span>
                    <p className="text-sm font-black mt-1 leading-snug" style={{ color: "#0a0a0a" }}>{p.title}</p>
                    <p className="text-xs mt-1" style={{ color: "#71675E" }}>{p.time}</p>
                  </a>
                ))}
              </div>
            </section>
          </FadeIn>

          {GROUPS.map((g) => (
            <FadeIn key={g.label}>
              <section>
                <h2 className="text-2xl sm:text-3xl font-black" style={{ color: "#0a0a0a" }}>{g.label}</h2>
                <p className="text-sm mt-1 mb-8" style={{ color: "#71675E" }}>{g.note}</p>
                <div className="space-y-12">
                  {g.items.map((p) => (
                    <div key={p.id} id={`prompt-${p.id}`} className="scroll-mt-28">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                        <span className="w-8 h-8 rounded-full inline-flex items-center justify-center text-xs font-black" style={{ backgroundColor: "rgba(8,145,178,0.1)", color: textTone(ACCENT), border: "1px solid rgba(8,145,178,0.25)" }}>{p.id}</span>
                        <h3 className="text-xl font-black" style={{ color: "#0a0a0a" }}>{p.title}</h3>
                        <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: "#ffffff", color: "#3D3D3D", border: "1px solid #E8E2D9" }}>{p.when} · {p.time}</span>
                      </div>
                      <p className="text-sm mb-4" style={{ color: "#52525B" }}>{p.blurb}</p>
                      <CopyBlock text={p.text} accent={ACCENT} label={`Prompt ${p.id}`} successMessage="Prompt copied to clipboard" />
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>
          ))}

          <FadeIn>
            <section>
              <h2 className="text-2xl font-black mb-5" style={{ color: "#0a0a0a" }}>Keep the momentum going</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RELATED.map((r) => (
                  <Link key={r.href} href={r.href} className="group block rounded-xl border p-4 transition-colors duration-150 hover:border-[#0891B2]" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                    <p className="text-sm font-black mb-1" style={{ color: "#0a0a0a" }}>{r.label} <span aria-hidden="true" style={{ color: ACCENT }}>&rarr;</span></p>
                    <p className="text-xs leading-relaxed" style={{ color: "#52525B" }}>{r.note}</p>
                  </Link>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl p-8 sm:p-10 text-center border" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>What&apos;s next?</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] mt-3 mb-4">Implement everything.</h2>
              <p className="text-base leading-relaxed max-w-xl mx-auto mb-3" style={{ color: "#52525B" }}>
                If you&apos;re looking to optimise your LinkedIn profile and turn it into a growth engine, you&apos;re in the right place. Whether you&apos;re a founder, CXO, or consultant, LinkedIn can become your #1 inbound channel.
              </p>
              <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#52525B" }}>
                Want to know how I generated over $3M through LinkedIn? See what we do, how we do it, and why it works.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services/personal-branding" className="btn-dark px-8 py-4 text-sm font-bold">Explore Our LinkedIn Personal Branding Services</Link>
                <a href="/book-a-call" className="px-8 py-4 text-sm font-bold rounded-full border transition-colors hover:bg-[#F8F6F2]" style={{ color: "#0A0A0A", borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>Book a Complimentary Strategy Call</a>
              </div>
              <a href="mailto:founder@myntmore.com" className="inline-flex min-h-[44px] items-center mt-6 text-sm font-semibold" style={{ color: "#A14A08" }}>founder@myntmore.com</a>
            </section>
          </FadeIn>

          <p className="text-center text-sm" style={{ color: "#71675E" }}>
            Made by Tejas Jhaveri. Follow{" "}
            <a href="https://www.instagram.com/tejas_jhaveri" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: "#0a0a0a" }}>@tejas_jhaveri</a>{" "}
            on Instagram for more prompts like these.
          </p>
        </div>
      </article>
    </InnerLayout>
  );
}
