import type { Metadata } from "next";
import VisitingCard from "../components/VisitingCard";
import JsonLd from "../components/JsonLd";
import { WhatsAppIcon, LinkedInIcon, EmailIcon, PhoneIcon, NewsletterIcon } from "../components/ContactIcons";
import { SITE_URL } from "@/lib/schema";
import { OG_BASE } from "@/lib/og";

const PHONE = "+918169318951";
const WHATSAPP_URL = "https://wa.me/918169318951";
const LINKEDIN_URL = "https://www.linkedin.com/in/enwill-ferrnandes/";
const EMAIL = "enwil@myntmore.com";
const NEWSLETTER_URL = "/newsletter-subscribe";

export const metadata: Metadata = {
  title: "Enwil Fernandes",
  description: "Enwil Fernandes, Senior Sales Head at Myntmore. Connect on WhatsApp, LinkedIn, call, or email.",
  alternates: { canonical: `${SITE_URL}/enwilfernandes` },
  robots: { index: false, follow: false },
  openGraph: {
    ...OG_BASE,
    title: "Enwil Fernandes | Senior Sales Head, Myntmore",
    description: "Enwil Fernandes, Senior Sales Head at Myntmore. Connect on WhatsApp, LinkedIn, call, or email.",
    url: `${SITE_URL}/enwilfernandes`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
};

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Enwil Fernandes",
  jobTitle: "Senior Sales Head",
  worksFor: { "@type": "Organization", name: "Myntmore", url: SITE_URL, logo: `${SITE_URL}/logo.png` },
  url: `${SITE_URL}/enwilfernandes`,
  email: EMAIL,
  telephone: PHONE,
  sameAs: [LINKEDIN_URL],
};

export default function EnwilFernandesCard() {
  return (
    <>
      <JsonLd data={PERSON_SCHEMA} />
      <VisitingCard
        path="/enwilfernandes"
        name="Enwil Fernandes"
        title="Senior Sales Head, Myntmore"
        photoSrc="/enwil.png"
        photoAlt="Enwil Fernandes, Senior Sales Head at Myntmore"
        vCardHref="/api/vcard/enwil-fernandes"
        contacts={[
          { label: "WhatsApp", cta: "Reach out on WhatsApp", href: WHATSAPP_URL, icon: <WhatsAppIcon />, bg: "#25D366" },
          { label: "LinkedIn", cta: "Connect on LinkedIn", href: LINKEDIN_URL, icon: <LinkedInIcon />, bg: "#0A66C2" },
          { label: "Call", cta: "Call", href: `tel:${PHONE}`, icon: <PhoneIcon />, bg: "#F5B731" },
          { label: "Email", cta: "Email", href: `mailto:${EMAIL}`, icon: <EmailIcon />, bg: "#0A66C2" },
          { label: "Newsletter", cta: "Subscribe to the Myntmore newsletter", href: NEWSLETTER_URL, icon: <NewsletterIcon />, bg: "#D97706" },
        ]}
      />
    </>
  );
}
