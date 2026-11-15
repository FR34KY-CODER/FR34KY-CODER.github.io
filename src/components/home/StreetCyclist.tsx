"use client";

import React from "react";

interface StreetCyclistProps {
  className?: string;
}

/**
 * 2D Illustrated Human Developer Cyclist
 * Commuter bike with rotating wheels, pedaling legs, dark hoodie, glasses, and headphones.
 * Designed to ride directly on the asphalt road in ChapterStreet.
 */
export function StreetCyclist({
  className = "",
}: StreetCyclistProps) {
  return (
    <div
      className={`relative inline-block pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 240 180"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Headlight beam gradient */}
          <linearGradient
            id="bike-headlight-beam"
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
          >
            <stop offset="0%" stopColor="#ea1d0f" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#ffb547" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Wheel rim gradient */}
          <linearGradient id="wheel-rim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1c222c" />
            <stop offset="100%" stopColor="#0f1217" />
          </linearGradient>

          <filter id="bike-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Headlight Cast on Road */}
        <polygon
          points="198,118 270,95 270,148"
          fill="url(#bike-headlight-beam)"
          className="opacity-75"
        />

        {/* Rear Wheel (X=54, Y=132, R=30) */}
        <g className="animate-[spin_2s_linear_infinite]" style={{ transformOrigin: "54px 132px" }}>
          {/* Tire */}
          <circle cx="54" cy="132" r="30" stroke="#0f1217" strokeWidth="5" />
          <circle cx="54" cy="132" r="28" stroke="#ea1d0f" strokeWidth="1" strokeOpacity="0.8" />
          {/* Spokes */}
          <line x1="54" y1="102" x2="54" y2="162" stroke="#4a443c" strokeWidth="1.2" />
          <line x1="24" y1="132" x2="84" y2="132" stroke="#4a443c" strokeWidth="1.2" />
          <line x1="33" y1="111" x2="75" y2="153" stroke="#4a443c" strokeWidth="1.2" />
          <line x1="33" y1="153" x2="75" y2="111" stroke="#4a443c" strokeWidth="1.2" />
          {/* Hub */}
          <circle cx="54" cy="132" r="4.5" fill="#ea1d0f" />
        </g>

        {/* Front Wheel (X=186, Y=132, R=30) */}
        <g className="animate-[spin_2s_linear_infinite]" style={{ transformOrigin: "186px 132px" }}>
          {/* Tire */}
          <circle cx="186" cy="132" r="30" stroke="#0f1217" strokeWidth="5" />
          <circle cx="186" cy="132" r="28" stroke="#ea1d0f" strokeWidth="1" strokeOpacity="0.8" />
          {/* Spokes */}
          <line x1="186" y1="102" x2="186" y2="162" stroke="#4a443c" strokeWidth="1.2" />
          <line x1="156" y1="132" x2="216" y2="132" stroke="#4a443c" strokeWidth="1.2" />
          <line x1="165" y1="111" x2="207" y2="153" stroke="#4a443c" strokeWidth="1.2" />
          <line x1="165" y1="153" x2="207" y2="111" stroke="#4a443c" strokeWidth="1.2" />
          {/* Hub */}
          <circle cx="186" cy="132" r="4.5" fill="#ea1d0f" />
        </g>

        {/* Bike Diamond Frame */}
        {/* Chainstay: Rear Hub (54,132) -> Bottom Bracket (112, 132) */}
        <line x1="54" y1="132" x2="112" y2="132" stroke="#ea1d0f" strokeWidth="4.5" strokeLinecap="round" />
        {/* Seatstay: Rear Hub (54,132) -> Seat Cluster (100, 88) */}
        <line x1="54" y1="132" x2="100" y2="88" stroke="#ea1d0f" strokeWidth="4" strokeLinecap="round" />
        {/* Seat Tube: Seat Cluster (100, 88) -> Bottom Bracket (112, 132) */}
        <line x1="100" y1="88" x2="112" y2="132" stroke="#ea1d0f" strokeWidth="4.5" strokeLinecap="round" />
        {/* Top Tube: Seat Cluster (100, 88) -> Head Tube (168, 86) */}
        <line x1="100" y1="88" x2="168" y2="86" stroke="#ea1d0f" strokeWidth="4.5" strokeLinecap="round" />
        {/* Down Tube: Bottom Bracket (112, 132) -> Head Tube (168, 86) */}
        <line x1="112" y1="132" x2="168" y2="86" stroke="#ea1d0f" strokeWidth="5" strokeLinecap="round" />
        {/* Front Fork: Head Tube (168, 86) -> Front Hub (186, 132) */}
        <line x1="168" y1="86" x2="186" y2="132" stroke="#0f1217" strokeWidth="4.5" strokeLinecap="round" />

        {/* Handlebars & Stem */}
        <line x1="168" y1="86" x2="166" y2="70" stroke="#0f1217" strokeWidth="4" strokeLinecap="round" />
        <path d="M166,70 Q174,66 182,72" stroke="#0f1217" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Headlight Lamp */}
        <rect x="180" y="71" width="10" height="7" rx="2" fill="#ea1d0f" />
        <circle cx="190" cy="74.5" r="3" fill="#ffffff" />

        {/* Saddle Seat & Post */}
        <line x1="100" y1="88" x2="97" y2="78" stroke="#0f1217" strokeWidth="4" strokeLinecap="round" />
        <path d="M86,77 C92,75 106,75 110,79 C104,82 90,81 86,77 Z" fill="#0f1217" />

        {/* Crankset & Chainring (Center 112, 132) */}
        <circle cx="112" cy="132" r="9" fill="#1c222c" stroke="#4a443c" strokeWidth="2" />

        {/* PEDALS & CYCLIST LEGS (Animated rotation) */}
        {/* Left Pedal Crank */}
        <g className="animate-[spin_2s_linear_infinite]" style={{ transformOrigin: "112px 132px" }}>
          <line x1="112" y1="132" x2="112" y2="116" stroke="#8d96a6" strokeWidth="3" strokeLinecap="round" />
          <rect x="108" y="113" width="8" height="3" rx="1" fill="#ea1d0f" />
          <line x1="112" y1="132" x2="112" y2="148" stroke="#8d96a6" strokeWidth="3" strokeLinecap="round" />
          <rect x="108" y="147" width="8" height="3" rx="1" fill="#ea1d0f" />
        </g>

        {/* CYCLIST (Matching Reference Illustration):
            - Dark hoodie
            - Dark hair & glasses
            - Over-ear headphones around neck
            - Backpack with stickers
            - Leaning naturally forward in riding posture
        */}
        {/* Developer Cyclist Torso & Backpack */}
        {/* Backpack */}
        <path
          d="M84,68 C76,68 72,78 74,92 C76,104 84,106 90,102 C89,88 88,76 84,68 Z"
          fill="#1c222c"
          stroke="#0f1217"
          strokeWidth="1.5"
        />
        {/* Red Backpack Accent Stripe */}
        <path d="M74,86 Q80,88 88,86" stroke="#ea1d0f" strokeWidth="2" strokeLinecap="round" />

        {/* Torso (Black Cozy Hoodie leaning forward) */}
        <path
          d="M93,76 C98,64 116,56 130,58 C136,66 134,84 122,96 C114,102 102,100 96,92 Z"
          fill="#0f1217"
        />

        {/* Cyclist Legs in Riding Position */}
        {/* Thigh (Pelvis to Knee) */}
        <path
          d="M102,88 Q118,92 126,108"
          stroke="#1c222c"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Shin (Knee to Foot/Pedal) */}
        <path
          d="M126,108 Q120,124 112,136"
          stroke="#1c222c"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Sneaker */}
        <path
          d="M106,136 L120,136 Q124,140 120,143 L104,143 Z"
          fill="#ffffff"
          stroke="#0f1217"
          strokeWidth="1"
        />

        {/* Arms (Shoulder to Handlebar) */}
        {/* Hoodie Arm */}
        <path
          d="M128,62 Q154,66 172,71"
          stroke="#0f1217"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Hand on grip */}
        <circle cx="174" cy="71" r="4.5" fill="#d4a373" />

        {/* Over-ear Headphones around neck */}
        <path
          d="M122,48 Q134,54 138,48"
          stroke="#4a443c"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="122" cy="50" r="4" fill="#0f1217" stroke="#ea1d0f" strokeWidth="1" />
        <circle cx="138" cy="50" r="4" fill="#0f1217" stroke="#ea1d0f" strokeWidth="1" />

        {/* Neck */}
        <path d="M128,46 L134,46 L134,52 L128,52 Z" fill="#d4a373" />

        {/* Head & Face (Profile view matching reference) */}
        {/* Dark wavy hair back */}
        <path
          d="M118,34 Q116,22 130,18 Q144,16 148,26 Q150,34 146,42 Q136,46 124,44 Q116,42 118,34 Z"
          fill="#16130f"
        />
        {/* Face contour */}
        <path
          d="M130,26 Q146,26 148,34 Q150,38 144,43 Q136,46 130,42 Z"
          fill="#e8b98a"
        />
        {/* Eyeglasses Frame */}
        <rect
          x="140"
          y="28"
          width="9"
          height="7"
          rx="1.5"
          fill="#2b3341"
          stroke="#0f1217"
          strokeWidth="1"
        />
        <line x1="134" y1="31" x2="140" y2="31" stroke="#0f1217" strokeWidth="1.2" />
        {/* Glasses Lens Glint */}
        <line x1="142" y1="30" x2="147" y2="33" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
        {/* Trimmed Beard / Stubble */}
        <path
          d="M138,41 Q143,44 146,40"
          stroke="#16130f"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Wavy hair bangs */}
        <path
          d="M132,18 Q144,18 148,24 Q142,22 136,24 Q132,26 128,24 Z"
          fill="#0f1217"
        />
      </svg>
    </div>
  );
}
