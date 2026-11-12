"use client";

import React from "react";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { CORE_ROLES } from "@/data/roles";
import { HexMark } from "./HexMark";
import { TransitionLink } from "./TransitionLink";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      data-night=""
      className="relative border-t border-[#f4f1ea]/12 bg-[#0f1217] text-[#f4f1ea]"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 pt-14 pb-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <HexMark size={32} strokeWidth={2.2} />
              <div>
                <div className="text-base font-black tracking-tight uppercase">
                  {PROFILE.name}
                </div>
                <div className="font-mono text-[12px] tracking-[0.16em] text-[#f4f1ea]/75 uppercase">
                  {PROFILE.handle} · {PROFILE.city}
                </div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#f4f1ea]/70">
              {PROFILE.tagline}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {CORE_ROLES.map((role) => (
                <span
                  key={role.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#f4f1ea]/14 bg-[#f4f1ea]/[0.04] px-2.5 py-1 font-mono text-[12px] uppercase tracking-[0.12em] text-[#f4f1ea]/80"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: role.accentNight }}
                  />
                  {role.shortLabel}
                </span>
              ))}
            </div>
          </div>

          {/* Sitemap Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-[12px] tracking-[0.2em] text-[#f4f1ea]/75 uppercase">
              Navigation
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <TransitionLink
                  href="/"
                  className="text-[#f4f1ea]/80 hover:text-[var(--role-accent-night)] transition-colors"
                >
                  01 · Story Index
                </TransitionLink>
              </li>
              <li>
                <TransitionLink
                  href="/work"
                  className="text-[#f4f1ea]/80 hover:text-[var(--role-accent-night)] transition-colors"
                >
                  02 · Full Work Archive
                </TransitionLink>
              </li>
              <li>
                <TransitionLink
                  href="/contact"
                  className="text-[#f4f1ea]/80 hover:text-[var(--role-accent-night)] transition-colors"
                >
                  03 · Dispatch &amp; Contact
                </TransitionLink>
              </li>
            </ul>
          </div>

          {/* Verified Links Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-mono text-[12px] tracking-[0.2em] text-[#f4f1ea]/75 uppercase">
              Verified Channels
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-1.5 text-[#f4f1ea]/85 hover:text-[var(--role-accent-night)] transition-colors"
                >
                  <span>{PROFILE.email}</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              {PROFILE.socials.map((soc) => (
                <li key={soc.label}>
                  <a
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#f4f1ea]/80 hover:text-[var(--role-accent-night)] transition-colors"
                  >
                    <span>
                      {soc.label} ({soc.handle})
                    </span>
                    <ArrowUpRight size={13} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#f4f1ea]/10 pt-6 font-mono text-[12px] text-[#f4f1ea]/75">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              © {new Date().getFullYear()} {PROFILE.name}
            </span>
            <span>·</span>
            <span>{PROFILE.education}</span>
            <span>·</span>
            <span>{PROFILE.currentRole}</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#f4f1ea]/16 px-3.5 py-1.5 text-[#f4f1ea]/80 hover:border-[var(--role-accent-night)] hover:text-[#f4f1ea] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}

