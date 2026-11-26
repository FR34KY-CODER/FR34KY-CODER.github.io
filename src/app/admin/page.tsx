"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useCatalog } from "@/context/Catalog";
const sections = [
  "Movies",
  "Series",
  "Projects",
  "Songs",
  "City",
  "Password",
] as const;
type Section = (typeof sections)[number];
const movieFields = [
  "title",
  "year",
  "genre",
  "imdb",
  "poster",
  "setting",
  "summary",
];
const projectFields = [
  "title",
  "slug",
  "number",
  "subtitle",
  "year",
  "category",
  "summary",
  "clientBadge",
  "githubUrl",
  "liveUrl",
];
const labels: Record<string, string> = {
  imdb: "IMDb title ID",
  poster: "Poster URL or local path",
  setting: "Ticket setting",
  number: "Project number",
  clientBadge: "Client badge (optional)",
  githubUrl: "GitHub URL (optional)",
  liveUrl: "Live URL (optional)",
  art: "Album artwork URL or local path",
  timezone: "Time zone (IANA)",
  seconds: "Duration in seconds",
};
function lines(data: FormData, key: string) {
  return String(data.get(key) || "")
    .split(/\r?\n/)
    .map((v) => v.trim())
    .filter(Boolean);
}
function pair(line: string) {
  const divider = line.indexOf("|");
  if (divider < 1 || !line.slice(divider + 1).trim())
    throw Error("Use a vertical bar between the two values.");
  return [line.slice(0, divider).trim(), line.slice(divider + 1).trim()];
}
function ProjectDetails() {
  return (
    <fieldset>
      <legend>Case study details</legend>
      <div className="role-checks">
        {["ai", "ml", "ds", "backend"].map((r) => (
          <label key={r}>
            <input type="checkbox" name="roles" value={r} />
            {r.toUpperCase()}
          </label>
        ))}
      </div>
      <label className="check-field">
        <input type="checkbox" name="isClientEngagement" />
        Client engagement
      </label>
      <label>
        Storefront tone
        <select name="shopTone">
          {["ink", "brick", "stone", "red"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        Headline metric
        <input required name="metricValue" placeholder="12 metric views" />
      </label>
      <label>
        Metric label
        <input
          required
          name="metricLabel"
          placeholder="Retail inventory coverage"
        />
      </label>
      <label>
        Supporting metrics · one per line
        <textarea name="stats" placeholder="Data sources | 3" />
      </label>
      <label>
        Preview highlights · one per line
        <textarea name="highlights" />
      </label>
      <label>
        Case study sections · one per line
        <textarea
          name="groups"
          placeholder="Impact | First outcome | Second outcome"
        />
      </label>
      <label>
        Tags · one per line
        <textarea name="pills" />
      </label>
    </fieldset>
  );
}
async function request(action: string, body?: object | FormData) {
  const file = body instanceof FormData;
  const response = await fetch("/api/manage?action=" + action, {
    method: "POST",
    headers: file ? {} : { "Content-Type": "application/json" },
    body: file ? body : JSON.stringify(body || {}),
  });
  if (!response.headers.get("content-type")?.includes("json"))
    throw Error("Open the portfolio on its local Node server to manage it.");
  const result = await response.json();
  if (!response.ok) throw Error(result.error || "Request failed.");
  return result;
}
export default function Admin() {
  const [signed, setSigned] = useState<boolean | null>(null),
    [tab, setTab] = useState<Section>("Movies"),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  const { city, timezone, refresh } = useCatalog();
  useEffect(() => {
    request("status")
      .then((r) => setSigned(r.signedIn))
      .catch((e) => {
        setSigned(false);
        setMessage(e.message);
      });
  }, []);
  async function run(fn: () => Promise<void>) {
    setBusy(true);
    setMessage("");
    try {
      await fn();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Request failed.");
    } finally {
      setBusy(false);
    }
  }
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget,
      data = new FormData(form),
      values = Object.fromEntries(data);
    void run(async () => {
      if (!signed) {
        await request("login", values);
        setSigned(true);
        return;
      }
      let result;
      if (tab === "Songs") {
        const upload = new FormData();
        upload.set("file", data.get("file")!);
        const metadata = { ...values };
        delete metadata.file;
        upload.set("metadata", JSON.stringify(metadata));
        result = await request("song", upload);
      } else if (tab === "Projects") {
        const fields = Object.fromEntries(
          projectFields.filter((k) => values[k]).map((k) => [k, values[k]]),
        );
        const roles = data.getAll("roles");
        if (!roles.length) throw Error("Choose at least one engineering role.");
        result = await request("projects", {
          ...fields,
          roles,
          isClientEngagement: data.has("isClientEngagement"),
          shopTone: values.shopTone,
          headlineMetric: {
            value: values.metricValue,
            label: values.metricLabel,
          },
          stats: lines(data, "stats").map((v) => {
            const [label, value] = pair(v);
            return { label, value };
          }),
          groups: lines(data, "groups").map((v) => {
            const [title, list] = pair(v);
            return {
              title,
              items: list
                .split("|")
                .map((i) => i.trim())
                .filter(Boolean),
            };
          }),
          previewHighlights: lines(data, "highlights"),
          pills: lines(data, "pills"),
        });
      } else result = await request(tab.toLowerCase(), values);
      if (tab === "Password") setSigned(false);
      else await refresh();
      form.reset();
      setMessage(result.message);
    });
  }
  function field(key: string) {
    return (
      <label key={key}>
        {labels[key] || key}
        {key === "summary" ? (
          <textarea required name={key} />
        ) : (
          <input
            required={!["githubUrl", "liveUrl", "clientBadge"].includes(key)}
            name={key}
            defaultValue={
              key === "city" ? city : key === "timezone" ? timezone : undefined
            }
            type={key === "seconds" ? "number" : "text"}
            step="any"
          />
        )}
      </label>
    );
  }
  return (
    <section className="management">
      <div className="manage-inner">
        <p className="culture-kicker">Portfolio management</p>
        <header>
          <h1>{signed ? "Editor" : "Admin sign in"}</h1>
          {signed && (
            <button
              disabled={busy}
              onClick={() =>
                run(async () => {
                  await request("logout");
                  setSigned(false);
                })
              }
            >
              Sign out
            </button>
          )}
        </header>
        {signed && (
          <nav aria-label="Editor sections">
            {sections.map((t) => (
              <button
                key={t}
                aria-pressed={tab === t}
                onClick={() => {
                  setTab(t);
                  setMessage("");
                }}
              >
                {t}
              </button>
            ))}
          </nav>
        )}
        {signed === null ? (
          <p>Checking session…</p>
        ) : (
          <form key={signed ? tab : "login"} onSubmit={submit}>
            {!signed ? (
              <>
                <label>
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="username"
                  />
                </label>
                <label>
                  Password
                  <input
                    required
                    type="password"
                    name="password"
                    autoComplete="current-password"
                  />
                </label>
              </>
            ) : tab === "Password" ? (
              <>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() =>
                    run(async () => setMessage((await request("code")).message))
                  }
                >
                  Email a verification code
                </button>
                <label>
                  Six-digit code
                  <input
                    required
                    name="code"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    autoComplete="one-time-code"
                  />
                </label>
                <label>
                  New password
                  <input
                    required
                    type="password"
                    name="password"
                    minLength={12}
                    maxLength={512}
                    autoComplete="new-password"
                  />
                </label>
              </>
            ) : tab === "Projects" ? (
              <>
                {projectFields.map(field)}
                <ProjectDetails />
              </>
            ) : tab === "Songs" ? (
              <>
                {[
                  "title",
                  "artist",
                  "credit",
                  "album",
                  "art",
                  "year",
                  "seconds",
                ].map(field)}
                <label>
                  MP3 file · up to 32 MB
                  <input
                    required
                    name="file"
                    type="file"
                    accept="audio/mpeg,.mp3"
                  />
                </label>
              </>
            ) : tab === "City" ? (
              ["city", "timezone"].map(field)
            ) : (
              movieFields.map(field)
            )}
            <button disabled={busy} type="submit">
              {busy
                ? "Working…"
                : !signed
                  ? "Sign in"
                  : tab === "Password"
                    ? "Change password"
                    : tab === "City"
                      ? "Save city"
                      : "Add " +
                        (
                          {
                            Movies: "movie",
                            Series: "series",
                            Songs: "song",
                            Projects: "project",
                          } as const
                        )[tab]}
            </button>
          </form>
        )}
        <p role="status">{message}</p>
      </div>
    </section>
  );
}
