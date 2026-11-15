"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Terminal, Cpu, Coffee, Headphones } from "lucide-react";

interface IllustratedHeroDeveloperProps {
  activeRole?: string;
  className?: string;
}

const ROLE_STATUS_MAP: Record<
  string,
  { label: string; tag: string; color: string }
> = {
  all: {
    label: "FOUR DISCIPLINES UNDER ONE HOOD",
    tag: "LIVE BATTESTATION",
    color: "#ea1d0f",
  },
  ai: {
    label: "ORCHESTRATING MULTI-AGENT SWARMS",
    tag: "AI ENGINEERING",
    color: "#ea1d0f",
  },
  backend: {
    label: "TRANSACTIONAL QUEUES & ASYNC PIPELINES",
    tag: "BACKEND ARCHITECTURE",
    color: "#ea1d0f",
  },
  ds: {
    label: "CAUSAL INFERENCE & CANONICAL CONTRACTS",
    tag: "DATA SCIENCE",
    color: "#0284c7",
  },
  ml: {
    label: "DEEP TIME-SERIES & DETERMINISTIC INFERENCE",
    tag: "ML SYSTEMS",
    color: "#8b5cf6",
  },
};

export function IllustratedHeroDeveloper({
  activeRole = "all",
  className = "",
}: IllustratedHeroDeveloperProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const status = ROLE_STATUS_MAP[activeRole] ?? ROLE_STATUS_MAP.all;

  return (
    <div
      className={`group relative flex flex-col items-center select-none ${className}`}
    >
      {/* Outer Editorial Paper Frame */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-[#0f1217]/12 bg-[#ffffff] shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Subtle Window Header Strip (devinthehood minimal style) */}
        <div className="flex items-center justify-between border-b border-[#0f1217]/8 bg-[#f4f1ea] px-3.5 py-1.5 font-mono text-[10px] text-[#0f1217]/70">
          <div className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: status.color }}
            />
            <span className="font-bold tracking-wider uppercase text-[#0f1217]">
              {status.tag}
            </span>
          </div>
          <span className="tracking-tight text-[9px] uppercase text-[#0f1217]/60">
            JAIPUR, IN · 26.91°N 75.78°E
          </span>
        </div>

        {/* Illustrated Developer Canvas */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1a1816]">
          <Image
            src="/images/developer-hero.jpg"
            alt="Ojasvi Goyal (FR34KY-CODER) — Illustrated Developer at dual-monitor workstation desk"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />

          {/* Ambient Lighting Gradient Overlays */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen opacity-35"
            style={{
              background: `radial-gradient(circle at 35% 45%, ${status.color}33 0%, transparent 60%)`,
            }}
          />

          {/* Code Monitor Subtle Scanline / Pulse (Left Screen) */}
          <div className="pointer-events-none absolute left-[15%] top-[28%] h-[35%] w-[24%] rounded-sm bg-cyan-400/[0.04] backdrop-contrast-125">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/[0.08] to-transparent animate-[pulse_3s_ease-in-out_infinite]" />
          </div>

          {/* Observability Dashboard Subtle Pulse (Right Screen) */}
          <div className="pointer-events-none absolute left-[40%] top-[29%] h-[32%] w-[20%] rounded-sm bg-purple-400/[0.04]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/[0.06] to-transparent animate-[pulse_4s_ease-in-out_infinite]" />
          </div>

          {/* Mechanical Keyboard Underglow (Desk area) */}
          <div
            className="pointer-events-none absolute left-[35%] top-[72%] h-[12%] w-[22%] blur-md opacity-40 transition-colors duration-500"
            style={{ backgroundColor: status.color }}
          />

          {/* Interactive Inspection Hotspots (Visible on hover) */}
          <div className="absolute inset-0 z-20 pointer-events-auto">
            {/* Hotspot 1: Code Monitor */}
            <button
              type="button"
              onMouseEnter={() =>
                setActiveTooltip("VS Code / Neovim · Multi-agent Python & TypeScript engines")
              }
              onMouseLeave={() => setActiveTooltip(null)}
              aria-label="Inspect Code Editor"
              className="absolute left-[20%] top-[38%] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-85 hover:scale-110 hover:border-white transition-all cursor-pointer"
            >
              <Terminal size={11} />
            </button>

            {/* Hotspot 2: Observability Dashboard */}
            <button
              type="button"
              onMouseEnter={() =>
                setActiveTooltip("Observability · Causal telemetry, Databricks & latency tracking")
              }
              onMouseLeave={() => setActiveTooltip(null)}
              aria-label="Inspect Observability Dashboard"
              className="absolute left-[47%] top-[39%] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-85 hover:scale-110 hover:border-white transition-all cursor-pointer"
            >
              <Cpu size={11} />
            </button>

            {/* Hotspot 3: Coffee Mug */}
            <button
              type="button"
              onMouseEnter={() =>
                setActiveTooltip("Ceramic Mug · Filter coffee fueling late-night releases")
              }
              onMouseLeave={() => setActiveTooltip(null)}
              aria-label="Inspect Coffee"
              className="absolute left-[55%] top-[64%] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-85 hover:scale-110 hover:border-white transition-all cursor-pointer"
            >
              <Coffee size={11} />
            </button>

            {/* Hotspot 4: Headphones */}
            <button
              type="button"
              onMouseEnter={() =>
                setActiveTooltip("Over-ear Headphones · Lo-fi beats & uninterrupted focus")
              }
              onMouseLeave={() => setActiveTooltip(null)}
              aria-label="Inspect Headphones"
              className="absolute left-[70%] top-[53%] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-85 hover:scale-110 hover:border-white transition-all cursor-pointer"
            >
              <Headphones size={11} />
            </button>
          </div>

          {/* Active Tooltip Popover */}
          {activeTooltip && (
            <div className="absolute bottom-3 left-3 right-3 z-30 rounded-lg border border-white/20 bg-black/85 px-3 py-1.5 text-center font-mono text-[11px] text-[#f4f1ea] shadow-lg backdrop-blur-md animate-[fadeIn_0.15s_ease-out]">
              {activeTooltip}
            </div>
          )}
        </div>

        {/* Bottom Status Ticker */}
        <div className="flex items-center justify-between border-t border-[#0f1217]/8 bg-[#ffffff] px-3.5 py-2">
          <div className="flex items-center gap-2">
            <Sparkles size={12} style={{ color: status.color }} />
            <span className="font-mono text-[11px] font-semibold text-[#0f1217]">
              {status.label}
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#0f1217]/50 uppercase">
            OJASVI GOYAL · @FR34KY-CODER
          </span>
        </div>
      </div>
    </div>
  );
}
