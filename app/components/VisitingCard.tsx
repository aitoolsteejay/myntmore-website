import type { ReactNode } from "react";
import Image from "next/image";
import InnerLayout from "./InnerLayout";
import Breadcrumbs from "./Breadcrumbs";
import { SaveContactIcon } from "./ContactIcons";

export interface VisitingCardContact {
  label: string;
  cta: string;
  href: string;
  icon: ReactNode;
  bg: string;
}

export default function VisitingCard({
  path,
  name,
  title,
  photoSrc,
  photoAlt,
  contacts,
  vCardHref,
  ctaHref = "/book-a-call",
  ctaLabel = "Book a Call",
  intro,
  nameDecoration,
  children,
}: {
  path: string;
  name: string;
  title: string;
  photoSrc: string;
  photoAlt: string;
  contacts: VisitingCardContact[];
  vCardHref?: string;
  ctaHref?: string;
  ctaLabel?: string;
  intro?: string;
  nameDecoration?: ReactNode;
  children?: ReactNode;
}) {
  const bookCall = (
    <a href={ctaHref} className="btn-dark w-full py-3.5 text-sm font-bold inline-flex items-center justify-center gap-2">
      {ctaLabel}
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
    </a>
  );
  const saveContact = vCardHref && (
    <a
      href={vCardHref}
      className={`${intro ? "" : "mb-6 "}inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 px-5 py-3.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
      style={{ borderColor: "#F5B731", color: "#0a0a0a", background: "linear-gradient(135deg, #FEF9EC 0%, #FDE68A 30%, #FEF9EC 100%)" }}
    >
      <SaveContactIcon />
      {intro ? "Save contact" : "Save Contact"}
    </a>
  );

  return (
    <InnerLayout>
      <section className="relative overflow-hidden pt-32 pb-24 px-4 min-h-[70vh] flex flex-col items-center" style={{ backgroundColor: "#F8F6F2" }}>
        {/* Yellow blob top left */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-120px",
            left: "-140px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,183,49,0.35) 0%, rgba(255,160,0,0.15) 40%, transparent 68%)",
            filter: "blur(55px)",
            pointerEvents: "none",
          }}
        />
        {/* Purple blob top right */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-100px",
            right: "-140px",
            width: "460px",
            height: "460px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(124,58,237,0.12) 40%, transparent 68%)",
            filter: "blur(55px)",
            pointerEvents: "none",
          }}
        />
        {/* Orange blob bottom */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-160px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,107,53,0.22) 0%, rgba(255,60,0,0.08) 40%, transparent 68%)",
            filter: "blur(55px)",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-10 w-full max-w-sm">
          <Breadcrumbs items={[{ label: name, href: path }]} className="justify-center" />
        </div>
        <div
          className="relative z-10 w-full max-w-sm rounded-3xl border p-8 text-center"
          style={{ background: "linear-gradient(135deg, #ffffff 0%, #FEF9EC 100%)", borderColor: "#E8E2D9", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
        >
          <div className="relative mx-auto mb-5 h-[136px] w-[136px] rounded-full p-[3px]" style={{ background: "linear-gradient(135deg, #F5B731 0%, #a855f7 100%)" }}>
            <div className="relative h-full w-full overflow-hidden rounded-full border-2" style={{ backgroundColor: "#EDE9E4", borderColor: "#ffffff" }}>
              <Image src={photoSrc} alt={photoAlt} fill sizes="136px" className="object-cover object-top" priority />
            </div>
          </div>

          <h1 className="text-2xl font-black mb-1" style={{ color: "#0a0a0a" }}>
            {name}
            {nameDecoration}
          </h1>
          <p className="text-sm mb-5" style={{ color: "#71675E" }}>{title}</p>

          {intro ? (
            <>
              <p className="mb-5 text-sm leading-relaxed text-[#52525B]">{intro}</p>
              <div className="mb-5 grid gap-2">
                {bookCall}
                {saveContact}
              </div>
            </>
          ) : saveContact}

          <div className={intro ? "flex flex-wrap justify-center gap-2 border-t border-[#E8E2D9] pt-4" : "mb-8 flex flex-col gap-3"}>
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={intro
                  ? "group flex min-h-11 items-center gap-1.5 rounded-full border px-2.5 py-1.5 hover:border-[#F5B731]"
                  : "group flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"}
                style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}
              >
                <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-full text-white ${intro ? "size-6 [&>svg]:size-3.5" : "size-11"}`} style={{ backgroundColor: c.bg }}>
                  {c.icon}
                </span>
                <span className={intro ? "text-xs font-semibold" : "flex-1 text-sm font-bold"} style={{ color: "#0a0a0a" }}>{intro ? c.label : c.cta}</span>
                {!intro && <svg className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="#71675E" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>}
              </a>
            ))}
          </div>

          {!intro && bookCall}
        </div>
        {children}
      </section>
    </InnerLayout>
  );
}
