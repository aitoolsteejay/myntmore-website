import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EntryEditor from "@/components/admin/EntryEditor";
import { canEdit, currentEditor } from "@/lib/admin/auth";
import { enabledType, isCreatable, listEntries, loadEntry, relationshipOptions } from "@/lib/admin/entries";
import { formSections } from "@/lib/admin/entry-view";
import { companionFaqId, nameIsFileName } from "@/lib/admin/rules";
import { describeType, isValidSlug, parseEntry } from "@/lib/admin/schema";

export async function generateMetadata({ params }: { params: { type: string } }): Promise<Metadata> {
  return { title: `New · ${enabledType(params.type)?.label ?? "Content"}` };
}

// New entry. Most pages have many required parts with exact counts, so the form can start from a copy of
// an existing entry (?from=<slug>) and only the name and file name start empty.
export default async function NewEntry({ params, searchParams }: { params: { type: string }; searchParams: { from?: string } }) {
  const editor = (await currentEditor())!;
  const type = enabledType(params.type);
  if (!type || !isCreatable(type) || !type.slugField || !canEdit(editor, type.key)) notFound();

  const from = searchParams.from && isValidSlug(searchParams.from) ? searchParams.from : null;
  const source = from ? await loadEntry(type, from) : null;
  const state = source && !source.errors.length ? source.state : parseEntry(type, "{}").state;
  state[type.slugField] = { name: "", slug: "" };

  const fields = describeType(type);
  const entries = await listEntries(type);
  return (
    <>
      <Link href={`/admin/content/${type.key}`} className="text-sm font-semibold text-[#A14A08] hover:underline">
        ← {type.label}
      </Link>
      <h1 className="mt-2 text-3xl font-black">Add new: {type.label}</h1>
      <form method="get" className="mt-4 flex flex-wrap items-end gap-2 rounded-xl border border-[#E8E2D9] bg-white p-4 text-sm">
        <label className="min-w-[16rem] flex-1">
          <span className="block font-semibold">Start from a copy of</span>
          <select name="from" defaultValue={from ?? ""} className="mt-1 w-full rounded-lg border border-[#E8E2D9] bg-white px-3 py-2">
            <option value="">Nothing (empty form)</option>
            {entries.map((e) => (
              <option key={e.slug} value={e.slug}>
                {e.title}
              </option>
            ))}
          </select>
        </label>
        <button className="rounded-lg border border-[#C9BFB2] px-4 py-2 font-semibold hover:border-[#A14A08]">Load</button>
        <p className="w-full text-[13px] text-[#71675E]">
          {source ? `Copied from "${from}". Change everything that is specific to that page before creating.` : "Copying an existing entry is quickest: it already has the right number of items in each list."}
        </p>
      </form>
      <EntryEditor
        key={from ?? ""}
        typeKey={type.key}
        slug=""
        mode="create"
        fields={fields}
        sections={formSections(type)}
        initialState={state}
        initialSha=""
        choices={await relationshipOptions(fields)}
        entryHref={`/admin/content/${type.key}/new`}
        needsFaq={companionFaqId(type, "x") !== null}
        nameIsFileName={nameIsFileName(type)}
        readOnly={false}
      />
    </>
  );
}
