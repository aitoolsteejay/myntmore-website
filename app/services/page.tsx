import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../components/InnerLayout";
import LeadCaptureForm from "../components/LeadCaptureForm";
import StatTicker from "../components/StatTicker";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildFaqSchema } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import { pageFaqsQA } from "@/lib/page-faqs";
import { OG_BASE } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/services", {
  title: "AI-Powered B2B Lead Generation Services",
  description: "Seven productized B2B growth services: LinkedIn, Cold Email, ICP Mapping, AI Lead Gen, ABM, Personal Branding, GTM Strategy. Book a free audit.",
  alternates: { canonical: "https://www.myntmore.com/services" },
  keywords: ["b2b lead generation agency", "b2b lead generation services", "outbound marketing agency", "b2b lead generation agency mumbai", "ai lead generation company", "linkedin outreach and cold email agency", "account based marketing agency", "icp mapping and lead scoring services", "b2b growth agency", "b2b demand generation agency", "outbound sales agency for saas", "lead generation agency vs in-house sdr team", "how to generate b2b leads without cold calling", "b2b sales pipeline agency", "personal branding and linkedin ghostwriting agency", "productized b2b lead generation services", "gtm strategy agency"],
  openGraph: {
    ...OG_BASE,
    title: "B2B Lead Generation Services | AI-Powered Outbound | Myntmore",
    description: "Seven productized B2B growth services. We build the architecture, you close the deals.",
    url: "https://www.myntmore.com/services",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
});

const SERVICES = [
  { number: "01", title: "LinkedIn Outreach & Automation", tagline: "Conversations happening in your LinkedIn inbox. Every week.", desc: "Multi-touch sequences that mimic human behaviour and generate replies from the right people. We manage everything from profile audit to reply handoff.", href: "/services/linkedin-outreach", hoverClass: "card-hover-linkedin", accentColor: "#0077b5", stats: [{ v: "48%", l: "Avg acceptance rate" }, { v: "21%", l: "Avg reply rate" }] },
  { number: "02", title: "Cold Email Infrastructure", tagline: "Cold email that actually lands in the inbox.", desc: "The full technical stack built and managed for you. Domain setup, warmup, deliverability, AI-personalised sequences. 98.5% inbox rate target.", href: "/services/cold-email", hoverClass: "card-hover-green", accentColor: "#16a34a", stats: [{ v: "98.5%", l: "Inbox rate" }, { v: "<0.2%", l: "Spam rate" }] },
  { number: "03", title: "ICP Mapping & Lead Scoring", tagline: "Know exactly who is ready to buy. Before your competitors do.", desc: "We map your ideal customer profile against 40+ real-world intent signals. Trigger-based lists updated daily. You stop wasting reps on bad-fit prospects.", href: "/services/sales-intelligence", hoverClass: "card-hover-purple", accentColor: "#a855f7", stats: [{ v: "40+", l: "Intent signals" }, { v: "Daily", l: "List refresh" }] },
  { number: "04", title: "AI Lead Generation", tagline: "Your pipeline shouldn't depend on how much time your team has.", desc: "Custom AI agents research, qualify, and prioritise leads at scale. 80% reduction in manual research time. 300–1500 scored, research-enriched leads per month.", href: "/services/ai-lead-generation", hoverClass: "card-hover-blue", accentColor: "#3b82f6", stats: [{ v: "80%", l: "Less manual research" }, { v: "35%", l: "Avg LinkedIn reply rate" }] },
  { number: "05", title: "Account-Based Marketing", tagline: "Stop marketing to everyone. Go all-in on the accounts that matter.", desc: "Coordinated multi-channel campaigns across email and LinkedIn engage the entire buying committee at your highest-value target accounts, so your AE isn't the first name they've seen.", href: "/services/account-based-marketing", hoverClass: "card-hover-indigo", accentColor: "#6366f1", stats: [{ v: "6.4x", l: "Higher deal size" }, { v: "3+", l: "Channels orchestrated" }] },
  { number: "06", title: "Personal Branding", tagline: "Your buyers are on LinkedIn every day. Are they seeing you?", desc: "We ghostwrite content that positions you as the authority in your space. 4–8 posts/month from monthly voice interviews. Inbound finds you instead of you chasing it.", href: "/services/personal-branding", hoverClass: "card-hover-warm", accentColor: "#D97706", stats: [{ v: "10x", l: "Profile visit increase" }, { v: "2x", l: "Reply rate boost" }] },
  { number: "07", title: "GTM Strategy", tagline: "A go-to-market plan built to be run, not filed away.", desc: "ICP, positioning, and channel mix, built by the same team that executes it across cold email, LinkedIn, ABM, or personal branding. Reviewed and adjusted monthly against real data.", href: "/services/gtm-strategy", hoverClass: "card-hover-teal", accentColor: "#0891b2", stats: [{ v: "18", l: "Days to campaign launch" }, { v: "130+", l: "B2B companies" }] },
];

const FAQ = pageFaqsQA("service-overview");

export default function Services() {
  return (
    <InnerLayout>
      <JsonLd data={buildFaqSchema(FAQ.map((f) => ({ question: f.q, answer: f.a })))} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
          <div className="mb-4">
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
              B2B Lead Generation Services
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            Seven systems<br />One growth engine
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl" style={{ color: "#52525B" }}>
            Every service is productized, scoped, and runs on proven infrastructure, not promises. We build the architecture, you close the deals.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {SERVICES.map((s) => (
            <Link key={s.href} href={s.href} className={`group block rounded-2xl border p-8 ${s.hoverClass}`} style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-black" style={{ color: textTone(s.accentColor) }}>{s.number}</span>
                    <h2 className="text-xl font-black" style={{ color: "#0a0a0a" }}>{s.title}</h2>
                  </div>
                  <p className="text-sm font-semibold mb-3" style={{ color: textTone(s.accentColor) }}>{s.tagline}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{s.desc}</p>
                  <div className="flex gap-6 mt-4">
                    {s.stats.map((st) => (
                      <div key={st.l}>
                        <StatTicker value={st.v} className="text-xl font-black" style={{ color: "#0a0a0a" }} />
                        <span className="block text-xs" style={{ color: "#71675E" }}>{st.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <svg className="w-5 h-5 flex-shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#B8B0A7" }}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-10" style={{ color: "#0a0a0a" }}>Frequently asked questions</h2>
          <div className="space-y-6">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <h3 className="text-base font-bold mb-3" style={{ color: "#0a0a0a" }}>{item.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Lead Generation Hubs */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
              Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-2" style={{ color: "#0a0a0a" }}>
              B2B Outbound Services Across India
            </h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#52525B" }}>
              From BKC, we run <Link href="/b2b-lead-generation-mumbai" className="underline underline-offset-2">B2B lead generation in Mumbai</Link> and manage outbound campaigns for teams across India.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { city: "Mumbai", href: "/b2b-lead-generation-mumbai", blurb: "BFSI, Media & SaaS" },
              { city: "Bengaluru", href: "/b2b-lead-generation-bengaluru", blurb: "Tech & B2B SaaS" },
              { city: "Delhi NCR", href: "/b2b-lead-generation-delhi", blurb: "Enterprise & D2C Supply" },
              { city: "Gurugram", href: "/b2b-lead-generation-gurugram", blurb: "SaaS, Fintech & Staffing" },
              { city: "Noida", href: "/b2b-lead-generation-noida", blurb: "IT Services & Electronics" },
              { city: "Pune", href: "/b2b-lead-generation-pune", blurb: "Auto, IT & Industrial" },
              { city: "Hyderabad", href: "/b2b-lead-generation-hyderabad", blurb: "Pharma & Enterprise Tech" },
              { city: "Chennai", href: "/b2b-lead-generation-chennai", blurb: "SaaS & Manufacturing" },
              { city: "Ahmedabad", href: "/b2b-lead-generation-ahmedabad", blurb: "Chemicals & Export" },
              { city: "Kolkata", href: "/b2b-lead-generation-kolkata", blurb: "Industrial & Healthcare" },
              { city: "Jaipur", href: "/b2b-lead-generation-jaipur", blurb: "Gems, Jewellery & IT" },
              { city: "Indore", href: "/b2b-lead-generation-indore", blurb: "IT, Pharma & Auto" },
              { city: "Surat", href: "/b2b-lead-generation-surat", blurb: "Diamonds & Textiles" },
              { city: "Coimbatore", href: "/b2b-lead-generation-coimbatore", blurb: "Pumps, Textiles & IT" },
              { city: "Dubai", href: "/b2b-lead-generation-dubai", blurb: "UAE B2B & Market Entry" },
              { city: "Abu Dhabi", href: "/b2b-lead-generation-abu-dhabi", blurb: "Enterprise & Energy" },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="p-4 rounded-xl border bg-white hover:border-[#F5B731] transition-all group block shadow-xs"
                style={{ borderColor: "#E8E2D9" }}
              >
                <div className="text-sm font-bold text-[#0A0A0A] group-hover:text-[#A14A08] transition-colors">
                  {c.city}
                </div>
                <div className="text-xs text-[#71675E] mt-0.5">
                  {c.blurb}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LeadCaptureForm />
    </InnerLayout>
  );
}
