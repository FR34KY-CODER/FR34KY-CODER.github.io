"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Rotate3D } from "lucide-react";

type Point = [number, number, number];
type Face = { points: Point[]; color: string };
const faces: Face[] = [];

function face(color: string, ...points: Point[]) {
  faces.push({ color, points });
}

// A triangular gnomon with a flight of steps and a curved observing scale.
function prism(profile: number[][], front: number, back: number, colors: string[]) {
  const side = (z: number) => profile.map(([x, y]): Point => [x, y, z]);
  face(colors[0], ...side(front));
  face(colors[1], ...side(back));
  profile.forEach(([x, y], i) => {
    const [nx, ny] = profile[(i + 1) % profile.length];
    face(nx === x ? colors[1] : colors[2], [x,y,front], [nx,ny,front], [nx,ny,back], [x,y,back]);
  });
}

prism([[-2.25,0],[-2.25,2.75],[2.35,0]], -.23,.23, ["#ba492a","#9a3622","#f9bf80"]);
const stairs = [[-2.25,0],[-2.25,2.65]];
for (let i = 0; i < 24; i++) {
  const x = -2.25 + 4.55 * (i+1)/24;
  stairs.push([x, 2.65*(1-i/24)], [x, 2.65*(1-(i+1)/24)]);
}
prism(stairs, .23,.68, ["#db6b39","#b94829","#ffe0a5"]);
for (const direction of [-1,1]) {
  for (let i=0;i<36;i++) {
    const arcPoint = (step:number,outer:boolean): Point => {
      const a = (step/36 * .88 + .06) * Math.PI;
      const r = outer ? 1.87 : 1.64;
      return [0.5 + r*Math.cos(a), .18 + .83*Math.pow(Math.cos(a),2), direction*(.62+r*Math.sin(a))];
    };
    const a=arcPoint(i,false), b=arcPoint(i+1,false), c=arcPoint(i+1,true), d=arcPoint(i,true);
    face("#f6c188", a,b,c,d);
    face("#d36a40", d,c,[c[0],0,c[2]],[d[0],0,d[2]]);
    face("#973d29", b,a,[a[0],0,a[2]],[b[0],0,b[2]]);
  }
}

function draw(canvas: HTMLCanvasElement, angle: number) {
  const width = canvas.clientWidth, height = canvas.clientHeight;
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  if (!width || !height) return;
  if (canvas.width !== Math.round(width*scale) || canvas.height !== Math.round(height*scale)) {
    canvas.width = Math.round(width*scale); canvas.height = Math.round(height*scale);
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(scale,0,0,scale,0,0);
  const radians = angle*Math.PI/180;
  const cos = Math.cos(radians), sin = Math.sin(radians);
  const unit = Math.min(width/6.5,height/5.95);
  const depth = ([x,y,z]:Point) => (x*sin+z*cos)*.91 + y*.42;
  const project = ([x,y,z]:Point) => [width*.5+(x*cos-z*sin)*unit, height*.65+((x*sin+z*cos)*.42-y*.91)*unit];
  const path = (points: Point[]) => {
    ctx.beginPath();
    points.forEach((p,i)=>{const [x,y]=project(p); if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);});
    ctx.closePath();
  };
  ctx.fillStyle = "#f3cfaa"; ctx.fillRect(0,0,width,height);
  ctx.fillStyle = "#d8522d"; ctx.beginPath(); ctx.arc(width*.78,height*.22,unit*.61,0,2*Math.PI); ctx.fill();
  const horizon = height*.43;
  const ground = ctx.createLinearGradient(0,horizon,0,height);
  ground.addColorStop(0,"#edba88"); ground.addColorStop(1,"#f6d5af");
  ctx.fillStyle=ground; ctx.fillRect(0,horizon,width,height-horizon);
  ctx.save(); ctx.beginPath(); ctx.rect(0,horizon,width,height-horizon); ctx.clip();
  ctx.strokeStyle="rgba(122,62,35,.12)"; ctx.lineWidth=.7;
  for(let i=-14;i<=14;i++) {
    for(const line of [[[i,0,-14],[i,0,14]], [[-14,0,i],[14,0,i]]] as Point[][]) {
      const [a,b]=line.map(project); ctx.beginPath(); ctx.moveTo(a[0],a[1]); ctx.lineTo(b[0],b[1]); ctx.stroke();
    }
  }
  ctx.fillStyle="#d09b71";
  for(const f of faces) {
    path(f.points.map(([x,y,z])=>[x+y*.72,0,z+y*.56])); ctx.fill();
  }
  ctx.restore();
  const sorted=faces.map(f=>({f, z:f.points.reduce((n,p)=>n+depth(p),0)/f.points.length})).sort((a,b)=>a.z-b.z);
  for(const {f} of sorted) {
    path(f.points); ctx.fillStyle=f.color; ctx.fill();
    ctx.strokeStyle=f.color; ctx.lineWidth=.65; ctx.stroke();
  }
}

export function Observatory() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{x:number; angle:number; id:number} | null>(null);
  const [angle,setAngle] = useState(28);
  const current = useRef(angle);
  useEffect(()=>{
    current.current=angle;
    if(canvas.current) draw(canvas.current,angle);
  },[angle]);
  useEffect(()=>{
    const el=canvas.current;
    if(!el) return;
    const observer=new ResizeObserver(()=>draw(el,current.current));
    observer.observe(el);
    return ()=>observer.disconnect();
  },[]);
  const turn = (degrees:number) => setAngle((Math.round(degrees)%360+360)%360);
  return <figure className="observatory">
    <div className="observatory-stage">
      <canvas ref={canvas} aria-label="Interactive architectural model inspired by Jantar Mantar in Jaipur"
        onPointerDown={e=>{
          if(!e.isPrimary || e.button!==0) return;
          drag.current={x:e.clientX,angle,id:e.pointerId};
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={e=>{
          const start=drag.current;
          if(start?.id===e.pointerId) turn(start.angle+(e.clientX-start.x)*180/e.currentTarget.clientWidth);
        }}
        onLostPointerCapture={()=>{drag.current=null;}} />
      <span className="observatory-hint"><Rotate3D size={15}/> Drag to rotate</span>
    </div>
    <figcaption className="observatory-controls">
      <div><strong>Jantar Mantar</strong><span>Jaipur, India</span></div>
      <button aria-label="Rotate model left" onClick={()=>turn(angle-15)}><ArrowLeft size={16}/></button>
      <input aria-label="Model rotation" aria-valuetext={angle+" degrees"} type="range" min="0" max="359" value={angle} onChange={e=>turn(Number(e.target.value))}/>
      <button aria-label="Rotate model right" onClick={()=>turn(angle+15)}><ArrowRight size={16}/></button>
    </figcaption>
  </figure>;
}
