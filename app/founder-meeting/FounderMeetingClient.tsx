"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import InnerLayout from "../components/InnerLayout";

export default function FounderMeetingClient() {
  const router = useRouter();

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.origin !== "https://calendly.com") return;
      if (e.data?.event === "calendly.event_scheduled") {
        router.push("/thank-you?booked=1");
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  return (
    <InnerLayout>
      <section className="pt-32 pb-20 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto text-center mb-10">
          <span
            className="inline-flex text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: "rgba(245,183,49,0.12)", color: "#A14A08", border: "1px solid rgba(245,183,49,0.35)" }}
          >
            Book a call
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: "#0a0a0a" }}>
            Pick a time that works for you
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#52525B" }}>
            30 minutes with our founder. No pitch, no pressure, just a clear look at your pipeline.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl border overflow-hidden" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/founder-myntmore/web?primary_color=ffc947"
            style={{ minWidth: "320px", height: "700px" }}
          />
        </div>
      </section>

      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
    </InnerLayout>
  );
}
