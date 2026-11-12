import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import LeadCaptureForm from "@/app/components/LeadCaptureForm";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import JsonLd from "@/app/components/JsonLd";
import { buildFaqSchema, buildLocalBusinessSchema } from "@/lib/schema";
import { pageFaqsQA } from "@/lib/page-faqs";
import type { CityPageData } from "./city-page-data";

// One template for the B2B lead generation city pages (/b2b-lead-generation-<city>). The text comes from
// content/city-pages/<slug>.json; the markup below is what each page used to carry.

// Renders a short note where [label](/path) becomes a link in the site's usual link style.
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return m ? (
          <Link key={i} href={m[2]} className="font-bold underline" style={{ color: "#A14A08" }}>
            {m[1]}
          </Link>
        ) : (
          part
        );
      })}
    </>
  );
}

export default function CityPage({ data: d }: { data: CityPageData }) {
  const FAQ = pageFaqsQA(`city-${d.slug}`);
  return (
    <InnerLayout>
      <JsonLd data={buildFaqSchema(FAQ.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={buildLocalBusinessSchema(`https://www.myntmore.com/b2b-lead-generation-${d.slug}`)} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: d.breadcrumbLabel, href: `/b2b-lead-generation-${d.slug}` }]} />
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
              {d.badge}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            {d.h1}
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mb-8" style={{ color: "#52525B" }}>
            {d.intro}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/book-a-call" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
              {d.primaryCta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <Link href="/services" className="btn-ghost px-8 py-4 text-base font-bold inline-flex items-center gap-2">
              {d.secondaryCta}
            </Link>
          </div>
        </div>
      </section>


      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-10" style={{ color: "#0a0a0a" }}>{d.whyTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {d.why.map((item) => (
              <div key={item.title} className="rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <h3 className="text-base font-black mb-3" style={{ color: "#0a0a0a" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {d.proof.length > 0 && (
        <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{d.proofTitle}</h2>
            <p className="text-base mb-10" style={{ color: "#52525B" }}>{d.proofIntro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {d.proof.map((p) => (
                <Link key={p.href} href={p.href} className="group flex flex-col rounded-2xl border p-5 transition-all duration-200 hover:shadow-md" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <span className="text-xs font-black uppercase tracking-[0.18em] mb-2" style={{ color: "#A14A08" }}>Case study</span>
                  <h3 className="text-base font-black mb-2 group-hover:underline" style={{ color: "#0a0a0a" }}>{p.label}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{p.result}</p>
                </Link>
              ))}
            </div>
            <p className="text-sm mt-6" style={{ color: "#52525B" }}><Rich text={d.proofNote} /></p>
          </div>
        </section>
      )}

      {d.segments.length > 0 && (
        <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{d.segmentsTitle}</h2>
            <p className="text-base mb-10" style={{ color: "#52525B" }}>{d.segmentsIntro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {d.segments.map((item) => (
                <div key={item.title} className="rounded-2xl border p-6" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <h3 className="text-base font-black mb-3" style={{ color: "#0a0a0a" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm mt-6" style={{ color: "#52525B" }}><Rich text={d.segmentsNote} /></p>
          </div>
        </section>
      )}

      {d.healthcareBuyers.length > 0 && (
        <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{d.healthcareTitle}</h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>
              {d.healthcareIntro}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {d.healthcareBuyers.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-2xl border p-4 text-sm" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9", color: "#3D3D3D" }}>
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: "#A14A08" }} />
                  {b}
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}><Rich text={d.healthcareNote} /></p>
          </div>
        </section>
      )}

      {d.steps.length > 0 && (
        <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-10" style={{ color: "#0a0a0a" }}>{d.stepsTitle}</h2>
            <ol className="space-y-4">
              {d.steps.map((step, i) => (
                <li key={step.title} className="flex gap-4 rounded-2xl border p-5" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>{i + 1}</span>
                  <div>
                    <p className="font-bold mb-1" style={{ color: "#0a0a0a" }}>{step.title} <span className="text-sm font-semibold" style={{ color: "#A14A08" }}>· {step.when}</span></p>
                    <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-sm mt-6" style={{ color: "#52525B" }}><Rich text={d.stepsNote} /></p>
          </div>
        </section>
      )}

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{d.servicesTitle}</h2>
          <p className="text-base mb-10" style={{ color: "#52525B" }}>{d.servicesIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {d.services.map((s) => (
              <Link key={s.href} href={s.href} className="group rounded-2xl border p-5 transition-all duration-200 hover:shadow-md" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                <h3 className="text-sm font-black mb-1.5 flex items-center justify-between" style={{ color: "#0a0a0a" }}>
                  {s.title}
                  <svg className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="#71675E" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#52525B" }}>{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-10" style={{ color: "#0a0a0a" }}>{d.diffTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {d.differentiators.map((d) => (
              <div key={d} className="flex items-start gap-3 rounded-2xl border p-5" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "rgba(245,183,49,0.12)" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="#D97706" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
                <span className="text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-10" style={{ color: "#0a0a0a" }}>Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-2xl border p-6" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                <h3 className="text-base font-black mb-2" style={{ color: "#0a0a0a" }}>{item.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LeadCaptureForm title={d.formTitle} subtitle={d.formSubtitle} />
    </InnerLayout>
  );
}
