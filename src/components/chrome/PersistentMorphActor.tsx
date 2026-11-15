"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";
import { CORE_ROLES } from "@/data/roles";
import { PROFILE } from "@/data/profile";
import { HeroStageMode, useRole } from "@/context/RoleContext";
import { BotReply, resolveDevBotQuery } from "@/lib/devbotEngine";
import { triggerRouteNavigation } from "@/lib/navigation";

const MorphingThreeCharacter = dynamic(
  () => import("./MorphingThreeCharacter").then((mod) => mod.MorphingThreeCharacter),
  { ssr: false }
);

const QUICK_PROMPTS = [
  "/project LexNext.AI",
  "/project Open Retail",
  "/skill FastAPI",
  "/edu",
  "/achievements",
  "/links",
  "/contact",
];

const MOOD_TAG: Record<string, string> = {
  orbit: "CENTER HUB · 4 ROLES",
  "ai-leash": "SIDE STAGE · AI AGENT LEASH",
  "backend-ops": "SIDE STAGE · BACKEND OPS",
  "ds-graph": "SIDE STAGE · DATA PRISM",
  "ml-mechanic": "ML MECHANIC · BOT BRAIN",
  "desk-chat": "WORKSTATION · DEVBOT DESK",
  bicycle: "ON THE ROAD · CYCLING",
  graduation: "FACTORY FLOOR · GRADUATE",
};

function getStagePositionClass(stageMode: HeroStageMode, isHome: boolean): string {
  if (!isHome || stageMode === "off-home" || stageMode === "under-hood") {
    return "right-5 bottom-5 w-[170px] h-[170px] sm:w-[210px] sm:h-[210px] lg:right-8 lg:bottom-6 lg:w-[235px] lg:h-[235px]";
  }

  switch (stageMode) {
    case "hero-overview":
      // Centered Hero human developer floating right above "Four disciplines. Built together."
      return "max-lg:hidden lg:block lg:left-1/2 lg:top-[45%] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[280px] lg:h-[270px]";
    case "hero-quarter":
      // Slides smoothly to the right working stage while the active Quarter expands full-page!
      return "max-lg:hidden lg:block lg:left-[79%] lg:top-[54%] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[320px] lg:h-[310px]";
    case "hero-desk":
      // Slides to sit at his glowing 3D workstation desk alongside the full inline DevBot console
      return "max-lg:hidden lg:block lg:left-[76%] lg:top-[56%] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[320px] lg:h-[300px]";
    case "street":
      // Physically ON THE ROAD asphalt strip inside #the-street (bottom: 0..86px), real human bicycling!
      return "left-4 bottom-2 w-[180px] h-[170px] lg:left-[14%] lg:bottom-[14px] lg:w-[270px] lg:h-[245px]";
    case "factory":
      // Physically ON THE FACTORY FLOOR beside the conveyor belt and press wearing Graduation cap!
      return "left-4 bottom-6 w-[150px] h-[145px] lg:left-[10%] lg:bottom-[64px] lg:w-[245px] lg:h-[235px]";
    default:
      return "right-6 bottom-6 w-[215px] h-[215px]";
  }
}

export function PersistentMorphActor() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    activeRole,
    roleData,
    devMood,
    stageMode,
    setStageMode,
    setDevMood,
    hoverInfo,
    scrollRotation,
    chatOpen,
    setChatOpen,
  } = useRole();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<BotReply[]>([
    {
      id: "welcome",
      sender: "bot",
      badge: "DETERMINISTIC DEVBOT · ONLINE",
      text: "Hover any project, crate, achievement, or React Flow graph node — I'll react live. Ask about any project, skill, /edu, /achievements, /links, or /contact.",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setStageMode("off-home");
      setDevMood("desk-chat");
    }
  }, [isHome, setStageMode, setDevMood]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  const handleSend = (textToRun?: string) => {
    const q = (textToRun ?? input).trim();
    if (!q) return;

    if (q.toLowerCase() === "/clear") {
      setMessages([
        {
          id: `clr-${Date.now()}`,
          sender: "bot",
          badge: "CLEARED",
          text: "Terminal cleared. Ask about any project, skill, /edu, /achievements, or /contact.",
        },
      ]);
      setInput("");
      return;
    }

    const userMsg: BotReply = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: q,
    };
    const replyPayload = resolveDevBotQuery(q);
    const botMsg: BotReply = {
      id: `b-${Date.now() + 1}`,
      sender: "bot",
      ...replyPayload,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    setChatOpen(true);
  };

  const posClass = getStagePositionClass(stageMode, isHome);

  return (
    <>
      {/* ONE PERSISTENT CONTINUOUS MORPHING 3D HERO CHARACTER ACROSS ALL SCENES */}
      <div
        className={`fixed z-30 pointer-events-none transition-[left,top,right,bottom,width,height,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${posClass}`}
      >
        {/* LIVE SPEECH BUBBLE DIRECTLY ABOVE CHARACTER'S HEAD ON ANY HOVER */}
        {hoverInfo && !chatOpen && (
          <div
            className="pointer-events-none absolute -top-3 left-1/2 z-40 w-[260px] sm:w-[295px] -translate-x-1/2 -translate-y-full rounded-2xl border bg-[#0b0e14]/95 px-3.5 py-2.5 text-[#f4f1ea] shadow-2xl backdrop-blur-md animate-[fadeIn_0.16s_ease-out]"
            style={{ borderColor: hoverInfo.accent ?? roleData.accentNight }}
          >
            {hoverInfo.badge && (
              <div
                className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase"
                style={{ color: hoverInfo.accent ?? roleData.accentNight }}
              >
                {hoverInfo.badge}
              </div>
            )}
            <div className="mt-0.5 text-xs font-extrabold leading-snug text-[#f4f1ea]">
              {hoverInfo.title}
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-[#f4f1ea]/82 line-clamp-3">
              {hoverInfo.detail}
            </p>
            <div
              className="absolute left-1/2 -bottom-2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border-r border-b bg-[#0b0e14]"
              style={{ borderColor: hoverInfo.accent ?? roleData.accentNight }}
            />
          </div>
        )}

        {/* Ambient Cosmic / Ground Contact Glow behind 3D canvas */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 rounded-full blur-2xl opacity-35 transition-colors duration-500"
          style={{ backgroundColor: roleData.accentNight }}
        />

        {/* Revolving 4-role HTML orbital pills cleanly framing the 3D Hero when centered */}
        {stageMode === "hero-overview" && isHome && (
          <div className="devbot-spin pointer-events-none absolute -inset-2">
            {CORE_ROLES.map((r, i) => {
              const angles = [-45, 45, 135, 225];
              const rad = (angles[i] * Math.PI) / 180;
              const xPct = 50 + Math.cos(rad) * 48;
              const yPct = 50 + Math.sin(rad) * 48;
              return (
                <span
                  key={r.id}
                  className="devbot-counter-spin absolute rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase shadow-md backdrop-blur-xs"
                  style={{
                    left: `${xPct}%`,
                    top: `${yPct}%`,
                    borderColor: r.accentNight,
                    backgroundColor: "rgba(15, 18, 23, 0.9)",
                    color: r.accentNight,
                  }}
                >
                  {r.shortLabel}
                </span>
              );
            })}
          </div>
        )}

        {/* Single Continuous WebGL Three.js Character Stage */}
        <MorphingThreeCharacter
          mood={devMood}
          accentColor={roleData.accentNight}
          secondaryAccent={activeRole === "ds" ? "#A78BFA" : "#22D3EE"}
          scrollRotation={scrollRotation}
          badgeText={`${PROFILE.monogram} · ${roleData.code}`}
          className="h-full w-full"
        />

        {/* Subtle interactive trigger pill docked cleanly below his feet (NOT a boxed corner) */}
        <div className="pointer-events-auto absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap">
          <button
            type="button"
            onClick={() => setChatOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#f4f1ea]/22 bg-[#0b0e14]/92 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#f4f1ea] shadow-lg backdrop-blur-md hover:border-[var(--role-accent-night)] transition cursor-pointer"
            aria-label="Toggle Deterministic DevBot Assistant"
          >
            <MessageSquare size={11} style={{ color: roleData.accentNight }} />
            <span>{MOOD_TAG[devMood] ?? "DEVBOT STAGE"}</span>
          </button>
        </div>
      </div>

      {/* EXPANDABLE DETERMINISTIC DEVBOT TERMINAL DRAWER ON THE SIDE */}
      {chatOpen && (
        <div className="fixed right-4 bottom-24 lg:right-8 lg:bottom-8 z-50 w-[min(92vw,395px)] rounded-2xl border border-[#f4f1ea]/20 bg-[#0b0e14]/96 text-[#f4f1ea] shadow-2xl backdrop-blur-xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#f4f1ea]/12 px-4 py-3 bg-[#121620]">
            <div className="flex items-center gap-2">
              <Sparkles size={14} style={{ color: roleData.accentNight }} />
              <span className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase">
                DEVBOT TERMINAL · DETERMINISTIC
              </span>
            </div>
            <button
              type="button"
              onClick={() => setChatOpen(false)}
              className="rounded-lg p-1 text-[#f4f1ea]/70 hover:bg-[#f4f1ea]/10 hover:text-[#f4f1ea] cursor-pointer"
              aria-label="Close DevBot chat"
            >
              <X size={15} />
            </button>
          </div>

          <div ref={scrollRef} className="max-h-[275px] overflow-y-auto p-3.5 space-y-2.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-xl px-3 py-2 text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "ml-8 bg-[#f4f1ea]/12 text-[#f4f1ea] font-mono text-[11px]"
                    : "mr-4 border border-[#f4f1ea]/10 bg-[#141923] text-[#f4f1ea]/90"
                }`}
              >
                {msg.badge && (
                  <div
                    className="mb-1 font-mono text-[9px] font-bold tracking-[0.14em] uppercase"
                    style={{ color: roleData.accentNight }}
                  >
                    {msg.badge}
                  </div>
                )}
                <p>{msg.text}</p>
                {msg.links && msg.links.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.links.map((lk) => (
                      <button
                        key={lk.href + lk.label}
                        type="button"
                        onClick={() => {
                          if (lk.href.startsWith("http") || lk.href.startsWith("mailto:")) {
                            window.open(lk.href, "_blank", "noreferrer");
                          } else {
                            setChatOpen(false);
                            triggerRouteNavigation(lk.href, router);
                          }
                        }}
                        className="rounded-full border border-[#f4f1ea]/22 bg-[#0b0e14] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-[#f4f1ea] hover:border-[var(--role-accent-night)] cursor-pointer"
                      >
                        {lk.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1 border-t border-[#f4f1ea]/10 px-3 py-2 bg-[#0f131b]">
            {QUICK_PROMPTS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => handleSend(cmd)}
                className="rounded-full border border-[#f4f1ea]/15 px-2 py-0.5 font-mono text-[9.5px] text-[#f4f1ea]/80 hover:border-[var(--role-accent-night)] hover:text-[#f4f1ea] transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-[#f4f1ea]/12 px-3 py-2.5 bg-[#0b0e14]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask '/project LexNext.AI', 'YOLOv8', '/edu'..."
              className="w-full bg-transparent font-mono text-xs text-[#f4f1ea] placeholder:text-[#f4f1ea]/40 focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#0b0e14] cursor-pointer"
              style={{ backgroundColor: roleData.accentNight }}
              aria-label="Send query"
            >
              <Send size={13} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

