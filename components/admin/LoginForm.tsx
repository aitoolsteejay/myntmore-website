"use client";

import { useState } from "react";

export default function LoginForm({ next }: { next: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError("");
    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, next }),
    }).catch(() => null);
    if (res?.ok) return setState("sent");
    const body = await res?.json().catch(() => null);
    setError(body?.error ?? "Could not send the link. Check your connection and try again.");
    setState("error");
  }

  if (state === "sent") {
    return (
      <div role="status" className="mt-8 rounded-xl border border-[#E8E2D9] bg-white p-5 text-sm leading-relaxed text-[#52525B]">
        <p className="font-bold text-[#0A0A0A]">Check your email</p>
        <p className="mt-1">If {email} has admin access, a sign-in link is on its way. It works once and expires after an hour.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-3">
      <label htmlFor="admin-email" className="block text-sm font-semibold">
        Email
      </label>
      <input
        id="admin-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg border border-[#E8E2D9] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#A14A08] focus:ring-2 focus:ring-[#F5B731]/40"
        placeholder="you@myntmore.com"
      />
      {error && (
        <p role="alert" className="text-sm text-[#9F1D1D]">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full rounded-lg bg-[#0A0A0A] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}
