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
import pageCopy from "@/content/page-copy/guideHowToChooseB2bLeadGenerationAgencyIndia.json";

// This page's text is edited in the admin ("How to Choose a B2B Lead Generation Agency in India") and lives in content/page-copy/guideHowToChooseB2bLeadGenerationAgencyIndia.json.
const copy = pageCopy;

const PAGE_URL = `${SITE_URL}/resources/guides/how-to-choose-b2b-lead-generation-agency-india`;
const TITLE = "How to Choose a B2B Lead Generation Agency in India";
const DESCRIPTION = "Eight criteria for choosing a B2B lead generation agency in India: agency type, target market, data, DPDP and TRAI compliance, pricing models and proof.";

const AI_RESOURCES = [
  PAGE_URL,
  `${SITE_URL}/resources/guides/how-to-choose-an-outbound-agency`,
  `${SITE_URL}/resources/blogs/b2b-outbound-benchmark-report-2026`,
];

export const metadata: Metadata = withPageSeo("/resources/guides/how-to-choose-b2b-lead-generation-agency-india", {
  title: "Choosing a B2B Lead Generation Agency in India",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    "how to choose a b2b lead generation agency in india",
    "b2b lead generation agency india checklist",
    "lead generation company vs outbound agency",
    "pay per lead vs retainer lead generation india",
    "dpdp act lead generation agency",
    "questions to ask a lead generation company in india",
    "b2b appointment setting agency india",
  ],
  openGraph: {
    ...OG_BASE,
    title: `${TITLE} | Myntmore`,
    description: DESCRIPTION,
    url: PAGE_URL,
    images: ogImages("/resources/guides/how-to-choose-b2b-lead-generation-agency-india"),
  },
});

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  datePublished: "2026-10-26T12:00:00+05:30",
  dateModified: "2026-10-26T12:00:00+05:30",
});

// The four businesses that all call themselves "lead generation companies" in
// India. Most bad agency decisions start with comparing two of these as if
// they sold the same thing.
const AGENCY_TYPES = [
  {
    type: "Data and lead list vendors",
    get: "Contact lists, usually priced per record",
    fit: "Teams that already have people and tools to run outreach",
    watch: "Stale or unverified records, and no responsibility for what happens after delivery",
  },
  {
    type: "Telecalling and appointment-setting firms",
    get: "Outbound calls that book meetings, often priced per appointment",
    fit: "High-volume offers with short sales cycles",
    watch: "Loose meeting definitions, low show-up rates and TRAI rules on commercial calls",
  },
  {
    type: "Performance marketing agencies",
    get: "Inbound form fills from paid ads on Google, Meta or LinkedIn",
    fit: "Offers with existing search demand",
    watch: "Volume of form fills reported as \"leads\" whether or not they match your ICP",
  },
  {
    type: "Outbound agencies",
    get: "Cold email, LinkedIn and ABM run as one system, priced as a retainer or per meeting",
    fit: "B2B companies with a defined ICP and a deal size that justifies a sales conversation",
    watch: "Setup time before the first send, and whether you own the domains, lists and copy",
  },
];

const SCORECARD = [
  { criterion: "Agency type", good: copy.s01.t01, flag: "\"We do everything\" with no method behind it" },
  { criterion: "Target market", good: copy.s01.t02, flag: "Only domestic proof when you sell to the US, or the reverse" },
  { criterion: "Data", good: copy.s01.t03, flag: "Cannot say where the list comes from" },
  { criterion: "Compliance", good: copy.s01.t04, flag: "\"Compliance isn't an issue in B2B\"" },
  { criterion: "Meeting definition", good: copy.s01.t05, flag: "Counts any reply or booked slot as a lead" },
  { criterion: "Pricing", good: copy.s01.t06, flag: "A low monthly fee with costs that appear later" },
  { criterion: "Team", good: copy.s01.t07, flag: "Work passed to unnamed freelancers" },
  { criterion: "Proof", good: copy.s01.t08, flag: "Screenshots of one client's best month" },
];

const FAQ_ITEMS = pageFaqs("guide-how-to-choose-b2b-lead-generation-agency-india");

export default function HowToChooseLeadGenAgencyIndiaPage() {
  return (
    <InnerLayout>
      <JsonLd data={buildFaqSchema(FAQ_ITEMS)} />
      <JsonLd data={ARTICLE_SCHEMA} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.22) 0%, rgba(255,160,0,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.16) 0%, rgba(234,88,12,0.06) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: copy.s01.t09, href: "/resources" }, { label: copy.s01.t10, href: "/resources/guides" }, { label: copy.s01.t11, href: "/resources/guides/how-to-choose-b2b-lead-generation-agency-india" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(245,183,49,0.45)", background: "rgba(245,183,49,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#F5B731" }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#A14A08" }}>{copy.s01.t12}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>{copy.s01.t13}</h1>
          <ArticleMeta schema={ARTICLE_SCHEMA} />
          <p className="text-lg sm:text-xl max-w-2xl" style={{ color: "#52525B" }}>{copy.s01.t14}</p>
        </div>
      </section>

      <article>
        {/* Short answer */}
        <section className="pb-4 px-4" style={{ backgroundColor: "#F8F6F2" }}>
          <div className="max-w-3xl mx-auto rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
            <h2 className="text-sm font-black uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>{copy.s02.t01}</h2>
            <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s02.t02}</p>
          </div>
        </section>

        <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <div className="space-y-14">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s03.t01}</h2>
                  <p className="text-base leading-relaxed mb-6" style={{ color: "#3D3D3D" }}>{copy.s03.t02}</p>
                  <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ backgroundColor: "#F8F6F2" }}>
                          <th scope="col" className="text-left p-4 font-black" style={{ color: "#0a0a0a" }}>{copy.s03.t03}</th>
                          <th scope="col" className="text-left p-4 font-black" style={{ color: "#0a0a0a" }}>{copy.s03.t04}</th>
                          <th scope="col" className="text-left p-4 font-black" style={{ color: "#0a0a0a" }}>{copy.s03.t05}</th>
                          <th scope="col" className="text-left p-4 font-black" style={{ color: "#0a0a0a" }}>{copy.s03.t06}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {AGENCY_TYPES.map((row, i) => (
                          <tr key={row.type} style={{ borderTop: i > 0 ? "1px solid #E8E2D9" : undefined }}>
                            <th scope="row" className="text-left p-4 font-bold align-top" style={{ color: "#0a0a0a" }}>{row.type}</th>
                            <td className="p-4 align-top" style={{ color: "#3D3D3D" }}>{row.get}</td>
                            <td className="p-4 align-top" style={{ color: "#3D3D3D" }}>{row.fit}</td>
                            <td className="p-4 align-top" style={{ color: "#71675E" }}>{row.watch}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s04.t01}</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s04.t02}</p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s05.t01}</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s05.t02}</p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s06.t01}</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s06.t02}{" "}
                    <Link href="/resources/blogs/cold-email-compliance-guide" className="font-bold underline" style={{ color: "#A14A08" }}>{copy.s06.t03}</Link>{copy.s06.t04}</p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s07.t01}</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s07.t02}</p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s08.t01}</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s08.t02}</p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s09.t01}</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s09.t02}</p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s10.t01}</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s10.t02}{" "}
                    <Link href="/resources/blogs/b2b-outbound-benchmark-report-2026" className="font-bold underline" style={{ color: "#A14A08" }}>{copy.s10.t03}</Link>{copy.s10.t04}{" "}
                    <Link href="/resources/guides/how-to-choose-an-outbound-agency" className="font-bold underline" style={{ color: "#A14A08" }}>{copy.s10.t05}</Link>{copy.s10.t06}{" "}
                    <Link href="/b2b-lead-generation-mumbai" className="font-bold underline" style={{ color: "#A14A08" }}>{copy.s10.t07}</Link>.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Scorecard */}
        <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s11.t01}</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>{copy.s11.t02}</p>
              <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#FEF9EC" }}>
                      <th scope="col" className="text-left p-4 font-black" style={{ color: "#0a0a0a" }}>{copy.s11.t03}</th>
                      <th scope="col" className="text-left p-4 font-black" style={{ color: "#047857" }}>{copy.s11.t04}</th>
                      <th scope="col" className="text-left p-4 font-black" style={{ color: "#B91C1C" }}>{copy.s11.t05}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SCORECARD.map((row, i) => (
                      <tr key={row.criterion} style={{ borderTop: i > 0 ? "1px solid #F0EBE3" : undefined }}>
                        <th scope="row" className="text-left p-4 font-bold align-top" style={{ color: "#0a0a0a" }}>{row.criterion}</th>
                        <td className="p-4 align-top" style={{ color: "#3D3D3D" }}>{row.good}</td>
                        <td className="p-4 align-top" style={{ color: "#3D3D3D" }}>{row.flag}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm mt-6" style={{ color: "#52525B" }}>{copy.s11.t06}{" "}
                <Link href="/resources/blogs/agency-vs-in-house" className="font-bold" style={{ color: "#A14A08" }}>{copy.s11.t07}</Link>.
              </p>
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
      <Faq badge="FAQ" title={copy.s11.t08} items={FAQ_ITEMS.map((f) => ({ q: f.question, a: f.answer }))} />

      {/* Final CTA */}
      <CityLinks heading="B2B lead generation agencies by Indian city" intro="What outbound looks like in each city we cover, by the industries that cluster there." />

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-8 sm:p-12 text-center" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 text-[#0A0A0A]">{copy.s12.t01}</h2>
            <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#71675E" }}>{copy.s12.t02}</p>
            <a href="/book-a-call" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">{copy.s12.t03}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}
