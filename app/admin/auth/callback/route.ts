import type { EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { safeAdminPath } from "@/lib/admin/redirect";
import { authClient } from "@/lib/admin/supabase-server";

// Where the emailed sign-in link lands. Supports both link styles Supabase can send:
//  - ?token_hash=...&type=magiclink  (works on any device; see docs/admin-setup.md for the email template)
//  - ?code=...                       (default; must be opened in the browser that asked for the link)
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const next = safeAdminPath(url.searchParams.get("next"));
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const code = url.searchParams.get("code");
  const supabase = authClient();

  let ok = false;
  if (tokenHash && type) ok = !(await supabase.auth.verifyOtp({ type, token_hash: tokenHash })).error;
  else if (code) ok = !(await supabase.auth.exchangeCodeForSession(code)).error;

  return NextResponse.redirect(new URL(ok ? next : "/admin/login?error=link", url.origin));
}
