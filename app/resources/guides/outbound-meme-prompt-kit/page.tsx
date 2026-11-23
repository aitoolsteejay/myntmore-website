import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CopyBlock from "@/app/components/CopyBlock";
import FadeIn from "@/app/components/FadeIn";
import JsonLd from "@/app/components/JsonLd";
import ArticleMeta from "@/app/components/ArticleMeta";
import Underline from "../how-to-set-up-vibe-prospecting/Underline";
import { buildArticleSchema } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";
import pageCopy from "@/content/page-copy/guideOutboundMemePromptKit.json";

// This page's text is edited in the admin ("The Outbound Meme Prompt Kit") and lives in content/page-copy/guideOutboundMemePromptKit.json.
const copy = pageCopy;

const URL = "https://www.myntmore.com/resources/guides/outbound-meme-prompt-kit";
const ACCENT = "#EA580C";
const TITLE = "The Outbound Meme Prompt Kit (Free)";
const DESCRIPTION =
  "Four copy-paste AI image prompts that turn cold outreach pain into memes people share: graveyard, reject and approve, astronaut and conspiracy board.";

export const metadata: Metadata = withPageSeo("/resources/guides/outbound-meme-prompt-kit", {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "outbound meme prompts",
    "linkedin meme prompts",
    "ai meme generator prompts",
    "cold outreach memes",
    "b2b meme templates",
    "linkedin content ideas for founders",
    "ai image prompts for linkedin posts",
  ],
  alternates: { canonical: URL },
  openGraph: {
    ...OG_BASE,
    title: `${TITLE} | Myntmore`,
    description: DESCRIPTION,
    url: URL,
    images: ogImages("/resources/guides/outbound-meme-prompt-kit"),
  },
});

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "The Outbound Meme Prompt Kit",
  description: DESCRIPTION,
  url: URL,
  datePublished: "2026-10-28T00:00:00+05:30",
  dateModified: "2026-10-28T00:00:00+05:30",
});

const STEPS = [
  { n: "1", title: copy.s01.t01, text: copy.s01.t02 },
  { n: "2", title: copy.s01.t03, text: copy.s01.t04 },
  { n: "3", title: copy.s01.t05, text: copy.s01.t06 },
];

const MEMES = [
  {
    id: "01",
    title: copy.s01.t07,
    bestFor: "Follow-ups that never got a reply.",
    image: "/guides/outbound-meme-prompt-kit/graveyard.webp",
    alt: "Meme of a man in a black puffer jacket making a peace sign beside a cartoon tombstone reading “Paying respects to my previous follow-ups.” on an underwater seabed",
    swap: "ghost icon, caption, jacket",
    prompt: copy.s01.t08,
  },
  {
    id: "02",
    title: copy.s01.t09,
    bestFor: "Two ways of saying the same thing, where one clearly wins.",
    image: "/guides/outbound-meme-prompt-kit/reject-approve.webp",
    alt: "Two-panel reject and approve meme: a man in an orange puffer jacket rejects “Another awkward follow-up” and approves “A simple let’s talk later”",
    swap: "jacket, rejected line, preferred line",
    prompt: copy.s01.t10,
  },
  {
    id: "03",
    title: copy.s01.t11,
    bestFor: "The message that disappeared into the void.",
    image: "/guides/outbound-meme-prompt-kit/astronaut.webp",
    alt: "Meme of a smiling astronaut waving in front of Earth and stars, captioned “Still searching the universe for your reply.”",
    swap: "caption, suit colours, background",
    prompt: copy.s01.t12,
  },
  {
    id: "04",
    title: copy.s01.t13,
    bestFor: "When the numbers make no sense.",
    image: "/guides/outbound-meme-prompt-kit/conspiracy-board.webp",
    alt: "Meme of a frustrated man in a white blazer in front of a cork conspiracy board with red string, headlines “Pipeline stuck!”, “LinkedIn ghosting?” and “Outbound not working?”, captioned “Figuring out why I still haven’t gotten a reply”",
    swap: "headline cards, outfit, caption",
    prompt: copy.s01.t14,
  },
];

const TIPS = [
  { title: copy.s01.t15, text: copy.s01.t16 },
  { title: copy.s01.t17, text: copy.s01.t18 },
  { title: copy.s01.t19, text: copy.s01.t20 },
  { title: copy.s01.t21, text: copy.s01.t22 },
];

const RELATED = [
  { label: copy.s01.t23, href: "/resources/guides/linkedin-content-to-calls-starter-kit", note: copy.s01.t24 },
  { label: copy.s01.t25, href: "/resources/blogs/how-to-write-a-linkedin-hook", note: copy.s01.t26 },
  { label: copy.s01.t27, href: "/tools/linkedin-hook-grader", note: copy.s01.t28 },
  { label: copy.s01.t29, href: "/resources/blogs/cold-email-follow-up-sequence", note: copy.s01.t30 },
];

const H2 = "text-2xl sm:text-3xl font-black";

export default function OutboundMemePromptKit() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(234,88,12,0.16),rgba(234,88,12,0.05) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,183,49,0.19),rgba(245,183,49,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: copy.s01.t31, href: "/resources" }, { label: copy.s01.t32, href: "/resources/guides" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(234,88,12,0.3)", backgroundColor: "rgba(234,88,12,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>{copy.s01.t33}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>{copy.s01.t34}{" "}
            <span className="relative inline-block">{copy.s01.t35}<Underline color="#F5B731" /></span>{" "}{copy.s01.t36}</h1>
          <ArticleMeta schema={ARTICLE_SCHEMA} />
          <p className="text-lg sm:text-xl max-w-2xl leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>{copy.s01.t37}</p>
        </div>
      </section>

      <article className="py-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto space-y-16">
          <FadeIn>
            <section>
              <h2 className={`${H2} mb-6`} style={{ color: "#0a0a0a" }}>{copy.s02.t01}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {STEPS.map((s, i) => (
                  <FadeIn key={s.n} delay={i * 100}>
                    <div className="h-full rounded-2xl border p-5" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                      <span className="w-9 h-9 rounded-full inline-flex items-center justify-center text-sm font-black mb-3" style={{ backgroundColor: "rgba(234,88,12,0.1)", color: textTone(ACCENT), border: "1px solid rgba(234,88,12,0.25)" }}>{s.n}</span>
                      <h3 className="text-base font-black mb-1.5" style={{ color: "#0a0a0a" }}>{s.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{s.text}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </section>
          </FadeIn>

          {MEMES.map((m) => (
            <FadeIn key={m.id}>
              <section>
                <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: textTone(ACCENT) }}>{m.id}{copy.s02.t02}</p>
                <h2 className={`${H2} mb-2`} style={{ color: "#0a0a0a" }}>{m.title}</h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>
                  <span className="font-bold" style={{ color: "#0a0a0a" }}>{copy.s02.t03}</span> {m.bestFor}
                </p>
                <div className="rounded-2xl overflow-hidden border mb-5" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
                  <Image src={m.image} alt={m.alt} width={1080} height={864} className="w-full h-auto" sizes="(min-width: 768px) 768px, 100vw" />
                </div>
                <CopyBlock text={m.prompt} accent={ACCENT} label={`Prompt ${m.id}`} successMessage="Prompt copied to clipboard" />
                <p className="text-sm mt-3" style={{ color: "#52525B" }}>
                  <span className="font-bold" style={{ color: "#0a0a0a" }}>{copy.s02.t04}</span> {m.swap}
                </p>
              </section>
            </FadeIn>
          ))}

          <FadeIn>
            <section className="rounded-2xl border p-8" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.35)" }}>
              <h2 className={`${H2} mb-5`} style={{ color: "#0a0a0a" }}>{copy.s03.t01}</h2>
              <ul className="space-y-3">
                {TIPS.map((t) => (
                  <li key={t.title} className="text-base leading-relaxed flex gap-3" style={{ color: "#52525B" }}>
                    <span aria-hidden="true" style={{ color: ACCENT }}>&bull;</span>
                    <span><span className="font-bold" style={{ color: "#0a0a0a" }}>{t.title}</span> {t.text}</span>
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className="text-2xl font-black mb-5" style={{ color: "#0a0a0a" }}>{copy.s04.t01}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RELATED.map((r) => (
                  <Link key={r.href} href={r.href} className="group block rounded-xl border p-4 transition-all duration-200 hover:border-[#EA580C] hover:-translate-y-0.5 hover:shadow-md" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                    <p className="text-sm font-black mb-1" style={{ color: "#0a0a0a" }}>{r.label} <span aria-hidden="true" style={{ color: ACCENT }}>&rarr;</span></p>
                    <p className="text-xs leading-relaxed" style={{ color: "#52525B" }}>{r.note}</p>
                  </Link>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl p-8 sm:p-10 text-center border" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>{copy.s04.t02}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] mt-3 mb-4">{copy.s05.t01}</h2>
              <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#52525B" }}>{copy.s05.t02}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/book-a-call" className="btn-dark px-8 py-4 text-sm font-bold">{copy.s05.t03}</a>
                <a href="https://www.instagram.com/tejas_jhaveri/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-sm font-bold rounded-full border transition-colors hover:bg-[#F8F6F2]" style={{ color: "#0A0A0A", borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>{copy.s05.t04}</a>
              </div>
              <a href="mailto:founder@myntmore.com" className="inline-flex min-h-[44px] items-center mt-6 text-sm font-semibold" style={{ color: "#A14A08" }}>{copy.s05.t05}</a>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
              <Image src="/tejas.png" alt={copy.s05.t06} width={96} height={96} className="rounded-2xl object-cover shrink-0" />
              <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>
                <a href="https://www.linkedin.com/in/tejasjhaveri/" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: "#0a0a0a" }}>{copy.s05.t07}</a>{copy.s05.t08}</p>
            </section>
          </FadeIn>
        </div>
      </article>
    </InnerLayout>
  );
}
