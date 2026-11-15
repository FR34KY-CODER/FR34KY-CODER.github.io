"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CURSOR_RESET_EVENT } from "@/lib/navigation";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>("");
  const [isNight, setIsNight] = useState<boolean>(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const moveDotX = gsap.quickTo(dot, "x", {
      duration: 0.1,
      ease: "power3.out",
    });
    const moveDotY = gsap.quickTo(dot, "y", {
      duration: 0.1,
      ease: "power3.out",
    });
    const moveRingX = gsap.quickTo(ring, "x", {
      duration: 0.32,
      ease: "power3.out",
    });
    const moveRingY = gsap.quickTo(ring, "y", {
      duration: 0.32,
      ease: "power3.out",
    });

    let lastX = -100;
    let lastY = -100;

    const updateContextAtPoint = (x: number, y: number) => {
      const target = document.elementFromPoint(x, y);
      if (!target) return;

      const overNight = Boolean(target.closest("[data-night]"));
      setIsNight(overNight);

      const cardTarget = target.closest<HTMLElement>(
        "[data-cursor-label], [data-card], [data-shop]"
      );
      if (cardTarget) {
        const customLabel = cardTarget.getAttribute("data-cursor-label");
        setLabel(customLabel || "VIEW");
        setIsHoveringInteractive(true);
        return;
      }

      const interactiveTarget = target.closest(
        "a, button, input, textarea, select, [role='button'], [data-interactive]"
      );
      setLabel("");
      setIsHoveringInteractive(Boolean(interactiveTarget));
    };

    const onMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      document.documentElement.classList.add("has-custom-cursor");
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      moveDotX(lastX);
      moveDotY(lastY);
      moveRingX(lastX);
      moveRingY(lastY);
      updateContextAtPoint(lastX, lastY);
    };

    const onScroll = () => {
      if (lastX >= 0 && lastY >= 0) {
        updateContextAtPoint(lastX, lastY);
      }
    };

    const onMouseLeave = () => {
      document.documentElement.classList.remove("has-custom-cursor");
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onReset = () => {
      setLabel("");
      setIsHoveringInteractive(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("blur", onMouseLeave);
    window.addEventListener(CURSOR_RESET_EVENT, onReset);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("blur", onMouseLeave);
      gsap.killTweensOf([dot, ring]);
      window.removeEventListener(CURSOR_RESET_EVENT, onReset);
    };
  }, [enabled]);

  if (!enabled) return null;

  const hasLabel = label.length > 0;

  return (
    <div
      aria-hidden="true"
      className="cur pointer-events-none fixed inset-0 z-[9999]"
    >
      {/* Fast center dot */}
      <div
        ref={dotRef}
        className="cur__dot fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-150"
        style={{
          opacity: 0,
          width: hasLabel ? 0 : 6,
          height: hasLabel ? 0 : 6,
          backgroundColor: isNight
            ? "var(--role-accent-night, #ea1d0f)"
            : "var(--role-accent-paper, #0f1217)",
        }}
      />

      {/* Lagging ring / View pill */}
      <div
        ref={ringRef}
        className="cur__ring fixed top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-[12px] font-bold tracking-[0.14em] uppercase transition-[width,height,background-color,border-color,color] duration-200"
        style={{
          opacity: 0,
          width: hasLabel ? 64 : isHoveringInteractive ? 42 : 28,
          height: hasLabel ? 32 : isHoveringInteractive ? 42 : 28,
          borderColor: hasLabel
            ? "transparent"
            : isNight
              ? "rgba(244, 241, 234, 0.55)"
              : "rgba(15, 18, 23, 0.45)",
          backgroundColor: hasLabel
            ? isNight
              ? "var(--role-accent-night, #ea1d0f)"
              : "#0f1217"
            : isHoveringInteractive
              ? isNight
                ? "rgba(244, 241, 234, 0.08)"
                : "rgba(15, 18, 23, 0.06)"
              : "transparent",
          color: "#f4f1ea",
        }}
      >
        {hasLabel ? <span>{label}</span> : null}
      </div>
    </div>
  );
}

