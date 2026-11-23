import Link from "next/link";
import FilterList, { type ListItem } from "@/components/admin/FilterList";
import { canView, currentEditor } from "@/lib/admin/auth";
import { catalogEntry, GROUPS } from "@/lib/admin/catalog";
import { allTypes } from "@/lib/admin/entries";
import { humanize, liveUrl } from "@/lib/admin/entry-view";
import { collectionDir, contentType, singletonSlug } from "@/lib/admin/schema";
import { getStore } from "@/lib/admin/store";

type Card = { href: string; title: string; description: string; count?: string };

export default async function AdminHome() {
  const editor = (await currentEditor())!;
  const types = allTypes().filter((t) => t.enabled && canView(editor, t.key));
  const store = await getStore();

  // Everything editable, by name and address, for the search box. File names only: one request per folder.
  const lists = await Promise.all(
    types.map(async (t) => {
      const type = contentType(t.key)!;
      const cat = catalogEntry(t.key, t.label);
      if (type.kind === "singleton") {
        const url = liveUrl(type, singletonSlug(type), "");
        return { t, count: 1, items: [{ href: `/admin/content/${t.key}`, title: cat.title, detail: `${t.key.startsWith("caseLong") ? "Long-form case study" : t.key.startsWith("guide") ? "Resource guide" : t.key.startsWith("tool") ? "Interactive tool" : "Page"}${url ? ` · myntmore.com${url}` : ""}`, url }] as ListItem[] };
      }
      const ext = type.format === "mdoc" ? ".mdoc" : ".json";
      const slugs = (await store.listDir(collectionDir(type))).filter((f) => f.endsWith(ext)).map((f) => f.slice(0, -ext.length));
      const items = slugs.map((s) => {
        const url = liveUrl(type, s, "");
        return { href: `/admin/content/${t.key}/${s}`, title: humanize(s), detail: `${cat.title}${url ? ` · myntmore.com${url}` : ""}`, url };
      });
      return { t, count: slugs.length, items };
    }),
  );
  const everything = lists.flatMap((l) => l.items);

  const longCases = lists.filter((l) => l.t.key.startsWith("caseLong"));
  const guides = lists.filter((l) => l.t.key.startsWith("guide"));
  const tools = lists.filter((l) => l.t.key.startsWith("tool"));
  const cards = (group: string): Card[] => {
    const out: Card[] = lists
      .filter((l) => !l.t.key.startsWith("caseLong") && !l.t.key.startsWith("guide") && !l.t.key.startsWith("tool") && catalogEntry(l.t.key, l.t.label).group === group)
      .map((l) => {
        const cat = catalogEntry(l.t.key, l.t.label);
        return { href: `/admin/content/${l.t.key}`, title: cat.title, description: cat.description, count: l.t.kind === "collection" ? `${l.count} ${l.count === 1 ? "entry" : "entries"}` : undefined };
      });
    if (group === "pages" && guides.length)
      out.push({ href: "/admin/content/guides", title: "Resource guides", description: "In-depth guides at myntmore.com/resources/guides/…", count: `${guides.length} guides` });
    if (group === "pages" && tools.length)
      out.push({ href: "/admin/content/tools", title: "Interactive tools", description: "Calculators and generators at myntmore.com/tools/…", count: `${tools.length} tools` });
    if (group === "caseStudies" && longCases.length)
      out.push({ href: "/admin/content/longCaseStudies", title: "Long-form case studies", description: "In-depth client stories, each with its own layout", count: `${longCases.length} case studies` });
    return out;
  };

  return (
    <>
      <h1 className="text-3xl font-black">What would you like to edit?</h1>
      <p className="mt-1 text-sm text-[#52525B]">Search by page name or address, or pick a section below. Saved changes go live in about two minutes.</p>
      <div className="mt-5">
        <FilterList items={everything} placeholder="Search, e.g. pharma, mumbai, cold email, /lp/saas-founders" emptyText="No page matches. Try another word." hideUntilTyped autoFocus />
      </div>

      {GROUPS.map((g) => {
        const list = cards(g.key);
        if (!list.length) return null;
        return (
          <section key={g.key} className="mt-10">
            <h2 className="text-lg font-black">{g.title}</h2>
            <p className="text-sm text-[#71675E]">{g.description}</p>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {list.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="flex h-full flex-col rounded-xl border border-[#E8E2D9] bg-white p-4 hover:border-[#A14A08]">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-bold">{c.title}</span>
                      {c.count && <span className="shrink-0 text-xs text-[#71675E]">{c.count}</span>}
                    </span>
                    {c.description && <span className="mt-1 text-[13px] leading-snug text-[#71675E]">{c.description}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <p className="mt-10 text-sm text-[#71675E]">
        The other pages of the site (homepage, About, Plans and so on) are being added here next.
      </p>
    </>
  );
}
