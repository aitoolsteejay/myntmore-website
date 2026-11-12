// Server-only pieces of the Prospect Research tool: the Supabase service client, the lead and run
// checks that protect the paid API, the Gemini wrapper that logs every call to ai_usage_log, and DNS.
// Never import this file from a client component: it reads SUPABASE_SERVICE_ROLE_KEY.
import { promises as dns } from "node:dns";
import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { estimateCost, LEAD_MAX_AGE_MS, LEAD_SOURCE } from "./config";
import type { NetDeps } from "./net";

// ── Errors ────────────────────────────────────────────────────────────────────────────────────────

/** An error whose message is safe to show the visitor. Anything else is logged and replaced. */
export class ToolError extends Error {
  constructor(public status: number, message: string, public extra: Record<string, unknown> = {}) {
    super(message);
  }
}

export function errorResponse(err: unknown, route: string) {
  if (err instanceof ToolError) return NextResponse.json({ error: err.message, ...err.extra }, { status: err.status });
  console.error(`prospect-research/${route} failed:`, err);
  return NextResponse.json({ error: "Something went wrong on our side. Please try again in a minute." }, { status: 500 });
}

export async function readJson(req: NextRequest): Promise<Record<string, unknown>> {
  try {
    const body = await req.json();
    if (body && typeof body === "object" && !Array.isArray(body)) return body as Record<string, unknown>;
  } catch {
    /* fall through */
  }
  throw new ToolError(400, "The request was not readable. Please refresh the page and try again.");
}

/** Per-instance request limit from lib/rateLimit.ts, on top of the durable caps in Supabase. */
export function limitRequest(req: NextRequest, route: string, limit: number, windowMs: number) {
  const wait = rateLimit(`prospect-research:${route}:${getClientIp(req)}`, limit, windowMs);
  if (wait) throw new ToolError(429, `Too many requests. Please wait ${wait} seconds and try again.`);
}

export function ipHash(req: NextRequest): string {
  return createHash("sha256").update(`prospect-research:${getClientIp(req)}`).digest("hex").slice(0, 32);
}

// ── Supabase ──────────────────────────────────────────────────────────────────────────────────────

let admin: SupabaseClient | null = null;

/** Service-role client. The tool refuses to run without it rather than skipping the checks. */
export function db(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new ToolError(503, "Prospect research is not available right now. Please try again later.");
  admin ??= createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return admin;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface Lead { id: string; email: string | null; created_at: string }

/** The lead must exist, come from this tool's form and be less than 24 hours old. */
export async function requireLead(leadId: unknown): Promise<Lead> {
  if (typeof leadId !== "string" || !UUID.test(leadId)) throw new ToolError(401, "Please fill in your details first.", { needLead: true });
  const { data, error } = await db().from("leads").select("id, email, source, created_at").eq("id", leadId).maybeSingle();
  if (error) throw error;
  if (!data || data.source !== LEAD_SOURCE) throw new ToolError(401, "Please fill in your details first.", { needLead: true });
  if (Date.now() - new Date(data.created_at).getTime() > LEAD_MAX_AGE_MS) {
    throw new ToolError(401, "Your session has expired. Please fill in your details again.", { needLead: true });
  }
  return { id: data.id, email: data.email, created_at: data.created_at };
}

export function requireUuid(value: unknown, message: string): string {
  if (typeof value !== "string" || !UUID.test(value)) throw new ToolError(400, message);
  return value;
}

/** Runs matching `column = value` with one of `statuses`, created since `since`. */
export async function countRuns(column: "email" | "ip_hash" | null, value: string | null, statuses: string[], since: Date): Promise<number> {
  let q = db().from("prospect_research_runs").select("id", { count: "exact", head: true }).in("status", statuses).gte("created_at", since.toISOString());
  if (column) q = q.eq(column, value ?? "");
  const { count, error } = await q;
  if (error) throw error;
  return count ?? 0;
}

export function startOfUtcDay(d = new Date()): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

// ── Gemini ────────────────────────────────────────────────────────────────────────────────────────

export interface Grounding {
  chunks: { uri: string; title: string }[];
  supports: { text: string; chunks: number[] }[];
  queries: string[];
}

export interface GeminiResult { text: string; grounding: Grounding; costUsd: number; searches: number; ms: number }

let ai: GoogleGenAI | null = null;
function client(): GoogleGenAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new ToolError(503, "Prospect research is not available right now. Please try again later.");
  ai ??= new GoogleGenAI({ apiKey: key });
  return ai;
}

/**
 * One Gemini call. Search-grounded calls return plain text plus the grounding metadata; format calls
 * pass a JSON schema. Every call, including failed ones, is written to ai_usage_log with its real token
 * and search counts and an estimated cost.
 */
export async function callGemini(opts: {
  runId: string;
  step: string;
  model: string;
  prompt: string;
  grounded?: boolean;
  schema?: unknown;
  domain?: string;
  timeoutMs?: number;
  thinking?: ThinkingLevel;
}): Promise<GeminiResult> {
  const started = Date.now();
  let usage = { promptTokens: 0, outputTokens: 0, thinkingTokens: 0, toolUseTokens: 0, searches: 0 };
  let ok = false;
  let errorText: string | null = null;
  try {
    const res = await client().models.generateContent({
      model: opts.model,
      contents: opts.prompt,
      config: {
        abortSignal: AbortSignal.timeout(opts.timeoutMs ?? 75_000),
        ...(opts.grounded ? { tools: [{ googleSearch: {} }] } : {}),
        ...(opts.schema ? { responseMimeType: "application/json", responseSchema: opts.schema } : {}),
        ...(opts.thinking ? { thinkingConfig: { thinkingLevel: opts.thinking } } : {}),
      },
    });
    const meta = res.usageMetadata;
    const gm = res.candidates?.[0]?.groundingMetadata;
    const queries = gm?.webSearchQueries ?? [];
    usage = {
      promptTokens: meta?.promptTokenCount ?? 0,
      outputTokens: meta?.candidatesTokenCount ?? 0,
      thinkingTokens: meta?.thoughtsTokenCount ?? 0,
      toolUseTokens: meta?.toolUsePromptTokenCount ?? 0,
      searches: queries.length,
    };
    const text = (res.text || "").trim();
    if (!text) throw new Error(`empty response (finish reason ${res.candidates?.[0]?.finishReason ?? "unknown"})`);
    ok = true;
    return {
      text,
      grounding: {
        chunks: (gm?.groundingChunks ?? []).map((c) => ({ uri: c.web?.uri ?? "", title: c.web?.title ?? "" })),
        supports: (gm?.groundingSupports ?? []).map((s) => ({ text: s.segment?.text ?? "", chunks: s.groundingChunkIndices ?? [] })),
        queries,
      },
      costUsd: estimateCost(opts.model, usage),
      searches: usage.searches,
      ms: Date.now() - started,
    };
  } catch (err) {
    errorText = err instanceof Error ? err.message.slice(0, 500) : String(err).slice(0, 500);
    throw err;
  } finally {
    const { error } = await db().from("ai_usage_log").insert({
      tool: "prospect_research",
      run_id: opts.runId,
      step: opts.step,
      model: opts.model,
      prospect_domain: opts.domain ?? null,
      prompt_tokens: usage.promptTokens,
      output_tokens: usage.outputTokens,
      thinking_tokens: usage.thinkingTokens,
      tool_use_tokens: usage.toolUseTokens,
      searches: usage.searches,
      duration_ms: Date.now() - started,
      cost_usd: estimateCost(opts.model, usage),
      ok,
      error: errorText,
    });
    if (error) console.error("ai_usage_log insert failed:", error.message);
  }
}

export function parseJson<T>(text: string): T {
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
  return JSON.parse(cleaned) as T;
}

// ── Network ───────────────────────────────────────────────────────────────────────────────────────

export const netDeps: NetDeps = {
  lookup: async (host) => (await dns.lookup(host, { all: true })).map((a) => a.address),
  fetch: (input, init) => fetch(input, init),
};

/** True if the domain resolves within `ms`. */
export async function resolves(domain: string, ms = 3000): Promise<boolean> {
  try {
    const r = await Promise.race([dns.lookup(domain, { all: true }), new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);
    return r.length > 0;
  } catch {
    return false;
  }
}
