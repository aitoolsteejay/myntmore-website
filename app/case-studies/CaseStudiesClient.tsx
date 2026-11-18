"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import InnerLayout from "../components/InnerLayout";
import AskYourAI from "../components/AskYourAI";
import StatTicker from "../components/StatTicker";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema, SITE_URL } from "@/lib/schema";
import { caseStudyFilterSlug, CASE_STUDY_FILTERS } from "@/lib/case-study-filters";
import { textTone } from "@/lib/colors";
import { CASE_STUDY_MARKETS, MARKET_OF_SLUG, marketFromSlug } from "@/lib/case-study-markets";
import detailCards from "@/lib/case-study-detail-cards.generated.json";

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Case Studies", url: `${SITE_URL}/case-studies` },
]);

const CASE_STUDIES_AI_RESOURCES = [
  "https://www.myntmore.com/case-studies",
  "https://www.myntmore.com",
  "https://www.myntmore.com/about-us",
];

// ── Blob parallax ──────────────────────────────────────────────────────────────
function Blobs() {
  const b1 = useRef<HTMLDivElement>(null);
  const b2 = useRef<HTMLDivElement>(null);
  const b3 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.innerWidth < 768) return; // skip blob animation on mobile
    let frame: number;
    const tick = (t: number) => {
      const s = t / 1000;
      if (b1.current) { b1.current.style.transform = `translate(${Math.sin(s * 0.4) * 28}px,${Math.cos(s * 0.3) * 22}px)`; }
      if (b2.current) { b2.current.style.transform = `translate(${Math.cos(s * 0.35) * 32}px,${Math.sin(s * 0.45) * 18}px)`; }
      if (b3.current) { b3.current.style.transform = `translate(${Math.sin(s * 0.5) * 20}px,${Math.cos(s * 0.4) * 26}px)`; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div ref={b1} className="absolute rounded-full blur-3xl opacity-25" style={{ width: 520, height: 520, background: "radial-gradient(circle,#F5B731,transparent 70%)", top: "-120px", right: "-80px" }} />
      <div ref={b2} className="absolute rounded-full blur-3xl opacity-20" style={{ width: 400, height: 400, background: "radial-gradient(circle,#a855f7,transparent 70%)", bottom: "-60px", left: "-60px" }} />
      <div ref={b3} className="absolute rounded-full blur-3xl opacity-15" style={{ width: 320, height: 320, background: "radial-gradient(circle,#3b82f6,transparent 70%)", top: "40%", left: "30%" }} />
    </div>
  );
}

// ── SVG underline ──────────────────────────────────────────────────────────────
function Underline() {
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    if (!pathRef.current) return;
    const l = pathRef.current.getTotalLength();
    setLen(l);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDrawn(true); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(pathRef.current);
    return () => io.disconnect();
  }, []);
  return (
    <svg viewBox="0 0 340 14" className="absolute -bottom-2 left-0 w-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path ref={pathRef} d="M4 9 Q85 3 170 9 Q255 15 336 7" stroke="#F5B731" strokeWidth="3.5" strokeLinecap="round"
        strokeDasharray={len || 400} strokeDashoffset={drawn ? 0 : len || 400}
        style={{ transition: drawn ? "stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1)" : "none" }} />
    </svg>
  );
}

// ── Chip marquee ───────────────────────────────────────────────────────────────
const CHIPS = ["AI Lead Generation","Cold Email Infrastructure","LinkedIn Outreach","Personal Branding","ICP Mapping & Lead Scoring","GTM Strategy","ICP Mapping","Pipeline Building","Outbound Automation","Multi-Channel Sequences"];
function Marquee() {
  const items = [...CHIPS, ...CHIPS];
  return (
    <div className="overflow-hidden py-4" aria-hidden>
      <div className="flex gap-3 animate-[marquee-left_28s_linear_infinite] w-max">
        {items.map((c, i) => (
          <span key={i} className="whitespace-nowrap text-xs font-semibold px-4 py-2 rounded-full border" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#52525B" }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

// ── Stat strip ─────────────────────────────────────────────────────────────────
const STATS = [{ v: "40+", l: "Qualified meetings" }, { v: "34%", l: "Avg reply rate" }, { v: "$1.2M", l: "Pipeline generated" }, { v: "18K", l: "LinkedIn followers added" }, { v: "3x", l: "Inbound lead lift" }];

// ── Case study card ────────────────────────────────────────────────────────────
interface CaseStudy {
  slug: string; tag: string; industry: string; accent: string; title: string;
  stats: { v: string; l: string }[]; excerpt: string; services: string[];
}
function CaseCard({ cs }: { cs: CaseStudy }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={`/case-studies/${cs.slug}`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="group block rounded-2xl border overflow-hidden transition-all duration-300"
      style={{ backgroundColor: "#ffffff", borderColor: hov ? cs.accent : "#E8E2D9", boxShadow: hov ? `0 12px 40px ${cs.accent}22` : "0 2px 8px rgba(0,0,0,0.04)", transform: hov ? "translateY(-4px)" : "translateY(0)" }}>
      <div style={{ height: 4, background: `linear-gradient(90deg,${cs.accent},${cs.accent}88)`, opacity: hov ? 1 : 0, transition: "opacity 0.3s" }} />
      <div className="p-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${cs.accent}12`, color: textTone(cs.accent), border: `1px solid ${cs.accent}30` }}>{cs.tag}</span>
        </div>
        <h2 className="text-2xl font-black mb-3 leading-snug" style={{ color: "#0a0a0a" }}>{cs.title}</h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "#52525B" }}>{cs.excerpt}</p>
        <div className="grid grid-cols-3 gap-6 mb-6 py-6 border-y" style={{ borderColor: "#E8E2D9" }}>
          {cs.stats.map((s) => (
            <div key={s.l}>
              <div className="text-3xl font-black" style={{ color: textTone(cs.accent) }}><StatTicker value={s.v} /></div>
              <div className="text-xs mt-0.5" style={{ color: "#71675E" }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {cs.services.map((s) => (
              <span key={s} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "#F8F6F2", color: "#52525B", border: "1px solid #E8E2D9" }}>{s}</span>
            ))}
          </div>
          <span className="text-sm font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1" style={{ color: textTone(cs.accent) }}>
            Read full case study
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── FadeIn ─────────────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ${delay}ms ease, transform 0.7s ${delay}ms ease` }}>
      {children}
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────
// Cards for the long-form case studies that are hand-built pages. Every case study that uses CaseStudyLayout is a
// CMS page (content/case-study-pages) and supplies its own card through lib/case-study-detail-cards.generated.json;
// each keeps its original `order` so the listing reads the same as before.
const HAND_CASE_STUDIES: CaseStudy[] = [
  {
    slug: "specialist-recruitment-linkedin-leads", tag: "Recruitment & Staffing · India", industry: "Recruitment & Staffing", accent: "#0d9488",
    title: "Generating Qualified B2B Leads for a Specialist Recruitment Firm",
    stats: [{ v: "50%", l: "Connection acceptance" }, { v: "40%", l: "Response rate" }, { v: "15", l: "Leads per month" }],
    excerpt: "A recruiter for GCCs and technology companies reached HR, CXO, GCC and engineering leaders with audience-specific LinkedIn and email outreach, averaging 15 leads a month.",
    services: ["LinkedIn Outreach", "Cold Email", "ICP Mapping & Lead Scoring"],
  },
  {
    slug: "leadership-development-messaging-shift", tag: "Professional Services · Executive Coaching & Leadership", industry: "Professional Services", accent: "#a855f7",
    title: "How a Messaging Shift Tripled Hot Leads for a Leadership Brand",
    stats: [{ v: "3x", l: "Hot leads increase" }, { v: "60%", l: "Real Estate CXO acceptance" }, { v: "41%", l: "Peak response rate" }],
    excerpt: "An executive leadership consultancy tripled hot leads from 5 to 15 and achieved a 60% acceptance rate by transitioning from long explanatory pitches to concise, relevance-led connection invitations.",
    services: ["LinkedIn Outreach", "ICP Mapping & Lead Scoring", "Personal Branding"],
  },
  {
    slug: "retail-strategy-design-pipeline", tag: "Professional Services · Retail Strategy & Design", industry: "Professional Services", accent: "#0891b2",
    title: "Business Conversations Across 8+ Industries for a Retail Strategy & Design Business",
    stats: [{ v: "69", l: "Hot leads generated" }, { v: "8+", l: "Industries penetrated" }, { v: "16", l: "Event-based leads" }],
    excerpt: "A retail innovation and store design consultancy generated 69 hot leads across 8+ industries (pet care, auto, fashion, furniture, jewellery) by tailoring outreach around each sector's offline growth priorities.",
    services: ["LinkedIn Outreach", "ICP Mapping & Lead Scoring", "GTM Strategy"],
  },
  {
    slug: "heritage-jewellery-valuation-pipeline", tag: "Professional Services · Heritage & Valuation", industry: "Professional Services", accent: "#a855f7",
    title: "Building a B2B Pipeline for a 180-Year-Old Heritage Jewellery Business",
    stats: [{ v: "68", l: "Hot leads generated" }, { v: "43.7%", l: "Overall response rate" }, { v: "897", l: "Accepted connections" }],
    excerpt: "A 5-generation heritage jewellery valuation and liquidation firm generated 68 hot leads, 897 connections, and 9 meetings by building strategic referral partnerships with CAs, wealth managers, and private banks.",
    services: ["LinkedIn Outreach", "ICP Mapping & Lead Scoring", "Personal Branding"],
  },
  {
    slug: "medical-tourism-platform-pipeline", tag: "Pharma & Healthcare · HealthTech", industry: "Pharma", accent: "#0ea5e9",
    title: "Building an Outbound Pipeline for an AI Medical Tourism Platform",
    stats: [{ v: "140", l: "Qualified leads" }, { v: "61.6%", l: "Hospital reply rate" }, { v: "58", l: "Leads from doctors" }],
    excerpt: "An AI-powered medical travel platform generated 140 qualified leads with a 61.59% hospital decision-maker response rate by leading with relevance, segmentation, and conversation before conversion.",
    services: ["AI Lead Generation", "LinkedIn Outreach", "ICP Mapping & Lead Scoring"],
  },
  {
    slug: "wealth-management-pms-pipeline", tag: "Financial Services · Wealth Management & PMS", industry: "Financial Services", accent: "#7c3aed",
    title: "Building a Solid Pipeline for a Wealth Management & PMS Firm",
    stats: [{ v: "150+", l: "Qualified leads" }, { v: "52%", l: "Avg response rate" }, { v: "500%", l: "Impressions growth" }],
    excerpt: "A 10-year SEBI-registered wealth management & PMS firm serving HNI investors paired LinkedIn authority content with segmented outbound to generate 150+ qualified leads and an average 52% response rate.",
    services: ["Personal Branding", "LinkedIn Outreach", "GTM Strategy"],
  },
  {
    slug: "uk-pharma-qualified-meetings", tag: "Pharma · United Kingdom", industry: "Pharma", accent: "#14b8a6",
    title: "20+ qualified meetings per month for a UK pharma company",
    stats: [{ v: "20+", l: "Meetings/month" }, { v: "35%", l: "Positive response rate" }, { v: "£200K+", l: "Potential pipeline" }],
    excerpt: "A UK pharmaceutical company needed predictable access to a small, specialised market. We narrowed the ICP, mapped high-fit accounts and turned precision outreach into a repeatable opportunity engine.",
    services: ["ICP Mapping & Lead Scoring", "B2B Lead Generation", "LinkedIn Outreach"],
  },
  {
    slug: "saas-series-a", tag: "SaaS · Series A", industry: "SaaS", accent: "#3b82f6",
    title: "40 qualified meetings in 8 weeks from a cold start",
    stats: [{ v: "40", l: "Meetings in 8 weeks" }, { v: "34%", l: "Reply rate" }, { v: "$1.2M", l: "Pipeline generated" }],
    excerpt: "A B2B SaaS company entering a new vertical had zero outbound infrastructure. Their AE was spending 60% of their day manually finding leads. We built a multi-channel engine that changed that completely.",
    services: ["AI Lead Generation", "Cold Email Infrastructure", "LinkedIn Outreach"],
  },
  {
    slug: "professional-services-linkedin", tag: "Professional Services · Bootstrapped", industry: "Professional Services", accent: "#a855f7",
    title: "LinkedIn brand drove 3x inbound in 90 days",
    stats: [{ v: "3x", l: "Inbound lead volume" }, { v: "18K", l: "New followers" }, { v: "4.8%", l: "Post engagement rate" }],
    excerpt: "A successful consulting founder was entirely dependent on word-of-mouth referrals. Growth was highly volatile month-to-month. We took over their LinkedIn presence and turned it into a predictable inbound engine.",
    services: ["Personal Branding", "LinkedIn Outreach"],
  },
  {
    slug: "ecommerce-conversion-playbook", tag: "eCommerce Tech · Seed", industry: "eCommerce Tech", accent: "#10b981",
    title: "Cold email added $400K pipeline for an eCommerce SaaS in 6 weeks",
    stats: [{ v: "28", l: "Meetings booked" }, { v: "41%", l: "Open rate" }, { v: "$400K", l: "Pipeline generated" }],
    excerpt: "An eCommerce SaaS tool had a strong product but no repeatable way to reach DTC brand owners. Manual outreach was inconsistent and burning the team. We built a targeted cold email engine that filled their calendar in 6 weeks.",
    services: ["Cold Email Infrastructure", "AI Lead Generation", "ICP Mapping"],
  },
  {
    slug: "founder-personal-brand-linkedin", tag: "B2B Founder · Bootstrapped", industry: "B2B Founder", accent: "#f97316",
    title: "Bootstrapped founder went from 0 to 22K followers and 8 inbound deals",
    stats: [{ v: "22K", l: "LinkedIn followers" }, { v: "8", l: "Inbound deals" }, { v: "6.2%", l: "Engagement rate" }],
    excerpt: "A bootstrapped B2B founder had expert-level knowledge but zero online presence. Word of mouth was maxed out. We built their personal brand from scratch on LinkedIn and turned their content into a consistent deal-flow engine.",
    services: ["Personal Branding", "LinkedIn Outreach", "GTM Strategy"],
  },
  {
    slug: "predictable-b2b-lead-gen-engine", tag: "Professional Services · Growth Stage", industry: "Professional Services", accent: "#ef4444",
    title: "Built a full outbound engine that books 15+ meetings/month on autopilot",
    stats: [{ v: "15+", l: "Meetings/month" }, { v: "29%", l: "Reply rate" }, { v: "4x", l: "Pipeline vs prior quarter" }],
    excerpt: "A mid-size B2B services firm had tried outbound before and failed: bad lists, generic copy, zero personalisation. We rebuilt everything from ICP mapping to sequence copy to tech stack and turned outbound into their #1 channel.",
    services: ["AI Lead Generation", "Cold Email Infrastructure", "ICP Mapping & Lead Scoring"],
  },
];

function mergeByOrder(hand: CaseStudy[], cms: (CaseStudy & { order?: number })[]): CaseStudy[] {
  const total = hand.length + cms.length;
  const slots: (CaseStudy | undefined)[] = new Array(total).fill(undefined);
  const extra: CaseStudy[] = [];
  for (const { order, ...card } of cms) {
    if (Number.isInteger(order) && (order as number) >= 0 && (order as number) < total && !slots[order as number]) slots[order as number] = card;
    else extra.push(card);
  }
  const rest = [...hand];
  const placed = slots.map((slot) => slot ?? rest.shift());
  return [...placed.filter((c): c is CaseStudy => !!c), ...rest, ...extra];
}

const CASE_STUDIES: CaseStudy[] = mergeByOrder(HAND_CASE_STUDIES, detailCards as (CaseStudy & { order?: number })[]);

const INDUSTRIES = CASE_STUDY_FILTERS.map((filter) => filter.label);

// ── Page ───────────────────────────────────────────────────────────────────────
// "Show more" reveals the industry case study library in steps; the page itself still lists
// the original cards first.
const SHOW_MORE_STEP = 10;

// A market page passes its own hero text (marketHero) and its written guide (children), which sits under the cards.
export default function CaseStudiesClient({ initialFilter = "All", initialMarket, libraryCards = [], marketHero, children }: { initialFilter?: string; initialMarket?: string; libraryCards?: CaseStudy[]; marketHero?: { lead: string; underlined: string; intro: string }; children?: React.ReactNode }) {
  const industryFilter = initialFilter;
  const market = initialMarket ? marketFromSlug(initialMarket) : null;
  const allCaseStudies = [...CASE_STUDIES, ...libraryCards];
  const filteredCaseStudies = market
    ? allCaseStudies.filter((cs) => MARKET_OF_SLUG[cs.slug] === market.slug)
    : industryFilter === "All" ? allCaseStudies : allCaseStudies.filter((cs) => cs.industry === industryFilter);
  const marketIndustries = market ? Array.from(new Set(filteredCaseStudies.map((cs) => cs.industry))) : [];
  // The "All" view starts with the original cards; the library follows on request. An industry
  // view is short (at most about a dozen cards), so it shows everything at once.
  const [shown, setShown] = useState(CASE_STUDIES.length);
  const limit = industryFilter === "All" && !market ? shown : filteredCaseStudies.length;
  const remaining = filteredCaseStudies.length - limit;

  return (
    <InnerLayout>
      {market && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `B2B lead generation case studies in ${market.phrase}`,
            url: `${SITE_URL}/case-studies/markets/${market.slug}`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: filteredCaseStudies.map((cs, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/case-studies/${cs.slug}`, name: cs.title })),
            },
          }}
        />
      )}
      <JsonLd data={market ? buildBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Case Studies", url: `${SITE_URL}/case-studies` },
        { name: market.label, url: `${SITE_URL}/case-studies/markets/${market.slug}` },
      ]) : industryFilter === "All" ? BREADCRUMB_SCHEMA : buildBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Case Studies", url: `${SITE_URL}/case-studies` },
        { name: industryFilter, url: `${SITE_URL}/case-studies/${caseStudyFilterSlug(industryFilter)}` },
      ])} />
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <Blobs />
        <div className="relative max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
              {market ? `Client Results · ${market.label}` : "Client Results"}
            </span>
          </div>
          {market ? (
            <>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
                {marketHero ? marketHero.lead : "B2B lead generation case studies in"}{" "}
                <span className="relative inline-block">
                  {marketHero ? marketHero.underlined : market.phrase}
                  <Underline />
                </span>
              </h1>
              <p className="text-lg sm:text-xl max-w-2xl hero-fade-d2" style={{ color: "#52525B" }}>
                {marketHero ? marketHero.intro : `${filteredCaseStudies.length} Myntmore case studies from outbound campaigns in ${market.phrase}, across ${marketIndustries.join(", ")}. Each one has the real numbers: meetings booked, reply rates and what we did to get them.`}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
                Results in the CRM,<br />
                <span className="relative inline-block">
                  not the deck
                  <Underline />
                </span>
              </h1>
              <p className="text-lg sm:text-xl max-w-2xl hero-fade-d2" style={{ color: "#52525B" }}>
                Deep dives into how we built pipelines for SaaS, services, and eCommerce tech. Real numbers, real systems.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Chip marquee */}
      <div style={{ backgroundColor: "#F0EDE8", borderTop: "1px solid #E8E2D9", borderBottom: "1px solid #E8E2D9" }}>
        <Marquee />
      </div>

      {/* Stat strip */}
      {!market && <FadeIn>
        <section className="py-10 px-4" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #E8E2D9" }}>
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "#71675E" }}>
            Highlights from the case studies below, not a sitewide average
          </p>
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-6">
            {STATS.map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-3xl font-black" style={{ color: "#A14A08" }}><StatTicker value={s.v} /></div>
                <div className="text-xs mt-1" style={{ color: "#71675E" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>}

      {/* Case study cards */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-10" role="group" aria-label="Filter case studies by industry">
            {INDUSTRIES.map((industry) => {
              const active = !market && industryFilter === industry;
              return (
                <Link
                  key={industry}
                  href={industry === "All" ? "/case-studies" : `/case-studies/${caseStudyFilterSlug(industry)}`}
                  scroll={false}
                  aria-current={active ? "page" : undefined}
                  className="min-h-[44px] text-sm font-semibold px-4 py-2 rounded-full border transition-colors"
                  style={active
                    ? { backgroundColor: "#F5B731", color: "#0A0A0A", borderColor: "#F5B731" }
                    : { backgroundColor: "#ffffff", color: "#52525B", borderColor: "#E8E2D9" }}
                >
                  {industry}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-10" role="group" aria-label="Browse case studies by market">
            <span className="text-xs font-bold uppercase tracking-widest mr-1" style={{ color: "#71675E" }}>Browse by market</span>
            {CASE_STUDY_MARKETS.map((m) => {
              const active = market?.slug === m.slug;
              return (
                <Link
                  key={m.slug}
                  href={`/case-studies/markets/${m.slug}`}
                  scroll={false}
                  aria-current={active ? "page" : undefined}
                  className="inline-flex min-h-[44px] items-center text-sm font-semibold px-4 py-2 rounded-full border transition-colors"
                  style={active
                    ? { backgroundColor: "#F5B731", color: "#0A0A0A", borderColor: "#F5B731" }
                    : { backgroundColor: "#ffffff", color: "#52525B", borderColor: "#E8E2D9" }}
                >
                  {m.label}
                </Link>
              );
            })}
          </div>
          <div className="space-y-8">
            {filteredCaseStudies.map((cs, i) => (
              // Every card is in the page (so every link is crawlable); cards past the limit are just hidden.
              <div key={cs.slug} hidden={i >= limit}>
                <FadeIn delay={(i % 6) * 80}>
                  <CaseCard cs={cs} />
                </FadeIn>
              </div>
            ))}
          </div>
          {industryFilter === "All" && !market && remaining > 0 && (
            <div className="mt-10 text-center">
              <p className="mb-4 text-sm" style={{ color: "#71675E" }}>Showing {limit} of {filteredCaseStudies.length} case studies</p>
              <button
                type="button"
                onClick={() => setShown((n) => n + SHOW_MORE_STEP)}
                className="px-7 py-3.5 text-sm font-bold rounded-full border transition-colors hover:border-[#0a0a0a]"
                style={{ backgroundColor: "#ffffff", color: "#0a0a0a", borderColor: "#E8E2D9" }}
              >
                Show {Math.min(SHOW_MORE_STEP, remaining)} more
              </button>
              <p className="mt-3 text-xs" style={{ color: "#71675E" }}>Or filter by industry above to see every example for one sector.</p>
            </div>
          )}
        </div>
      </section>

      {children}

      <section className="py-16 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <AskYourAI topic="Myntmore" resources={CASE_STUDIES_AI_RESOURCES} />
        </div>
      </section>

      {/* CTA */}
      <FadeIn>
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto rounded-2xl p-10 text-center border" style={{ background: "#FEF9EC", borderColor: "rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: "rgba(245,183,49,0.15)", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
              Want results like these?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: "#0A0A0A" }}>Book a free 30-min audit</h2>
            <p className="text-base mb-8" style={{ color: "#52525B" }}>We&apos;ll map exactly how to replicate these results for your business.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/book-a-call" className="btn-dark px-8 py-4 text-sm font-bold">Book Free Audit</a>
              <Link href="/case-studies/saas-series-a" className="px-8 py-4 text-sm font-bold rounded-full border transition-all duration-200 hover:bg-[#FEF9EC]" style={{ backgroundColor: "#FFFFFF", borderColor: "#D0C9BF", color: "#0A0A0A" }}>Read SaaS case study</Link>
            </div>
          </div>
        </section>
      </FadeIn>
    </InnerLayout>
  );
}
