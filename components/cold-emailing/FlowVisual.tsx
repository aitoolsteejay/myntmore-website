import { CalendarCheck, Clock, Filter, Mail, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import d from "@/content/service-copy/cold-email.json";

const ORANGE = "#EA580C";
const GOLD = "#F5B731";

// Coordinates are in a 480 x 540 box; HTML nodes are positioned by percentage
// of that box so they stay aligned with the SVG path at any size.
const W = 480;
const H = 540;
const PATH = "M130 90 C250 90 250 230 350 230 C350 310 130 290 130 370 C130 450 250 480 350 480";

interface FlowNode {
  n: number;
  x: number;
  y: number;
  icon: LucideIcon;
  label: string;
  caption: string;
}

// Positions and icons are layout; the label and caption of each node live in
// content/service-copy/cold-email.json (hero.flow.nodes).
const NODE_LAYOUT: { x: number; y: number; icon: LucideIcon }[] = [
  { x: 130, y: 90, icon: Users },
  { x: 350, y: 230, icon: Filter },
  { x: 130, y: 370, icon: ShieldCheck },
  { x: 350, y: 480, icon: CalendarCheck },
];

const NODES: FlowNode[] = NODE_LAYOUT.map((layout, i) => ({ n: i + 1, ...layout, ...d.hero.flow.nodes[i] }));

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

// Hero artwork: how a campaign flows from list to booked call. Decorative, so
// it is hidden from assistive tech. The envelopes stop moving for visitors who
// prefer reduced motion.
export default function FlowVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] justify-self-center lg:justify-self-end" style={{ aspectRatio: `${W} / ${H}` }} aria-hidden="true">
      <style>{`
        @keyframes ce-float { 0%, 100% { transform: translate(-50%, -50%) translateY(0); } 50% { transform: translate(-50%, -50%) translateY(-7px); } }
        .ce-float { animation: ce-float 5.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .ce-float { animation: none; } .ce-mover { display: none; } }
      `}</style>

      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <radialGradient id="ce-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ORANGE} stopOpacity="0.16" />
            <stop offset="60%" stopColor={GOLD} stopOpacity="0.07" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ce-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={ORANGE} />
            <stop offset="100%" stopColor={GOLD} />
          </linearGradient>
        </defs>

        <circle cx={W / 2} cy={H / 2} r="250" fill="url(#ce-glow)" />
        <path d={PATH} fill="none" stroke={ORANGE} strokeOpacity="0.08" strokeWidth="16" strokeLinecap="round" />
        <path d={PATH} fill="none" stroke="url(#ce-line)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 11" />

        {[0, -3, -6].map((begin) => (
          <g key={begin} className="ce-mover">
            <rect x="-13" y="-10" width="26" height="20" rx="4" fill="#fff" stroke={ORANGE} strokeWidth="1.8" />
            <path d="M-12 -7 L0 3 L12 -7" fill="none" stroke={ORANGE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <animateMotion dur="9s" begin={`${begin}s`} repeatCount="indefinite" path={PATH} />
          </g>
        ))}
      </svg>

      {NODES.map((node) => {
        const Icon = node.icon;
        return (
          <div
            key={node.n}
            className="absolute rounded-2xl border bg-white p-3 sm:p-4"
            style={{
              left: pct(node.x, W),
              top: pct(node.y, H),
              width: "35%",
              transform: "translate(-50%, -50%)",
              borderColor: "#F0E4D6",
              boxShadow: "0 22px 50px rgba(234,88,12,0.12), 0 2px 6px rgba(15,15,20,0.04)",
            }}
          >
            <span className="absolute -left-2 -top-2 grid h-6 w-6 place-items-center rounded-full text-xs font-black" style={{ backgroundColor: "#F5B731", color: "#0A0A0A" }}>
              {node.n}
            </span>
            <span className="mb-2 grid h-9 w-9 place-items-center rounded-xl text-white sm:h-10 sm:w-10" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${GOLD})` }}>
              <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={2.2} />
            </span>
            <p className="text-[12px] font-black leading-tight sm:text-[13px]" style={{ color: "#0A0A0A" }}>{node.label}</p>
            <p className="mt-0.5 text-xs leading-snug sm:text-xs" style={{ color: "#6b655e" }}>{node.caption}</p>
          </div>
        );
      })}

      <div className="ce-float absolute flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-xs font-black" style={{ left: pct(305, W), top: pct(118, H), borderColor: "#F0E4D6", color: "#0A0A0A", boxShadow: "0 12px 28px rgba(15,15,20,0.08)" }}>
        <Mail className="h-3.5 w-3.5" style={{ color: ORANGE }} strokeWidth={2.4} />
        {d.hero.flow.emailsChip}
      </div>
      <div className="ce-float absolute flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-xs font-black" style={{ left: pct(112, W), top: pct(492, H), borderColor: "#F0E4D6", color: "#0A0A0A", boxShadow: "0 12px 28px rgba(15,15,20,0.08)", animationDelay: "-2.5s" }}>
        <Clock className="h-3.5 w-3.5" style={{ color: ORANGE }} strokeWidth={2.4} />
        {d.hero.flow.launchChip}
      </div>
    </div>
  );
}
