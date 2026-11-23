"use client";

import { useRef, useEffect, type CSSProperties } from "react";

interface Props {
  value: string;
  className?: string;
  style?: CSSProperties;
  duration?: number;
}

// Reads the first number in the string, including thousands separators
// ("1,200", "5,000+"), so a value like "1,200 emails" counts up as 0 -> 1,200
// rather than treating the comma as the end of the number.
function parse(value: string) {
  const m = value.match(/^([^0-9]*)(\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const grouped = m[2].includes(",");
  const num = parseFloat(m[2].replace(/,/g, ""));
  if (isNaN(num)) return null;
  const decimals = m[2].includes(".") ? m[2].split(".")[1].length : 0;
  return { prefix: m[1], num, suffix: m[3], decimals, grouped };
}

const format = (n: number, p: { decimals: number; grouped: boolean }) =>
  p.grouped
    ? n.toLocaleString("en-US", { minimumFractionDigits: p.decimals, maximumFractionDigits: p.decimals })
    : p.decimals > 0
      ? n.toFixed(p.decimals)
      : Math.round(n).toString();

export default function StatTicker({ value, className = "", style, duration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parsed = parse(value);
    if (!parsed) return;
    // Reduced motion: keep the final value that is already rendered.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animId = 0;
    let startTime: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          const tick = (ts: number) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * parsed!.num;
            if (el) el.textContent = `${parsed!.prefix}${format(current, parsed!)}${parsed!.suffix}`;
            if (progress < 1) animId = requestAnimationFrame(tick);
          };
          animId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [value, duration]);

  // While it counts up, the number is narrower than its final value, so text can re-wrap and push the page below it
  // (a layout shift, which counts against Core Web Vitals). For short animated values, an invisible copy of the final
  // value reserves its space and the counter sits on top of it in the same grid cell. Long or non-numeric values render
  // as plain text, as before.
  if (parse(value) && value.length <= 20) {
    return (
      <span className={`inline-grid ${className}`} style={style}>
        <span aria-hidden="true" className="invisible" style={{ gridArea: "1 / 1" }}>{value}</span>
        <span ref={ref} style={{ gridArea: "1 / 1" }}>{value}</span>
      </span>
    );
  }
  return (
    <span ref={ref} className={className} style={style}>
      {value}
    </span>
  );
}
