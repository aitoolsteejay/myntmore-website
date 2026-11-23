// Count-up animation for a figure written as text, e.g. "$120M+", "18 Days", "12K+", "3.5x": the
// number in it counts from zero while the text around it stays put. Lets editors change a stat in the
// admin without touching the animation code.
export function countUpFormat(value: string): { target: number; format: (n: number) => string } | null {
  const m = /^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/.exec(value);
  if (!m) return null;
  const [, before, number, after] = m;
  const decimals = number.includes(".") ? number.split(".")[1].length : 0;
  const commas = number.includes(",");
  const target = Number(number.replace(/,/g, ""));
  if (!Number.isFinite(target)) return null;
  return {
    target,
    format: (n: number) => {
      const fixed = n.toFixed(decimals);
      const shown = commas ? Number(fixed).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : fixed;
      return `${before}${shown}${after}`;
    },
  };
}
