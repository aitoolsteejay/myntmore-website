"use client";

import { useState } from "react";

const FIELD = "mt-1 w-full rounded-lg border border-[#E8E2D9] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#A14A08] focus:ring-2 focus:ring-[#F5B731]/40";

export default function ChangePassword({ min }: { min: number }) {
  const [form, setForm] = useState({ current: "", next: "", again: "" });
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.next !== form.again) return setNotice({ ok: false, text: "The two new passwords are not the same." });
    setBusy(true);
    setNotice(null);
    const res = await fetch("/api/admin/account", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ current: form.current, next: form.next }) }).catch(() => null);
    const body = await res?.json().catch(() => null);
    setBusy(false);
    if (res?.ok) {
      setForm({ current: "", next: "", again: "" });
      return setNotice({ ok: true, text: body?.message ?? "Password changed." });
    }
    setNotice({ ok: false, text: body?.error ?? "Could not change the password." });
  }

  return (
    <form onSubmit={submit} className="mt-6 max-w-sm space-y-4 rounded-xl border border-[#E8E2D9] bg-white p-5">
      <label className="block text-sm font-semibold">
        Current password
        <input type="password" required autoComplete="current-password" value={form.current} onChange={(e) => setForm({ ...form, current: e.target.value })} className={FIELD} />
      </label>
      <label className="block text-sm font-semibold">
        New password <span className="font-normal text-[#71675E]">(at least {min} characters)</span>
        <input type="password" required minLength={min} autoComplete="new-password" value={form.next} onChange={(e) => setForm({ ...form, next: e.target.value })} className={FIELD} />
      </label>
      <label className="block text-sm font-semibold">
        New password again
        <input type="password" required minLength={min} autoComplete="new-password" value={form.again} onChange={(e) => setForm({ ...form, again: e.target.value })} className={FIELD} />
      </label>
      {notice && (
        <p role="status" className={`text-sm ${notice.ok ? "text-[#166534]" : "text-[#9F1D1D]"}`}>
          {notice.text}
        </p>
      )}
      <button disabled={busy} className="w-full rounded-lg bg-[#0A0A0A] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">
        {busy ? "Changing…" : "Change password"}
      </button>
    </form>
  );
}
