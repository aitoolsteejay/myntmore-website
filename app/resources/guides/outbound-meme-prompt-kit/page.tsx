import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CopyBlock from "@/app/components/CopyBlock";
import FadeIn from "@/app/components/FadeIn";
import JsonLd from "@/app/components/JsonLd";
import ArticleMeta from "@/app/components/ArticleMeta";
import Underline from "../how-to-set-up-vibe-prospecting/Underline";
import { buildArticleSchema } from "@/lib/schema";
import { textTone } from "@/lib/colors";

const URL = "https://www.myntmore.com/resources/guides/outbound-meme-prompt-kit";
const ACCENT = "#EA580C";
const TITLE = "The Outbound Meme Prompt Kit (Free)";
const DESCRIPTION =
  "Four copy-paste AI image prompts that turn cold outreach pain into memes people share: graveyard, reject and approve, astronaut and conspiracy board.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "outbound meme prompts",
    "linkedin meme prompts",
    "ai meme generator prompts",
    "cold outreach memes",
    "b2b meme templates",
    "linkedin content ideas for founders",
    "ai image prompts for linkedin posts",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: `${TITLE} | Myntmore`,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
};

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "The Outbound Meme Prompt Kit",
  description: DESCRIPTION,
  url: URL,
  datePublished: "2026-10-28T00:00:00+05:30",
  dateModified: "2026-10-28T00:00:00+05:30",
});

const STEPS = [
  { n: "1", title: "Pick a meme", text: "Choose the format that fits your point. Each one is built around a real outreach feeling." },
  { n: "2", title: "Upload your photo", text: "Use a clear, front-facing photo with good lighting. Attach it to your image tool along with the prompt." },
  { n: "3", title: "Swap the brackets", text: "Change the parts in [square brackets]: your caption, outfit and details. Generate, check the spelling, post." },
];

const MEMES = [
  {
    id: "01",
    title: "The Graveyard",
    bestFor: "Follow-ups that never got a reply.",
    image: "/guides/outbound-meme-prompt-kit/graveyard.webp",
    alt: "Meme of a man in a black puffer jacket making a peace sign beside a cartoon tombstone reading “Paying respects to my previous follow-ups.” on an underwater seabed",
    swap: "ghost icon, caption, jacket",
    prompt: `Using my uploaded photo as the face reference, create a meme-style image.

Scene: an underwater cartoon seabed graveyard in a classic animated sea-cartoon style, with painterly blue-teal water, coral, sand dollars and faint outlined flower-shaped clouds in the background.

A large rounded tombstone sits on the left with a small black [ghost icon] on top and the text “[your caption, e.g. Paying respects to my previous follow-ups.]” in bold black sans-serif, centred. A small patch of white flowers sits at its base.

I am crouching beside the tombstone on the right in a [black puffer jacket], smiling and making a peace sign at the camera.

Keep my face realistic and recognisable while the rest of the scene stays cartoon. Add a white bar above and below the image so it fits a 4:5 frame.`,
  },
  {
    id: "02",
    title: "The Reject and Approve",
    bestFor: "Two ways of saying the same thing, where one clearly wins.",
    image: "/guides/outbound-meme-prompt-kit/reject-approve.webp",
    alt: "Two-panel reject and approve meme: a man in an orange puffer jacket rejects “Another awkward follow-up” and approves “A simple let’s talk later”",
    swap: "jacket, rejected line, preferred line",
    prompt: `Using my uploaded photo as the face reference, create a two-panel vertical meme in the classic “reject and approve” format.

Left column: two photo panels on a bright yellow background, with me wearing a [bright orange puffer jacket]. Top panel: I look away with a hand raised in rejection. Bottom panel: I smile with my eyes closed and point approvingly at the camera.

Right column: two white panels separated by thick black lines, each with centred bold black sans-serif text.
Top text: “[the thing you reject, e.g. Another awkward follow-up]”
Bottom text: “[the thing you prefer, e.g. A simple “let’s talk later”]”

Clean, high contrast, square format.`,
  },
  {
    id: "03",
    title: "The Astronaut",
    bestFor: "The message that disappeared into the void.",
    image: "/guides/outbound-meme-prompt-kit/astronaut.webp",
    alt: "Meme of a smiling astronaut waving in front of Earth and stars, captioned “Still searching the universe for your reply.”",
    swap: "caption, suit colours, background",
    prompt: `Using my uploaded photo as the face reference, create a meme image.

I am an astronaut in a [white and blue] spacesuit, waving one gloved hand, my face clearly visible through the helmet visor with a friendly smile.

Background: deep space with stars, small distant planets and a large Earth on the right. Realistic, cinematic style.

Above the image, add a plain white banner with the text “[your caption, e.g. Still searching the universe for your reply.]” in bold black sans-serif, centred on one line.

Landscape image placed inside a 4:5 frame with white space above and below.`,
  },
  {
    id: "04",
    title: "The Conspiracy Board",
    bestFor: "When the numbers make no sense.",
    image: "/guides/outbound-meme-prompt-kit/conspiracy-board.webp",
    alt: "Meme of a frustrated man in a white blazer in front of a cork conspiracy board with red string, headlines “Pipeline stuck!”, “LinkedIn ghosting?” and “Outbound not working?”, captioned “Figuring out why I still haven’t gotten a reply”",
    swap: "headline cards, outfit, caption",
    prompt: `Using my uploaded photo as the face reference, create a meme image.

Background: a cork board covered in pinned printouts, sticky notes, charts, newspaper clippings and red string connecting them all. Add bold headline cards reading “[problem 1, e.g. Pipeline stuck!]”, “[problem 2, e.g. LinkedIn ghosting?]”, “[problem 3, e.g. Outbound not working?]” and “[problem 4]”.

In the foreground, me in a [white blazer over a black t-shirt], looking frustrated and confused with both hands raised in front of my face and eyebrows furrowed. A table with a coffee mug sits behind me.

Above the image, add a white banner with the text “[your caption, e.g. Figuring out why I still haven’t gotten a reply]” in bold black sans-serif.

Portrait 4:5 format.`,
  },
];

const TIPS = [
  { title: "Use a sharp reference photo.", text: "Front-facing, good light, no sunglasses. It keeps your face recognisable across every format." },
  { title: "Keep the caption short.", text: "One line where possible. Short text is far less likely to come back misspelled." },
  { title: "Check the text every time.", text: "Image tools slip on spelling. Read the caption before you post, and regenerate if needed." },
  { title: "Stay consistent.", text: "The same banner style and bold black font across every meme makes your feed look like a series." },
];

const RELATED = [
  { label: "LinkedIn Content-to-Calls Starter Kit", href: "/resources/guides/linkedin-content-to-calls-starter-kit", note: "Post templates, CTAs and a 10-minute daily routine." },
  { label: "How to Write a LinkedIn Hook", href: "/resources/blogs/how-to-write-a-linkedin-hook", note: "Six patterns for the first line of every post." },
  { label: "LinkedIn Hook Grader", href: "/tools/linkedin-hook-grader", note: "Score your opening line before you post it." },
  { label: "Cold Email Follow-Up Sequence", href: "/resources/blogs/cold-email-follow-up-sequence", note: "What to send when the first email gets no reply." },
];

const H2 = "text-2xl sm:text-3xl font-black";

export default function OutboundMemePromptKit() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(234,88,12,0.16),rgba(234,88,12,0.05) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,183,49,0.19),rgba(245,183,49,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Guides", href: "/resources/guides" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(234,88,12,0.3)", backgroundColor: "rgba(234,88,12,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>LinkedIn Content · Prompt Kit</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            The Outbound{" "}
            <span className="relative inline-block">Meme<Underline color="#F5B731" /></span>{" "}
            Prompt Kit
          </h1>
          <ArticleMeta schema={ARTICLE_SCHEMA} />
          <p className="text-lg sm:text-xl max-w-2xl leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>
            Four copy-paste prompts that turn the pain of cold outreach into memes people actually share. Upload your photo, swap the brackets, post.
          </p>
        </div>
      </section>

      <article className="py-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto space-y-16">
          <FadeIn>
            <section>
              <h2 className={`${H2} mb-6`} style={{ color: "#0a0a0a" }}>How it works</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {STEPS.map((s, i) => (
                  <FadeIn key={s.n} delay={i * 100}>
                    <div className="h-full rounded-2xl border p-5" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                      <span className="w-9 h-9 rounded-full inline-flex items-center justify-center text-sm font-black mb-3" style={{ backgroundColor: "rgba(234,88,12,0.1)", color: textTone(ACCENT), border: "1px solid rgba(234,88,12,0.25)" }}>{s.n}</span>
                      <h3 className="text-base font-black mb-1.5" style={{ color: "#0a0a0a" }}>{s.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{s.text}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </section>
          </FadeIn>

          {MEMES.map((m) => (
            <FadeIn key={m.id}>
              <section>
                <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: textTone(ACCENT) }}>{m.id} / 04</p>
                <h2 className={`${H2} mb-2`} style={{ color: "#0a0a0a" }}>{m.title}</h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>
                  <span className="font-bold" style={{ color: "#0a0a0a" }}>Best for:</span> {m.bestFor}
                </p>
                <div className="rounded-2xl overflow-hidden border mb-5" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
                  <Image src={m.image} alt={m.alt} width={1080} height={864} className="w-full h-auto" sizes="(min-width: 768px) 768px, 100vw" />
                </div>
                <CopyBlock text={m.prompt} accent={ACCENT} label={`Prompt ${m.id}`} successMessage="Prompt copied to clipboard" />
                <p className="text-sm mt-3" style={{ color: "#52525B" }}>
                  <span className="font-bold" style={{ color: "#0a0a0a" }}>Swap:</span> {m.swap}
                </p>
              </section>
            </FadeIn>
          ))}

          <FadeIn>
            <section className="rounded-2xl border p-8" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.35)" }}>
              <h2 className={`${H2} mb-5`} style={{ color: "#0a0a0a" }}>Before you generate</h2>
              <ul className="space-y-3">
                {TIPS.map((t) => (
                  <li key={t.title} className="text-base leading-relaxed flex gap-3" style={{ color: "#52525B" }}>
                    <span aria-hidden="true" style={{ color: ACCENT }}>&bull;</span>
                    <span><span className="font-bold" style={{ color: "#0a0a0a" }}>{t.title}</span> {t.text}</span>
                  </li>
                ))}
              </ul>
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
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>Want outbound that earns the memes?</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] mt-3 mb-4">Let&apos;s break it down for your business.</h2>
              <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#52525B" }}>
                Follow along for more AI tools and growth systems for B2B teams, or book a free strategy call and we&apos;ll break it down for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/book-a-call" className="btn-dark px-8 py-4 text-sm font-bold">Book a Complimentary Strategy Call</a>
                <a href="https://www.instagram.com/tejas_jhaveri/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-sm font-bold rounded-full border transition-colors hover:bg-[#F8F6F2]" style={{ color: "#0A0A0A", borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>Follow @tejas_jhaveri</a>
              </div>
              <a href="mailto:founder@myntmore.com" className="inline-flex min-h-[44px] items-center mt-6 text-sm font-semibold" style={{ color: "#A14A08" }}>founder@myntmore.com</a>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
              <Image src="/tejas.png" alt="Tejas Jhaveri, Founder of Myntmore" width={96} height={96} className="rounded-2xl object-cover shrink-0" />
              <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>
                <a href="https://www.linkedin.com/in/tejasjhaveri/" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: "#0a0a0a" }}>Tejas Jhaveri</a> is a 4x entrepreneur, TEDx speaker and angel investor. He built the D2C brand Flintstop to 8,000 orders a day before selling it in 2020, and now leads Myntmore, a B2B outbound agency. He has taught B2B growth methodologies at IIT and IIM.
              </p>
            </section>
          </FadeIn>
        </div>
      </article>
    </InnerLayout>
  );
}
