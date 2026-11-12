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
  // "Proof": real case studies from the industries that cluster in this city. Clients are anonymised and are not
  // presented as local, so the note says so. Leave the list empty to hide the block.
  proofTitle: string;
  proofIntro: string;
  proof: { label: string; href: string; result: string }[];
  proofNote: string;
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
}
