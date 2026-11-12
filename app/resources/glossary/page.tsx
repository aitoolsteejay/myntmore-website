import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import FadeIn from "../../components/FadeIn";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema, buildCollectionPageSchema, SITE_URL } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import generatedTerms from "@/lib/glossary-index.generated.json";
import { OG_BASE } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const GLOSSARY_PAGE_SCHEMA = [
  buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Resources", url: `${SITE_URL}/resources` },
    { name: "Glossary", url: `${SITE_URL}/resources/glossary` },
  ]),
  buildCollectionPageSchema({
    name: "B2B Outbound Glossary",
    description: "Plain-English definitions of terms and frameworks behind Myntmore's outbound systems.",
    url: `${SITE_URL}/resources/glossary`,
  }),
];

export const metadata: Metadata = withPageSeo("/resources/glossary", {
  title: "B2B Outbound Glossary",
  description: "Plain-English definitions of the terms behind Myntmore's outbound systems, from SPF/DKIM/DMARC and ICP to our own Total Conversional Market framework.",
  keywords: [
    "b2b outbound glossary",
    "total conversional market definition",
    "signal-heavy structuring",
    "3-second rule cold outreach",
    "b2b outbound terminology",
    "cold outreach frameworks explained",
    "what is icp",
    "what is abm",
    "spf dkim dmarc explained",
  ],
  alternates: { canonical: "https://www.myntmore.com/resources/glossary" },
  openGraph: {
    ...OG_BASE,
    title: "B2B Outbound Glossary | Myntmore",
    description: "Plain-English definitions of the terms and frameworks behind Myntmore's outbound systems.",
    url: "https://www.myntmore.com/resources/glossary",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
});

interface Term {
  href: string;
  tag: string;
  title: string;
  excerpt: string;
  accent: string;
  aliases?: string[];
}

// Every term is a CMS term (content/glossary) and supplies its own card through lib/glossary-index.generated.json.
const TERMS: Term[] = generatedTerms as Term[];

// Alphabetized like a real reference, not left in ad-hoc authoring order --
// "The 3-Second Rule" sorts under "3", not "T", and a parenthetical like
// "(TCM)" or "(Ideal Customer Profile)" never affects sort position.
function sortKey(title: string): string {
  return title.replace(/^The\s+/i, "").replace(/\s*\([^)]*\)\s*$/, "");
}

function letterOf(title: string): string {
  const first = sortKey(title)[0].toUpperCase();
  return /[A-Z]/.test(first) ? first : "#";
}

const SORTED_TERMS = [...TERMS].sort((a, b) => sortKey(a.title).localeCompare(sortKey(b.title)));

const GROUPED = SORTED_TERMS.reduce<Record<string, Term[]>>((acc, term) => {
  (acc[letterOf(term.title)] ??= []).push(term);
  return acc;
}, {});

// Synonyms get a "see X" pointer under their own letter, like a print
// glossary, so every name a buyer might search for is findable A to Z
// without a duplicate page competing with the canonical one.
interface CrossRef {
  alias: string;
  target: Term;
}

const CROSS_REFS = TERMS.flatMap((t) =>
  (t.aliases ?? [])
    .filter((alias) => sortKey(alias).toLowerCase() !== sortKey(t.title).toLowerCase())
    .map((alias) => ({ alias, target: t }))
).sort((a, b) => sortKey(a.alias).localeCompare(sortKey(b.alias)));

const GROUPED_REFS = CROSS_REFS.reduce<Record<string, CrossRef[]>>((acc, ref) => {
  (acc[letterOf(ref.alias)] ??= []).push(ref);
  return acc;
}, {});

const LETTERS = Array.from(new Set([...Object.keys(GROUPED), ...Object.keys(GROUPED_REFS)])).sort();

export default function GlossaryPage() {
  return (
    <InnerLayout>
      <JsonLd data={GLOSSARY_PAGE_SCHEMA} />
      <section className="relative pt-32 pb-12 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Glossary", href: "/resources/glossary" }]} />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            The terms behind the system
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mb-10" style={{ color: "#52525B" }}>
            {TERMS.length} terms and frameworks that come up repeatedly across Myntmore&apos;s own content and campaigns, from industry basics to a few ideas we coined ourselves, A to Z.
          </p>

          {/* A-Z quick nav -- only letters that actually have an entry */}
          <div className="flex flex-wrap gap-2 pb-8 border-b" style={{ borderColor: "#E8E2D9" }}>
            {LETTERS.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-11 h-11 flex items-center justify-center rounded-lg text-sm font-black border transition-colors duration-150"
                style={{ borderColor: "#E8E2D9", color: "#3D3D3D", backgroundColor: "#ffffff" }}
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-4xl mx-auto space-y-14">
          {LETTERS.map((letter) => (
            <FadeIn key={letter}>
              <div id={`letter-${letter}`} className="scroll-mt-28">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-black" style={{ color: "#7C3AED" }}>{letter}</span>
                  <div className="h-px flex-1" style={{ backgroundColor: "#E8E2D9" }} />
                </div>
                {GROUPED[letter] && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {GROUPED[letter].map((t) => (
                    <Link key={t.href} href={t.href} className="group block rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                      <div className="h-1" style={{ background: `linear-gradient(90deg,${t.accent},${t.accent}66)` }} />
                      <div className="p-6">
                        <span className="fredoka-pill inline-flex text-xs font-bold px-2 py-0.5 rounded-full mb-3" style={{ backgroundColor: `${t.accent}12`, color: textTone(t.accent) }}>{t.tag}</span>
                        <h2 className="text-base font-black mb-2 leading-snug" style={{ color: "#0a0a0a" }}>{t.title}</h2>
                        <p className="text-xs leading-relaxed mb-4" style={{ color: "#52525B" }}>{t.excerpt}</p>
                        <span className="text-xs font-bold" style={{ color: textTone(t.accent) }}>Read the definition &rarr;</span>
                      </div>
                    </Link>
                  ))}
                </div>
                )}
                {GROUPED_REFS[letter] && (
                  <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${GROUPED[letter] ? "mt-6" : ""}`}>
                    {GROUPED_REFS[letter].map((r) => (
                      <li key={r.alias}>
                        <Link href={r.target.href} className="group inline-flex min-h-[44px] flex-wrap items-center gap-x-1.5 py-1 text-sm rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/50">
                          <span className="font-bold" style={{ color: "#0a0a0a" }}>{r.alias}</span>
                          <span style={{ color: "#71675E" }}>see</span>
                          <span className="font-bold underline decoration-1 underline-offset-2 group-hover:no-underline" style={{ color: textTone(r.target.accent) }}>{r.target.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </InnerLayout>
  );
}
