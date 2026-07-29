# Design System — Prestige Holidays 4U

For a small, warm, trustworthy travel agency. Not a corporate OTA: no cold
blues, no dense data-grid layouts, no dark patterns. The feel is "a
well-travelled friend's recommendation" — warm paper tones, deep sea-teal,
one sunset accent, generous whitespace.

Accessibility baseline: **WCAG 2.1 AA.** Every text/background pair listed
below was computed (WCAG relative-luminance formula) and passes ≥ 4.5:1;
ratios are given per pair. Tailwind theme config must consume these tokens —
**no hardcoded hex in components.**

---

## 1. Color tokens

### Primary — Deep Sea Teal
The brand workhorse: nav, links, buttons, headings on light.

| Token | Hex | Use |
|---|---|---|
| `primary-700` | `#0A4540` | Hover/active, headings on cream — 10.06:1 on cream |
| `primary-600` | `#0E5A54` | **Base.** Buttons, links, icons — 8.05:1 on white; white text on it 8.05:1 |
| `primary-300` | `#7FB5AF` | Decorative only (borders, illustrations) — never text |
| `primary-100` | `#DFF2EE` | Tint backgrounds (badges, section bands) — pair with `primary-700` text (9.32:1) |

### Secondary — Warm Paper
Backgrounds; the site should feel cream-warm, not clinical white.

| Token | Hex | Use |
|---|---|---|
| `paper-0` | `#FFFFFF` | Cards, form fields |
| `paper-50` | `#FAF6EF` | **Page background** (cream) |
| `paper-100` | `#F1EAE0` | Alternating section bands, card hover |
| `paper-200` | `#DED4C4` | Hairline borders, dividers — decorative only |

### Accent — Sunset Terracotta
Sparingly: primary CTAs ("Enquire on WhatsApp"), price highlights, one per
viewport-height maximum.

| Token | Hex | Use |
|---|---|---|
| `accent-700` | `#93390F` | Text-level accent, hover — 7.41:1 on white, 6.88:1 on cream |
| `accent-600` | `#A8431B` | **Base.** CTA buttons — white text on it 6.03:1 |
| `accent-100` | `#FBEADF` | Tint background — pair with `accent-700` text (6.33:1) |

### Neutrals — Warm Ink
Warm-toned grays (brown-leaning, matching the paper).

| Token | Hex | Use |
|---|---|---|
| `ink-900` | `#2A2620` | Body text, headings — 15.04:1 on white, 13.96:1 on cream |
| `ink-600` | `#57503F` | Secondary/muted text, captions — 8.00:1 on white, 7.43:1 on cream |
| `ink-300` | `#B5AC9C` | Disabled states, placeholder — decorative/disabled only, not body text |

### Feedback

| Token | Hex | Use |
|---|---|---|
| `success-600` | `#1B6B41` | Form success text — 6.51:1 on white; on `success-100` tint 5.66:1 |
| `success-100` | `#E3F3E9` | Success tint background |
| `warning-700` | `#7A5200` | Warning text — 6.92:1 on white; on `warning-100` tint 6.43:1 |
| `warning-100` | `#FFF6E0` | Warning tint background |

### WhatsApp
`whatsapp` = `#25D366` — brand-fixed, **icon/logo use only**, never as a text
color or text background (fails AA). The WhatsApp button surface is
`primary-600` or `accent-600` with the glyph in `#25D366`/white.

### Contrast rules

- Body text: `ink-900` or `ink-600` only.
- Text on photos: always over a gradient scrim (`ink-900` at 60% → 0%),
  never raw on the image.
- `*-300`/`paper-200` tokens are decorative — never carry text.
- Focus ring: 2px `primary-600` outline + 2px offset, visible on all
  interactive elements (`:focus-visible`).

---

## 2. Typography

Two families, both Google Fonts (self-host the woff2 files — no CDN calls):

- **Display: Fraunces** — a warm, slightly old-style serif with travel-poster
  charm. Weights: 600 (semibold) for all headings; optical size axis on.
  Used for h1–h3, package names, destination names, pull-stats.
- **Body: Nunito Sans** — rounded, humanist, friendly but clean. Weights:
  400 (body), 600 (labels/buttons), 700 (emphasis). Used for everything else.

Never: display font for body copy, more than two families, ALL-CAPS body
text (caps allowed only for small labels/eyebrows with letter-spacing).

### Type scale (rem; base 16px)

| Role | Desktop | Mobile | Family / weight | Line-height |
|---|---|---|---|---|
| `display` (hero h1) | 3.5 / 56px | 2.25 / 36px | Fraunces 600 | 1.1 |
| `h1` (page title) | 2.5 / 40px | 1.875 / 30px | Fraunces 600 | 1.15 |
| `h2` (section) | 2 / 32px | 1.5 / 24px | Fraunces 600 | 1.2 |
| `h3` (card title) | 1.375 / 22px | 1.25 / 20px | Fraunces 600 | 1.3 |
| `body-lg` (hero sub, intros) | 1.125 / 18px | 1.0625 / 17px | Nunito Sans 400 | 1.6 |
| `body` | 1 / 16px | 1 / 16px | Nunito Sans 400 | 1.6 |
| `small` (captions, meta) | 0.875 / 14px | 0.875 / 14px | Nunito Sans 400 | 1.5 |
| `eyebrow` (labels) | 0.8125 / 13px | 0.8125 / 13px | Nunito Sans 600, caps, +0.08em tracking | 1.4 |

Body text never below 14px. Max line length ~68ch for prose blocks.

---

## 3. Spacing — 8px scale

Tokens are multiples of 8 (with a single 4px half-step):

`space-0.5`=4 · `space-1`=8 · `space-2`=16 · `space-3`=24 · `space-4`=32 ·
`space-6`=48 · `space-8`=64 · `space-12`=96 · `space-16`=128

Usage rules:
- Section vertical padding: `space-12` desktop / `space-8` mobile.
- Card internal padding: `space-3`; gap between cards = gutter (below).
- Heading → body gap: `space-2`; between stacked sections’ heading blocks: `space-4`.
- Nothing off-scale; if a design wants 20px, it takes 16 or 24.

### Radius & elevation

- `radius-sm` 8px (inputs, buttons) · `radius-md` 12px (cards) ·
  `radius-lg` 20px (hero images, modals) · `radius-full` (pills, avatar).
- Shadows, two only: `shadow-card` `0 1px 3px rgb(42 38 32 / 0.08)`;
  `shadow-raised` `0 8px 24px rgb(42 38 32 / 0.12)` (hover, modals, sticky
  WhatsApp button). No colored glows.

---

## 4. Grid

| Breakpoint | Range | Columns | Gutter | Margin | Container |
|---|---|---|---|---|---|
| Desktop | ≥ 1024px | 12 | 24px | 48px | max 1200px, centered |
| Tablet | 640–1023px | 8 | 24px | 32px | fluid |
| Mobile | < 640px | 4 | 16px | 16px | fluid |

Standard spans — content prose: 8 of 12 (centered); card grids: 3-up on
desktop (4 cols each), 2-up on tablet (4 of 8), 1-up on mobile; destination
detail: 8 + 4 sidebar (plan-your-trip / enquiry) on desktop, stacked below
on tablet/mobile.

---

## 5. Motion — minimal by design

This is a static content site: motion confirms interaction, it never
decorates. **Allowed, and nothing else:**

1. **Hover states** — color/background shifts and `shadow-card →
   shadow-raised`, 150ms ease-out.
2. **Fade-ins on scroll** — content fades up 12px + opacity, 400ms
   ease-out, triggered once per element, never re-triggered. No stagger
   choreography beyond a max 80ms sibling delay.
3. **Image zoom on hover** — card images `scale(1.0 → 1.04)`, 300ms
   ease-out, inside `overflow: hidden`.

Explicitly banned: skeleton loaders, parallax, marquees, auto-playing
carousels, count-up animations, page-transition choreography.

`prefers-reduced-motion: reduce` → all three become instant (no transform,
no transition); content must never depend on animation to appear.

Easing token: `ease-out` = `cubic-bezier(0.16, 1, 0.3, 1)`. Durations:
`fast` 150ms, `base` 300ms, `slow` 400ms.

---

## 6. Accessibility checklist (WCAG 2.1 AA)

- Contrast: all pairs in §1 computed ≥ 4.5:1 for text (ratios listed);
  decorative-only tokens marked as such.
- Focus visible on every interactive element (§1 focus ring); logical tab
  order; skip-to-content link.
- Touch targets ≥ 44×44px (mobile nav, WhatsApp button, card CTAs).
- Semantic landmarks (`header/nav/main/footer`), one `h1` per page, no
  skipped heading levels.
- Every content image has meaningful alt text sourced from content JSON;
  decorative images `alt=""`.
- Forms: visible labels (no placeholder-as-label), error text in
  `warning-700`/`success-600` plus an icon — never color alone.
- Fade-in elements exist in DOM regardless of JS; motion respects
  `prefers-reduced-motion`.
- Language attribute `en-IN`; ₹ amounts written with the rupee sign and
  digits (screen-reader safe).

---

## 7. P2-dependent slots (build empty, never fake)

Per owner decision: these render **only when real data exists** in content
JSON — no placeholder values, no lorem, no invented numbers.

- **Stats strip** (about/home): hidden until real founding year + traveler
  figures are supplied.
- **Pricing anchors** ("From ₹X"): package cards render the price node only
  if a price field exists; absence collapses cleanly.
- **Membership badges** (IATA/TAAI/TAFI): footer slot ships empty.
- **Testimonial card**: component built and documented, section hidden
  until ≥ 3 real quotes exist.
