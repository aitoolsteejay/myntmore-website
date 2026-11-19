"use client";

// Hero visual for the private plans pages: a glossy planet with two tilted
// rings and one small dot circling the dashed ring. No text. Same artwork on
// every page; only the palette changes per planet (Earth sage, Mars
// terracotta, Neptune slate navy). Pure SVG motion, no extra JS. Decorative,
// so aria-hidden.

export type EcosystemVariant = "orbit" | "flywheel";
export type EcosystemPlanet = "mars" | "earth" | "neptune";

interface Palette {
  orb: [string, string, string, string];
  glow: string;
  ring: string;
  ring2: string;
  dotA: [string, string];
}

const PALETTES: Record<EcosystemPlanet, Palette> = {
  earth: {
    orb: ["#ffffff", "#f4f8f1", "#dbe8d5", "#bcd3bd"],
    glow: "#5E8C61",
    ring: "#5E8C61",
    ring2: "rgba(74,98,60,.45)",
    dotA: ["#B7D3A8", "#5E8C61"],
  },
  mars: {
    orb: ["#ffffff", "#fdf1ea", "#f6cdb8", "#e8a083"],
    glow: "#D85A30",
    ring: "#D85A30",
    ring2: "rgba(153,60,29,.4)",
    dotA: ["#F5C4B3", "#D85A30"],
  },
  neptune: {
    orb: ["#ffffff", "#eff2f8", "#c9d3e6", "#97a9cc"],
    glow: "#3B5488",
    ring: "#34508A",
    ring2: "rgba(59,84,136,.4)",
    dotA: ["#9FB1D6", "#34508A"],
  },
};

const TILT = "-24 200 200;-17 200 200;-24 200 200";
const TILT2 = "18 200 200;11 200 200;18 200 200";

const CSS = `
.eco-stage{position:relative;width:100%;aspect-ratio:1/1;container-type:inline-size}
.eco-stage svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
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

      </div>
    </div>
  );
}
