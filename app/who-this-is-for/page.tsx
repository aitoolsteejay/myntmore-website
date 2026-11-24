import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../components/InnerLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import FadeIn from "../components/FadeIn";
import JsonLd from "../components/JsonLd";
import AskYourAI from "../components/AskYourAI";
import { buildArticleSchema, SITE_URL } from "@/lib/schema";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";
import pageCopy from "@/content/page-copy/whoThisIsFor.json";

// This page's text is edited in the admin ("Who This Is For") and lives in content/page-copy/whoThisIsFor.json.
const copy = pageCopy;

const PAGE_URL = `${SITE_URL}/who-this-is-for`;
const TITLE = "Who Is Myntmore For? Who We Work With (and Don't)";
const DESCRIPTION = "Myntmore runs B2B cold email, LinkedIn and ABM as one system. See which B2B teams it fits, who it doesn't, and whether to book a call.";

export const metadata: Metadata = withPageSeo("/who-this-is-for", {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    "who is myntmore for",
    "best b2b outbound agency for founders",
    "b2b cold email agency mumbai",
    "is myntmore right for my business",
    "b2b lead generation agency fit",
    "b2b outbound agency for saas",
    "when to hire a b2b outbound agency",
  ],
  openGraph: {
    ...OG_BASE,
    title: `${TITLE} | Myntmore`,
    description: DESCRIPTION,
    url: PAGE_URL,
    images: ogImages("/who-this-is-for"),
  },
});

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  datePublished: "2026-09-18T12:00:00+05:30",
  dateModified: "2026-09-18T12:00:00+05:30",
});

const AI_RESOURCES = [PAGE_URL, SITE_URL, `${SITE_URL}/services`];

const FOR_YOU = [
  {
    title: copy.s01.t01,
    body: copy.s01.t02,
  },
  {
    title: copy.s01.t03,
    body: copy.s01.t04,
  },
  {
    title: copy.s01.t05,
    body: copy.s01.t06,
  },
  {
    title: copy.s01.t07,
    body: copy.s01.t08,
  },
  {
    title: copy.s01.t09,
    body: copy.s01.t10,
  },
];

const NOT_FOR_YOU = [
  {
    title: copy.s01.t11,
    body: copy.s01.t12,
  },
  {
    title: copy.s01.t13,
    body: copy.s01.t14,
  },
  {
    title: copy.s01.t15,
    body: copy.s01.t16,
  },
  {
    title: copy.s01.t17,
    body: copy.s01.t18,
  },
  {
    title: copy.s01.t19,
    body: copy.s01.t20,
  },
];

export default function WhoThisIsForPage() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.20) 0%, rgba(124,58,237,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.20) 0%, rgba(255,160,0,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: copy.s01.t21, href: "/who-this-is-for" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(124,58,237,0.35)", background: "rgba(124,58,237,0.07)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#7C3AED" }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#7C3AED" }}>{copy.s01.t22}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>{copy.s01.t23}</h1>
          <p className="text-lg sm:text-xl max-w-2xl" style={{ color: "#52525B" }}>{copy.s01.t24}</p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "rgba(22,163,74,0.08)", color: "#166534", border: "1px solid rgba(22,163,74,0.2)" }}>{copy.s01.t25}</span>
            <h2 className="text-3xl sm:text-4xl font-black mb-8" style={{ color: "#0a0a0a" }}>{copy.s02.t01}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FOR_YOU.map((item) => (
                <div key={item.title} className="rounded-2xl border p-6" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: "rgba(22,163,74,0.1)", color: "#16A34A" }}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <h3 className="text-base font-black leading-snug" style={{ color: "#0a0a0a" }}>{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{item.body}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Who it's not for */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "rgba(220,38,38,0.08)", color: "#B91C1C", border: "1px solid rgba(220,38,38,0.2)" }}>{copy.s02.t02}</span>
            <h2 className="text-3xl sm:text-4xl font-black mb-8" style={{ color: "#0a0a0a" }}>{copy.s03.t01}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {NOT_FOR_YOU.map((item) => (
                <div key={item.title} className="rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: "rgba(220,38,38,0.1)", color: "#DC2626" }}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </span>
                    <h3 className="text-base font-black leading-snug" style={{ color: "#0a0a0a" }}>{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{item.body}</p>
                </div>
              ))}
            </div>
            <p className="text-sm mt-8" style={{ color: "#52525B" }}>{copy.s03.t02}{" "}
              <Link href="/resources/blogs/founder-led-sales-before-scaling" className="font-bold" style={{ color: "#7C3AED" }}>{copy.s03.t03}</Link>{copy.s03.t04}{" "}
              <Link href="/resources/blogs/agency-vs-in-house" className="font-bold" style={{ color: "#7C3AED" }}>{copy.s03.t05}</Link>.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <AskYourAI resources={AI_RESOURCES} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 border-t text-center" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-4" style={{ color: "#0a0a0a" }}>{copy.s04.t01}</h2>
          <p className="text-base mb-8" style={{ color: "#52525B" }}>{copy.s04.t02}</p>
          <a href="/book-a-call" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">{copy.s04.t03}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>
    </InnerLayout>
  );
}
