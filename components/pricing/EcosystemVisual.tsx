"use client";

// Hero visual for the private plans pages: a glossy planet with two tilted
// rings, two dots circling the dashed ring and a floating "LinkedIn GTM
// Growth ecosystem" card. Same artwork on every page; only the palette
// changes per planet (Earth green, Mars terracotta, Neptune blue).
// Pure SVG/CSS motion, so no extra JS; it stops under prefers-reduced-motion.
// Decorative parts are aria-hidden, the card text stays readable.

export type EcosystemVariant = "orbit" | "flywheel";
export type EcosystemPlanet = "mars" | "earth" | "neptune";

interface Palette {
  orb: [string, string, string, string];
  glow: string;
  ring: string;
  ring2: string;
  dotA: [string, string];
  dotB: [string, string];
  heading: string;
}

const PALETTES: Record<EcosystemPlanet, Palette> = {
  earth: {
    orb: ["#ffffff", "#f4f8f1", "#dbe8d5", "#bcd3bd"],
    glow: "#5E8C61",
    ring: "#5E8C61",
    ring2: "rgba(74,98,60,.45)",
    dotA: ["#B7D3A8", "#5E8C61"],
    dotB: ["#D9D2A0", "#A39A4A"],
    heading: "#3F6B45",
  },
  mars: {
    orb: ["#ffffff", "#fdf1ea", "#f6cdb8", "#e8a083"],
    glow: "#D85A30",
    ring: "#D85A30",
    ring2: "rgba(153,60,29,.4)",
    dotA: ["#F5C4B3", "#D85A30"],
    dotB: ["#FAC775", "#BA7517"],
    heading: "#993C1D",
  },
  neptune: {
    orb: ["#ffffff", "#eff2f8", "#c9d3e6", "#97a9cc"],
    glow: "#3B5488",
    ring: "#34508A",
    ring2: "rgba(59,84,136,.4)",
    dotA: ["#9FB1D6", "#34508A"],
    dotB: ["#B9C0D8", "#5D6B94"],
    heading: "#263F70",
  },
};

const TILT = "-24 200 200;-17 200 200;-24 200 200";
const TILT2 = "18 200 200;11 200 200;18 200 200";

const CSS = `
.eco-stage{position:relative;width:100%;aspect-ratio:1/1;container-type:inline-size}
.eco-stage svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.eco-card{position:absolute;top:12%;right:0;width:54%;z-index:5;background:#fff;border:1px solid #E8E2D9;border-radius:12px;padding:2.8cqw 3.6cqw;box-shadow:0 2cqw 5cqw rgba(15,15,20,.12);animation:eco-bob 4.5s ease-in-out infinite}
.eco-card em{display:block;font-style:normal;font-weight:700;font-size:max(.6rem,2.9cqw);letter-spacing:.08em;text-transform:uppercase;line-height:1.35}
.eco-card span{display:block;font-weight:500;font-size:max(.78rem,3.7cqw);line-height:1.4;color:#4a4238;margin-top:1.1cqw}
@keyframes eco-bob{50%{transform:translateY(-1.5cqw)}}
@media (prefers-reduced-motion:reduce){.eco-card{animation:none}}
`;

function Grad({ id, a, b }: { id: string; a: string; b: string }) {
  return (
    <radialGradient id={id} cx="35%" cy="30%">
      <stop offset="0" stopColor={a} />
      <stop offset="1" stopColor={b} />
    </radialGradient>
  );
}

export default function EcosystemVisual({ planet = "earth" }: { variant?: EcosystemVariant; planet?: EcosystemPlanet }) {
  const p = PALETTES[planet] ?? PALETTES.earth;
  const ringProps = { fill: "none", stroke: p.ring, strokeWidth: 1.5, strokeDasharray: "6 5", opacity: 0.9 } as const;

  return (
    <div className="hero-fade-d2 relative hidden md:block w-full max-w-[560px] justify-self-end" aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="eco-stage">
        <svg viewBox="0 0 400 400">
          <defs>
            <radialGradient id="eco-orb" cx="34%" cy="28%" r="85%">
              <stop offset="0" stopColor={p.orb[0]} />
              <stop offset=".38" stopColor={p.orb[1]} />
              <stop offset=".76" stopColor={p.orb[2]} />
              <stop offset="1" stopColor={p.orb[3]} />
            </radialGradient>
            <Grad id="eco-da" a={p.dotA[0]} b={p.dotA[1]} />
            <Grad id="eco-db" a={p.dotB[0]} b={p.dotB[1]} />
            <filter id="eco-shadow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
            <clipPath id="eco-front">
              <rect x="0" y="200" width="400" height="200" />
            </clipPath>
            <path id="eco-p1" d="M 28 200 A 172 108 0 1 1 372 200 A 172 108 0 1 1 28 200" />
            <path id="eco-p2" d="M 24 200 A 176 92 0 1 1 376 200 A 176 92 0 1 1 24 200" />
            <g id="eco-dots">
              <circle r="8" fill="url(#eco-da)">
                <animateMotion dur="12s" repeatCount="indefinite">
                  <mpath href="#eco-p1" />
                </animateMotion>
              </circle>
              <circle r="6" fill="url(#eco-db)">
                <animateMotion dur="12s" begin="-6s" repeatCount="indefinite">
                  <mpath href="#eco-p1" />
                </animateMotion>
              </circle>
            </g>
          </defs>

          {/* back half of the rings and dots, behind the planet */}
          <g>
            <animateTransform attributeName="transform" type="rotate" values={TILT} dur="16s" repeatCount="indefinite" />
            <use href="#eco-p1" {...ringProps} />
            <use href="#eco-dots" />
          </g>
          <g>
            <animateTransform attributeName="transform" type="rotate" values={TILT2} dur="20s" repeatCount="indefinite" />
            <use href="#eco-p2" fill="none" stroke={p.ring2} strokeWidth="1" />
          </g>

          <circle cx="214" cy="266" r="96" fill={p.glow} opacity=".28" filter="url(#eco-shadow)" />
          <circle cx="200" cy="200" r="100" fill="url(#eco-orb)" />

          {/* front half, passing in front of the planet */}
          <g>
            <animateTransform attributeName="transform" type="rotate" values={TILT} dur="16s" repeatCount="indefinite" />
            <g clipPath="url(#eco-front)">
              <use href="#eco-p1" {...ringProps} />
              <use href="#eco-dots" />
            </g>
          </g>
        </svg>

        <div className="eco-card">
          <em style={{ color: p.heading }}>LinkedIn GTM growth ecosystem</em>
          <span>Consistent presence. Real opportunities.</span>
        </div>
      </div>
    </div>
  );
}
