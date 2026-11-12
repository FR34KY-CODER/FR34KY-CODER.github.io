"use client";

import React, { useEffect, useState } from "react";
import { scrollToSectionId } from "@/lib/navigation";
import { ArrowDown } from "lucide-react";

const CHAPTERS = [
  { id: "two-sides", num: "01", label: "Two Sides · 4 Roles" },
  { id: "the-street", num: "02", label: "The Street · Live Builds" },
  { id: "the-factory", num: "03", label: "The Factory · Bench" },
  { id: "under-the-hood", num: "04", label: "Under The Hood · Dossier" },
  { id: "missions", num: "05", label: "Missions · Role Spec" },
  { id: "both-sides", num: "06", label: "The Finale · Engage" },
];

export function ChapterRail() {
  const [activeId, setActiveId] = useState<string>("two-sides");

  useEffect(() => {
    const updateActive = () => {
      const vh = window.innerHeight || 800;
      let current = CHAPTERS[0].id;
      for (const ch of CHAPTERS) {
        const el = document.getElementById(ch.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 0.45) {
          current = ch.id;
        }
      }
      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  return (
    <aside
      aria-label="Chapter progress rail"
      className="chapter-rail fixed right-3 sm:right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex flex-col items-end gap-2"
    >
      <div className="flex flex-col items-end gap-1.5 rounded-2xl border border-[#f4f1ea]/15 bg-[#0f1217]/82 px-2.5 py-3 text-[#f4f1ea] shadow-xl backdrop-blur-md">
        {CHAPTERS.map((ch) => {
          const isActive = activeId === ch.id;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => scrollToSectionId(ch.id)}
              title={ch.label}
              className="group flex items-center gap-2 py-1 text-right font-mono text-[12px] tracking-[0.14em] uppercase transition-all"
            >
              <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap text-[#f4f1ea] opacity-0 transition-all duration-200 group-hover:max-w-[160px] group-hover:opacity-100">
                {ch.label.split("·")[0].trim()}
              </span>
              <span
                className="font-bold tabular-nums transition-colors"
                style={{
                  color: isActive
                    ? "var(--role-accent-night, #ea1d0f)"
                    : "rgba(244,241,234,0.45)",
                }}
              >
                {ch.num}
              </span>
              <span
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 18 : 6,
                  backgroundColor: isActive
                    ? "var(--role-accent-night, #ea1d0f)"
                    : "rgba(244,241,234,0.28)",
                }}
              />
            </button>
          );
        })}

        <div className="my-1 h-px w-full bg-[#f4f1ea]/12" />

        <button
          type="button"
          onClick={() => scrollToSectionId("both-sides")}
          aria-label="Skip to contact section"
          className="inline-flex items-center gap-1 font-mono text-[12px] font-semibold tracking-[0.14em] text-[#f4f1ea]/70 uppercase hover:text-[var(--role-accent-night)] transition-colors"
        >
          <span>Skip</span>
          <ArrowDown size={11} />
        </button>
      </div>
    </aside>
  );
}

