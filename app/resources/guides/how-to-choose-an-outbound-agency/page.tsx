import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import FadeIn from "@/app/components/FadeIn";
import JsonLd from "@/app/components/JsonLd";
import AskYourAI from "@/app/components/AskYourAI";
import Faq from "@/app/lp/Faq";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/schema";
import ArticleMeta from "@/app/components/ArticleMeta";
import { pageFaqs } from "@/lib/page-faqs";
import { OG_BASE, ogImages } from "@/lib/og";
import CityLinks from "@/app/components/CityLinks";
import { withPageSeo } from "@/lib/page-seo";
import pageCopy from "@/content/page-copy/guideHowToChooseAnOutboundAgency.json";

// This page's text is edited in the admin ("How to Choose a B2B Outbound Agency") and lives in content/page-copy/guideHowToChooseAnOutboundAgency.json.
const copy = pageCopy;

const PAGE_URL = `${SITE_URL}/resources/guides/how-to-choose-an-outbound-agency`;
const TITLE = "How to Choose a B2B Outbound Agency";
const DESCRIPTION = "A neutral checklist for vetting B2B outbound agencies: what to ask about data ownership, deliverability, real reply rates, and contract terms.";

const AI_RESOURCES = [PAGE_URL, `${SITE_URL}/resources/blogs/agency-vs-in-house`, `${SITE_URL}/resources/blogs/b2b-outbound-benchmark-report-2026`];

export const metadata: Metadata = withPageSeo("/resources/guides/how-to-choose-an-outbound-agency", {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    "how to choose a b2b outbound agency",
    "how to evaluate a cold email agency",
    "b2b outbound agency checklist",
    "questions to ask a lead generation agency",
    "outbound agency red flags",
    "vetting a linkedin outreach agency",
    "b2b outbound agency contract terms",
    "cold email agency evaluation criteria",
  ],
  openGraph: {
    ...OG_BASE,
    title: `${TITLE} | Myntmore`,
    description: DESCRIPTION,
    url: PAGE_URL,
    images: ogImages("/resources/guides/how-to-choose-an-outbound-agency"),
  },
});

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  datePublished: "2026-09-18T12:00:00+05:30",
  dateModified: "2026-09-18T12:00:00+05:30",
});

const FAQ_ITEMS = pageFaqs("guide-how-to-choose-an-outbound-agency");

export default function HowToChooseOutboundAgencyPage() {
  return (
    <InnerLayout>
      <JsonLd data={buildFaqSchema(FAQ_ITEMS)} />
      <JsonLd data={ARTICLE_SCHEMA} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.20) 0%, rgba(2,132,199,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.20) 0%, rgba(255,160,0,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: copy.s01.t01, href: "/resources" }, { label: copy.s01.t02, href: "/resources/guides" }, { label: copy.s01.t03, href: "/resources/guides/how-to-choose-an-outbound-agency" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(14,165,233,0.35)", background: "rgba(14,165,233,0.07)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#0EA5E9" }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#0369A1" }}>{copy.s01.t04}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>{copy.s01.t05}</h1>
          <ArticleMeta schema={ARTICLE_SCHEMA} />
          <p className="text-lg sm:text-xl max-w-2xl" style={{ color: "#52525B" }}>{copy.s01.t06}</p>
        </div>
      </section>

      <article>
        <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <div className="space-y-14">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s02.t01}</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s02.t02}</p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s03.t01}</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s03.t02}</p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s04.t01}</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s04.t02}<Link href="/case-studies" className="font-bold underline" style={{ color: "#1D4ED8" }}>{copy.s04.t03}</Link>.</p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s05.t01}</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s05.t02}</p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s06.t01}</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s06.t02}</p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s07.t01}</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s07.t02}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Checklist recap */}
        <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl font-black mb-6" style={{ color: "#0a0a0a" }}>{copy.s08.t01}</h2>
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
                {[
                  copy.s08.t02,
                  copy.s08.t03,
                  copy.s08.t04,
                  copy.s08.t05,
                  copy.s08.t06,
                  copy.s08.t07,
                ].map((q, i) => (
                  <div key={q} className="flex items-start gap-3 px-6 py-4" style={{ borderBottom: i < 5 ? "1px solid #F0EBE3" : "none" }}>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black mt-0.5" style={{ backgroundColor: "rgba(14,165,233,0.1)", color: "#0369A1" }}>{i + 1}</span>
                    <p className="text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>{q}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-6" style={{ color: "#52525B" }}>{copy.s08.t08}{" "}
                <Link href="/resources/blogs/agency-vs-in-house" className="font-bold" style={{ color: "#0369A1" }}>{copy.s08.t09}</Link>.
              </p>
              <p className="text-sm mt-3" style={{ color: "#52525B" }}>{copy.s08.t10}{" "}
                <Link href="/resources/guides/how-to-choose-b2b-lead-generation-agency-india" className="font-bold" style={{ color: "#0369A1" }}>{copy.s08.t11}</Link>{copy.s08.t12}</p>
            </FadeIn>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4">
          <div className="py-12">
            <AskYourAI resources={AI_RESOURCES} />
          </div>
        </div>
      </article>

      {/* FAQ */}
      <Faq badge="FAQ" title={copy.s08.t13} items={FAQ_ITEMS.map((f) => ({ q: f.question, a: f.answer }))} />

      {/* Final CTA */}
      <CityLinks heading="B2B lead generation agencies by Indian city" intro="What outbound looks like in each city we cover, by the industries that cluster there." />

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-8 sm:p-12 text-center" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 text-[#0A0A0A]">{copy.s09.t01}</h2>
            <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#71675E" }}>{copy.s09.t02}</p>
            <a href="/book-a-call" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">{copy.s09.t03}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}
