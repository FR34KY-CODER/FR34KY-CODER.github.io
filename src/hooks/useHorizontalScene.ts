"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UseHorizontalSceneOptions {
  onTravel?: (travelPx: number, rotationDeg: number, progress: number) => void;
  onActiveChange?: (isActive: boolean) => void;
}

// Both scenes use the same measured travel, including after a viewport resize.
export function useHorizontalScene(options?: UseHorizontalSceneOptions) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const stops = useRef<number[]>([]);
  const [position, setPosition] = useState(0);
  const [last, setLast] = useState(0);
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
      const positions = stops.current;
      const nearest = positions.reduce((best, offset, index) =>
        Math.abs(offset - travel) < Math.abs(positions[best] - travel) ? index : best, 0);
      setPosition(positions.length && travel > 0 && travel >= positions[positions.length - 1] - 1 ? positions.length - 1 : nearest);
      const rotation = travel / 3;
      const distance = Math.max(1, track.scrollWidth - viewport.clientWidth);
      const progress = Math.min(1, Math.max(0, travel / distance));
      section.style.setProperty("--travel", `${travel}px`);
      section.style.setProperty("--rotation", `${rotation}deg`);
      section.style.setProperty("--street-progress", `${progress}`);
      callbacksRef.current?.onTravel?.(travel, rotation, progress);
    };

    const measure = () => {
      const bounds = viewport.getBoundingClientRect();
      const limit = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const items = Array.from(track.querySelectorAll<HTMLElement>("[data-scene-item]"));
      stops.current = items.map((item, index) => {
        if (index === 0) return 0;
        if (index === items.length - 1) return limit;
        const rect = item.getBoundingClientRect();
        const center = viewport.scrollLeft + rect.left - bounds.left + (rect.width - bounds.width) / 2;
        return Math.max(0, Math.min(limit, center));
      });
      setLast(Math.max(0, items.length - 1));
      update();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(track);
    resize.observe(viewport);
    measure();

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
        const bounds = viewport.getBoundingClientRect();
        const rect = item.getBoundingClientRect();
        const syncedTravel = trigger.progress * distance();
        const left = viewport.scrollLeft + rect.left - bounds.left;
        if (left >= syncedTravel - 1 && left + rect.width <= syncedTravel + bounds.width + 1) return;
        const target = Math.max(0, Math.min(distance(), left + (rect.width - bounds.width) / 2));
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
      resize.disconnect();
      observer.disconnect();
      viewport.removeEventListener("scroll", update);
    };
  }, []);

  const advance = (direction: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const offsets = stops.current;
    const target = direction > 0
      ? offsets.find(offset => offset > viewport.scrollLeft + 1)
      : offsets.slice().reverse().find(offset => offset < viewport.scrollLeft - 1);
    if (target === undefined) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduced ? "instant" : "smooth";
    if (triggerRef.current) {
      window.scrollTo({ top: triggerRef.current.start + target, behavior });
    } else {
      viewport.scrollTo({ left: target, behavior });
    }
  };
  return { sectionRef, viewportRef, trackRef, advance, position, last };
}
