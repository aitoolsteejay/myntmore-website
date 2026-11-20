// The build's own content rules (scripts/lib/content-rules.mjs), run by the admin before every commit,
// so a save the admin accepts is one the build accepts. The rules look at other files (does this case
// study page exist?); here those questions are answered from the latest master on GitHub, the same
// tree the deploy will build.
import "server-only";
import industryKeys from "../industry-keys.json";
import { checkEntry, COMPANION_FAQS, NAME_IS_FILE_NAME, nameProblems, UNIQUE_NAMES } from "../../scripts/lib/content-rules.mjs";
import type { ContentType, FieldError } from "./schema";
import type { ContentStore } from "./store";

export { COMPANION_FAQS, NAME_IS_FILE_NAME };

export function nameIsFileName(type: ContentType): boolean {
  return NAME_IS_FILE_NAME.includes(type.key);
}

/** Answers the rules' questions about other files from the store, remembering each answer for one save. */
export function storeRuleContext(store: ContentStore) {
  const seen = new Map<string, Promise<boolean>>();
  const exists = (p: string) => {
    if (!seen.has(p)) seen.set(p, store.exists(p));
    return seen.get(p)!;
  };
  const route = (r: string) => r.replace(/^\/+|\/+$/g, "");
  return {
    caseStudyPageExists: (slug: string) => /^[a-z0-9-]+$/.test(slug) && exists(`app/case-studies/${slug}/page.tsx`),
    pageExists: (r: string) => /^\/[A-Za-z0-9\-_/]*$/.test(r) && !r.includes("..") && exists(route(r) ? `app/${route(r)}/page.tsx` : "app/page.tsx"),
    cityPageExists: (slug: string) => /^[a-z0-9-]+$/.test(slug) && exists(`content/city-pages/${slug}.json`),
    industryKeys: new Set((industryKeys as { key: string }[]).map((i) => i.key)),
    longCaseComponentExists: (slug: string) => /^[a-z0-9-]+$/.test(slug) && exists(`components/case-studies/long/${slug}.tsx`),
  };
}

/** The entry's build-rule problems, as field errors the form can show next to the field. */
export async function buildRuleErrors(type: ContentType, text: string, slug: string, store: ContentStore): Promise<FieldError[]> {
  const json = JSON.parse(text);
  const problems = [...nameProblems(type.key, json, slug), ...(await checkEntry(type.key, { ...json, slug }, storeRuleContext(store)))];

  // A name other entries must not share (one search title per page path).
  const unique = (UNIQUE_NAMES as Record<string, string>)[type.key];
  if (unique && type.kind === "collection") {
    const dir = type.path.slice(0, -2);
    const clash = (await store.readDir(dir)).find((f) => f.path !== `${dir}/${slug}.json` && f.path.endsWith(".json") && safeJson(f.text)?.[unique] === json[unique]);
    if (clash) problems.push({ field: unique, message: `${json[unique]} already has an entry (${clash.path.slice(dir.length + 1, -5)}); edit that one instead` });
  }
  return problems.map((p) => ({ path: p.field && p.field in type.schema ? [p.field] : [], message: p.message }));
}

function safeJson(text: string): Record<string, unknown> | null {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** The Page FAQs file a page of this type needs, if any (e.g. "lp-pharma" for landing page "pharma"). */
export function companionFaqId(type: ContentType, slug: string): string | null {
  const prefix = (COMPANION_FAQS as Record<string, string>)[type.key];
  return prefix ? `${prefix}${slug}` : null;
}
