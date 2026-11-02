// Myntmore Value Proposition: customer pain, solution, benefit, proof and message for all
// 29 ICPs, with the provisional 2026 ICP direction. Rendered at /value-prop (unlisted).
//
// Source: the "Myntmore Value Proposition" Notion page (exported to PDF, last edited
// 28 Oct 2026). The per-ICP answers live in value-prop.json; this file holds the shared
// structure: the 8 sections, the 39 fields and what each one answers, the notes and
// safeguards, and the 2026 direction. Text is kept exactly as written in the source.

import data from "./value-prop.json";

export type StatusGroup = "core" | "retain" | "test" | "subsegment" | "deprioritised";

export type FieldKey =
  | "headline"
  | "oneLiner"
  | "vertical"
  | "targetCustomer"
  | "persona"
  | "useCase"
  | "coreProblem"
  | "primaryBenefit"
  | "whyYou"
  | "functionalPain"
  | "financialPain"
  | "emotionalPain"
  | "trustPain"
  | "awarenessPain"
  | "keyFeatures"
  | "howItWorks"
  | "differentiators"
  | "implementation"
  | "timeToValue"
  | "tangibleOutcomes"
  | "intangibleOutcomes"
  | "businessImpact"
  | "supportingStatement"
  | "elevatorPitch"
  | "cta"
  | "tone"
  | "reasonsToBelieve"
  | "socialProof"
  | "visualHooks"
  | "proofToClose"
  | "positioningLine"
  | "pricingPerception"
  | "priceObjection"
  | "priceReframe"
  | "distribution"
  | "contentIdeas"
  | "communityHooks"
  | "retentionTriggers"
  | "timingHooks";

export interface Icp {
  number: number;
  name: string;
  buyers: string;
  status: { group: StatusGroup; parent?: number };
  headline: string;
  oneLiner: string;
  values: Record<Exclude<FieldKey, "headline" | "oneLiner">, string>;
}

export interface Field {
  key: FieldKey;
  label: string;
  /** What the field answers (the source's field guide). */
  hint: string;
}

export interface Section {
  number: number;
  title: string;
  /** Short name for tabs. */
  short: string;
  fields: Field[];
  /** Notes the source attaches to this section; they apply to every ICP. */
  openingNote?: string;
  closingNote?: string;
}

export const ICPS = data as Icp[];

export const META = {
  icps: 29,
  sections: 8,
  fieldsPerIcp: 39,
  source: "Notion · Myntmore-Value-Proposition-Notion",
  lastEdited: "28 Oct 2026",
};

export const FLOW = ["Customer pain", "Solution", "Benefit", "Proof", "Message"];

export const SECTIONS: Section[] = [
  {
    number: 1,
    title: "General Information",
    short: "General",
    fields: [
      { key: "vertical", label: "Vertical / Product", hint: "Which service does this value prop apply to?" },
      { key: "targetCustomer", label: "Target Customer (Company Type)", hint: "What kind of company is this for?" },
      { key: "persona", label: "ICP (Role / Persona)", hint: "Who is the buyer at that company?" },
      { key: "useCase", label: "Use Case / Scenario", hint: "When exactly does this customer need Myntmore?" },
      { key: "coreProblem", label: "Core Problem", hint: "What single problem are you solving for this ICP?" },
      { key: "primaryBenefit", label: "Primary Benefit", hint: "What is the most important outcome this customer gets?" },
      { key: "whyYou", label: "Why You?", hint: "What makes your version of the solution uniquely credible?" },
      { key: "oneLiner", label: "One-Line Value Prop", hint: "Draft: ‘We help ICP do [outcome] by [method/differentiator]’" },
    ],
  },
  {
    number: 2,
    title: "Customer Pain Points",
    short: "Pain",
    fields: [
      { key: "functionalPain", label: "Functional / Operational Pain", hint: "Daily frustrations and workflow problems this solves" },
      { key: "financialPain", label: "Financial / Business Pain", hint: "Cost, revenue, or risk-related frustrations" },
      { key: "emotionalPain", label: "Emotional / Strategic Pain", hint: "Identity, confidence, fear, or stress-based frustrations" },
      { key: "trustPain", label: "Trust Pain", hint: "Why do they hesitate to trust solutions like yours?" },
      { key: "awarenessPain", label: "Awareness Pain", hint: "What do they not know yet that, if they knew, would make them buy?" },
    ],
  },
  {
    number: 3,
    title: "Solution Description",
    short: "Solution",
    fields: [
      { key: "keyFeatures", label: "Key Features / Capabilities", hint: "What aspects of your product/service address their specific pain?" },
      { key: "howItWorks", label: "How It Works", hint: "Describe the journey from discovery to result in simple steps" },
      { key: "differentiators", label: "Unique Differentiators", hint: "Why your solution vs. every alternative available to them?" },
      { key: "implementation", label: "Implementation / Ease of Use", hint: "How easy is it to start and see results?" },
      { key: "timeToValue", label: "Time to Value", hint: "How quickly do they see the benefit after buying?" },
    ],
    closingNote: "Commercial terms (all ICPs): 3-month minimum, then month-to-month with 30 days’ notice.",
  },
  {
    number: 4,
    title: "Benefits / Outcomes",
    short: "Outcomes",
    fields: [
      { key: "tangibleOutcomes", label: "Tangible / Quantifiable Outcomes", hint: "Measurable results, numbers, timeframes, revenue, cost saved" },
      { key: "intangibleOutcomes", label: "Intangible / Emotional Outcomes", hint: "How do they feel after using your product? Identity shift?" },
      { key: "businessImpact", label: "Business Impact (for you)", hint: "How does this ICP help YOUR brand grow? (referrals, UGC, LTV)" },
    ],
    closingNote:
      "Myntmore influences outreach, replies and qualified meetings. Closing, revenue and placements stay with the client; no outcome above is a guarantee.",
  },
  {
    number: 5,
    title: "Messaging / Elevator Pitch",
    short: "Messaging",
    fields: [
      { key: "headline", label: "Headline", hint: "One-line value summary (ad headline / LinkedIn hook)" },
      { key: "supportingStatement", label: "Supporting Statement", hint: "Problem + solution + benefit in 2–3 sentences" },
      { key: "elevatorPitch", label: "Elevator Pitch", hint: "For [ICP], solve [pain], deliver [benefit], 3–4 sentences max" },
      { key: "cta", label: "Primary Call To Action (CTA)", hint: "What is the ONE action you want this ICP to take next?" },
      { key: "tone", label: "Tone / Voice", hint: "What tone works for this ICP?" },
    ],
  },
  {
    number: 6,
    title: "Proof & Differentiation",
    short: "Proof",
    fields: [
      { key: "reasonsToBelieve", label: "Reasons to Believe (Proof Points)", hint: "What evidence builds trust for this ICP specifically?" },
      { key: "socialProof", label: "Social Proof / PR Hooks", hint: "Testimonials, case studies, press, awards" },
      { key: "visualHooks", label: "Visual Hooks", hint: "What should content look and feel like to resonate with this ICP?" },
      { key: "proofToClose", label: "Proof Needed to Close", hint: "What must they see or hear before they will buy?" },
    ],
    closingNote:
      "Published results are anonymised on myntmore.com/case-studies. Homepage aggregates: 12K+ meetings booked, $120M+ pipeline generated and 130+ B2B companies served are verified and can be cited. 92% retention is left out until verified.",
  },
  {
    number: 7,
    title: "Positioning & Pricing Perception",
    short: "Positioning",
    fields: [
      { key: "positioningLine", label: "Positioning Line", hint: "How do you define your category?" },
      { key: "pricingPerception", label: "Pricing Perception", hint: "What does this ICP think about your price, and how do you justify it?" },
      { key: "priceObjection", label: "Key Price Objection", hint: "What is the #1 thing they say when they don’t buy?" },
      { key: "priceReframe", label: "Reframe for Price", hint: "How do you reframe cost as an investment with a clear ROI?" },
      { key: "distribution", label: "Distribution Focus", hint: "Where do you find and convert this ICP specifically?" },
    ],
    openingNote:
      "Pricing and ROI safeguard: The statements in this section are hypotheses to test in discovery, not verified customer beliefs, savings, payback periods or guarantees. Do not claim that one deal will cover fees, that a contract will repeat annually, or that Myntmore is cheaper than an in-house hire unless the comparison is supported by the prospect’s actual costs, contract value, gross margin and sales cycle.",
    closingNote:
      "Pricing-perception statements below are hypotheses, not verified willingness-to-pay findings. Do not quote ROI, cost savings or price comparisons externally until current Myntmore fees and the prospect's own economics are confirmed.",
  },
  {
    number: 8,
    title: "Campaign Hooks / Content Triggers",
    short: "Hooks",
    fields: [
      { key: "contentIdeas", label: "UGC / Reels Ideas", hint: "What content ideas create trust and drive enquiries?" },
      { key: "communityHooks", label: "Community Building Hooks", hint: "Offline and digital communities where this ICP gathers" },
      { key: "retentionTriggers", label: "Retention / Loyalty Triggers", hint: "What drives repeat engagement and referrals?" },
      { key: "timingHooks", label: "Seasonal / Timing Hooks", hint: "When is this ICP most likely to buy?" },
    ],
    openingNote:
      "Meeting-use note (28 October 2026): ICP priorities are strategic hypotheses pending validation against Myntmore’s CRM and campaign results. Public case-study metrics are website-published examples, not guarantees. Do not present unverified case claims, ROI, payback or market suitability as established facts.",
  },
];

export const ALL_FIELDS: (Field & { section: Section })[] = SECTIONS.flatMap((section) => section.fields.map((f) => ({ ...f, section })));

export const DIRECTION = {
  label: "2026 ICP direction (provisional, to validate against campaign/CRM results)",
  text: "Core focus: IT Services & Product Engineering (ICP 1), Executive Search & Recruitment (ICP 3), Manufacturing / Industrial B2B (ICP 11), and Accounting / CFO / Compliance (ICP 24). Retain B2B SaaS (ICP 2) and direct-client Agencies (ICP 4) as distinct motions. Test VC Funds (ICP 5), GCC Ecosystem Providers (ICP 10), Logistics Services (ICP 12), Leadership / Executive Coaches (ICP 15), and Corporate Gifting (ICP 16). Treat ICP 20 as an R&D-offshoring subsegment of ICP 1; ICP 17 as a jewellery-export subsegment of ICP 11; ICPs 6 and 25 as subsegments of ICP 24; and ICPs 7, 8, 9 and 13 as SaaS-adjacent subsegments under ICP 2. Deprioritise ICPs 14, 18, 19, 21, 22, 23, 26, 27, 28 and 29 for active acquisition until evidence supports reopening them. These are strategic hypotheses, not proven conversion rankings. All 29 original columns remain below for traceability; merged/deprioritised columns must not be interpreted as equal-priority campaigns.",
};

export const STATUS_GROUPS: { group: StatusGroup; title: string; color: string; text: string }[] = [
  { group: "core", title: "Core focus", color: "#F5B731", text: "#A14A08" },
  { group: "retain", title: "Retain as distinct motions", color: "#0A0A0A", text: "#0A0A0A" },
  { group: "test", title: "Test", color: "#3B82F6", text: "#1D4ED8" },
  { group: "subsegment", title: "Treated as subsegments", color: "#7C3AED", text: "#6D28D9" },
  { group: "deprioritised", title: "Deprioritised for active acquisition", color: "#B8B0A7", text: "#71675E" },
];

export function statusLabel(icp: Icp): string {
  switch (icp.status.group) {
    case "core":
      return "Core focus";
    case "retain":
      return "Retain · distinct motion";
    case "test":
      return "Test";
    case "subsegment":
      return `Subsegment of ICP ${icp.status.parent}`;
    case "deprioritised":
      return "Deprioritised";
  }
}

export function fieldValue(icp: Icp, key: FieldKey): string {
  if (key === "headline") return icp.headline;
  if (key === "oneLiner") return icp.oneLiner;
  return icp.values[key];
}

export const pad = (n: number) => String(n).padStart(2, "0");
