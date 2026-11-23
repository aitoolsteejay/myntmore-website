import { NextRequest, NextResponse } from "next/server";
import { currentEditor, type Role } from "@/lib/admin/auth";
import { inviteEditor, resendLink, updateEditor } from "@/lib/admin/editors";

export const dynamic = "force-dynamic";

// Editor management, admins only. POST { action: "invite" | "resend" | "update", ... }.
export async function POST(req: NextRequest) {
  const editor = await currentEditor().catch(() => null);
  if (!editor) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  if (editor.role !== "admin") return NextResponse.json({ error: "Only admins can manage editors." }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "The form data was incomplete." }, { status: 400 });
  const origin = new URL(req.url).origin;
  const str = (v: unknown) => (typeof v === "string" ? v : "");

  try {
    let result;
    if (body.action === "invite") result = await inviteEditor({ email: str(body.email), name: str(body.name), role: str(body.role) as Role }, editor, origin);
    else if (body.action === "resend") result = await resendLink(str(body.email), origin);
    else if (body.action === "update")
      result = await updateEditor(
        str(body.email),
        {
          role: typeof body.role === "string" ? (body.role as Role) : undefined,
          name: typeof body.name === "string" ? body.name : undefined,
          active: typeof body.active === "boolean" ? body.active : undefined,
        },
        editor,
      );
    else return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    if (!result.ok) return NextResponse.json({ error: result.message }, { status: result.status });
    return NextResponse.json(result);
  } catch (err) {
    console.error("admin editors:", err);
    return NextResponse.json({ error: "Could not save. Nothing was changed." }, { status: 500 });
  }
}
