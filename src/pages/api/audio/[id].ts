import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "@/server/database.mjs";
export const config = { api: { responseLimit: false } };
export default function audio(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    res.status(405).end();
    return;
  }
  const id = req.query.id;
  if (typeof id !== "string" || !/^[a-f0-9]{32}$/.test(id)) {
    res.status(404).end();
    return;
  }
  const db = database(),
    row = db
      .prepare("SELECT length(bytes) AS size FROM audio WHERE id=?")
      .get(id);
  if (!row) {
    res.status(404).end();
    return;
  }
  const size = Number(row.size),
    range = req.headers.range;
  let start = 0,
    end = size - 1;
  if (range) {
    const match = range.match(/^bytes=(\d*)-(\d*)$/);
    if (match && (match[1] || match[2])) {
      start = match[1]
        ? Number(match[1])
        : Math.max(0, size - Number(match[2]));
      if (match[1] && match[2]) end = Math.min(end, Number(match[2]));
    } else start = size;
    if (start > end || start >= size) {
      res.setHeader("Content-Range", "bytes */" + size);
      res.status(416).end();
      return;
    }
    res.setHeader("Content-Range", `bytes ${start}-${end}/${size}`);
  }
  res.setHeader("Accept-Ranges", "bytes");
  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Content-Length", end - start + 1);
  res.status(range ? 206 : 200);
  if (req.method === "HEAD") {
    res.end();
    return;
  }
  const rowBytes = db
    .prepare("SELECT substr(bytes,?,?) AS chunk FROM audio WHERE id=?")
    .get(start + 1, end - start + 1, id)!;
  res.end(Buffer.from(rowBytes.chunk as Uint8Array));
}
