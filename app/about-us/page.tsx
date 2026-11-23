import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import InnerLayout from "../components/InnerLayout";
import FadeIn from "../components/FadeIn";
import StatTicker from "../components/StatTicker";
import LeadCaptureForm from "../components/LeadCaptureForm";
import JsonLd from "../components/JsonLd";
import Breadcrumbs from "../components/Breadcrumbs";
import { SITE_URL, buildLocalBusinessSchema } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import { OG_BASE, ogImages } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";
import about from "@/content/site-copy/about.json";
import RichText from "@/components/RichText";

export const metadata: Metadata = withPageSeo("/about-us", {
  title: { absolute: "About Myntmore | Founded by Tejas Jhaveri, Mumbai" },
  description: "Myntmore is a Mumbai B2B outbound agency founded in 2019 by TEDx speaker Tejas Jhaveri: 12K+ meetings booked and $120M+ pipeline for 130+ B2B companies.",
  alternates: { canonical: "https://www.myntmore.com/about-us" },
  keywords: [
    "tejas jhaveri",
    "tejas jhaveri myntmore",
    "b2b growth expert",
    "founder of myntmore",
    "tedx speaker mumbai",
    "b2b lead generation expert",
    "angel investor mumbai",
    "b2b outbound agency founder",
    "myntmore about us",
    "myntmore company",
    "b2b growth strategist",
    "outbound marketing expert india",
    "linkedin growth expert",
    "b2b sales pipeline expert",
    "growth educator iit iim",
    "mumbai b2b agency founder",
  ],
  openGraph: {
    ...OG_BASE,
    title: "About Myntmore | Founded by Tejas Jhaveri, Mumbai",
    description: "Myntmore is a Mumbai B2B outbound agency founded in 2019 by Tejas Jhaveri, TEDx speaker and growth educator at IIT and IIM. 12K+ meetings booked, $120M+ pipeline.",
    url: "https://www.myntmore.com/about-us",
    images: ogImages("/about-us"),
  },
});

// Same Person the Organization schema (lib/schema.ts) references as
// founder, fleshed out here with the fields that belong on a bio page.
const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tejas Jhaveri",
  jobTitle: "Founder",
  worksFor: {
    "@type": "Organization",
    name: "Myntmore",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  },
  description: "Tejas Jhaveri is a TEDx speaker, angel investor, and B2B growth expert based in Mumbai, with over 10 years of B2B lead generation experience. He founded Myntmore in 2019 and has taught B2B growth methodologies at IIT and IIM.",
  sameAs: ["https://linkedin.com/in/tejasjhaveri", "https://youtube.com/@TJtheLeadGenExpert"],
};

const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Myntmore",
  description: "Myntmore is a Mumbai B2B outbound agency founded in 2019 by TEDx speaker Tejas Jhaveri: 12K+ meetings booked and $120M+ pipeline for 130+ B2B companies.",
  url: `${SITE_URL}/about-us`,
  mainEntity: PERSON_SCHEMA,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".speakable-lead"],
  },
};

// The page's words are edited in the admin (About page) and live in content/site-copy/about.json; the
// colour of each credential stays here, in order.
const copy = about;
const ACCENTS = ["#F5B731", "#3b82f6", "#10b981", "#a855f7"];
const CREDENTIALS = copy.credentials.map((c, i) => ({ ...c, accent: ACCENTS[i % ACCENTS.length] }));
const EXPERTISE = copy.expertise;

export default function AboutUs() {
  return (
    <InnerLayout>
      <JsonLd data={ABOUT_SCHEMA} />
      <JsonLd data={PERSON_SCHEMA} />
      <JsonLd data={buildLocalBusinessSchema("https://www.myntmore.com/about-us")} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "About", href: "/about-us" }]} />
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
              {copy.badge}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            {copy.heading}
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed max-w-2xl hero-fade-d2 speakable-lead" style={{ color: "#52525B" }}>
            {copy.lead}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 border-y" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <FadeIn><div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {CREDENTIALS.map((c) => (
            <div key={c.stat} className="text-center">
              <div className="text-3xl sm:text-4xl font-black mb-1" style={{ color: textTone(c.accent) }}><StatTicker value={c.stat} /></div>
              <div className="text-xs" style={{ color: "#71675E" }}>{c.label}</div>
            </div>
          ))}
        </div></FadeIn>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Photo + name card */}
          <div className="flex flex-col items-center lg:items-start gap-6">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border" style={{ backgroundColor: "#EDE9E4", borderColor: "#E8E2D9" }}>
              <Image
                src="/tejas.png"
                alt={copy.photoAlt}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            <div>
              <h2 className="text-2xl font-black mb-1" style={{ color: "#0a0a0a" }}>{copy.name}</h2>
              <p className="text-sm mb-4" style={{ color: "#71675E" }}>{copy.nameLine}</p>
              <a href={copy.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn-dark px-6 py-3 text-sm font-bold inline-flex items-center gap-2">
                {copy.linkedinButton}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>

          {/* Bio + philosophy */}
          <div className="space-y-6">
            <div>
              {copy.bio.map((paragraph, i) => (
                <p key={i} className={`text-base leading-relaxed${i < copy.bio.length - 1 ? " mb-4" : ""}`} style={{ color: "#52525B" }}>
                  <RichText text={paragraph} linkClassName="underline font-semibold hover:text-[#A14A08]" />
                </p>
              ))}
            </div>
            <div className="rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#A14A08" }}>{copy.philosophyHeading}</h3>
              <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>
                {copy.philosophy}
              </p>
            </div>
            <div className="rounded-2xl p-6" style={{ backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.3)" }}>
              <blockquote className="text-lg font-black leading-snug mb-3" style={{ color: "#0a0a0a" }}>
                {copy.quote}
              </blockquote>
              <cite className="text-sm not-italic" style={{ color: "#71675E" }}>{copy.quoteBy}</cite>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black mb-8" style={{ color: "#0a0a0a" }}>{copy.expertiseHeading}</h2>
          <FadeIn delay={80}><div className="flex flex-wrap gap-3">
            {EXPERTISE.map((e) => (
              <Link key={e.href} href={e.href} className="chip-hover inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold border" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#3D3D3D" }}>
                {e.label}
              </Link>
            ))}
          </div></FadeIn>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4" style={{ color: "#0a0a0a" }}>{copy.ctaHeading}</h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#52525B" }}>
            {copy.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/book-a-call" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
              {copy.ctaButton}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a href="mailto:growth@myntmore.com" className="btn-ghost px-8 py-4 text-base font-bold">
              {copy.ctaEmailButton}
            </a>
          </div>
          <p className="mt-4 text-xs" style={{ color: "#71675E" }}>{copy.ctaNote}</p>
        </div>
      </section>

      <LeadCaptureForm />
    </InnerLayout>
  );
}
