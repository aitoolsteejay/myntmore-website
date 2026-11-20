import type { Metadata } from "next";
import Link from "next/link";
import { activityEditors, listActivity } from "@/lib/admin/activity";
import { allTypes } from "@/lib/admin/entries";

export const metadata: Metadata = { title: "Activity" };

const when = (iso: string) => new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
const show = (v: unknown) => {
  if (v === null || v === undefined || v === "") return "(empty)";
  const s = typeof v === "string" ? v : JSON.stringify(v);
  return s.length > 240 ? `${s.slice(0, 240)}…` : s;
};
const isDate = (s?: string) => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);

export default async function ActivityPage({ searchParams }: { searchParams: { editor?: string; type?: string; from?: string; to?: string } }) {
  const types = allTypes();
  const labelOf = (k: string) => types.find((t) => t.key === k)?.label ?? k;
  const from = isDate(searchParams.from) ? searchParams.from : undefined;
  const to = isDate(searchParams.to) ? searchParams.to : undefined;
  const [rows, editors] = await Promise.all([
    listActivity({
      editor: searchParams.editor || undefined,
      type: searchParams.type || undefined,
      // Dates are days in India time; "to" includes the whole day.
      from: from ? new Date(`${from}T00:00:00+05:30`).toISOString() : undefined,
      to: to ? new Date(new Date(`${to}T00:00:00+05:30`).getTime() + 86_400_000).toISOString() : undefined,
    }),
    activityEditors(),
  ]);
  const field = "rounded-lg border border-[#E8E2D9] bg-white px-2.5 py-1.5 text-sm";

  return (
    <>
      <h1 className="text-3xl font-black">Activity</h1>
      <p className="mt-1 text-sm text-[#52525B]">
        Every save made in this admin: who, when, which entry and which fields. Git history keeps a second record under each editor&apos;s name.
      </p>

      <form method="get" className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-[#E8E2D9] bg-white p-4">
        <label className="text-xs font-semibold text-[#52525B]">
          Person
          <select name="editor" defaultValue={searchParams.editor ?? ""} className={`${field} mt-1 block`}>
            <option value="">Everyone</option>
            {editors.map((e) => (
              <option key={e.email} value={e.email}>
                {e.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold text-[#52525B]">
          Content
          <select name="type" defaultValue={searchParams.type ?? ""} className={`${field} mt-1 block`}>
            <option value="">All content</option>
            {types.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold text-[#52525B]">
          From
          <input type="date" name="from" defaultValue={from} className={`${field} mt-1 block`} />
        </label>
        <label className="text-xs font-semibold text-[#52525B]">
          To
          <input type="date" name="to" defaultValue={to} className={`${field} mt-1 block`} />
        </label>
        <button className="rounded-lg bg-[#0A0A0A] px-4 py-2 text-sm font-bold text-white">Filter</button>
        <Link href="/admin/activity" className="py-2 text-sm font-semibold text-[#A14A08] hover:underline">
          Clear
        </Link>
      </form>

      {rows.length === 0 ? (
        <p className="mt-8 text-sm text-[#71675E]">No activity matches these filters.</p>
      ) : (
        <ol className="mt-6 space-y-3">
          {rows.map((r) => (
            <li key={r.id} className="rounded-xl border border-[#E8E2D9] bg-white p-4">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
                <span className="font-bold">{r.editor_name}</span>
                <span className="text-[#71675E]">{r.action === "revert" ? "undid a change to" : "updated"}</span>
                <Link href={`/admin/content/${r.content_type}/${r.entry}`} className="font-semibold text-[#A14A08] hover:underline">
                  {labelOf(r.content_type)}: {r.entry}
                </Link>
                <span className="ml-auto text-xs text-[#71675E]">{when(r.created_at)}</span>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-[#52525B]">
                  {r.changes.length} field{r.changes.length === 1 ? "" : "s"} changed
                  {r.commit_url && (
                    <>
                      {" · "}
                      <a href={r.commit_url} target="_blank" rel="noreferrer" className="font-mono text-xs text-[#A14A08] hover:underline">
                        {r.commit_sha.slice(0, 7)}
                      </a>
                    </>
                  )}
                </summary>
                <ul className="mt-2 space-y-2">
                  {r.changes.map((c) => (
                    <li key={c.path} className="rounded-lg bg-[#F8F6F2] p-2.5">
                      <p className="font-mono text-xs text-[#71675E]">{c.path}</p>
                      <p className="mt-1 text-[13px] text-[#9F1D1D] line-through decoration-[#9F1D1D]/40">{show(c.before)}</p>
                      <p className="text-[13px] text-[#166534]">{show(c.after)}</p>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
