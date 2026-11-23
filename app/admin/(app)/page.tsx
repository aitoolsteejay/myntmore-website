import Link from "next/link";
import { canView, currentEditor } from "@/lib/admin/auth";
import { allTypes } from "@/lib/admin/entries";

type T = ReturnType<typeof allTypes>[number];

// Groups for the home page, in the order editors look for things. Anything not listed lands in "Other".
const GROUPS: { title: string; match: (t: T) => boolean }[] = [
  { title: "Pages", match: (t) => ["landingPages", "cityPages", "industryCityPages", "marketPages", "servicePages", "events", "careers", "glossaryTerms"].includes(t.key) },
  { title: "Case studies", match: (t) => ["caseStudies", "caseStudyPages"].includes(t.key) },
  { title: "Long-form case studies", match: (t) => t.key.startsWith("caseLong") },
  { title: "Service page copy", match: (t) => t.key.startsWith("serviceCopy") },
  { title: "FAQs and search titles", match: (t) => ["pageFaqs", "homepageFaqs", "pageSeo"].includes(t.key) },
];

function Card({ t }: { t: T }) {
  return (
    <li>
      <Link href={`/admin/content/${t.key}`} className="block h-full rounded-xl border border-[#E8E2D9] bg-white p-4 hover:border-[#A14A08]">
        <span className="font-bold">{t.label}</span>
        <span className="mt-0.5 block text-[13px] text-[#71675E]">{t.kind === "collection" ? "List of entries" : "One page"}</span>
      </Link>
    </li>
  );
}

export default async function AdminHome() {
  const editor = (await currentEditor())!;
  const types = allTypes().filter((t) => canView(editor, t.key));
  const ready = types.filter((t) => t.enabled);
  const later = types.filter((t) => !t.enabled);
  const grouped = GROUPS.map((g) => ({ title: g.title, items: ready.filter(g.match) }));
  const other = ready.filter((t) => !GROUPS.some((g) => g.match(t)));
  if (other.length) grouped.push({ title: "Other", items: other });
  return (
    <>
      <h1 className="text-3xl font-black">Content</h1>
      <p className="mt-1 text-sm text-[#52525B]">Every save is checked against the same rules as the site build, then published, usually within about two minutes.</p>
      {grouped
        .filter((g) => g.items.length)
        .map((g) => (
          <section key={g.title} className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#71675E]">{g.title}</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((t) => (
                <Card key={t.key} t={t} />
              ))}
            </ul>
          </section>
        ))}
      {later.length > 0 && (
        <p className="mt-10 text-sm text-[#52525B]">
          {later.map((t) => t.label).join(", ")}: still edited in <a href="/keystatic" className="font-semibold underline">Keystatic</a> for now.
        </p>
      )}
    </>
  );
}
