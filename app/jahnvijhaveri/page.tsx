import type { Metadata } from "next";
import VisitingCard from "../components/VisitingCard";
import JsonLd from "../components/JsonLd";
import { WhatsAppIcon, LinkedInIcon, EmailIcon, PhoneIcon, NewsletterIcon } from "../components/ContactIcons";
import { SITE_URL } from "@/lib/schema";
import { OG_BASE } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

const PHONE = "+919821008589";
const WHATSAPP_URL = "https://wa.me/919821008589";
const LINKEDIN_URL = "https://www.linkedin.com/in/jahnvi-jhaveri-profile/";
const EMAIL = "growth@myntmore.com";
const NEWSLETTER_URL = "/newsletter-subscribe";

export const metadata: Metadata = withPageSeo("/jahnvijhaveri", {
  title: "Jahnvi Jhaveri",
  description: "Jahnvi Jhaveri, Co-Founder of Myntmore. Connect on WhatsApp, LinkedIn, call, or email.",
  alternates: { canonical: `${SITE_URL}/jahnvijhaveri` },
  robots: { index: false, follow: false },
  openGraph: {
    ...OG_BASE,
    title: "Jahnvi Jhaveri | Co-Founder, Myntmore",
    description: "Jahnvi Jhaveri, Co-Founder of Myntmore. Connect on WhatsApp, LinkedIn, call, or email.",
    url: `${SITE_URL}/jahnvijhaveri`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
});

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jahnvi Jhaveri",
  jobTitle: "Co-Founder",
  worksFor: { "@type": "Organization", name: "Myntmore", url: SITE_URL, logo: `${SITE_URL}/logo.png` },
  url: `${SITE_URL}/jahnvijhaveri`,
  email: EMAIL,
  telephone: PHONE,
  sameAs: [LINKEDIN_URL],
};

export default function JahnviJhaveriCard() {
  return (
    <>
      <JsonLd data={PERSON_SCHEMA} />
      <VisitingCard
        path="/jahnvijhaveri"
        name="Jahnvi Jhaveri"
        title="Co-Founder, Myntmore"
        photoSrc="/jahnvi.png"
        photoAlt="Jahnvi Jhaveri, Co-Founder of Myntmore"
        vCardHref="/api/vcard/jahnvi-jhaveri"
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
