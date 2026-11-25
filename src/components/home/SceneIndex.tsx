"use client";

import type { ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SceneIndex({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="scene-index" onToggle={() => ScrollTrigger.refresh()}>
      <summary>{title}</summary>
      {children}
    </details>
  );
}
