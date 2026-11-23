"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import JsonLd from "../../../components/JsonLd";
import { buildBreadcrumbSchema, SITE_URL } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import pageCopy from "@/content/page-copy/guideAiTechStackJewellery.json";

// This page's text is edited in the admin ("AI Tech Stack for Jewellery Brands") and lives in content/page-copy/guideAiTechStackJewellery.json.
const copy = pageCopy;

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Resources", url: `${SITE_URL}/resources` },
  { name: "Guides", url: `${SITE_URL}/resources/guides` },
  { name: "AI Tech Stack for Jewellery Brands", url: `${SITE_URL}/resources/guides/ai-tech-stack-jewellery` },
]);

/* ─── DATA ─────────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "photo", icon: "📸", color: "#FCE7F3", accent: "#DB2777", textAccent: "#9D174D",
    title: copy.s01.t01,
    subtitle: copy.s01.t02,
    tools: [
      { name: copy.s01.t03, what: copy.s01.t04, free: "Free/Paid" },
      { name: copy.s01.t05, what: copy.s01.t06, free: "Free/Paid" },
      { name: copy.s01.t07, what: copy.s01.t08, free: "Free/Paid" },
      { name: copy.s01.t09, what: copy.s01.t10, free: "Paid" },
      { name: copy.s01.t11, what: copy.s01.t12, free: "Paid" },
      { name: copy.s01.t13, what: copy.s01.t14, free: "Free/Paid" },
      { name: copy.s01.t15, what: copy.s01.t16, free: "Paid" },
      { name: copy.s01.t17, what: copy.s01.t18, free: "Free" },
      { name: copy.s01.t19, what: copy.s01.t20, free: "Free/Paid" },
      { name: copy.s01.t21, what: copy.s01.t22, free: "Free/Paid" },
      { name: copy.s01.t23, what: copy.s01.t24, free: "Free/Paid" },
      { name: copy.s01.t25, what: copy.s01.t26, free: "Free/Paid" },
    ],
  },
  {
    id: "video", icon: "🎬", color: "#EDE9FE", accent: "#7C3AED", textAccent: "#4C1D95",
    title: copy.s01.t27,
    subtitle: copy.s01.t28,
    tools: [
      { name: copy.s01.t29, what: copy.s01.t30, free: "Free" },
      { name: copy.s01.t31, what: copy.s01.t32, free: "Free/Paid" },
      { name: copy.s01.t33, what: copy.s01.t34, free: "Free/Paid" },
      { name: copy.s01.t35, what: copy.s01.t36, free: "Free/Paid" },
      { name: copy.s01.t37, what: copy.s01.t38, free: "Free/Paid" },
      { name: copy.s01.t39, what: copy.s01.t40, free: "Free/Paid" },
      { name: copy.s01.t41, what: copy.s01.t42, free: "Paid" },
      { name: copy.s01.t43, what: copy.s01.t44, free: "Free/Paid" },
      { name: copy.s01.t45, what: copy.s01.t46, free: "Free/Paid" },
    ],
  },
  {
    id: "content", icon: "✍️", color: "#FEF3C7", accent: "#D97706", textAccent: "#92400E",
    title: copy.s01.t47,
    subtitle: copy.s01.t48,
    tools: [
      { name: copy.s01.t49, what: copy.s01.t50, free: "Free/Paid" },
      { name: copy.s01.t51, what: copy.s01.t52, free: "Free/Paid" },
      { name: copy.s01.t53, what: copy.s01.t54, free: "Free" },
      { name: copy.s01.t55, what: copy.s01.t56, free: "Free/Paid" },
      { name: copy.s01.t57, what: copy.s01.t58, free: "Free/Paid" },
      { name: copy.s01.t59, what: copy.s01.t60, free: "Free/Paid" },
      { name: copy.s01.t61, what: copy.s01.t62, free: "Free/Paid" },
      { name: copy.s01.t63, what: copy.s01.t64, free: "Free" },
      { name: copy.s01.t65, what: copy.s01.t66, free: "Paid" },
    ],
  },
  {
    id: "linkedin", icon: "💼", color: "#DBEAFE", accent: "#2563EB", textAccent: "#1E40AF",
    title: copy.s01.t67,
    subtitle: copy.s01.t68,
    tools: [
      { name: copy.s01.t69, what: copy.s01.t70, free: "Free" },
      { name: copy.s01.t71, what: copy.s01.t72, free: "Paid" },
      { name: copy.s01.t73, what: copy.s01.t74, free: "Free/Paid" },
      { name: copy.s01.t75, what: copy.s01.t76, free: "Free" },
      { name: copy.s01.t77, what: copy.s01.t78, free: "Paid" },
      { name: copy.s01.t79, what: copy.s01.t80, free: "Free/Paid" },
      { name: copy.s01.t81, what: copy.s01.t82, free: "Paid" },
      { name: copy.s01.t83, what: copy.s01.t84, free: "Free/Paid" },
    ],
  },
  {
    id: "website", icon: "🌐", color: "#D1FAE5", accent: "#059669", textAccent: "#065F46",
    title: copy.s01.t85,
    subtitle: copy.s01.t86,
    tools: [
      { name: copy.s01.t87, what: copy.s01.t88, free: "Free/Paid" },
      { name: copy.s01.t89, what: copy.s01.t90, free: "Paid" },
      { name: copy.s01.t91, what: copy.s01.t92, free: "Free/Paid" },
      { name: copy.s01.t93, what: copy.s01.t94, free: "Paid" },
      { name: copy.s01.t95, what: copy.s01.t96, free: "Free/Paid" },
      { name: copy.s01.t97, what: copy.s01.t98, free: "Free/Paid" },
      { name: copy.s01.t99, what: copy.s01.t100, free: "Paid" },
      { name: copy.s01.t101, what: copy.s01.t102, free: "Free" },
    ],
  },
  {
    id: "social", icon: "📱", color: "#FFF7ED", accent: "#EA580C", textAccent: "#7C2D12",
    title: copy.s01.t103,
    subtitle: copy.s01.t104,
    tools: [
      { name: copy.s01.t105, what: copy.s01.t106, free: "Free/Paid" },
      { name: copy.s01.t107, what: copy.s01.t108, free: "Free/Paid" },
      { name: copy.s01.t109, what: copy.s01.t110, free: "Free/Paid" },
      { name: copy.s01.t111, what: copy.s01.t112, free: "Free/Paid" },
      { name: copy.s01.t113, what: copy.s01.t114, free: "Free/Paid" },
      { name: copy.s01.t115, what: copy.s01.t116, free: "Free/Paid" },
    ],
  },
  {
    id: "whatsapp", icon: "💬", color: "#DCFCE7", accent: "#16A34A", textAccent: "#14532D",
    title: copy.s01.t117,
    subtitle: copy.s01.t118,
    tools: [
      { name: copy.s01.t119, what: copy.s01.t120, free: "Free" },
      { name: copy.s01.t121, what: copy.s01.t122, free: "Paid" },
      { name: copy.s01.t123, what: copy.s01.t124, free: "Paid" },
      { name: copy.s01.t125, what: copy.s01.t126, free: "Free/Paid" },
      { name: copy.s01.t127, what: copy.s01.t128, free: "Paid" },
      { name: copy.s01.t129, what: copy.s01.t130, free: "Paid" },
    ],
  },
  {
    id: "email", icon: "📧", color: "#CCFBF1", accent: "#0D9488", textAccent: "#134E4A",
    title: copy.s01.t131,
    subtitle: copy.s01.t132,
    tools: [
      { name: copy.s01.t133, what: copy.s01.t134, free: "Free/Paid" },
      { name: copy.s01.t135, what: copy.s01.t136, free: "Free/Paid" },
      { name: copy.s01.t137, what: copy.s01.t138, free: "Free/Paid" },
      { name: copy.s01.t139, what: copy.s01.t140, free: "Free/Paid" },
      { name: copy.s01.t141, what: copy.s01.t142, free: "Free/Paid" },
      { name: copy.s01.t143, what: copy.s01.t144, free: "Free/Paid" },
      { name: copy.s01.t145, what: copy.s01.t146, free: "Paid" },
    ],
  },
  {
    id: "seo", icon: "🔍", color: "#ECFDF5", accent: "#15803D", textAccent: "#14532D",
    title: copy.s01.t147,
    subtitle: copy.s01.t148,
    tools: [
      { name: copy.s01.t149, what: copy.s01.t150, free: "Free" },
      { name: copy.s01.t151, what: copy.s01.t152, free: "Free" },
      { name: copy.s01.t153, what: copy.s01.t154, free: "Free" },
      { name: copy.s01.t155, what: copy.s01.t156, free: "Free/Paid" },
      { name: copy.s01.t157, what: copy.s01.t158, free: "Free/Paid" },
      { name: copy.s01.t159, what: copy.s01.t160, free: "Paid" },
      { name: copy.s01.t161, what: copy.s01.t162, free: "Free" },
      { name: copy.s01.t163, what: copy.s01.t164, free: "Paid" },
    ],
  },
  {
    id: "crm", icon: "🗂️", color: "#FEE2E2", accent: "#DC2626", textAccent: "#7F1D1D",
    title: copy.s01.t165,
    subtitle: copy.s01.t166,
    tools: [
      { name: copy.s01.t167, what: copy.s01.t168, free: "Free/Paid" },
      { name: copy.s01.t169, what: copy.s01.t170, free: "Free/Paid" },
      { name: copy.s01.t171, what: copy.s01.t172, free: "Free/Paid" },
      { name: copy.s01.t173, what: copy.s01.t174, free: "Paid" },
      { name: copy.s01.t175, what: copy.s01.t176, free: "Free/Paid" },
      { name: copy.s01.t177, what: copy.s01.t178, free: "Free/Paid" },
    ],
  },
  {
    id: "ecommerce", icon: "🛍️", color: "#FFF7ED", accent: "#C2410C", textAccent: "#7C2D12",
    title: copy.s01.t179,
    subtitle: copy.s01.t180,
    tools: [
      { name: copy.s01.t181, what: copy.s01.t182, free: "Paid" },
      { name: copy.s01.t183, what: copy.s01.t184, free: "Free/Paid" },
      { name: copy.s01.t185, what: copy.s01.t186, free: "Free/Paid" },
      { name: copy.s01.t187, what: copy.s01.t188, free: "Free/Paid" },
      { name: copy.s01.t189, what: copy.s01.t190, free: "Free" },
      { name: copy.s01.t191, what: copy.s01.t192, free: "Free/Paid" },
      { name: copy.s01.t193, what: copy.s01.t194, free: "Paid" },
      { name: copy.s01.t195, what: copy.s01.t196, free: "Varies" },
    ],
  },
  {
    id: "research", icon: "🧠", color: "#F5F3FF", accent: "#6D28D9", textAccent: "#3B0764",
    title: copy.s01.t197,
    subtitle: copy.s01.t198,
    tools: [
      { name: copy.s01.t199, what: copy.s01.t200, free: "Free/Paid" },
      { name: copy.s01.t201, what: copy.s01.t202, free: "Free" },
      { name: copy.s01.t203, what: copy.s01.t204, free: "Free/Paid" },
      { name: copy.s01.t205, what: copy.s01.t206, free: "Free" },
      { name: copy.s01.t207, what: copy.s01.t208, free: "Free/Paid" },
      { name: copy.s01.t209, what: copy.s01.t210, free: "Paid" },
    ],
  },
  {
    id: "productivity", icon: "⚡", color: "#FFFBEB", accent: "#A14A08", textAccent: "#78350F",
    title: copy.s01.t211,
    subtitle: copy.s01.t212,
    tools: [
      { name: copy.s01.t213, what: copy.s01.t214, free: "Free/Paid" },
      { name: copy.s01.t215, what: copy.s01.t216, free: "Free/Paid" },
      { name: copy.s01.t217, what: copy.s01.t218, free: "Free/Paid" },
      { name: copy.s01.t219, what: copy.s01.t220, free: "Free/Paid" },
      { name: copy.s01.t221, what: copy.s01.t222, free: "Free/Paid" },
      { name: copy.s01.t223, what: copy.s01.t224, free: "Free/Paid" },
      { name: copy.s01.t225, what: copy.s01.t226, free: "Free/Paid" },
      { name: copy.s01.t227, what: copy.s01.t228, free: "Free/Paid" },
    ],
  },
  {
    id: "ads", icon: "🎯", color: "#FEF2F2", accent: "#E11D48", textAccent: "#881337",
    title: copy.s01.t229,
    subtitle: copy.s01.t230,
    tools: [
      { name: copy.s01.t231, what: copy.s01.t232, free: "Free to use" },
      { name: copy.s01.t233, what: copy.s01.t234, free: "Paid" },
      { name: copy.s01.t235, what: copy.s01.t236, free: "Paid" },
      { name: copy.s01.t237, what: copy.s01.t238, free: "Paid" },
      { name: copy.s01.t239, what: copy.s01.t240, free: "Free/Paid" },
    ],
  },
];

/* ─── HOOKS ─────────────────────────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useInView(threshold = 0.1) {
  const ref = useRef<any>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let rafId: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target, duration]);
  return val;
}

/* ─── COMPONENTS ────────────────────────────────────────────────────── */
function FreeBadge({ type }: { type: string }) {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    Free: { bg: "#D1FAE5", color: "#065F46", label: copy.s01.t241 },
    Paid: { bg: "#FEE2E2", color: "#991B1B", label: copy.s01.t242 },
    "Free/Paid": { bg: "#FEF3C7", color: "#92400E", label: copy.s01.t243 },
  };
  const s = styles[type] || styles["Free/Paid"];
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ backgroundColor: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

function StatCard({ n, label, color, bg, delay }: { n: number; label: string; color: string; bg: string; delay: number }) {
  const { ref, inView } = useInView(0.2);
  const val = useCountUp(n, inView);
  return (
    <div
      ref={ref}
      className="rounded-2xl p-6 border flex flex-col gap-1"
      style={{
        backgroundColor: bg,
        borderColor: "#E8E2D9",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <div className="text-4xl font-black tabular-nums" style={{ color: textTone(color) }}>{val}+</div>
      <div className="text-xs font-semibold" style={{ color: "#71675E" }}>{label}</div>
    </div>
  );
}

function CategoryOverviewCard({ cat, index, active, onClick }: {
  cat: typeof CATEGORIES[0]; index: number; active: boolean; onClick: () => void;
}) {
  const { ref, inView } = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-left rounded-2xl p-4 border transition-all"
      style={{
        backgroundColor: active || hovered ? cat.color : "#ffffff",
        borderColor: active ? cat.accent : hovered ? cat.accent + "66" : "#E8E2D9",
        boxShadow: active ? `0 8px 24px ${cat.accent}33` : hovered ? `0 4px 12px ${cat.accent}22` : "none",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 35}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 35}ms, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease`,
      }}
    >
      <div className="text-2xl mb-2" style={{ display: "inline-block", transform: hovered || active ? "scale(1.15)" : "scale(1)", transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)" }}>{cat.icon}</div>
      <div className="text-xs font-black leading-tight mb-1" style={{ color: "#0a0a0a" }}>{cat.title}</div>
      <div className="text-xs font-bold" style={{ color: "#52525B" }}>{cat.tools.length}{copy.s01.t244}</div>
    </button>
  );
}

function ToolRow({ tool, index, globalNum, accent, color }: {
  tool: { name: string; what: string; free: string };
  index: number; globalNum: number; accent: string; color: string;
}) {
  const { ref, inView } = useInView(0.05);
  const [hovered, setHovered] = useState(false);
  return (
    <tr
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: "1px solid #F8F6F2",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-16px)",
        transition: `opacity 0.45s ease ${index * 30}ms, transform 0.45s cubic-bezier(0.22,1,0.36,1) ${index * 30}ms`,
        backgroundColor: hovered ? color + "55" : "transparent",
      }}
    >
      <td className="px-6 py-3.5 text-xs font-black w-10" style={{ color: "#71675E" }}>{globalNum}</td>
      <td className="px-4 py-3.5 font-black text-sm" style={{ color: hovered ? textTone(accent) : "#0a0a0a", whiteSpace: "nowrap", transition: "color 0.15s ease" }}>{tool.name}</td>
      <td className="px-4 py-3.5 text-sm leading-relaxed" style={{ color: "#52525B" }}>{tool.what}</td>
      <td className="px-4 py-3.5"><FreeBadge type={tool.free} /></td>
    </tr>
  );
}

function CategorySection({ cat, globalStart, search }: {
  cat: typeof CATEGORIES[0] & { subtitle?: string }; globalStart: number; search: string;
}) {
  const { ref, inView } = useInView(0.05);
  const [open, setOpen] = useState(true);
  const filtered = search
    ? cat.tools.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.what.toLowerCase().includes(search.toLowerCase()))
    : cat.tools;

  if (search && filtered.length === 0) return null;

  return (
    <div
      ref={ref}
      className="print-section rounded-2xl overflow-hidden border"
      style={{
        borderColor: "#E8E2D9",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full px-6 py-5 flex items-center gap-4 text-left transition-opacity hover:opacity-90"
        style={{ backgroundColor: cat.color }}
      >
        <span className="text-2xl flex-shrink-0">{cat.icon}</span>
        <div className="flex-1 min-w-0">
          <h2 className="font-black text-base sm:text-lg" style={{ color: "#0a0a0a" }}>{cat.title}</h2>
          {cat.subtitle && !search && <p className="text-xs mt-0.5 font-medium" style={{ color: cat.textAccent }}>{cat.subtitle}</p>}
          {search && <p className="text-xs mt-0.5" style={{ color: cat.textAccent }}>{filtered.length}{copy.s01.t245}{cat.tools.length}{copy.s01.t246}</p>}
        </div>
        <span className="text-xs font-black px-3 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: "rgba(0,0,0,0.1)", color: "#0a0a0a" }}>
          {cat.tools.length}{copy.s01.t247}</span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={cat.textAccent} strokeWidth="2.5" strokeLinecap="round"
          style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Table */}
      <div style={{ maxHeight: open ? "9999px" : "0", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ backgroundColor: "#ffffff" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EBE3" }}>
                <th className="text-left px-6 py-3 text-xs font-black uppercase tracking-widest" style={{ color: "#71675E" }}>#</th>
                <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest" style={{ color: "#71675E" }}>{copy.s01.t248}</th>
                <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest" style={{ color: "#71675E" }}>{copy.s01.t249}</th>
                <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest" style={{ color: "#71675E" }}>{copy.s01.t250}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tool, i) => (
                <ToolRow
                  key={tool.name}
                  tool={tool}
                  index={i}
                  globalNum={globalStart + cat.tools.indexOf(tool)}
                  accent={cat.accent}
                  color={cat.color}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────── */
export default function GIATechStackPage() {
  const [search, setSearch] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState("all");
  const { ref: heroRef, inView: heroIn } = useInView(0.1);
  const { ref: overviewRef, inView: overviewIn } = useInView(0.05);

  const totalFree = CATEGORIES.flatMap(c => c.tools).filter(t => t.free === "Free").length;
  const totalFreePaid = CATEGORIES.flatMap(c => c.tools).filter(t => t.free === "Free/Paid").length;

  const visibleCats: typeof CATEGORIES = activeFilter === "all"
    ? CATEGORIES
    : CATEGORIES.filter(c => c.id === activeFilter);

  const getGlobalStart = useCallback((catIndex: number) => {
    let n = 1;
    CATEGORIES.slice(0, catIndex).forEach(c => { n += c.tools.length; });
    return n;
  }, []);

  return (
    <>
      <style>{`
        @media print {
          /* ── Reset ── */
          *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body { background: #ffffff !important; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

          /* ── Hide UI chrome ── */
          .no-print { display: none !important; }

          /* ── Page setup ── */
          @page { size: A4; margin: 18mm 14mm; }
          @page :first { margin-top: 12mm; }

          /* ── Print cover header ── */
          .print-header { display: block !important; }

          /* ── Layout ── */
          .min-h-screen { min-height: unset !important; background: white !important; }
          .px-6 { padding-left: 0 !important; padding-right: 0 !important; }
          .pt-20, .pt-16 { padding-top: 0 !important; }
          .pb-12, .pb-24 { padding-bottom: 8px !important; }
          .max-w-5xl { max-width: 100% !important; }

          /* ── Stats grid ── */
          .grid { display: grid !important; }
          .grid-cols-2 { grid-template-columns: repeat(2, 1fr) !important; }
          .sm\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr) !important; }
          .gap-4 { gap: 6px !important; }

          /* ── Category sections ── */
          .rounded-2xl { border-radius: 8px !important; }
          .flex-col { gap: 8px !important; }

          /* ── Tables ── */
          table { width: 100% !important; border-collapse: collapse !important; font-size: 9.5pt !important; }
          thead tr { background-color: #F8F6F2 !important; }
          th { padding: 6px 10px !important; font-size: 8pt !important; font-weight: 800 !important; text-transform: uppercase; letter-spacing: 0.08em; color: #71675E !important; border-bottom: 1px solid #E8E2D9 !important; }
          td { padding: 6px 10px !important; vertical-align: top; border-bottom: 1px solid #F5F2EE !important; }

          /* ── Page breaks ── */
          .print-section { page-break-inside: avoid; break-inside: avoid; margin-bottom: 14px !important; }
          thead { display: table-header-group; }

          /* ── Opacity overrides (animations set opacity:0 on scroll) ── */
          * { opacity: 1 !important; transform: none !important; transition: none !important; animation: none !important; }

          /* ── Collapsed sections: force open ── */
          [style*="max-height: 0"] { max-height: none !important; overflow: visible !important; }
          [style*="max-height:0"] { max-height: none !important; overflow: visible !important; }

          /* ── Hero section ── */
          h1 { font-size: 28pt !important; margin-bottom: 6px !important; line-height: 1.15 !important; -webkit-text-fill-color: #0a0a0a !important; background: none !important; }
          p { font-size: 10pt !important; }
        }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 0 0 rgba(245,183,49,0)} 50%{box-shadow:0 0 0 8px rgba(245,183,49,0.12)} }
        .search-input:focus { border-color: #D97706 !important; box-shadow: 0 0 0 3px rgba(245,183,49,0.15) !important; outline: none; }
      `}</style>

      <div className="min-h-screen" style={{ backgroundColor: "#F8F6F2" }}>
        <JsonLd data={BREADCRUMB_SCHEMA} />

        {/* ── Nav ── */}
        <nav className="no-print sticky top-0 z-50 border-b px-6 py-4 flex items-center justify-between"
          style={{ backgroundColor: "rgba(248,246,242,0.96)", backdropFilter: "blur(16px)", borderColor: "#E8E2D9" }}>
          <a href="/" className="inline-flex min-h-[44px] items-center"><Image src="/logo.png" alt={copy.s01.t251} width={130} height={36} className="h-9 w-auto object-contain" /></a>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs font-semibold" style={{ color: "#71675E" }}>{copy.s01.t252}</span>
            <button
              onClick={() => window.print()}
              className="no-print flex min-h-[44px] items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm"
              style={{ backgroundColor: "#F5B731", color: "#0A0A0A", transition: "transform 0.15s ease, box-shadow 0.15s ease", animation: "pulseGlow 3s ease-in-out infinite" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>{copy.s01.t253}</button>
          </div>
        </nav>

        <main id="main-content">

        {/* ── Print-only cover ── */}
        <div className="print-header" style={{ display: "none", borderBottom: "3px solid #F5B731", paddingBottom: 16, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#0a0a0a", letterSpacing: "-0.02em" }}>{copy.s01.t254}</div>
              <div style={{ fontSize: 11, color: "#71675E", marginTop: 2 }}>{copy.s01.t255}</div>
            </div>
            <div style={{ fontSize: 10, color: "#71675E", textAlign: "right" }}>{copy.s01.t256}</div>
          </div>
        </div>

        {/* ── Hero ── */}
        <div
          ref={heroRef}
          className="px-6 pt-20 pb-12 max-w-5xl mx-auto"
          style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
            style={{ backgroundColor: "rgba(245,183,49,0.12)", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
            <span style={{ animation: "float 2.2s ease-in-out infinite", display: "inline-block" }}>💎</span>{copy.s01.t257}</div>

          <h1 className="text-5xl sm:text-7xl font-black leading-none mb-6 tracking-tight" style={{ color: "#0a0a0a" }}>{copy.s01.t258}<br />
            <span style={{
              background: "linear-gradient(90deg, #A14A08, #F5B731, #D97706, #F5B731, #A14A08)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}>{copy.s01.t259}</span>
          </h1>

          <p className="text-xl leading-relaxed max-w-2xl mb-12" style={{ color: "#52525B" }}>{copy.s01.t260}</p>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard n={106} label="Total Tools" color="#0a0a0a" bg="#ffffff" delay={0} />
            <StatCard n={14} label="Categories" color="#D97706" bg="#FEF9EC" delay={80} />
            <StatCard n={totalFree + totalFreePaid} label="Free or Freemium" color="#059669" bg="#D1FAE5" delay={160} />
            <StatCard n={8} label="Day 1 Starter Tools" color="#7C3AED" bg="#EDE9FE" delay={240} />
          </div>
        </div>

        {/* ── Category overview grid ── */}
        <div ref={overviewRef} className="no-print px-6 pb-8 max-w-5xl mx-auto">
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "#71675E", opacity: overviewIn ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}>{copy.s01.t261}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <button
              onClick={() => setActiveFilter("all")}
              className="text-left rounded-2xl p-4 border transition-all"
              style={{
                backgroundColor: activeFilter === "all" ? "#F5B731" : "#ffffff",
                borderColor: activeFilter === "all" ? "#F5B731" : "#E8E2D9",
                color: "#0a0a0a",
                opacity: overviewIn ? 1 : 0,
                transform: overviewIn ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.5s ease 0s, transform 0.5s ease 0s, background-color 0.2s, border-color 0.2s",
              }}
            >
              <div className="text-2xl mb-2">🗂</div>
              <div className="text-xs font-black">{copy.s01.t262}</div>
              <div className="text-xs font-bold mt-0.5" style={{ color: activeFilter === "all" ? "#3D3D3D" : "#71675E" }}>{copy.s01.t263}</div>
            </button>
            {CATEGORIES.map((cat, i) => (
              <CategoryOverviewCard
                key={cat.id}
                cat={cat}
                index={i + 1}
                active={activeFilter === cat.id}
                onClick={() => setActiveFilter(activeFilter === cat.id ? "all" : cat.id)}
              />
            ))}
          </div>
        </div>

        {/* ── Search ── */}
        <div className="no-print px-6 pb-8 max-w-5xl mx-auto">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8B0A7" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder={copy.s01.t264}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input w-full pl-12 pr-12 py-4 rounded-2xl border text-sm font-medium"
              style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", color: "#0a0a0a", transition: "border-color 0.2s, box-shadow 0.2s" }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#E8E2D9" }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#52525B" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>
          {search && (
            <p className="mt-3 text-sm" style={{ color: "#71675E" }}>{copy.s01.t265}<strong style={{ color: "#0a0a0a" }}>"{search}"</strong>: {CATEGORIES.flatMap(c => c.tools).filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.what.toLowerCase().includes(search.toLowerCase())).length}{copy.s01.t266}</p>
          )}
        </div>

        {/* ── Tool sections ── */}
        <div className="px-6 pb-24 max-w-5xl mx-auto flex flex-col gap-5">
          {visibleCats.map((cat) => {
            const globalIdx = CATEGORIES.findIndex(c => c.id === cat.id);
            return (
              <CategorySection
                key={cat.id}
                cat={cat}
                globalStart={getGlobalStart(globalIdx)}
                search={search}
              />
            );
          })}
          {search && visibleCats.every(c => !c.tools.some(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.what.toLowerCase().includes(search.toLowerCase()))) && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-black text-lg" style={{ color: "#0a0a0a" }}>{copy.s01.t267}{search}"</p>
              <p className="text-sm mt-2" style={{ color: "#71675E" }}>{copy.s01.t268}</p>
            </div>
          )}
        </div>

        {/* ── Starter Pack ── */}
        <div className="px-6 pb-16 max-w-5xl mx-auto">
          <div className="rounded-2xl p-8 border-2" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.4)" }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">⭐</span>
              <div>
                <h2 className="font-black text-xl" style={{ color: "#0a0a0a" }}>{copy.s02.t01}</h2>
                <p className="text-sm" style={{ color: "#71675E" }}>{copy.s02.t02}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: "📸", name: copy.s02.t03, why: copy.s02.t04 },
                { icon: "🎨", name: copy.s02.t05, why: copy.s02.t06 },
                { icon: "🎬", name: copy.s02.t07, why: copy.s02.t08 },
                { icon: "🤖", name: copy.s02.t09, why: copy.s02.t10 },
                { icon: "💬", name: copy.s02.t11, why: copy.s02.t12 },
                { icon: "📍", name: copy.s02.t13, why: copy.s02.t14 },
                { icon: "📧", name: copy.s02.t15, why: copy.s02.t16 },
                { icon: "📅", name: copy.s02.t17, why: copy.s02.t18 },
              ].map((t) => (
                <div key={t.name} className="rounded-xl p-4" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(245,183,49,0.25)" }}>
                  <div className="text-xl mb-2">{t.icon}</div>
                  <div className="font-black text-sm" style={{ color: "#0a0a0a" }}>{t.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#71675E" }}>{t.why}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        </main>

        {/* ── Footer CTA ── */}
        <div className="no-print border-t px-6 py-20 text-center" style={{ borderColor: "rgba(245,183,49,0.35)", backgroundColor: "#FEF9EC" }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ backgroundColor: "rgba(245,183,49,0.15)", color: "#A14A08", border: "1px solid rgba(245,183,49,0.35)" }}>{copy.s02.t19}</div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 leading-tight" style={{ color: "#0A0A0A" }}>{copy.s03.t01}<br />{copy.s04.t01}</h2>
          <p className="mb-10 text-base max-w-md mx-auto" style={{ color: "#52525B" }}>{copy.s04.t02}</p>
          <a
            href="/book-a-call"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-base"
            style={{ backgroundColor: "#F5B731", color: "#0a0a0a", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 32px rgba(245,183,49,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
          >{copy.s04.t03}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>

          {/* This page renders its own nav rather than InnerLayout, so without
              these it is a crawl dead-end: nothing links back into the site. */}
          <nav className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-0 text-sm" aria-label="More from Myntmore">
            <a href="/" className="inline-flex min-h-[44px] items-center" style={{ color: "#52525B" }}>{copy.s04.t04}</a>
            <a href="/resources/guides" className="inline-flex min-h-[44px] items-center" style={{ color: "#52525B" }}>{copy.s04.t05}</a>
            <a href="/resources" className="inline-flex min-h-[44px] items-center" style={{ color: "#52525B" }}>{copy.s04.t06}</a>
            <a href="/services" className="inline-flex min-h-[44px] items-center" style={{ color: "#52525B" }}>{copy.s04.t07}</a>
            <a href="/case-studies" className="inline-flex min-h-[44px] items-center" style={{ color: "#52525B" }}>{copy.s04.t08}</a>
          </nav>
          <p className="mt-6 text-sm" style={{ color: "#52525B" }}>{copy.s04.t09}{" "}
            <a href="tel:+918169318951" className="font-semibold underline" style={{ color: "#A14A08" }}>{copy.s04.t10}</a>
          </p>
        </div>

      </div>
    </>
  );
}
