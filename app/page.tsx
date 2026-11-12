import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import EventPopup from "./components/EventPopup";
import { OG_BASE } from "@/lib/og";

export const metadata: Metadata = withPageSeo("/", {
  // Names Mumbai because GSC shows this page ranking top-3 for ~15
  // "lead generation / b2b marketing agency in mumbai" queries with
  // near-zero clicks under the previous location-less title.
  title: { absolute: "Myntmore | AI-Powered B2B Lead Generation Agency, Mumbai" },
  description:
    "AI-powered B2B outbound agency in Mumbai. Cold email, LinkedIn & ABM that books meetings. 12K+ booked, $120M+ pipeline. Book a free audit.",
  alternates: { canonical: "https://www.myntmore.com" },
  keywords: [
    "b2b lead generation",
    "b2b lead generation agency india",
    "cold email agency",
    "cold email infrastructure",
    "linkedin outreach and automation",
    "icp mapping and sales intelligence",
    "ai lead generation agency",
    "account-based marketing agency",
    "b2b appointment setting",
    "outbound sales agency",
    "b2b pipeline generation",
    "personal branding for founders",
    "linkedin ghostwriting",
    "tejas jhaveri",
    "myntmore",
  ],
  openGraph: {
    ...OG_BASE,
    title: "Myntmore | AI-Powered B2B Lead Generation Agency, Mumbai",
    description:
      "We build and run your outbound engine using AI agents and human intelligence. Cold email, LinkedIn outreach, and ABM that books qualified meetings at scale.",
    url: "https://www.myntmore.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
  verification: {
    other: {
      "msvalidate.01": "8CD18A1DDCF953EACEF706A12D7B62F4",
    },
  },
});
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import WhoWeHelp from "./components/WhoWeHelp";
import Industries from "./components/Industries";
import Services from "./components/Services";
import SystemFlow from "./components/SystemFlow";
import BenefitsMarquee from "./components/BenefitsMarquee";
import Testimonials from "./components/Testimonials";
import Promise from "./components/Promise";
import FAQ from "./components/FAQ";
import AskYourAI from "./components/AskYourAI";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import { buildFaqSchema, buildWebsiteSchema, buildLocalBusinessSchema } from "@/lib/schema";
import { FAQ_ITEMS } from "@/lib/faq-data";
import { withPageSeo } from "@/lib/page-seo";

const HOME_AI_RESOURCES = [
  "https://www.myntmore.com",
  "https://www.myntmore.com/case-studies",
  "https://www.myntmore.com/about-us",
  "https://www.myntmore.com/resources",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <JsonLd data={buildFaqSchema(FAQ_ITEMS)} />
      <JsonLd data={buildWebsiteSchema()} />
      <JsonLd data={buildLocalBusinessSchema()} />
      <Navbar />
      <EventPopup />
      {/* Header and footer sit outside <main> (as in InnerLayout) so the
          skip link lands past the navigation. */}
      <main id="main-content">
        <Hero />
        <LogoStrip />
        <WhoWeHelp />
        <Industries />
        <Services />
        <SystemFlow />
        <BenefitsMarquee />
        <Testimonials />
        <Promise />
        <FAQ />
        <section className="py-16 px-4" style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto">
            <AskYourAI resources={HOME_AI_RESOURCES} />
          </div>
        </section>
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
