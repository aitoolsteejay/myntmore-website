"use client";

import { useState } from "react";

interface SubmitButtonProps {
  children: string;
  submittingLabel?: string;
  className?: string;
}

/**
 * Drop-in replacement for a plain `<button type="submit">` inside any of the
 * site's hand-rolled Zoho lead forms. These forms are real HTML POSTs (no
 * fetch/AJAX), so a slow connection makes it easy to double-click and fire
 * two full submissions with no dedupe on the receiving end. This checks
 * native form validity before disabling itself, so it never blocks a
 * legitimately-invalid submission the browser is about to reject anyway.
 * Works inside both client and server-rendered forms since it only needs
 * its own client-side state, not a handler on the parent <form>.
 */
export default function SubmitButton({ children, submittingLabel = "Submitting…", className = "btn-dark w-full py-4 text-sm font-bold" }: SubmitButtonProps) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <button
      type="submit"
      disabled={submitting}
      onClick={(e) => {
        const form = e.currentTarget.closest("form");
        // Disable only AFTER the browser has started the submission. Disabling the
        // button inside the click handler (React flushes the state update
        // synchronously for real user clicks) makes the browser cancel the submit,
        // which left every form stuck on "Submitting…" with nothing sent.
        if (form && form.checkValidity()) setTimeout(() => setSubmitting(true), 0);
      }}
      className={`${className} disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {submitting ? submittingLabel : children}
    </button>
  );
}
