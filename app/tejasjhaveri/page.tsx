import type { Metadata } from "next";
import VisitingCard from "../components/VisitingCard";
import JsonLd from "../components/JsonLd";
import { WhatsAppIcon, LinkedInIcon, InstagramIcon, NewsletterIcon } from "../components/ContactIcons";
import { SITE_URL } from "@/lib/schema";
import { OG_BASE } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const WHATSAPP_URL = "https://wa.me/919867180379";
const LINKEDIN_URL = "https://www.linkedin.com/in/tejasjhaveri/";
const INSTAGRAM_URL = "https://www.instagram.com/tejas_jhaveri?stkn=MTZjOGlndmw2dzIxeA==";
const NEWSLETTER_URL = "/newsletter-subscribe";

export const metadata: Metadata = withPageSeo("/tejasjhaveri", {
  title: "Tejas Jhaveri",
  description: "Tejas Jhaveri, Founder of Myntmore. Connect on WhatsApp, LinkedIn, or Instagram.",
  alternates: { canonical: `${SITE_URL}/tejasjhaveri` },
  robots: { index: false, follow: false },
  openGraph: {
    ...OG_BASE,
    title: "Tejas Jhaveri | Founder, Myntmore",
    description: "Tejas Jhaveri, Founder of Myntmore. Connect on WhatsApp, LinkedIn, or Instagram.",
    url: `${SITE_URL}/tejasjhaveri`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
});

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tejas Jhaveri",
  jobTitle: "Founder",
  worksFor: { "@type": "Organization", name: "Myntmore", url: SITE_URL, logo: `${SITE_URL}/logo.png` },
  url: `${SITE_URL}/tejasjhaveri`,
  sameAs: [LINKEDIN_URL, INSTAGRAM_URL],
};

export default function TejasJhaveriCard() {
  return (
    <>
      <JsonLd data={PERSON_SCHEMA} />
      <VisitingCard
        path="/tejasjhaveri"
        name="Tejas Jhaveri"
        title="Founder, Myntmore · TEDx Speaker · Angel Investor"
        photoSrc="/tejas-2.png"
        photoAlt="Tejas Jhaveri, Founder of Myntmore"
        vCardHref="/api/vcard/tejas-jhaveri"
        contacts={[
          { label: "WhatsApp", cta: "Reach out on WhatsApp", href: WHATSAPP_URL, icon: <WhatsAppIcon />, bg: "#25D366" },
          { label: "LinkedIn", cta: "Connect on LinkedIn", href: LINKEDIN_URL, icon: <LinkedInIcon />, bg: "#0A66C2" },
          { label: "Instagram", cta: "Follow on Instagram", href: INSTAGRAM_URL, icon: <InstagramIcon />, bg: "#C13584" },
          { label: "Newsletter", cta: "Subscribe to my newsletter", href: NEWSLETTER_URL, icon: <NewsletterIcon />, bg: "#D97706" },
        ]}
      />
    </>
  );
}
