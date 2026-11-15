"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Cpu, GraduationCap, MapPin } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { CORE_ROLES } from "@/data/roles";
import { useRole } from "@/context/RoleContext";
import { DevBotAvatar } from "@/components/chrome/DevBotAvatar";

const ROLE_PROFICIENCY: {
  id: "ai" | "backend" | "ds" | "ml";
  label: string;
  pct: number;
  note: string;
}[] = [
  {
    id: "ai",
    label: "AI Engineering · Agents & Eval",
    pct: 95,
    note: "Multi-agent workflows, structured RAG & safety verification",
  },
  {
    id: "backend",
    label: "Backend Systems · APIs & Data",
    pct: 90,
    note: "Async workers, transactional pipelines & real-time queues",
  },
  {
    id: "ds",
    label: "Data Science · Causal & Analytics",
    pct: 88,
    note: "Econometrics, counterfactuals & probabilistic attribution",
  },
  {
    id: "ml",
    label: "ML Engineering · Modeling & Serving",
    pct: 92,
    note: "Deep time-series, feature stores & deterministic inference",
  },
];

export function ChapterUnderHood() {
  const { activeRole, roleData, setActiveRole, setDevMood, setStageMode, setHoverInfo, setDockVisible } = useRole();
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStageMode("under-hood");
            setDockVisible(true);
            setDevMood("desk-chat");
          }
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [setDevMood, setStageMode, setDockVisible]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const fills = barsRef.current?.querySelectorAll<HTMLElement>(
        ".role-meter-fill"
      );
      if (fills && fills.length > 0) {
        gsap.fromTo(
          fills,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: barsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="under-the-hood"
      ref={sectionRef}
      className="relative grid grid-cols-1 lg:grid-cols-12 min-h-screen"
    >
      {/* LEFT NIGHT SPOTLIGHT COLUMN */}
      <div
        data-night=""
        className="relative lg:col-span-5 flex flex-col items-center justify-between overflow-hidden bg-[#0b0e14] px-8 pt-28 pb-28 text-[#f4f1ea]"
      >
        {/* Overhead Volumetric Spotlight Cone */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-[75%] w-[125%] -translate-x-1/2 opacity-40"
          style={{
            background:
              "conic-gradient(from 165deg at 50% 0%, transparent 0deg, rgba(244,241,234,0.16) 15deg, rgba(234,29,15,0.14) 24deg, transparent 42deg)",
          }}
        />

        <div className="relative z-10 w-full max-w-md space-y-2">
          <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-[#f4f1ea]/75">
            Ch 04 · Under The Hood
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
            Operator Profile
          </h2>
        </div>

        <div className="relative z-10 my-8 flex flex-col items-center">
          <DevBotAvatar
            mood="graduation"
            className="h-[280px] w-[280px] sm:h-[320px] sm:w-[320px]"
            accentColor={roleData.accentNight}
            badgeText={`${PROFILE.monogram} · P1`}
          />
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#f4f1ea]/16 bg-[#131822] px-4 py-1.5 font-mono text-[12px] tracking-[0.14em] uppercase">
            <Cpu size={13} style={{ color: roleData.accentNight }} />
            <span>PLAYER 1 · {PROFILE.handle}</span>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-md border-t border-[#f4f1ea]/12 pt-5 font-mono text-[12px] text-[#f4f1ea]/75 space-y-1.5">
          <div className="flex items-center justify-between gap-4">
            <span>PRESENT ROLE</span>
            <span className="text-right text-[#f4f1ea]">{PROFILE.currentRole}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>EDUCATION</span>
            <span className="text-right text-[#f4f1ea]">{PROFILE.education}</span>
          </div>
        </div>
      </div>

      {/* RIGHT WARM-PAPER DOSSIER CARD */}
      <div
        data-paper=""
        className="lg:col-span-7 flex flex-col justify-center bg-[#f4f1ea] px-6 sm:px-12 lg:pl-14 lg:pr-24 pt-28 pb-20 text-[#0f1217]"
      >
        <div className="mx-auto w-full max-w-2xl space-y-8">
          {/* Header Dossier Metadata */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] tracking-[0.18em] uppercase text-[#0f1217]/75">
              <span className="rounded-md bg-[#0f1217] px-2 py-0.5 text-[#f4f1ea] font-bold">
                PLAYER 1 DOSSIER
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin size={12} /> {PROFILE.city}, IN
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <GraduationCap size={12} /> {PROFILE.education}
              </span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-black leading-[0.95] tracking-tight uppercase">
              Mathematical Rigor Meets Production Code.
            </h3>

            <p className="text-base leading-relaxed text-[#0f1217]/78">
              I design and ship complete systems where statistical thinking,
              deep learning models, deterministic backend engineering, and
              agentic AI workflows reinforce one another. Currently serving as{" "}
              <strong className="font-bold text-[#0f1217]">
                {PROFILE.currentRole}
              </strong>
              .
            </p>
          </div>

          {/* 2x2 Verified Telemetry Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            {PROFILE.dossierStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#0f1217]/14 bg-white/80 p-4 shadow-xs"
              >
                <div className="font-mono text-[12px] tracking-[0.16em] uppercase text-[#0f1217]/75">
                  {stat.label}
                </div>
                <div className="mt-1 text-lg sm:text-xl font-black tracking-tight text-[#0f1217]">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive 4-Axis Role Balance Meter */}
          <div
            ref={barsRef}
            className="rounded-2xl border border-[#0f1217]/15 bg-white/85 p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[12px] font-bold tracking-[0.16em] uppercase text-[#0f1217]">
                4-Axis Role Balance Meter
              </span>
              <span className="font-mono text-[12px] uppercase text-[#0f1217]/75">
                Click row to focus lens
              </span>
            </div>

            <div className="space-y-3.5">
              {ROLE_PROFICIENCY.map((row) => {
                const roleInfo = CORE_ROLES.find((r) => r.id === row.id)!;
                const isSelected = activeRole === row.id;

                return (
                  <button
                    key={row.id}
                    type="button"
                    onClick={() => setActiveRole(row.id)}
                    className={`w-full rounded-xl p-2.5 text-left transition ${
                      isSelected
                        ? "bg-[#0f1217] text-[#f4f1ea]"
                        : "hover:bg-[#0f1217]/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs font-bold">
                      <span>{row.label}</span>
                      <span
                        className="tabular-nums"
                        style={{
                          color: isSelected
                            ? roleInfo.accentNight
                            : roleInfo.accentPaper,
                        }}
                      >
                        {row.pct}%
                      </span>
                    </div>
                    <div
                      className={`mt-2 h-2 w-full overflow-hidden rounded-full ${
                        isSelected ? "bg-[#f4f1ea]/15" : "bg-[#0f1217]/10"
                      }`}
                    >
                      <div
                        className="role-meter-fill h-full rounded-full"
                        style={{
                          width: `${row.pct}%`,
                          backgroundColor: isSelected
                            ? roleInfo.accentNight
                            : roleInfo.accentPaper,
                        }}
                      />
                    </div>
                    <p
                      className={`mt-1.5 font-mono text-[12px] ${
                        isSelected ? "text-[#f4f1ea]/70" : "text-[#0f1217]/75"
                      }`}
                    >
                      {row.note}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Education & Achievements Showcase */}
          <div className="space-y-3">
            <div className="font-mono text-[12px] font-bold tracking-[0.16em] uppercase text-[#0f1217]/75">
              Education &amp; Key Achievements
            </div>
            <div className="rounded-2xl border border-[#0f1217]/15 bg-white/85 p-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f1217]/70">
                  {PROFILE.educationDetail.period}
                </span>
                <span className="font-mono text-[11px] text-[#0f1217]/70">
                  {PROFILE.educationDetail.location}
                </span>
              </div>
              <div className="mt-1 text-base font-black text-[#0f1217]">
                {PROFILE.educationDetail.institution}
              </div>
              <div className="text-xs font-medium text-[#0f1217]/80">
                {PROFILE.educationDetail.degree} · {PROFILE.educationDetail.research}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROFILE.achievements.map((ach) => (
                <div
                  key={ach.id}
                  onMouseEnter={() =>
                    setHoverInfo({
                      badge: ach.badge,
                      title: ach.title,
                      detail: ach.subtitle,
                    })
                  }
                  onMouseLeave={() => setHoverInfo(null)}
                  className="rounded-2xl border border-[#0f1217]/14 bg-white/80 p-4 shadow-xs transition hover:border-[#0f1217]/35"
                >
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--role-accent-paper)]">
                    {ach.badge}
                  </div>
                  <div className="mt-1 text-sm font-black text-[#0f1217]">
                    {ach.title}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#0f1217]/75">
                    {ach.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Community Leadership Highlight (User requested here ONLY) */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#0f1217]/15 bg-[#0f1217] p-5 text-[#f4f1ea]">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: "var(--role-accent-night)" }}
            >
              <Award size={18} className="text-[#0f1217]" />
            </div>
            <div className="space-y-1">
              <div className="font-mono text-[12px] tracking-[0.16em] uppercase text-[#f4f1ea]/75">
                Leadership &amp; Community · Aug 2024 – Aug 2025
              </div>
              <div className="text-base font-extrabold">
                {PROFILE.leadership}
              </div>
              <p className="text-xs leading-relaxed text-[#f4f1ea]/70">
                Organized and led hands-on workshops on game development, guiding
                peers through Unity engine fundamentals and project-based
                learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

