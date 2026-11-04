import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import LeadCaptureForm from "@/app/components/LeadCaptureForm";
import StatTicker from "@/app/components/StatTicker";
import JsonLd from "@/app/components/JsonLd";
import RelatedPath from "@/app/components/RelatedPath";
import { CASE_STUDY_PATHS } from "@/lib/internal-paths";
import { buildArticleSchema } from "@/lib/schema";
import data from "@/content/case-study-long/specialist-recruitment-linkedin-leads.json";

const d = data;
const URL = "https://www.myntmore.com/case-studies/specialist-recruitment-linkedin-leads";

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: d.schemaHeadline,
  description: d.schemaDescription,
  url: URL,
  datePublished: d.datePublished,
  dateModified: d.dateModified,
});

const HERO_STATS = d.hero.stats;
const SEGMENTS = d.approach.segments;
const RESULTS = d.results.table;
const THEMES = d.messaging.themes;
const WHY_IT_WORKED = d.whyItWorked.points;

export default function SpecialistRecruitmentLinkedinLeadsCaseStudy() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(13,148,136,0.20) 0%, rgba(13,148,136,0.07) 42%, transparent 70%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: "620px", height: "620px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.20) 0%, rgba(245,183,49,0.07) 42%, transparent 70%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Case Studies", href: "/case-studies" }, { label: d.hero.breadcrumbLabel, href: "/case-studies/specialist-recruitment-linkedin-leads" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ backgroundColor: "rgba(13,148,136,0.08)", color: "#0f766e", borderColor: "rgba(13,148,136,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#0d9488" }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]">{d.hero.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            {d.hero.headline}
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed mb-10 max-w-3xl hero-fade-d2" style={{ color: "#52525B" }}>
            {d.hero.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 sm:p-6 rounded-2xl border hero-fade-d3" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="text-center py-3 sm:py-1">
                <div className="text-3xl sm:text-4xl font-black" style={{ color: "#0a0a0a" }}><StatTicker value={stat.value} /></div>
                <div className="text-xs mt-1" style={{ color: "#71675E" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto space-y-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#0F766E" }}>{d.challenge.eyebrow}</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>{d.challenge.heading}</h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "#52525B" }}>
              {d.challenge.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#0F766E" }}>{d.approach.eyebrow}</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>{d.approach.heading}</h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#52525B" }}>
              {d.approach.intro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SEGMENTS.map((segment, index) => (
                <div key={segment.title} className="rounded-2xl p-5 border" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black mb-4" style={{ backgroundColor: "rgba(13,148,136,0.12)", color: "#0f766e" }}>0{index + 1}</span>
                  <h3 className="text-sm font-black mb-2" style={{ color: "#0a0a0a" }}>{segment.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#52525B" }}>{segment.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#0F766E" }}>{d.results.eyebrow}</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>{d.results.heading}</h2>
            <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#F8F6F2" }}>
                    <th scope="col" className="text-left p-4 font-black" style={{ color: "#0a0a0a" }}>{d.results.metricColumnHeading}</th>
                    <th scope="col" className="text-right p-4 font-black" style={{ color: "#0a0a0a" }}>{d.results.resultColumnHeading}</th>
                  </tr>
                </thead>
                <tbody>
                  {RESULTS.map((row, i) => (
                    <tr key={row.metric} style={{ borderTop: i > 0 ? "1px solid #E8E2D9" : undefined }}>
                      <th scope="row" className="text-left p-4 font-bold" style={{ color: "#0a0a0a" }}>{row.metric}</th>
                      <td className="p-4 text-right font-black" style={{ color: "#0F766E" }}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#0F766E" }}>{d.messaging.eyebrow}</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>{d.messaging.heading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {THEMES.map((theme) => (
                <div key={theme.title} className="rounded-2xl p-5 border" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <h3 className="text-sm font-black mb-2" style={{ color: "#0a0a0a" }}>{theme.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#52525B" }}>{theme.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#0F766E" }}>{d.whyItWorked.eyebrow}</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>{d.whyItWorked.heading}</h2>
            <ul className="space-y-3">
              {WHY_IT_WORKED.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed" style={{ color: "#52525B" }}>
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2.5" style={{ backgroundColor: "#0d9488" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl p-6 sm:p-8 border-l-4" style={{ backgroundColor: "#F0FDFA", borderColor: "#0d9488" }}>
              <p className="text-lg font-black leading-relaxed mb-3" style={{ color: "#0a0a0a" }}>{d.whyItWorked.calloutHeadline}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{d.whyItWorked.calloutBody}</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>{d.services.heading}</h2>
            <div className="flex flex-wrap gap-3">
              {d.services.items.map((service) => (
                <Link key={service.name} href={service.href} className="text-sm px-4 py-2 rounded-full font-semibold transition-colors hover:opacity-80" style={{ backgroundColor: "#F8F6F2", color: "#52525B", border: "1px solid #E8E2D9" }}>{service.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RelatedPath heading="Go deeper" intro="The method behind this result." items={CASE_STUDY_PATHS["specialist-recruitment-linkedin-leads"]} />

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto"><LeadCaptureForm /></div>
      </section>
    </InnerLayout>
  );
}
