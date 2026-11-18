"use client";

// Replaces the planet in the plans hero with an animation that carries the
// same message: the "LinkedIn GTM Growth ecosystem" circle and the
// People x Content x Opportunities idea.
//   orbit    (option A): People, Content and Opportunities orbit the circle.
//   flywheel (option C): a gold dot circles a ring and lights People, then
//                         Content, then Opportunities, on repeat.
// Pure CSS motion (offset-path), so no extra JS; it stops under
// prefers-reduced-motion and falls back to a static layout where
// offset-path is not supported. Decorative parts are aria-hidden, the real
// text stays readable.

export type EcosystemVariant = "orbit" | "flywheel";

const GOLD = "#F5B731";
const INK = "#0f0f14";
const WORDS = ["People", "Content", "Opportunities"] as const;

// Chips sit on the ring: circle(43%) matches the ring's inset of 7%.
const PATH = "circle(43% at 50% 50%)";

const CSS = `
.eco-stage{position:relative;width:100%;aspect-ratio:1/1;container-type:inline-size}
.eco-ring{position:absolute;inset:7%;border-radius:50%;border:1.5px dashed rgba(245,183,49,.6)}
.eco-glow{position:absolute;inset:14%;border-radius:50%;background:radial-gradient(circle,rgba(245,183,49,.22) 0%,rgba(245,183,49,0) 70%)}
.eco-ping{position:absolute;inset:21%;border-radius:50%;border:1.5px solid rgba(245,183,49,.55);animation:eco-ping 3.6s ease-out infinite}
.eco-ping.b{animation-delay:1.8s}
.eco-hub{position:absolute;inset:21%;border-radius:50%;background:#fff;border:1.5px solid rgba(245,183,49,.6);box-shadow:0 24px 60px rgba(245,183,49,.2);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;z-index:3}
.eco-chip{position:absolute;top:0;left:0;z-index:2;white-space:nowrap;font-weight:700;font-size:clamp(.68rem,2.3cqw,.95rem);line-height:1;padding:.55em 1em;border-radius:999px;background:#fff;border:1px solid #E8E2D9;color:${INK};box-shadow:0 6px 18px rgba(15,15,20,.06);offset-path:${PATH};offset-rotate:0deg}
.eco-chip.gold{background:${GOLD};border-color:${GOLD}}
.eco-orbit{animation:eco-orbit 12s linear infinite}
.eco-dot{position:absolute;top:0;left:0;z-index:1;width:3.2cqw;height:3.2cqw;margin:0;border-radius:50%;background:${GOLD};box-shadow:0 0 0 .9cqw rgba(245,183,49,.25);offset-path:${PATH};offset-rotate:0deg;animation:eco-orbit 9s linear infinite}
.eco-lit{animation:eco-lit 9s linear infinite}
@keyframes eco-orbit{from{offset-distance:0%}to{offset-distance:100%}}
@keyframes eco-ping{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.55);opacity:0}}
@keyframes eco-lit{0%,3%{background:${GOLD};border-color:${GOLD};transform:scale(1.12)}16%,100%{background:#fff;border-color:#E8E2D9;transform:scale(1)}}
@media (prefers-reduced-motion:reduce){.eco-ping,.eco-orbit,.eco-dot,.eco-lit{animation:none}}
@supports not (offset-path:circle(10px at 50% 50%)){
  .eco-chip{offset-path:none}
  .eco-chip:nth-of-type(1){top:3%;left:50%;transform:translateX(-50%)}
  .eco-chip:nth-of-type(2){top:70%;left:70%}
  .eco-chip:nth-of-type(3){top:70%;left:2%}
  .eco-dot{display:none}
}
`;

export default function EcosystemVisual({ variant }: { variant: EcosystemVariant }) {
  return (
    <div className="hero-fade-d2 relative hidden md:block w-full max-w-[560px] justify-self-end" aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="eco-stage">
        <div className="eco-glow" />
        <div className="eco-ring" />
        <div className="eco-ping" />
        <div className="eco-ping b" />

        {variant === "orbit" &&
          WORDS.map((word, i) => (
            <span
              key={word}
              className={`eco-chip eco-orbit${i === 2 ? " gold" : ""}`}
              style={{ offsetDistance: `${(i * 100) / 3}%`, animationDelay: `${-(i * 12) / 3}s` }}
            >
              {word}
            </span>
          ))}

        {variant === "flywheel" && (
          <>
            {WORDS.map((word, i) => (
              <span
                key={word}
                className="eco-chip eco-lit"
                style={{ offsetDistance: `${(i * 100) / 3}%`, animationDelay: `${(i * 9) / 3}s` }}
              >
                {word}
              </span>
            ))}
            <span className="eco-dot" />
          </>
        )}

        <div className="eco-hub">
          <p className="font-extrabold uppercase" style={{ color: INK, fontSize: "clamp(.85rem, 3.2cqw, 1.7rem)", lineHeight: 1.25, letterSpacing: "0.06em" }}>
            LinkedIn GTM
            <br />
            Growth ecosystem
          </p>
          <div className="my-4 h-[3px] w-12 rounded-full" style={{ backgroundColor: GOLD }} />
          <p className="font-semibold" style={{ color: "#4a4238", fontSize: "clamp(.78rem, 2.7cqw, 1.4rem)", lineHeight: 1.4 }}>
            Consistent presence.
            <br />
            Real opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}
