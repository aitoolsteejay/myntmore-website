import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import LeadCaptureForm from "@/app/components/LeadCaptureForm";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import JsonLd from "@/app/components/JsonLd";
import FadeIn from "@/app/components/FadeIn";
import FredokaLabels from "@/app/components/FredokaLabels";
import { buildFaqSchema, buildCityServiceSchema } from "@/lib/schema";
import { pageFaqsQA } from "@/lib/page-faqs";
import type { CityPageData } from "./city-page-data";

// One template for the B2B lead generation city pages (/b2b-lead-generation-<city>). The text comes from
// content/city-pages/<slug>.json. The motion reuses the site kit in app/globals.css (hero-fade, lp-float-icon,
// lp-card, lp-icon-bob, marquee-track, FadeIn's .reveal), which the reduced-motion block there already switches off.

const ACCENT = "#A14A08";
const INK = "#0a0a0a";
const MUTED = "#52525B";
const LINE = "#E8E2D9";
const CREAM = "#F8F6F2";

// Where the hero's floating emojis sit. xl and up only: below 1280px the side margins beside the
// max-w-4xl column are too narrow and the emojis would cover the breadcrumb and intro.
const FLOATERS = [
  { top: "20%", side: "left", offset: "5%", size: "text-5xl", delay: "0.2s", rot: "-8deg" },
  { top: "66%", side: "left", offset: "3%", size: "text-4xl", delay: "1.6s", rot: "6deg" },
  { top: "24%", side: "right", offset: "5%", size: "text-5xl", delay: "0.9s", rot: "10deg" },
  { top: "68%", side: "right", offset: "7%", size: "text-4xl", delay: "2.3s", rot: "-6deg" },
] as const;

// Renders a short note where [label](/path) becomes a link in the site's usual link style.
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return m ? (
          <Link key={i} href={m[2]} className="font-bold underline" style={{ color: ACCENT }}>
            {m[1]}
          </Link>
        ) : (
          part
        );
      })}
    </>
  );
}

// The headline figure of a case study result ("16", "₹48 lakh", "2.1x"), shown large on its card.
function headlineFigure(result: string): string | null {
  const m = result.match(/₹[\d.,]+ (?:lakh|crore)|\$[\d.,]+[MK]?|\d+(?:\.\d+)?x\b|\d[\d,]*\+?%?/);
  return m ? m[0] : null;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
      {children}
    </p>
  );
}

export default function CityPage({ data: d }: { data: CityPageData }) {
  const FAQ = pageFaqsQA(`city-${d.slug}`);
  const city = d.breadcrumbLabel;
  const floats = d.floatingIcons ?? [];
  const hubs = d.hubs ?? [];
  return (
    <FredokaLabels>
      <InnerLayout>
        <JsonLd data={buildFaqSchema(FAQ.map((f) => ({ question: f.q, answer: f.a })))} />
        <JsonLd data={buildCityServiceSchema({ name: d.h1, description: d.metaDescription, url: `https://www.myntmore.com/b2b-lead-generation-${d.slug}`, city, country: d.country })} />

        <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: CREAM }}>
          {FLOATERS.slice(0, floats.length).map((f, i) => (
            <span
              key={i}
              className={`lp-float-icon lp-pop-in hidden xl:block ${f.size}`}
              aria-hidden="true"
              style={{ top: f.top, [f.side]: f.offset, animationDelay: f.delay, "--lp-rot": f.rot } as CSSProperties}
            >
              {floats[i]}
            </span>
          ))}
          <div className="relative max-w-4xl mx-auto">
            <Breadcrumbs items={[{ label: city, href: `/b2b-lead-generation-${d.slug}` }]} />
            <div className="mb-5 hero-fade">
              <span className="lp-pop-in inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3.5 py-2 rounded-full" style={{ backgroundColor: "#FEF9EC", color: ACCENT, border: "1px solid rgba(245,183,49,0.35)" }}>
                {d.emoji && <span className="text-base leading-none" aria-hidden="true">{d.emoji}</span>}
                {d.badge}
              </span>
            </div>
            <h1 className="hero-fade-d1 text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: INK }}>
              {d.h1}
            </h1>
            <p className="hero-fade-d2 text-lg sm:text-xl max-w-2xl mb-8" style={{ color: MUTED }}>
              {d.intro}
            </p>
            <div className="hero-fade-d3 flex flex-col sm:flex-row gap-4">
              <a href="/book-a-call" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2">
                {d.primaryCta}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <Link href="/services" className="btn-ghost px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2">
                {d.secondaryCta}
              </Link>
            </div>
          </div>
        </section>

        {hubs.length > 0 && (
          <section aria-label={`Business hubs we reach in ${city}`} className="border-y py-5 overflow-hidden" style={{ backgroundColor: "#FEF9EC", borderColor: LINE }}>
            <p className="px-4 mb-3 text-center text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>
              Reaching buyers across {city}
            </p>
            <div className="marquee-track" style={{ animationDuration: `${Math.max(24, hubs.length * 5)}s` }}>
              {[0, 1, 2, 3].map((copy) => (
                <ul key={copy} className="flex items-center gap-3 pr-3" aria-hidden={copy > 0 ? true : undefined}>
                  {hubs.map((h) => (
                    <li key={h} className="lp-pill whitespace-nowrap text-sm font-bold px-4 py-2 rounded-full border" style={{ backgroundColor: "#ffffff", borderColor: "rgba(245,183,49,0.35)", color: "#3D3D3D" }}>
                      <span aria-hidden="true">📍 </span>{h}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </section>
        )}

        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <Eyebrow>{d.emoji ? `${d.emoji} ` : ""}The local picture</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-black mb-10" style={{ color: INK }}>{d.whyTitle}</h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {d.why.map((item, i) => (
                <FadeIn key={item.title} delay={i * 110}>
                  <div className="lp-card h-full rounded-2xl border p-7" style={{ backgroundColor: "#ffffff", borderColor: LINE }}>
                    {item.icon && <div className="text-4xl mb-4 lp-icon-bob" style={{ animationDelay: `${i * 0.3}s` }} aria-hidden="true">{item.icon}</div>}
                    <h3 className="text-base font-black mb-3" style={{ color: INK }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {d.proof.length > 0 && (
          <section className="py-20 px-4 border-t" style={{ borderColor: LINE, backgroundColor: "#ffffff" }}>
            <div className="max-w-5xl mx-auto">
              <FadeIn>
                <Eyebrow>📈 Results</Eyebrow>
                <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: INK }}>{d.proofTitle}</h2>
                <p className="text-base mb-10 max-w-2xl" style={{ color: MUTED }}>{d.proofIntro}</p>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {d.proof.map((p, i) => {
                  const figure = headlineFigure(p.result);
                  return (
                    <FadeIn key={p.href} delay={i * 100}>
                      <Link href={p.href} className="lp-card group flex h-full flex-col rounded-2xl border p-6" style={{ backgroundColor: CREAM, borderColor: LINE }}>
                        <div className="flex items-baseline justify-between gap-4 mb-3">
                          {figure && <span className="lp-card-number text-4xl font-black leading-none" style={{ color: ACCENT }}>{figure}</span>}
                          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#71675E" }}>Case study</span>
                        </div>
                        <h3 className="text-base font-black mb-2 group-hover:underline" style={{ color: INK }}>{p.label}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{p.result}</p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: ACCENT }}>
                          Read the case study
                          <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </span>
                      </Link>
                    </FadeIn>
                  );
                })}
              </div>
              <p className="text-sm mt-6" style={{ color: MUTED }}><Rich text={d.proofNote} /></p>
            </div>
          </section>
        )}

        {d.segments.length > 0 && (
          <section className="py-20 px-4 border-t" style={{ borderColor: LINE }}>
            <div className="max-w-5xl mx-auto">
              <FadeIn>
                <Eyebrow>🎯 Who it is for</Eyebrow>
                <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: INK }}>{d.segmentsTitle}</h2>
                <p className="text-base mb-10 max-w-2xl" style={{ color: MUTED }}>{d.segmentsIntro}</p>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {d.segments.map((item, i) => (
                  <FadeIn key={item.title} delay={i * 110}>
                    <div className="lp-card h-full rounded-2xl border p-7" style={{ backgroundColor: "#ffffff", borderColor: LINE }}>
                      {item.icon && (
                        <div className="w-14 h-14 mb-5 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.3)" }} aria-hidden="true">
                          <span className="lp-icon-bob" style={{ animationDelay: `${i * 0.35}s` }}>{item.icon}</span>
                        </div>
                      )}
                      <h3 className="text-base font-black mb-3" style={{ color: INK }}>{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{item.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <p className="text-sm mt-6" style={{ color: MUTED }}><Rich text={d.segmentsNote} /></p>
            </div>
          </section>
        )}

        {d.healthcareBuyers.length > 0 && (
          <section className="py-20 px-4 border-t" style={{ borderColor: LINE, backgroundColor: "#ffffff" }}>
            <div className="max-w-4xl mx-auto">
              <FadeIn>
                <Eyebrow>🏥 Healthcare buyers</Eyebrow>
                <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: INK }}>{d.healthcareTitle}</h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: MUTED }}>{d.healthcareIntro}</p>
              </FadeIn>
              <FadeIn>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {d.healthcareBuyers.map((b) => (
                    <li key={b} className="lp-card flex items-start gap-3 rounded-2xl border p-4 text-sm h-full" style={{ backgroundColor: CREAM, borderColor: LINE, color: "#3D3D3D" }}>
                      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: ACCENT }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}><Rich text={d.healthcareNote} /></p>
            </div>
          </section>
        )}

        {d.steps.length > 0 && (
          <section className="py-20 px-4 border-t" style={{ borderColor: LINE, backgroundColor: "#ffffff" }}>
            <div className="max-w-3xl mx-auto">
              <FadeIn>
                <Eyebrow>⏱️ The first 8 weeks</Eyebrow>
                <h2 className="text-3xl sm:text-4xl font-black mb-10" style={{ color: INK }}>{d.stepsTitle}</h2>
              </FadeIn>
              <ol className="relative">
                <span aria-hidden="true" className="absolute left-5 top-2 bottom-2 w-px" style={{ background: "linear-gradient(to bottom, rgba(245,183,49,0.7), rgba(245,183,49,0.1))" }} />
                {d.steps.map((step, i) => (
                  <li key={step.title} className="relative pl-16 pb-8 last:pb-0">
                    {/* Outside FadeIn: its transform would make it the circle's positioning box. */}
                    <span className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black" style={{ backgroundColor: "#FEF9EC", color: ACCENT, border: "1.5px solid rgba(245,183,49,0.55)" }}>
                      {i + 1}
                    </span>
                    <FadeIn delay={i * 120}>
                      <div className="lp-card rounded-2xl border p-5" style={{ backgroundColor: CREAM, borderColor: LINE }}>
                        <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: ACCENT }}>{step.when}</p>
                        <p className="font-black mb-1.5" style={{ color: INK }}>{step.title}</p>
                        <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{step.desc}</p>
                      </div>
                    </FadeIn>
                  </li>
                ))}
              </ol>
              <p className="text-sm mt-8" style={{ color: MUTED }}><Rich text={d.stepsNote} /></p>
            </div>
          </section>
        )}

        <section className="py-20 px-4 border-t" style={{ borderColor: LINE }}>
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <Eyebrow>🧩 Services</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: INK }}>{d.servicesTitle}</h2>
              <p className="text-base mb-10 max-w-2xl" style={{ color: MUTED }}>{d.servicesIntro}</p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {d.services.map((s, i) => (
                <FadeIn key={s.href} delay={i * 60}>
                  <Link href={s.href} className="lp-card group flex h-full flex-col rounded-2xl border p-5" style={{ backgroundColor: "#ffffff", borderColor: LINE }}>
                    <h3 className="text-sm font-black mb-1.5 flex items-center justify-between gap-3" style={{ color: INK }}>
                      {s.title}
                      <svg className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="#71675E" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 border-t" style={{ borderColor: LINE, backgroundColor: "#ffffff" }}>
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <Eyebrow>✨ Why us</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-black mb-10" style={{ color: INK }}>{d.diffTitle}</h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {d.differentiators.map((item, i) => (
                <FadeIn key={item} delay={i * 90}>
                  <div className="lp-card flex h-full items-start gap-3 rounded-2xl border p-5" style={{ backgroundColor: CREAM, borderColor: LINE }}>
                    <span className="ce-badge w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "rgba(245,183,49,0.18)" }}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="#D97706" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 border-t" style={{ borderColor: LINE }}>
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <Eyebrow>💬 FAQ</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-black mb-8" style={{ color: INK }}>Frequently asked questions</h2>
            </FadeIn>
            <div className="space-y-3">
              {FAQ.map((item, i) => (
                <details key={item.q} className="city-faq group rounded-2xl border" style={{ backgroundColor: "#ffffff", borderColor: LINE }} open={i === 0}>
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-base font-black" style={{ color: INK }}>
                    {item.q}
                    <span aria-hidden="true" className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold transition-transform duration-300 group-open:rotate-45" style={{ backgroundColor: "#FEF9EC", color: ACCENT }}>+</span>
                  </summary>
                  <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: MUTED }}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <LeadCaptureForm title={d.formTitle} subtitle={d.formSubtitle} />
      </InnerLayout>
    </FredokaLabels>
  );
}
