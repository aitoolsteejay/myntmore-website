import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildEventSchema, SITE_URL } from "@/lib/schema";
import { OG_BASE } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const RECORDING_URL = "https://zfrmz.com/viRIcOyB23MftpLVyX4f";
const PAGE_URL = `${SITE_URL}/events/predictable-pipeline-webinar`;
const TITLE = "We Create 200+ Meetings Every Month Through Cold Outreach. Let's Help You Build a More Predictable Lead Pipeline.";
const DESCRIPTION = "Most businesses don't have a lead problem. They have a predictability problem. This webinar breaks down the cold outreach system Myntmore uses to create 200+ meetings every month, covering what's actually working across LinkedIn, cold email, targeting, messaging, personal branding and automation. Expect practical strategies, real experiments and proven frameworks that businesses can adapt to build a stronger, more consistent pipeline without waiting for the next lead to come in.";
// Short form for the SERP snippet; DESCRIPTION stays full-length for the
// Event schema and on-page copy.
const META_DESCRIPTION = "A free live webinar on the cold outreach system Myntmore uses to create 200+ meetings a month, across LinkedIn, cold email, targeting and automation.";

export const metadata: Metadata = withPageSeo("/events/predictable-pipeline-webinar", {
  title: "Free Webinar: Build a Predictable Lead Pipeline",
  description: META_DESCRIPTION,
  // The event ran on 2026-09-19. Noindexed rather than deleted so existing
  // links and registrations still resolve; flip this back when the page is
  // updated for the next session.
  robots: { index: false, follow: true },
  alternates: { canonical: PAGE_URL },
  openGraph: {
    ...OG_BASE,
    title: "We Create 200+ Meetings a Month Through Cold Outreach | Myntmore Webinar",
    description: "A free live webinar on the cold outreach system Myntmore uses to create 200+ meetings every month. Sep 19, 2026 · 11:30 AM – 1:00 PM IST.",
    url: PAGE_URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
});

const EVENT_SCHEMA = buildEventSchema({
  name: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  startDate: "2026-09-19T11:30:00+05:30",
  endDate: "2026-09-19T13:00:00+05:30",
});

const TOPICS = [
  "LinkedIn outreach",
  "Cold email",
  "Targeting",
  "Messaging",
  "Personal branding",
  "Automation",
];

export default function PredictablePipelineWebinar() {
  return (
    <InnerLayout>
      <JsonLd data={EVENT_SCHEMA} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(124,58,237,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.22) 0%, rgba(255,160,0,0.09) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Events", href: "/events" }, { label: "Predictable Pipeline Webinar", href: "/events/predictable-pipeline-webinar" }]} />

          <span className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: "rgba(139,92,246,0.08)", color: "#8b5cf6", border: "1px solid rgba(139,92,246,0.2)" }}>
            Webinar Recording &middot; On-Demand
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            {TITLE}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 text-sm font-semibold" style={{ color: "#3D3D3D" }}>
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#8b5cf6" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              September 19, 2026
            </span>
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#8b5cf6" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              11:30 AM – 1:00 PM IST
            </span>
          </div>

          <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: "#52525B" }}>
            {DESCRIPTION}
          </p>

          <a href={RECORDING_URL} target="_blank" rel="noopener noreferrer" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
            Get the Recording
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>What we&apos;ll cover</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {TOPICS.map((t) => (
              <div key={t} className="rounded-xl p-4 border text-sm font-semibold text-center" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9", color: "#3D3D3D" }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-2xl mx-auto text-center rounded-2xl border p-10" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
          <h2 className="text-2xl font-black mb-3" style={{ color: "#0a0a0a" }}>Watch the recording</h2>
          <p className="text-sm mb-8" style={{ color: "#52525B" }}>
            Held live on September 19, 2026. Get the recording and we&apos;ll send it straight to your inbox.
          </p>
          <a href={RECORDING_URL} target="_blank" rel="noopener noreferrer" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
            Get the Recording
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>

      <section className="py-10 px-4 border-t text-center" style={{ borderColor: "#E8E2D9" }}>
        <Link href="/events" className="text-sm font-bold" style={{ color: "#8b5cf6" }}>&larr; Back to all events</Link>
      </section>
    </InnerLayout>
  );
}
