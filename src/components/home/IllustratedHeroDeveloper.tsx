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
      onMouseLeave={() => setActiveTooltip(null)}
    >
      {/* Outer Paper Frame */}
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

        {/* 2D Animated Character Canvas */}
        <div
          className={`relative aspect-[16/9] w-full overflow-hidden transition-colors duration-500 ${
            isDeskHero ? "bg-[#1a1816]" : "bg-[#f4f1ea]"
          }`}
        >
          {/* Subtle warm paper grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(15,18,23,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,18,23,0.06) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Transparent 2D Cartoon Avatar with Breathing Idle Animation */}
          <div
            className="relative h-full w-full"
            style={{
              animation: isDeskHero
                ? undefined
                : "avatar-breathe 4s ease-in-out infinite",
            }}
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
                  : "object-contain p-2 drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] group-hover:scale-105"
              }`}
            />
          </div>

          {/* ROLE-SPECIFIC DYNAMIC ANIMATION OVERLAYS */}
          {/* 1. AI Engineering: Animated Pulsing Energy Leash & Companion Bot Rings */}
          {activeRole === "ai" && (
            <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
              <svg className="h-full w-full" viewBox="0 0 400 225" fill="none">
                {/* Glowing Laser Tether */}
                <path
                  d="M175,130 C220,110 260,140 310,95"
                  stroke="#22d3ee"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  className="animate-[laser-dash_1.2s_linear_infinite]"
                  filter="drop-shadow(0 0 6px #22d3ee)"
                />
                <circle cx="310" cy="95" r="5" fill="#ea1d0f" className="animate-ping" />
              </svg>
              <div
                className="absolute right-[16%] top-[34%] h-14 w-14 rounded-full border border-cyan-400/40"
                style={{ animation: "pulse-ring 2.5s infinite" }}
              />
            </div>
          )}

          {/* 2. Backend Systems: Flowing Data Pulses & Server Activity LEDs */}
          {activeRole === "backend" && (
            <div className="pointer-events-none absolute inset-0 z-10">
              {/* Blinking Rack LEDs */}
              <div className="absolute right-[22%] top-[35%] flex flex-col gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-[pulse_1.2s_infinite]" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-[pulse_0.8s_infinite]" />
              </div>
              {/* Flowing Fiber Line */}
              <div className="absolute left-[30%] bottom-[25%] right-[25%] h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-amber-400 opacity-60 animate-[pulse_2s_infinite]" />
            </div>
          )}

          {/* 3. Data Science: Holographic Data Prism Refraction & Floating Metrics */}
          {activeRole === "ds" && (
            <div className="pointer-events-none absolute inset-0 z-10">
              <div
                className="absolute left-[44%] top-[36%] h-20 w-20 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(34,211,238,0.35) 0%, rgba(167,139,250,0.2) 50%, transparent 70%)",
                  animation: "hologram-glow 3.5s ease-in-out infinite",
                }}
              />
              {/* Drifting Causal Data Points */}
              <div className="absolute left-[48%] top-[30%] h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              <div className="absolute left-[54%] top-[42%] h-1 w-1 rounded-full bg-amber-400 animate-ping" style={{ animationDelay: "0.7s" }} />
            </div>
          )}

          {/* 4. ML Systems: Neural Network Synapse Rings & YOLO Detection Bounding Box */}
          {activeRole === "ml" && (
            <div className="pointer-events-none absolute inset-0 z-10">
              {/* Animated YOLOv8 Bounding Box */}
              <div className="absolute right-[22%] top-[28%] h-16 w-20 rounded-sm border-2 border-emerald-400/80 bg-emerald-400/10 font-mono text-[8px] text-emerald-400 px-1 py-0.5 animate-pulse">
                <span>[0.98 vehicle]</span>
              </div>
              <div
                className="absolute right-[28%] top-[35%] h-12 w-12 rounded-full border border-purple-400/50"
                style={{ animation: "pulse-ring 2s infinite" }}
              />
            </div>
          )}

          {/* Desk Mode Interactive Hotspots */}
          {isDeskHero && (
            <div className="absolute inset-0 z-20 pointer-events-auto">
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

          {/* Role Activity Badge */}
          {!isDeskHero && (
            <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 rounded-full border border-[#0f1217]/14 bg-white/90 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#0f1217] shadow-xs backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>2D ANIMATED CUTOUT</span>
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
