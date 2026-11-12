import { NextRequest, NextResponse } from "next/server";
import type { Account, Answer } from "@/lib/research-types";
import { scoreAccount } from "@/lib/prospect-research/core";
import { db, errorResponse, limitRequest, readJson, requireLead, requireUuid, ToolError } from "@/lib/prospect-research/server";
import type { Prospect, ProspectResult } from "@/lib/prospect-research/types";

// Step 4: once every prospect is done, save the final report on the run row and on the lead row (as the
// other tools save inputs and outputs), with timings and the real cost from ai_usage_log.
export const maxDuration = 30;

const ms = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v >= 0 && v < 3_600_000 ? Math.round(v) : null);

export async function POST(req: NextRequest) {
  try {
    limitRequest(req, "finish", 10, 10 * 60 * 1000);
    const body = await readJson(req);
    const lead = await requireLead(body.leadId);
    const runId = requireUuid(body.runId, "This run has expired.");

    const { data: run, error } = await db()
      .from("prospect_research_runs")
      .select("id, lead_id, status, inputs, profile, questions, questions_hash, prospects, started_at, timings")
      .eq("id", runId)
      .maybeSingle();
    if (error) throw error;
    if (!run || run.lead_id !== lead.id) throw new ToolError(404, "This run has expired.");
    if (run.status !== "running") return NextResponse.json({ ok: true });

    const prospects = (run.prospects as Prospect[]) ?? [];
    const runDate = new Date(run.started_at);
    const { data: rows, error: cacheError } = await db()
      .from("prospect_research_cache")
      .select("domain, result")
      .eq("questions_hash", run.questions_hash)
      .in("domain", prospects.map((p) => p.domain));
    if (cacheError) throw cacheError;
    const byDomain = new Map((rows ?? []).map((r) => [r.domain as string, r.result as { answers: Answer[]; recent: string; pitch: string; who: string; checks: ProspectResult["checks"] }]));
    const accounts: Account[] = [];
    const checks = { checked: 0, downgraded: 0, removed: 0, unchecked: 0 };
    for (const p of prospects) {
      const c = byDomain.get(p.domain);
      if (!c) continue;
      accounts.push(scoreAccount({ name: p.name, where: [p.domain, p.location].filter(Boolean).join(" · "), recent: c.recent, pitch: c.pitch, who: c.who }, c.answers, runDate));
      for (const k of Object.keys(checks) as (keyof typeof checks)[]) checks[k] += c.checks?.[k] ?? 0;
    }

    const { data: usage, error: usageError } = await db().from("ai_usage_log").select("cost_usd, searches").eq("run_id", runId);
    if (usageError) throw usageError;
    const totalCost = (usage ?? []).reduce((s, u) => s + Number(u.cost_usd || 0), 0);
    const totalSearches = (usage ?? []).reduce((s, u) => s + Number(u.searches || 0), 0);

    const timings = {
      ...(run.timings as Record<string, unknown> | null),
      firstProspectMs: ms(body.firstProspectMs),
      totalMs: ms(body.totalMs),
      serverTotalMs: Date.now() - runDate.getTime(),
      failed: prospects.length - accounts.length,
    };
    await db()
      .from("prospect_research_runs")
      .update({ status: "done", accounts, checks, timings, total_cost_usd: Math.round(totalCost * 10000) / 10000, total_searches: totalSearches, finished_at: new Date().toISOString() })
      .eq("id", runId);
    const { error: leadError } = await db()
      .from("leads")
      .update({ inputs: { ...(run.inputs as object), profile: run.profile, run_id: runId }, outputs: { questions: run.questions, accounts } })
      .eq("id", lead.id);
    if (leadError) console.error("lead outputs update failed:", leadError.message);

    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err, "finish");
  }
}
