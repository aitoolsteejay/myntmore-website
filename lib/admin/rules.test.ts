import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { checkEntry, nameProblems } from "../../scripts/lib/content-rules.mjs";
import { fsContext } from "../../scripts/lib/fs-context.mjs";
import { collectionDir, contentType, contentTypes, entryFilePath } from "./schema";

const ROOT = path.resolve(__dirname, "../..");
const ctx = fsContext(ROOT);
const read = (key: string, slug: string) => {
  const type = contentType(key)!;
  return { ...JSON.parse(fs.readFileSync(path.join(ROOT, entryFilePath(type, slug)), "utf8")), slug };
};

describe("shared build rules (scripts/lib/content-rules.mjs)", () => {
  it("pass every entry on disk, as the build does today", async () => {
    const problems: string[] = [];
    for (const type of contentTypes().filter((t) => t.format === "json")) {
      const entries =
        type.kind === "singleton"
          ? [{ slug: type.path.split("/").pop()!, file: entryFilePath(type) }]
          : fs
              .readdirSync(path.join(ROOT, collectionDir(type)))
              .filter((f) => f.endsWith(".json"))
              .map((f) => ({ slug: f.slice(0, -5), file: entryFilePath(type, f.slice(0, -5)) }));
      for (const { slug, file } of entries) {
        const json = JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
        for (const p of [...nameProblems(type.key, json, slug), ...(await checkEntry(type.key, { ...json, slug }, ctx))]) problems.push(`${file}: ${p.message}`);
      }
    }
    expect(problems).toEqual([]);
  });

  it("catch exact list lengths, with the field they belong to", async () => {
    const d = read("landingPages", "pharma");
    d.stats = d.stats.slice(0, 3);
    expect(await checkEntry("landingPages", d, ctx)).toContainEqual({ field: "stats", message: '"stats" must have exactly 4 items' });
  });

  it("catch conditional rules and formats", async () => {
    const slug = fs.readdirSync(path.join(ROOT, "content/events"))[0].slice(0, -5);
    const d = { ...read("events", slug), startTime: "25:00", showPopup: true, registrationUrl: "" };
    const fields = (await checkEntry("events", d, ctx)).map((p) => p.field);
    expect(fields).toContain("startTime");
    expect(fields).toContain("registrationUrl");
  });

  it("catch links to pages that do not exist", async () => {
    const d = read("cityPages", "mumbai");
    d.proof = [{ ...(d.proof[0] ?? {}), href: "/case-studies/no-such-case" }];
    d.proofTitle ||= "Proof";
    expect((await checkEntry("cityPages", d, ctx)).map((p) => p.message)).toContain("proof link /case-studies/no-such-case is not a case study page");
  });

  it("catch a case study title too long for search", async () => {
    const slug = fs.readdirSync(path.join(ROOT, "content/case-studies"))[0].slice(0, -5);
    const d = { ...read("caseStudies", slug), metaTitle: "x".repeat(60) };
    expect((await checkEntry("caseStudies", d, ctx)).map((p) => p.field)).toContain("metaTitle");
  });

  it("refuse a Page FAQs entry with no questions", async () => {
    expect(await checkEntry("pageFaqs", { page: "x", items: [], slug: "x" }, ctx)).toHaveLength(1);
  });
});
