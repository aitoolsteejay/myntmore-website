import { HTMLElement, NodeType, parse, type Node } from "node-html-parser";

const OMIT = "script, style, noscript, nav, footer, form, button, input, select, textarea, iframe, svg, video, audio, [hidden], [inert], [aria-hidden=true], [data-markdown-ignore]";
const BLOCK = /^(address|article|aside|dd|div|dl|dt|figcaption|figure|header|main|p|section|summary)$/;
const escapeText = (text: string) => text.replace(/[\\`*_~\[\]<>|]/g, "\\$&");
const compact = (text: string) => text.replace(/\s+/g, " ").trim();

function destination(href: string | undefined, canonical: URL): string | null {
  if (!href) return null;
  try {
    const resolved = new URL(href, canonical);
    return /^(https?:|mailto:|tel:)$/.test(resolved.protocol)
      ? resolved.href.replace(/\(/g, "%28").replace(/\)/g, "%29")
      : null;
  } catch {
    return null;
  }
}

export function renderPageMarkdown(html: string, canonical: URL, robotsHeader?: string | null): string | null {
  const page = parse(html);
  const robots = page.querySelectorAll('meta[name="robots"], meta[name="googlebot"]');
  const declaredCanonical = page.querySelector('link[rel="canonical"]')?.getAttribute("href");
  const directives = [robotsHeader, ...robots.map((tag) => tag.getAttribute("content"))];
  if (directives.some((value) => /(?:^|[\s,:])(?:noindex|none)(?:$|[\s,])/i.test(value ?? ""))) return null;
  if (destination(declaredCanonical, canonical) !== canonical.href) return null;

  const main = page.querySelector("main");
  const heading = main?.querySelector("h1");
  if (!main || !heading) return null;
  main.querySelectorAll(OMIT).forEach((element) => element.remove());
  const title = compact(heading.childNodes.map((node) => node.text).join(" "));
  if (!title) return null;
  heading.remove();

  function render(node: Node): string {
    if (node.nodeType === NodeType.TEXT_NODE) return escapeText(node.text.replace(/\s+/g, " "));
    if (!(node instanceof HTMLElement)) return "";

    const tag = node.rawTagName.toLowerCase();
    if (tag === "pre" || tag === "code") {
      const code = node.text;
      const ticks = Math.max(0, ...(code.match(/`+/g) ?? []).map((run) => run.length));
      const fence = "`".repeat(Math.max(tag === "pre" ? 3 : 1, ticks + 1));
      if (tag === "pre") return `\n\n${fence}\n${code.trimEnd()}\n${fence}\n\n`;
      const padding = /^`|`$|^ | $/.test(code) ? " " : "";
      return `${fence}${padding}${code}${padding}${fence}`;
    }
    if (tag === "img") {
      const alt = compact(node.getAttribute("alt") ?? "");
      const src = destination(node.getAttribute("src"), canonical);
      return alt && src ? `\n\n![${escapeText(alt)}](${src})\n\n` : "";
    }
    if (tag === "br") return "\n";
    if (tag === "hr") return "\n\n---\n\n";
    if (tag === "ul" || tag === "ol") {
      const start = Number(node.getAttribute("start")) || 1;
      const items = node.children.filter((child) => child.rawTagName.toLowerCase() === "li");
      return "\n\n" + items.map((item, index) => {
        const marker = tag === "ol" ? `${start + index}. ` : "- ";
        const lines = item.childNodes.map(render).join("").trim().split("\n");
        return marker + lines.join("\n" + " ".repeat(marker.length));
      }).join("\n") + "\n\n";
    }
    if (tag === "table") {
      const rows = node.querySelectorAll("tr").map((row) => row.children
        .filter((cell) => /^(td|th)$/i.test(cell.rawTagName))
        .map((cell) => compact(cell.childNodes.map(render).join(""))));
      const width = Math.max(0, ...rows.map((row) => row.length));
      if (!width) return "";
      const firstRow = node.querySelector("tr");
      const hasHeaders = firstRow?.children.some((cell) => cell.rawTagName.toLowerCase() === "th");
      const header = hasHeaders ? rows.shift()! : [];
      const formatRow = (row: string[]) => "| " + Array.from({ length: width }, (_, index) => row[index] ?? "").join(" | ") + " |";
      return "\n\n" + [formatRow(header), formatRow(Array(width).fill("---")), ...rows.map(formatRow)].join("\n") + "\n\n";
    }

    const children = node.childNodes.map(render);
    const spaced = ["flex", "inline-flex", "grid", "inline-grid"].some((name) => node.classList.contains(name));
    const content = spaced ? children.filter((child) => child.trim()).join(" ") : children.join("");
    const clean = content.trim();
    if (!clean) return content;
    if (/^h[1-6]$/.test(tag)) return `\n\n${"#".repeat(Math.max(2, Number(tag[1])))} ${compact(clean)}\n\n`;
    if (tag === "a") {
      const href = destination(node.getAttribute("href"), canonical);
      const linkedHeading = node.querySelector("h2, h3, h4, h5, h6");
      if (href && linkedHeading) {
        const renderedHeading = render(linkedHeading);
        const linked = renderedHeading.replace(/^(\n+#{2,6} )(.+)$/m, (_, prefix, label) => `${prefix}[${label}](${href})`);
        return content.replace(renderedHeading, () => linked);
      }
      if (href && !clean.startsWith("![")) {
        if (clean.includes("\n\n")) return `\n\n${clean}\n\n[${href}](${href})\n\n`;
        return content.replace(clean, () => `[${compact(clean)}](${href})`);
      }
    }
    if (/^(strong|b|em|i|del|s)$/.test(tag)) {
      const marker = /^(strong|b)$/.test(tag) ? "**" : /^(del|s)$/.test(tag) ? "~~" : "*";
      return content.replace(clean, () => marker + clean + marker);
    }
    if (tag === "blockquote") return "\n\n" + clean.split("\n").map((line) => "> " + line).join("\n") + "\n\n";
    if (BLOCK.test(tag)) return `\n\n${clean}\n\n`;
    if (tag === "span" && node.classList.contains("block")) return ` ${clean} `;
    return content;
  }

  const body = main.childNodes.map(render).join("").trim();
  if (!body) return null;
  return `# ${escapeText(title)}\n\n${body.replace(/\n{3,}/g, "\n\n")}\n\n## Source\n\n[Original page](${canonical.href})\n`;
}
