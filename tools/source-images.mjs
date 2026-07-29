// Image sourcing helper. Usage:
//   node tools/source-images.mjs commons "<query>"      — Wikimedia Commons candidates + licenses
//   node tools/source-images.mjs pexels "<query>"       — Pexels candidates (Pexels License)
//   node tools/source-images.mjs unsplash "<query>"     — Unsplash candidates (Unsplash License)
//   node tools/source-images.mjs download "<url>" "<dest>" [download_location]
// Keys are read from .env at the repo root; never hardcoded here.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const env = Object.fromEntries(
  fs
    .readFileSync(path.join(root, "..", ".env"), "utf8")
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]),
);

const [cmd, arg1, arg2, arg3] = process.argv.slice(2);
const UA = { "User-Agent": "PrestigeHolidays4U-site-build/1.0 (content sourcing; contact: site owner)" };

const OK_LICENSES = /^(cc0|cc[- ]by(?:[- ]sa)?(?:[- ]\d\.\d)?|public domain|pd)/i;

async function commons(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*" +
    "&generator=search&gsrsearch=" + encodeURIComponent(query) +
    "&gsrnamespace=6&gsrlimit=10&prop=imageinfo" +
    "&iiprop=url|extmetadata|size|mime&iiurlwidth=1600";
  const res = await fetch(url, { headers: UA });
  const data = await res.json();
  const pages = Object.values(data?.query?.pages ?? {});
  const out = pages
    .map((p) => {
      const ii = p.imageinfo?.[0];
      if (!ii || !/image\/(jpeg|png)/.test(ii.mime)) return null;
      const m = ii.extmetadata ?? {};
      const license = m.LicenseShortName?.value ?? "unknown";
      return {
        title: p.title,
        license,
        licenseOk: OK_LICENSES.test(license),
        artist: (m.Artist?.value ?? "").replace(/<[^>]+>/g, "").trim().slice(0, 80),
        desc: (m.ImageDescription?.value ?? "").replace(/<[^>]+>/g, "").trim().slice(0, 160),
        width: ii.width,
        height: ii.height,
        thumbUrl: ii.thumburl,
        pageUrl: ii.descriptionurl,
      };
    })
    .filter(Boolean)
    .filter((c) => c.width >= 1200);
  console.log(JSON.stringify(out, null, 1));
}

async function pexelsVideo(query) {
  const res = await fetch(
    `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape`,
    { headers: { Authorization: env.PEXELS_API_KEY, ...UA } },
  );
  if (res.status === 429) { console.error("RATE_LIMIT pexels"); process.exit(2); }
  const data = await res.json();
  console.log(
    JSON.stringify(
      (data.videos ?? []).map((v) => ({
        id: v.id,
        duration: v.duration,
        pageUrl: v.url,
        user: v.user?.name,
        w: v.width, h: v.height,
        files: v.video_files
          .filter((f) => f.file_type === "video/mp4")
          .map((f) => ({ quality: f.quality, w: f.width, h: f.height, link: f.link }))
          .sort((a, b) => (a.w ?? 0) - (b.w ?? 0)),
        poster: v.image,
      })),
      null, 1,
    ),
  );
}

async function pexels(query) {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`,
    { headers: { Authorization: env.PEXELS_API_KEY, ...UA } },
  );
  if (res.status === 429) { console.error("RATE_LIMIT pexels"); process.exit(2); }
  const data = await res.json();
  console.log(
    JSON.stringify(
      (data.photos ?? []).map((p) => ({
        id: p.id,
        alt: p.alt,
        photographer: p.photographer,
        pageUrl: p.url,
        dl: p.src.large2x,
        w: p.width, h: p.height,
      })),
      null, 1,
    ),
  );
}

async function unsplash(query) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape&client_id=${env.UNSPLASH_ACCESS_KEY}`,
    { headers: UA },
  );
  if (res.status === 403 || res.status === 429) { console.error("RATE_LIMIT unsplash"); process.exit(2); }
  const data = await res.json();
  console.log(
    JSON.stringify(
      (data.results ?? []).map((p) => ({
        id: p.id,
        desc: p.description ?? p.alt_description,
        photographer: p.user?.name,
        pageUrl: p.links?.html,
        dl: p.urls.raw + "&w=1600&q=80&fm=jpg",
        downloadLocation: p.links?.download_location,
        w: p.width, h: p.height,
      })),
      null, 1,
    ),
  );
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function download(url, dest, downloadLocation) {
  // Unsplash API guideline: ping download_location when using a photo.
  if (downloadLocation) {
    await fetch(`${downloadLocation}?client_id=${env.UNSPLASH_ACCESS_KEY}`, { headers: UA }).catch(() => {});
  }
  let res = await fetch(url, { headers: UA });
  if (res.status === 429) {
    // Commons burst throttle: wait politely and retry once.
    await sleep(20000);
    res = await fetch(url, { headers: UA });
  }
  if (!res.ok) { console.error("DOWNLOAD_FAIL " + res.status); process.exit(1); }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  console.log(`saved ${dest} (${Math.round(buf.length / 1024)} KB)`);
}

async function searchJson(source, query) {
  // Re-run a search and return parsed candidates by capturing console.log.
  const orig = console.log;
  let captured = "";
  console.log = (s) => { captured = s; };
  await commands[source](query);
  console.log = orig;
  return JSON.parse(captured);
}

// pick <commons|pexels|unsplash> "<query>" <index> <dest> — download candidate N, print its metadata.
async function pick(source, query, indexStr, dest) {
  const idx = Number(indexStr);
  const list = await searchJson(source, query);
  const c = list[idx];
  if (!c) { console.error("NO_CANDIDATE " + idx); process.exit(1); }
  if (source === "commons" && !c.licenseOk) { console.error("LICENSE_NOT_FREE " + c.license); process.exit(1); }
  const url = c.thumbUrl ?? c.dl;
  await download(url, dest, c.downloadLocation);
  console.log(JSON.stringify({ source, ...c }, null, 1));
}

const commands = { commons, pexels, unsplash, download, pick, pexelsVideo };
await commands[cmd](arg1, arg2, arg3, process.argv[6]);

