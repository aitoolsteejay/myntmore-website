// Reads and commits content through a GitHub App installed on this one repository.
//
// The App's private key lives only in server environment variables. For each request the server
// signs a short JWT, swaps it for an installation token scoped to this repository with contents
// write access, and uses that token for the REST API. A save is one commit on master:
//   1. read master's head;
//   2. check every file's current blob SHA against the one the editor opened (else ConflictError,
//      naming whoever changed it last);
//   3. build a tree on top of head with the new file contents, create a commit with the editor as
//      author (the App is the committer), and fast-forward master to it.
// If master moved between 1 and 3 (someone else committed), the fast-forward fails and the whole
// sequence is retried, so a concurrent edit to the same file is caught by step 2 and nothing is
// ever overwritten.
import "server-only";
import { createSign } from "node:crypto";
import {
  assertContentPath,
  ConflictError,
  type Author,
  type CommitResult,
  type ContentStore,
  type FileChange,
  type LastChange,
  type StoredFile,
} from "./store";

export interface GitHubConfig {
  appId: string;
  privateKey: string;
  installationId: string;
  owner: string;
  repo: string;
  branch: string;
  apiBase?: string;
}

type Fetch = typeof fetch;

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

/** RS256 JWT identifying the App (valid 9 minutes, backdated 60s for clock drift). */
export function appJwt(appId: string, privateKey: string, now = Math.floor(Date.now() / 1000)): string {
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64url(JSON.stringify({ iat: now - 60, exp: now + 540, iss: appId }));
  const signature = createSign("RSA-SHA256").update(`${header}.${payload}`).sign(privateKey);
  return `${header}.${payload}.${base64url(signature)}`;
}

class GitHubError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export class GitHubStore implements ContentStore {
  readonly kind = "github" as const;
  private token: { value: string; expiresAt: number } | null = null;
  private readonly api: string;

  constructor(
    private readonly cfg: GitHubConfig,
    private readonly fetchImpl: Fetch = fetch,
  ) {
    this.api = cfg.apiBase ?? "https://api.github.com";
  }

  static fromEnv(): GitHubStore {
    const missing = ["ADMIN_GITHUB_APP_ID", "ADMIN_GITHUB_APP_PRIVATE_KEY", "ADMIN_GITHUB_INSTALLATION_ID", "ADMIN_GITHUB_REPO"].filter((k) => !process.env[k]);
    if (missing.length) throw new Error(`The admin is not configured: set ${missing.join(", ")} (see docs/admin-setup.md)`);
    const [owner, repo] = process.env.ADMIN_GITHUB_REPO!.split("/");
    return new GitHubStore({
      appId: process.env.ADMIN_GITHUB_APP_ID!,
      // Vercel stores multi-line values fine, but a key pasted with literal \n is accepted too.
      privateKey: process.env.ADMIN_GITHUB_APP_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      installationId: process.env.ADMIN_GITHUB_INSTALLATION_ID!,
      owner,
      repo,
      branch: process.env.ADMIN_GITHUB_BRANCH || "master",
    });
  }

  private async installationToken(): Promise<string> {
    if (this.token && this.token.expiresAt - Date.now() > 5 * 60 * 1000) return this.token.value;
    const res = await this.fetchImpl(`${this.api}/app/installations/${this.cfg.installationId}/access_tokens`, {
      method: "POST",
      headers: { ...this.headers(), Authorization: `Bearer ${appJwt(this.cfg.appId, this.cfg.privateKey)}` },
      // Narrow the token to this repository and to what the admin needs.
      body: JSON.stringify({ repositories: [this.cfg.repo], permissions: { contents: "write", metadata: "read" } }),
    });
    if (!res.ok) throw new GitHubError(res.status, `GitHub App authentication failed (${res.status}): ${await res.text()}`);
    const body = (await res.json()) as { token: string; expires_at: string };
    this.token = { value: body.token, expiresAt: Date.parse(body.expires_at) };
    return body.token;
  }

  private headers(): Record<string, string> {
    return { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "myntmore-admin" };
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const res = await this.fetchImpl(`${this.api}/repos/${this.cfg.owner}/${this.cfg.repo}${path}`, {
      method,
      headers: { ...this.headers(), Authorization: `Bearer ${await this.installationToken()}`, ...(body ? { "Content-Type": "application/json" } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
    if (!res.ok) throw new GitHubError(res.status, `GitHub ${method} ${path} failed (${res.status}): ${await res.text()}`);
    return (await res.json()) as T;
  }

  private contentsPath(filePath: string, ref: string): string {
    return `/contents/${filePath.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(ref)}`;
  }

  private async fileAt(filePath: string, ref: string): Promise<StoredFile | null> {
    try {
      const f = await this.request<{ type: string; content: string; encoding: string; sha: string }>("GET", this.contentsPath(filePath, ref));
      if (f.type !== "file") return null;
      return { path: filePath, text: Buffer.from(f.content, f.encoding as BufferEncoding).toString("utf8"), sha: f.sha };
    } catch (err) {
      if (err instanceof GitHubError && err.status === 404) return null;
      throw err;
    }
  }

  async readFile(filePath: string): Promise<StoredFile | null> {
    assertContentPath(filePath);
    return this.fileAt(filePath, this.cfg.branch);
  }

  async listDir(dir: string): Promise<string[]> {
    try {
      const items = await this.request<{ name: string; type: string }[]>("GET", this.contentsPath(dir, this.cfg.branch));
      return Array.isArray(items) ? items.filter((i) => i.type === "file").map((i) => i.name) : [];
    } catch (err) {
      if (err instanceof GitHubError && err.status === 404) return [];
      throw err;
    }
  }

  async lastChange(filePath: string): Promise<LastChange | null> {
    const commits = await this.request<{ sha: string; html_url: string; commit: { author: { name: string; email: string; date: string } } }[]>(
      "GET",
      `/commits?sha=${encodeURIComponent(this.cfg.branch)}&path=${encodeURIComponent(filePath)}&per_page=1`,
    );
    const c = commits[0];
    return c ? { name: c.commit.author.name, email: c.commit.author.email, date: c.commit.author.date, sha: c.sha, url: c.html_url } : null;
  }

  async commit(changes: FileChange[], message: string, author: Author): Promise<CommitResult> {
    changes.forEach((c) => assertContentPath(c.path));
    for (let attempt = 0; attempt < 3; attempt++) {
      const ref = await this.request<{ object: { sha: string } }>("GET", `/git/ref/heads/${encodeURIComponent(this.cfg.branch)}`);
      const head = ref.object.sha;

      for (const change of changes) {
        const current = await this.fileAt(change.path, head);
        if ((current?.sha ?? null) !== change.expectedSha) throw new ConflictError(change.path, await this.lastChange(change.path).catch(() => null));
      }

      const headCommit = await this.request<{ tree: { sha: string } }>("GET", `/git/commits/${head}`);
      const tree = await this.request<{ sha: string }>("POST", "/git/trees", {
        base_tree: headCommit.tree.sha,
        tree: changes.map((c) =>
          c.text === null ? { path: c.path, mode: "100644", type: "blob", sha: null } : { path: c.path, mode: "100644", type: "blob", content: c.text },
        ),
      });
      const commit = await this.request<{ sha: string; html_url: string }>("POST", "/git/commits", {
        message,
        tree: tree.sha,
        parents: [head],
        author: { name: author.name, email: author.email, date: new Date().toISOString() },
      });
      try {
        await this.request("PATCH", `/git/refs/heads/${encodeURIComponent(this.cfg.branch)}`, { sha: commit.sha, force: false });
        return { sha: commit.sha, url: commit.html_url ?? `https://github.com/${this.cfg.owner}/${this.cfg.repo}/commit/${commit.sha}` };
      } catch (err) {
        // 422: master moved since step 1. Start again; the conflict check sees the new state.
        if (err instanceof GitHubError && err.status === 422) continue;
        throw err;
      }
    }
    throw new Error("Could not save: master kept changing. Try again in a moment.");
  }
}
