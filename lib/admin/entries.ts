// Loading, saving and logging content entries for the admin. Server only.
import "server-only";
import { recordActivity, type ActivityEntry } from "./activity";
import { triggerDeploy } from "./deploy";
import type { Editor } from "./auth";
import {
  collectionDir,
  contentType,
  contentTypes,
  diffEntries,
  entryFilePath,
  parseEntry,
  serializeEntry,
  serializeNewEntry,
  singletonSlug,
  slugOf,
  validateEntry,
  type ContentType,
  type FieldChange,
  type FieldError,
} from "./schema";
import { buildRuleErrors, companionFaqId } from "./rules";
import { blobSha, ConflictError, getStore, type FileChange } from "./store";

/** Every JSON content type is editable here. Blog posts (Markdoc) come in phase 3. */
export function isEnabled(typeKey: string): boolean {
  return contentType(typeKey)?.format === "json";
}

/**
 * Collections where a new file is all a new page needs: a generator builds the page, its sitemap entry
 * and any index from the JSON. Service pages need a hand-written component and market pages a code
 * change, so new ones are added by a developer.
 */
export const CREATABLE_TYPES = ["landingPages", "cityPages", "industryCityPages", "events", "caseStudies", "caseStudyPages", "glossaryTerms", "careers", "homepageFaqs", "pageFaqs", "pageSeo"];

export function isCreatable(type: ContentType): boolean {
  return type.kind === "collection" && CREATABLE_TYPES.includes(type.key);
}

/** New file names: lowercase words joined by hyphens, as every page URL on the site uses. */
export const NEW_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function enabledType(typeKey: string): ContentType | null {
  const type = contentType(typeKey);
  return type && isEnabled(typeKey) ? type : null;
}

export function allTypes(): { key: string; label: string; kind: string; enabled: boolean }[] {
  return contentTypes().map((t) => ({ key: t.key, label: t.label, kind: t.kind, enabled: isEnabled(t.key) }));
}

/** The name an entry is addressed by: its file name, or for a singleton the file it is saved as. */
export function entrySlug(type: ContentType, slug?: string): string {
  return type.kind === "singleton" ? singletonSlug(type) : slug!;
}

export interface EntrySummary {
  slug: string;
  title: string;
}

/** Entries of a collection with a readable title (the slug field's name), read from master in one go. */
export async function listEntries(type: ContentType): Promise<EntrySummary[]> {
  const files = (await (await getStore()).readDir(collectionDir(type))).filter((f) => f.path.endsWith(".json"));
  return files
    .map((file) => {
      const slug = file.path.slice(file.path.lastIndexOf("/") + 1, -5);
      let title = slug;
      if (type.slugField) {
        const name = parseEntry(type, file.text, slug).state[type.slugField]?.name;
        if (typeof name === "string" && name) title = name;
      }
      return { slug, title };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

/** Choices for a relationship field: the entries of the collection it points to. */
export async function relationshipOptions(fields: Record<string, unknown>): Promise<Record<string, EntrySummary[]>> {
  const collections = new Set<string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const walk = (d: any) => {
    if (!d || typeof d !== "object") return;
    if (d.kind === "relationship") collections.add(d.collection);
    if (d.kind === "object") Object.values(d.fields).forEach(walk);
    if (d.kind === "array") walk(d.element);
  };
  Object.values(fields).forEach(walk);
  const out: Record<string, EntrySummary[]> = {};
  for (const c of Array.from(collections)) {
    const t = contentType(c);
    if (t?.kind === "collection" && t.format === "json") out[c] = await listEntries(t);
  }
  return out;
}

export interface LoadedEntry {
  state: Record<string, unknown>;
  /** Blob SHA of the file as opened; sent back with a save to detect edits made in the meantime. */
  sha: string;
  errors: FieldError[];
}

export async function loadEntry(type: ContentType, slug?: string): Promise<LoadedEntry | null> {
  const file = await (await getStore()).readFile(entryFilePath(type, slug));
  if (!file) return null;
  const { state, errors } = parseEntry(type, file.text, slug);
  return { state, sha: file.sha, errors };
}

export type SaveResult =
  | { ok: true; unchanged: true }
  | {
      ok: true;
      unchanged: false;
      sha: string;
      commitUrl: string | null;
      changes: FieldChange[];
      activity: ActivityEntry | null;
      logWarning?: string;
      local: boolean;
    }
  | { ok: false; status: 404 | 409 | 422; message: string; errors?: FieldError[] };

const NEEDS_ATTENTION = "Some fields need attention.";
const BUILD_RULES = "This would stop the site from building, so it was not saved. Fix the marked fields.";

/** Validate and commit an edit to an existing entry, then log it. */
export async function saveEntry(type: ContentType, slug: string, state: Record<string, unknown>, openedSha: string, editor: Editor): Promise<SaveResult> {
  const store = await getStore();
  if (type.kind === "singleton" && slug !== singletonSlug(type)) return { ok: false, status: 404, message: "This entry does not exist." };
  const path = entryFilePath(type, slug);

  const errors = validateEntry(type, state);
  if (errors.length) return { ok: false, status: 422, message: NEEDS_ATTENTION, errors };
  if (type.slugField && slugOf(type, state) !== slug) {
    return {
      ok: false,
      status: 422,
      message: "Renaming an entry is not available yet.",
      errors: [{ path: [type.slugField], message: "The file name cannot be changed here." }],
    };
  }

  const current = await store.readFile(path);
  if (!current) return { ok: false, status: 404, message: "This entry no longer exists. It may have been deleted." };
  if (current.sha !== openedSha) {
    return { ok: false, status: 409, message: new ConflictError(path, await store.lastChange(path).catch(() => null)).message };
  }

  const text = serializeEntry(type, state, current.text);
  if (text === current.text) return { ok: true, unchanged: true };

  const ruleErrors = await buildRuleErrors(type, text, slug, store);
  if (ruleErrors.length) return { ok: false, status: 422, message: BUILD_RULES, errors: ruleErrors };

  const label = type.slugField ? `${type.label}: ${slug}` : type.label;
  return commitAndLog(type, slug, "update", [{ path, text, expectedSha: openedSha }], `Update ${label}`, diffEntries(current.text, text), editor);
}

/** Commit, ask Vercel to deploy if configured, and record the activity. */
async function commitAndLog(
  type: ContentType,
  slug: string,
  action: "update" | "create",
  files: FileChange[],
  message: string,
  changes: FieldChange[],
  editor: Editor,
): Promise<SaveResult> {
  const store = await getStore();
  let commit;
  try {
    commit = await store.commit(files, message, { name: editor.name, email: editor.email });
  } catch (err) {
    if (err instanceof ConflictError) return { ok: false, status: 409, message: err.message };
    throw err;
  }
  const deployWarning = store.kind === "github" ? await triggerDeploy() : undefined;
  // The commit is done and will deploy; a failure to log it must not report the save as failed.
  let activity: ActivityEntry | null = null;
  let logWarning: string | undefined;
  try {
    activity = await recordActivity({
      editor_email: editor.email,
      editor_name: editor.name,
      action,
      content_type: type.key,
      content_label: type.label,
      entry: slug,
      files: files.map((f) => f.path),
      commit_sha: commit.sha,
      commit_url: commit.url,
      changes,
      reverts_id: null,
    });
  } catch (err) {
    console.error("admin: saved but could not log", err);
    logWarning = "Saved, but the activity log could not record it. The commit on GitHub still shows your name.";
  }
  const warning = [deployWarning, logWarning].filter(Boolean).join(" ") || undefined;
  return { ok: true, unchanged: false, sha: blobSha(files[0].text!), commitUrl: commit.url, changes, activity, logWarning: warning, local: store.kind === "local" };
}

export interface FirstFaq {
  question: string;
  answer: string;
}

export type CreateResult = { ok: true; slug: string; commitUrl: string | null; logWarning?: string; local: boolean } | { ok: false; status: 404 | 409 | 422; message: string; errors?: FieldError[] };

/**
 * Create a new entry in a creatable collection. If its page reads a Page FAQs file (landing and city
 * pages), that file is created in the same commit from `faq`, unless it already exists.
 */
export async function createEntry(type: ContentType, state: Record<string, unknown>, faq: FirstFaq | null, editor: Editor): Promise<CreateResult> {
  if (!isCreatable(type) || !type.slugField) return { ok: false, status: 404, message: "New entries of this type are added by a developer." };
  const store = await getStore();
  const dir = collectionDir(type);
  const existing = new Set((await store.listDir(dir)).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5)));

  const errors = validateEntry(type, state, existing);
  const slug = slugOf(type, state);
  if (!errors.some((e) => e.path[0] === type.slugField) && (!slug || !NEW_SLUG.test(slug))) {
    errors.push({ path: [type.slugField], message: "Use lowercase letters, numbers and single hyphens for the file name, e.g. b2b-lead-generation-pune." });
  }
  if (errors.length || !slug) return { ok: false, status: 422, message: NEEDS_ATTENTION, errors };

  const text = serializeNewEntry(type, state);
  const files: FileChange[] = [{ path: entryFilePath(type, slug), text, expectedSha: null }];
  const ruleErrors = await buildRuleErrors(type, text, slug, store);

  const faqId = companionFaqId(type, slug);
  const faqType = contentType("pageFaqs")!;
  if (faqId && !(await store.readFile(entryFilePath(faqType, faqId)))) {
    const name = String((state[type.slugField] as { name?: string })?.name ?? slug);
    const q = faq?.question?.trim() ?? "";
    const a = faq?.answer?.trim() ?? "";
    if (!q || !a) ruleErrors.push({ path: ["_faq"], message: "This page shows questions and answers; add the first one (more can be added in Page FAQs after saving)." });
    else {
      const faqState = { page: { name: `${type.label}: ${name}`, slug: faqId }, items: [{ question: q, answer: a }] };
      const faqText = serializeNewEntry(faqType, faqState);
      const faqErrors = [...validateEntry(faqType, faqState), ...(await buildRuleErrors(faqType, faqText, faqId, store))];
      if (faqErrors.length) ruleErrors.push(...faqErrors.map((e) => ({ path: ["_faq"], message: e.message })));
      else files.push({ path: entryFilePath(faqType, faqId), text: faqText, expectedSha: null });
    }
  }
  if (ruleErrors.length) return { ok: false, status: 422, message: BUILD_RULES, errors: ruleErrors };

  const result = await commitAndLog(type, slug, "create", files, `Create ${type.label}: ${slug}`, diffEntries(null, text), editor);
  if (!result.ok) return result.status === 409 ? { ...result, message: `Someone created "${slug}" a moment ago. Choose another file name.` } : result;
  if (result.unchanged) throw new Error("unreachable");
  return { ok: true, slug, commitUrl: result.commitUrl, logWarning: result.logWarning, local: result.local };
}
