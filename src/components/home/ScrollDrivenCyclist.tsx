"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRole } from "@/context/RoleContext";

interface ScrollDrivenCyclistProps {
  className?: string;
}

// 4-Frame Hand-Crafted 2D Anime Commuter Cyclist Sprite Sequence
// Perfectly registered: pedal rotates through 12, 3, 6, and 9 o'clock
const CYCLIST_FRAMES = [
  {
    src: "/images/avatars/cyclist-frame-1.png",
    alt: "Anime Developer Cyclist — Pedal Up (12 o'clock)",
  },
  {
    src: "/images/avatars/cyclist-frame-2.png",
    alt: "Anime Developer Cyclist — Pedal Forward (3 o'clock)",
  },
  {
    src: "/images/avatars/cyclist-frame-3.png",
    alt: "Anime Developer Cyclist — Pedal Down (6 o'clock)",
  },
  {
    src: "/images/avatars/cyclist-frame-4.png",
    alt: "Anime Developer Cyclist — Pedal Back (9 o'clock)",
  },
];

/**
 * Scroll-Driven 2D Anime Developer Cyclist
 * Pure 2D Anime Sprite Frame Sequencing driven directly by scroll distance and travel.
 * Zero 3D models. Zero procedural box/wireframe approximations. Zero artificial headlight beams.
 * Pure transparent PNG anime artwork stepping cleanly as the user travels down The Street.
 */
export function ScrollDrivenCyclist({ className = "" }: ScrollDrivenCyclistProps) {
  const { scrollRotation } = useRole();
  const [autoCadence, setAutoCadence] = useState(0);

  // Subtle cruising cadence when stationary
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      // Gentle cruise cadence ~40 RPM
      setAutoCadence((prev) => (prev + dt * 110) % 360000);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Total pedal rotation degree driven by scroll velocity + cruising cadence
  const totalRotation = Math.abs(scrollRotation * 1.6 + autoCadence);

  // Map 360 degrees to 4 frames (90 degrees per frame)
  const activeFrame = Math.floor((totalRotation / 70) % CYCLIST_FRAMES.length);

  // Subtle suspension bounce matching pedal cadence
  const bounceRad = ((totalRotation % 360) * 2 * Math.PI) / 180;
  const bounceY = Math.sin(bounceRad) * 2.2;

  return (
    <div
      className={`relative inline-block pointer-events-none select-none ${className}`}
      aria-label="2D Anime Developer riding commuter bicycle"
      style={{
        transform: `translateY(${bounceY.toFixed(2)}px)`,
        transition: "transform 0.08s ease-out",
      }}
    >
      {/* Soft natural road contact shadow under tires — strictly no artificial headlight cones */}
      <div
        className="pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3.5 w-[86%] rounded-[50%] bg-[#0f1217]/25 blur-[4px]"
        aria-hidden="true"
      />

      {/* 4-Frame Preloaded Sprite Stack for 0-latency, flicker-free frame swapping */}
      <div className="relative aspect-square w-full">
        {CYCLIST_FRAMES.map((frame, index) => {
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
                className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
