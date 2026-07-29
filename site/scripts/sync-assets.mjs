// Copies canonical /assets/images into site/public/images before dev/build.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(here, "..", "..", "assets", "images");
const dest = path.resolve(here, "..", "public", "images");

if (fs.existsSync(src)) {
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
  console.log(`synced assets/images -> public/images`);
}
