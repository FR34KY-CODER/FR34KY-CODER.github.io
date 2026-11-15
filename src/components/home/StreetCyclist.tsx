"use client";

import React from "react";
import { ScrollDrivenCyclist } from "./ScrollDrivenCyclist";

interface StreetCyclistProps {
  className?: string;
}

/**
 * 2D Anime Developer Cyclist
 * Pure anime sprite animation driven by scroll.
 */
export function StreetCyclist({ className = "" }: StreetCyclistProps) {
  return <ScrollDrivenCyclist className={className} />;
}
