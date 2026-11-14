import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildJobPostingSchema } from "@/lib/schema";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/careers/sales-executive", {
  title: "Sales Executive, Mumbai | Rs 4–7 LPA",
  description: "Join Myntmore as Sales Executive in BKC, Mumbai. Rs 4-7 LPA. Prospect, build client relationships, and close deals. Apply now.",
  keywords: ["sales executive jobs mumbai", "b2b sales executive job", "personal branding sales jobs", "full time sales jobs mumbai", "sales executive jobs bkc", "crm sales executive job", "client facing sales jobs mumbai", "business development executive jobs", "sales jobs personal branding agency", "myntmore careers", "sales executive job b2b growth agency", "linkedin personal branding sales jobs"],
  alternates: { canonical: "https://www.myntmore.com/careers/sales-executive" },
  openGraph: {
    ...OG_BASE,
    title: "Sales Executive | Myntmore Careers",
    description: "Prospect, build relationships, and close deals for a personal-branding and outbound growth agency. Full-time, BKC Mumbai.",
    url: "https://www.myntmore.com/careers/sales-executive",
    images: ogImages("/careers/sales-executive"),
  },
});

const APPLY_SUBJECT = "Application for Sales Executive";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051")}`;

// datePosted is this page's real creation date, not fabricated. validThrough
// is a 6-month rolling window from that date, matching every other rolling
// posting on this site with no fixed application deadline.
const JOB_SCHEMA = buildJobPostingSchema({
  title: "Sales Executive",
  description: "Join Myntmore as a Sales Executive in BKC, Mumbai. Prospect and connect with founders, executives, and professionals, manage the CRM, and close deals for a personal-branding and outbound growth agency. Rs 4-7 LPA.",
  url: "https://www.myntmore.com/careers/sales-executive",
  datePosted: "2026-08-26T00:00:00+05:30",
  validThrough: "2027-02-26T00:00:00+05:30",
  employmentType: "FULL_TIME",
  baseSalary: { minValue: 400000, maxValue: 700000, unitText: "YEAR" },
});

export default function SalesExecutive() {
  return (
    <InnerLayout>
      <JsonLd data={JOB_SCHEMA} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Careers", href: "/careers" }, { label: "Sales Executive", href: "/careers/sales-executive" }]} />
          <span className="inline-flex text-xs font-bold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: "rgba(245,183,49,0.08)", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>Full-Time · BKC, Mumbai</span>
          <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            Sales Executive
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[["Location", "WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051"], ["Type", "Full-Time"], ["CTC", "Rs 4–7 LPA"]].map(([label, value]) => (
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
              We&apos;re looking for a driven Sales Executive to identify and connect with potential clients, high-level executives, startup founders, doctors, lawyers, and more, and help them unlock the power of personal branding with Myntmore. You&apos;ll own the full sales cycle: prospecting, relationship-building, and closing, while keeping our CRM organised and our pipeline moving.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>What you&apos;ll do</h2>
            <div className="space-y-4">
              {[
                { title: "Find the Stars", desc: "Identify and connect with potential clients, including high-level executives, startup founders, doctors, lawyers, and more. Help them unlock the power of personal branding with Myntmore." },
                { title: "Master the CRM Game", desc: "Take charge of managing our CRM system, keeping it organised and up to date with valuable insights. Play a key role in streamlining our sales process and ensuring everything runs smoothly." },
                { title: "Be the Client's Bestie", desc: "Build strong, meaningful relationships with clients. Understand their needs and show them how Myntmore can elevate their LinkedIn presence and personal brand." },
                { title: "Sales Strategy Pro", desc: "Collaborate with the team to fine-tune our sales strategies, pitches, and outreach methods. We love fresh ideas and innovative approaches to growing our client base." },
                { title: "Close Like a Pro", desc: "Guide leads through the sales process, handle objections with ease, and close deals successfully. Track leads, follow-ups, and conversions meticulously to hit your targets consistently." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border p-5" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <h3 className="text-sm font-black mb-2" style={{ color: "#A14A08" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>Who you are</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Sales Experience", desc: "Background in sales (branding, marketing, or B2B services) with a passion to drive results" },
                { label: "CRM Savvy", desc: "Familiar with CRM tools like Zoho, or eager to learn and keep the system organised" },
                { label: "Natural Communicator", desc: "Skilled in building rapport, making clients feel valued and understood" },
                { label: "Confident Negotiator", desc: "Able to close deals with ease and negotiate effectively" },
                { label: "Self-Driven & Organised", desc: "Strong time management, able to multitask and stay on top of every lead" },
                { label: "Data-Driven", desc: "Know how to interpret CRM data to boost sales and performance" },
                { label: "Tech-Savvy", desc: "Familiar with sales tools, always open to learning new ones" },
                { label: "Team Player", desc: "Collaborative, sharing ideas and working together to meet goals" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border p-4" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <p className="text-xs font-black mb-1" style={{ color: "#A14A08" }}>{item.label}</p>
                  <p className="text-sm" style={{ color: "#52525B" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>Why join Myntmore</h2>
            <p className="text-base leading-relaxed" style={{ color: "#52525B" }}>
              Work directly with founders and a fast-growing team, closing deals with high-level executives, startup founders, doctors, lawyers, and other high-value clients. A full-time seat at WeWork Enam Sambhav, BKC, real ownership over your pipeline and sales strategy, and room to grow as Myntmore scales.
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
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#52525B" }}>
              Send your resume and a brief note on why you&apos;re the perfect fit.
            </p>
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
