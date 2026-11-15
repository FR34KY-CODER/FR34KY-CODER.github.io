"use client";

import React, { useEffect, useRef, useState } from "react";

export interface WipeOriginConfig {
  cx: string;
  cy: string;
  startAngle: string;
  lineColor: string;
}

interface RadialWipeTransitionProps {
  triggerKey: string | number;
  origin: WipeOriginConfig;
  durationMs?: number;
  maskColor?: string;
}

/**
 * Radar / Radial Wipe Transition
 * Sweeps a 360-degree conic gradient laser wipe starting from the profile quadrant's position,
 * wiping away the mask and revealing the new view underneath.
 */
export function RadialWipeTransition({
  triggerKey,
  origin,
  durationMs = 950,
  maskColor = "#f4f1ea",
}: RadialWipeTransitionProps) {
  const [animating, setAnimating] = useState(false);
  const [keyCounter, setKeyCounter] = useState(0);
  const isFirst = useRef(true);
  const wipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setAnimating(true);
    setKeyCounter((k) => k + 1);

    const timer = window.setTimeout(() => {
      setAnimating(false);
    }, durationMs + 80);

    return () => window.clearTimeout(timer);
  }, [triggerKey, durationMs]);

  // RequestAnimationFrame fallback for environments that don't support CSS @property angle interpolation
  useEffect(() => {
    if (!animating) return;
    const node = wipeRef.current;
    if (!node) return;

    let animFrame: number;
    const startTime = performance.now();

    const loop = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Smooth cubic-bezier(0.22, 1, 0.36, 1) curve
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const deg = ease * 360;

      if (node) {
        node.style.setProperty("--wipe-angle", `${deg.toFixed(1)}deg`);
        if (progress > 0.9) {
          node.style.opacity = `${((1 - progress) / 0.1).toFixed(2)}`;
        }
      }

      if (progress < 1) {
        animFrame = requestAnimationFrame(loop);
      }
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, [animating, keyCounter, durationMs]);

  if (!animating) return null;

  return (
    <div
      ref={wipeRef}
      key={keyCounter}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{
        background: `conic-gradient(from ${origin.startAngle} at ${origin.cx} ${origin.cy}, transparent 0deg var(--wipe-angle, 0deg), ${origin.lineColor} var(--wipe-angle, 0deg) calc(var(--wipe-angle, 0deg) + 1.4deg), ${maskColor} calc(var(--wipe-angle, 0deg) + 1.4deg) 360deg)`,
        animation: `radar-wipe-sweep ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
      }}
    />
  );
}
