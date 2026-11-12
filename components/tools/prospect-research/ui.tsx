// Shared colours and small pieces for the Prospect Research tool. Brand palette only:
// orange and gold on cream (docs/website-bible.md, Part 8 and Appendix A.2).
import { GOLD_TEXT as GOLD_TEXT_COLOUR } from "@/lib/colors";

export const INK = "#0A0A0A";
export const MUTED = "#52525B";
export const SOFT = "#71675E";
export const BORDER = "#E8E2D9";
export const GOLD = "#F5B731";
export const GOLD_TEXT = GOLD_TEXT_COLOUR;
export const ORANGE = "#EA580C";
export const CARD_SHADOW = "0 24px 70px rgba(15,15,20,0.06)";

export function GoldBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5" style={{ background: "rgba(245,183,49,0.12)", borderColor: "rgba(245,183,49,0.5)" }}>
      <span className="h-1.5 w-1.5 rounded-full motion-safe:animate-pulse" style={{ backgroundColor: GOLD }} aria-hidden="true" />
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: GOLD_TEXT }}>{children}</span>
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border bg-white ${className}`} style={{ borderColor: BORDER, boxShadow: CARD_SHADOW }}>
      {children}
    </div>
  );
}

/** A calm message panel for errors and notices: soft gold, ink text. */
export function Notice({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div role="alert" className="rounded-2xl border p-5 text-sm leading-relaxed" style={{ borderColor: "rgba(245,183,49,0.5)", backgroundColor: "#FEF9EC", color: INK }}>
      {title && <p className="mb-1 font-black">{title}</p>}
      {children}
    </div>
  );
}

export const fieldClass =
  "w-full rounded-xl border bg-white px-4 py-3 text-base outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#F5B731] disabled:opacity-60";
