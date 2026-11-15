"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UseHorizontalSceneOptions {
  onTravel?: (travelPx: number, rotationDeg: number) => void;
  onActiveChange?: (isActive: boolean) => void;
}

// Both scenes use the same measured travel, including after a viewport resize.
export function useHorizontalScene(options?: UseHorizontalSceneOptions) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const callbacksRef = useRef(options);
  callbacksRef.current = options;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;
    const media = gsap.matchMedia();

    const update = () => {
      const travel = viewport.scrollLeft;
      const rotation = travel / 3;
      section.style.setProperty("--travel", `${travel}px`);
      section.style.setProperty("--rotation", `${rotation}deg`);
      callbacksRef.current?.onTravel?.(travel, rotation);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.32) {
            callbacksRef.current?.onActiveChange?.(true);
          } else if (!entry.isIntersecting) {
            callbacksRef.current?.onActiveChange?.(false);
          }
        }
      },
      { threshold: [0.1, 0.35, 0.65] }
    );
    observer.observe(section);

    viewport.addEventListener("scroll", update, { passive: true });
    media.add("(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)", () => {
      viewport.scrollLeft = 0;
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const tween = gsap.to(viewport, {
        scrollLeft: distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.55,
          invalidateOnRefresh: true,
          onToggle: (self) => callbacksRef.current?.onActiveChange?.(self.isActive),
        },
      });
      triggerRef.current = tween.scrollTrigger ?? null;
      const focus = (event: FocusEvent) => {
        const item = (event.target as HTMLElement).closest<HTMLElement>("[data-scene-item]");
        const trigger = triggerRef.current;
        if (!item || !trigger) return;
        const target = Math.max(
          0,
          Math.min(distance(), item.offsetLeft - viewport.clientWidth / 2 + item.offsetWidth / 2)
        );
        window.scrollTo({ top: trigger.start + target, behavior: "instant" });
      };
      track.addEventListener("focusin", focus);
      return () => {
        track.removeEventListener("focusin", focus);
        triggerRef.current = null;
      };
    });
    return () => {
      media.revert();
      observer.disconnect();
      viewport.removeEventListener("scroll", update);
    };
  }, []);

  const advance = (direction: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const distance = viewport.scrollWidth - viewport.clientWidth;
    const target = Math.max(
      0,
      Math.min(distance, viewport.scrollLeft + direction * Math.min(460, viewport.clientWidth * 0.85))
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduced ? "instant" : "smooth";
    if (triggerRef.current) {
      window.scrollTo({ top: triggerRef.current.start + target, behavior });
    } else {
      viewport.scrollTo({ left: target, behavior });
    }
  };
  return { sectionRef, viewportRef, trackRef, advance };
}
