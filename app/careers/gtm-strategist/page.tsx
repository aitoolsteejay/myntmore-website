import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildJobPostingSchema } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import { OG_BASE } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/careers/gtm-strategist", {
  title: "GTM Strategist, Mumbai | Rs 6–15 LPA",
  description: "Join Myntmore as GTM Strategist in BKC, Mumbai. Own growth across B2B brands via LinkedIn, cold email & AI automation. Rs 6-15 LPA. Apply now.",
  keywords: ["gtm strategist jobs mumbai", "growth marketing jobs mumbai", "b2b growth strategist job", "growth marketing strategist jobs india", "gtm jobs mumbai", "b2b marketing jobs bkc", "growth marketing career mumbai", "lead generation strategist jobs", "linkedin marketing jobs mumbai", "growth strategist job b2b agency", "demand generation jobs mumbai", "marketing jobs bkc mumbai", "b2b growth marketing career", "myntmore careers", "gtm strategist job openings"],
  alternates: { canonical: "https://www.myntmore.com/careers/gtm-strategist" },
  openGraph: {
    ...OG_BASE,
    title: "GTM Strategist | Myntmore Careers",
    description: "Own growth for multiple B2B brands: build predictable pipelines, not just campaigns. Full-time, BKC Mumbai.",
    url: "https://www.myntmore.com/careers/gtm-strategist",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
});

const APPLY_SUBJECT = "Application for GTM Strategist";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051")}`;
const ACCENT = "#10b981";

// datePosted is this page's real git creation date, not fabricated.
// validThrough is a 6-month rolling window from that date, since this is an
// ongoing/rolling posting with no fixed application deadline.
const JOB_SCHEMA = buildJobPostingSchema({
  title: "GTM Strategist",
  description: "Join Myntmore as a Senior Growth Marketing Strategist in BKC, Mumbai. Own growth across multiple B2B brands using LinkedIn, cold email, AI automation, and content-led demand gen. Rs 6–15 LPA + incentives.",
  url: "https://www.myntmore.com/careers/gtm-strategist",
  datePosted: "2026-07-28T17:15:52+05:30",
  validThrough: "2027-01-28T17:15:52+05:30",
  employmentType: "FULL_TIME",
  baseSalary: { minValue: 600000, maxValue: 1500000, unitText: "YEAR" },
});

export default function GtmStrategist() {
  return (
    <InnerLayout>
      <JsonLd data={JOB_SCHEMA} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Careers", href: "/careers" }, { label: "GTM Strategist", href: "/careers/gtm-strategist" }]} />
          <span className="inline-flex text-xs font-bold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: "rgba(16,185,129,0.08)", color: textTone(ACCENT), border: "1px solid rgba(16,185,129,0.2)" }}>Full-Time · BKC, Mumbai</span>
          <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            GTM Strategist
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[["Location", "WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051"], ["Type", "Full-Time"], ["CTC", "Rs 6–15 LPA + incentives"]].map(([label, value]) => (
              <div key={label} className="rounded-xl border p-4" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <p className="text-xs mb-1" style={{ color: "#71675E" }}>{label}</p>
                {label === "Location" ? (
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:underline" style={{ color: "#0a0a0a" }}>
                    {value} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <p className="text-sm font-bold" style={{ color: "#0a0a0a" }}>{value}</p>
                )}
              </div>
            ))}
          </div>

          <a href={`mailto:founder@myntmore.com,growth@myntmore.com?subject=${encodeURIComponent(APPLY_SUBJECT)}`} className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
            Apply Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <p className="mt-3 text-xs" style={{ color: "#71675E" }}>Send to founder@myntmore.com and growth@myntmore.com with subject: {APPLY_SUBJECT}</p>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>About the role</h2>
            <p className="text-base leading-relaxed" style={{ color: "#52525B" }}>
              We&apos;re looking for a Senior Growth Marketing Strategist with 3+ years of experience in B2B lead generation, someone who understands how to build predictable pipelines, not just run campaigns. You&apos;ll own growth across multiple B2B brands using LinkedIn, cold email, AI automation, newsletters, outbound systems, and content-led demand generation. We&apos;re looking for someone who can think strategically, identify the right audiences, craft compelling messaging, optimise outreach, and continuously improve pipeline performance, working directly with founders to solve one problem: how do we consistently generate more qualified sales conversations?
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-2" style={{ color: "#0a0a0a" }}>Primary goal</h2>
            <p className="text-base leading-relaxed" style={{ color: "#52525B" }}>
              Generate predictable, high-quality B2B pipeline every single week, for Myntmore and for our clients. That means working across 5&ndash;10+ businesses at a time, understanding how different industries buy, sell, and scale, spotting patterns across markets, and building a skillset that makes you valuable across any business, not just one niche.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>What you&apos;ll do</h2>
            <div className="space-y-4">
              {[
                { title: "B2B Growth Strategy", desc: "Build and own lead generation strategies for multiple B2B businesses. Design scalable outbound systems across LinkedIn, cold email, newsletters, communities, and referrals. Identify new opportunities to increase pipeline and conversion." },
                { title: "Pipeline Generation", desc: "Generate qualified decision-maker meetings through multi-channel outbound. Own weekly and monthly pipeline targets, and continuously improve reply rates, booking rates, and conversion metrics." },
                { title: "ICP & Messaging", desc: "Research industries, buying committees, and decision-makers. Define ICPs and buyer personas, and create messaging frameworks that resonate across industries and buyer stages." },
                { title: "LinkedIn & Cold Email", desc: "Build, launch, and optimise outreach campaigns. Manage sequencing, deliverability, inbox health, and domain reputation using tools like Clay, Apollo, Smartlead, Instantly, Waalaxy, Sales Navigator, Snov, ListKit, MillionVerifier, and BounceBan." },
                { title: "AI & Automation", desc: "Use AI to improve research, personalisation, campaign creation, and workflow automation. Identify repetitive processes to automate and stay current with emerging AI tools." },
                { title: "Performance & Optimisation", desc: "Own metrics including qualified pipeline, meetings booked, reply and conversion rates, and channel performance. Translate insights into improvements that increase pipeline quality and efficiency." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border p-5" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <h3 className="text-sm font-black mb-2" style={{ color: textTone(ACCENT) }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>Who you are</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "#52525B" }}>
              We&apos;re looking for someone with 3+ years of experience in B2B lead generation or growth marketing who enjoys solving growth challenges rather than simply executing tasks.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Experience", desc: "3+ years generating B2B leads" },
                { label: "Outbound", desc: "Strong understanding of LinkedIn outreach and cold email" },
                { label: "Technical", desc: "Experience with outbound automation and AI tools" },
                { label: "Research", desc: "Excellent research and ICP development skills" },
                { label: "Copywriting", desc: "Strong copywriting and messaging abilities" },
                { label: "Analytical", desc: "Comfortable interpreting campaign metrics with high ownership" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border p-4" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <p className="text-xs font-black mb-1" style={{ color: textTone(ACCENT) }}>{item.label}</p>
                  <p className="text-sm" style={{ color: "#52525B" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>Skills &amp; mindset we value</h2>
            {["Outcome-Obsessed: leads over everything", "Channel Fluent: LinkedIn + Email + Communities", "Research-Driven: ICP clarity means better leads", "AI-Friendly: we run AI-led systems", "Fast Learner + High Ownership"].map((item) => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <p className="text-base" style={{ color: "#3D3D3D" }}>{item}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>Why join Myntmore</h2>
            <p className="text-base leading-relaxed" style={{ color: "#52525B" }}>
              Work directly on real founder pipelines, get exposure to multiple industries and global markets, and learn AI-led growth systems that very few agencies in India truly understand. Work from WeWork Enam Sambhav, BKC with a young, hungry team, with high growth potential and incentives tied to lead performance.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>Our values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: "⚡", title: "Ship fast", desc: "We move in days, not quarters. If it can be tested, it gets tested this week." },
                { icon: "🎯", title: "Outcome over hours", desc: "We don't track time. We track results. Own your output, own your schedule." },
                { icon: "✨", title: "AI-native by default", desc: "Every workflow starts with: how do we use AI here? Not as a buzzword, as leverage." },
                { icon: "📖", title: "Learn out loud", desc: "Share what's working. Share what failed. The whole team gets smarter together." },
              ].map((v) => (
                <div key={v.title} className="rounded-xl border p-4" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <div className="text-xl mb-2">{v.icon}</div>
                  <p className="text-sm font-black mb-1" style={{ color: "#0a0a0a" }}>{v.title}</p>
                  <p className="text-sm" style={{ color: "#52525B" }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-8 border" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.3)" }}>
            <h3 className="text-lg font-black mb-4" style={{ color: "#0a0a0a" }}>Ready to apply?</h3>
            <div className="space-y-2 mb-6">
              <a href={`mailto:founder@myntmore.com?subject=${encodeURIComponent(APPLY_SUBJECT)}`} className="flex min-h-[44px] items-center text-sm font-semibold" style={{ color: "#A14A08" }}>founder@myntmore.com</a>
              <a href={`mailto:growth@myntmore.com?subject=${encodeURIComponent(APPLY_SUBJECT)}`} className="flex min-h-[44px] items-center text-sm font-semibold" style={{ color: "#A14A08" }}>growth@myntmore.com</a>
            </div>
            <a href={`mailto:founder@myntmore.com,growth@myntmore.com?subject=${encodeURIComponent(APPLY_SUBJECT)}`} className="btn-dark px-6 py-3 text-sm font-bold inline-flex items-center gap-2">
              Apply Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}
