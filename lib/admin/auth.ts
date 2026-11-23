// Who is signed in to the admin, and what they may do. Checked on the server for every page and
// every API call; the browser is never trusted with a role.
import "server-only";
import { isLocalDevMode } from "./store";

export type Role = "admin" | "editor" | "viewer";

export interface Editor {
  email: string;
  name: string;
  role: Role;
  /** Content type keys this person may edit; null means all. */
  allowedTypes: string[] | null;
}

const LOCAL_EDITOR: Editor = { email: "dev@localhost", name: "Local developer", role: "admin", allowedTypes: null };

/** The signed-in editor, or null if nobody is signed in or the account is not an active editor. */
export async function currentEditor(): Promise<Editor | null> {
  if (isLocalDevMode()) return LOCAL_EDITOR;
  const { authClient, dbClient } = await import("./supabase-server");
  const { data } = await authClient().auth.getUser();
  const email = data.user?.email?.toLowerCase();
  if (!email) return null;
  return findEditor(email, dbClient());
}

export async function findEditor(email: string, db: Awaited<ReturnType<typeof import("./supabase-server").dbClient>>): Promise<Editor | null> {
  const { data, error } = await db.from("admin_editors").select("email, name, role, allowed_types, active").eq("email", email.toLowerCase()).maybeSingle();
  if (error) throw new Error(`Could not check editor access: ${error.message}`);
  if (!data || !data.active) return null;
  return { email: data.email, name: data.name || data.email, role: data.role as Role, allowedTypes: data.allowed_types ?? null };
}

export function canView(editor: Editor, typeKey: string): boolean {
  return editor.role === "admin" || editor.allowedTypes === null || editor.allowedTypes.includes(typeKey);
}

export function canEdit(editor: Editor, typeKey: string): boolean {
  return editor.role !== "viewer" && canView(editor, typeKey);
}

/** Undo and other actions that change someone else's work are for admins. */
export function canUndo(editor: Editor): boolean {
  return editor.role === "admin";
}
