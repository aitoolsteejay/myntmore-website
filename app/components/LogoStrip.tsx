import home from "@/content/site-copy/home.json";

// Edited in the admin (Homepage > Logo strip).
const COMPANIES = home.logoStrip.companies;

// Duplicate for infinite scroll
const DOUBLED = [...COMPANIES, ...COMPANIES];

export default function LogoStrip() {
  return (
    <section
      className="py-12 border-y"
      style={{ backgroundColor: "#F0EBE3", borderColor: "#E0D9CF" }}
      aria-label="Trusted companies"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "#71675E" }}>
          {home.logoStrip.heading}
        </p>
      </div>

      <div className="marquee-container w-full">
        <div className="marquee-track" aria-hidden="true">
          {DOUBLED.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center mx-5 flex-shrink-0"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap shadow-sm"
                style={{ backgroundColor: "#F8F6F2", borderColor: "#E0D9CF", color: "#3D3D3D" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#F5B731" }}
                  aria-hidden="true"
                />
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
