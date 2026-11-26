"use client";

import {useState} from "react";
import Image from "next/image";
import {Play,Music2} from "lucide-react";
import artists from "@/data/listening.json";
import tracks from "@/data/playback.json";
import {clock,playTrack} from "@/components/chrome/PortfolioPlayer";

const groups={
  Bollywood:["Sonu Nigam","Shreya Ghoshal","Mohit Chauhan","Vishal Mishra"],
  "Indian indie":["The Local Train","Dream Note"],
  English:["LINKIN PARK","NEFFEX","Eminem","Bruno Mars","Ed Sheeran"],
};
export function ListeningRoom(){
  const [genre,setGenre]=useState<keyof typeof groups>("Bollywood"),[artist,setArtist]=useState(""),[limit,setLimit]=useState(6);
  const names=groups[genre], members=artists.filter(a=>names.includes(a.name));
  const [format,setFormat]=useState<"All"|"Library"|"Preview">("All");
  const [query,setQuery]=useState("");
  const collection=tracks.map((t,i)=>({...t,index:i})).filter(t=>artist?t.artist===artist:names.includes(t.artist));
  const songs=collection.filter(t=>(format==="All"||t.kind===format) && [t.title,t.credit,t.album].join(" ").toLowerCase().includes(query.trim().toLowerCase()));
  const order=songs.map(s=>s.index);
  function changeArtist(name:string){setArtist(name);setLimit(6);setFormat("All");setQuery("");}
  return <section id="listening" className="listening">
    <header className="music-mast"><div className="album-stack" aria-hidden="true">{[collection[2],collection[1],collection[0]].filter(Boolean).map(s=><Image key={s.index} src={s.art} width={210} height={210} alt=""/>)}</div>
      <div><p className="culture-kicker"><Music2 size={14}/> Apple Music · Lossless listener</p><h2>Listening room</h2>
      <p>{tracks.filter(t=>t.kind==="Library").length} library tracks · {tracks.filter(t=>t.kind==="Preview").length} catalog previews</p>
      <button className="room-play" disabled={!order.length} onClick={()=>playTrack(order[0],order)}><Play size={15} fill="currentColor"/> Play {artist||genre}</button></div></header>
    <div className="shelf-controls" aria-label="Music genres">{(Object.keys(groups) as (keyof typeof groups)[]).map(g=><button key={g} aria-pressed={g===genre} onClick={()=>{setGenre(g);changeArtist("");}}>{g}</button>)}</div>
    <div className="music-library"><div className="artist-shelf"><h3>Artists</h3><div className="artist-grid">{members.map(a=><article key={a.name} className="artist">
      <button aria-pressed={artist===a.name} onClick={()=>changeArtist(artist===a.name?"":a.name)}><Image src={a.art} width={160} height={160} alt=""/><b>{a.name}</b></button>
      <div className="artist-tracks"><a href={a.source}>Top songs ↗</a><ol>{a.tracks.map(t=><li key={t.url}><a href={t.url}>{t.title}</a></li>)}</ol></div></article>)}</div></div>
      <div className="track-shelf"><header><h3>{artist||genre}</h3><small>{songs.length} tracks</small>{artist&&<button onClick={()=>changeArtist("")}>All {genre} ↗</button>}</header>
      <div className="track-tools"><input type="search" aria-label="Search this collection" placeholder="Find a song or album" value={query} onChange={e=>{setQuery(e.target.value);setLimit(6);}}/>
      <div>{(["All","Library","Preview"] as const).map(f=><button key={f} aria-pressed={f===format} onClick={()=>{setFormat(f);setLimit(6);}}>{f==="Library"?"Full tracks":f==="Preview"?"Previews":"All"}</button>)}</div></div>
      {!songs.length&&<p className="empty-library">No matching tracks in this collection.</p>}
      {songs.slice(0,limit).map(t=><button className="library-track" key={t.index} onClick={()=>playTrack(t.index,order)}>
        <Image src={t.art} width={48} height={48} alt=""/><span><b>{t.title}</b><small>{t.credit} · {t.album}</small></span><em>{t.year}<small>{t.kind==="Preview"?"Preview":clock(t.seconds)}</small></em><Play size={16}/></button>)}
      {songs.length>6&&<button className="more-tracks" onClick={()=>setLimit(limit===6?songs.length:6)}>{limit===6?'Show all '+songs.length+' tracks':'Show fewer tracks'}</button>}</div>
    </div></section>;
}


