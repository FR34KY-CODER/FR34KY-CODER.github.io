"use client";

import React, { useEffect, useState } from "react";
import { useRole } from "@/context/RoleContext";

interface ScrollDrivenCyclistProps {
  className?: string;
}

// 2-Bone Inverse Kinematics for anatomical human bicycling
function computeLegIK(
  deg: number,
  hipX = 100,
  hipY = 85,
  crankX = 112,
  crankY = 134,
  radius = 14,
  thighLen = 36,
  shinLen = 36
) {
  const rad = (deg * Math.PI) / 180;
  const pedalX = crankX + radius * Math.cos(rad);
  const pedalY = crankY + radius * Math.sin(rad);

  const dx = pedalX - hipX;
  const dy = pedalY - hipY;
  const dist = Math.max(1, Math.hypot(dx, dy));

  const cosAlpha = Math.max(
    -1,
    Math.min(
      1,
      (thighLen * thighLen + dist * dist - shinLen * shinLen) /
        (2 * thighLen * dist)
    )
  );
  const alpha = Math.acos(cosAlpha);
  const beta = Math.atan2(dy, dx);

  // Forward bending knee
  const kneeX = hipX + thighLen * Math.cos(beta - alpha);
  const kneeY = hipY + thighLen * Math.sin(beta - alpha);

  return { pedalX, pedalY, kneeX, kneeY };
}

/**
 * Scroll-Driven 2D Human Developer Cyclist
 * Anatomically accurate 2-bone Inverse Kinematics (IK) pedaling legs,
 * spinning wheels with spokes, and riding suspension bounce driven by scroll travel.
 */
export function ScrollDrivenCyclist({ className = "" }: ScrollDrivenCyclistProps) {
  const { scrollRotation } = useRole();

  // Combine scroll degrees with a subtle autonomous cruising rotation
  const [autoCadence, setAutoCadence] = useState(0);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      // Gentle cruise cadence of ~45 RPM when not actively scrolling
      setAutoCadence((prev) => (prev + dt * 140) % 360000);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Total pedal rotation angle combining scroll velocity and cruising cadence
  const totalAngle = (scrollRotation * 1.8 + autoCadence) % 360;
  const wheelAngle = (scrollRotation * 4.2 + autoCadence * 2.2) % 360;

  // Upper body cadence bounce
  const cadenceRad = (totalAngle * 2 * Math.PI) / 180;
  const bounceY = Math.sin(cadenceRad) * 2.2;
  const tiltDeg = Math.cos(cadenceRad) * 0.8;

  // Near Leg (Right leg - in front)
  const nearLeg = computeLegIK(totalAngle);
  // Far Leg (Left leg - behind bike, 180° out of phase)
  const farLeg = computeLegIK((totalAngle + 180) % 360);

  return (
    <div
      className={`relative inline-block pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 250 185"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Headlight beam */}
          <linearGradient id="cyclist-beam" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#ffb547" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ea1d0f" stopOpacity="0" />
          </linearGradient>

          {/* Road shadow */}
          <radialGradient id="road-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dynamic Road Contact Shadows (under rear & front wheels) */}
        <ellipse cx="54" cy="164" rx="28" ry="4.5" fill="url(#road-shadow)" />
        <ellipse cx="186" cy="164" rx="28" ry="4.5" fill="url(#road-shadow)" />

        {/* Headlight Beam Illuminating Asphalt */}
        <polygon
          points="194,116 290,92 290,154"
          fill="url(#cyclist-beam)"
          className="opacity-65"
        />

        {/* FAR LEG (Left leg behind frame, darker shade for depth) */}
        <g opacity="0.75">
          {/* Far Thigh */}
          <line
            x1="100"
            y1={85 + bounceY}
            x2={farLeg.kneeX}
            y2={farLeg.kneeY}
            stroke="#12151c"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Far Shin */}
          <line
            x1={farLeg.kneeX}
            y1={farLeg.kneeY}
            x2={farLeg.pedalX}
            y2={farLeg.pedalY}
            stroke="#12151c"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Far Sneaker */}
          <rect
            x={farLeg.pedalX - 6}
            y={farLeg.pedalY - 2}
            width="14"
            height="5"
            rx="2"
            fill="#8d96a6"
          />
          {/* Far Crank arm */}
          <line
            x1="112"
            y1="134"
            x2={farLeg.pedalX}
            y2={farLeg.pedalY}
            stroke="#4a443c"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>

        {/* REAR WHEEL (Center 54, 134, Radius 30) - Rotation driven by scroll */}
        <g transform={`rotate(${wheelAngle} 54 134)`}>
          {/* Outer Tire */}
          <circle cx="54" cy="134" r="30" stroke="#0f1217" strokeWidth="5.5" />
          <circle cx="54" cy="134" r="28" stroke="#ea1d0f" strokeWidth="1.2" strokeOpacity="0.85" />
          {/* 8 Rotating Spokes */}
          <line x1="54" y1="104" x2="54" y2="164" stroke="#8d96a6" strokeWidth="1.2" />
          <line x1="24" y1="134" x2="84" y2="134" stroke="#8d96a6" strokeWidth="1.2" />
          <line x1="33" y1="113" x2="75" y2="155" stroke="#8d96a6" strokeWidth="1.2" />
          <line x1="33" y1="155" x2="75" y2="113" stroke="#8d96a6" strokeWidth="1.2" />
          {/* Hub */}
          <circle cx="54" cy="134" r="5" fill="#ea1d0f" />
        </g>

        {/* FRONT WHEEL (Center 186, 134, Radius 30) - Rotation driven by scroll */}
        <g transform={`rotate(${wheelAngle} 186 134)`}>
          {/* Outer Tire */}
          <circle cx="186" cy="134" r="30" stroke="#0f1217" strokeWidth="5.5" />
          <circle cx="186" cy="134" r="28" stroke="#ea1d0f" strokeWidth="1.2" strokeOpacity="0.85" />
          {/* 8 Rotating Spokes */}
          <line x1="186" y1="104" x2="186" y2="164" stroke="#8d96a6" strokeWidth="1.2" />
          <line x1="156" y1="134" x2="216" y2="134" stroke="#8d96a6" strokeWidth="1.2" />
          <line x1="165" y1="113" x2="207" y2="155" stroke="#8d96a6" strokeWidth="1.2" />
          <line x1="165" y1="155" x2="207" y2="113" stroke="#8d96a6" strokeWidth="1.2" />
          {/* Hub */}
          <circle cx="186" cy="134" r="5" fill="#ea1d0f" />
        </g>

        {/* BICYCLE DIAMOND FRAME */}
        {/* Chainstay: 54,134 -> 112,134 */}
        <line x1="54" y1="134" x2="112" y2="134" stroke="#ea1d0f" strokeWidth="4.5" strokeLinecap="round" />
        {/* Seatstay: 54,134 -> 100,90 */}
        <line x1="54" y1="134" x2="100" y2="90" stroke="#ea1d0f" strokeWidth="4" strokeLinecap="round" />
        {/* Seat tube: 100,90 -> 112,134 */}
        <line x1="100" y1="90" x2="112" y2="134" stroke="#ea1d0f" strokeWidth="4.5" strokeLinecap="round" />
        {/* Top tube: 100,90 -> 168,88 */}
        <line x1="100" y1="90" x2="168" y2="88" stroke="#ea1d0f" strokeWidth="4.5" strokeLinecap="round" />
        {/* Down tube: 112,134 -> 168,88 */}
        <line x1="112" y1="134" x2="168" y2="88" stroke="#ea1d0f" strokeWidth="5" strokeLinecap="round" />
        {/* Front Fork: 168,88 -> 186,134 */}
        <line x1="168" y1="88" x2="186" y2="134" stroke="#0f1217" strokeWidth="4.5" strokeLinecap="round" />

        {/* Handlebars & Stem */}
        <line x1="168" y1="88" x2="166" y2="72" stroke="#0f1217" strokeWidth="4" strokeLinecap="round" />
        <path d="M166,72 Q174,68 184,74" stroke="#0f1217" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* LED Headlight */}
        <rect x="182" y="73" width="11" height="7" rx="2" fill="#ea1d0f" />
        <circle cx="193" cy="76.5" r="3.5" fill="#ffffff" />

        {/* Saddle Seat & Post */}
        <line x1="100" y1="90" x2="97" y2="80" stroke="#0f1217" strokeWidth="4" strokeLinecap="round" />
        <path d="M85,79 C91,77 106,77 111,81 C105,84 90,83 85,79 Z" fill="#0f1217" />

        {/* Chainring (Center 112, 134) */}
        <circle cx="112" cy="134" r="9.5" fill="#1c222c" stroke="#4a443c" strokeWidth="2.5" />

        {/* NEAR CRANK & PEDAL (Angle theta) */}
        <line
          x1="112"
          y1="134"
          x2={nearLeg.pedalX}
          y2={nearLeg.pedalY}
          stroke="#8d96a6"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <rect
          x={nearLeg.pedalX - 6}
          y={nearLeg.pedalY - 2.5}
          width="13"
          height="5"
          rx="1.5"
          fill="#ea1d0f"
        />

        {/* DEVELOPER CYCLIST UPPER BODY (With Riding Cadence Bounce) */}
        <g transform={`translate(0, ${bounceY}) rotate(${tiltDeg} 100 85)`}>
          {/* Tech Backpack with stickers */}
          <path
            d="M82,68 C74,68 70,78 72,92 C74,104 82,106 88,102 C87,88 86,76 82,68 Z"
            fill="#1c222c"
            stroke="#0f1217"
            strokeWidth="1.5"
          />
          {/* Red backpack stripe */}
          <path d="M72,86 Q78,88 86,86" stroke="#ea1d0f" strokeWidth="2" strokeLinecap="round" />

          {/* Torso (Cozy Black Hoodie in forward riding posture) */}
          <path
            d="M91,76 C96,64 114,56 128,58 C134,66 132,84 120,96 C112,102 100,100 94,92 Z"
            fill="#0f1217"
          />

          {/* Arms (Shoulder to Handlebar) */}
          <path
            d="M126,62 Q152,66 170,72"
            stroke="#0f1217"
            strokeWidth="8.5"
            strokeLinecap="round"
          />
          {/* Hand on grip */}
          <circle cx="172" cy="72" r="4.5" fill="#e8b98a" />

          {/* Over-ear Headphones resting around neck */}
          <path
            d="M120,48 Q132,54 136,48"
            stroke="#4a443c"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="120" cy="50" r="4" fill="#0f1217" stroke="#ea1d0f" strokeWidth="1" />
          <circle cx="136" cy="50" r="4" fill="#0f1217" stroke="#ea1d0f" strokeWidth="1" />

          {/* Neck */}
          <path d="M126,46 L132,46 L132,52 L126,52 Z" fill="#e8b98a" />

          {/* Head & Face (Profile view matching reference) */}
          {/* Dark wavy hair back */}
          <path
            d="M116,34 Q114,22 128,18 Q142,16 146,26 Q148,34 144,42 Q134,46 122,44 Q114,42 116,34 Z"
            fill="#16130f"
          />
          {/* Face contour */}
          <path
            d="M128,26 Q144,26 146,34 Q148,38 142,43 Q134,46 128,42 Z"
            fill="#e8b98a"
          />
          {/* Eyeglasses Frame */}
          <rect
            x="138"
            y="28"
            width="9"
            height="7"
            rx="1.5"
            fill="#2b3341"
            stroke="#0f1217"
            strokeWidth="1"
          />
          <line x1="132" y1="31" x2="138" y2="31" stroke="#0f1217" strokeWidth="1.2" />
          {/* Glasses Lens Glint */}
          <line x1="140" y1="30" x2="145" y2="33" stroke="#ffffff" strokeWidth="0.8" opacity="0.9" />
          {/* Trimmed Beard / Stubble */}
          <path
            d="M136,41 Q141,44 144,40"
            stroke="#16130f"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Wavy hair bangs */}
          <path
            d="M130,18 Q142,18 146,24 Q140,22 134,24 Q130,26 126,24 Z"
            fill="#0f1217"
          />
        </g>

        {/* NEAR LEG (Right leg in front - 2-Bone IK animated in circles) */}
        <g>
          {/* Near Thigh (Hip to Knee) */}
          <line
            x1="100"
            y1={85 + bounceY}
            x2={nearLeg.kneeX}
            y2={nearLeg.kneeY}
            stroke="#1c222c"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Near Knee Cap */}
          <circle cx={nearLeg.kneeX} cy={nearLeg.kneeY} r="5" fill="#1c222c" />
          {/* Near Shin (Knee to Pedal) */}
          <line
            x1={nearLeg.kneeX}
            y1={nearLeg.kneeY}
            x2={nearLeg.pedalX}
            y2={nearLeg.pedalY}
            stroke="#1c222c"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Near Sneaker (White/Red Street Sneaker) */}
          <path
            d={`M${nearLeg.pedalX - 6},${nearLeg.pedalY} L${nearLeg.pedalX + 8},${nearLeg.pedalY} Q${nearLeg.pedalX + 11},${nearLeg.pedalY + 4} ${nearLeg.pedalX + 6},${nearLeg.pedalY + 6} L${nearLeg.pedalX - 7},${nearLeg.pedalY + 6} Z`}
            fill="#ffffff"
            stroke="#0f1217"
            strokeWidth="1.2"
          />
          {/* Red Sneaker Accent Line */}
          <line
            x1={nearLeg.pedalX - 4}
            y1={nearLeg.pedalY + 3}
            x2={nearLeg.pedalX + 5}
            y2={nearLeg.pedalY + 3}
            stroke="#ea1d0f"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
}
