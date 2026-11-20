import { NextRequest, NextResponse } from "next/server";
import { canEdit, currentEditor } from "@/lib/admin/auth";
import { createEntry, enabledType, isCreatable } from "@/lib/admin/entries";

export const dynamic = "force-dynamic";

// Create a new entry (and, for pages that show FAQs, its first question): one commit to master.
export async function POST(req: NextRequest, { params }: { params: { type: string } }) {
  const editor = await currentEditor().catch(() => null);
  if (!editor) return NextResponse.json({ error: "Sign in with an editor account to save." }, { status: 401 });

  const type = enabledType(params.type);
  if (!type || !isCreatable(type)) return NextResponse.json({ error: "New entries of this type are added by a developer." }, { status: 404 });
  if (!canEdit(editor, type.key)) return NextResponse.json({ error: "Your account can view this content but not change it." }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body.state !== "object" || body.state === null) {
    return NextResponse.json({ error: "The form data was incomplete. Reload and try again." }, { status: 400 });
  }
  const faq =
    body.faq && typeof body.faq === "object" ? { question: String(body.faq.question ?? ""), answer: String(body.faq.answer ?? "") } : null;

  try {
    const result = await createEntry(type, body.state, faq, editor);
    if (!result.ok) return NextResponse.json({ error: result.message, errors: result.errors }, { status: result.status });
    return NextResponse.json(result);
  } catch (err) {
    console.error("admin create failed", err);
    return NextResponse.json({ error: "Could not create it. Nothing was changed; your entry is still in the form." }, { status: 500 });
  }
}
