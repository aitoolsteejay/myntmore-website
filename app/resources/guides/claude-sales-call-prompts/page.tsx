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
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";
import pageCopy from "@/content/page-copy/guideClaudeSalesCallPrompts.json";

// This page's text is edited in the admin ("5 Claude Prompts for Sales Calls") and lives in content/page-copy/guideClaudeSalesCallPrompts.json.
const copy = pageCopy;

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
    images: ogImages("/resources/guides/claude-sales-call-prompts"),
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
    title: copy.s01.t01,
    when: "Before the call",
    time: "3 min",
    blurb: "A 200-word dossier on the prospect, two minutes before you dial.",
    text: copy.s01.t02,
  },
  {
    id: "02",
    title: copy.s01.t03,
    when: "Before the call",
    time: "2 min",
    blurb: "Seven questions that make them think, not just answer.",
    text: copy.s01.t04,
  },
  {
    id: "03",
    title: copy.s01.t05,
    when: "Before the call",
    time: "2 min",
    blurb: "The five objections you'll actually hear, and how to handle each one.",
    text: copy.s01.t06,
  },
  {
    id: "04",
    title: copy.s01.t07,
    when: "Before the call",
    time: "1 min",
    blurb: "Three openers that are warm but get to business fast.",
    text: copy.s01.t08,
  },
  {
    id: "05",
    title: copy.s01.t09,
    when: "After the call",
    time: "2 min",
    blurb: "A follow-up email that keeps the deal warm and the next step clear.",
    text: copy.s01.t10,
  },
];

const GROUPS = [
  { label: copy.s01.t11, note: copy.s01.t12, items: PROMPTS.filter((p) => p.when === "Before the call") },
  { label: copy.s01.t13, note: copy.s01.t14, items: PROMPTS.filter((p) => p.when === "After the call") },
];

const RELATED = [
  { label: copy.s01.t15, href: "/resources/blogs/handling-cold-email-replies", note: copy.s01.t16 },
  { label: copy.s01.t17, href: "/resources/blogs/cold-email-sequence-templates", note: copy.s01.t18 },
  { label: copy.s01.t19, href: "/resources/guides/claude-skills-guide", note: copy.s01.t20 },
  { label: copy.s01.t21, href: "/resources/blogs/multi-threading-b2b-buying-committee", note: copy.s01.t22 },
];

export default function ClaudeSalesCallPrompts() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(8,145,178,0.16),rgba(8,145,178,0.05) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,183,49,0.19),rgba(245,183,49,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: copy.s01.t23, href: "/resources" }, { label: copy.s01.t24, href: "/resources/guides" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(8,145,178,0.3)", backgroundColor: "rgba(8,145,178,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>{copy.s01.t25}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>{copy.s01.t26}{" "}
            <span className="relative inline-block">{copy.s01.t27}<Underline color="#F5B731" /></span>{" "}{copy.s01.t28}</h1>
          <ArticleMeta schema={ARTICLE_SCHEMA} />
          <p className="text-lg sm:text-xl max-w-2xl leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>{copy.s01.t29}</p>
        </div>
      </section>

      <section className="py-12 px-4 border-y" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <Image src="/tejas.png" alt={copy.s01.t30} width={112} height={112} className="rounded-2xl object-cover shrink-0" />
          <div>
            <h2 className="text-xl font-black mb-2" style={{ color: "#0a0a0a" }}>{copy.s02.t01}</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{copy.s02.t02}</p>
          </div>
        </div>
      </section>

      <article className="py-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto space-y-16">
          <FadeIn>
            <section>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "#52525B" }}>{copy.s02.t03}</p>
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
              <h2 className="text-2xl font-black mb-5" style={{ color: "#0a0a0a" }}>{copy.s03.t01}</h2>
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
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>{copy.s03.t02}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] mt-3 mb-4">{copy.s04.t01}</h2>
              <p className="text-base leading-relaxed max-w-xl mx-auto mb-3" style={{ color: "#52525B" }}>{copy.s04.t02}</p>
              <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#52525B" }}>{copy.s04.t03}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services/personal-branding" className="btn-dark px-8 py-4 text-sm font-bold">{copy.s04.t04}</Link>
                <a href="/book-a-call" className="px-8 py-4 text-sm font-bold rounded-full border transition-colors hover:bg-[#F8F6F2]" style={{ color: "#0A0A0A", borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>{copy.s04.t05}</a>
              </div>
              <a href="mailto:founder@myntmore.com" className="inline-flex min-h-[44px] items-center mt-6 text-sm font-semibold" style={{ color: "#A14A08" }}>{copy.s04.t06}</a>
            </section>
          </FadeIn>

          <p className="text-center text-sm" style={{ color: "#71675E" }}>{copy.s04.t07}{" "}
            <a href="https://www.instagram.com/tejas_jhaveri" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: "#0a0a0a" }}>{copy.s04.t08}</a>{" "}{copy.s04.t09}</p>
        </div>
      </article>
    </InnerLayout>
  );
}
