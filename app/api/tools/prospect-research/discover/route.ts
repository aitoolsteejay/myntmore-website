import { NextRequest, NextResponse } from "next/server";
import { ThinkingLevel } from "@google/genai";
import { buildQuestions, cleanProfile, filterCandidates, plainText, questionsHash, rankCandidates, type Candidate } from "@/lib/prospect-research/core";
import { CAPACITY_MESSAGE, dailyRunCap, FORMAT_MODEL, PROSPECT_COUNT, RESEARCH_MODEL, RUN_MAX_AGE_MS, RUNS_PER_EMAIL, RUNS_PER_IP } from "@/lib/prospect-research/config";
import { discoverFormatPrompt, discoverResearchPrompt, DISCOVER_SCHEMA } from "@/lib/prospect-research/prompts";
import {
  callGemini, countRuns, db, errorResponse, ipHash, limitRequest, parseJson, readJson, requireLead, requireUuid, resolves, startOfUtcDay, ToolError,
} from "@/lib/prospect-research/server";
import type { Prospect, ResearchInputs } from "@/lib/prospect-research/types";

// Step 2: find 15 to 20 companies with a recent dated signal, drop the visitor's own company, the
// exclusions, duplicates and domains that do not resolve, and keep the best 10. This is the point where a
// run counts against the daily limits. Typically 30 to 60 seconds.
export const maxDuration = 120;

const DAY = 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  let claimedRunId: string | null = null;
  try {
    limitRequest(req, "discover", 4, 10 * 60 * 1000);
    const body = await readJson(req);
    const lead = await requireLead(body.leadId);
    const runId = requireUuid(body.runId, "This run has expired. Please start again.");
    const profile = cleanProfile(body.profile);
    if (!profile) throw new ToolError(400, "Fill in the company name, what you sell, the industries and the buyer.");

    const { data: run, error } = await db().from("prospect_research_runs").select("id, lead_id, status, inputs, created_at").eq("id", runId).maybeSingle();
    if (error) throw error;
    if (!run || run.lead_id !== lead.id) throw new ToolError(404, "This run has expired. Please start again.");
    if (Date.now() - new Date(run.created_at).getTime() > RUN_MAX_AGE_MS) throw new ToolError(410, "This run has expired. Please start again.");
    if (run.status !== "profiled" && run.status !== "failed") throw new ToolError(409, "This search has already started.");

    // A failed discovery may be retried, but only twice per run.
    const { count: attempts, error: attemptsError } = await db().from("ai_usage_log").select("id", { count: "exact", head: true }).eq("run_id", runId).eq("step", "discover_research");
    if (attemptsError) throw attemptsError;
    if ((attempts ?? 0) >= 2) throw new ToolError(429, "This search could not be completed. Please start a new one tomorrow, or book a call and we will run it for you.");

    const ip = ipHash(req);
    const since = new Date(Date.now() - DAY);
    const [byEmail, byIp, today] = await Promise.all([
      countRuns("email", lead.email, ["running", "done"], since),
      countRuns("ip_hash", ip, ["running", "done"], since),
      countRuns(null, null, ["running", "done"], startOfUtcDay()),
    ]);
    if (byEmail >= RUNS_PER_EMAIL || byIp >= RUNS_PER_IP) {
      throw new ToolError(429, `You can run ${RUNS_PER_EMAIL} searches a day. Please come back tomorrow, or book a call and we will run a bigger one for you.`);
    }
    const questions = buildQuestions(profile);
    if (today >= dailyRunCap()) {
      await db().from("prospect_research_runs").update({ status: "capacity", profile, questions }).eq("id", runId);
      return NextResponse.json({ capacity: true, message: CAPACITY_MESSAGE });
    }

    // Claim the run before spending money, so two parallel requests cannot both go ahead.
    const startedAt = new Date();
    const { data: claimed, error: claimError } = await db()
      .from("prospect_research_runs")
      .update({ status: "running", profile, questions, questions_hash: await questionsHash(questions), started_at: startedAt.toISOString() })
      .eq("id", runId)
      .in("status", ["profiled", "failed"])
      .select("id");
    if (claimError) throw claimError;
    if (!claimed?.length) throw new ToolError(409, "This search has already started.");
    claimedRunId = runId;

    const inputs = run.inputs as ResearchInputs;
    const research = await callGemini({ runId, step: "discover_research", model: RESEARCH_MODEL, prompt: discoverResearchPrompt(profile, inputs.exclusions, inputs.website, startedAt), grounded: true, timeoutMs: 90_000 });
    const formatted = await callGemini({ runId, step: "discover_format", model: FORMAT_MODEL, prompt: discoverFormatPrompt(research.text), schema: DISCOVER_SCHEMA, thinking: ThinkingLevel.LOW, timeoutMs: 25_000 });
    const raw = parseJson<{ companies?: Candidate[] }>(formatted.text).companies ?? [];

    const filtered = filterCandidates(raw, inputs.website, profile.companyName, inputs.exclusions);
    const live = (await Promise.all(filtered.map(async (c) => ((await resolves(c.domain)) ? c : null)))).filter((c): c is Candidate => !!c);
    const prospects: Prospect[] = rankCandidates(live, startedAt, PROSPECT_COUNT).map((c) => ({
      name: plainText(c.name).slice(0, 120),
      domain: c.domain,
      location: plainText(c.location || "").slice(0, 120),
      signal: plainText(c.signal || "").slice(0, 400),
      signalDate: (c.signalDate || "").slice(0, 40) || undefined,
    }));

    if (!prospects.length) {
      await db().from("prospect_research_runs").update({ status: "failed", prospects: [] }).eq("id", runId);
      throw new ToolError(502, "We could not find companies with a recent public signal for this profile. Try widening the industries or regions.");
    }

    await db()
      .from("prospect_research_runs")
      .update({ prospects, timings: { discoverMs: research.ms + formatted.ms, candidates: raw.length, afterFilter: filtered.length, resolving: live.length } })
      .eq("id", runId);
    claimedRunId = null;

    return NextResponse.json({ questions, prospects: prospects.map(({ name, domain, location }) => ({ name, domain, location })) });
  } catch (err) {
    // A failed discovery does not count against the visitor's daily runs.
    if (claimedRunId) await db().from("prospect_research_runs").update({ status: "failed" }).eq("id", claimedRunId);
    return errorResponse(err, "discover");
  }
}
