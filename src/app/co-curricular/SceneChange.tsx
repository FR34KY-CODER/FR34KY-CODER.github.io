import type {CSSProperties} from "react";

function Spool({cx}:{cx:number}){
 return <g className="spool" style={{transformOrigin:cx+'px 170px'}}>
  <mask id={'holes-'+cx}><circle cx={cx} cy="170" r="141" fill="white"/>
   {[0,72,144,216,288].map(a=><ellipse key={a} cx={cx} cy="87" rx="34" ry="40" transform={`rotate(${a} ${cx} 170)`}/>)}
   <circle cx={cx} cy="170" r="11"/></mask>
  <circle cx={cx} cy="170" r="141" fill="black" mask={'url(#holes-'+cx+')'}/>
 </g>;
}
export function ReelOverlay(){
 return <div className="cinema-wipe" aria-hidden="true"><svg viewBox="0 0 840 330"><path d="M60 188 Q85 330 225 310 L618 310 Q759 320 780 188" stroke="#000" strokeWidth="5" fill="none"/><Spool cx={200}/><Spool cx={640}/></svg></div>;
}
export function SceneChange({type}:{type:"vinyl"|"blast"}){
 return <div data-scroll-scene="" className={'scene-change change-'+type} aria-hidden="true"><div className="change-stage"><div className="change-art">
  {type==="vinyl"?<div className="record"><div className="record-label"><span>Side A</span><b>OG</b><i/></div></div>:
   <div className="charge-scene"><div className="goku-atlas">{Array.from({length:8},(_,i)=><i key={i} style={{"--i":i,backgroundPosition:(i%4)*100/3+'% '+Math.floor(i/4)*100+'%'} as CSSProperties}/>)}<div className="charge-orb"/><div className="energy-wave"/></div></div>}
 </div></div></div>;
}
