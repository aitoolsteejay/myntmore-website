import Link from "next/link";
import { citiesFor, type CityIndustry, type CityLink } from "@/lib/city-links";

// Links to the B2B lead generation city pages (see lib/city-links.ts), filtered to the cities that match an
// industry when one is given. "section" is a full-width band for service, landing and case study pages;
// "inline" is a short list that sits inside an article. Pass "cities" to show a fixed list instead (the UAE pages).
// Plain markup, safe from Server and Client components.
export default function CityLinks({
  industry,
  cities: fixed,
  heading,
  intro,
  variant = "section",
}: {
  industry?: CityIndustry | null;
  cities?: CityLink[];
  heading?: string;
  intro?: string;
  variant?: "section" | "inline";
}) {
  const cities = fixed ?? citiesFor(industry);
  if (!cities.length) return null;
  const title = heading ?? "B2B lead generation by city";

  if (variant === "inline") {
    return (
      <div className="mt-12">
        <h2 className="text-xl font-black mb-2" style={{ color: "#0a0a0a" }}>{title}</h2>
        {intro && <p className="text-sm mb-4" style={{ color: "#52525B" }}>{intro}</p>}
        <ul className="grid gap-2 sm:grid-cols-2">
          {cities.map((c) => (
            <li key={c.slug} className="text-sm" style={{ color: "#52525B" }}>
              <Link href={c.href} className="font-bold underline" style={{ color: "#A14A08" }}>
                Lead generation in {c.name}
              </Link>
              <span className="block text-xs mt-0.5">{c.sectors}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section aria-label={title} className="px-4 py-16 border-t" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black mb-2 leading-tight" style={{ color: "#0a0a0a" }}>{title}</h2>
        {intro && <p className="text-base mb-8 max-w-2xl" style={{ color: "#52525B" }}>{intro}</p>}
        <ul className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${intro ? "" : "mt-8"}`}>
          {cities.map((c) => (
            <li key={c.slug}>
              <Link
                href={c.href}
                className="group flex h-full flex-col rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}
              >
                <span className="text-sm font-black mb-1 group-hover:underline" style={{ color: "#0a0a0a" }}>
                  B2B lead generation in {c.name}
                </span>
                <span className="text-xs leading-relaxed" style={{ color: "#52525B" }}>{c.sectors}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
