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
import pageCopy from "@/content/page-copy/guideLeadsOnAutopilotGuide.json";

// This page's text is edited in the admin ("Leads on Autopilot: A Step-by-Step Framework") and lives in content/page-copy/guideLeadsOnAutopilotGuide.json.
const copy = pageCopy;

const URL = "https://www.myntmore.com/resources/guides/leads-on-autopilot-guide";

export const metadata: Metadata = withPageSeo("/resources/guides/leads-on-autopilot-guide", {
  title: "Leads on Autopilot: A LinkedIn Framework",
  description: "A complete system to generate high-quality B2B leads on LinkedIn without cold pitching: audience, content, outreach, nurturing, and follow-ups.",
  keywords: [
    "linkedin lead generation framework",
    "leads on autopilot",
    "linkedin outreach without cold pitching",
    "b2b linkedin lead gen system",
    "linkedin icp framework",
    "linkedin nurture sequence",
    "linkedin connection request template",
    "linkedin follow up messages",
  ],
  alternates: { canonical: URL },
  openGraph: {
    ...OG_BASE,
    title: "Leads on Autopilot: A LinkedIn Framework | Myntmore",
    description: "Generate high-quality B2B leads on LinkedIn without cold pitching. Audience clarity, content authority, outreach, nurturing, and follow-ups, in one system.",
    url: URL,
    images: ogImages("/resources/guides/leads-on-autopilot-guide"),
  },
});

const ICP_EXAMPLES = [
  [copy.s01.t01, copy.s01.t02],
  [copy.s01.t03, copy.s01.t04],
];

const CONTENT_CATEGORIES = [
  copy.s01.t05,
  copy.s01.t06,
  copy.s01.t07,
  copy.s01.t08,
];

const OUTREACH_STEPS = [
  {
    step: "1",
    name: copy.s01.t09,
    goal: copy.s01.t10,
    psychology: "Curiosity + similarity",
    template: `Hey [First Name], saw your role at [Company], especially your work on [X]. I work with a few folks in [industry/space], always good to connect with others building sharp. Let's connect?`,
    example: copy.s01.t11,
  },
  {
    step: "2",
    name: copy.s01.t12,
    goal: copy.s01.t13,
    psychology: "Empathy + curiosity",
    template: `Thanks for connecting, [First Name]! Quick Q: how are you currently tackling [problem]? A lot of [role]s we talk to hit [pain point]. Happy to share what's working if it's useful.`,
    example: copy.s01.t14,
  },
  {
    step: "3",
    name: copy.s01.t15,
    goal: copy.s01.t16,
    psychology: "Social proof + permission",
    template: `Totally cool if now's not the right time. Just thought I'd share: we helped [similar role/company] fix [pain point], without needing [common frustration]. If you're navigating that too, happy to walk through it, no pressure.`,
    example: copy.s01.t17,
  },
];

const NURTURE_EXAMPLES = [
  copy.s01.t18,
  copy.s01.t19,
  copy.s01.t20,
];

const FOLLOW_UPS = [
  copy.s01.t21,
  copy.s01.t22,
  copy.s01.t23,
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
  headline: "Leads on Autopilot: A LinkedIn Framework",
  description: "A complete system to generate high-quality B2B leads on LinkedIn without cold pitching: audience, content, outreach, nurturing, and follow-ups.",
  url: `${SITE_URL}/resources/guides/leads-on-autopilot-guide`,
  dateModified: "2026-11-14T12:09:59+05:30",
});

export default function LeadsOnAutopilotGuide() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,119,181,0.2),rgba(0,119,181,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,183,49,0.19),rgba(245,183,49,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: copy.s01.t24, href: "/resources" }, { label: copy.s01.t25, href: "/resources/guides" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(0,119,181,0.3)", backgroundColor: "rgba(0,119,181,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#0077b5" }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#00669C" }}>{copy.s01.t26}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>{copy.s01.t27}<br />
            <span className="relative inline-block">{copy.s01.t28}<Underline color="#F5B731" /></span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>{copy.s01.t29}</p>
        </div>
      </section>

      <section className="py-12 px-4 border-y" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <Image src="/tejas.png" alt={copy.s01.t30} width={112} height={112} className="rounded-2xl object-cover shrink-0" />
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
              <p className="text-lg leading-relaxed" style={{ color: "#52525B" }}>{copy.s02.t03}</p>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#0077b5" }}>{copy.s02.t04}</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-2" style={{ color: "#0a0a0a" }}>{copy.s03.t01}</h2>
              <p className="text-sm italic mb-5" style={{ color: "#71675E" }}>{copy.s03.t02}</p>
              <ul className="space-y-3 mb-6">
                {[
                  ["Demographics", copy.s03.t03],
                  ["Psychographics", copy.s03.t04],
                  ["Behavior", copy.s03.t05],
                ].map(([label, value]) => (
                  <li key={label} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#52525B" }}>
                    <span className="font-black shrink-0" style={{ color: "#0a0a0a" }}>{label}:</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#52525B" }}>{copy.s03.t06}</p>
              <DataTable rows={ICP_EXAMPLES} />
              <div className="mt-6 rounded-xl p-5 border-l-4" style={{ backgroundColor: "#FEF9EC", borderColor: "#F5B731" }}>
                <p className="font-bold" style={{ color: "#0a0a0a" }}>{copy.s03.t07}</p>
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#0077b5" }}>{copy.s03.t08}</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-2" style={{ color: "#0a0a0a" }}>{copy.s04.t01}</h2>
              <p className="text-sm italic mb-5" style={{ color: "#71675E" }}>{copy.s04.t02}</p>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#52525B" }}>{copy.s04.t03}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {CONTENT_CATEGORIES.map((c) => (
                  <div key={c} className="rounded-xl border p-4 text-sm font-semibold" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#3D3D3D" }}>✓ {c}</div>
                ))}
              </div>
              <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#F0FDF4", borderColor: "rgba(16,185,129,0.25)" }}>
                <p className="text-sm leading-relaxed" style={{ color: "#166534" }}>{copy.s04.t04}</p>
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#0077b5" }}>{copy.s04.t05}</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-2" style={{ color: "#0a0a0a" }}>{copy.s05.t01}</h2>
              <p className="text-sm italic mb-6" style={{ color: "#71675E" }}>{copy.s05.t02}</p>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>{copy.s05.t03}</p>
              <div className="space-y-6">
                {OUTREACH_STEPS.map((s) => (
                  <div key={s.step}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black" style={{ backgroundColor: "rgba(0,119,181,0.1)", color: "#00669C", border: "1px solid rgba(0,119,181,0.25)" }}>{s.step}</span>
                      <h3 className="text-lg font-black" style={{ color: "#0a0a0a" }}>{s.name}</h3>
                      <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: "#F8F6F2", color: "#3D3D3D", border: "1px solid #E8E2D9" }}>{s.goal}</span>
                    </div>
                    <p className="text-xs mb-3" style={{ color: "#71675E" }}>{copy.s05.t04}{s.psychology}</p>
                    <CopyBlock text={s.template} accent="#0077b5" label="Copy message template" />
                    <div className="mt-3 rounded-xl p-4 border" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#71675E" }}>{copy.s05.t05}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{s.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#0077b5" }}>{copy.s05.t06}</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-2" style={{ color: "#0a0a0a" }}>{copy.s06.t01}</h2>
              <p className="text-sm italic mb-5" style={{ color: "#71675E" }}>{copy.s06.t02}</p>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>{copy.s06.t03}</p>
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#E8E2D9" }}>
                {NURTURE_EXAMPLES.map((n, i) => (
                  <div key={n} className="px-5 py-4 text-sm leading-relaxed" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#F8F6F2", color: "#52525B", borderBottom: i < NURTURE_EXAMPLES.length - 1 ? "1px solid #E8E2D9" : "none" }}>{n}</div>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#0077b5" }}>{copy.s06.t04}</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-2" style={{ color: "#0a0a0a" }}>{copy.s07.t01}</h2>
              <p className="text-sm italic mb-5" style={{ color: "#71675E" }}>{copy.s07.t02}</p>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>{copy.s07.t03}</p>
              <div className="space-y-4">
                {FOLLOW_UPS.map((f, i) => (
                  <div key={i} className="rounded-xl border p-5" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                    <span className="text-xs font-black uppercase tracking-widest mb-2 block" style={{ color: "#0077b5" }}>{copy.s07.t04}{i + 1}</span>
                    <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{f}</p>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl p-8 sm:p-10 text-center border" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>{copy.s07.t05}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] mt-3 mb-4">{copy.s08.t01}</h2>
              <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#52525B" }}>{copy.s08.t02}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services/personal-branding" className="btn-dark px-8 py-4 text-sm font-bold">{copy.s08.t03}</Link>
                <Link href="/book-a-call" className="px-8 py-4 text-sm font-bold rounded-full border transition-colors hover:bg-[#F8F6F2]" style={{ color: "#0A0A0A", borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>{copy.s08.t04}</Link>
              </div>
              <a href="mailto:founder@myntmore.com" className="inline-flex min-h-[44px] items-center mt-6 text-sm font-semibold" style={{ color: "#A14A08" }}>{copy.s08.t05}</a>
              <Link href="/resources/guides/58-meetings-600-linkedin-connections" className="block mt-5 text-sm font-semibold underline underline-offset-4" style={{ color: "#52525B" }}>{copy.s08.t06}</Link>
            </section>
          </FadeIn>
        </div>
      </article>
    </InnerLayout>
  );
}
