"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Braces, Database, FlaskConical, Workflow, Pause, Play } from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { useRole } from "@/context/RoleContext";
import { ROLES } from "@/data/roles";
import { SignalVolume, stringColors } from "./SignalVolume";

const branches = [
  { label: "Client work", title: "Celebal Technologies", meta: "Current role · Dec 2025–present", icon: Workflow, color: stringColors[0],
    detail: "AI & Data Science Engineer across four client engagements, from retail diagnostics and semantic discovery to autonomous transactions and data quality.",
    projects: PROJECTS.filter(p => p.isClientEngagement), link: "/work?role=client", action: "All client engagements" },
  { label: "Open source", title: "Databricks ORDM", meta: "Industry Solutions · Retail", icon: Database, color: stringColors[1],
    detail: "I built the retail inventory model and margin use case, generated synthetic data, tested it, and developed 12 early metric views for the Open Retail Data Model.",
    projects: PROJECTS.filter(p => p.slug === "open-retail-data-model"), link: "https://github.com/databricks-industry-solutions/open-retail-data-model", action: "Source repository" },
  { label: "AI & ML", title: "Applied intelligence", meta: "Research · Machine learning", icon: FlaskConical, color: stringColors[2],
    detail: "Legal retrieval and summarization at LNMIIT’s LICAI Lab, vision-based traffic control, and predictive modeling across tabular and language data.",
    projects: PROJECTS.filter(p => ["lexnext-ai","adaptive-traffic","ml-predictive-suite"].includes(p.slug)), link: "/work?role=ml", action: "Explore machine learning" },
  { label: "Software", title: "Software systems", meta: "Backend · Developer tools", icon: Braces, color: stringColors[3],
    detail: "An asynchronous booking engine, a rules-driven application marketplace, and a local GPU workspace for generating websites.",
    projects: PROJECTS.filter(p => ["async-booking-api","uniapply","site-engineer"].includes(p.slug)), link: "/work?role=backend", action: "Explore backend work" },
] as const;
const roleIds = ["ai", "ds", "ml", "backend"] as const;

export function ChapterTwoSides() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const labels = useRef<(HTMLButtonElement | null)[]>([]);
  const [paused,setPaused] = useState(false);
  const progress = useRef(0);
  const [selected, setSelected] = useState(0);
  const {setActiveRole} = useRole();
  const turn = useCallback((value: number) => {
    progress.current = value;
    setSelected(Math.round(value));
    stage.current?.dispatchEvent(new Event("graph-turn"));
  }, []);
  function travel() {
    return (section.current?.offsetHeight ?? 0) - (stage.current?.offsetHeight ?? 0);
  }
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const distance = travel();
      if (distance > 1 && section.current) {
        turn(Math.max(0, Math.min(3, -section.current.getBoundingClientRect().top * 3 / distance)));
      }
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll",schedule,{passive:true});
    window.addEventListener("resize",schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll",schedule); window.removeEventListener("resize",schedule); };
  }, [turn]);
  function choose(index: number) {
    const distance = travel();
    if (distance > 1 && section.current) {
      window.scrollTo({top:window.scrollY+section.current.getBoundingClientRect().top+distance*index/3,behavior:"instant"});
    }
    turn(index);
  }
  const current = branches[selected], role = roleIds[selected];
  return <section id="two-sides" data-night="" className="signal-journey" ref={section} aria-labelledby="hero-title">
    <div className="signal-stage" ref={stage} style={{"--signal":current.color} as React.CSSProperties}>
      <SignalVolume stage={stage} progress={progress} labels={labels} paused={paused}/>
      <header className="signal-identity"><p className="atlas-label">AI &amp; Data Science Engineer · Jaipur</p>
        <h1 id="hero-title">Ojasvi Goyal<span>.</span></h1>
        <a href="#under-the-hood">Experience <ArrowDownRight size={14}/></a>
        <button className="orbit-toggle" type="button" onClick={()=>setPaused(!paused)} aria-label={paused ? "Resume graph rotation" : "Pause graph rotation"} title={paused ? "Resume rotation" : "Pause rotation"}>{paused ? <Play size={14}/> : <Pause size={14}/>}</button>
      </header>
      <nav className="signal-branches" aria-label="Portfolio branches">
        {branches.map(({label,icon:Icon,color},i)=><button key={label} ref={el=>{labels.current[i]=el;}}
          type="button" style={{"--node":color} as React.CSSProperties} aria-pressed={selected===i}
          aria-controls="atlas-evidence" onClick={()=>choose(i)}><Icon size={14}/>{label}</button>)}
      </nav>
      <div className="signal-foot">
        <article id="atlas-evidence" key={current.label} aria-label={current.label}>
          <p className="atlas-label">{current.meta}</p>
          <h2>{selected===0 ? <Image src="/images/celebal-wordmark.webp" width={155} height={52} alt={current.title} priority/> : current.title}</h2>
          <p className="signal-brief">{current.detail}</p>
        </article>
        <div className="signal-actions">
          <a className="signal-profile" href="#missions" onClick={()=>setActiveRole(role)}>{ROLES[role].title} profile <ArrowDownRight size={16}/></a>
          <details key={selected} className="signal-cases"><summary>Related work ({current.projects.length})</summary>
            <ul>{current.projects.map(p=><li key={p.slug}><Link href={'/work/'+p.slug} data-insight={p.summary}>{p.title}<ArrowUpRight size={14}/></Link></li>)}
              <li><Link href={current.link}>{current.action}<ArrowUpRight size={14}/></Link></li></ul>
          </details>
        </div>
      </div>
    </div>
  </section>;
}

