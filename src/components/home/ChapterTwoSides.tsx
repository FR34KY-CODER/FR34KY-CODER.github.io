"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Clock,
  GraduationCap,
  Maximize2,
  RotateCcw,
  Send,
  Terminal,
} from "lucide-react";
import { PROFILE } from "@/data/profile";
import { CoreRoleId, ROLES } from "@/data/roles";
import {
  DevMood,
  HeroPhaseKey,
  HeroStageMode,
  useRole,
} from "@/context/RoleContext";
import { TransitionLink } from "@/components/chrome/TransitionLink";
import { scrollToSectionId, triggerRouteNavigation } from "@/lib/navigation";
import { BotActionLink, BotReply, resolveDevBotQuery } from "@/lib/devbotEngine";

const RoleKnowledgeGraph = dynamic(
  () => import("./RoleKnowledgeGraph").then((mod) => mod.RoleKnowledgeGraph),
  { ssr: false }
);

const MorphingThreeCharacter = dynamic(
  () => import("@/components/chrome/MorphingThreeCharacter").then((mod) => mod.MorphingThreeCharacter),
  { ssr: false }
);

type BotReplyPayload = Omit<BotReply, "id" | "sender">;

interface HeroClockPhase {
  key: HeroPhaseKey;
  role: CoreRoleId | "all";
  mood: DevMood;
  stage: HeroStageMode;
  clockDeg: number;
  label: string;
  caption: string;
}

const HERO_PHASES: HeroClockPhase[] = [
  {
    key: "overview",
    role: "all",
    mood: "orbit",
    stage: "hero-overview",
    clockDeg: 0,
    label: "12:00 · ALL 4 QUARTERS",
    caption: "Scroll clockwise to reveal each full-page discipline & morph the 3D developer.",
  },
  {
    key: "ai",
    role: "ai",
    mood: "ai-leash",
    stage: "hero-quarter",
    clockDeg: 315,
    label: "01 · AI ENGINEER",
    caption: "AI Engineer — Companion bot tethered on energy leash + React Flow Agent Graph.",
  },
  {
    key: "backend",
    role: "backend",
    mood: "backend-ops",
    stage: "hero-quarter",
    clockDeg: 45,
    label: "02 · BACKEND DEV",
    caption: "Backend Developer — Async streams, OAuth guards & distributed queue topology.",
  },
  {
    key: "ds",
    role: "ds",
    mood: "ds-graph",
    stage: "hero-quarter",
    clockDeg: 135,
    label: "03 · DATA SCIENTIST",
    caption: "Data Scientist — Databricks ORDM canonical contracts, telemetry & causal graphs.",
  },
  {
    key: "ml",
    role: "ml",
    mood: "ml-mechanic",
    stage: "hero-quarter",
    clockDeg: 225,
    label: "04 · ML ENGINEER",
    caption: "ML Engineer — Mechanic workshop: bot brain open, YOLOv8 & Sentence-BERT.",
  },
  {
    key: "desk",
    role: "all",
    mood: "desk-chat",
    stage: "hero-desk",
    clockDeg: 360,
    label: "DEVBOT DESK · WORKSTATION",
    caption: "Desk Workstation — Ask deterministic DevBot about any project, skill, or bio.",
  },
];

// Clockwise geometry around center: Top-Left (AI) -> Top-Right (Backend) -> Bottom-Left (DS) -> Bottom-Right (ML)
const CLOCKWISE_QUARTER_SLOTS: {
  roleId: CoreRoleId;
  quarterClass: string;
  clipOrigin: string;
}[] = [
  {
    roleId: "ai",
    quarterClass: "lg:top-0 lg:left-0 lg:w-[calc(50%-6px)] lg:h-[calc(50%-6px)]",
    clipOrigin: "origin-top-left",
  },
  {
    roleId: "backend",
    quarterClass: "lg:top-0 lg:left-[calc(50%+6px)] lg:w-[calc(50%-6px)] lg:h-[calc(50%-6px)]",
    clipOrigin: "origin-top-right",
  },
  {
    roleId: "ds",
    quarterClass: "lg:top-[calc(50%+6px)] lg:left-0 lg:w-[calc(50%-6px)] lg:h-[calc(50%-6px)]",
    clipOrigin: "origin-bottom-left",
  },
  {
    roleId: "ml",
    quarterClass:
      "lg:top-[calc(50%+6px)] lg:left-[calc(50%+6px)] lg:w-[calc(50%-6px)] lg:h-[calc(50%-6px)]",
    clipOrigin: "origin-bottom-right",
  },
];

export function ChapterTwoSides() {
  const router = useRouter();
  const {
    activeRole,
    roleData,
    setActiveRole,
    setDevMood,
    setStageMode,
    clockAngle,
    setClockAngle,
    setActivePhaseKey,
    setHoverInfo,
    setDockVisible,
  } = useRole();

  const heroRef = useRef<HTMLElement>(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [heroInput, setHeroInput] = useState("");
  const [botReply, setBotReply] = useState<BotReplyPayload>({
    badge: "DETERMINISTIC ENGINE READY",
    text: "Type '/project Open Retail', '/project LexNext.AI', '/edu', '/achievements', '/links', or any skill like 'FastAPI' or 'YOLOv8'.",
  });

  const currentPhase = HERO_PHASES[phaseIndex] ?? HERO_PHASES[0];

  const applyPhase = (idx: number, smoothDeg?: number) => {
    const ph = HERO_PHASES[idx] ?? HERO_PHASES[0];
    setPhaseIndex(idx);
    setActivePhaseKey(ph.key);
    setActiveRole(ph.role);
    setDevMood(ph.mood);
    setStageMode(ph.stage);
    setClockAngle(smoothDeg ?? ph.clockDeg);
  };

  // GSAP ScrollTrigger clock-hand sweep on desktop + IntersectionObserver stage tracking
  useEffect(() => {
    const section = heroRef.current;
    if (!section || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add(
      "(min-width: 1024px) and (min-height: 740px) and (prefers-reduced-motion: no-preference)",
      () => {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 0.4,
          onUpdate: (self) => {
            const p = self.progress;
            setClockAngle(Math.round(p * 360));
            const idx = Math.min(
              HERO_PHASES.length - 1,
              Math.floor(p * HERO_PHASES.length)
            );
            setPhaseIndex((prev) => {
              if (prev !== idx) {
                const ph = HERO_PHASES[idx];
                setActivePhaseKey(ph.key);
                setActiveRole(ph.role);
                setDevMood(ph.mood);
                setStageMode(ph.stage);
                setDockVisible(false);
              }
              return idx;
            });
          },
          onLeaveBack: () => {
            const ph = HERO_PHASES[0];
            setPhaseIndex(0);
            setActivePhaseKey("overview");
            setActiveRole(ph.role);
            setDevMood(ph.mood);
            setStageMode("hero-overview");
            setClockAngle(0);
          },
          onLeave: () => {
            setStageMode("street");
            setDevMood("bicycle");
            setDockVisible(true);
          },
          onEnterBack: () => {
            const ph = HERO_PHASES[HERO_PHASES.length - 1];
            setPhaseIndex(HERO_PHASES.length - 1);
            setActivePhaseKey(ph.key);
            setActiveRole(ph.role);
            setDevMood(ph.mood);
            setStageMode(ph.stage);
            setClockAngle(ph.clockDeg);
            setDockVisible(false);
          },
        });
        return () => trigger.kill();
      }
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDockVisible(false);
            setStageMode(HERO_PHASES[phaseIndex]?.stage ?? "hero-overview");
            setDevMood(HERO_PHASES[phaseIndex]?.mood ?? "orbit");
          } else {
            setDockVisible(true);
          }
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);

    return () => {
      media.revert();
      observer.disconnect();
    };
    // Intentionally omit phaseIndex so observer isn't rebuilt every tick; manual sync handled cleanly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setActiveRole, setDevMood, setStageMode, setClockAngle, setActivePhaseKey, setDockVisible]);

  const handleAskHeroBot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroInput.trim()) return;
    setBotReply(resolveDevBotQuery(heroInput.trim()));
    setHeroInput("");
  };

  const isQuarterExpanded =
    currentPhase.key === "ai" ||
    currentPhase.key === "backend" ||
    currentPhase.key === "ds" ||
    currentPhase.key === "ml";

  const isDeskMode = currentPhase.key === "desk";

  return (
    <section
      ref={heroRef}
      id="two-sides"
      data-night=""
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#0b0e14] px-4 sm:px-8 lg:pr-24 pt-18 pb-4 text-[#f4f1ea]"
      aria-labelledby="hero-title"
    >
      <h1 id="hero-title" className="sr-only">
        Ojasvi Goyal — Four Roles Under One Hood: AI Engineer, Backend Developer, Data Scientist, Machine Learning Engineer
      </h1>

      {/* TOP EDUCATION, 5 PROFILE LINKS & 6 RESUME ACHIEVEMENTS BAR */}
      <div className="relative z-30 mx-auto flex w-full max-w-[1520px] flex-col gap-2 rounded-2xl border border-[#f4f1ea]/12 bg-[#111621]/90 px-3.5 py-2 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div
            onMouseEnter={() =>
              setHoverInfo({
                badge: "EDUCATION · LNMIIT JAIPUR",
                title: PROFILE.educationDetail.degree,
                detail: `${PROFILE.educationDetail.institution} (${PROFILE.educationDetail.period}) · ${PROFILE.educationDetail.research}`,
              })
            }
            onMouseLeave={() => setHoverInfo(null)}
            className="inline-flex items-center gap-2 rounded-full border border-[#f4f1ea]/18 bg-[#0f1217] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[#f4f1ea]"
          >
            <GraduationCap size={13} style={{ color: roleData.accentNight }} />
            <span>B.Tech · LNMIIT Jaipur (&apos;26)</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {PROFILE.socials.map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-[#f4f1ea]/16 bg-[#0b0e14] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[#f4f1ea]/85 hover:border-[var(--role-accent-night)] hover:text-[#f4f1ea] transition"
              >
                <span>{soc.label}</span>
                <ArrowUpRight size={11} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {PROFILE.achievements.map((ach) => (
            <button
              key={ach.id}
              type="button"
              onMouseEnter={() =>
                setHoverInfo({
                  badge: ach.badge,
                  title: ach.title,
                  detail: `${ach.subtitle} (${ach.metric})`,
                })
              }
              onMouseLeave={() => setHoverInfo(null)}
              onClick={() => {
                if (ach.href?.startsWith("http")) {
                  window.open(ach.href, "_blank", "noreferrer");
                } else {
                  scrollToSectionId("under-the-hood");
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#f4f1ea]/12 bg-[#f4f1ea]/[0.05] px-2.5 py-0.5 font-mono text-[10px] tracking-[0.05em] text-[#f4f1ea]/85 hover:border-[var(--role-accent-night)] transition-colors cursor-pointer"
            >
              <Award size={10} style={{ color: roleData.accentNight }} />
              <span>{ach.shortTitle}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE INLINE 3D MORPHING CHARACTER (On desktop, PersistentMorphActor seamlessly occupies Center / Side Stage!) */}
      <div className="my-3 flex flex-col items-center rounded-3xl border border-[#f4f1ea]/14 bg-[#101520]/80 p-4 lg:hidden">
        <div className="h-[190px] w-[190px]">
          <MorphingThreeCharacter
            mood={currentPhase.mood}
            accentColor={roleData.accentNight}
            badgeText={`${PROFILE.monogram} · ${roleData.code}`}
          />
        </div>
        <div
          className="mt-2 font-mono text-[10px] font-bold tracking-[0.14em] uppercase"
          style={{ color: roleData.accentNight }}
        >
          {currentPhase.label}
        </div>
        <p className="mt-1 text-center text-[11px] text-[#f4f1ea]/80">
          {currentPhase.caption}
        </p>
      </div>

      {/* MAIN CLOCK ARENA: CLOCK-HAND SWEEP + FULL-PAGE EXPANDING QUARTERS + INLINE DEVBOT WORKSTATION */}
      <div className="relative z-10 mx-auto my-2 flex-1 w-full max-w-[1520px] min-h-[500px] lg:min-h-0">
        {/* CLOCK DIAL & LIVE SWEEPING HAND OVERLAY */}
        <svg
          viewBox="0 0 1000 560"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none hidden lg:block absolute inset-0 z-20 h-full w-full"
        >
          {/* Orthogonal clock hairlines */}
          <line x1="500" y1="8" x2="500" y2="552" stroke="rgba(244,241,234,0.08)" strokeDasharray="5 6" />
          <line x1="10" y1="280" x2="990" y2="280" stroke="rgba(244,241,234,0.08)" strokeDasharray="5 6" />
          {/* Outer subtle clock circle */}
          <circle
            cx="500"
            cy="280"
            r="230"
            fill="none"
            stroke={roleData.accentNight}
            strokeOpacity={isQuarterExpanded || isDeskMode ? 0.16 : 0.28}
            strokeWidth="1.5"
            strokeDasharray="6 10"
          />
          {/* Rotating live clock hand synchronized with scroll/phase */}
          <g transform={`rotate(${clockAngle} 500 280)`}>
            <line
              x1="500"
              y1="280"
              x2="500"
              y2="52"
              stroke={roleData.accentNight}
              strokeWidth="2.5"
              strokeOpacity="0.55"
              strokeLinecap="round"
            />
            <circle cx="500" cy="52" r="5" fill={roleData.accentNight} opacity="0.85" />
          </g>
        </svg>

        {/* FOUR CLOCKWISE QUARTERS (Each expands full-arena on its clock phase!) */}
        {CLOCKWISE_QUARTER_SLOTS.map((slot) => {
          const role = ROLES[slot.roleId];
          const isRightCol = slot.roleId === "backend" || slot.roleId === "ml";
          const isThisExpanded = currentPhase.key === slot.roleId;
          const isHiddenByAnother = (isQuarterExpanded && !isThisExpanded) || isDeskMode;

          return (
            <div
              key={role.id}
              onClick={() => {
                if (!isThisExpanded) {
                  const targetIdx = HERO_PHASES.findIndex((p) => p.key === role.id);
                  if (targetIdx !== -1) applyPhase(targetIdx);
                }
              }}
              className={`group relative mb-3 flex flex-col justify-between overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                slot.clipOrigin
              } ${
                isThisExpanded
                  ? "lg:absolute lg:inset-0 lg:w-full lg:h-full z-20 cursor-default"
                  : isHiddenByAnother
                    ? "lg:absolute lg:pointer-events-none lg:opacity-0 lg:scale-95 hidden lg:flex " + slot.quarterClass
                    : "lg:absolute z-10 cursor-pointer " + slot.quarterClass
              }`}
              style={{
                borderColor: isThisExpanded
                  ? role.accentNight
                  : "rgba(244,241,234,0.12)",
                backgroundColor: isThisExpanded
                  ? "rgba(13, 17, 25, 0.96)"
                  : isRightCol
                    ? "rgba(17, 21, 30, 0.86)"
                    : "rgba(12, 15, 22, 0.86)",
                backgroundImage: isRightCol
                  ? "linear-gradient(to right, rgba(244,241,234,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,241,234,0.03) 1px, transparent 1px)"
                  : "radial-gradient(rgba(244,241,234,0.06) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
                boxShadow: isThisExpanded
                  ? `0 0 60px -14px ${role.accentNight}55`
                  : "none",
              }}
            >
              {isThisExpanded ? (
                /* EXPANDED FULL-PAGE QUARTER LAYOUT: LEFT 63% REACT FLOW GRAPH, RIGHT 37% OPEN STAGE FOR 3D HERO CHARACTER */
                <div className="flex h-full w-full flex-col lg:flex-row gap-4">
                  <div className="flex flex-1 lg:w-[63%] lg:flex-none flex-col justify-between gap-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div
                          className="font-mono text-[11px] font-bold tracking-[0.18em] uppercase"
                          style={{ color: role.accentNight }}
                        >
                          {role.code} · CLOCK QUARTER FULL VIEW
                        </div>
                        <h2 className="mt-1 text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#f4f1ea]">
                          {role.title}
                        </h2>
                        <p className="mt-1 max-w-xl text-xs sm:text-sm text-[#f4f1ea]/80">
                          {role.heroSplitLeft.subline}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            applyPhase(0);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#f4f1ea]/22 bg-[#0b0e14] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#f4f1ea] hover:border-[var(--role-accent-night)] cursor-pointer"
                        >
                          <RotateCcw size={11} />
                          <span>All 4 Quarters</span>
                        </button>
                        <TransitionLink
                          href={`/work?role=${role.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#0b0e14]"
                          style={{ backgroundColor: role.accentNight }}
                        >
                          <span>Case Studies</span>
                          <ArrowUpRight size={12} />
                        </TransitionLink>
                      </div>
                    </div>

                    {/* FULL INTERACTIVE REACT FLOW KNOWLEDGE GRAPH */}
                    <div className="relative h-[300px] lg:h-[360px] w-full rounded-2xl border border-[#f4f1ea]/12 bg-[#090c12]/90 overflow-hidden">
                      <RoleKnowledgeGraph
                        roleId={role.id as CoreRoleId}
                        accentColor={role.accentNight}
                        active
                        fullPage
                      />
                    </div>
                  </div>

                  {/* Right open reserve where PersistentMorphActor morphs in 3D */}
                  <div className="hidden lg:flex lg:w-[37%] flex-col items-center justify-end pb-10 pointer-events-none">
                    <div className="rounded-2xl border border-[#f4f1ea]/12 bg-[#0b0e14]/70 px-4 py-2 text-center backdrop-blur-xs">
                      <div
                        className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase"
                        style={{ color: role.accentNight }}
                      >
                        {currentPhase.label}
                      </div>
                      <p className="mt-0.5 text-[11px] text-[#f4f1ea]/75">
                        Drag graph nodes · Hover for DevBot bubble · Click project nodes to open case
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* OVERVIEW QUARTER PREVIEW TILE */
                <div className="flex h-full flex-col justify-between gap-2">
                  <div
                    className={`flex items-start justify-between gap-2 ${
                      isRightCol ? "lg:flex-row-reverse lg:text-right" : ""
                    }`}
                  >
                    <div>
                      <div
                        className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase"
                        style={{ color: role.accentNight }}
                      >
                        {role.code} · {role.shortLabel}
                      </div>
                      <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#f4f1ea]">
                        {role.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="rounded-lg border border-[#f4f1ea]/12 bg-[#0b0e14]/86 px-2 py-0.5 font-mono text-[10px] font-bold text-[#f4f1ea]/90">
                        {role.heroSplitLeft.metricValue}
                      </span>
                      <span
                        className="hidden sm:inline-flex items-center gap-1 rounded-full border border-[#f4f1ea]/16 bg-[#0b0e14]/90 px-2 py-0.5 font-mono text-[9px] uppercase text-[#f4f1ea]/80 group-hover:border-[var(--role-accent-night)]"
                      >
                        <Maximize2 size={9} />
                        <span>Expand</span>
                      </span>
                    </div>
                  </div>

                  {/* BORDERLESS AMBIENT REACT FLOW KNOWLEDGE GRAPH PREVIEW */}
                  <div
                    className={`relative h-[135px] sm:h-[145px] w-full overflow-hidden opacity-75 transition-opacity group-hover:opacity-100 ${
                      isRightCol ? "lg:pl-36" : "lg:pr-36"
                    }`}
                  >
                    <RoleKnowledgeGraph
                      roleId={role.id as CoreRoleId}
                      accentColor={role.accentNight}
                      active={activeRole === "all" || activeRole === role.id}
                    />
                  </div>

                  <div
                    className={`flex items-end justify-between gap-2 ${
                      isRightCol
                        ? "lg:flex-row-reverse lg:text-right lg:pl-36"
                        : "lg:pr-36"
                    }`}
                  >
                    <p className="max-w-[270px] text-[11px] leading-snug text-[#f4f1ea]/78">
                      {role.heroSplitLeft.subline}
                    </p>
                    <TransitionLink
                      href={`/work?role=${role.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 inline-flex items-center gap-1 rounded-full border border-[#f4f1ea]/20 bg-[#0b0e14] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#f4f1ea] hover:border-[var(--role-accent-night)]"
                    >
                      <span>Work</span>
                      <ArrowUpRight size={10} />
                    </TransitionLink>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* OG DEVINTHEHOOD SIGNATURE HEADLINE IN CENTER OF 4 QUARTERS (Overview only) */}
        {phaseIndex === 0 && (
          <div className="pointer-events-none hidden lg:flex absolute inset-0 z-15 flex-col items-center justify-end pb-14">
            <div className="rounded-2xl border border-[#f4f1ea]/12 bg-[#0b0e14]/86 px-5 py-2.5 text-center backdrop-blur-md shadow-2xl">
              <div className="text-lg font-black tracking-tight uppercase text-[#f4f1ea]">
                Four disciplines. <span style={{ color: roleData.accentNight }}>Built together.</span>
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-[#f4f1ea]/70">
                Scroll to clock quarters · Click any quadrant to expand
              </div>
            </div>
          </div>
        )}

        {/* PHASE 5: FULL INLINE DETERMINISTIC DEVBOT COMPUTER WORKSTATION (Facing the 3D Desk Character!) */}
        {isDeskMode && (
          <div className="relative lg:absolute lg:inset-0 z-25 flex flex-col lg:flex-row items-center justify-between gap-6 rounded-3xl border border-[#f4f1ea]/18 bg-[#0e131d]/95 p-5 sm:p-8 shadow-2xl backdrop-blur-xl animate-[fadeIn_0.35s_ease-out]">
            <div className="flex w-full lg:w-[60%] flex-col justify-between gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-[#0b0e14]"
                    style={{ backgroundColor: roleData.accentNight }}
                  >
                    <Terminal size={17} />
                  </div>
                  <div>
                    <div
                      className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase"
                      style={{ color: roleData.accentNight }}
                    >
                      DETERMINISTIC DEVBOT CONSOLE · ZERO LLM
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#f4f1ea]">
                      Ask About Any Project, Skill or Credential
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => applyPhase(0)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#f4f1ea]/20 px-3 py-1 font-mono text-[10px] uppercase text-[#f4f1ea] hover:border-[var(--role-accent-night)] cursor-pointer"
                >
                  <RotateCcw size={11} />
                  <span>Reset Clock</span>
                </button>
              </div>

              <div className="rounded-2xl border border-[#f4f1ea]/12 bg-[#090d14] p-4 space-y-3">
                {botReply.badge && (
                  <div
                    className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase"
                    style={{ color: roleData.accentNight }}
                  >
                    {botReply.badge}
                  </div>
                )}
                <p className="text-sm leading-relaxed text-[#f4f1ea]/90">
                  {botReply.text}
                </p>
                {botReply.links && botReply.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {botReply.links.map((lk: BotActionLink) => (
                      <button
                        key={lk.href + lk.label}
                        type="button"
                        onClick={() =>
                          lk.href.startsWith("http") || lk.href.startsWith("mailto:")
                            ? window.open(lk.href, "_blank", "noreferrer")
                            : triggerRouteNavigation(lk.href, router)
                        }
                        className="rounded-full border border-[#f4f1ea]/22 bg-[#141a26] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#f4f1ea] hover:border-[var(--role-accent-night)] cursor-pointer"
                      >
                        {lk.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  "/project LexNext.AI",
                  "/project Open Retail",
                  "/skill FastAPI",
                  "/skill YOLOv8",
                  "/edu",
                  "/achievements",
                  "/links",
                  "/contact",
                ].map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => setBotReply(resolveDevBotQuery(cmd))}
                    className="rounded-full border border-[#f4f1ea]/15 bg-[#f4f1ea]/[0.04] px-2.5 py-1 font-mono text-[10px] text-[#f4f1ea]/82 hover:border-[var(--role-accent-night)] transition-colors cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              <form
                onSubmit={handleAskHeroBot}
                className="flex items-center gap-2 rounded-2xl border border-[#f4f1ea]/20 bg-[#080b10] px-4 py-2.5"
              >
                <input
                  type="text"
                  value={heroInput}
                  onChange={(e) => setHeroInput(e.target.value)}
                  placeholder="Try 'show me projects with Databricks' or '/project Adaptive Traffic'..."
                  className="w-full bg-transparent font-mono text-xs text-[#f4f1ea] placeholder:text-[#f4f1ea]/45 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[#0b0e14] cursor-pointer"
                  style={{ backgroundColor: roleData.accentNight }}
                  aria-label="Run DevBot query"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>

            {/* Right reserve cleanly frames PersistentMorphActor at 3D Workstation Desk */}
            <div className="hidden lg:block lg:w-[40%]" />
          </div>
        )}
      </div>

      {/* BOTTOM CLOCK PHASE PILLS + SCROLL CUE */}
      <div className="relative z-30 mx-auto flex w-full max-w-[1520px] flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-[#f4f1ea]/75">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={12} style={{ color: roleData.accentNight }} />
            <span>CLOCK SWEEP:</span>
          </span>
          {HERO_PHASES.map((ph, idx) => (
            <button
              key={ph.key}
              type="button"
              onClick={() => applyPhase(idx)}
              aria-label={`Jump hero clock to ${ph.key}`}
              className="rounded-full px-2.5 py-0.5 uppercase tracking-[0.08em] transition cursor-pointer border"
              style={{
                borderColor:
                  phaseIndex === idx
                    ? ROLES[ph.role].accentNight
                    : "rgba(244,241,234,0.16)",
                backgroundColor:
                  phaseIndex === idx
                    ? ROLES[ph.role].accentNight
                    : "rgba(15,18,23,0.7)",
                color: phaseIndex === idx ? "#0f1217" : "#f4f1ea",
              }}
            >
              {ph.key === "overview" ? "ALL 4" : ph.key.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToSectionId("the-street")}
          className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.15em] text-[#f4f1ea]/80 hover:text-[var(--role-accent-night)] cursor-pointer"
        >
          <span>Scroll to ride The Street</span>
          <ArrowDown size={14} />
        </button>
      </div>
    </section>
  );
}
