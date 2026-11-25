"use client";

import { useEffect, useRef } from "react";
import { CURSOR_RESET_EVENT } from "@/lib/navigation";

export function CustomCursor() {
  const point = useRef<HTMLDivElement>(null);
  const tip = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dot = point.current!, bubble = tip.current!;
    const media = matchMedia("(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)");
    let lastTarget: Element | null = null;
    let x = -1, y = -1, frame = 0;
    function hide() {
      x = -1;
      lastTarget = null;
      dot.hidden = bubble.hidden = true;
      document.documentElement.classList.remove("has-custom-cursor");
    }
    function paint() {
      frame = 0;
      if (x < 0 || !media.matches) return;
      const hit = document.elementFromPoint(x,y);
      if (!hit || hit.closest('input,textarea,[contenteditable=true],select')) { hide(); return; }
      dot.hidden = false;
      document.documentElement.classList.add("has-custom-cursor");
      dot.style.transform = `translate(${x-5}px,${y-5}px)`;
      const target = hit.closest("[data-insight]");
      if (target !== lastTarget) {
        lastTarget = target;
        bubble.textContent = target?.getAttribute("data-insight") ?? "";
        bubble.hidden = !bubble.textContent;
      }
      if (!bubble.hidden) {
        const left = Math.min(x+16, innerWidth-bubble.offsetWidth-8);
        const top = y+18+bubble.offsetHeight < innerHeight ? y+18 : y-bubble.offsetHeight-12;
        bubble.style.transform = `translate(${Math.max(8,left)}px,${Math.max(8,top)}px)`;
      }
    }
    function queue() { if (!frame && x>=0) frame=requestAnimationFrame(paint); }
    function move(e: PointerEvent) {
      if (e.pointerType !== "mouse" || !media.matches) { hide(); return; }
      x=e.clientX; y=e.clientY; queue();
    }
    window.addEventListener("pointermove",move,{passive:true});
    window.addEventListener("scroll",queue,true);
    document.addEventListener("pointerleave",hide);
    window.addEventListener("blur",hide);
    window.addEventListener(CURSOR_RESET_EVENT,hide);
    media.addEventListener("change",hide);
    return () => {
      hide(); cancelAnimationFrame(frame);
      window.removeEventListener("pointermove",move);
      window.removeEventListener("scroll",queue,true);
      document.removeEventListener("pointerleave",hide);
      window.removeEventListener("blur",hide);
      window.removeEventListener(CURSOR_RESET_EVENT,hide);
      media.removeEventListener("change",hide);
    };
  }, []);
  return <><div hidden aria-hidden="true" ref={point} className="signal-cursor"/>
    <div hidden aria-hidden="true" ref={tip} className="signal-hint"/></>;
}
