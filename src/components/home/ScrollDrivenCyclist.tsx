"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

const frameUrls = Array.from({ length: 8 }, (_, i) => `/images/avatars/cyclist-pedal-${i + 1}.webp`);

export function ScrollDrivenCyclist({ className = "", rotationRef }: {
  className?: string;
  rotationRef?: RefObject<number>;
}) {
  const root = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const container = root.current;
    if (!container) return;
    const frames = Array.from(container.querySelectorAll("img"));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ready = false;
    let visible = false;
    let disposed = false;
    let active = 0;
    let elapsed = 0;
    let previous = 0;
    let animation = 0;

    function show(index: number) {
      if (index === active) return;
      frames[index].style.visibility = "visible";
      frames[active].style.visibility = "hidden";
      active = index;
    }

    function tick(now: number) {
      if (previous) elapsed += Math.min(now - previous, 100);
      previous = now;
      const degrees = elapsed * 0.09 + (rotationRef?.current ?? 0) * 1.8;
      show(Math.floor(((degrees % 360 + 360) % 360) / (360 / frames.length)));
      animation = requestAnimationFrame(tick);
    }

    function sync() {
      cancelAnimationFrame(animation);
      previous = 0;
      if (disposed) return;
      if (motion.matches) show(0);
      else if (ready && visible && !document.hidden) animation = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(container);
    void Promise.all(frames.map(frame => frame.decode())).then(() => {
      ready = true;
      sync();
    }).catch(() => { /* Keep the poster visible if the sequence cannot decode. */ });
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(animation);
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [rotationRef]);

  return (
    <div ref={root} role="img" aria-label="Developer riding a bicycle"
      className={`relative aspect-square pointer-events-none ${className}`}>
      {frameUrls.map((src, index) => (
        <img key={src} src={src} alt="" width={1024} height={1024} decoding="async"
          className="absolute inset-0 h-full w-full object-contain"
          style={{ visibility: index === 0 ? "visible" : "hidden" }} />
      ))}
    </div>
  );
}
