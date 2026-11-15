"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import {
  Building2,
  CheckCircle2,
  Code2,
  Eye,
  Mail,
  Send,
  Terminal,
  AlertCircle,
} from "lucide-react";
import { CORE_ROLES, ROLES } from "@/data/roles";
import { PROFILE } from "@/data/profile";
import { useRole } from "@/context/RoleContext";
import {
  buildContactEmailHtml,
  buildContactEmailSubject,
} from "@/lib/emailTemplate";

const MISSION_CHIPS = [
  ...CORE_ROLES.map((r) => ({
    id: r.id,
    label: r.title,
    color: r.accentNight,
  })),
  {
    id: "full-4",
    label: "All 4 Roles · Full Package",
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
        : MISSION_CHIPS[0].label;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isOrgVisitor, setIsOrgVisitor] = useState(true);
  const [company, setCompany] = useState("");
  const [roleMission, setRoleMission] = useState(defaultMission);
  const [message, setMessage] = useState("");

  const [previewMode, setPreviewMode] = useState<"curl" | "html">("curl");
  const [cliInput, setCliInput] = useState("");
  const [cliLog, setCliLog] = useState<string[]>([
    `# Dispatch Relay Active · ${PROFILE.handle}@jaipur`,
    "# Try typing 'help', 'roles', or 'sudo hire ojasvi' below.",
  ]);

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

  const payload = useMemo(
    () => ({
      name: name.trim() || "Alex Mercer",
      email: email.trim() || "alex@company.com",
      phone: phone.trim() || "+91 98XXX XXXXX",
      company: isOrgVisitor && company.trim() ? company.trim() : undefined,
      roleMission,
      message:
        message.trim() ||
        "The Visitor is interested in contacting you regarding a high-impact build.",
    }),
    [name, email, phone, isOrgVisitor, company, roleMission, message]
  );

  const liveEmailHtml = useMemo(
    () => buildContactEmailHtml(payload),
    [payload]
  );
  const liveEmailSubject = useMemo(
    () => buildContactEmailSubject(payload),
    [payload]
  );

  const shakeForm = () => {
    if (!formRef.current) return;
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
      phone.trim().length < 6 ||
      message.trim().length < 8
    ) {
      shakeForm();
      setStatusMessage({
        type: "error",
        text: "Please complete your name, valid email, phone number, and a brief message (8+ chars).",
      });
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

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatusMessage({
          type: "success",
          text: `Automated HTML email dispatched via ${data.provider || "relay"}! Subject: "${liveEmailSubject}"`,
        });
        setCliLog((prev) => [
          ...prev,
          `[200 OK] Dispatched via ${data.provider || "SMTP"} -> ${PROFILE.email}`,
        ]);
        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setMessage("");
      } else if (data.needsConfig) {
        setStatusMessage({
          type: "config",
          text:
            data.message ||
            "SMTP / Resend keys aren't configured in .env.local yet. Use 'Open Mail Client' below or configure SMTP_USER/SMTP_PASS.",
        });
      } else {
        shakeForm();
        setStatusMessage({
          type: "error",
          text:
            data.message || "Validation failed. Please double check your fields.",
        });
      }
    } catch {
      shakeForm();
      setStatusMessage({
        type: "error",
        text: "Network error dispatching request. Please try again or use direct mail below.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCliCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    let reply: string[] = [];

    if (lower === "clear") {
      setCliLog([]);
      setCliInput("");
      return;
    } else if (lower === "help") {
      reply = [
        "Commands: whoami | roles | status | theme | sudo hire ojasvi | clear",
      ];
    } else if (lower === "whoami") {
      reply = [
        `${PROFILE.name} (${PROFILE.handle}) · ${PROFILE.currentRole}`,
      ];
    } else if (lower === "roles") {
      reply = [
        "01 AI Engineer | 02 Backend Dev | 03 Data Scientist | 04 ML Engineer",
      ];
    } else if (lower === "status") {
      reply = [`JAIPUR · ${PROFILE.statusLabel} · Direct: ${PROFILE.email}`];
    } else if (lower === "theme") {
      reply = [
        'Subject: "The Visitor is interested in contacting you!" · HTML Payload Preview active.',
      ];
    } else if (lower.includes("sudo hire")) {
      reply = [
        "[ROOT ACCESS GRANTED] Priority mission selected. Fill the left panel & press Dispatch!",
      ];
      setRoleMission("All 4 Roles · Full Package");
    } else {
      reply = [`zsh: command not found: ${cmd} (try 'help')`];
    }

    setCliLog((prev) => [...prev.slice(-8), `$ ${cmd}`, ...reply]);
    setCliInput("");
  };

  const mailtoFallback = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    liveEmailSubject
  )}&body=${encodeURIComponent(
    `Visitor Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nCompany: ${payload.company || "Individual"}\nMission: ${payload.roleMission}\n\nMessage:\n${payload.message}`
  )}`;

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#0f1217]">
      {/* SPLIT CONTACT HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#0f1217]/12">
        <div
          data-paper=""
          className="lg:col-span-6 bg-[#f4f1ea] px-6 sm:px-12 pt-28 pb-10 space-y-4"
        >
          <div className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#0f1217]/75">
            Ch 07 · Automated Dispatch · {PROFILE.city}
          </div>
          <h1 className="text-5xl sm:text-7xl font-black leading-[0.88] tracking-[-0.04em] uppercase">
            Let&apos;s Build
            <br />
            <span style={{ color: "var(--role-accent-paper, #d91b0e)" }}>
              The Whole Thing
            </span>
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-[#0f1217]/75">
            Enter your contact coordinates below. Every submission formats a
            structured{" "}
            <strong className="font-bold text-[#0f1217]">
              &ldquo;The Visitor is interested in contacting you!&rdquo;
            </strong>{" "}
            HTML payload straight to Ojasvi&apos;s inbox.
          </p>
        </div>

        <div
          data-night=""
          className="lg:col-span-6 flex flex-col justify-between gap-6 bg-[#0f1217] px-6 sm:px-12 pt-28 pb-10 text-[#f4f1ea]"
        >
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="rounded-xl border border-[#f4f1ea]/12 bg-[#141923] p-4">
              <div className="text-[11px] text-[#f4f1ea]/65 uppercase tracking-[0.16em]">
                Relay Endpoint
              </div>
              <div className="mt-1 font-bold text-[#f4f1ea]">POST /api/contact</div>
            </div>
            <div className="rounded-xl border border-[#f4f1ea]/12 bg-[#141923] p-4">
              <div className="text-[11px] text-[#f4f1ea]/65 uppercase tracking-[0.16em]">
                Payload Format
              </div>
              <div className="mt-1 font-bold text-[#f4f1ea]">HTML + Text Dispatch</div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#f4f1ea]/15 bg-[#151a24] p-5 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[#f4f1ea]/75 uppercase text-[12px] tracking-[0.18em]">
              <span>EMAIL SUBJECT AUTO-FORMATTER</span>
              <span className="text-emerald-400">● READY</span>
            </div>
            <div
              className="text-sm font-bold break-words"
              style={{ color: "var(--role-accent-night)" }}
            >
              {liveEmailSubject}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN DISPATCH WORKBENCH */}
      <section className="grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT: VISITOR FORM (Warm Paper) */}
        <div
          data-paper=""
          className="lg:col-span-6 px-6 sm:px-12 py-12 bg-[#f4f1ea]"
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto max-w-xl space-y-6"
          >
            {/* Role / Mission Selector */}
            <div className="space-y-2.5">
              <label className="block font-mono text-[12px] font-bold tracking-[0.16em] uppercase text-[#0f1217]/75">
                01 · Role or Mission Focus
              </label>
              <div className="flex flex-wrap gap-2">
                {MISSION_CHIPS.map((chip) => {
                  const selected = roleMission === chip.label;
                  return (
                    <button
                      key={chip.id}
                      type="button"
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
                  Phone Number *
                </label>
                <input
                  id="visitor-phone"
                  type="tel"
                  required
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
                Project Brief / Opportunity *
              </label>
              <textarea
                id="visitor-message"
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
                  {submitting ? "Dispatching..." : "Dispatch Automated Mail"}
                </span>
              </button>

              <a
                href={mailtoFallback}
                className="inline-flex items-center gap-2 rounded-full border border-[#0f1217]/25 px-5 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-[#0f1217] hover:bg-[#0f1217] hover:text-[#f4f1ea] transition-colors"
              >
                <Mail size={14} />
                <span>Open Mail Client</span>
              </a>
            </div>
          </form>
        </div>

        {/* RIGHT: DUAL-MODE LIVE CURL TERMINAL + LIVE HTML EMAIL PAYLOAD PREVIEW */}
        <div
          data-night=""
          className="lg:col-span-6 bg-[#0f1217] px-6 sm:px-12 py-12 text-[#f4f1ea]"
        >
          <div className="mx-auto max-w-2xl space-y-5">
            {/* Switcher Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex rounded-full border border-[#f4f1ea]/15 bg-[#151a24] p-1">
                <button
                  type="button"
                  onClick={() => setPreviewMode("curl")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.12em] transition cursor-pointer ${
                    previewMode === "curl"
                      ? "bg-[#f4f1ea] text-[#0f1217] font-bold"
                      : "text-[#f4f1ea]/70 hover:text-[#f4f1ea]"
                  }`}
                >
                  <Code2 size={13} />
                  <span>Live curl Terminal</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode("html")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.12em] transition cursor-pointer ${
                    previewMode === "html"
                      ? "bg-[var(--role-accent-night)] text-[#0f1217] font-bold"
                      : "text-[#f4f1ea]/70 hover:text-[#f4f1ea]"
                  }`}
                >
                  <Eye size={13} />
                  <span>HTML Email Preview</span>
                </button>
              </div>

              <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-[#f4f1ea]/75">
                Real-Time Sync
              </span>
            </div>

            {previewMode === "curl" ? (
              <div className="overflow-hidden rounded-2xl border border-[#f4f1ea]/15 bg-[#141923] shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#f4f1ea]/10 bg-[#1a202e] px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[12px] text-[#f4f1ea]/75 uppercase">
                    <Terminal size={11} />
                    <span>POST /api/contact</span>
                  </div>
                </div>

                {/* Live cURL request JSON */}
                <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-[#f4f1ea]/85">
                  <code>{`curl -X POST https://ojasvigoyal.dev/api/contact \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(payload, null, 2)}'`}</code>
                </pre>

                {/* Easter-Egg Mini Interactive Shell */}
                <div className="border-t border-[#f4f1ea]/12 bg-[#0b0e14] p-4 space-y-2 font-mono text-[12px]">
                  <div className="space-y-1 text-[#f4f1ea]/75 max-h-36 overflow-y-auto">
                    {cliLog.map((line, i) => (
                      <div
                        key={i}
                        className={
                          line.startsWith("$")
                            ? "text-[#f4f1ea]"
                            : line.startsWith("[")
                              ? "text-emerald-400"
                              : "text-[#f4f1ea]/75"
                        }
                      >
                        {line}
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={handleCliCommand}
                    className="flex items-center gap-2 pt-1"
                  >
                    <span style={{ color: "var(--role-accent-night)" }}>
                      $
                    </span>
                    <input
                      type="text"
                      value={cliInput}
                      onChange={(e) => setCliInput(e.target.value)}
                      placeholder="Type a shell command (help, roles, sudo hire ojasvi)..."
                      className="w-full bg-transparent text-xs text-[#f4f1ea] placeholder:text-[#f4f1ea]/30 focus:outline-none"
                    />
                  </form>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-[#f4f1ea]/15 bg-[#0b0e14] shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#f4f1ea]/10 bg-[#1a202e] px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[#f4f1ea]/70">
                  <span>Rendered HTML Email Payload</span>
                  <span style={{ color: "var(--role-accent-night)" }}>
                    LIVE SANDBOX
                  </span>
                </div>
                <iframe
                  title="Live HTML Email Payload Preview"
                  srcDoc={liveEmailHtml}
                  sandbox=""
                  className="h-[540px] w-full bg-[#0b0e14]"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f1ea] px-8 pt-32 font-mono text-xs uppercase">
          Initializing dispatch terminal...
        </div>
      }
    >
      <ContactConsoleContent />
    </Suspense>
  );
}

