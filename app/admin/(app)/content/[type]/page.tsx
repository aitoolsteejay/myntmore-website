import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EntryEditor from "@/components/admin/EntryEditor";
import FilterList from "@/components/admin/FilterList";
import { canEdit, canView, currentEditor } from "@/lib/admin/auth";
import { catalogEntry } from "@/lib/admin/catalog";
import { allTypes, enabledType, isCreatable, listEntries, loadEntry, relationshipOptions } from "@/lib/admin/entries";
import { EntryHeader, FileProblems, formSections, humanize, liveUrl } from "@/lib/admin/entry-view";
import { contentType, describeType, singletonSlug } from "@/lib/admin/schema";

/** The long-form case studies are one file each; this virtual type lists them together. */
const LONG_CASES = "longCaseStudies";
/** The 19 resource guides each have their own sections; this virtual type lists them together. */
const GUIDES = "guides";

export async function generateMetadata({ params }: { params: { type: string } }): Promise<Metadata> {
  if (params.type === LONG_CASES) return { title: "Long-form case studies" };
  if (params.type === GUIDES) return { title: "Resource guides" };
  const t = enabledType(params.type);
  return { title: t ? catalogEntry(t.key, t.label).title : "Content" };
}

// A collection shows its list of entries; a single page (e.g. the cold email service page) opens straight in the editor.
export default async function TypePage({ params }: { params: { type: string } }) {
  const editor = (await currentEditor())!;

  if (params.type === GUIDES) {
    const items = allTypes()
      .filter((t) => t.enabled && t.key.startsWith("guide") && canView(editor, t.key))
      .map((t) => {
        const type = contentType(t.key)!;
        return { href: `/admin/content/${t.key}`, title: catalogEntry(t.key, t.label).title, url: liveUrl(type, singletonSlug(type), "") };
      })
      .sort((a, b) => a.title.localeCompare(b.title));
    return (
      <>
        <EntryHeader back={{ href: "/admin", label: "Content" }} title="Resource guides" subtitle={`${items.length} guides, each with its own sections`} />
        <div className="mt-6">
          <FilterList items={items.map((i) => ({ ...i, detail: i.url ? `myntmore.com${i.url}` : undefined }))} placeholder="Filter guides" />
        </div>
      </>
    );
  }

  if (params.type === LONG_CASES) {
    const items = allTypes()
      .filter((t) => t.enabled && t.key.startsWith("caseLong") && canView(editor, t.key))
      .map((t) => {
        const type = contentType(t.key)!;
        return { href: `/admin/content/${t.key}`, title: catalogEntry(t.key, t.label).title, url: liveUrl(type, singletonSlug(type), "") };
      })
      .sort((a, b) => a.title.localeCompare(b.title));
    return (
      <>
        <EntryHeader back={{ href: "/admin", label: "Content" }} title="Long-form case studies" subtitle={`${items.length} case studies, each with its own layout`} />
        <div className="mt-6">
          <FilterList items={items.map((i) => ({ ...i, detail: i.url ? `myntmore.com${i.url}` : undefined }))} placeholder="Filter case studies" />
        </div>
      </>
    );
  }

  const type = enabledType(params.type);
  if (!type || !canView(editor, type.key)) notFound();
  const cat = catalogEntry(type.key, type.label);

  if (type.kind === "singleton") {
    const entry = await loadEntry(type);
    if (!entry) notFound();
    const fields = describeType(type);
    const url = liveUrl(type, singletonSlug(type), "");
    const isLong = type.key.startsWith("caseLong");
    const isGuide = type.key.startsWith("guide");
    return (
      <>
        <EntryHeader
          back={isLong ? { href: `/admin/content/${LONG_CASES}`, label: "Long-form case studies" } : isGuide ? { href: `/admin/content/${GUIDES}`, label: "Resource guides" } : { href: "/admin", label: "Content" }}
          title={cat.title}
          subtitle={url ? `myntmore.com${url}` : cat.description}
          url={url}
        />
        <FileProblems errors={entry.errors} />
        <EntryEditor
          typeKey={type.key}
          slug={singletonSlug(type)}
          fields={fields}
          sections={formSections(type)}
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
  const items = entries.map((e) => {
    const url = liveUrl(type, e.slug, e.title);
    return { href: `/admin/content/${type.key}/${e.slug}`, title: e.title === e.slug ? humanize(e.slug) : e.title, detail: url ? `myntmore.com${url}` : undefined, url };
  });
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <EntryHeader back={{ href: "/admin", label: "Content" }} title={cat.title} subtitle={cat.description} />
        {canCreate && (
          <Link href={`/admin/content/${type.key}/new`} className="rounded-lg bg-[#0A0A0A] px-4 py-2 text-sm font-bold text-white hover:bg-[#27272A]">
            + Add new
          </Link>
        )}
      </div>
      <div className="mt-6">
        <FilterList items={items} placeholder={`Filter ${entries.length} ${entries.length === 1 ? "entry" : "entries"}`} />
      </div>
      {!isCreatable(type) && <p className="mt-3 text-[13px] text-[#71675E]">New ones need a code change, so a developer adds them.</p>}
    </>
  );
}
