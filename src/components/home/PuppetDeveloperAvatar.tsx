"use client";

import React, { useState } from "react";

interface PuppetDeveloperAvatarProps {
  className?: string;
  isWaving?: boolean;
  activeRole?: string;
  showCompanionBot?: boolean;
}

/**
 * 2D Skeletal / Layered Puppet Developer Avatar
 * Multi-layer animated parts:
 * - Waving Right Hand ("HI! 👋")
 * - Nodding/Breathing Head with Glasses & Headphones
 * - Cozy Black Hoodie Torso
 * - Floating Companion AI Bot with Blinking LED Eyes & Active Energy Tether
 */
export function PuppetDeveloperAvatar({
  className = "",
  isWaving = true,
  activeRole = "all",
  showCompanionBot = true,
}: PuppetDeveloperAvatarProps) {
  const [hovered, setHovered] = useState(false);

  const accentColor =
    activeRole === "ai"
      ? "#22d3ee"
      : activeRole === "ds"
      ? "#0284c7"
      : activeRole === "ml"
      ? "#8b5cf6"
      : "#ea1d0f";

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        viewBox="0 0 280 260"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Laser energy beam gradient */}
          <linearGradient id="puppet-laser" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ea1d0f" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
          </linearGradient>

          {/* Bot aura glow */}
          <filter id="puppet-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. LAYER: FLOATING COMPANION AI AGENT BOT (Bobbing up & down) */}
        {showCompanionBot && (
          <g
            className="animate-[float-bot_3s_ease-in-out_infinite]"
            style={{ transformOrigin: "220px 85px" }}
          >
            {/* Ethereal Bot Aura */}
            <circle
              cx="220"
              cy="85"
              r="24"
              fill={accentColor}
              fillOpacity="0.18"
              className="animate-[pulse-ring_2.5s_infinite]"
            />

            {/* Glowing Laser Tether connecting Developer's Hand (150, 165) to Bot (220, 85) */}
            <path
              d="M148,165 Q180,140 220,85"
              stroke="url(#puppet-laser)"
              strokeWidth="2.5"
              strokeDasharray="5 3"
              className="animate-[laser-dash_1s_linear_infinite]"
              filter="url(#puppet-glow)"
            />

            {/* Bot Mini Antennas */}
            <line x1="220" y1="68" x2="220" y2="58" stroke="#0f1217" strokeWidth="2" />
            <circle cx="220" cy="56" r="3" fill="#ea1d0f" className="animate-ping" />

            {/* Bot Chassis Body (Sleek Round Capsule) */}
            <ellipse cx="220" cy="85" rx="18" ry="16" fill="#ffffff" stroke="#0f1217" strokeWidth="2.5" />
            {/* Bot Dark Visor Screen */}
            <rect x="208" y="77" width="24" height="13" rx="5" fill="#0f1217" />
            {/* Expressive Glowing Cyan Digital Eyes */}
            <ellipse cx="215" cy="83.5" rx="2.5" ry="3" fill="#22d3ee" className="animate-pulse" />
            <ellipse cx="225" cy="83.5" rx="2.5" ry="3" fill="#22d3ee" className="animate-pulse" />

            {/* Mini Thruster Jets */}
            <ellipse cx="220" cy="101" rx="5" ry="2" fill="#38bdf8" opacity="0.8" />
          </g>
        )}

        {/* 2. LAYER: DEVELOPER TORSO & BODY (Cozy Black Hoodie) */}
        <g style={{ animation: "avatar-breathe 4s ease-in-out infinite" }}>
          {/* Lower Torso / Jeans */}
          <path
            d="M95,210 L85,255 L155,255 L145,210 Z"
            fill="#1e293b"
            stroke="#0f1217"
            strokeWidth="2"
          />

          {/* Black Cozy Hoodie Torso */}
          <path
            d="M80,145 C75,130 92,118 120,118 C148,118 165,130 160,145 L154,215 C152,218 88,218 86,215 Z"
            fill="#0f1217"
          />
          {/* Hoodie Kangaroo Pocket */}
          <path
            d="M96,178 L144,178 L140,206 L100,206 Z"
            fill="#161b24"
            stroke="#0f1217"
            strokeWidth="1.5"
          />
          {/* Hoodie Drawstrings */}
          <line x1="114" y1="126" x2="114" y2="148" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="126" y1="126" x2="126" y2="152" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />

          {/* Left Arm & Hand (Holding Tether / Diagnostic Tablet) */}
          <path
            d="M152,126 Q168,142 154,165"
            stroke="#0f1217"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Left Hand */}
          <circle cx="150" cy="165" r="6" fill="#e8b98a" />
          <circle cx="150" cy="165" r="3" fill={accentColor} />

          {/* Studio Over-ear Headphones around neck */}
          <path
            d="M100,108 Q120,118 140,108"
            stroke="#334155"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="98" cy="110" r="7.5" fill="#0f1217" stroke="#ea1d0f" strokeWidth="1.5" />
          <circle cx="142" cy="110" r="7.5" fill="#0f1217" stroke="#ea1d0f" strokeWidth="1.5" />

          {/* Neck */}
          <path d="M112,98 L128,98 L128,114 L112,114 Z" fill="#e8b98a" />

          {/* 3. LAYER: DEVELOPER HEAD (Glasses, Hair, Stubble) */}
          <g
            style={{
              animation: hovered
                ? "avatar-hover-perk 0.4s forwards"
                : "avatar-breathe 4s ease-in-out infinite",
              transformOrigin: "120px 98px",
            }}
          >
            {/* Dark Wavy Hair - Back Layer */}
            <path
              d="M96,62 Q92,34 120,26 Q148,24 150,50 Q152,66 146,80 Q138,88 120,88 Q102,88 96,62 Z"
              fill="#16130f"
            />
            {/* Face Shape */}
            <path
              d="M102,52 Q120,50 138,52 Q142,74 136,86 Q128,96 120,96 Q112,96 104,86 Q98,74 102,52 Z"
              fill="#e8b98a"
            />

            {/* Eyeglasses Frame (Stylish rectangular black glasses) */}
            {/* Left Lens Frame */}
            <rect
              x="105"
              y="58"
              width="13"
              height="10"
              rx="2.5"
              fill="#1e293b"
              stroke="#0f1217"
              strokeWidth="1.5"
            />
            {/* Right Lens Frame */}
            <rect
              x="122"
              y="58"
              width="13"
              height="10"
              rx="2.5"
              fill="#1e293b"
              stroke="#0f1217"
              strokeWidth="1.5"
            />
            {/* Bridge */}
            <line x1="118" y1="63" x2="122" y2="63" stroke="#0f1217" strokeWidth="1.8" />
            {/* Glasses Lens Glint */}
            <line x1="107" y1="60" x2="114" y2="65" stroke="#ffffff" strokeWidth="1" opacity="0.9" />
            <line x1="124" y1="60" x2="131" y2="65" stroke="#ffffff" strokeWidth="1" opacity="0.9" />

            {/* Smart Friendly Eyes (Looking at user) */}
            <circle cx="111.5" cy="63" r="2" fill="#0f1217" />
            <circle cx="128.5" cy="63" r="2" fill="#0f1217" />
            <circle cx="112.5" cy="62" r="0.7" fill="#ffffff" />
            <circle cx="129.5" cy="62" r="0.7" fill="#ffffff" />

            {/* Neat Trimmed Mustache & Beard Stubble */}
            <path
              d="M115,75 Q120,77 125,75"
              stroke="#16130f"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M112,82 Q120,88 128,82"
              stroke="#16130f"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Warm Friendly Smile */}
            <path
              d="M116,79 Q120,83 124,79"
              stroke="#991b1b"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />

            {/* Wavy Textured Hair Fringe / Bangs */}
            <path
              d="M100,44 Q116,36 128,42 Q140,38 144,48 Q136,44 124,48 Q112,46 100,50 Z"
              fill="#0f1217"
            />
          </g>

          {/* 4. LAYER: WAVING RIGHT ARM & HAND ("HI! 👋") */}
          {/* Shoulder pivot at (88, 128), Forearm and Hand pivots with waving keyframe */}
          <g transform="translate(88, 128)">
            {/* Upper Arm */}
            <path
              d="M0,0 Q-15,10 -22,25"
              stroke="#0f1217"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* Forearm & Hand: Pinned at Elbow (-22, 25) with dynamic Waving Motion! */}
            <g
              transform="translate(-22, 25)"
              style={{
                animation: isWaving
                  ? hovered
                    ? "puppet-wave-fast 0.6s ease-in-out infinite"
                    : "puppet-wave 1.6s ease-in-out infinite"
                  : undefined,
                transformOrigin: "0px 0px",
              }}
            >
              {/* Forearm (reaching upward to wave) */}
              <line
                x1="0"
                y1="0"
                x2="-10"
                y2="-32"
                stroke="#0f1217"
                strokeWidth="11"
                strokeLinecap="round"
              />

              {/* Open Waving Palm */}
              <g transform="translate(-10, -32)">
                {/* Palm Base */}
                <circle cx="0" cy="-6" r="6.5" fill="#e8b98a" />
                {/* Thumb */}
                <line x1="3" y1="-4" x2="9" y2="-9" stroke="#e8b98a" strokeWidth="3" strokeLinecap="round" />
                {/* 4 Waving Fingers */}
                <line x1="-4" y1="-8" x2="-6" y2="-17" stroke="#e8b98a" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="-1.5" y1="-8" x2="-2" y2="-19" stroke="#e8b98a" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="1.5" y1="-8" x2="2" y2="-18" stroke="#e8b98a" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="4.5" y1="-8" x2="6" y2="-15" stroke="#e8b98a" strokeWidth="2.5" strokeLinecap="round" />
              </g>

              {/* Sparkle when waving */}
              <circle
                cx="-12"
                cy="-48"
                r="3"
                fill="#ffb547"
                className="animate-ping"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
