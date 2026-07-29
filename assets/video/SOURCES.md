# Hero Video Source — Home Page

| File | Depicts | Source | License | Author |
|---|---|---|---|---|
| `hero.mp4` | View from an airplane window at sunset, wing visible in silhouette against a pink-to-blue sky — a general travel/journey feeling, not tied to any one destination | [Pexels video #3740041](https://www.pexels.com/video/view-of-sunset-from-an-airplane-in-flight-3740041/) | Pexels License (free use, no attribution required) | K. |
| `hero-poster.jpg` | The official Pexels poster frame for the same clip — twilight through airplane cabin windows, wing visible mid-frame | Pexels (video thumbnail, same source as above) | Pexels License | K. |

## Technical notes

- Source clip: 11s, downloaded at the `sd_960_540` tier (960×540, ~508 KB) —
  well under the 3 MB budget. The `hd_1280_720` tier was tested first and
  came in at ~3.5 MB, over budget; no local ffmpeg was available to
  re-encode a higher-resolution source down, so the next-smallest official
  Pexels rendition was used instead. Quality at 960×540, upscaled by the
  browser to fill a hero banner, is acceptable for a background loop.
- Poster image is Pexels' own thumbnail for this exact video (not a
  separately sourced photo), guaranteeing the fallback frame matches what
  autoplay would have shown.
- Implementation: muted, autoplay, loop, `playsinline`; `poster` attribute
  set to `hero-poster.jpg`. `prefers-reduced-motion: reduce` swaps the
  `<video>` for a static `<img>` of the same poster — no video element is
  mounted at all in that case, so nothing downloads or plays. Never
  autoplays with sound (the `muted` attribute is mandatory for autoplay in
  every modern browser regardless, but it's also the correct choice here).
