"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import Loading from "../loading";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import {
  Building2,
  CheckCircle2,
  Mail,
  Send,
  AlertCircle,
} from "lucide-react";
import { CORE_ROLES, ROLES } from "@/data/roles";
import { PROFILE } from "@/data/profile";
import { useRole } from "@/context/RoleContext";
const draftOnly = process.env.NEXT_PUBLIC_STATIC_CONTACT === "true";

const MISSION_CHIPS = [
  ...CORE_ROLES.map((r) => ({
    id: r.id,
    label: r.title,
    color: r.accentNight,
  })),
  {
    id: "full-4",
    label: "General enquiry",
    color: "#34d399",
  },
];

function ContactConsoleContent() {
  const searchParams = useSearchParams();
  const { activeRole } = useRole();

  const initialRole = searchParams.get("role");
  const defaultMission =
    initialRole && initialRole in ROLES && initialRole !== "all"
      ? ROLES[initialRole as keyof typeof ROLES].title
      : activeRole !== "all"
        ? ROLES[activeRole].title
        : "General enquiry";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isOrgVisitor, setIsOrgVisitor] = useState(false);
  const [company, setCompany] = useState("");
  const [roleMission, setRoleMission] = useState(defaultMission);
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "idle" | "success" | "config" | "error";
    text: string;
  }>({ type: "idle", text: "" });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (initialRole && initialRole in ROLES && initialRole !== "all") {
      setRoleMission(ROLES[initialRole as keyof typeof ROLES].title);
    }
  }, [initialRole]);

  const shakeForm = () => {
    if (!formRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      formRef.current,
      { x: -10 },
      {
        x: 0,
        duration: 0.48,
        ease: "elastic.out(1.2, 0.3)",
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage({ type: "idle", text: "" });

    if (
      name.trim().length < 2 ||
      !/^\S+@\S+\.\S+$/.test(email.trim()) ||
      (phone.trim().length > 0 && phone.trim().length < 6) ||
      message.trim().length < 10
    ) {
      shakeForm();
      setStatusMessage({
        type: "error",
        text: "Enter your name, email and a message of at least 10 characters. An optional phone number needs at least 6 characters.",
      });
      return;
    }

    if (draftOnly) {
      window.location.href = mailtoFallback;
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: isOrgVisitor ? company.trim() || undefined : undefined,
          roleMission,
          message: message.trim(),
        }),
      });

      let data: {
        ok?: boolean;
        provider?: string;
        needsConfig?: boolean;
        message?: string;
      } | null = null;
      try {
        data = await res.json();
      } catch {
        // Non-JSON response (e.g. static host 404 on GitHub Pages)
      }

      if (res.ok && data?.ok) {
        setStatusMessage({
          type: "success",
          text: "Your message has been sent."
        });
        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setMessage("");
      } else if (data?.needsConfig || !data) {
        setStatusMessage({ type: "config", text: "Online delivery is unavailable. Open an email draft below to send your message." });
      } else {
        shakeForm();
        setStatusMessage({
          type: "error",
          text:
            res.status === 400 ? data.message || "Please check your fields." : "Delivery failed. Try again or open an email draft.",
        });
      }
    } catch {
      shakeForm();
      setStatusMessage({
        type: "error",
        text: "Your message could not be sent. Try again or open an email draft.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const draftBody = [
    message.trim(), "", name.trim(), email.trim(), phone.trim(),
    isOrgVisitor && company.trim(), roleMission,
  ].filter(Boolean).join("\n");
  const mailtoFallback = "mailto:" + PROFILE.email + "?subject=" +
    encodeURIComponent("Portfolio enquiry - " + roleMission) + "&body=" + encodeURIComponent(draftBody);

  return (
    <div className="contact-route min-h-screen bg-[#f4f1ea] text-[#0f1217]">
      <section data-paper="" className="mx-auto grid max-w-[1440px] items-start gap-10 px-[7vw] pb-20 pt-28 lg:grid-cols-[.9fr_1.1fr] lg:pt-36">
        <header>
          <p className="studio-kicker">Contact</p>
          <h1 className="mt-5 text-6xl font-bold leading-none tracking-[-.075em] sm:text-8xl">Get in<br />touch.</h1>
          <p className="my-5 max-w-sm">{draftOnly ? "Write a message and send it from your email app." : "Tell me about your project or an open role."}</p>
          <a className="studio-text-link break-all" href={"mailto:" + PROFILE.email}>{PROFILE.email}</a>
        </header>
        <div>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mx-auto max-w-xl space-y-6"
          >
            {/* Role / Mission Selector */}
            <div className="space-y-2.5">
              <label className="block font-mono text-[12px] font-bold tracking-[0.16em] uppercase text-[#0f1217]/75">
                Topic
              </label>
              <div className="flex flex-wrap gap-2">
                {MISSION_CHIPS.map((chip) => {
                  const selected = roleMission === chip.label;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setRoleMission(chip.label)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] transition cursor-pointer ${
                        selected
                          ? "border-[#0f1217] bg-[#0f1217] text-[#f4f1ea]"
                          : "border-[#0f1217]/18 bg-white text-[#0f1217] hover:border-[#0f1217]/50"
                      }`}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: chip.color }}
                      />
                      <span>{chip.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name & Phone Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="visitor-name"
                  className="block font-mono text-[12px] font-bold tracking-[0.14em] uppercase text-[#0f1217]/75"
                >
                  Your Name *
                </label>
                <input
                  id="visitor-name"
                  minLength={2} maxLength={120} autoComplete="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Priya Sharma"
                  className="w-full rounded-xl border border-[#0f1217]/20 bg-white px-4 py-3 text-sm font-medium text-[#0f1217] placeholder:text-[#0f1217]/35 focus:border-[#0f1217] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="visitor-phone"
                  className="block font-mono text-[12px] font-bold tracking-[0.14em] uppercase text-[#0f1217]/75"
                >
                  Phone (optional)
                </label>
                <input
                  id="visitor-phone"
                  type="tel"
                  minLength={6}
                  maxLength={32}
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full rounded-xl border border-[#0f1217]/20 bg-white px-4 py-3 text-sm font-medium text-[#0f1217] placeholder:text-[#0f1217]/35 focus:border-[#0f1217] focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="visitor-email"
                className="block font-mono text-[12px] font-bold tracking-[0.14em] uppercase text-[#0f1217]/75"
              >
                Work or Personal Email *
              </label>
              <input
                id="visitor-email"
                  maxLength={180} autoComplete="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="priya@acme.ai"
                className="w-full rounded-xl border border-[#0f1217]/20 bg-white px-4 py-3 text-sm font-medium text-[#0f1217] placeholder:text-[#0f1217]/35 focus:border-[#0f1217] focus:outline-none"
              />
            </div>

            {/* Organization Toggle + Optional Company */}
            <div className="rounded-2xl border border-[#0f1217]/15 bg-white/80 p-4 space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="inline-flex items-center gap-2 font-mono text-[12px] font-bold tracking-[0.12em] uppercase text-[#0f1217]">
                  <Building2 size={14} />
                  <span>Reaching out from a company / org?</span>
                </span>
                <input
                  type="checkbox"
                  checked={isOrgVisitor}
                  onChange={(e) => setIsOrgVisitor(e.target.checked)}
                  className="h-4 w-4 accent-[#0f1217]"
                />
              </label>

              {isOrgVisitor && (
                <div className="space-y-1.5">
                  <label
                    htmlFor="visitor-company"
                    className="block font-mono text-[12px] tracking-[0.14em] uppercase text-[#0f1217]/75"
                  >
                    Company / Organization Name (Optional)
                  </label>
                  <input
                    id="visitor-company"
                  maxLength={140} autoComplete="organization"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Robotics / Hiring Team"
                    className="w-full rounded-xl border border-[#0f1217]/18 bg-[#f4f1ea]/50 px-4 py-2.5 text-sm font-medium text-[#0f1217] placeholder:text-[#0f1217]/35 focus:border-[#0f1217] focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label
                htmlFor="visitor-message"
                className="block font-mono text-[12px] font-bold tracking-[0.14em] uppercase text-[#0f1217]/75"
              >
                Message *
              </label>
              <textarea
                id="visitor-message"
                  minLength={10} maxLength={4000}
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about the role, team, timeline, or system problem you are solving..."
                className="w-full rounded-xl border border-[#0f1217]/20 bg-white px-4 py-3 text-sm font-medium text-[#0f1217] placeholder:text-[#0f1217]/35 focus:border-[#0f1217] focus:outline-none resize-y"
              />
            </div>

            {/* Feedback Alert */}
            {statusMessage.type !== "idle" && (
              <div
                role="status"
                className={`flex items-start gap-3 rounded-2xl border p-4 text-xs leading-relaxed ${
                  statusMessage.type === "success"
                    ? "border-emerald-600/35 bg-emerald-50 text-emerald-950"
                    : statusMessage.type === "config"
                      ? "border-amber-600/35 bg-amber-50 text-amber-950"
                      : "border-red-600/35 bg-red-50 text-red-950"
                }`}
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            {/* Submit & Direct Fallback */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full bg-[#0f1217] px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#f4f1ea] hover:bg-[#ea1d0f] disabled:opacity-50 transition-colors cursor-pointer"
              >
                <Send size={14} />
                <span>
                  {draftOnly ? "Open email draft" : submitting ? "Sending…" : "Send message"}
                </span>
              </button>

              {!draftOnly && <a
                href={mailtoFallback}
                className="inline-flex items-center gap-2 rounded-full border border-[#0f1217]/25 px-5 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-[#0f1217] hover:bg-[#0f1217] hover:text-[#f4f1ea] transition-colors"
              >
                <Mail size={14} />
                <span>Open email draft</span>
              </a>}
            </div>
          </form>
        </div>

      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={<Loading />}
    >
      <ContactConsoleContent />
    </Suspense>
  );
}

