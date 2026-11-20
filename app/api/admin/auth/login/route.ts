import { NextRequest, NextResponse } from "next/server";
import { findEditor } from "@/lib/admin/auth";
import { safeAdminPath } from "@/lib/admin/redirect";
import { authClient, dbClient } from "@/lib/admin/supabase-server";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

// Sends a sign-in link, but only to active editors. Every request gets the same answer, so the
// form does not reveal who is an editor. Rate limited per IP so it cannot be used to spam inboxes.
export async function POST(req: NextRequest) {
  const retryAfter = rateLimit(`admin-login:${getClientIp(req)}`, 5, 15 * 60 * 1000);
  if (retryAfter > 0) return NextResponse.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });

  const body = await req.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });

  try {
    const editor = await findEditor(email, dbClient());
    if (editor) {
      const next = safeAdminPath(typeof body.next === "string" ? body.next : null);
      const origin = new URL(req.url).origin;
      const { error } = await authClient().auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${origin}/admin/auth/callback?next=${encodeURIComponent(next)}`, shouldCreateUser: true },
      });
      if (error) console.error("admin login: could not send link", error.message);
    }
  } catch (err) {
    console.error("admin login:", err);
    return NextResponse.json({ error: "Sign-in is not available right now." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
