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

export interface CaseStudyStoryQuoteData {
  schemaHeadline: string;
  schemaDescription: string;
  datePublished: string;
  dateModified: string;
  hero: {
    breadcrumbLabel: string;
    badge: string;
    headline: string;
    intro: string;
    stats: { value: string; label: string }[];
  };
  colors: {
    badgeBackground: string;
    badgeText: string;
    badgeBorder: string;
    resultFigureText: string;
    quoteBackground: string;
    quoteBorder: string;
    quoteAuthorText: string;
  };
  problem: { body: string };
  solution: { body: string; highlights: string[] };
  results: { figures: { value: string; label: string }[]; summary: string };
  quote: { text: string; attribution: string };
  services: { name: string; href: string }[];
}

// Layout shared by the long-form case studies that carry a client quote. Strings and colours come from the page's JSON.
export default function CaseStudyStoryQuote({ d, slug }: { d: CaseStudyStoryQuoteData; slug: keyof typeof CASE_STUDY_PATHS }) {
  const url = `https://www.myntmore.com/case-studies/${slug}`;
  const ARTICLE_SCHEMA = buildArticleSchema({
    headline: d.schemaHeadline,
    description: d.schemaDescription,
    url,
    datePublished: d.datePublished,
    dateModified: d.dateModified,
  });
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Case Studies", href: "/case-studies" }, { label: d.hero.breadcrumbLabel, href: `/case-studies/${slug}` }]} />
          <span className="inline-flex text-xs font-bold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: d.colors.badgeBackground, color: d.colors.badgeText, border: `1px solid ${d.colors.badgeBorder}` }}>{d.hero.badge}</span>
          <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            {d.hero.headline}
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "#52525B" }}>
            {d.hero.intro}
          </p>
          <div className="grid grid-cols-3 gap-6 p-6 rounded-2xl border" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
            {d.hero.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black" style={{ color: "#0a0a0a" }}><StatTicker value={s.value} /></div>
                <div className="text-xs mt-1" style={{ color: "#71675E" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto space-y-10">
          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>The problem</h2>
            <p className="text-base leading-relaxed" style={{ color: "#52525B" }}>
              {d.problem.body}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>The solution</h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>
              {d.solution.body}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {d.solution.highlights.map((item) => (
                <div key={item} className="rounded-xl p-4 border text-sm font-semibold" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9", color: "#3D3D3D" }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>The results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl border" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
              {d.results.figures.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-black" style={{ color: d.colors.resultFigureText }}><StatTicker value={s.value} /></div>
                  <div className="text-xs mt-1" style={{ color: "#71675E" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-base leading-relaxed mt-6" style={{ color: "#52525B" }}>
              {d.results.summary}
            </p>
          </div>

          <div className="rounded-2xl p-8 border-l-4" style={{ backgroundColor: d.colors.quoteBackground, borderColor: d.colors.quoteBorder }}>
            <p className="text-lg font-semibold italic mb-3" style={{ color: "#0a0a0a" }}>
              {`“${d.quote.text}”`}
            </p>
            <p className="text-sm font-bold" style={{ color: d.colors.quoteAuthorText }}>{d.quote.attribution}</p>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>Services used</h2>
            <div className="flex flex-wrap gap-3">
              {d.services.map((s) => (
                s.href ? (
                  <Link key={s.name} href={s.href} className="text-sm px-4 py-2 rounded-full font-semibold transition-colors hover:opacity-80" style={{ backgroundColor: "#F8F6F2", color: "#52525B", border: "1px solid #E8E2D9" }}>{s.name}</Link>
                ) : (
                  <span key={s.name} className="text-sm px-4 py-2 rounded-full font-semibold" style={{ backgroundColor: "#F8F6F2", color: "#52525B", border: "1px solid #E8E2D9" }}>{s.name}</span>
                )
              ))}
            </div>
          </div>
        </div>
      </section>

      <RelatedPath heading="Go deeper" intro="The method behind this result." items={CASE_STUDY_PATHS[slug]} />

      <CityLinks
        industry={caseStudyIndustry(slug)}
        heading="Lead generation for this industry, by city"
        intro="The cities where this kind of company clusters, and how we run outbound for them there."
      />

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <LeadCaptureForm />
        </div>
      </section>
    </InnerLayout>
  );
}
