"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export const interests = ["Screen favorites", "On repeat", "Studio & games"] as const;
const screen = [
  ["The Flash","the-flash"],["Supernatural","supernatural"],["The Boys","the-boys"],
  ["Saw series","saw"],["Everything Everywhere All at Once","everything-everywhere"],
  ["The Amazing Spider-Man 2","amazing-spider-man-2"],["The Dark Knight","dark-knight"],
];
const music = [
  ["Bollywood","Sonu Nigam · Shreya Ghoshal · Mohit Chauhan · Vishal Mishra"],
  ["Indian indie","The Local Train · Notebook"],
  ["English","LINKIN PARK · NEFFEX · Eminem · Bruno Mars · Ed Sheeran"],
];

export function CreativeShelf({tab,select,close}:{tab:number;select:(tab:number)=>void;close:()=>void}) {
  const dialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{const el=dialog.current!; el.showModal(); return ()=>el.close();},[]);
  return <dialog className="creative-shelf" ref={dialog} aria-labelledby="shelf-title" onCancel={close}>
    <header><div><p className="atlas-label">Outside engineering</p><h2 id="shelf-title">After hours</h2></div>
      <button onClick={close} aria-label="Close interests"><X size={20}/></button></header>
    <nav aria-label="Interests">{interests.map((s,i)=><button key={s} aria-pressed={tab===i} onClick={()=>select(i)}>{s}</button>)}</nav>
    {tab===0 ? <div className="screen-shelf">{screen.map(([title,id])=><figure key={id}><Image src={'/images/screen/'+id+'.webp'} width={210} height={310} alt={title+' poster'}/><figcaption>{title}</figcaption></figure>)}</div>
    : tab===1 ? <dl>{music.map(([genre,artists])=><div key={genre}><dt>{genre}</dt><dd>{artists}</dd></div>)}</dl>
    : <dl><div><dt>Art</dt><dd>Drawing, painting and sketching.</dd></div><div><dt>Music</dt><dd>I play guitar and sing.</dd></div><div><dt>Games</dt><dd>When I put the guitar down, I like to game.</dd></div></dl>}
  </dialog>;
}
