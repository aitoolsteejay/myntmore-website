import { Bot, CalendarCheck, MessagesSquare, ShieldCheck, UserPlus, Users, type LucideIcon } from "lucide-react";
import { BLUE, BLUE_LIGHT, GOLD, INK } from "./theme";
import d from "@/content/service-copy/linkedin-outreach.json";

// Coordinates are in a 480 x 540 box; HTML nodes are positioned by percentage
// of that box so they stay aligned with the SVG path at any size.
const W = 480;
const H = 540;
const PATH = "M130 90 C250 90 250 230 350 230 C350 310 130 290 130 370 C130 450 250 480 350 480";
const LOOP = 9; // seconds for one profile to travel the whole path

interface FlowNode {
  n: number;
  x: number;
  y: number;
  icon: LucideIcon;
}

const NODES: FlowNode[] = [
  { n: 1, x: 130, y: 90, icon: Users },
  { n: 2, x: 350, y: 230, icon: UserPlus },
  { n: 3, x: 130, y: 370, icon: MessagesSquare },
  { n: 4, x: 350, y: 480, icon: CalendarCheck },
];

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

// Hero artwork: how a LinkedIn campaign flows from the right buyer to a booked
// meeting. Decorative, so it is hidden from assistive tech. The profiles and
// pulses stop for visitors who prefer reduced motion.
export default function LinkedinFlowVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] justify-self-center lg:justify-self-end" style={{ aspectRatio: `${W} / ${H}` }} aria-hidden="true">
      <style>{`
        @keyframes li-float { 0%, 100% { transform: translate(-50%, -50%) translateY(0); } 50% { transform: translate(-50%, -50%) translateY(-7px); } }
        .li-float { animation: li-float 5.5s ease-in-out infinite; }
        @keyframes li-ring { 0% { opacity: 0; transform: scale(0.85); } 6% { opacity: 0.55; } 20% { opacity: 0; transform: scale(1.5); } 100% { opacity: 0; transform: scale(1.5); } }
        .li-ring { animation: li-ring ${LOOP}s ease-out infinite; }
        @keyframes li-pop { 0%, 70%, 100% { transform: scale(1); } 80% { transform: scale(1.18); } 90% { transform: scale(1); } }
        .li-pop { animation: li-pop ${LOOP}s ease-in-out infinite; animation-delay: ${(LOOP * 3) / 4}s; }
        @media (prefers-reduced-motion: reduce) { .li-float, .li-ring, .li-pop { animation: none; } .li-mover { display: none; } }
      `}</style>

      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <radialGradient id="li-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={BLUE} stopOpacity="0.16" />
            <stop offset="60%" stopColor={GOLD} stopOpacity="0.07" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="li-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={BLUE} />
            <stop offset="100%" stopColor={GOLD} />
          </linearGradient>
        </defs>

        <circle cx={W / 2} cy={H / 2} r="250" fill="url(#li-glow)" />
        <path d={PATH} fill="none" stroke={BLUE} strokeOpacity="0.08" strokeWidth="16" strokeLinecap="round" />
        <path d={PATH} fill="none" stroke="url(#li-line)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 11" />

        {[0, -3, -6].map((begin) => (
          <g key={begin} className="li-mover">
            <circle r="13" fill="#fff" stroke={BLUE} strokeWidth="1.8" />
            <circle cy="-3.5" r="3.6" fill={BLUE} />
            <path d="M-6.5 7.5 a6.5 5.5 0 0 1 13 0" fill={BLUE} />
            <animateMotion dur={`${LOOP}s`} begin={`${begin}s`} repeatCount="indefinite" path={PATH} />
          </g>
        ))}
      </svg>

      {NODES.map((node, i) => {
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
              borderColor: "#DCE8F5",
              boxShadow: "0 22px 50px rgba(10,102,194,0.13), 0 2px 6px rgba(15,15,20,0.04)",
            }}
          >
            <span className="absolute -left-2 -top-2 z-10 grid h-6 w-6 place-items-center rounded-full text-xs font-black" style={{ backgroundColor: "#F5B731", color: INK }}>
              {node.n}
            </span>
            <span className={`relative mb-2 grid h-9 w-9 place-items-center rounded-xl text-white sm:h-10 sm:w-10 ${node.n === 4 ? "li-pop" : ""}`} style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_LIGHT})` }}>
              <span className="li-ring absolute inset-0 rounded-xl border-2" style={{ borderColor: BLUE, animationDelay: `${(i * LOOP) / 4}s` }} />
              <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={2.2} />
            </span>
            <p className="text-[12px] font-black leading-tight sm:text-[13px]" style={{ color: INK }}>{d.flowVisual.nodes[i].label}</p>
            <p className="mt-0.5 text-xs leading-snug sm:text-xs" style={{ color: "#5d6a78" }}>{d.flowVisual.nodes[i].caption}</p>
          </div>
        );
      })}

      <div className="li-float absolute flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-white px-3 py-1.5 text-xs font-black" style={{ left: pct(310, W), top: pct(118, H), borderColor: "#DCE8F5", color: INK, boxShadow: "0 12px 28px rgba(15,15,20,0.08)" }}>
        <Bot className="h-3.5 w-3.5" style={{ color: BLUE }} strokeWidth={2.4} />
        {d.flowVisual.aiBadge}
      </div>
      <div className="li-float absolute flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-white px-3 py-1.5 text-xs font-black" style={{ left: pct(120, W), top: pct(492, H), borderColor: "#DCE8F5", color: INK, boxShadow: "0 12px 28px rgba(15,15,20,0.08)", animationDelay: "-2.5s" }}>
        <ShieldCheck className="h-3.5 w-3.5" style={{ color: BLUE }} strokeWidth={2.4} />
        {d.flowVisual.safetyBadge}
      </div>
    </div>
  );
}
