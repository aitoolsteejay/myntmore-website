import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import LeadCaptureForm from "@/app/components/LeadCaptureForm";
import StatTicker from "@/app/components/StatTicker";
import JsonLd from "@/app/components/JsonLd";
import { textTone } from "@/lib/colors";
import { marketOfCaseStudy } from "@/lib/case-study-markets";
import CITY_LINKS from "@/lib/city-links.generated.json";

export interface CaseStudyLayoutProps {
  slug: string;
  tag: string;
  accent: string;
  title: string;
  intro: string;
  heroStats: { value: string; label: string }[];
  challengeTitle: string;
  challengeBody: string[];
  approachTitle: string;
  approachBody: string[];
  metrics: { l: string; v: string }[];
  outcomeTitle: string;
  outcomeBody: string;
  roleBody: string;
  services: { name: string; href: string }[];
  articleSchema: Record<string, unknown>;
}

// Shared layout for the structured case study pages: the industry case study library (via
// LibraryCaseStudy) and the hand-written pages under app/case-studies/. All of them report real
// client engagements (client names withheld), so the layout has no label or disclosure mode.
export default function CaseStudyLayout({
  slug,
  tag,
  accent,
  title,
  intro,
  heroStats,
  challengeTitle,
  challengeBody,
  approachTitle,
  approachBody,
  metrics,
  outcomeTitle,
  outcomeBody,
  roleBody,
  services,
  articleSchema,
}: CaseStudyLayoutProps) {
  const market = marketOfCaseStudy(slug);
  // City pages that list this case study as proof link here; link back so the relationship runs both ways.
  const cityLinks = (CITY_LINKS.byCaseStudy as Record<string, { href: string; label: string }[]>)[slug] ?? [];
  return (
    <InnerLayout>
      <JsonLd data={articleSchema} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: "650px", height: "650px", borderRadius: "50%", background: `radial-gradient(circle, ${accent}33 0%, ${accent}12 42%, transparent 70%)`, filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: "620px", height: "620px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.20) 0%, rgba(245,183,49,0.07) 42%, transparent 70%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Case Studies", href: "/case-studies" }, { label: tag, href: `/case-studies/${slug}` }]} />
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border hero-fade" style={{ backgroundColor: `${accent}12`, color: textTone(accent), borderColor: `${accent}40` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
              <span className="text-xs font-bold uppercase tracking-[0.15em]">{tag}</span>
            </div>
            {market && (
              <Link href={`/case-studies/markets/${market.slug}`} className="inline-flex min-h-[44px] items-center rounded-full border px-4 text-xs font-bold hero-fade transition-colors hover:bg-white" style={{ borderColor: "#E8E2D9", color: "#A14A08", backgroundColor: "#FFFFFF" }}>
                More case studies in {market.label} &rarr;
              </Link>
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            {title}
          </h1>
          <p className={`text-lg sm:text-xl leading-relaxed max-w-3xl hero-fade-d2 mb-10`} style={{ color: "#52525B" }}>
            {intro}
          </p>
          <div className={`grid grid-cols-1 gap-4 p-5 sm:p-6 rounded-2xl border hero-fade-d3 ${heroStats.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`} style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
            {heroStats.map((stat) => (
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
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: textTone(accent) }}>01 · The client and challenge</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>{challengeTitle}</h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "#52525B" }}>
              {challengeBody.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: textTone(accent) }}>02 · Myntmore&apos;s approach</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>{approachTitle}</h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "#52525B" }}>
              {approachBody.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: textTone(accent) }}>03 · Campaign metrics</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>Results across the funnel</h2>
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
              {metrics.map((m, index) => (
                <div key={m.l} className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderBottom: index < metrics.length - 1 ? "1px solid #E8E2D9" : "none" }}>
                  <span className="text-sm" style={{ color: "#52525B" }}>{m.l}</span>
                  <span className="text-xl font-black" style={{ color: textTone(accent) }}>{m.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: textTone(accent) }}>04 · Business outcome</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>{outcomeTitle}</h2>
            <p className="text-base leading-relaxed" style={{ color: "#52525B" }}>{outcomeBody}</p>
            <div className="mt-8 rounded-2xl p-6 sm:p-8 border-l-4" style={{ backgroundColor: `${accent}0d`, borderColor: accent }}>
              <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: textTone(accent) }}>Myntmore&apos;s role</p>
              <p className="text-base leading-relaxed" style={{ color: "#0a0a0a" }}>{roleBody}</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>Services used in this engagement</h2>
            <div className="flex flex-wrap gap-3">
              {services.map((service) => (
                <Link key={service.name} href={service.href} className="text-sm px-4 py-2 rounded-full font-semibold transition-colors hover:opacity-80" style={{ backgroundColor: "#F8F6F2", color: "#52525B", border: "1px solid #E8E2D9" }}>{service.name}</Link>
              ))}
            </div>
          </div>
          {cityLinks.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>Lead generation for companies like this in</h2>
              <div className="flex flex-wrap gap-3">
                {cityLinks.map((c) => (
                  <Link key={c.href} href={c.href} className="inline-flex items-center min-h-[44px] text-sm px-4 py-2 rounded-full border font-semibold transition-colors hover:border-[#F5B731]" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#3D3D3D" }}>
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto"><LeadCaptureForm /></div>
      </section>
    </InnerLayout>
  );
}
