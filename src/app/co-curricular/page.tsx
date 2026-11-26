"use client";

import Image from "next/image";
import {useRef,useState} from "react";
import {Play,Pause,ExternalLink,X} from "lucide-react";
import ratings from "@/data/anime-ratings.json";
import {extraMovies,extraSeries,posterRow} from "./screen";
import {Studio} from "./Studio";
import {SceneChange} from "./SceneChange";
import {ListeningRoom} from "./ListeningRoom";

import {useCatalog} from "@/context/Catalog";
const seedFilms=[
 ["Saw","saw","tt0387564","2004","Horror","Two strangers wake in a locked room with a tape, a timer and a choice.","Jigsaw’s workshop"],
 ["Everything Everywhere All at Once","everything-everywhere","tt6710474","2022","Sci-fi adventure","A laundromat owner facing an audit tumbles through the lives she might have lived.","The multiverse"],
 ["The Amazing Spider-Man 2","amazing-spider-man-2","tt1872181","2014","Superhero drama","Peter tries to keep Gwen close as Electro turns New York’s power grid against him.","New York City"],
 ["The Dark Knight","dark-knight","tt0468569","2008","Crime thriller","A new district attorney gives Gotham hope. The Joker makes that hope his target.","Gotham City"],
 ...extraMovies.map(posterRow),
];
const seedSeries=[
 ["The Flash","the-flash","tt3107288","2014–2023","Superhero series","A lightning strike gives Barry Allen extraordinary speed and a second chance to investigate his mother’s death.","Central City"],
 ["Supernatural","supernatural","tt0460681","2005–2020","Supernatural horror","Sam and Dean Winchester cross America in their father’s Impala, hunting the things behind local legends.","The Impala"],
 ["The Boys","the-boys","tt1190634","2019–","Superhero satire","A team of vigilantes takes on Vought, the company behind America’s celebrity superheroes.","Vought Tower"],
 ...extraSeries.map(posterRow),
];
function posterSource(key:string){return /^(https:|\/)/.test(key)?key:'/images/screen/'+key+'.webp';}
export default function CulturePage(){
 const extra=useCatalog(), films=[...seedFilms,...extra.movies],series=[...seedSeries,...extra.series];
 const root=useRef<HTMLDivElement>(null),ticket=useRef<HTMLDialogElement>(null);
 const [movie,setMovie]=useState(films[0]),[tv,setTV]=useState(false),[paused,setPaused]=useState(false);
 const titles=tv?series:films;
 return <div className="culture" data-night="" ref={root}>
  <div className="crt-intro" aria-hidden="true"><div className="crt-glass"><i/></div></div>
  <section id="cinema" className="cinema"><header className="culture-heading"><div><p className="culture-kicker">Co-curricular · Film & television</p><h1>On screen<span>.</span></h1></div>
    <nav aria-label="Jump to section"><a href="#studio">Studio</a><a href="#listening">Music</a><a href="#anime">Anime</a></nav></header>
    <div className="program-controls"><div className="shelf-controls"><button aria-pressed={!tv} onClick={()=>setTV(false)}>Movies <small>{films.length}</small></button><button aria-pressed={tv} onClick={()=>setTV(true)}>Series <small>{series.length}</small></button></div>
    <button className="marquee-toggle" aria-label={paused?"Play poster marquee":"Pause poster marquee"} onClick={()=>setPaused(!paused)}>{paused?<Play size={16}/>:<Pause size={16}/>}</button></div>
    <div className="film-window"><div key={String(tv)} className={'film-strip'+(paused?' stopped':'')} style={{animationDuration:titles.length*7+'s'}}>{[0,1].map(copy=><div className="film-run" key={copy} aria-hidden={copy?true:undefined}>{titles.map(t=><button key={t[1]} tabIndex={copy?-1:0} onClick={()=>{setMovie(t);ticket.current?.showModal();}}>
     <div className="poster"><Image src={posterSource(t[1])} width={240} height={360} alt=""/><div className="film-note"><small>{t[3]} · {t[4]}</small><p>{t[5]}</p></div></div><b>{t[0]}</b><small>{t[3]} · {t[4]}</small></button>)}</div>)}</div></div>
    <div className="screen-library">{[["Movies",films],["Series",series]].map(([label,entries])=><section key={String(label)}><h2>{String(label)}</h2><div className="screen-grid">{(entries as string[][]).map(t=><button key={t[2]} onClick={()=>{setMovie(t);ticket.current?.showModal();}}><Image src={posterSource(t[1])} width={240} height={360} alt=""/><b>{t[0]}</b><small>{t[3]} · {t[4]}</small></button>)}</div></section>)}</div>
    <dialog className="movie-ticket" ref={ticket} aria-label={movie[0]+' ticket'}><button aria-label="Close ticket" onClick={()=>ticket.current?.close()}><X size={18}/></button><Image className="ticket-poster" src={posterSource(movie[1])} width={240} height={360} alt={movie[0]+" poster"}/><div className="ticket-copy"><p className="culture-kicker">Admit one · {movie[6]}</p><h3>{movie[0]}</h3><small>{movie[3]} · {movie[4]}</small><p>{movie[5]}</p><a href={'https://www.imdb.com/title/'+movie[2]+'/'} target="_blank" rel="noreferrer">Open IMDb ↗</a></div></dialog>
  </section>
  <Studio/>
  <ListeningRoom/><SceneChange/>
  <section id="anime" className="anime"><header className="culture-heading"><div><p className="culture-kicker">Anime log · Scores out of 100</p><h2>My AniList</h2></div><a href="https://anilist.co/user/ANIM3FR34K/animelist">@ANIM3FR34K <ExternalLink size={15}/></a></header>
   {(["highest","ovas"] as const).map(group=><div className="anime-shelf" key={group}><h3>{group==="highest"?"Highest rated":"OVAs"}</h3><div className="anime-row">{ratings[group].map(a=><a key={a.url} href={a.url}><Image src={a.art} sizes="(max-width:600px) 42vw, 180px" width={240} height={350} alt=""/><b>{a.title}</b><span>{a.score}/100</span><div className="anime-info"><strong>{a.title}</strong><small>{a.year} · {a.format} · {a.episodes??"—"} episodes</small><p>{a.genres.join(" · ")}</p></div></a>)}</div></div>)}
  <div className="anime-marquee"><div className="anime-belt" style={{animationPlayState:paused?"paused":undefined}}>{[0,1].map(copy=><div key={copy} aria-hidden={copy?true:undefined}>{[...ratings.highest,...ratings.ovas].map(a=><a tabIndex={copy?-1:0} key={a.url} href={a.url}><Image src={a.art} width={105} height={150} alt={a.title}/></a>)}</div>)}</div><button onClick={()=>setPaused(!paused)} aria-label={paused?"Play poster sequence":"Pause poster sequence"}>{paused?<Play size={15}/>:<Pause size={15}/>}</button></div>
  </section></div>;
}



