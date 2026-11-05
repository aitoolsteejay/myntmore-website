"use client";

const GOLD = "#F5B731";
const INK = "#0f0f14";

// Planet geometry, in the 600x600 SVG coordinate space.
const CX = 300;
const CY = 300;
const SPHERE_R = 205;
export type PlanetKind = "mars" | "earth" | "neptune";

interface OrbitHeroProps {
  leadWords: string;
  accentWord: string;
  planet?: PlanetKind;
  // Rendered by the parent so the animated price counter stays in one place.
  priceNode: React.ReactNode;
  billingNote: string;
  summary: string;
}

// Surface detail for each planet, built from soft procedural noise and shading
// rather than hand-drawn shapes, so patches, continents and bands look natural.
// Everything is tone-on-tone in the page's existing lavender, white and gold
// palette (no new colours) and sits inside the sphere's clip path.
const SPHERE_BOX = { x: CX - SPHERE_R, y: CY - SPHERE_R, width: SPHERE_R * 2, height: SPHERE_R * 2 };

function Crater({ x, y, r }: { x: number; y: number; r: number }) {
  // A shallow bowl: shaded on the side away from the light (upper left), lit on the other.
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="url(#crater-bowl)" />
      <circle cx={x} cy={y} r={r} fill="none" stroke="#ffffff" strokeWidth="1.6" opacity="0.5" strokeDasharray={`${r * 1.7} ${r * 4.6}`} strokeDashoffset={r * 0.4} transform={`rotate(20 ${x} ${y})`} />
    </g>
  );
}

function Surface({ kind }: { kind: PlanetKind }) {
  if (kind === "earth") {
    return (
      <g>
        {/* oceans: a deeper lavender than the land is bright, then crisp continents on top */}
        <rect {...SPHERE_BOX} fill="url(#earth-ocean)" />
        <rect {...SPHERE_BOX} filter="url(#tex-land-edge)" opacity="0.55" />
        <rect {...SPHERE_BOX} filter="url(#tex-land)" opacity="0.95" />
        <rect {...SPHERE_BOX} filter="url(#tex-clouds)" opacity="0.7" />
        <ellipse cx={CX} cy={CY - SPHERE_R + 4} rx="110" ry="40" fill="url(#polar-cap)" />
        <ellipse cx={CX} cy={CY + SPHERE_R - 4} rx="100" ry="36" fill="url(#polar-cap)" />
      </g>
    );
  }
  if (kind === "neptune") {
    return (
      <g>
        <rect {...SPHERE_BOX} filter="url(#tex-bands)" opacity="0.4" />
        <ellipse cx="205" cy="352" rx="54" ry="30" fill="url(#storm)" />
        <ellipse cx="258" cy="336" rx="34" ry="6" fill="#ffffff" opacity="0.7" transform="rotate(-14 258 336)" filter="url(#planet-soft)" />
      </g>
    );
  }
  // mars
  return (
    <g>
      <rect {...SPHERE_BOX} filter="url(#tex-dust)" opacity="0.24" />
      <rect {...SPHERE_BOX} filter="url(#tex-patches)" opacity="0.62" />
      <Crater x={176} y={222} r={30} />
      <Crater x={242} y={424} r={20} />
      <Crater x={356} y={412} r={24} />
      <Crater x={338} y={150} r={13} />
      <ellipse cx={CX} cy={CY + SPHERE_R + 8} rx="128" ry="62" fill="url(#polar-cap)" />
    </g>
  );
}

// Hero for the private pricing pages: bold two-line title, a planet that
// matches the page (Mars, Earth or Neptune), and a price
// card. Decorative parts are aria-hidden.
export default function OrbitHero({ leadWords, accentWord, planet = "mars", priceNode, billingNote, summary }: OrbitHeroProps) {
  return (
    <div className="relative max-w-6xl mx-auto mb-14">
      <div className="hero-fade flex flex-wrap items-center justify-between gap-3 mb-8">
        <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border bg-white/70" style={{ borderColor: "rgba(245,183,49,0.45)" }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: GOLD }} aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: INK }}>Service plans</span>
        </span>
        <span className="hidden md:inline-flex items-center gap-4 px-7 py-3 rounded-full bg-white/70 text-xs font-bold uppercase tracking-[0.32em]" style={{ color: INK }}>
          People <span style={{ color: GOLD }}>×</span> Content <span style={{ color: GOLD }}>×</span> Opportunities
        </span>
      </div>

      <div className="grid md:grid-cols-[1.15fr_1fr] gap-6 items-center">
        <div>
          <h1
            className="hero-fade-d1 font-black"
            style={{ color: INK, fontSize: "clamp(3.4rem, 9.5vw, 7.4rem)", lineHeight: 0.94, letterSpacing: "-0.045em" }}
          >
            {leadWords}
            <br />
            <span className="italic" style={{ color: "#23232b" }}>
              {accentWord}
              <span style={{ color: GOLD }}>.</span>
            </span>
          </h1>
          <svg viewBox="0 0 460 22" fill="none" className="hero-fade-d1 mt-3 w-[min(78vw,400px)]" aria-hidden="true">
            <path d="M4 14 C60 6, 150 18, 240 11 S400 8, 456 12" stroke={GOLD} strokeWidth="5" strokeLinecap="round" />
          </svg>
          <p className="hero-fade-d2 mt-9 font-medium" style={{ color: "#1d1d24", fontSize: "clamp(1.25rem, 2.6vw, 1.9rem)", lineHeight: 1.3, letterSpacing: "-0.02em" }}>
            Build your presence. Create consistency.
            <br className="hidden sm:block" /> Start generating opportunities.
          </p>
        </div>

        {/* Planet */}
        <div className="hero-fade-d2 relative hidden md:block w-full max-w-[560px] justify-self-end aspect-square" style={{ containerType: "inline-size" }} aria-hidden="true">
          <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              <radialGradient id="orbit-sphere" cx="34%" cy="28%" r="85%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="42%" stopColor="#f7f2ff" />
                <stop offset="78%" stopColor="#e5d9fb" />
                <stop offset="100%" stopColor="#d3bff6" />
              </radialGradient>
              {/* light falling across the surface: bright upper left, shaded lower right */}
              <radialGradient id="orbit-shade" cx="34%" cy="28%" r="85%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#7a5ccf" stopOpacity="0.4" />
              </radialGradient>
              {/* soft white wash behind the caption so it stays readable */}
              <radialGradient id="orbit-caption" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <clipPath id="orbit-clip">
                <circle cx={CX} cy={CY} r={SPHERE_R} />
              </clipPath>
              <filter id="orbit-shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="26" />
              </filter>
              {/* soft procedural textures (tinted with the page's lavender and gold) */}
              <filter id="tex-patches" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.0055" numOctaves="2" seed="11" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.58  0 0 0 0 0.46  0 0 0 0 0.88  3 0 0 0 -1.15" />
              </filter>
              <filter id="tex-dust" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="2" seed="29" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.96  0 0 0 0 0.72  0 0 0 0 0.19  2 0 0 0 -0.7" />
              </filter>
              <filter id="tex-grain" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="5" result="g" />
                <feDiffuseLighting in="g" surfaceScale="3" diffuseConstant="1" lightingColor="#ffffff">
                  <feDistantLight azimuth="225" elevation="55" />
                </feDiffuseLighting>
              </filter>
              <filter id="tex-land" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.0075" numOctaves="4" seed="8" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.33  0 0 0 0 0.78  22 0 0 0 -10.6" />
              </filter>
              {/* a slightly wider, lighter copy of the land so continents get a soft shoreline */}
              <filter id="tex-land-edge" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.0075" numOctaves="4" seed="8" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.72  0 0 0 0 0.62  0 0 0 0 0.94  9 0 0 0 -3.9" />
              </filter>
              <filter id="tex-clouds" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.005 0.022" numOctaves="3" seed="21" />
                <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  5 0 0 0 -2.7" />
              </filter>
              <radialGradient id="earth-ocean" cx="34%" cy="28%" r="85%">
                <stop offset="0%" stopColor="#e4d8fb" />
                <stop offset="100%" stopColor="#b9a0ee" />
              </radialGradient>
              <filter id="tex-bands" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.001 0.02" numOctaves="2" seed="4" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.58  0 0 0 0 0.46  0 0 0 0 0.88  2.6 0 0 0 -0.9" />
              </filter>
              <filter id="planet-soft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" />
              </filter>
              <radialGradient id="polar-cap" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="storm" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8f74dc" stopOpacity="0.6" />
                <stop offset="70%" stopColor="#a98fe6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#a98fe6" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="crater-bowl" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7d5fd0" stopOpacity="0.4" />
                <stop offset="55%" stopColor="#9d84e3" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.55" />
              </linearGradient>
            </defs>

            {/* soft planet shadow, then the sphere with its surface */}
            <circle cx={CX + 18} cy={CY + 52} r={SPHERE_R - 14} fill="#a78bfa" opacity="0.28" filter="url(#orbit-shadow)" />
            <circle cx={CX} cy={CY} r={SPHERE_R} fill="url(#orbit-sphere)" />
            <g clipPath="url(#orbit-clip)">
              <Surface kind={planet} />
              <circle cx={CX} cy={CY} r="165" fill="url(#orbit-caption)" />
              <circle cx={CX} cy={CY} r={SPHERE_R} fill="url(#orbit-shade)" />
            </g>

          </svg>

          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div style={{ width: "58%" }}>
              <p className="font-extrabold uppercase" style={{ color: INK, fontSize: "clamp(1rem, 2.5cqw, 1.5rem)", lineHeight: 1.25, letterSpacing: "0.06em" }}>
                LinkedIn GTM
                <br />
                Growth ecosystem
              </p>
              <div className="mx-auto my-4 h-[3px] w-12 rounded-full" style={{ backgroundColor: GOLD }} />
              <p className="font-semibold" style={{ color: "#4a4238", fontSize: "clamp(0.9rem, 2.1cqw, 1.2rem)", lineHeight: 1.4, letterSpacing: "0.01em" }}>
                Consistent presence.
                <br />
                Real opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Price card */}
      <div className="hero-fade-d2 mt-10 rounded-[28px] border bg-white/80 backdrop-blur-sm px-6 py-6 sm:px-10 sm:py-8 grid sm:grid-cols-[1fr_auto] gap-6 items-center" style={{ borderColor: "#EDE7DD", boxShadow: "0 20px 60px rgba(124,58,237,0.08)" }}>
        <p className="text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: "#3b3b45" }}>
          {summary}
        </p>
        <div className="sm:pl-10 sm:border-l sm:text-right" style={{ borderColor: "#E8E2D9" }}>
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-1" style={{ color: "#71675E" }}>Plans start at</p>
          <div className="font-black leading-none" style={{ color: INK, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", letterSpacing: "-0.04em" }}>{priceNode}</div>
          <p className="mt-2 text-sm font-medium" style={{ color: "#3b3b45" }}>{billingNote}</p>
        </div>
      </div>
    </div>
  );
}
