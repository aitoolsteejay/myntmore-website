// Runs extract-page-copy.mjs across all 13 interactive tools and the tools hub.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");

export const TOOLS = [
  { dir: "app/tools/cold-email-inbox-calculator", key: "toolColdEmailInboxCalculator", title: "Cold Email Inbox Calculator" },
  { dir: "app/tools/cold-email-roi-calculator", key: "toolColdEmailRoiCalculator", title: "Cold Email ROI Calculator" },
  { dir: "app/tools/battle-card-generator", key: "toolBattleCardGenerator", title: "Competitive Battlecard Generator" },
  { dir: "app/tools/case-study-generator", key: "toolCaseStudyGenerator", title: "B2B Case Study Generator" },
  { dir: "app/tools/dm-angle-generator", key: "toolDmAngleGenerator", title: "Cold DM Angle Generator" },
  { dir: "app/tools/founder-presence-analyzer", key: "toolFounderPresenceAnalyzer", title: "Founder Presence Analyzer" },
  { dir: "app/tools/icp-builder", key: "toolIcpBuilder", title: "Interactive ICP Builder" },
  { dir: "app/tools/lead-magnet-ideas", key: "toolLeadMagnetIdeas", title: "B2B Lead Magnet Idea Generator" },
  { dir: "app/tools/linkedin-hook-grader", key: "toolLinkedinHookGrader", title: "LinkedIn Hook Grader" },
  { dir: "app/tools/linkedin-optimizer", key: "toolLinkedinOptimizer", title: "LinkedIn Profile Optimizer" },
  { dir: "app/tools/posting-rhythm-builder", key: "toolPostingRhythmBuilder", title: "LinkedIn Posting Rhythm Builder" },
  { dir: "app/tools/prospect-research", key: "toolProspectResearch", title: "Free Prospect Research Tool" },
  { dir: "app/tools/roi-calculator", key: "toolRoiCalculator", title: "B2B Outbound ROI Calculator" },
  { dir: "app/resources/tools", key: "toolHub", title: "Free Growth Tools" },
];

for (const { dir, key, title } of TOOLS) {
  console.log(`Extracting ${dir}...`);
  execFileSync("node", ["scripts/admin/extract-page-copy.mjs", dir, key, title, "tools"], {
    cwd: root,
    stdio: "inherit",
  });
}

// Update the index barrel file in content/page-copy/schemas/index.ts to include tool schemas
const schemasDir = path.join(root, "content/page-copy/schemas");
const files = fs.readdirSync(schemasDir).filter((f) => f.endsWith(".ts") && f !== "index.ts").sort();
const barrel = files.map((f) => {
  const name = f.replace(/\.ts$/, "");
  return `export { ${name}Schema } from "./${name}";`;
}).join("\n") + "\n";

fs.writeFileSync(path.join(schemasDir, "index.ts"), barrel);
console.log("Updated content/page-copy/schemas/index.ts with all schemas");
