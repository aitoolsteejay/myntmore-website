import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { DocumentRenderer, type DocumentRendererProps } from "@keystatic/core/renderer";
import InnerLayout from "../../../components/InnerLayout";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AskYourAI from "../../../components/AskYourAI";
import NewsletterForm from "../../../components/NewsletterForm";
import JsonLd from "../../../components/JsonLd";
import ToolCallout from "../../../components/ToolCallout";
import ArticleMeta from "@/app/components/ArticleMeta";
import Faq from "@/app/lp/Faq";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import { getCmsPost, getCmsPostSummaries } from "@/lib/cms-posts";
import { OG_BASE, ogImages } from "@/lib/og";
import CityLinks from "@/app/components/CityLinks";
import { POSTS_WITH_CITY_LINKS } from "@/lib/city-links";

// Every blog post is written in the Keystatic admin (content/posts/*.mdoc) and rendered
// here. Anything that is not a published post is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getCmsPostSummaries();
  return posts.map((p) => ({ slug: p.slug }));
}

const iso = (date: string) => (date ? `${date}T09:00:00+05:30` : "");

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getCmsPost(params.slug);
  if (!post) return {};
  const url = `${SITE_URL}/resources/blogs/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      ...OG_BASE,
      title: post.ogTitle,
      description: post.ogDescription,
      url,
      type: "article",
      images: ogImages(`/resources/blogs/${post.slug}`),
    },
  };
}

const TEXT = "#52525B";
const INK = "#0a0a0a";
const DEFAULT_ACCENT = "#EA580C";

type Cell = { children: ReactNode; colSpan?: number; rowSpan?: number };

// Keystatic's renderer types come from a second copy of @types/react nested
// under its UI package, so the typed props are declared here and the object is
// cast once at the boundary.
function renderers(accent: string) {
  const tone = textTone(accent);
  return {
    inline: {
      link: ({ href, children }: { href: string; children: ReactNode }) => (
        <a href={href} className="underline underline-offset-2 font-semibold" style={{ color: "#9A3412" }}>
          {children}
        </a>
      ),
      bold: ({ children }: { children: ReactNode }) => <strong style={{ color: INK }}>{children}</strong>,
    },
    block: {
      heading: ({ level, children }: { level: number; children: ReactNode }) => {
        if (level <= 2) return <h2 className="text-2xl font-black mt-10 mb-4" style={{ color: INK }}>{children}</h2>;
        if (level === 3) return <h3 className="text-xl font-black mt-8 mb-3" style={{ color: INK }}>{children}</h3>;
        return <h4 className="text-lg font-bold mt-6 mb-2" style={{ color: INK }}>{children}</h4>;
      },
      paragraph: ({ children }: { children: ReactNode }) => (
        <p className="text-base leading-relaxed" style={{ color: TEXT }}>{children}</p>
      ),
      list: ({ type, children }: { type: string; children: ReactNode[] }) =>
        type === "ordered" ? (
          <ol className="space-y-4 mt-4">
            {children.map((child, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black" style={{ backgroundColor: `${accent}1a`, color: tone, border: `1px solid ${accent}4d` }}>{i + 1}</span>
                <p className="text-base leading-relaxed" style={{ color: TEXT }}>{child}</p>
              </li>
            ))}
          </ol>
        ) : (
          <ul className="space-y-4 mt-4">
            {children.map((child, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2.5" style={{ backgroundColor: tone }} />
                <p className="text-base leading-relaxed" style={{ color: TEXT }}>{child}</p>
              </li>
            ))}
          </ul>
        ),
      blockquote: ({ children }: { children: ReactNode }) => (
        <blockquote className="border-l-4 pl-5 space-y-3" style={{ borderColor: "#F5B731", color: TEXT }}>{children}</blockquote>
      ),
      divider: () => <hr style={{ borderColor: "#E8E2D9" }} />,
      code: ({ children }: { children: string }) => (
        <pre className="rounded-xl border p-4 overflow-x-auto text-sm" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9", color: INK }}>
          <code>{children}</code>
        </pre>
      ),
      image: ({ src, alt }: { src: string; alt: string }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" className="rounded-xl border w-full h-auto" style={{ borderColor: "#E8E2D9" }} />
      ),
      table: ({ head, body }: { head?: Cell[]; body: Cell[][] }) => (
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#E8E2D9" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ backgroundColor: "#ffffff", minWidth: 560 }}>
              {head && (
                <thead>
                  <tr style={{ borderBottom: "1px solid #E8E2D9", backgroundColor: "#F8F6F2" }}>
                    {head.map((c, i) => (
                      <th key={i} scope="col" colSpan={c.colSpan} rowSpan={c.rowSpan} className="text-left px-5 py-4 text-xs font-black uppercase tracking-widest" style={{ color: i === 0 ? "#71675E" : i === 1 ? tone : INK }}>
                        {c.children}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {body.map((row, r) => (
                  <tr key={r} style={{ borderBottom: r < body.length - 1 ? "1px solid #F0EBE3" : "none" }}>
                    {row.map((c, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" colSpan={c.colSpan} rowSpan={c.rowSpan} className="text-left px-5 py-5 font-bold align-top" style={{ color: INK }}>
                          {c.children}
                        </th>
                      ) : (
                        <td key={i} colSpan={c.colSpan} rowSpan={c.rowSpan} className="px-5 py-5 leading-relaxed align-top" style={{ color: "#3D3D3D" }}>
                          {c.children}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
  } as unknown as DocumentRendererProps["renderers"];
}

export default async function CmsBlogPost({ params }: { params: { slug: string } }) {
  const post = await getCmsPost(params.slug);
  if (!post) notFound();

  const url = `${SITE_URL}/resources/blogs/${post.slug}`;
  const accent = /^#[0-9A-Fa-f]{6}$/.test(post.accent) ? post.accent : DEFAULT_ACCENT;
  const articleSchema = buildArticleSchema({
    headline: post.schemaHeadline || post.title,
    description: post.schemaDescription,
    url,
    datePublished: iso(post.datePublished),
    dateModified: iso(post.dateModified),
  });
  const aiResources = [url, SITE_URL, ...(post.cta?.href ? [`${SITE_URL}${post.cta.href}`] : post.relatedLinks.slice(0, 1).map((l) => `${SITE_URL}${l.href}`))];

  return (
    <InnerLayout>
      <JsonLd data={articleSchema} />
      {post.faqs.length > 0 && <JsonLd data={buildFaqSchema(post.faqs)} />}

      <section className="pt-32 pb-12 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Blog", href: "/resources/blogs" }]} />
          <span className="fredoka-pill inline-flex text-xs font-bold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: `${accent}14`, color: textTone(accent), border: `1px solid ${accent}33` }}>
            {post.category} · {post.readTime} min read
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight" style={{ color: INK }}>
            {post.title}
          </h1>
          <ArticleMeta schema={articleSchema} />
          <p className="speakable-summary text-lg leading-relaxed" style={{ color: TEXT }}>
            {post.summary}
          </p>
        </div>
      </section>

      <article className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <div className="prose-custom space-y-6">
            <DocumentRenderer document={post.content} renderers={renderers(accent)} />
          </div>

          {post.faqs.length > 0 && (
            <Faq badge="FAQ" title="Common questions" items={post.faqs.map((f) => ({ q: f.question, a: f.answer }))} />
          )}

          {post.relatedLinks.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-black mb-4" style={{ color: INK }}>Keep reading</h2>
              <ul className="space-y-2">
                {post.relatedLinks.map((r) => (
                  <li key={r.href}>
                    <a href={r.href} className="text-base font-bold underline" style={{ color: textTone(accent) }}>{r.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {POSTS_WITH_CITY_LINKS.has(post.slug) && (
            <CityLinks
              variant="inline"
              heading="B2B lead generation in your city"
              intro="How we run outbound for the industries in each Indian city we cover."
            />
          )}

          {post.cta && (
            <div className="mt-12 rounded-2xl p-8 border" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.3)" }}>
              <h3 className="text-lg font-black mb-3" style={{ color: INK }}>{post.cta.heading}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: TEXT }}>{post.cta.body}</p>
              {post.cta.href2 && post.cta.button2 ? (
                <div className="flex flex-wrap gap-3">
                  <a href={post.cta.href} className="btn-dark px-6 py-3 text-sm font-bold inline-flex items-center gap-2">
                    {post.cta.button}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                  <a href={post.cta.href2} className="btn-ghost px-6 py-3 text-sm font-bold">{post.cta.button2}</a>
                </div>
              ) : (
                <a href={post.cta.href} className="btn-dark px-6 py-3 text-sm font-bold inline-flex items-center gap-2">
                  {post.cta.button}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              )}
            </div>
          )}

          {post.toolCallouts.map((t) => (
            <ToolCallout key={t.href} href={t.href} name={t.name} blurb={t.blurb} />
          ))}

          <div className="mt-8">
            <AskYourAI resources={aiResources} />
          </div>

          <div className="mt-8 rounded-2xl p-6 border" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.3)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#A14A08" }}>The Outbound Operator</p>
            <h3 className="text-base font-black mb-2" style={{ color: INK }}>One practical growth playbook, every week</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: TEXT }}>
              Outbound systems, AI prospecting, cold email, and LinkedIn tactics, built from real campaigns, not recycled theory.
            </p>
            <NewsletterForm inputId="blog-newsletter-email" compact />
          </div>
        </div>
      </article>
    </InnerLayout>
  );
}
