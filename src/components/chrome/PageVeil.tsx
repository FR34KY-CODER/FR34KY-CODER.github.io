"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HexMark } from "./HexMark";
import { VEIL_EVENT, VeilNavigateDetail } from "@/lib/navigation";

export function PageVeil() {
  const veilRef = useRef<HTMLDivElement>(null);
  const iconWrapRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isTransitioningRef = useRef(false);
  const exitTimerRef = useRef<number | null>(null);

  const revealOut = () => {
    const el = veilRef.current;
    if (!el || !isTransitioningRef.current) return;

    if (exitTimerRef.current) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }

    gsap.killTweensOf([el, iconWrapRef.current]);
    gsap.to(iconWrapRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(el, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 0.45,
      ease: "power4.inOut",
      onComplete: () => {
        isTransitioningRef.current = false;
        el.style.pointerEvents = "none";
        gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
        try {
          gsap.registerPlugin(ScrollTrigger);
          ScrollTrigger.refresh();
        } catch {
          // Safe fallback
        }
      },
    });
  };

  useEffect(() => {
    revealOut();
  }, [pathname]);

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<VeilNavigateDetail>;
      const detail = custom.detail;
      const el = veilRef.current;
      if (!el || !detail) {
        detail?.onReady();
        return;
      }

      isTransitioningRef.current = true;
      el.style.pointerEvents = "auto";

      gsap.killTweensOf([el, iconWrapRef.current]);
      gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(iconWrapRef.current, { opacity: 0, scale: 0.85 });

      gsap
        .timeline({
          onComplete: () => {
            detail.onReady();
            // Safety timeout in case route query/hash didn't alter pathname
            exitTimerRef.current = window.setTimeout(() => {
              revealOut();
            }, 350);
          },
        })
        .to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.34,
          ease: "power4.inOut",
        })
        .to(
          iconWrapRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.22,
            ease: "power2.out",
          },
          0.1
        );
    };

    window.addEventListener(VEIL_EVENT, handler);
    return () => {
      window.removeEventListener(VEIL_EVENT, handler);
      if (exitTimerRef.current) window.clearTimeout(exitTimerRef.current);
    };
  }, []);

  return (
    <div
      ref={veilRef}
      aria-hidden="true"
      className="veil fixed inset-0 z-[9990] pointer-events-none flex items-center justify-center bg-[#0f1217] text-[#f4f1ea]"
      style={{ clipPath: "inset(100% 0% 0% 0%)" }}
    >
      <div
        ref={iconWrapRef}
        className="flex flex-col items-center gap-3 opacity-0"
      >
        <HexMark size={56} strokeWidth={2.4} />
        <span className="font-mono text-[12px] tracking-[0.26em] uppercase text-[#f4f1ea]/75">
          SWITCHING SECTOR
        </span>
      </div>
    </div>
  );
}

