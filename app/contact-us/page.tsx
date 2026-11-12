import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../components/InnerLayout";
import FadeIn from "../components/FadeIn";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import SubmitButton from "../components/SubmitButton";
import { buildLocalBusinessSchema } from "@/lib/schema";
import { LeadSourceField } from "../components/LeadSource";
import { OG_BASE } from "@/lib/og";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/contact-us", {
  title: { absolute: "Contact Myntmore | Book a Free B2B GTM Audit" },
  description: "Book a free 30-minute B2B GTM audit with Myntmore. We'll map your ICP and find what's holding your pipeline back. No pitch, no pressure.",
  alternates: { canonical: "https://www.myntmore.com/contact-us" },
  keywords: [
    "contact myntmore",
    "book a b2b gtm audit",
    "free gtm audit",
    "b2b lead generation agency contact",
    "myntmore mumbai office",
    "book a strategy call",
    "b2b outbound consultation",
    "talk to a b2b growth agency",
    "get a b2b pipeline audit",
    "myntmore contact number",
    "schedule a discovery call",
    "b2b agency mumbai contact",
  ],
  openGraph: {
    ...OG_BASE,
    title: "Contact Myntmore | Book a Free B2B GTM Audit",
    description: "Book a free 30-minute strategy call. No pitch, no pressure. Just clarity on your pipeline.",
    url: "https://www.myntmore.com/contact-us",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
});

const CONTACT_CARDS = [
  { icon: "📅", title: "Free GTM Audit", value: "30-minute strategy call", href: "/book-a-call", cta: "Book free call" },
  { icon: "✉️", title: "Email Directly", value: "growth@myntmore.com", href: "mailto:growth@myntmore.com", cta: "Send email" },
  { icon: "📞", title: "Call Us", value: "+91 81693 18951", href: "tel:+918169318951", cta: "Call now" },
];

export default function ContactUs() {
  return (
    <InnerLayout>
      <JsonLd data={buildLocalBusinessSchema("https://www.myntmore.com/contact-us")} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto text-center">
          <Breadcrumbs items={[{ label: "Contact", href: "/contact-us" }]} className="justify-center" />
          <div className="mb-4">
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-fade-d1" style={{ color: "#0a0a0a" }}>
            Stop guessing<br />Start closing
          </h1>
          <p className="text-lg sm:text-xl max-w-xl mx-auto hero-fade-d2" style={{ color: "#52525B" }}>
            Book a 30-minute strategy call. We&apos;ll audit your outreach, map your ICP, and tell you exactly what&apos;s holding your pipeline back. No pitch, no pressure.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn><div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {CONTACT_CARDS.map((c) => (
              <a key={c.title} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined} className="block rounded-2xl border p-6 card-hover-warm" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <div className="text-2xl mb-3">{c.icon}</div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#71675E" }}>{c.title}</p>
                <p className="text-base font-semibold mb-3" style={{ color: "#0a0a0a" }}>{c.value}</p>
                <span className="text-sm font-bold" style={{ color: "#A14A08" }}>{c.cta} →</span>
              </a>
            ))}
          </div></FadeIn>

          <FadeIn delay={80}><div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <div className="rounded-2xl border p-8" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <h2 className="text-2xl font-black mb-2" style={{ color: "#0a0a0a" }}>Let&apos;s build your AI engine</h2>
                <p className="text-sm mb-6" style={{ color: "#52525B" }}>Fill out the form and we&apos;ll get back to you within 24 hours with a custom GTM strategy.</p>
                <form className="space-y-4"
                  action="https://forms.zohopublic.com/flintstop/form/MyntmoreWebsiteform/formperma/3F8IpEgLtb2RnoXcr_yUsp56_-WdQdO2-sM6eaCOKi0/htmlRecords/submit"
                  name="form" id="form" method="POST" acceptCharset="UTF-8" encType="multipart/form-data">
                  <LeadSourceField />
                  <input type="hidden" name="zf_redirect_url" value="https://www.myntmore.com/thank-you" />
                  <input type="hidden" name="zc_gad" value="" />
                  <div>
                    <label htmlFor="SingleLine" className="block text-xs font-semibold mb-1.5" style={{ color: "#3D3D3D" }}>Full Name *</label>
                    <input id="SingleLine" name="SingleLine" type="text" required maxLength={255} placeholder="Amara Okafor" className="w-full px-4 py-3 rounded-xl text-sm outline-none border" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9", color: "#0a0a0a" }} />
                  </div>
                  <div>
                    <label htmlFor="SingleLine2" className="block text-xs font-semibold mb-1.5" style={{ color: "#3D3D3D" }}>Designation *</label>
                    <input id="SingleLine2" name="SingleLine2" type="text" required maxLength={255} placeholder="Founder / Head of Sales" className="w-full px-4 py-3 rounded-xl text-sm outline-none border" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9", color: "#0a0a0a" }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="SingleLine3" className="block text-xs font-semibold mb-1.5" style={{ color: "#3D3D3D" }}>Company</label>
                      <input id="SingleLine3" name="SingleLine3" type="text" maxLength={255} placeholder="Northbridge Consulting" className="w-full px-4 py-3 rounded-xl text-sm outline-none border" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9", color: "#0a0a0a" }} />
                    </div>
                    <div>
                      <label htmlFor="PhoneNumber_countrycode" className="block text-xs font-semibold mb-1.5" style={{ color: "#3D3D3D" }}>Phone</label>
                      <input id="PhoneNumber_countrycode" name="PhoneNumber_countrycode" type="tel" maxLength={20} placeholder="+1 617 555 0134" className="w-full px-4 py-3 rounded-xl text-sm outline-none border" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9", color: "#0a0a0a" }} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="Email" className="block text-xs font-semibold mb-1.5" style={{ color: "#3D3D3D" }}>Email *</label>
                    <input id="Email" name="Email" type="email" required maxLength={255} placeholder="amara@northbridge.co" className="w-full px-4 py-3 rounded-xl text-sm outline-none border" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9", color: "#0a0a0a" }} />
                  </div>
                  <SubmitButton>Get Your Custom Strategy</SubmitButton>
                  <p className="text-center text-xs" style={{ color: "#71675E" }}>No commitments. No agency pitch decks. Just clarity.</p>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <h3 className="text-base font-black mb-4" style={{ color: "#0a0a0a" }}>What happens next</h3>
                {[
                  "Submit your details above or book a call directly on our calendar",
                  "We review your current outreach setup before the call",
                  "30-min GTM audit: ICP mapping, outreach review, pipeline blockers",
                  "Custom action plan sent within 24 hours",
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 mb-4">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>{`0${i + 1}`}</span>
                    <p className="text-sm" style={{ color: "#52525B" }}>{text}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <h3 className="text-base font-black mb-1" style={{ color: "#0a0a0a" }}>Our office</h3>
                <p className="text-xs mb-3 font-semibold">
                  <Link href="/b2b-lead-generation-mumbai" className="hover:underline" style={{ color: "#A14A08" }}>
                    Lead generation company in Mumbai
                  </Link>
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=WeWork%20Enam%20Sambhav%2C%20C%20-%2020%2C%20G%20Block%20Rd%2C%20G%20Block%20BKC%2C%20Bandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra%20400051"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline block leading-relaxed"
                  style={{ color: "#52525B" }}
                  aria-label="View WeWork Enam Sambhav BKC on Google Maps"
                >
                  WeWork Enam Sambhav<br />
                  C - 20, G Block Rd, G Block BKC,<br />
                  Bandra Kurla Complex, Bandra East,<br />
                  Mumbai, Maharashtra 400051
                </a>
              </div>
            </div>
          </div></FadeIn>
        </div>
      </section>
    </InnerLayout>
  );
}
