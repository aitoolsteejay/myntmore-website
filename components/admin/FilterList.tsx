"use client";

// A list of links with a filter box: the entries of a content type, or search results on the admin home.
import Link from "next/link";
import { useState } from "react";

export interface ListItem {
  href: string;
  title: string;
  /** Second line, e.g. the live address or the content type. */
  detail?: string;
  /** Live page, opened in a new tab. */
  url?: string | null;
}

export default function FilterList({ items, placeholder, emptyText, autoFocus, hideUntilTyped }: { items: ListItem[]; placeholder: string; emptyText?: string; autoFocus?: boolean; hideUntilTyped?: boolean }) {
  const [q, setQ] = useState("");
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const shown = words.length ? items.filter((i) => words.every((w) => `${i.title} ${i.detail ?? ""} ${i.url ?? ""}`.toLowerCase().includes(w))) : hideUntilTyped ? [] : items;
  return (
    <div>
      <input
        type="search"
        value={q}
        autoFocus={autoFocus}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-xl border border-[#E8E2D9] bg-white px-4 py-3 text-[15px] outline-none focus:border-[#A14A08] focus:ring-2 focus:ring-[#F5B731]/40"
      />
      {(shown.length > 0 || words.length > 0) && (
        <ul className="mt-3 max-h-[28rem] divide-y divide-[#E8E2D9] overflow-auto rounded-xl border border-[#E8E2D9] bg-white">
          {shown.slice(0, 200).map((i) => (
            <li key={i.href} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FEF9EC]">
              <Link href={i.href} className="min-w-0 flex-1">
                <span className="block truncate font-semibold">{i.title}</span>
                {i.detail && <span className="block truncate text-xs text-[#71675E]">{i.detail}</span>}
              </Link>
              {i.url && (
                <a href={i.url} target="_blank" rel="noreferrer" className="shrink-0 text-xs font-semibold text-[#A14A08] hover:underline">
                  View on site ↗
                </a>
              )}
            </li>
          ))}
          {!shown.length && <li className="px-4 py-3 text-sm text-[#71675E]">{emptyText ?? "Nothing matches."}</li>}
        </ul>
      )}
    </div>
  );
}
