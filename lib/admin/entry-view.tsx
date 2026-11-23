// Pieces shared by the admin's edit, singleton and new-entry pages.
import Link from "next/link";
import { catalogEntry, longCaseUrl } from "./catalog";
import { describeType, singletonSlug, type ContentType, type ParsedEntry } from "./schema";
import { sectionsFor } from "./sections";
import { nameIsFileName } from "./rules";

export function entryTitle(state: Record<string, unknown>, slugField?: string): string | undefined {
  const name = slugField ? (state[slugField] as { name?: unknown } | undefined)?.name : undefined;
  return typeof name === "string" && name ? name : undefined;
}

/** "pharma" → "Pharma", "b2b-lead-gen" → "B2b lead gen": a readable name when an entry has no other. */
export const humanize = (slug: string) => (slug.charAt(0).toUpperCase() + slug.slice(1)).replace(/-/g, " ");

/** The form's sections for a type, in page order. */
export function formSections(type: ContentType) {
  const fields = describeType(type);
  return sectionsFor(
    type.key,
    Object.entries(fields).map(([key, d]) => ({ key, kind: d.kind, label: "label" in d ? d.label : undefined })),
    type.slugField,
    nameIsFileName(type),
  );
}

/** The live page an entry belongs to, as a path, if it has one. */
export function liveUrl(type: ContentType, slug: string, title: string): string | null {
  if (type.key.startsWith("caseLong")) return longCaseUrl(singletonSlug(type));
  return catalogEntry(type.key, type.label).url?.(slug, title) ?? null;
}

export function EntryHeader({ back, title, subtitle, url }: { back: { href: string; label: string }; title: string; subtitle?: string; url?: string | null }) {
  return (
    <>
      <Link href={back.href} className="text-sm font-semibold text-[#A14A08] hover:underline">
        ← {back.label}
      </Link>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-3xl font-black">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-[#71675E]">{subtitle}</p>}
        </div>
        {url && (
          <a href={url} target="_blank" rel="noreferrer" className="shrink-0 rounded-lg border border-[#C9BFB2] bg-white px-3 py-1.5 text-sm font-semibold hover:border-[#A14A08]">
            View on site ↗
          </a>
        )}
      </div>
    </>
  );
}

export function FileProblems({ errors }: { errors: ParsedEntry["errors"] }) {
  if (!errors.length) return null;
  return (
    <div role="alert" className="mt-4 rounded-lg border border-[#F5C2C0] bg-[#FDECEA] p-3 text-sm text-[#9F1D1D]">
      This file has problems the form cannot show, so saving is off. Ask a developer to look at it.
      <ul className="mt-1 list-disc pl-5">
        {errors.map((e, i) => (
          <li key={i}>
            {e.path.join(".") || "file"}: {e.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
