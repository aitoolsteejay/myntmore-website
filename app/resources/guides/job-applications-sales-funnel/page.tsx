import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InnerLayout from "../../../components/InnerLayout";
import Breadcrumbs from "../../../components/Breadcrumbs";
import FadeIn from "../../../components/FadeIn";
import JsonLd from "../../../components/JsonLd";
import { buildArticleSchema } from "@/lib/schema";
import ArticleMeta from "@/app/components/ArticleMeta";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";
import pageCopy from "@/content/page-copy/guideJobApplicationsSalesFunnel.json";

// This page's text is edited in the admin ("Job Applications Are a Sales Funnel") and lives in content/page-copy/guideJobApplicationsSalesFunnel.json.
const copy = pageCopy;

const URL = "https://www.myntmore.com/resources/guides/job-applications-sales-funnel";
const ACCENT = "#7C3AED";
const TITLE = "Job application are like a sales funnel";
const DESCRIPTION = "A practical job-search funnel for generating interview leads, reaching hiring managers directly, following up with proof, and closing the offer.";

export const metadata: Metadata = withPageSeo("/resources/guides/job-applications-sales-funnel", {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["job search funnel", "job application strategy", "how to reach hiring managers", "LinkedIn job search", "get more interviews", "job search outreach"],
  alternates: { canonical: URL },
  openGraph: { ...OG_BASE, title: `${TITLE} | Myntmore`, description: DESCRIPTION, url: URL, images: ogImages("/resources/guides/job-applications-sales-funnel") },
});

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: TITLE,
  description: DESCRIPTION,
  url: URL,
  datePublished: "2026-10-10T00:00:00+05:30",
  dateModified: "2026-10-10T00:00:00+05:30",
});

const FUNNEL = [
  ["Marketing", copy.s01.t01],
  ["Prospecting", copy.s01.t02],
  ["Outreach", copy.s01.t03],
  ["Follow-up", copy.s01.t04],
  ["Closing", copy.s01.t05],
  ["Goal", copy.s01.t06],
];

const OUTREACH = [
  ["Compliment", copy.s01.t07, copy.s01.t08],
  [copy.s01.t09, copy.s01.t10, copy.s01.t11],
  [copy.s01.t12, copy.s01.t13, copy.s01.t14],
];

const METRICS = [
  [copy.s01.t15, copy.s01.t16],
  [copy.s01.t17, copy.s01.t18],
  [copy.s01.t19, copy.s01.t20],
  [copy.s01.t21, copy.s01.t22],
  [copy.s01.t23, copy.s01.t24],
];

const JOB_FUNNEL = [
  { label: copy.s01.t25, value: "800", rate: "", width: 100, color: "#D6E8FA", edge: "#1478C9", text: "#0A0A0A" },
  { label: copy.s01.t26, value: "240", rate: "30%", width: 88, color: "#DCEAF7", edge: "#1E6DA9", text: "#0A0A0A" },
  { label: copy.s01.t27, value: "120", rate: "50%", width: 74, color: "#E2EBF5", edge: "#326D9C", text: "#0A0A0A" },
  { label: copy.s01.t28, value: "36", rate: "30%", width: 58, color: "#E8EDF3", edge: "#446B8D", text: "#0A0A0A" },
  { label: copy.s01.t29, value: "28", rate: "80%", width: 43, color: "#DCF3E4", edge: "#107941", text: "#0A0A0A" },
  { label: copy.s01.t30, value: "3", rate: "", width: 36, color: "#FFB82E", edge: "#FFB82E", text: "#18214D" },
];

const HERO_STATS = [
  [copy.s01.t31, "20–30", "people worth researching"],
  ["Follow-up", copy.s01.t32, "to show your thinking"],
  [copy.s01.t33, "1 stage", "to improve at a time"],
];

function DataTable({ rows }: { rows: string[][] }) {
  return <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#E8E2D9" }}>{rows.map(([left, right], i) => <div key={left} className="group grid grid-cols-1 sm:grid-cols-[0.85fr_1.5fr] transition-transform duration-300 hover:-translate-y-0.5" style={{ borderBottom: i < rows.length - 1 ? "1px solid #E8E2D9" : "none" }}><div className="px-5 py-4 text-sm font-black transition-colors duration-300 group-hover:text-violet-700" style={{ backgroundColor: "#F8F6F2", color: "#0a0a0a" }}>{left}</div><div className="px-5 py-4 text-sm leading-relaxed transition-colors duration-300 group-hover:bg-violet-50/50" style={{ backgroundColor: "#ffffff", color: "#52525B" }}>{right}</div></div>)}</div>;
}

function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <FadeIn delay={Number(number) * 45}><section className="group"><div className="flex items-center gap-3 mb-3"><span className="w-9 h-9 rounded-full inline-flex items-center justify-center text-sm font-black transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" style={{ backgroundColor: "rgba(124,58,237,0.1)", color: ACCENT }}>{number}</span><span className="text-xs font-black uppercase tracking-widest" style={{ color: ACCENT }}>{copy.s01.t34}{number}</span></div><h2 className="text-2xl sm:text-3xl font-black mb-5" style={{ color: "#0a0a0a" }}>{title}</h2><div className="space-y-5 text-base leading-relaxed" style={{ color: "#52525B" }}>{children}</div></section></FadeIn>;
}

function JobHuntFunnel() {
  return <div className="mt-10 rounded-[28px] border p-6 sm:p-10" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", boxShadow: "0 18px 55px rgba(20,120,201,0.08)" }}>
    <h2 className="text-2xl sm:text-3xl font-black text-center mb-8" style={{ color: "#252746" }}>{copy.s02.t01}</h2>
    <div className="flex flex-col items-center gap-3" aria-label="Job hunt funnel from outreach to offers">
      {JOB_FUNNEL.map((stage, index) => <div key={stage.label} className="animate-fade-up flex flex-col items-center justify-center rounded-xl px-4 py-2.5 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ width: `${stage.width}%`, minWidth: "180px", backgroundColor: stage.color, border: `1px solid ${stage.edge}`, color: stage.text, animationDelay: `${index * 90}ms` }}>
        <span className="text-sm sm:text-base font-bold leading-tight">{stage.label}</span>
        {stage.rate && <span className="text-xs font-bold opacity-90 mt-0.5">{stage.rate}</span>}
        <strong className="text-2xl sm:text-3xl leading-none mt-0.5">{stage.value}</strong>
      </div>)}
    </div>
    <p className="text-xs text-center mt-7" style={{ color: "#71675E" }}>{copy.s02.t02}</p>
  </div>;
}

export default function JobApplicationsSalesFunnel() {
  return <InnerLayout>
    <JsonLd data={ARTICLE_SCHEMA} />
    <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.18),rgba(124,58,237,0.05) 42%,transparent 70%)", filter: "blur(55px)" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,183,49,0.19),rgba(245,183,49,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
      <div className="relative z-10 max-w-5xl mx-auto"><div className="lg:col-span-2"><Breadcrumbs items={[{ label: copy.s02.t03, href: "/resources" }, { label: copy.s02.t04, href: "/resources/guides" }]} /></div>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-end mt-2">
          <div><div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(124,58,237,0.3)", backgroundColor: "rgba(124,58,237,0.08)" }}><span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} /><span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: ACCENT }}>{copy.s02.t05}</span></div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[0.98] hero-fade-d1" style={{ color: "#0a0a0a" }}>{copy.s02.t06}<span style={{ color: ACCENT }}>{copy.s02.t07}</span></h1>
            <ArticleMeta schema={ARTICLE_SCHEMA} />
            <p className="text-lg sm:text-xl max-w-2xl leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>{copy.s02.t08}</p>
          </div>
          <div className="hero-fade-d3 rounded-[28px] border p-5 sm:p-6 shadow-[0_18px_50px_rgba(124,58,237,0.1)]" style={{ backgroundColor: "rgba(255,255,255,0.78)", borderColor: "rgba(124,58,237,0.16)", backdropFilter: "blur(12px)" }}>
            <div className="flex items-center justify-between mb-5"><span className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: ACCENT }}>{copy.s02.t09}</span><span className="text-lg" aria-hidden="true">↗</span></div>
            <div className="space-y-3">{HERO_STATS.map(([label, value, note]) => <div key={label} className="flex items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-transform duration-300 hover:translate-x-1" style={{ backgroundColor: "#F8F6F2" }}><div><p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#71675E" }}>{label}</p><p className="text-xl font-black" style={{ color: "#0a0a0a" }}>{value}</p></div><p className="max-w-[130px] text-right text-xs leading-relaxed" style={{ color: "#52525B" }}>{note}</p></div>)}</div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-12 px-4 border-y" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}><div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6"><Image src="/tejas.png" alt={copy.s02.t10} width={112} height={112} className="rounded-2xl object-cover shrink-0 transition-transform duration-500 hover:scale-105 hover:rotate-2" /><div><h2 className="text-xl font-black mb-2" style={{ color: "#0a0a0a" }}>{copy.s03.t01}</h2><p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{copy.s03.t02}</p></div></div></section>

    <article className="py-16 px-4" style={{ backgroundColor: "#F8F6F2", color: "#52525B" }}><div className="max-w-3xl mx-auto space-y-16">
      <FadeIn><section><p className="text-lg leading-relaxed mb-6">{copy.s03.t03}</p><DataTable rows={FUNNEL} /><JobHuntFunnel /><div className="rounded-xl p-5 mt-6 border-l-4" style={{ backgroundColor: "#F3E8FF", borderColor: ACCENT }}><p className="font-bold" style={{ color: "#0a0a0a" }}>{copy.s03.t04}</p></div></section></FadeIn>

      <Step number="01" title={copy.s03.t05}><p>{copy.s03.t06}</p></Step>
      <Step number="02" title={copy.s03.t07}><p>{copy.s03.t08}</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{[copy.s03.t09, copy.s03.t10, copy.s03.t11, copy.s03.t12, copy.s03.t13, copy.s03.t14].map((item) => <div key={item} className="rounded-xl border p-4 text-sm font-semibold" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#3D3D3D" }}>✓ {item}</div>)}</div><p>{copy.s03.t15}</p><Link href="/tools/linkedin-optimizer" className="font-bold underline" style={{ color: ACCENT }}>{copy.s03.t16}</Link></Step>
      <Step number="03" title={copy.s03.t17}><p>{copy.s03.t18}</p><ol className="list-decimal pl-5 space-y-2"><li>{copy.s03.t19}</li><li>{copy.s03.t20}</li><li>{copy.s03.t21}</li><li>{copy.s03.t22}</li></ol><p>{copy.s03.t23}</p></Step>
      <Step number="04" title={copy.s03.t24}><p>{copy.s03.t25}</p><DataTable rows={OUTREACH} /><p className="text-sm">{copy.s03.t26}</p></Step>
      <Step number="05" title={copy.s03.t27}><p>{copy.s03.t28}</p><div className="rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}><ol className="space-y-3">{[copy.s03.t29, copy.s03.t30, copy.s03.t31, copy.s03.t32].map((item, i) => <li key={item} className="flex gap-3 text-sm" style={{ color: "#3D3D3D" }}><span className="font-black" style={{ color: ACCENT }}>{i + 1}</span>{item}</li>)}</ol></div><p>{copy.s03.t33}</p></Step>
      <Step number="06" title={copy.s03.t34}><p>{copy.s03.t35}</p><div className="rounded-xl p-5 border-l-4" style={{ backgroundColor: "#FEF9EC", borderColor: "#F5B731" }}><p className="font-bold" style={{ color: "#0a0a0a" }}>{copy.s03.t36}</p></div><Link href="/services/do-it-yourself" className="font-bold underline" style={{ color: ACCENT }}>{copy.s03.t37}</Link></Step>
      <Step number="07" title={copy.s03.t38}><p>{copy.s03.t39}</p><ul className="space-y-3">{[copy.s03.t40, copy.s03.t41, copy.s03.t42, copy.s03.t43, copy.s03.t44].map((item) => <li key={item} className="flex gap-3"><span style={{ color: ACCENT }}>✓</span>{item}</li>)}</ul><p>{copy.s03.t45}</p></Step>
      <FadeIn><figure className="rounded-2xl border overflow-hidden transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}><Image src="/sales-solves-problems.png" alt={copy.s03.t46} width={1254} height={1254} className="w-full h-auto" /><figcaption className="px-5 py-3 text-center text-xs" style={{ color: "#71675E" }}>{copy.s03.t47}</figcaption></figure></FadeIn>
      <Step number="08" title={copy.s03.t48}><p>{copy.s03.t49}</p><DataTable rows={METRICS} /></Step>

      <FadeIn><section className="cta-animated-section rounded-2xl p-8 sm:p-10 text-center border" style={{ borderColor: "rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}><span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>{copy.s03.t50}</span><h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0A0A0A" }}>{copy.s04.t01}</h2><ol className="text-left max-w-xl mx-auto space-y-2 text-sm" style={{ color: "#3D3D3D" }}>{[copy.s04.t02, copy.s04.t03, copy.s04.t04, copy.s04.t05, copy.s04.t06, copy.s04.t07].map((item) => <li key={item}>{item}</li>)}</ol><p className="text-base leading-relaxed max-w-xl mx-auto mt-7" style={{ color: "#52525B" }}>{copy.s04.t08}</p><div className="flex flex-col sm:flex-row gap-4 justify-center mt-8"><Link href="/tools/linkedin-optimizer" className="btn-dark px-8 py-4 text-sm font-bold">{copy.s04.t09}</Link><a href="mailto:founder@myntmore.com" className="px-8 py-4 text-sm font-bold rounded-full border transition-transform duration-200 hover:-translate-y-1" style={{ color: "#0A0A0A", backgroundColor: "#FFFFFF", borderColor: "#D0C9BF" }}>{copy.s04.t10}</a></div></section></FadeIn>
      <p className="text-center text-sm" style={{ color: "#71675E" }}>{copy.s04.t11}<a href="https://www.instagram.com/tejas_jhaveri" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: "#0a0a0a" }}>{copy.s04.t12}</a>{copy.s04.t13}</p>
    </div></article>
  </InnerLayout>;
}
