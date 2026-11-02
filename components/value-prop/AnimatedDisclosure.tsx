"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AnimatedDisclosureProps {
  title: string;
  meta: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const INK = "#0A0A0A";
const MUTED = "#71675E";
const LINE = "#E8E2D9";

export default function AnimatedDisclosure({
  title,
  meta,
  children,
  defaultOpen = false,
}: AnimatedDisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="group rounded-2xl border bg-white overflow-hidden transition-shadow duration-300 hover:shadow-sm"
      style={{ borderColor: LINE }}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 transition-colors duration-200 hover:bg-[#FAF8F5]"
      >
        <span className="min-w-0 pr-2">
          <span className="block text-sm font-bold" style={{ color: INK }}>
            {title}
          </span>
          <span className="block text-xs mt-0.5" style={{ color: MUTED }}>
            {meta}
          </span>
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-colors"
          style={{ borderColor: LINE, color: MUTED, backgroundColor: open ? "#FEF9EC" : "#FFFFFF" }}
          aria-hidden="true"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t px-5 pb-6 pt-5 sm:px-6" style={{ borderColor: LINE }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
