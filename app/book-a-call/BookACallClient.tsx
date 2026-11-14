"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  Video,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Calendar,
  Lock,
  ChevronDown,
} from "lucide-react";
import InnerLayout from "../components/InnerLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import FadeIn from "../components/FadeIn";

const FAQS = [
  {
    q: "Who is this strategy session best suited for?",
    a: "B2B founders, CEOs, heads of sales and GTM leaders selling high-ticket services, SaaS or complex enterprise solutions, who want a predictable, repeatable outbound pipeline without relying on luck or spam. It suits teams that have some customers already and want more of the same kind, in India or overseas.",
  },
  {
    q: "Is this call really 100% free? What is the catch?",
    a: "Yes, it is completely free with zero catch. We do not do high-pressure sales pitches. We treat this as an honest diagnostic session to see if our systems can help you. If we're a mutual fit, we can discuss working together; if not, you still walk away with an actionable 90-day outbound roadmap.",
  },
  {
    q: "What should I bring to the call?",
    a: "A quick overview of your ideal customer profile (ICP), the outbound or inbound channels you use today and your monthly revenue goals. If you have live outbound copy or campaign metrics you'd like us to review, have them ready. A rough version of each is fine; working it out is part of the call.",
  },
  {
    q: "Can I bring my co-founder or Head of Sales along?",
    a: "Yes. Forward the Google Meet calendar invite to anyone on your leadership, sales or marketing team who is involved in generating pipeline. It often helps to have whoever owns your targeting and whoever takes the sales calls in the same conversation, so the plan we discuss fits both.",
  },
  {
    q: "What if none of the available slots work for my timezone?",
    a: "Reach out directly on WhatsApp at +91 81693 18951 or email growth@myntmore.com, and we'll find a time that suits your schedule. We work with companies in India and overseas, so calls outside Indian business hours can usually be arranged. Mention your time zone and a few times that work.",
  },
];

export default function BookACallClient() {
  const router = useRouter();
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Listen to Zoho Bookings completion messages
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (typeof e.origin === "string" && (e.origin.includes("zohobookings") || e.origin.includes("zoho.com"))) {
        if (e.data && (e.data.type === "booking_success" || e.data.action === "booked" || e.data.status === "completed")) {
          router.push("/thank-you?booked=1");
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  const zohoEmbedUrl = "https://meetingwithteejay.zohobookings.com/portal-embed#/4203790000004903007";
  const zohoExternalUrl = "https://meetingwithteejay.zohobookings.com/#/4203790000004903007";

  return (
    <InnerLayout>
      {/* Background ambient lighting */}
      <div className="relative overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #F5B731, transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-96 left-0 w-[420px] h-[420px] rounded-full pointer-events-none opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #D97706, transparent 70%)" }}
          aria-hidden="true"
        />

        {/* ── Main Hero & Booking Section ──────────────────────────────── */}
        <section className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <Breadcrumbs items={[{ label: "Book a Call", href: "/book-a-call" }]} />

          {/* Header pill & Title */}
          <div className="max-w-3xl mb-10 sm:mb-12">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border"
              style={{
                backgroundColor: "#FEF9EC",
                color: "#A14A08",
                borderColor: "rgba(245,183,49,0.35)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5B731]" />
              <span>1-on-1 Growth Consultation · Free GTM Audit</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4" style={{ color: "#0A0A0A" }}>
              Get absolute clarity on your{" "}
              <span className="relative inline-block">
                <span className="relative z-10">pipeline.</span>
                <span
                  className="absolute left-0 bottom-1 w-full h-3 rounded-sm -z-0 opacity-40"
                  style={{ backgroundColor: "#F5B731" }}
                  aria-hidden="true"
                />
              </span>
              <br className="hidden sm:inline" /> In 30 minutes.
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
              Choose a time with our senior growth team. We will audit your outbound systems, stress-test your ICP, and map high-converting angles with zero sales pressure.
            </p>
          </div>

          {/* Two-Column Grid: Left Authority/Agenda, Right Calendar Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* ── Left Column: Value, Hosts & Trust ────────────────────────── */}
            <div className="lg:col-span-5 space-y-6">
              {/* Host & Meeting Format Card */}
              <div
                className="rounded-2xl border p-6 bg-white/95 backdrop-blur-sm shadow-sm"
                style={{ borderColor: "#E8E2D9" }}
              >
                <div className="flex items-center gap-4 mb-5 pb-5 border-b" style={{ borderColor: "#F1EBE1" }}>
                  <div className="flex -space-x-3">
                    <div className="relative w-14 h-14 rounded-full border-2 border-white shadow-md overflow-hidden bg-amber-50">
                      <Image
                        src="/enwil.png"
                        alt="Enwil Fernandes, Head of Sales at Myntmore"
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="relative w-14 h-14 rounded-full border-2 border-white shadow-md overflow-hidden bg-amber-50">
                      <Image
                        src="/tejas.png"
                        alt="Tejas Jhaveri, Founder of Myntmore"
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold" style={{ color: "#0A0A0A" }}>
                      Conducted by Senior Growth Team
                    </h2>
                    <p className="text-xs text-[#71675E]">
                      Enwil Fernandes & Tejas Jhaveri
                    </p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-[#A14A08] bg-[#FEF9EC] px-2 py-0.5 rounded border border-[#F5B731]/30">
                      B2B Outbound Specialists
                    </span>
                  </div>
                </div>

                {/* Session specs */}
                <div className="grid grid-cols-3 gap-2 text-center py-2 px-3 rounded-xl bg-[#F8F6F2] border border-[#E8E2D9]/80 text-xs font-semibold text-[#3D3D3D]">
                  <div className="flex items-center justify-center gap-1.5 py-1">
                    <Clock className="w-3.5 h-3.5 text-[#A14A08]" />
                    <span>30 Min</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 py-1 border-x border-[#E8E2D9]">
                    <Video className="w-3.5 h-3.5 text-[#A14A08]" />
                    <span>Google Meet</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 py-1 text-[#A14A08]">
                    <span>100% Free</span>
                  </div>
                </div>
              </div>

              {/* What We Diagnose Card */}
              <div
                className="rounded-2xl border p-6 bg-white shadow-sm"
                style={{ borderColor: "#E8E2D9" }}
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#71675E] mb-4">
                  What we cover on the call
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A0A0A]">
                        Outbound Stack & Deliverability Audit
                      </h4>
                      <p className="text-xs text-[#52525B] mt-0.5 leading-relaxed">
                        Secondary domains, SPF/DKIM/DMARC checks, and mailbox warming to keep you out of spam.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A0A0A]">
                        ICP & Offer Angle Validation
                      </h4>
                      <p className="text-xs text-[#52525B] mt-0.5 leading-relaxed">
                        Why enterprise decision-makers ignore generic pitches, and how to position your offer to demand attention.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A0A0A]">
                        90-Day Pipeline Action Plan
                      </h4>
                      <p className="text-xs text-[#52525B] mt-0.5 leading-relaxed">
                        A structured blueprint to scale to 15-30+ qualified sales conversations every single month.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Social Proof Metric Ticker */}
              <div
                className="grid grid-cols-2 gap-3 p-4 rounded-2xl border bg-[#FEF9EC]/60"
                style={{ borderColor: "rgba(245,183,49,0.3)" }}
              >
                <div>
                  <p className="text-2xl font-black text-[#0A0A0A]">130+</p>
                  <p className="text-xs text-[#71675E] font-medium">B2B Companies Scaled</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#0A0A0A]">12,000+</p>
                  <p className="text-xs text-[#71675E] font-medium">Meetings Booked</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#0A0A0A]">$120M+</p>
                  <p className="text-xs text-[#71675E] font-medium">Pipeline Generated</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#A14A08]">35%</p>
                  <p className="text-xs text-[#71675E] font-medium">Avg. LinkedIn Reply Rate</p>
                </div>
              </div>

              {/* Zero-pressure & Confidentiality Badges */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center gap-2 p-3 rounded-xl bg-white border border-[#E8E2D9] text-xs text-[#52525B]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Zero Pitch:</strong> Actionable diagnostic session.</span>
                </div>
                <div className="flex-1 flex items-center gap-2 p-3 rounded-xl bg-white border border-[#E8E2D9] text-xs text-[#52525B]">
                  <Lock className="w-4 h-4 text-[#A14A08] shrink-0" />
                  <span><strong>100% Private:</strong> Strict confidentiality.</span>
                </div>
              </div>
            </div>

            {/* ── Right Column: Zoho Bookings calendar ── */}
            <div className="lg:col-span-7">
              <div
                className="rounded-2xl sm:rounded-3xl border bg-white shadow-xl shadow-amber-950/5 overflow-hidden transition-all"
                style={{ borderColor: "#E8E2D9" }}
              >
                {/* ── Zoho Bookings calendar ─────────────────── */}
                  <div>
                    {/* Top Bar for Calendar */}
                    <div
                      className="px-5 py-3.5 border-b bg-[#FAF8F5] flex flex-wrap items-center justify-between gap-3"
                      style={{ borderColor: "#E8E2D9" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-bold text-[#0A0A0A]">
                          Select a Date & Time
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href={zohoExternalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-[#A14A08] hover:text-[#0A0A0A] inline-flex items-center gap-1 transition-colors"
                        >
                          <span>Open in new window</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Direct Embedded Zoho Bookings Container */}
                    <div className="relative min-h-[750px] bg-white">
                      {!calendarLoaded && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 py-20">
                          <div className="w-9 h-9 rounded-full border-2 border-[#E8E2D9] border-t-[#F5B731] animate-spin mb-3" />
                          <p className="text-xs text-[#71675E] font-medium">Loading Zoho calendar slots...</p>
                        </div>
                      )}
                      <iframe
                        src={zohoEmbedUrl}
                        width="100%"
                        height="780px"
                        title="Select a Date and Time - Zoho Bookings"
                        className="w-full border-0 block"
                        style={{
                          minWidth: "320px",
                          height: "780px",
                          border: "none",
                        }}
                        allow="camera; microphone; autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                        onLoad={() => setCalendarLoaded(true)}
                      />
                    </div>

                    {/* Direct Fallback link */}
                    <div className="p-4 bg-[#FAF8F5] border-t border-[#E8E2D9] flex flex-wrap items-center justify-between gap-3 text-xs">
                      <span className="text-[#71675E]">Prefer opening in full window?</span>
                      <a
                        href={zohoExternalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-[#A14A08] hover:text-[#0A0A0A] inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Open Zoho Calendar in new tab</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
              </div>

              {/* Direct WhatsApp / Email help below card */}
              <div className="mt-4 text-center sm:text-right">
                <p className="text-xs text-[#71675E]">
                  Questions or special scheduling needs?{" "}
                  <a
                    href="https://wa.me/918169318951"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#A14A08] hover:underline"
                  >
                    Message on WhatsApp
                  </a>{" "}
                  or email{" "}
                  <a
                    href="mailto:growth@myntmore.com"
                    className="font-semibold text-[#A14A08] hover:underline"
                  >
                    growth@myntmore.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── "How to Prepare" 2-Step Process ────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t" style={{ borderColor: "#E8E2D9" }}>
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A14A08] bg-[#FEF9EC] px-3 py-1 rounded-full border border-[#F5B731]/30">
                Simple 2-Step Process
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-3 text-[#0A0A0A]">
                How the strategy session works
              </h2>
              <p className="text-sm sm:text-base text-[#52525B]">
                We value your time. No generic slide decks. Just immediate, actionable engineering for your outbound funnel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border p-6 bg-white shadow-sm" style={{ borderColor: "#E8E2D9" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black mb-4 bg-[#FEF9EC] text-[#A14A08] border border-[#F5B731]/40">
                  01
                </span>
                <h3 className="text-base font-black text-[#0A0A0A] mb-2">Select Your Time Slot</h3>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                  Pick a convenient 30-minute calendar window on Google Meet. Calendar invites and reminders are sent immediately.
                </p>
              </div>

              <div className="rounded-2xl border p-6 bg-white shadow-sm" style={{ borderColor: "#E8E2D9" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black mb-4 bg-[#FEF9EC] text-[#A14A08] border border-[#F5B731]/40">
                  02
                </span>
                <h3 className="text-base font-black text-[#0A0A0A] mb-2">Get Your 90-Day Roadmap</h3>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                  Walk away with an exact diagnosis of your pipeline leakages and high-leverage steps to hit predictable meeting volume.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── FAQ Section ──────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t" style={{ borderColor: "#E8E2D9" }}>
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A14A08] bg-[#FEF9EC] px-3 py-1 rounded-full border border-[#F5B731]/30">
                FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-2 text-[#0A0A0A]">
                Frequently asked questions
              </h2>
              <p className="text-sm text-[#52525B]">
                Everything you need to know about the 30-minute growth audit.
              </p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border bg-white overflow-hidden transition-all"
                    style={{ borderColor: isOpen ? "#F5B731" : "#E8E2D9" }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0A0A0A] hover:bg-[#FAF8F5] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#71675E] transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-[#A14A08]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#52525B] leading-relaxed border-t border-[#F1EBE1]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </section>
      </div>
    </InnerLayout>
  );
}
