import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../../components/InnerLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import Faq from "@/app/lp/Faq";
import { RelatedTools } from "@/components/tools/shared/RelatedTools";
import { buildFaqSchema, buildWebApplicationSchema } from "@/lib/schema";
import { buildToolSocialMetadata } from "@/lib/tool-social-metadata";
import { pageFaqs } from "@/lib/page-faqs";
import { withPageSeo } from "@/lib/page-seo";
import InboxCalculator from "./InboxCalculator";
import pageCopy from "@/content/page-copy/toolColdEmailInboxCalculator.json";

// This page's text is edited in the admin ("Cold Email Inbox Calculator") and lives in content/page-copy/toolColdEmailInboxCalculator.json.
const copy = pageCopy;

const TITLE = "Cold Email Inbox & Domain Calculator";
const DESCRIPTION = "How many domains and inboxes do you need for cold email? Enter your volume and get domains, inboxes, daily sends and your go-live date. Free.";
const PATH = "/tools/cold-email-inbox-calculator";

export const metadata: Metadata = withPageSeo(PATH, {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "cold email inbox calculator",
    "how many inboxes do i need for cold email",
    "how many domains for cold email",
    "inboxes per domain cold email",
    "cold email domain calculator",
    "how many cold emails per inbox per day",
    "cold email sending volume calculator",
    "cold email warm up time",
  ],
  alternates: { canonical: `https://www.myntmore.com${PATH}` },
  ...buildToolSocialMetadata(TITLE, DESCRIPTION, PATH),
});

const APP_SCHEMA = buildWebApplicationSchema({ name: TITLE, description: DESCRIPTION, url: `https://www.myntmore.com${PATH}` });

const MATH = [
  { title: copy.s01.t01, body: copy.s01.t02 },
  { title: copy.s01.t03, body: copy.s01.t04 },
  { title: copy.s01.t05, body: copy.s01.t06 },
  { title: copy.s01.t07, body: copy.s01.t08 },
];

const NEXT = [
  { label: copy.s01.t09, href: "/resources/guides/cold-email-infrastructure-setup", note: copy.s01.t10 },
  { label: copy.s01.t11, href: "/resources/guides/smartlead-setup", note: copy.s01.t12 },
  { label: copy.s01.t13, href: "/tools/cold-email-roi-calculator", note: copy.s01.t14 },
];

export default function ColdEmailInboxCalculatorPage() {
  const faqs = pageFaqs("tool-cold-email-inbox-calculator");
  return (
    <InnerLayout>
      <JsonLd data={APP_SCHEMA} />
      <JsonLd data={buildFaqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })))} />

      <section className="relative pt-32 pb-12 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", left: "-180px", width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(circle,rgba(234,88,12,0.16),rgba(234,88,12,0.05) 42%,transparent 70%)", pointerEvents: "none" }} />
        <div className="relative max-w-6xl mx-auto">
          <Breadcrumbs items={[{ label: copy.s01.t15, href: "/resources/tools" }, { label: TITLE, href: PATH }]} />
          <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>{copy.s01.t16}</span>
          <h1 className="text-4xl sm:text-5xl font-black mb-5 leading-tight" style={{ color: "#0a0a0a" }}>{copy.s01.t17}</h1>
          <p className="text-lg max-w-3xl leading-relaxed" style={{ color: "#52525B" }}>{copy.s01.t18}</p>
        </div>
      </section>

      <section className="px-4 pb-16" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-6xl mx-auto">
          <InboxCalculator />
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s02.t01}</h2>
          <p className="text-base mb-8" style={{ color: "#52525B" }}>{copy.s02.t02}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {MATH.map((m, i) => (
              <div key={m.title} className="rounded-2xl border p-5" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#A14A08" }}>{copy.s02.t03}{i + 1}</div>
                <h3 className="text-lg font-black mb-2" style={{ color: "#0a0a0a" }}>{m.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq badge="FAQ" title={copy.s02.t04} items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />

      <section className="py-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black mb-5" style={{ color: "#0a0a0a" }}>{copy.s03.t01}</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {NEXT.map((n) => (
              <Link key={n.href} href={n.href} className="block rounded-xl border p-4 transition-colors hover:border-[#A14A08]" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <p className="text-sm font-black mb-1" style={{ color: "#0a0a0a" }}>{n.label} <span aria-hidden="true" style={{ color: "#A14A08" }}>&rarr;</span></p>
                <p className="text-xs leading-relaxed" style={{ color: "#52525B" }}>{n.note}</p>
              </Link>
            ))}
          </div>
          <div className="mt-10 rounded-2xl p-8 text-center border" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", borderColor: "rgba(245,183,49,0.35)" }}>
            <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{copy.s04.t01}</h2>
            <p className="text-base max-w-xl mx-auto mb-6" style={{ color: "#52525B" }}>{copy.s04.t02}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/cold-email" className="btn-dark px-8 py-4 text-sm font-bold">{copy.s04.t03}</Link>
              <a href="/book-a-call" className="px-8 py-4 text-sm font-bold rounded-full border transition-colors hover:bg-[#F8F6F2]" style={{ color: "#0A0A0A", borderColor: "#D0C9BF", backgroundColor: "#FFFFFF" }}>{copy.s04.t04}</a>
            </div>
          </div>
        </div>
      </section>

      <RelatedTools currentSlug="cold-email-inbox-calculator" />
    </InnerLayout>
  );
}
