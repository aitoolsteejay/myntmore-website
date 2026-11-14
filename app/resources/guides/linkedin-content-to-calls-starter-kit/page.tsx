import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CopyBlock from "@/app/components/CopyBlock";
import FadeIn from "@/app/components/FadeIn";
import JsonLd from "@/app/components/JsonLd";
import Underline from "../how-to-set-up-vibe-prospecting/Underline";
import { buildArticleSchema } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import ArticleMeta from "@/app/components/ArticleMeta";
import { ReadingProgress, RangeStat, RoutineTimeline, StaggerList } from "./KitMotion";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const URL = "https://www.myntmore.com/resources/guides/linkedin-content-to-calls-starter-kit";
const ACCENT = "#EA580C";
const TITLE = "LinkedIn Content-to-Calls Starter Kit (Free)";
const DESCRIPTION = "A free LinkedIn starter kit: the 3-part framework that drives calls, 5 post templates, 3 CTAs, 3 follow-up messages and a 10-minute daily routine.";

export const metadata: Metadata = withPageSeo("/resources/guides/linkedin-content-to-calls-starter-kit", {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "linkedin content to calls",
    "linkedin starter kit",
    "linkedin content templates",
    "linkedin cta examples",
    "linkedin dm follow up messages",
    "linkedin daily routine for founders",
    "how to get calls from linkedin",
    "linkedin lead generation for founders",
  ],
  alternates: { canonical: URL },
  openGraph: {
    ...OG_BASE,
    title: `${TITLE} | Myntmore`,
    description: DESCRIPTION,
    url: URL,
    images: ogImages("/resources/guides/linkedin-content-to-calls-starter-kit"),
  },
});

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "The LinkedIn Content-to-Calls Starter Kit",
  description: DESCRIPTION,
  url: URL,
  datePublished: "2026-10-23T00:00:00+05:30",
  dateModified: "2026-10-23T00:00:00+05:30",
});

const FRAMEWORK = [
  {
    n: "1",
    title: "Content that attracts",
    lead: "Content that signals expertise, instead of saying you have expertise.",
    listLabel: "Types of posts to focus on",
    items: [
      "Real stories from your work",
      "Screenshots of your processes",
      "“Before → After” transformations",
      "1 insight + 1 example posts",
      "Short frameworks and templates people can apply",
      "Observations from your industry",
    ],
    goal: "Make strangers feel, “This person actually gets my world.”",
  },
  {
    n: "2",
    title: "Comments that convert",
    lead: "Most founders underestimate the power of comments.",
    listLabel: "Leave comments that",
    items: [
      "Add 1 new perspective",
      "Clarify something people missed",
      "Share a small experience or micro-insight",
      "Start a thread, not close it",
    ],
    goal: "People should discover you through conversations, not only through feed posts.",
  },
  {
    n: "3",
    title: "Calls-to-action that create conversations",
    lead: "This is the part most people misunderstand. Use CTAs that feel like invitations, not sales pitches.",
    listLabel: "Examples",
    items: [
      "“If you want the framework, comment ‘Ready’.”",
      "“If you want the template I used here, DM me ‘Checklist’.”",
      "“If you want a breakdown of this, reply ‘Explain’.”",
    ],
    goal: "Make it easy for someone to take the next step.",
  },
];

const POSTS = [
  { id: "01", title: "The Fix-This Insight", text: "One pattern I keep seeing in our industry is _______. Most teams do ______ when what actually works is ______." },
  { id: "02", title: "The Mistake Post", text: "Most people do X thinking it will help them Y. But here’s what really drives Y…" },
  { id: "03", title: "The Step-by-Step Breakdown", text: "What we did →\n\n1. Step\n2. Step\n3. Step\n\nHere’s the outcome…" },
  { id: "04", title: "The Conversation Post", text: "A client told me something last week that stuck with me… _______. Here’s why it matters." },
  { id: "05", title: "The Screenshot Wisdom", text: "Share a screenshot + 3 bullet takeaways." },
];

const CTAS = [
  { id: "01", text: "If you want the resource I mentioned, comment ‘Ready’." },
  { id: "02", text: "If you want my checklist for this, DM me ‘Checklist,’ and I’ll send it." },
  { id: "03", text: "If you want the deeper explanation behind this strategy, reply ‘Break it down’." },
];

const FOLLOWUPS = [
  { when: "After they react", text: "Hey! Appreciate the interest - here’s the resource. Let me know which part you want help implementing." },
  { when: "After they DM you a keyword", text: "Awesome. Here’s the checklist. What’s the biggest bottleneck for you right now? (I can help you solve that fast)." },
  { when: "If they stop replying", text: "Just checking in - were you able to apply any part of the resource yet?" },
];

const ROUTINE = [
  { time: "Minute 1–3", task: "Comment on 3 posts in your industry", minutes: 3 },
  { time: "Minute 4–6", task: "Send 3 DMs to people who engaged", minutes: 3 },
  { time: "Minute 7–10", task: "Publish or draft 1 micro-insight", minutes: 4 },
];

const EXPECT = [
  "DMs from people who resonate with your insights",
  "A LinkedIn presence that feels natural, not forced",
  "More trust, familiarity, and visibility within your niche",
];

const SEND_MESSAGE = `Hey! Thanks for responding to the video 🙌
Here’s a LinkedIn Content-to-Calls Starter Kit I put together - includes templates, checklists, and a simple routine you can apply in 20 minutes.
If you want help customizing it to your niche or business, just reply “CUSTOM” and I’ll share a breakdown.`;

const RELATED = [
  { label: "How to Write a LinkedIn Hook", href: "/resources/blogs/how-to-write-a-linkedin-hook", note: "Six patterns for the first line of every post." },
  { label: "Leads on Autopilot: A Step-by-Step Framework", href: "/resources/guides/leads-on-autopilot-guide", note: "A complete system for LinkedIn leads without cold pitching." },
  { label: "58 Meetings from 600 LinkedIn Connections", href: "/resources/guides/58-meetings-600-linkedin-connections", note: "The 5-step LinkedIn framework behind 58 meetings in a month." },
  { label: "LinkedIn Hook Grader", href: "/tools/linkedin-hook-grader", note: "Score your opening line before you post it." },
];

const H2 = "text-2xl sm:text-3xl font-black";

export default function LinkedInContentToCallsStarterKit() {
  return (
    <InnerLayout>
      <ReadingProgress />
      <JsonLd data={ARTICLE_SCHEMA} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(234,88,12,0.16),rgba(234,88,12,0.05) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,183,49,0.19),rgba(245,183,49,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Guides", href: "/resources/guides" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(234,88,12,0.3)", backgroundColor: "rgba(234,88,12,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>LinkedIn · Starter Kit</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            The LinkedIn{" "}
            <span className="relative inline-block">Content-to-Calls<Underline color="#F5B731" /></span>{" "}
            Starter Kit
          </h1>
          <ArticleMeta schema={ARTICLE_SCHEMA} />
          <p className="text-lg sm:text-xl max-w-2xl leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>
            A simple, actionable resource to help you turn your LinkedIn presence into a system that brings you conversations, leads and opportunities every week.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 border-y" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <Image src="/tejas.png" alt="Tejas Jhaveri, Founder of Myntmore" width={112} height={112} className="rounded-2xl object-cover shrink-0" />
          <div>
            <h2 className="text-xl font-black mb-2" style={{ color: "#0a0a0a" }}>From one growth team to another</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>
              <a href="https://www.linkedin.com/in/tejasjhaveri/" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: "#0a0a0a" }}>Tejas</a> isn&apos;t your average marketer. He&apos;s a 4x entrepreneur who built Flintstop, a D2C eCommerce brand, into a $6M-a-year machine, shipping out 8,000 orders a day before selling the business in 2020. At Myntmore, his growth marketing agency, he&apos;s partnered with 130+ B2B companies to generate $120M+ in pipeline. He&apos;s a TEDx speaker, has been a Growth Marketing professor to over 100,000 students, and is a strategist who knows how to make marketing actually work. Now, he&apos;s here to do it for you.
            </p>
          </div>
        </div>
      </section>

      <article className="py-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto space-y-16">
          <FadeIn>
            <section>
              <h2 className={`${H2} mb-3`} style={{ color: "#0a0a0a" }}>1. The 3-part framework that drives calls</h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#52525B" }}>This is the exact structure used in the reel.</p>
              <div className="space-y-6">
                {FRAMEWORK.map((f, i) => (
                  <FadeIn key={f.n} delay={i * 120}>
                  <div className="rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-9 h-9 rounded-full inline-flex items-center justify-center text-sm font-black shrink-0" style={{ backgroundColor: "rgba(234,88,12,0.1)", color: textTone(ACCENT), border: "1px solid rgba(234,88,12,0.25)" }}>{f.n}</span>
                      <h3 className="text-xl font-black" style={{ color: "#0a0a0a" }}>{f.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#52525B" }}>{f.lead}</p>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#71675E" }}>{f.listLabel}</p>
                    <ul className="space-y-1.5 mb-5">
                      {f.items.map((i) => (
                        <li key={i} className="text-sm flex gap-2" style={{ color: "#3D3D3D" }}>
                          <span aria-hidden="true" style={{ color: ACCENT }}>&bull;</span>
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm font-bold rounded-lg px-4 py-3" style={{ backgroundColor: "#FEF9EC", color: "#0a0a0a", border: "1px solid rgba(245,183,49,0.35)" }}>Goal: {f.goal}</p>
                  </div>
                  </FadeIn>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className={`${H2} mb-3`} style={{ color: "#0a0a0a" }}>2. Done-for-you templates you can start using today</h2>
              <p className="text-base leading-relaxed mb-10" style={{ color: "#52525B" }}>Use them exactly as they are, or swap in your own details.</p>

              <h3 className="text-xl font-black mb-5" style={{ color: "#0a0a0a" }}>A) 5 content templates</h3>
              <div className="space-y-6 mb-12">
                {POSTS.map((p, i) => (
                  <FadeIn key={p.id} delay={i * 80}>
                  <div>
                    <p className="text-sm font-black mb-2" style={{ color: "#0a0a0a" }}><span style={{ color: textTone(ACCENT) }}>{p.id}</span> &nbsp;{p.title}</p>
                    <CopyBlock text={p.text} accent={ACCENT} label={`Template ${p.id}`} successMessage="Template copied to clipboard" />
                  </div>
                  </FadeIn>
                ))}
              </div>

              <h3 className="text-xl font-black mb-5" style={{ color: "#0a0a0a" }}>B) 3 CTA templates (high response)</h3>
              <div className="space-y-4 mb-12">
                {CTAS.map((c, i) => (
                  <FadeIn key={c.id} delay={i * 80}>
                    <CopyBlock text={c.text} accent={ACCENT} label={`CTA ${c.id}`} successMessage="CTA copied to clipboard" />
                  </FadeIn>
                ))}
              </div>

              <h3 className="text-xl font-black mb-5" style={{ color: "#0a0a0a" }}>C) 3 follow-up messages (you &rarr; them)</h3>
              <div className="space-y-6">
                {FOLLOWUPS.map((m, i) => (
                  <FadeIn key={m.when} delay={i * 80}>
                  <div>
                    <p className="text-sm font-black mb-2" style={{ color: "#0a0a0a" }}>{m.when}</p>
                    <CopyBlock text={m.text} accent={ACCENT} label="Message" successMessage="Message copied to clipboard" />
                  </div>
                  </FadeIn>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className={`${H2} mb-3`} style={{ color: "#0a0a0a" }}>3. The 10-minute daily routine</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>If you do just this every day, you will see results.</p>
              <div className="mb-4"><RoutineTimeline steps={ROUTINE} /></div>
              <p className="text-sm" style={{ color: "#52525B" }}>Simple. Consistent. Enough to move the needle.</p>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className={`${H2} mb-3`} style={{ color: "#0a0a0a" }}>4. What to expect in 30 days</h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#52525B" }}>If you apply this starter kit, here&apos;s the realistic outcome:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <RangeStat from={5} to={20} label="new conversations per week" />
                <RangeStat from={1} to={4} label="calls per week" />
              </div>
              <div className="mb-5"><StaggerList items={EXPECT} /></div>
              <p className="text-base font-bold" style={{ color: "#0a0a0a" }}>You build a system, not random content.</p>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl border p-8" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.35)" }}>
              <h2 className={`${H2} mb-4`} style={{ color: "#0a0a0a" }}>5. Bonus: my personal advice</h2>
              <p className="text-base font-bold leading-relaxed" style={{ color: "#0a0a0a" }}>Don&apos;t overthink content.<br />Don&apos;t complicate strategy.<br />Don&apos;t chase metrics.</p>
              <p className="text-base leading-relaxed mt-4" style={{ color: "#52525B" }}>Focus on one thing: make your online presence feel like people are talking to the real you. Your content should feel lived, not manufactured. When you do that, everything else compounds.</p>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className={`${H2} mb-3`} style={{ color: "#0a0a0a" }}>Ready-to-send message</h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#52525B" }}>Here&apos;s the exact message you can send to anyone who reacts.</p>
              <CopyBlock text={SEND_MESSAGE} accent={ACCENT} label="Copy and paste" successMessage="Message copied to clipboard" />
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className="text-2xl font-black mb-5" style={{ color: "#0a0a0a" }}>Keep the momentum going</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RELATED.map((r) => (
                  <Link key={r.href} href={r.href} className="group block rounded-xl border p-4 transition-all duration-200 hover:border-[#EA580C] hover:-translate-y-0.5 hover:shadow-md" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                    <p className="text-sm font-black mb-1" style={{ color: "#0a0a0a" }}>{r.label} <span aria-hidden="true" style={{ color: ACCENT }}>&rarr;</span></p>
                    <p className="text-xs leading-relaxed" style={{ color: "#52525B" }}>{r.note}</p>
                  </Link>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl p-8 sm:p-10 text-center border" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>Want more like this?</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] mt-3 mb-4">Let&apos;s break it down for your business.</h2>
              <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#52525B" }}>
                Follow Tejas on Instagram for hidden AI tools you can actually use, insider tech updates made simple, and real marketing and growth hacks powered by AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/book-a-call" className="btn-dark px-8 py-4 text-sm font-bold">Book a Complimentary Strategy Call</a>
                <a href="https://www.instagram.com/tejas_jhaveri/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-sm font-bold rounded-full border transition-colors hover:bg-[#F8F6F2]" style={{ color: "#0A0A0A", borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>Follow @tejas_jhaveri</a>
              </div>
              <a href="mailto:founder@myntmore.com" className="inline-flex min-h-[44px] items-center mt-6 text-sm font-semibold" style={{ color: "#A14A08" }}>founder@myntmore.com</a>
            </section>
          </FadeIn>
        </div>
      </article>
    </InnerLayout>
  );
}
