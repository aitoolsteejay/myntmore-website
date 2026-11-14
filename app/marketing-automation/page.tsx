import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../components/InnerLayout";
import LeadCaptureForm from "../components/LeadCaptureForm";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema, buildServiceSchema, SITE_URL } from "@/lib/schema";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const PAGE_URL = `${SITE_URL}/marketing-automation`;
const BREADCRUMBS = buildBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Marketing Automation", url: PAGE_URL },
]);
const SERVICE_SCHEMA = buildServiceSchema({
  name: "B2B Marketing Automation Services",
  description: "AI-powered marketing automation for B2B: outbound sequences, email automation, and lead nurturing that runs 24/7.",
  serviceType: "Marketing Automation",
  url: PAGE_URL,
});

export const metadata: Metadata = withPageSeo("/marketing-automation", {
  title: "B2B Marketing Automation Services",
  description: "AI-powered marketing automation for B2B: outbound sequences, email automation, and lead nurturing that runs 24/7. Book a free automation audit.",
  alternates: { canonical: PAGE_URL },
  keywords: [
    "b2b marketing automation",
    "email automation software",
    "workflow automation for sales",
    "outbound automation platform",
    "cold email automation",
    "linkedin automation tools",
    "ai lead generation automation",
    "lead scoring automation",
    "icp mapping automation",
    "sales sequence automation",
    "automated outbound campaigns",
    "b2b pipeline automation",
    "marketing automation agency",
    "ai sales workflow automation",
    "automated lead nurturing",
  ],
  openGraph: {
    ...OG_BASE,
    title: "Marketing Automation Services | Myntmore",
    description: "AI-powered marketing automation that builds your pipeline while you sleep.",
    url: PAGE_URL,
    images: ogImages("/marketing-automation"),
  },
});

const SERVICES = [
  { title: "Cold Email Automation", href: "/services/cold-email", desc: "Automated multi-step email sequences with AI personalisation, domain warmup, and deliverability management." },
  { title: "LinkedIn Automation", href: "/services/linkedin-outreach", desc: "Automated connection requests, follow-ups, and DM sequences that mimic human behaviour." },
  { title: "AI Lead Generation", href: "/services/ai-lead-generation", desc: "Custom AI agents that research, qualify, and score leads automatically 24/7." },
  { title: "ICP Mapping & Lead Scoring", href: "/services/sales-intelligence", desc: "Trigger-based prospect lists automatically updated daily based on 40+ intent signals." },
];

export default function MarketingAutomation() {
  return (
    <InnerLayout>
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={BREADCRUMBS} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Marketing Automation", href: "/marketing-automation" }]} />
          <div className="mb-4">
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>Marketing Automation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            B2B marketing automation that actually builds pipeline.
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mb-8" style={{ color: "#52525B" }}>
            We build and run AI-powered outbound automation systems for B2B companies. Email automation, LinkedIn sequences, lead scoring, and workflow automation, all running 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/book-a-call" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
              Book a Free Automation Audit
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
          <h2 className="text-3xl font-black mb-10" style={{ color: "#0a0a0a" }}>Our automation services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href} className="group block rounded-2xl border p-6 card-hover-warm" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <h3 className="text-lg font-black mb-3" style={{ color: "#0a0a0a" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#52525B" }}>{s.desc}</p>
                <span className="text-xs font-bold" style={{ color: "#A14A08" }}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[{ v: "12K+", l: "Meetings booked" }, { v: "35%", l: "Avg LinkedIn reply rate" }, { v: "98.5%", l: "Email inbox rate" }, { v: "80%", l: "Less manual research" }].map((s) => (
            <div key={s.l}>
              <div className="text-3xl font-black mb-1" style={{ color: "#0a0a0a" }}>{s.v}</div>
              <div className="text-xs" style={{ color: "#71675E" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <LeadCaptureForm title="Let's automate your B2B pipeline" subtitle="Book a free audit and we'll show you exactly which automation levers will move your pipeline." />
    </InnerLayout>
  );
}
