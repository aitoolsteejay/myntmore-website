// One city page: content/city-pages/<slug>.json, edited in the Keystatic admin ("City pages"). Layout and styling are
// fixed in components/city/CityPage.tsx. The segments, healthcare and steps blocks are optional (leave them empty to hide).
export interface CityPageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  breadcrumbLabel: string;
  badge: string;
  h1: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  whyTitle: string;
  why: { title: string; desc: string }[];
  // "Who we generate leads for": cards plus a closing note with [label](/path) links.
  segmentsTitle: string;
  segmentsIntro: string;
  segments: { title: string; desc: string }[];
  segmentsNote: string;
  // Kolkata's "healthcare buyers" block: intro, a list of buyer types, and a closing note.
  healthcareTitle: string;
  healthcareIntro: string;
  healthcareBuyers: string[];
  healthcareNote: string;
  // "How it works" steps plus a closing note.
  stepsTitle: string;
  steps: { when: string; title: string; desc: string }[];
  stepsNote: string;
  servicesTitle: string;
  servicesIntro: string;
  services: { title: string; href: string; desc: string }[];
  diffTitle: string;
  differentiators: string[];
  formTitle: string;
  formSubtitle: string;
  // Library case study slugs shown as proof cards (real results from industries common in the city), and /lp/*
  // slugs shown as industry links. Both also link back to this city page from those pages.
  proofCaseStudies?: string[];
  industryPages?: string[];
}
