import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EntryEditor from "@/components/admin/EntryEditor";
import { canEdit, canView, currentEditor } from "@/lib/admin/auth";
import { enabledType, isCreatable, listEntries, loadEntry, relationshipOptions } from "@/lib/admin/entries";
import { FileProblems } from "@/lib/admin/entry-view";
import { describeType, singletonSlug } from "@/lib/admin/schema";

export async function generateMetadata({ params }: { params: { type: string } }): Promise<Metadata> {
  return { title: enabledType(params.type)?.label ?? "Content" };
}

// A collection shows its list of entries; a singleton (one file, e.g. the cold email service copy) opens straight in the editor.
export default async function TypePage({ params }: { params: { type: string } }) {
  const editor = (await currentEditor())!;
  const type = enabledType(params.type);
  if (!type || !canView(editor, type.key)) notFound();

  if (type.kind === "singleton") {
    const entry = await loadEntry(type);
    if (!entry) notFound();
    const fields = describeType(type);
    return (
      <>
        <Link href="/admin" className="text-sm font-semibold text-[#A14A08] hover:underline">
          ← Content
        </Link>
        <h1 className="mt-2 text-3xl font-black">{type.label}</h1>
        <p className="mt-1 font-mono text-xs text-[#71675E]">{type.path}.json</p>
        <FileProblems errors={entry.errors} />
        <EntryEditor
          typeKey={type.key}
          slug={singletonSlug(type)}
          fields={fields}
          initialState={entry.state}
          initialSha={entry.sha}
          choices={await relationshipOptions(fields)}
          entryHref={`/admin/content/${type.key}`}
          readOnly={!canEdit(editor, type.key) || entry.errors.length > 0}
        />
      </>
    );
  }

  const entries = await listEntries(type);
  const canCreate = isCreatable(type) && canEdit(editor, type.key);
  return (
    <>
      <Link href="/admin" className="text-sm font-semibold text-[#A14A08] hover:underline">
        ← Content
      </Link>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-3xl font-black">{type.label}</h1>
        {canCreate && (
          <Link href={`/admin/content/${type.key}/new`} className="rounded-lg bg-[#0A0A0A] px-4 py-2 text-sm font-bold text-white hover:bg-[#27272A]">
            + New
          </Link>
        )}
      </div>
      <p className="mt-1 text-sm text-[#52525B]">
        {entries.length} entries, read from the latest version on GitHub.
        {!isCreatable(type) && " New ones need a code change, so a developer adds them."}
      </p>
      <ul className="mt-6 divide-y divide-[#E8E2D9] rounded-xl border border-[#E8E2D9] bg-white">
        {entries.map((e) => (
          <li key={e.slug}>
            <Link
              href={`/admin/content/${type.key}/${e.slug}`}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-3 hover:bg-[#FEF9EC]"
            >
              <span className="font-semibold">{e.title}</span>
              <span className="font-mono text-xs text-[#71675E]">{e.slug}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
