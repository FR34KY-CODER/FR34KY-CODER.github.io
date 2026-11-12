"use client";

import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ArrowUpRight, Filter, FolderGit2, ShieldCheck } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { CORE_ROLES, RoleId, ROLES } from "@/data/roles";
import { TransitionLink } from "@/components/chrome/TransitionLink";
import { useRole } from "@/context/RoleContext";

type WorkFilter = RoleId | "client" | "opensource";

const FILTER_OPTIONS: { id: WorkFilter; label: string; color?: string }[] = [
  { id: "all", label: "All Systems" },
  ...CORE_ROLES.map((r) => ({
    id: r.id as WorkFilter,
    label: r.shortLabel,
    color: r.accentNight,
  })),
  { id: "client", label: "Client Engagements", color: "#f59e0b" },
  { id: "opensource", label: "Open Source", color: "#34d399" },
];

function WorkArchiveContent() {
  const searchParams = useSearchParams();
  const { activeRole, setActiveRole } = useRole();
  const initialParam = searchParams.get("role") as WorkFilter | null;

  const [filter, setFilter] = useState<WorkFilter>(
    initialParam &&
      ["all", "ai", "backend", "ds", "ml", "client", "opensource"].includes(
        initialParam
      )
      ? initialParam
      : activeRole
  );

  const gridRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(Flip);
  }, []);

  const handleSelectFilter = (next: WorkFilter) => {
    if (gridRef.current) {
      try {
        gsap.registerPlugin(Flip);
        flipStateRef.current = Flip.getState(
          gridRef.current.querySelectorAll(".work-card")
        );
      } catch {
        flipStateRef.current = null;
      }
    }

    setFilter(next);

    if (
      next === "all" ||
      next === "ai" ||
      next === "backend" ||
      next === "ds" ||
      next === "ml"
    ) {
      setActiveRole(next);
    }
  };

  useLayoutEffect(() => {
    const state = flipStateRef.current;
    if (!state) return;
    flipStateRef.current = null;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    Flip.from(state, {
      duration: 0.48,
      ease: "power3.out",
      stagger: 0.03,
      scale: true,
      absolute: false,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.35 }
        ),
    });
  }, [filter]);

  const filteredProjects = PROJECTS.filter((project) => {
    if (filter === "all") return true;
    if (filter === "client") return project.isClientEngagement;
    if (filter === "opensource") return !project.isClientEngagement;
    return project.roles.includes(filter);
  });

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#0f1217]">
      {/* SPLIT ARCHIVE HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#0f1217]/12">
        <div
          data-paper=""
          className="lg:col-span-7 bg-[#f4f1ea] px-6 sm:px-12 pt-28 pb-12"
        >
          <div className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#0f1217]/75">
            Archive · {PROJECTS.length} Case Files
          </div>
          <h1 className="mt-2 text-5xl sm:text-7xl font-black leading-[0.88] tracking-[-0.04em] uppercase">
            Every System
            <br />
            <span style={{ color: "var(--role-accent-paper, #d91b0e)" }}>
              On The Record
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#0f1217]/75">
            Explore public engineering repositories with full architectural
            context alongside enterprise client engagements framed strictly
            around problem framing, design ideas, and measurable business impact.
          </p>
        </div>

        <div
          data-night=""
          className="lg:col-span-5 flex flex-col justify-between bg-[#0f1217] px-6 sm:px-10 pt-28 pb-12 text-[#f4f1ea]"
        >
          <div className="space-y-2 font-mono text-xs">
            <div className="text-[#f4f1ea]/75 uppercase tracking-[0.18em]">
              Index Breakdown
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl border border-[#f4f1ea]/14 bg-[#151a24] p-4">
                <div className="text-[12px] text-[#f4f1ea]/75 uppercase">
                  Open Source
                </div>
                <div className="mt-1 text-2xl font-black">
                  {PROJECTS.filter((p) => !p.isClientEngagement).length}
                </div>
              </div>
              <div className="rounded-xl border border-[#f4f1ea]/14 bg-[#151a24] p-4">
                <div className="text-[12px] text-[#f4f1ea]/75 uppercase">
                  Client Builds
                </div>
                <div
                  className="mt-1 text-2xl font-black"
                  style={{ color: "var(--role-accent-night)" }}
                >
                  {PROJECTS.filter((p) => p.isClientEngagement).length}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-xl border border-[#f4f1ea]/12 bg-[#141923] px-4 py-3 font-mono text-[12px] text-[#f4f1ea]/75">
            <ShieldCheck
              size={15}
              className="shrink-0"
              style={{ color: "var(--role-accent-night)" }}
            />
            <span>
              Client NDA Shield: zero internal stacks or code insights exposed on
              client engagements.
            </span>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section data-paper="" className="mx-auto max-w-[1440px] px-6 sm:px-10 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#0f1217]/12 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.16em] text-[#0f1217]/75">
              <Filter size={13} />
              <span>Filter:</span>
            </span>
            {FILTER_OPTIONS.map((opt) => {
              const isSelected = filter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectFilter(opt.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] transition cursor-pointer ${
                    isSelected
                      ? "border-[#0f1217] bg-[#0f1217] text-[#f4f1ea]"
                      : "border-[#0f1217]/18 bg-white/80 text-[#0f1217] hover:border-[#0f1217]/50"
                  }`}
                >
                  {opt.color && (
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: opt.color }}
                    />
                  )}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          <div className="font-mono text-xs text-[#0f1217]/75">
            Showing <strong className="text-[#0f1217]">{filteredProjects.length}</strong> of{" "}
            {PROJECTS.length} builds
          </div>
        </div>

        {/* FLIP GRID */}
        <div
          ref={gridRef}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <TransitionLink
              key={project.slug}
              href={`/work/${project.slug}`}
              data-card=""
              data-cursor-label="CASE"
              className={`work-card group flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1.5 ${
                project.isClientEngagement
                  ? "border-[#0f1217] bg-[#0f1217] text-[#f4f1ea]"
                  : "border-[#0f1217]/15 bg-white text-[#0f1217] shadow-sm hover:shadow-xl"
              }`}
            >
              <div>
                {/* Top Pill Row */}
                <div className="flex items-center justify-between gap-2 font-mono text-[12px] uppercase tracking-[0.16em]">
                  <span className="opacity-55">
                    {project.number} · {project.year}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-bold ${
                      project.isClientEngagement
                        ? "bg-amber-400/15 text-amber-300 border border-amber-400/30"
                        : "bg-[#0f1217]/[0.06] text-[#0f1217]/75 border border-[#0f1217]/12"
                    }`}
                  >
                    {project.isClientEngagement ? (
                      <>
                        <ShieldCheck size={11} />
                        <span>Client Ideas &amp; Impact</span>
                      </>
                    ) : (
                      <>
                        <FolderGit2 size={11} />
                        <span>Open Source</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Title */}
                <div className="mt-4 flex items-start justify-between gap-3">
                  <h2 className="text-2xl font-black tracking-tight uppercase group-hover:underline decoration-2 underline-offset-4">
                    {project.title}
                  </h2>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>

                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.1em] opacity-60">
                  {project.subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed opacity-80">
                  {project.summary}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {/* Headline Outcome Metric */}
                <div
                  className={`rounded-2xl border p-3.5 ${
                    project.isClientEngagement
                      ? "border-[#f4f1ea]/14 bg-[#171c26]"
                      : "border-[#0f1217]/10 bg-[#f4f1ea]"
                  }`}
                >
                  <div className="font-mono text-[12px] uppercase tracking-[0.16em] opacity-55">
                    {project.headlineMetric.label}
                  </div>
                  <div className="mt-0.5 text-lg font-black tracking-tight">
                    {project.headlineMetric.value}
                  </div>
                </div>

                {/* Role Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {project.roles.map((r) => (
                    <span
                      key={r}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[12px] font-semibold uppercase ${
                        project.isClientEngagement
                          ? "border-[#f4f1ea]/16 text-[#f4f1ea]/80"
                          : "border-[#0f1217]/15 text-[#0f1217]/75"
                      }`}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          backgroundColor: project.isClientEngagement
                            ? ROLES[r].accentNight
                            : ROLES[r].accentPaper,
                        }}
                      />
                      {ROLES[r].shortLabel}
                    </span>
                  ))}
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function WorkPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f1ea] px-8 pt-32 font-mono text-xs uppercase">
          Loading work archive...
        </div>
      }
    >
      <WorkArchiveContent />
    </Suspense>
  );
}

