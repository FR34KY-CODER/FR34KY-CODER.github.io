import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
export const owner = "ojasvigoyal275@gmail.com";
let connection;
export function database() {
  if (connection) return connection;
  const folder =
    process.env.PORTFOLIO_DATA_DIR || join(process.cwd(), ".portfolio");
  mkdirSync(folder, { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(join(folder, "portfolio.sqlite"));
  db.exec(`
    PRAGMA journal_mode=WAL;
    PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY CHECK(id=1), salt TEXT NOT NULL, hash TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS codes (session TEXT PRIMARY KEY, salt TEXT, hash TEXT, expires INTEGER, attempts INTEGER);
    CREATE TABLE IF NOT EXISTS limits (name TEXT PRIMARY KEY, n INTEGER, expires INTEGER);
    CREATE TABLE IF NOT EXISTS content (kind TEXT, id TEXT, json TEXT NOT NULL, PRIMARY KEY(kind,id));
    CREATE TABLE IF NOT EXISTS audio (id TEXT PRIMARY KEY, bytes BLOB NOT NULL);
  `);
  connection = db;
  return db;
}
