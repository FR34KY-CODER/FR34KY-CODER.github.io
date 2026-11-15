export interface ContactPayloadInput {
  name: string;
  email: string;
  phone: string;
  company?: string;
  roleMission?: string;
  message: string;
}

function escapeHtml(raw: string): string {
  return raw
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getRoleAccent(mission?: string): string {
  const normalized = (mission ?? "").toLowerCase();
  if (normalized.includes("backend")) return "#FFB547";
  if (normalized.includes("data")) return "#22D3EE";
  if (normalized.includes("ml") || normalized.includes("machine")) return "#A78BFA";
  return "#EA1D0F";
}

export function buildContactEmailSubject(input: ContactPayloadInput): string {
  const org = input.company?.trim() ? ` · ${input.company.trim()}` : "";
  return `The Visitor is interested in contacting you! — ${input.name.trim()}${org}`;
}

export function buildContactEmailHtml(input: ContactPayloadInput): string {
  const name = escapeHtml(input.name.trim());
  const email = escapeHtml(input.email.trim());
  const phone = escapeHtml(input.phone.trim());
  const company = input.company?.trim() ? escapeHtml(input.company.trim()) : "Independent / Individual";
  const mission = input.roleMission?.trim()
    ? escapeHtml(input.roleMission.trim())
    : "Multi-Role Inquiry";
  const messageHtml = escapeHtml(input.message.trim()).replaceAll("\n", "<br/>");
  const accent = getRoleAccent(input.roleMission);
  const timestamp = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Visitor is interested in contacting you!</title>
</head>
<body style="margin:0;padding:24px 12px;background-color:#0b0d12;font-family:'Helvetica Neue',Arial,sans-serif;color:#f4f1ea;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:0 auto;border-collapse:collapse;border-radius:14px;overflow:hidden;border:1px solid #2b3341;background-color:#0f1217;">
    <tr>
      <td style="height:5px;background:linear-gradient(90deg,#ea1d0f 0%,#ffb547 35%,#22d3ee 70%,#a78bfa 100%);"></td>
    </tr>
    <tr>
      <td style="padding:28px 28px 22px;background-color:#f4f1ea;color:#16130f;border-bottom:1px solid #ded8cc;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6f685d;">
              PORTFOLIO SIGNAL · FR34KY-CODER
            </td>
            <td align="right" style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.08em;color:#157f3e;font-weight:700;">
              ● LIVE DISPATCH
            </td>
          </tr>
        </table>
        <h1 style="margin:14px 0 8px;font-size:24px;line-height:1.15;font-weight:900;letter-spacing:-0.02em;color:#16130f;">
          The Visitor is interested in contacting you!
        </h1>
        <p style="margin:0;font-size:14px;line-height:1.5;color:#4a443c;">
          A new inquiry just landed from <strong style="color:#16130f;">${name}</strong> via your interactive portfolio terminal.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 28px;">
        <div style="margin-bottom:20px;">
          <span style="display:inline-block;padding:6px 12px;border-radius:999px;background-color:${accent};color:#0f1217;font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">
            ROLE / MISSION: ${mission}
          </span>
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background-color:#1c222c;border:1px solid #2b3341;border-radius:10px;overflow:hidden;">
          <tr>
            <td style="padding:12px 16px;border-bottom:1px solid #2b3341;width:36%;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8d96a6;">
              VISITOR NAME
            </td>
            <td style="padding:12px 16px;border-bottom:1px solid #2b3341;font-size:14px;font-weight:700;color:#f4f1ea;">
              ${name}
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;border-bottom:1px solid #2b3341;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8d96a6;">
              EMAIL ADDRESS
            </td>
            <td style="padding:12px 16px;border-bottom:1px solid #2b3341;font-size:14px;">
              <a href="mailto:${email}" style="color:${accent};text-decoration:none;font-weight:600;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;border-bottom:1px solid #2b3341;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8d96a6;">
              PHONE NUMBER
            </td>
            <td style="padding:12px 16px;border-bottom:1px solid #2b3341;font-size:14px;">
              <a href="tel:${phone}" style="color:#f4f1ea;text-decoration:none;font-family:'Courier New',monospace;">${phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8d96a6;">
              COMPANY / ORG
            </td>
            <td style="padding:12px 16px;font-size:14px;color:#f4f1ea;">
              ${company}
            </td>
          </tr>
        </table>
        <div style="margin-top:20px;padding:18px;border-radius:10px;background-color:#151a22;border-left:4px solid ${accent};">
          <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8d96a6;margin-bottom:8px;">
            $ cat visitor_message.txt
          </div>
          <div style="font-size:15px;line-height:1.65;color:#f4f1ea;">
            ${messageHtml}
          </div>
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:24px;">
          <tr>
            <td>
              <a href="mailto:${email}?subject=Re%3A%20Portfolio%20Inquiry%20(${encodeURIComponent(input.roleMission?.trim() || "Ojasvi Goyal")})" style="display:inline-block;padding:12px 22px;border-radius:999px;background-color:#ea1d0f;color:#f4f1ea;font-family:'Courier New',monospace;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;">
                REPLY TO ${name.toUpperCase()} →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 28px;border-top:1px solid #2b3341;font-family:'Courier New',monospace;font-size:11px;color:#8d96a6;">
        Ojasvi Goyal (FR34KY-CODER) · Jaipur, IN · Received ${escapeHtml(timestamp)} IST
      </td>
    </tr>
  </table>
</body>
</html>`;
}

