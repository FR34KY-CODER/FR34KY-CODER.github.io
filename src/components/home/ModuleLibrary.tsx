"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FACTORY_CRATES } from "@/data/factory";
import { CORE_ROLES, CoreRoleId } from "@/data/roles";

export function ModuleLibrary() {
  const [role, setRole] = useState<CoreRoleId>("ds");
  return <section data-night="" className="module-library">
    <p className="atlas-label">Open-source tools</p><h2>Module library.</h2>
    <div className="module-filters" aria-label="Filter modules by discipline">{CORE_ROLES.map(r=><button key={r.id}
      aria-pressed={role===r.id} onClick={()=>setRole(r.id as CoreRoleId)}>{r.title}</button>)}</div>
    <ul key={role}>{FACTORY_CRATES.filter(m=>m.role===role).map(m=><li key={m.slug}><a data-insight={m.summary} href={m.githubUrl}>
      <span className="atlas-label">{m.kind}</span><h3>{m.name} <ArrowUpRight size={15}/></h3><p>{m.summary}</p>
    </a></li>)}</ul>
  </section>;
}

