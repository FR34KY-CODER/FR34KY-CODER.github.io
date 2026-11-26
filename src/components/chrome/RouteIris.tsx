"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function RouteIris() {
  const path=usePathname(), previous=useRef(path);
  const veil=useRef<HTMLDivElement>(null);
  const origin=useRef<{x:number;y:number;path:string}|null>(null);
  useEffect(()=>{
    function record(e:MouseEvent) {
      const link=e.target instanceof Element ? e.target.closest("a[href]") : null;
      if(!(link instanceof HTMLAnchorElement) || link.origin!==location.origin || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || link.target==="_blank") return;
      const bounds=link.getBoundingClientRect();
      origin.current={x:e.detail ? e.clientX : bounds.left+bounds.width/2,y:e.detail ? e.clientY : bounds.top+bounds.height/2,path:link.pathname};
    }
    document.addEventListener("click",record,true);
    return ()=>document.removeEventListener("click",record,true);
  },[]);
  useLayoutEffect(()=>{
    if(path===previous.current) return;
    previous.current=path;
    const click=origin.current; origin.current=null;
    if(!veil.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el=veil.current;
    el.style.setProperty("--iris-x",(click?.path===path ? click.x : innerWidth/2)+"px");
    el.style.setProperty("--iris-y",(click?.path===path ? click.y : innerHeight/2)+"px");
    el.classList.remove("opening");
    void el.offsetWidth;
    el.classList.add("opening");
  },[path]);
  return <div ref={veil} className="route-iris" aria-hidden="true" onAnimationEnd={e=>e.currentTarget.classList.remove("opening")}/>;
}
