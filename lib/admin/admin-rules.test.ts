import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { buildRuleErrors, companionFaqId, storeRuleContext } from "./rules";
import { contentType, entryFilePath, parseEntry, serializeEntry, serializeNewEntry } from "./schema";
import { LocalStore } from "./store";

const ROOT = path.resolve(__dirname, "../..");
const store = new LocalStore(ROOT);
const landing = contentType("landingPages")!;
const pharmaText = fs.readFileSync(path.join(ROOT, entryFilePath(landing, "pharma")), "utf8");

describe("build rules in the admin", () => {
  it("accept an entry the build accepts", async () => {
    expect(await buildRuleErrors(landing, pharmaText, "pharma", store)).toEqual([]);
  });

  it("refuse an edit the build would refuse, naming the field", async () => {
    const { state } = parseEntry(landing, pharmaText, "pharma");
    state.stats = state.stats.slice(0, 3);
    const errors = await buildRuleErrors(landing, serializeEntry(landing, state, pharmaText), "pharma", store);
    expect(errors).toContainEqual({ path: ["stats"], message: '"stats" must have exactly 4 items' });
  });

  it("answer link checks from the repository, refusing paths that leave it", async () => {
    const ctx = storeRuleContext(store);
    expect(await ctx.pageExists("/lp/pharma")).toBe(true);
    expect(await ctx.pageExists("/lp/no-such-page")).toBe(false);
    expect(await ctx.pageExists("/../package.json")).toBe(false);
    expect(await ctx.caseStudyPageExists("../../package")).toBe(false);
  });

  it("refuse a name that differs from the file name where pages rely on it", async () => {
    const json = { ...JSON.parse(pharmaText), slug: "Pharma" };
    expect((await buildRuleErrors(landing, JSON.stringify(json), "pharma", store)).map((e) => e.path)).toContainEqual(["slug"]);
  });

  it("refuse a second search title for the same page", async () => {
    const seo = contentType("pageSeo")!;
    const about = fs.readFileSync(path.join(ROOT, "content/page-seo/about-us.json"), "utf8");
    expect(await buildRuleErrors(seo, about, "about-us", store)).toEqual([]);
    const errors = await buildRuleErrors(seo, about, "about-us-copy", store);
    expect(errors.map((e) => e.path)).toEqual([["path"]]);
  });

  it("know which new pages need a Page FAQs file", () => {
    expect(companionFaqId(landing, "pune")).toBe("lp-pune");
    expect(companionFaqId(contentType("cityPages")!, "pune")).toBe("city-pune");
    expect(companionFaqId(contentType("events")!, "x")).toBeNull();
  });
});

describe("new files", () => {
  it("write every text field, empty ones as empty strings, like the existing files", () => {
    const { state } = parseEntry(landing, pharmaText, "pharma");
    state.metaTitle = "";
    const fresh = JSON.parse(serializeNewEntry(landing, state));
    expect(fresh.metaTitle).toBe("");
    expect(Object.keys(fresh)).toEqual(expect.arrayContaining(Object.keys(JSON.parse(pharmaText))));
  });
});

describe("resource guides in admin", () => {
  it("registers all 19 resource guides as singletons with live URLs", async () => {
    const { contentTypes } = await import("./schema");
    const { catalogEntry } = await import("./catalog");
    const { liveUrl } = await import("./entry-view");
    const guides = contentTypes().filter((t) => t.key.startsWith("guide"));
    expect(guides.length).toBe(19);
    for (const g of guides) {
      const cat = catalogEntry(g.key, g.label);
      expect(cat.title).toBeTruthy();
      expect(cat.description).toBe("Resource guide");
      expect(cat.group).toBe("pages");
      const url = liveUrl(g, g.key, "");
      expect(url).toMatch(/^\/resources\/guides\//);
    }
  });
});

describe("interactive tools in admin", () => {
  it("registers all 14 interactive tools as singletons with live URLs", async () => {
    const { contentTypes } = await import("./schema");
    const { catalogEntry } = await import("./catalog");
    const { liveUrl } = await import("./entry-view");
    const tools = contentTypes().filter((t) => t.key.startsWith("tool"));
    expect(tools.length).toBe(14);
    for (const t of tools) {
      const cat = catalogEntry(t.key, t.label);
      expect(cat.title).toBeTruthy();
      expect(cat.description).toBe("Interactive tool");
      expect(cat.group).toBe("pages");
      const url = liveUrl(t, t.key, "");
      expect(url).toMatch(/^\/(tools|resources\/tools)/);
    }
  });
});
