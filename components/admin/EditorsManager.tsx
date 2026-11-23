"use client";

// The Editors page: add people, change their role, set a new password, remove or restore access. The server checks
// that the signed-in person is an admin for every action (app/api/admin/editors/route.ts).
import { useState } from "react";
import type { Role } from "@/lib/admin/auth";
import type { EditorRow } from "@/lib/admin/editors";

const FIELD = "rounded-lg border border-[#E8E2D9] bg-white px-3 py-2 text-sm outline-none focus:border-[#A14A08] focus:ring-2 focus:ring-[#F5B731]/40";

type Notice = { kind: "ok" | "warn" | "error"; text: string; password?: string } | null;

function PasswordBox({ password }: { password: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <span className="mt-2 flex flex-wrap items-center gap-2">
      <code className="rounded-lg border border-[#E8E2D9] bg-white px-3 py-1.5 font-mono text-base text-[#0A0A0A]">{password}</code>
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(password).then(() => setCopied(true))}
        className="rounded-lg border border-[#C9BFB2] bg-white px-3 py-1.5 text-sm font-semibold hover:border-[#A14A08]"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="w-full text-[13px]">This password is shown only once. They can change it under their name, top right, after signing in.</span>
    </span>
  );
}

export default function EditorsManager({ initial, roles, me }: { initial: EditorRow[]; roles: { value: Role; label: string; help: string }[]; me: string }) {
  const [rows, setRows] = useState(initial);
  const [form, setForm] = useState({ email: "", name: "", role: "editor" as Role, password: "" });
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);

  async function call(key: string, body: Record<string, unknown>, apply?: (r: EditorRow[]) => EditorRow[]) {
    setBusy(key);
    setNotice(null);
    const res = await fetch("/api/admin/editors", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).catch(() => null);
    const data = await res?.json().catch(() => null);
    setBusy(null);
    if (!res || !data) return setNotice({ kind: "error", text: "Could not reach the server. Nothing was changed." }), false;
    if (!res.ok) return setNotice({ kind: "error", text: data.error ?? "Could not save." }), false;
    if (apply) setRows(apply);
    setNotice(data.warning ? { kind: "warn", text: `${data.message} ${data.warning}` } : { kind: "ok", text: data.message, password: data.password });
    return true;
  }

  async function invite(e: React.FormEvent) {
    e.preventDefault();
    const email = form.email.trim().toLowerCase();
    const ok = await call("invite", { action: "invite", ...form, email }, (r) => {
      const row: EditorRow = { email, name: form.name.trim(), role: form.role, allowed_types: null, active: true, created_at: new Date().toISOString() };
      return [...r.filter((x) => x.email !== email), row].sort((a, b) => a.email.localeCompare(b.email));
    });
    if (ok) setForm({ email: "", name: "", role: form.role, password: "" });
  }

  const update = (email: string, patch: Partial<Pick<EditorRow, "role" | "active">>) =>
    call(`${email}:${Object.keys(patch)[0]}`, { action: "update", email, ...patch }, (r) => r.map((x) => (x.email === email ? { ...x, ...patch } : x)));

  const active = rows.filter((r) => r.active);
  const removed = rows.filter((r) => !r.active);

  return (
    <div className="mt-6 space-y-8">
      <form onSubmit={invite} className="rounded-xl border border-[#E8E2D9] bg-white p-4">
        <h2 className="font-bold">Add someone</h2>
        <p className="mt-0.5 text-[13px] text-[#71675E]">
          If they already have a Myntmore login, they sign in with their usual password. If not, a login is created and you get a password to send them.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-[2fr_1.4fr_1fr_auto] sm:items-end">
          <label className="text-sm font-semibold">
            Work email
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@myntmore.com" className={`${FIELD} mt-1 w-full font-normal`} />
          </label>
          <label className="text-sm font-semibold">
            Name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Shown in the activity log" className={`${FIELD} mt-1 w-full font-normal`} />
          </label>
          <label className="text-sm font-semibold">
            Role
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })} className={`${FIELD} mt-1 w-full font-normal`}>
              {roles.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
          <button disabled={busy === "invite"} className="rounded-lg bg-[#0A0A0A] px-4 py-2 text-sm font-bold text-white disabled:opacity-50">
            {busy === "invite" ? "Adding…" : "Add"}
          </button>
        </div>
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer font-semibold text-[#52525B]">Choose their password yourself (optional)</summary>
          <label className="mt-2 block max-w-sm text-[13px] text-[#71675E]">
            Only used if they don&apos;t have a Myntmore login yet. Leave empty and one is made up for you.
            <input type="text" autoComplete="off" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={`${FIELD} mt-1 w-full font-mono`} />
          </label>
        </details>
        <p className="mt-2 text-[13px] text-[#71675E]">{roles.map((r) => `${r.label}: ${r.help.toLowerCase()}`).join(". ")}.</p>
      </form>

      {notice && (
        <p
          role="status"
          className={`rounded-lg border p-3 text-sm ${
            notice.kind === "ok" ? "border-[#BBE5C8] bg-[#ECFDF3] text-[#166534]" : notice.kind === "warn" ? "border-[#F5D9A8] bg-[#FEF9EC] text-[#8A4B08]" : "border-[#F5C2C0] bg-[#FDECEA] text-[#9F1D1D]"
          }`}
        >
          {notice.text}
          {notice.password && <PasswordBox password={notice.password} />}
        </p>
      )}

      <section>
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#71675E]">Has access ({active.length})</h2>
        <ul className="mt-3 divide-y divide-[#E8E2D9] rounded-xl border border-[#E8E2D9] bg-white">
          {active.map((r) => (
            <li key={r.email} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  {r.name || r.email}
                  {r.email === me && <span className="ml-2 rounded-full bg-[#F8F6F2] px-2 py-0.5 text-xs text-[#71675E]">you</span>}
                </p>
                <p className="truncate font-mono text-xs text-[#71675E]">{r.email}</p>
              </div>
              <select
                aria-label={`Role for ${r.email}`}
                value={r.role}
                disabled={busy !== null}
                onChange={(e) => update(r.email, { role: e.target.value as Role })}
                className={FIELD}
              >
                {roles.map((x) => (
                  <option key={x.value} value={x.value}>
                    {x.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                disabled={busy !== null}
                onClick={() =>
                  window.confirm(`Set a new password for ${r.email}? Their current password stops working, here and in other Myntmore tools that use the same login.`) &&
                  call(`${r.email}:password`, { action: "password", email: r.email })
                }
                className="text-sm font-semibold text-[#A14A08] hover:underline disabled:opacity-50"
              >
                Set new password
              </button>
              {r.email !== me && (
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() => window.confirm(`Remove access for ${r.email}? Their past changes stay in the activity log.`) && update(r.email, { active: false })}
                  className="text-sm font-semibold text-[#9F1D1D] hover:underline disabled:opacity-50"
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      {removed.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#71675E]">Access removed ({removed.length})</h2>
          <ul className="mt-3 divide-y divide-[#E8E2D9] rounded-xl border border-[#E8E2D9] bg-white text-[#71675E]">
            {removed.map((r) => (
              <li key={r.email} className="flex flex-wrap items-center gap-4 px-4 py-3">
                <span className="min-w-0 flex-1 truncate">
                  {r.name || r.email} <span className="font-mono text-xs">{r.email}</span>
                </span>
                <button type="button" disabled={busy !== null} onClick={() => update(r.email, { active: true })} className="text-sm font-semibold text-[#A14A08] hover:underline disabled:opacity-50">
                  Restore access
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
