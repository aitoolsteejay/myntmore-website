import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CopyBlock from "@/app/components/CopyBlock";
import FadeIn from "@/app/components/FadeIn";
import JsonLd from "@/app/components/JsonLd";
import ArticleMeta from "@/app/components/ArticleMeta";
import Faq from "@/app/lp/Faq";
import Underline from "@/app/resources/guides/how-to-set-up-vibe-prospecting/Underline";
import { buildArticleSchema, buildHowToSchema } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import { pageFaqs } from "@/lib/page-faqs";

// One layout for the step-by-step tool setup guides (/resources/guides/<tool>-setup): a hero, the
// numbers the setup is built around, numbered steps with copy-ready records or settings, a pre-launch
// checklist, FAQs (content/faqs/pages/guide-<slug>.json), related reading and a call to action.
// Each guide page passes its own text; this file only lays it out.

export interface SetupStep {
  title: string;
  body: string[];
  copy?: { label: string; text: string }[];
  tip?: string;
}

export interface SetupGuideData {
  slug: string;
  badge: string;
  h1Lead: string;
  h1Underlined: string;
  intro: string;
  numbers: { value: string; label: string }[];
  numbersNote: string;
  steps: SetupStep[];
  checklist: string[];
  related: { label: string; href: string; note: string }[];
  cta: { heading: string; body: string; href: string; label: string };
}

const ACCENT = "#EA580C";

export default function SetupGuide({ data: d, articleSchema }: { data: SetupGuideData; articleSchema: ReturnType<typeof buildArticleSchema> }) {
  const faqs = pageFaqs(`guide-${d.slug}`);
  const howTo = buildHowToSchema(articleSchema.headline, d.steps.map((s) => ({ name: s.title, text: s.body.join(" ") })));
  return (
    <InnerLayout>
      <JsonLd data={articleSchema} />
      <JsonLd data={howTo} />

      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(234,88,12,0.16),rgba(234,88,12,0.05) 42%,transparent 70%)", pointerEvents: "none" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Guides", href: "/resources/guides" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(234,88,12,0.3)", backgroundColor: "rgba(234,88,12,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>{d.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            {d.h1Lead}{" "}
            <span className="relative inline-block">{d.h1Underlined}<Underline color="#F5B731" /></span>
          </h1>
          <ArticleMeta schema={articleSchema} />
          <p className="text-lg sm:text-xl max-w-2xl leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>{d.intro}</p>
        </div>
      </section>

      <section className="py-10 px-4 border-y" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {d.numbers.map((n) => (
              <div key={n.label} className="text-center">
                <div className="text-3xl font-black" style={{ color: "#A14A08" }}>{n.value}</div>
                <div className="text-xs mt-1" style={{ color: "#71675E" }}>{n.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-6" style={{ color: "#71675E" }}>{d.numbersNote}</p>
        </div>
      </section>

      <article className="py-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto space-y-14">
          {d.steps.map((s, i) => (
            <FadeIn key={s.title}>
              <section>
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: textTone(ACCENT) }}>Step {String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-4" style={{ color: "#0a0a0a" }}>{s.title}</h2>
                <div className="space-y-4">
                  {s.body.map((p) => (
                    <p key={p.slice(0, 40)} className="text-base leading-relaxed" style={{ color: "#52525B" }}>{p}</p>
                  ))}
                </div>
                {s.copy && (
                  <div className="space-y-4 mt-6">
                    {s.copy.map((c) => (
                      <CopyBlock key={c.label} text={c.text} accent={ACCENT} label={c.label} successMessage="Copied to clipboard" />
                    ))}
                  </div>
                )}
                {s.tip && (
                  <p className="mt-6 rounded-xl border px-4 py-3 text-sm leading-relaxed" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.35)", color: "#3D3D3D" }}>
                    <strong>Tip:</strong> {s.tip}
                  </p>
                )}
              </section>
            </FadeIn>
          ))}

          <FadeIn>
            <section className="rounded-2xl border p-6 sm:p-8" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
              <h2 className="text-2xl font-black mb-5" style={{ color: "#0a0a0a" }}>Before you send a live email</h2>
              <ul className="space-y-3">
                {d.checklist.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>
                    <span aria-hidden="true" className="mt-0.5 font-black" style={{ color: ACCENT }}>✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>
        </div>
      </article>

      <Faq badge="FAQ" title="Common questions" items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />

      <section className="py-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto space-y-14">
          <FadeIn>
            <section>
              <h2 className="text-2xl font-black mb-5" style={{ color: "#0a0a0a" }}>Read next</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {d.related.map((r) => (
                  <Link key={r.href} href={r.href} className="group block rounded-xl border p-4 transition-colors duration-150 hover:border-[#EA580C]" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                    <p className="text-sm font-black mb-1" style={{ color: "#0a0a0a" }}>{r.label} <span aria-hidden="true" style={{ color: ACCENT }}>&rarr;</span></p>
                    <p className="text-xs leading-relaxed" style={{ color: "#52525B" }}>{r.note}</p>
                  </Link>
                ))}
              </div>
            </section>
          </FadeIn>
          <FadeIn>
            <section className="rounded-2xl p-8 sm:p-10 text-center border" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)" }}>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>Rather not set it up yourself?</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] mt-3 mb-4">{d.cta.heading}</h2>
              <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#52525B" }}>{d.cta.body}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={d.cta.href} className="btn-dark px-8 py-4 text-sm font-bold">{d.cta.label}</Link>
                <a href="/book-a-call" className="px-8 py-4 text-sm font-bold rounded-full border transition-colors hover:bg-[#F8F6F2]" style={{ color: "#0A0A0A", borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>Book a Free Audit</a>
              </div>
            </section>
          </FadeIn>
        </div>
      </section>
    </InnerLayout>
  );
}
