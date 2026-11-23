"use client";

// The article of a blog post: Markdoc text with buttons for the common formatting and a preview.
// Markdoc is Markdown with a few extras (tables), so writers type ## for a heading, **bold**, and
// [link text](/address); the buttons insert these for them.
import Markdoc from "@markdoc/markdoc";
import { useMemo, useRef, useState } from "react";

type Wrap = { label: string; title: string; before: string; after?: string; line?: boolean; placeholder: string };

const TOOLS: Wrap[] = [
  { label: "H2", title: "Section heading", before: "## ", line: true, placeholder: "Heading" },
  { label: "H3", title: "Smaller heading", before: "### ", line: true, placeholder: "Heading" },
  { label: "B", title: "Bold", before: "**", after: "**", placeholder: "bold text" },
  { label: "I", title: "Italic", before: "_", after: "_", placeholder: "italic text" },
  { label: "Link", title: "Link", before: "[", after: "](/resources/blogs/)", placeholder: "link text" },
  { label: "• List", title: "Bulleted list", before: "- ", line: true, placeholder: "List item" },
  { label: "1. List", title: "Numbered list", before: "1. ", line: true, placeholder: "List item" },
  { label: "Quote", title: "Quote", before: "> ", line: true, placeholder: "Quote" },
];

export default function ArticleEditor({ value, onChange, error, readOnly }: { value: string; onChange: (v: string) => void; error?: string; readOnly: boolean }) {
  const [tab, setTab] = useState<"write" | "preview">("write");
  const ref = useRef<HTMLTextAreaElement>(null);

  const html = useMemo(() => {
    if (tab !== "preview") return "";
    try {
      const ast = Markdoc.parse(value);
      return Markdoc.renderers.html(Markdoc.transform(ast, { tags: { table: Markdoc.tags.table } }));
    } catch {
      return "<p>The preview could not be drawn. Check the article for a broken table or tag.</p>";
    }
  }, [tab, value]);

  function apply(t: Wrap) {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b } = el;
    const picked = value.slice(a, b) || t.placeholder;
    let start = a;
    let insert: string;
    if (t.line) {
      // Start of the line the cursor is on; each selected line gets the prefix.
      start = value.lastIndexOf("\n", a - 1) + 1;
      const block = value.slice(start, b) || t.placeholder;
      insert = block
        .split("\n")
        .map((l) => t.before + l.replace(/^(#{1,6} |- |\d+\. |> )/, ""))
        .join("\n");
      onChange(value.slice(0, start) + insert + value.slice(Math.max(b, start + (value.slice(start, b) ? block.length : 0))));
    } else {
      insert = t.before + picked + (t.after ?? "");
      onChange(value.slice(0, a) + insert + value.slice(b));
    }
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + insert.length, start + insert.length);
    });
  }

  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-lg border border-[#E8E2D9] bg-white p-0.5 text-sm font-semibold" role="tablist">
          {(["write", "preview"] as const).map((t) => (
            <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`rounded-md px-3 py-1 ${tab === t ? "bg-[#0A0A0A] text-white" : "text-[#52525B]"}`}>
              {t === "write" ? "Write" : "Preview"}
            </button>
          ))}
        </div>
        {tab === "write" && !readOnly && (
          <div className="flex flex-wrap gap-1">
            {TOOLS.map((t) => (
              <button key={t.label} type="button" title={t.title} onClick={() => apply(t)} className="rounded-md border border-[#E8E2D9] bg-white px-2 py-1 text-xs font-bold text-[#52525B] hover:border-[#A14A08] hover:text-[#A14A08]">
                {t.label}
              </button>
            ))}
          </div>
        )}
        <span className="ml-auto text-xs text-[#71675E]">
          {words.toLocaleString()} words · about {Math.max(1, Math.round(words / 230))} min read
        </span>
      </div>
      {tab === "write" ? (
        <textarea
          id="f-content"
          ref={ref}
          value={value}
          disabled={readOnly}
          onChange={(e) => onChange(e.target.value)}
          rows={28}
          className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 font-mono text-[14px] leading-relaxed outline-none focus:border-[#A14A08] focus:ring-2 focus:ring-[#F5B731]/40 ${error ? "border-[#D9534F]" : "border-[#E8E2D9]"}`}
        />
      ) : (
        <div
          className="article-preview mt-2 max-h-[48rem] overflow-auto rounded-lg border border-[#E8E2D9] bg-white px-6 py-5 text-[15px] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
      <p className="mt-1.5 text-[13px] text-[#71675E]">
        Formatting: <code>## Heading</code>, <code>**bold**</code>, <code>[link text](/address)</code>, <code>- list item</code>. A blank line starts a new paragraph.
      </p>
      {error && (
        <p role="alert" className="mt-1 text-[13px] font-semibold text-[#9F1D1D]">
          {error}
        </p>
      )}
      <style>{`
        .article-preview h1{font-size:1.6em;font-weight:900;margin:1em 0 .4em}
        .article-preview h2{font-size:1.35em;font-weight:800;margin:1.4em 0 .4em}
        .article-preview h3{font-size:1.12em;font-weight:700;margin:1.2em 0 .3em}
        .article-preview p{margin:.7em 0}
        .article-preview ul{list-style:disc;padding-left:1.4em;margin:.6em 0}
        .article-preview ol{list-style:decimal;padding-left:1.4em;margin:.6em 0}
        .article-preview a{color:#A14A08;text-decoration:underline}
        .article-preview blockquote{border-left:3px solid #E8E2D9;padding-left:1em;color:#52525B}
        .article-preview table{border-collapse:collapse;margin:1em 0;font-size:.92em}
        .article-preview th,.article-preview td{border:1px solid #E8E2D9;padding:.4em .6em;text-align:left;vertical-align:top}
        .article-preview code{background:#F8F6F2;padding:0 .25em;border-radius:4px}
        .article-preview hr{margin:1.5em 0;border-color:#E8E2D9}
      `}</style>
    </div>
  );
}
