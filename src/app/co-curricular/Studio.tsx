"use client";

import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {Heart,MessageCircle,Send,Bookmark,Volume2,VolumeX,Play,Pause} from "lucide-react";
const pieces=[
 {label:"Vocals",title:"Singing reel",code:"DZx4VKyzmVe",video:true},
 {label:"Guitar",title:"Guitar reel",code:"DaYc2M-Tjfk",video:true},
 {label:"Sketch",title:"Sketchbook",code:"DZQJm4Vzbvw",video:false},
 {label:"Art",title:"Artwork",code:"Db33ktWE0zG",video:false},
 {label:"Travel reel",title:"Travel reel",code:"DW93i9UEtQ7",video:false,travel:true,reel:true},
 {label:"Travel",title:"Travel journal",code:"DWreUUxGMxw",video:false,travel:true},
 {label:"Travel",title:"On the road",code:"C-Awe41TqEG",video:false,travel:true},
 {label:"Travel",title:"Travel journal",code:"DeWs5cwmCk1",video:false,travel:true},
 {label:"Travel",title:"From the archive",code:"CvCz5hIPnQ",video:false,travel:true,embed:true},
];
type Piece=typeof pieces[number];
function Post({item,active}:{item:Piece;active:boolean}){
 const video=useRef<HTMLVideoElement>(null);
 const [embedOpen,openEmbed]=useState(false);
 useEffect(()=>{if(!active)openEmbed(false);},[active]);
 const [muted,mute]=useState(true),[playing,setPlaying]=useState(false);
 const [liked,like]=useState(false),[saved,save]=useState(false),[notice,setNotice]=useState("");
 const account=item.travel?'gt4_fr34k':'fr34k_be4t';
 const url='https://www.instagram.com/'+account+'/'+(item.video||item.reel?'reel':'p')+'/'+item.code+'/';
 useEffect(()=>{try{like(localStorage.getItem("like:"+item.code)==="1");save(localStorage.getItem("save:"+item.code)==="1");}catch{}},[item.code]);
 function mark(kind:"like"|"save"){
   const next=kind==="like"?!liked:!saved;
   (kind==="like"?like:save)(next);try{localStorage.setItem(kind+":"+item.code,next?"1":"0");}catch{}
 }
 useEffect(()=>{const el=video.current;if(!el)return;
   if(active){mute(true);el.muted=true;void el.play().catch(()=>{});}else el.pause();
   return ()=>el.pause();
 },[active]);
 async function share(){try{if(navigator.share)await navigator.share({url,title:item.title});else{await navigator.clipboard.writeText(url);setNotice("Link copied");}}catch{setNotice("Use the Instagram link below to share.");}}
 return <article className="feed-post" aria-label={item.label}>
 {item.video?<video ref={video} muted={muted} playsInline loop preload="none" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} poster={'/images/culture/'+item.code+'.webp'} src={'/studio/'+item.code+'.mp4'}/>:
 (item.embed||embedOpen)?<iframe title={item.title} loading="lazy" src={'https://www.instagram.com/'+(item.reel?'reel':'p')+'/'+item.code+'/embed/'}/>:<Image src={'/images/culture/'+item.code+'.webp'} width={360} height={500} alt={item.title+' by @'+account}/>}
 <div className="feed-top"><span>{item.video||item.reel?"Reels":"Post"}</span>{item.video&&<button aria-label={muted?"Unmute reel":"Mute reel"} onClick={()=>mute(!muted)}>{muted?<VolumeX/>:<Volume2/>}</button>}</div>
 {item.reel&&!embedOpen&&<button className="travel-play" onClick={()=>openEmbed(true)} aria-label="Watch travel reel"><Play size={24}/></button>}
 <div className="feed-actions">
 {item.video&&<button aria-label={playing?"Pause reel":"Play reel"} onClick={()=>{if(video.current?.paused)void video.current.play().catch(()=>{});else video.current?.pause();}}>{playing?<Pause/>:<Play/>}</button>}
 <button aria-label="Like post" aria-pressed={liked} onClick={()=>mark("like")}><Heart fill={liked?"currentColor":"none"}/></button>
 <a href={url} target="_blank" rel="noreferrer" aria-label="Read comments on Instagram"><MessageCircle/></a>
 <button onClick={share} aria-label="Share post"><Send/></button>
 <button aria-label="Save post" aria-pressed={saved} onClick={()=>mark("save")}><Bookmark fill={saved?"currentColor":"none"}/></button></div>
 <div className="feed-caption"><a href={url} target="_blank" rel="noreferrer">@{account} ↗</a><b>{item.title}</b><small role="status">{notice}</small></div></article>;
}
export function Studio(){
 const [index,select]=useState(0),[visible,setVisible]=useState(false);const feed=useRef<HTMLDivElement>(null);
 useEffect(()=>{const el=feed.current!;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.45});
 observer.observe(el);return ()=>observer.disconnect();},[]);
 return <section id="studio" className="studio studio-viewer"><div className="studio-menu"><p className="culture-kicker">Art · Sound · Travel</p><h2>From my<br/>studio<span>.</span></h2>
 <div className="studio-profiles"><a href="https://www.instagram.com/fr34k_be4t/">Music & art ↗</a><a href="https://www.instagram.com/gt4_fr34k/">Video edits & life ↗</a></div></div>
 <div className="studio-phone"><div className="phone-island" aria-hidden="true"/><div id="studio-media" ref={feed} className="phone-feed" tabIndex={0} aria-label="Studio feed" onScroll={e=>{const el=e.currentTarget;select(Math.min(pieces.length-1,Math.max(0,Math.round(el.scrollTop/el.clientHeight))));}}>{pieces.map((item,i)=><Post key={item.code} item={item} active={visible&&i===index}/>)}</div></div></section>;
}