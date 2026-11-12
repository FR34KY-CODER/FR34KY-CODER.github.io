"use client";

import React, { useId } from "react";
import { DevMood } from "@/context/RoleContext";

interface DevBotAvatarProps {
  mood: DevMood;
  accentColor?: string;
  secondaryAccent?: string;
  badgeText?: string;
  rotationDeg?: number;
  className?: string;
}

export function DevBotAvatar({
  mood,
  accentColor = "#EA1D0F",
  secondaryAccent = "#22D3EE",
  badgeText = "OG · 4X",
  rotationDeg = 0,
  className = "",
}: DevBotAvatarProps) {
  const id = useId();
  const isOrbit = mood === "orbit";
  const isAi = mood === "ai-leash";
  const isMl = mood === "ml-mechanic";
  const isBackend = mood === "backend-ops";
  const isDs = mood === "ds-graph";
  const isDesk = mood === "desk-chat";
  const isBike = mood === "bicycle";
  const isGrad = mood === "graduation";

  return (
    <svg
      viewBox="0 0 360 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`Ojasvi developer avatar in ${mood} mode`}
      role="img"
    >
      <defs>
        <radialGradient id={`${id}-halo`} cx="50%" cy="42%" r="48%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.34" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="14" height="14" patternUnits="userSpaceOnUse">
          <path
            d="M 14 0 L 0 0 0 14"
            fill="none"
            stroke={accentColor}
            strokeWidth="0.6"
            strokeOpacity="0.28"
          />
        </pattern>
        <clipPath id={`${id}-right-half`}>
          <rect x="180" y="0" width="180" height="360" />
        </clipPath>
      </defs>

      {/* Halo glow */}
      <circle cx="180" cy="175" r="148" fill={`url(#${id}-halo)`} />

      {/* ORBIT / ALL-4 RINGS */}
      {(isOrbit || isAi || isMl || isBackend || isDs) && (
        <g className="devbot-orbit-rings">
          <ellipse
            cx="180"
            cy="170"
            rx="150"
            ry="52"
            transform="rotate(-14 180 170)"
            stroke={accentColor}
            strokeWidth="1.2"
            strokeDasharray="5 6"
            strokeOpacity="0.45"
          />
          <ellipse
            cx="180"
            cy="170"
            rx="150"
            ry="52"
            transform="rotate(14 180 170)"
            stroke={secondaryAccent}
            strokeWidth="1"
            strokeDasharray="3 7"
            strokeOpacity="0.38"
          />
        </g>
      )}

      {/* GRADUATION CAP (Factory Mode) */}
      {isGrad && (
        <g className="devbot-grad-cap" transform="translate(180 56)">
          <polygon points="0,-24 62,-4 0,16 -62,-4" fill="#181c24" stroke="#FFB547" strokeWidth="2.5" />
          <path d="M-32 4 V22 C-32 30 32 30 32 22 V4" fill="#0f1217" stroke="#FFB547" strokeWidth="1.8" />
          {/* Tassel */}
          <path d="M44 0 L52 34" stroke="#FFB547" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="52" cy="36" r="5" fill="#FFB547" />
        </g>
      )}

      {/* MAIN HOODED DEVELOPER SILHOUETTE */}
      <g transform={isBike ? "translate(0,-22) scale(0.84) translate(34,26)" : undefined}>
        {/* Left solid coat */}
        <path
          d="M180 62 C130 62 100 100 102 154 L96 202 C74 218 62 248 58 302 L58 320 L180 320 Z"
          fill="#0f1217"
          stroke="#f4f1ea"
          strokeOpacity="0.28"
          strokeWidth="1.6"
        />
        {/* Inner hood */}
        <path
          d="M180 80 C142 80 120 112 122 154 C124 188 148 206 180 208 Z"
          fill="#181d26"
        />
        {/* Right neural wireframe half */}
        <g clipPath={`url(#${id}-right-half)`}>
          <path
            d="M180 62 C230 62 260 100 258 154 L264 202 C286 218 298 248 302 302 L302 320 L180 320 Z"
            fill="#11161f"
          />
          <path
            d="M180 62 C230 62 260 100 258 154 L264 202 C286 218 298 248 302 302 L302 320 L180 320 Z"
            fill={`url(#${id}-grid)`}
          />
          <path
            d="M180 62 C230 62 260 100 258 154 L264 202 C286 218 298 248 302 302 L302 320"
            stroke={accentColor}
            strokeWidth="2.4"
          />
          <path
            d="M180 80 C218 80 240 112 238 154 C236 188 212 206 180 208"
            stroke={accentColor}
            strokeOpacity="0.55"
            strokeWidth="1.4"
          />
        </g>

        {/* Center seam */}
        <line x1="180" y1="54" x2="180" y2="320" stroke={accentColor} strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.65" />

        {/* Visor eyes */}
        <rect x="150" y="138" width="60" height="10" rx="5" fill="#0b0d12" stroke={accentColor} strokeWidth="1.4" />
        <rect x="155" y="141" width="22" height="4" rx="2" fill="#f4f1ea" />
        <rect x="183" y="141" width="22" height="4" rx="2" fill={accentColor} />

        {/* Chest badge */}
        <rect x="148" y="232" width="64" height="22" rx="4" fill="#0f1217" stroke={accentColor} strokeWidth="1.2" />
        <text x="180" y="246" textAnchor="middle" fill="#f4f1ea" fontSize="9.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.4">
          {badgeText}
        </text>
      </g>

      {/* AI ENGINEER MODE: Dev holding energy leash to roaming Claude-style mini bot */}
      {isAi && (
        <g className="devbot-leash-scene">
          {/* Energy Leash curved path */}
          <path
            d="M110 252 Q165 288 250 258"
            stroke="#EA1D0F"
            strokeWidth="2.4"
            strokeDasharray="6 4"
            fill="none"
          />
          {/* Mini Claude/Codex Companion Bot bouncing */}
          <g className="devbot-pet-float" transform="translate(248, 212)">
            {/* Bot antenna */}
            <line x1="34" y1="-12" x2="34" y2="0" stroke="#FFB547" strokeWidth="2.5" />
            <circle cx="34" cy="-15" r="4.5" fill="#EA1D0F" />
            {/* Bot chassis */}
            <rect x="0" y="0" width="68" height="54" rx="14" fill="#1c222c" stroke="#EA1D0F" strokeWidth="2.4" />
            {/* Glowing face screen */}
            <rect x="10" y="12" width="48" height="26" rx="7" fill="#0a0d12" />
            <text x="34" y="29" textAnchor="middle" fill="#FFB547" fontSize="13" fontFamily="monospace" fontWeight="800">
              {">_"}
            </text>
            {/* Little hover thrusters */}
            <ellipse cx="20" cy="60" rx="8" ry="3" fill="#EA1D0F" opacity="0.65" />
            <ellipse cx="48" cy="60" rx="8" ry="3" fill="#EA1D0F" opacity="0.65" />
          </g>
        </g>
      )}

      {/* ML ENGINEER MODE: Mechanic shop — fixing mini bot with its brain lid OPEN */}
      {isMl && (
        <g className="devbot-mechanic-scene">
          {/* Wrench in hand */}
          <g transform="translate(56, 200) rotate(-28)">
            <rect x="0" y="8" width="52" height="8" rx="4" fill="#cbd5e1" />
            <circle cx="0" cy="12" r="10" fill="#94a3b8" />
            <rect x="-10" y="8" width="10" height="8" fill="#0f1217" />
          </g>

          {/* Workbench Table + Open-Brain AI Bot */}
          <rect x="218" y="286" width="118" height="10" rx="3" fill="#334155" />
          <g transform="translate(242, 224)">
            {/* Hinged Open Top Skull */}
            <path
              d="M2,0 H62 V10 H2 Z"
              fill="#A78BFA"
              transform="rotate(-38 2 0)"
            />
            {/* Exposed Glowing Neural Brain */}
            <ellipse cx="32" cy="8" rx="18" ry="12" fill="#2e1065" stroke="#A78BFA" strokeWidth="1.8" />
            <circle cx="24" cy="7" r="3" fill="#22D3EE" />
            <circle cx="34" cy="4" r="2.8" fill="#FFB547" />
            <circle cx="40" cy="9" r="3" fill="#EA1D0F" />
            <path d="M24 7 L34 4 L40 9" stroke="#f4f1ea" strokeWidth="1.2" opacity="0.8" />
            {/* Bot body */}
            <rect x="0" y="14" width="64" height="48" rx="10" fill="#1c222c" stroke="#A78BFA" strokeWidth="2.2" />
            <circle cx="22" cy="36" r="4" fill="#A78BFA" />
            <circle cx="42" cy="36" r="4" fill="#A78BFA" />
            {/* Spark stars */}
            <path d="M-12 -10 L-4 -4 M-10 -2 L-2 -10" stroke="#FFB547" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>
      )}

      {/* BACKEND DEVELOPER MODE: Handling everything — server racks + streaming packets + lock */}
      {isBackend && (
        <g className="devbot-backend-scene">
          {/* Left Server Stack */}
          <g transform="translate(18, 178)">
            <rect width="58" height="22" rx="4" fill="#18202c" stroke="#FFB547" strokeWidth="1.6" />
            <circle cx="12" cy="11" r="3" fill="#34D399" />
            <rect x="22" y="9" width="26" height="4" rx="2" fill="#475569" />
            <rect y="28" width="58" height="22" rx="4" fill="#18202c" stroke="#FFB547" strokeWidth="1.6" />
            <circle cx="12" cy="39" r="3" fill="#FFB547" />
            <rect x="22" y="37" width="26" height="4" rx="2" fill="#475569" />
            <rect y="56" width="58" height="22" rx="4" fill="#18202c" stroke="#FFB547" strokeWidth="1.6" />
            <circle cx="12" cy="67" r="3" fill="#34D399" />
          </g>
          {/* Right Event Queue & Lock */}
          <g transform="translate(278, 178)">
            <rect width="64" height="78" rx="8" fill="#18202c" stroke="#FFB547" strokeWidth="1.6" />
            <text x="32" y="22" textAnchor="middle" fill="#FFB547" fontSize="9" fontFamily="monospace" fontWeight="700">200 OK</text>
            <text x="32" y="40" textAnchor="middle" fill="#34D399" fontSize="9" fontFamily="monospace">WS LIVE</text>
            <text x="32" y="58" textAnchor="middle" fill="#f4f1ea" fontSize="9" fontFamily="monospace">OAUTH2</text>
          </g>
          {/* Routing Pipes */}
          <path d="M76 204 C120 204 120 232 152 232" stroke="#FFB547" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M278 204 C240 204 238 232 208 232" stroke="#FFB547" strokeWidth="2" strokeDasharray="4 4" />
        </g>
      )}

      {/* DATA SCIENTIST MODE: Canonical Data & Analytics Telemetry */}
      {isDs && (
        <g className="devbot-ds-scene">
          {/* Analytics bar chart card */}
          <g transform="translate(22, 184)">
            <rect width="66" height="68" rx="8" fill="#0d141d" stroke="#22D3EE" strokeWidth="1.6" />
            <rect x="12" y="38" width="8" height="20" fill="#22D3EE" opacity="0.55" />
            <rect x="24" y="26" width="8" height="32" fill="#22D3EE" opacity="0.8" />
            <rect x="36" y="16" width="8" height="42" fill="#22D3EE" />
            <rect x="48" y="30" width="8" height="28" fill="#FFB547" />
          </g>
          {/* Causal Node Graph */}
          <g transform="translate(268, 184)">
            <rect width="72" height="68" rx="8" fill="#0d141d" stroke="#22D3EE" strokeWidth="1.6" />
            <line x1="18" y1="22" x2="52" y2="20" stroke="#22D3EE" strokeWidth="1.4" />
            <line x1="18" y1="22" x2="36" y2="48" stroke="#22D3EE" strokeWidth="1.4" />
            <line x1="52" y1="20" x2="36" y2="48" stroke="#FFB547" strokeWidth="1.4" />
            <circle cx="18" cy="22" r="5" fill="#22D3EE" />
            <circle cx="52" cy="20" r="5" fill="#f4f1ea" />
            <circle cx="36" cy="48" r="5" fill="#FFB547" />
          </g>
        </g>
      )}

      {/* COMPUTER DESK MODE (Hero Phase 5 / Dock Orb) */}
      {isDesk && (
        <g className="devbot-desk-scene">
          {/* Desk surface */}
          <rect x="32" y="280" width="296" height="14" rx="5" fill="#2b3341" stroke="#f4f1ea" strokeOpacity="0.2" />
          {/* Glow Monitor sitting in front */}
          <rect x="114" y="206" width="132" height="74" rx="8" fill="#0a0d12" stroke={accentColor} strokeWidth="2.4" />
          <line x1="128" y1="224" x2="212" y2="224" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <line x1="128" y1="238" x2="228" y2="238" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <line x1="128" y1="252" x2="186" y2="252" stroke="#f4f1ea" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
          <rect x="166" y="274" width="28" height="8" fill="#475569" />
          {/* Coffee mug */}
          <rect x="264" y="258" width="20" height="22" rx="4" fill="#f4f1ea" />
          <path d="M284 264 C291 264 291 274 284 274" stroke="#f4f1ea" strokeWidth="2.4" fill="none" />
        </g>
      )}

      {/* BICYCLE MODE (Street Horizontal Scroll) */}
      {isBike && (
        <g className="devbot-bicycle-scene">
          {/* Road line */}
          <line x1="20" y1="336" x2="340" y2="336" stroke={accentColor} strokeWidth="3" strokeDasharray="16 12" />
          {/* Rear Wheel */}
          <g transform={`translate(96, 290) rotate(${rotationDeg})`}>
            <circle r="40" stroke="#f4f1ea" strokeWidth="5" fill="#0f1217" fillOpacity="0.35" />
            <circle r="34" stroke={accentColor} strokeWidth="2" />
            <line x1="-34" y1="0" x2="34" y2="0" stroke="#94a3b8" strokeWidth="2" />
            <line x1="0" y1="-34" x2="0" y2="34" stroke="#94a3b8" strokeWidth="2" />
            <line x1="-24" y1="-24" x2="24" y2="24" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="-24" y1="24" x2="24" y2="-24" stroke="#94a3b8" strokeWidth="1.5" />
          </g>
          {/* Front Wheel */}
          <g transform={`translate(264, 290) rotate(${rotationDeg})`}>
            <circle r="40" stroke="#f4f1ea" strokeWidth="5" fill="#0f1217" fillOpacity="0.35" />
            <circle r="34" stroke={accentColor} strokeWidth="2" />
            <line x1="-34" y1="0" x2="34" y2="0" stroke="#94a3b8" strokeWidth="2" />
            <line x1="0" y1="-34" x2="0" y2="34" stroke="#94a3b8" strokeWidth="2" />
            <line x1="-24" y1="-24" x2="24" y2="24" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="-24" y1="24" x2="24" y2="-24" stroke="#94a3b8" strokeWidth="1.5" />
          </g>
          {/* Bicycle Frame */}
          <path d="M96 290 L166 290 L226 232 L144 232 Z" stroke={accentColor} strokeWidth="5" strokeLinejoin="round" fill="none" />
          <path d="M226 232 L264 290" stroke={accentColor} strokeWidth="5" strokeLinecap="round" />
          <path d="M214 218 H238" stroke="#f4f1ea" strokeWidth="4" strokeLinecap="round" />
          {/* Crank Pedal spinning */}
          <g transform={`translate(166, 290) rotate(${rotationDeg * 1.4})`}>
            <circle r="10" fill="#FFB547" />
            <line x1="0" y1="-16" x2="0" y2="16" stroke="#f4f1ea" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </g>
      )}
    </svg>
  );
}

