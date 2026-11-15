"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Terminal, Cpu, Coffee, Headphones } from "lucide-react";

interface IllustratedHeroDeveloperProps {
  activeRole?: string;
  className?: string;
}

const ROLE_IMAGE_MAP: Record<string, string> = {
  all: "/images/developer-hero.jpg",
  ai: "/images/avatars/avatar-ai.png",
  backend: "/images/avatars/avatar-backend.png",
  ds: "/images/avatars/avatar-ds.png",
  ml: "/images/avatars/avatar-ml.png",
  assistant: "/images/avatars/avatar-assistant.png",
  bicycle: "/images/avatars/avatar-bicycle.png",
};

const ROLE_STATUS_MAP: Record<
  string,
  { label: string; tag: string; color: string; sub: string }
> = {
  all: {
    label: "FOUR DISCIPLINES UNDER ONE HOOD",
    tag: "LIVE BATTESTATION",
    color: "#ea1d0f",
    sub: "Dual-monitor desk · Async agents & production servers",
  },
  ai: {
    label: "ORCHESTRATING MULTI-AGENT SWARMS",
    tag: "AI ENGINEERING · TETHERED AGENT",
    color: "#ea1d0f",
    sub: "Energy-tethered companion bot · Structured RAG & legal evals",
  },
  backend: {
    label: "TRANSACTIONAL QUEUES & ASYNC PIPELINES",
    tag: "BACKEND ARCHITECTURE · SERVER OPS",
    color: "#ea1d0f",
    sub: "Fiber-optic pipelines · 4,000+ req/s & Redis distributed locks",
  },
  ds: {
    label: "CAUSAL INFERENCE & CANONICAL CONTRACTS",
    tag: "DATA SCIENCE · DATA PRISM",
    color: "#0284c7",
    sub: "Holographic data prism · Databricks ORDM & counterfactuals",
  },
  ml: {
    label: "DEEP TIME-SERIES & DETERMINISTIC INFERENCE",
    tag: "ML SYSTEMS · NEURAL MECHANIC",
    color: "#8b5cf6",
    sub: "Neural core calibration · YOLOv8 edge vision & tensor serving",
  },
};

export function IllustratedHeroDeveloper({
  activeRole = "all",
  className = "",
}: IllustratedHeroDeveloperProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const status = ROLE_STATUS_MAP[activeRole] ?? ROLE_STATUS_MAP.all;
  const imageSrc = ROLE_IMAGE_MAP[activeRole] ?? ROLE_IMAGE_MAP.all;
  const isDeskHero = activeRole === "all";

  return (
    <div
      className={`group relative flex flex-col items-center select-none ${className}`}
      onMouseLeave={() => {
        setActiveTooltip(null);
      }}
    >
      {/* Outer Editorial Paper Frame */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-[#0f1217]/12 bg-[#ffffff] shadow-sm transition-all duration-500 hover:shadow-xl hover:border-[#ea1d0f]/50">
        {/* Window Header Strip (devinthehood minimal style) */}
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

        {/* 2D Cartoon Character Canvas */}
        <div
          className={`relative aspect-[16/9] w-full overflow-hidden transition-colors duration-500 ${
            isDeskHero ? "bg-[#1a1816]" : "bg-[#f4f1ea]"
          }`}
        >
          <Image
            key={imageSrc}
            src={imageSrc}
            alt={`Ojasvi Goyal — ${status.tag}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            className={`transition-all duration-700 ease-out ${
              isDeskHero
                ? "object-cover object-center group-hover:scale-[1.02]"
                : "object-contain p-2 group-hover:scale-105"
            }`}
          />

          {/* Ambient Lighting Gradient Overlays */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen opacity-35 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${status.color}33 0%, transparent 65%)`,
            }}
          />

          {/* Interactive Hotspots for the Desk Workstation */}
          {isDeskHero && (
            <div className="absolute inset-0 z-20 pointer-events-auto">
              {/* Code Monitor */}
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

              {/* Observability Dashboard */}
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

              {/* Coffee Mug */}
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

              {/* Headphones */}
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
          )}

          {/* Active Tooltip Popover */}
          {activeTooltip && (
            <div className="absolute bottom-3 left-3 right-3 z-30 rounded-lg border border-white/20 bg-black/85 px-3 py-1.5 text-center font-mono text-[11px] text-[#f4f1ea] shadow-lg backdrop-blur-md animate-[fadeIn_0.15s_ease-out]">
              {activeTooltip}
            </div>
          )}

          {/* Role Activity Overlay for non-desk mode */}
          {!isDeskHero && (
            <div className="absolute top-2.5 right-2.5 z-20 rounded-md border border-black/10 bg-white/90 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#0f1217] shadow-xs backdrop-blur-xs">
              2D NANO AVATAR
            </div>
          )}
        </div>

        {/* Bottom Status Ticker */}
        <div className="flex items-center justify-between border-t border-[#0f1217]/8 bg-[#ffffff] px-3.5 py-2">
          <div className="flex items-center gap-2">
            <Sparkles size={12} style={{ color: status.color }} />
            <div>
              <div className="font-mono text-[11px] font-bold text-[#0f1217]">
                {status.label}
              </div>
              <div className="font-mono text-[9px] text-[#0f1217]/60">
                {status.sub}
              </div>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#0f1217]/50 uppercase hidden sm:inline">
            OJASVI GOYAL · @FR34KY-CODER
          </span>
        </div>
      </div>
    </div>
  );
}
