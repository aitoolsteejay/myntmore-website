import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import FadeIn from "@/app/components/FadeIn";
import JsonLd from "@/app/components/JsonLd";
import { textTone } from "@/lib/colors";
import { buildFaqSchema, type FaqItem } from "@/lib/schema";

// One titled block of a longer-form term: paragraphs (use **double asterisks** for bold), an optional numbered list
// whose items open with a bold lead-in, and an optional comparison table (first column = row label).
export interface GlossarySection {
  heading: string;
  paragraphs?: string[];
  steps?: { lead: string; text: string }[];
  table?: { columns: string[]; rows: { label: string; cells: string[] }[] }; // empty rows = no table
}

// Turns **bold** into <strong>; everything else stays plain text.
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => (part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part))}
    </>
  );
}

export interface GlossaryTermProps {
  slug: string;
  tag: string;
  accent: string;
  title: string;
  tagline: string;
  alsoKnownAs?: string[];
  // Optional bold lead-in before the definition, e.g. "The 3-Second Rule:".
  definitionLead?: string;
  definition: string;
  // The one supporting paragraph of a short-form term; longer-form terms use `sections` instead (or as well).
  body?: string;
  sections?: GlossarySection[];
  sourceLabel: string;
  sourceHref: string;
  // Optional second link, e.g. a blog post that goes deeper on the term.
  furtherLabel?: string;
  furtherHref?: string;
  articleSchema: Record<string, unknown>;
  // Optional extra content after the body, for the few terms that need a
  // comparison table or a worked example to answer the query fully.
  children?: React.ReactNode;
  // Optional question-and-answer pairs for terms people search as questions
  // ("what does X mean"). Rendered after the body and emitted as FAQPage schema.
  faqs?: FaqItem[];
}

// Shared layout for every glossary entry: a ~20-30 word definition, then either one supporting paragraph (the
// short dictionary-style terms) or titled `sections` (the longer-form terms: paragraphs, a numbered list, a
// comparison table), then optional FAQs and the source link.
export default function GlossaryTerm({
  slug,
  tag,
  accent,
  title,
  tagline,
  alsoKnownAs,
  definitionLead,
  definition,
  body,
  sections,
  sourceLabel,
  sourceHref,
  furtherLabel,
  furtherHref,
  articleSchema,
  children,
  faqs,
}: GlossaryTermProps) {
  return (
    <InnerLayout>
      <JsonLd data={articleSchema} />
      {faqs && faqs.length > 0 && <JsonLd data={buildFaqSchema(faqs)} />}

      <section className="relative pt-32 pb-14 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", right: "-160px", width: "550px", height: "550px", borderRadius: "50%", background: `radial-gradient(circle, ${accent}2e 0%, ${accent}0f 40%, transparent 68%)`, filter: "blur(55px)", pointerEvents: "none" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Glossary", href: "/resources/glossary" }, { label: title, href: `/resources/glossary/${slug}` }]} />
          <span className="fredoka-pill inline-flex text-xs font-bold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: `${accent}14`, color: textTone(accent), border: `1px solid ${accent}33` }}>{tag}</span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight" style={{ color: "#0a0a0a" }}>{title}</h1>
          <p className="text-lg leading-relaxed" style={{ color: "#52525B" }}>{tagline}</p>
          {alsoKnownAs && alsoKnownAs.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#71675E" }}>Also known as</span>
              {alsoKnownAs.map((name) => (
                <span key={name} className="fredoka-pill inline-flex text-xs font-semibold px-2.5 py-1 rounded-full border" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#3D3D3D" }}>
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <article className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="rounded-2xl border-l-4 p-6 mb-10" style={{ backgroundColor: `${accent}0d`, borderColor: accent }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: textTone(accent) }}>Definition</p>
              <p className="text-base leading-relaxed" style={{ color: "#0a0a0a" }}>
                {definitionLead ? <><strong>{definitionLead}</strong> {definition}</> : definition}
              </p>
            </div>

            {body && <p className="text-base leading-relaxed" style={{ color: "#52525B" }}>{body}</p>}

            {sections && sections.length > 0 && (
              <div className={`space-y-8${body ? " mt-10" : ""}`}>
                {sections.map((section) => (
                  <div key={section.heading}>
                    <h2 className="text-2xl font-black mb-3" style={{ color: "#0a0a0a" }}>{section.heading}</h2>
                    {(section.paragraphs ?? []).map((para, i, all) => (
                      <p key={i} className={`text-base leading-relaxed${i < all.length - 1 || (section.steps?.length ?? 0) > 0 ? " mb-4" : ""}`} style={{ color: "#52525B" }}>
                        <Rich text={para} />
                      </p>
                    ))}
                    {section.steps && section.steps.length > 0 && (
                      <ul className="space-y-4">
                        {section.steps.map((step, i) => (
                          <li key={step.lead} className="flex gap-3">
                            <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black" style={{ backgroundColor: `${accent}1a`, color: textTone(accent), border: `1px solid ${accent}4d` }}>{i + 1}</span>
                            <p className="text-base leading-relaxed" style={{ color: "#52525B" }}><strong>{step.lead}</strong> {step.text}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.table && section.table.rows.length > 0 && (
                      <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
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
                  </div>
                ))}
              </div>
            )}
          </FadeIn>

          {children}

          {faqs && faqs.length > 0 && (
            <div className="mt-12">
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

          <div className="mt-12 pt-8 border-t" style={{ borderColor: "#E8E2D9" }}>
            <p className="text-sm mb-4" style={{ color: "#71675E" }}>Where this comes from</p>
            <Link href={sourceHref} className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold" style={{ color: textTone(accent) }}>
              {sourceLabel}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            {furtherLabel && furtherHref && (
              <div className="mt-3">
                <Link href={furtherHref} className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold" style={{ color: textTone(accent) }}>
                  {furtherLabel}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            )}
          </div>

          <div className="mt-6">
            <Link href="/resources/glossary" className="inline-flex min-h-[44px] items-center text-sm font-bold" style={{ color: "#71675E" }}>&larr; Back to the glossary</Link>
          </div>
        </div>
      </article>
    </InnerLayout>
  );
}
