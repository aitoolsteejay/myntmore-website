// Blog posts (content/posts/*.mdoc): a YAML settings block ("frontmatter") between two "---" lines,
// then the article in Markdoc. The settings are edited with the same field rules as everything else
// (Keystatic's, from keystatic.config.ts); the article is edited as Markdoc text and checked with
// Markdoc's own validator before saving.
//
// The files were written by hand as well as by Keystatic, so a save edits the YAML in place (the `yaml`
// library keeps every untouched line exactly as it was) instead of rewriting the whole block.
import "server-only";
import Markdoc from "@markdoc/markdoc";
import YAML, { visit } from "yaml";
import { contentType, parseEntry, serializeEntry, validateEntry, type ContentType, type FieldError } from "./schema";

export const POSTS_DIR = "content/posts";
export const postPath = (slug: string) => `${POSTS_DIR}/${slug}.mdoc`;

/** The posts type without its article field: the settings, edited and validated like a JSON entry. */
export function postSettingsType(): ContentType {
  const posts = contentType("posts")!;
  const { content: _content, ...schema } = posts.schema; // eslint-disable-line @typescript-eslint/no-unused-vars
  return { ...posts, format: "json", schema };
}

/** Split a post file the way Keystatic does. */
export function splitPost(text: string): { front: string; body: string } | null {
  const m = /^---(?:\r?\n([^]*?))?\r?\n---\r?\n?/.exec(text);
  return m ? { front: m[1] ?? "", body: text.slice(m[0].length) } : null;
}

export interface LoadedPost {
  state: Record<string, unknown>;
  body: string;
  errors: FieldError[];
}

export function parsePost(text: string, slug: string): LoadedPost {
  const parts = splitPost(text);
  if (!parts) return { state: {}, body: text, errors: [{ path: [], message: "The settings block at the top of the file is missing." }] };
  let data: unknown;
  try {
    data = YAML.parse(parts.front) ?? {};
  } catch (err) {
    return { state: {}, body: parts.body, errors: [{ path: [], message: `The settings block is not valid: ${(err as Error).message}` }] };
  }
  const { state, errors } = parseEntry(postSettingsType(), JSON.stringify(data), slug);
  return { state, body: parts.body, errors };
}

/** Problems Markdoc finds in the article (unknown tags, broken tables), with line numbers. */
export function articleErrors(body: string): FieldError[] {
  const ast = Markdoc.parse(body);
  return Markdoc.validate(ast, { tags: { table: Markdoc.tags.table } })
    .filter((e) => e.error.level === "error" || e.error.level === "critical")
    .map((e) => ({ path: ["content"], message: `Line ${(e.lines?.[0] ?? 0) + 1}: ${e.error.message}` }));
}

const equal = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/** One setting as YAML text, strings double-quoted like the existing posts. */
function yamlBlock(key: string, value: unknown): string {
  const doc = new YAML.Document({ [key]: value });
  visit(doc, {
    Scalar(_k, n) {
      if (typeof n.value === "string" && n.value !== key) n.type = "QUOTE_DOUBLE";
    },
  });
  return doc.toString({ lineWidth: 0 }).replace(/\n$/, "");
}

/** The settings block cut into top-level settings: each starts at a line "key:" and runs to the next. */
function blocks(front: string): { key: string | null; lines: string[] }[] {
  const out: { key: string | null; lines: string[] }[] = [{ key: null, lines: [] }];
  for (const line of front.split("\n")) {
    const m = /^([A-Za-z_][A-Za-z0-9_]*):(\s|$)/.exec(line);
    if (m) out.push({ key: m[1], lines: [line] });
    else out[out.length - 1].lines.push(line);
  }
  return out;
}

/**
 * The file text for a post. With `previous`, only the lines of settings that changed are rewritten and
 * every other line stays exactly as it was; without it (a new post), the block is written fresh.
 */
export function serializePost(state: Record<string, unknown>, body: string, previous: string | null): string {
  const type = postSettingsType();
  const old = previous ? splitPost(previous) : null;
  const oldData = old ? ((YAML.parse(old.front) ?? {}) as Record<string, unknown>) : null;
  // Keystatic's own serializer decides the values (and which empty ones to leave out), keeping the
  // previous file's key order and empty strings.
  const next = JSON.parse(serializeEntry(type, state, oldData ? JSON.stringify(oldData, null, 2) + "\n" : undefined)) as Record<string, unknown>;

  let front: string;
  if (old && oldData) {
    const kept = blocks(old.front)
      .filter((b) => b.key === null || b.key in next)
      .map((b) => (b.key !== null && !equal(oldData[b.key], next[b.key]) ? { key: b.key, lines: [yamlBlock(b.key, next[b.key])] } : b));
    const added = Object.keys(next).filter((k) => !(k in oldData)).map((k) => yamlBlock(k, next[k]));
    front = [...kept.flatMap((b) => b.lines), ...added].filter((l, i) => i > 0 || l !== "").join("\n");
  } else {
    front = Object.entries(next)
      .map(([k, v]) => yamlBlock(k, v))
      .join("\n");
  }
  return `---\n${front}\n---\n${body}`;
}

/** Keystatic's checks on the settings plus Markdoc's on the article. */
export function validatePost(state: Record<string, unknown>, body: string, otherSlugs?: Set<string>): FieldError[] {
  const errors = validateEntry(postSettingsType(), state, otherSlugs);
  if (!body.trim()) errors.push({ path: ["content"], message: "The article is empty." });
  return [...errors, ...articleErrors(body)];
}
