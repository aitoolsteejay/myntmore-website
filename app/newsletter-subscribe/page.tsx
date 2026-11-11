import type { Metadata } from "next";
import InnerLayout from "../components/InnerLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import FadeIn from "../components/FadeIn";
import NewsletterForm from "../components/NewsletterForm";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema, buildWebPageSchema, SITE_URL } from "@/lib/schema";
import { OG_BASE } from "@/lib/og";

const URL = `${SITE_URL}/newsletter-subscribe`;
export const metadata: Metadata = {
  title: "Subscribe to The Outbound Operator",
  description: "Get one practical B2B growth playbook every week, covering outbound systems, AI prospecting, cold email, LinkedIn, and pipeline conversion.",
  keywords: ["b2b outbound newsletter", "cold email newsletter", "ai outbound insights", "lead generation newsletter", "the outbound operator"],
  alternates: { canonical: URL },
  openGraph: {
    ...OG_BASE,
    title: "The Outbound Operator Newsletter | Myntmore",
    description: "One practical B2B growth playbook every week. Built from real campaigns, not recycled theory.",
    url: URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
};
const WEBPAGE_SCHEMA = buildWebPageSchema({
  name: "Subscribe to The Outbound Operator",
  description: "Get one practical B2B growth playbook every week, covering outbound systems, AI prospecting, cold email, LinkedIn, and pipeline conversion.",
  url: URL,
  breadcrumb: [
    { name: "Home", url: SITE_URL },
    { name: "Newsletter", url: URL },
  ],
});
const TOPICS = [
  ["01", "Campaigns dissected", "See why an outbound campaign worked, stalled, or failed and what we changed next."],
  ["02", "Systems you can steal", "Copy practical workflows for targeting, research, enrichment, and follow-up."],
  ["03", "Messages that get replies", "Break down cold emails and LinkedIn messages built around real buyer context."],
  ["04", "AI without the hype", "Use AI to improve outbound execution without adding another complicated tool stack."],
];

export default function NewsletterSubscribePage() {
  return (
    <InnerLayout>
      <JsonLd data={WEBPAGE_SCHEMA} />
      <section className="relative pt-32 pb-20 px-4 overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" className="absolute rounded-full animate-[bubble-float_10s_ease-in-out_infinite]" style={{ top: -180, left: -180, width: 700, height: 700, background: "radial-gradient(circle,rgba(245,183,49,.28),rgba(245,183,49,.08) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div aria-hidden="true" className="absolute rounded-full animate-[bubble-float_12s_ease-in-out_infinite_reverse]" style={{ top: -120, right: -200, width: 640, height: 640, background: "radial-gradient(circle,rgba(59,130,246,.18),rgba(59,130,246,.05) 42%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Newsletter", href: "/newsletter-subscribe" }]} />
          <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-10 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 hero-fade" style={{ backgroundColor: "rgba(245,183,49,.1)", borderColor: "rgba(217,119,6,.3)" }}><span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#D97706" }} /><span className="text-xs font-black uppercase tracking-[.16em]" style={{ color: "#8A3F06" }}>The weekly B2B growth playbook</span></div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.06] mb-6 hero-fade-d1" style={{ color: "#0a0a0a" }}>Steal the systems behind<br /><span className="relative inline-block">predictable pipeline<svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 360 14" preserveAspectRatio="none" aria-hidden="true"><path d="M4 9 Q90 3 180 9 Q270 15 356 7" stroke="#F5B731" strokeWidth="3.5" fill="none" strokeLinecap="round" /></svg></span></h1>
              <p className="text-lg sm:text-xl leading-relaxed max-w-2xl hero-fade-d2" style={{ color: "#52525B" }}>Every week, we unpack one useful lesson from building real B2B outbound campaigns. Get the targeting logic, messaging frameworks, AI workflows, and campaign decisions you can apply to your own pipeline.</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-7 text-sm font-semibold hero-fade-d3" style={{ color: "#71675E" }}><span>✓ Real campaign lessons</span><span>✓ Copy-ready frameworks</span><span>✓ A five-minute read</span></div>
            </div>
            <div className="relative rounded-[28px] border p-7 sm:p-9 hero-fade-d2" style={{ backgroundColor: "rgba(255,255,255,.92)", borderColor: "rgba(245,183,49,.32)", boxShadow: "0 22px 65px rgba(55,42,10,.12)" }}>
              <div aria-hidden="true" className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl rotate-6" style={{ background: "linear-gradient(135deg,#F5B731,#D97706)" }} />
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#A14A08" }}>The Outbound Operator</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-3" style={{ color: "#0a0a0a" }}>Get the next playbook</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#71675E" }}>Join founders and growth operators learning how to create more qualified sales conversations.</p>
              <NewsletterForm inputId="newsletter-page-email" buttonLabel="Send me the playbooks" />
              <p className="text-xs leading-relaxed mt-4 text-center" style={{ color: "#71675E" }}>By subscribing, you agree to receive marketing emails from Myntmore. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 border-t" style={{ backgroundColor: "#fff", borderColor: "#E8E2D9" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn><div className="text-center max-w-2xl mx-auto mb-10"><span className="text-xs font-black uppercase tracking-[.18em]" style={{ color: "#A14A08" }}>What you will get</span><h2 className="text-3xl sm:text-4xl font-black mt-3" style={{ color: "#0a0a0a" }}>The decisions behind the results</h2></div></FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">{TOPICS.map(([number, title, description], index) => <FadeIn key={number} delay={index * 80}><div className="group h-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}><div className="flex items-start gap-4"><span className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-xs font-black shrink-0 group-hover:rotate-6 transition-transform" style={{ backgroundColor: index % 2 ? "#DBEAFE" : "#FEF3C7", color: index % 2 ? "#1D4ED8" : "#A14A08" }}>{number}</span><div><h3 className="text-lg font-black mb-2" style={{ color: "#0a0a0a" }}>{title}</h3><p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{description}</p></div></div></div></FadeIn>)}</div>
        </div>
      </section>
    </InnerLayout>
  );
}
