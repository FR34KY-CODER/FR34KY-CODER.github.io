import { ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/data/profile";

export function ChapterUnderHood() {
  return <section id="under-the-hood" data-paper="" className="grid gap-10 bg-[#f4f1ea] px-[7vw] py-20 text-[#191916] lg:grid-cols-[.8fr_1.2fr] lg:py-28">
    <div>
      <p className="studio-kicker">About</p>
      <h2 className="mt-5 text-5xl font-bold tracking-[-.065em] sm:text-7xl">Experience<span className="text-[#24735c]">.</span></h2>
      <p className="mt-5 max-w-sm text-lg">{PROFILE.currentRole}</p>
      <p className="mt-2 text-sm text-black/65">{PROFILE.education}</p>
      <div className="mt-6 flex flex-wrap gap-4">{PROFILE.socials.slice(0,2).map(link => <a className="studio-text-link" key={link.href} href={link.href}>{link.label}<ArrowUpRight size={15}/></a>)}</div>
    </div>
    <div>{PROFILE.achievements.map(item => <article key={item.id} className="border-t border-black/20 py-5">
      <h3 className="text-xl font-bold tracking-tight">{item.href ? <a className="inline-flex items-baseline gap-2 hover:underline" href={item.href}>{item.shortTitle}<ArrowUpRight size={15}/></a> : item.shortTitle}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/70">{item.subtitle}</p>
    </article>)}</div>
  </section>;
}
