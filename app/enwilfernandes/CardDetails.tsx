"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./card-details.module.css";

const choices = [
  {
    label: "Finding the right buyers",
    tip: "Start with five customers who bought the same service. Look for a trigger they shared before they bought, like a new sales hire or a market launch. Use that trigger to narrow your next account list.",
  },
  {
    label: "Getting replies",
    tip: "Open with one thing you noticed about the company. Connect it to a problem you can help with, then ask one question they can answer in a sentence.",
  },
  {
    label: "Turning replies into calls",
    tip: "Answer the prospect’s question first. Then suggest two times for a short call and say what you’ll cover so they know what they’re agreeing to.",
  },
];

export function OutboundQuiz() {
  const [selected, setSelected] = useState<number>();

  return (
    <section className="relative z-10 mt-4 w-full max-w-sm rounded-3xl border border-[#E8E2D9] bg-white p-5 text-[#0a0a0a] sm:p-6">
      <fieldset>
        <legend className="mb-3 text-lg font-bold tracking-tight">Where’s your pipeline getting stuck?</legend>
        <div className="grid gap-2">
          {choices.map(({ label }, index) => (
            <label key={label} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-[#E8E2D9] px-3 py-2 text-sm font-semibold hover:border-[#C38B16] has-[:checked]:border-[#C38B16] has-[:checked]:bg-[#FEF9EC]">
              <input
                type="radio"
                name="outbound-bottleneck"
                autoComplete="off"
                className="size-4 shrink-0 accent-[#A86900]"
                checked={selected === index}
                onClick={() => setSelected(index)}
                onChange={() => setSelected(index)}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <div role="status" aria-atomic="true">
        {selected !== undefined && (
          <div className="mt-4 rounded-xl border-l-2 border-[#D99C23] bg-[#FEF9EC] p-3 text-sm leading-relaxed text-[#3D3D3D]">
            <p className="mb-1 font-bold">Enwil’s tip</p>
            <p>{choices[selected].tip}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export function SignatureMark() {
  const started = useRef(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    try {
      const key = "myntmore:enwil-signature-seen";
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
      setAnimate(true);
    } catch {
      // The static mark is visible when session storage is unavailable.
    }
  }, []);

  return <span aria-hidden="true" className={styles.mark} data-animate={animate} />;
}
