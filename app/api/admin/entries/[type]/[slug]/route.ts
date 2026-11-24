import { NextRequest, NextResponse } from "next/server";
import { canEdit, currentEditor } from "@/lib/admin/auth";
import { clearDraftsFor } from "@/lib/admin/drafts";
import { enabledType, isPosts, savePostEntry, saveEntry } from "@/lib/admin/entries";

export const dynamic = "force-dynamic";

// Save an edited entry: one commit to master with the editor as author, then an activity log row.
export async function POST(req: NextRequest, { params }: { params: { type: string; slug: string } }) {
  const editor = await currentEditor().catch(() => null);
  if (!editor) return NextResponse.json({ error: "Sign in with an editor account to save." }, { status: 401 });

  const type = enabledType(params.type);
  if (!type) return NextResponse.json({ error: "This content type cannot be edited here." }, { status: 404 });
  if (!canEdit(editor, type.key)) return NextResponse.json({ error: "Your account can view this content but not change it." }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body.state !== "object" || body.state === null || typeof body.sha !== "string") {
    return NextResponse.json({ error: "The form data was incomplete. Reload and try again." }, { status: 400 });
  }

  try {
    const result = isPosts(type)
      ? await savePostEntry(params.slug, body.state, typeof body.body === "string" ? body.body : "", body.sha, editor)
      : await saveEntry(type, params.slug, body.state, body.sha, editor);
    if (!result.ok) return NextResponse.json({ error: result.message, errors: result.errors }, { status: result.status });
    await clearDraftsFor(editor.email, type.key, params.slug, typeof body.draftId === "string" ? body.draftId : undefined);
    return NextResponse.json(result);
  } catch (err) {
    console.error("admin save failed", err);
    return NextResponse.json({ error: "Could not save. Nothing was changed; your edits are still in the form." }, { status: 500 });
  }
}
