import home from "@/content/site-copy/home.json";

// The benefit chips are edited in the admin (Homepage > Benefits strip).
const ROW_1 = home.benefits.row1;

const ROW_2 = home.benefits.row2;

const ROW_3 = home.benefits.row3;

const CHIP_PALETTES = [
  { bg: "linear-gradient(135deg, #ffffff 0%, #FEF9EC 100%)", border: "rgba(245,183,49,0.35)", dot: "#D97706" },
  { bg: "linear-gradient(135deg, #ffffff 0%, #F5F3FF 100%)", border: "rgba(167,139,250,0.35)", dot: "#7C3AED" },
];

function Chip({ label, paletteIdx }: { label: string; paletteIdx: number }) {
  const p = CHIP_PALETTES[paletteIdx % CHIP_PALETTES.length];
  return (
    <span
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap border"
      style={{
        background: p.bg,
        borderColor: p.border,
        color: "#1a1a1a",
        boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
      }}
    >
      <span
        className="w-2 h-2 rounded-sm flex-shrink-0"
        style={{ backgroundColor: p.dot }}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  duration = "35s",
  offset = 0,
}: {
  items: string[];
  direction?: "left" | "right";
  duration?: string;
  offset?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden" style={{
      WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
    }}>
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `marquee-${direction} ${duration} linear infinite`,
        }}
      >
        {doubled.map((label, i) => (
          <Chip key={i} label={label} paletteIdx={(i + offset) % CHIP_PALETTES.length} />
        ))}
      </div>
    </div>
  );
}

export default function BenefitsMarquee() {
  return (
    <section
      className="py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FEF9EC 0%, #FFF7E0 50%, #FEF3C7 100%)" }}
      aria-label="Benefits"
    >
      {/* Heading */}
      <div className="text-center mb-12 px-4">
        <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#A14A08" }}>
          {home.benefits.eyebrow}
        </p>
        <h2 className="text-2xl sm:text-4xl font-black text-[#0a0a0a]">
          {home.benefits.heading}
        </h2>
      </div>

      {/* Marquee rows */}
      <div className="flex flex-col gap-4">
        <MarqueeRow items={ROW_1} direction="left"  duration="40s" offset={0} />
        <MarqueeRow items={ROW_2} direction="right" duration="35s" offset={3} />
        <MarqueeRow items={ROW_3} direction="left"  duration="45s" offset={6} />
      </div>

    </section>
  );
}
