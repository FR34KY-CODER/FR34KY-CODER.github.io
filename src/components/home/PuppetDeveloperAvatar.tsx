"use client";

import React, { useState } from "react";
import Image from "next/image";

interface PuppetDeveloperAvatarProps {
  className?: string;
  isWaving?: boolean;
  activeRole?: string;
  showCompanionBot?: boolean;
}

/**
 * 2D Anime Layered Puppet Developer Avatar
 * Pure 2D Anime Illustration layers animated via smooth CSS transforms:
 * 1. Base Developer Torso & Head (`anime-avatar-body.png`)
 * 2. Waving Arm & Hand pivoted at elbow (`anime-waving-hand.png`)
 * 3. Floating Companion AI Bot (`anime-companion-bot.png`)
 * Zero procedural wireframes or polygon approximations.
 */
export function PuppetDeveloperAvatar({
  className = "",
  isWaving = true,
  showCompanionBot = true,
}: PuppetDeveloperAvatarProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group relative inline-block select-none aspect-square w-full ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="2D Anime Developer with waving arm and companion bot"
    >
      {/* 1. Base Anime Developer Body with subtle natural breathing animation */}
      <div
        className="relative h-full w-full"
        style={{
          animation: "avatar-breathe 4s ease-in-out infinite",
          transform: hovered ? "scale(1.02)" : "scale(1)",
          transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        <Image
          src="/images/avatars/anime-avatar-body.png"
          alt="2D Anime Developer"
          fill
          priority
          sizes="(max-width: 768px) 280px, 360px"
          className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
        />

        {/* 2. Waving Arm Layer: Pivots naturally at the elbow joint (21.5% X, 48.8% Y) */}
        {isWaving && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transformOrigin: "21.5% 48.8%",
              animation: hovered
                ? "anime-hand-wave 0.8s ease-in-out infinite"
                : "anime-hand-wave 2.2s ease-in-out infinite",
            }}
          >
            <Image
              src="/images/avatars/anime-waving-hand.png"
              alt="Waving hand greeting"
              fill
              priority
              sizes="(max-width: 768px) 280px, 360px"
              className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
            />
          </div>
        )}
      </div>

      {/* 3. Floating Companion AI Drone Bot: Bobbing smoothly above his shoulder */}
      {showCompanionBot && (
        <div
          className="pointer-events-none absolute top-[8%] right-[8%] w-[28%] aspect-square"
          style={{
            animation: "float-bot 3.2s ease-in-out infinite",
          }}
        >
          <Image
            src="/images/avatars/anime-companion-bot.png"
            alt="Floating Companion AI Drone"
            fill
            sizes="120px"
            className="object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)]"
          />
        </div>
      )}

      {/* Embedded Keyframes for natural 2D puppet animation */}
      <style jsx global>{`
        @keyframes anime-hand-wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(12deg);
          }
          75% {
            transform: rotate(-8deg);
          }
        }
        @keyframes float-bot {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-9px) rotate(2deg);
          }
        }
        @keyframes avatar-breathe {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-2.5px) scale(1.008);
          }
        }
      `}</style>
    </div>
  );
}
