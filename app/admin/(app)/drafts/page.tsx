import type { Metadata } from "next";
import Link from "next/link";
import { currentEditor } from "@/lib/admin/auth";
import { catalogEntry } from "@/lib/admin/catalog";
import { listDrafts } from "@/lib/admin/drafts";
import { allTypes } from "@/lib/admin/entries";

export const metadata: Metadata = { title: "My drafts" };

// Only the signed-in editor's own drafts. Nobody else can see them, admins included.
export default async function MyDrafts() {
  const editor = (await currentEditor())!;
  const drafts = await listDrafts(editor.email);
  const labels = new Map(allTypes().map((t) => [t.key, catalogEntry(t.key, t.label).title]));
  return (
    <>
      <h1 className="text-3xl font-black">My drafts</h1>
      <p className="mt-1 max-w-2xl text-sm text-[#52525B]">Work you saved for later. Only you can see these, and nothing here is published until you open a draft and press &ldquo;Save and publish&rdquo;.</p>
      {drafts.length === 0 ? (
        <p className="mt-6 rounded-xl border border-[#E8E2D9] bg-white p-5 text-sm text-[#52525B]">No drafts yet. While editing any page, press &ldquo;Save draft&rdquo; to keep your work here.</p>
      ) : (
        <ul className="mt-6 divide-y divide-[#E8E2D9] rounded-xl border border-[#E8E2D9] bg-white">
          {drafts.map((d) => (
            <li key={d.id}>
              <Link href={d.slug ? `/admin/content/${d.type_key}/${d.slug}` : `/admin/content/${d.type_key}/new?draft=${d.id}`} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3 hover:bg-[#FEF9EC]">
                <span>
                  <span className="font-semibold">{d.title || d.slug || "Untitled"}</span>
                  <span className="ml-2 text-sm text-[#71675E]">
                    {labels.get(d.type_key) ?? d.type_key}
                    {d.slug ? "" : " · new, not created yet"}
                  </span>
                </span>
                <span className="text-xs text-[#71675E]">{new Date(d.updated_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
