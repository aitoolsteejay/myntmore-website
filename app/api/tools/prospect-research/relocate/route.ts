import { NextRequest, NextResponse } from "next/server";
import { buildQuestions, cleanLocation } from "@/lib/prospect-research/core";
import { RUN_MAX_AGE_MS } from "@/lib/prospect-research/config";
import { db, errorResponse, limitRequest, readJson, requireLead, requireUuid, ToolError } from "@/lib/prospect-research/server";
import type { Profile, ResearchInputs } from "@/lib/prospect-research/types";

// Changing the location from the results page: copies a finished run's inputs and confirmed profile into
// a new run with the new location, without reading the homepage again. The new run then goes through
// /discover like any other, so it counts against the same daily search limits there.
export async function POST(req: NextRequest) {
  try {
    limitRequest(req, "relocate", 6, 10 * 60 * 1000);
    const body = await readJson(req);
    const lead = await requireLead(body.leadId);
    const runId = requireUuid(body.runId, "This run has expired. Please start again.");
    const location = cleanLocation(body.location);
    if (!location) throw new ToolError(400, "Enter a location, for example India, Dubai or United Kingdom.");

    const { data: run, error } = await db().from("prospect_research_runs").select("id, lead_id, ip_hash, inputs, profile, created_at").eq("id", runId).maybeSingle();
    if (error) throw error;
    if (!run || run.lead_id !== lead.id || !run.profile) throw new ToolError(404, "This run has expired. Please start again.");
    if (Date.now() - new Date(run.created_at).getTime() > 6 * RUN_MAX_AGE_MS) throw new ToolError(410, "This run has expired. Please start again.");

    const inputs: ResearchInputs = { ...(run.inputs as ResearchInputs), location };
    const profile: Profile = { ...(run.profile as Profile), regions: location };
    const { data: next, error: insertError } = await db()
      .from("prospect_research_runs")
      .insert({ lead_id: lead.id, email: lead.email, ip_hash: run.ip_hash, status: "profiled", inputs, profile })
      .select("id")
      .single();
    if (insertError) throw insertError;

    return NextResponse.json({ runId: next.id as string, profile, questions: buildQuestions(profile) });
  } catch (err) {
    return errorResponse(err, "relocate");
  }
}
