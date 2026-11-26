"use client";

import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {Play,Pause,ExternalLink,X} from "lucide-react";
import ratings from "@/data/anime-ratings.json";
import {extraMovies,extraSeries,posterRow} from "./screen";
import {Studio} from "./Studio";
import {ReelOverlay,SceneChange} from "./SceneChange";
import {ListeningRoom} from "./ListeningRoom";

const films=[
 ["Saw","saw","tt0387564","2004","Horror","Two strangers wake in a locked room with a tape, a timer and a choice.","Jigsaw’s workshop"],
 ["Everything Everywhere All at Once","everything-everywhere","tt6710474","2022","Sci-fi adventure","A laundromat owner facing an audit tumbles through the lives she might have lived.","The multiverse"],
 ["The Amazing Spider-Man 2","amazing-spider-man-2","tt1872181","2014","Superhero drama","Peter tries to keep Gwen close as Electro turns New York’s power grid against him.","New York City"],
 ["The Dark Knight","dark-knight","tt0468569","2008","Crime thriller","A new district attorney gives Gotham hope. The Joker makes that hope his target.","Gotham City"],
 ...extraMovies.map(posterRow),
];
const series=[
 ["The Flash","the-flash","tt3107288","2014–2023","Superhero series","A lightning strike gives Barry Allen extraordinary speed and a second chance to investigate his mother’s death.","Central City"],
 ["Supernatural","supernatural","tt0460681","2005–2020","Supernatural horror","Sam and Dean Winchester cross America in their father’s Impala, hunting the things behind local legends.","The Impala"],
 ["The Boys","the-boys","tt1190634","2019–","Superhero satire","A team of vigilantes takes on Vought, the company behind America’s celebrity superheroes.","Vought Tower"],
 ...extraSeries.map(posterRow),
];
export default function CulturePage(){
 const root=useRef<HTMLDivElement>(null),ticket=useRef<HTMLDialogElement>(null);
 const [movie,setMovie]=useState(films[0]),[tv,setTV]=useState(false),[paused,setPaused]=useState(false);
 const titles=tv?series:films;
 useEffect(()=>{
   const scenes=Array.from(root.current!.querySelectorAll<HTMLElement>("[data-scroll-scene]"));
   const cinema=root.current!.querySelector<HTMLElement>("#cinema")!;
   let frame=0;
   function update(){frame=0;const box=cinema.getBoundingClientRect();const exit=Math.max(0,Math.min(1,(innerHeight*.72-box.bottom)/(innerHeight*.65)));cinema.style.setProperty("--exit",String(exit));for(const scene of scenes){
     const rect=scene.getBoundingClientRect();
     const progress=Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height-(scene.firstElementChild?.clientHeight||innerHeight))));
     scene.style.setProperty("--p",String(progress));
     if(scene.classList.contains("change-blast")){const phase=Math.min(7,progress*10.5);scene.style.setProperty("--frame",String(phase));scene.dataset.frame=String(Math.round(phase));}
   }}
   function schedule(){if(!frame)frame=requestAnimationFrame(update);}
   update();addEventListener("scroll",schedule,{passive:true});addEventListener("resize",schedule);
   return ()=>{cancelAnimationFrame(frame);removeEventListener("scroll",schedule);removeEventListener("resize",schedule);};
 },[]);
 return <div className="culture" data-night="" ref={root}>
  <div className="crt-intro" aria-hidden="true"><div className="crt-glass"><i/></div></div>
  <section id="cinema" className="cinema"><header className="culture-heading"><div><p className="culture-kicker">Co-curricular · Film & television</p><h1>On screen<span>.</span></h1></div>
    <nav aria-label="Jump to section"><a href="#studio">Studio</a><a href="#listening">Music</a><a href="#anime">Anime</a></nav></header>
    <div className="program-controls"><div className="shelf-controls"><button aria-pressed={!tv} onClick={()=>setTV(false)}>Movies <small>{films.length}</small></button><button aria-pressed={tv} onClick={()=>setTV(true)}>Series <small>{series.length}</small></button></div>
    <button className="marquee-toggle" aria-label={paused?"Play poster marquee":"Pause poster marquee"} onClick={()=>setPaused(!paused)}>{paused?<Play size={16}/>:<Pause size={16}/>}</button></div>
    <div className="film-window"><div key={String(tv)} className={'film-strip'+(paused?' stopped':'')}>{[0,1].map(copy=><div className="film-run" key={copy} aria-hidden={copy?true:undefined}>{titles.map(t=><button key={t[1]} tabIndex={copy?-1:0} onClick={()=>{setMovie(t);ticket.current?.showModal();}}>
     <div className="poster"><Image src={'/images/screen/'+t[1]+'.webp'} width={240} height={360} alt=""/><div className="film-note"><small>{t[3]} · {t[4]}</small><p>{t[5]}</p></div></div><b>{t[0]}</b><small>{t[3]} · {t[4]}</small></button>)}</div>)}</div></div>
    <ReelOverlay/>
    <dialog className="movie-ticket" ref={ticket} aria-label={movie[0]+' ticket'}><button aria-label="Close ticket" onClick={()=>ticket.current?.close()}><X size={18}/></button><p className="culture-kicker">Admit one · {movie[6]}</p><h3>{movie[0]}</h3><small>{movie[3]} · {movie[4]}</small><p>{movie[5]}</p><a href={'https://www.imdb.com/title/'+movie[2]+'/'} target="_blank" rel="noreferrer">Open IMDb ↗</a></dialog>
  </section>
  <Studio/>
  <SceneChange type="vinyl"/><ListeningRoom/><SceneChange type="blast"/>
  <section id="anime" className="anime"><header className="culture-heading"><div><p className="culture-kicker">Anime log · Scores out of 100</p><h2>My AniList</h2></div><a href="https://anilist.co/user/ANIM3FR34K/animelist">@ANIM3FR34K <ExternalLink size={15}/></a></header>
   {(["highest","ovas"] as const).map(group=><div className="anime-shelf" key={group}><h3>{group==="highest"?"Highest rated":"OVAs"}</h3><div className="anime-row">{ratings[group].map(a=><a key={a.url} href={a.url}><Image src={a.art} sizes="(max-width:600px) 42vw, 180px" width={240} height={350} alt=""/><b>{a.title}</b><span>{a.score}/100</span></a>)}</div></div>)}
  </section></div>;
}


