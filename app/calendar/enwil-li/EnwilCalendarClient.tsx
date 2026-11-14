"use client";

import Script from "next/script";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Clock, Video, Sparkles, ShieldCheck, Loader2 } from "lucide-react";
import InnerLayout from "../../components/InnerLayout";

declare global {
  interface Window {
    Bookings?: {
      inlineEmbed: (options: { url: string; parent: string; height: string }) => void;
    };
  }
}

interface EnwilCalendarClientProps {
  canonicalPath?: string;
  embedUrl?: string;
  badge?: string;
  title?: string;
  description?: string;
}

export default function EnwilCalendarClient({
  canonicalPath = "/calendar/enwil-li",
  embedUrl = "https://meetingwithteejay.zohobookings.com/portal-embed#/4203790000004915016",
  badge = "1-on-1 Outbound Consultation",
  title = "Pick a time that works for you",
  description = "Schedule a 1-on-1 session with our Head of Sales. We'll review your outbound pipeline, target ICP, and conversion bottlenecks.",
}: EnwilCalendarClientProps) {
  const initializedRef = useRef(false);
  const [loading, setLoading] = useState(true);

  const initBookings = () => {
    if (typeof window !== "undefined" && window.Bookings && !initializedRef.current) {
      const parentEl = document.querySelector("#inline-container");
      if (parentEl) {
        parentEl.innerHTML = "";
        const embedHeight = window.innerWidth < 640 ? "700px" : "650px";
        window.Bookings.inlineEmbed({
          url: embedUrl,
          parent: "#inline-container",
          height: embedHeight,
        });
        initializedRef.current = true;
        setTimeout(() => setLoading(false), 350);
      }
    }
  };

  useEffect(() => {
    initializedRef.current = false;
    setLoading(true);
    if (window.Bookings) {
      initBookings();
    }
    const interval = setInterval(() => {
      if (window.Bookings && !initializedRef.current) {
        initBookings();
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [embedUrl]);

  return (
    <InnerLayout>
      <div className="relative overflow-hidden min-h-[calc(100vh-80px)]" style={{ backgroundColor: "#F8F6F2" }}>
        {/* Ambient subtle background glow */}
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

        <section className="pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Context, Host & Trust Badges */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border"
                  style={{
                    backgroundColor: "#FEF9EC",
                    color: "#A14A08",
                    borderColor: "rgba(245,183,49,0.35)",
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F5B731]" />
                  <span>{badge}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-4 text-[#0A0A0A]">
                  {title}
                </h1>

                <p className="text-base text-[#52525B] leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Host Profile & Session Specs Card */}
              <div
                className="rounded-2xl border p-6 bg-white/95 backdrop-blur-sm shadow-sm"
                style={{ borderColor: "#E8E2D9" }}
              >
                <div className="flex items-center gap-4 mb-5 pb-5 border-b" style={{ borderColor: "#F1EBE1" }}>
                  <div className="relative w-14 h-14 rounded-full border-2 border-white shadow-sm overflow-hidden bg-amber-50 shrink-0">
                    <Image
                      src="/enwil.png"
                      alt="Enwil Fernandes, Head of Sales at Myntmore"
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#0A0A0A]">Enwil Fernandes</div>
                    <div className="text-xs text-[#71675E]">Head of Sales · B2B Outbound Specialist</div>
                    <span className="inline-block mt-1.5 text-[11px] font-semibold text-[#A14A08] bg-[#FEF9EC] px-2.5 py-0.5 rounded border border-[#F5B731]/30">
                      Senior Growth Consultation
                    </span>
                  </div>
                </div>

                {/* Meeting Specs */}
                <div className="grid grid-cols-3 gap-2 py-2 text-center border-b pb-5 mb-5" style={{ borderColor: "#F1EBE1" }}>
                  <div>
                    <div className="text-xs text-[#71675E] font-medium">Duration</div>
                    <div className="text-sm font-bold text-[#0A0A0A] flex items-center justify-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5 text-[#D97706]" /> 30 Mins
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#71675E] font-medium">Format</div>
                    <div className="text-sm font-bold text-[#0A0A0A] flex items-center justify-center gap-1 mt-1">
                      <Video className="w-3.5 h-3.5 text-[#2563EB]" /> Google Meet
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#71675E] font-medium">Cost</div>
                    <div className="text-sm font-bold text-[#059669] flex items-center justify-center gap-1 mt-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Free
                    </div>
                  </div>
                </div>

                {/* Agenda points */}
                <div className="space-y-2.5 text-xs text-[#52525B]">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
                    <span>Audit of your current outbound copy &amp; reply rates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
                    <span>ICP stress-test &amp; account list prioritization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
                    <span>Actionable roadmap with zero high-pressure sales pitch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Zoho Bookings Widget */}
            <div className="lg:col-span-7 w-full">
              <div
                className="w-full rounded-2xl border overflow-hidden shadow-sm bg-white relative min-h-[500px]"
                style={{ borderColor: "#E8E2D9" }}
              >
                {loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10 gap-3">
                    <Loader2 className="w-7 h-7 text-[#F5B731] animate-spin" />
                    <span className="text-xs text-[#71675E] font-medium">Loading calendar slots...</span>
                  </div>
                )}
                <div id="inline-container" className="w-full" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Script
        src="https://bookings.nimbuspop.com/assets/embed.js"
        strategy="afterInteractive"
        onLoad={initBookings}
      />
    </InnerLayout>
  );
}
