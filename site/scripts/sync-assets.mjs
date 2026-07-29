// Copies canonical /assets/images into site/public/images before dev/build.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const imgSrc = path.resolve(here, "..", "..", "assets", "images");
const imgDest = path.resolve(here, "..", "public", "images");
const videoSrc = path.resolve(here, "..", "..", "assets", "video");
const videoDest = path.resolve(here, "..", "public", "video");

if (fs.existsSync(imgSrc)) {
  fs.mkdirSync(imgDest, { recursive: true });
  fs.cpSync(imgSrc, imgDest, { recursive: true });
  console.log(`synced assets/images -> public/images`);
}
if (fs.existsSync(videoSrc)) {
  fs.mkdirSync(videoDest, { recursive: true });
  fs.cpSync(videoSrc, videoDest, { recursive: true });
  console.log(`synced assets/video -> public/video`);
}
