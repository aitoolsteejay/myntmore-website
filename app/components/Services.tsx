"use client";

import { useState, useRef, useEffect } from "react";
import { textTone } from "@/lib/colors";

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    number: "01",
    accentColor: "#F5B731",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Cold Email Outreach",
    description:
      "We build and run cold email campaigns that land in inboxes and get replies. Every sequence is written for your specific ICP sharp subject lines, personalised openers, and CTAs that convert cold strangers into booked meetings.",
    features: [
      "Domain warm-up & deliverability infrastructure",
      "Hyper-personalised copy per ICP segment",
      "A/B tested subject lines and opening hooks",
      "Multi-step sequences optimised for reply rate",
    ],
    metric: { value: "47%", label: "Avg. Open Rate" },
  },
  {
    number: "02",
    accentColor: "#3B82F6",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" rx="1" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    title: "LinkedIn Outreach",
    description:
      "We turn LinkedIn into a consistent meeting-booking machine. From connection requests to follow-up messages, every touchpoint starts real conversations with decision-makers not just adds to your connection count.",
    features: [
      "Targeted ICP outreach at scale",
      "Personalised connection + message sequences",
      "Profile optimisation to build instant credibility",
      "Coordinated with email for multi-channel impact",
    ],
    metric: { value: "35%", label: "Reply Rate" },
  },
  {
    number: "03",
    accentColor: "#7C3AED",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: "Account-Based Marketing",
    description:
      "We identify your highest-value target accounts and run coordinated campaigns across email and LinkedIn to engage the entire buying committee so when your AE reaches out, the account already knows your name.",
    features: [
      "ICP-matched target account lists",
      "Intent data & buying signal tracking",
      "Multi-threaded buying committee engagement",
      "Account-level pipeline reporting & attribution",
    ],
    metric: { value: "6.4×", label: "Higher Deal Size" },
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────
function ServiceCard({
  number, accentColor, icon, title, description, features, metric,
}: typeof SERVICES[0]) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col rounded-2xl overflow-hidden bg-white"
      style={{
        border: "1px solid #E8E2D9",
        borderTop: `3px solid ${accentColor}`,
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.10)" : "0 2px 10px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* Body */}
      <div className="p-8 flex flex-col flex-1">

        {/* Icon + ghost number */}
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${accentColor}15`,
              border: `1.5px solid ${accentColor}38`,
              color: accentColor,
            }}
          >
            {icon}
          </div>
          <span
            className="text-6xl font-black leading-none select-none"
            aria-hidden="true"
            style={{ color: accentColor, opacity: 0.12 }}
          >
            {number}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-black text-[#0a0a0a] leading-tight mb-3">{title}</h3>

        {/* Description */}
        <p className="text-[#52525B] text-sm leading-relaxed mb-7">{description}</p>

        {/* Features */}
        <ul className="space-y-3 flex-1" role="list">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-[#3D3D3D]">
              <svg
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke={accentColor}
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer metric only */}
      <div
        className="px-8 py-5"
        style={{ borderTop: "1px solid #E8E2D9", background: `${accentColor}08` }}
      >
        <div className="text-2xl font-black tabular-nums" style={{ color: textTone(accentColor) }}>
          {metric.value}
        </div>
        <div
          className="text-xs font-bold uppercase tracking-widest mt-0.5"
          style={{ color: "#71675E" }}
        >
          {metric.label}
        </div>
      </div>
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Services() {
  const underlineRef = useRef<SVGPathElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = statsRef.current;
    if (!container) return;

    const STATS = [
      { ref: stat1Ref, target: 3.2,  duration: 1600, format: (n: number) => `${n.toFixed(1)}x` },
      { ref: stat2Ref, target: 18,   duration: 1400, format: (n: number) => `${Math.round(n)} days` },
      { ref: stat3Ref, target: 120,  duration: 1800, format: (n: number) => `${Math.round(n)}+` },
    ];

    // Declared in the effect's own scope (not the IntersectionObserver
    // callback's) so the effect's cleanup can actually reach and cancel
    // these -- a callback return value is not a cleanup function and is
    // silently discarded by IntersectionObserver.
    const animIds: number[] = [];

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      STATS.forEach(({ ref, target, duration, format }) => {
        if (!ref.current) return;
        let startTime: number | null = null;
        function tick(ts: number) {
          if (!startTime) startTime = ts;
          const progress = Math.min((ts - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          if (ref.current) ref.current.textContent = format(eased * target);
          if (progress < 1) animIds.push(requestAnimationFrame(tick));
        }
        animIds.push(requestAnimationFrame(tick));
      });
    }, { threshold: 0.4 });

    observer.observe(container);
    return () => {
      observer.disconnect();
      animIds.forEach(cancelAnimationFrame);
    };
  }, []);

  useEffect(() => {
    const path = underlineRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);

    let animId: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        let startTime: number | null = null;
        const duration = 1200;

        function draw(ts: number) {
          if (!path) return;
          if (!startTime) startTime = ts;
          const progress = Math.min((ts - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          path.style.strokeDashoffset = String(length * (1 - eased));
          if (progress < 1) animId = requestAnimationFrame(draw);
        }

        animId = requestAnimationFrame(draw);
      },
      { threshold: 0.4 }
    );

    observer.observe(path);
    return () => {
      observer.disconnect();
      if (animId !== null) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      id="services"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#F8F6F2" }}
      aria-labelledby="services-heading"
    >
      {/* Subtle blobs */}
      <div aria-hidden="true" style={{ position:"absolute", top:"-80px", right:"-60px", width:"480px", height:"480px", borderRadius:"50%", background:"radial-gradient(circle, rgba(245,183,49,0.10) 0%, transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />
      <div aria-hidden="true" style={{ position:"absolute", bottom:"-80px", left:"-60px", width:"480px", height:"480px", borderRadius:"50%", background:"radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-5 px-3 py-1 rounded-full border"
            style={{ color: "#A14A08", borderColor: "rgba(245,183,49,0.35)", background: "#FEF9EC" }}
          >
            Our Services
          </span>
          <h2
            id="services-heading"
            className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight"
          >
            Three Channels. One Goal.
            <br />
            <span style={{ color: "#A14A08" }}>Meetings on Your Calendar</span>
          </h2>
          {/* Wavy gold underline */}
          <div className="flex justify-center -mt-1 mb-1" aria-hidden="true">
            <svg viewBox="0 0 420 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[260px] sm:w-[340px] lg:w-[400px]">
              <path ref={underlineRef} d="M4 10 C40 4, 80 16, 120 10 S200 4, 240 10 S320 16, 360 10 S400 4, 416 10" stroke="#F5B731" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <p className="mt-4 text-[#52525B] text-lg max-w-2xl mx-auto">
            Cold email, LinkedIn outreach, and ABM working together to get your brand
            in front of the right people and convert them into qualified pipeline.
          </p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        {/* Shared CTA */}
        <div className="flex flex-col items-center justify-center gap-3 mt-10 text-center">
          <a
            href="/book-a-call"
            className="btn-dark inline-flex items-center gap-2 px-8 py-4 text-base font-bold justify-center"
            style={{ borderRadius: "9999px" }}
          >
            Book a Free Strategy Call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="text-sm text-[#71675E]">No commitment · 30-minute call · Live in 18 days</p>
          <a href="/b2b-lead-generation-mumbai" className="text-sm font-semibold text-[#52525B] underline underline-offset-2">
            Explore B2B lead generation in Mumbai
          </a>
        </div>

        {/* Bottom stat strip */}
        <div
          ref={statsRef}
          className="mt-10 rounded-2xl grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x overflow-hidden"
          style={{ background: "#ffffff", border: "1px solid #E8E2D9", boxShadow: "0 2px 16px rgba(0,0,0,0.04)", borderColor: "#E8E2D9" }}
        >
          {[
            { ref: stat1Ref, stat: "3.2x",   label: "Higher reply rate than industry average" },
            { ref: stat2Ref, stat: "18 days", label: "Average time to campaign launch" },
            { ref: stat3Ref, stat: "130+",    label: "B2B companies trust Myntmore" },
          ].map((item, i) => (
            <div
              key={item.stat}
              className="flex flex-col items-center text-center px-8 py-7"
              style={{ borderColor: "#E8E2D9" }}
            >
              <span
                ref={item.ref}
                className="text-2xl sm:text-4xl font-black tabular-nums text-[#0a0a0a]"
              >
                {item.stat}
              </span>
              <span
                className="block w-6 h-0.5 rounded-full mx-auto mt-2 mb-2"
                style={{ background: "#F5B731" }}
              />
              <span className="text-sm text-[#71675E] leading-snug max-w-[180px]">{item.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
