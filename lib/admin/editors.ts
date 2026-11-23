// Managing who may use the admin: list, invite, change role, remove access. Admins only (checked by the
// callers). Rows live in Supabase admin_editors; in local development they are kept in memory.
//
// Sign-in uses the team's existing Myntmore logins (Supabase email + password accounts). Having a login is
// not enough: only people listed here (admin_editors, active) get in. Adding someone who already has a
// login leaves their password alone; for someone new, a login is created and the admin gets the password
// to pass on. No email is ever sent.
import "server-only";
import { recordActivity } from "./activity";
import type { Editor, Role } from "./auth";
import { ensureAccount, generatePassword, passwordProblem, setAccountPassword } from "./passwords";
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

export type EditorResult = { ok: true; message: string; warning?: string; password?: string } | { ok: false; status: 400 | 404 | 409; message: string };

/** The password to use: the one the admin typed, or a generated one. */
function choosePassword(typed: string | undefined): { password: string } | { problem: string } {
  const password = typed?.trim() ? typed : generatePassword();
  const problem = passwordProblem(password);
  return problem ? { problem } : { password };
}

/** Add someone (or re-activate them) with a password the admin passes on. */
export async function inviteEditor(input: { email: string; name: string; role: Role; password?: string }, by: Editor): Promise<EditorResult> {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();
  if (!EMAIL.test(email) || email.length > 254) return { ok: false, status: 400, message: "Enter a valid email address." };
  if (!ROLES.some((r) => r.value === input.role)) return { ok: false, status: 400, message: "Choose a role." };
  const existing = await getRow(email);
  if (existing?.active) return { ok: false, status: 409, message: `${email} already has access. Use "Set new password" next to their name if they need a new one.` };
  const chosen = choosePassword(input.password);
  if ("problem" in chosen) return { ok: false, status: 400, message: chosen.problem };
  const { created } = isLocalDevMode() ? { created: true } : await ensureAccount(email, chosen.password);

  await upsert({ email, name: name || existing?.name || "", role: input.role, allowed_types: existing?.allowed_types ?? null, active: true });
  await log(by, existing ? "update" : "create", email, [
    ...(existing ? [{ path: "active", before: false, after: true }] : []),
    { path: "role", before: existing?.role ?? null, after: input.role },
  ]);
  if (!created) return { ok: true, message: `Added ${email}. They already have a Myntmore login, so they sign in at myntmore.com/admin with their usual email and password.` };
  return { ok: true, message: `Added ${email} and created a login for them. Send them the address myntmore.com/admin, their email and this password:`, password: chosen.password };
}

/** Set a new password for someone (they forgot theirs, or it should be changed). */
export async function resetPassword(email: string, typed: string | undefined, by: Editor): Promise<EditorResult> {
  const row = await getRow(email.toLowerCase());
  if (!row || !row.active) return { ok: false, status: 404, message: "This person does not have access." };
  const chosen = choosePassword(typed);
  if ("problem" in chosen) return { ok: false, status: 400, message: chosen.problem };
  if (!isLocalDevMode()) await setAccountPassword(row.email, chosen.password);
  await log(by, "update", row.email, [{ path: "password", before: "(old password)", after: "(new password set)" }]);
  return { ok: true, message: `New password for ${row.email}. Their old password no longer works here or in other Myntmore tools that use the same login. Send them this one:`, password: chosen.password };
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
