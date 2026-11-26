"use client";
import {useEffect,useState,type CSSProperties} from "react";

function Spool({cx}:{cx:number}){
 return <g className="spool" style={{transformOrigin:cx+'px 170px'}}>
  <mask id={'holes-'+cx}><circle cx={cx} cy="170" r="141" fill="white"/>
   {[0,72,144,216,288].map(a=><ellipse key={a} cx={cx} cy="87" rx="34" ry="40" transform={`rotate(${a} ${cx} 170)`}/>)}
   <circle cx={cx} cy="170" r="11"/></mask>
  <circle cx={cx} cy="170" r="141" fill="#53545c" mask={'url(#holes-'+cx+')'}/>
 </g>;
}
export function ReelOverlay(){
 return <div className="cinema-wipe" aria-hidden="true"><svg viewBox="0 0 840 330"><path d="M60 188 Q85 330 225 310 L618 310 Q759 320 780 188" stroke="#55545a" strokeWidth="5" fill="none"/><Spool cx={200}/><Spool cx={640}/></svg></div>;
}
type Cut="reels"|"vinyl"|"blast";
const duration:Record<Cut,number>={reels:2300,vinyl:2600,blast:4200};
export function SceneChange(){
 const [cut,setCut]=useState<Cut|null>(null);
 useEffect(()=>{
   const targets=[["studio","reels"],["listening","vinyl"],["anime","blast"]] as const;
   const media=matchMedia("(prefers-reduced-motion: reduce)");
   const previous=new Map<string,number>();
   let frame=0,timer=0,reveal=0;
   function check(){
     frame=0;
     for(const [id,kind] of targets){
       const el=document.getElementById(id);if(!el)continue;
       const top=el.getBoundingClientRect().top, before=previous.get(id);
       const threshold=innerHeight*(kind==="reels"?.70:.40);
       if(!media.matches && before!==undefined && before>threshold && top<=threshold && top>=-innerHeight*.1){
         setCut(kind);clearTimeout(timer);clearTimeout(reveal);
         reveal=window.setTimeout(()=>{
           const y=el.getBoundingClientRect().top;
           if(y>0 && y<=threshold+2)window.scrollBy({top:y,behavior:"instant"});
         },duration[kind]*.78);
         timer=window.setTimeout(()=>setCut(null),duration[kind]);
       }
       previous.set(id,top);
     }
   }
   function schedule(){if(!frame)frame=requestAnimationFrame(check);}
   check();window.addEventListener("scroll",schedule,{passive:true});
   return ()=>{window.removeEventListener("scroll",schedule);cancelAnimationFrame(frame);clearTimeout(timer);clearTimeout(reveal);};
 },[]);
 if(!cut)return null;
 return <div className={'chapter-cut cut-'+cut} style={{'--cut-time':duration[cut]+'ms'} as CSSProperties} aria-hidden="true">
   {cut==="reels"?<ReelOverlay/>:cut==="vinyl"?<div className="record"><div className="record-label"><span>Side A</span><b>OG</b><i/></div></div>:
    <><div className="blast-actor"><i className="charge-light"/><i className="blast-beam"/></div><div className="blast-exposure"/></>}
 </div>;
}

