import type { Metadata } from "next";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildJobPostingSchema } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/careers/systems-ai-automation-intern", {
  title: "AI Automation Intern, Mumbai | Rs 7-20K/mo",
  description: "Join Myntmore as Systems & AI Automation Intern in BKC, Mumbai. Build AI agents, n8n/Clay automations, and own SEO/AEO/GEO. WFO, apply now.",
  keywords: ["ai automation internship mumbai", "systems intern mumbai", "n8n internship india", "ai agents internship", "automation internship with ppo", "clay apollo internship", "seo aeo geo internship", "vibe coding internship", "python automation internship mumbai", "myntmore careers", "ai automation intern jobs mumbai"],
  alternates: { canonical: "https://www.myntmore.com/careers/systems-ai-automation-intern" },
  openGraph: {
    ...OG_BASE,
    title: "Systems & AI Automation Intern | Myntmore Careers",
    description: "Build the AI agents and automations that run Myntmore. Internship, BKC Mumbai.",
    url: "https://www.myntmore.com/careers/systems-ai-automation-intern",
    images: ogImages("/careers/systems-ai-automation-intern"),
  },
});

const APPLY_SUBJECT = "Application for Systems and AI Automation Intern";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051")}`;
const ACCENT = "#14B8A6";

// datePosted is this page's real creation date; validThrough is a 6-month
// rolling window from that date, matching the site's other rolling
// internship postings (there's no fixed application deadline for this role).
const JOB_SCHEMA = buildJobPostingSchema({
  title: "Systems & AI Automation Intern",
  description: "Join Myntmore as a Systems & AI Automation Intern in BKC, Mumbai. Build internal and client-facing AI agents, automate workflows with n8n/Clay/Python, and own SEO, AEO, and GEO. Full-time hours, work from office.",
  url: "https://www.myntmore.com/careers/systems-ai-automation-intern",
  datePosted: "2026-09-30T00:00:00+05:30",
  validThrough: "2027-03-30T00:00:00+05:30",
  employmentType: "INTERN",
  baseSalary: { minValue: 7000, maxValue: 20000, unitText: "MONTH" },
});

const WHAT_YOU_DO = [
  {
    title: "AI Agents & Systems",
    items: [
      "Build internal AI agents to automate marketing, content, outreach, and operations workflows",
      "Build client-facing agents for campaigns, including outreach, content, lead generation, and reporting",
      "Architect systems that can run end-to-end workflows and, over time, entire business functions",
      "Identify bottlenecks across the business and client accounts, and design systems to solve them",
      "Experiment with vibe coding and emerging AI tools to build, test, and iterate quickly",
    ],
  },
  {
    title: "Automation & Integrations",
    items: [
      "Design, build, and optimize automations using n8n, Zapier, and Python",
      "Use Clay to enrich data, personalize messaging at scale, and build repeatable pipelines",
      "Connect systems across Notion, Slack, Gmail, Google Sheets, LinkedIn, Zoho CRM, Calendly, and ManyChat",
      "Turn manual processes into scalable, self-running systems",
    ],
  },
  {
    title: "Technical Operations",
    items: [
      "Maintain, update, and secure internal tools, databases, hosting, and domains",
      "Manage proxies, API keys, and access credentials across all platforms",
      "Monitor system performance, storage, and integrations to ensure smooth operations",
      "Ensure data security best practices across all repositories and tools",
    ],
  },
  {
    title: "SEO, AEO & GEO",
    items: [
      "Plan and execute SEO strategies to improve organic rankings and website performance",
      "Optimize content for visibility on AI platforms such as ChatGPT, Perplexity, and Grok",
      "Conduct regular website audits and stay updated on search and AI trends",
    ],
  },
  {
    title: "Content & Marketing Support",
    items: [
      "Create and publish blogs, website pages, and marketing content aligned with SEO goals",
      "Evaluate, implement, and manage new tools for outreach, webinars, and events",
      "Support client projects, including technical setups and lead magnet creation",
    ],
  },
  {
    title: "Process & Documentation",
    items: [
      "Document systems, workflows, and processes for team-wide use",
      "Collaborate with internal teams to understand requirements and deliver technical solutions",
    ],
  },
];

const ADDED_SCOPE = [
  "Think like a founder: take ownership of problems, not just tasks",
  "Solve across the business: from sales to ops to delivery to internal workflows",
  "Work across industries: understand different growth engines, not just one",
  "Vibe code & ship fast: speed over perfection",
  "Gamify everything: leaderboards and incentives for internal systems, plus gamified lead magnets (quizzes, challenges, interactive funnels) for Myntmore and client campaigns",
  "Automate internal systems at Myntmore to reduce manual work to near zero",
  "Experiment with new AI tools (Lovable, emerging platforms, and more) before most people even discover them",
  "Move from execution, to system design, to decision-making, to ownership",
];

const WHO_YOU_ARE = [
  {
    label: "You Think in Systems",
    bullets: [
      "You love building processes that run on their own",
      "You naturally spot bottlenecks and think about how to fix them before they become problems",
      "You look at a manual task and immediately think: “Can this be automated?”",
    ],
  },
  {
    label: "You're Hands-On With Tech",
    bullets: [
      "You're comfortable working with tools like Supabase, Vercel, GitHub, and Zoho",
      "You can build, deploy, and optimise AI agents and automated workflows",
      "You can write Python scripts to support your automations",
    ],
  },
  {
    label: "You're Curious About Search & AI",
    bullets: [
      "You're an SEO nerd who wants to understand how Google decides what to show",
      "You're equally curious about how ChatGPT, Perplexity, and other AI platforms surface information",
      "You enjoy experimenting with new tools, platforms, and APIs",
    ],
  },
  {
    label: "You Take Ownership",
    bullets: [
      "You can handle recurring work and new projects without needing constant reminders",
      "You think like an operator, not just a builder",
      "You're willing to go the extra mile for the team and our clients",
    ],
  },
  {
    label: "You're a Team Player",
    bullets: [
      "You collaborate well with others",
      "You're comfortable working across different functions and solving problems together",
      "You care about the success of the team and the client, not just your individual tasks",
    ],
  },
];

const TOOL_STACK = [
  { area: "Development & Hosting", tools: "GitHub · Vercel · Supabase · GoDaddy · Namecheap · Cloudflare" },
  { area: "AI Coding", tools: "Claude Code · Codex · Cursor" },
  { area: "CRM & Automation", tools: "Zoho CRM · Zoho WorkDrive · Calendly · ManyChat · Zapier · Make · n8n" },
  { area: "Lead Data & Enrichment", tools: "Clay · Apollo · Vibe Prospecting (Explorium)" },
  { area: "SEO & Analytics", tools: "Google Search Console · Google Analytics · Ahrefs · SEMrush" },
  { area: "Outreach", tools: "Instantly · Smartlead · Lemlist" },
];

const BECOME = [
  "Someone who can walk into any business and spot inefficiencies instantly",
  "Someone who can design systems that replace entire workflows",
  "Someone who understands how different industries scale revenue",
  "Someone founders trust to solve problems, not just execute tasks",
];

export default function SystemsAiAutomationIntern() {
  return (
    <InnerLayout>
      <JsonLd data={JOB_SCHEMA} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Careers", href: "/careers" }, { label: "Systems & AI Automation Intern", href: "/careers/systems-ai-automation-intern" }]} />
          <span className="inline-flex text-xs font-bold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: `${ACCENT}14`, color: textTone(ACCENT), border: `1px solid ${ACCENT}33` }}>Internship · Work from Office · BKC, Mumbai</span>
          <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            Systems & AI Automation Intern
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[["Location", "WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051"], ["Hours", "Full-time, 10:00 AM – 7:00 PM"], ["Stipend", "Rs 7,000–20,000 (based on experience)"]].map(([label, value]) => (
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
          <p className="mt-3 text-xs" style={{ color: "#71675E" }}>Send to founder@myntmore.com and growth@myntmore.com with subject: {APPLY_SUBJECT}. See the 3-step apply process below - it&apos;s not just a resume.</p>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>About the role</h2>
            <p className="text-base leading-relaxed" style={{ color: "#52525B" }}>
              Your role isn&apos;t just maintaining tools, it&apos;s building, automating, and optimizing the systems that keep Myntmore running and growing. Think about the setups that quietly save hours every week, the pages that climb to the top of Google, and the answers where ChatGPT and Perplexity recommend us. That&apos;s what we&apos;re aiming for. You&apos;ll explore the best tools and trends out there and make our systems even better. Your mission? Make Myntmore impossible to miss, on search, on AI, and everywhere our audience looks.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>What you&apos;ll be doing</h2>
            <div className="space-y-4">
              {WHAT_YOU_DO.map((group) => (
                <div key={group.title} className="rounded-xl border p-5" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <h3 className="text-sm font-black mb-3" style={{ color: textTone(ACCENT) }}>{group.title}</h3>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "#52525B" }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>What makes this role exciting</h2>
            <div className="rounded-xl p-6" style={{ backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.3)" }}>
              <ul className="space-y-2.5">
                {ADDED_SCOPE.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="#D97706" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>You&apos;re right for this if</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHO_YOU_ARE.map((group) => (
                <div key={group.label} className="rounded-xl border p-4" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <p className="text-xs font-black mb-2" style={{ color: textTone(ACCENT) }}>{group.label}</p>
                  <ul className="space-y-1.5">
                    {group.bullets.map((b) => (
                      <li key={b} className="text-sm leading-snug" style={{ color: "#52525B" }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>Your tool stack</h2>
            <p className="text-sm mb-5" style={{ color: "#52525B" }}>You don&apos;t need to know every tool on this list. But you should be excited about getting hands-on with them.</p>
            <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#E8E2D9" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ backgroundColor: "#ffffff" }}>
                  <tbody>
                    {TOOL_STACK.map((row, i) => (
                      <tr key={row.area} style={i > 0 ? { borderTop: "1px solid #E8E2D9" } : undefined}>
                        <td className="px-5 py-3.5 font-black whitespace-nowrap align-top" style={{ color: "#0a0a0a", width: 200 }}>{row.area}</td>
                        <td className="px-5 py-3.5" style={{ color: "#52525B" }}>{row.tools}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>What you&apos;ll actually become (1 year in)</h2>
            {BECOME.map((item) => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <p className="text-base" style={{ color: "#3D3D3D" }}>{item}</p>
              </div>
            ))}
            <p className="text-sm mt-4 italic" style={{ color: "#71675E" }}>Not just an intern, but an early operator with leverage.</p>
          </div>

          <div className="rounded-2xl p-8 border" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.3)" }}>
            <h3 className="text-lg font-black mb-4" style={{ color: "#0a0a0a" }}>How to apply (follow all 3 steps)</h3>
            <ol className="space-y-3 mb-6">
              {[
                "Share a Loom showing an automation or agent you've built, or any project you've worked on.",
                <>Drop your LinkedIn and resume at <a href={`mailto:founder@myntmore.com?subject=${encodeURIComponent(APPLY_SUBJECT)}`} className="font-semibold underline">founder@myntmore.com</a> and <a href={`mailto:growth@myntmore.com?subject=${encodeURIComponent(APPLY_SUBJECT)}`} className="font-semibold underline">growth@myntmore.com</a> with subject line &ldquo;[Your Name] - {APPLY_SUBJECT}&rdquo;.</>,
                "Tell us in one line: what's the coolest thing you've built with n8n, Python, Clay, or GPTs?",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0" style={{ backgroundColor: textTone(ACCENT), color: "#ffffff" }}>{i + 1}</span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <a href={`mailto:founder@myntmore.com,growth@myntmore.com?subject=${encodeURIComponent(APPLY_SUBJECT)}`} className="btn-dark px-6 py-3 text-sm font-bold inline-flex items-center gap-2">
              Apply Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <p className="text-xs mt-5 pt-5" style={{ color: "#71675E", borderTop: "1px solid rgba(245,183,49,0.3)" }}>
              Know someone perfect for this role? Share this page with them to help us find our ideal match.
            </p>
          </div>

          <p className="text-sm text-center" style={{ color: "#71675E" }}>
            More on who we are and what we&apos;ve built: <a href="/about-us" className="font-bold underline" style={{ color: "#0a0a0a" }}>About Myntmore &amp; Tejas Jhaveri</a>
          </p>
        </div>
      </section>
    </InnerLayout>
  );
}
