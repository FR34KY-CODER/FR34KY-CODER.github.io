"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Sparkles,
  X,
  Send,
  Minimize2,
  Maximize2,
  ChevronRight,
} from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { BotActionLink, BotReply, resolveDevBotQuery } from "@/lib/devbotEngine";

const ROLE_AVATAR_IMAGES: Record<string, string> = {
  all: "/images/avatars/avatar-assistant.png",
  ai: "/images/avatars/avatar-ai.png",
  backend: "/images/avatars/avatar-backend.png",
  ds: "/images/avatars/avatar-ds.png",
  ml: "/images/avatars/avatar-ml.png",
  bicycle: "/images/avatars/avatar-bicycle.png",
};

const DEFAULT_FALLBACK_IMAGE = "/images/developer-hero.jpg";

export function DeterministicDevBotCompanion() {
  const pathname = usePathname();
  const router = useRouter();
  const { activeRole, hoverInfo } = useRole();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string>(
    ROLE_AVATAR_IMAGES[activeRole] ?? ROLE_AVATAR_IMAGES.all
  );
  const [imgError, setImgError] = useState(false);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<BotReply[]>([
    {
      id: "welcome",
      sender: "bot",
      badge: "DETERMINISTIC ASSISTANT · ONLINE",
      text: "Hey! I'm Ojasvi's deterministic portfolio assistant. Ask me anything about his projects, skills, education, or achievements with zero LLM delay.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update avatar based on active role
  useEffect(() => {
    setImgError(false);
    setAvatarSrc(ROLE_AVATAR_IMAGES[activeRole] ?? ROLE_AVATAR_IMAGES.all);
  }, [activeRole]);

  // Contextual live insight message based on route and hover
  const getContextualInsight = (): string => {
    if (hoverInfo) {
      return `${hoverInfo.badge ? `[${hoverInfo.badge}] ` : ""}${hoverInfo.title} — ${hoverInfo.detail}`;
    }
    if (pathname === "/work") {
      return "📁 Exploring 12 production case studies. Filter by AI, Backend, Data Science or ML.";
    }
    if (pathname === "/contact") {
      return "📬 Send an instant note or schedule an architecture deep-dive in Jaipur, IN.";
    }
    if (activeRole === "ai") {
      return "🤖 AI Engineering: Autonomous agent swarms & structured legal RAG.";
    }
    if (activeRole === "backend") {
      return "⚡ Backend: Async workers, Redis locks & 4,000+ req/s.";
    }
    if (activeRole === "ds") {
      return "📊 Data Science: Causal inference & Databricks ORDM canonical data models.";
    }
    if (activeRole === "ml") {
      return "🧠 ML Systems: YOLOv8 real-time edge vision & transformer serving.";
    }
    return "💡 Click me for instant project & resume recall (Zero LLM, deterministic).";
  };

  const currentInsight = getContextualInsight();

  const handleSend = (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    const userMsg: BotReply = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: q,
    };

    const replyPayload = resolveDevBotQuery(q);
    const botReply: BotReply = {
      id: `bot-${Date.now()}`,
      sender: "bot",
      ...replyPayload,
    };

    setMessages((prev) => [...prev, userMsg, botReply]);
    setInput("");

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {/* FLOATING COMPANION AGENT IN BOTTOM RIGHT */}
      <div
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* CONTEXTUAL LIVE INSIGHT SPEECH BUBBLE (Visible when not minimized and drawer closed) */}
        {!isOpen && !isMinimized && (
          <div
            onClick={() => setIsOpen(true)}
            className="mb-2 max-w-[280px] sm:max-w-[320px] rounded-2xl border border-[#0f1217]/14 bg-[#ffffff]/95 px-3.5 py-2 shadow-lg backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-[#ea1d0f] animate-[fadeIn_0.2s_ease-out]"
          >
            <div className="flex items-center justify-between gap-1 border-b border-[#0f1217]/8 pb-1 mb-1 font-mono text-[9px] uppercase tracking-wider text-[#ea1d0f] font-bold">
              <span className="flex items-center gap-1">
                <Sparkles size={10} />
                <span>ASSISTANT INSIGHT</span>
              </span>
              <span className="text-[#0f1217]/40">CLICK TO CHAT</span>
            </div>
            <p className="font-mono text-[11px] leading-snug text-[#0f1217] line-clamp-3">
              {currentInsight}
            </p>
          </div>
        )}

        {/* COMPANION AVATAR BUTTON */}
        {!isMinimized ? (
          <div className="relative flex items-center">
            {/* The 2D Cartoon Character Bubble */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle Deterministic DevBot Assistant"
              className={`relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border-2 overflow-hidden shadow-xl transition-all duration-300 cursor-pointer ${
                isOpen
                  ? "border-[#ea1d0f] bg-[#0f1217] scale-105"
                  : isHovered
                  ? "border-[#ea1d0f] bg-[#ffffff] -translate-y-1 scale-105"
                  : "border-[#0f1217]/18 bg-[#ffffff]"
              }`}
            >
              <Image
                src={imgError ? DEFAULT_FALLBACK_IMAGE : avatarSrc}
                alt="Deterministic DevBot Assistant"
                fill
                sizes="64px"
                onError={() => setImgError(true)}
                className={`object-cover ${
                  imgError ? "object-[65%_35%]" : "object-contain p-1"
                }`}
              />

              {/* Online Green Indicator Dot */}
              <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 animate-pulse" />
            </button>

            {/* Minimize Pill */}
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              aria-label="Minimize Assistant"
              className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#0f1217]/14 bg-white text-[#0f1217]/70 shadow-xs hover:text-[#ea1d0f] transition cursor-pointer"
            >
              <Minimize2 size={10} />
            </button>
          </div>
        ) : (
          /* Minimized Pill */
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            aria-label="Restore Assistant"
            className="flex items-center gap-1.5 rounded-full border border-[#0f1217]/18 bg-white px-3 py-1.5 font-mono text-[10px] font-bold text-[#0f1217] shadow-lg hover:border-[#ea1d0f] hover:text-[#ea1d0f] transition cursor-pointer"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI ASSISTANT</span>
            <Maximize2 size={11} />
          </button>
        )}
      </div>

      {/* POPUP INTERACTIVE DEVBOT CONSOLE DRAWER */}
      {isOpen && (
        <div
          role="dialog"
          aria-labelledby="assistant-title"
          className="fixed bottom-24 right-5 sm:bottom-26 sm:right-6 z-50 flex w-[calc(100vw-40px)] sm:w-[400px] max-h-[540px] flex-col rounded-3xl border border-[#0f1217]/14 bg-[#ffffff]/98 shadow-2xl backdrop-blur-xl animate-[fadeIn_0.25s_ease-out] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#0f1217]/10 bg-[#f4f1ea] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="relative h-7 w-7 overflow-hidden rounded-lg border border-[#0f1217]/12 bg-white">
                <Image
                  src={imgError ? DEFAULT_FALLBACK_IMAGE : avatarSrc}
                  alt="DevBot"
                  fill
                  sizes="28px"
                  onError={() => setImgError(true)}
                  className={`object-cover ${
                    imgError ? "object-[65%_35%]" : "object-contain p-0.5"
                  }`}
                />
              </div>
              <div>
                <h3
                  id="assistant-title"
                  className="font-mono text-[11px] font-black uppercase text-[#0f1217]"
                >
                  DETERMINISTIC ASSISTANT
                </h3>
                <span className="font-mono text-[9px] text-emerald-600 font-bold uppercase">
                  ● INSTANT RECALL · ZERO LLM
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-black/5 text-[#0f1217]/70 transition cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {/* Quick Filter Command Chips */}
          <div className="flex flex-wrap gap-1 border-b border-[#0f1217]/8 bg-[#ffffff] p-2 font-mono text-[10px]">
            {[
              "/project LexNext.AI",
              "/project Open Retail",
              "/skill FastAPI",
              "/edu",
              "/achievements",
              "/links",
            ].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleSend(chip)}
                className="rounded-full border border-[#0f1217]/10 bg-[#f4f1ea] px-2.5 py-0.5 text-[#0f1217]/80 hover:border-[#ea1d0f] hover:text-[#ea1d0f] transition cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs max-h-[320px]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                {m.badge && (
                  <span className="mb-0.5 text-[9px] font-bold uppercase text-[#ea1d0f]">
                    {m.badge}
                  </span>
                )}
                <div
                  className={`max-w-[88%] rounded-2xl p-3 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#0f1217] text-[#f4f1ea]"
                      : "border border-[#0f1217]/10 bg-[#f4f1ea] text-[#0f1217]"
                  }`}
                >
                  <p>{m.text}</p>

                  {m.links && m.links.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-[#0f1217]/8 pt-2">
                      {m.links.map((link: BotActionLink) => (
                        <button
                          key={link.href + link.label}
                          type="button"
                          onClick={() => {
                            if (
                              link.href.startsWith("http") ||
                              link.href.startsWith("mailto:")
                            ) {
                              window.open(link.href, "_blank", "noreferrer");
                            } else {
                              router.push(link.href);
                              setIsOpen(false);
                            }
                          }}
                          className="inline-flex items-center gap-1 rounded-full border border-[#0f1217]/15 bg-white px-2.5 py-0.5 text-[10px] font-bold text-[#0f1217] hover:border-[#ea1d0f] hover:text-[#ea1d0f] transition cursor-pointer"
                        >
                          <span>{link.label}</span>
                          <ChevronRight size={10} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2 border-t border-[#0f1217]/10 bg-[#ffffff] p-2.5"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, bio..."
              className="flex-1 rounded-xl border border-[#0f1217]/12 bg-[#f4f1ea] px-3 py-2 font-mono text-xs text-[#0f1217] focus:outline-none focus:border-[#ea1d0f]"
            />
            <button
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ea1d0f] text-white hover:opacity-90 transition cursor-pointer"
            >
              <Send size={13} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
