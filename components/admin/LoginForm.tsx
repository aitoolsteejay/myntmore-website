"use client";

import { useState } from "react";

const FIELD = "w-full rounded-lg border border-[#E8E2D9] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#A14A08] focus:ring-2 focus:ring-[#F5B731]/40";

export default function LoginForm({ next }: { next: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).catch(() => null);
    if (res?.ok) return window.location.assign(next);
    const body = await res?.json().catch(() => null);
    setError(body?.error ?? "Could not sign in. Check your connection and try again.");
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-4">
      <div>
        <label htmlFor="admin-email" className="block text-sm font-semibold">
          Email
        </label>
        <input id="admin-email" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={`${FIELD} mt-1`} placeholder="you@myntmore.com" />
      </div>
      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="admin-password" className="block text-sm font-semibold">
            Password
          </label>
          <button type="button" onClick={() => setShow(!show)} className="text-xs font-semibold text-[#A14A08] hover:underline">
            {show ? "Hide" : "Show"}
          </button>
        </div>
        <input
          id="admin-password"
          type={show ? "text" : "password"}
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${FIELD} mt-1`}
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-[#9F1D1D]">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className="w-full rounded-lg bg-[#0A0A0A] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">
        {busy ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-[13px] text-[#71675E]">Forgot your password? Ask an admin to set a new one for you.</p>
    </form>
  );
}
