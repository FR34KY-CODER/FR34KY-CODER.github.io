"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Cog, Code2 } from "lucide-react";
import { FACTORY_CRATES } from "@/data/factory";
import { ROLES } from "@/data/roles";
import { useRole } from "@/context/RoleContext";
import { useHorizontalScene } from "@/hooks/useHorizontalScene";

export function ChapterFactory() {
  const { activeRole, setDevMood, setStageMode, setHoverInfo, setDockVisible } = useRole();
  const { sectionRef, viewportRef, trackRef, advance } = useHorizontalScene({
    onActiveChange: (active) => {
      if (active) {
        setStageMode("factory");
        setDockVisible(true);
        setDevMood("graduation");
      }
    },
  });
  const [processed, setProcessed] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!viewport || !track || !section) return;
    const media = window.matchMedia("(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)");
    let previous = 0;
    const update = () => {
      const items = Array.from(track.querySelectorAll<HTMLElement>(".factory-crate"));
      let count = 0;
      items.forEach(item => {
        const done = !media.matches || item.offsetLeft + item.offsetWidth / 2 - viewport.scrollLeft <= viewport.clientWidth / 2;
        item.dataset.processed = String(done);
        if (done) count++;
      });
      if (count !== previous) {
        if (media.matches && count > previous) {
          section.querySelector(".factory-press-head")?.animate([{transform: "translateY(0)"}, {transform: "translateY(22px)", offset: 0.4}, {transform: "translateY(0)"}], {duration: 350, easing: "ease-out"});
        }
        previous = count;
        setProcessed(count);
      }
    };
    update();
    viewport.addEventListener("scroll", update, {passive: true});
    window.addEventListener("resize", update);
    media.addEventListener("change", update);
    return () => {
      viewport.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      media.removeEventListener("change", update);
    };
  }, [sectionRef, viewportRef, trackRef]);

  return (
    <section id="the-factory" ref={sectionRef} data-night="" className="motion-scene factory-scene" aria-labelledby="factory-title">
      <div className="factory-windows" aria-hidden="true">{Array.from({length: 6}, (_, i) => <div key={i}>{Array.from({length: 15}, (_, j) => <i key={j} className={(i + j) % 7 === 0 ? "lit" : ""} />)}</div>)}</div>
      <div className="scene-heading">
        <p className="scene-eyebrow">03 / The factory</p>
        <h2 id="factory-title">Under the hood.<br /><em>On the production line.</em></h2>
        <p>AI, backend, data science and ML. Explore the modules behind the work.</p>
        <div className="scene-controls">
          <button onClick={() => advance(-1)} aria-label="Previous modules"><ArrowLeft size={18} /></button><span>Scroll to run the belt</span><button onClick={() => advance(1)} aria-label="Next modules"><ArrowRight size={18} /></button>
        </div>
      </div>
      <div className="factory-gantry" aria-hidden="true"><div className="factory-press"><div className="factory-press-head"><i /><i /><i /><div className="factory-piston" /><div className="factory-press-plate" /></div></div></div>
      <div className="factory-motor" aria-hidden="true"><Cog /><Cog /></div>
      <div ref={viewportRef} className="scene-viewport factory-viewport" tabIndex={0} aria-label="Skills and modules conveyor belt">
        <div ref={trackRef} className="scene-track factory-track">
          {FACTORY_CRATES.map(crate => (
            <a
              key={crate.slug}
              href={crate.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="factory-crate"
              data-scene-item=""
              data-processed="false"
              data-matching={activeRole === crate.role}
              data-cursor-label="REPO"
              style={{"--crate-accent": ROLES[crate.role].accentNight} as React.CSSProperties}
              onMouseEnter={() =>
                setHoverInfo({
                  badge: `GRAD GUIDE · ${crate.roleLabel} ${crate.kind.toUpperCase()}`,
                  title: crate.name,
                  detail: crate.summary,
                  accent: ROLES[crate.role].accentNight,
                })
              }
              onMouseLeave={() => setHoverInfo(null)}
            >
              <div className="crate-spark" />
              <div className="crate-blueprint" aria-hidden="true"><Code2 size={52} /><span>{crate.tag}</span></div>
              <div className="crate-package">
                <div className="crate-tape" />
                <div className="crate-content"><p className="crate-role">{crate.roleLabel} / {crate.kind}</p><h3>{crate.name}</h3><p>{crate.summary}</p></div>
                <div className="crate-footer"><span>GitHub</span><ArrowUpRight size={18} /></div>
                <span className="crate-stamp">Built</span>
              </div>
              <span className="sr-only">{crate.name}. {crate.summary}. View on GitHub.</span>
            </a>
          ))}
        </div>
      </div>
      <div className="factory-belt" aria-hidden="true">{Array.from({length: 30}, (_, i) => <i key={i} />)}</div>
      <div className="factory-status"><span>{String(processed).padStart(2, "0")} / {FACTORY_CRATES.length} assembled</span><span>Explore a module ↗</span></div>
    </section>
  );
}
