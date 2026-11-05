import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildJobPostingSchema } from "@/lib/schema";
import { textTone } from "@/lib/colors";

export const metadata: Metadata = {
  title: "B2B Lead Gen Intern, Mumbai | Rs 10-15K/mo",
  description: "Join Myntmore as a B2B Lead Gen Intern in BKC, Mumbai. Open to freshers, Rs 10-15K a month. Learn LinkedIn outreach, cold email and AI-led lead generation.",
  keywords: ["lead generation internship mumbai", "lead gen intern mumbai", "b2b lead generation internship", "lead generation internship for freshers", "linkedin outreach internship mumbai", "cold email internship mumbai", "b2b marketing internship mumbai", "growth marketing internship bkc", "fresher lead generation jobs mumbai", "outbound marketing internship", "internship with stipend mumbai", "full time internship bkc", "myntmore careers", "lead gen intern job openings"],
  alternates: { canonical: "https://www.myntmore.com/careers/lead-gen-intern" },
  openGraph: {
    title: "B2B Lead Generation Intern | Myntmore Careers",
    description: "Learn to build B2B pipelines across multiple industries. Open to freshers. Full-time internship, BKC Mumbai, Rs 10,000–15,000 a month.",
    url: "https://www.myntmore.com/careers/lead-gen-intern",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
};

const APPLY_SUBJECT = "Application for B2B Lead Generation Intern";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051")}`;
const ACCENT = "#3b82f6";

// datePosted is this page's real creation date, not fabricated. validThrough
// is a 6-month rolling window from that date, matching every other rolling
// posting on this site with no fixed application deadline. Extend it before
// it runs out: past validThrough, Google for Jobs treats the posting as
// expired. `npm run audit:jobs` lists every posting's date and warns 45 days
// ahead. A full-time internship is both FULL_TIME and INTERN.
const JOB_SCHEMA = buildJobPostingSchema({
  title: "B2B Lead Generation Intern",
  description: "Join Myntmore as a B2B Lead Generation Intern in BKC, Mumbai. A full-time internship open to freshers: learn to build multi-channel outbound systems using LinkedIn, cold email, and AI tools, and support live client campaigns. Stipend Rs 10,000–15,000 per month.",
  url: "https://www.myntmore.com/careers/lead-gen-intern",
  datePosted: "2026-11-05T00:00:00+05:30",
  validThrough: "2027-05-05T00:00:00+05:30",
  employmentType: ["FULL_TIME", "INTERN"],
  baseSalary: { minValue: 10000, maxValue: 15000, unitText: "MONTH" },
});

export default function LeadGenIntern() {
  return (
    <InnerLayout>
      <JsonLd data={JOB_SCHEMA} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Careers", href: "/careers" }, { label: "B2B Lead Gen Intern", href: "/careers/lead-gen-intern" }]} />
          <span className="inline-flex text-xs font-bold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: "rgba(59,130,246,0.08)", color: textTone(ACCENT), border: "1px solid rgba(59,130,246,0.2)" }}>Full-Time Internship · BKC, Mumbai</span>
          <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            B2B Lead Generation Intern
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[["Location", "WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051"], ["Type", "Full-Time Internship (freshers welcome)"], ["Stipend", "Rs 10,000–15,000 per month"]].map(([label, value]) => (
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
            <p className="text-base leading-relaxed mb-4" style={{ color: "#52525B" }}>
              We&apos;re looking for a curious, hardworking fresher who wants to learn B2B lead generation by doing it. You&apos;ll work alongside our lead generation team on live campaigns across LinkedIn, cold email, and outbound workflows. No prior experience is needed. We&apos;ll teach you the tools, the process, and the thinking behind it.
            </p>
            <div className="rounded-xl p-6" style={{ backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.3)" }}>
              <p className="text-sm font-bold mb-2" style={{ color: "#0a0a0a" }}>What makes this internship different</p>
              <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>
                At Myntmore, you won&apos;t work on just one company. You&apos;ll support campaigns across multiple founders, industries, and business models at the same time: one day a SaaS founder, the next a B2B company, then a consultant or agency. You&apos;ll get a crash course in how companies actually grow, faster than most people do in years.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-2" style={{ color: "#0a0a0a" }}>Primary goal</h2>
            <p className="text-base leading-relaxed" style={{ color: "#52525B" }}>
              Help the team generate predictable, high-quality B2B pipeline every week, for Myntmore and for our clients, while you build a skillset that is valuable in any business, not just one niche.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>What you&apos;ll do</h2>
            <div className="space-y-4">
              {[
                { title: "Prospect Research", desc: "Build target lists of the right companies and decision-makers using LinkedIn and data tools, and check that every contact is accurate before it goes into a campaign." },
                { title: "ICP + Messaging Support", desc: "Help define who a client should target and why. Draft personalised outbound messages and learn what makes a message get a reply." },
                { title: "LinkedIn + Cold Email Outreach", desc: "Set up and monitor outreach under guidance, using tools like Apollo, Clay, Instantly, and Waalaxy. Learn how sequencing, deliverability, and sending volume work." },
                { title: "Lead Follow-Up", desc: "Track replies, flag interested prospects, and help move them to booked calls." },
                { title: "Reporting", desc: "Record leads generated, reply rates, and booking rates, and share what the numbers say so the team can improve the next campaign." },
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Experience", desc: "A fresher. No prior work experience is needed, and a degree in any field is fine" },
                { label: "Mindset", desc: "Excited by variety, and keen to learn how different businesses sell and grow" },
                { label: "Communication", desc: "Clear, careful writing in English, because most of the job is words" },
                { label: "Comfort with Tools", desc: "At ease with spreadsheets and learning new software quickly" },
                { label: "Ownership", desc: "Reliable on small weekly targets, and quick to ask when stuck" },
                { label: "Quality-Focused", desc: "Careful with details, and more interested in lead quality than in activity" },
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
            {["Curious: you ask why a campaign worked or didn't", "Detail-Oriented: clean data means better leads", "Research-Driven: you enjoy finding the right person at the right company", "AI-Friendly: we run AI-led systems", "Fast Learner + High Ownership"].map((item) => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <p className="text-base" style={{ color: "#3D3D3D" }}>{item}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>What you&apos;ll learn</h2>
            {["How B2B pipelines are built from scratch", "How founders think about sales, positioning, and growth", "How different industries approach selling and scaling", "How to combine content and outbound for maximum conversion", "How to use AI and automation to scale outreach systems"].map((item) => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <p className="text-base" style={{ color: "#3D3D3D" }}>{item}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>Why join Myntmore</h2>
            <p className="text-base leading-relaxed" style={{ color: "#52525B" }}>
              Work on real founder pipelines from your first week, get exposure to multiple industries and global markets, and learn AI-led growth systems that very few agencies in India truly understand. Work from WeWork Enam Sambhav, BKC with a young, hungry team and a clear path to grow with us.
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
