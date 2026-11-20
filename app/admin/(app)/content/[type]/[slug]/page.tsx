import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import EntryEditor from "@/components/admin/EntryEditor";
import { canEdit, canView, currentEditor } from "@/lib/admin/auth";
import { enabledType, loadEntry, relationshipOptions } from "@/lib/admin/entries";
import { entryTitle, FileProblems } from "@/lib/admin/entry-view";
import { nameIsFileName } from "@/lib/admin/rules";
import { describeType, isValidSlug } from "@/lib/admin/schema";

export async function generateMetadata({ params }: { params: { type: string; slug: string } }): Promise<Metadata> {
  return { title: `${params.slug} · ${enabledType(params.type)?.label ?? "Content"}` };
}

export default async function EditEntry({ params, searchParams }: { params: { type: string; slug: string }; searchParams: { created?: string } }) {
  const editor = (await currentEditor())!;
  const type = enabledType(params.type);
  if (!type || !canView(editor, type.key) || !isValidSlug(params.slug)) notFound();
  // Activity rows link to every entry the same way; a singleton is edited on its type's page.
  if (type.kind === "singleton") redirect(`/admin/content/${type.key}`);
  const entry = await loadEntry(type, params.slug);
  if (!entry) notFound();
  const fields = describeType(type);
  return (
    <>
      <Link href={`/admin/content/${type.key}`} className="text-sm font-semibold text-[#A14A08] hover:underline">
        ← {type.label}
      </Link>
      <h1 className="mt-2 text-3xl font-black">{entryTitle(entry.state, type.slugField) ?? params.slug}</h1>
      <p className="mt-1 font-mono text-xs text-[#71675E]">{params.slug}</p>
      {searchParams.created && (
        <p role="status" className="mt-4 rounded-lg border border-[#BBE5C8] bg-[#ECFDF3] p-3 text-sm text-[#166534]">
          Created. The page goes live with the next deploy, usually in about 2 minutes.
        </p>
      )}
      <FileProblems errors={entry.errors} />
      <EntryEditor
        typeKey={type.key}
        slug={params.slug}
        fields={fields}
        initialState={entry.state}
        initialSha={entry.sha}
        choices={await relationshipOptions(fields)}
        entryHref={`/admin/content/${type.key}/${params.slug}`}
        nameIsFileName={nameIsFileName(type)}
        readOnly={!canEdit(editor, type.key) || entry.errors.length > 0}
      />
    </>
  );
}
