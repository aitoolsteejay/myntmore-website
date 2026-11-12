import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../components/InnerLayout";
import FadeIn from "../components/FadeIn";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema, buildCollectionPageSchema, SITE_URL } from "@/lib/schema";
import { EVENTS, isUpcoming, type EventItem } from "@/lib/events-data";
import { textTone } from "@/lib/colors";
import { OG_BASE } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Resources", url: `${SITE_URL}/resources` },
  { name: "Events", url: `${SITE_URL}/events` },
]);

const EVENTS_PAGE_SCHEMA = [
  BREADCRUMB_SCHEMA,
  buildCollectionPageSchema({
    name: "B2B Outbound Events & Webinars",
    description: "Live sessions on cold email, LinkedIn outreach, and B2B pipeline building from the Myntmore team.",
    url: `${SITE_URL}/events`,
    itemList: EVENTS.map((e) => ({
      name: e.title,
      url: `${SITE_URL}/events/${e.slug}`,
      description: e.description,
    })),
  }),
];

export const metadata: Metadata = withPageSeo("/events", {
  title: "B2B Outbound Events & Webinars",
  description: "Live sessions on cold email, LinkedIn outreach, and B2B pipeline building from the team that has booked 12K+ meetings and generated $120M+ in pipeline.",
  alternates: { canonical: "https://www.myntmore.com/events" },
  keywords: [
    "b2b webinars",
    "cold email webinar",
    "linkedin outreach webinar",
    "b2b outbound events",
    "b2b lead generation events",
    "myntmore events",
    "b2b growth webinar india",
    "pipeline building webinar",
    "sales outbound live sessions",
    "b2b marketing events mumbai",
    "cold email masterclass",
    "linkedin growth webinar",
  ],
  openGraph: {
    ...OG_BASE,
    title: "Events & Webinars | Myntmore",
    description: "Live sessions on cold email, LinkedIn outreach, and B2B pipeline building from the Myntmore team.",
    url: "https://www.myntmore.com/events",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
});

// "Upcoming" depends on the current time, so the page is re-rendered at most hourly: without this
// an event would stay in the upcoming grid after it ended, until the next deploy.
export const revalidate = 3600;

function EventCard({ e, past }: { e: EventItem; past?: boolean }) {
  return (
    <Link href={`/events/${e.slug}`} className="group block rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
      <div className="h-1" style={{ background: `linear-gradient(90deg,${e.accent},${e.accent}66)` }} />
      <div className="p-6">
        <span className="inline-flex text-xs font-bold px-2 py-0.5 rounded-full mb-3" style={{ backgroundColor: `${e.accent}12`, color: textTone(e.accent) }}>{past ? "Recording" : e.tag}</span>
        <h2 className="text-base font-black mb-2 leading-snug" style={{ color: "#0a0a0a" }}>{e.title}</h2>
        <p className="text-xs leading-relaxed mb-4" style={{ color: "#52525B" }}>{e.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "#71675E" }}>{past ? `Held ${e.displayDate}` : <>{e.displayDate} &middot; {e.time}</>}</span>
          <span className="text-xs font-bold" style={{ color: textTone(e.accent) }}>{past ? "Watch the recording" : "Details"} &rarr;</span>
        </div>
      </div>
    </Link>
  );
}

export default function EventsPage() {
  const upcoming = EVENTS.filter(isUpcoming);
  const past = EVENTS.filter((e) => !isUpcoming(e));
  return (
    <InnerLayout>
      <JsonLd data={EVENTS_PAGE_SCHEMA} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(124,58,237,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.22) 0%, rgba(255,160,0,0.09) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: "-140px", left: "10%", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(20,184,166,0.16) 0%, rgba(13,148,136,0.06) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/resources" className="link-subtle -my-3.5 inline-flex items-center py-3.5 text-xs font-semibold">Resources</Link>
            <span style={{ color: "#E8E2D9" }}>/</span>
            <span className="text-xs font-semibold" style={{ color: "#3D3D3D" }}>Events</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade"
            style={{ borderColor: "rgba(139,92,246,0.35)", background: "rgba(139,92,246,0.07)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#8b5cf6" }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#7C3AED" }}>Events & Webinars</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            Learn what&apos;s{" "}
            <span className="relative inline-block">
              actually working
              <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="10" viewBox="0 0 320 10" preserveAspectRatio="none" aria-hidden>
                <path d="M2 7 Q80 2 160 6 Q240 10 318 5" stroke="#8b5cf6" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            in B2B outbound
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mb-10 hero-fade-d2" style={{ color: "#52525B" }}>
            Live sessions on cold email, LinkedIn outreach, and pipeline building, from the team that has booked 12K+ B2B meetings and generated $120M+ in pipeline.
          </p>
        </div>
      </section>

      <section id="events-grid" className="py-16 px-4 border-t scroll-mt-24" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          {upcoming.length > 0 ? (
            <FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((e) => <EventCard key={e.slug} e={e} />)}
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <div className="max-w-2xl mx-auto text-center rounded-2xl border p-12" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(139,92,246,0.1)" }}>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#8b5cf6" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black mb-3" style={{ color: "#0a0a0a" }}>No events scheduled right now</h2>
                <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "#52525B" }}>
                  We run these live sessions periodically, sharing what&apos;s actually moving the needle in outbound. Check back soon, or skip the wait and talk to us directly.
                </p>
                <a href="/book-a-call" className="btn-dark px-8 py-4 text-sm font-bold inline-flex items-center gap-2">
                  Book a Call
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </FadeIn>
          )}
          {past.length > 0 && (
            <div className={upcoming.length > 0 ? "mt-16" : "mt-12"}>
              <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>Past events and recordings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {past.map((e) => <EventCard key={e.slug} e={e} past />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </InnerLayout>
  );
}
