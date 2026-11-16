// A specific media range overrides a wildcard even at q=0. Keep HTML on ties.
export function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;

  const weights = new Map<string, number>();
  for (const range of accept.match(/(?:[^,"]|"(?:[^"\\]|\\.)*")+/g) ?? []) {
    const [type, ...parameters] = range.trim().match(/(?:[^;\"]|\"(?:[^\"\\]|\\.)*\")+/g) ?? [];
    if (!type) continue;
    const quality = parameters.find((parameter) => /^\s*q\s*=/i.test(parameter));
    const value = quality?.slice(quality.indexOf("=") + 1).trim() ?? "1";
    const weight = /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(value) ? Number(value) : 0;
    const key = type.trim().toLowerCase();
    weights.set(key, Math.max(weights.get(key) ?? 0, weight));
  }

  const markdown = weights.get("text/markdown") ?? 0;
  const html = weights.get("text/html") ?? weights.get("text/*") ?? weights.get("*/*") ?? 0;
  return markdown > html;
}
