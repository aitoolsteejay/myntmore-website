import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import FadeIn from "@/app/components/FadeIn";
import JsonLd from "@/app/components/JsonLd";
import AskYourAI from "@/app/components/AskYourAI";
import Faq from "@/app/lp/Faq";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/schema";
import ArticleMeta from "@/app/components/ArticleMeta";
import { pageFaqs } from "@/lib/page-faqs";
import { OG_BASE } from "@/lib/og";

const PAGE_URL = `${SITE_URL}/resources/guides/how-to-choose-b2b-lead-generation-agency-india`;
const TITLE = "How to Choose a B2B Lead Generation Agency in India";
const DESCRIPTION = "Eight criteria for choosing a B2B lead generation agency in India: agency type, target market, data, DPDP and TRAI compliance, pricing models and proof.";

const AI_RESOURCES = [
  PAGE_URL,
  `${SITE_URL}/resources/guides/how-to-choose-an-outbound-agency`,
  `${SITE_URL}/resources/blogs/b2b-outbound-benchmark-report-2026`,
];

export const metadata: Metadata = {
  title: "Choosing a B2B Lead Generation Agency in India",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    "how to choose a b2b lead generation agency in india",
    "b2b lead generation agency india checklist",
    "lead generation company vs outbound agency",
    "pay per lead vs retainer lead generation india",
    "dpdp act lead generation agency",
    "questions to ask a lead generation company in india",
    "b2b appointment setting agency india",
  ],
  openGraph: {
    ...OG_BASE,
    title: `${TITLE} | Myntmore`,
    description: DESCRIPTION,
    url: PAGE_URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
};

const ARTICLE_SCHEMA = buildArticleSchema({
  headline: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  datePublished: "2026-10-26T12:00:00+05:30",
  dateModified: "2026-10-26T12:00:00+05:30",
});

// The four businesses that all call themselves "lead generation companies" in
// India. Most bad agency decisions start with comparing two of these as if
// they sold the same thing.
const AGENCY_TYPES = [
  {
    type: "Data and lead list vendors",
    get: "Contact lists, usually priced per record",
    fit: "Teams that already have people and tools to run outreach",
    watch: "Stale or unverified records, and no responsibility for what happens after delivery",
  },
  {
    type: "Telecalling and appointment-setting firms",
    get: "Outbound calls that book meetings, often priced per appointment",
    fit: "High-volume offers with short sales cycles",
    watch: "Loose meeting definitions, low show-up rates and TRAI rules on commercial calls",
  },
  {
    type: "Performance marketing agencies",
    get: "Inbound form fills from paid ads on Google, Meta or LinkedIn",
    fit: "Offers with existing search demand",
    watch: "Volume of form fills reported as \"leads\" whether or not they match your ICP",
  },
  {
    type: "Outbound agencies",
    get: "Cold email, LinkedIn and ABM run as one system, priced as a retainer or per meeting",
    fit: "B2B companies with a defined ICP and a deal size that justifies a sales conversation",
    watch: "Setup time before the first send, and whether you own the domains, lists and copy",
  },
];

const SCORECARD = [
  { criterion: "Agency type", good: "Says plainly whether they sell data, calls, ads or outbound", flag: "\"We do everything\" with no method behind it" },
  { criterion: "Target market", good: "Case studies in the country and buyer role you sell to", flag: "Only domestic proof when you sell to the US, or the reverse" },
  { criterion: "Data", good: "Names its sources and verifies every email before sending", flag: "Cannot say where the list comes from" },
  { criterion: "Compliance", good: "Has a written answer on DPDP, TRAI and WhatsApp opt-in", flag: "\"Compliance isn't an issue in B2B\"" },
  { criterion: "Meeting definition", good: "Written definition: ICP fit, decision-maker, attended", flag: "Counts any reply or booked slot as a lead" },
  { criterion: "Pricing", good: "Quote shows GST, setup and tool costs separately", flag: "A low monthly fee with costs that appear later" },
  { criterion: "Team", good: "You meet the people who write and send your campaigns", flag: "Work passed to unnamed freelancers" },
  { criterion: "Proof", good: "Results with numbers, plus a client you can call", flag: "Screenshots of one client's best month" },
];

const FAQ_ITEMS = pageFaqs("guide-how-to-choose-b2b-lead-generation-agency-india");

export default function HowToChooseLeadGenAgencyIndiaPage() {
  return (
    <InnerLayout>
      <JsonLd data={buildFaqSchema(FAQ_ITEMS)} />
      <JsonLd data={ARTICLE_SCHEMA} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.22) 0%, rgba(255,160,0,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.16) 0%, rgba(234,88,12,0.06) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Guides", href: "/resources/guides" }, { label: "Choosing a Lead Gen Agency in India", href: "/resources/guides/how-to-choose-b2b-lead-generation-agency-india" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ borderColor: "rgba(245,183,49,0.45)", background: "rgba(245,183,49,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#F5B731" }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#A14A08" }}>Buyer&apos;s Guide · 8 min read</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            How to choose a B2B lead generation agency in India
          </h1>
          <ArticleMeta schema={ARTICLE_SCHEMA} />
          <p className="text-lg sm:text-xl max-w-2xl" style={{ color: "#52525B" }}>
            Search for a lead generation company in India and you&apos;ll get data vendors, call centres, ad agencies and outbound agencies on the same list. They sell very different things. This guide gives you eight criteria to tell them apart and pick the right one.
          </p>
        </div>
      </section>

      <article>
        {/* Short answer */}
        <section className="pb-4 px-4" style={{ backgroundColor: "#F8F6F2" }}>
          <div className="max-w-3xl mx-auto rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
            <h2 className="text-sm font-black uppercase tracking-widest mb-3" style={{ color: "#71675E" }}>The short answer</h2>
            <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>
              To choose a B2B lead generation agency in India, first confirm what kind of agency it is and whether it has results in the market you sell to. Then check how it sources data, how it handles DPDP and TRAI rules, how it defines a qualified meeting, what the full price is including GST, who does the work and what proof you can verify.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <div className="space-y-14">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>1. Know which kind of &quot;lead generation company&quot; you&apos;re talking to</h2>
                  <p className="text-base leading-relaxed mb-6" style={{ color: "#3D3D3D" }}>
                    In India, four different businesses use the same label. Comparing a data vendor&apos;s per-record price with an outbound agency&apos;s retainer is like comparing the price of bricks with the price of a house. Decide which one you need before you shortlist anyone.
                  </p>
                  <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ backgroundColor: "#F8F6F2" }}>
                          <th scope="col" className="text-left p-4 font-black" style={{ color: "#0a0a0a" }}>Type</th>
                          <th scope="col" className="text-left p-4 font-black" style={{ color: "#0a0a0a" }}>What you get</th>
                          <th scope="col" className="text-left p-4 font-black" style={{ color: "#0a0a0a" }}>Good for</th>
                          <th scope="col" className="text-left p-4 font-black" style={{ color: "#0a0a0a" }}>Watch out for</th>
                        </tr>
                      </thead>
                      <tbody>
                        {AGENCY_TYPES.map((row, i) => (
                          <tr key={row.type} style={{ borderTop: i > 0 ? "1px solid #E8E2D9" : undefined }}>
                            <th scope="row" className="text-left p-4 font-bold align-top" style={{ color: "#0a0a0a" }}>{row.type}</th>
                            <td className="p-4 align-top" style={{ color: "#3D3D3D" }}>{row.get}</td>
                            <td className="p-4 align-top" style={{ color: "#3D3D3D" }}>{row.fit}</td>
                            <td className="p-4 align-top" style={{ color: "#71675E" }}>{row.watch}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>2. Match the agency to where your buyers are</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>
                    Selling to Indian companies and selling from India to the US, UK or Middle East are different jobs. Domestic B2B buying is relationship-heavy: LinkedIn, phone and WhatsApp (with opt-in) often matter as much as email, and decisions can involve a promoter or family owner as well as the functional head. Selling abroad needs copy that reads as native, sending windows in the buyer&apos;s time zone and compliance with laws like CAN-SPAM and GDPR. Ask for case studies in the country and buyer role you actually target, not just a total client count.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>3. Ask where the data comes from and how it&apos;s verified</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>
                    Global B2B databases are often thinner on Indian mid-market and SME companies than on US ones, so an agency that relies on a single tool will hit gaps fast. A good agency combines sources, researches accounts by hand where needed, and verifies every email before it is sent, because bounces damage the sending domain for everyone on it. Ask which sources they use for your segment, how they verify contacts, and what bounce rate makes them pause a campaign.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>4. Check how they handle DPDP, TRAI and WhatsApp rules</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>
                    India&apos;s Digital Personal Data Protection Act, 2023 governs how personal data is collected and used, including work emails and phone numbers. Its rules were notified on 13 November 2025, and most obligations for businesses apply from 13 May 2027, with penalties of up to ₹250 crore. Commercial calls and SMS also fall under TRAI&apos;s rules on unsolicited commercial communication, including the Do Not Disturb registry, and WhatsApp Business requires opt-in before a business messages someone. You don&apos;t need an agency with a legal team, but you do need one with a written answer. Our{" "}
                    <Link href="/resources/blogs/cold-email-compliance-guide" className="font-bold underline" style={{ color: "#A14A08" }}>cold email compliance guide</Link> covers the rules by country. This is general information, not legal advice.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>5. Agree in writing what counts as a qualified lead or meeting</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>
                    Most disputes with lead generation agencies come down to this one definition. A useful one names the company profile, the role of the person, and whether the meeting has to actually happen to count. Ask what happens when a prospect doesn&apos;t show up, whether no-shows are rebooked or replaced, and who qualifies the meeting before it reaches your calendar.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>6. Compare pricing models, then the full cost</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>
                    Agencies in India usually charge a monthly retainer, a fee per qualified meeting, a fee per lead, or a mix. Each rewards the agency for something different: per-lead pricing rewards volume, per-meeting pricing rewards booked calls, and a retainer rewards running the whole system well. Then check the full cost. Services in India attract 18% GST, and setup work, sending domains, inboxes and tool subscriptions are often billed separately. Ask for one quote with every line shown, and compare agencies on cost per qualified meeting that actually happened.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>7. Find out who actually does the work</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>
                    The person who pitches you is rarely the person who writes your emails. Ask who builds your list, who writes the copy, who watches deliverability and who you talk to every week, and whether they are employees or subcontractors. Ask to meet the account lead before you sign. An agency that runs a real system will be glad to show you the people running it.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>8. Ask for proof you can check</h2>
                  <p className="text-base leading-relaxed" style={{ color: "#3D3D3D" }}>
                    Look for case studies in your industry with numbers in them, a client reference you can call, and reviews on independent platforms. Then compare the agency&apos;s claims with published ranges: our{" "}
                    <Link href="/resources/blogs/b2b-outbound-benchmark-report-2026" className="font-bold underline" style={{ color: "#A14A08" }}>2026 B2B Outbound Benchmark Report</Link> shows reply rates, inbox placement and time to first meeting across Myntmore&apos;s managed accounts. For the questions every outbound agency should answer, on data ownership, deliverability and contract terms, see{" "}
                    <Link href="/resources/guides/how-to-choose-an-outbound-agency" className="font-bold underline" style={{ color: "#A14A08" }}>how to choose a B2B outbound agency</Link>, or see how this works in practice for a{" "}
                    <Link href="/b2b-lead-generation-mumbai" className="font-bold underline" style={{ color: "#A14A08" }}>Mumbai lead generation company</Link>.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Scorecard */}
        <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9", backgroundColor: "#F8F6F2" }}>
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>The scorecard: good answers and red flags</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#52525B" }}>
                Take this into every agency call. An agency doesn&apos;t need a perfect answer on every line, but two or more red flags is a reason to keep looking.
              </p>
              <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#FEF9EC" }}>
                      <th scope="col" className="text-left p-4 font-black" style={{ color: "#0a0a0a" }}>Criterion</th>
                      <th scope="col" className="text-left p-4 font-black" style={{ color: "#047857" }}>Good answer</th>
                      <th scope="col" className="text-left p-4 font-black" style={{ color: "#B91C1C" }}>Red flag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SCORECARD.map((row, i) => (
                      <tr key={row.criterion} style={{ borderTop: i > 0 ? "1px solid #F0EBE3" : undefined }}>
                        <th scope="row" className="text-left p-4 font-bold align-top" style={{ color: "#0a0a0a" }}>{row.criterion}</th>
                        <td className="p-4 align-top" style={{ color: "#3D3D3D" }}>{row.good}</td>
                        <td className="p-4 align-top" style={{ color: "#3D3D3D" }}>{row.flag}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm mt-6" style={{ color: "#52525B" }}>
                Not sure an agency is the right move at all? See the{" "}
                <Link href="/resources/blogs/agency-vs-in-house" className="font-bold" style={{ color: "#A14A08" }}>agency vs. in-house comparison</Link>.
              </p>
            </FadeIn>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4">
          <div className="py-12">
            <AskYourAI resources={AI_RESOURCES} />
          </div>
        </div>
      </article>

      {/* FAQ */}
      <Faq badge="FAQ" title="Common questions" items={FAQ_ITEMS.map((f) => ({ q: f.question, a: f.answer }))} />

      {/* Final CTA */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-8 sm:p-12 text-center" style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFFFFF 100%)", border: "1px solid rgba(245,183,49,0.35)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 text-[#0A0A0A]">Run the scorecard on us</h2>
            <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#71675E" }}>
              Myntmore is a Mumbai-based outbound agency. Book a free 30-minute call and ask us every question on this page. If we&apos;re not the right fit, we&apos;ll tell you.
            </p>
            <a href="/book-a-call" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
              Book a Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}
