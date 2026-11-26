import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {useCatalog} from "@/context/Catalog";

export function ProjectIndex() {
  const {projects:PROJECTS}=useCatalog();
  return <section data-paper="" className="evidence-index">
    <header><div><p className="atlas-label">Case studies</p><h2>Selected work.</h2></div><Link href="/work">All {PROJECTS.length} projects <ArrowUpRight size={16}/></Link></header>
    <ol>{PROJECTS.slice(0,5).map(project=><li key={project.slug}>
      <Link data-insight={project.summary} href={`/work/${project.slug}`}><span className="index-number">{project.number}</span>
        <div><span className="index-kind">{project.isClientEngagement ? "Client engagement" : "Databricks · Open source"}</span><h3>{project.title}</h3></div>
        <span className="index-domain">{project.isClientEngagement ? project.subtitle : project.headlineMetric.value}</span>
        <ArrowUpRight size={22}/></Link>
    </li>)}</ol>
  </section>;
}

