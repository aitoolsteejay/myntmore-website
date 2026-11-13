import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../components/InnerLayout";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/thank-you", {
  title: "Thanks, We've Got Your Details",
  description: "Thanks for reaching out to Myntmore. We've received your details and will follow up within 24 hours.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://www.myntmore.com/thank-you" },
  keywords: [
    "myntmore thank you",
    "myntmore contact confirmation",
    "form submitted confirmation",
    "myntmore lead form thank you",
    "myntmore follow up confirmation",
  ],
});

// Bookings (Zoho Bookings on /book-a-call, /founder-meeting, /calendar/th) land here with ?booked=1,
// so every conversion uses one thank-you URL while bookers still see a booking confirmation.
export default function ThankYouLeadFormPage({ searchParams }: { searchParams?: { booked?: string } }) {
  const booked = searchParams?.booked === "1";
  return (
    <InnerLayout>
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", left: "-120px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.28) 0%, rgba(255,160,0,0.1) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: "-80px", right: "-100px", width: "560px", height: "560px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.2) 0%, rgba(255,200,50,0.08) 45%, transparent 68%)", filter: "blur(50px)", pointerEvents: "none" }} />

        <div className="relative z-10 max-w-xl mx-auto text-center">
          <div className="mx-auto mb-8 flex items-center justify-center lp-pop-in" style={{ width: "88px", height: "88px", borderRadius: "9999px", backgroundColor: "rgba(34,197,94,0.12)", border: "2px solid rgba(34,197,94,0.35)" }}>
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <span className="inline-flex text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 hero-fade-d1" style={{ backgroundColor: "rgba(245,183,49,0.12)", color: "#A14A08", border: "1px solid rgba(245,183,49,0.35)" }}>
            {booked ? <>You&apos;re all set</> : "Message received"}
          </span>

          <h1 className="text-4xl sm:text-5xl font-black mb-5 leading-tight hero-fade-d2" style={{ color: "#0a0a0a" }}>
            {booked ? "Your call is booked!" : <>Thanks, we&apos;ve got your details.</>}
          </h1>

          <p className="text-lg mb-10 hero-fade-d3" style={{ color: "#52525B" }}>
            {booked
              ? <>Thanks for booking time with our founder. You&apos;ll get a calendar invite and a confirmation email shortly. Keep an eye on your inbox.</>
              : "Someone from our team will review what you shared and follow up within 24 hours with next steps for your pipeline. No spam, no auto-drip sequence, just a real reply."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center hero-fade-d3">
            {!booked && <a href="/book-a-call" className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2">
              Skip the wait, book a call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>}
            <Link href="/case-studies" className="px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2 rounded-xl border transition-colors" style={{ borderColor: "#D0C9BF", color: "#0a0a0a", backgroundColor: "rgba(255,255,255,0.7)" }}>
              See client results
            </Link>
          </div>

          <p className="mt-8 text-xs hero-fade-d3" style={{ color: "#71675E" }}>
            {booked ? "Need to reschedule? Just use the link in your confirmation email." : <>
            Wrong email or need to add something?{" "}
            <a href="mailto:growth@myntmore.com" className="link-subtle font-semibold" style={{ color: "#0a0a0a" }}>Email us directly</a>.</>}
          </p>
        </div>
      </section>
    </InnerLayout>
  );
}
