// Myntmore Master ICP Strategy, market-led 2026. Transcribed from the Notion page
// "Myntmore Master ICP Strategy" (last edited 17 Oct 2026). The ranking is provisional.

export type Tier = "P1" | "P2" | "P3";
export type CustomerType = "Direct customer" | "Channel partner";

export interface Attribute {
  key: AttributeKey;
  label: string;
  hint: string;
}

export type AttributeKey =
  | "industry"
  | "geography"
  | "size"
  | "role"
  | "pains"
  | "goals"
  | "buying"
  | "triggers"
  | "objections"
  | "channels"
  | "messaging"
  | "journey"
  | "projects";

// The 13 comparison attributes, in the order the strategy lists them, grouped for reading.
export const ATTRIBUTE_GROUPS: { title: string; attributes: Attribute[] }[] = [
  {
    title: "Who they are",
    attributes: [
      { key: "industry", label: "Industry / segment", hint: "Sector they belong to" },
      { key: "geography", label: "Geography / location", hint: "Countries / regions served" },
      { key: "size", label: "Company size / scale", hint: "Employees, revenue, project scale" },
      { key: "role", label: "Role / decision maker", hint: "Titles and responsibilities" },
    ],
  },
  {
    title: "What they need",
    attributes: [
      { key: "pains", label: "Business pain points / challenges", hint: "Operational / sourcing problems" },
      { key: "goals", label: "Goals / objectives", hint: "Outcomes customer wants" },
      { key: "buying", label: "Buying behaviour / preferences", hint: "How they evaluate and purchase" },
      { key: "triggers", label: "Triggers / motivators", hint: "Events that prompt engagement" },
      { key: "objections", label: "Objections / concerns", hint: "Risks or hesitation" },
    ],
  },
  {
    title: "How to reach them",
    attributes: [
      { key: "channels", label: "Preferred communication / channels", hint: "Where they research and contact" },
      { key: "messaging", label: "Content / messaging resonance", hint: "Messaging that resonates" },
      { key: "journey", label: "Customer journey stage", hint: "Awareness → Consideration → Decision" },
      { key: "projects", label: "Sample projects / orders", hint: "Typical project or procurement volume" },
    ],
  },
];

export const ATTRIBUTES: Attribute[] = ATTRIBUTE_GROUPS.flatMap((g) => g.attributes);

export interface Icp {
  /** Unique anchor id. Two ICPs share the number 11, so the number alone is not unique. */
  slug: string;
  num: number;
  name: string;
  tier: Tier;
  /** The sub-band within the tier, e.g. "Core", "Strong", "Test". */
  band: string;
  type: CustomerType;
  attrs: Record<AttributeKey, string>;
}

export const ICPS: Icp[] = [
  {
    slug: "icp-1", num: 1, name: "IT Services & Product Engineering", tier: "P1", band: "Core", type: "Direct customer",
    attrs: {
      industry: "Custom dev, cloud, data, product engineering",
      geography: "India/GCC → US, UK, EU, ANZ",
      size: "20–500",
      role: "Founder, CEO, MD, CRO, Sales Head",
      pains: "Referral dependence + weak overseas pipeline",
      goals: "International pipeline + client diversification",
      buying: "Proof, market knowledge, targeting clarity",
      triggers: "New market, sales hire, client loss, plateau",
      objections: "Past agency failure / lead quality",
      channels: "LinkedIn, email, events",
      messaging: "Market entry + pipeline system",
      journey: "Growth gap → outbound evaluation → retainer",
      projects: "Email + LinkedIn",
    },
  },
  {
    slug: "icp-2", num: 2, name: "B2B SaaS & Enterprise Software", tier: "P1", band: "Core", type: "Direct customer",
    attrs: {
      industry: "Vertical SaaS, enterprise software",
      geography: "India, GCC, US, UK, SEA",
      size: "10–300",
      role: "Founder, CEO, CRO, VP Sales",
      pains: "ARR pressure + insufficient new-logo pipeline",
      goals: "Consistent demos + ARR growth",
      buying: "Pipeline math, attribution, speed to learn",
      triggers: "Funding, missed ARR, new sales leader",
      objections: "Meeting quality / attribution",
      channels: "LinkedIn, email, product communities",
      messaging: "Pipeline economics vs internal SDR cost",
      journey: "Pipeline urgency → build vs outsource → launch",
      projects: "Email + LinkedIn",
    },
  },
  {
    slug: "icp-3", num: 3, name: "Executive Search & Recruitment", tier: "P1", band: "Core", type: "Direct customer",
    attrs: {
      industry: "Search, recruitment, staffing",
      geography: "India, UAE, Saudi",
      size: "10–250",
      role: "Founder, MD, Partner",
      pains: "Mandates depend on referrals",
      goals: "Predictable employer mandates",
      buying: "Trust, sector knowledge, buyer access",
      triggers: "New practice, office, weak mandate flow",
      objections: "Will HR leaders respond?",
      channels: "LinkedIn, email, HR events",
      messaging: "Referral vulnerability + talent intelligence",
      journey: "Referral pain → proof → retainer",
      projects: "LinkedIn Brand + Lead Gen",
    },
  },
  {
    slug: "icp-4", num: 4, name: "Agencies – White Label", tier: "P1", band: "Core", type: "Channel partner",
    attrs: {
      industry: "Marketing, web, SEO, creative",
      geography: "India, GCC, UK, EU, ANZ, Americas",
      size: "5–200",
      role: "Founder, CEO, Owner",
      pains: "Clients want outbound but agency lacks delivery",
      goals: "Add recurring white-label revenue",
      buying: "Margin, white-label control, reporting",
      triggers: "Client asks for lead gen / service expansion",
      objections: "Client ownership / confidentiality",
      channels: "LinkedIn, email, agency communities",
      messaging: "Add outbound without building a team",
      journey: "Client demand → partner pilot → scale",
      projects: "White-label Outbound",
    },
  },
  {
    slug: "icp-5", num: 5, name: "Venture Capital Funds – Portfolio GTM", tier: "P1", band: "Channel Partner", type: "Channel partner",
    attrs: {
      industry: "B2B seed, Series A–C funds; portfolio support",
      geography: "India, GCC, Singapore, UK, US",
      size: "10+ active B2B portfolio companies; funded, post-PMF",
      role: "GP, Operating Partner, Platform / Portfolio Head",
      pains: "Portfolio founders need repeatable pipeline but fund lacks GTM execution capacity",
      goals: "Improve portfolio GTM outcomes and founder sales readiness",
      buying: "Partner trust, founder adoption, pilot evidence",
      triggers: "New fund cohort, funding rounds, expansion plans",
      objections: "Portfolio fit, sponsorship model, attribution",
      channels: "Warm intros, LinkedIn, portfolio events",
      messaging: "Portfolio GTM diagnostics + opt-in pilots",
      journey: "Partner introduction → founder diagnostic → paid company pilot",
      projects: "Portfolio workshop + 2–3 opt-in company pilots",
    },
  },
  {
    slug: "icp-6", num: 6, name: "Management & Fractional Advisory", tier: "P1", band: "Core", type: "Direct customer",
    attrs: {
      industry: "Strategy, GTM, finance, HR advisory",
      geography: "India, GCC, Singapore, UK",
      size: "2–100",
      role: "Founder, Partner, Principal",
      pains: "Expertise visible only inside existing network",
      goals: "Authority + repeatable CXO pipeline",
      buying: "Founder trust, voice quality, senior involvement",
      triggers: "Referral slowdown, new partner/geography",
      objections: "Will content sound like me?",
      channels: "LinkedIn, email, newsletters, events",
      messaging: "Turn expertise into pipeline",
      journey: "Visibility gap → trust → combined BD",
      projects: "Personal Brand + LinkedIn",
    },
  },
  {
    slug: "icp-7", num: 7, name: "FinTech / InsurTech / RegTech", tier: "P2", band: "Strong", type: "Direct customer",
    attrs: {
      industry: "Payments, lending, wealth, insurance, compliance",
      geography: "India, GCC, Singapore, UK",
      size: "20–500",
      role: "Founder, CEO, CRO, VP BD",
      pains: "Trust-heavy enterprise sale + long cycles",
      goals: "Credible enterprise pipeline",
      buying: "Compliance credibility, enterprise references",
      triggers: "Funding, approval, product/market launch",
      objections: "Compliance / reputation risk",
      channels: "LinkedIn, email, fintech events",
      messaging: "Credibility + precision over volume",
      journey: "Credibility need → ABM → program",
      projects: "Authority + ABM",
    },
  },
  {
    slug: "icp-8", num: 8, name: "Cybersecurity / Cloud / Data", tier: "P2", band: "Strong", type: "Direct customer",
    attrs: {
      industry: "Security, MSP/MSSP, cloud, data",
      geography: "India, GCC, US, UK",
      size: "20–500",
      role: "Founder, CEO, CRO, VP Sales",
      pains: "Buyers ignore generic security outreach",
      goals: "Trusted access to IT/security buyers",
      buying: "Technical credibility, low-spam approach",
      triggers: "Regulation, certification, new product",
      objections: "Spam risk / technical accuracy",
      channels: "LinkedIn, email, security events",
      messaging: "Trust before outreach",
      journey: "Trust → target accounts → meetings",
      projects: "Thought Leadership + Outbound",
    },
  },
  {
    slug: "icp-9", num: 9, name: "HR Tech & People Platforms", tier: "P2", band: "Strong", type: "Direct customer",
    attrs: {
      industry: "HRMS, ATS, payroll, L&D",
      geography: "India, GCC, SEA",
      size: "10–300",
      role: "Founder, CEO, Head Sales",
      pains: "Crowded category + hard CHRO access",
      goals: "Enterprise demos with HR leaders",
      buying: "Use-case proof, integrations, enterprise references",
      triggers: "Enterprise plan, integration, funding",
      objections: "Crowded outreach / long cycle",
      channels: "LinkedIn, email, HR communities",
      messaging: "HR ROI + transformation use cases",
      journey: "Use-case segmentation → demos → enterprise sale",
      projects: "LinkedIn + Email",
    },
  },
  {
    slug: "icp-10", num: 10, name: "GCC Ecosystem Providers", tier: "P2", band: "Strong", type: "Direct customer",
    attrs: {
      industry: "Setup, talent, workspace, compliance, tech",
      geography: "India + global MNC buyers",
      size: "5–500",
      role: "Founder, Partner, MD, Practice Head",
      pains: "Global buyers difficult to reach consistently",
      goals: "Reach firms entering/expanding India",
      buying: "Specialist credibility, India/GCC knowledge",
      triggers: "GCC announcement / India entry",
      objections: "Specialist credibility / global access",
      channels: "LinkedIn, email, GCC events/reports",
      messaging: "India/GCC authority + timing",
      journey: "Authority → trigger accounts → meetings",
      projects: "Founder Brand + ABM",
    },
  },
  {
    slug: "icp-11-manufacturing", num: 11, name: "Manufacturing / Industrial B2B (pharma)", tier: "P2", band: "Strong", type: "Direct customer",
    attrs: {
      industry: "Machinery, components, automation, engineering",
      geography: "India/GCC + export markets",
      size: "50–1,000",
      role: "MD, Director, VP Sales, Export Head",
      pains: "Trade-show / relationship-led sales only",
      goals: "New buyers + export growth",
      buying: "Industry proof, buyer relevance, patience",
      triggers: "Export push, new line, capacity expansion",
      objections: "Digital outbound unfamiliar / long cycle",
      channels: "LinkedIn, email, exhibitions",
      messaging: "Digital new-account development",
      journey: "Education → market pilot → sustained outbound",
      projects: "LinkedIn + Email",
    },
  },
  {
    slug: "icp-11-logistics", num: 11, name: "Logistics / Supply Chain Tech", tier: "P2", band: "Strong", type: "Direct customer",
    attrs: {
      industry: "3PL, freight, warehousing, fleet, software",
      geography: "India, GCC, SEA",
      size: "20–500",
      role: "Founder, CEO, CCO, VP Sales",
      pains: "Relationship-heavy sales + fragmented verticals",
      goals: "Enterprise logos + vertical expansion",
      buying: "Vertical expertise, account quality, measurable meetings",
      triggers: "Network expansion, funding, new vertical",
      objections: "Commodity perception / targeting accuracy",
      channels: "LinkedIn, email, logistics events",
      messaging: "Account quality + operational ROI",
      journey: "Vertical campaign → account → opportunity",
      projects: "Account-based Outbound",
    },
  },
  {
    slug: "icp-12", num: 12, name: "HealthTech / MedTech B2B", tier: "P2", band: "Selective", type: "Direct customer",
    attrs: {
      industry: "Health software, medtech, diagnostics",
      geography: "India, GCC, SEA, UK",
      size: "20–500",
      role: "Founder, CEO, Commercial Head",
      pains: "Trust/regulatory burden + long cycles",
      goals: "Institutional pipeline",
      buying: "Clinical/commercial proof, compliance awareness",
      triggers: "Certification, partnership, product launch",
      objections: "Compliance / claim accuracy / long cycle",
      channels: "LinkedIn, email, healthcare conferences",
      messaging: "Credibility + institutional outcomes",
      journey: "Authority/proof → stakeholders → opportunity",
      projects: "Authority + Outbound",
    },
  },
  {
    slug: "icp-13", num: 13, name: "Commercial RE / PropTech", tier: "P3", band: "Selective", type: "Direct customer",
    attrs: {
      industry: "CRE, workplace, facilities, PropTech",
      geography: "India, GCC",
      size: "20–500",
      role: "Founder, MD, Commercial Head",
      pains: "Referral dependence + hard-to-detect timing",
      goals: "Reach buyers before requirement is public",
      buying: "Network credibility, timing, local knowledge",
      triggers: "Office expansion, relocation, funding",
      objections: "Timing / relationship sensitivity",
      channels: "LinkedIn, email, CRE events",
      messaging: "Expansion signals + early access",
      journey: "Signal → account outreach → project conversation",
      projects: "LinkedIn Lead Gen",
    },
  },
  {
    slug: "icp-14", num: 14, name: "AI / Automation / DeepTech", tier: "P2", band: "Strong", type: "Direct customer",
    attrs: {
      industry: "Enterprise AI, robotics, automation",
      geography: "India, GCC, US, EU",
      size: "10–300, post-PMF",
      role: "Founder, CEO, CRO, VP Sales",
      pains: "Technical proof not translating to pipeline",
      goals: "Repeatable enterprise demand",
      buying: "Technical understanding + business-value translation",
      triggers: "Successful pilot, case study, funding",
      objections: "Technical accuracy / enterprise conversion",
      channels: "LinkedIn, email, tech communities",
      messaging: "Translate technical proof into business value",
      journey: "Education → target accounts → enterprise pilot",
      projects: "Founder Brand + Enterprise Outbound",
    },
  },
  {
    slug: "icp-15", num: 15, name: "ClimateTech / EnergyTech", tier: "P3", band: "Selective", type: "Direct customer",
    attrs: {
      industry: "Energy software, renewables, EV infra",
      geography: "India, GCC, EU",
      size: "20–500",
      role: "Founder, CEO, Head BD",
      pains: "Complex ROI story + market education",
      goals: "Enterprise pipeline around measurable ROI",
      buying: "ROI proof, sector knowledge, regulatory awareness",
      triggers: "Regulation, incentive, funding, partnership",
      objections: "Long cycle / policy volatility",
      channels: "LinkedIn, email, climate/energy events",
      messaging: "Energy savings + commercial ROI",
      journey: "Thought leadership → ABM → evaluation",
      projects: "Thought Leadership + ABM",
    },
  },
  {
    slug: "icp-16", num: 16, name: "B2B EdTech / Corporate Learning", tier: "P3", band: "Test", type: "Direct customer",
    attrs: {
      industry: "Corporate L&D, enterprise EdTech",
      geography: "India, GCC, SEA",
      size: "10–300",
      role: "Founder, CEO, Enterprise Sales",
      pains: "Episodic budgets + crowded buyer market",
      goals: "Corporate learning contracts",
      buying: "Outcome proof, enterprise logos, L&D relevance",
      triggers: "L&D budget cycle / new program",
      objections: "Budget seasonality / proof of ROI",
      channels: "LinkedIn, email, HR/L&D events",
      messaging: "Learning ROI + skills transformation",
      journey: "Budget trigger → demo → program proposal",
      projects: "LinkedIn + Email",
    },
  },
  {
    slug: "icp-17", num: 17, name: "Accounting / CFO / Compliance", tier: "P3", band: "Test", type: "Direct customer",
    attrs: {
      industry: "Virtual CFO, tax, compliance, finance ops",
      geography: "India, GCC, UK",
      size: "5–200",
      role: "Founder, Partner, MD",
      pains: "Referral growth + commoditisation",
      goals: "Recurring finance clients",
      buying: "Trust, confidentiality, credentials",
      triggers: "Compliance cycle / new service",
      objections: "Confidentiality / commoditisation",
      channels: "LinkedIn, email, finance networks",
      messaging: "CFO insight + recurring value",
      journey: "Need trigger → trust → consultation → retainer",
      projects: "Brand + LinkedIn Lead Gen",
    },
  },
  {
    slug: "icp-18", num: 18, name: "Specialist B2B Professional Services", tier: "P3", band: "Test", type: "Direct customer",
    attrs: {
      industry: "Legal, research, IP, risk, certification",
      geography: "India, GCC, UK, Singapore",
      size: "5–250",
      role: "Founder, Partner, MD, BD Head",
      pains: "Niche expertise invisible outside network",
      goals: "Predictable mandates / projects",
      buying: "Credentials, cases, senior-led execution",
      triggers: "Regulation / new service / sector expansion",
      objections: "Reputation / niche buyer quality",
      channels: "LinkedIn, email, professional associations",
      messaging: "Specialist expertise + credible cases",
      journey: "Expertise discovery → credibility → mandate",
      projects: "Brand + Targeted Outbound",
    },
  },
  {
    slug: "icp-19", num: 19, name: "Influencers / B2B Thought Leaders", tier: "P3", band: "Test", type: "Direct customer",
    attrs: {
      industry: "Creator partnerships, B2B education",
      geography: "India, GCC, US, UK",
      size: "Established monetized audience",
      role: "Creator, Manager, Partnerships Head",
      pains: "Audience engagement not converting to commercial partnerships",
      goals: "Relevant sponsors and enterprise engagements",
      buying: "Audience fit, brand protection",
      triggers: "New show, program or book",
      objections: "Authenticity and sponsorship relevance",
      channels: "LinkedIn, email, partner introductions",
      messaging: "Turn expertise into commercial partnerships",
      journey: "Audience proof → sponsor shortlist → pilot",
      projects: "Sponsor / partner outreach pilot",
    },
  },
  {
    slug: "icp-20", num: 20, name: "Podcasters / Business Media", tier: "P3", band: "Test", type: "Direct customer",
    attrs: {
      industry: "B2B podcasts, niche media",
      geography: "India, GCC, US, UK",
      size: "Consistent episodes and sponsor-ready audience",
      role: "Host, Producer, Partnerships Head",
      pains: "Sponsorship and guest pipeline depend on networks",
      goals: "Repeat sponsors and relevant guests",
      buying: "Audience metrics and fit",
      triggers: "New season, monetization launch",
      objections: "Brand safety, audience quality",
      channels: "LinkedIn, email, media networks",
      messaging: "Targeted sponsorship and guest partnerships",
      journey: "Audience proof → intro → sponsorship pilot",
      projects: "Sponsorship prospecting",
    },
  },
  {
    slug: "icp-21", num: 21, name: "Life Coaches", tier: "P3", band: "Test", type: "Direct customer",
    attrs: {
      industry: "Premium coaching, workplace programs",
      geography: "India, GCC, UK",
      size: "Established premium offer, proven sales",
      role: "Founder, Coach",
      pains: "Referral dependence and unclear B2B proposition",
      goals: "Qualified coaching buyers",
      buying: "Credibility and trust",
      triggers: "New program or enterprise offer",
      objections: "Low-ticket economics and fit",
      channels: "LinkedIn, email",
      messaging: "Package credible workplace offerings",
      journey: "Positioning → pilot → contract",
      projects: "Offer positioning + selective outreach",
    },
  },
  {
    slug: "icp-22", num: 22, name: "Leadership / Executive Coaches", tier: "P2", band: "Selective", type: "Direct customer",
    attrs: {
      industry: "Executive coaching, leadership advisory",
      geography: "India, GCC, UK, US",
      size: "Corporate track record and high-value programs",
      role: "Founder, Managing Partner",
      pains: "Enterprise mandates depend on relationships",
      goals: "Corporate leadership development contracts",
      buying: "Credentials and client proof",
      triggers: "Leadership transition, L&D budget",
      objections: "Quality and confidentiality",
      channels: "LinkedIn, email, HR networks",
      messaging: "Translate expertise into enterprise conversations",
      journey: "Authority → HR discussion → pilot",
      projects: "Enterprise LinkedIn + authority",
    },
  },
  {
    slug: "icp-23", num: 23, name: "Corporate Gifting", tier: "P2", band: "Selective", type: "Direct customer",
    attrs: {
      industry: "Employee rewards, premium corporate gifting",
      geography: "India, GCC, SEA",
      size: "Repeat B2B orders, differentiated supply",
      role: "Founder, Enterprise Sales Head",
      pains: "Seasonal demand and tender dependence",
      goals: "Recurring corporate accounts",
      buying: "MOQ, customization, capacity",
      triggers: "Festivals, onboarding, conferences",
      objections: "Margin and fulfilment reliability",
      channels: "LinkedIn, email, procurement networks",
      messaging: "Reach HR, admin and procurement before buying windows",
      journey: "Trigger → sample → order",
      projects: "Account-based corporate outreach",
    },
  },
  {
    slug: "icp-24", num: 24, name: "UAV / Defence-adjacent Engineering", tier: "P3", band: "Exploratory", type: "Direct customer",
    attrs: {
      industry: "Commercial UAV inspection, surveying, aerospace engineering",
      geography: "India, GCC, EU",
      size: "Commercially approved offering and references",
      role: "CEO, Commercial Director",
      pains: "Specialist procurement and hard-to-reach buyers",
      goals: "Lawful commercial enterprise projects",
      buying: "Certifications and compliance",
      triggers: "Commercial deployment, tender notice",
      objections: "Regulatory and procurement restrictions",
      channels: "Industry events, approved B2B channels",
      messaging: "Evidence-led industrial use cases",
      journey: "Qualification → evaluation → pilot",
      projects: "Commercial-use account mapping",
    },
  },
  {
    slug: "icp-25", num: 25, name: "R&D Offshoring", tier: "P1", band: "Candidate", type: "Direct customer",
    attrs: {
      industry: "Engineering R&D, embedded systems, product design",
      geography: "India to US, EU, UK, GCC",
      size: "Established offshore engineering delivery",
      role: "CEO, VP Global Sales",
      pains: "OEM access and complex capability positioning",
      goals: "International engineering contracts",
      buying: "Delivery proof and specialization",
      triggers: "Product launches, vendor diversification",
      objections: "Technical fit and procurement cycles",
      channels: "LinkedIn, email, industry events",
      messaging: "Reach global engineering buying committees",
      journey: "Capability proof → technical discussion → pilot",
      projects: "International account-based outbound",
    },
  },
  {
    slug: "icp-26", num: 26, name: "Jewellery Manufacturers / Exporters", tier: "P2", band: "Selective", type: "Direct customer",
    attrs: {
      industry: "Private-label and wholesale jewelry",
      geography: "India to US, UK, GCC",
      size: "Export-ready manufacturing and MOQ",
      role: "Founder, Export Director",
      pains: "Dependence on fairs and intermediaries",
      goals: "International wholesale buyers",
      buying: "Catalog, certifications, capacity",
      triggers: "Trade shows, new collections",
      objections: "MOQ, sourcing trust",
      channels: "Email, trade fairs, LinkedIn",
      messaging: "Reach category-fit sourcing teams",
      journey: "Catalog → sample → order",
      projects: "Export buyer development",
    },
  },
  {
    slug: "icp-27", num: 27, name: "International Event Management", tier: "P2", band: "Selective", type: "Direct customer",
    attrs: {
      industry: "MICE, exhibitions, corporate experiential",
      geography: "India, GCC, UK, SEA",
      size: "Large B2B event contracts",
      role: "Founder, Global BD Head",
      pains: "Project-based revenue and referrals",
      goals: "Recurring international corporate accounts",
      buying: "Portfolio and event proof",
      triggers: "Event calendars, conference launches",
      objections: "Execution and geography credibility",
      channels: "LinkedIn, email, events",
      messaging: "Reach enterprise event buyers early",
      journey: "Brief → proposal → contract",
      projects: "Corporate account outreach",
    },
  },
  {
    slug: "icp-28", num: 28, name: "Turnkey Architecture / Design-Build", tier: "P2", band: "Selective", type: "Direct customer",
    attrs: {
      industry: "Office, hospitality and retail fit-outs",
      geography: "India, GCC, SEA",
      size: "High-value commercial projects",
      role: "MD, BD Director",
      pains: "Tender and referral dependence",
      goals: "Early access to fit-out projects",
      buying: "Project portfolio, delivery capacity",
      triggers: "Expansion, relocation, refurbishment",
      objections: "Timing, tender restrictions",
      channels: "LinkedIn, email, CRE networks",
      messaging: "Signal-led outreach to facilities and expansion teams",
      journey: "Trigger → design discussion → bid",
      projects: "Project-trigger outbound",
    },
  },
];

// Section 1 priority tiers: the order and sub-bands as the strategy lists them.
export const TIERS: { tier: Tier; title: string; bands: { label: string; slugs: string[] }[] }[] = [
  {
    tier: "P1",
    title: "Priority 1",
    bands: [
      { label: "P1 Core", slugs: ["icp-1", "icp-2", "icp-3", "icp-4", "icp-6"] },
      { label: "P1 Channel partner", slugs: ["icp-5"] },
      { label: "P1 Candidate", slugs: ["icp-25"] },
    ],
  },
  {
    tier: "P2",
    title: "Priority 2",
    bands: [
      { label: "P2 Strong", slugs: ["icp-7", "icp-8", "icp-9", "icp-10", "icp-11-manufacturing", "icp-11-logistics", "icp-14"] },
      { label: "P2 Selective", slugs: ["icp-12", "icp-22", "icp-23", "icp-26", "icp-27", "icp-28"] },
    ],
  },
  {
    tier: "P3",
    title: "Priority 3",
    bands: [
      { label: "P3 Selective", slugs: ["icp-13", "icp-15"] },
      { label: "P3 Test", slugs: ["icp-16", "icp-17", "icp-18", "icp-19", "icp-20", "icp-21"] },
      { label: "P3 Exploratory", slugs: ["icp-24"] },
    ],
  },
];

export const PRODUCT: { label: string; hint: string; body: string }[] = [
  {
    label: "Service / vertical",
    hint: "The core service and its buyers",
    body: "AI-assisted B2B pipeline generation, account-based outbound, LinkedIn executive branding and GTM strategy for established B2B businesses.",
  },
  {
    label: "Value proposition",
    hint: "The primary commercial benefit",
    body: "Help B2B sales teams reach qualified target accounts and create a repeatable sales-conversation engine using research-led targeting, credible messaging and coordinated LinkedIn/email outreach.",
  },
  {
    label: "Channel partner proposition",
    hint: "The partnership benefit",
    body: "Agencies can add white-label outbound delivery; VC and portfolio partners can offer opt-in GTM diagnostics and pilots to commercially ready portfolio companies.",
  },
];

// Section 3: High / Moderate / Low ratings across the ten priority ICPs.
export type Rating = "High" | "Moderate" | "Low";

// Each column links to the matching profile above.
export const FRAMEWORK_ICPS: { label: string; slug: string }[] = [
  { label: "AI / Automation", slug: "icp-14" },
  { label: "B2B SaaS", slug: "icp-2" },
  { label: "Cybersecurity", slug: "icp-8" },
  { label: "GCC Providers", slug: "icp-10" },
  { label: "HR Tech", slug: "icp-9" },
  { label: "IT Services & Engineering", slug: "icp-1" },
  { label: "Marketing Agencies", slug: "icp-4" },
  { label: "R&D Offshoring", slug: "icp-25" },
  { label: "Recruitment", slug: "icp-3" },
  { label: "VC Funds", slug: "icp-5" },
];

const H: Rating = "High";
const M: Rating = "Moderate";
const L: Rating = "Low";

export const FRAMEWORK: { criterion: string; ratings: Rating[] }[] = [
  { criterion: "Frequency of use case", ratings: [H, H, H, M, H, H, H, H, H, M] },
  { criterion: "Past work assets", ratings: [M, M, M, M, M, H, H, M, H, L] },
  { criterion: "Appetite to pay", ratings: [H, H, H, M, M, H, H, H, M, M] },
  { criterion: "Deal value", ratings: [H, H, H, M, M, H, M, H, M, M] },
  { criterion: "Sales readiness", ratings: [M, M, M, M, M, H, H, H, H, L] },
  { criterion: "Ease of conversion", ratings: [M, M, M, M, M, M, H, M, H, L] },
  { criterion: "Reachable target accounts", ratings: [M, H, H, M, H, H, H, M, H, M] },
];

export const NOTES = [
  "Each vertical can contain multiple narrower ICPs with different decision-makers and commercial triggers.",
  "Map every ICP to a specific Myntmore offer and value proposition, not just a generic lead generation pitch.",
  "Prioritize by customer economics, sales readiness, reachable buyer universe and evidence from actual campaigns.",
];

// Supporting research: numeric 1–5 scores on eight criteria. Sum is out of 40.
export const CRITERIA: { short: string; label: string; question: string }[] = [
  { short: "Reach", label: "LinkedIn + Email Reachability", question: "Can the buyer committee be identified and contacted compliantly?" },
  { short: "Deal value", label: "Average Spend / Deal Value", question: "Can the segment support Myntmore's enterprise fees?" },
  { short: "Frequency", label: "Buying Frequency", question: "How often is a recurring pipeline program needed?" },
  { short: "LTV", label: "Lifetime Value (LTV)", question: "Likelihood of sustained multi-month engagement and expansion" },
  { short: "Conversion", label: "Ease of Conversion", question: "How accessible and short is the buying process?" },
  { short: "Past work", label: "Past Work Assets", question: "How strong is Myntmore's relevant delivery proof?" },
  { short: "Readiness", label: "Sales Readiness / Trigger", question: "How often do accounts have a closer and a near-term growth trigger?" },
  { short: "Market size", label: "Market Size", question: "How many reachable, commercially qualified accounts exist?" },
];

export const SCORES: { segment: string; scores: number[]; sum: number }[] = [
  { segment: "AI / Automation / DeepTech", scores: [4, 5, 4, 4, 3, 3, 4, 4], sum: 31 },
  { segment: "Accounting / Virtual CFO", scores: [3, 3, 4, 3, 3, 3, 3, 3], sum: 25 },
  { segment: "B2B EdTech / Corporate Learning", scores: [3, 3, 3, 3, 3, 2, 3, 3], sum: 23 },
  { segment: "B2B SaaS & Enterprise Software", scores: [4, 5, 5, 5, 3, 4, 4, 5], sum: 35 },
  { segment: "BPO / KPO", scores: [4, 4, 4, 4, 3, 3, 3, 3], sum: 28 },
  { segment: "ClimateTech / EnergyTech", scores: [3, 4, 3, 3, 2, 2, 3, 3], sum: 23 },
  { segment: "Commercial RE / PropTech", scores: [3, 4, 3, 3, 2, 2, 3, 3], sum: 23 },
  { segment: "Corporate Gifting", scores: [3, 3, 3, 4, 3, 2, 3, 3], sum: 24 },
  { segment: "Cybersecurity / Cloud / Data", scores: [4, 5, 5, 4, 3, 3, 4, 4], sum: 32 },
  { segment: "ERP / CRM Integrators", scores: [4, 4, 4, 4, 3, 3, 4, 4], sum: 30 },
  { segment: "Executive Search & Recruitment", scores: [4, 4, 4, 4, 4, 4, 4, 4], sum: 32 },
  { segment: "FinTech / InsurTech", scores: [3, 5, 4, 4, 2, 3, 4, 4], sum: 29 },
  { segment: "GCC Ecosystem Providers", scores: [3, 3, 4, 3, 3, 3, 3, 3], sum: 25 },
  { segment: "HR Tech", scores: [4, 4, 4, 4, 3, 3, 4, 4], sum: 30 },
  { segment: "HealthTech / MedTech B2B", scores: [3, 3, 3, 3, 2, 2, 3, 3], sum: 22 },
  { segment: "IT Services & Product Engineering", scores: [4, 5, 5, 5, 3, 5, 4, 5], sum: 36 },
  { segment: "International Event Management", scores: [3, 4, 3, 3, 2, 2, 3, 3], sum: 23 },
  { segment: "Jewellery Exporters", scores: [3, 3, 3, 3, 2, 2, 3, 3], sum: 22 },
  { segment: "Leadership / Executive Coaching", scores: [3, 3, 3, 3, 3, 3, 3, 3], sum: 24 },
  { segment: "Logistics / Supply Chain", scores: [3, 4, 4, 4, 3, 3, 3, 3], sum: 27 },
  { segment: "Management & Fractional Advisory", scores: [4, 4, 4, 4, 3, 4, 4, 4], sum: 31 },
  { segment: "Manufacturing / Industrial B2B", scores: [3, 4, 4, 4, 2, 3, 3, 3], sum: 26 },
  { segment: "Marketing Agencies – White Label", scores: [4, 4, 5, 5, 4, 5, 5, 4], sum: 36 },
  { segment: "R&D Offshoring", scores: [4, 5, 5, 4, 3, 3, 4, 4], sum: 32 },
  { segment: "RegTech / Compliance Automation", scores: [3, 4, 4, 4, 2, 2, 3, 4], sum: 26 },
  { segment: "Specialist B2B Professional Services", scores: [3, 3, 3, 3, 2, 2, 3, 3], sum: 22 },
  { segment: "Turnkey Architecture", scores: [3, 4, 3, 3, 2, 2, 3, 3], sum: 23 },
  { segment: "VC Funds – Portfolio GTM", scores: [3, 3, 3, 3, 2, 2, 2, 3], sum: 21 },
];
