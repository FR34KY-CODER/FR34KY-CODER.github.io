import React from "react";
import { ChapterRail } from "@/components/home/ChapterRail";
import { ChapterTwoSides } from "@/components/home/ChapterTwoSides";
import { ChapterStreet } from "@/components/home/ChapterStreet";
import { ChapterFactory } from "@/components/home/ChapterFactory";
import { ChapterUnderHood } from "@/components/home/ChapterUnderHood";
import { ChapterMissions } from "@/components/home/ChapterMissions";
import { ChapterFinale } from "@/components/home/ChapterFinale";

export default function HomePage() {
  return (
    <div className="relative">
      <ChapterRail />
      <ChapterTwoSides />
      <ChapterStreet />
      <ChapterFactory />
      <ChapterUnderHood />
      <ChapterMissions />
      <ChapterFinale />
    </div>
  );
}

