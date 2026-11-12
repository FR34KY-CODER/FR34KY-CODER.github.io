"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { HexMark } from "./HexMark";
import { TransitionLink } from "./TransitionLink";
import { PROFILE } from "@/data/profile";
import { CORE_ROLES, ROLES } from "@/data/roles";
import { useRole } from "@/context/RoleContext";
import { Menu, X } from "lucide-react";

function useJaipurClock() {
  const [timeStr, setTimeStr] = useState("--:--");

  useEffect(() => {
    const update = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-IN", {
          timeZone: PROFILE.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        setTimeStr(formatted);
      } catch {
        setTimeStr("IST");
      }
    };
    update();
    const id = window.setInterval(update, 15000);
    return () => window.clearInterval(id);
  }, []);

  return timeStr;
}

const NAV_LINKS = [
  { href: "/", label: "Index" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { activeRole, setActiveRole } = useRole();
  const jaipurTime = useJaipurClock();

  const brandRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [leftNight, setLeftNight] = useState(false);
  const [rightNight, setRightNight] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Independent Left vs Right header contrast sensing against [data-night]
  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = 0;

    const sampleSide = (el: HTMLElement | null, fallbackNight: boolean) => {
      if (!el) return fallbackNight;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      if (cx < 0 || cy < 0) return fallbackNight;

      const stack = document.elementsFromPoint(cx, cy);
      for (const node of stack) {
        if (el.contains(node) || node.closest("header")) continue;
        if (node.closest("[data-night]")) return true;
        if (node.closest("[data-paper]")) return false;
      }
      return fallbackNight;
    };

    const evaluateContrast = () => {
      rafId = 0;
      setLeftNight(sampleSide(brandRef.current, false));
      setRightNight(sampleSide(navRef.current, pathname === "/"));
    };

    const scheduleEval = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(evaluateContrast);
      }
    };

    evaluateContrast();
    window.addEventListener("scroll", scheduleEval, { passive: true });
    window.addEventListener("resize", scheduleEval, { passive: true });
    window.addEventListener("wheel", scheduleEval, { passive: true });
    window.addEventListener("og:preloader-done", scheduleEval);

    const interval = window.setInterval(evaluateContrast, 200);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.clearInterval(interval);
      window.removeEventListener("scroll", scheduleEval);
      window.removeEventListener("resize", scheduleEval);
      window.removeEventListener("wheel", scheduleEval);
      window.removeEventListener("og:preloader-done", scheduleEval);
    };
  }, [pathname]);

  return (
    <>
      <header className="site-nav fixed top-0 inset-x-0 z-50 pointer-events-none px-4 sm:px-8 py-3.5">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          {/* Left Wordmark — adapts independently */}
          <div
            ref={brandRef}
            className="site-nav__brand pointer-events-auto"
          >
            <TransitionLink
              href="/"
              className="group inline-flex items-center gap-2.5 rounded-full border px-3 py-1.5 backdrop-blur-md focus:outline-none"
              style={{
                color: leftNight ? "#f4f1ea" : "#0f1217",
                borderColor: leftNight
                  ? "rgba(244,241,234,0.18)"
                  : "rgba(15,18,23,0.16)",
                backgroundColor: leftNight
                  ? "rgba(15,18,23,0.72)"
                  : "rgba(244,241,234,0.88)",
              }}
            >
              <HexMark
                size={28}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
              <span className="flex flex-col leading-none">
                <span className="font-sans text-[13px] sm:text-sm font-black tracking-[-0.02em] uppercase">
                  {PROFILE.name}
                </span>
                <span className="font-mono text-[12px] tracking-[0.16em] opacity-80 uppercase">
                  {PROFILE.handle} · {ROLES[activeRole].shortLabel}
                </span>
              </span>
            </TransitionLink>
          </div>

          {/* Right Navigation & Status Clock — adapts independently */}
          <div
            ref={navRef}
            className="site-nav__links pointer-events-auto flex items-center gap-3 sm:gap-5"
            style={{
              color: rightNight ? "#f4f1ea" : "#0f1217",
            }}
          >
            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center gap-1 rounded-full border px-2 py-1 backdrop-blur-md transition-colors duration-200"
              style={{
                borderColor: rightNight
                  ? "rgba(244,241,234,0.16)"
                  : "rgba(15,18,23,0.14)",
                backgroundColor: rightNight
                  ? "rgba(15,18,23,0.52)"
                  : "rgba(244,241,234,0.68)",
              }}
            >
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <TransitionLink
                    key={link.href}
                    href={link.href}
                    className="relative rounded-full px-3.5 py-1.5 font-mono text-[12px] font-medium tracking-[0.14em] uppercase transition-all duration-200"
                    style={{
                      backgroundColor: isActive
                        ? rightNight
                          ? "var(--role-accent-night)"
                          : "#0f1217"
                        : "transparent",
                      color: isActive
                        ? rightNight
                          ? "#0f1217"
                          : "#f4f1ea"
                        : "inherit",
                    }}
                  >
                    {link.label}
                  </TransitionLink>
                );
              })}
            </nav>

            {/* Live IST Status Pill */}
            <div
              title={PROFILE.statusLabel}
              className="hidden sm:flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[12px] tracking-[0.14em] uppercase backdrop-blur-md"
              style={{
                borderColor: rightNight
                  ? "rgba(244,241,234,0.16)"
                  : "rgba(15,18,23,0.14)",
                backgroundColor: rightNight
                  ? "rgba(15,18,23,0.52)"
                  : "rgba(244,241,234,0.68)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="tabular-nums">
                {PROFILE.city} {jaipurTime}
              </span>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="md:hidden inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[12px] tracking-[0.14em] uppercase backdrop-blur-md"
              style={{
                color: leftNight ? "#f4f1ea" : "#0f1217",
                borderColor: leftNight
                  ? "rgba(244,241,234,0.22)"
                  : "rgba(15,18,23,0.18)",
                backgroundColor: leftNight
                  ? "rgba(15,18,23,0.72)"
                  : "rgba(244,241,234,0.8)",
              }}
            >
              {mobileOpen ? <X size={14} /> : <Menu size={14} />}
              <span>{mobileOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Clip-Path Overlay */}
      <div
        data-night=""
        inert={!mobileOpen}
        className={`mmenu fixed inset-0 z-40 flex flex-col justify-between bg-[#0f1217] text-[#f4f1ea] p-6 pt-24 pb-8 transition-[clip-path,opacity] duration-500 ease-in-out md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{
          clipPath: mobileOpen
            ? "circle(150% at 92% 4%)"
            : "circle(0% at 92% 4%)",
        }}
      >
        <div className="space-y-6">
          <div className="font-mono text-[12px] tracking-[0.22em] text-[#f4f1ea]/75 uppercase">
            Directory
          </div>
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link, idx) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-baseline justify-between border-b border-[#f4f1ea]/10 pb-3 text-4xl font-black tracking-tight uppercase"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[var(--role-accent-night)]">
                  0{idx + 1}
                </span>
              </TransitionLink>
            ))}
          </nav>

          <div className="pt-4">
            <div className="mb-3 font-mono text-[12px] tracking-[0.2em] text-[#f4f1ea]/75 uppercase">
              Active Role Lens
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveRole("all")}
                className={`rounded-full border px-3 py-1.5 font-mono text-[12px] uppercase transition ${
                  activeRole === "all"
                    ? "border-[#f4f1ea] bg-[#f4f1ea] text-[#0f1217]"
                    : "border-[#f4f1ea]/20 text-[#f4f1ea]/75"
                }`}
              >
                All 4 Roles
              </button>
              {CORE_ROLES.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setActiveRole(role.id)}
                  className="rounded-full border px-3 py-1.5 font-mono text-[12px] uppercase transition"
                  style={{
                    borderColor:
                      activeRole === role.id
                        ? role.accentNight
                        : "rgba(244,241,234,0.2)",
                    backgroundColor:
                      activeRole === role.id ? role.accentNight : "transparent",
                    color: activeRole === role.id ? "#0f1217" : "#f4f1ea",
                  }}
                >
                  {role.shortLabel}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#f4f1ea]/12 pt-4 font-mono text-xs text-[#f4f1ea]/75">
          <span>
            {PROFILE.city} · {jaipurTime} IST
          </span>
          <a
            href={
              PROFILE.socials.find((s) => s.label === "GitHub")?.href ||
              "https://github.com/FR34KY-CODER"
            }
            target="_blank"
            rel="noreferrer"
            className="underline decoration-[#f4f1ea]/30 underline-offset-4 hover:text-[#f4f1ea]"
          >
            GitHub
          </a>
        </div>
      </div>
    </>
  );
}

