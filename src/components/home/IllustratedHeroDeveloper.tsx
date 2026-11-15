"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { PuppetDeveloperAvatar } from "./PuppetDeveloperAvatar";

interface IllustratedHeroDeveloperProps {
  activeRole?: string;
  className?: string;
}

const ROLE_IMAGE_MAP: Record<string, string> = {
  all: "/images/hero-anime-desk.jpg",
  ai: "/images/avatars/avatar-ai.png",
  backend: "/images/avatars/avatar-backend.png",
  ds: "/images/avatars/avatar-ds.png",
  ml: "/images/avatars/avatar-ml.png",
  assistant: "/images/avatars/avatar-assistant.png",
  bicycle: "/images/avatars/cyclist-frame-1.png",
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
  const status = ROLE_STATUS_MAP[activeRole] ?? ROLE_STATUS_MAP.all;
  const imageSrc = ROLE_IMAGE_MAP[activeRole] ?? ROLE_IMAGE_MAP.all;
  const isDeskHero = activeRole === "all";

  return (
    <div
      className={`group relative flex flex-col items-center select-none ${className}`}
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

          {/* 2D Cartoon Character: Active Puppet for AI, Transparent Image Cutout for others, Desk Battlestation for All */}
          {activeRole === "ai" ? (
            <div className="relative h-full w-full flex items-center justify-center p-2">
              <PuppetDeveloperAvatar
                activeRole="ai"
                isWaving
                showCompanionBot
                className="h-full w-auto max-h-[92%] drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
              />
            </div>
          ) : (
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
          )}

          {/* Role Activity Badge */}
          {!isDeskHero && (
            <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 rounded-full border border-[#0f1217]/14 bg-white/90 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#0f1217] shadow-xs backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>2D ANIME AVATAR</span>
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
