import { Fragment } from "react";
import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import LeadCaptureForm from "@/app/components/LeadCaptureForm";
import CityLinks from "@/app/components/CityLinks";
import { caseStudyIndustry } from "@/lib/city-links";
import StatTicker from "@/app/components/StatTicker";
import JsonLd from "@/app/components/JsonLd";
import RelatedPath from "@/app/components/RelatedPath";
import { CASE_STUDY_PATHS } from "@/lib/internal-paths";
import { buildArticleSchema } from "@/lib/schema";
import data from "@/content/case-study-long/medical-tourism-platform-pipeline.json";

const d = data;

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: d.schemaHeadline,
  description: d.schemaDescription,
  url: "https://www.myntmore.com/case-studies/medical-tourism-platform-pipeline",
  datePublished: d.datePublished,
  dateModified: d.dateModified,
});

const SEGMENTS = d.segmentResults.table;

// Renders a run of text where some parts are bold (a part's own spaces are kept as written).
function RichParts({ parts }: { parts: { text: string; bold: boolean }[] }) {
  return (
    <>
      {parts.map((part, i) => (part.bold ? <strong key={i}>{part.text}</strong> : <Fragment key={i}>{part.text}</Fragment>))}
    </>
  );
}

export default function MedicalTourismPlatformPipeline() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />

      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: d.hero.breadcrumbLabel, href: "/case-studies/medical-tourism-platform-pipeline" },
            ]}
          />

          <span
            className="inline-flex text-xs font-bold px-3 py-1 rounded-full mb-4"
            style={{
              backgroundColor: "rgba(20,184,166,0.08)",
              color: "#0F766E",
              border: "1px solid rgba(20,184,166,0.25)",
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
            {d.hero.stats.map((stat, i) => (
              <div key={stat.label} className={i < 2 ? "text-center sm:border-r border-[#E8E2D9]/70 pb-4 sm:pb-0" : "text-center"}>
                <div className={i === 1 ? "text-3xl sm:text-4xl font-black text-[#0F766E]" : "text-3xl sm:text-4xl font-black text-[#0A0A0A]"}>
                  <StatTicker value={stat.value} />
                </div>
                <div className="text-xs sm:text-sm font-semibold mt-1 text-[#71675E]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Metrics Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border bg-[#FAF8F5]" style={{ borderColor: "#E8E2D9" }}>
            {d.hero.quickMetrics.map((metric, i) => (
              <Fragment key={metric.value}>
                {i > 0 && <span className="text-xs text-[#E8E2D9] hidden sm:inline">|</span>}
                <span className="text-xs font-semibold text-[#52525B]">
                  <strong className="text-[#0A0A0A]">{metric.value}</strong>{` ${metric.text}`}
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#0F766E] mb-2 block">
              {d.challenge.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 text-[#0A0A0A]">
              {d.challenge.heading}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#52525B] mb-4">
              {d.challenge.paragraphs[0]}
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-[#52525B]">
              {d.challenge.paragraphs[1]}
            </p>
          </div>

          {/* 2. The Approach */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0F766E] mb-2 block">
              {d.approach.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 text-[#0A0A0A]">
              {d.approach.heading}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#52525B] mb-8">
              {d.approach.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {d.approach.audiences.map((audience) => (
                <div key={audience.tag} className="rounded-2xl border p-5 bg-white shadow-sm" style={{ borderColor: "#E8E2D9" }}>
                  <span className="inline-block text-xs font-black text-[#0F766E] bg-teal-50 px-2.5 py-1 rounded-md mb-3 border border-teal-200">
                    {audience.tag}
                  </span>
                  <h3 className="text-base font-bold text-[#0A0A0A] mb-2">{audience.title}</h3>
                  <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                    {audience.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-6 border bg-[#FEF9EC]" style={{ borderColor: "rgba(245,183,49,0.35)" }}>
              <p className="text-sm sm:text-base font-semibold text-[#0A0A0A] leading-relaxed">
                <strong>{d.approach.openingLabel}</strong>{` ${d.approach.openingText}`}
              </p>
            </div>
          </div>

          {/* 3. Outreach Results by Segment */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0F766E] mb-2 block">
              {d.segmentResults.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 text-[#0A0A0A]">
              {d.segmentResults.heading}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#52525B] mb-6">
              <RichParts parts={d.segmentResults.intro} />
            </p>

            {/* Segment Table */}
            <div className="rounded-2xl border overflow-hidden bg-white shadow-sm mb-6" style={{ borderColor: "#E8E2D9" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#FAF8F5] text-xs font-bold uppercase text-[#71675E] border-b" style={{ borderColor: "#E8E2D9" }}>
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">{d.segmentResults.columns.segment}</th>
                      <th className="py-3.5 px-4">{d.segmentResults.columns.acceptance}</th>
                      <th className="py-3.5 px-4">{d.segmentResults.columns.response}</th>
                      <th className="py-3.5 px-4">{d.segmentResults.columns.leads}</th>
                      <th className="py-3.5 px-4 sm:px-6">{d.segmentResults.columns.notes}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E2D9]/60">
                    {SEGMENTS.map((seg) => (
                      <tr key={seg.name} className={seg.highlight ? "bg-teal-50/30" : "hover:bg-zinc-50/50"}>
                        <td className="py-4 px-4 sm:px-6 font-bold text-[#0A0A0A]">
                          {seg.name}
                        </td>
                        <td className="py-4 px-4 font-semibold text-[#0A0A0A]">{seg.acceptance}</td>
                        <td className="py-4 px-4 font-black text-[#0F766E]">{seg.response}</td>
                        <td className="py-4 px-4 font-black text-[#0A0A0A]">
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-bold">
                            {seg.leads}
                          </span>
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-xs text-[#52525B]">{seg.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scale vs Engagement Insight */}
            <div className="rounded-xl border p-5 bg-[#FAF8F5]" style={{ borderColor: "#E8E2D9" }}>
              <h4 className="text-sm font-bold text-[#0A0A0A] mb-2">{d.segmentResults.insightHeading}</h4>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                <RichParts parts={d.segmentResults.insight} />
              </p>
            </div>
          </div>

          {/* 4. The Messaging Strategy */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0F766E] mb-2 block">
              {d.messaging.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 text-[#0A0A0A]">
              {d.messaging.heading}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#52525B] mb-6">
              {d.messaging.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {d.messaging.cards.map((card) => (
                <div key={card.title} className="p-5 rounded-2xl border bg-white shadow-sm" style={{ borderColor: "#E8E2D9" }}>
                  <h3 className="text-sm font-bold text-[#0A0A0A] mb-2">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Key Takeaways & What We Learned */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0F766E] mb-2 block">
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
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-[#0F766E] text-xs font-black flex items-center justify-center shrink-0">
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
              {d.services.items.map((s) => (
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
        heading="Go deeper"
        intro="The method behind this result."
        items={CASE_STUDY_PATHS["medical-tourism-platform-pipeline"]}
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
            {d.cta.buttonLabel}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <CityLinks
        industry={caseStudyIndustry("medical-tourism-platform-pipeline")}
        heading="Lead generation for this industry, by city"
        intro="The cities where this kind of company clusters, and how we run outbound for them there."
      />

      <LeadCaptureForm />
    </InnerLayout>
  );
}
