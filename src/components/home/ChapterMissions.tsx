"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { CORE_ROLES, CoreRoleId, ROLES } from "@/data/roles";
import { PROJECTS } from "@/data/projects";
import { useRole } from "@/context/RoleContext";
import { TransitionLink } from "@/components/chrome/TransitionLink";

export function ChapterMissions() {
  const { activeRole, setActiveRole } = useRole();
  const detailRef = useRef<HTMLDivElement>(null);

  const selectedCoreId: CoreRoleId =
    activeRole === "all" ? "ai" : activeRole;
  const selectedRole = ROLES[selectedCoreId];

  const matchingProjects = PROJECTS.filter((p) =>
    p.roles.includes(selectedCoreId)
  ).slice(0, 3);

  useEffect(() => {
    if (!detailRef.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        detailRef.current,
        { opacity: 0.4, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }, detailRef);

    return () => ctx.revert();
  }, [selectedCoreId]);

  return (
    <section
      id="missions"
      className="relative grid grid-cols-1 lg:grid-cols-12 min-h-screen border-t border-[#0f1217]/10"
    >
      {/* LEFT SELECTOR COLUMN (Warm Paper) */}
      <div
        data-paper=""
        className="lg:col-span-5 flex flex-col justify-between bg-[#f4f1ea] px-6 sm:px-10 lg:px-12 pt-28 pb-20 text-[#0f1217]"
      >
        <div className="space-y-3">
          <div className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#0f1217]/75">
            Ch 05 · Missions · Role Selector
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase leading-[0.95]">
            Pick Your
            <br />
            Deployment
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-[#0f1217]/72">
            Whether you need an AI systems builder, backend architect, causal
            data scientist, or production ML engineer — inspect each role
            loadout below.
          </p>
        </div>

        {/* 4 Interactive Role Rows */}
        <div className="my-8 space-y-2.5">
          {CORE_ROLES.map((role) => {
            const isSelected = selectedCoreId === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setActiveRole(role.id)}
                className={`group flex w-full items-center justify-between rounded-2xl border p-4 sm:p-5 text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-[#0f1217] bg-[#0f1217] text-[#f4f1ea] shadow-xl"
                    : "border-[#0f1217]/15 bg-white/75 text-[#0f1217] hover:border-[#0f1217]/40 hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="font-mono text-sm font-black tabular-nums"
                    style={{
                      color: isSelected
                        ? role.accentNight
                        : "rgba(15,18,23,0.45)",
                    }}
                  >
                    {role.code}
                  </span>
                  <div>
                    <div className="text-lg sm:text-xl font-black tracking-tight uppercase">
                      {role.title}
                    </div>
                    <div
                      className={`font-mono text-[12px] tracking-[0.14em] uppercase ${
                        isSelected ? "text-[#f4f1ea]/75" : "text-[#0f1217]/75"
                      }`}
                    >
                      {(role.mission?.loadout || role.heroSplitLeft.badges)
                        .slice(0, 2)
                        .join(" · ")}
                    </div>
                  </div>
                </div>

                <ArrowRight
                  size={16}
                  className={`transition-transform duration-200 ${
                    isSelected
                      ? "translate-x-0.5"
                      : "opacity-40 group-hover:translate-x-1 group-hover:opacity-100"
                  }`}
                  style={
                    isSelected ? { color: role.accentNight } : undefined
                  }
                />
              </button>
            );
          })}
        </div>

        <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-[#0f1217]/75">
          Selected role automatically pre-fills /contact dispatch form.
        </div>
      </div>

      {/* RIGHT LOADOUT DOSSIER (Obsidian) */}
      <div
        data-night=""
        className="lg:col-span-7 flex flex-col justify-center bg-[#0f1217] px-6 sm:px-12 lg:pl-14 lg:pr-24 pt-28 pb-20 text-[#f4f1ea]"
      >
        <div ref={detailRef} className="mx-auto w-full max-w-2xl space-y-8">
          <div className="space-y-3 border-b border-[#f4f1ea]/12 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[12px] uppercase tracking-[0.2em]">
              <span style={{ color: selectedRole.accentNight }}>
                MISSION BRIEF {selectedRole.code} · {selectedRole.shortLabel}
              </span>
              <span className="rounded-full border border-[#f4f1ea]/18 px-2.5 py-0.5 text-[12px] text-[#f4f1ea]/70">
                ACTIVE LOADOUT
              </span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
              {selectedRole.heroSplitLeft.headline}
            </h3>

            <p className="text-base leading-relaxed text-[#f4f1ea]/78">
              {selectedRole.mission?.summary || selectedRole.heroSplitLeft.subline}
            </p>
          </div>

          {/* Core Capabilities */}
          <div className="space-y-3">
            <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-[#f4f1ea]/75">
              Verified Capabilities &amp; Ownership
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(
                selectedRole.mission?.loadout ||
                selectedRole.heroSplitLeft.badges
              ).map((pillar) => (
                <div
                  key={pillar}
                  className="flex items-center gap-2.5 rounded-xl border border-[#f4f1ea]/14 bg-[#151a24] px-4 py-3 text-sm font-medium text-[#f4f1ea]"
                >
                  <CheckCircle2
                    size={15}
                    className="shrink-0"
                    style={{ color: selectedRole.accentNight }}
                  />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Matching Systems (respecting client engagement NDA rules) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-[12px] tracking-[0.18em] uppercase text-[#f4f1ea]/75">
              <span>Key Proof Systems</span>
              <TransitionLink
                href={`/work?role=${selectedRole.id}`}
                className="text-[#f4f1ea]/80 hover:underline underline-offset-4"
              >
                Filter Archive →
              </TransitionLink>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {matchingProjects.map((proj) => (
                <TransitionLink
                  key={proj.slug}
                  href={`/work/${proj.slug}`}
                  data-card=""
                  data-cursor-label="CASE"
                  className="group flex flex-col justify-between rounded-xl border border-[#f4f1ea]/14 bg-[#141922] p-4 hover:border-[#f4f1ea]/40 transition"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[12px] uppercase text-[#f4f1ea]/75">
                      <span>{proj.number}</span>
                      {proj.isClientEngagement ? (
                        <ShieldCheck
                          size={12}
                          style={{ color: selectedRole.accentNight }}
                        />
                      ) : (
                        <ArrowUpRight size={12} />
                      )}
                    </div>
                    <div className="mt-2 font-bold text-sm uppercase tracking-tight text-[#f4f1ea] group-hover:underline underline-offset-4">
                      {proj.title}
                    </div>
                  </div>
                  <div
                    className="mt-3 font-mono text-[12px] font-bold"
                    style={{ color: selectedRole.accentNight }}
                  >
                    {proj.headlineMetric.value}
                  </div>
                </TransitionLink>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <TransitionLink
              href={`/contact?role=${selectedRole.id}`}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#0f1217] transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: selectedRole.accentNight }}
            >
              <span>Engage as {selectedRole.shortLabel}</span>
              <ArrowRight size={14} />
            </TransitionLink>

            <TransitionLink
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-[#f4f1ea]/25 px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-[#f4f1ea] hover:bg-[#f4f1ea] hover:text-[#0f1217] transition-colors"
            >
              <span>Browse Full Archive</span>
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}

