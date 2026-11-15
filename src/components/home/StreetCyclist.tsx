"use client";

import React, { useState } from "react";
import Image from "next/image";

interface StreetCyclistProps {
  className?: string;
}

/**
 * 2D Animated Developer Cyclist
 * Commuter bike with 100% transparent PNG cutout, bobbing suspension animation,
 * dynamic contact shadow, and headlight beam.
 */
export function StreetCyclist({ className = "" }: StreetCyclistProps) {
  const [useFallback, setUseFallback] = useState(false);

  return (
    <div
      className={`relative inline-block pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {!useFallback ? (
        <div
          className="relative h-[115px] w-[145px] sm:h-[135px] sm:w-[175px]"
          style={{ animation: "bike-ride-bob 1.6s ease-in-out infinite" }}
        >
          {/* Transparent 2D Cartoon Cyclist */}
          <Image
            src="/images/avatars/avatar-bicycle.png"
            alt="Ojasvi Goyal Commuter Cyclist"
            fill
            sizes="175px"
            onError={() => setUseFallback(true)}
            className="object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]"
          />

          {/* Dynamic Road Contact Shadow */}
          <div
            className="absolute -bottom-1 left-5 right-5 h-2 rounded-full bg-black/40 blur-xs"
            style={{ animation: "pulse-ring 1.6s ease-in-out infinite" }}
          />

          {/* Headlight beam on road */}
          <div
            className="pointer-events-none absolute -right-16 bottom-2.5 h-16 w-32 opacity-50"
            style={{
              background:
                "conic-gradient(from 75deg at 0% 50%, #ffffff 0deg, #ea1d0f 25deg, transparent 50deg)",
            }}
          />
        </div>
      ) : (
        /* Vector SVG Fallback */
        <svg
          viewBox="0 0 240 180"
          className="w-full h-auto overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="animate-[spin_2s_linear_infinite]" style={{ transformOrigin: "54px 132px" }}>
            <circle cx="54" cy="132" r="30" stroke="#0f1217" strokeWidth="5" />
            <circle cx="54" cy="132" r="28" stroke="#ea1d0f" strokeWidth="1" strokeOpacity="0.8" />
          </g>
          <g className="animate-[spin_2s_linear_infinite]" style={{ transformOrigin: "186px 132px" }}>
            <circle cx="186" cy="132" r="30" stroke="#0f1217" strokeWidth="5" />
            <circle cx="186" cy="132" r="28" stroke="#ea1d0f" strokeWidth="1" strokeOpacity="0.8" />
          </g>
          <line x1="54" y1="132" x2="112" y2="132" stroke="#ea1d0f" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="54" y1="132" x2="100" y2="88" stroke="#ea1d0f" strokeWidth="4" strokeLinecap="round" />
          <line x1="100" y1="88" x2="112" y2="132" stroke="#ea1d0f" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="100" y1="88" x2="168" y2="86" stroke="#ea1d0f" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="112" y1="132" x2="168" y2="86" stroke="#ea1d0f" strokeWidth="5" strokeLinecap="round" />
          <line x1="168" y1="86" x2="186" y2="132" stroke="#0f1217" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}
