// The written content for each market page (/case-studies/markets/<slug>): who it is for, what worked
// there (each play is one real case study), the rules and timing, and links to the industry and city
// pages. One JSON file per market in content/market-pages/. The FAQs live with every other page FAQ,
// in content/faqs/pages/market-<slug>.json, and the search title in content/page-seo/.
import uae from "@/content/market-pages/uae.json";
import unitedStates from "@/content/market-pages/united-states.json";
import unitedKingdom from "@/content/market-pages/united-kingdom.json";
import singapore from "@/content/market-pages/singapore.json";
import france from "@/content/market-pages/france.json";
import india from "@/content/market-pages/india.json";
import type { MarketSlug } from "@/lib/case-study-markets";

export interface MarketPlay {
  tag: string;
  title: string;
  body: string;
  results: string[];
  href: string;
}

export interface MarketPage {
  slug: MarketSlug;
  keywords: string[];
  heroLead: string;
  heroUnderlined: string;
  intro: string;
  audiences: { icon: string; title: string; body: string }[];
  playsTitle: string;
  plays: MarketPlay[];
  rulesTitle: string;
  rulesBody: string;
  timingTitle: string;
  timingBody: string;
  industryLinks: { label: string; href: string }[];
  // Which city links to show: the UAE city pages, every Indian city page, or none.
  cities: "uae" | "india" | null;
}

const PAGES: Record<MarketSlug, MarketPage> = {
  uae: uae as MarketPage,
  "united-states": unitedStates as MarketPage,
  "united-kingdom": unitedKingdom as MarketPage,
  singapore: singapore as MarketPage,
  france: france as MarketPage,
  india: india as MarketPage,
};

export function marketPage(slug: MarketSlug): MarketPage {
  return PAGES[slug];
}
