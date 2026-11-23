import { NextRequest, NextResponse } from "next/server";
import { findEditor } from "@/lib/admin/auth";
import { authClient, dbClient } from "@/lib/admin/supabase-server";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

// Email + password sign-in. Only active editors get in; everyone else gets the same "wrong email or
// password" answer, so the form does not reveal who has access. Rate limited per IP and per email.
const WRONG = "That email and password don't match. Check them and try again, or ask an admin to set a new password.";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });

  const ipWait = rateLimit(`admin-login:${getClientIp(req)}`, 10, 15 * 60 * 1000);
  const emailWait = rateLimit(`admin-login-email:${email}`, 10, 15 * 60 * 1000);
  if (ipWait > 0 || emailWait > 0) return NextResponse.json({ error: "Too many attempts. Wait 15 minutes and try again." }, { status: 429 });

  try {
    const supabase = authClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return NextResponse.json({ error: WRONG }, { status: 401 });
    if (!(await findEditor(email, dbClient()))) {
      await supabase.auth.signOut();
      return NextResponse.json({ error: WRONG }, { status: 401 });
    }
  } catch (err) {
    console.error("admin login:", err);
    return NextResponse.json({ error: "Sign-in is not available right now." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
