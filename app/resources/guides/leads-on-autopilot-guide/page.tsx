import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CopyBlock from "@/app/components/CopyBlock";
import FadeIn from "@/app/components/FadeIn";
import Underline from "../how-to-set-up-vibe-prospecting/Underline";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const URL = "https://www.myntmore.com/resources/guides/leads-on-autopilot-guide";

export const metadata: Metadata = withPageSeo("/resources/guides/leads-on-autopilot-guide", {
  title: "Leads on Autopilot: A LinkedIn Framework",
  description: "A complete system to generate high-quality B2B leads on LinkedIn without cold pitching: audience, content, outreach, nurturing, and follow-ups.",
  keywords: [
    "linkedin lead generation framework",
    "leads on autopilot",
    "linkedin outreach without cold pitching",
    "b2b linkedin lead gen system",
    "linkedin icp framework",
    "linkedin nurture sequence",
    "linkedin connection request template",
    "linkedin follow up messages",
  ],
  alternates: { canonical: URL },
  openGraph: {
    ...OG_BASE,
    title: "Leads on Autopilot: A LinkedIn Framework | Myntmore",
    description: "Generate high-quality B2B leads on LinkedIn without cold pitching. Audience clarity, content authority, outreach, nurturing, and follow-ups, in one system.",
    url: URL,
    images: ogImages("/resources/guides/leads-on-autopilot-guide"),
  },
});

const ICP_EXAMPLES = [
  ["SaaS Founder, 10–50 employees", "Struggles with lead gen and inconsistent sales follow-ups"],
  ["Marketing Head, mid-sized company", "Seeks fresh content ideas and better engagement strategies"],
];

const CONTENT_CATEGORIES = [
  "Industry insights and trends relevant to your ICP",
  "Step-by-step frameworks that simplify a complex challenge",
  "Case studies showcasing real results achieved",
  "Tips that address a specific pain point directly",
];

const OUTREACH_STEPS = [
  {
    step: "1",
    name: "Connection Note",
    goal: "Get accepted + spark relevance",
    psychology: "Curiosity + similarity",
    template: `Hey [First Name], saw your role at [Company], especially your work on [X]. I work with a few folks in [industry/space], always good to connect with others building sharp. Let's connect?`,
    example: `Hey Sarah, saw your role at UpStack, especially the work you're doing in ops automation. I work with a few SaaS founders scaling GTM, always good to connect with others building sharp.`,
  },
  {
    step: "2",
    name: "Follow-Up (Day 1–2)",
    goal: "Start a conversation without pitching",
    psychology: "Empathy + curiosity",
    template: `Thanks for connecting, [First Name]! Quick Q: how are you currently tackling [problem]? A lot of [role]s we talk to hit [pain point]. Happy to share what's working if it's useful.`,
    example: `Thanks for connecting, Sarah! Quick Q: how are you currently tackling outbound messaging? A lot of GTM leads we talk to are stuck with low reply rates. We've seen sharp turnarounds with structured DMs. Happy to share if relevant.`,
  },
  {
    step: "3",
    name: "Soft Close (Day 4–5)",
    goal: "Re-engage with value + invite",
    psychology: "Social proof + permission",
    template: `Totally cool if now's not the right time. Just thought I'd share: we helped [similar role/company] fix [pain point], without needing [common frustration]. If you're navigating that too, happy to walk through it, no pressure.`,
    example: `Totally cool if now's not the right time. Just thought I'd share, we helped a Series A ops lead fix their reply dropoff without needing daily content. If you're facing that too, happy to walk through what worked, no pitch.`,
  },
];

const NURTURE_EXAMPLES = [
  "Carousel post: \"3 Steps That Worked for Me to Boost LinkedIn Lead Generation\" (swap in your own insights or framework)",
  "\"This is what worked for me with a recent client/project to improve leads\" (a generic structure you can fill with your own story)",
  "Poll: \"Which approach has helped you most with [challenge]?\" (drives engagement and surfaces audience insight)",
];

const FOLLOW_UPS = [
  `Hi [First Name], wanted to check if you had a chance to see the framework I shared. Happy to walk you through any part that's useful.`,
  `Hi [First Name], I recently created a short video on improving lead prioritization, thought it might be relevant to your team [link]. Let me know if you'd like a quick call to discuss.`,
  `Hi [First Name], don't want to overwhelm your inbox, if now isn't a good time, I can check back later. Otherwise, happy to explore synergies when convenient.`,
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

export default function LeadsOnAutopilotGuide() {
  return (
    <InnerLayout>
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,119,181,0.2),rgba(0,119,181,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,183,49,0.19),rgba(245,183,49,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Guides", href: "/resources/guides" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(0,119,181,0.3)", backgroundColor: "rgba(0,119,181,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#0077b5" }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#00669C" }}>LinkedIn Lead Generation · Step-by-Step Guide</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            Leads on<br />
            <span className="relative inline-block">Autopilot<Underline color="#F5B731" /></span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>
            A complete system to generate high-quality leads on LinkedIn without cold pitching. Audience clarity, content authority, personal outreach, nurturing, and consistent follow-up, combined into one repeatable framework.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 border-y" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <Image src="/tejas.png" alt="Tejas Jhaveri, Founder of Myntmore" width={112} height={112} className="rounded-2xl object-cover shrink-0" />
          <div>
            <h2 className="text-xl font-black mb-2" style={{ color: "#0a0a0a" }}>From Tejas Jhaveri, founder to founder</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>
              Tejas isn&apos;t your average marketer. He&apos;s a 4x entrepreneur who built Flintstop, a D2C eCommerce brand, into a $6M-a-year machine, shipping out 8,000 orders a day before selling the business in 2020. At Myntmore, his B2B outbound agency, he&apos;s helped 130+ B2B companies book 12K+ meetings and generate $120M+ in pipeline. He&apos;s a TEDx speaker, angel investor, and has taught B2B growth methodologies at IIT and IIM. Now, he&apos;s here to do it for you.
            </p>
          </div>
        </div>
      </section>

      <article className="py-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto space-y-16">
          <FadeIn>
            <section>
              <p className="text-lg leading-relaxed" style={{ color: "#52525B" }}>
                Most people treat LinkedIn lead generation as either constant posting or cold pitching. Neither works on its own. This framework combines five moving parts, audience, content, outreach, nurture, and follow-up, into one system, so leads show up consistently without you sounding like a sales bot in anyone&apos;s inbox.
              </p>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#0077b5" }}>Step 01</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-2" style={{ color: "#0a0a0a" }}>Clarify your audience</h2>
              <p className="text-sm italic mb-5" style={{ color: "#71675E" }}>Why this matters: the more precise your audience, the higher the quality of leads and the easier it is to write messages that land.</p>
              <ul className="space-y-3 mb-6">
                {[
                  ["Demographics", "Job role, company size, industry, location"],
                  ["Psychographics", "Motivations, challenges, priorities"],
                  ["Behavior", "LinkedIn activity, content engagement, decision-making authority"],
                ].map(([label, value]) => (
                  <li key={label} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#52525B" }}>
                    <span className="font-black shrink-0" style={{ color: "#0a0a0a" }}>{label}:</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#52525B" }}>
                Identify the top 20% of leads most likely to engage, map 2–3 key pain points per ICP, and document it all: ICP name, role, pain point, decision criteria, preferred content type. Two examples to start from:
              </p>
              <DataTable rows={ICP_EXAMPLES} />
              <div className="mt-6 rounded-xl p-5 border-l-4" style={{ backgroundColor: "#FEF9EC", borderColor: "#F5B731" }}>
                <p className="font-bold" style={{ color: "#0a0a0a" }}>Keep updating your ICPs as you learn from real responses and engagement, they&apos;re a working document, not a one-time exercise.</p>
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#0077b5" }}>Step 02</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-2" style={{ color: "#0a0a0a" }}>Build authority</h2>
              <p className="text-sm italic mb-5" style={{ color: "#71675E" }}>Why this matters: people reach out to those they already trust and see as experts, before any business conversation starts.</p>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#52525B" }}>
                Plan content that answers your audience&apos;s most common questions, using posts, carousels, videos, polls, and newsletters. Include storytelling, real wins, real failures, real lessons, and make sure it actually demonstrates experience and expertise, not just claims it.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {CONTENT_CATEGORIES.map((c) => (
                  <div key={c} className="rounded-xl border p-4 text-sm font-semibold" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#3D3D3D" }}>✓ {c}</div>
                ))}
              </div>
              <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#F0FDF4", borderColor: "rgba(16,185,129,0.25)" }}>
                <p className="text-sm leading-relaxed" style={{ color: "#166534" }}>
                  Post a carousel on &quot;3 Steps to Boost LinkedIn Lead Gen Without Ads,&quot; share a short video walking through a recent client result, or run a poll asking your ICP directly what their biggest challenge is right now. Then repurpose all of it into your outreach and nurture messages later.
                </p>
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#0077b5" }}>Step 03</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-2" style={{ color: "#0a0a0a" }}>Outreach</h2>
              <p className="text-sm italic mb-6" style={{ color: "#71675E" }}>Why this matters: thoughtful outreach builds a connection without ever feeling like a sales pitch.</p>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>
                Send a personalized connection request referencing their profile, recent activity, or a company milestone, then follow up with a sequence of three thoughtful messages: appreciation, value, then a soft, low-pressure invitation.
              </p>
              <div className="space-y-6">
                {OUTREACH_STEPS.map((s) => (
                  <div key={s.step}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black" style={{ backgroundColor: "rgba(0,119,181,0.1)", color: "#00669C", border: "1px solid rgba(0,119,181,0.25)" }}>{s.step}</span>
                      <h3 className="text-lg font-black" style={{ color: "#0a0a0a" }}>{s.name}</h3>
                      <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: "#F8F6F2", color: "#3D3D3D", border: "1px solid #E8E2D9" }}>{s.goal}</span>
                    </div>
                    <p className="text-xs mb-3" style={{ color: "#71675E" }}>Psychology: {s.psychology}</p>
                    <CopyBlock text={s.template} accent="#0077b5" label="Copy message template" />
                    <div className="mt-3 rounded-xl p-4 border" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#71675E" }}>Example</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{s.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#0077b5" }}>Step 04</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-2" style={{ color: "#0a0a0a" }}>Nurture</h2>
              <p className="text-sm italic mb-5" style={{ color: "#71675E" }}>Why this matters: leads rarely convert on the first touch, staying visible is what increases the odds of a real conversation.</p>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>
                Engage consistently with your leads&apos; content, like, comment, and add real insight. Share valuable posts and industry trends periodically, and track each lead&apos;s interactions so you know their interest level and what the right next action is.
              </p>
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#E8E2D9" }}>
                {NURTURE_EXAMPLES.map((n, i) => (
                  <div key={n} className="px-5 py-4 text-sm leading-relaxed" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#F8F6F2", color: "#52525B", borderBottom: i < NURTURE_EXAMPLES.length - 1 ? "1px solid #E8E2D9" : "none" }}>{n}</div>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#0077b5" }}>Step 05</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-2" style={{ color: "#0a0a0a" }}>Follow-ups</h2>
              <p className="text-sm italic mb-5" style={{ color: "#71675E" }}>Why this matters: consistent, respectful follow-up is what converts a lead without ever being pushy about it.</p>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>
                Follow up 3–7 days after the initial outreach if there&apos;s no response, adding a new insight or resource each time rather than repeating yourself. Adjust the tone based on prior engagement, and mix up the touchpoint: a DM, a comment on their post, or a piece of content shared directly.
              </p>
              <div className="space-y-4">
                {FOLLOW_UPS.map((f, i) => (
                  <div key={i} className="rounded-xl border p-5" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                    <span className="text-xs font-black uppercase tracking-widest mb-2 block" style={{ color: "#0077b5" }}>Follow-up {i + 1}</span>
                    <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{f}</p>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl p-8 sm:p-10 text-center border" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>What&apos;s next?</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] mt-3 mb-4">Implement everything.</h2>
              <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#52525B" }}>
                If you&apos;re looking to optimize your LinkedIn profile and turn it into a growth engine, you&apos;re in the right place. Whether you&apos;re a founder, CXO, or consultant, LinkedIn can become your #1 inbound channel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services/personal-branding" className="btn-dark px-8 py-4 text-sm font-bold">Explore LinkedIn Personal Branding</Link>
                <Link href="/book-a-call" className="px-8 py-4 text-sm font-bold rounded-full border transition-colors hover:bg-[#F8F6F2]" style={{ color: "#0A0A0A", borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>Book a Strategy Call</Link>
              </div>
              <a href="mailto:founder@myntmore.com" className="inline-flex min-h-[44px] items-center mt-6 text-sm font-semibold" style={{ color: "#A14A08" }}>founder@myntmore.com</a>
              <Link href="/resources/guides/58-meetings-600-linkedin-connections" className="block mt-5 text-sm font-semibold underline underline-offset-4" style={{ color: "#52525B" }}>
                Next: the 5-step framework behind 58 meetings from 600 LinkedIn connections
              </Link>
            </section>
          </FadeIn>
        </div>
      </article>
    </InnerLayout>
  );
}
