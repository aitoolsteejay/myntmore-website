// One industry + city page: content/industry-city-pages/<slug>.json, edited in Keystatic ("Industry x City pages").
// Layout and styling are fixed in components/industry-city/IndustryCityPage.tsx.
export interface IndustryCityPageData {
  slug: string;
  citySlug: string;
  cityName: string;
  industrySlug: string;
  industryName: string;
  industryLpHref?: string;
  industryLpLabel?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  badge: string;
  emoji: string;
  floatingIcons: string[];
  hubs: string[];
  h1: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  whyTitle: string;
  why: { icon: string; title: string; desc: string }[];
  buyersTitle: string;
  buyersIntro: string;
  buyers: { role: string; signal: string }[];
  segmentsTitle: string;
  segmentsIntro: string;
  segments: { icon: string; title: string; desc: string }[];
  segmentsNote: string;
  proofTitle: string;
  proofIntro: string;
  proof: { label: string; href: string; result: string }[];
  proofNote: string;
  stepsTitle: string;
  steps: { when: string; title: string; desc: string }[];
  stepsNote: string;
  servicesTitle: string;
  servicesIntro: string;
  services: { title: string; href: string; desc: string }[];
  diffTitle: string;
  differentiators: string[];
  faqs: { q: string; a: string }[];
  formTitle: string;
  formSubtitle: string;
}

export interface IndustryCityIndexEntry {
  slug: string;
  href: string;
  citySlug: string;
  cityName: string;
  industrySlug: string;
  industryName: string;
  badge: string;
  emoji: string;
  h1: string;
  metaDescription: string;
}
