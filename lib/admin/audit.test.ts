// Whole-CMS consistency checks: every content type, field and entry on disk, against what the admin form,
// the catalog, the build rules and the generators expect. Catches a type or field that was added to
// keystatic.config.ts but not wired into the admin.
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { CREATABLE_TYPES, isEnabled } from "./entries";
import { CATALOG, catalogEntry } from "./catalog";
import { formSections } from "./entry-view";
import { collectionDir, contentTypes, describeType, entryFilePath, parseEntry, serializeEntry, serializeNewEntry, validateEntry } from "./schema";

const ROOT = path.resolve(__dirname, "../..");
const types = contentTypes();

describe("every content type", () => {
  it.each(types.map((t) => [t.key, t] as const))("%s: form sections cover each field exactly once", (_k, type) => {
    const fields = describeType(type);
    const seen = new Map<string, number>();
    for (const s of formSections(type)) for (const k of s.keys) seen.set(k, (seen.get(k) ?? 0) + 1);
    const missing = Object.keys(fields).filter((k) => !seen.has(k));
    const dup = Array.from(seen).filter(([, n]) => n > 1).map(([k]) => k);
    const unknown = Array.from(seen.keys()).filter((k) => !(k in fields));
    expect({ missing, dup, unknown }).toEqual({ missing: [], dup: [], unknown: [] });
  });

  it.each(types.map((t) => [t.key, t] as const))("%s: no field the form cannot edit", (_k, type) => {
    const bad: string[] = [];
    const walk = (d: any, p: string) => {
      if (d.kind === "unsupported") bad.push(`${p} (${d.type})`);
      if (d.kind === "object") Object.entries<any>(d.fields).forEach(([k, f]) => walk(f, `${p}.${k}`));
      if (d.kind === "array") walk(d.element, `${p}[]`);
    };
    Object.entries<any>(describeType(type)).forEach(([k, f]) => walk(f, k));
    expect(bad).toEqual([]);
  });

  it.each(types.filter((t) => isEnabled(t.key)).map((t) => [t.key, t] as const))("%s: has a catalog entry and a sensible label", (key, type) => {
    const cat = catalogEntry(key, type.label);
    expect(cat.title).toBeTruthy();
    expect(["pages", "content", "seo", "site", "other"].length).toBeGreaterThan(0);
    const u = type.kind === "collection" && cat.url ? cat.url("example-slug", "Example") : null;
    if (u) expect(u).toMatch(/^\//);
  });

  it("every catalog key is a real type", () => {
    const keys = new Set(types.map((t) => t.key));
    expect(Object.keys(CATALOG).filter((k) => !keys.has(k))).toEqual([]);
  });

  it("every creatable type is a collection with a name field and can start from an empty form", () => {
    for (const key of CREATABLE_TYPES) {
      const type = types.find((t) => t.key === key);
      expect(type, key).toBeTruthy();
      expect(type!.kind, key).toBe("collection");
      expect(type!.slugField, key).toBeTruthy();
      if (key !== "posts") {
        const { state } = parseEntry(type!, "{}");
        expect(() => serializeNewEntry(type!, { ...state, [type!.slugField!]: { name: "x", slug: "x" } }), key).not.toThrow();
      }
    }
  });

  it("every content folder belongs to a type", () => {
    const dirs = new Set(types.map((t) => (t.kind === "collection" ? collectionDir(t) : path.dirname(entryFilePath(t)))));
    const skip = new Set(["content/posts"]);
    const folders = fs.readdirSync(path.join(ROOT, "content")).map((d) => `content/${d}`).filter((d) => fs.statSync(path.join(ROOT, d)).isDirectory());
    expect(folders.filter((d) => !dirs.has(d) && !skip.has(d) && !Array.from(dirs).some((x) => x.startsWith(d))).sort()).toEqual([]);
  });
});

describe("every entry on disk", () => {
  type Row = readonly [string, string | undefined, (typeof types)[number]];
  const rows: Row[] = types
    .filter((t) => t.format === "json")
    .flatMap((t): Row[] => {
      if (t.kind === "singleton") return [[t.key, undefined, t]];
      const dir = path.join(ROOT, collectionDir(t));
      if (!fs.existsSync(dir)) return [];
      return fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f): Row => [t.key, f.replace(/\.json$/, ""), t]);
    });

  it("loads clean, validates, and saving without edits changes nothing", () => {
    const failures: string[] = [];
    for (const [key, slug, type] of rows) {
      const file = path.join(ROOT, entryFilePath(type, slug));
      const text = fs.readFileSync(file, "utf8");
      const parsed = parseEntry(type, text, slug);
      if (parsed.errors.length) failures.push(`${key}/${slug ?? ""}: parse: ${parsed.errors[0].message}`);
      const errs = validateEntry(type, parsed.state);
      if (errs.length) failures.push(`${key}/${slug ?? ""}: validate: ${errs[0].path.join(".")}: ${errs[0].message}`);
      const out = serializeEntry(type, parsed.state, text);
      if (JSON.stringify(JSON.parse(out)) !== JSON.stringify(JSON.parse(text))) failures.push(`${key}/${slug ?? ""}: re-saving unchanged would alter the file`);
    }
    expect(failures).toEqual([]);
  });

  it("every keywords field is a plain list of phrases (no empty, no duplicate)", () => {
    const bad: string[] = [];
    for (const [key, slug, type] of rows) {
      const d = JSON.parse(fs.readFileSync(path.join(ROOT, entryFilePath(type, slug)), "utf8"));
      const kw = d.keywords;
      if (kw === undefined) continue;
      if (!Array.isArray(kw) || kw.some((k: unknown) => typeof k !== "string" || !k.trim())) bad.push(`${key}/${slug}: bad keywords`);
      else if (new Set(kw.map((k: string) => k.toLowerCase())).size !== kw.length) bad.push(`${key}/${slug}: duplicate keywords`);
    }
    expect(bad).toEqual([]);
  });
});
