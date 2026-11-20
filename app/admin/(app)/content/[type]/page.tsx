import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { canView, currentEditor } from "@/lib/admin/auth";
import { enabledType, listEntries } from "@/lib/admin/entries";

export async function generateMetadata({ params }: { params: { type: string } }): Promise<Metadata> {
  return { title: enabledType(params.type)?.label ?? "Content" };
}

export default async function EntryList({ params }: { params: { type: string } }) {
  const editor = (await currentEditor())!;
  const type = enabledType(params.type);
  if (!type || !canView(editor, type.key)) notFound();
  const entries = await listEntries(type);
  return (
    <>
      <Link href="/admin" className="text-sm font-semibold text-[#A14A08] hover:underline">
        ← Content
      </Link>
      <h1 className="mt-2 text-3xl font-black">{type.label}</h1>
      <p className="mt-1 text-sm text-[#52525B]">{entries.length} entries, read from the latest version on GitHub.</p>
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
