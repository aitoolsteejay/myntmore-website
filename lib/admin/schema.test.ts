import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  collectionDir,
  contentType,
  contentTypes,
  describeType,
  diffEntries,
  entryFilePath,
  parseEntry,
  serializeEntry,
  slugOf,
  validateEntry,
} from "./schema";

const ROOT = path.resolve(__dirname, "../..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

// Every JSON entry on disk, by content type.
const jsonTypes = contentTypes().filter((t) => t.format === "json");
const entries = jsonTypes.flatMap((type) => {
  if (type.kind === "singleton") return [{ type, slug: undefined as string | undefined, file: entryFilePath(type) }];
  return fs
    .readdirSync(path.join(ROOT, collectionDir(type)))
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ type, slug: f.replace(/\.json$/, ""), file: entryFilePath(type, f.replace(/\.json$/, "")) }));
});

describe("round trip through Keystatic's own field functions", () => {
  it("finds the content", () => {
    expect(jsonTypes.length).toBeGreaterThan(20);
    expect(entries.length).toBeGreaterThan(300);
  });

  it("parses and validates every JSON entry with no errors", () => {
    const problems: string[] = [];
    for (const { type, slug, file } of entries) {
      const { state, errors } = parseEntry(type, read(file), slug);
      if (errors.length) problems.push(`${file}: parse: ${errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ")}`);
      const invalid = validateEntry(type, state);
      if (invalid.length) problems.push(`${file}: validate: ${invalid.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ")}`);
      if (slug !== undefined && slugOf(type, state) !== slug) problems.push(`${file}: slug field gives "${slugOf(type, state)}"`);
    }
    expect(problems).toEqual([]);
  });

  it("saving an unedited entry leaves its file unchanged", () => {
    const changed: string[] = [];
    const reformatted: string[] = [];
    for (const { type, slug, file } of entries) {
      const text = read(file);
      const out = serializeEntry(type, parseEntry(type, text, slug).state, text);
      if (out === text) continue;
      const standard = JSON.stringify(JSON.parse(text), null, 2) + "\n";
      // Hand-formatted files (compact inline objects) can only be rewritten with standard indentation;
      // their data must still come back identical.
      if (text !== standard && out === standard) reformatted.push(file);
      else changed.push(file);
    }
    expect(changed).toEqual([]);
    // Only hand-formatted files land here (15 today: service copy, long case studies and one glossary
    // term with inline lists). Their first save re-indents them; the data is unchanged.
    expect(reformatted.length).toBeLessThan(20);
  });

  it("Keystatic-written collections also match Keystatic's own output with no layout help", () => {
    for (const key of ["pageFaqs", "homepageFaqs", "pageSeo"]) {
      for (const { type, slug, file } of entries.filter((e) => e.type.key === key)) {
        const text = read(file);
        expect(serializeEntry(type, parseEntry(type, text, slug).state), file).toBe(text);
      }
    }
  });
});

describe("Page FAQs", () => {
  const type = contentType("pageFaqs")!;
  const file = entryFilePath(type, "lp-pharma");
  const text = read(file);

  it("refuses an empty required answer, using Keystatic's own validation", () => {
    const { state } = parseEntry(type, text, "lp-pharma");
    state.items[0].answer = "";
    const errors = validateEntry(type, state);
    expect(errors.map((e) => e.path.join("."))).toContain("items.0.answer");
  });

  it("writes an edit in Keystatic's format and reports it as a field change", () => {
    const { state } = parseEntry(type, text, "lp-pharma");
    state.items[0].question = "A new question?";
    const out = serializeEntry(type, state);
    expect(out.endsWith("\n")).toBe(true);
    expect(JSON.parse(out).items[0].question).toBe("A new question?");
    expect(diffEntries(text, out)).toEqual([{ path: "items.0.question", before: JSON.parse(text).items[0].question, after: "A new question?" }]);
  });

  it("describes its fields for the form", () => {
    const d = describeType(type);
    expect(d.page).toMatchObject({ kind: "slug", isEntryName: true, label: "Page" });
    expect(d.items).toMatchObject({
      kind: "array",
      element: { kind: "object", fields: { question: { kind: "text", required: true }, answer: { kind: "text", multiline: true } } },
    });
  });
});

describe("entry paths", () => {
  it("refuses names that could leave the collection folder", () => {
    const type = contentType("pageFaqs")!;
    for (const bad of ["../x", "a/b", "", ".", "x..y"]) expect(() => entryFilePath(type, bad)).toThrow();
  });
});

describe("Keystatic itself, with the recording `fields` wrapper", () => {
  it("still reads every collection and singleton through Keystatic's own reader", async () => {
    const { createReader } = await import("@keystatic/core/reader");
    const config = (await import("../../keystatic.config")).default;
    const reader = createReader(ROOT, config);
    let count = 0;
    for (const key of Object.keys(config.collections ?? {})) count += (await (reader.collections as any)[key].all()).length;
    for (const key of Object.keys(config.singletons ?? {})) if (await (reader.singletons as any)[key].read()) count++;
    expect(count).toBeGreaterThan(300);
  });
});
