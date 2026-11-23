// Runs extract-page-copy.mjs across all 19 resource guides in app/resources/guides.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");

export const GUIDES = [
  { slug: "58-meetings-600-linkedin-connections", key: "guide58Meetings600LinkedinConnections", title: "58 Meetings Booked from 600 LinkedIn Connections in 1 Month" },
  { slug: "80-us-meetings-ai-agents", key: "guide80UsMeetingsAiAgents", title: "80+ US Meetings Booked in 1 Month with AI Agents" },
  { slug: "ai-tech-stack-jewellery", key: "guideAiTechStackJewellery", title: "AI Tech Stack for Jewellery Brands" },
  { slug: "careers-and-job-guide", key: "guideCareersAndJobGuide", title: "Career Jumpstart Toolkit" },
  { slug: "claude-sales-call-prompts", key: "guideClaudeSalesCallPrompts", title: "5 Claude Prompts for Sales Calls" },
  { slug: "claude-skills-guide", key: "guideClaudeSkillsGuide", title: "The 6 Claude Skills Guide" },
  { slug: "cold-email-infrastructure-setup", key: "guideColdEmailInfrastructureSetup", title: "Cold Email Infrastructure Setup: Domains, Inboxes & DNS" },
  { slug: "cold-email-tech-stack", key: "guideColdEmailTechStack", title: "The Cold Email Stack Behind an Extra $7,000 in Revenue" },
  { slug: "dos-and-donts-of-outreach", key: "guideDosAndDontsOfOutreach", title: "Pattern Disruption: The Do's and Don'ts of Cold Outreach" },
  { slug: "education-guide", key: "guideEducationGuide", title: "AI Quick-Start Guide" },
  { slug: "golden-icp-framework", key: "guideGoldenIcpFramework", title: "The Golden ICP Framework" },
  { slug: "how-to-choose-an-outbound-agency", key: "guideHowToChooseAnOutboundAgency", title: "How to Choose a B2B Outbound Agency" },
  { slug: "how-to-choose-b2b-lead-generation-agency-india", key: "guideHowToChooseB2bLeadGenerationAgencyIndia", title: "How to Choose a B2B Lead Generation Agency in India" },
  { slug: "how-to-set-up-vibe-prospecting", key: "guideHowToSetUpVibeProspecting", title: "How to Set Up Vibe Prospecting on Claude for B2B Leads" },
  { slug: "job-applications-sales-funnel", key: "guideJobApplicationsSalesFunnel", title: "Job Applications Are a Sales Funnel" },
  { slug: "leads-on-autopilot-guide", key: "guideLeadsOnAutopilotGuide", title: "Leads on Autopilot: A Step-by-Step Framework" },
  { slug: "linkedin-content-to-calls-starter-kit", key: "guideLinkedinContentToCallsStarterKit", title: "The LinkedIn Content-to-Calls Starter Kit" },
  { slug: "outbound-meme-prompt-kit", key: "guideOutboundMemePromptKit", title: "The Outbound Meme Prompt Kit" },
  { slug: "smartlead-setup", key: "guideSmartleadSetup", title: "How to Set Up Smartlead for Cold Email" },
];

for (const { slug, key, title } of GUIDES) {
  const dir = `app/resources/guides/${slug}`;
  console.log(`Extracting ${slug}...`);
  execFileSync("node", ["scripts/admin/extract-page-copy.mjs", dir, key, title, "guides"], {
    cwd: root,
    stdio: "inherit",
  });
}

// Write an index barrel file in content/page-copy/schemas/index.ts
const barrel = GUIDES.map((g) => `export { ${g.key}Schema } from "./${g.key}";`).join("\n") + "\n";
fs.writeFileSync(path.join(root, "content/page-copy/schemas/index.ts"), barrel);
console.log("Wrote content/page-copy/schemas/index.ts");
