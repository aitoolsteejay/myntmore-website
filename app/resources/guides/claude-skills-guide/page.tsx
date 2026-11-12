import type { Metadata } from "next";
import Link from "next/link";
import { Camera, CalendarCheck, Mail } from "lucide-react";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CopyBlock from "@/app/components/CopyBlock";
import FadeIn from "@/app/components/FadeIn";
import Underline from "./Underline";
import { textTone } from "@/lib/colors";
import { OG_BASE } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/resources/guides/claude-skills-guide", {
  title: "The 6 Claude Skills Guide",
  description: "Six ready-to-use Claude skills for founders: content distribution, LinkedIn growth, lead gen, and more, with copy-paste prompts. Try them free.",
  keywords: [
    "claude skills for founders",
    "claude ai prompts for marketing",
    "claude for content repurposing",
    "claude linkedin growth prompts",
    "claude lead generation prompts",
    "ai competitor research with claude",
    "claude proposal writing prompts",
    "claude personal branding prompts",
    "claude project setup guide",
    "ai content distribution tool",
    "claude prompts for sales",
    "claude skills for marketers",
  ],
  alternates: { canonical: "https://www.myntmore.com/resources/guides/claude-skills-guide" },
  openGraph: {
    ...OG_BASE,
    title: "The 6 Claude Skills Guide",
    description: "Six ready-to-use Claude skills for founders and marketers, complete with copy-paste prompts.",
    url: "https://www.myntmore.com/resources/guides/claude-skills-guide",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
});

interface Skill {
  number: string;
  title: string;
  tagline: string;
  accent: string;
  accentBg: string;
  whatItDoes: string;
  whenToUse: string;
  tools: string[];
  setupSteps: string[];
  prompt: string;
  proTip: string;
}

const SKILLS: Skill[] = [
  {
    number: "01",
    title: "AI Content Engine",
    tagline: "Turn one brief into content for every channel.",
    accent: "#D97706",
    accentBg: "rgba(245,183,49,0.08)",
    whatItDoes:
      "This skill takes a single content brief and generates blog posts, email newsletters, LinkedIn posts, ad copy, and social captions simultaneously. Claude understands tone per channel so your LinkedIn post does not read like an email and your ad copy does not sound like a blog.",
    whenToUse:
      "Use this when you have one idea, announcement, or campaign and need to distribute it across multiple channels without writing each piece from scratch.",
    tools: ["Claude (claude.ai or API)", "Notion or Google Docs to store briefs", "Buffer or Typefully for scheduling"],
    setupSteps: [
      "Open Claude and create a new Project. Name it 'Content Engine'.",
      "In the Project system prompt, paste your brand voice guide, target audience, and tone preferences.",
      "Each session, paste your brief at the top: topic, key points, CTA, and target persona.",
      "Use the prompt below. Claude will return each format labelled and ready to copy.",
    ],
    prompt: `You are a content strategist for [COMPANY NAME].
Brand voice: [paste 3-5 sentences describing your tone]
Target audience: [describe your ICP]
Brief: [paste your content brief here]

Generate the following from this brief:
LinkedIn post (200-250 words, hook in first line, no hashtags)
Email newsletter section (150 words, warm conversational tone)
Instagram caption (80 words, ends with a question)
Ad copy headline + 2 body variants (Google/Meta style)
Twitter/X thread (5 tweets, first tweet is the hook)

Label each format clearly. Keep brand voice consistent across all.`,
    proTip: "Save your brand voice and ICP as a Claude Project instruction. You only paste it once and every session inherits it automatically.",
  },
  {
    number: "02",
    title: "LinkedIn Growth Autopilot",
    tagline: "Hooks, DMs, comments, all in your voice, none of it robotic.",
    accent: "#0077b5",
    accentBg: "rgba(0,119,181,0.08)",
    whatItDoes:
      "This skill handles the three pillars of LinkedIn growth: post hooks that stop the scroll, DM sequences that convert connections into conversations, and comment strategies that build visibility with your target audience.",
    whenToUse:
      "Use this when you are serious about LinkedIn as a business channel and need a repeatable system rather than writing everything from scratch each week.",
    tools: ["Claude (claude.ai)", "LinkedIn Sales Navigator (optional, for lead context)", "Notion or a spreadsheet for tracking DM threads"],
    setupSteps: [
      "Create a Claude Project called 'LinkedIn OS'. Add your LinkedIn profile URL, ICP description, and 3 examples of posts you admire in the system prompt.",
      "For hooks: paste your raw idea or draft and ask Claude to generate 5 hook variants.",
      "For DMs: paste the person's profile summary and ask Claude to write a personalized opening line.",
      "For comments: paste the post text and ask Claude to write a thoughtful 2-3 sentence comment.",
    ],
    prompt: `I am a [YOUR ROLE] at [COMPANY]. My ICP is [describe your ideal client].
My LinkedIn voice is: [3 words that describe your tone, e.g. 'direct, insightful, conversational']

Task: Write 5 hook variants for this LinkedIn post idea:
[paste your raw idea]

Rules for hooks:
- First line must create curiosity or make a bold claim
- No questions as the opener
- No 'I' as the first word
- Max 12 words for the first line
- Each variant should take a different angle`,
    proTip: "Build a 'hook swipe file' inside your Claude Project. Paste your best-performing hooks there. Claude will learn your pattern and generate better variants over time.",
  },
  {
    number: "03",
    title: "Lead Generation Machine",
    tagline: "ICP built. Cold email written. Leads scored. Top-of-funnel automated.",
    accent: "#16a34a",
    accentBg: "rgba(34,197,94,0.08)",
    whatItDoes:
      "This skill handles the full top-of-funnel workflow: defining your Ideal Customer Profile, building a list of target companies and personas, writing personalized cold email sequences, and scoring inbound leads against your ICP criteria.",
    whenToUse: "Use this at the start of a new outreach campaign or when your current outbound is generating low reply rates.",
    tools: [
      "Claude for copy and ICP building",
      "Apollo.io or LinkedIn Sales Navigator for list building",
      "Instantly or Smartlead for sending sequences",
      "Clay (optional) for enrichment at scale",
    ],
    setupSteps: [
      "Start with the ICP prompt below to define exactly who you are targeting.",
      "Use Claude to generate a 3-email cold sequence for that ICP.",
      "Feed lead data (company, role, recent news) into Claude to personalize at scale.",
      "Use the scoring prompt to evaluate inbound leads against your ICP before spending time on them.",
    ],
    prompt: `I run [COMPANY TYPE] that helps [WHO] achieve [OUTCOME].
My best clients are companies that: [3 traits of your best clients]
My average deal size is [AMOUNT] and sales cycle is [LENGTH].

Task 1: Write my ICP in one crisp paragraph.
Task 2: List 5 job titles I should be targeting.
Task 3: Write a 3-email cold outreach sequence for this ICP.
  - Email 1: Pattern interrupt opener, 80 words max, one CTA
  - Email 2: Follow-up adding value (insight or case study), 60 words
  - Email 3: Breakup email, honest and direct, 40 words

No buzzwords. No 'I hope this finds you well'. No em dashes.`,
    proTip:
      "Paste a prospect's LinkedIn About section or recent post into Claude with the prompt: \"Using this context, personalize Email 1 for this specific person in 2 sentences.\" Do this for your top 20 leads before sending.",
  },
  {
    number: "04",
    title: "Research and Intel Automation",
    tagline: "Competitor battle cards and market summaries in minutes, not hours.",
    accent: "#a855f7",
    accentBg: "rgba(168,85,247,0.08)",
    whatItDoes:
      "This skill automates the research work that usually takes hours: competitor analysis, industry news digests, prospect research before calls, and building sales battle cards that your team can actually use in conversations.",
    whenToUse: "Use this before a sales call, before launching a new service, when a new competitor enters your space, or when you need to brief your team on market movements.",
    tools: ["Claude with web search enabled (claude.ai Pro)", "Perplexity for live web research", "Notion for storing battle cards and digests"],
    setupSteps: [
      "Enable web search in Claude settings (available on Pro).",
      "For competitor research, use the battle card prompt below.",
      "For pre-call prep, paste the prospect's LinkedIn URL or company About page.",
      "For news digests, set up a weekly prompt and paste into a team Notion page.",
    ],
    prompt: `Research [COMPETITOR NAME] and create a sales battle card.

Include:
1. What they do and who they target
2. Their pricing model (if publicly available)
3. Their top 3 strengths (be honest)
4. Their top 3 weaknesses or gaps
5. How I should position [MY COMPANY] against them
6. 3 objections a prospect might raise when comparing us, and how I answer each

Keep it concise. Sales team will use this live on calls.
Format as a clean table where possible.`,
    proTip: "Build a 'Battle Card Library' in Notion. Every time you generate a new card, paste it there. Share it with your sales team and update quarterly. This becomes one of your most valuable internal assets.",
  },
  {
    number: "05",
    title: "Proposal and Pitch Automator",
    tagline: "Draft a full proposal before you finish your morning coffee.",
    accent: "#14B8A6",
    accentBg: "rgba(20,184,166,0.08)",
    whatItDoes:
      "This skill uses your past wins, client context, and service details to generate proposals, pitch decks, and case study narratives. It eliminates the blank-page problem and cuts proposal writing time from hours to minutes.",
    whenToUse: "Use this every time you send a proposal. Also use it to generate capability decks, case studies from completed projects, and pitch narratives for new service lines.",
    tools: ["Claude (claude.ai)", "Canva or Google Slides for final formatting", "Notion for storing past project wins"],
    setupSteps: [
      "Build a 'Past Wins' note in Claude Project system prompt with 3-5 client results in this format: [Client type] + [Problem] + [Solution] + [Result with numbers].",
      "For each new proposal, fill in the brief template below.",
      "Claude will generate a full proposal structure. You edit and format.",
      "For pitch decks, ask Claude for slide-by-slide talking points after the proposal is done.",
    ],
    prompt: `You are writing a proposal for a potential client.

Client context:
- Company: [NAME], Industry: [INDUSTRY]
- Problem they shared: [describe their pain point]
- Decision maker's role: [TITLE]
- Budget indication: [RANGE or 'not discussed']
- How we met: [referral / inbound / outbound]

Our relevant past results:
- [Client type]: [Result]
- [Client type]: [Result]

Write a proposal with these sections:
1. Executive Summary (3 sentences, outcome-focused)
2. Understanding Your Challenge (mirror their language)
3. Our Approach (3 phases, specific to their problem)
4. Why Myntmore (2-3 relevant past results)
5. Investment (leave as [TO BE FILLED])
6. Next Step (single clear CTA)`,
    proTip: "After every completed project, spend 5 minutes with Claude generating a case study using the format: Problem, Approach, Result. Store these in your system prompt. Your proposals get stronger with every project you complete.",
  },
  {
    number: "06",
    title: "Personal Brand and Social OS",
    tagline: "Write once. Distribute everywhere.",
    accent: "#F97316",
    accentBg: "rgba(249,115,22,0.08)",
    whatItDoes:
      "This skill takes one piece of long-form content and turns it into a full distribution stack: LinkedIn posts, Instagram captions, Twitter threads, YouTube shorts scripts, newsletter sections, and quote graphics. One source, 10 plus outputs.",
    whenToUse: "Use this after every podcast, webinar, workshop, or blog post. If you are creating any long-form content, this skill pays for itself in the first use.",
    tools: ["Claude (claude.ai)", "Descript or Otter.ai for transcripts", "Buffer or Metricool for scheduling", "Canva for visual assets"],
    setupSteps: [
      "Get a transcript of your content (use Descript, Otter, or paste a blog post).",
      "Paste the transcript into Claude with the repurposing prompt below.",
      "Claude will return all formats. Review and edit each for your voice.",
      "Schedule across platforms. One session, full week of content.",
    ],
    prompt: `Here is a transcript/article: [PASTE CONTENT]

Repurpose this into the following formats. Keep my voice consistent.
My voice is: [describe in 3 words, e.g. 'direct, practical, founder-focused']

Outputs needed:
1. LinkedIn post (200 words, story-led, ends with a takeaway)
2. Twitter/X thread (6 tweets, first is the hook, last is the CTA)
3. Instagram caption (100 words, conversational, ends with a question)
4. Email newsletter intro (150 words, warm, bridges to the full article)
5. YouTube Shorts script (60 seconds, hook in first 3 words, spoken word style)
6. 3 pull quote graphics (one powerful sentence each, no context needed)

Label each output. Do not add hashtags unless I ask.`,
    proTip: "Record a 10-minute voice note on any topic using your phone. Transcribe it with Otter. Paste into Claude. You now have a week of content from a 10-minute car ride.",
  },
];

const NEXT_STEPS = [
  "Pick one skill from this guide that solves your most pressing problem right now.",
  "Create a Claude Project for that skill and set up the system prompt with your context.",
  "Run the prompt once with a real brief or campaign you are working on.",
  "Note what worked, what needed tweaking, and refine from there.",
  "Add a second skill once the first one feels natural.",
];

function SkillSection({ skill }: { skill: Skill }) {
  return (
    <section className="py-14 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-black transition-transform duration-300 hover:scale-110 inline-block" style={{ color: textTone(skill.accent) }}>{skill.number}</span>
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: skill.accentBg, color: textTone(skill.accent), border: `1px solid ${skill.accent}30` }}>
              Skill {skill.number}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-3 leading-tight" style={{ color: "#0a0a0a" }}>{skill.title}</h2>
          <p className="text-lg mb-8 font-medium" style={{ color: textTone(skill.accent) }}>{skill.tagline}</p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#71675E" }}>What it does</h3>
              <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{skill.whatItDoes}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#71675E" }}>When to use it</h3>
              <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{skill.whenToUse}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>Tools you need</h3>
              <ul className="space-y-2">
                {skill.tools.map((t, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-base" style={{ color: "#3D3D3D" }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: skill.accent }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>How to set it up</h3>
              <ol className="space-y-3">
                {skill.setupSteps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-base leading-relaxed" style={{ color: "#3D3D3D" }}>
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black mt-0.5"
                      style={{ backgroundColor: skill.accentBg, color: textTone(skill.accent) }}
                    >
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>Ready-to-use prompt</h3>
              <CopyBlock text={skill.prompt} accent={skill.accent} />
            </div>

            <div className="rounded-xl p-6" style={{ backgroundColor: skill.accentBg, border: `1px solid ${skill.accent}30` }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: textTone(skill.accent) }}>Pro tip</p>
              <p className="text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>{skill.proTip}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function ClaudeSkillsGuide() {
  return (
    <InnerLayout>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Guides", href: "/resources/guides" }, { label: "The 6 Claude Skills Guide", href: "/resources/guides/claude-skills-guide" }]} />
          <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 hero-fade" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
            Free Guide
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            The 6{" "}
            <span className="relative inline-block">
              Claude Skills Guide
              <Underline color="#F5B731" />
            </span>
          </h1>
          <p className="text-lg leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>
            Tejas isn&apos;t your average marketer. He&apos;s a 4x entrepreneur who built Flintstop, a D2C eCommerce brand, into a $6M-a-year machine, shipping out 8,000 orders a day before selling the business in 2020. At Myntmore, his B2B outbound agency, he&apos;s helped 130+ B2B companies book 12K+ meetings and generate $120M+ in pipeline. He&apos;s a TEDx speaker, angel investor, and has taught B2B growth methodologies at IIT and IIM. Now, he&apos;s here to do it for you.
          </p>
        </div>
      </section>

      {/* How to use this guide */}
      <section className="py-14 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-black mb-5" style={{ color: "#0a0a0a" }}>How to Use This Guide</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "#3D3D3D" }}>
              This guide covers all 6 Claude skills from the carousel, one skill per section. Each section includes what the skill does, when to use it, what tools you need, a step-by-step setup, a ready-to-use prompt you can copy directly into Claude, and a pro tip to get more out of it.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#3D3D3D" }}>
              You do not need to use all 6 skills at once. Pick the one that solves your biggest bottleneck right now and start there. Most founders who implement even one of these see a meaningful reduction in the time they spend on repetitive work within the first week.
            </p>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="rounded-2xl p-6 sm:p-8" style={{ backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.3)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#A14A08" }}>Before you begin</p>
              <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>
                All prompts in this guide work best inside a Claude Project. Create a project for each skill and save your brand voice, ICP, and past results in the Project system prompt. Claude will inherit this context across every conversation, so you never repeat yourself.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Skill sections */}
      {SKILLS.map((skill) => (
        <SkillSection key={skill.number} skill={skill} />
      ))}

      {/* What to do next */}
      <section className="py-14 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>What to Do Next</h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#3D3D3D" }}>
              You now have everything you need. Here is a simple action plan:
            </p>
            <ol className="space-y-4">
              {NEXT_STEPS.map((step, i) => (
                <li key={i} className="flex items-start gap-4 text-base leading-relaxed" style={{ color: "#3D3D3D" }}>
                  <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black mt-0.5" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="rounded-2xl p-8 sm:p-12 text-center" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <h2 className="text-2xl sm:text-3xl font-black mb-6 text-[#0A0A0A]">Stay in the loop</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <a
                  href="https://instagram.com/tejas_jhaveri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl p-5 text-center transition-all duration-300 hover:bg-[#F8F6F2] hover:-translate-y-1"
                  style={{ border: "1px solid #E8E2D9", backgroundColor: "#FFFFFF" }}
                >
                  <span className="flex justify-center mb-2" style={{ color: "#A14A08" }}><Camera className="w-6 h-6" aria-hidden="true" /></span>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">Follow along</span>
                  <span className="block text-xs" style={{ color: "#71675E" }}>@tejas_jhaveri</span>
                </a>
                <a
                  href="/book-a-call"
                  className="rounded-xl p-5 text-center transition-all duration-300 hover:bg-[#F8F6F2] hover:-translate-y-1"
                  style={{ border: "1px solid #E8E2D9", backgroundColor: "#FFFFFF" }}
                >
                  <span className="flex justify-center mb-2" style={{ color: "#A14A08" }}><CalendarCheck className="w-6 h-6" aria-hidden="true" /></span>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">Book a call</span>
                  <span className="block text-xs" style={{ color: "#71675E" }}>Complimentary strategy session</span>
                </a>
                <a
                  href="mailto:founder@myntmore.com"
                  className="rounded-xl p-5 text-center transition-all duration-300 hover:bg-[#F8F6F2] hover:-translate-y-1"
                  style={{ border: "1px solid #E8E2D9", backgroundColor: "#FFFFFF" }}
                >
                  <span className="flex justify-center mb-2" style={{ color: "#A14A08" }}><Mail className="w-6 h-6" aria-hidden="true" /></span>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">Email us</span>
                  <span className="block text-xs" style={{ color: "#71675E" }}>founder@myntmore.com</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </InnerLayout>
  );
}
