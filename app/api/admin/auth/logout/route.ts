import { NextResponse } from "next/server";
import { authClient } from "@/lib/admin/supabase-server";
import { isLocalDevMode } from "@/lib/admin/store";

export async function POST(req: Request) {
  if (!isLocalDevMode()) await authClient().auth.signOut();
  return NextResponse.redirect(new URL("/admin/login", req.url), { status: 303 });
}
