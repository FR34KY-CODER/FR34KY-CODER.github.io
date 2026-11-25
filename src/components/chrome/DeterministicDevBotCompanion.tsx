"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, ArrowUp, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { resolveDevBotQuery } from "@/lib/devbotEngine";

export function DeterministicDevBotCompanion() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<{ question: string; reply: ReturnType<typeof resolveDevBotQuery> }[]>([]);
  const trigger = useRef<HTMLButtonElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const transcript = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { if (open) field.current?.focus({ preventScroll: true }); }, [open]);
  useEffect(() => {
    if (transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
  }, [answers, open]);

  const close = () => { setOpen(false); trigger.current?.focus({ preventScroll: true }); };
  const ask = (question: string) => {
    const query = question.trim();
    if (!query) return;
    setAnswers(previous => [...previous, { question: query, reply: resolveDevBotQuery(query) }]);
    setInput("");
  };

  return <aside className="fixed bottom-4 right-4 z-50 text-[#191916] sm:right-6">
    {open && <section id="portfolio-guide" role="dialog" aria-label="Portfolio guide"
      onKeyDown={event => { if (event.key === "Escape") close(); }}
      className="absolute bottom-14 right-0 flex max-h-[min(510px,72dvh)] w-[min(360px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-black/20 bg-[#fffdf8] shadow-xl">
      <header className="flex items-center justify-between border-b border-black/10 px-4 py-3">
        <h2 className="font-bold">Portfolio guide</h2>
        <button onClick={close} aria-label="Close guide" className="p-2"><X size={16} /></button>
      </header>
      <div ref={transcript} role="log" className="space-y-4 overflow-y-auto px-4 py-4 text-sm">
        {!answers.length && <p>What would you like to know about my work?</p>}
        {answers.map(({question, reply}, index) => <div key={index} className="space-y-2">
          <p className="font-bold">{question}</p><p>{reply.text}</p>
          {reply.links?.map(link => <Link key={link.href + link.label} href={link.href} onClick={close} className="mr-3 inline-block underline underline-offset-4">{link.label}</Link>)}
        </div>)}
      </div>
      {!answers.length && <div className="flex flex-wrap gap-2 px-4 pb-3">{["Projects", "Education", "Contact"].map(q =>
        <button key={q} onClick={() => ask(q)} className="rounded-full border border-black/20 px-3 py-1 text-sm">{q}</button>)}</div>}
      <form className="flex items-center gap-2 border-t border-black/15 p-3" onSubmit={event => { event.preventDefault(); ask(input); }}>
        <input ref={field} aria-label="Your question" placeholder="Ask a question…" value={input} onChange={event => setInput(event.target.value)} className="min-w-0 flex-1 px-2 py-2 text-sm" />
        <button aria-label="Send question" disabled={!input.trim()} className="rounded-full bg-black p-2 text-white disabled:opacity-40"><ArrowUp size={18} /></button>
      </form>
    </section>}
    <button ref={trigger} aria-expanded={open} aria-controls={open ? "portfolio-guide" : undefined} onClick={() => open ? close() : setOpen(true)}
      className="flex items-center gap-2 rounded-full border border-black/20 bg-[#fffdf8] px-4 py-2.5 text-sm font-semibold shadow-sm"><MessageCircle size={16} /><span className="sr-only sm:not-sr-only">Ask about my work</span></button>
  </aside>;
}
