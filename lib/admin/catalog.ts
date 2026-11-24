// Plain-language names, descriptions and live addresses for the admin's content types, so editors can
// find a page by what they see on the site rather than by how the files are organised.
import pageCopyRegistry from "@/content/page-copy/registry.json";

const guideRoutes = new Map(pageCopyRegistry.map((r: { key: string; route: string }) => [r.key, r.route]));

export interface CatalogEntry {
  /** Short name on the admin home and in lists. */
  title: string;
  /** One line on what this is and where it shows. */
  description: string;
  group: "main" | "blog" | "pages" | "caseStudies" | "services" | "faqs";
  /** The live page for an entry, if it has one. */
  url?: (slug: string, title: string) => string | null;
}

const fromTitle = (title: string) => /\((\/[^)\s]*)\)\s*$/.exec(title)?.[1] ?? null;

export const CATALOG: Record<string, CatalogEntry> = {
  siteHome: { title: "Homepage", description: "myntmore.com: every section from the top of the page to the closing call to action", group: "main", url: () => "/" },
  siteAbout: { title: "About page", description: "myntmore.com/about-us", group: "main", url: () => "/about-us" },
  siteServices: { title: "Services overview page", description: "myntmore.com/services: the seven service cards and city links", group: "main", url: () => "/services" },
  siteBookACall: { title: "Book a call page", description: "myntmore.com/book-a-call: hosts, agenda, figures and questions around the calendar", group: "main", url: () => "/book-a-call" },
  siteContact: { title: "Contact page", description: "myntmore.com/contact-us: contact cards, form wording, office address", group: "main", url: () => "/contact-us" },
  posts: { title: "Blog posts", description: "Articles at myntmore.com/resources/blogs. New posts start as drafts.", group: "blog", url: (s) => `/resources/blogs/${s}` },
  landingPages: { title: "Industry pages", description: "One page per industry we serve, e.g. Pharma, SaaS, Insurance (myntmore.com/lp/…)", group: "pages", url: (s) => `/lp/${s}` },
  servicePages: { title: "Service pages", description: "ABM, AI lead generation, GTM strategy, personal branding, sales intelligence (myntmore.com/services/…)", group: "services", url: (s) => `/services/${s}` },
  serviceCopyColdEmail: { title: "Cold email service page", description: "myntmore.com/services/cold-email", group: "services", url: () => "/services/cold-email" },
  serviceCopyLinkedinOutreach: { title: "LinkedIn outreach service page", description: "myntmore.com/services/linkedin-outreach", group: "services", url: () => "/services/linkedin-outreach" },
  serviceCopyDoItYourself: { title: "Do-it-yourself service page", description: "myntmore.com/services/do-it-yourself", group: "services", url: () => "/services/do-it-yourself" },
  cityPages: { title: "City pages", description: "Lead generation in a city, e.g. Mumbai, Dubai (myntmore.com/b2b-lead-generation-mumbai)", group: "pages", url: (s) => `/b2b-lead-generation-${s}` },
  industryCityPages: { title: "Industry + city pages", description: "An industry in a city, e.g. BFSI in Gurugram (myntmore.com/b2b-lead-generation-bfsi-gurugram)", group: "pages", url: (s) => `/b2b-lead-generation-${s}` },
  marketPages: { title: "Country pages", description: "Case studies by country: UAE, US, UK, Singapore, France, India", group: "pages", url: (s) => `/case-studies/markets/${s}` },
  events: { title: "Events", description: "Webinars and events, with the pop-up on the site (myntmore.com/events/…)", group: "pages", url: (s) => `/events/${s}` },
  resourceGuides: { title: "New guides", description: "Guides you write here, in one standard layout (myntmore.com/resources/guides/…). The older guides are edited under Guides below.", group: "pages", url: (s) => `/resources/guides/${s}` },
  careers: { title: "Job openings", description: "Roles on the careers page (myntmore.com/careers/…)", group: "pages", url: (s) => `/careers/${s}` },
  glossaryTerms: { title: "Glossary", description: "Sales and marketing terms explained (myntmore.com/resources/glossary/…)", group: "pages", url: (s) => `/resources/glossary/${s}` },
  caseStudyPages: { title: "Case studies (full pages)", description: "Detailed case study pages with challenge, approach and results", group: "caseStudies", url: (s) => `/case-studies/${s}` },
  caseStudies: { title: "Case studies (short)", description: "The case study library cards and their short pages", group: "caseStudies", url: (s) => `/case-studies/${s}` },
  pageFaqs: { title: "FAQs on pages", description: "The questions and answers at the bottom of each page", group: "faqs", url: (_s, t) => fromTitle(t) },
  homepageFaqs: { title: "Homepage FAQs", description: "The questions and answers on the homepage", group: "faqs", url: () => "/" },
  pageSeo: { title: "Google titles and descriptions", description: "How other pages appear in Google search results", group: "faqs", url: (_s, t) => (t.startsWith("/") ? t : null) },
  calendarPages: {
    title: "Calendar booking pages",
    description: "1-on-1 booking pages for Tejas and Enwil (Calendly and Zoho)",
    group: "pages",
    url: (slug) => `/calendar/${slug}`,
  },
  teamCards: {
    title: "Team visiting cards",
    description: "Digital visiting cards for founders and team (vCard, links, socials)",
    group: "main",
    url: (slug) => `/${slug}`,
  },
  siteSettings: {
    title: "Global site settings & navbar",
    description: "Navbar CTA button, announcement banner, contact info, and footer address",
    group: "main",
    url: () => "/",
  },
};

/** Long-form case studies (one file each) share an entry: "caseLong…" keys. */
export function catalogEntry(key: string, label: string): CatalogEntry {
  if (CATALOG[key]) return CATALOG[key];
  if (key.startsWith("caseLong")) {
    return { title: label.replace(/^Long-form case study:\s*/i, ""), description: "Long-form case study", group: "caseStudies" };
  }
  if (key.startsWith("guide")) {
    const route = guideRoutes.get(key);
    return {
      title: label.replace(/^Guide:\s*/i, ""),
      description: "Resource guide",
      group: "pages",
      url: route ? () => route : undefined,
    };
  }
  if (key.startsWith("tool")) {
    const route = guideRoutes.get(key);
    return {
      title: label.replace(/^Tool:\s*/i, ""),
      description: "Interactive tool",
      group: "pages",
      url: route ? () => route : undefined,
    };
  }
  const regEntry = (pageCopyRegistry as { key: string; title: string; group?: string; route?: string }[]).find((r) => r.key === key);
  if (regEntry) {
    const route = regEntry.route;
    return {
      title: regEntry.title,
      description: label,
      group: (regEntry.group as CatalogEntry["group"]) || "pages",
      url: route ? () => route : undefined,
    };
  }
  return { title: label, description: "", group: "pages" };
}

export const GROUPS: { key: CatalogEntry["group"]; title: string; description: string }[] = [
  { key: "main", title: "Main pages", description: "The homepage and the site's main pages" },
  { key: "blog", title: "Blog", description: "Write and edit articles" },
  { key: "pages", title: "Website pages", description: "Industry, city, country, event, job, guide and glossary pages" },
  { key: "services", title: "Service pages", description: "Every page under myntmore.com/services" },
  { key: "caseStudies", title: "Case studies", description: "Client stories, short and long" },
  { key: "faqs", title: "FAQs and Google settings", description: "Questions and answers, and how pages look in Google" },
];

/** Live page for a long-form case study singleton, from its file name. */
export const longCaseUrl = (file: string) => `/case-studies/${file}`;
