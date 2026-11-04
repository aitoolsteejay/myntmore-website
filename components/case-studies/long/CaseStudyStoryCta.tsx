import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import LeadCaptureForm from "@/app/components/LeadCaptureForm";
import StatTicker from "@/app/components/StatTicker";
import JsonLd from "@/app/components/JsonLd";
import RelatedPath from "@/app/components/RelatedPath";
import { CASE_STUDY_PATHS } from "@/lib/internal-paths";
import { buildArticleSchema } from "@/lib/schema";

export interface CaseStudyStoryCtaData {
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
  colors: { badgeBackground: string; badgeText: string; badgeBorder: string };
  problem: { body: string };
  solution: { body: string; cards: { title: string; description: string }[] };
  results: { summary: string; figures: { value: string; label: string; note: string }[] };
  services: { name: string; href: string }[];
  closingCta: { heading: string; body: string; buttonLabel: string };
}

// Layout shared by the long-form case studies that end on a "book a call" block. Strings and colours come from the page's JSON.
export default function CaseStudyStoryCta({ d, slug }: { d: CaseStudyStoryCtaData; slug: keyof typeof CASE_STUDY_PATHS }) {
  const url = `https://www.myntmore.com/case-studies/${slug}`;
  const ARTICLE_SCHEMA = buildArticleSchema({
    headline: d.schemaHeadline,
    description: d.schemaDescription,
    url,
    datePublished: d.datePublished,
    dateModified: d.dateModified,
  });
  // Tailwind needs literal class names: two or four cards sit in two columns, anything else in three.
  const cardGridClass = d.solution.cards.length % 2 === 0
    ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
    : "grid grid-cols-1 sm:grid-cols-3 gap-4";
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
            <div className={cardGridClass}>
              {d.solution.cards.map((item) => (
                <div key={item.title} className="rounded-xl border p-4" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <h3 className="text-sm font-black mb-2" style={{ color: "#0a0a0a" }}>{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#52525B" }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>The results</h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>
              {d.results.summary}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 rounded-2xl" style={{ backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.3)" }}>
              {d.results.figures.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-4xl font-black mb-1" style={{ color: "#0a0a0a" }}>{s.value}</div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "#3D3D3D" }}>{s.label}</div>
                  <div className="text-xs" style={{ color: "#71675E" }}>{s.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
            <h3 className="text-base font-black mb-3" style={{ color: "#0a0a0a" }}>Services used in this engagement</h3>
            <div className="flex flex-wrap gap-2">
              {d.services.map((s) => (
                <Link key={s.name} href={s.href} className="inline-flex min-h-[44px] items-center text-xs px-3.5 py-2 rounded-full font-medium transition-colors hover:opacity-80" style={{ backgroundColor: "#F8F6F2", color: "#3D3D3D", border: "1px solid #E8E2D9" }}>{s.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RelatedPath heading="Go deeper" intro="The method behind this result." items={CASE_STUDY_PATHS[slug]} cta={false} />

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4" style={{ color: "#0a0a0a" }}>{d.closingCta.heading}</h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#52525B" }}>
            {d.closingCta.body}
          </p>
          <a href="/book-a-call" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
            {d.closingCta.buttonLabel}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>

      <LeadCaptureForm />
    </InnerLayout>
  );
}
