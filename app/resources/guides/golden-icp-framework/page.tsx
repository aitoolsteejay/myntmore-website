import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import { buildArticleSchema, SITE_URL } from "@/lib/schema";
import Image from "next/image";
import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CopyBlock from "@/app/components/CopyBlock";
import FadeIn from "@/app/components/FadeIn";
import Underline from "../how-to-set-up-vibe-prospecting/Underline";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";
import pageCopy from "@/content/page-copy/guideGoldenIcpFramework.json";

// This page's text is edited in the admin ("The Golden ICP Framework") and lives in content/page-copy/guideGoldenIcpFramework.json.
const copy = pageCopy;

const URL = "https://www.myntmore.com/resources/guides/golden-icp-framework";

export const metadata: Metadata = withPageSeo("/resources/guides/golden-icp-framework", {
  title: "The Golden ICP Framework for B2B Outbound",
  description: "Build high-converting B2B prospect lists using pressure, buying triggers, Clay enrichment, and timely cold email. Get the complete Golden ICP Framework.",
  keywords: [
    "golden icp framework",
    "b2b ideal customer profile",
    "buying triggers for outbound",
    "clay lead generation",
    "smartlead cold email",
    "b2b prospect list building",
    "sales trigger events",
    "cold email icp",
    "founder outbound framework",
  ],
  alternates: { canonical: URL },
  openGraph: {
    ...OG_BASE,
    title: "The Golden ICP Framework | Myntmore",
    description: "Stop building lists around job titles. Find buyers under pressure to solve the problem you solve.",
    url: URL,
    images: ogImages("/resources/guides/golden-icp-framework"),
  },
});

const COLD_EMAIL = copy.s01.t01;

const FOLLOW_UP = copy.s01.t02;

const CLAY_QUERY = copy.s01.t03;

const PRESSURE_TRAITS = [
  [copy.s01.t04, copy.s01.t05],
  [copy.s01.t06, copy.s01.t07],
  [copy.s01.t08, copy.s01.t09],
  [copy.s01.t10, copy.s01.t11],
];

const TRIGGERS = [
  copy.s01.t12,
  copy.s01.t13,
  copy.s01.t14,
  copy.s01.t15,
  copy.s01.t16,
];

const ENRICHMENTS = [
  [copy.s01.t17, copy.s01.t18],
  [copy.s01.t19, copy.s01.t20],
  ["BuiltWith", copy.s01.t21],
  [copy.s01.t22, copy.s01.t23],
  [copy.s01.t24, copy.s01.t25],
  [copy.s01.t26, copy.s01.t27],
];

function DataTable({ rows }: { rows: string[][] }) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#E8E2D9" }}>
      {rows.map(([label, value], index) => (
        <div key={label} className="grid grid-cols-1 sm:grid-cols-[0.9fr_1.4fr]" style={{ borderBottom: index < rows.length - 1 ? "1px solid #E8E2D9" : "none" }}>
          <div className="px-5 py-4 text-sm font-black" style={{ backgroundColor: "#F8F6F2", color: "#0a0a0a" }}>{label}</div>
          <div className="px-5 py-4 text-sm leading-relaxed" style={{ backgroundColor: "#ffffff", color: "#52525B" }}>{value}</div>
        </div>
      ))}
    </div>
  );
}

// Article schema. The first publication date is not on record, so only the last update (from lib/sitemap-dates.json) is given.
const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "The Golden ICP Framework for B2B Outbound",
  description: "Build high-converting B2B prospect lists using pressure, buying triggers, Clay enrichment, and timely cold email. Get the complete Golden ICP Framework.",
  url: `${SITE_URL}/resources/guides/golden-icp-framework`,
  dateModified: "2026-11-14T12:09:59+05:30",
});

export default function GoldenICPFrameworkGuide() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,183,49,0.24),rgba(245,183,49,0.07) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(16,185,129,0.19),rgba(16,185,129,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: copy.s01.t28, href: "/resources" }, { label: copy.s01.t29, href: "/resources/guides" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(217,119,6,0.3)", backgroundColor: "rgba(245,183,49,0.09)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#D97706" }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#A14A08" }}>{copy.s01.t30}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>{copy.s01.t31}<br />
            <span className="relative inline-block">{copy.s01.t32}<Underline color="#F5B731" /></span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>{copy.s01.t33}</p>
        </div>
      </section>

      <section className="py-12 px-4 border-y" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <Image src="/tejas.png" alt={copy.s01.t34} width={112} height={112} className="rounded-2xl object-cover shrink-0" />
          <div>
            <h2 className="text-xl font-black mb-2" style={{ color: "#0a0a0a" }}>{copy.s02.t01}</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{copy.s02.t02}</p>
          </div>
        </div>
      </section>

      <article className="py-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto space-y-16">
          <FadeIn>
            <section>
              <p className="text-lg leading-relaxed mb-4" style={{ color: "#52525B" }}>{copy.s02.t03}</p>
              <p className="text-lg leading-relaxed" style={{ color: "#52525B" }}>{copy.s02.t04}</p>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>{copy.s02.t05}</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>{copy.s03.t01}</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>{copy.s03.t02}</p>
              <DataTable rows={PRESSURE_TRAITS} />
              <div className="mt-6 rounded-xl p-5 border-l-4" style={{ backgroundColor: "#FEF9EC", borderColor: "#F5B731" }}><p className="font-bold" style={{ color: "#0a0a0a" }}>{copy.s03.t03}</p></div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>{copy.s03.t04}</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>{copy.s04.t01}</h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#52525B" }}>{copy.s04.t02}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {TRIGGERS.map((trigger) => <div key={trigger} className="rounded-xl border p-4 text-sm font-semibold" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#3D3D3D" }}>✓ {trigger}</div>)}
              </div>
              <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#F0FDF4", borderColor: "rgba(16,185,129,0.25)" }}><p className="text-sm leading-relaxed" style={{ color: "#166534" }}>{copy.s04.t03}</p></div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>{copy.s04.t04}</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>{copy.s05.t01}</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>{copy.s05.t02}</p>
              <h3 className="text-lg font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s06.t01}</h3>
              <DataTable rows={ENRICHMENTS} />
              <div className="mt-6"><CopyBlock text={CLAY_QUERY} accent="#F5B731" label="Copy example Clay query" /></div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>{copy.s06.t02}</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>{copy.s07.t01}</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>{copy.s07.t02}</p>
              <CopyBlock text={COLD_EMAIL} accent="#F5B731" label="Copy cold email template" />
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>{copy.s07.t03}</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>{copy.s08.t01}</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>{copy.s08.t02}</p>
              <CopyBlock text={FOLLOW_UP} accent="#14b8a6" label="Copy follow-up template" />
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl p-8 sm:p-10 text-center border" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>{copy.s08.t03}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] mt-3 mb-4">{copy.s09.t01}</h2>
              <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#52525B" }}>{copy.s09.t02}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services/cold-email" className="btn-dark px-8 py-4 text-sm font-bold">{copy.s09.t03}</Link>
                <Link href="/book-a-call" className="px-8 py-4 text-sm font-bold rounded-full border transition-colors hover:bg-[#F8F6F2]" style={{ color: "#0A0A0A", borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>{copy.s09.t04}</Link>
              </div>
              <a href="mailto:founder@myntmore.com" className="inline-flex min-h-[44px] items-center mt-6 text-sm font-semibold" style={{ color: "#A14A08" }}>{copy.s09.t05}</a>
            </section>
          </FadeIn>
        </div>
      </article>
    </InnerLayout>
  );
}
