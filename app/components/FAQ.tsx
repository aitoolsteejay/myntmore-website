"use client";

import { useState } from "react";
import { FAQ_ITEMS, type FAQItem } from "@/lib/faq-data";
import home from "@/content/site-copy/home.json";

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ item, isOpen, onToggle, index }: AccordionItemProps) {
  return (
    <div
      className={`border rounded-xl transition-all duration-300 ${
        isOpen
          ? "border-[rgba(245,183,49,0.4)]"
          : "hover:border-neutral-300"
      }`}
      style={
        isOpen
          ? { backgroundColor: "#FEF9EE", borderColor: "rgba(245,183,49,0.4)", borderLeftColor: "#F5B731", borderLeftWidth: "3px" }
          : { backgroundColor: "#FFFFFF", borderColor: "#E8E2D9" }
      }
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span
          className={`text-base font-semibold transition-colors duration-200 pr-4 ${
            isOpen ? "text-[#0a0a0a]" : "text-neutral-700 group-hover:text-[#0a0a0a]"
          }`}
        >
          {item.question}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
          style={{
            background: isOpen ? "rgba(245,183,49,0.15)" : "#F4F4F5",
            border: isOpen
              ? "1px solid rgba(245,183,49,0.4)"
              : "1px solid #E4E4E7",
          }}
          aria-hidden="true"
        >
          <svg
            className="w-3.5 h-3.5"
            style={{ color: isOpen ? "#A14A08" : "#71675E" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </span>
      </button>

      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className={`accordion-content px-6 ${isOpen ? "open pb-6" : ""}`}
      >
        <p className="text-[#52525B] text-sm leading-relaxed">{item.answer}</p>
        {item.links && (
          <div className="flex flex-wrap gap-2 mt-4">
            {item.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="min-h-[44px] text-xs font-semibold px-4 py-2 rounded-full border transition-colors duration-150 hover:border-[#F5B731]"
                style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#3D3D3D" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#F8F6F2" }}
      aria-labelledby="faq-heading"
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4 px-3 py-1 rounded-full border"
            style={{
              color: "#A14A08",
              borderColor: "rgba(245,183,49,0.35)",
              background: "#FEF9EC",
            }}
          >
            {home.faqSection.eyebrow}
          </span>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight"
          >
            {home.faqSection.heading}
          </h2>
          <p className="mt-4 text-[#52525B] text-lg">
            {home.faqSection.intro}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              index={i}
            />
          ))}
        </div>

        {/* Still have questions nudge */}
        <div className="mt-12 text-center">
          <p className="text-neutral-600 text-sm mb-4">
            {home.faqSection.nudge}
          </p>
          <a
            href="/book-a-call"
            className="btn-ghost px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
          >
            {home.faqSection.link}
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
