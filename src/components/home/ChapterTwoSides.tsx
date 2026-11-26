"use client";

import {useState,useRef,useEffect,useCallback} from "react";
import Image from "next/image";
import Link from "next/link";
import {ArrowDownRight,ArrowUpRight,Workflow,Database,FlaskConical,Braces,Pause,Play} from "lucide-react";
import {SignalVolume,stringColors,type Thread} from "./SignalVolume";
import {useCatalog} from "@/context/Catalog";
import {PROJECTS} from "@/data/projects";
import {ROLES} from "@/data/roles";

const branches=[
 {label:"Client work",title:"Celebal Technologies",meta:"Current role · Dec 2025–present",role:"ai",icon:Workflow,detail:"AI & Data Science Engineer across four client engagements, from retail diagnostics and semantic discovery to autonomous transactions and data quality.",projects:PROJECTS.filter(p=>p.isClientEngagement)},
 {label:"Open source",title:"Databricks ORDM",meta:"Industry Solutions · Retail",role:"ds",icon:Database,detail:"I built the retail inventory model and margin use case, generated synthetic data, tested it, and developed 12 early metric views for the Open Retail Data Model.",projects:PROJECTS.filter(p=>p.slug==="open-retail-data-model")},
 {label:"AI & ML",title:"Applied intelligence",meta:"Research · Machine learning",role:"ml",icon:FlaskConical,detail:"Legal retrieval and summarization at LNMIIT’s LICAI Lab, vision-based traffic control, and predictive modeling across tabular and language data.",projects:PROJECTS.filter(p=>["lexnext-ai","adaptive-traffic","ml-predictive-suite","gyastro"].includes(p.slug))},
 {label:"Software",title:"Software systems",meta:"Backend · Developer tools",role:"backend",icon:Braces,detail:"An asynchronous booking engine, a rules-driven application marketplace, and a local GPU workspace for generating websites.",projects:PROJECTS.filter(p=>["async-booking-api","uniapply","site-engineer"].includes(p.slug))},
] as const;


export function ChapterTwoSides(){
 const {city,projects}=useCatalog();
 function projectFor({arm,fiber}:Thread){
   const extra=projects.slice(PROJECTS.length).filter(p=>arm===0?p.isClientEngagement:arm===1?Boolean(p.githubUrl):p.roles.includes(branches[arm].role));
   const group=[...branches[arm].projects,...extra];
   return group[fiber%group.length];
 }
 function nameFor(thread:Thread){return projectFor(thread).title;}
 const section=useRef<HTMLElement>(null),stage=useRef<HTMLDivElement>(null);
 const labels=useRef<(HTMLButtonElement|null)[]>([]),progress=useRef(0),active=useRef(0);
 const [selected,setSelected]=useState(0),[paused,setPaused]=useState(false),[picked,setPicked]=useState<Thread|null>(null);
 const turn=useCallback((value:number)=>{
   progress.current=value;
   const index=Math.round(value);
   if(index!==active.current){active.current=index;setSelected(index);setPicked(null);}
   stage.current?.dispatchEvent(new Event("graph-turn"));
 },[]);
 function travel(){return (section.current?.offsetHeight??0)-(stage.current?.offsetHeight??0);}
 useEffect(()=>{
   let frame=0;
   function update(){frame=0;const length=travel();if(length>1 && section.current)turn(Math.min(3,Math.max(0,-section.current.getBoundingClientRect().top*3/length)));}
   function schedule(){if(!frame)frame=requestAnimationFrame(update);}
   update();window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);
   return ()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);};
 },[turn]);
 function choose(index:number){
   const distance=travel();
   if(distance>1 && section.current)window.scrollTo({top:window.scrollY+section.current.getBoundingClientRect().top+distance*index/3,behavior:"instant"});
   turn(index);setPicked(null);
 }
 function pick(t:Thread){choose(t.arm);setPicked(t);}
 const current=branches[selected],role=ROLES[current.role],project=picked?projectFor(picked):null;
 return <section id="two-sides" data-night="" className="signal-journey" ref={section} aria-labelledby="hero-title">
 <div className="signal-stage" ref={stage} style={{"--signal":stringColors[selected]} as React.CSSProperties}>
 <SignalVolume stage={stage} progress={progress} labels={labels} paused={paused} picked={picked} nameFor={nameFor} onPick={pick}/>
 <header className="signal-identity"><p className="atlas-label">AI &amp; Data Science Engineer · {city}</p><h1 id="hero-title">Ojasvi Goyal<span>.</span></h1>
 <a href="#under-the-hood">Experience <ArrowDownRight size={14}/></a><button className="orbit-toggle" onClick={()=>setPaused(!paused)} aria-label={paused?"Resume graph rotation":"Pause graph rotation"}>{paused?<Play size={14}/>:<Pause size={14}/>}</button></header>
 <nav className="signal-branches" aria-label="Portfolio branches">{branches.map(({label,icon:Icon},i)=><button key={label} ref={el=>{labels.current[i]=el;}} style={{"--node":stringColors[i]} as React.CSSProperties} aria-pressed={selected===i} aria-controls="atlas-evidence" onClick={()=>choose(i)}><Icon size={14}/>{label}</button>)}</nav>
 {project && <aside className="wire-popup" aria-label="Selected project"><button aria-label="Close project insight" onClick={()=>setPicked(null)}>×</button><strong>{project.title}</strong><span>{project.headlineMetric.value}</span><Link href={'/work/'+project.slug}>Case study ↗</Link></aside>}
 <div className="signal-foot"><Image className="graph-avatar" src={'/images/avatars/avatar-'+current.role+'.webp'} width={100} height={105} alt={role.title+" avatar"}/>
 <article id="atlas-evidence" aria-label={current.label}><p className="atlas-label">{role.title} · {project?project.headlineMetric.value:current.meta}</p>
 <h2>{project?project.title:selected===0?<Image src="/images/celebal-wordmark.webp" width={155} height={52} alt={current.title} priority/>:current.title}</h2><p className="signal-brief">{project?project.summary:current.detail}</p></article>
 <div className="signal-actions"><Link className="signal-profile" href={project?'/work/'+project.slug:'/work?role='+current.role}>{project?'Read case study':'Explore '+role.shortLabel+' work'} <ArrowUpRight size={15}/></Link>
 <details key={selected} className="signal-cases"><summary>Project strings ({current.projects.length})</summary><ul>{current.projects.map((p,fiber)=><li key={p.slug}><button onClick={e=>{e.currentTarget.closest("details")?.removeAttribute("open");pick({arm:selected,fiber});}}>{p.title}</button></li>)}</ul></details></div></div>
 </div></section>;
}
