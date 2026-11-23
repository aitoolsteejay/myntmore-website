"use client";

import { useEffect, useRef } from "react";
import home from "@/content/site-copy/home.json";

// The typed endings are edited in the admin (Homepage > Our promise).
const PHRASES = home.promise.typedEndings;

// Scattered decorative gold dots
const DOTS = [
  { top: "18%",  left: "4%",   size: 5,  delay: "0s",    dur: "4.2s" },
  { top: "72%",  left: "6%",   size: 3,  delay: "1.1s",  dur: "5.0s" },
  { top: "40%",  left: "12%",  size: 4,  delay: "0.5s",  dur: "3.8s" },
  { top: "85%",  left: "22%",  size: 6,  delay: "1.8s",  dur: "4.6s" },
  { top: "10%",  left: "35%",  size: 3,  delay: "0.3s",  dur: "5.2s" },
  { top: "55%",  left: "48%",  size: 4,  delay: "2.1s",  dur: "3.6s" },
  { top: "20%",  left: "62%",  size: 5,  delay: "0.9s",  dur: "4.8s" },
  { top: "78%",  left: "72%",  size: 3,  delay: "1.5s",  dur: "4.0s" },
  { top: "35%",  left: "82%",  size: 6,  delay: "0.2s",  dur: "5.4s" },
  { top: "60%",  left: "90%",  size: 4,  delay: "1.3s",  dur: "4.3s" },
  { top: "12%",  left: "92%",  size: 3,  delay: "2.4s",  dur: "3.9s" },
  { top: "88%",  left: "50%",  size: 5,  delay: "0.7s",  dur: "4.7s" },
];

export default function Promise() {
  const typedRef  = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el     = typedRef.current;
    const cursor = cursorRef.current;
    if (!el || !cursor) return;

    let phraseIdx = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Blinking cursor
    let visible = true;
    const cursorTick = setInterval(() => {
      visible = !visible;
      if (cursor) cursor.style.opacity = visible ? "1" : "0";
    }, 520);

    function typeOut(phrase: string, onDone: () => void) {
      let i = 0;
      function next() {
        if (!el) return;
        el.textContent = phrase.slice(0, i + 1);
        i++;
        if (i < phrase.length) timers.push(setTimeout(next, 38));
        else timers.push(setTimeout(onDone, 1000));
      }
      next();
    }

    function deleteOut(onDone: () => void) {
      function next() {
        if (!el) return;
        const cur = el.textContent ?? "";
        if (cur.length > 0) {
          el.textContent = cur.slice(0, -1);
          timers.push(setTimeout(next, 22));
        } else {
          timers.push(setTimeout(onDone, 150));
        }
      }
      next();
    }

    function cycle() {
      typeOut(PHRASES[phraseIdx], () => {
        deleteOut(() => {
          phraseIdx = (phraseIdx + 1) % PHRASES.length;
          cycle();
        });
      });
    }

    timers.push(setTimeout(cycle, 600));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(cursorTick);
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ backgroundColor: "#ffffff" }}
      aria-label="Our Promise"
    >
      {/* Scattered gold dots */}
      {DOTS.map((d, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: "#F5B731",
            opacity: 0.35,
            animation: `bubble-float ${d.dur} ease-in-out ${d.delay} infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Label */}
        <span
          className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-6 px-4 py-1.5 rounded-full border"
          style={{ color: "#A14A08", borderColor: "rgba(245,183,49,0.35)", background: "#FEF9EC" }}
        >
          {home.promise.eyebrow}
        </span>

        {/* Typewriter heading. Opts out of the sitewide balanced wrapping:
            re-balancing on every typed letter made finished words jump lines. */}
        <h2 className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight leading-tight" style={{ textWrap: "wrap" }}>
          {/* Each full phrase sits invisibly in the same grid cell as the typed one (drawn from data-text by CSS, so the
              heading's text is unchanged), and the heading keeps the height of the longest phrase. On a phone the longer phrases wrap to a second line, and without this the section grew
              and shrank as each phrase was typed, shifting the page below (a Core Web Vitals layout shift). */}
          <span className="grid">
            {PHRASES.map((p) => (
              <span key={p} aria-hidden="true" className="invisible reserve-text with-cursor" data-text={`${home.promise.lead} ${p}`} style={{ gridArea: "1 / 1" }} />
            ))}
            <span style={{ gridArea: "1 / 1" }}>
              {home.promise.lead}{" "}
              <span ref={typedRef} style={{ color: "#0a0a0a" }} />
              <span
                ref={cursorRef}
                aria-hidden="true"
                style={{ color: "#A14A08", marginLeft: "3px", fontWeight: 900 }}
              >
                |
              </span>
            </span>
          </span>
        </h2>

      </div>
    </section>
  );
}
