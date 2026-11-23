// Managing who may use the admin: list, invite, change role, remove access. Admins only (checked by the
// callers). Rows live in Supabase admin_editors; in local development they are kept in memory.
//
// An invite adds the person to admin_editors and emails them a sign-in link, the same link the sign-in
// page sends (Supabase "Confirm signup" for a new address, "Magic link" for one that signed in before).
// If the email cannot be sent (Supabase's built-in mailer allows only a few an hour), the person is still
// added and can request a link themselves at /admin/login.
import "server-only";
import { recordActivity } from "./activity";
import type { Editor, Role } from "./auth";
import { isLocalDevMode } from "./store";

export interface EditorRow {
  email: string;
  name: string;
  role: Role;
  allowed_types: string[] | null;
  active: boolean;
  created_at: string;
}

export const ROLES: { value: Role; label: string; help: string }[] = [
  { value: "admin", label: "Admin", help: "Edits everything, sees the activity log, manages editors" },
  { value: "editor", label: "Editor", help: "Edits content" },
  { value: "viewer", label: "Viewer", help: "Can look, cannot change anything" },
];

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Local development: a small in-memory list.
const memory: EditorRow[] = ((globalThis as Record<string, unknown>).__adminEditors ??= [
  { email: "dev@localhost", name: "Local developer", role: "admin", allowed_types: null, active: true, created_at: new Date().toISOString() },
]) as EditorRow[];

async function db() {
  const { dbClient } = await import("./supabase-server");
  return dbClient();
}

export async function listEditors(): Promise<EditorRow[]> {
  if (isLocalDevMode()) return memory.slice().sort((a, b) => a.email.localeCompare(b.email));
  const { data, error } = await (await db()).from("admin_editors").select("email, name, role, allowed_types, active, created_at").order("email");
  if (error) throw new Error(`Could not read the editors: ${error.message}`);
  return (data ?? []) as EditorRow[];
}

async function getRow(email: string): Promise<EditorRow | null> {
  return (await listEditors()).find((e) => e.email === email) ?? null;
}

async function upsert(row: Omit<EditorRow, "created_at">): Promise<void> {
  if (isLocalDevMode()) {
    const i = memory.findIndex((e) => e.email === row.email);
    if (i >= 0) memory[i] = { ...memory[i], ...row };
    else memory.push({ ...row, created_at: new Date().toISOString() });
    return;
  }
  const { error } = await (await db()).from("admin_editors").upsert(row, { onConflict: "email" });
  if (error) throw new Error(`Could not save the editor: ${error.message}`);
}

/** Emails a sign-in link. Returns a problem to show, or null when sent. */
async function sendLink(email: string, origin: string): Promise<string | null> {
  if (isLocalDevMode()) return "Local development: no email is sent.";
  // A stateless client, so sending someone else a link leaves the admin's own session cookies alone.
  const { createClient } = await import("@supabase/supabase-js");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false, flowType: "implicit" },
  });
  const { error } = await client.auth.signInWithOtp({ email, options: { emailRedirectTo: `${origin}/admin/auth/callback?next=/admin`, shouldCreateUser: true } });
  if (!error) return null;
  console.error("admin invite: could not send link", error.message);
  return /rate|limit|too many/i.test(error.message)
    ? "Supabase's email limit was reached, so no email went out this time."
    : `The email could not be sent (${error.message}).`;
}

async function log(by: Editor, action: "create" | "update" | "delete", email: string, changes: { path: string; before: unknown; after: unknown }[]) {
  try {
    await recordActivity({
      editor_email: by.email,
      editor_name: by.name,
      action,
      content_type: "editors",
      content_label: "Editors",
      entry: email,
      files: [],
      commit_sha: "",
      commit_url: null,
      changes,
      reverts_id: null,
    });
  } catch (err) {
    console.error("admin editors: could not log", err);
  }
}

export type EditorResult = { ok: true; message: string; warning?: string } | { ok: false; status: 400 | 404 | 409; message: string };

/** Add someone (or re-activate them) and email them a sign-in link. */
export async function inviteEditor(input: { email: string; name: string; role: Role }, by: Editor, origin: string): Promise<EditorResult> {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();
  if (!EMAIL.test(email) || email.length > 254) return { ok: false, status: 400, message: "Enter a valid email address." };
  if (!ROLES.some((r) => r.value === input.role)) return { ok: false, status: 400, message: "Choose a role." };
  const existing = await getRow(email);
  if (existing?.active) return { ok: false, status: 409, message: `${email} already has access. Use "Send sign-in link" next to their name to email them again.` };

  await upsert({ email, name: name || existing?.name || "", role: input.role, allowed_types: existing?.allowed_types ?? null, active: true });
  await log(by, existing ? "update" : "create", email, [
    ...(existing ? [{ path: "active", before: false, after: true }] : []),
    { path: "role", before: existing?.role ?? null, after: input.role },
  ]);
  const problem = await sendLink(email, origin);
  return problem
    ? { ok: true, message: `Added ${email}.`, warning: `${problem} They can sign in at /admin with their email to get a link.` }
    : { ok: true, message: `Invited ${email}. They will get an email with a sign-in link.` };
}

export async function resendLink(email: string, origin: string): Promise<EditorResult> {
  const row = await getRow(email.toLowerCase());
  if (!row || !row.active) return { ok: false, status: 404, message: "This person does not have access." };
  const problem = await sendLink(row.email, origin);
  return problem ? { ok: true, message: "Not sent.", warning: problem } : { ok: true, message: `Sign-in link sent to ${row.email}.` };
}

/** Change someone's role or name, or remove / restore their access. */
export async function updateEditor(email: string, patch: { role?: Role; name?: string; active?: boolean }, by: Editor): Promise<EditorResult> {
  const row = await getRow(email.toLowerCase());
  if (!row) return { ok: false, status: 404, message: "No such editor." };
  if (patch.role !== undefined && !ROLES.some((r) => r.value === patch.role)) return { ok: false, status: 400, message: "Choose a role." };

  const next = { ...row, ...Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined)) } as EditorRow;
  if (typeof patch.name === "string") next.name = patch.name.trim();
  const losesAdmin = row.role === "admin" && row.active && (next.role !== "admin" || !next.active);
  if (losesAdmin && row.email === by.email) return { ok: false, status: 400, message: "You cannot remove your own admin access. Ask another admin to do it." };
  if (losesAdmin && (await listEditors()).filter((e) => e.role === "admin" && e.active).length <= 1) {
    return { ok: false, status: 400, message: "There must always be at least one admin." };
  }

  const changes = (["role", "name", "active"] as const).filter((k) => next[k] !== row[k]).map((k) => ({ path: k, before: row[k], after: next[k] }));
  if (!changes.length) return { ok: true, message: "No changes." };
  await upsert({ email: row.email, name: next.name, role: next.role, allowed_types: row.allowed_types, active: next.active });
  await log(by, patch.active === false ? "delete" : "update", row.email, changes);
  return { ok: true, message: patch.active === false ? `Removed access for ${row.email}.` : patch.active === true ? `Restored access for ${row.email}.` : `Updated ${row.email}.` };
}
