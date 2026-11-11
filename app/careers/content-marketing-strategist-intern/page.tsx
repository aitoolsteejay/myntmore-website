import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildJobPostingSchema } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import { OG_BASE } from "@/lib/og";

export const metadata: Metadata = {
  title: "Content Marketing Intern, Mumbai | Rs 7-15K/mo",
  description: "Join Myntmore as Content Marketing Strategist Intern in BKC, Mumbai. Write viral LinkedIn content for founders & CXOs. 1-year min, PPO. Apply now.",
  keywords: ["content strategist internship mumbai", "linkedin ghostwriting internship", "content writing internship mumbai", "personal branding internship", "linkedin content internship india", "content marketing internship mumbai", "founder ghostwriter internship", "content strategist jobs mumbai", "linkedin content writer internship", "storytelling internship mumbai", "b2b content internship", "content writing internship with ppo", "myntmore careers", "content strategist internship jobs"],
  alternates: { canonical: "https://www.myntmore.com/careers/content-marketing-strategist-intern" },
  openGraph: {
    ...OG_BASE,
    title: "Content Marketing Strategist Intern | Myntmore Careers",
    description: "Write high-impact LinkedIn content for founders and CXOs. Internship, BKC Mumbai.",
    url: "https://www.myntmore.com/careers/content-marketing-strategist-intern",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
};

const APPLY_SUBJECT = "Application for Content Marketing Strategist Intern";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051")}`;
const ACCENT = "#ec4899";

// datePosted is this page's real creation date, not fabricated. validThrough
// is a 6-month rolling window from that date, matching how the other rolling
// internship posting (HR & Operations Intern) on this site is dated -- there's
// no fixed application deadline given for this role either.
const JOB_SCHEMA = buildJobPostingSchema({
  title: "Content Marketing Strategist Intern",
  description: "Join Myntmore as a Content Marketing Strategist Intern in BKC, Mumbai. Research, write, and strategise high-impact LinkedIn content for founders and CXOs. 1-year minimum, stipend of Rs 7,000–15,000 a month plus incentives, PPO based on performance.",
  url: "https://www.myntmore.com/careers/content-marketing-strategist-intern",
  datePosted: "2026-08-25T00:00:00+05:30",
  validThrough: "2027-02-25T00:00:00+05:30",
  employmentType: "INTERN",
  baseSalary: { minValue: 7000, maxValue: 15000, unitText: "MONTH" },
});

export default function ContentMarketingStrategistIntern() {
  return (
    <InnerLayout>
      <JsonLd data={JOB_SCHEMA} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Careers", href: "/careers" }, { label: "Content Marketing Strategist Intern", href: "/careers/content-marketing-strategist-intern" }]} />
          <span className="inline-flex text-xs font-bold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: "rgba(236,72,153,0.08)", color: textTone(ACCENT), border: "1px solid rgba(236,72,153,0.2)" }}>Internship · Work from Office · BKC, Mumbai</span>
          <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            Content Marketing Strategist Intern
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[["Location", "WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051"], ["Commitment", "1 year minimum"], ["Stipend", "Rs 7,000–15,000 per month + incentives"]].map(([label, value]) => (
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
              Your role isn&apos;t just writing, it&apos;s researching, analysing, and crafting the best posts on entrepreneurship, storytelling, and marketing. Think about the posts that go viral, that make people stop scrolling and engage. That&apos;s what we&apos;re aiming for. You&apos;ll dive into the best content out there and make it even better. Your mission: make our clients&apos; posts explode on LinkedIn.
            </p>
            <div className="rounded-xl p-6" style={{ backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.3)" }}>
              <p className="text-sm font-bold mb-2" style={{ color: "#0a0a0a" }}>What you&apos;ll actually be doing</p>
              <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>
                Convert briefs and voice notes from founders and CXOs into strategic, insight-driven LinkedIn posts. Build and maintain a distinct voice for each client, act as the main point of contact for select accounts, and make sure every post has a clear purpose: engagement, visibility, or lead-gen.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>What you&apos;ll do</h2>
            <div className="space-y-4">
              {[
                { title: "Content Research & Writing", desc: "Write high-quality, insight-driven content for founders, CXOs, and leaders on LinkedIn. Convert briefs and voice notes into impactful storytelling and strategic posts." },
                { title: "Voice & Positioning", desc: "Build and maintain distinct voices for multiple clients. Understand tone, positioning, and the purpose behind every post, whether it's engagement, visibility, or lead-gen." },
                { title: "Client Ownership", desc: "Act as the main point of contact for select clients, ensuring their content goals are met with clarity and consistency. Translate client briefs into clear content strategies with defined objectives and tone." },
                { title: "Trend & Performance Tracking", desc: "Stay updated on LinkedIn trends and best practices. Analyse content performance and keep learning what actually works." },
                { title: "Cross-Team Collaboration", desc: "Collaborate with strategists, editors, and account managers to ensure smooth execution, timely delivery, and high-quality output across all assigned accounts." },
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
                { label: "Research Junkie", desc: "You love digging into the best content on entrepreneurship, marketing, and storytelling" },
                { label: "Writing Pro", desc: "Skilled at transforming research into captivating LinkedIn posts that drive engagement" },
                { label: "Curious & Data-Driven", desc: "You enjoy analysing content performance and always learning what works" },
                { label: "Entrepreneurship Enthusiast", desc: "You follow top entrepreneurship podcasts, blogs, and social media pages" },
                { label: "Ownership Mindset", desc: "You take charge of your work and lead projects, while collaborating with entrepreneurs" },
                { label: "LinkedIn-Native", desc: "Strong understanding of LinkedIn as a platform, and its content nuances" },
                { label: "Clear, Not Robotic", desc: "You write with clarity, insight, and a hook, without sounding generic or AI-flat" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border p-4" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <p className="text-xs font-black mb-1" style={{ color: textTone(ACCENT) }}>{item.label}</p>
                  <p className="text-sm" style={{ color: "#52525B" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>Why join us</h2>
            {[
              "Work closely with top-tier leaders and entrepreneurs",
              "Build content that actually moves the needle, not fluff",
              "Be part of a young, driven team building something meaningful",
              "Freedom to bring your ideas, experiment, and grow",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <p className="text-base" style={{ color: "#3D3D3D" }}>{item}</p>
              </div>
            ))}
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
