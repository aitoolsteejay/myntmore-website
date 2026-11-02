import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ValuePropExplorer from "@/components/value-prop/ValuePropExplorer";
import { DIRECTION, FLOW, ICPS, META, SECTIONS, STATUS_GROUPS, pad } from "@/lib/value-prop";

// Internal strategy reference (the Notion value proposition template for all 29 ICPs).
// Unlisted: noindex, not in the sitemap or any nav, and kept off /site-audit
// (see isPrivate in scripts/generate-site-map.mjs). Its priorities and pricing notes are
// hypotheses the source itself says must not be presented externally as facts.
export const metadata: Metadata = {
  title: "Value Proposition",
  description: "Customer pain, solution, benefit, proof and message, mapped for all 29 ICPs, with the provisional 2026 ICP direction.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.myntmore.com/value-prop" },
};

const INK = "#0A0A0A";
const BODY = "#52525B";
const MUTED = "#71675E";
const LINE = "#E8E2D9";

const NOTES = SECTIONS.flatMap((s) =>
  [
    s.openingNote && { section: s, where: "Opening note", text: s.openingNote },
    s.closingNote && { section: s, where: "Closing note", text: s.closingNote },
  ].filter((n): n is { section: (typeof SECTIONS)[number]; where: string; text: string } => !!n),
).sort((a, b) => (a.section.number === 8 ? -1 : b.section.number === 8 ? 1 : a.section.number - b.section.number));

function Disclosure({ title, meta, children }: { title: string; meta: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-2xl border bg-white" style={{ borderColor: LINE }}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block text-sm font-bold" style={{ color: INK }}>
            {title}
          </span>
          <span className="block text-xs" style={{ color: MUTED }}>
            {meta}
          </span>
        </span>
        <span aria-hidden="true" className="text-lg transition-transform group-open:rotate-45" style={{ color: MUTED }}>
          +
        </span>
      </summary>
      <div className="border-t px-5 pb-6 pt-5 sm:px-6" style={{ borderColor: LINE }}>
        {children}
      </div>
    </details>
  );
}

export default function ValuePropPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#F8F6F2" }}>
      <main id="main-content" className="pb-24">
        {/* Intro. As the first section in <main> it gets the sitewide hero glow (globals.css). */}
        <section className="pb-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <header className="flex items-center justify-between py-5">
              <Link href="/" aria-label="Myntmore home">
                <Image src="/logo.png" alt="Myntmore" width={200} height={56} className="h-9 w-auto object-contain" priority />
              </Link>
              <span className="text-xs" style={{ color: MUTED }}>
                Last edited {META.lastEdited}
              </span>
            </header>
            <div className="pt-8 sm:pt-14">
              <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "#A14A08" }}>
                Strategy
              </p>
              <h1 className="mt-3 text-4xl font-black leading-[1.05] sm:text-6xl" style={{ color: INK }}>
                Value Proposition
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: BODY }}>
                Customer pain, solution, benefit, proof and message, mapped for all 29 ICPs, with the provisional 2026 ICP direction.
              </p>

              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                {[
                  ["ICPs", META.icps],
                  ["Sections", META.sections],
                  ["Fields per ICP", META.fieldsPerIcp],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs" style={{ color: MUTED }}>
                      {k}
                    </dt>
                    <dd className="text-2xl font-black tabular-nums" style={{ color: INK }}>
                      {v}
                    </dd>
                  </div>
                ))}
                <div>
                  <dt className="text-xs" style={{ color: MUTED }}>
                    Source
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold" style={{ color: INK }}>
                    {META.source}
                  </dd>
                </div>
              </dl>

              <div className="mt-10">
                <p className="text-xs" style={{ color: MUTED }}>
                  This framework helps translate
                </p>
                <ol className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2">
                  {FLOW.map((step, i) => (
                    <li key={step} className="flex items-center gap-2">
                      <span className="rounded-full border bg-white px-3 py-1 text-sm font-semibold" style={{ borderColor: LINE, color: INK }}>
                        {step}
                      </span>
                      {i < FLOW.length - 1 && (
                        <span aria-hidden="true" style={{ color: "#C9BFB2" }}>
                          →
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* 2026 direction */}
          <section className="mt-8" aria-labelledby="direction-title">
            <h2 id="direction-title" className="text-2xl font-black sm:text-3xl" style={{ color: INK }}>
              2026 ICP direction
            </h2>
            <p className="mt-1 text-sm" style={{ color: MUTED }}>
              Provisional, to validate against campaign/CRM results.
            </p>

            <div className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
              {STATUS_GROUPS.map((g) => (
                <div key={g.group}>
                  <p className="flex items-center gap-2 border-b pb-2 text-xs font-bold uppercase tracking-wider" style={{ borderColor: LINE, color: g.text }}>
                    <span
                      aria-hidden="true"
                      className="inline-block h-2 w-2 rounded-full"
                      style={g.group === "deprioritised" ? { border: `1.5px solid ${g.color}` } : { background: g.color }}
                    />
                    {g.title}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {ICPS.filter((i) => i.status.group === g.group).map((i) => (
                      <li key={i.number}>
                        <a href={`#icp-${pad(i.number)}`} className="group flex items-baseline gap-2 py-0.5 text-[13px] leading-snug" style={{ color: BODY }}>
                          <span className="tabular-nums text-[11px]" style={{ color: MUTED }}>
                            {pad(i.number)}
                          </span>
                          <span className="group-hover:underline">
                            {i.name}
                            {i.status.parent && (
                              <span className="ml-1 whitespace-nowrap text-[11px]" style={{ color: MUTED }}>
                                under ICP {i.status.parent}
                              </span>
                            )}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <Disclosure title="The full direction" meta="Which ICPs to focus, retain, test, fold in or pause, and why">
                <p className="max-w-3xl text-[15px] leading-relaxed" style={{ color: BODY }}>
                  {DIRECTION.text}
                </p>
              </Disclosure>
              <Disclosure title="Read before use: notes, terms and safeguards" meta="These apply to every ICP profile below">
                <ul className="space-y-5">
                  {NOTES.map((n) => (
                    <li key={`${n.section.number}-${n.where}`} className="grid gap-1 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-6">
                      <p className="text-xs" style={{ color: MUTED }}>
                        <span className="font-bold" style={{ color: INK }}>
                          Section {pad(n.section.number)}
                        </span>{" "}
                        · {n.section.title} · {n.where}
                      </p>
                      <p className="text-[15px] leading-relaxed" style={{ color: BODY }}>
                        {n.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </Disclosure>
            </div>
          </section>

          {/* Profiles */}
          <section className="mt-16" aria-labelledby="profiles-title">
            <h2 id="profiles-title" className="mb-5 text-2xl font-black sm:text-3xl" style={{ color: INK }}>
              The 29 ICP profiles
            </h2>
            <ValuePropExplorer />
          </section>

          {/* Field guide */}
          <section className="mt-16">
            <Disclosure title="Field guide: what each field answers" meta={`${META.fieldsPerIcp} fields in ${META.sections} sections`}>
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {SECTIONS.map((s) => (
                  <div key={s.number}>
                    <p className="text-sm font-black" style={{ color: INK }}>
                      <span className="mr-2 tabular-nums text-xs" style={{ color: "#A14A08" }}>
                        {pad(s.number)}
                      </span>
                      {s.title}
                    </p>
                    <dl className="mt-2 space-y-2">
                      {s.fields.map((f) => (
                        <div key={f.key}>
                          <dt className="text-[13px] font-semibold" style={{ color: INK }}>
                            {f.label}
                          </dt>
                          <dd className="text-[13px]" style={{ color: MUTED }}>
                            {f.hint}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </Disclosure>
          </section>
        </div>
      </main>

      <footer className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-6 text-xs sm:px-6" style={{ color: MUTED }}>
          <span>Myntmore · Value Proposition</span>
          <span>
            {META.source} · Last edited {META.lastEdited}
          </span>
        </div>
      </footer>
    </div>
  );
}
