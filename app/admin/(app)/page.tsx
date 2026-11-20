import Link from "next/link";
import { canView, currentEditor } from "@/lib/admin/auth";
import { allTypes } from "@/lib/admin/entries";

export default async function AdminHome() {
  const editor = (await currentEditor())!;
  const types = allTypes().filter((t) => canView(editor, t.key));
  const ready = types.filter((t) => t.enabled);
  const later = types.filter((t) => !t.enabled);
  return (
    <>
      <h1 className="text-3xl font-black">Content</h1>
      <p className="mt-1 text-sm text-[#52525B]">Every save is published to the live site, usually within about two minutes.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {ready.map((t) => (
          <li key={t.key}>
            <Link href={`/admin/content/${t.key}`} className="block rounded-xl border border-[#E8E2D9] bg-white p-5 hover:border-[#A14A08]">
              <span className="font-bold">{t.label}</span>
              <span className="mt-1 block text-sm text-[#71675E]">{t.kind === "collection" ? "Open the list of entries" : "Edit"}</span>
            </Link>
          </li>
        ))}
      </ul>
      {later.length > 0 && (
        <details className="mt-10 text-sm text-[#52525B]">
          <summary className="cursor-pointer font-semibold">Not editable here yet ({later.length})</summary>
          <p className="mt-2">These are coming to this admin next. Until then they are edited in Keystatic.</p>
          <ul className="mt-2 columns-2 text-[#71675E]">
            {later.map((t) => (
              <li key={t.key}>{t.label}</li>
            ))}
          </ul>
        </details>
      )}
    </>
  );
}
