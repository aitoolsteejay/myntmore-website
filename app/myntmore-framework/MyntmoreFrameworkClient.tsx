"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import InnerLayout from "../components/InnerLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildHowToSchema } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import pageCopy from "@/content/page-copy/myntmoreFramework.json";

// This page's text is edited in the admin ("The Myntmore Framework") and lives in content/page-copy/myntmoreFramework.json.
const copy = pageCopy;

/* ─── Icons (technical/glyph style, not emoji) ────────────────── */

const I = { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.8 } as const;

function IconTarget() { return <svg {...I}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /></svg>; }
function IconSearch() { return <svg {...I}><circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M21 21l-4.3-4.3" /></svg>; }
function IconDocument() { return <svg {...I}><rect x="5" y="3.5" width="14" height="17" rx="2" /><path strokeLinecap="round" d="M8.5 9h7M8.5 13h7M8.5 17h4" /></svg>; }
function IconBranch() { return <svg {...I}><circle cx="6" cy="6" r="2.4" /><circle cx="6" cy="18" r="2.4" /><circle cx="18" cy="12" r="2.4" /><path strokeLinecap="round" d="M6 8.4V15.6M8.2 7.2L15.8 10.8M8.2 16.8L15.8 13.2" /></svg>; }
function IconDatabase() { return <svg {...I}><ellipse cx="12" cy="6" rx="7.5" ry="2.8" /><path strokeLinecap="round" d="M4.5 6v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6M4.5 12v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-6" /></svg>; }
function IconUser() { return <svg {...I}><circle cx="12" cy="8" r="3.6" /><path strokeLinecap="round" d="M4.5 20c0-4.1 3.4-6.6 7.5-6.6s7.5 2.5 7.5 6.6" /></svg>; }
function IconSparkle() { return <svg {...I}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" /></svg>; }
function IconShield() { return <svg {...I}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.2-3 7.4-7 9-4-1.6-7-4.8-7-9V6l7-3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg>; }
function IconSend() { return <svg {...I}><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" /><path strokeLinecap="round" strokeLinejoin="round" d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>; }
function IconHourglass() { return <svg {...I}><path strokeLinecap="round" strokeLinejoin="round" d="M6.5 3h11M6.5 21h11M7.5 3c0 4.5 4.5 5.2 4.5 9s-4.5 4.5-4.5 9M16.5 3c0 4.5-4.5 5.2-4.5 9s4.5 4.5 4.5 9" /></svg>; }
function IconClock() { return <svg {...I}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
function IconChart() { return <svg {...I}><path strokeLinecap="round" strokeLinejoin="round" d="M4 20V11M11 20V4M18 20v-6M3 20h18" /></svg>; }
function IconStop() { return <svg {...I}><rect x="6" y="6" width="12" height="12" rx="2.5" /></svg>; }
function IconGauge() { return <svg {...I}><path strokeLinecap="round" d="M4 16a8 8 0 1116 0" /><path strokeLinecap="round" d="M12 16l4-5" /><circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none" /></svg>; }
function IconFilter() { return <svg {...I}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16l-6 8v6l-4 2v-8L4 5z" /></svg>; }
function IconWarning() { return <svg {...I}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l10 18H2L12 3z" /><path strokeLinecap="round" d="M12 9.5v4.5" /><circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" /></svg>; }
function IconLoop() { return <svg {...I}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0114.13-5.36M20 15a9 9 0 01-14.13 5.36" /></svg>; }
function IconTable() { return <svg {...I}><rect x="3.5" y="4.5" width="17" height="15" rx="2" /><path strokeLinecap="round" d="M3.5 9.5h17M3.5 14.5h17M9.5 4.5v15" /></svg>; }
function IconBolt() { return <svg {...I}><path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>; }
function IconCheckCircle() { return <svg {...I}><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.5 2.5 4.5-5" /></svg>; }
function IconMerge() { return <svg {...I}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h5l5 6-5 6H4M14 12h6m0 0l-3-3m3 3l-3 3" /></svg>; }
function IconGlobe() { return <svg {...I}><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" /></svg>; }
function IconMemory() { return <svg {...I}><rect x="4" y="6" width="16" height="12" rx="2" /><path strokeLinecap="round" d="M8 6V3.5M12 6V3.5M16 6V3.5M8 20.5V18M12 20.5V18M16 20.5V18M8 10h8M8 14h5" /></svg>; }
function IconSort() { return <svg {...I}><path strokeLinecap="round" d="M4 7h16M4 12h10M4 17h5" /></svg>; }
function IconChat() { return <svg {...I}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v8a2.5 2.5 0 01-2.5 2.5H10l-5 4v-4H6.5A2.5 2.5 0 014 13.5v-8z" /></svg>; }
function IconCalendar() { return <svg {...I}><rect x="3.5" y="5" width="17" height="15" rx="2" /><path strokeLinecap="round" d="M3.5 10h17M8 3v4M16 3v4" /></svg>; }

/* ─── Canvas geometry ────────────────────────────────────────── */

const TILE = 64;
const AI_W = 150;
const SUB = 44;
const CANVAS_W = 3900;
const CANVAS_H = 1580;
const MIN_ZOOM = 0.12;
const MAX_ZOOM = 1.6;
const FIT_PADDING = 40;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

type Shape = "trigger" | "regular" | "if" | "end" | "ai" | "sub";

interface FNode {
  id: string;
  title: string;
  type: string;
  desc?: string;
  meta?: string;
  icon: React.ReactNode;
  accent: string;
  x: number;
  y: number;
  w: number;
  h: number;
  shape: Shape;
  narrative?: boolean;
  disabled?: boolean;
}

function N(id: string, title: string, type: string, icon: React.ReactNode, accent: string, x: number, y: number, shape: Shape = "regular", extra: Partial<FNode> = {}): FNode {
  const w = shape === "ai" ? AI_W : shape === "sub" ? SUB : TILE;
  const h = shape === "sub" ? SUB : TILE;
  return { id, title, type, icon, accent, x, y, w, h, shape, ...extra };
}

const C = {
  yellow: "#F5B731",
  purple: "#7C3AED",
  blue: "#3b82f6",
  linkedin: "#0A66C2",
  cyan: "#0891B2",
  sky: "#0EA5E9",
  indigo: "#6366f1",
  amber: "#F59E0B",
  orange: "#D97706",
  green: "#16A34A",
  emerald: "#10B981",
  red: "#DC2626",
  grey: "#9199A8",
} as const;

/* Row positions for the four parallel enrichment branches */
const ROW = [140, 345, 550, 755];
const COL = [1660, 1830, 2000, 2170, 2340];

const RAW_NODES: FNode[] = [
  /* ── Group A: prospect discovery ─────────────────────────── */
  N("sched1", "Schedule Trigger", "trigger.schedule", <IconClock />, C.yellow, 130, 300, "trigger", { meta: "Daily 08:00 IST" }),
  N("icp", "ICP Agent", "ai.agent", <IconTarget />, C.yellow, 300, 300, "ai", { narrative: true, meta: "Defines who we target",
    desc: copy.MyntmoreFrameworkClient_s01.t01 }),
  N("model1", "OpenAI Chat Model", "ai.model", <IconSparkle />, C.emerald, 300, 440, "sub"),
  N("parser1", "Structured Output Parser", "ai.parser", <IconDocument />, C.indigo, 416, 440, "sub"),
  N("ratelimit", "Check Rate Limit", "api.rateLimit", <IconGauge />, C.cyan, 560, 300, "regular", { meta: "1,000 req/day" ,
    desc: copy.MyntmoreFrameworkClient_s01.t02 }),
  N("search", "Search LinkedIn", "linkedin.search", <IconSearch />, C.blue, 730, 300, "regular", { narrative: true, meta: "title + industry + headcount",
    desc: copy.MyntmoreFrameworkClient_s01.t03 }),
  N("scrape", "Scrape Prospect List", "prospect.scrape", <IconDocument />, C.blue, 900, 300, "regular",
    { desc: copy.MyntmoreFrameworkClient_s01.t04 }),
  N("normalize", "Normalize Data", "prospect.normalize", <IconFilter />, C.cyan, 1070, 300, "regular",
    { desc: copy.MyntmoreFrameworkClient_s01.t05 }),
  N("iffilter", "Matches ICP?", "icp.filter", <IconBranch />, C.amber, 1240, 300, "if",
    { desc: copy.MyntmoreFrameworkClient_s01.t06 }),
  N("discard", "Discard Lead", "icp.discard", <IconStop />, C.grey, 1330, 470, "end"),

  /* ── Loop and four enrichment branches ───────────────────── */
  N("loop", "Loop Over Prospects", "loop.batch", <IconLoop />, C.purple, 1460, 300, "regular", { meta: "batch 25" }),

  N("getweb", "Get Company Website", "http.request", <IconGlobe />, C.sky, COL[0], ROW[0]),
  N("ifweb", "Website not empty?", "if.check", <IconBranch />, C.amber, COL[1], ROW[0], "if"),
  N("scrapeweb", "Scrape Website", "html.extract", <IconDocument />, C.blue, COL[2], ROW[0]),
  N("sumweb", "Summarize Company", "ai.summarize", <IconSparkle />, C.purple, COL[3], ROW[0]),
  N("updweb", "Update Row", "sheet.update", <IconTable />, C.green, COL[4], ROW[0]),

  N("getposts", "Get Recent Posts", "linkedin.posts", <IconUser />, C.linkedin, COL[0], ROW[1]),
  N("ifposts", "Posts not empty?", "if.check", <IconBranch />, C.amber, COL[1], ROW[1], "if"),
  N("loopposts", "Loop Over Posts", "loop.batch", <IconLoop />, C.purple, COL[2], ROW[1]),
  N("sumposts", "Summarize Activity", "ai.summarize", <IconSparkle />, C.purple, COL[3], ROW[1]),
  N("updposts", "Update Row", "sheet.update", <IconTable />, C.green, COL[4], ROW[1]),

  N("getnews", "Get Company News", "news.search", <IconSearch />, C.blue, COL[0], ROW[2]),
  N("ifnews", "News not empty?", "if.check", <IconBranch />, C.amber, COL[1], ROW[2], "if"),
  N("aggnews", "Aggregate", "data.aggregate", <IconFilter />, C.cyan, COL[2], ROW[2]),
  N("sumnews", "Summarize News", "ai.summarize", <IconSparkle />, C.purple, COL[3], ROW[2]),
  N("updnews", "Update Row", "sheet.update", <IconTable />, C.green, COL[4], ROW[2]),

  N("getmutual", "Get Mutual Connections", "linkedin.mutual", <IconUser />, C.linkedin, COL[0], ROW[3]),
  N("ifmutual", "Any mutuals?", "if.check", <IconBranch />, C.amber, COL[1], ROW[3], "if"),
  N("aggmutual", "Aggregate", "data.aggregate", <IconFilter />, C.cyan, COL[2], ROW[3]),
  N("warmth", "Score Warmth", "score.warmth", <IconGauge />, C.orange, COL[3], ROW[3]),
  N("updmutual", "Update Row", "sheet.update", <IconTable />, C.green, COL[4], ROW[3]),

  /* ── Merge, score, personalize ───────────────────────────── */
  N("merge", "Merge", "merge.wait", <IconMerge />, C.grey, 2540, 405, "regular", { meta: "wait for all 4" }),
  N("leadscore", "Lead Score Agent", "ai.agent", <IconSparkle />, C.indigo, 2710, 405, "ai", { narrative: true, meta: "0 to 100",
    desc: copy.MyntmoreFrameworkClient_s01.t07 }),
  N("model2", "OpenAI Chat Model", "ai.model", <IconSparkle />, C.emerald, 2710, 545, "sub"),
  N("memory1", "Window Memory", "ai.memory", <IconMemory />, C.indigo, 2826, 545, "sub"),
  N("ifscore", "Score above 70?", "if.threshold", <IconBranch />, C.amber, 2960, 405, "if"),
  N("personalize", "Personalized Note Agent", "ai.agent", <IconSparkle />, C.purple, 3130, 405, "ai", { narrative: true, meta: "under 300 chars",
    desc: copy.MyntmoreFrameworkClient_s01.t08 }),
  N("model3", "OpenAI Chat Model", "ai.model", <IconSparkle />, C.emerald, 3130, 545, "sub"),
  N("queue", "Add to Send Queue", "sheet.append", <IconTable />, C.green, 3380, 405),
  N("archive1", "Archive Lead", "lead.archive", <IconStop />, C.grey, 3010, 640, "end"),

  /* ── Group B: send connection requests ───────────────────── */
  N("sched2", "Schedule Trigger", "trigger.schedule", <IconClock />, C.yellow, 130, 980, "trigger", { meta: "09:00 to 18:00, random gaps" }),
  N("getqueue", "Get Queued Leads", "sheet.read", <IconTable />, C.green, 300, 980),
  N("sort", "Sort by Score", "data.sort", <IconSort />, C.cyan, 470, 980),
  N("limit", "Limit 25 / day", "data.limit", <IconGauge />, C.cyan, 640, 980),
  N("safety", "Human Behaviour Engine", "safety.humanize", <IconShield />, C.green, 810, 980, "regular", { narrative: true, meta: "45 to 180 s jitter",
    desc: copy.MyntmoreFrameworkClient_s01.t09 }),
  N("connect", "Send Connection Request", "linkedin.connect", <IconSend />, C.linkedin, 980, 980, "regular", { narrative: true,
    desc: copy.MyntmoreFrameworkClient_s01.t10 }),
  N("updsent", "Update Status", "sheet.update", <IconTable />, C.green, 1150, 980),
  N("senderror", "Log Send Error", "error.log", <IconWarning />, C.red, 980, 1130, "end"),

  /* ── Group C: check the connections ──────────────────────── */
  N("sched3", "Schedule Trigger", "trigger.schedule", <IconClock />, C.yellow, 1510, 980, "trigger", { meta: "Every 6 h" }),
  N("getpending", "Get Pending Requests", "sheet.read", <IconTable />, C.green, 1680, 980),
  N("ifaccepted", "Connection Accepted?", "linkedin.checkStatus", <IconBranch />, C.amber, 1850, 980, "if",
    { desc: copy.MyntmoreFrameworkClient_s01.t11 }),
  N("markacc", "Mark Accepted", "sheet.update", <IconCheckCircle />, C.green, 2020, 980),
  N("notify", "Notify Dashboard", "dashboard.event", <IconChart />, C.green, 2190, 980),
  N("wait", "Wait 24 h", "flow.wait", <IconHourglass />, C.linkedin, 1850, 1130, "regular", { meta: "re-check, max 14 days",
    desc: copy.MyntmoreFrameworkClient_s01.t12 }),

  /* ── Group D: follow-ups ─────────────────────────────────── */
  N("sched4", "Schedule Trigger", "trigger.schedule", <IconClock />, C.yellow, 2490, 980, "trigger", { meta: "Daily 10:00" }),
  N("getacc", "Accepted, No Reply", "sheet.read", <IconTable />, C.green, 2660, 980),
  N("ifdays", "3 days passed?", "if.check", <IconBranch />, C.amber, 2830, 980, "if"),
  N("humanize", "Humanize Timing", "safety.humanize", <IconShield />, C.green, 3000, 980),
  N("followup1", "Send Follow-Up #1", "linkedin.followUp1", <IconClock />, C.orange, 3170, 980, "regular", { narrative: true,
    desc: copy.MyntmoreFrameworkClient_s01.t13 }),
  N("ifreplied", "Replied?", "if.check", <IconBranch />, C.amber, 3340, 980, "if"),
  N("followup2", "Send Follow-Up #2", "linkedin.followUp2", <IconClock />, C.orange, 3510, 980, "regular", { meta: "adds something new",
    desc: copy.MyntmoreFrameworkClient_s01.t14 }),
  N("log", "Log to Dashboard", "dashboard.log", <IconChart />, C.green, 3680, 980, "regular",
    { desc: copy.MyntmoreFrameworkClient_s01.t15 }),
  N("handoff", "Hand Off to Human", "crm.assign", <IconUser />, C.purple, 3340, 1130),
  N("slack", "Slack Alert", "slack.message", <IconSend />, C.green, 3510, 1130),

  /* ── Group E: conversation agent ─────────────────────────── */
  N("webhook", "Reply Webhook", "trigger.webhook", <IconBolt />, C.yellow, 130, 1330, "trigger", { meta: "fires on inbound reply" }),
  N("replyagent", "Reply Agent", "ai.agent", <IconChat />, C.purple, 300, 1330, "ai", { meta: "drafts, never auto-sends" }),
  N("model4", "OpenAI Chat Model", "ai.model", <IconSparkle />, C.emerald, 300, 1470, "sub"),
  N("memory2", "Thread Memory", "ai.memory", <IconMemory />, C.indigo, 416, 1470, "sub"),
  N("ifintent", "Intent?", "if.intent", <IconBranch />, C.amber, 560, 1330, "if"),
  N("book", "Book Meeting", "calendar.create", <IconCalendar />, C.green, 730, 1280),
  N("nurture", "Add to Nurture", "sheet.update", <IconTable />, C.orange, 730, 1400),

  /* ── Leftovers, tests, and the error workflow ─────────────── */
  N("manual", "Manual Trigger", "trigger.manual", <IconBolt />, C.grey, 2560, 110, "trigger", { meta: "testing only" }),
  N("sample", "Get 5 Sample Leads", "sheet.read", <IconTable />, C.green, 2730, 110, "regular", { meta: "limit 5" }),
  N("debug", "Debug Output", "flow.noop", <IconDocument />, C.grey, 2900, 110),
  N("oldscore", "Lead Score v2 (old)", "ai.agent", <IconSparkle />, C.grey, 3420, 150, "ai", { meta: "replaced in v3", disabled: true }),
  N("modelold", "GPT-4o mini", "ai.model", <IconSparkle />, C.grey, 3440, 280, "sub", { disabled: true }),
  N("noop", "No Operation", "flow.noop", <IconStop />, C.grey, 1470, 640, "regular", { meta: "do nothing" }),
  N("setfields", "Edit Fields", "data.set", <IconFilter />, C.cyan, 2210, 1330, "regular", { meta: "3 fields" }),
  N("followup3", "Send Follow-Up #3", "linkedin.followUp3", <IconClock />, C.grey, 3690, 1130, "regular", { meta: "off since Aug", disabled: true }),
  N("errtrig", "Error Trigger", "trigger.error", <IconWarning />, C.red, 1110, 1340, "trigger"),
  N("fmterr", "Format Error", "code.js", <IconDocument />, C.cyan, 1280, 1340),
  N("errslack", "Slack #alerts", "slack.message", <IconSend />, C.green, 1450, 1340),
];

/* Deterministic nudge so nothing sits perfectly on the grid */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function jitter(id: string, range: number, salt: number): number {
  return ((hash(id + salt) % 1000) / 1000 - 0.5) * 2 * range;
}
const NODES: FNode[] = RAW_NODES.map((n) => ({
  ...n,
  x: Math.round(n.x + jitter(n.id, n.shape === "sub" ? 10 : 18, 1)),
  y: Math.round(n.y + jitter(n.id, n.shape === "sub" ? 8 : 26, 2)),
}));

const NODE_MAP: Record<string, FNode> = Object.fromEntries(NODES.map((n) => [n.id, n]));
const NARRATIVE_NODES = NODES.filter((n) => n.narrative);

type Kind = "line" | "true" | "false" | "error" | "sub" | "loop";
interface FConn { from: string; to: string; kind: Kind; via?: number; }

function chain(kind: Kind, ...ids: string[]): FConn[] {
  const out: FConn[] = [];
  for (let i = 0; i < ids.length - 1; i++) out.push({ from: ids[i], to: ids[i + 1], kind });
  return out;
}

const CONNECTIONS: FConn[] = [
  ...chain("line", "sched1", "icp", "ratelimit", "search", "scrape", "normalize", "iffilter"),
  { from: "model1", to: "icp", kind: "sub" },
  { from: "parser1", to: "icp", kind: "sub" },
  { from: "iffilter", to: "loop", kind: "true" },
  { from: "iffilter", to: "discard", kind: "false" },

  { from: "loop", to: "getweb", kind: "line" },
  { from: "loop", to: "getposts", kind: "line" },
  { from: "loop", to: "getnews", kind: "line" },
  { from: "loop", to: "getmutual", kind: "line" },

  { from: "getweb", to: "ifweb", kind: "line" },
  { from: "ifweb", to: "scrapeweb", kind: "true" },
  { from: "ifweb", to: "updweb", kind: "false" },
  ...chain("line", "scrapeweb", "sumweb", "updweb"),

  { from: "getposts", to: "ifposts", kind: "line" },
  { from: "ifposts", to: "loopposts", kind: "true" },
  { from: "ifposts", to: "updposts", kind: "false" },
  ...chain("line", "loopposts", "sumposts", "updposts"),

  { from: "getnews", to: "ifnews", kind: "line" },
  { from: "ifnews", to: "aggnews", kind: "true" },
  { from: "ifnews", to: "updnews", kind: "false" },
  ...chain("line", "aggnews", "sumnews", "updnews"),

  { from: "getmutual", to: "ifmutual", kind: "line" },
  { from: "ifmutual", to: "aggmutual", kind: "true" },
  { from: "ifmutual", to: "updmutual", kind: "false" },
  ...chain("line", "aggmutual", "warmth", "updmutual"),

  { from: "updweb", to: "merge", kind: "line" },
  { from: "updposts", to: "merge", kind: "line" },
  { from: "updnews", to: "merge", kind: "line" },
  { from: "updmutual", to: "merge", kind: "line" },
  { from: "merge", to: "leadscore", kind: "line" },
  { from: "model2", to: "leadscore", kind: "sub" },
  { from: "memory1", to: "leadscore", kind: "sub" },
  { from: "leadscore", to: "ifscore", kind: "line" },
  { from: "ifscore", to: "personalize", kind: "true" },
  { from: "ifscore", to: "archive1", kind: "false" },
  { from: "model3", to: "personalize", kind: "sub" },
  { from: "personalize", to: "queue", kind: "line" },
  { from: "queue", to: "loop", kind: "loop", via: 875 },

  ...chain("line", "sched2", "getqueue", "sort", "limit", "safety", "connect", "updsent"),
  { from: "connect", to: "senderror", kind: "error" },

  ...chain("line", "sched3", "getpending", "ifaccepted"),
  { from: "ifaccepted", to: "markacc", kind: "true" },
  { from: "ifaccepted", to: "wait", kind: "false" },
  { from: "markacc", to: "notify", kind: "line" },
  { from: "wait", to: "getpending", kind: "loop" },

  ...chain("line", "sched4", "getacc", "ifdays"),
  { from: "ifdays", to: "humanize", kind: "true" },
  ...chain("line", "humanize", "followup1", "ifreplied"),
  { from: "ifreplied", to: "followup2", kind: "false" },
  { from: "ifreplied", to: "handoff", kind: "true" },
  { from: "followup2", to: "log", kind: "line" },
  { from: "handoff", to: "slack", kind: "line" },

  ...chain("line", "webhook", "replyagent", "ifintent"),
  { from: "model4", to: "replyagent", kind: "sub" },
  { from: "memory2", to: "replyagent", kind: "sub" },
  { from: "ifintent", to: "book", kind: "true" },
  { from: "ifintent", to: "nurture", kind: "false" },

  ...chain("line", "manual", "sample", "debug"),
  { from: "modelold", to: "oldscore", kind: "sub" },
  { from: "followup2", to: "followup3", kind: "line" },
  { from: "notify", to: "setfields", kind: "line" },
  { from: "setfields", to: "log", kind: "line" },
  ...chain("line", "errtrig", "fmterr", "errslack"),
  { from: "senderror", to: "errtrig", kind: "error" },
];

function outPoint(n: FNode, kind: Kind): [number, number] {
  if (kind === "sub") return [n.x + n.w / 2, n.y];
  if (n.shape === "if") return [n.x + n.w, n.y + n.h * (kind === "false" ? 0.72 : 0.28)];
  if (kind === "error") return [n.x + n.w / 2, n.y + n.h];
  return [n.x + n.w, n.y + n.h / 2];
}

function connPath(c: FConn): string {
  const a = NODE_MAP[c.from];
  const b = NODE_MAP[c.to];
  const [x1, y1] = outPoint(a, c.kind);

  if (c.kind === "sub") {
    const x2 = b.x + b.w / 2 + (a.x + a.w / 2 - (b.x + b.w / 2)) * 0.4;
    const y2 = b.y + b.h;
    return `M${x1} ${y1} C ${x1} ${y1 - 30}, ${x2} ${y2 + 30}, ${x2} ${y2}`;
  }
  if (c.kind === "error") {
    const x2 = b.x + b.w / 2, y2 = b.y;
    return `M${x1} ${y1} C ${x1} ${y1 + 40}, ${x2} ${y2 - 40}, ${x2} ${y2}`;
  }
  if (c.kind === "loop") {
    const x2 = b.x, y2 = b.y + b.h / 2;
    const drop = c.via ?? Math.max(a.y, b.y) + a.h + 120;
    const r = 22;
    const xa = x1 + 44;
    const xb = x2 - 44;
    return [
      `M${x1} ${y1}`,
      `H${xa - r} Q${xa} ${y1} ${xa} ${y1 + r}`,
      `V${drop - r} Q${xa} ${drop} ${xa - r} ${drop}`,
      `H${xb + r} Q${xb} ${drop} ${xb} ${drop - r}`,
      `V${y2 + r} Q${xb} ${y2} ${xb + r} ${y2}`,
      `H${x2}`,
    ].join(" ");
  }
  const x2 = b.x, y2 = b.y + b.h / 2;
  const dx = Math.max(40, Math.abs(x2 - x1) * 0.5);
  return `M${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

/* ─── Groups, stickies ───────────────────────────────────────── */

interface Group { x: number; y: number; w: number; h: number; title: string; color: string; }
const GROUPS: Group[] = [
  { x: 80, y: 190, w: 1300, h: 400, title: copy.MyntmoreFrameworkClient_s01.t16, color: "#B8860B" },
  { x: 1600, y: 0, w: 900, h: 890, title: copy.MyntmoreFrameworkClient_s01.t17, color: "#16A34A" },
  { x: 2500, y: 330, w: 1000, h: 380, title: copy.MyntmoreFrameworkClient_s01.t18, color: "#6366f1" },
  { x: 70, y: 890, w: 1330, h: 300, title: copy.MyntmoreFrameworkClient_s01.t19, color: "#B8860B" },
  { x: 1350, y: 866, w: 1040, h: 340, title: copy.MyntmoreFrameworkClient_s01.t20, color: "#B8860B" },
  { x: 2430, y: 872, w: 1440, h: 336, title: copy.MyntmoreFrameworkClient_s01.t21, color: "#B8860B" },
  { x: 80, y: 1230, w: 900, h: 320, title: copy.MyntmoreFrameworkClient_s01.t22, color: "#B8860B" },
];

interface Sticky { x: number; y: number; w: number; h?: number; title?: string; text: string; color: "green" | "yellow" | "blue" | "grey"; rot?: number; }
const STICKIES: Sticky[] = [
  { x: 80, y: 20, w: 420, color: "grey", title: copy.MyntmoreFrameworkClient_s01.t23, text: copy.MyntmoreFrameworkClient_s01.t24 },
  { x: 1660, y: 40, w: 250, color: "green", title: copy.MyntmoreFrameworkClient_s01.t25, text: copy.MyntmoreFrameworkClient_s01.t26 },
  { x: 1940, y: 40, w: 250, color: "green", title: copy.MyntmoreFrameworkClient_s01.t27, text: copy.MyntmoreFrameworkClient_s01.t28 },
  { x: 2220, y: 40, w: 250, color: "green", title: copy.MyntmoreFrameworkClient_s01.t29, text: copy.MyntmoreFrameworkClient_s01.t30 },
  { x: 2560, y: 40, w: 300, rot: 1.5, color: "grey", text: copy.MyntmoreFrameworkClient_s01.t31 },
  { x: 1120, y: 1440, w: 300, rot: -1, color: "yellow", text: copy.MyntmoreFrameworkClient_s01.t32 },
  { x: 2560, y: 724, w: 320, rot: -0.6, color: "blue", text: copy.MyntmoreFrameworkClient_s01.t33 },
  { x: 2960, y: 250, w: 260, rot: -2, color: "yellow", text: copy.MyntmoreFrameworkClient_s01.t34 },
  { x: 130, y: 1130, w: 420, rot: 1.2, color: "yellow", text: copy.MyntmoreFrameworkClient_s01.t35 },
  { x: 2020, y: 1120, w: 320, rot: -1.4, color: "blue", text: copy.MyntmoreFrameworkClient_s01.t36 },
  { x: 100, y: 1258, w: 600, rot: 0.4, color: "blue", text: copy.MyntmoreFrameworkClient_s01.t37 },
];

const STICKY_STYLE: Record<Sticky["color"], { bg: string; border: string; title: string; text: string }> = {
  green: { bg: "#F0FDF4", border: "rgba(22,163,74,0.35)", title: "#166534", text: "#14532D" },
  yellow: { bg: "#FEF9EC", border: "rgba(245,183,49,0.5)", title: "#A14A08", text: "#52525B" },
  blue: { bg: "#EFF6FF", border: "rgba(59,130,246,0.35)", title: "#1D4ED8", text: "#1E3A8A" },
  grey: { bg: "#F8F6F2", border: "#E8E2D9", title: "#3D3D3D", text: "#52525B" },
};

/* Order the "Execute workflow" button walks through */
const EXEC_ORDER = [
  "sched1", "icp", "ratelimit", "search", "scrape", "normalize", "iffilter", "loop",
  "getweb", "getposts", "getnews", "getmutual",
  "ifweb", "ifposts", "ifnews", "ifmutual",
  "scrapeweb", "loopposts", "aggnews", "aggmutual",
  "sumweb", "sumposts", "sumnews", "warmth",
  "updweb", "updposts", "updnews", "updmutual",
  "merge", "leadscore", "ifscore", "personalize", "queue",
  "sched2", "getqueue", "sort", "limit", "safety", "connect", "updsent",
  "sched3", "getpending", "ifaccepted", "markacc", "notify",
  "sched4", "getacc", "ifdays", "humanize", "followup1", "ifreplied", "followup2", "log",
];

const HOWTO_SCHEMA = buildHowToSchema(
  "The Myntmore Framework",
  NARRATIVE_NODES.map((n) => ({ name: n.title, text: n.desc ?? "" }))
);

/* ─── Page ──────────────────────────────────────────────────── */

interface CanvasView { zoom: number; x: number; y: number; }

export default function MyntmoreFrameworkClient() {
  const [active, setActive] = useState<string | null>(null);
  const [view, setView] = useState<CanvasView>({ zoom: 1, x: 0, y: 0 });
  const [vp, setVp] = useState({ w: 1, h: 1 });
  const [runStep, setRunStep] = useState<number>(-1);
  const viewportRef = useRef<HTMLDivElement>(null);
  const interactedRef = useRef(false);
  const pinnedRef = useRef(false);
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const gestureRef = useRef<{
    mode: "none" | "pan" | "pinch";
    startX: number; startY: number; startViewX: number; startViewY: number;
    startDist: number; startZoom: number; canvasMidX: number; canvasMidY: number;
    moved: boolean;
  }>({ mode: "none", startX: 0, startY: 0, startViewX: 0, startViewY: 0, startDist: 0, startZoom: 1, canvasMidX: 0, canvasMidY: 0, moved: false });

  const running = runStep >= 0 && runStep < EXEC_ORDER.length;
  const doneSet = new Set(EXEC_ORDER.slice(0, Math.max(0, runStep)));
  const currentId = running ? EXEC_ORDER[runStep] : null;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setRunStep((s) => s + 1), 170);
    return () => clearTimeout(t);
  }, [running, runStep]);

  useEffect(() => {
    if (runStep !== EXEC_ORDER.length) return;
    const t = setTimeout(() => setRunStep(-1), 2600);
    return () => clearTimeout(t);
  }, [runStep]);

  const fitToView = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const vw = el.clientWidth;
    const vh = el.clientHeight;
    if (!vw || !vh) return;
    setVp({ w: vw, h: vh });
    const scale = clamp(Math.min((vw - FIT_PADDING) / CANVAS_W, (vh - FIT_PADDING) / CANVAS_H), MIN_ZOOM, MAX_ZOOM);
    setView({ zoom: scale, x: (vw - CANVAS_W * scale) / 2, y: (vh - CANVAS_H * scale) / 2 });
  }, []);

  useEffect(() => {
    fitToView();
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setVp({ w: el.clientWidth, h: el.clientHeight });
      if (!interactedRef.current) fitToView();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [fitToView]);

  const zoomAt = useCallback((px: number, py: number, factor: number) => {
    setView((v) => {
      const newZoom = clamp(v.zoom * factor, MIN_ZOOM, MAX_ZOOM);
      const canvasX = (px - v.x) / v.zoom;
      const canvasY = (py - v.y) / v.zoom;
      return { zoom: newZoom, x: px - canvasX * newZoom, y: py - canvasY * newZoom };
    });
    interactedRef.current = true;
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      const rect = el!.getBoundingClientRect();
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      zoomAt(e.clientX - rect.left, e.clientY - rect.top, factor);
    }
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [zoomAt]);

  function baselinePinch(pts: { x: number; y: number }[]) {
    const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    const midX = (pts[0].x + pts[1].x) / 2, midY = (pts[0].y + pts[1].y) / 2;
    const rect = viewportRef.current!.getBoundingClientRect();
    const px = midX - rect.left, py = midY - rect.top;
    gestureRef.current = {
      ...gestureRef.current, mode: "pinch", startDist: dist, startZoom: view.zoom,
      canvasMidX: (px - view.x) / view.zoom, canvasMidY: (py - view.y) / view.zoom, moved: false,
    };
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button")) return;
    try { (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId); } catch { /* synthetic events */ }
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = Array.from(pointersRef.current.values());
    if (pts.length === 1) {
      gestureRef.current = { ...gestureRef.current, mode: "pan", startX: e.clientX, startY: e.clientY, startViewX: view.x, startViewY: view.y, moved: false };
    } else if (pts.length === 2) {
      baselinePinch(pts);
    }
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gestureRef.current;
    const pts = Array.from(pointersRef.current.values());
    if (g.mode === "pan" && pts.length === 1) {
      const dx = e.clientX - g.startX, dy = e.clientY - g.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) gestureRef.current.moved = true;
      if (gestureRef.current.moved) {
        setView((v) => ({ ...v, x: g.startViewX + dx, y: g.startViewY + dy }));
        interactedRef.current = true;
      }
    } else if (g.mode === "pinch" && pts.length === 2) {
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const midX = (pts[0].x + pts[1].x) / 2, midY = (pts[0].y + pts[1].y) / 2;
      const rect = viewportRef.current!.getBoundingClientRect();
      const px = midX - rect.left, py = midY - rect.top;
      const newZoom = clamp(g.startZoom * (g.startDist > 0 ? dist / g.startDist : 1), MIN_ZOOM, MAX_ZOOM);
      setView({ zoom: newZoom, x: px - g.canvasMidX * newZoom, y: py - g.canvasMidY * newZoom });
      interactedRef.current = true;
    }
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    pointersRef.current.delete(e.pointerId);
    const pts = Array.from(pointersRef.current.values());
    if (pts.length === 0) {
      gestureRef.current.mode = "none";
    } else if (pts.length === 1) {
      gestureRef.current = { ...gestureRef.current, mode: "pan", startX: pts[0].x, startY: pts[0].y, startViewX: view.x, startViewY: view.y, moved: true };
    } else if (pts.length === 2) {
      baselinePinch(pts);
    }
  }

  function zoomButton(factor: number) {
    const el = viewportRef.current;
    if (!el) return;
    zoomAt(el.clientWidth / 2, el.clientHeight / 2, factor);
  }

  function handleFitClick() {
    interactedRef.current = false;
    fitToView();
  }

  function focusNode(id: string) {
    const el = viewportRef.current;
    const n = NODE_MAP[id];
    if (!el || !n) return;
    const zoom = 0.9;
    setView({ zoom, x: el.clientWidth / 2 - (n.x + n.w / 2) * zoom, y: el.clientHeight / 2 - (n.y + n.h / 2) * zoom });
    interactedRef.current = true;
    pinnedRef.current = true;
    setActive(id);
  }

  /* minimap geometry */
  const MINI_W = 190;
  const miniScale = MINI_W / CANVAS_W;
  const MINI_H = Math.round(CANVAS_H * miniScale);
  const miniView = {
    x: clamp((-view.x / view.zoom) * miniScale, 0, MINI_W),
    y: clamp((-view.y / view.zoom) * miniScale, 0, MINI_H),
    w: clamp((vp.w / view.zoom) * miniScale, 8, MINI_W),
    h: clamp((vp.h / view.zoom) * miniScale, 8, MINI_H),
  };

  const activeNode = active ? NODE_MAP[active] : null;

  /* connection strokes keep a constant on-screen thickness at any zoom */
  const sw = clamp(2 / view.zoom, 1.8, 5);
  const dotR = clamp(2.6 / view.zoom, 2.4, 6.5);
  const dash = `${sw * 3} ${sw * 2}`;
  const aw = clamp(7 / view.zoom, 7, 18);
  const labelPx = clamp(9 / view.zoom, 9, 15);

  return (
    <InnerLayout>
      <JsonLd data={HOWTO_SCHEMA} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-14 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.16) 0%, rgba(124,58,237,0.06) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.18) 0%, rgba(255,160,0,0.07) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: copy.MyntmoreFrameworkClient_s01.t38, href: "/myntmore-framework" }]} />

          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: "rgba(124,58,237,0.08)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#7C3AED" }} />{copy.MyntmoreFrameworkClient_s01.t39}</span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>{copy.MyntmoreFrameworkClient_s01.t40}</h1>

          <p className="text-lg sm:text-xl max-w-2xl leading-relaxed" style={{ color: "#52525B" }}>{copy.MyntmoreFrameworkClient_s01.t41}{NODES.length}{copy.MyntmoreFrameworkClient_s01.t42}</p>
        </div>
      </section>

      {/* ── Workflow canvas ───────────────────────────────────── */}
      <section className="py-12 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl border-2 overflow-hidden" style={{ borderColor: "#E8E2D9", boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}>
            {/* Window chrome */}
            <div className="flex flex-wrap items-center gap-3 px-5 py-3" style={{ backgroundColor: "#FEF9EC", borderBottom: "1px solid #E8E2D9" }}>
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
              <span className="ml-2 text-xs font-mono font-bold" style={{ color: "#0A0A0A" }}>{copy.MyntmoreFrameworkClient_s01.t43}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: "#FFFFFF", color: "#52525B", border: "1px solid #E8E2D9" }}>{copy.MyntmoreFrameworkClient_s01.t44}</span>
              <div className="hidden md:flex items-center gap-1 ml-4 p-0.5 rounded-md" style={{ backgroundColor: "#F8F6F2", border: "1px solid #E8E2D9" }}>
                {["Editor", "Executions", "Evaluations"].map((t, i) => (
                  <span key={t} className="text-[11px] font-semibold px-3 py-1 rounded" style={{ backgroundColor: i === 0 ? "#F5B731" : "transparent", color: i === 0 ? "#0A0A0A" : "#52525B" }}>{t}</span>
                ))}
              </div>
              <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(22,163,74,0.1)", color: "#166534" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#16A34A" }} />
                {running ? "Running" : "Active"}
              </span>
            </div>

            {/* Canvas */}
            <div
              ref={viewportRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative overflow-hidden select-none h-[460px] sm:h-[560px] lg:h-[720px]"
              style={{ backgroundColor: "#FFFFFF", cursor: "grab", touchAction: "none" }}
            >
              <div
                className="absolute top-0 left-0"
                style={{
                  width: CANVAS_W,
                  height: CANVAS_H,
                  transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})`,
                  transformOrigin: "0 0",
                  backgroundImage: "radial-gradient(circle, rgba(10,10,10,0.12) 1.4px, transparent 1.4px)",
                  backgroundSize: "24px 24px",
                }}
              >
                {/* Groups */}
                {GROUPS.map((g) => (
                  <div key={g.title} className="absolute rounded-xl" style={{ left: g.x, top: g.y, width: g.w, height: g.h, backgroundColor: `${g.color}1A`, border: `1px solid ${g.color}55` }}>
                    <span className="absolute left-4 top-3 text-[12px] font-black tracking-wide" style={{ color: g.color === "#B8860B" ? "#A14A08" : g.color === "#16A34A" ? "#166534" : "#4F46E5" }}>{g.title}</span>
                  </div>
                ))}

                {/* Stickies */}
                {STICKIES.map((s, i) => {
                  const st = STICKY_STYLE[s.color];
                  return (
                    <div key={i} className="absolute rounded-lg px-3.5 py-3" style={{ left: s.x, top: s.y, width: s.w, backgroundColor: st.bg, border: `1px solid ${st.border}`, transform: s.rot ? `rotate(${s.rot}deg)` : undefined }}>
                      {s.title && <p className="text-[12px] font-black mb-1" style={{ color: st.title }}>{s.title}</p>}
                      <p className="text-[11px] leading-snug" style={{ color: st.text }}>{s.text}</p>
                    </div>
                  );
                })}

                {/* Connections */}
                <svg width={CANVAS_W} height={CANVAS_H} className="absolute inset-0" style={{ pointerEvents: "none" }}>
                  <defs>
                    <marker id="fw-arrow" markerWidth={aw} markerHeight={aw} refX={aw - 1} refY={aw / 2} orient="auto" markerUnits="userSpaceOnUse">
                      <path d={`M0 0 L${aw} ${aw / 2} L0 ${aw} Z`} fill="#8A93A3" />
                    </marker>
                    <marker id="fw-arrow-hi" markerWidth={aw} markerHeight={aw} refX={aw - 1} refY={aw / 2} orient="auto" markerUnits="userSpaceOnUse">
                      <path d={`M0 0 L${aw} ${aw / 2} L0 ${aw} Z`} fill="#F5B731" />
                    </marker>
                  </defs>
                  {CONNECTIONS.map((c, i) => {
                    const d = connPath(c);
                    const from = NODE_MAP[c.from];
                    const isHighlighted = active === c.from || active === c.to || (doneSet.has(c.from) && (doneSet.has(c.to) || currentId === c.to));
                    const color = c.kind === "true" ? "#22C55E" : c.kind === "false" || c.kind === "error" ? "#F87171" : c.kind === "sub" ? "#A78BFA" : from.accent;
                    const dashed = c.kind === "sub" || c.kind === "false" || c.kind === "error";
                    return (
                      <g key={i}>
                        <path
                          d={d}
                          fill="none"
                          stroke={isHighlighted ? color : c.kind === "sub" ? "#A78BFA" : "#9AA3B4"}
                          strokeOpacity={isHighlighted ? 1 : c.kind === "sub" ? 0.75 : 0.85}
                          strokeWidth={isHighlighted ? sw * 1.35 : sw}
                          strokeLinecap="round"
                          strokeDasharray={dashed ? dash : undefined}
                          markerEnd={c.kind === "sub" ? undefined : isHighlighted ? "url(#fw-arrow-hi)" : "url(#fw-arrow)"}
                          style={{ transition: "stroke 0.2s ease, stroke-width 0.2s ease" }}
                        />
                        {c.kind !== "sub" && (
                          <circle r={dotR} fill={color} stroke="#FFFFFF" strokeWidth={sw * 0.5}>
                            <animateMotion dur={`${2.2 + (i % 5) * 0.4}s`} begin={`${(i % 7) * 0.35}s`} repeatCount="indefinite" path={d} />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                  {/* true / false port labels on IF nodes */}
                  <g className="font-mono" style={{ fontSize: labelPx, fontWeight: 700 }}>
                    {NODES.filter((n) => n.shape === "if").map((n) => (
                      <g key={n.id}>
                        <text x={n.x + n.w + 8} y={n.y + n.h * 0.28 - labelPx * 0.5} fill="#166534">{copy.MyntmoreFrameworkClient_s01.t45}</text>
                        <text x={n.x + n.w + 8} y={n.y + n.h * 0.72 + labelPx * 1.1} fill="#B91C1C">{copy.MyntmoreFrameworkClient_s01.t46}</text>
                      </g>
                    ))}
                    <text x={NODE_MAP.connect.x + NODE_MAP.connect.w / 2 + 8} y={NODE_MAP.connect.y + NODE_MAP.connect.h + 40} fill="#B91C1C">{copy.MyntmoreFrameworkClient_s01.t47}</text>
                    <text x={2410} y={868} fill="#6D28D9">{copy.MyntmoreFrameworkClient_s01.t48}</text>
                    <text x={1770} y={1306} fill="#6D28D9">{copy.MyntmoreFrameworkClient_s01.t49}</text>
                  </g>
                </svg>

                {/* Nodes */}
                {NODES.map((n) => {
                  const isActive = active === n.id;
                  const isDone = doneSet.has(n.id);
                  const isCurrent = currentId === n.id;
                  const isSub = n.shape === "sub";
                  const isEnd = n.shape === "end";
                  const radius = isSub ? "9999px" : n.shape === "trigger" ? "32px 12px 12px 32px" : n.shape === "if" ? "12px" : "12px";
                  const border = isCurrent ? "#F5B731" : isActive ? n.accent : isDone ? "#22C55E" : isEnd ? "#CFC8BD" : "#CFC8BD";
                  const glow = isCurrent ? "0 0 0 4px rgba(245,183,49,0.25), 0 0 24px rgba(245,183,49,0.45)" : isActive ? `0 0 0 4px ${n.accent}33, 0 10px 24px rgba(0,0,0,0.12)` : "0 2px 8px rgba(0,0,0,0.08)";
                  return (
                    <div key={n.id} className="absolute" style={{ left: n.x, top: n.y, width: n.w, height: n.h, opacity: n.disabled ? 0.42 : 1 }}>
                      <button
                        type="button"
                        onClick={() => { pinnedRef.current = active !== n.id; setActive((v) => (v === n.id ? null : n.id)); }}
                        aria-label={n.title}
                        aria-pressed={isActive}
                        className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                        style={{
                          backgroundColor: isEnd ? "#F8F6F2" : isSub ? "#F8F6F2" : "#FFFFFF",
                          border: `${isCurrent || isActive ? 2 : 1.5}px solid ${border}`,
                          borderRadius: radius,
                          boxShadow: glow,
                          color: isEnd ? "#52525B" : textTone(n.accent),
                          transform: isCurrent ? "scale(1.08)" : undefined,
                        }}
                      >
                        {n.shape === "ai" ? (
                          <>
                            <span className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: `${n.accent}22` }}>{n.icon}</span>
                            <span className="text-[11px] font-black leading-tight text-left pr-1" style={{ color: "#0A0A0A" }}>{n.title}</span>
                          </>
                        ) : (
                          n.icon
                        )}
                        {/* ports */}
                        {!isSub && n.shape !== "trigger" && <span aria-hidden="true" className="absolute w-2 h-2 rounded-sm" style={{ left: -5, top: "50%", marginTop: -4, backgroundColor: "#8A93A3" }} />}
                        {!isSub && n.shape !== "end" && n.shape !== "if" && <span aria-hidden="true" className="absolute w-2.5 h-2.5 rounded-full" style={{ right: -6, top: "50%", marginTop: -5, backgroundColor: "#8A93A3" }} />}
                        {n.shape === "if" && (
                          <>
                            <span aria-hidden="true" className="absolute w-2.5 h-2.5 rounded-full" style={{ right: -6, top: "28%", marginTop: -5, backgroundColor: "#16A34A" }} />
                            <span aria-hidden="true" className="absolute w-2.5 h-2.5 rounded-full" style={{ right: -6, top: "72%", marginTop: -5, backgroundColor: "#DC2626" }} />
                          </>
                        )}
                        {n.shape === "ai" && (
                          <>
                            <span aria-hidden="true" className="absolute w-2 h-2 rounded-full" style={{ left: "35%", bottom: -5, backgroundColor: "#8B5CF6" }} />
                            <span aria-hidden="true" className="absolute w-2 h-2 rounded-full" style={{ left: "60%", bottom: -5, backgroundColor: "#8B5CF6" }} />
                          </>
                        )}
                        {isSub && <span aria-hidden="true" className="absolute w-2 h-2 rounded-full" style={{ left: "50%", top: -5, marginLeft: -4, backgroundColor: "#8B5CF6" }} />}
                        {n.disabled && <span aria-hidden="true" className="absolute -top-2 -left-2 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ backgroundColor: "#E8E2D9", color: "#3D3D3D" }}>{copy.MyntmoreFrameworkClient_s01.t50}</span>}
                        {/* success badge */}
                        {isDone && (
                          <span aria-hidden="true" className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "#16A34A" }}>
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </span>
                        )}
                      </button>
                      {/* label */}
                      <div className="absolute text-center pointer-events-none" style={{ top: n.h + 6, left: n.w / 2 - (isSub ? 50 : 80), width: isSub ? 100 : 160 }}>
                        {n.shape !== "ai" && <p className={`${isSub ? "text-[9.5px]" : "text-[11px]"} font-bold leading-tight`} style={{ color: isSub ? "#52525B" : "#0A0A0A" }}>{n.title}</p>}
                        <p className="text-[9px] font-mono leading-tight mt-0.5" style={{ color: "#52525B" }}>{n.shape === "ai" ? `${n.type} · ${n.meta}` : n.meta ?? n.type}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Node detail card (top-left, fixed to the viewport) */}
              {activeNode && (
                <div className="absolute left-3 top-3 max-w-[300px] rounded-xl p-4 card-fade-up" style={{ backgroundColor: "rgba(255,255,255,0.96)", border: `1px solid ${activeNode.accent}66`, backdropFilter: "blur(6px)", boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: `${activeNode.accent}22`, color: textTone(activeNode.accent) }}>{activeNode.icon}</span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-black leading-tight" style={{ color: "#0A0A0A" }}>{activeNode.title}</p>
                      <p className="text-[10px] font-mono" style={{ color: "#52525B" }}>{activeNode.type}{activeNode.meta ? ` · ${activeNode.meta}` : ""}</p>
                    </div>
                  </div>
                  <p className="text-[12px] leading-relaxed" style={{ color: "#3D3D3D" }}>{activeNode.desc ?? "A utility step. Tap a highlighted node in the breakdown below for the full story."}</p>
                </div>
              )}

              {/* Execute button */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => { pinnedRef.current = false; setActive(null); setRunStep(0); }}
                  disabled={running}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors duration-200 cursor-pointer disabled:cursor-wait"
                  style={{ backgroundColor: "#F5B731", color: "#0a0a0a", boxShadow: "0 6px 20px rgba(245,183,49,0.35)" }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  {running ? `Running ${runStep + 1} / ${EXEC_ORDER.length}` : runStep === EXEC_ORDER.length ? "Completed" : "Execute workflow"}
                  <span className="hidden sm:inline text-[10px] font-semibold opacity-70">{copy.MyntmoreFrameworkClient_s01.t51}</span>
                </button>
              </div>

              {/* Minimap */}
              <div className="hidden sm:block absolute rounded-lg overflow-hidden" style={{ right: 12, bottom: 12, width: MINI_W, height: MINI_H, backgroundColor: "rgba(255,255,255,0.95)", border: "1px solid #E8E2D9" }}>
                {GROUPS.map((g) => (
                  <span key={g.title} className="absolute rounded-sm" style={{ left: g.x * miniScale, top: g.y * miniScale, width: g.w * miniScale, height: g.h * miniScale, backgroundColor: `${g.color}33` }} />
                ))}
                {NODES.map((n) => (
                  <span key={n.id} className="absolute rounded-[1px]" style={{ left: n.x * miniScale, top: n.y * miniScale, width: Math.max(2, n.w * miniScale), height: Math.max(2, n.h * miniScale), backgroundColor: n.accent, opacity: 0.9 }} />
                ))}
                <span className="absolute" style={{ left: miniView.x, top: miniView.y, width: miniView.w, height: miniView.h, border: "1px solid rgba(10,10,10,0.55)", backgroundColor: "rgba(245,183,49,0.12)" }} />
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-between px-5 py-2.5" style={{ backgroundColor: "#FEF9EC", borderTop: "1px solid #E8E2D9" }}>
              <span className="text-xs font-mono" style={{ color: "#52525B" }}>{NODES.length}{copy.MyntmoreFrameworkClient_s01.t52}{CONNECTIONS.length}{copy.MyntmoreFrameworkClient_s01.t53}</span>
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => zoomButton(1 / 1.25)} aria-label="Zoom out" className="w-11 h-11 sm:w-7 sm:h-7 rounded-md flex items-center justify-center text-sm font-bold transition-colors cursor-pointer" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A", border: "1px solid #E8E2D9" }}>&minus;</button>
                <button type="button" onClick={handleFitClick} aria-label="Fit to view" className="min-h-[44px] text-xs font-mono px-2 hover:underline cursor-pointer sm:min-h-0" style={{ color: "#52525B" }}>{Math.round(view.zoom * 100)}%</button>
                <button type="button" onClick={() => zoomButton(1.25)} aria-label="Zoom in" className="w-11 h-11 sm:w-7 sm:h-7 rounded-md flex items-center justify-center text-sm font-bold transition-colors cursor-pointer" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A", border: "1px solid #E8E2D9" }}>+</button>
              </div>
            </div>
          </div>
          <p className="text-center text-sm mt-4" style={{ color: "#71675E" }}>{copy.MyntmoreFrameworkClient_s01.t54}</p>
        </div>
      </section>

      {/* ── Node breakdown ────────────────────────────────────── */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "rgba(124,58,237,0.08)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.2)" }}>{copy.MyntmoreFrameworkClient_s01.t55}</span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#0a0a0a" }}>{copy.MyntmoreFrameworkClient_s02.t01}</h2>
            <p className="text-base mt-3 max-w-2xl" style={{ color: "#52525B" }}>{copy.MyntmoreFrameworkClient_s02.t02}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {NARRATIVE_NODES.map((n) => (
              <button
                key={n.id}
                type="button"
                onMouseEnter={() => { if (!pinnedRef.current) setActive(n.id); }}
                onMouseLeave={() => { if (!pinnedRef.current) setActive(null); }}
                onClick={() => { focusNode(n.id); viewportRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); }}
                className="text-left rounded-2xl border p-6 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: active === n.id ? n.accent : "#E8E2D9",
                  boxShadow: active === n.id ? `0 8px 24px ${n.accent}22` : "none",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${n.accent}18`, color: n.accent }}>
                    {n.icon}
                  </span>
                  <div>
                    <h3 className="text-base font-black leading-tight" style={{ color: "#0a0a0a" }}>{n.title}</h3>
                    <p className="text-[11px] font-mono" style={{ color: "#71675E" }}>{n.type}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{n.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t text-center" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: "#0a0a0a" }}>{copy.MyntmoreFrameworkClient_s03.t01}</h2>
          <p className="text-base mb-8" style={{ color: "#52525B" }}>{copy.MyntmoreFrameworkClient_s03.t02}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/book-a-call" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">{copy.MyntmoreFrameworkClient_s03.t03}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <Link href="/services/linkedin-outreach" className="btn-ghost px-8 py-4 text-base font-bold">{copy.MyntmoreFrameworkClient_s03.t04}</Link>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}
