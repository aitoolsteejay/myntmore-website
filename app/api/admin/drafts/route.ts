import { NextRequest, NextResponse } from "next/server";
import { canEdit, currentEditor } from "@/lib/admin/auth";
import { deleteDraft, MAX_DRAFT_BYTES, saveDraft } from "@/lib/admin/drafts";
import { enabledType } from "@/lib/admin/entries";
import { isValidSlug } from "@/lib/admin/schema";

export const dynamic = "force-dynamic";

// Save the signed-in editor's draft. It is stored against their own email only and goes nowhere else.
export async function POST(req: NextRequest) {
  const editor = await currentEditor().catch(() => null);
  if (!editor) return NextResponse.json({ error: "Sign in with an editor account to save a draft." }, { status: 401 });
  const raw = await req.text();
  if (raw.length > MAX_DRAFT_BYTES) return NextResponse.json({ error: "This draft is too large to save." }, { status: 413 });
  let b: Record<string, unknown> | null = null;
  try {
    b = JSON.parse(raw);
  } catch {}
  const type = b && typeof b.typeKey === "string" ? enabledType(b.typeKey) : undefined;
  if (!b || !type || typeof b.state !== "object" || b.state === null) return NextResponse.json({ error: "The draft was incomplete. Reload and try again." }, { status: 400 });
  if (!canEdit(editor, type.key)) return NextResponse.json({ error: "Your account can view this content but not change it." }, { status: 403 });
  const slug = typeof b.slug === "string" ? b.slug : "";
  if (slug !== "" && !isValidSlug(slug)) return NextResponse.json({ error: "Bad file name." }, { status: 400 });
  try {
    const draft = await saveDraft(editor.email, {
      id: typeof b.id === "string" ? b.id : undefined,
      typeKey: type.key,
      slug,
      title: typeof b.title === "string" ? b.title.slice(0, 200) : "",
      state: b.state as Record<string, unknown>,
      body: typeof b.body === "string" ? b.body : null,
      baseSha: typeof b.baseSha === "string" ? b.baseSha : "",
    });
    return NextResponse.json({ id: draft.id, updatedAt: draft.updated_at });
  } catch (err) {
    console.error("draft save failed", err);
    return NextResponse.json({ error: "Could not save the draft. Your edits are still in the form." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const editor = await currentEditor().catch(() => null);
  if (!editor) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const id = req.nextUrl.searchParams.get("id") ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Bad draft." }, { status: 400 });
  try {
    await deleteDraft(editor.email, id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("draft delete failed", err);
    return NextResponse.json({ error: "Could not delete the draft." }, { status: 500 });
  }
}
