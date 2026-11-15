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
import {
  RadialWipeTransition,
  WipeOriginConfig,
} from "./RadialWipeTransition";

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
    label: "12:00 · ALL 4 DISCIPLINES",
    caption: "Scroll clockwise or click any quadrant to reveal full-page discipline & morph the 3D developer.",
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

// 4 Borderless Quadrant layout coordinates (Devinthehood architectural split)
const BORDERLESS_QUADRANTS: {
  roleId: CoreRoleId;
  posClass: string;
  alignClass: string;
}[] = [
  {
    roleId: "ai",
    posClass: "lg:top-0 lg:left-0 lg:w-1/2 lg:h-1/2",
    alignClass: "lg:pr-10 lg:pb-8",
  },
  {
    roleId: "backend",
    posClass: "lg:top-0 lg:left-1/2 lg:w-1/2 lg:h-1/2",
    alignClass: "lg:pl-10 lg:pb-8",
  },
  {
    roleId: "ds",
    posClass: "lg:top-1/2 lg:left-0 lg:w-1/2 lg:h-1/2",
    alignClass: "lg:pr-10 lg:pt-8",
  },
  {
    roleId: "ml",
    posClass: "lg:top-1/2 lg:left-1/2 lg:w-1/2 lg:h-1/2",
    alignClass: "lg:pl-10 lg:pt-8",
  },
];

// Origin points and sweep lines for the Radial Wipe Transition
const QUADRANT_WIPE_ORIGINS: Record<HeroPhaseKey, WipeOriginConfig> = {
  overview: {
    cx: "50%",
    cy: "50%",
    startAngle: "0deg",
    lineColor: "#ea1d0f",
  },
  ai: {
    cx: "25%",
    cy: "28%",
    startAngle: "315deg",
    lineColor: "#ea1d0f",
  },
  backend: {
    cx: "75%",
    cy: "28%",
    startAngle: "45deg",
    lineColor: "#ea1d0f",
  },
  ds: {
    cx: "25%",
    cy: "72%",
    startAngle: "225deg",
    lineColor: "#0284c7",
  },
  ml: {
    cx: "75%",
    cy: "72%",
    startAngle: "135deg",
    lineColor: "#8b5cf6",
  },
  desk: {
    cx: "50%",
    cy: "50%",
    startAngle: "180deg",
    lineColor: "#ea1d0f",
  },
};

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
      data-paper=""
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#f4f1ea] px-4 sm:px-8 lg:pr-24 pt-18 pb-4 text-[#0f1217]"
      aria-labelledby="hero-title"
    >
      <h1 id="hero-title" className="sr-only">
        Ojasvi Goyal — Four Disciplines Under One Hood: AI Engineer, Backend Developer, Data Scientist, Machine Learning Engineer
      </h1>

      {/* RADIAL WIPE TRANSITION OVERLAY (Sweeps 360° from the active profile quadrant) */}
      <RadialWipeTransition
        triggerKey={currentPhase.key}
        origin={QUADRANT_WIPE_ORIGINS[currentPhase.key] ?? QUADRANT_WIPE_ORIGINS.overview}
        durationMs={1050}
        maskColor="#f4f1ea"
      />

      {/* TOP EDUCATION, 5 SOCIALS & 6 RESUME ACHIEVEMENTS BAR (Devinthehood Light Paper Styling) */}
      <div className="relative z-30 mx-auto flex w-full max-w-[1520px] flex-col gap-2 rounded-2xl border border-[#0f1217]/10 bg-[#ffffff]/85 px-3.5 py-2 shadow-xs backdrop-blur-md">
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
            className="inline-flex items-center gap-2 rounded-full border border-[#0f1217]/12 bg-[#f4f1ea] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[#0f1217]"
          >
            <GraduationCap size={13} className="text-[#ea1d0f]" />
            <span>B.Tech · LNMIIT Jaipur (&apos;26)</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {PROFILE.socials.map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-[#0f1217]/12 bg-[#ffffff] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[#0f1217]/85 hover:border-[#ea1d0f] hover:text-[#ea1d0f] transition shadow-xs"
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
              className="inline-flex items-center gap-1.5 rounded-full border border-[#0f1217]/10 bg-[#0f1217]/[0.03] px-2.5 py-0.5 font-mono text-[10px] tracking-[0.05em] text-[#0f1217]/85 hover:border-[#ea1d0f] hover:text-[#ea1d0f] transition-colors cursor-pointer"
            >
              <Award size={10} className="text-[#ea1d0f]" />
              <span>{ach.shortTitle}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE INLINE 3D DEVELOPER (Visible only on mobile devices) */}
      <div className="my-3 flex flex-col items-center rounded-3xl border border-[#0f1217]/10 bg-[#ffffff]/80 p-4 shadow-sm lg:hidden">
        <div className="h-[190px] w-[190px]">
          <MorphingThreeCharacter
            mood={currentPhase.mood}
            accentColor={roleData.accentPaper ?? "#ea1d0f"}
            badgeText={`${PROFILE.monogram} · ${roleData.code}`}
          />
        </div>
        <div
          className="mt-2 font-mono text-[10px] font-bold tracking-[0.14em] uppercase"
          style={{ color: roleData.accentPaper ?? "#ea1d0f" }}
        >
          {currentPhase.label}
        </div>
        <p className="mt-1 text-center text-[11px] text-[#4a443c]">
          {currentPhase.caption}
        </p>
      </div>

      {/* MAIN HERO ARENA: BORDERLESS 4 PROFILES WITH DEVINTHEHOOD ARCHITECTURAL SPLIT */}
      <div className="relative z-10 mx-auto my-2 flex-1 w-full max-w-[1520px] min-h-[520px] lg:min-h-0">
        {/* Subtle architectural background paper grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,18,23,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,18,23,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* HAIRLINE CROSSHAIRS DIVIDING THE 4 BORDERLESS QUADRANTS (Hidden when full-page expanded) */}
        {!isQuarterExpanded && !isDeskMode && (
          <div className="pointer-events-none hidden lg:block absolute inset-0 z-10">
            {/* Vertical hairline divider */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-[#0f1217]/10" />
            {/* Horizontal hairline divider */}
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#0f1217]/10" />

            {/* Corner & Center Alignment Cross Ticks (+) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[12px] text-[#0f1217]/35 select-none">
              +
            </div>
            <div className="absolute top-2 left-2 font-mono text-[10px] text-[#0f1217]/25 select-none">
              +
            </div>
            <div className="absolute top-2 right-2 font-mono text-[10px] text-[#0f1217]/25 select-none">
              +
            </div>
            <div className="absolute bottom-2 left-2 font-mono text-[10px] text-[#0f1217]/25 select-none">
              +
            </div>
            <div className="absolute bottom-2 right-2 font-mono text-[10px] text-[#0f1217]/25 select-none">
              +
            </div>

            {/* Outer subtle compass ring & degree markers */}
            <svg
              viewBox="0 0 1000 560"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full pointer-events-none"
            >
              <circle
                cx="500"
                cy="280"
                r="230"
                fill="none"
                stroke="rgba(15,18,23,0.08)"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              {/* Rotating live clock hand */}
              <g transform={`rotate(${clockAngle} 500 280)`}>
                <line
                  x1="500"
                  y1="280"
                  x2="500"
                  y2="52"
                  stroke="#ea1d0f"
                  strokeWidth="2"
                  strokeOpacity="0.45"
                  strokeLinecap="round"
                />
                <circle cx="500" cy="52" r="4.5" fill="#ea1d0f" opacity="0.8" />
              </g>
            </svg>
          </div>
        )}

        {/* FOUR BORDERLESS PROFILES (Share the canvas seamlessly without card borders) */}
        {BORDERLESS_QUADRANTS.map((slot) => {
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
              className={`group relative mb-3 flex flex-col justify-between overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isThisExpanded
                  ? "lg:absolute lg:inset-0 lg:w-full lg:h-full z-20 cursor-default p-6 sm:p-8 bg-[#f4f1ea]"
                  : isHiddenByAnother
                    ? "lg:absolute lg:pointer-events-none lg:opacity-0 lg:scale-95 hidden lg:flex " +
                      slot.posClass +
                      " " +
                      slot.alignClass
                    : "lg:absolute z-10 cursor-pointer p-4 sm:p-6 hover:bg-[#0f1217]/[0.025] " +
                      slot.posClass +
                      " " +
                      slot.alignClass
              }`}
            >
              {isThisExpanded ? (
                /* EXPANDED FULL-PAGE DISCIPLINE ARENA: LEFT 63% KNOWLEDGE GRAPH, RIGHT 37% 3D CHARACTER STAGE */
                <div className="flex h-full w-full flex-col lg:flex-row gap-4">
                  <div className="flex flex-1 lg:w-[63%] lg:flex-none flex-col justify-between gap-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div
                          className="font-mono text-[11px] font-bold tracking-[0.18em] uppercase"
                          style={{ color: role.accentPaper ?? "#ea1d0f" }}
                        >
                          {role.code} · FULL DISCIPLINE ARENA
                        </div>
                        <h2 className="mt-1 text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0f1217]">
                          {role.title}
                        </h2>
                        <p className="mt-1 max-w-xl text-xs sm:text-sm text-[#4a443c]">
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
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#0f1217]/14 bg-[#ffffff] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#0f1217] hover:border-[#ea1d0f] shadow-xs cursor-pointer"
                        >
                          <RotateCcw size={11} />
                          <span>All 4 Profiles</span>
                        </button>
                        <TransitionLink
                          href={`/work?role=${role.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 rounded-full px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#ffffff] shadow-sm hover:opacity-90"
                          style={{ backgroundColor: role.accentPaper ?? "#ea1d0f" }}
                        >
                          <span>Case Studies</span>
                          <ArrowUpRight size={12} />
                        </TransitionLink>
                      </div>
                    </div>

                    {/* FULL INTERACTIVE REACT FLOW KNOWLEDGE GRAPH (Light Paper Mode) */}
                    <div className="relative h-[300px] lg:h-[370px] w-full rounded-2xl border border-[#0f1217]/10 bg-[#ffffff]/70 shadow-xs overflow-hidden">
                      <RoleKnowledgeGraph
                        roleId={role.id as CoreRoleId}
                        accentColor={role.accentPaper ?? "#ea1d0f"}
                        active
                        fullPage
                        theme="paper"
                      />
                    </div>
                  </div>

                  {/* Right reserve where PersistentMorphActor morphs in 3D */}
                  <div className="hidden lg:flex lg:w-[37%] flex-col items-center justify-end pb-10 pointer-events-none">
                    <div className="rounded-2xl border border-[#0f1217]/10 bg-[#ffffff]/90 px-4 py-2 text-center shadow-xs backdrop-blur-xs">
                      <div
                        className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase"
                        style={{ color: role.accentPaper ?? "#ea1d0f" }}
                      >
                        {currentPhase.label}
                      </div>
                      <p className="mt-0.5 text-[11px] text-[#4a443c]">
                        Drag graph nodes · Hover for DevBot bubble · Click project nodes to open case
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* BORDERLESS OVERVIEW QUADRANT TILE */
                <div className="flex h-full flex-col justify-between gap-2">
                  <div
                    className={`flex items-start justify-between gap-2 ${
                      isRightCol ? "lg:flex-row-reverse lg:text-right" : ""
                    }`}
                  >
                    <div>
                      <div
                        className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase flex items-center gap-1.5"
                        style={{ color: role.accentPaper ?? "#ea1d0f" }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: role.accentPaper ?? "#ea1d0f" }} />
                        <span>{role.code} · {role.shortLabel}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0f1217]">
                        {role.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="rounded-lg border border-[#0f1217]/10 bg-[#ffffff] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0f1217]/85 shadow-xs">
                        {role.heroSplitLeft.metricValue}
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-[#0f1217]/12 bg-[#ffffff] px-2 py-0.5 font-mono text-[9px] uppercase text-[#0f1217]/75 group-hover:border-[#ea1d0f] group-hover:text-[#ea1d0f] transition">
                        <Maximize2 size={9} />
                        <span>Expand</span>
                      </span>
                    </div>
                  </div>

                  {/* BORDERLESS AMBIENT REACT FLOW KNOWLEDGE GRAPH PREVIEW (Paper Theme) */}
                  <div
                    className={`relative h-[135px] sm:h-[155px] w-full overflow-hidden opacity-85 transition-opacity group-hover:opacity-100 ${
                      isRightCol ? "lg:pl-32" : "lg:pr-32"
                    }`}
                  >
                    <RoleKnowledgeGraph
                      roleId={role.id as CoreRoleId}
                      accentColor={role.accentPaper ?? "#ea1d0f"}
                      active={activeRole === "all" || activeRole === role.id}
                      theme="paper"
                    />
                  </div>

                  <div
                    className={`flex items-end justify-between gap-2 ${
                      isRightCol
                        ? "lg:flex-row-reverse lg:text-right lg:pl-32"
                        : "lg:pr-32"
                    }`}
                  >
                    <p className="max-w-[270px] text-[11px] leading-snug text-[#4a443c]">
                      {role.heroSplitLeft.subline}
                    </p>
                    <TransitionLink
                      href={`/work?role=${role.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 inline-flex items-center gap-1 rounded-full border border-[#0f1217]/14 bg-[#ffffff] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#0f1217] hover:border-[#ea1d0f] hover:text-[#ea1d0f] shadow-xs"
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

        {/* DEVINTHEHOOD SIGNATURE CENTER BADGE (Overview mode: centered right below the 3D developer) */}
        {phaseIndex === 0 && (
          <div className="pointer-events-none hidden lg:flex absolute inset-0 z-15 flex-col items-center justify-end pb-12">
            <div className="rounded-full border border-[#0f1217]/12 bg-[#ffffff]/95 px-6 py-2.5 text-center shadow-lg backdrop-blur-md">
              <div className="text-base sm:text-lg font-black tracking-tight uppercase text-[#0f1217]">
                Four disciplines. <span className="text-[#ea1d0f]">Built together.</span>
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-[#4a443c]">
                Click any quadrant to wipe expand · Scroll to sweep clock
              </div>
            </div>
          </div>
        )}

        {/* PHASE 5: FULL INLINE DETERMINISTIC DEVBOT COMPUTER WORKSTATION (Light/Dark devinthehood dualism) */}
        {isDeskMode && (
          <div className="relative lg:absolute lg:inset-0 z-25 flex flex-col lg:flex-row items-center justify-between gap-6 rounded-3xl border border-[#0f1217]/12 bg-[#ffffff]/95 p-5 sm:p-8 shadow-xl backdrop-blur-xl animate-[fadeIn_0.35s_ease-out]">
            <div className="flex w-full lg:w-[60%] flex-col justify-between gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ea1d0f] text-[#ffffff]">
                    <Terminal size={17} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase text-[#ea1d0f]">
                      DETERMINISTIC DEVBOT CONSOLE · ZERO LLM
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0f1217]">
                      Ask About Any Project, Skill or Credential
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => applyPhase(0)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#0f1217]/14 bg-[#f4f1ea] px-3 py-1 font-mono text-[10px] uppercase text-[#0f1217] hover:border-[#ea1d0f] cursor-pointer"
                >
                  <RotateCcw size={11} />
                  <span>Reset Clock</span>
                </button>
              </div>

              <div className="rounded-2xl border border-[#0f1217]/10 bg-[#0f1217] p-4 space-y-3 text-[#f4f1ea] shadow-md">
                {botReply.badge && (
                  <div className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-[#ffb547]">
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
                        className="rounded-full border border-[#f4f1ea]/22 bg-[#1c222c] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#f4f1ea] hover:border-[#ea1d0f] cursor-pointer"
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
                    className="rounded-full border border-[#0f1217]/12 bg-[#ffffff] px-2.5 py-1 font-mono text-[10px] text-[#0f1217]/85 hover:border-[#ea1d0f] hover:text-[#ea1d0f] shadow-xs transition-colors cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              <form
                onSubmit={handleAskHeroBot}
                className="flex items-center gap-2 rounded-2xl border border-[#0f1217]/14 bg-[#ffffff] px-4 py-2.5 shadow-xs"
              >
                <input
                  type="text"
                  value={heroInput}
                  onChange={(e) => setHeroInput(e.target.value)}
                  placeholder="Try 'show me projects with Databricks' or '/project Adaptive Traffic'..."
                  className="w-full bg-transparent font-mono text-xs text-[#0f1217] placeholder:text-[#0f1217]/45 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#ea1d0f] text-[#ffffff] cursor-pointer"
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

      {/* BOTTOM CLOCK PHASE PILLS + SCROLL CUE (Devinthehood Light Paper Styling) */}
      <div className="relative z-30 mx-auto flex w-full max-w-[1520px] flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-[#4a443c]">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={12} className="text-[#ea1d0f]" />
            <span className="font-bold">CLOCK SWEEP:</span>
          </span>
          {HERO_PHASES.map((ph, idx) => {
            const isSelected = phaseIndex === idx;
            return (
              <button
                key={ph.key}
                type="button"
                onClick={() => applyPhase(idx)}
                aria-label={`Jump hero clock to ${ph.key}`}
                className="rounded-full px-2.5 py-0.5 uppercase tracking-[0.08em] transition cursor-pointer border shadow-xs"
                style={{
                  borderColor: isSelected ? "#ea1d0f" : "rgba(15,18,23,0.14)",
                  backgroundColor: isSelected ? "#ea1d0f" : "#ffffff",
                  color: isSelected ? "#ffffff" : "#0f1217",
                  fontWeight: isSelected ? "bold" : "normal",
                }}
              >
                {ph.key === "overview" ? "ALL 4" : ph.key.toUpperCase()}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollToSectionId("the-street")}
          className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.15em] text-[#0f1217]/80 hover:text-[#ea1d0f] cursor-pointer"
        >
          <span>Scroll to ride The Street</span>
          <ArrowDown size={14} />
        </button>
      </div>
    </section>
  );
}
