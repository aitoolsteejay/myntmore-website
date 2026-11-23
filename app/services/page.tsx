import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../components/InnerLayout";
import LeadCaptureForm from "../components/LeadCaptureForm";
import StatTicker from "../components/StatTicker";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildFaqSchema } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import { pageFaqsQA } from "@/lib/page-faqs";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";
import servicesHub from "@/content/site-copy/services.json";
import RichText from "@/components/RichText";

export const metadata: Metadata = withPageSeo("/services", {
  title: "AI-Powered B2B Lead Generation Services",
  description: "Seven productized B2B growth services: LinkedIn, Cold Email, ICP Mapping, AI Lead Gen, ABM, Personal Branding, GTM Strategy. Book a free audit.",
  alternates: { canonical: "https://www.myntmore.com/services" },
  keywords: ["b2b lead generation agency", "b2b lead generation services", "outbound marketing agency", "b2b lead generation agency mumbai", "ai lead generation company", "linkedin outreach and cold email agency", "account based marketing agency", "icp mapping and lead scoring services", "b2b growth agency", "b2b demand generation agency", "outbound sales agency for saas", "lead generation agency vs in-house sdr team", "how to generate b2b leads without cold calling", "b2b sales pipeline agency", "personal branding and linkedin ghostwriting agency", "productized b2b lead generation services", "gtm strategy agency"],
  openGraph: {
    ...OG_BASE,
    title: "B2B Lead Generation Services | AI-Powered Outbound | Myntmore",
    description: "Seven productized B2B growth services. We build the architecture, you close the deals.",
    url: "https://www.myntmore.com/services",
    images: ogImages("/services"),
  },
});

// The service cards are edited in the admin (Services overview page); each card's number, hover style
// and colour stay here, in order.
const copy = servicesHub;
const LOOKS = [
  { number: "01", hoverClass: "card-hover-linkedin", accentColor: "#0077b5" },
  { number: "02", hoverClass: "card-hover-green", accentColor: "#16a34a" },
  { number: "03", hoverClass: "card-hover-purple", accentColor: "#a855f7" },
  { number: "04", hoverClass: "card-hover-blue", accentColor: "#3b82f6" },
  { number: "05", hoverClass: "card-hover-indigo", accentColor: "#6366f1" },
  { number: "06", hoverClass: "card-hover-warm", accentColor: "#D97706" },
  { number: "07", hoverClass: "card-hover-teal", accentColor: "#0891b2" },
];
const SERVICES = copy.services.map((c, i) => ({
  ...LOOKS[i % LOOKS.length],
  title: c.title,
  tagline: c.tagline,
  desc: c.description,
  href: c.href,
  stats: c.stats.map((st) => ({ v: st.value, l: st.label })),
}));

const FAQ = pageFaqsQA("service-overview");

export default function Services() {
  return (
    <InnerLayout>
      <JsonLd data={buildFaqSchema(FAQ.map((f) => ({ question: f.q, answer: f.a })))} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
          <div className="mb-4">
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
              {copy.badge}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            {copy.headingLine1}<br />{copy.headingLine2}
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl" style={{ color: "#52525B" }}>
            {copy.intro}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {SERVICES.map((s) => (
            <Link key={s.href} href={s.href} className={`group block rounded-2xl border p-8 ${s.hoverClass}`} style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-black" style={{ color: textTone(s.accentColor) }}>{s.number}</span>
                    <h2 className="text-xl font-black" style={{ color: "#0a0a0a" }}>{s.title}</h2>
                  </div>
                  <p className="text-sm font-semibold mb-3" style={{ color: textTone(s.accentColor) }}>{s.tagline}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{s.desc}</p>
                  <div className="flex gap-6 mt-4">
                    {s.stats.map((st) => (
                      <div key={st.l}>
                        <StatTicker value={st.v} className="text-xl font-black" style={{ color: "#0a0a0a" }} />
                        <span className="block text-xs" style={{ color: "#71675E" }}>{st.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <svg className="w-5 h-5 flex-shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#B8B0A7" }}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-10" style={{ color: "#0a0a0a" }}>{copy.faqHeading}</h2>
          <div className="space-y-6">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <h3 className="text-base font-bold mb-3" style={{ color: "#0a0a0a" }}>{item.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Lead Generation Hubs */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
              {copy.locationsBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-2" style={{ color: "#0a0a0a" }}>
              {copy.locationsHeading}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#52525B" }}>
              <RichText text={copy.locationsText} linkClassName="underline underline-offset-2" />
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {copy.cities.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="p-4 rounded-xl border bg-white hover:border-[#F5B731] transition-all group block shadow-xs"
                style={{ borderColor: "#E8E2D9" }}
              >
                <div className="text-sm font-bold text-[#0A0A0A] group-hover:text-[#A14A08] transition-colors">
                  {c.city}
                </div>
                <div className="text-xs text-[#71675E] mt-0.5">
                  {c.blurb}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LeadCaptureForm />
    </InnerLayout>
  );
}
