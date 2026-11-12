// Structured data (schema.org / JSON-LD) builders.
//
// Domain: myntmore.com (no www) 307-redirects to www.myntmore.com, which is
// where the site actually resolves (confirmed via curl). This schema and
// every canonical/metadataBase/openGraph URL across the site now consistently
// point at the www host to match.
export const SITE_URL = "https://www.myntmore.com";

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  email: string;
  telephone: string;
  founder: { "@type": "Person"; name: string; sameAs: string[] };
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs: string[];
}

export const organizationSchema: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Myntmore",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Myntmore is Mumbai's leading AI-powered B2B outbound agency. We build and run cold email, LinkedIn outreach, and ABM systems that book qualified meetings. 12K+ meetings booked. $120M+ pipeline generated.",
  email: "growth@myntmore.com",
  telephone: "+91-81693-18951",
  founder: {
    "@type": "Person",
    name: "Tejas Jhaveri",
    sameAs: ["https://linkedin.com/in/tejasjhaveri", "https://youtube.com/@TJtheLeadGenExpert"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400051",
    addressCountry: "IN",
  },
  sameAs: [
    "https://linkedin.com/company/myntmore",
    "https://instagram.com/myntmore",
    "https://youtube.com/@TJtheLeadGenExpert",
  ],
};

// ProfessionalService (a LocalBusiness subtype, more specific and accurate
// for an agency than generic LocalBusiness) for local-pack / "near me" and
// city-qualified search relevance. Includes the telephone number shown on
// /contact-us and in the footer, and deliberately omits geo coordinates:
// there's no verified lat/long for the office -- inventing it would be
// structured data that doesn't match a real, checkable fact. openingHours
// reflects the office hours actually stated on the careers pages (10:00-
// 19:00 is the range common to multiple role listings), not a guess.
export function buildLocalBusinessSchema(url: string = SITE_URL) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Myntmore",
    url,
    image: `${SITE_URL}/logo.png`,
    description: organizationSchema.description,
    telephone: organizationSchema.telephone,
    address: organizationSchema.address,
    areaServed: [
      "Mumbai", "Delhi", "Ahmedabad", "Pune", "Chennai", "Bengaluru", "Kolkata", "Hyderabad",
      "India", "United Arab Emirates", "United States", "United Kingdom", "Singapore", "France",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "19:00",
    },
    sameAs: organizationSchema.sameAs,
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function buildFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  serviceType: string;
  url: string;
  areaServed?: string;
}

export function buildServiceSchema({ name, description, serviceType, url, areaServed = "Worldwide" }: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url,
    areaServed,
    provider: {
      "@type": "Organization",
      name: "Myntmore",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
  };
}

// City pages (/b2b-lead-generation-<city>): a Service offered in that city, provided by the one Organization.
// Not a LocalBusiness: the only office is in Mumbai, and a city page is "serving" a city, never an office in it,
// so it must not carry the Mumbai street address, phone or opening hours as if they were local.
export function buildCityServiceSchema({ name, description, url, city }: { name: string; description: string; url: string; city: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: "B2B lead generation",
    url,
    areaServed: { "@type": "City", name: city, containedInPlace: { "@type": "Country", name: "India" } },
    provider: {
      "@type": "Organization",
      name: "Myntmore",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
  };
}

export interface WebApplicationSchemaInput {
  name: string;
  description: string;
  url: string;
}

// For the 9 free /tools/* pages. All are genuinely free (no paywall, no
// account, no trial-then-paywall) and web-based, so `offers.price: "0"` and
// `operatingSystem` are both statements of fact, not marketing claims.
export function buildWebApplicationSchema({ name, description, url }: WebApplicationSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (web-based)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "Myntmore",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
  };
}

export interface DefinedTermInput {
  name: string;
  description: string;
  url: string;
  inDefinedTermSet?: string;
  alternateName?: string[];
}

// For single-definition glossary pages. `inDefinedTermSet` points back at the
// glossary hub that groups these terms, per schema.org convention.
export function buildDefinedTermSchema({ name, description, url, inDefinedTermSet, alternateName }: DefinedTermInput) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name,
    description,
    url,
    ...(inDefinedTermSet ? { inDefinedTermSet } : {}),
    ...(alternateName?.length ? { alternateName } : {}),
  };
}

export interface BreadcrumbEntry {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Single sitewide declaration -- render this on the homepage only, not on
// every page. Deliberately has no SearchAction: the site has no working
// search-results endpoint (only a static /sitemap page), and Google's
// Sitelinks Search Box requires that action to actually be functional --
// declaring one that doesn't work would be worse than omitting it.
export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Myntmore",
    url: SITE_URL,
  };
}

export interface HowToStepInput {
  name: string;
  text: string;
}

export function buildHowToSchema(name: string, steps: HowToStepInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s) => ({
      "@type": "HowToStep",
      name: s.name,
      text: s.text,
    })),
  };
}

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}

// author is deliberately the Organization, not a named Person: none of the
// blog posts display a visible author byline on the page, and structured
// data should reflect what a reader actually sees, not attribute content
// to an individual the page itself doesn't credit.
export function buildArticleSchema({ headline, description, url, datePublished, dateModified, image }: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    datePublished,
    dateModified,
    image: image ?? `${SITE_URL}/logo.png`,
    author: { "@type": "Organization", name: "Myntmore", url: SITE_URL, logo: `${SITE_URL}/logo.png` },
    publisher: {
      "@type": "Organization",
      name: "Myntmore",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "article p:first-of-type", ".speakable-summary"],
    },
  };
}

export interface EventSchemaInput {
  name: string;
  description: string;
  url: string;
  startDate: string; // ISO 8601 date or date-time; date-only until a start time is confirmed
  endDate?: string;
  image?: string;
}

// Models every event as a free, online webinar Myntmore hosts itself
// (eventAttendanceMode/location) -- that's what every event run through this
// page has been so far; revisit if an in-person event is ever added.
export function buildEventSchema({ name, description, url, startDate, endDate, image }: EventSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    url,
    startDate,
    ...(endDate ? { endDate } : {}),
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url,
    },
    image: image ?? `${SITE_URL}/og-image.png`,
    organizer: {
      "@type": "Organization",
      name: "Myntmore",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
  };
}

export type JobEmploymentType = "FULL_TIME" | "PART_TIME" | "INTERN" | "CONTRACTOR" | "TEMPORARY";

export interface JobPostingInput {
  title: string;
  description: string;
  url: string;
  datePosted: string;
  validThrough: string;
  // A list for roles that are two things at once: a full-time internship is
  // ["FULL_TIME", "INTERN"], which Google for Jobs accepts as an array.
  employmentType: JobEmploymentType | JobEmploymentType[];
  baseSalary?: { minValue: number; maxValue: number; unitText: "YEAR" | "MONTH"; currency?: string };
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
}

// jobLocationType/applicantLocationRequirements aren't set here: every open
// role's own page lists a physical BKC, Mumbai location (not fully
// remote), so this models an on-site/hybrid posting rather than claiming a
// remote arrangement the page doesn't actually describe.
export function buildJobPostingSchema({
  title,
  description,
  url,
  datePosted,
  validThrough,
  employmentType,
  baseSalary,
  streetAddress = "WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East",
  addressLocality = "Mumbai",
  addressRegion = "Maharashtra",
  postalCode = "400051",
}: JobPostingInput) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    url,
    datePosted,
    validThrough,
    employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: "Myntmore",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress,
        addressLocality,
        addressRegion,
        postalCode,
        addressCountry: "IN",
      },
    },
    ...(baseSalary
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: baseSalary.currency ?? "INR",
            value: {
              "@type": "QuantitativeValue",
              minValue: baseSalary.minValue,
              maxValue: baseSalary.maxValue,
              unitText: baseSalary.unitText,
            },
          },
        }
      : {}),
  };
}

export interface CollectionPageInput {
  name: string;
  description: string;
  url: string;
  itemList?: { name: string; url: string; description?: string }[];
}

export function buildCollectionPageSchema({ name, description, url, itemList }: CollectionPageInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    ...(itemList && itemList.length > 0
      ? {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: itemList.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              url: item.url,
              ...(item.description ? { description: item.description } : {}),
            })),
          },
        }
      : {}),
  };
}

export interface WebPageSchemaInput {
  name: string;
  description: string;
  url: string;
  breadcrumb?: BreadcrumbEntry[];
  speakable?: string[];
}

export function buildWebPageSchema({ name, description, url, breadcrumb, speakable }: WebPageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    publisher: {
      "@type": "Organization",
      name: "Myntmore",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    ...(breadcrumb && breadcrumb.length > 0 ? { breadcrumb: buildBreadcrumbSchema(breadcrumb) } : {}),
    ...(speakable && speakable.length > 0
      ? {
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: speakable,
          },
        }
      : {}),
  };
}

