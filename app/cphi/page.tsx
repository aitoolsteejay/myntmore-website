import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InnerLayout from "../components/InnerLayout";
import FadeIn from "../components/FadeIn";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

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
  { value: "20+", label: "qualified meetings a month for a UK pharma company, up from 3" },
  { value: "18", label: "buyer meetings held in France for a tablet and capsule manufacturer" },
  { value: "150+", label: "qualified leads for a SEBI-registered PMS firm" },
  { value: "₹48L", label: "potential pipeline for a contract pharma manufacturer" },
];

const UK_PHARMA = {
  href: "/case-studies/uk-pharma-qualified-meetings",
  rows: [
    { before: "3", after: "20+", label: "Meetings / month" },
    { before: "5%", after: "35%", label: "Positive response rate" },
    { before: "1", after: "11+", label: "Qualified opportunities" },
    { before: "£18K", after: "£200K+", label: "Potential pipeline" },
  ],
};

const PHARMA_EXPORT = [
  {
    tag: "France",
    title: "Contract manufacturing buyers",
    body: "An Indian tablet and capsule manufacturer relied on referrals and trade shows. We mapped French pharma companies and reached sourcing and external-manufacturing decision-makers.",
    metrics: [["18", "buyer meetings held"], ["6", "requests for quotation"], ["36", "positive replies"]],
    href: "/case-studies/pharma-france-contract-manufacturing",
  },
  {
    tag: "United States",
    title: "API second-source buyers",
    body: "An Indian API manufacturer wanted US formulation buyers with a live sourcing need. We opened with a specific second-source question to procurement and supply chain leaders.",
    metrics: [["16", "sourcing meetings held"], ["5", "technical evaluations requested"], ["39", "positive replies"]],
    href: "/case-studies/pharma-usa-api-second-source",
  },
  {
    tag: "UAE",
    title: "Distribution partner search",
    body: "An Indian formulation company needed a local partner whose portfolio fit. We mapped distributors and importers and qualified fit before every call.",
    metrics: [["12", "partner meetings held"], ["3", "distributors shortlisted"], ["20", "positive replies"]],
    href: "/case-studies/pharma-uae-distribution-partners",
  },
];

const PHARMA_QUICK = [
  {
    title: "22 qualified meetings in 90 days",
    body: "Nutraceutical manufacturer. 3 serious partnership discussions started with distributors and private-label brands.",
    href: "/case-studies/pharma-nutraceutical-partnerships",
  },
  {
    title: "₹48 lakh potential pipeline",
    body: "Contract pharma manufacturer. 19 qualified buyer conversations, 6 moved to commercial evaluation.",
    href: "/case-studies/pharma-contract-manufacturer-pipeline",
  },
];

const PMS = {
  href: "/case-studies/wealth-management-pms-pipeline",
  rows: [
    { value: "150+", label: "Qualified leads generated" },
    { value: "52%", label: "Average response rate" },
    { value: "500%", label: "Growth in impressions" },
    { value: "421%", label: "Engagement growth" },
  ],
};

const FIN_CARDS = [
  {
    tag: "Fintech SaaS",
    title: "₹72 lakh potential pipeline",
    body: "A fintech SaaS company wanted visibility inside target financial institutions.",
    metrics: [["16", "qualified stakeholder conversations"], ["4", "enterprise opportunities identified"]],
    href: "/case-studies/saas-fintech-pipeline",
  },
  {
    tag: "Financial advisory",
    title: "18 qualified conversations",
    body: "An advisory practice wanted prospects beyond referrals and its existing network. Educational founder content plus targeted outreach.",
    metrics: [["18", "relevant prospect conversations"], ["4", "high-fit prospects in the pipeline"]],
    href: "/case-studies/financial-services-advisory-conversations",
  },
  {
    tag: "Corporate finance",
    title: "13 qualified meetings",
    body: "A consultant reaching founders and CFOs on fundraising and strategic finance, positioned around transaction expertise.",
    metrics: [["13", "qualified advisory meetings"], ["4", "potential engagements"]],
    href: "/case-studies/financial-services-corporate-finance-meetings",
  },
  {
    tag: "Wealth management",
    title: "11 discovery meetings",
    body: "A wealth firm building trust with affluent professionals and business owners through advisor-led positioning.",
    metrics: [["11", "qualified discovery meetings"], ["5", "reached suitability discussions"]],
    href: "/case-studies/financial-services-wealth-management-discovery",
  },
];

const HELP = [
  {
    title: "Pharma companies",
    today:
      "Exhibitions like CPHI are the main way you meet buyers. Between events, follow-up goes cold and procurement and regulatory contacts stay out of reach.",
    with: "We map your target buyers by geography, dosage form or API, and certification profile. We reach procurement, sourcing, regulatory and business-development heads directly, in the right language, with messaging built on your approved capabilities.",
    get: "Qualified buyer meetings every month, with the buyer's product need, timeline and next step already captured. Your regulatory and quality teams take it from there.",
    more: { label: "See the pharma outbound page", href: "/lp/pharma" },
  },
  {
    title: "Financial services & fintech",
    today:
      "Growth is capped by who already knows you. Referrals got you here, but CFOs and HNI prospects will not engage a firm they do not yet trust.",
    with: "We build your principals' credibility on LinkedIn first, then run compliance-safe outreach to CFOs, finance heads, business owners and investors. Long, multi-stakeholder cycles get patient follow-up.",
    get: "A steady flow of relevant, informed conversations with people outside your existing network, and a name prospects already trust when your message lands.",
    more: { label: "See the financial services page", href: "/lp/financial-services" },
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
    <Link href={href} className="inline-flex min-h-[44px] items-center text-sm font-bold underline-offset-4 hover:underline" style={{ color: "#A14A08" }}>
      Read the case study →
    </Link>
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
            <span className="inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider mb-6" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", borderColor: "rgba(245,183,49,0.35)" }}>
              Met at CPHI · Pharma &amp; financial services
            </span>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-6" style={{ color: "#0a0a0a" }}>
              More qualified buyer meetings. Less waiting between trade shows.
            </h1>
            <p className="text-lg max-w-xl mb-8" style={{ color: "#52525B" }}>
              We build and run the outbound engine that puts your company in front of the right buyers, partners and decision-makers, through cold email, LinkedIn and account-based outreach. This is what it has delivered for pharma and financial services teams like yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={BOOK} className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2">
                Book 30 minutes with Enwil
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <a href={PDF} download className="inline-flex min-h-[52px] items-center justify-center rounded-xl border px-8 py-4 text-base font-bold bg-white" style={{ borderColor: "#E8E2D9", color: "#0a0a0a" }}>
                Download the PDF
              </a>
            </div>
          </div>

          {/* Contact card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-7" style={{ backgroundColor: "#F5B731" }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shrink-0">
                  <Image src="/enwil.png" alt="Enwil Fernandes, Head of Sales at Myntmore" fill sizes="80px" className="object-cover" />
                </div>
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: "#0a0a0a" }}>Your contact at CPHI</p>
                  <p className="text-2xl font-black leading-tight" style={{ color: "#0a0a0a" }}>Enwil Fernandes</p>
                  <p className="text-sm font-bold" style={{ color: "#0a0a0a" }}>Head of Sales, Myntmore</p>
                </div>
              </div>
              <div className="border-t pt-4 space-y-1" style={{ borderColor: "rgba(10,10,10,0.35)" }}>
                <a href="tel:+918169318951" className="flex min-h-[44px] items-center gap-3 text-lg font-extrabold" style={{ color: "#0a0a0a" }}>
                  <span className="w-14 text-[11px] uppercase tracking-wider">Phone</span>+91 8169318951
                </a>
                <a href="mailto:enwil@myntmore.com" className="flex min-h-[44px] items-center gap-3 text-lg font-extrabold break-all" style={{ color: "#0a0a0a" }}>
                  <span className="w-14 shrink-0 text-[11px] uppercase tracking-wider">Email</span>enwil@myntmore.com
                </a>
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
          <p className="text-xs mt-3" style={{ color: "#52525B" }}>Results from published Myntmore case studies. Client names withheld.</p>
        </div>
      </section>

      {/* Pharma */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <Eyebrow>Pharma</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black mb-10" style={{ color: "#0a0a0a" }}>Buyer meetings for pharma companies, at home and abroad</h2>
          </FadeIn>

          <FadeIn>
            <div className="rounded-3xl border p-6 sm:p-8 mb-6" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
              <Tag>Featured · UK pharma</Tag>
              <h3 className="text-2xl sm:text-3xl font-black mt-4 mb-3" style={{ color: "#0a0a0a" }}>3 to 20+ qualified meetings a month</h3>
              <p className="text-base max-w-3xl mb-6" style={{ color: "#52525B" }}>
                A UK pharma company in a specialised market needed precision, not volume. We narrowed the ICP, mapped high-fit accounts and the real decision-makers inside them, and refined targeting from live campaign data. Results came within 4 months.
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
                {UK_PHARMA.rows.map((r) => (
                  <div key={r.label} className="rounded-xl border p-4" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.4)" }}>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider mb-2" style={{ color: "#A14A08" }}>{r.label}</p>
                    <p className="text-lg font-black" style={{ color: "#0a0a0a" }}>
                      <span style={{ color: "#52525B" }} className="font-bold">{r.before}</span>
                      <span aria-hidden="true" className="mx-1.5" style={{ color: "#A14A08" }}>→</span>
                      <span className="sr-only"> to </span>
                      {r.after}
                    </p>
                  </div>
                ))}
              </div>
              <ReadLink href={UK_PHARMA.href} />
            </div>
          </FadeIn>

          <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: "#52525B" }}>Export &amp; partner search</p>
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
            <Eyebrow>Financial services &amp; fintech</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black mb-10" style={{ color: "#0a0a0a" }}>Trust-first outreach that books serious conversations</h2>
          </FadeIn>

          <FadeIn>
            <div className="rounded-3xl border p-6 sm:p-8 mb-6 bg-white" style={cardBorder}>
              <Tag>Featured · Wealth management &amp; PMS</Tag>
              <h3 className="text-2xl sm:text-3xl font-black mt-4 mb-3" style={{ color: "#0a0a0a" }}>150+ qualified leads for a SEBI-registered PMS firm</h3>
              <p className="text-base max-w-3xl mb-6" style={{ color: "#52525B" }}>
                Wealth management is a trust-first category: prospects rarely act on a cold message alone. The firm started with 793 followers and about 1,094 monthly impressions. We ran content and outreach as one system: expert-led posts, an optimised profile, engagement in the right rooms, calculators as conversation starters, and non-salesy outreach that opened a dialogue about current market conditions.
              </p>
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

          <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: "#52525B" }}>More from financial services and fintech</p>
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
            <h3 className="text-base font-black mb-1" style={{ color: "#0a0a0a" }}>Built for regulated industries</h3>
            <p className="text-sm" style={{ color: "#3D3D3D" }}>No rate, return or approval claims, ever. Messaging rests on credibility, track record and facts you have approved.</p>
          </div>
        </div>
      </section>

      {/* How we help */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <Eyebrow>What changes for you</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black mb-10" style={{ color: "#0a0a0a" }}>From waiting for the next event to a pipeline that fills itself</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {HELP.map((h, i) => (
              <FadeIn key={h.title} delay={i * 70}>
                <div className="rounded-3xl border p-7 h-full relative overflow-hidden" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: "#F5B731" }} />
                  <h3 className="text-2xl font-black mb-5" style={{ color: "#0a0a0a" }}>{h.title}</h3>
                  <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1" style={{ color: "#52525B" }}>Today</p>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#3D3D3D" }}>{h.today}</p>
                  <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1" style={{ color: "#A14A08" }}>With Myntmore</p>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#3D3D3D" }}>{h.with}</p>
                  <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1" style={{ color: "#A14A08" }}>What you get</p>
                  <p className="text-sm leading-relaxed font-semibold mb-2" style={{ color: "#0a0a0a" }}>{h.get}</p>
                  <Link href={h.more.href} className="inline-flex min-h-[44px] items-center text-sm font-bold underline-offset-4 hover:underline" style={{ color: "#A14A08" }}>{h.more.label} →</Link>
                </div>
              </FadeIn>
            ))}
          </div>

          <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: "#52525B" }}>How it works</p>
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
                <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: "#0a0a0a" }}>Let&apos;s talk while you are at CPHI</h2>
                <p className="text-base mb-6" style={{ color: "#0a0a0a" }}>
                  Book a free 30-minute GTM audit. We will look at who you want to reach and show you how the first 90 days would run. No commitment, no pitch deck.
                </p>
                <Link href={BOOK} className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
                  Book a time with Enwil
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-black" style={{ color: "#0a0a0a" }}>Enwil Fernandes</p>
                <p className="text-sm font-bold mb-3" style={{ color: "#0a0a0a" }}>Head of Sales, Myntmore</p>
                <a href="tel:+918169318951" className="flex min-h-[44px] items-center text-lg font-extrabold" style={{ color: "#0a0a0a" }}>+91 8169318951</a>
                <a href="mailto:enwil@myntmore.com" className="flex min-h-[44px] items-center text-lg font-extrabold break-all" style={{ color: "#0a0a0a" }}>enwil@myntmore.com</a>
                <a href={PDF} download className="flex min-h-[44px] items-center text-sm font-extrabold underline underline-offset-4" style={{ color: "#0a0a0a" }}>Download the PDF</a>
              </div>
            </div>
          </div>
          <p className="text-xs mt-4" style={{ color: "#52525B" }}>
            All results are drawn from published Myntmore case studies. Client names are withheld. Outcomes vary with market, offer and execution.
          </p>
        </div>
      </section>
    </InnerLayout>
  );
}
