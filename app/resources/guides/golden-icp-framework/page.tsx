import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CopyBlock from "@/app/components/CopyBlock";
import FadeIn from "@/app/components/FadeIn";
import Underline from "../how-to-set-up-vibe-prospecting/Underline";
import { OG_BASE } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const URL = "https://www.myntmore.com/resources/guides/golden-icp-framework";

export const metadata: Metadata = withPageSeo("/resources/guides/golden-icp-framework", {
  title: "The Golden ICP Framework for B2B Outbound",
  description: "Build high-converting B2B prospect lists using pressure, buying triggers, Clay enrichment, and timely cold email. Get the complete Golden ICP Framework.",
  keywords: [
    "golden icp framework",
    "b2b ideal customer profile",
    "buying triggers for outbound",
    "clay lead generation",
    "smartlead cold email",
    "b2b prospect list building",
    "sales trigger events",
    "cold email icp",
    "founder outbound framework",
  ],
  alternates: { canonical: URL },
  openGraph: {
    ...OG_BASE,
    title: "The Golden ICP Framework | Myntmore",
    description: "Stop building lists around job titles. Find buyers under pressure to solve the problem you solve.",
    url: URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
});

const COLD_EMAIL = `Subject: Saw your raise, here's a shortcut

Hey [First Name],

Congrats on the Seed round. Saw you're leading your first team at [Company].

We helped another founder in your spot reduce onboarding time by 40% without adding headcount. Happy to share how if you're open to it.

[Your Name]`;

const FOLLOW_UP = `Subject: Quick case study, might be useful

Hey [First Name],

Following up. Thought you might find this useful: a breakdown of how we helped [Founder] at [Company] navigate their post-Seed GTM sprint.

Let me know if you'd like the PDF. Happy to send.`;

const CLAY_QUERY = `Find B2B SaaS companies founded less than 2 years ago, raised Seed in the past 90 days, are hiring growth roles, use HubSpot, and are led by a first-time founder.

Enrich with job posts, LinkedIn posts, team-size changes, and a summary of recent founder activity.`;

const PRESSURE_TRAITS = [
  ["Company age under 2 years", "Urgent to prove traction and likely under-resourced"],
  ["Seed or Series A funded", "Cash has landed and growth is expected"],
  ["First-time founder", "Less internal infrastructure and more openness to help"],
  ["Hiring sales or operations roles", "They know they need systems but do not have them yet"],
];

const TRIGGERS = [
  "Raised Seed or Series A funding in the last 60 to 90 days",
  "Hired a Head of Sales or Marketing",
  "Posted two or more new GTM roles",
  "Launched a product or earned a recent press mention",
  "Founder was promoted or changed titles",
];

const ENRICHMENTS = [
  ["Crunchbase or PitchBook", "Confirm funding details"],
  ["LinkedIn growth trends", "See whether the team is expanding"],
  ["BuiltWith", "Reveal the technology stack"],
  ["Open roles", "Identify growth and operational need"],
  ["LinkedIn or X posts", "Understand what the founder is discussing"],
  ["AI summaries", "Generate insights and useful first drafts"],
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

export default function GoldenICPFrameworkGuide() {
  return (
    <InnerLayout>
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,183,49,0.24),rgba(245,183,49,0.07) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(16,185,129,0.19),rgba(16,185,129,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Guides", href: "/resources/guides" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(217,119,6,0.3)", backgroundColor: "rgba(245,183,49,0.09)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#D97706" }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#A14A08" }}>ICP &amp; Targeting Guide</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            The Golden ICP<br />
            <span className="relative inline-block">Framework<Underline color="#F5B731" /></span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>
            Stop defining buyers by job title alone. Build prospect lists around pressure, timing, and real buying signals so even a simple message earns attention.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 border-y" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <Image src="/tejas.png" alt="Tejas Jhaveri, Founder of Myntmore" width={112} height={112} className="rounded-2xl object-cover shrink-0" />
          <div>
            <h2 className="text-xl font-black mb-2" style={{ color: "#0a0a0a" }}>From Tejas Jhaveri, founder to founder</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>
              Tejas is a four-time entrepreneur who built Flintstop into a $6M-a-year D2C business before selling it in 2020. At Myntmore, he has helped 130+ B2B companies book 12K+ meetings and generate $120M+ in pipeline. He is also a TEDx speaker and has taught B2B growth methodologies at IIT and IIM.
            </p>
          </div>
        </div>
      </section>

      <article className="py-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto space-y-16">
          <FadeIn>
            <section>
              <p className="text-lg leading-relaxed mb-4" style={{ color: "#52525B" }}>If your cold emails are not landing, the problem may not be the tool, subject line, or follow-up. It may be who you are sending to.</p>
              <p className="text-lg leading-relaxed" style={{ color: "#52525B" }}>This framework helps you reach the right people at the right moment. It is the same approach Myntmore uses to help founders book sales conversations without relying on daily posting or broad, volume-heavy outreach.</p>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>Step 01</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>Redefine your ICP using pressure, not personas</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>“Marketing manager at a 20 to 500-person SaaS company” tells you who somebody is, but not what they are under pressure to achieve. Go beyond identity and identify the commercial pressure shaping what they care about now.</p>
              <DataTable rows={PRESSURE_TRAITS} />
              <div className="mt-6 rounded-xl p-5 border-l-4" style={{ backgroundColor: "#FEF9EC", borderColor: "#F5B731" }}><p className="font-bold" style={{ color: "#0a0a0a" }}>When your list is full of people under pressure to solve the problem you solve, replies get easier.</p></div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>Step 02</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>Use buying triggers, not job titles</h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#52525B" }}>Buyers do not always look like buyers until something changes. That change is your trigger. Triggers turn static lists into real-time context.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {TRIGGERS.map((trigger) => <div key={trigger} className="rounded-xl border p-4 text-sm font-semibold" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#3D3D3D" }}>✓ {trigger}</div>)}
              </div>
              <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#F0FDF4", borderColor: "rgba(16,185,129,0.25)" }}><p className="text-sm leading-relaxed" style={{ color: "#166534" }}>“Just saw you raised and hired a Head of Sales. Sounds like you are gearing up GTM. We helped another founder in the same window streamline onboarding before hiring their first reps.”</p></div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>Step 03</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>Turn ICP and triggers into a living prospect list</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>Smartlead remains Myntmore&apos;s go-to sending platform because it is fast, flexible, and built for scale. Clay is not simply a scraping tool. Used well, it becomes the strategy and enrichment layer behind the campaign.</p>
              <h3 className="text-lg font-black mb-3" style={{ color: "#0a0a0a" }}>Enrichments that add context</h3>
              <DataTable rows={ENRICHMENTS} />
              <div className="mt-6"><CopyBlock text={CLAY_QUERY} accent="#F5B731" label="Copy example Clay query" /></div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>Step 04</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>Write emails that feel like timing, not pitching</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>Send while the trigger is still fresh. Do not overthink surface-level personalisation. Relevance is the real personal touch.</p>
              <CopyBlock text={COLD_EMAIL} accent="#F5B731" label="Copy cold email template" />
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>Step 05</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0a0a0a" }}>Follow up with credibility, not pressure</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>If the first message demonstrates timing, the second should demonstrate perspective. Follow-up is not about nagging. It is about returning with something useful and real.</p>
              <CopyBlock text={FOLLOW_UP} accent="#14b8a6" label="Copy follow-up template" />
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl p-8 sm:p-10 text-center border" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>Final insight</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] mt-3 mb-4">Your list is your leverage</h2>
              <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#52525B" }}>Most founders try to write clever messages. The best build lists so dialled in that a simple, timely note earns a reply. Golden ICP means founder-to-founder empathy at scale.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services/cold-email" className="btn-dark px-8 py-4 text-sm font-bold">Explore Cold Email Services</Link>
                <Link href="/book-a-call" className="px-8 py-4 text-sm font-bold rounded-full border transition-colors hover:bg-[#F8F6F2]" style={{ color: "#0A0A0A", borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>Book a Strategy Call</Link>
              </div>
              <a href="mailto:founder@myntmore.com" className="inline-flex min-h-[44px] items-center mt-6 text-sm font-semibold" style={{ color: "#A14A08" }}>founder@myntmore.com</a>
            </section>
          </FadeIn>
        </div>
      </article>
    </InnerLayout>
  );
}
