import { randomBytes, scryptSync } from "node:crypto";
import { database } from "../src/server/database.mjs";
import { readFileSync } from "node:fs";
const password = readFileSync(0, "utf8").trimEnd();
if (password.length < 12)
  throw Error(
    "Supply an initial password of at least 12 characters via stdin.",
  );
const salt = randomBytes(16).toString("hex");
const result = database()
  .prepare("INSERT OR IGNORE INTO admin VALUES(1,?,?)")
  .run(salt, scryptSync(password, salt, 64).toString("hex"));
console.log(
  result.changes ? "Local admin initialized." : "Local admin already exists.",
);
