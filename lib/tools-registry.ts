// Single source of truth for every free tool's name/href/tagline, used to
// render the "Try this next" cross-link section on each tool's landing
// page. Keeping this in one place means the 9 tool pages can't drift out
// of sync with each other's actual titles/URLs.

export interface ToolInfo {
  slug: string;
  name: string;
  href: string;
  tagline: string;
}

export const TOOLS_REGISTRY: Record<string, ToolInfo> = {
  "battle-card-generator": {
    slug: "battle-card-generator",
    name: "Competitor Battle Card Generator",
    href: "/tools/battle-card-generator",
    tagline: "See exactly how you stack up against any competitor",
  },
  "case-study-generator": {
    slug: "case-study-generator",
    name: "Case Study & Proposal Generator",
    href: "/tools/case-study-generator",
    tagline: "Turn a win into proof, or a chat into a proposal",
  },
  "dm-angle-generator": {
    slug: "dm-angle-generator",
    name: "DM Angle Generator",
    href: "/tools/dm-angle-generator",
    tagline: "5 psychology-aligned openers for your next outreach",
  },
  "founder-presence-analyzer": {
    slug: "founder-presence-analyzer",
    name: "Founder Presence Analyzer",
    href: "/tools/founder-presence-analyzer",
    tagline: "See how your LinkedIn presence stacks up",
  },
  "icp-builder": {
    slug: "icp-builder",
    name: "ICP Builder & Value Proposition Generator",
    href: "/tools/icp-builder",
    tagline: "Define exactly who to sell to, and what to say",
  },
  "linkedin-hook-grader": {
    slug: "linkedin-hook-grader",
    name: "LinkedIn Hook Grader",
    href: "/tools/linkedin-hook-grader",
    tagline: "Score your post's first two lines and get 3 rewrites",
  },
  "lead-magnet-ideas": {
    slug: "lead-magnet-ideas",
    name: "Lead Magnet Idea Generator",
    href: "/tools/lead-magnet-ideas",
    tagline: "3 lead magnet ideas built for your ICP",
  },
  "linkedin-optimizer": {
    slug: "linkedin-optimizer",
    name: "LinkedIn Profile Optimizer",
    href: "/tools/linkedin-optimizer",
    tagline: "Turn your profile into an inbound lead machine",
  },
  "posting-rhythm-builder": {
    slug: "posting-rhythm-builder",
    name: "Posting Rhythm Builder",
    href: "/tools/posting-rhythm-builder",
    tagline: "A consistent LinkedIn cadence built around your life",
  },
  "roi-calculator": {
    slug: "roi-calculator",
    name: "ROI Calculator",
    href: "/tools/roi-calculator",
    tagline: "See the pipeline your outreach could generate",
  },
  "cold-email-roi-calculator": {
    slug: "cold-email-roi-calculator",
    name: "Cold Email ROI Calculator",
    href: "/tools/cold-email-roi-calculator",
    tagline: "Meetings, pipeline and ROI from your cold email volume",
  },
  "cold-email-inbox-calculator": {
    slug: "cold-email-inbox-calculator",
    name: "Cold Email Inbox & Domain Calculator",
    href: "/tools/cold-email-inbox-calculator",
    tagline: "Domains, inboxes and go-live date for your sending volume",
  },
};

// Each tool links to 2 others chosen for a natural next-step workflow, not
// just alphabetically -- e.g. someone who just defined their ICP is a
// good candidate for the DM Angle Generator next, not a random tool.
export const RELATED_TOOLS: Record<string, string[]> = {
  "battle-card-generator": ["roi-calculator", "case-study-generator"],
  "case-study-generator": ["lead-magnet-ideas", "battle-card-generator"],
  "dm-angle-generator": ["icp-builder", "linkedin-optimizer"],
  "founder-presence-analyzer": ["linkedin-optimizer", "posting-rhythm-builder", "linkedin-hook-grader"],
  "icp-builder": ["dm-angle-generator", "lead-magnet-ideas"],
  "lead-magnet-ideas": ["case-study-generator", "dm-angle-generator"],
  "linkedin-optimizer": ["founder-presence-analyzer", "posting-rhythm-builder", "linkedin-hook-grader"],
  "linkedin-hook-grader": ["posting-rhythm-builder", "linkedin-optimizer"],
  "posting-rhythm-builder": ["linkedin-optimizer", "founder-presence-analyzer", "linkedin-hook-grader"],
  "roi-calculator": ["cold-email-roi-calculator", "battle-card-generator"],
  "cold-email-roi-calculator": ["cold-email-inbox-calculator", "roi-calculator"],
  "cold-email-inbox-calculator": ["cold-email-roi-calculator", "icp-builder"],
};
