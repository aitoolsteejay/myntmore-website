import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InnerLayout from "../components/InnerLayout";
import FadeIn from "../components/FadeIn";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";
import pageCopy from "@/content/page-copy/cphi.json";

// This page's text is edited in the admin ("CPHI Outbound Showcase") and lives in content/page-copy/cphi.json.
const copy = pageCopy;

// Orphan page for people Enwil meets at CPHI. Nothing on the site links here, it is not in
// the sitemap, and it is noindex so it only ever gets visits from the link or QR code Enwil shares.
export const metadata: Metadata = withPageSeo("/cphi", {
  title: "Myntmore at CPHI: Pharma & Financial Services Case Studies",
  description:
    "Case studies and how Myntmore helps pharma and financial services firms book qualified buyer meetings. Meet Enwil Fernandes, Head of Sales.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.myntmore.com/cphi" },
  openGraph: {
    ...OG_BASE,
    title: "Myntmore at CPHI | Meet Enwil Fernandes",
    description:
      "Case studies for pharma and financial services firms, and how Myntmore turns outbound into qualified buyer meetings.",
    url: "https://www.myntmore.com/cphi",
    images: ogImages("/cphi"),
  },
});

const BOOK = "/calendar/enwil";
const PDF = "/myntmore-cphi-enwil-fernandes.pdf";

const HERO_STATS = [
  { value: "20+", label: copy.s01.t01 },
  { value: "18", label: copy.s01.t02 },
  { value: "150+", label: copy.s01.t03 },
  { value: copy.s01.t04, label: "potential pipeline for a contract pharma manufacturer" },
];

const UK_PHARMA = {
  href: "/case-studies/uk-pharma-qualified-meetings",
  rows: [
    { before: "3", after: "20+", label: copy.s01.t05 },
    { before: "5%", after: "35%", label: copy.s01.t06 },
    { before: "1", after: "11+", label: copy.s01.t07 },
    { before: copy.s01.t08, after: copy.s01.t09, label: copy.s01.t10 },
  ],
};

const PHARMA_EXPORT = [
  {
    tag: copy.s01.t11,
    title: copy.s01.t12,
    body: copy.s01.t13,
    metrics: [["18", "buyer meetings held"], ["6", "requests for quotation"], ["36", "positive replies"]],
    href: "/case-studies/pharma-france-contract-manufacturing",
  },
  {
    tag: copy.s01.t14,
    title: copy.s01.t15,
    body: copy.s01.t16,
    metrics: [["16", "sourcing meetings held"], ["5", "technical evaluations requested"], ["39", "positive replies"]],
    href: "/case-studies/pharma-usa-api-second-source",
  },
  {
    tag: copy.s01.t17,
    title: copy.s01.t18,
    body: copy.s01.t19,
    metrics: [["12", "partner meetings held"], ["3", "distributors shortlisted"], ["20", "positive replies"]],
    href: "/case-studies/pharma-uae-distribution-partners",
  },
];

const PHARMA_QUICK = [
  {
    title: "22 qualified meetings in 90 days",
    body: copy.s01.t20,
    href: "/case-studies/pharma-nutraceutical-partnerships",
  },
  {
    title: copy.s01.t21,
    body: copy.s01.t22,
    href: "/case-studies/pharma-contract-manufacturer-pipeline",
  },
];

const PMS = {
  href: "/case-studies/wealth-management-pms-pipeline",
  rows: [
    { value: "150+", label: copy.s01.t23 },
    { value: "52%", label: copy.s01.t24 },
    { value: "500%", label: copy.s01.t25 },
    { value: "421%", label: copy.s01.t26 },
  ],
};

const FIN_CARDS = [
  {
    tag: copy.s01.t27,
    title: copy.s01.t28,
    body: copy.s01.t29,
    metrics: [["16", "qualified stakeholder conversations"], ["4", "enterprise opportunities identified"]],
    href: "/case-studies/saas-fintech-pipeline",
  },
  {
    tag: copy.s01.t30,
    title: "18 qualified conversations",
    body: copy.s01.t31,
    metrics: [["18", "relevant prospect conversations"], ["4", "high-fit prospects in the pipeline"]],
    href: "/case-studies/financial-services-advisory-conversations",
  },
  {
    tag: copy.s01.t32,
    title: "13 qualified meetings",
    body: copy.s01.t33,
    metrics: [["13", "qualified advisory meetings"], ["4", "potential engagements"]],
    href: "/case-studies/financial-services-corporate-finance-meetings",
  },
  {
    tag: copy.s01.t34,
    title: "11 discovery meetings",
    body: copy.s01.t35,
    metrics: [["11", "qualified discovery meetings"], ["5", "reached suitability discussions"]],
    href: "/case-studies/financial-services-wealth-management-discovery",
  },
];

const HELP = [
  {
    title: copy.s01.t36,
    today:
      "Exhibitions like CPHI are the main way you meet buyers. Between events, follow-up goes cold and procurement and regulatory contacts stay out of reach.",
    with: "We map your target buyers by geography, dosage form or API, and certification profile. We reach procurement, sourcing, regulatory and business-development heads directly, in the right language, with messaging built on your approved capabilities.",
    get: "Qualified buyer meetings every month, with the buyer's product need, timeline and next step already captured. Your regulatory and quality teams take it from there.",
    more: { label: copy.s01.t37, href: "/lp/pharma" },
  },
  {
    title: copy.s01.t38,
    today:
      "Growth is capped by who already knows you. Referrals got you here, but CFOs and HNI prospects will not engage a firm they do not yet trust.",
    with: "We build your principals' credibility on LinkedIn first, then run compliance-safe outreach to CFOs, finance heads, business owners and investors. Long, multi-stakeholder cycles get patient follow-up.",
    get: "A steady flow of relevant, informed conversations with people outside your existing network, and a name prospects already trust when your message lands.",
    more: { label: copy.s01.t39, href: "/lp/financial-services" },
  },
];

const STEPS = [
  { n: "01", t: "Map", b: "Define your ICP by industry, geography and buying signals." },
  { n: "02", t: "Verify", b: "Build hand-verified lists of the real decision-makers." },
  { n: "03", t: "Position", b: "Credibility-led messaging and a sharp LinkedIn presence." },
  { n: "04", t: "Reach", b: "Cold email, LinkedIn and ABM, run with proper deliverability." },
  { n: "05", t: "Hand over", b: "Qualified meetings land on your calendar with full context." },
];

const card = "rounded-2xl border bg-white";
const cardBorder = { borderColor: "#E8E2D9" } as const;

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider" style={{ backgroundColor: "#F5B731", color: "#0a0a0a" }}>
      {children}
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: "#A14A08" }}>
      {children}
    </p>
  );
}

function ReadLink({ href }: { href: string }) {
  return (
    <Link href={href} className="inline-flex min-h-[44px] items-center text-sm font-bold underline-offset-4 hover:underline" style={{ color: "#A14A08" }}>{copy.s01.t40}</Link>
  );
}

export default function CphiPage() {
  return (
    <InnerLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, #F5B731, transparent 70%)" }} aria-hidden="true" />
        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider mb-6" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", borderColor: "rgba(245,183,49,0.35)" }}>{copy.s01.t41}</span>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-6" style={{ color: "#0a0a0a" }}>{copy.s01.t42}</h1>
            <p className="text-lg max-w-xl mb-8" style={{ color: "#52525B" }}>{copy.s01.t43}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={BOOK} className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2">{copy.s01.t44}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <a href={PDF} download className="inline-flex min-h-[52px] items-center justify-center rounded-xl border px-8 py-4 text-base font-bold bg-white" style={{ borderColor: "#E8E2D9", color: "#0a0a0a" }}>{copy.s01.t45}</a>
            </div>
          </div>

          {/* Contact card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-7" style={{ backgroundColor: "#F5B731" }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shrink-0">
                  <Image src="/enwil.png" alt={copy.s01.t46} fill sizes="80px" className="object-cover" />
                </div>
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: "#0a0a0a" }}>{copy.s01.t47}</p>
                  <p className="text-2xl font-black leading-tight" style={{ color: "#0a0a0a" }}>{copy.s01.t48}</p>
                  <p className="text-sm font-bold" style={{ color: "#0a0a0a" }}>{copy.s01.t49}</p>
                </div>
              </div>
              <div className="border-t pt-4 space-y-1" style={{ borderColor: "rgba(10,10,10,0.35)" }}>
                <a href="tel:+918169318951" className="flex min-h-[44px] items-center gap-3 text-lg font-extrabold" style={{ color: "#0a0a0a" }}>
                  <span className="w-14 text-[11px] uppercase tracking-wider">{copy.s01.t50}</span>{copy.s01.t51}</a>
                <a href="mailto:enwil@myntmore.com" className="flex min-h-[44px] items-center gap-3 text-lg font-extrabold break-all" style={{ color: "#0a0a0a" }}>
                  <span className="w-14 shrink-0 text-[11px] uppercase tracking-wider">{copy.s01.t52}</span>{copy.s01.t53}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Headline stats */}
      <section className="px-4 pb-16" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {HERO_STATS.map((s) => (
              <div key={s.value} className={`${card} p-5 relative overflow-hidden`} style={cardBorder}>
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: "#F5B731" }} />
                <p className="text-3xl sm:text-4xl font-black mb-1" style={{ color: "#0a0a0a" }}>{s.value}</p>
                <p className="text-xs sm:text-sm leading-snug" style={{ color: "#52525B" }}>{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3" style={{ color: "#52525B" }}>{copy.s01.t54}</p>
        </div>
      </section>

      {/* Pharma */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <Eyebrow>{copy.s01.t55}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black mb-10" style={{ color: "#0a0a0a" }}>{copy.s02.t01}</h2>
          </FadeIn>

          <FadeIn>
            <div className="rounded-3xl border p-6 sm:p-8 mb-6" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
              <Tag>{copy.s02.t02}</Tag>
              <h3 className="text-2xl sm:text-3xl font-black mt-4 mb-3" style={{ color: "#0a0a0a" }}>{copy.s03.t01}</h3>
              <p className="text-base max-w-3xl mb-6" style={{ color: "#52525B" }}>{copy.s03.t02}</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
                {UK_PHARMA.rows.map((r) => (
                  <div key={r.label} className="rounded-xl border p-4" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.4)" }}>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider mb-2" style={{ color: "#A14A08" }}>{r.label}</p>
                    <p className="text-lg font-black" style={{ color: "#0a0a0a" }}>
                      <span style={{ color: "#52525B" }} className="font-bold">{r.before}</span>
                      <span aria-hidden="true" className="mx-1.5" style={{ color: "#A14A08" }}>→</span>
                      <span className="sr-only">{copy.s03.t03}</span>
                      {r.after}
                    </p>
                  </div>
                ))}
              </div>
              <ReadLink href={UK_PHARMA.href} />
            </div>
          </FadeIn>

          <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: "#52525B" }}>{copy.s03.t04}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {PHARMA_EXPORT.map((c, i) => (
              <FadeIn key={c.tag} delay={i * 60}>
                <div className={`${card} p-6 h-full flex flex-col`} style={cardBorder}>
                  <div><Tag>{c.tag}</Tag></div>
                  <h3 className="text-lg font-black mt-3 mb-2" style={{ color: "#0a0a0a" }}>{c.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#3D3D3D" }}>{c.body}</p>
                  <ul className="mt-auto space-y-1.5 mb-2">
                    {c.metrics.map(([n, l]) => (
                      <li key={l} className="flex items-baseline gap-2">
                        <span className="text-xl font-black" style={{ color: "#0a0a0a" }}>{n}</span>
                        <span className="text-xs" style={{ color: "#52525B" }}>{l}</span>
                      </li>
                    ))}
                  </ul>
                  <ReadLink href={c.href} />
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PHARMA_QUICK.map((q) => (
              <div key={q.title} className="rounded-2xl border p-5" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.4)" }}>
                <h3 className="text-lg font-black mb-1" style={{ color: "#0a0a0a" }}>{q.title}</h3>
                <p className="text-sm mb-1" style={{ color: "#3D3D3D" }}>{q.body}</p>
                <ReadLink href={q.href} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial services */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <Eyebrow>{copy.s03.t05}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black mb-10" style={{ color: "#0a0a0a" }}>{copy.s04.t01}</h2>
          </FadeIn>

          <FadeIn>
            <div className="rounded-3xl border p-6 sm:p-8 mb-6 bg-white" style={cardBorder}>
              <Tag>{copy.s04.t02}</Tag>
              <h3 className="text-2xl sm:text-3xl font-black mt-4 mb-3" style={{ color: "#0a0a0a" }}>{copy.s05.t01}</h3>
              <p className="text-base max-w-3xl mb-6" style={{ color: "#52525B" }}>{copy.s05.t02}</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
                {PMS.rows.map((r) => (
                  <div key={r.label} className="rounded-xl border p-4" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.4)" }}>
                    <p className="text-3xl font-black" style={{ color: "#0a0a0a" }}>{r.value}</p>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider mt-1" style={{ color: "#A14A08" }}>{r.label}</p>
                  </div>
                ))}
              </div>
              <ReadLink href={PMS.href} />
            </div>
          </FadeIn>

          <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: "#52525B" }}>{copy.s05.t03}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {FIN_CARDS.map((c, i) => (
              <FadeIn key={c.tag} delay={i * 50}>
                <div className={`${card} p-6 h-full flex flex-col`} style={cardBorder}>
                  <div><Tag>{c.tag}</Tag></div>
                  <h3 className="text-xl font-black mt-3 mb-2" style={{ color: "#0a0a0a" }}>{c.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#3D3D3D" }}>{c.body}</p>
                  <ul className="mt-auto grid grid-cols-2 gap-3 mb-2">
                    {c.metrics.map(([n, l]) => (
                      <li key={l} className="flex items-start gap-2">
                        <span className="text-2xl font-black leading-none" style={{ color: "#0a0a0a" }}>{n}</span>
                        <span className="text-xs leading-snug" style={{ color: "#52525B" }}>{l}</span>
                      </li>
                    ))}
                  </ul>
                  <ReadLink href={c.href} />
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="rounded-2xl border p-5" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.4)" }}>
            <h3 className="text-base font-black mb-1" style={{ color: "#0a0a0a" }}>{copy.s06.t01}</h3>
            <p className="text-sm" style={{ color: "#3D3D3D" }}>{copy.s06.t02}</p>
          </div>
        </div>
      </section>

      {/* How we help */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <Eyebrow>{copy.s06.t03}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black mb-10" style={{ color: "#0a0a0a" }}>{copy.s07.t01}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {HELP.map((h, i) => (
              <FadeIn key={h.title} delay={i * 70}>
                <div className="rounded-3xl border p-7 h-full relative overflow-hidden" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: "#F5B731" }} />
                  <h3 className="text-2xl font-black mb-5" style={{ color: "#0a0a0a" }}>{h.title}</h3>
                  <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1" style={{ color: "#52525B" }}>{copy.s07.t02}</p>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#3D3D3D" }}>{h.today}</p>
                  <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1" style={{ color: "#A14A08" }}>{copy.s07.t03}</p>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#3D3D3D" }}>{h.with}</p>
                  <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1" style={{ color: "#A14A08" }}>{copy.s07.t04}</p>
                  <p className="text-sm leading-relaxed font-semibold mb-2" style={{ color: "#0a0a0a" }}>{h.get}</p>
                  <Link href={h.more.href} className="inline-flex min-h-[44px] items-center text-sm font-bold underline-offset-4 hover:underline" style={{ color: "#A14A08" }}>{h.more.label} →</Link>
                </div>
              </FadeIn>
            ))}
          </div>

          <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: "#52525B" }}>{copy.s07.t05}</p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-2xl border p-4" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.4)" }}>
                <p className="text-2xl font-black" style={{ color: "#A14A08" }}>{s.n}</p>
                <p className="text-base font-black mb-1" style={{ color: "#0a0a0a" }}>{s.t}</p>
                <p className="text-sm leading-snug" style={{ color: "#3D3D3D" }}>{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-8 sm:p-12 relative overflow-hidden" style={{ backgroundColor: "#F5B731" }}>
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none" style={{ backgroundColor: "#F7C84F" }} aria-hidden="true" />
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s08.t01}</h2>
                <p className="text-base mb-6" style={{ color: "#0a0a0a" }}>{copy.s08.t02}</p>
                <Link href={BOOK} className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">{copy.s08.t03}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-black" style={{ color: "#0a0a0a" }}>{copy.s08.t04}</p>
                <p className="text-sm font-bold mb-3" style={{ color: "#0a0a0a" }}>{copy.s08.t05}</p>
                <a href="tel:+918169318951" className="flex min-h-[44px] items-center text-lg font-extrabold" style={{ color: "#0a0a0a" }}>{copy.s08.t06}</a>
                <a href="mailto:enwil@myntmore.com" className="flex min-h-[44px] items-center text-lg font-extrabold break-all" style={{ color: "#0a0a0a" }}>{copy.s08.t07}</a>
                <a href={PDF} download className="flex min-h-[44px] items-center text-sm font-extrabold underline underline-offset-4" style={{ color: "#0a0a0a" }}>{copy.s08.t08}</a>
              </div>
            </div>
          </div>
          <p className="text-xs mt-4" style={{ color: "#52525B" }}>{copy.s08.t09}</p>
        </div>
      </section>
    </InnerLayout>
  );
}
