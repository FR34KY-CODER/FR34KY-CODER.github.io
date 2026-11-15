"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { HexMark } from "./HexMark";
import { PROFILE } from "@/data/profile";

export const PRELOADER_DONE_EVENT = "og:preloader-done";
const SESSION_KEY = "og_preloader_seen_v1";

export function Preloader() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === "1";

    if (prefersReduced || alreadySeen || pathname !== "/") {
      window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
      return;
    }

    setVisible(true);
  }, [pathname]);

  useEffect(() => {
    if (!visible || !containerRef.current) return;

    const root = containerRef.current;
    const drawPaths = root.querySelectorAll<SVGGeometryElement>("[data-draw]");

    const ctx = gsap.context(() => {
      const counter = { val: 0 };

      drawPaths.forEach((p) => {
        try {
          const len = p.getTotalLength();
          gsap.set(p, {
            strokeDasharray: len,
            strokeDashoffset: len,
          });
        } catch {
          // Ignore non-geometry elements
        }
      });

      const tl = gsap.timeline({
        onComplete: () => {
          window.sessionStorage.setItem(SESSION_KEY, "1");
          window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
          setVisible(false);
        },
      });

      tl.to(
        drawPaths,
        {
          strokeDashoffset: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.inOut",
        },
        0
      )
        .to(
          counter,
          {
            val: 100,
            duration: 0.55,
            ease: "power2.out",
            onUpdate: () => {
              if (pctRef.current) {
                pctRef.current.textContent = `${Math.round(counter.val)
                  .toString()
                  .padStart(3, "0")}%`;
              }
            },
          },
          0
        )
        .fromTo(
          labelRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          0.08
        )
        .to(
          root,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.45,
            ease: "power4.inOut",
          },
          0.62
        );
    }, containerRef);

    return () => ctx.revert();
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      data-night=""
      aria-hidden="true"
      className="loader fixed inset-0 z-[9995] flex flex-col items-center justify-center bg-[#0f1217] text-[#f4f1ea] select-none"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="flex flex-col items-center gap-6 px-6">
        <div className="relative flex items-center justify-center">
          <HexMark size={84} strokeWidth={2.2} animateDraw />
        </div>

        <div
          ref={labelRef}
          className="flex flex-col items-center gap-2 text-center font-mono"
        >
          <span className="text-xs tracking-[0.28em] text-[#f4f1ea]/80 uppercase">
            {PROFILE.name} · {PROFILE.city}
          </span>
          <div className="flex items-center gap-3 text-[12px] tracking-[0.2em] text-[#f4f1ea]/75">
            <span>INITIALIZING 4 ROLES</span>
            <span className="inline-block h-1 w-1 rounded-full bg-[var(--role-accent-night)]" />
            <span ref={pctRef} className="tabular-nums text-[#f4f1ea]">
              000%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

