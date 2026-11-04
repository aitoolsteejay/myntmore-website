// The ten steps of the done-for-you cold email process. Kept in a plain module
// (no icons, no "use client") so the interactive explorer and the server-rendered
// page can share it: the page turns the same steps into HowTo structured data,
// so the schema always matches what the explorer shows.

import d from "@/content/service-copy/cold-email.json";

export interface ProcessStep {
  short: string;
  title: string;
  summary: string;
  points: { label: string; text: string }[];
  result: string;
}

export const PROCESS_STEPS: ProcessStep[] = d.process.steps;
