import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import LeadCaptureForm from "@/app/components/LeadCaptureForm";
import StatTicker from "@/app/components/StatTicker";
import JsonLd from "@/app/components/JsonLd";
import RelatedPath from "@/app/components/RelatedPath";
import { CASE_STUDY_PATHS } from "@/lib/internal-paths";
import { buildArticleSchema } from "@/lib/schema";
import data from "@/content/case-study-long/wealth-management-pms-pipeline.json";

const d = data;

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: d.schemaHeadline,
  description: d.schemaDescription,
  url: "https://www.myntmore.com/case-studies/wealth-management-pms-pipeline",
  datePublished: d.datePublished,
  dateModified: d.dateModified,
});

// Editors write **bold**, __italic__ and [link text](/path) inside a paragraph; this turns them back into
// <strong>, <em> and <Link>.
function Rich({ text }: { text: string }): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__|\[[^\]]+\]\([^)]+\))/);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("__")) return <em key={i}>{part.slice(2, -2)}</em>;
    if (part.startsWith("[")) {
      const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (m) {
        return (
          <Link key={i} href={m[2]} className="font-bold underline text-[#7C3AED] hover:text-[#0A0A0A]">
            {m[1]}
          </Link>
        );
      }
    }
    return part;
  });
}

export default function WealthManagementPmsPipeline() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />

      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: d.hero.breadcrumbLabel, href: "/case-studies/wealth-management-pms-pipeline" },
            ]}
          />

          <span
            className="inline-flex text-xs font-bold px-3 py-1 rounded-full mb-4"
            style={{
              backgroundColor: "rgba(124,58,237,0.08)",
              color: "#7C3AED",
              border: "1px solid rgba(124,58,237,0.25)",
            }}
          >
            {d.hero.badge}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight" style={{ color: "#0A0A0A" }}>
            {d.hero.headline}
          </h1>

          <p className="text-base sm:text-lg leading-relaxed mb-8 text-[#52525B]">
            {d.hero.intro}
          </p>

          {/* Key Stat Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 sm:p-8 rounded-2xl border mb-6"
            style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}
          >
            {d.hero.stats.map((s, i) => (
              <div
                key={i}
                className={i < 2 ? "text-center sm:border-r border-[#E8E2D9]/70 pb-4 sm:pb-0" : "text-center"}
              >
                <div className={i === 1 ? "text-3xl sm:text-4xl font-black text-[#7C3AED]" : "text-3xl sm:text-4xl font-black text-[#0A0A0A]"}>
                  <StatTicker value={s.value} />
                </div>
                <div className="text-xs sm:text-sm font-semibold mt-1 text-[#71675E]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Metrics Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border bg-[#FAF8F5]" style={{ borderColor: "#E8E2D9" }}>
            {d.hero.metricsStrip.map((m, i) => (
              <Fragment key={i}>
                {i > 0 && <span className="text-xs text-[#E8E2D9] hidden sm:inline">|</span>}
                <span className="text-xs font-semibold text-[#52525B]">
                  <strong className="text-[#0A0A0A]">{m.value}</strong>{" " + m.label}
                </span>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Case Study Body ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto space-y-14">
          {/* 1. The Challenge */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED] mb-2 block">
              {d.challenge.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 text-[#0A0A0A]">
              {d.challenge.heading}
            </h2>
            {d.challenge.paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i < d.challenge.paragraphs.length - 1
                    ? "text-base sm:text-lg leading-relaxed text-[#52525B] mb-4"
                    : "text-base sm:text-lg leading-relaxed text-[#52525B]"
                }
              >
                <Rich text={p} />
              </p>
            ))}
          </div>

          {/* 2. The Approach */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED] mb-2 block">
              {d.approach.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 text-[#0A0A0A]">
              {d.approach.heading}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#52525B] mb-8">
              {d.approach.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {d.approach.pillars.map((item) => (
                <div
                  key={item.number}
                  className="rounded-2xl border p-5 bg-white shadow-sm flex flex-col justify-between"
                  style={{ borderColor: "#E8E2D9" }}
                >
                  <div>
                    <span className="inline-block text-xs font-black text-[#7C3AED] bg-purple-50 px-2.5 py-1 rounded-md mb-3 border border-purple-200">
                      Pillar {item.number}
                    </span>
                    <h3 className="text-base font-bold text-[#0A0A0A] mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Content Impact */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED] mb-2 block">
              {d.contentImpact.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 text-[#0A0A0A]">
              {d.contentImpact.heading}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#52525B] mb-6">
              {d.contentImpact.intro}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl border bg-[#FAF8F5] mb-6" style={{ borderColor: "#E8E2D9" }}>
              {d.contentImpact.stats.map((s, i) => (
                <div key={i}>
                  <p className={i === 1 ? "text-2xl sm:text-3xl font-black text-[#7C3AED]" : "text-2xl sm:text-3xl font-black text-[#0A0A0A]"}>{s.value}</p>
                  <p className="text-xs text-[#71675E] font-medium mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="text-base leading-relaxed text-[#52525B]">
              <Rich text={d.contentImpact.audienceNote} />
            </p>
          </div>

          {/* 4. Outreach Results by Segment */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED] mb-2 block">
              {d.results.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 text-[#0A0A0A]">
              {d.results.heading}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#52525B] mb-4">
              <Rich text={d.results.intro} />
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#52525B] mb-6">
              <Rich text={d.results.marketNote} />
            </p>

            {/* Tactical Playbook Callouts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {d.results.playbook.map((item, i) => (
                <div key={i} className="p-4 rounded-xl border bg-white" style={{ borderColor: "#E8E2D9" }}>
                  <h4 className="text-xs font-bold uppercase text-[#7C3AED] mb-1">{item.title}</h4>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Segment Table */}
            <div className="rounded-2xl border overflow-hidden bg-white shadow-sm" style={{ borderColor: "#E8E2D9" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#FAF8F5] text-xs font-bold uppercase text-[#71675E] border-b" style={{ borderColor: "#E8E2D9" }}>
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">{d.results.tableHeaders.segment}</th>
                      <th className="py-3.5 px-4">{d.results.tableHeaders.acceptance}</th>
                      <th className="py-3.5 px-4">{d.results.tableHeaders.response}</th>
                      <th className="py-3.5 px-4">{d.results.tableHeaders.leads}</th>
                      <th className="py-3.5 px-4 sm:px-6">{d.results.tableHeaders.notes}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E2D9]/60">
                    {d.results.segments.map((seg) => (
                      <tr key={seg.name} className={seg.highlight ? "bg-purple-50/30" : "hover:bg-zinc-50/50"}>
                        <td className="py-4 px-4 sm:px-6 font-bold text-[#0A0A0A]">
                          {seg.name}
                        </td>
                        <td className="py-4 px-4 font-semibold text-[#0A0A0A]">{seg.acceptance}</td>
                        <td className="py-4 px-4 font-black text-[#7C3AED]">{seg.response}</td>
                        <td className="py-4 px-4 font-black text-[#0A0A0A]">
                          {seg.leads !== "N/A" ? <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs">{seg.leads}</span> : <span className="text-[#A1A1AA]">{seg.leads}</span>}
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-xs text-[#52525B]">{seg.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#71675E] mt-4 italic">
              {d.results.footnote}
            </p>
          </div>

          {/* 5. Why It Worked: The Compounding Effect */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED] mb-2 block">
              {d.flywheel.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 text-[#0A0A0A]">
              {d.flywheel.heading}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#52525B] mb-6">
              {d.flywheel.intro}
            </p>

            <ul className="space-y-3 mb-6">
              {d.flywheel.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#52525B]">
                  <div className="w-5 h-5 rounded-full bg-purple-100 text-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <span><strong>{pt.title}</strong>{" " + pt.description}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl p-6 border bg-[#FEF9EC]" style={{ borderColor: "rgba(245,183,49,0.35)" }}>
              <p className="text-sm sm:text-base font-semibold text-[#0A0A0A] leading-relaxed">
                <Rich text={d.flywheel.callout} />
              </p>
            </div>
          </div>

          {/* 6. Key Takeaways & What We Learned */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED] mb-2 block">
              {d.takeaways.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-6 text-[#0A0A0A]">
              {d.takeaways.heading}
            </h2>

            <div className="space-y-4">
              {d.takeaways.items.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-5 bg-white"
                  style={{ borderColor: "#E8E2D9" }}
                >
                  <h3 className="text-sm sm:text-base font-bold text-[#0A0A0A] mb-1.5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-[#7C3AED] text-xs font-black flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed pl-8">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Services Used in this Engagement */}
          <div className="rounded-2xl border p-6 bg-white" style={{ borderColor: "#E8E2D9" }}>
            <h3 className="text-base font-black mb-3 text-[#0A0A0A]">
              {d.services.heading}
            </h3>
            <div className="flex flex-wrap gap-2">
              {d.services.links.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  className="inline-flex min-h-[44px] items-center text-xs px-3.5 py-2 rounded-full font-medium transition-colors hover:opacity-80"
                  style={{ backgroundColor: "#F8F6F2", color: "#3D3D3D", border: "1px solid #E8E2D9" }}
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Paths ────────────────────────────────────────────── */}
      <RelatedPath
        heading={d.relatedPaths.heading}
        intro={d.relatedPaths.intro}
        items={CASE_STUDY_PATHS["wealth-management-pms-pipeline"]}
        cta={false}
      />

      {/* ── Bottom CTA ──────────────────────────────────────────────── */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4 text-[#0A0A0A]">
            {d.cta.heading}
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto text-[#52525B]">
            {d.cta.body}
          </p>
          <a
            href="/book-a-call"
            className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2"
          >
            {d.cta.button}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <LeadCaptureForm />
    </InnerLayout>
  );
}
