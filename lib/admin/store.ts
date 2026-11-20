// Where the admin reads and writes content. Git is the single source of truth: production reads the
// latest master from GitHub and every save is one commit (lib/admin/github.ts); a commit to master
// triggers the Vercel deploy exactly as a developer's push does. Nothing is written to Vercel's disk.
//
// For local development there is a files-on-disk store (like Keystatic's local mode), switched on
// with ADMIN_LOCAL_DEV=1 and only outside production and Vercel.
import "server-only";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export interface Author {
  name: string;
  email: string;
}

export interface FileChange {
  path: string;
  /** New file text, or null to delete the file. */
  text: string | null;
  /** Blob SHA of the file when the editor opened it, or null if it should not exist yet. */
  expectedSha: string | null;
}

export interface StoredFile {
  path: string;
  text: string;
  /** Git blob SHA of the content, used to detect edits made in the meantime. */
  sha: string;
}

export interface CommitResult {
  sha: string;
  url: string | null;
}

export interface LastChange {
  name: string;
  email: string;
  date: string;
  sha: string;
  url: string | null;
}

/** Someone changed the file after the editor opened it. Nothing was committed. */
export class ConflictError extends Error {
  constructor(
    public readonly path: string,
    public readonly lastChange: LastChange | null,
  ) {
    super(
      lastChange
        ? `This was edited by ${lastChange.name} at ${new Date(lastChange.date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}. Reload to see their changes; your edits stay in the form.`
        : `This file was changed after you opened it. Reload to see the latest version; your edits stay in the form.`,
    );
  }
}

export interface ContentStore {
  readonly kind: "github" | "local";
  readFile(filePath: string): Promise<StoredFile | null>;
  /** File names (not paths) directly inside a directory. */
  listDir(dir: string): Promise<string[]>;
  lastChange(filePath: string): Promise<LastChange | null>;
  /** Commit all changes at once, refusing with ConflictError if any file moved on since it was opened. */
  commit(changes: FileChange[], message: string, author: Author): Promise<CommitResult>;
}

/** Git's blob SHA for a text, the same value GitHub reports for a file. */
export function blobSha(text: string): string {
  const body = Buffer.from(text, "utf8");
  return createHash("sha1").update(`blob ${body.length}\0`).update(body).digest("hex");
}

/** Only content folders are ever read or written. */
export function assertContentPath(filePath: string): void {
  const normal = path.posix.normalize(filePath);
  if (normal !== filePath || !filePath.startsWith("content/") || filePath.includes("..") || filePath.includes("\\")) {
    throw new Error(`Refusing to touch ${filePath}: the admin only edits files under content/`);
  }
}

// ── Local files (development only) ───────────────────────────────────────

export class LocalStore implements ContentStore {
  readonly kind = "local" as const;
  constructor(private readonly root: string) {}

  async readFile(filePath: string): Promise<StoredFile | null> {
    assertContentPath(filePath);
    try {
      const text = await fs.readFile(path.join(this.root, filePath), "utf8");
      return { path: filePath, text, sha: blobSha(text) };
    } catch {
      return null;
    }
  }

  async listDir(dir: string): Promise<string[]> {
    try {
      return (await fs.readdir(path.join(this.root, dir), { withFileTypes: true })).filter((e) => e.isFile()).map((e) => e.name);
    } catch {
      return [];
    }
  }

  async lastChange(): Promise<LastChange | null> {
    return null;
  }

  async commit(changes: FileChange[]): Promise<CommitResult> {
    for (const change of changes) {
      assertContentPath(change.path);
      const current = await this.readFile(change.path);
      if ((current?.sha ?? null) !== change.expectedSha) throw new ConflictError(change.path, null);
    }
    for (const change of changes) {
      const target = path.join(this.root, change.path);
      if (change.text === null) await fs.rm(target, { force: true });
      else {
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.writeFile(target, change.text);
      }
    }
    return { sha: "local", url: null };
  }
}

/** True only on a developer's machine with ADMIN_LOCAL_DEV=1; never on Vercel or in a production build. */
export function isLocalDevMode(): boolean {
  return process.env.ADMIN_LOCAL_DEV === "1" && process.env.NODE_ENV !== "production" && !process.env.VERCEL;
}

let store: ContentStore | undefined;

export async function getStore(): Promise<ContentStore> {
  if (store) return store;
  if (isLocalDevMode()) store = new LocalStore(process.cwd());
  else {
    const { GitHubStore } = await import("./github");
    store = GitHubStore.fromEnv();
  }
  return store;
}
