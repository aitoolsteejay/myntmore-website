// The shape of one ICP landing page: content/landing-pages/<slug>.json, edited in
// the Keystatic admin ("Landing pages"). Layout, styling, animations, the Zoho form
// wiring and the flow-diagram colours are fixed in components/lp/LandingPage.tsx.
export interface LandingPageData {
  slug: string;
  // Search and sharing
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  // Hero
  breadcrumbLabel: string;
  badge: string;
  // "radar" adds the animated ping ring around the badge; empty for the plain badge.
  badgeEffect: string;
  h1Line1: string;
  h1Before: string;
  h1Underlined: string;
  h1After: string;
  // true when the line break comes right after the underlined words instead of before them.
  h1BreakAfter: boolean;
  // Width of the hand-drawn underline (400, 380 or 300 on the existing pages).
  underlineWidth: number;
  heroSubheading: string;
  primaryCta: string;
  secondaryCta: string;
  heroNote: string;
  // "four" (4 icons), "three-a" (3 icons) or "three-b" (3 icons): where the floating emoji sit.
  floaterLayout: string;
  // Optional extra hero graphic: "trade-route" draws a dashed route with an animated plane.
  heroDecoration: string;
  floatingIcons: string[];
  // Sections
  // When set, the stats row gets this small caption above the counters (fundraising layout).
  statsCaption: string;
  stats: { icon: string; prefix: string; target: number; decimals: number; suffix: string; label: string }[];
  painEyebrow: string;
  painTitle: string;
  pain: { icon: string; heading: string; body: string }[];
  flowBadge: string;
  flowTitle: string;
  flowTop: { icon: string; title: string; body: string }[];
  flowParallelLabel: string;
  flowParallel: { icon: string; title: string; body: string }[];
  flowBottom: { icon: string; title: string; body: string }[];
  processEyebrow: string;
  processTitle: string;
  process: { title: string; body: string }[];
  trackEyebrow: string;
  trackTitle: string;
  // What fills the results slot: "counters" (the 4 track record numbers), "case-cards" (case studies with result pills) or "none".
  trackStyle: string;
  // href (optional): the case study page the card links to.
  caseCards: { tag: string; headline: string; body: string; results: string[]; href?: string }[];
  // Optional link under the track record cards.
  trackLinkText: string;
  trackLinkHref: string;
  track: { icon: string; prefix: string; target: number; suffix: string; label: string }[];
  // Optional "in practice" scenario cards after the track record (exactly 3, or none).
  scenariosEyebrow: string;
  scenariosTitle: string;
  scenariosIntro: string;
  scenarios: { tag: string; headline: string; body: string }[];
  // Optional "why this works" icon cards (exactly 3, or none), shown after the results slot.
  whyEyebrow: string;
  whyTitle: string;
  whyIntro: string;
  whyCards: { icon: string; title: string; body: string }[];
  faqTitle: string;
  ctaHeading: string;
  ctaBody: string;
  formHeading: string;
  formBody: string;
  namePlaceholder: string;
  designationPlaceholder: string;
  phonePlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  emailPlaceholder: string;
  submitLabel: string;
  formNote: string;
}
