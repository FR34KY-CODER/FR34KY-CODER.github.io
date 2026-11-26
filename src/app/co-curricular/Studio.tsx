"use client";

import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {Mic2,Guitar,Pencil,Palette,ArrowUpRight} from "lucide-react";

const pieces=[
 {label:"Vocals",title:"Singing reel",code:"DZx4VKyzmVe",icon:Mic2,video:true},
 {label:"Guitar",title:"Guitar reel",code:"DaYc2M-Tjfk",icon:Guitar,video:true},
 {label:"Sketch",title:"Sketchbook",code:"DZQJm4Vzbvw",icon:Pencil,video:false},
 {label:"Art",title:"Artwork",code:"Db33ktWE0zG",icon:Palette,video:false},
];
export function Studio(){
 const [index,select]=useState(0);const video=useRef<HTMLVideoElement>(null);
 const item=pieces[index],poster='/images/culture/'+item.code+'.webp';
 useEffect(()=>{
   const el=video.current;if(!el)return;
   el.muted=true;
   const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){void el.play().catch(()=>{});}else el.pause();},{threshold:.55});
   observer.observe(el);return ()=>{observer.disconnect();el.pause();};
 },[index]);
 return <section id="studio" className="studio studio-viewer"><div className="studio-menu">
  <p className="culture-kicker">@fr34k_be4t</p><h2>From my<br/>studio<span>.</span></h2>
  <div className="studio-choices" aria-label="Studio pieces">{pieces.map(({label,icon:Icon},i)=><button key={label} aria-pressed={index===i} aria-controls="studio-media" onClick={()=>select(i)}><Icon size={17}/>{label}</button>)}</div>
  <div className="studio-profiles"><a href="https://www.instagram.com/fr34k_be4t/">Music & art ↗</a><a href="https://www.instagram.com/gt4_fr34k/">Video edits & life ↗</a></div></div>
  <figure id="studio-media"><div className="studio-mat" key={item.code}>{item.video?
   <video ref={video} muted playsInline controls loop preload="none" poster={poster} src={'/studio/'+item.code+'.mp4'} aria-label={item.title}/>:
   <Image src={poster} width={280} height={320} alt={item.title+' by @fr34k_be4t'}/>}</div>
   <figcaption><b>{item.title}</b><a href={'https://www.instagram.com/'+(item.video?'reel':'p')+'/'+item.code+'/'}>Instagram <ArrowUpRight size={14}/></a></figcaption></figure></section>;
}
