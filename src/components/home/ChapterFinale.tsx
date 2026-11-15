"use client";

import React, { useState } from "react";
import { ArrowRight, Mail, Radio, Sparkles } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { CORE_ROLES } from "@/data/roles";
import { useRole } from "@/context/RoleContext";
import { TransitionLink } from "@/components/chrome/TransitionLink";

export function ChapterFinale() {
  const { activeRole, roleData } = useRole();
  const [signalLit, setSignalLit] = useState(false);

  const contactHref =
    activeRole === "all" ? "/contact" : `/contact?role=${activeRole}`;

  return (
    <section
      id="both-sides"
      data-night=""
      className="relative overflow-hidden bg-[#0a0d12] text-[#f4f1ea] border-t border-[#f4f1ea]/10"
    >
      {/* Subtle Starfield + Skyline Silhouette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 opacity-25"
      >
        <div className="flex h-full items-end justify-between gap-1 px-2">
          {[
            70, 130, 95, 175, 110, 210, 88, 155, 190, 125, 220, 102, 168, 92,
            184, 140, 118, 196, 86, 145,
          ].map((height, i) => (
            <div
              key={i}
              className="relative flex-1 bg-[#18202c]"
              style={{ height }}
            >
              {i % 3 === 0 && (
                <span className="absolute top-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-xs bg-amber-300/60" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 py-24 sm:py-32">
        {/* Top Row: Chapter Title + Hover-Lit Bat-Signal Easter Egg */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-[#f4f1ea]/75">
              Ch 06 · The Merge · Ready To Ship
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-[-0.03em] uppercase">
              Build The{" "}
              <span style={{ color: roleData.accentNight }}>Whole Thing</span>.
            </h2>
          </div>

          {/* Interactive Hover-Lit Bat-Signal Easter Egg */}
          <div
            onMouseEnter={() => setSignalLit(true)}
            onMouseLeave={() => setSignalLit(false)}
            onClick={() => setSignalLit((prev) => !prev)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSignalLit((prev) => !prev);
              }
            }}
            aria-label="Toggle night engineering beacon signal"
            className="batsignal group relative flex cursor-pointer items-center gap-4 self-start md:self-auto rounded-2xl border border-[#f4f1ea]/15 bg-[#121721]/90 p-4 transition-all duration-300 hover:border-[var(--role-accent-night)]"
          >
            {signalLit && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-28 left-2 h-32 w-24 -translate-x-2 opacity-60 transition-opacity duration-300"
                style={{
                  background: `conic-gradient(from 165deg at 50% 100%, transparent 0deg, ${roleData.accentNight}55 18deg, transparent 36deg)`,
                  filter: "blur(6px)",
                }}
              />
            )}
            <div
              className="relative flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300"
              style={{
                borderColor: signalLit
                  ? roleData.accentNight
                  : "rgba(244,241,234,0.22)",
                backgroundColor: signalLit
                  ? roleData.accentNight
                  : "rgba(244,241,234,0.04)",
                boxShadow: signalLit
                  ? `0 0 36px ${roleData.accentNight}99`
                  : "none",
              }}
            >
              <Radio
                size={22}
                className={signalLit ? "animate-pulse text-[#0f1217]" : "text-[#f4f1ea]/75"}
              />
            </div>

            <div className="font-mono">
              <div className="text-[12px] tracking-[0.18em] uppercase text-[#f4f1ea]/75">
                {signalLit ? "BEACON ACTIVE · JAIPUR" : "NIGHT SIGNAL · HOVER"}
              </div>
              <div className="mt-0.5 text-xs font-bold uppercase tracking-[0.12em]">
                {signalLit
                  ? `${PROFILE.handle} · SIGNAL RECEIVED`
                  : "LIGHT THE OG BEACON"}
              </div>
            </div>
          </div>
        </div>

        {/* Center Finale Card */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl border border-[#f4f1ea]/14 bg-[#121722]/90 p-7 sm:p-10 backdrop-blur-md">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f4f1ea]/16 bg-[#f4f1ea]/[0.04] px-3.5 py-1 font-mono text-[12px] uppercase tracking-[0.16em]">
              <Sparkles size={12} style={{ color: roleData.accentNight }} />
              <span>Automated Visitor Dispatch Enabled</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
              Hiring for AI Engineering, Backend Systems, Data Science, or ML
              Roles?
            </h3>

            <p className="max-w-2xl text-base leading-relaxed text-[#f4f1ea]/75">
              Drop your details on the dispatch console. My portfolio sends an
              instant formatted mission email right to my inbox — complete with
              a live preview and interactive CLI confirmation before it even
              leaves the browser.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {CORE_ROLES.map((role) => (
                <TransitionLink
                  key={role.id}
                  href={`/contact?role=${role.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#f4f1ea]/15 bg-[#0b0e14] px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.12em] text-[#f4f1ea]/80 hover:border-[#f4f1ea]/45 hover:text-[#f4f1ea] transition"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: role.accentNight }}
                  />
                  <span>{role.title}</span>
                </TransitionLink>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-5 rounded-2xl border border-[#f4f1ea]/12 bg-[#0b0e14] p-6">
            <div className="space-y-2 font-mono text-xs text-[#f4f1ea]/75">
              <div className="flex items-center justify-between">
                <span>STATUS</span>
                <span className="text-emerald-400 font-bold">
                  ● {PROFILE.statusLabel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>BASE</span>
                <span className="text-[#f4f1ea]">{PROFILE.city}, IN</span>
              </div>
              <div className="flex items-center justify-between">
                <span>DIRECT MAIL</span>
                <span className="text-[#f4f1ea]">{PROFILE.email}</span>
              </div>
            </div>

            <div className="space-y-3">
              <TransitionLink
                href={contactHref}
                className="flex w-full items-center justify-between rounded-full px-6 py-4 font-mono text-xs font-extrabold uppercase tracking-[0.16em] text-[#0f1217] transition-transform hover:scale-[1.01]"
                style={{ backgroundColor: roleData.accentNight }}
              >
                <span>Open Dispatch Terminal</span>
                <ArrowRight size={15} />
              </TransitionLink>

              <a
                href={`mailto:${PROFILE.email}`}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#f4f1ea]/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-[#f4f1ea]/85 hover:bg-[#f4f1ea] hover:text-[#0f1217] transition-colors"
              >
                <Mail size={14} />
                <span>Send Raw Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

