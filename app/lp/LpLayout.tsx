"use client";

import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export function useFadeInOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)";
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#F8F6F2" }}>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
