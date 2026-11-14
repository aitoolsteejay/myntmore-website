import type { Metadata } from "next";
import InnerLayout from "../components/InnerLayout";
import FadeIn from "../components/FadeIn";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema, buildServiceSchema, SITE_URL } from "@/lib/schema";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const CONSULTATION_SCHEMA = [
  buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "1-on-1 Consultation", url: `${SITE_URL}/1-on-1-consultation` },
  ]),
  buildServiceSchema({
    name: "1-on-1 B2B Growth Consultation & Free GTM Audit",
    description: "Free 30-minute growth consultation and outbound audit with Tejas Jhaveri. Review outbound messaging, deliverability, and ICP mapping.",
    serviceType: "B2B Sales & GTM Consulting",
    url: `${SITE_URL}/1-on-1-consultation`,
  }),
];

export const metadata: Metadata = withPageSeo("/1-on-1-consultation", {
  title: "1-on-1 B2B Growth Consultation | Free GTM Audit",
  description: "Book a 1-on-1 consultation with Tejas Jhaveri, B2B growth expert. Free GTM audit: outreach review, ICP mapping. No pitch, no pressure.",
  alternates: { canonical: "https://www.myntmore.com/1-on-1-consultation" },
  keywords: [
    "b2b growth consultation",
    "free gtm audit",
    "b2b outreach audit",
    "sales pipeline audit",
    "icp mapping consultation",
    "cold outreach strategy call",
    "tejas jhaveri consultation",
    "b2b sales strategy session",
    "outbound audit call",
    "linkedin outreach review",
    "pipeline bottleneck diagnosis",
    "free sales audit",
    "gtm strategy workshop",
    "b2b growth expert call",
  ],
  openGraph: {
    ...OG_BASE,
    title: "1-on-1 B2B Growth Consultation | Myntmore",
    description: "Free 30-minute GTM audit with Tejas Jhaveri. No pitch, no pressure.",
    url: "https://www.myntmore.com/1-on-1-consultation",
    images: ogImages("/1-on-1-consultation"),
  },
});

export default function OneOnOneConsultation() {
  return (
    <InnerLayout>
      <JsonLd data={CONSULTATION_SCHEMA} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "1-on-1 Consultation", href: "/1-on-1-consultation" }]} />
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
              1-on-1 Consultation
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            Get clarity on your pipeline.<br />In 30 minutes.
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mb-8 hero-fade-d2" style={{ color: "#52525B" }}>
            Book a free 1-on-1 strategy call with Tejas Jhaveri. We&apos;ll audit your company&apos;s outreach, map your ICP, and tell you exactly what is holding your pipeline back. No pitch, no pressure.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <FadeIn><div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-black mb-8" style={{ color: "#0a0a0a" }}>Your session</h2>
            <div className="space-y-6">
              <div className="rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "rgba(245,183,49,0.4)", boxShadow: "0 4px 16px rgba(245,183,49,0.1)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-black" style={{ color: "#0a0a0a" }}>Free 30-min GTM Audit</h3>
                  </div>
                  <span className="text-lg font-black" style={{ color: "#A14A08" }}>Free</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {["Outreach system review", "ICP clarity session", "Pipeline bottleneck diagnosis", "Custom action plan delivered after"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "#52525B" }}>
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#F5B731" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/book-a-call" className="btn-dark w-full py-3 text-sm font-bold text-center block">
                  Book Free 30-Min Audit
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
              <h3 className="text-base font-black mb-4" style={{ color: "#0a0a0a" }}>What you get from the call</h3>
              {["A clear picture of where your pipeline is leaking", "An honest assessment of your ICP and messaging", "Specific recommendations on the highest-leverage changes", "A custom action plan sent within 24 hours after the call"].map((item, i) => (
                <div key={i} className="flex gap-3 mb-4">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>{i + 1}</span>
                  <p className="text-sm" style={{ color: "#52525B" }}>{item}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-6" style={{ backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.3)" }}>
              <blockquote className="text-base font-semibold leading-relaxed mb-3" style={{ color: "#0a0a0a" }}>
                &ldquo;Stop treating outbound like an art form. Build it like a software product.&rdquo;
              </blockquote>
              <cite className="text-sm not-italic" style={{ color: "#71675E" }}>- Tejas Jhaveri, Founder · TEDx Speaker · IIT/IIM Educator</cite>
            </div>

            <div className="rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
              <h3 className="text-base font-black mb-2" style={{ color: "#0a0a0a" }}>130+ B2B companies helped</h3>
              <p className="text-sm" style={{ color: "#52525B" }}>12K+ meetings booked · $120M+ pipeline generated across clients · 35% average LinkedIn reply rate</p>
            </div>
          </div>
        </div></FadeIn>
      </section>
    </InnerLayout>
  );
}
