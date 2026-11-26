import { NextRequest, NextResponse } from "next/server";
import {
  randomBytes,
  randomInt,
  createHash,
  scrypt,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import nodemailer from "nodemailer";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { database, owner } from "@/server/database.mjs";
import { PROJECTS } from "@/data/projects";

const derive = promisify(scrypt);
const digest = (value: string) =>
  createHash("sha256").update(value).digest("hex");
const salt = () => randomBytes(16).toString("hex");
const str = z.string().trim().min(1).max(5000);
const link = z
  .string()
  .url()
  .regex(/^https?:\/\//);
const art = z.string().regex(/^(?:https:\/\/[^\s]+|\/(?!\/)[^\\\s]+)$/);
const stat = z.object({ label: str, value: str });
const project = z.object({
  slug: str.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  number: str,
  title: str,
  subtitle: str,
  year: str,
  category: str,
  roles: z.array(z.enum(["ds", "ai", "ml", "backend"])).nonempty(),
  isClientEngagement: z.boolean(),
  clientBadge: str.optional(),
  shopTone: z.enum(["ink", "brick", "stone", "red"]),
  headlineMetric: stat,
  stats: z.array(stat),
  summary: str,
  previewHighlights: z.array(str),
  groups: z.array(z.object({ title: str, items: z.array(str) })),
  pills: z.array(str),
  githubUrl: link.optional(),
  liveUrl: link.optional(),
});
const screen = z.object({
  title: str,
  poster: art,
  imdb: str.regex(/^tt\d+$/),
  year: str,
  genre: str,
  summary: str,
  setting: str,
});
const song = z.object({
  title: str,
  artist: str,
  album: str,
  credit: str,
  year: str,
  art,
  seconds: z.coerce.number().positive().finite(),
});
const reply = (body: object, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
function allowed(name: string, max: number, ms: number) {
  const db = database(),
    now = Date.now();
  db.prepare("DELETE FROM limits WHERE expires<=?").run(now);
  const result = db
    .prepare(
      "INSERT INTO limits VALUES(?,1,?) ON CONFLICT(name) DO UPDATE SET n=n+1 WHERE n<?",
    )
    .run(name, now + ms, max);
  return !!result.changes;
}
async function matches(value: string, row: { salt: string; hash: string }) {
  const key = (await derive(value, row.salt, 64)) as Buffer;
  return timingSafeEqual(key, Buffer.from(row.hash, "hex"));
}
export async function POST(req: NextRequest) {
  if (
    req.headers.get("origin") !== req.nextUrl.origin &&
    req.headers.get("origin") !==
      req.nextUrl.protocol + "//" + req.headers.get("host")
  )
    return reply({ error: "Invalid origin." }, 403);
  const db = database(),
    now = Date.now(),
    token = digest(req.cookies.get("folio_session")?.value || "");
  const session = db
    .prepare("SELECT 1 FROM sessions WHERE token=? AND expires>?")
    .get(token, now);
  const action = req.nextUrl.searchParams.get("action");
  try {
    if (action === "catalog") {
      const rows = db
        .prepare("SELECT kind,json FROM content ORDER BY rowid")
        .all() as { kind: string; json: string }[];
      return reply({
        city: "Jaipur",
        timezone: "Asia/Kolkata",
        ...Object.fromEntries(
          rows
            .filter((r) => r.kind === "timezone")
            .map((r) => [r.kind, JSON.parse(r.json)]),
        ),
        ...Object.fromEntries(
          ["projects", "movies", "series", "tracks"].map((k) => [
            k,
            rows.filter((r) => r.kind === k).map((r) => JSON.parse(r.json)),
          ]),
        ),
        ...(rows.some((r) => r.kind === "city")
          ? { city: JSON.parse(rows.find((r) => r.kind === "city")!.json) }
          : {}),
      });
    }
    if (action === "status") return reply({ signedIn: !!session });
    if (action === "login") {
      if (!allowed("login", 12, 600000))
        return reply(
          { error: "Too many attempts. Try again in ten minutes." },
          429,
        );
      const { email, password } = await req.json(),
        row = db.prepare("SELECT salt,hash FROM admin WHERE id=1").get() as
          { salt: string; hash: string } | undefined;
      if (
        email !== owner ||
        typeof password !== "string" ||
        password.length > 512 ||
        !row ||
        !(await matches(password, row))
      )
        return reply({ error: "Incorrect credentials." }, 401);
      const raw = randomBytes(32).toString("hex");
      db.prepare("DELETE FROM sessions WHERE expires<=?").run(now);
      if (
        !db
          .prepare(
            "INSERT INTO sessions SELECT ?,? FROM admin WHERE id=1 AND hash=?",
          )
          .run(digest(raw), now + 8 * 3600000, row.hash).changes
      )
        return reply({ error: "Please sign in again." }, 401);
      const res = reply({ signedIn: true });
      res.cookies.set("folio_session", raw, {
        httpOnly: true,
        sameSite: "strict",
        secure: req.nextUrl.protocol === "https:",
        path: "/",
        maxAge: 28800,
      });
      return res;
    }
    if (!session) return reply({ error: "Sign in to continue." }, 401);
    if (action === "logout") {
      db.prepare("DELETE FROM sessions WHERE token=?").run(token);
      const res = reply({ signedIn: false });
      res.cookies.delete("folio_session");
      return res;
    }
    if (action === "code") {
      if (!allowed("mail", 3, 600000))
        return reply({ error: "Try again in ten minutes." }, 429);
      if (!process.env.SMTP_USER || !process.env.SMTP_PASS)
        return reply({ error: "Email delivery is unavailable." }, 503);
      const code = String(randomInt(100000, 1000000)),
        s = salt(),
        hash = ((await derive(code, s, 64)) as Buffer).toString("hex");
      db.prepare("INSERT OR REPLACE INTO codes VALUES(?,?,?,?,0)").run(
        token,
        s,
        hash,
        now + 600000,
      );
      try {
        await nodemailer
          .createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT || 465),
            secure: process.env.SMTP_SECURE !== "false",
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
          })
          .sendMail({
            from: process.env.SMTP_USER,
            to: owner,
            subject: "Portfolio password change",
            text:
              "Your password change code is " +
              code +
              ". It expires in 10 minutes.",
          });
      } catch {
        db.prepare("DELETE FROM codes WHERE session=? AND hash=?").run(
          token,
          hash,
        );
        return reply(
          { error: "Email delivery failed. Check the SMTP settings." },
          503,
        );
      }
      return reply({ message: "Code sent. Check your email." });
    }
    if (action === "password") {
      const { code, password } = await req.json();
      if (
        !/^\d{6}$/.test(code) ||
        typeof password !== "string" ||
        password.length < 12 ||
        password.length > 512
      )
        return reply(
          {
            error: "Enter six digits and a new password of 12–512 characters.",
          },
          400,
        );
      const row = db
        .prepare(
          "UPDATE codes SET attempts=attempts+1 WHERE session=? AND expires>? AND attempts<5 RETURNING salt,hash",
        )
        .get(token, now) as { salt: string; hash: string } | undefined;
      if (!row || !(await matches(String(code), row)))
        return reply({ error: "Invalid or expired code." }, 400);
      const s = salt(),
        hash = ((await derive(password, s, 64)) as Buffer).toString("hex");
      db.exec("BEGIN IMMEDIATE");
      try {
        if (
          !db
            .prepare(
              "DELETE FROM codes WHERE session=? AND hash=? AND expires>?",
            )
            .run(token, row.hash, Date.now()).changes
        ) {
          db.exec("ROLLBACK");
          return reply({ error: "Request a fresh code." }, 400);
        }
        db.prepare("UPDATE admin SET salt=?,hash=? WHERE id=1").run(s, hash);
        db.exec("DELETE FROM sessions; DELETE FROM codes; COMMIT");
      } catch (e) {
        db.exec("ROLLBACK");
        throw e;
      }
      const res = reply({ message: "Password changed. Sign in again." });
      res.cookies.delete("folio_session");
      return res;
    }
    if (action === "song") {
      const length = Number(req.headers.get("content-length"));
      if (!length || length > 32 * 1024 * 1024)
        return reply({ error: "Choose an MP3 smaller than 32 MB." }, 413);
      const form = await req.formData(),
        file = form.get("file"),
        meta = song.parse(JSON.parse(String(form.get("metadata"))));
      if (!(file instanceof File) || !file.size)
        return reply({ error: "Choose an MP3." }, 400);
      const bytes = Buffer.from(await file.arrayBuffer());
      if (
        bytes.toString("ascii", 0, 3) !== "ID3" &&
        !(bytes[0] === 255 && (bytes[1] & 224) === 224)
      )
        return reply({ error: "Invalid MP3." }, 400);
      const id = randomBytes(16).toString("hex");
      db.exec("BEGIN IMMEDIATE");
      try {
        db.prepare("INSERT INTO audio VALUES(?,?)").run(id, bytes);
        db.prepare("INSERT INTO content VALUES('tracks',?,?)").run(
          id,
          JSON.stringify({
            ...meta,
            kind: "Library",
            src: "/api/audio/" + id,
            url: "",
          }),
        );
        db.exec("COMMIT");
      } catch (e) {
        db.exec("ROLLBACK");
        throw e;
      }
      return reply({ message: "Track added." }, 201);
    }
    const body = await req.json();
    if (action === "city") {
      const city = str.max(70).parse(body.city),
        zone = str.max(80).parse(body.timezone);
      try {
        new Intl.DateTimeFormat("en", { timeZone: zone });
      } catch {
        return reply({ error: "Enter a valid IANA time zone." }, 400);
      }
      db.prepare(
        "INSERT OR REPLACE INTO content VALUES('timezone','timezone',?)",
      ).run(JSON.stringify(zone));
      db.prepare("INSERT OR REPLACE INTO content VALUES('city','city',?)").run(
        JSON.stringify(city),
      );
    } else if (action === "projects") {
      const p = project.parse(body);
      if (PROJECTS.some((v) => v.slug === p.slug))
        return reply({ error: "This slug already exists." }, 409);
      db.prepare("INSERT INTO content VALUES('projects',?,?)").run(
        p.slug,
        JSON.stringify(p),
      );
      revalidatePath("/work/" + p.slug);
    } else if (action === "movies" || action === "series") {
      const m = screen.parse(body);
      db.prepare("INSERT INTO content VALUES(?,?,?)").run(
        action,
        m.imdb,
        JSON.stringify([
          m.title,
          m.poster,
          m.imdb,
          m.year,
          m.genre,
          m.summary,
          m.setting,
        ]),
      );
    } else return reply({ error: "Unknown action." }, 404);
    return reply({ message: "Saved." });
  } catch (e) {
    if (e instanceof z.ZodError)
      return reply(
        {
          error: e.errors
            .map((x) => x.path.join(".") + " " + x.message)
            .join(", "),
        },
        400,
      );
    if (e instanceof SyntaxError) return reply({ error: "Invalid JSON." }, 400);
    if (String(e).includes("UNIQUE"))
      return reply({ error: "This item already exists." }, 409);
    return reply({ error: "The request could not be saved." }, 400);
  }
}
