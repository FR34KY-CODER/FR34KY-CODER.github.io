"use client";

import { useEffect, useRef, type RefObject } from "react";

type Point = [number, number, number];
const tau = Math.PI * 2;
export const stringColors = ["#b6a2ff", "#f0a8c1", "#93aaff", "#dad8ff"] as const;

// Each bundle opens into standing-wave lobes and converges at the wave nodes.
function strand(arm: number, fiber: number, t: number): Point {
  const angle = arm * tau / 4 + .45 * Math.sin(Math.PI * t);
  const phase = fiber * tau / 12 + t * 8;
  const radius = t * 1.63;
  const envelope = Math.sin(t * Math.PI) * (.06 + .13 * Math.sin(t * 9));
  const lateral = Math.cos(phase) * envelope;
  return [
    radius * Math.cos(angle) - Math.sin(angle) * lateral,
    Math.sin(t * 6 + arm * 1.4) * t * .22 + Math.sin(phase) * envelope,
    radius * Math.sin(angle) + Math.cos(angle) * lateral,
  ];
}
const arms = stringColors.map((_, arm) => Array.from({length:12}, (_, fiber) =>
  Array.from({length:81}, (_, step) => strand(arm, fiber, step / 80))));

// A closed trefoil thread ties the four bundles together at the origin.
const knot = Array.from({length:7}, (_, thread) =>
  Array.from({length:145}, (_, step): Point => {
    const u = tau * step / 144;
    const phase = 3*u + thread*.09;
    const radius = .1 + .045 * Math.cos(phase);
    return [radius*Math.cos(2*u), .077*Math.sin(phase), radius*Math.sin(2*u)];
  }));

export function SignalVolume({ stage, progress, labels, paused }: {
  stage: RefObject<HTMLDivElement | null>;
  progress: RefObject<number>;
  labels: RefObject<(HTMLButtonElement | null)[]>;
  paused: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
    stage.current?.dispatchEvent(new Event("graph-turn"));
  }, [paused, stage]);

  useEffect(() => {
    const surface = canvas.current, host = stage.current;
    const ctx = surface?.getContext("2d");
    if (!surface || !host || !ctx) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const footer = host.querySelector<HTMLElement>(".signal-foot");
    let width = 0, height = 0, frame = 0, orbit = 0, lastDraw = 0;
    let visible = true;
    function draw(now: number) {
      frame = 0;
      if (!ctx || !host || !visible || document.hidden || !width) return;
      const drifting = !pausedRef.current && !motion.matches;
      if (drifting && lastDraw && now-lastDraw < 30) { schedule(); return; }
      if (drifting && lastDraw) orbit += Math.min(now-lastDraw,80) * tau / 160000;
      lastDraw = drifting ? now : 0;
      const turn = progress.current * Math.PI / 2 - .64 + orbit;
      const co = Math.cos(turn), si = Math.sin(turn);
      const compact = width < 720;
      const centerY = height * (compact ? .445 : .47);
      const sx = width * (compact ? .51 : .48), sy = Math.min(height * .56, width * .53);
      function project([x,y,z]: Point) {
        const side = co*x + si*z, depth = -si*x + co*z;
        const scale = 3.8 / (3.8 - depth * .83 - y * .55);
        return [width / 2 + side*sx*scale, centerY + (depth*.52-y*.85)*sy*scale, scale];
      }
      function line(points: Point[]) {
        ctx!.beginPath();
        points.forEach((p,i) => { const [x,y] = project(p); if (i) ctx!.lineTo(x,y); else ctx!.moveTo(x,y); });
        ctx!.stroke();
      }
      ctx.clearRect(0,0,width,height);
      ctx.globalCompositeOperation="lighter";
      const active = Math.round(progress.current);
      const order = [0,1,2,3].sort((a,b) => project(arms[a][0][40])[2]-project(arms[b][0][40])[2]);
      const footerTop = footer?.offsetTop ?? height;
      const margins = labels.current.map(label => (label?.offsetWidth ?? 0)/2 + 9);
      function drawKnot() {
        ctx!.strokeStyle="#d6cbff"; ctx!.globalAlpha=.65; ctx!.lineWidth=.95;
        knot.forEach(line);
      }
      for (const [layer,i] of order.entries()) {
        if (layer===2) drawKnot();
        const depth = project(arms[i][5][40])[2];
        ctx.strokeStyle = stringColors[i];
        ctx.globalAlpha = .09*depth;
        ctx.lineWidth = 5*depth;
        line(arms[i][3]); line(arms[i][9]);
        ctx.lineWidth = (i === active ? 1.2 : .85)*depth;
        ctx.globalAlpha = (i === active ? .8 : .49)*depth;
        for (const path of arms[i]) line(path);
        let attachment = .56;
        let [x,y] = project(strand(i,0,attachment));
        while (y > footerTop - 32 && attachment > .2) {
          attachment -= .025;
          [x,y] = project(strand(i,0,attachment));
        }
        const label = labels.current[i];
        if (label) {
          const margin = margins[i];
          label.style.left = Math.max(margin,Math.min(width-margin,x))+"px";
          label.style.top = y+"px";
        }
      }
      ctx.globalAlpha=1;
      if (drifting) schedule();
    }
    function schedule() {
      if (!frame && visible && !document.hidden) frame=requestAnimationFrame(draw);
    }
    function resume() { lastDraw=0; schedule(); }
    const visibility = new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; resume(); });
    visibility.observe(host);
    const resize = new ResizeObserver(() => {
      width=host.clientWidth; height=host.clientHeight;
      const ratio=Math.min(devicePixelRatio,2);
      surface.width=Math.round(width*ratio); surface.height=Math.round(height*ratio);
      ctx.setTransform(ratio,0,0,ratio,0,0); schedule();
    });
    resize.observe(host);
    host.addEventListener("graph-turn",schedule);
    motion.addEventListener("change",resume);
    document.addEventListener("visibilitychange",resume);
    return () => {
      resize.disconnect(); visibility.disconnect(); cancelAnimationFrame(frame);
      motion.removeEventListener("change",resume); document.removeEventListener("visibilitychange",resume);
      host.removeEventListener("graph-turn",schedule);
    };
  }, [stage,progress,labels]);
  return <canvas ref={canvas} className="signal-volume" aria-hidden="true"/>;
}
