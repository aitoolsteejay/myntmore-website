// Attaches a tool's inputs and results to the lead row its LeadGate created.
//
// This goes through the `save_lead_result` database function instead of updating the table: the
// leads table has no anonymous read policy (visitors must not be able to read other people's
// details), and without one a direct update matches no rows. The function only sets `inputs` and
// `outputs`, and only on a lead created in the last 24 hours. See docs/supabase-lockdown-2026-11-23.sql.
//
// The Supabase client (~200 kB) is loaded here on first use, not with the page. Failures are logged and
// never shown: saving the result is a record for the team, the visitor already has their output.
export function saveLeadResult(leadId: string, inputs: unknown, outputs: unknown): void {
  void import("@/lib/supabase")
    .then(({ supabase }) =>
      supabase
        .rpc("save_lead_result", { p_lead_id: leadId, p_inputs: inputs, p_outputs: outputs })
        .then(({ error }) => {
          if (error) console.error("Supabase inputs/outputs update failed:", error);
        }),
    )
    .catch((error: unknown) => console.error("Supabase inputs/outputs update failed:", error));
}
