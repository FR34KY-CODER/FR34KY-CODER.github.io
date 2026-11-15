import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import { z } from "zod";
import {
  buildContactEmailHtml,
  buildContactEmailSubject,
} from "@/lib/emailTemplate";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().email("Please provide a valid email address").max(180),
  phone: z
    .string()
    .trim()
    .min(6, "Please provide a valid phone number")
    .max(32),
  company: z.string().trim().max(140).optional().default(""),
  roleMission: z.string().trim().max(120).optional().default(""),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(4000),
});

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: parsed.error.issues[0]?.message ?? "Validation failed.",
      },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const toEmail = process.env.CONTACT_TO_EMAIL || "ojasvigoyal275@gmail.com";
  const fromName = process.env.CONTACT_FROM_NAME || "Ojasvi Goyal Portfolio";
  const subject = buildContactEmailSubject(data);
  const html = buildContactEmailHtml(data);
  const textFallback = [
    "The Visitor is interested in contacting you!",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Company: ${data.company || "Independent / Individual"}`,
    `Role / Mission: ${data.roleMission || "Multi-Role Inquiry"}`,
    "",
    data.message,
  ].join("\n");

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const resendKey = process.env.RESEND_API_KEY;

  // Primary: Nodemailer SMTP (e.g. Gmail App Password)
  if (smtpUser && smtpPass && smtpPass !== "your_gmail_app_password_here") {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT || 465),
        secure: process.env.SMTP_SECURE !== "false",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${fromName}" <${smtpUser}>`,
        to: toEmail,
        replyTo: data.email,
        subject,
        text: textFallback,
        html,
      });

      return NextResponse.json({
        ok: true,
        provider: "smtp",
        message: "200 OK · HTML email dispatched via SMTP.",
      });
    } catch (err) {
      console.error("Nodemailer SMTP dispatch failed:", err);
      if (!resendKey) {
        return NextResponse.json(
          {
            ok: false,
            message: "SMTP delivery failed. Check SMTP credentials in .env.local.",
          },
          { status: 502 }
        );
      }
    }
  }

  // Fallback: Resend transactional API
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const result = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: [toEmail],
        replyTo: data.email,
        subject,
        html,
        text: textFallback,
      });

      if (result.error) {
        return NextResponse.json(
          { ok: false, message: result.error.message },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        provider: "resend",
        message: "200 OK · HTML email dispatched via Resend.",
      });
    } catch (err) {
      console.error("Resend dispatch failed:", err);
      return NextResponse.json(
        { ok: false, message: "Resend API dispatch failed." },
        { status: 502 }
      );
    }
  }

  return NextResponse.json(
    {
      ok: false,
      needsConfig: true,
      message:
        "Mail transport is not configured yet. Add SMTP_USER/SMTP_PASS or RESEND_API_KEY in .env.local (see .env.example).",
    },
    { status: 503 }
  );
}

