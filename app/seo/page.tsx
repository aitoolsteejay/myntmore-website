import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../components/InnerLayout";
import LeadCaptureForm from "../components/LeadCaptureForm";
import Breadcrumbs from "../components/Breadcrumbs";
import { OG_BASE } from "@/lib/og";

export const metadata: Metadata = {
  title: "SEO Services Mumbai | B2B Content SEO",
  description: "SEO services for B2B companies in India. Content-led SEO that drives qualified pipeline, not just traffic. Book a free SEO audit today.",
  alternates: { canonical: "https://www.myntmore.com/seo" },
  keywords: [
    "seo services mumbai",
    "b2b seo agency",
    "content seo services",
    "search engine optimization agency",
    "b2b content marketing seo",
    "seo agency india",
    "technical seo services",
    "seo for b2b saas",
    "bottom of funnel seo",
    "content led seo strategy",
    "seo services for startups",
    "b2b organic growth strategy",
    "seo consultant mumbai",
    "pipeline focused seo",
  ],
  openGraph: {
    ...OG_BASE,
    title: "SEO Services | Myntmore",
    description: "B2B SEO that drives qualified pipeline, not just traffic.",
    url: "https://www.myntmore.com/seo",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
};

export default function SEOPage() {
  return (
    <InnerLayout>
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "SEO Services", href: "/seo" }]} />
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
              SEO & Content
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            B2B SEO that drives pipeline, not just pageviews.
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mb-8" style={{ color: "#52525B" }}>
            At Myntmore, we approach SEO as a pipeline channel, not a vanity metric game. Content that ranks for the keywords your buyers search at the bottom of the funnel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/book-a-call" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
              Get a Free SEO Audit
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <Link href="/services" className="btn-ghost px-8 py-4 text-base font-bold inline-flex items-center gap-2">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-10" style={{ color: "#0a0a0a" }}>Our approach to B2B SEO</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Bottom-of-funnel first", desc: "We target keywords your buyers search when they have a specific problem and budget, not general awareness queries that never convert." },
              { title: "Content + outbound together", desc: "Our SEO content supports your outbound campaigns. When a prospect gets your cold email and then sees you ranking for relevant searches, trust compounds." },
              { title: "Technical SEO foundation", desc: "Site speed, crawlability, structured data, canonical tags, the technical layer that lets your content actually rank and gets Google to trust your domain." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <h3 className="text-base font-black mb-3" style={{ color: "#0a0a0a" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>Explore our B2B growth resources</h2>
          <p className="text-base mb-8" style={{ color: "#52525B" }}>Free playbooks, tools, and blog articles on building B2B pipelines and growing with content.</p>
          <Link href="/resources" className="btn-dark px-6 py-3 text-sm font-bold inline-flex items-center gap-2">
            Visit Resources Hub
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      <LeadCaptureForm title="Get SEO that generates qualified meetings" subtitle="Book a free audit call and we'll show you the content opportunities in your space." />
    </InnerLayout>
  );
}
