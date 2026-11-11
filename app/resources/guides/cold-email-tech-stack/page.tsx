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
import { OG_BASE } from "@/lib/og";

const URL = "https://www.myntmore.com/resources/guides/cold-email-tech-stack";
const ACCENT = "#EA580C";
const TITLE = "Cold Email Tech Stack & Sequence Behind $7K";
const DESCRIPTION = "The exact cold email tech stack (Clay, Smartlead, BounceBan) and 3-email sequence that got Myntmore an extra $7,000 in revenue. Copy the templates free.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "cold email tech stack",
    "cold email tool stack",
    "cold email sequence examples",
    "smartlead clay cold email setup",
    "cold email lead scraping tools",
    "email verification for cold email",
    "cold email copy examples",
    "ai avatar linkedin content outreach",
  ],
  alternates: { canonical: URL },
  openGraph: {
    ...OG_BASE,
    title: `${TITLE} | Myntmore`,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
};

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: "Cold email sequence & tech stack that got us an additional $7,000 in revenue",
  description: DESCRIPTION,
  url: URL,
  datePublished: "2026-10-01T00:00:00+05:30",
  dateModified: "2026-10-01T00:00:00+05:30",
});

// `sponsored` marks the referral (?via=) links, per Google's link-attribute
// guidance for affiliate links.
const STACK: { step: string; job: string; tools: { name: string; href?: string; sponsored?: boolean }[] }[] = [
  { step: "1", job: "Lead scraping", tools: [{ name: "Apify" }, { name: "IGleads.io", href: "https://igleads.io" }, { name: "Listkit" }] },
  { step: "2", job: "Data enrichment", tools: [{ name: "Clay", href: "https://clay.com?via=23e526", sponsored: true }] },
  { step: "3", job: "Verifying emails", tools: [{ name: "BounceBan", href: "https://bounceban.com/?via=tejas", sponsored: true }] },
  { step: "4", job: "Inboxes", tools: [{ name: "Google" }] },
  { step: "5", job: "Domain names", tools: [{ name: "Spaceship" }] },
  { step: "6", job: "Automated email sending", tools: [{ name: "Smartlead", href: "https://smartlead.ai/?via=tejas-jhaveri", sponsored: true }] },
  { step: "7", job: "CRM for lead tracking & management", tools: [{ name: "Trello" }] },
];

const SEQUENCE: { email: string; title: string; intro: string; variants: { id: string; body: string }[] }[] = [
  {
    email: "Email 1",
    title: "The opener",
    intro: "Four variants of the first touch, each opening on a creator the prospect already follows.",
    variants: [
      {
        id: "1A",
        body: `Hi {{first_name}}

I came across your LinkedIn profile & saw you were following [Creator Name]. I assumed you might be interested in growing your LinkedIn audience without ever recording a single video.

In the last 30 days, I published content daily, tripled my audience, booked 15+ inbound calls, and saved over 30 hours by automating everything.

Interested in discussing some LinkedIn growth strategies?`,
      },
      {
        id: "1B",
        body: `Hi {{first_name}}

I came across your LinkedIn profile & saw you were following [Creator Name].

What if you could produce content of yourself similar to [Creator Name] without ever recording videos & go viral on LinkedIn?

I recorded a quick video going over the same, mind if I share it here?`,
      },
      {
        id: "1C",
        body: `Hi {{first_name}},

I came across your LinkedIn profile & saw you were following [Creator Name].

We can bring massive visibility for {{first_name}}'s account on LinkedIn - without you ever having to record videos.

I recorded a quick video going over the same, mind if I share it here?`,
      },
      {
        id: "1D",
        body: `Hi {{first_name}},

I came across your LinkedIn profile & saw you were following [Creator Name].

What if I told you AI could create content that looks & sounds exactly like you, without you recording a thing?

Mind if I send over a few AI-generated videos? Let's see if you can tell the difference.`,
      },
    ],
  },
  {
    email: "Email 2",
    title: "The follow-up",
    intro: "Two variants: one restates the result, one explains the system behind it.",
    variants: [
      {
        id: "2A",
        body: `Hi {{first_name}},

Did I mention that in the last 30 days, I published content daily without ever recording a single video, tripled my audience, booked 15+ inbound calls, and saved over 30 hours by automating everything.

Can help you do the same. Interested in discussing some LinkedIn growth strategies?`,
      },
      {
        id: "2B",
        body: `Hi {{first_name}},

I've built an AI-powered content system that replicates your unique look, style, and voice, so you can create endless videos without filming.

Want me to send over a quick video explaining how it works?`,
      },
    ],
  },
  {
    email: "Email 3",
    title: "The value close",
    intro: "Two variants: lead with ready-made scripts, or with the time and calls saved.",
    variants: [
      {
        id: "3A",
        body: `Hi {{first_name}},

I wrote a couple of video scripts for you & you won't even have to record these videos yourself.

We recently produced 30 videos in just 3 hours using a hyper-realistic AI avatar and booked 15 sales calls through [Client]'s account on Instagram.

Mind if I share the scripts here?`,
      },
      {
        id: "3B",
        body: `Hi {{first_name}},

I can help you create content of yourself, without ever recording any videos and book 10+ inbound sales calls, + free up over 30 hours every month.

Would you be interested in discussing some LinkedIn growth strategies?`,
      },
    ],
  },
];

const RELATED = [
  { label: "Cold email deliverability guide", href: "/resources/blogs/cold-email-deliverability-guide", note: "Why emails land in spam, and how to fix it before you scale." },
  { label: "Cold email sequence templates", href: "/resources/blogs/cold-email-sequence-templates", note: "A full 5-email sequence, from first touch to breakup email." },
  { label: "Domain warm-up", href: "/resources/glossary/domain-warmup", note: "Ramping new sending domains so inbox providers trust them." },
  { label: "SPF, DKIM & DMARC", href: "/resources/glossary/spf-dkim-dmarc", note: "The DNS records that decide inbox vs. spam." },
];

export default function ColdEmailTechStack() {
  return (
    <InnerLayout>
      <JsonLd data={ARTICLE_SCHEMA} />
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle,rgba(234,88,12,0.18),rgba(234,88,12,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-180px", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,183,49,0.19),rgba(245,183,49,0.06) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Guides", href: "/resources/guides" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(234,88,12,0.3)", backgroundColor: "rgba(234,88,12,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: textTone(ACCENT) }}>Cold Email · Stack & Sequence</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            The cold email stack that got us an extra{" "}
            <span className="relative inline-block">$7,000 in revenue<Underline color="#F5B731" /></span>
          </h1>
          <ArticleMeta schema={ARTICLE_SCHEMA} />
          <p className="text-lg sm:text-xl max-w-2xl leading-relaxed hero-fade-d2" style={{ color: "#52525B" }}>
            Not fancy hacks or creative copywriting. The backend: the exact tools and email sequence we use at Myntmore to scale cold outreach, from scraping leads to booking qualified calls.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 border-y" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <Image src="/tejas.png" alt="Tejas Jhaveri, Founder of Myntmore" width={112} height={112} className="rounded-2xl object-cover shrink-0" />
          <div>
            <h2 className="text-xl font-black mb-2" style={{ color: "#0a0a0a" }}>From one growth team to another</h2>
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
                Your tools don&apos;t just send emails. They decide whether your emails get seen, replied to, or land in spam. Everything below is battle-tested: use it, adapt it, or steal it entirely.
              </p>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: textTone(ACCENT) }}>Part 01</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-6" style={{ color: "#0a0a0a" }}>The tech stack</h2>
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#E8E2D9" }}>
                {STACK.map((row, i) => (
                  <div key={row.step} className="flex items-center gap-4 px-5 py-4" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#FCFBF8", borderBottom: i < STACK.length - 1 ? "1px solid #E8E2D9" : "none" }}>
                    <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black" style={{ backgroundColor: "rgba(234,88,12,0.1)", color: textTone(ACCENT), border: "1px solid rgba(234,88,12,0.25)" }}>{row.step}</span>
                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <span className="text-sm font-semibold" style={{ color: "#52525B" }}>{row.job}</span>
                      <span className="text-sm font-black" style={{ color: "#0a0a0a" }}>
                        {row.tools.map((t, ti) => (
                          <span key={t.name}>
                            {ti > 0 && <span style={{ color: "#71675E" }}>, </span>}
                            {t.href ? (
                              <a href={t.href} target="_blank" rel={t.sponsored ? "sponsored noopener noreferrer" : "noopener noreferrer"} className="underline decoration-[#E8E2D9] underline-offset-4 hover:decoration-current" style={{ color: "#0a0a0a" }}>{t.name}</a>
                            ) : (
                              t.name
                            )}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: textTone(ACCENT) }}>Part 02</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-2" style={{ color: "#0a0a0a" }}>The email sequence</h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#52525B" }}>
                Three emails, each with variants to test against each other. Replace the bracketed placeholders before sending.
              </p>
              <div className="space-y-12">
                {SEQUENCE.map((s) => (
                  <div key={s.email}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <h3 className="text-xl font-black" style={{ color: "#0a0a0a" }}>{s.email}</h3>
                      <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: "#ffffff", color: "#3D3D3D", border: "1px solid #E8E2D9" }}>{s.title}</span>
                    </div>
                    <p className="text-sm mb-4" style={{ color: "#71675E" }}>{s.intro}</p>
                    <div className="space-y-4">
                      {s.variants.map((v) => (
                        <CopyBlock key={v.id} text={v.body} accent={ACCENT} label={`Email ${v.id}`} successMessage="Email copied to clipboard" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className="text-2xl font-black mb-5" style={{ color: "#0a0a0a" }}>Before you send at volume</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RELATED.map((r) => (
                  <Link key={r.href} href={r.href} className="group block rounded-xl border p-4 transition-colors duration-150 hover:border-[#EA580C]" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                    <p className="text-sm font-black mb-1" style={{ color: "#0a0a0a" }}>{r.label} <span aria-hidden="true" style={{ color: ACCENT }}>&rarr;</span></p>
                    <p className="text-xs leading-relaxed" style={{ color: "#52525B" }}>{r.note}</p>
                  </Link>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl p-8 sm:p-10 text-center border" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>What&apos;s next?</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] mt-3 mb-4">Want a scalable outreach machine, without the guesswork?</h2>
              <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#52525B" }}>
                We&apos;ve tested, failed, and optimized cold emails over 100,000+ times, and now use that playbook to help founders like you consistently drive meetings at scale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services/cold-email" className="btn-dark px-8 py-4 text-sm font-bold">Explore Our Cold Email Services</Link>
                <a href="/book-a-call" className="px-8 py-4 text-sm font-bold rounded-full border transition-colors hover:bg-[#F8F6F2]" style={{ color: "#0A0A0A", borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>Book a Free Strategy Call</a>
              </div>
              <a href="mailto:founder@myntmore.com" className="inline-flex min-h-[44px] items-center mt-6 text-sm font-semibold" style={{ color: "#A14A08" }}>founder@myntmore.com</a>
            </section>
          </FadeIn>
        </div>
      </article>
    </InnerLayout>
  );
}
