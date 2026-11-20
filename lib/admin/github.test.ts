import { createVerify, generateKeyPairSync } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { appJwt, GitHubStore } from "./github";
import { blobSha, ConflictError } from "./store";

const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs1", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
});

// A small in-memory GitHub: commits hold a full snapshot of their files.
interface Commit {
  files: Map<string, string>;
  parent: string | null;
  author: { name: string; email: string; date: string };
  message: string;
}
class FakeGitHub {
  commits = new Map<string, Commit>();
  trees = new Map<string, Map<string, string>>();
  head: string;
  tokenRequests = 0;
  /** Called once just before the next ref update, to simulate someone else pushing in between. */
  beforeNextRefUpdate: (() => void) | null = null;
  private n = 0;

  constructor(files: Record<string, string>) {
    this.head = this.addCommit(new Map(Object.entries(files)), null, { name: "Tejas", email: "t@example.com", date: "2026-11-01T10:00:00Z" }, "initial");
  }
  addCommit(files: Map<string, string>, parent: string | null, author: Commit["author"], message: string): string {
    const sha = `c${++this.n}`.padEnd(40, "0");
    this.commits.set(sha, { files, parent, author, message });
    return sha;
  }
  /** Someone else commits straight to master. */
  push(path: string, text: string, name: string) {
    const files = new Map(this.commits.get(this.head)!.files);
    files.set(path, text);
    this.head = this.addCommit(files, this.head, { name, email: `${name.toLowerCase()}@example.com`, date: "2026-11-02T10:12:00Z" }, `edit ${path}`);
  }
  file(path: string) {
    return this.commits.get(this.head)!.files.get(path);
  }

  fetch = async (url: string | URL | Request, init?: RequestInit): Promise<Response> => {
    const u = new URL(String(url));
    const method = init?.method ?? "GET";
    const body = init?.body ? JSON.parse(String(init.body)) : undefined;
    const json = (status: number, data: unknown) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
    const p = u.pathname;

    if (p === "/app/installations/42/access_tokens" && method === "POST") {
      this.tokenRequests++;
      return json(201, { token: "inst-token", expires_at: new Date(Date.now() + 3600_000).toISOString() });
    }
    if ((init?.headers as Record<string, string>)?.Authorization !== "Bearer inst-token") return json(401, { message: "bad token" });
    const repo = "/repos/acme/site";
    if (!p.startsWith(repo)) return json(404, {});
    const rest = p.slice(repo.length);

    if (rest === "/git/ref/heads/master") return json(200, { object: { sha: this.head } });
    if (rest.startsWith("/contents/")) {
      const path = decodeURIComponent(rest.slice("/contents/".length));
      const ref = u.searchParams.get("ref")!;
      const files = this.commits.get(ref === "master" ? this.head : ref)!.files;
      if (files.has(path))
        return json(200, { type: "file", encoding: "base64", content: Buffer.from(files.get(path)!).toString("base64"), sha: blobSha(files.get(path)!) });
      const dir = Array.from(files.keys())
        .filter((f) => f.startsWith(path + "/"))
        .map((f) => ({ name: f.slice(path.length + 1), type: "file" }));
      return dir.length ? json(200, dir) : json(404, {});
    }
    if (rest === "/commits") {
      const path = u.searchParams.get("path")!;
      for (let sha: string | null = this.head; sha; sha = this.commits.get(sha)!.parent) {
        const c = this.commits.get(sha)!;
        const before = c.parent ? this.commits.get(c.parent)!.files.get(path) : undefined;
        if (c.files.get(path) !== before) return json(200, [{ sha, html_url: `https://github.com/acme/site/commit/${sha}`, commit: { author: c.author } }]);
      }
      return json(200, []);
    }
    if (rest.startsWith("/git/commits/") && method === "GET") return json(200, { tree: { sha: `tree-of-${rest.split("/").pop()}` } });
    if (rest === "/git/trees" && method === "POST") {
      const base = new Map(this.commits.get(body.base_tree.replace("tree-of-", ""))!.files);
      for (const t of body.tree) t.sha === null ? base.delete(t.path) : base.set(t.path, t.content);
      const sha = `t${this.trees.size + 1}`;
      this.trees.set(sha, base);
      return json(201, { sha });
    }
    if (rest === "/git/commits" && method === "POST") {
      const sha = this.addCommit(this.trees.get(body.tree)!, body.parents[0], body.author, body.message);
      return json(201, { sha, html_url: `https://github.com/acme/site/commit/${sha}` });
    }
    if (rest === "/git/refs/heads/master" && method === "PATCH") {
      if (this.beforeNextRefUpdate) {
        const f = this.beforeNextRefUpdate;
        this.beforeNextRefUpdate = null;
        f();
      }
      // A fast-forward only: the new commit's parent must be the current head.
      if (this.commits.get(body.sha)!.parent !== this.head) return json(422, { message: "Update is not a fast forward" });
      this.head = body.sha;
      return json(200, { object: { sha: body.sha } });
    }
    return json(404, { message: `unhandled ${method} ${rest}` });
  };
}

const priya = { name: "Priya", email: "priya@myntmore.com" };
let gh: FakeGitHub;
let store: GitHubStore;

beforeEach(() => {
  gh = new FakeGitHub({ "content/faqs/pages/a.json": '{"x":1}\n', "content/faqs/pages/b.json": '{"y":2}\n', "README.md": "hi" });
  store = new GitHubStore(
    { appId: "123", privateKey, installationId: "42", owner: "acme", repo: "site", branch: "master", apiBase: "https://api.test" },
    gh.fetch as typeof fetch,
  );
});

describe("GitHub App auth", () => {
  it("signs a valid RS256 JWT for the App", () => {
    const jwt = appJwt("123", privateKey, 1_700_000_000);
    const [h, p, s] = jwt.split(".");
    expect(createVerify("RSA-SHA256").update(`${h}.${p}`).verify(publicKey, Buffer.from(s, "base64url"))).toBe(true);
    expect(JSON.parse(Buffer.from(p, "base64url").toString())).toEqual({ iat: 1_700_000_000 - 60, exp: 1_700_000_000 + 540, iss: "123" });
  });

  it("reuses the installation token across requests", async () => {
    await store.readFile("content/faqs/pages/a.json");
    await store.listDir("content/faqs/pages");
    expect(gh.tokenRequests).toBe(1);
  });
});

describe("reading", () => {
  it("reads a file with its blob SHA and lists a folder", async () => {
    expect(await store.readFile("content/faqs/pages/a.json")).toEqual({ path: "content/faqs/pages/a.json", text: '{"x":1}\n', sha: blobSha('{"x":1}\n') });
    expect(await store.readFile("content/faqs/pages/missing.json")).toBeNull();
    expect((await store.listDir("content/faqs/pages")).sort()).toEqual(["a.json", "b.json"]);
  });

  it("refuses anything outside content/", async () => {
    await expect(store.readFile("README.md")).rejects.toThrow(/only edits files under content/);
    await expect(store.readFile("content/../README.md")).rejects.toThrow();
    await expect(store.commit([{ path: "app/page.tsx", text: "x", expectedSha: null }], "m", priya)).rejects.toThrow();
  });
});

describe("saving", () => {
  it("commits with the editor as author and moves master", async () => {
    const opened = (await store.readFile("content/faqs/pages/a.json"))!;
    const result = await store.commit([{ path: opened.path, text: '{"x":2}\n', expectedSha: opened.sha }], "Update Page FAQs: a", priya);
    expect(gh.head).toBe(result.sha);
    expect(gh.file("content/faqs/pages/a.json")).toBe('{"x":2}\n');
    expect(gh.commits.get(result.sha)!.author).toMatchObject(priya);
    expect(gh.commits.get(result.sha)!.message).toBe("Update Page FAQs: a");
    expect(result.url).toContain(result.sha);
  });

  it("stops with the other editor's name if the file changed after it was opened", async () => {
    const opened = (await store.readFile("content/faqs/pages/a.json"))!;
    gh.push("content/faqs/pages/a.json", '{"x":9}\n', "Rahul");
    const err = await store.commit([{ path: opened.path, text: '{"x":2}\n', expectedSha: opened.sha }], "m", priya).catch((e) => e);
    expect(err).toBeInstanceOf(ConflictError);
    expect(err.message).toMatch(/edited by Rahul at/);
    expect(gh.file("content/faqs/pages/a.json")).toBe('{"x":9}\n');
  });

  it("retries when master moves during the save, keeping the other person's change", async () => {
    const opened = (await store.readFile("content/faqs/pages/a.json"))!;
    gh.beforeNextRefUpdate = () => gh.push("content/faqs/pages/b.json", '{"y":3}\n', "Rahul");
    await store.commit([{ path: opened.path, text: '{"x":2}\n', expectedSha: opened.sha }], "m", priya);
    expect(gh.file("content/faqs/pages/a.json")).toBe('{"x":2}\n');
    expect(gh.file("content/faqs/pages/b.json")).toBe('{"y":3}\n');
  });

  it("catches a concurrent edit to the same file even when it lands mid-save", async () => {
    const opened = (await store.readFile("content/faqs/pages/a.json"))!;
    gh.beforeNextRefUpdate = () => gh.push("content/faqs/pages/a.json", '{"x":9}\n', "Rahul");
    await expect(store.commit([{ path: opened.path, text: '{"x":2}\n', expectedSha: opened.sha }], "m", priya)).rejects.toBeInstanceOf(ConflictError);
    expect(gh.file("content/faqs/pages/a.json")).toBe('{"x":9}\n');
  });

  it("creates a new file only if it still does not exist", async () => {
    await store.commit([{ path: "content/faqs/pages/c.json", text: "{}\n", expectedSha: null }], "m", priya);
    expect(gh.file("content/faqs/pages/c.json")).toBe("{}\n");
    await expect(store.commit([{ path: "content/faqs/pages/c.json", text: "{}\n", expectedSha: null }], "m", priya)).rejects.toBeInstanceOf(ConflictError);
  });
});
