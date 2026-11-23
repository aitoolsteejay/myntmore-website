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
import { ReadingProgress, RangeStat, RoutineTimeline, StaggerList } from "./KitMotion";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";
import pageCopy from "@/content/page-copy/guideLinkedinContentToCallsStarterKit.json";

// This page's text is edited in the admin ("The LinkedIn Content-to-Calls Starter Kit") and lives in content/page-copy/guideLinkedinContentToCallsStarterKit.json.
const copy = pageCopy;

const URL = "https://www.myntmore.com/resources/guides/linkedin-content-to-calls-starter-kit";
const ACCENT = "#EA580C";
const TITLE = "LinkedIn Content-to-Calls Starter Kit (Free)";
const DESCRIPTION = "A free LinkedIn starter kit: the 3-part framework that drives calls, 5 post templates, 3 CTAs, 3 follow-up messages and a 10-minute daily routine.";

export const metadata: Metadata = withPageSeo("/resources/guides/linkedin-content-to-calls-starter-kit", {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "linkedin content to calls",
    "linkedin starter kit",
    "linkedin content templates",
    "linkedin cta examples",
    "linkedin dm follow up messages",
    "linkedin daily routine for founders",
    "how to get calls from linkedin",
    "linkedin lead generation for founders",
  ],
  alternates: { canonical: URL },
  openGraph: {
    ...OG_BASE,
    title: `${TITLE} | Myntmore`,
    description: DESCRIPTION,
    url: URL,
    images: ogImages("/resources/guides/linkedin-content-to-calls-starter-kit"),
  },
});

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "The LinkedIn Content-to-Calls Starter Kit",
  description: DESCRIPTION,
  url: URL,
  datePublished: "2026-10-23T00:00:00+05:30",
  dateModified: "2026-10-23T00:00:00+05:30",
});

const FRAMEWORK = [
  {
    n: "1",
    title: copy.s01.t01,
    lead: copy.s01.t02,
    listLabel: "Types of posts to focus on",
    items: [
      copy.s01.t03,
      copy.s01.t04,
      copy.s01.t05,
      copy.s01.t06,
      copy.s01.t07,
      copy.s01.t08,
    ],
    goal: copy.s01.t09,
  },
  {
    n: "2",
    title: copy.s01.t10,
    lead: copy.s01.t11,
    listLabel: "Leave comments that",
    items: [
      copy.s01.t12,
      copy.s01.t13,
      copy.s01.t14,
      copy.s01.t15,
    ],
    goal: copy.s01.t16,
  },
  {
    n: "3",
    title: copy.s01.t17,
    lead: copy.s01.t18,
    listLabel: "Examples",
    items: [
      copy.s01.t19,
      copy.s01.t20,
      copy.s01.t21,
    ],
    goal: copy.s01.t22,
  },
];

const POSTS = [
  { id: "01", title: copy.s01.t23, text: copy.s01.t24 },
  { id: "02", title: copy.s01.t25, text: copy.s01.t26 },
  { id: "03", title: copy.s01.t27, text: copy.s01.t28 },
  { id: "04", title: copy.s01.t29, text: copy.s01.t30 },
  { id: "05", title: copy.s01.t31, text: copy.s01.t32 },
];

const CTAS = [
  { id: "01", text: copy.s01.t33 },
  { id: "02", text: copy.s01.t34 },
  { id: "03", text: copy.s01.t35 },
];

const FOLLOWUPS = [
  { when: "After they react", text: copy.s01.t36 },
  { when: "After they DM you a keyword", text: copy.s01.t37 },
  { when: "If they stop replying", text: copy.s01.t38 },
];

const ROUTINE = [
  { time: copy.s01.t39, task: copy.s01.t40, minutes: 3 },
  { time: copy.s01.t41, task: copy.s01.t42, minutes: 3 },
  { time: copy.s01.t43, task: copy.s01.t44, minutes: 4 },
];

const EXPECT = [
  copy.s01.t45,
  copy.s01.t46,
  copy.s01.t47,
];

const SEND_MESSAGE = copy.s01.t48;

const RELATED = [
  { label: copy.s01.t49, href: "/resources/blogs/how-to-write-a-linkedin-hook", note: copy.s01.t50 },
  { label: copy.s01.t51, href: "/resources/guides/leads-on-autopilot-guide", note: copy.s01.t52 },
  { label: copy.s01.t53, href: "/resources/guides/58-meetings-600-linkedin-connections", note: copy.s01.t54 },
  { label: copy.s01.t55, href: "/tools/linkedin-hook-grader", note: copy.s01.t56 },
];

const H2 = "text-2xl sm:text-3xl font-black";

export default function LinkedInContentToCallsStarterKit() {
  return (
    <InnerLayout>
      <ReadingProgress />
      <JsonLd data={ARTICLE_SCHEMA} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(234,88,12,0.16),rgba(234,88,12,0.05) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,183,49,0.19),rgba(245,183,49,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: copy.s01.t57, href: "/resources" }, { label: copy.s01.t58, href: "/resources/guides" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(234,88,12,0.3)", backgroundColor: "rgba(234,88,12,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>{copy.s01.t59}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>{copy.s01.t60}{" "}
            <span className="relative inline-block">{copy.s01.t61}<Underline color="#F5B731" /></span>{" "}{copy.s01.t62}</h1>
          <ArticleMeta schema={ARTICLE_SCHEMA} />
          <p className="text-lg sm:text-xl max-w-2xl leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>{copy.s01.t63}</p>
        </div>
      </section>

      <section className="py-12 px-4 border-y" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <Image src="/tejas.png" alt={copy.s01.t64} width={112} height={112} className="rounded-2xl object-cover shrink-0" />
          <div>
            <h2 className="text-xl font-black mb-2" style={{ color: "#0a0a0a" }}>{copy.s02.t01}</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>
              <a href="https://www.linkedin.com/in/tejasjhaveri/" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: "#0a0a0a" }}>{copy.s02.t02}</a>{copy.s02.t03}</p>
          </div>
        </div>
      </section>

      <article className="py-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto space-y-16">
          <FadeIn>
            <section>
              <h2 className={`${H2} mb-3`} style={{ color: "#0a0a0a" }}>{copy.s03.t01}</h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#52525B" }}>{copy.s03.t02}</p>
              <div className="space-y-6">
                {FRAMEWORK.map((f, i) => (
                  <FadeIn key={f.n} delay={i * 120}>
                  <div className="rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-9 h-9 rounded-full inline-flex items-center justify-center text-sm font-black shrink-0" style={{ backgroundColor: "rgba(234,88,12,0.1)", color: textTone(ACCENT), border: "1px solid rgba(234,88,12,0.25)" }}>{f.n}</span>
                      <h3 className="text-xl font-black" style={{ color: "#0a0a0a" }}>{f.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#52525B" }}>{f.lead}</p>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#71675E" }}>{f.listLabel}</p>
                    <ul className="space-y-1.5 mb-5">
                      {f.items.map((i) => (
                        <li key={i} className="text-sm flex gap-2" style={{ color: "#3D3D3D" }}>
                          <span aria-hidden="true" style={{ color: ACCENT }}>&bull;</span>
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm font-bold rounded-lg px-4 py-3" style={{ backgroundColor: "#FEF9EC", color: "#0a0a0a", border: "1px solid rgba(245,183,49,0.35)" }}>{copy.s03.t03}{f.goal}</p>
                  </div>
                  </FadeIn>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className={`${H2} mb-3`} style={{ color: "#0a0a0a" }}>{copy.s04.t01}</h2>
              <p className="text-base leading-relaxed mb-10" style={{ color: "#52525B" }}>{copy.s04.t02}</p>

              <h3 className="text-xl font-black mb-5" style={{ color: "#0a0a0a" }}>{copy.s05.t01}</h3>
              <div className="space-y-6 mb-12">
                {POSTS.map((p, i) => (
                  <FadeIn key={p.id} delay={i * 80}>
                  <div>
                    <p className="text-sm font-black mb-2" style={{ color: "#0a0a0a" }}><span style={{ color: textTone(ACCENT) }}>{p.id}</span> &nbsp;{p.title}</p>
                    <CopyBlock text={p.text} accent={ACCENT} label={`Template ${p.id}`} successMessage="Template copied to clipboard" />
                  </div>
                  </FadeIn>
                ))}
              </div>

              <h3 className="text-xl font-black mb-5" style={{ color: "#0a0a0a" }}>{copy.s06.t01}</h3>
              <div className="space-y-4 mb-12">
                {CTAS.map((c, i) => (
                  <FadeIn key={c.id} delay={i * 80}>
                    <CopyBlock text={c.text} accent={ACCENT} label={`CTA ${c.id}`} successMessage="CTA copied to clipboard" />
                  </FadeIn>
                ))}
              </div>

              <h3 className="text-xl font-black mb-5" style={{ color: "#0a0a0a" }}>{copy.s07.t01}</h3>
              <div className="space-y-6">
                {FOLLOWUPS.map((m, i) => (
                  <FadeIn key={m.when} delay={i * 80}>
                  <div>
                    <p className="text-sm font-black mb-2" style={{ color: "#0a0a0a" }}>{m.when}</p>
                    <CopyBlock text={m.text} accent={ACCENT} label="Message" successMessage="Message copied to clipboard" />
                  </div>
                  </FadeIn>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className={`${H2} mb-3`} style={{ color: "#0a0a0a" }}>{copy.s08.t01}</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>{copy.s08.t02}</p>
              <div className="mb-4"><RoutineTimeline steps={ROUTINE} /></div>
              <p className="text-sm" style={{ color: "#52525B" }}>{copy.s08.t03}</p>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className={`${H2} mb-3`} style={{ color: "#0a0a0a" }}>{copy.s09.t01}</h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#52525B" }}>{copy.s09.t02}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <RangeStat from={5} to={20} label="new conversations per week" />
                <RangeStat from={1} to={4} label="calls per week" />
              </div>
              <div className="mb-5"><StaggerList items={EXPECT} /></div>
              <p className="text-base font-bold" style={{ color: "#0a0a0a" }}>{copy.s09.t03}</p>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl border p-8" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.35)" }}>
              <h2 className={`${H2} mb-4`} style={{ color: "#0a0a0a" }}>{copy.s10.t01}</h2>
              <p className="text-base font-bold leading-relaxed" style={{ color: "#0a0a0a" }}>{copy.s10.t02}<br />{copy.s10.t03}<br />{copy.s10.t04}</p>
              <p className="text-base leading-relaxed mt-4" style={{ color: "#52525B" }}>{copy.s10.t05}</p>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className={`${H2} mb-3`} style={{ color: "#0a0a0a" }}>{copy.s11.t01}</h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#52525B" }}>{copy.s11.t02}</p>
              <CopyBlock text={SEND_MESSAGE} accent={ACCENT} label="Copy and paste" successMessage="Message copied to clipboard" />
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className="text-2xl font-black mb-5" style={{ color: "#0a0a0a" }}>{copy.s12.t01}</h2>
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
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>{copy.s12.t02}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] mt-3 mb-4">{copy.s13.t01}</h2>
              <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#52525B" }}>{copy.s13.t02}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/book-a-call" className="btn-dark px-8 py-4 text-sm font-bold">{copy.s13.t03}</a>
                <a href="https://www.instagram.com/tejas_jhaveri/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-sm font-bold rounded-full border transition-colors hover:bg-[#F8F6F2]" style={{ color: "#0A0A0A", borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>{copy.s13.t04}</a>
              </div>
              <a href="mailto:founder@myntmore.com" className="inline-flex min-h-[44px] items-center mt-6 text-sm font-semibold" style={{ color: "#A14A08" }}>{copy.s13.t05}</a>
            </section>
          </FadeIn>
        </div>
      </article>
    </InnerLayout>
  );
}
