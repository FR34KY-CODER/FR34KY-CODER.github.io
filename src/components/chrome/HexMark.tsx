import React from "react";

interface HexMarkProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
  animateDraw?: boolean;
}

export function HexMark({
  className = "",
  size = 34,
  strokeWidth = 2.4,
  animateDraw = false,
}: HexMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Left half of hexagonal hood mark */}
      <path
        data-draw={animateDraw ? "true" : undefined}
        d="M30 6 L10 17.5 L10 46.5 L30 58 L30 48 L18.5 41.4 L18.5 22.6 L30 16 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        className="text-[var(--red)]"
        fill="currentColor"
        fillOpacity={animateDraw ? 0 : 0.92}
      />
      {/* Right half (accent) */}
      <path
        data-draw={animateDraw ? "true" : undefined}
        d="M34 6 L54 17.5 L54 46.5 L34 58 L34 48 L45.5 41.4 L45.5 22.6 L34 16 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        className="text-[var(--role-accent-night)] transition-colors duration-300"
        fill="none"
      />
    </svg>
  );
}

