"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUpRight,
  GraduationCap,
  Maximize2,
  RotateCcw,
  Terminal,
} from "lucide-react";
import { PROFILE } from "@/data/profile";
import { CoreRoleId, ROLES } from "@/data/roles";
import { useRole } from "@/context/RoleContext";
import { TransitionLink } from "@/components/chrome/TransitionLink";
import { scrollToSectionId } from "@/lib/navigation";
import { BotActionLink, BotReply, resolveDevBotQuery } from "@/lib/devbotEngine";
import {
  RadialWipeTransition,
  WipeOriginConfig,
} from "./RadialWipeTransition";
import { IllustratedHeroDeveloper } from "./IllustratedHeroDeveloper";

const RoleKnowledgeGraph = dynamic(
  () => import("./RoleKnowledgeGraph").then((mod) => mod.RoleKnowledgeGraph),
  { ssr: false }
);

type BotReplyPayload = Omit<BotReply, "id" | "sender">;

// 4 Borderless Quadrant layout coordinates (Devinthehood architectural split)
const BORDERLESS_QUADRANTS: {
  roleId: CoreRoleId;
  posClass: string;
  alignClass: string;
}[] = [
  {
    roleId: "ai",
    posClass: "lg:top-0 lg:left-0 lg:w-1/2 lg:h-1/2",
    alignClass: "lg:pr-8 lg:pb-6",
  },
  {
    roleId: "backend",
    posClass: "lg:top-0 lg:left-1/2 lg:w-1/2 lg:h-1/2",
    alignClass: "lg:pl-8 lg:pb-6",
  },
  {
    roleId: "ds",
    posClass: "lg:top-1/2 lg:left-0 lg:w-1/2 lg:h-1/2",
    alignClass: "lg:pr-8 lg:pt-6",
  },
  {
    roleId: "ml",
    posClass: "lg:top-1/2 lg:left-1/2 lg:w-1/2 lg:h-1/2",
    alignClass: "lg:pl-8 lg:pt-6",
  },
];

// Origin coordinates for the Radial Wipe Transition (from user's CSS specification)
const QUADRANT_WIPE_ORIGINS: Record<string, WipeOriginConfig> = {
  all: {
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
};

export function ChapterTwoSides() {
  const router = useRouter();
  const { activeRole, setActiveRole, setHoverInfo } = useRole();

  // Selected discipline expanded full-page (null = 4 borderless quadrants overview)
  const [expandedRole, setExpandedRole] = useState<CoreRoleId | null>(null);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [wipeTriggerKey, setWipeTriggerKey] = useState<string>("all");

  const [heroInput, setHeroInput] = useState("");
  const [botReply, setBotReply] = useState<BotReplyPayload>({
    badge: "DETERMINISTIC ENGINE READY",
    text: "Type '/project Open Retail', '/project LexNext.AI', '/edu', '/achievements', '/links', or any skill like 'FastAPI' or 'YOLOv8'.",
  });

  const handleSelectRole = (roleId: CoreRoleId) => {
    setWipeTriggerKey(roleId);
    setExpandedRole(roleId);
    setActiveRole(roleId); // Sets the theme for the rest of the site!
  };

  const handleResetToAll = () => {
    setWipeTriggerKey("all");
    setExpandedRole(null);
    setActiveRole("all");
  };

  const handleAskHeroBot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroInput.trim()) return;
    setBotReply(resolveDevBotQuery(heroInput.trim()));
    setHeroInput("");
  };

  return (
    <section
      id="two-sides"
      data-paper=""
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#f4f1ea] px-4 sm:px-8 lg:px-12 pt-20 pb-5 text-[#0f1217]"
      aria-labelledby="hero-title"
    >
      <h1 id="hero-title" className="sr-only">
        Ojasvi Goyal — Four Disciplines Under One Hood: AI Engineer, Backend
        Developer, Data Scientist, Machine Learning Engineer
      </h1>

      {/* RADIAL WIPE TRANSITION OVERLAY (Sweeps 360° from the selected quadrant) */}
      <RadialWipeTransition
        triggerKey={wipeTriggerKey}
        origin={
          QUADRANT_WIPE_ORIGINS[wipeTriggerKey] ?? QUADRANT_WIPE_ORIGINS.all
        }
        durationMs={900}
        maskColor="#f4f1ea"
      />

      {/* TOP EDITORIAL METADATA BAR (devinthehood style: crisp, minimal, human) */}
      <header className="relative z-30 mx-auto flex w-full max-w-[1520px] flex-wrap items-center justify-between gap-3 border-b border-[#0f1217]/10 pb-3">
        {/* Left: Name, Handle & Education */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="font-mono text-[13px] font-black uppercase tracking-tight text-[#0f1217]">
            {PROFILE.name}
            <span className="ml-2 font-normal text-[#0f1217]/60">
              @{PROFILE.handle}
            </span>
          </div>

          <span className="hidden sm:inline text-[#0f1217]/25">|</span>

          <div
            onMouseEnter={() =>
              setHoverInfo({
                badge: "EDUCATION · LNMIIT JAIPUR",
                title: PROFILE.educationDetail.degree,
                detail: `${PROFILE.educationDetail.institution} (${PROFILE.educationDetail.period}) · ${PROFILE.educationDetail.research}`,
              })
            }
            onMouseLeave={() => setHoverInfo(null)}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-[#0f1217]/80"
          >
            <GraduationCap size={13} className="text-[#ea1d0f]" />
            <span>B.Tech · LNMIIT Jaipur (&apos;26)</span>
          </div>
        </div>

        {/* Right: Direct Social Outlets */}
        <nav
          aria-label="Social Profiles"
          className="flex flex-wrap items-center gap-2"
        >
          {PROFILE.socials.map((soc) => (
            <a
              key={soc.label}
              href={soc.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[#0f1217]/75 hover:text-[#ea1d0f] transition-colors"
            >
              <span>{soc.label}</span>
              <ArrowUpRight size={11} />
            </a>
          ))}

          <button
            type="button"
            onClick={() => setConsoleOpen((v) => !v)}
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-[#0f1217]/14 bg-[#ffffff] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#0f1217] hover:border-[#ea1d0f] hover:text-[#ea1d0f] transition shadow-xs cursor-pointer"
          >
            <Terminal size={11} className="text-[#ea1d0f]" />
            <span>{consoleOpen ? "Close DevBot" : "DevBot Console"}</span>
          </button>
        </nav>
      </header>

      {/* POPDOWN DETERMINISTIC DEVBOT CONSOLE */}
      {consoleOpen && (
        <div className="relative z-40 mx-auto mt-3 w-full max-w-[1520px] rounded-2xl border border-[#0f1217]/12 bg-[#ffffff]/95 p-4 shadow-xl backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#ea1d0f]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#ea1d0f]">
                  DETERMINISTIC DEVBOT · INSTANT RECALL
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#0f1217]/50">
                ZERO LLM LATENCY · DIRECT GRAPH & RESUME QUERY
              </span>
            </div>

            <div className="rounded-xl border border-[#0f1217]/10 bg-[#0f1217] p-3 text-[#f4f1ea]">
              {botReply.badge && (
                <div className="font-mono text-[10px] font-bold text-[#ffb547] uppercase">
                  {botReply.badge}
                </div>
              )}
              <p className="mt-1 text-xs leading-relaxed text-[#f4f1ea]/90 font-mono">
                {botReply.text}
              </p>
              {botReply.links && botReply.links.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {botReply.links.map((lk: BotActionLink) => (
                    <button
                      key={lk.href + lk.label}
                      type="button"
                      onClick={() =>
                        lk.href.startsWith("http") || lk.href.startsWith("mailto:")
                          ? window.open(lk.href, "_blank", "noreferrer")
                          : router.push(lk.href)
                      }
                      className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 font-mono text-[10px] text-white hover:border-[#ea1d0f] cursor-pointer"
                    >
                      {lk.label} →
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleAskHeroBot} className="flex gap-2">
              <input
                type="text"
                value={heroInput}
                onChange={(e) => setHeroInput(e.target.value)}
                placeholder="Try '/project LexNext.AI', '/project Open Retail', '/edu', or any skill like 'FastAPI'..."
                className="flex-1 rounded-xl border border-[#0f1217]/12 bg-[#f4f1ea] px-3 py-1.5 font-mono text-xs text-[#0f1217] focus:outline-none focus:border-[#ea1d0f]"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#ea1d0f] px-4 py-1.5 font-mono text-xs font-bold uppercase text-white hover:opacity-90 cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MAIN HERO ARENA: BORDERLESS 4 PROFILES WITH DEVINTHEHOOD ARCHITECTURAL SPLIT */}
      <div className="relative z-10 mx-auto my-auto flex-1 w-full max-w-[1520px] min-h-[580px] lg:min-h-[560px]">
        {/* Subtle architectural background paper grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,18,23,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,18,23,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* HAIRLINE CROSSHAIRS DIVIDING THE 4 BORDERLESS QUADRANTS (Hidden when full-page expanded) */}
        {!expandedRole && (
          <div className="pointer-events-none hidden lg:block absolute inset-0 z-10">
            {/* Vertical hairline divider */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-[#0f1217]/10" />
            {/* Horizontal hairline divider */}
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#0f1217]/10" />

            {/* Corner & Center Alignment Cross Ticks (+) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[14px] text-[#0f1217]/35 select-none">
              +
            </div>
            <div className="absolute top-1 left-1 font-mono text-[11px] text-[#0f1217]/25 select-none">
              +
            </div>
            <div className="absolute top-1 right-1 font-mono text-[11px] text-[#0f1217]/25 select-none">
              +
            </div>
            <div className="absolute bottom-1 left-1 font-mono text-[11px] text-[#0f1217]/25 select-none">
              +
            </div>
            <div className="absolute bottom-1 right-1 font-mono text-[11px] text-[#0f1217]/25 select-none">
              +
            </div>
          </div>
        )}

        {/* CENTER BATTESTATION (Visible in Overview mode, right at the intersection) */}
        {!expandedRole && (
          <div className="hidden lg:flex pointer-events-none absolute inset-0 z-20 items-center justify-center">
            <div className="pointer-events-auto w-[360px] xl:w-[420px] transition-transform duration-500 hover:scale-[1.01]">
              <IllustratedHeroDeveloper activeRole={activeRole} />
            </div>
          </div>
        )}

        {/* 4 BORDERLESS QUADRANTS */}
        {BORDERLESS_QUADRANTS.map((slot) => {
          const role = ROLES[slot.roleId];
          const isRightCol = slot.roleId === "backend" || slot.roleId === "ml";
          const isThisExpanded = expandedRole === slot.roleId;
          const isHiddenByAnother = expandedRole !== null && !isThisExpanded;

          return (
            <div
              key={role.id}
              onClick={() => {
                if (!isThisExpanded) {
                  handleSelectRole(slot.roleId);
                }
              }}
              className={`group relative flex flex-col justify-between overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isThisExpanded
                  ? "lg:absolute lg:inset-0 lg:w-full lg:h-full z-30 cursor-default p-4 sm:p-8 bg-[#f4f1ea]"
                  : isHiddenByAnother
                  ? "lg:absolute lg:pointer-events-none lg:opacity-0 lg:scale-95 hidden lg:flex " +
                    slot.posClass +
                    " " +
                    slot.alignClass
                  : "lg:absolute z-10 cursor-pointer p-4 sm:p-6 hover:bg-[#0f1217]/[0.02] " +
                    slot.posClass +
                    " " +
                    slot.alignClass
              }`}
            >
              {isThisExpanded ? (
                /* EXPANDED FULL-PAGE DISCIPLINE VIEW */
                <div className="flex h-full w-full flex-col lg:flex-row gap-6">
                  {/* Left 62%: Knowledge Graph + Architectural Context */}
                  <div className="flex flex-1 lg:w-[62%] flex-col justify-between gap-4">
                    <div>
                      {/* Top Bar with Back & Case Studies Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0f1217]/10 pb-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleResetToAll();
                            }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#0f1217]/15 bg-[#ffffff] px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0f1217] hover:border-[#ea1d0f] hover:text-[#ea1d0f] transition shadow-xs cursor-pointer"
                          >
                            <RotateCcw size={11} />
                            <span>← All 4 Disciplines</span>
                          </button>

                          <span
                            className="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                            style={{
                              backgroundColor: role.accentPaper ?? "#ea1d0f",
                            }}
                          >
                            ACTIVE THEME
                          </span>
                        </div>

                        <TransitionLink
                          href={`/work?role=${role.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 rounded-full px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white shadow-sm hover:opacity-90"
                          style={{
                            backgroundColor: role.accentPaper ?? "#ea1d0f",
                          }}
                        >
                          <span>Explore Case Studies</span>
                          <ArrowUpRight size={12} />
                        </TransitionLink>
                      </div>

                      {/* Discipline Title & Subline */}
                      <div className="mt-4">
                        <div
                          className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase"
                          style={{ color: role.accentPaper ?? "#ea1d0f" }}
                        >
                          {role.code} · DISCIPLINE DEEP-DIVE
                        </div>
                        <h2 className="mt-1 text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0f1217]">
                          {role.title}
                        </h2>
                        <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-[#4a443c] leading-relaxed">
                          {role.heroSplitLeft.subline}
                        </p>
                      </div>
                    </div>

                    {/* Interactive React Flow Knowledge Graph */}
                    <div className="relative h-[310px] sm:h-[360px] w-full rounded-2xl border border-[#0f1217]/10 bg-[#ffffff]/80 shadow-xs overflow-hidden">
                      <RoleKnowledgeGraph
                        roleId={role.id as CoreRoleId}
                        accentColor={role.accentPaper ?? "#ea1d0f"}
                        active
                        fullPage
                        theme="paper"
                      />
                    </div>

                    {/* Footer instructions */}
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#4a443c]">
                      <span>
                        Drag nodes to reorganize · Click project nodes to view repository
                      </span>
                      <span>{role.heroSplitLeft.metricValue}</span>
                    </div>
                  </div>

                  {/* Right 38%: Battlestation Dev Portrait & Role Loadout */}
                  <div className="flex lg:w-[38%] flex-col justify-between gap-4">
                    <IllustratedHeroDeveloper
                      activeRole={role.id}
                      className="w-full"
                    />

                    {/* Skills & Loadout Stack */}
                    <div className="rounded-2xl border border-[#0f1217]/10 bg-[#ffffff] p-4 shadow-xs space-y-3">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0f1217]/60">
                        PRODUCTION LOADOUT
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(role.mission?.loadout ?? role.heroSplitLeft.badges).map((item: string) => (
                          <span
                            key={item}
                            className="rounded-md border border-[#0f1217]/10 bg-[#f4f1ea] px-2.5 py-1 font-mono text-[11px] font-semibold text-[#0f1217]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#0f1217]/8 font-mono text-[11px] text-[#4a443c] space-y-1">
                        <div className="flex justify-between">
                          <span>PRIMARY METRIC</span>
                          <span className="font-bold text-[#0f1217]">
                            {role.heroSplitLeft.metricValue}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>DOMAINS</span>
                          <span className="font-bold text-[#0f1217]">
                            {role.heroSplitLeft.badges.join(" · ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* BORDERLESS OVERVIEW QUADRANT TILE */
                <div className="flex h-full flex-col justify-between gap-2">
                  {/* Top row: Discipline Code & Expand Trigger */}
                  <div
                    className={`flex items-start justify-between gap-2 ${
                      isRightCol ? "lg:flex-row-reverse lg:text-right" : ""
                    }`}
                  >
                    <div>
                      <div
                        className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase flex items-center gap-1.5"
                        style={{ color: role.accentPaper ?? "#ea1d0f" }}
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: role.accentPaper ?? "#ea1d0f",
                          }}
                        />
                        <span>
                          {role.code} · {role.shortLabel}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0f1217]">
                        {role.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="rounded-md border border-[#0f1217]/12 bg-[#ffffff] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0f1217]/80 shadow-2xs">
                        {role.heroSplitLeft.metricValue}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#0f1217]/14 bg-[#ffffff] px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-[#0f1217]/75 group-hover:border-[#ea1d0f] group-hover:text-[#ea1d0f] transition shadow-2xs">
                        <Maximize2 size={9} />
                        <span>Select</span>
                      </span>
                    </div>
                  </div>

                  {/* Ambient Knowledge Graph Mini Canvas */}
                  <div
                    className={`relative h-[115px] sm:h-[135px] w-full overflow-hidden opacity-85 transition-opacity group-hover:opacity-100 ${
                      isRightCol ? "lg:pl-28" : "lg:pr-28"
                    }`}
                  >
                    <RoleKnowledgeGraph
                      roleId={role.id as CoreRoleId}
                      accentColor={role.accentPaper ?? "#ea1d0f"}
                      active={activeRole === "all" || activeRole === role.id}
                      theme="paper"
                    />
                  </div>

                  {/* Bottom row: Subline description & Work link */}
                  <div
                    className={`flex items-end justify-between gap-2 ${
                      isRightCol
                        ? "lg:flex-row-reverse lg:text-right lg:pl-28"
                        : "lg:pr-28"
                    }`}
                  >
                    <p className="max-w-[270px] text-[11px] leading-snug text-[#4a443c]">
                      {role.heroSplitLeft.subline}
                    </p>
                    <TransitionLink
                      href={`/work?role=${role.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 inline-flex items-center gap-1 rounded-full border border-[#0f1217]/14 bg-[#ffffff] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#0f1217] hover:border-[#ea1d0f] hover:text-[#ea1d0f] shadow-xs transition"
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
      </div>

      {/* MOBILE INLINE BATTESTATION (Visible on small screens) */}
      <div className="my-4 lg:hidden">
        <IllustratedHeroDeveloper activeRole={activeRole} />
      </div>

      {/* BOTTOM EDITORIAL DISCIPLINE SELECTOR & SCROLL CUE */}
      <footer className="relative z-30 mx-auto flex w-full max-w-[1520px] flex-wrap items-center justify-between gap-3 border-t border-[#0f1217]/10 pt-3">
        {/* Discipline Selector Pills (Selects discipline and drives theme!) */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#4a443c]">
          <span className="font-bold uppercase tracking-wider text-[#0f1217]">
            DISCIPLINE LENS:
          </span>

          <button
            type="button"
            onClick={handleResetToAll}
            className={`rounded-full px-3 py-1 uppercase tracking-wider text-[10px] transition cursor-pointer border ${
              activeRole === "all"
                ? "bg-[#ea1d0f] text-white border-[#ea1d0f] font-bold shadow-xs"
                : "bg-white text-[#0f1217] border-[#0f1217]/14 hover:border-[#ea1d0f]"
            }`}
          >
            ALL 4 DISCIPLINES
          </button>

          {(["ai", "backend", "ds", "ml"] as CoreRoleId[]).map((rId) => {
            const r = ROLES[rId];
            const isSelected = activeRole === rId;
            return (
              <button
                key={rId}
                type="button"
                onClick={() => handleSelectRole(rId)}
                className={`rounded-full px-3 py-1 uppercase tracking-wider text-[10px] transition cursor-pointer border ${
                  isSelected
                    ? "text-white font-bold shadow-xs"
                    : "bg-white text-[#0f1217] border-[#0f1217]/14 hover:border-[#ea1d0f]"
                }`}
                style={{
                  backgroundColor: isSelected
                    ? r.accentPaper ?? "#ea1d0f"
                    : undefined,
                  borderColor: isSelected
                    ? r.accentPaper ?? "#ea1d0f"
                    : undefined,
                }}
              >
                {r.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Scroll cue to next chapter */}
        <button
          type="button"
          onClick={() => scrollToSectionId("the-street")}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#0f1217]/80 hover:text-[#ea1d0f] transition cursor-pointer"
        >
          <span>Scroll to 02 / The Street</span>
          <ArrowDown size={13} className="animate-bounce" />
        </button>
      </footer>
    </section>
  );
}
