"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ROLES, RoleDefinition, RoleId } from "@/data/roles";

export type DevMood =
  | "orbit"
  | "ai-leash"
  | "backend-ops"
  | "ds-graph"
  | "ml-mechanic"
  | "desk-chat"
  | "bicycle"
  | "graduation";

export type HeroStageMode =
  | "hero-overview"
  | "hero-quarter"
  | "hero-desk"
  | "street"
  | "factory"
  | "under-hood"
  | "off-home";

export type HeroPhaseKey = "overview" | "ai" | "backend" | "ds" | "ml" | "desk";

export interface DevHoverInfo {
  title: string;
  detail: string;
  badge?: string;
  accent?: string;
}

interface RoleContextValue {
  activeRole: RoleId;
  roleData: RoleDefinition;
  setActiveRole: (role: RoleId) => void;
  devMood: DevMood;
  setDevMood: (mood: DevMood) => void;
  stageMode: HeroStageMode;
  setStageMode: (mode: HeroStageMode) => void;
  clockAngle: number;
  setClockAngle: (deg: number) => void;
  activePhaseKey: HeroPhaseKey;
  setActivePhaseKey: (phase: HeroPhaseKey) => void;
  hoverInfo: DevHoverInfo | null;
  setHoverInfo: (info: DevHoverInfo | null) => void;
  dockVisible: boolean;
  setDockVisible: (v: boolean) => void;
  scrollRotation: number;
  setScrollRotation: (deg: number) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRole] = useState<RoleId>("all");
  const [devMood, setDevMood] = useState<DevMood>("orbit");
  const [stageMode, setStageMode] = useState<HeroStageMode>("hero-overview");
  const [clockAngle, setClockAngle] = useState(0);
  const [activePhaseKey, setActivePhaseKey] = useState<HeroPhaseKey>("overview");
  const [hoverInfo, setHoverInfo] = useState<DevHoverInfo | null>(null);
  const [dockVisible, setDockVisible] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);

  const roleData = ROLES[activeRole];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--role-accent-night", roleData.accentNight);
    root.style.setProperty("--role-accent-paper", roleData.accentPaper);
    root.style.setProperty("--role-tint", roleData.tint);
    root.setAttribute("data-active-role", activeRole);
  }, [activeRole, roleData]);

  return (
    <RoleContext.Provider
      value={{
        activeRole,
        roleData,
        setActiveRole,
        devMood,
        setDevMood,
        stageMode,
        setStageMode,
        clockAngle,
        setClockAngle,
        activePhaseKey,
        setActivePhaseKey,
        hoverInfo,
        setHoverInfo,
        dockVisible,
        setDockVisible,
        scrollRotation,
        setScrollRotation,
        chatOpen,
        setChatOpen,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error("useRole must be used inside RoleProvider");
  }
  return ctx;
}
