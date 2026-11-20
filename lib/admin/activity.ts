// The admin's activity log: who changed which entry, when, in which commit, and which fields.
// Stored in Supabase (admin_activity); kept in memory instead in local development.
import "server-only";
import type { FieldChange } from "./schema";
import { isLocalDevMode } from "./store";

export interface ActivityEntry {
  id: string;
  created_at: string;
  editor_email: string;
  editor_name: string;
  action: "update" | "create" | "delete" | "revert";
  content_type: string;
  content_label: string;
  entry: string;
  files: string[];
  commit_sha: string;
  commit_url: string | null;
  changes: FieldChange[];
  /** For a revert: the activity row it undid. */
  reverts_id: string | null;
  /** Set on a row once it has been undone. */
  reverted_by_id: string | null;
}

export type NewActivity = Omit<ActivityEntry, "id" | "created_at" | "reverted_by_id">;

export interface ActivityFilter {
  editor?: string;
  type?: string;
  from?: string;
  to?: string;
  limit?: number;
}

// Local development: rows live in memory (they survive hot reloads, not restarts).
const memory: ActivityEntry[] = ((globalThis as Record<string, unknown>).__adminActivity ??= []) as ActivityEntry[];

export async function recordActivity(row: NewActivity): Promise<ActivityEntry> {
  if (isLocalDevMode()) {
    const entry: ActivityEntry = { ...row, id: String(memory.length + 1), created_at: new Date().toISOString(), reverted_by_id: null };
    memory.unshift(entry);
    return entry;
  }
  const { dbClient } = await import("./supabase-server");
  const { data, error } = await dbClient().from("admin_activity").insert(row).select().single();
  if (error) throw new Error(`Could not write the activity log: ${error.message}`);
  return data as ActivityEntry;
}

export async function markReverted(id: string, revertedById: string): Promise<void> {
  if (isLocalDevMode()) {
    const row = memory.find((r) => r.id === id);
    if (row) row.reverted_by_id = revertedById;
    return;
  }
  const { dbClient } = await import("./supabase-server");
  const { error } = await dbClient().from("admin_activity").update({ reverted_by_id: revertedById }).eq("id", id);
  if (error) throw new Error(`Could not update the activity log: ${error.message}`);
}

export async function getActivity(id: string): Promise<ActivityEntry | null> {
  if (isLocalDevMode()) return memory.find((r) => r.id === id) ?? null;
  const { dbClient } = await import("./supabase-server");
  const { data, error } = await dbClient().from("admin_activity").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`Could not read the activity log: ${error.message}`);
  return (data as ActivityEntry) ?? null;
}

export async function listActivity(filter: ActivityFilter = {}): Promise<ActivityEntry[]> {
  const limit = Math.min(filter.limit ?? 100, 500);
  if (isLocalDevMode()) {
    return memory
      .filter((r) => (!filter.editor || r.editor_email === filter.editor) && (!filter.type || r.content_type === filter.type))
      .filter((r) => (!filter.from || r.created_at >= filter.from) && (!filter.to || r.created_at < filter.to))
      .slice(0, limit);
  }
  const { dbClient } = await import("./supabase-server");
  let q = dbClient().from("admin_activity").select("*").order("created_at", { ascending: false }).limit(limit);
  if (filter.editor) q = q.eq("editor_email", filter.editor);
  if (filter.type) q = q.eq("content_type", filter.type);
  if (filter.from) q = q.gte("created_at", filter.from);
  if (filter.to) q = q.lt("created_at", filter.to);
  const { data, error } = await q;
  if (error) throw new Error(`Could not read the activity log: ${error.message}`);
  return (data ?? []) as ActivityEntry[];
}

/** Distinct editors seen in the log, for the Activity page's filter. */
export async function activityEditors(): Promise<{ email: string; name: string }[]> {
  const rows = await listActivity({ limit: 500 });
  const seen = new Map<string, string>();
  rows.forEach((r) => seen.set(r.editor_email, r.editor_name));
  return Array.from(seen, ([email, name]) => ({ email, name }));
}
