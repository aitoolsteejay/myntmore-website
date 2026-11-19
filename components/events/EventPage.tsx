import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import JsonLd from "@/app/components/JsonLd";
import { buildEventSchema, SITE_URL } from "@/lib/schema";
import { eventBySlug, isUpcoming } from "@/lib/events-data";

// One template for every event detail page (/events/<slug>). The text comes from content/events/<slug>.json,
// edited in the Keystatic admin ("Events"); scripts/generate-event-pages.mjs writes the thin page that renders this.
// Before the event ends it shows the registration link; afterwards, the recording link if there is one.

// "#8b5cf6" + 0.22 -> "rgba(139,92,246,0.22)", for the soft background glow in the event's colour.
const rgba = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

const Arrow = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
);

export default function EventPage({ slug }: { slug: string }) {
  const e = eventBySlug(slug);
  const url = `${SITE_URL}/events/${e.slug}`;
  const upcoming = isUpcoming(e);
  const cta = upcoming
    ? e.registrationUrl ? { href: e.registrationUrl, label: "Register Free" } : null
    : e.recordingUrl ? { href: e.recordingUrl, label: "Get the Recording" } : null;
  const badge = upcoming ? `${e.tag} · ${e.format.split(" · ")[0]}` : e.recordingUrl ? "Webinar Recording · On-Demand" : "Past Event";
  const schema = buildEventSchema({ name: e.title, description: e.longDescription, url, startDate: e.isoStartDateTime, endDate: e.isoEndDateTime });

  return (
    <InnerLayout>
      <JsonLd data={schema} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "650px", height: "650px", borderRadius: "50%", background: `radial-gradient(circle, ${rgba(e.accent, 0.22)} 0%, ${rgba(e.accent, 0.08)} 40%, transparent 68%)`, filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.22) 0%, rgba(255,160,0,0.09) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Events", href: "/events" }, { label: e.breadcrumbLabel, href: `/events/${e.slug}` }]} />

          <span className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: rgba(e.accent, 0.08), color: e.accent, border: `1px solid ${rgba(e.accent, 0.2)}` }}>
            {badge}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            {e.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 text-sm font-semibold" style={{ color: "#3D3D3D" }}>
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={e.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {e.longDate}
            </span>
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={e.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {e.time}
            </span>
          </div>

          <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: "#52525B" }}>
            {e.longDescription}
          </p>

          {cta && (
            <a href={cta.href} target="_blank" rel="noopener noreferrer" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
              {cta.label}
              <Arrow />
            </a>
          )}
        </div>
      </section>

      {e.topics.length > 0 && (
        <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>What we&apos;ll cover</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {e.topics.map((t) => (
                <div key={t} className="rounded-xl p-4 border text-sm font-semibold text-center" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9", color: "#3D3D3D" }}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {cta && (
        <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
          <div className="max-w-2xl mx-auto text-center rounded-2xl border p-10" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
            <h2 className="text-2xl font-black mb-3" style={{ color: "#0a0a0a" }}>{upcoming ? "Save your seat" : "Watch the recording"}</h2>
            <p className="text-sm mb-8" style={{ color: "#52525B" }}>
              {upcoming
                ? `Live on ${e.longDate}, ${e.time}. Register and we'll send the joining link straight to your inbox.`
                : <>Held live on {e.longDate}. Get the recording and we&apos;ll send it straight to your inbox.</>}
            </p>
            <a href={cta.href} target="_blank" rel="noopener noreferrer" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
              {cta.label}
              <Arrow />
            </a>
          </div>
        </section>
      )}

      <section className="py-10 px-4 border-t text-center" style={{ borderColor: "#E8E2D9" }}>
        <Link href="/events" className="text-sm font-bold" style={{ color: e.accent }}>&larr; Back to all events</Link>
      </section>
    </InnerLayout>
  );
}
