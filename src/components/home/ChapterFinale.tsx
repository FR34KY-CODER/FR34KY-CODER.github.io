"use client";

import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/chrome/TransitionLink";
import { useRole } from "@/context/RoleContext";
import { PROFILE } from "@/data/profile";

export function ChapterFinale() {
  const { activeRole } = useRole();
  return <section id="both-sides" data-night="" className="bg-[#191916] px-[7vw] py-24 text-[#f4f1ea]">
    <p className="studio-kicker">Contact</p>
    <h2 className="my-6 text-6xl font-bold leading-none tracking-[-.07em] sm:text-8xl">Get in touch.</h2>
    <div className="flex flex-wrap items-center gap-6">
      <TransitionLink href={activeRole === "all" ? "/contact" : `/contact?role=${activeRole}`} className="rounded-full bg-[#f4f1ea] px-6 py-3 font-semibold text-[#191916]">Start a conversation</TransitionLink>
      <a href={`mailto:${PROFILE.email}`} className="studio-text-link">{PROFILE.email}<ArrowUpRight size={16} /></a>
    </div>
  </section>;
}
