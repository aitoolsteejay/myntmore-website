import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EntryEditor from "@/components/admin/EntryEditor";
import { canEdit, canView, currentEditor } from "@/lib/admin/auth";
import { enabledType, loadEntry } from "@/lib/admin/entries";
import { describeType, isValidSlug } from "@/lib/admin/schema";

function entryTitle(state: Record<string, unknown>, slugField?: string): string | undefined {
  const name = slugField ? (state[slugField] as { name?: unknown } | undefined)?.name : undefined;
  return typeof name === "string" && name ? name : undefined;
}

export async function generateMetadata({ params }: { params: { type: string; slug: string } }): Promise<Metadata> {
  return { title: `${params.slug} · ${enabledType(params.type)?.label ?? "Content"}` };
}

export default async function EditEntry({ params }: { params: { type: string; slug: string } }) {
  const editor = (await currentEditor())!;
  const type = enabledType(params.type);
  if (!type || !canView(editor, type.key) || !isValidSlug(params.slug)) notFound();
  const entry = await loadEntry(type, params.slug);
  if (!entry) notFound();
  return (
    <>
      <Link href={`/admin/content/${type.key}`} className="text-sm font-semibold text-[#A14A08] hover:underline">
        ← {type.label}
      </Link>
      <h1 className="mt-2 text-3xl font-black">{entryTitle(entry.state, type.slugField) ?? params.slug}</h1>
      <p className="mt-1 font-mono text-xs text-[#71675E]">{params.slug}</p>
      {entry.errors.length > 0 && (
        <div role="alert" className="mt-4 rounded-lg border border-[#F5C2C0] bg-[#FDECEA] p-3 text-sm text-[#9F1D1D]">
          This file has problems the form cannot show, so saving is off. Ask a developer to look at it.
          <ul className="mt-1 list-disc pl-5">
            {entry.errors.map((e, i) => (
              <li key={i}>
                {e.path.join(".") || "file"}: {e.message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <EntryEditor
        typeKey={type.key}
        slug={params.slug}
        fields={describeType(type)}
        initialState={entry.state}
        initialSha={entry.sha}
        readOnly={!canEdit(editor, type.key) || entry.errors.length > 0}
      />
    </>
  );
}
