// Private drafts: a half-finished edit saved by one editor, visible to that editor only. Every
// function takes the signed-in editor's email and filters on it, so nobody can read or change
// another person's draft. Stored in Supabase (admin_drafts); kept in memory in local development.
// A draft never touches GitHub and never goes live.
import "server-only";
import { randomUUID } from "node:crypto";
import { isLocalDevMode } from "./store";

export interface Draft {
  id: string;
  editor_email: string;
  type_key: string;
  /** The entry's file name; empty for an entry that has not been created yet. */
  slug: string;
  title: string;
  state: Record<string, unknown>;
  body: string | null;
  /** Version (git blob SHA) of the saved entry the draft started from. */
  base_sha: string;
  created_at: string;
  updated_at: string;
}

export interface DraftInput {
  id?: string;
  typeKey: string;
  slug: string;
  title: string;
  state: Record<string, unknown>;
  body: string | null;
  baseSha: string;
}

export const MAX_DRAFT_BYTES = 1_000_000;

const memory: Draft[] = ((globalThis as Record<string, unknown>).__adminDrafts ??= []) as Draft[];

async function db() {
  return (await import("./supabase-server")).dbClient();
}

export async function saveDraft(email: string, input: DraftInput): Promise<Draft> {
  const owner = email.toLowerCase();
  const now = new Date().toISOString();
  const fields = { type_key: input.typeKey, slug: input.slug, title: input.title, state: input.state, body: input.body, base_sha: input.baseSha, updated_at: now };
  if (isLocalDevMode()) {
    const found = memory.find((d) => d.editor_email === owner && (input.id ? d.id === input.id : input.slug !== "" && d.type_key === input.typeKey && d.slug === input.slug));
    if (found) return Object.assign(found, fields);
    const row: Draft = { id: randomUUID(), editor_email: owner, created_at: now, ...fields };
    memory.unshift(row);
    return row;
  }
  const client = await db();
  if (input.id) {
    const { data, error } = await client.from("admin_drafts").update(fields).eq("id", input.id).eq("editor_email", owner).select().maybeSingle();
    if (error) throw new Error(`Could not save the draft: ${error.message}`);
    if (data) return data as Draft;
  }
  const query =
    input.slug !== ""
      ? client.from("admin_drafts").upsert({ editor_email: owner, ...fields }, { onConflict: "editor_email,type_key,slug" })
      : client.from("admin_drafts").insert({ editor_email: owner, ...fields });
  const { data, error } = await query.select().single();
  if (error) throw new Error(`Could not save the draft: ${error.message}`);
  return data as Draft;
}

/** This editor's draft of an existing entry, if they have one. */
export async function findDraft(email: string, typeKey: string, slug: string): Promise<Draft | null> {
  const owner = email.toLowerCase();
  if (isLocalDevMode()) return memory.find((d) => d.editor_email === owner && d.type_key === typeKey && d.slug === slug) ?? null;
  const { data, error } = await (await db()).from("admin_drafts").select("*").eq("editor_email", owner).eq("type_key", typeKey).eq("slug", slug).maybeSingle();
  if (error) throw new Error(`Could not read your draft: ${error.message}`);
  return (data as Draft) ?? null;
}

export async function getDraft(email: string, id: string): Promise<Draft | null> {
  const owner = email.toLowerCase();
  if (isLocalDevMode()) return memory.find((d) => d.editor_email === owner && d.id === id) ?? null;
  const { data, error } = await (await db()).from("admin_drafts").select("*").eq("editor_email", owner).eq("id", id).maybeSingle();
  if (error) throw new Error(`Could not read your draft: ${error.message}`);
  return (data as Draft) ?? null;
}

export async function listDrafts(email: string): Promise<Draft[]> {
  const owner = email.toLowerCase();
  if (isLocalDevMode()) return memory.filter((d) => d.editor_email === owner);
  const { data, error } = await (await db()).from("admin_drafts").select("*").eq("editor_email", owner).order("updated_at", { ascending: false }).limit(200);
  if (error) throw new Error(`Could not read your drafts: ${error.message}`);
  return (data ?? []) as Draft[];
}

export async function deleteDraft(email: string, id: string): Promise<void> {
  const owner = email.toLowerCase();
  if (isLocalDevMode()) {
    const i = memory.findIndex((d) => d.editor_email === owner && d.id === id);
    if (i >= 0) memory.splice(i, 1);
    return;
  }
  const { error } = await (await db()).from("admin_drafts").delete().eq("editor_email", owner).eq("id", id);
  if (error) throw new Error(`Could not delete the draft: ${error.message}`);
}

/** Once an entry is published, the draft of it is no longer needed. Never fails a save. */
export async function clearDraftsFor(email: string, typeKey: string, slug: string, id?: string): Promise<void> {
  try {
    const found = id ? await getDraft(email, id) : slug ? await findDraft(email, typeKey, slug) : null;
    if (found) await deleteDraft(email, found.id);
  } catch (err) {
    console.error("could not clear draft", err);
  }
}
