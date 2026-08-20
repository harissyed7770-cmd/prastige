// Copies canonical /assets/<folder> into site/public/<folder> before dev/build.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const assetsRoot = path.resolve(here, "..", "..", "assets");
const publicRoot = path.resolve(here, "..", "public");

const FOLDERS = ["images", "video", "logo", "og"];

for (const folder of FOLDERS) {
  const src = path.join(assetsRoot, folder);
  const dest = path.join(publicRoot, folder);
  if (fs.existsSync(src)) {
    fs.mkdirSync(dest, { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
    console.log(`synced assets/${folder} -> public/${folder}`);
  }
}
