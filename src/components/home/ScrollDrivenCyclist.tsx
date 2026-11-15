"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRole } from "@/context/RoleContext";

interface ScrollDrivenCyclistProps {
  className?: string;
}

// 8-Frame Continuous 2D Anime Commuter Cyclist Sprite Sequence
// Anatomically complete: 360° circular pedaling cadence, rotating wheel spokes,
// articulated denim legs with knee IK, red crank arm, level sneaker platform.
const PEDAL_FRAMES = [
  { src: "/images/avatars/cyclist-pedal-1.png", alt: "Anime Developer Cyclist — Pedal at 0°" },
  { src: "/images/avatars/cyclist-pedal-2.png", alt: "Anime Developer Cyclist — Pedal at 45°" },
  { src: "/images/avatars/cyclist-pedal-3.png", alt: "Anime Developer Cyclist — Pedal at 90°" },
  { src: "/images/avatars/cyclist-pedal-4.png", alt: "Anime Developer Cyclist — Pedal at 135°" },
  { src: "/images/avatars/cyclist-pedal-5.png", alt: "Anime Developer Cyclist — Pedal at 180°" },
  { src: "/images/avatars/cyclist-pedal-6.png", alt: "Anime Developer Cyclist — Pedal at 225°" },
  { src: "/images/avatars/cyclist-pedal-7.png", alt: "Anime Developer Cyclist — Pedal at 270°" },
  { src: "/images/avatars/cyclist-pedal-8.png", alt: "Anime Developer Cyclist — Pedal at 315°" },
];

/**
 * Scroll-Driven 2D Anime Developer Cyclist
 * Continuous 8-Frame Sprite Loop driven by scroll rotation and cruising momentum.
 * Zero procedural wireframes or polygon cones.
 * 100% transparent PNG anime artwork stepping cleanly as the user travels down The Street.
 */
export function ScrollDrivenCyclist({ className = "" }: ScrollDrivenCyclistProps) {
  const { scrollRotation } = useRole();
  const [autoCadence, setAutoCadence] = useState(0);

  // Smooth cruising cadence when stationary
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      // Gentle coasting cadence
      setAutoCadence((prev) => (prev + dt * 80) % 360000);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Total pedal rotation degree driven by scroll velocity + cruising cadence
  const totalRotation = Math.abs(scrollRotation * 1.8 + autoCadence);

  // Map 360 degrees smoothly across 8 frames (45 degrees per frame)
  const activeFrame = Math.floor((totalRotation / 32) % PEDAL_FRAMES.length);

  // Subtle suspension bounce matching pedal cadence
  const bounceRad = ((totalRotation % 360) * 2 * Math.PI) / 180;
  const bounceY = Math.sin(bounceRad) * 2.0;

  return (
    <div
      className={`relative inline-block pointer-events-none select-none ${className}`}
      aria-label="2D Anime Developer riding commuter bicycle"
      style={{
        transform: `translateY(${bounceY.toFixed(2)}px)`,
        transition: "transform 0.08s ease-out",
      }}
    >
      {/* Soft natural road contact shadow under tires */}
      <div
        className="pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3.5 w-[86%] rounded-[50%] bg-[#0f1217]/25 blur-[4px]"
        aria-hidden="true"
      />

      {/* 8-Frame Preloaded Sprite Stack for 0-latency, flicker-free frame swapping */}
      <div className="relative aspect-square w-full">
        {PEDAL_FRAMES.map((frame, index) => {
          const isActive = index === activeFrame;
          return (
            <div
              key={frame.src}
              className={`absolute inset-0 transition-opacity duration-75 ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                priority
                sizes="(max-width: 768px) 160px, 200px"
                className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
