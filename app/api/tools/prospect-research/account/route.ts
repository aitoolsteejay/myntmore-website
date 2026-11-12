import { NextRequest, NextResponse } from "next/server";
import { ThinkingLevel } from "@google/genai";
import type { Answer, Verdict } from "@/lib/research-types";
import { candidateSources, enforceRules, NO_EVIDENCE, normaliseDomain, scoreAccount, sourcesForQuestions } from "@/lib/prospect-research/core";
import { ACCOUNT_CALLS_PER_RUN, CACHE_MAX_AGE_MS, FORMAT_MODEL, RESEARCH_MODEL, RUN_MAX_AGE_MS } from "@/lib/prospect-research/config";
import { checkAnswer, type CheckTally } from "@/lib/prospect-research/net";
import { accountFormatPrompt, accountResearchPrompt, ACCOUNT_SCHEMA } from "@/lib/prospect-research/prompts";
import { callGemini, db, errorResponse, limitRequest, netDeps, parseJson, readJson, requireLead, requireUuid, ToolError } from "@/lib/prospect-research/server";
import type { Profile, Prospect, ProspectResult } from "@/lib/prospect-research/types";

// Step 3, one call per prospect (the page runs up to 5 at once): research the seven questions with
// search grounding, format the answers on the cheaper model, check every source link in code, then score
// with lib/research-scoring.ts. Typically 25 to 60 seconds.
export const maxDuration = 120;

interface Cached { answers: Answer[]; recent: string; pitch: string; who: string; checks: ProspectResult["checks"] }

export async function POST(req: NextRequest) {
  try {
    limitRequest(req, "account", 40, 10 * 60 * 1000);
    const body = await readJson(req);
    const lead = await requireLead(body.leadId);
    const runId = requireUuid(body.runId, "This run has expired. Please start again.");
    const domain = normaliseDomain(typeof body.domain === "string" ? body.domain : "");
    if (!domain) throw new ToolError(400, "Unknown company.");

    const { data: run, error } = await db()
      .from("prospect_research_runs")
      .select("id, lead_id, status, profile, questions, questions_hash, prospects, started_at")
      .eq("id", runId)
      .maybeSingle();
    if (error) throw error;
    if (!run || run.lead_id !== lead.id || run.status !== "running") throw new ToolError(404, "This run has expired. Please start again.");
    const runDate = new Date(run.started_at);
    if (Date.now() - runDate.getTime() > RUN_MAX_AGE_MS) throw new ToolError(410, "This run has expired. Please start again.");
    // Only the companies this run's discovery picked can be researched.
    const prospect = (run.prospects as Prospect[] | null)?.find((p) => p.domain === domain);
    if (!prospect) throw new ToolError(404, "Unknown company.");
    const profile = run.profile as Profile;
    const questions = run.questions as string[];
    const where = [prospect.domain, prospect.location].filter(Boolean).join(" · ");

    // Reuse research younger than 7 days for the same company and the same questions.
    const { data: hit } = await db()
      .from("prospect_research_cache")
      .select("result, created_at")
      .eq("domain", domain)
      .eq("questions_hash", run.questions_hash)
      .gte("created_at", new Date(Date.now() - CACHE_MAX_AGE_MS).toISOString())
      .maybeSingle();
    if (hit) {
      const c = hit.result as Cached;
      const result: ProspectResult = { domain, cached: true, checks: c.checks, account: scoreAccount({ name: prospect.name, where, recent: c.recent, pitch: c.pitch, who: c.who }, c.answers, runDate) };
      return NextResponse.json(result);
    }

    const { count: calls, error: countError } = await db().from("ai_usage_log").select("id", { count: "exact", head: true }).eq("run_id", runId).eq("step", "account_research");
    if (countError) throw countError;
    if ((calls ?? 0) >= ACCOUNT_CALLS_PER_RUN) throw new ToolError(429, "This run has used all its research calls.");

    // A: research with search grounding.
    const research = await callGemini({ runId, step: "account_research", model: RESEARCH_MODEL, prompt: accountResearchPrompt(profile, questions, prospect, runDate), grounded: true, domain, timeoutMs: 80_000 });
    // B: format on the cheaper model.
    const formatted = await callGemini({ runId, step: "account_format", model: FORMAT_MODEL, prompt: accountFormatPrompt(research.text), schema: ACCOUNT_SCHEMA, thinking: ThinkingLevel.LOW, domain, timeoutMs: 25_000 });
    const parsed = parseJson<{ answers?: { verdict: string; text: string; date: string; source: string }[]; recent?: string; pitch?: string; who?: string }>(formatted.text);
    const rawAnswers = parsed.answers ?? [];
    if (rawAnswers.length < 7) throw new Error(`format returned ${rawAnswers.length} answers`);

    const grounded = sourcesForQuestions(research.text, research.grounding.chunks, research.grounding.supports);
    const candidates = rawAnswers.slice(0, 7).map((a, i) => candidateSources(a.source, grounded[i]));
    const answers: Answer[] = rawAnswers.slice(0, 7).map((a, i) => {
      const verdict: Verdict = a.verdict === "yes" || a.verdict === "likely" ? a.verdict : "no";
      // The source is checked and filled in below; here it only marks that one exists.
      return verdict === "no" ? { verdict, text: NO_EVIDENCE } : { verdict, text: a.text, date: a.date, source: candidates[i][0] };
    });
    const ruled = enforceRules(answers, runDate);

    // C: check every source link in code.
    const checks: CheckTally = { checked: 0, downgraded: 0, removed: 0, unchecked: 0 };
    const company = { name: prospect.name, domain };
    const checked = await Promise.all(ruled.map((a, i) => checkAnswer(a, candidates[i], company, netDeps, checks)));

    // D: rule-based scores.
    const cached: Cached = { answers: checked, recent: parsed.recent ?? "", pitch: parsed.pitch ?? "", who: parsed.who ?? "", checks };
    const account = scoreAccount({ name: prospect.name, where, recent: cached.recent, pitch: cached.pitch, who: cached.who }, checked, runDate);

    const { error: cacheError } = await db()
      .from("prospect_research_cache")
      .upsert({ domain, questions_hash: run.questions_hash, prospect, result: cached, created_at: new Date().toISOString() }, { onConflict: "domain,questions_hash" });
    if (cacheError) console.error("prospect_research_cache upsert failed:", cacheError.message);

    const result: ProspectResult = { domain, cached: false, checks, account };
    return NextResponse.json(result);
  } catch (err) {
    return errorResponse(err, "account");
  }
}
