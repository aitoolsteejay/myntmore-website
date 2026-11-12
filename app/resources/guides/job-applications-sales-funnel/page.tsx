import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InnerLayout from "../../../components/InnerLayout";
import Breadcrumbs from "../../../components/Breadcrumbs";
import FadeIn from "../../../components/FadeIn";
import JsonLd from "../../../components/JsonLd";
import { buildArticleSchema } from "@/lib/schema";
import ArticleMeta from "@/app/components/ArticleMeta";
import { OG_BASE } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const URL = "https://www.myntmore.com/resources/guides/job-applications-sales-funnel";
const ACCENT = "#7C3AED";
const TITLE = "Job application are like a sales funnel";
const DESCRIPTION = "A practical job-search funnel for generating interview leads, reaching hiring managers directly, following up with proof, and closing the offer.";

export const metadata: Metadata = withPageSeo("/resources/guides/job-applications-sales-funnel", {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["job search funnel", "job application strategy", "how to reach hiring managers", "LinkedIn job search", "get more interviews", "job search outreach"],
  alternates: { canonical: URL },
  openGraph: { ...OG_BASE, title: `${TITLE} | Myntmore`, description: DESCRIPTION, url: URL, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }] },
});

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: TITLE,
  description: DESCRIPTION,
  url: URL,
  datePublished: "2026-10-10T00:00:00+05:30",
  dateModified: "2026-10-10T00:00:00+05:30",
});

const FUNNEL = [
  ["Marketing", "Profile and content"],
  ["Prospecting", "Finding hiring managers"],
  ["Outreach", "Connection request and messages"],
  ["Follow-up", "Loom video and voice note"],
  ["Closing", "The interview"],
  ["Goal", "More interviews and offers"],
];

const OUTREACH = [
  ["Compliment", "They post or have built something notable", "Hi [Name], your post on [topic] stood out, especially [specific point]. I work in [your area] and would value connecting."],
  ["Thought-provoking question", "You have a real view on their space", "Hi [Name], quick question: as [company] grows [area], how are you thinking about [specific challenge]? Keen to connect and follow your thinking."],
  ["Straight to the point", "The role is open and you fit it", "Hi [Name], I saw [company] is hiring for [role]. I&apos;ve [one relevant result]. Would love to connect and share how I could help."],
];

const METRICS = [
  ["Profile views", "Whether your content and outreach are getting attention"],
  ["Connection acceptance rate", "Whether your targeting and notes work"],
  ["Reply rate", "Whether your Loom and follow-ups land"],
  ["Interviews booked", "Whether the whole funnel converts"],
  ["Interview to offer rate", "Whether your closing needs work"],
];

const JOB_FUNNEL = [
  { label: "HR / Hiring managers reached out to", value: "800", rate: "", width: 100, color: "#D6E8FA", edge: "#1478C9", text: "#0A0A0A" },
  { label: "Accepted connection request", value: "240", rate: "30%", width: 88, color: "#DCEAF7", edge: "#1E6DA9", text: "#0A0A0A" },
  { label: "Responded", value: "120", rate: "50%", width: 74, color: "#E2EBF5", edge: "#326D9C", text: "#0A0A0A" },
  { label: "Positive replies", value: "36", rate: "30%", width: 58, color: "#E8EDF3", edge: "#446B8D", text: "#0A0A0A" },
  { label: "Interviews", value: "28", rate: "80%", width: 43, color: "#DCF3E4", edge: "#107941", text: "#0A0A0A" },
  { label: "Job offers", value: "3", rate: "", width: 36, color: "#FFB82E", edge: "#FFB82E", text: "#18214D" },
];

const HERO_STATS = [
  ["Target list", "20–30", "people worth researching"],
  ["Follow-up", "60–90 sec", "to show your thinking"],
  ["Weekly review", "1 stage", "to improve at a time"],
];

function DataTable({ rows }: { rows: string[][] }) {
  return <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#E8E2D9" }}>{rows.map(([left, right], i) => <div key={left} className="group grid grid-cols-1 sm:grid-cols-[0.85fr_1.5fr] transition-transform duration-300 hover:-translate-y-0.5" style={{ borderBottom: i < rows.length - 1 ? "1px solid #E8E2D9" : "none" }}><div className="px-5 py-4 text-sm font-black transition-colors duration-300 group-hover:text-violet-700" style={{ backgroundColor: "#F8F6F2", color: "#0a0a0a" }}>{left}</div><div className="px-5 py-4 text-sm leading-relaxed transition-colors duration-300 group-hover:bg-violet-50/50" style={{ backgroundColor: "#ffffff", color: "#52525B" }}>{right}</div></div>)}</div>;
}

function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <FadeIn delay={Number(number) * 45}><section className="group"><div className="flex items-center gap-3 mb-3"><span className="w-9 h-9 rounded-full inline-flex items-center justify-center text-sm font-black transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" style={{ backgroundColor: "rgba(124,58,237,0.1)", color: ACCENT }}>{number}</span><span className="text-xs font-black uppercase tracking-widest" style={{ color: ACCENT }}>Step {number}</span></div><h2 className="text-2xl sm:text-3xl font-black mb-5" style={{ color: "#0a0a0a" }}>{title}</h2><div className="space-y-5 text-base leading-relaxed" style={{ color: "#52525B" }}>{children}</div></section></FadeIn>;
}

function JobHuntFunnel() {
  return <div className="mt-10 rounded-[28px] border p-6 sm:p-10" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", boxShadow: "0 18px 55px rgba(20,120,201,0.08)" }}>
    <h2 className="text-2xl sm:text-3xl font-black text-center mb-8" style={{ color: "#252746" }}>The job-hunt funnel</h2>
    <div className="flex flex-col items-center gap-3" aria-label="Job hunt funnel from outreach to offers">
      {JOB_FUNNEL.map((stage, index) => <div key={stage.label} className="animate-fade-up flex flex-col items-center justify-center rounded-xl px-4 py-2.5 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ width: `${stage.width}%`, minWidth: "180px", backgroundColor: stage.color, border: `1px solid ${stage.edge}`, color: stage.text, animationDelay: `${index * 90}ms` }}>
        <span className="text-sm sm:text-base font-bold leading-tight">{stage.label}</span>
        {stage.rate && <span className="text-xs font-bold opacity-90 mt-0.5">{stage.rate}</span>}
        <strong className="text-2xl sm:text-3xl leading-none mt-0.5">{stage.value}</strong>
      </div>)}
    </div>
    <p className="text-xs text-center mt-7" style={{ color: "#71675E" }}>Example math for a focused list of 800 hiring managers. Your conversion rates will vary by role, market, and proof.</p>
  </div>;
}

export default function JobApplicationsSalesFunnel() {
  return <InnerLayout>
    <JsonLd data={ARTICLE_SCHEMA} />
    <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.18),rgba(124,58,237,0.05) 42%,transparent 70%)", filter: "blur(55px)" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,183,49,0.19),rgba(245,183,49,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
      <div className="relative z-10 max-w-5xl mx-auto"><div className="lg:col-span-2"><Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Guides", href: "/resources/guides" }]} /></div>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-end mt-2">
          <div><div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(124,58,237,0.3)", backgroundColor: "rgba(124,58,237,0.08)" }}><span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} /><span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: ACCENT }}>Career · Job Search Playbook</span></div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[0.98] hero-fade-d1" style={{ color: "#0a0a0a" }}>Job application are like a <span style={{ color: ACCENT }}>sales funnel</span></h1>
            <ArticleMeta schema={ARTICLE_SCHEMA} />
            <p className="text-lg sm:text-xl max-w-2xl leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>Stop applying and hoping. Use a step-by-step system to generate interview leads, reach hiring managers directly, and close the offer.</p>
          </div>
          <div className="hero-fade-d3 rounded-[28px] border p-5 sm:p-6 shadow-[0_18px_50px_rgba(124,58,237,0.1)]" style={{ backgroundColor: "rgba(255,255,255,0.78)", borderColor: "rgba(124,58,237,0.16)", backdropFilter: "blur(12px)" }}>
            <div className="flex items-center justify-between mb-5"><span className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: ACCENT }}>The operating system</span><span className="text-lg" aria-hidden="true">↗</span></div>
            <div className="space-y-3">{HERO_STATS.map(([label, value, note]) => <div key={label} className="flex items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-transform duration-300 hover:translate-x-1" style={{ backgroundColor: "#F8F6F2" }}><div><p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#71675E" }}>{label}</p><p className="text-xl font-black" style={{ color: "#0a0a0a" }}>{value}</p></div><p className="max-w-[130px] text-right text-xs leading-relaxed" style={{ color: "#52525B" }}>{note}</p></div>)}</div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-12 px-4 border-y" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}><div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6"><Image src="/tejas.png" alt="Tejas Jhaveri, Founder of Myntmore" width={112} height={112} className="rounded-2xl object-cover shrink-0 transition-transform duration-500 hover:scale-105 hover:rotate-2" /><div><h2 className="text-xl font-black mb-2" style={{ color: "#0a0a0a" }}>A founder who thinks in funnels</h2><p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>Tejas is a 4x entrepreneur who built Flintstop into a $6M-a-year D2C business before selling it in 2020. At Myntmore, his B2B outbound agency has helped 130+ B2B companies book 12K+ meetings and generate $120M+ in pipeline. He is a TEDx speaker, angel investor, and has taught B2B growth at IIT and IIM.</p></div></div></section>

    <article className="py-16 px-4" style={{ backgroundColor: "#F8F6F2", color: "#52525B" }}><div className="max-w-3xl mx-auto space-y-16">
      <FadeIn><section><p className="text-lg leading-relaxed mb-6">A job search has the same structure as a sales pipeline: leads come in, you qualify them, you reach out, you follow up, and you close. Most candidates skip straight to the last stage by sending a resume into a portal, which is the equivalent of cold pitching with no brand, list, or follow-up.</p><DataTable rows={FUNNEL} /><JobHuntFunnel /><div className="rounded-xl p-5 mt-6 border-l-4" style={{ backgroundColor: "#F3E8FF", borderColor: ACCENT }}><p className="font-bold" style={{ color: "#0a0a0a" }}>Treat interviews as your leads and offers as your closed deals. A funnel can be measured and improved; a pile of applications cannot.</p></div></section></FadeIn>

      <Step number="01" title="Think like a salesperson"><p>Track every step in a simple sheet: profile views, connection requests sent, accepted, replied, and interviews booked. Fix the weakest stage first, not the one you like working on. If you can see where the funnel leaks, you know exactly what to fix.</p></Step>
      <Step number="02" title="Make your profile do the selling"><p>Outreach sends people to your profile, so a weak profile wastes every message you send.</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{["Banner: state your skillset and target role in one clear line.", "Headline: say what you do and the result you deliver.", "About: write for the hiring manager&apos;s problem.", "Featured: pin your best work, projects, case studies, or videos.", "Experience: lead with outcomes before responsibilities.", "Content: share what you have learned, built, or fixed in plain language."].map((item) => <div key={item} className="rounded-xl border p-4 text-sm font-semibold" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#3D3D3D" }}>✓ {item}</div>)}</div><p>Post short videos covering wins, failures, and lessons. Honest failures build more trust than a highlight reel. Your goal is simple: when a hiring manager checks your profile, they see proof, not just claims.</p><Link href="/tools/linkedin-optimizer" className="font-bold underline" style={{ color: ACCENT }}>Optimise your profile with our free tool →</Link></Step>
      <Step number="03" title="Find the right hiring managers"><p>Applying through a portal puts you in a crowd. Prospecting puts you in front of the person who owns the hire. Target the hiring manager or team lead, a senior person in your function, or someone whose team is growing.</p><ol className="list-decimal pl-5 space-y-2"><li>Search your target job title plus the company on LinkedIn.</li><li>Filter by company, location, and role level.</li><li>Check who posts about hiring or team growth.</li><li>Save 20 to 30 names with their role, why they fit, and one recent post or company update.</li></ol><p>A short, researched list beats a long, random one.</p></Step>
      <Step number="04" title="Send a connection request that earns an acceptance"><p>Pick one strategy and keep the note short, specific, and free of a resume or job ask.</p><DataTable rows={OUTREACH} /><p className="text-sm">The goal of the request is acceptance, not an offer. Reference something real and specific, and write comfortably under LinkedIn&apos;s current connection-note limit.</p></Step>
      <Step number="05" title="Show, don&apos;t just tell"><p>After they accept, record a 60 to 90 second Loom video with your face on screen.</p><div className="rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}><ol className="space-y-3">{["Hook (0–10 sec): greet them and mention the company or a specific project.", "Insight (10–40 sec): show one observation about their business, team, or product.", "Value (40–70 sec): explain how you would add value, with one real example.", "Ask (70–90 sec): suggest a short call and make it easy to say yes."].map((item, i) => <li key={item} className="flex gap-3 text-sm" style={{ color: "#3D3D3D" }}><span className="font-black" style={{ color: ACCENT }}>{i + 1}</span>{item}</li>)}</ol></div><p>If there is no response, send a voice note under 45 seconds three to five days later, then a short final nudge a few days after that. Every touch should add something new; never send “just checking in.”</p></Step>
      <Step number="06" title="Scale it carefully"><p>For a small, specific list of 20 to 30 people, do it manually for the highest personalization. If you need more reach, LinkedIn automation can handle sending and sequencing while you personalize the inputs.</p><div className="rounded-xl p-5 border-l-4" style={{ backgroundColor: "#FEF9EC", borderColor: "#F5B731" }}><p className="font-bold" style={{ color: "#0a0a0a" }}>Automation scales the process, but it does not fix a weak profile or weak message. Personalize every message, keep volume modest, and check LinkedIn&apos;s current rules before using automation.</p></div><Link href="/services/do-it-yourself" className="font-bold underline" style={{ color: ACCENT }}>Run your outreach yourself with our sequencing service →</Link></Step>
      <Step number="07" title="Close the interview like a sales call"><p>Getting the interview is the lead. The interview is where you close.</p><ul className="space-y-3">{["Discovery first: ask about the team&apos;s goals and biggest challenges before talking about yourself.", "Match your proof to their pain: use examples that map to what they told you.", "Handle objections calmly: address concerns about experience or fit with evidence.", "Close clearly: ask about next steps and the timeline.", "Follow up within 24 hours: summarize how you can solve their key problem."].map((item) => <li key={item} className="flex gap-3"><span style={{ color: ACCENT }}>✓</span>{item}</li>)}</ul><p>Interviews are won by the candidate who understands the problem best, not the one who talks the most.</p></Step>
      <FadeIn><figure className="rounded-2xl border overflow-hidden transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}><Image src="/sales-solves-problems.png" alt="Sales solves all the problems in your life" width={1254} height={1254} className="w-full h-auto" /><figcaption className="px-5 py-3 text-center text-xs" style={{ color: "#71675E" }}>Treat the interview like a sales conversation: understand the problem, show your proof, and make the next step easy.</figcaption></figure></FadeIn>
      <Step number="08" title="Track and improve every week"><p>Review these numbers each week, then change one thing at the weakest stage: the connection note, Loom hook, profile banner, or interview close.</p><DataTable rows={METRICS} /></Step>

      <FadeIn><section className="cta-animated-section rounded-2xl p-8 sm:p-10 text-center border" style={{ borderColor: "rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}><span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>Your next 7 days</span><h2 className="text-2xl sm:text-3xl font-black mt-3 mb-5" style={{ color: "#0A0A0A" }}>Run the funnel this week.</h2><ol className="text-left max-w-xl mx-auto space-y-2 text-sm" style={{ color: "#3D3D3D" }}>{["Day 1: update your banner, headline, and Featured section.", "Day 2: build a list of 20 hiring managers.", "Day 3: send your first 10 connection requests.", "Day 4–5: record and send Loom videos to everyone who accepts.", "Day 6: send voice notes to anyone who has not replied.", "Day 7: review your numbers and fix the weakest stage."].map((item) => <li key={item}>{item}</li>)}</ol><p className="text-base leading-relaxed max-w-xl mx-auto mt-7" style={{ color: "#52525B" }}>Momentum in a job search comes from running the process, not waiting for the perfect profile.</p><div className="flex flex-col sm:flex-row gap-4 justify-center mt-8"><Link href="/tools/linkedin-optimizer" className="btn-dark px-8 py-4 text-sm font-bold">Optimise your profile</Link><a href="mailto:founder@myntmore.com" className="px-8 py-4 text-sm font-bold rounded-full border transition-transform duration-200 hover:-translate-y-1" style={{ color: "#0A0A0A", backgroundColor: "#FFFFFF", borderColor: "#D0C9BF" }}>founder@myntmore.com</a></div></section></FadeIn>
      <p className="text-center text-sm" style={{ color: "#71675E" }}>Made by Tejas Jhaveri. Follow <a href="https://www.instagram.com/tejas_jhaveri" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: "#0a0a0a" }}>@tejas_jhaveri</a> on Instagram for more playbooks like this.</p>
    </div></article>
  </InnerLayout>;
}
