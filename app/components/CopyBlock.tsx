"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { textTone } from "@/lib/colors";


export default function CopyBlock({ text, accent = "#0a0a0a", label = "Copy into Claude", successMessage = "Prompt copied to clipboard" }: { text: string; accent?: string; label?: string; successMessage?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(successMessage);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden" style={{ border: "1px solid #E8E2D9", backgroundColor: "#F8F6F2" }}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid #E8E2D9", backgroundColor: "#FEF9EC" }}>
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: textTone(accent) }}>{label}</span>
        <button
          onClick={handleCopy}
          className="flex min-h-[44px] items-center gap-1.5 text-xs font-bold rounded-md px-3.5 py-2 transition-colors hover:bg-[#F8F6F2]"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E2D9", color: "#0A0A0A" }}
          aria-label={`Copy ${label}`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" style={{ color: textTone(accent) }} />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="px-4 py-4 text-[13px] leading-relaxed overflow-x-auto whitespace-pre-wrap" style={{ color: "#3D3D3D", fontFamily: "var(--font-mono, ui-monospace, monospace)" }}>
        {text}
      </pre>
    </div>
  );
}
