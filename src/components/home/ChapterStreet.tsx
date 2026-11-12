"use client";

import React from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { ROLES } from "@/data/roles";
import { useRole } from "@/context/RoleContext";
import { TransitionLink } from "@/components/chrome/TransitionLink";
import { useHorizontalScene } from "@/hooks/useHorizontalScene";

export function ChapterStreet() {
  const { activeRole, setDevMood, setStageMode, setHoverInfo, setScrollRotation, setDockVisible } = useRole();
  const { sectionRef, viewportRef, trackRef, advance } = useHorizontalScene({
    onTravel: (_travel, rotation) => {
      setScrollRotation(rotation * 2.1);
    },
    onActiveChange: (active) => {
      if (active) {
        setStageMode("street");
        setDockVisible(true);
        setDevMood("bicycle");
      }
    },
  });
  return (
    <section id="the-street" ref={sectionRef} data-paper="" className="motion-scene street-scene" aria-labelledby="street-title">
      <div className="street-sky" aria-hidden="true"><span className="street-sun" /><span className="street-cloud" /><div className="street-skyline">{Array.from({length: 16}, (_, i) => <i key={i} style={{height: 70 + i % 5 * 28}} />)}</div></div>
      <div className="scene-heading">
        <p className="scene-eyebrow">02 / The street</p>
        <h2 id="street-title">Ideas become<br /><em>working systems.</em></h2>
        <p>Explore the projects. Step inside to see how they work.</p>
        <div className="scene-controls">
          <button onClick={() => advance(-1)} aria-label="Previous projects"><ArrowLeft size={18} /></button>
          <span>Scroll to explore</span>
          <button onClick={() => advance(1)} aria-label="Next projects"><ArrowRight size={18} /></button>
        </div>
      </div>
      <div ref={viewportRef} className="scene-viewport street-viewport" tabIndex={0} aria-label="Project storefronts">
        <div ref={trackRef} className="scene-track street-track">
          {PROJECTS.map((project, idx) => (
            <div key={project.slug} className="storefront-lot">
              <TransitionLink
                href={`/work/${project.slug}`}
                data-scene-item=""
                data-shop=""
                data-cursor-label="VIEW"
                className={`storefront storefront--${project.shopTone}`}
                data-matching={activeRole !== "all" && project.roles.includes(activeRole)}
                onMouseEnter={() =>
                  setHoverInfo({
                    badge: project.isClientEngagement
                      ? "CLIENT ENGAGEMENT · IDEA & IMPACT"
                      : `${project.category.toUpperCase()}`,
                    title: project.title,
                    detail: `${project.headlineMetric.value} — ${project.summary}`,
                  })
                }
                onMouseLeave={() => setHoverInfo(null)}
              >
                <div className="storefront-upper" aria-hidden="true"><i /><i /><i /></div>
                <div className="storefront-sign"><span>{project.number}</span><h3>{project.title}</h3><ArrowUpRight size={20} /></div>
                <div className="storefront-awning" aria-hidden="true" />
                <div className="storefront-ground">
                  <div className="storefront-window">
                    <p className="storefront-category">{project.subtitle}</p>
                    <strong>{project.headlineMetric.value}</strong>
                    <p>{project.headlineMetric.label}</p>
                    <div className="storefront-tags">{project.roles.map(role => <span key={role}>{ROLES[role].shortLabel}</span>)}</div>
                  </div>
                  <div className="storefront-door" aria-hidden="true"><i /><b />
              {idx === 0 && (
                <svg className="shop-cat" viewBox="0 0 18 22" aria-hidden="true">
                  <ellipse className="shop-cat__body" cx="9" cy="16" rx="6" ry="6" />
                  <ellipse className="shop-cat__body" cx="9" cy="9" rx="4.5" ry="5" />
                  <polygon className="shop-cat__body" points="5,5 7,0 9,4" />
                  <polygon className="shop-cat__body" points="13,5 11,0 9,4" />
                  <circle className="shop-cat__eyes" cx="7.5" cy="8.5" r="1" />
                  <circle className="shop-cat__eyes" cx="10.5" cy="8.5" r="1" />
                  <ellipse className="shop-cat__body" cx="9" cy="22" rx="1.5" ry="3" />
                </svg>
              )}
                  </div>
                </div>
                <div className="storefront-plinth">{project.isClientEngagement ? "Client work" : "Open source"}<span>{project.year}</span></div>
              </TransitionLink>
              <div className="street-lamp" aria-hidden="true"><i /></div>
            </div>
          ))}
          <TransitionLink href="/work" className="street-more" data-scene-item="">All projects<ArrowUpRight size={36} /></TransitionLink>
        </div>
      </div>
      <div className="street-road" aria-hidden="true" />
    </section>
  );
}
