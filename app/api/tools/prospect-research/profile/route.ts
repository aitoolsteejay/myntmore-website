import { NextRequest, NextResponse } from "next/server";
import { ThinkingLevel } from "@google/genai";
import { buildQuestions, cleanProfile, normaliseDomain, validateInputs } from "@/lib/prospect-research/core";
import { CAPACITY_MESSAGE, dailyRunCap, FORMAT_MODEL, PROFILES_PER_EMAIL, PROFILES_PER_IP, RESEARCH_MODEL } from "@/lib/prospect-research/config";
import { pageText, safeFetch } from "@/lib/prospect-research/net";
import { profileFormatPrompt, profileResearchPrompt, PROFILE_SCHEMA } from "@/lib/prospect-research/prompts";
import {
  callGemini, countRuns, db, errorResponse, ipHash, limitRequest, netDeps, parseJson, readJson, requireLead, startOfUtcDay, ToolError,
} from "@/lib/prospect-research/server";

// Step 1 of a run: read the visitor's homepage, work out what they sell and who buys it, and create the
// run row. Typically 15 to 30 seconds.
export const maxDuration = 60;

const DAY = 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    limitRequest(req, "profile", 6, 10 * 60 * 1000);
    const body = await readJson(req);
    const lead = await requireLead(body.leadId);
    const v = validateInputs(body);
    if (!v.ok) throw new ToolError(400, v.error);
    const { inputs } = v;
    const ip = ipHash(req);
    const since = new Date(Date.now() - DAY);

    // Durable limits, counted in Supabase so they hold across server instances.
    const [byEmail, byIp, today] = await Promise.all([
      countRuns("email", lead.email, ["profiled", "running", "done", "failed"], since),
      countRuns("ip_hash", ip, ["profiled", "running", "done", "failed"], since),
      countRuns(null, null, ["running", "done"], startOfUtcDay()),
    ]);
    if (byEmail >= PROFILES_PER_EMAIL || byIp >= PROFILES_PER_IP) {
      throw new ToolError(429, "You have reached today's limit for this tool. Please come back tomorrow.");
    }
    if (today >= dailyRunCap()) {
      // Store the request so the team can run it by hand and email the report.
      await db().from("prospect_research_runs").insert({ lead_id: lead.id, email: lead.email, ip_hash: ip, status: "capacity", inputs });
      return NextResponse.json({ capacity: true, message: CAPACITY_MESSAGE });
    }

    const { data: run, error: runError } = await db()
      .from("prospect_research_runs")
      .insert({ lead_id: lead.id, email: lead.email, ip_hash: ip, status: "profiled", inputs })
      .select("id")
      .single();
    if (runError) throw runError;
    const runId: string = run.id;

    // What the company does comes from its own homepage, not from the model's memory.
    const page = await safeFetch(inputs.website, netDeps, 8000);
    const homepage = page.kind === "ok" ? pageText(page.body).slice(0, 6000) : "";

    const research = await callGemini({ runId, step: "profile_research", model: RESEARCH_MODEL, prompt: profileResearchPrompt(inputs, homepage), grounded: true, timeoutMs: 45_000 });
    const formatted = await callGemini({ runId, step: "profile_format", model: FORMAT_MODEL, prompt: profileFormatPrompt(research.text), schema: PROFILE_SCHEMA, thinking: ThinkingLevel.LOW, timeoutMs: 20_000 });
    const profile = cleanProfile(parseJson(formatted.text));
    if (!profile) throw new ToolError(502, "We could not work out what your company sells. Please check the website and try again.");

    await db().from("prospect_research_runs").update({ profile, timings: { profileMs: research.ms + formatted.ms } }).eq("id", runId);

    return NextResponse.json({
      runId,
      profile,
      questions: buildQuestions(profile),
      homepageRead: page.kind === "ok",
      domain: normaliseDomain(inputs.website),
    });
  } catch (err) {
    return errorResponse(err, "profile");
  }
}
