"use client";

import {useEffect,useRef,useState} from "react";
import Image from "next/image";
import {Pause,Play,SkipBack,SkipForward,Volume2,VolumeX,X,Music2,ListMusic} from "lucide-react";
import tracks from "@/data/playback.json";

export function playTrack(index:number,order:number[]){
  window.dispatchEvent(new CustomEvent("portfolio:play",{detail:{index,order}}));
}
export function clock(seconds:number){
  return Math.floor(seconds/60)+":"+String(Math.floor(seconds%60)).padStart(2,"0");
}
export function PortfolioPlayer(){
  const audio=useRef<HTMLAudioElement>(null),order=useRef<number[]>([]);
  const [index,select]=useState<number|null>(null),[playing,setPlaying]=useState(false);
  const [time,setTime]=useState(0),[duration,setDuration]=useState(0),[volume,setVolume]=useState(.8),[error,setError]=useState(false);
  function load(i:number){setTime(0);setDuration(0);setError(false);select(i);}
  function toggle(){
    const a=audio.current;if(!a)return;
    if(a.paused)void a.play().catch(()=>setError(true));else a.pause();
  }
  function advance(step:number){
    if(index===null || !order.current.length)return;
    const list=order.current;
    const i=list[(list.indexOf(index)+step+list.length)%list.length];
    if(i===index && audio.current){audio.current.currentTime=0;void audio.current.play().catch(()=>setError(true));}
    else load(i);
  }
  useEffect(()=>{
    function start(e:Event){
      const data=(e as CustomEvent<{index:number;order:number[]}>).detail;
      if(!tracks[data.index])return;
      order.current=data.order.includes(data.index)?data.order:[data.index];
      if(index===data.index)toggle();else load(data.index);
    }
    window.addEventListener("portfolio:play",start);return ()=>window.removeEventListener("portfolio:play",start);
  },[index]);
  useEffect(()=>{if(audio.current)audio.current.volume=volume;},[index,volume]);
  const picker=useRef<HTMLDialogElement>(null);
  const [query,setQuery]=useState("");
  const [browsing,setBrowsing]=useState(false);
  function openLibrary(){setBrowsing(true);picker.current?.showModal();}
  const matches=(browsing?tracks:[]).map((t,i)=>({t,i})).filter(({t})=>(t.title+" "+t.artist).toLowerCase().includes(query.toLowerCase()));
  const library=<dialog className="global-library" ref={picker} onClose={()=>setBrowsing(false)} aria-label="Music library">
    <header><h2>Music library</h2><button aria-label="Close music library" onClick={()=>picker.current?.close()}><X/></button></header>
    <input type="search" aria-label="Search music library" placeholder="Find a song or artist" value={query} onChange={e=>setQuery(e.target.value)}/>
    <div>{matches.map(({t,i})=><button key={t.src} className="library-track" onClick={()=>{playTrack(i,matches.map(m=>m.i));picker.current?.close();}}>
      <Image src={t.art} width={40} height={40} alt="" loading="lazy"/><span><b>{t.title}</b><small>{t.artist}</small></span><em>{t.kind==="Library"?clock(t.seconds):"Preview"}</em><Play size={15}/></button>)}
    {!matches.length && <p>No matching songs.</p>}</div></dialog>;
  if(index===null)return <>{library}<button className="global-music-launch" onClick={openLibrary}><Music2 size={16}/> Music</button></>;
  const t=tracks[index];
  return <>{library}<aside className="music-dock" aria-label="Now playing">
    <audio key={t.src} ref={audio} src={t.src} autoPlay preload="metadata"
      onLoadedMetadata={e=>{const d=e.currentTarget.duration;setDuration(Number.isFinite(d)?d:t.seconds);}}
      onTimeUpdate={e=>setTime(e.currentTarget.currentTime)} onPlay={()=>{setPlaying(true);setError(false);}}
      onPause={()=>setPlaying(false)} onEnded={()=>advance(1)} onError={()=>{setPlaying(false);setError(true);}}/>
    <Image src={t.art} width={52} height={52} alt=""/>
    <div className="dock-title"><b>{t.title}</b><small>{t.credit}</small>{error&&<a href={t.url}>Open on Apple Music ↗</a>}</div>
    <div className="transport"><button aria-label="Previous track" onClick={()=>advance(-1)}><SkipBack/></button>
    <button className="play-disc" aria-label={playing?"Pause track":"Play track"} onClick={toggle}>{playing?<Pause/>:<Play/>}</button>
    <button aria-label="Next track" onClick={()=>advance(1)}><SkipForward/></button></div>
    <label className="scrub"><span>{clock(time)}</span><input aria-label="Seek track" type="range" min="0" max={duration||1} step=".1" value={Math.min(time,duration)} onChange={e=>{if(audio.current&&duration)audio.current.currentTime=+e.target.value;}}/><span>{clock(duration)}</span></label>
    <label className="loudness">{volume?<Volume2/>:<VolumeX/>}<input aria-label="Volume" type="range" min="0" max="1" step=".02" value={volume} onChange={e=>setVolume(+e.target.value)}/></label>
    <button aria-label="Browse music library" onClick={openLibrary}><ListMusic size={17}/></button>
    <button aria-label="Close player" onClick={()=>{audio.current?.pause();select(null);}}><X size={17}/></button>
  </aside></>;
}



