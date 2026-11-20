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
  slugOf,
  validateEntry,
  type ContentType,
  type FieldChange,
  type FieldError,
} from "./schema";
import { blobSha, ConflictError, getStore } from "./store";

/** Content types editable in the admin. Phase 1: Page FAQs; later phases add the rest. */
export const ENABLED_TYPES = ["pageFaqs"];

export function isEnabled(typeKey: string): boolean {
  return ENABLED_TYPES.includes(typeKey);
}

export function enabledType(typeKey: string): ContentType | null {
  const type = contentType(typeKey);
  return type && isEnabled(typeKey) && type.format === "json" ? type : null;
}

export function allTypes(): { key: string; label: string; kind: string; enabled: boolean }[] {
  return contentTypes().map((t) => ({ key: t.key, label: t.label, kind: t.kind, enabled: isEnabled(t.key) }));
}

export interface EntrySummary {
  slug: string;
  title: string;
}

/** Entries of a collection with a readable title (the slug field's name), newest list from master. */
export async function listEntries(type: ContentType): Promise<EntrySummary[]> {
  const store = await getStore();
  const slugs = (await store.listDir(collectionDir(type))).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5));
  const out: EntrySummary[] = [];
  // Read in small batches to keep the number of parallel GitHub requests modest.
  for (let i = 0; i < slugs.length; i += 10) {
    const batch = await Promise.all(
      slugs.slice(i, i + 10).map(async (slug) => {
        const file = await store.readFile(entryFilePath(type, slug));
        let title = slug;
        if (file && type.slugField) {
          const name = parseEntry(type, file.text, slug).state[type.slugField]?.name;
          if (typeof name === "string" && name) title = name;
        }
        return { slug, title };
      }),
    );
    out.push(...batch);
  }
  return out.sort((a, b) => a.title.localeCompare(b.title));
}

export interface LoadedEntry {
  state: Record<string, unknown>;
  /** Blob SHA of the file as opened; sent back with a save to detect edits made in the meantime. */
  sha: string;
  errors: FieldError[];
}

export async function loadEntry(type: ContentType, slug: string): Promise<LoadedEntry | null> {
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

/** Validate and commit an edit to an existing entry, then log it. */
export async function saveEntry(type: ContentType, slug: string, state: Record<string, unknown>, openedSha: string, editor: Editor): Promise<SaveResult> {
  const store = await getStore();
  const path = entryFilePath(type, slug);

  const errors = validateEntry(type, state);
  if (errors.length) return { ok: false, status: 422, message: "Some fields need attention.", errors };
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

  const label = type.slugField ? `${type.label}: ${slug}` : type.label;
  let commit;
  try {
    commit = await store.commit([{ path, text, expectedSha: openedSha }], `Update ${label}`, { name: editor.name, email: editor.email });
  } catch (err) {
    if (err instanceof ConflictError) return { ok: false, status: 409, message: err.message };
    throw err;
  }

  const deployWarning = store.kind === "github" ? await triggerDeploy() : undefined;
  const changes = diffEntries(current.text, text);
  // The commit is done and will deploy; a failure to log it must not report the save as failed.
  let activity: ActivityEntry | null = null;
  let logWarning: string | undefined;
  try {
    activity = await recordActivity({
      editor_email: editor.email,
      editor_name: editor.name,
      action: "update",
      content_type: type.key,
      content_label: type.label,
      entry: slug,
      files: [path],
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
  return { ok: true, unchanged: false, sha: blobSha(text), commitUrl: commit.url, changes, activity, logWarning: warning, local: store.kind === "local" };
}
