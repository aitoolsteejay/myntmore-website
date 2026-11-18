import Link from "next/link";
import Faq from "@/app/lp/Faq";
import CityLinks from "@/app/components/CityLinks";
import JsonLd from "@/app/components/JsonLd";
import { buildFaqSchema } from "@/lib/schema";
import { pageFaqsQA } from "@/lib/page-faqs";
import { UAE_CITY_LINKS } from "@/lib/city-links";
import type { MarketPage } from "@/lib/market-pages";

// The written half of a market page, shown under that market's case study cards: who it is for, what
// worked there, the rules and timing, FAQs, and links on to the industry and city pages.
export default function MarketGuide({ page, phrase }: { page: MarketPage; phrase: string }) {
  const faqs = pageFaqsQA(`market-${page.slug}`);
  return (
    <>
      <JsonLd data={buildFaqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))} />

      <section className="py-16 px-4 border-t" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>Who this is for</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-3 mb-8" style={{ color: "#0a0a0a" }}>Outbound in {phrase}, for two kinds of company</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {page.audiences.map((a) => (
              <div key={a.title} className="rounded-2xl border p-6" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                <div className="text-2xl mb-3" aria-hidden="true">{a.icon}</div>
                <h3 className="text-lg font-black mb-2" style={{ color: "#0a0a0a" }}>{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>From the campaigns</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-3 mb-8" style={{ color: "#0a0a0a" }}>{page.playsTitle}</h2>
          <div className="space-y-5">
            {page.plays.map((p) => (
              <div key={p.href} className="rounded-2xl border p-6 sm:p-8" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#71675E" }}>{p.tag}</span>
                <h3 className="text-xl sm:text-2xl font-black mt-2 mb-3" style={{ color: "#0a0a0a" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#52525B" }}>{p.body}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.results.map((r) => (
                    <span key={r} className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(245,183,49,0.12)", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>{r}</span>
                  ))}
                </div>
                <Link href={p.href} className="text-sm font-bold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all" style={{ color: "#A14A08" }}>
                  Read the case study <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border p-6" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
            <h2 className="text-lg font-black mb-2" style={{ color: "#0a0a0a" }}>{page.rulesTitle}</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#52525B" }}>{page.rulesBody}</p>
            <Link href="/resources/blogs/cold-email-compliance-guide" className="text-sm font-bold underline" style={{ color: "#A14A08" }}>
              Read the cold email compliance guide
            </Link>
            <p className="text-xs mt-3" style={{ color: "#71675E" }}>General information, not legal advice.</p>
          </div>
          <div className="rounded-2xl border p-6" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
            <h2 className="text-lg font-black mb-2" style={{ color: "#0a0a0a" }}>{page.timingTitle}</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{page.timingBody}</p>
          </div>
        </div>
      </section>

      <Faq title={`Common questions about outbound in ${phrase}`} items={faqs} />

      <section className="py-16 px-4 border-t" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black mb-2" style={{ color: "#0a0a0a" }}>By industry</h2>
          <p className="text-sm mb-5" style={{ color: "#52525B" }}>How we run outbound for the industries behind these results.</p>
          <div className="flex flex-wrap gap-2">
            {page.industryLinks.map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex min-h-[44px] items-center text-sm font-semibold px-4 py-2 rounded-full border transition-colors hover:border-[#A14A08]" style={{ backgroundColor: "#ffffff", color: "#0a0a0a", borderColor: "#E8E2D9" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {page.cities === "uae" && (
        <CityLinks cities={UAE_CITY_LINKS} heading="Based in the UAE?" intro="Our UAE city pages cover the local buyers and what outbound looks like there." />
      )}
      {page.cities === "india" && (
        <CityLinks heading="Where we run this in India" intro="City by city: the local industries we write for, and what outbound looks like there." />
      )}
    </>
  );
}
