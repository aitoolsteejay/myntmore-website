import { NextRequest, NextResponse } from "next/server";
import { currentEditor } from "@/lib/admin/auth";
import { passwordProblem } from "@/lib/admin/passwords";
import { isLocalDevMode } from "@/lib/admin/store";
import { authClient } from "@/lib/admin/supabase-server";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

// Change your own password. The current one is checked first, so a session left open on a shared
// computer cannot be used to take over the account.
export async function POST(req: NextRequest) {
  const editor = await currentEditor().catch(() => null);
  if (!editor) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  if (rateLimit(`admin-password:${getClientIp(req)}`, 10, 15 * 60 * 1000) > 0) return NextResponse.json({ error: "Too many attempts. Wait 15 minutes." }, { status: 429 });

  const body = await req.json().catch(() => ({}));
  const current = typeof body.current === "string" ? body.current : "";
  const next = typeof body.next === "string" ? body.next : "";
  const problem = passwordProblem(next);
  if (problem) return NextResponse.json({ error: problem }, { status: 400 });
  if (next === current) return NextResponse.json({ error: "The new password is the same as the current one." }, { status: 400 });
  if (isLocalDevMode()) return NextResponse.json({ ok: true, message: "Local development: passwords are not used." });

  const supabase = authClient();
  const check = await supabase.auth.signInWithPassword({ email: editor.email, password: current });
  if (check.error) return NextResponse.json({ error: "Your current password is not right." }, { status: 400 });
  const { error } = await supabase.auth.updateUser({ password: next });
  if (error) return NextResponse.json({ error: `Could not change it: ${error.message}` }, { status: 400 });
  return NextResponse.json({ ok: true, message: "Password changed. Use the new one next time you sign in." });
}
