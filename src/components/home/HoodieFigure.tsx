"use client";

import React, { useId } from "react";

interface HoodieFigureProps {
  className?: string;
  accentColor?: string;
  secondaryAccent?: string;
  badgeText?: string;
  spotlight?: boolean;
}

export function HoodieFigure({
  className = "",
  accentColor = "#EA1D0F",
  secondaryAccent = "#22D3EE",
  badgeText = "OG · 4X",
  spotlight = false,
}: HoodieFigureProps) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 360 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ojasvi Goyal dual-contrast hooded engineer emblem"
      role="img"
    >
      <defs>
        <clipPath id={`${id}-hood-left-clip`}>
          <rect x="0" y="0" width="180" height="440" />
        </clipPath>
        <clipPath id={`${id}-hood-right-clip`}>
          <rect x="180" y="0" width="180" height="440" />
        </clipPath>
        <pattern
          id={`${id}-wire-grid`}
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 14 0 L 0 0 0 14"
            fill="none"
            stroke={accentColor}
            strokeWidth="0.6"
            strokeOpacity="0.28"
          />
        </pattern>
        <radialGradient id={`${id}-hood-glow`} cx="50%" cy="32%" r="46%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.34" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient neural halo behind hood */}
      <circle
        cx="180"
        cy="170"
        r="142"
        fill={`url(#${id}-hood-glow)`}
        opacity={spotlight ? 0.95 : 0.72}
      />

      {/* Orbital 4-role rings */}
      <ellipse
        cx="180"
        cy="178"
        rx="148"
        ry="54"
        transform="rotate(-14 180 178)"
        stroke={accentColor}
        strokeWidth="1"
        strokeDasharray="4 6"
        strokeOpacity="0.45"
      />
      <ellipse
        cx="180"
        cy="178"
        rx="148"
        ry="54"
        transform="rotate(14 180 178)"
        stroke={secondaryAccent}
        strokeWidth="0.9"
        strokeDasharray="3 7"
        strokeOpacity="0.38"
      />

      {/* LEFT SIDE: Solid tactile editorial ink silhouette */}
      <g clipPath={`url(#${id}-hood-left-clip)`}>
        {/* Outer hood + shoulders silhouette */}
        <path
          d="M180 44 C122 44 86 92 88 156 L82 214 C56 234 40 270 36 334 L34 420 L180 420 Z"
          fill="#0f1217"
          stroke="#f4f1ea"
          strokeOpacity="0.22"
          strokeWidth="1.5"
        />
        {/* Inner hood depth shadow */}
        <path
          d="M180 74 C138 74 114 108 114 156 C114 196 138 228 180 232 Z"
          fill="#1b2028"
        />
        {/* Clean editorial jacket collar seam */}
        <path
          d="M112 228 L180 296 L180 232 C144 228 122 216 112 228 Z"
          fill="#161a21"
        />
        {/* Subtle solid draw lines */}
        <path
          d="M150 250 L150 388"
          stroke="#f4f1ea"
          strokeWidth="1.2"
          strokeOpacity="0.24"
          strokeDasharray="3 5"
        />
        {/* Architectural left pocket line */}
        <path
          d="M68 326 L128 326 L124 384"
          stroke="#f4f1ea"
          strokeWidth="1.4"
          strokeOpacity="0.28"
        />
        {/* Left badge half */}
        <rect
          x="134"
          y="292"
          width="46"
          height="24"
          fill="#f4f1ea"
          fillOpacity="0.1"
          stroke="#f4f1ea"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      </g>

      {/* RIGHT SIDE: Glowing AI/ML Neural Wireframe & Circuitry */}
      <g clipPath={`url(#${id}-hood-right-clip)`}>
        {/* Base dark tint + technical grid */}
        <path
          d="M180 44 C238 44 274 92 272 156 L278 214 C304 234 320 270 324 334 L326 420 L180 420 Z"
          fill="#0f1217"
          fillOpacity="0.88"
        />
        <path
          d="M180 44 C238 44 274 92 272 156 L278 214 C304 234 320 270 324 334 L326 420 L180 420 Z"
          fill={`url(#${id}-wire-grid)`}
        />
        {/* Outer wireframe stroke */}
        <path
          data-draw="true"
          d="M180 44 C238 44 274 92 272 156 L278 214 C304 234 320 270 324 334 L326 420"
          stroke={accentColor}
          strokeWidth="2.2"
        />
        {/* Inner hood wireframe */}
        <path
          data-draw="true"
          d="M180 74 C222 74 246 108 246 156 C246 196 222 228 180 232"
          stroke={accentColor}
          strokeWidth="1.6"
          strokeOpacity="0.85"
        />
        {/* Neural visor mesh */}
        <path
          d="M180 120 L236 128 L228 172 L180 180"
          stroke={secondaryAccent}
          strokeWidth="1.2"
          strokeOpacity="0.7"
        />
        <path
          d="M180 144 L232 148 M180 164 L228 164 M206 124 L204 176"
          stroke={accentColor}
          strokeWidth="0.9"
          strokeOpacity="0.55"
        />
        {/* Collar & circuit traces */}
        <path
          d="M248 228 L180 296"
          stroke={accentColor}
          strokeWidth="1.6"
          strokeOpacity="0.75"
        />
        <path
          d="M208 268 L208 392 M242 254 L268 286 L268 378"
          stroke={accentColor}
          strokeWidth="1.2"
          strokeOpacity="0.55"
        />
        {/* Nodes on circuit lines */}
        <circle cx="208" cy="268" r="3.2" fill={accentColor} />
        <circle cx="208" cy="342" r="3" fill={secondaryAccent} />
        <circle cx="268" cy="286" r="3.2" fill={accentColor} />
        <circle cx="236" cy="128" r="2.8" fill={secondaryAccent} />
        <circle cx="246" cy="156" r="3.2" fill={accentColor} />

        {/* Right badge half */}
        <rect
          x="180"
          y="292"
          width="48"
          height="24"
          fill={accentColor}
          fillOpacity="0.16"
          stroke={accentColor}
          strokeWidth="1.1"
        />
      </g>

      {/* Center vertical zipper / seam spine */}
      <line
        x1="180"
        y1="32"
        x2="180"
        y2="424"
        stroke={accentColor}
        strokeWidth="1.6"
        strokeDasharray="6 4"
        strokeOpacity="0.75"
      />

      {/* Glowing visor eyes / HUD bar */}
      <rect
        x="152"
        y="148"
        width="56"
        height="8"
        rx="4"
        fill="#0f1217"
        stroke={accentColor}
        strokeWidth="1.2"
      />
      <rect x="157" y="150.5" width="19" height="3" rx="1.5" fill="#f4f1ea" />
      <rect
        x="184"
        y="150.5"
        width="19"
        height="3"
        rx="1.5"
        fill={accentColor}
      />

      {/* Chest Telemetry Tag */}
      <text
        x="180"
        y="308"
        textAnchor="middle"
        fill="#f4f1ea"
        fontSize="10"
        fontFamily="monospace"
        fontWeight="700"
        letterSpacing="1.6"
      >
        {badgeText}
      </text>

      {/* 4 Satellite Nodes representing the 4 Roles */}
      <g fontFamily="monospace" fontSize="9" fontWeight="700">
        <circle cx="64" cy="122" r="4" fill="#EA1D0F" />
        <text x="54" y="114" textAnchor="end" fill="#EA1D0F">
          AI
        </text>

        <circle cx="296" cy="122" r="4" fill="#FFB547" />
        <text x="306" y="114" textAnchor="start" fill="#FFB547">
          BE
        </text>

        <circle cx="52" cy="240" r="4" fill="#22D3EE" />
        <text x="42" y="244" textAnchor="end" fill="#22D3EE">
          DS
        </text>

        <circle cx="308" cy="240" r="4" fill="#A78BFA" />
        <text x="318" y="244" textAnchor="start" fill="#A78BFA">
          ML
        </text>
      </g>
    </svg>
  );
}

