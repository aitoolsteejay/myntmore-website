import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { articleErrors, parsePost, serializePost, validatePost } from "./posts";

const DIR = path.resolve(__dirname, "../../content/posts");
const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".mdoc"));

describe("blog posts", () => {
  it("load and save every post unchanged when nothing is edited", () => {
    const changed: string[] = [];
    for (const f of files) {
      const text = fs.readFileSync(path.join(DIR, f), "utf8");
      const post = parsePost(text, f.slice(0, -5));
      expect(post.errors, f).toEqual([]);
      if (serializePost(post.state, post.body, text) !== text) changed.push(f);
    }
    expect(changed).toEqual([]);
  });

  it("change only the edited line", () => {
    const f = files[0];
    const text = fs.readFileSync(path.join(DIR, f), "utf8");
    const post = parsePost(text, f.slice(0, -5));
    const out = serializePost({ ...post.state, category: "New Category" }, post.body, text);
    const a = text.split("\n");
    const b = out.split("\n");
    expect(b.length).toBe(a.length);
    expect(a.filter((l, i) => l !== b[i])).toHaveLength(1);
    expect(out).toContain('category: "New Category"');
  });

  it("pass every published article through Markdoc's checks", () => {
    const bad = files.flatMap((f) => articleErrors(parsePost(fs.readFileSync(path.join(DIR, f), "utf8"), f).body).map((e) => `${f} ${e.message}`));
    expect(bad).toEqual([]);
  });

  it("refuse an unknown tag in the article", () => {
    const f = files[0];
    const post = parsePost(fs.readFileSync(path.join(DIR, f), "utf8"), f.slice(0, -5));
    expect(validatePost(post.state, "{% callout %}\nHi\n{% /callout %}\n").map((e) => e.path)).toContainEqual(["content"]);
  });
});
