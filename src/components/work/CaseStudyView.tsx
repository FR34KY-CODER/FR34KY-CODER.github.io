"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { ProjectCaseStudy } from "@/data/projects";
import { ROLES } from "@/data/roles";
import { TransitionLink } from "@/components/chrome/TransitionLink";

interface CaseStudyViewProps {
  project: ProjectCaseStudy;
  nextProject: ProjectCaseStudy;
}

export function CaseStudyView({ project, nextProject }: CaseStudyViewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const metricFloatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (metricFloatRef.current) {
        gsap.to(metricFloatRef.current, {
          y: -14,
          scrollTrigger: {
            trigger: metricFloatRef.current,
            start: "top 85%",
            end: "bottom 20%",
            scrub: 0.6,
          },
        });
      }

      const statCards = rootRef.current?.querySelectorAll(".case-stat-cell");
      if (statCards && statCards.length > 0) {
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
          }
        );
      }

      const items = rootRef.current?.querySelectorAll(".checklist-row");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".checklist-container",
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [project.slug]);

  return (
    <div ref={rootRef} className="min-h-screen bg-[#f4f1ea] text-[#0f1217]">
      {/* SPLIT HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#0f1217]/12">
        {/* Left Editorial Title */}
        <div
          data-paper=""
          className="lg:col-span-7 bg-[#f4f1ea] px-6 sm:px-12 pt-28 pb-14 space-y-6"
        >
          <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em]">
            <TransitionLink
              href="/work"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#0f1217]/20 px-3 py-1 hover:bg-[#0f1217] hover:text-[#f4f1ea] transition"
            >
              <ArrowLeft size={12} />
              <span>All Work</span>
            </TransitionLink>
            <span className="text-[#0f1217]/75">
              {project.number} · {project.year} ·{" "}
              {project.isClientEngagement
                ? project.clientBadge || "Client Engagement"
                : project.category}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl font-black leading-[0.88] tracking-[-0.04em] uppercase">
              {project.title}
            </h1>
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.14em] text-[#0f1217]/75">
              {project.subtitle}
            </p>
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-[#0f1217]/82">
            {project.summary}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {project.roles.map((r) => (
              <span
                key={r}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#0f1217]/16 bg-white/80 px-3.5 py-1 font-mono text-[12px] font-semibold uppercase"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: ROLES[r].accentPaper }}
                />
                <span>{ROLES[r].title}</span>
              </span>
            ))}
          </div>

          {/* Conditional External Repo Action ONLY for Open Source */}
          {!project.isClientEngagement && project.githubUrl && (
            <div className="pt-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f1217] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#f4f1ea] hover:bg-[#ea1d0f] transition-colors"
              >
                <span>Inspect Repository on GitHub</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          )}
        </div>

        {/* Right Night Summary Card & NDA Notice */}
        <div
          data-night=""
          className="lg:col-span-5 flex flex-col justify-between bg-[#0f1217] px-6 sm:px-10 pt-28 pb-14 text-[#f4f1ea]"
        >
          {project.isClientEngagement ? (
            <div className="rounded-2xl border border-amber-400/35 bg-amber-400/10 p-5 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[12px] font-bold tracking-[0.18em] uppercase text-amber-300">
                <Lock size={14} />
                <span>Client Engagement · Confidentiality Shield</span>
              </div>
              <p className="text-xs leading-relaxed text-[#f4f1ea]/80">
                Per enterprise client agreements, internal system
                architectures, proprietary schemas, codebases, and exact vendor
                stacks are excluded. Only high-level solution framing and
                verified operational outcomes are shared below.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#f4f1ea]/14 bg-[#141923] p-5 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[12px] font-bold tracking-[0.18em] uppercase text-emerald-400">
                <ShieldCheck size={14} />
                <span>Public Open-Source Case File</span>
              </div>
              <p className="text-xs leading-relaxed text-[#f4f1ea]/75">
                Designed, built, and published openly under FR34KY-CODER. Full
                capability breakdown and technical components are documented on
                this page.
              </p>
            </div>
          )}

          {/* 4-Cell Stat Grid (.case-stats) */}
          <div className="case-stats mt-8 grid grid-cols-2 gap-3.5">
            {project.stats.map((st) => (
              <div
                key={st.label}
                className="case-stat-cell rounded-2xl border border-[#f4f1ea]/14 bg-[#151a24] p-4"
              >
                <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-[#f4f1ea]/75">
                  {st.label}
                </div>
                <div className="mt-1.5 text-lg font-black tracking-tight text-[#f4f1ea]">
                  {st.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BODY HIGHLIGHTS & IDEA / EXECUTION CHECKLISTS */}
      <section data-paper="" className="mx-auto max-w-[1440px] px-6 sm:px-10 py-16 space-y-16">
        {/* Headline Metric + Preview Outcomes Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div
            ref={metricFloatRef}
            className="lg:col-span-5 rounded-3xl bg-[#0f1217] p-8 text-[#f4f1ea] shadow-xl"
            data-night=""
          >
            <div className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#f4f1ea]/75">
              Headline Verified Outcome
            </div>
            <div
              className="mt-2 text-3xl sm:text-5xl font-black tracking-tight uppercase"
              style={{ color: "var(--role-accent-night)" }}
            >
              {project.headlineMetric.value}
            </div>
            <p className="mt-3 font-mono text-xs text-[#f4f1ea]/70">
              {project.headlineMetric.label}
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.previewHighlights.map((item, idx) => (
              <div
                key={item}
                className="rounded-2xl border border-[#0f1217]/14 bg-white p-5 shadow-xs space-y-2"
              >
                <div className="font-mono text-[12px] tracking-[0.16em] uppercase text-[#0f1217]/75">
                  Signal 0{idx + 1}
                </div>
                <p className="text-sm font-bold leading-snug text-[#0f1217]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Structured Framing Groups */}
        <div className="checklist-container grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.groups.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-[#0f1217]/14 bg-white p-7 sm:p-8 shadow-xs space-y-5"
            >
              <div className="border-b border-[#0f1217]/10 pb-3 font-mono text-xs font-bold tracking-[0.18em] uppercase text-[#0f1217]">
                {group.title}
              </div>
              <ul className="space-y-3.5">
                {group.items.map((text, idx) => (
                  <li
                    key={idx}
                    className="checklist-row flex items-start gap-3 text-sm leading-relaxed text-[#0f1217]/82"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0f1217] text-[#f4f1ea]">
                      <Check size={11} />
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Capability Pills — NEVER expose tools/stacks on client engagements */}
        <div className="rounded-3xl border border-[#0f1217]/15 bg-[#ece7dc] p-7 sm:p-8">
          <div className="font-mono text-[12px] font-bold tracking-[0.18em] uppercase text-[#0f1217]/75">
            {project.isClientEngagement
              ? "Verified Domain Competencies (Stack Omitted Per NDA)"
              : "Engineering Stack & Core Modules"}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-[#0f1217]/18 bg-white px-4 py-1.5 font-mono text-xs font-semibold text-[#0f1217]"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* NEXT CASE STUDY + CONTACT PROMPT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <TransitionLink
            href={`/work/${nextProject.slug}`}
            data-card=""
            data-cursor-label="NEXT"
            className="group flex items-center justify-between rounded-3xl border border-[#0f1217]/16 bg-white p-7 hover:border-[#0f1217] transition"
          >
            <div>
              <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-[#0f1217]/75">
                Next Build · {nextProject.number}
              </div>
              <div className="mt-1 text-2xl font-black tracking-tight uppercase group-hover:underline">
                {nextProject.title}
              </div>
              <div className="mt-1 font-mono text-xs text-[#0f1217]/75">
                {nextProject.subtitle}
              </div>
            </div>
            <ArrowRight
              size={20}
              className="shrink-0 transition-transform group-hover:translate-x-1"
            />
          </TransitionLink>

          <TransitionLink
            href="/contact"
            data-night=""
            className="group flex items-center justify-between rounded-3xl bg-[#0f1217] p-7 text-[#f4f1ea]"
          >
            <div>
              <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-[#f4f1ea]/75">
                Interested In Similar Impact?
              </div>
              <div className="mt-1 text-2xl font-black tracking-tight uppercase">
                Start A Conversation
              </div>
              <div className="mt-1 font-mono text-xs text-[#f4f1ea]/70">
                Dispatches formatted HTML mail directly to Ojasvi
              </div>
            </div>
            <ArrowUpRight
              size={22}
              className="shrink-0"
              style={{ color: "var(--role-accent-night)" }}
            />
          </TransitionLink>
        </div>
      </section>
    </div>
  );
}

