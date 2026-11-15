"use client";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const VEIL_EVENT = "og:veil-navigate";
export const CURSOR_RESET_EVENT = "og:cursor-reset";

export interface VeilNavigateDetail {
  href: string;
  onReady: () => void;
}

export function scrollToSectionId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
}

export function triggerRouteNavigation(
  href: string,
  router: AppRouterInstance
): void {
  if (typeof window === "undefined") {
    router.push(href);
    return;
  }

  // Handle pure hash links on the same page cleanly
  if (href.startsWith("#")) {
    scrollToSectionId(href.slice(1));
    return;
  }

  if (href.startsWith("/#") && window.location.pathname === "/") {
    scrollToSectionId(href.slice(2));
    return;
  }

  // Respect reduced motion
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) {
    window.dispatchEvent(new CustomEvent(CURSOR_RESET_EVENT));
    router.push(href);
    return;
  }

  let navigated = false;
  const performPush = () => {
    if (navigated) return;
    navigated = true;
    window.dispatchEvent(new CustomEvent(CURSOR_RESET_EVENT));
    router.push(href);
  };

  window.dispatchEvent(
    new CustomEvent<VeilNavigateDetail>(VEIL_EVENT, {
      detail: {
        href,
        onReady: performPush,
      },
    })
  );
}

