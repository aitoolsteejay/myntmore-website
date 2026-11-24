import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import FadeIn from "@/app/components/FadeIn";
import JsonLd from "@/app/components/JsonLd";
import CopyBlock from "@/app/components/CopyBlock";
import ArticleMeta from "@/app/components/ArticleMeta";
import { textTone } from "@/lib/colors";
import { buildFaqSchema, type FaqItem } from "@/lib/schema";

// One titled block of a guide: paragraphs (**bold** and [label](/path) links), an optional numbered list,
// optional copy-paste boxes and an optional table (first column = row label).
export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  steps?: { lead: string; text: string }[];
  copyBlocks?: { label: string; text: string }[];
  table?: { columns: string[]; rows: { label: string; cells: string[] }[] };
}

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(\/[^)\s]*\))/g).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        const link = part.match(/^\[([^\]]+)\]\((\/[^)\s]*)\)$/);
        if (link) return <Link key={i} href={link[2]} className="font-semibold underline underline-offset-2" style={{ color: "#A14A08" }}>{link[1]}</Link>;
        return part;
      })}
    </>
  );
}

export interface GuidePageProps {
  slug: string;
  title: string;
  tag: string;
  accent: string;
  readTime: number;
  intro: string;
  sections: GuideSection[];
  faqs?: FaqItem[];
  relatedLinks?: { label: string; href: string }[];
  cta?: { heading: string; text: string; label: string; href: string };
  articleSchema: Record<string, unknown>;
}

// Shared layout for the guides written in the content admin ("New guides"): a header with the intro, then the
// sections in order, optional FAQs, related reading and a closing call to action. The older guides under
// app/resources/guides keep their own hand-built layouts.
export default function GuidePage({ slug, title, tag, accent, readTime, intro, sections, faqs, relatedLinks, cta, articleSchema }: GuidePageProps) {
  return (
    <InnerLayout>
      <JsonLd data={articleSchema} />
      {faqs && faqs.length > 0 && <JsonLd data={buildFaqSchema(faqs)} />}

      <section className="relative pt-32 pb-12 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", right: "-160px", width: "550px", height: "550px", borderRadius: "50%", background: `radial-gradient(circle, ${accent}2e 0%, ${accent}0f 40%, transparent 68%)`, filter: "blur(55px)", pointerEvents: "none" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Guides", href: "/resources/guides" }, { label: title, href: `/resources/guides/${slug}` }]} />
          <div className="flex items-center gap-3 mb-4">
            <span className="fredoka-pill inline-flex text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${accent}14`, color: textTone(accent), border: `1px solid ${accent}33` }}>{tag}</span>
            <span className="text-xs" style={{ color: "#71675E" }}>{readTime} min read</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-5 leading-tight" style={{ color: "#0a0a0a" }}>{title}</h1>
          <ArticleMeta schema={articleSchema} />
          <p className="speakable-summary text-lg leading-relaxed" style={{ color: "#52525B" }}><Rich text={intro} /></p>
        </div>
      </section>

      <article className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((section) => (
            <FadeIn key={section.heading}>
              <h2 className="text-2xl sm:text-3xl font-black mb-4" style={{ color: "#0a0a0a" }}>{section.heading}</h2>
              {(section.paragraphs ?? []).map((para, i) => (
                <p key={i} className="text-base leading-relaxed mb-4" style={{ color: "#52525B" }}><Rich text={para} /></p>
              ))}
              {section.steps && section.steps.length > 0 && (
                <ul className="space-y-4 mb-4">
                  {section.steps.map((step, i) => (
                    <li key={step.lead} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black" style={{ backgroundColor: `${accent}1a`, color: textTone(accent), border: `1px solid ${accent}4d` }}>{i + 1}</span>
                      <p className="text-base leading-relaxed" style={{ color: "#52525B" }}><strong>{step.lead}</strong> <Rich text={step.text} /></p>
                    </li>
                  ))}
                </ul>
              )}
              {section.copyBlocks && section.copyBlocks.length > 0 && (
                <div className="space-y-4 mb-4">
                  {section.copyBlocks.map((b) => (
                    <CopyBlock key={b.label + b.text.slice(0, 20)} text={b.text} accent={accent} label={b.label} successMessage="Copied to clipboard" />
                  ))}
                </div>
              )}
              {section.table && section.table.rows.length > 0 && (
                <div className="overflow-x-auto rounded-2xl border mb-4" style={{ borderColor: "#E8E2D9" }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: "#F8F6F2" }}>
                        <th scope="col" className="text-left p-4 font-black" style={{ color: "#0a0a0a" }}>&nbsp;</th>
                        {section.table.columns.map((c) => (
                          <th key={c} scope="col" className="text-left p-4 font-black" style={{ color: "#0a0a0a" }}>{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, i) => (
                        <tr key={row.label} style={{ borderTop: i > 0 ? "1px solid #E8E2D9" : undefined }}>
                          <th scope="row" className="text-left p-4 font-bold align-top" style={{ color: "#0a0a0a" }}>{row.label}</th>
                          {row.cells.map((cell, j) => (
                            <td key={j} className="p-4 align-top" style={{ color: "#3D3D3D" }}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </FadeIn>
          ))}

          {faqs && faqs.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>Frequently asked questions</h2>
              <div className="space-y-4">
                {faqs.map((f) => (
                  <div key={f.question} className="rounded-2xl border p-6" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                    <h3 className="text-base font-black mb-2" style={{ color: "#0a0a0a" }}>{f.question}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cta && (
            <div className="rounded-2xl border p-8 text-center" style={{ backgroundColor: `${accent}0d`, borderColor: `${accent}33` }}>
              <h2 className="text-2xl font-black mb-3" style={{ color: "#0a0a0a" }}>{cta.heading}</h2>
              <p className="text-base leading-relaxed mb-6 max-w-xl mx-auto" style={{ color: "#52525B" }}>{cta.text}</p>
              <Link href={cta.href} className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">{cta.label}</Link>
            </div>
          )}

          {relatedLinks && relatedLinks.length > 0 && (
            <div className="pt-8 border-t" style={{ borderColor: "#E8E2D9" }}>
              <p className="text-sm mb-3 font-bold" style={{ color: "#71675E" }}>Related reading</p>
              <ul className="space-y-1">
                {relatedLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-[44px] items-center text-sm font-bold underline underline-offset-2" style={{ color: textTone(accent) }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <Link href="/resources/guides" className="inline-flex min-h-[44px] items-center text-sm font-bold" style={{ color: "#71675E" }}>&larr; All guides</Link>
          </div>
        </div>
      </article>
    </InnerLayout>
  );
}
