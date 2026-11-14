import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../../components/InnerLayout";
import FadeIn from "../../components/FadeIn";
import JsonLd from "../../components/JsonLd";
import BlogGrid, { type BlogPost } from "./BlogGrid";
import NewsletterForm from "../../components/NewsletterForm";
import { buildBreadcrumbSchema, buildCollectionPageSchema, SITE_URL } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import { getCmsPostSummaries } from "@/lib/cms-posts";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Resources", url: `${SITE_URL}/resources` },
  { name: "Blog", url: `${SITE_URL}/resources/blogs` },
]);

const BLOGS_PAGE_SCHEMA = [
  BREADCRUMB_SCHEMA,
  buildCollectionPageSchema({
    name: "B2B Lead Generation Blog",
    description: "In-depth guides on cold email, ICP mapping, LinkedIn outreach, deliverability, and outbound metrics.",
    url: `${SITE_URL}/resources/blogs`,
  }),
];

export const metadata: Metadata = withPageSeo("/resources/blogs", {
  title: "B2B Lead Generation Blog",
  description: "In-depth guides on cold email, ICP mapping, LinkedIn outreach, deliverability, and outbound metrics, written by the team that has booked 12K+ B2B meetings.",
  keywords: [
    "b2b lead generation blog",
    "cold email deliverability guide",
    "linkedin outreach sequences",
    "icp mapping for b2b",
    "b2b sales pipeline metrics",
    "outbound sales playbooks",
    "agency vs in-house sdr",
    "linkedin profile optimization tips",
    "b2b lead gen metrics",
    "cold email best practices",
    "b2b outbound strategy blog",
    "sales development blog",
  ],
  alternates: { canonical: "https://www.myntmore.com/resources/blogs" },
  openGraph: {
    ...OG_BASE,
    title: "B2B Lead Generation Blog | Myntmore",
    description: "Practical lead gen guides from the team behind 12K+ B2B meetings booked.",
    url: "https://www.myntmore.com/resources/blogs",
    images: ogImages("/resources/blogs"),
  },
});

// Cards for pages that are not blog posts. Every blog post is a CMS post (content/posts) and
// supplies its own card; `order` places a card among them (lowest first).
const OTHER_CARDS: (BlogPost & { order: number })[] = [
  {
    href: "/who-this-is-for",
    order: 0,
    tags: ["Positioning", "Lead Generation"],
    title: "Who Myntmore Is For (and Who It Isn't)",
    excerpt: "Myntmore is built narrowly around B2B pipeline generation, cold email, LinkedIn outreach, and ABM run as one system. Here's exactly who that's for, and who it isn't.",
    readTime: "4 min read",
  },
];

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
}

async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const res = await fetch("https://medium.com/feed/@myntmore", { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.split("<item>").slice(1);
    return items
      .map((item) => {
        const title = item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/)?.[1]?.trim() ?? "";
        const link = item.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim() ?? "";
        const pubDate = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim() ?? "";
        return { title, link, pubDate };
      })
      .filter((p) => p.title && p.link)
      .slice(0, 3);
  } catch {
    return [];
  }
}

function formatMediumDate(pubDate: string): string {
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Press mentions of the team, separate from the Medium feed above since these
// aren't Medium posts -- keep them out of the "Also on Medium" grid so the
// section heading and "Follow on Medium" CTA stay accurate.
const PRESS_MENTIONS = [
  {
    outlet: "Mid-Day",
    date: "Sep 20, 2026",
    title: "New podcast 'The Next Lesson with Hemali Dalal' explores the realities of education and growing up",
    excerpt: "Founder Tejas Jhaveri joined journalist Faye D'Souza at the launch of Hemali Dalal's new podcast on education and growing up today.",
    link: "https://www.mid-day.com/sunday-mid-day/article/new-podcast-the-next-lesson-with-hemali-dalal-explores-the-realities-of-education-and-growing-up-23650899",
  },
];

export default async function BlogsPage() {
  const mediumPosts = await getMediumPosts();
  // Cards for every post come from the CMS; new posts (no position yet) are listed first, newest first.
  const cards: (BlogPost & { order: number | null })[] = [
    ...(await getCmsPostSummaries()).map((p) => ({
      href: p.href,
      tags: p.tags,
      title: p.title,
      excerpt: p.excerpt,
      readTime: p.readTime,
      order: p.indexOrder,
    })),
    ...OTHER_CARDS,
  ];
  // Cards without a position (new posts) come first; the rest keep their set order.
  const allPosts: BlogPost[] = [...cards].sort((x, y) => (x.order ?? -1) - (y.order ?? -1) || 0).map(({ order, ...card }) => card);

  return (
    <InnerLayout>
      <JsonLd data={BLOGS_PAGE_SCHEMA} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden border-b" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Link href="/resources" className="link-subtle -my-3.5 inline-flex items-center py-3.5 text-xs font-semibold">Resources</Link>
            <span style={{ color: "#E8E2D9" }}>/</span>
            <span className="text-xs font-semibold" style={{ color: "#3D3D3D" }}>Blog</span>
          </div>
          <div className="flex items-start justify-between gap-8 flex-wrap">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
                {allPosts.length} posts. <span style={{ color: "#3b82f6" }}>Zero fluff.</span>
              </h1>
              <p className="text-lg sm:text-xl mb-10 hero-fade-d2" style={{ color: "#52525B" }}>
                Practical B2B lead generation playbooks from the team that has booked 12K+ meetings and generated $120M+ in pipeline.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 hero-fade-d3">
                <a href="#blog-grid" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
                  Read the Posts
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <a href="https://medium.com/@myntmore" target="_blank" rel="noopener noreferrer" className="btn-ghost px-8 py-4 text-base font-bold inline-flex items-center gap-2">
                  Follow on Medium
                </a>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-3 pt-2 hero-fade-d3">
              {[
                { label: "Cold Email", accent: "#3b82f6" },
                { label: "LinkedIn Outreach", accent: "#F97316" },
                { label: "ICP & Targeting", accent: "#10b981" },
                { label: "GTM Strategy", accent: "#7C3AED" },
              ].map((cat) => (
                <span key={cat.label} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border" style={{ color: textTone(cat.accent), backgroundColor: `${cat.accent}0d`, borderColor: `${cat.accent}30` }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.accent }} />
                  {cat.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="blog-grid"
        className="py-16 px-4 border-t scroll-mt-24"
        style={{
          borderColor: "#E8E2D9",
          backgroundColor: "#ffffff",
          backgroundImage: [
            "radial-gradient(700px 520px at 0% 6%, rgba(124,58,237,0.10), transparent 70%)",
            "radial-gradient(760px 600px at 100% 38%, rgba(245,183,49,0.16), transparent 70%)",
            "radial-gradient(720px 560px at 0% 72%, rgba(59,130,246,0.10), transparent 70%)",
            "radial-gradient(680px 520px at 100% 100%, rgba(249,115,22,0.10), transparent 70%)",
          ].join(", "),
        }}
      >
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <BlogGrid posts={allPosts} />
          </FadeIn>
        </div>
      </section>

      {mediumPosts.length > 0 && (
        <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <svg className="w-7 h-7" viewBox="0 0 1043.63 592.71" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fill="#0a0a0a" d="M588.67 296.36c0 163.72-131.87 296.35-294.44 296.35S-.21 460.08-.21 296.36 131.65 0 294.23 0s294.44 132.63 294.44 296.36M910.42 296.36c0 154.16-65.94 279.15-147.22 279.15s-147.22-125-147.22-279.15S681.93 17.21 763.2 17.21s147.22 125 147.22 279.15M1043.63 296.36c0 138.19-23.17 250.24-51.76 250.24s-51.76-112.05-51.76-250.24 23.17-250.24 51.76-250.24 51.76 112.05 51.76 250.24" />
                </svg>
                <h2 className="text-2xl font-black" style={{ color: "#0a0a0a" }}>Also on Medium</h2>
              </div>
              <a href="https://medium.com/@myntmore" target="_blank" rel="noopener noreferrer" className="btn-ghost px-6 py-2.5 text-sm font-bold inline-flex items-center gap-2">
                Follow on Medium
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {mediumPosts.map((post) => (
                <a key={post.link} href={post.link} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                  <span className="text-xs font-semibold" style={{ color: "#71675E" }}>{formatMediumDate(post.pubDate)}</span>
                  <h3 className="text-base font-black mt-2 mb-3 leading-snug" style={{ color: "#0a0a0a" }}>{post.title}</h3>
                  <span className="text-xs font-bold" style={{ color: "#0a0a0a" }}>Read on Medium ↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {PRESS_MENTIONS.length > 0 && (
        <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16M4 12h16M4 19h10" /></svg>
              <h2 className="text-2xl font-black" style={{ color: "#0a0a0a" }}>In the press</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {PRESS_MENTIONS.map((mention) => (
                <a key={mention.link} href={mention.link} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <span className="text-xs font-semibold" style={{ color: "#71675E" }}>{mention.outlet} · {mention.date}</span>
                  <h3 className="text-base font-black mt-2 mb-2 leading-snug" style={{ color: "#0a0a0a" }}>{mention.title}</h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#52525B" }}>{mention.excerpt}</p>
                  <span className="text-xs font-bold" style={{ color: "#0a0a0a" }}>Read on {mention.outlet} ↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <FadeIn className="mx-auto block max-w-2xl">
          <div className="rounded-2xl p-8 sm:p-10 border text-center" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.3)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#A14A08" }}>The Outbound Operator</p>
            <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>One practical growth playbook, every week</h2>
            <p className="text-sm sm:text-base leading-relaxed mb-6 max-w-lg mx-auto" style={{ color: "#52525B" }}>
              Outbound systems, AI prospecting, cold email, and LinkedIn tactics, built from real campaigns, not recycled theory.
            </p>
            <div className="max-w-sm mx-auto text-left">
              <NewsletterForm inputId="blogs-hub-newsletter-email" />
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="py-10 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <p className="text-sm text-center" style={{ color: "#71675E" }}>
          Rather have us run this for you?{" "}
          <a href="/book-a-call" className="font-bold underline" style={{ color: "#0a0a0a" }}>Book a free GTM audit →</a>
        </p>
      </section>
    </InnerLayout>
  );
}
