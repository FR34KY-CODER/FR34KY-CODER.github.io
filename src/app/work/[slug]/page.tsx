import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { PROFILE } from "@/data/profile";
import { CaseStudyView } from "@/components/work/CaseStudyView";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) {
    return { title: `Not Found — ${PROFILE.name}` };
  }
  return {
    title: `${project.title} · Case Study — ${PROFILE.name}`,
    description: project.summary,
  };
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx === -1) {
    notFound();
  }

  const project = PROJECTS[idx];
  const nextProject = PROJECTS[(idx + 1) % PROJECTS.length];

  return <CaseStudyView project={project} nextProject={nextProject} />;
}

