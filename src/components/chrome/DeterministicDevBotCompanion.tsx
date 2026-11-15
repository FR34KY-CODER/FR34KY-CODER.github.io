"use client";

import React, { useRef, useState } from "react";
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
import { PuppetDeveloperAvatar } from "@/components/home/PuppetDeveloperAvatar";

export function DeterministicDevBotCompanion() {
  const pathname = usePathname();
  const router = useRouter();
  const { activeRole, hoverInfo } = useRole();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<BotReply[]>([
    {
      id: "welcome",
      sender: "bot",
      badge: "DETERMINISTIC ASSISTANT · ONLINE",
      text: "Hey! I'm Ojasvi's interactive portfolio assistant. Ask me anything about his projects, skills, education, or achievements with zero LLM delay.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      {/* FLOATING ANIMATED 2D COMPANION IN BOTTOM RIGHT */}
      <aside
        aria-label="Interactive Portfolio Assistant"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none pointer-events-none"
      >
        {/* CONTEXTUAL LIVE INSIGHT SPEECH BUBBLE */}
        {!isOpen && !isMinimized && (
          <div
            onClick={() => setIsOpen(true)}
            className="pointer-events-auto mb-2 max-w-[270px] sm:max-w-[310px] rounded-2xl border border-[#0f1217]/14 bg-[#ffffff]/95 px-3.5 py-2 shadow-xl backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-[#ea1d0f] animate-[fadeIn_0.25s_ease-out]"
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

        {/* 2D CARTOON CHARACTER CUTOUT (Zero white box, 100% transparent PNG with floating life animation) */}
        {!isMinimized ? (
          <div className="pointer-events-auto relative flex flex-col items-center">
            {/* Living Puppet Avatar Button with Waving Hand & Floating Bot */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Open Deterministic DevBot Assistant"
              className="relative h-24 w-24 sm:h-28 sm:w-28 cursor-pointer focus:outline-none transition-transform duration-300 drop-shadow-[0_10px_20px_rgba(0,0,0,0.22)]"
            >
              <PuppetDeveloperAvatar
                activeRole={activeRole}
                isWaving
                showCompanionBot
                className="w-full h-full"
              />

              {/* Online pulse dot near head */}
              <span className="absolute top-1 right-2 flex h-3 w-3 pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white" />
              </span>
            </button>

            {/* Quick Status Pill docked under avatar */}
            <div className="mt-1 flex items-center gap-1.5 rounded-full border border-[#0f1217]/12 bg-[#ffffff]/90 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#0f1217] shadow-xs backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ea1d0f]" />
              <span>P1 ASSISTANT</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(true);
                }}
                title="Minimize assistant"
                className="ml-1 hover:text-[#ea1d0f] transition"
              >
                <Minimize2 size={9} />
              </button>
            </div>
          </div>
        ) : (
          /* Minimized Docked Pill */
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            aria-label="Restore Assistant"
            className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-[#0f1217]/18 bg-white px-3 py-1.5 font-mono text-[10px] font-bold text-[#0f1217] shadow-xl hover:border-[#ea1d0f] hover:text-[#ea1d0f] transition cursor-pointer"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI ASSISTANT</span>
            <Maximize2 size={11} />
          </button>
        )}
      </aside>

      {/* POPUP INTERACTIVE DEVBOT CONSOLE DRAWER */}
      {isOpen && (
        <div
          role="dialog"
          aria-labelledby="assistant-title"
          className="fixed bottom-28 right-4 sm:bottom-32 sm:right-6 z-50 flex w-[calc(100vw-32px)] sm:w-[410px] max-h-[540px] flex-col rounded-3xl border border-[#0f1217]/14 bg-[#ffffff]/98 shadow-2xl backdrop-blur-xl animate-[fadeIn_0.25s_ease-out] overflow-hidden"
        >
          {/* Header with Cartoon Mascot Thumbnail */}
          <div className="flex items-center justify-between border-b border-[#0f1217]/10 bg-[#f4f1ea] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-[#0f1217]/12 bg-white/80 p-0.5">
                <PuppetDeveloperAvatar
                  activeRole={activeRole}
                  isWaving
                  showCompanionBot={false}
                  className="w-full h-full"
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
                  ● INSTANT RECALL · ZERO LLM LATENCY
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
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs max-h-[310px]">
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
