import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import { buildArticleSchema, SITE_URL } from "@/lib/schema";
import Link from "next/link";
import { Camera, CalendarCheck, Mail } from "lucide-react";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CopyBlock from "@/app/components/CopyBlock";
import FadeIn from "@/app/components/FadeIn";
import Underline from "./Underline";
import { textTone } from "@/lib/colors";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";
import pageCopy from "@/content/page-copy/guideClaudeSkillsGuide.json";

// This page's text is edited in the admin ("The 6 Claude Skills Guide") and lives in content/page-copy/guideClaudeSkillsGuide.json.
const copy = pageCopy;

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
    images: ogImages("/resources/guides/claude-skills-guide"),
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
    title: copy.s01.t01,
    tagline: copy.s01.t02,
    accent: "#D97706",
    accentBg: "rgba(245,183,49,0.08)",
    whatItDoes:
      "This skill takes a single content brief and generates blog posts, email newsletters, LinkedIn posts, ad copy, and social captions simultaneously. Claude understands tone per channel so your LinkedIn post does not read like an email and your ad copy does not sound like a blog.",
    whenToUse:
      "Use this when you have one idea, announcement, or campaign and need to distribute it across multiple channels without writing each piece from scratch.",
    tools: [copy.s01.t03, copy.s01.t04, copy.s01.t05],
    setupSteps: [
      copy.s01.t06,
      copy.s01.t07,
      copy.s01.t08,
      copy.s01.t09,
    ],
    prompt: copy.s01.t10,
    proTip: "Save your brand voice and ICP as a Claude Project instruction. You only paste it once and every session inherits it automatically.",
  },
  {
    number: "02",
    title: copy.s01.t11,
    tagline: copy.s01.t12,
    accent: "#0077b5",
    accentBg: "rgba(0,119,181,0.08)",
    whatItDoes:
      "This skill handles the three pillars of LinkedIn growth: post hooks that stop the scroll, DM sequences that convert connections into conversations, and comment strategies that build visibility with your target audience.",
    whenToUse:
      "Use this when you are serious about LinkedIn as a business channel and need a repeatable system rather than writing everything from scratch each week.",
    tools: [copy.s01.t13, copy.s01.t14, copy.s01.t15],
    setupSteps: [
      copy.s01.t16,
      copy.s01.t17,
      copy.s01.t18,
      copy.s01.t19,
    ],
    prompt: copy.s01.t20,
    proTip: "Build a 'hook swipe file' inside your Claude Project. Paste your best-performing hooks there. Claude will learn your pattern and generate better variants over time.",
  },
  {
    number: "03",
    title: copy.s01.t21,
    tagline: copy.s01.t22,
    accent: "#16a34a",
    accentBg: "rgba(34,197,94,0.08)",
    whatItDoes:
      "This skill handles the full top-of-funnel workflow: defining your Ideal Customer Profile, building a list of target companies and personas, writing personalized cold email sequences, and scoring inbound leads against your ICP criteria.",
    whenToUse: "Use this at the start of a new outreach campaign or when your current outbound is generating low reply rates.",
    tools: [
      copy.s01.t23,
      copy.s01.t24,
      copy.s01.t25,
      copy.s01.t26,
    ],
    setupSteps: [
      copy.s01.t27,
      copy.s01.t28,
      copy.s01.t29,
      copy.s01.t30,
    ],
    prompt: copy.s01.t31,
    proTip:
      "Paste a prospect's LinkedIn About section or recent post into Claude with the prompt: \"Using this context, personalize Email 1 for this specific person in 2 sentences.\" Do this for your top 20 leads before sending.",
  },
  {
    number: "04",
    title: copy.s01.t32,
    tagline: copy.s01.t33,
    accent: "#a855f7",
    accentBg: "rgba(168,85,247,0.08)",
    whatItDoes:
      "This skill automates the research work that usually takes hours: competitor analysis, industry news digests, prospect research before calls, and building sales battle cards that your team can actually use in conversations.",
    whenToUse: "Use this before a sales call, before launching a new service, when a new competitor enters your space, or when you need to brief your team on market movements.",
    tools: [copy.s01.t34, copy.s01.t35, copy.s01.t36],
    setupSteps: [
      copy.s01.t37,
      copy.s01.t38,
      copy.s01.t39,
      copy.s01.t40,
    ],
    prompt: copy.s01.t41,
    proTip: "Build a 'Battle Card Library' in Notion. Every time you generate a new card, paste it there. Share it with your sales team and update quarterly. This becomes one of your most valuable internal assets.",
  },
  {
    number: "05",
    title: copy.s01.t42,
    tagline: copy.s01.t43,
    accent: "#14B8A6",
    accentBg: "rgba(20,184,166,0.08)",
    whatItDoes:
      "This skill uses your past wins, client context, and service details to generate proposals, pitch decks, and case study narratives. It eliminates the blank-page problem and cuts proposal writing time from hours to minutes.",
    whenToUse: "Use this every time you send a proposal. Also use it to generate capability decks, case studies from completed projects, and pitch narratives for new service lines.",
    tools: [copy.s01.t44, copy.s01.t45, copy.s01.t46],
    setupSteps: [
      copy.s01.t47,
      copy.s01.t48,
      copy.s01.t49,
      copy.s01.t50,
    ],
    prompt: copy.s01.t51,
    proTip: "After every completed project, spend 5 minutes with Claude generating a case study using the format: Problem, Approach, Result. Store these in your system prompt. Your proposals get stronger with every project you complete.",
  },
  {
    number: "06",
    title: copy.s01.t52,
    tagline: copy.s01.t53,
    accent: "#F97316",
    accentBg: "rgba(249,115,22,0.08)",
    whatItDoes:
      "This skill takes one piece of long-form content and turns it into a full distribution stack: LinkedIn posts, Instagram captions, Twitter threads, YouTube shorts scripts, newsletter sections, and quote graphics. One source, 10 plus outputs.",
    whenToUse: "Use this after every podcast, webinar, workshop, or blog post. If you are creating any long-form content, this skill pays for itself in the first use.",
    tools: [copy.s01.t54, copy.s01.t55, copy.s01.t56, copy.s01.t57],
    setupSteps: [
      copy.s01.t58,
      copy.s01.t59,
      copy.s01.t60,
      copy.s01.t61,
    ],
    prompt: copy.s01.t62,
    proTip: "Record a 10-minute voice note on any topic using your phone. Transcribe it with Otter. Paste into Claude. You now have a week of content from a 10-minute car ride.",
  },
];

const NEXT_STEPS = [
  copy.s01.t63,
  copy.s01.t64,
  copy.s01.t65,
  copy.s01.t66,
  copy.s01.t67,
];

function SkillSection({ skill }: { skill: Skill }) {
  return (
    <section className="py-14 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-black transition-transform duration-300 hover:scale-110 inline-block" style={{ color: textTone(skill.accent) }}>{skill.number}</span>
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: skill.accentBg, color: textTone(skill.accent), border: `1px solid ${skill.accent}30` }}>{copy.s01.t68}{skill.number}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-3 leading-tight" style={{ color: "#0a0a0a" }}>{skill.title}</h2>
          <p className="text-lg mb-8 font-medium" style={{ color: textTone(skill.accent) }}>{skill.tagline}</p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#71675E" }}>{copy.s02.t01}</h3>
              <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{skill.whatItDoes}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#71675E" }}>{copy.s03.t01}</h3>
              <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{skill.whenToUse}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>{copy.s04.t01}</h3>
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
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>{copy.s05.t01}</h3>
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
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>{copy.s06.t01}</h3>
              <CopyBlock text={skill.prompt} accent={skill.accent} />
            </div>

            <div className="rounded-xl p-6" style={{ backgroundColor: skill.accentBg, border: `1px solid ${skill.accent}30` }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: textTone(skill.accent) }}>{copy.s06.t02}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#3D3D3D" }}>{skill.proTip}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Article schema. The first publication date is not on record, so only the last update (from lib/sitemap-dates.json) is given.
const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "The 6 Claude Skills Guide",
  description: "Six ready-to-use Claude skills for founders: content distribution, LinkedIn growth, lead gen, and more, with copy-paste prompts. Try them free.",
  url: `${SITE_URL}/resources/guides/claude-skills-guide`,
  dateModified: "2026-11-14T12:09:59+05:30",
});

export default function ClaudeSkillsGuide() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />
      {/* Hero */}
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: copy.s06.t03, href: "/resources" }, { label: copy.s06.t04, href: "/resources/guides" }, { label: copy.s06.t05, href: "/resources/guides/claude-skills-guide" }]} />
          <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 hero-fade" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>{copy.s06.t06}</span>
          <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>{copy.s06.t07}{" "}
            <span className="relative inline-block">{copy.s06.t08}<Underline color="#F5B731" />
            </span>
          </h1>
          <p className="text-lg leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>{copy.s06.t09}</p>
        </div>
      </section>

      {/* How to use this guide */}
      <section className="py-14 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-black mb-5" style={{ color: "#0a0a0a" }}>{copy.s07.t01}</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "#3D3D3D" }}>{copy.s07.t02}</p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#3D3D3D" }}>{copy.s07.t03}</p>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="rounded-2xl p-6 sm:p-8" style={{ backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.3)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#A14A08" }}>{copy.s07.t04}</p>
              <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>{copy.s07.t05}</p>
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
            <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s08.t01}</h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#3D3D3D" }}>{copy.s08.t02}</p>
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
              <h2 className="text-2xl sm:text-3xl font-black mb-6 text-[#0A0A0A]">{copy.s09.t01}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <a
                  href="https://instagram.com/tejas_jhaveri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl p-5 text-center transition-all duration-300 hover:bg-[#F8F6F2] hover:-translate-y-1"
                  style={{ border: "1px solid #E8E2D9", backgroundColor: "#FFFFFF" }}
                >
                  <span className="flex justify-center mb-2" style={{ color: "#A14A08" }}><Camera className="w-6 h-6" aria-hidden="true" /></span>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">{copy.s09.t02}</span>
                  <span className="block text-xs" style={{ color: "#71675E" }}>{copy.s09.t03}</span>
                </a>
                <a
                  href="/book-a-call"
                  className="rounded-xl p-5 text-center transition-all duration-300 hover:bg-[#F8F6F2] hover:-translate-y-1"
                  style={{ border: "1px solid #E8E2D9", backgroundColor: "#FFFFFF" }}
                >
                  <span className="flex justify-center mb-2" style={{ color: "#A14A08" }}><CalendarCheck className="w-6 h-6" aria-hidden="true" /></span>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">{copy.s09.t04}</span>
                  <span className="block text-xs" style={{ color: "#71675E" }}>{copy.s09.t05}</span>
                </a>
                <a
                  href="mailto:founder@myntmore.com"
                  className="rounded-xl p-5 text-center transition-all duration-300 hover:bg-[#F8F6F2] hover:-translate-y-1"
                  style={{ border: "1px solid #E8E2D9", backgroundColor: "#FFFFFF" }}
                >
                  <span className="flex justify-center mb-2" style={{ color: "#A14A08" }}><Mail className="w-6 h-6" aria-hidden="true" /></span>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">{copy.s09.t06}</span>
                  <span className="block text-xs" style={{ color: "#71675E" }}>{copy.s09.t07}</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </InnerLayout>
  );
}
