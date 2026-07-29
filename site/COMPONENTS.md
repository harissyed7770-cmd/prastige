# Component Specs — Prestige Holidays 4U

All tokens reference DESIGN_SYSTEM.md exactly (no placeholder colors). All
components are server components except where noted (form, mobile menu, FAB
scroll behavior). Motion is limited to the three allowed behaviors; every
interactive element gets the standard focus ring (2px `primary-600` outline,
2px offset) and ≥44×44px touch targets.

## 1. Header / Nav

**Layout:** sticky top, `paper-50` at 92% opacity with backdrop-blur, 1px
bottom border `paper-200`. Height 72px desktop / 60px mobile. Container
1200px.

- **Left:** logo lockup — wordmark "Prestige Holidays 4U" in Fraunces 600
  `primary-700`, tagline "Where Great Journey Begins" in `eyebrow` style
  `ink-600` below it (tagline hidden on mobile).
- **Center/right (desktop ≥1024px):** nav links `body` Nunito Sans 600
  `ink-900`: Home · Domestic · International · Packages · Customize Trip ·
  About · Contact. Hover: `primary-600` + 2px underline offset 6px, 150ms.
  Active page: `primary-700` + persistent underline. `aria-current="page"`.
- **Far right:** WhatsApp icon button — **always visible, all breakpoints,
  including inside the mobile header bar** (not buried in the hamburger).
  44×44px, `primary-600` circle, white WhatsApp glyph; links to
  `wa.me/916361877187` with the generic template from
  `company/contact.json`. `aria-label="Chat with us on WhatsApp"`.
- **Mobile (<1024px):** hamburger (44×44, `ink-900` icon) right of the
  WhatsApp icon. Opens a full-height overlay panel: `paper-50`, nav links
  stacked at `h3` size, 300ms fade-in, focus-trapped, closes on Esc/link
  tap. Body scroll locked while open. Client component.

## 2. Hero

Two variants:

**A. Full (home, destination detail, package detail):** full-bleed image,
height 72vh home / 56vh detail (min 420px). Mandatory scrim per
DESIGN_SYSTEM.md: `ink-900` 60%→0% bottom-up gradient. Content bottom-left
in container: eyebrow (`eyebrow` style, white), title (`display` home /
`h1` detail, Fraunces, white), sub (body-lg, white, max 60ch), CTA row
(space-3 above). Image via next/image, priority, alt from content.

**B. Compact (listings, about, contact, customize):** `paper-100` band,
space-8 vertical padding, h1 `primary-700` + one intro sentence `ink-600`.
No image, no scrim.

Fade-in: hero text fades up once on load (400ms, 80ms sibling stagger max).

## 3. Destination Card

Used on home, /domestic, /international, related strips.

**Anatomy (fixed order, every instance):**
1. Image — 3:2, `radius-md` top corners, `overflow:hidden`; hover zoom
   1.04 / 300ms.
2. **Best-time badge** overlaid top-right on image: pill (`radius-full`),
   `paper-0` at 92%, `small` text `primary-700`, calendar icon 16px —
   content: shortest season phrase from `best_time_to_visit` (e.g.
   "Nov–Feb"). Derived at build by a `bestTimeShort()` helper with
   per-slug override map — never lorem.
3. Body (`paper-0` bg, space-3 padding, `radius-md` bottom): eyebrow =
   category + country (`ink-600`), name h3 Fraunces `ink-900`, tagline
   `small` `ink-600` clamped to 2 lines.
4. CTA row: "Explore <name>" link, Nunito 600 `primary-600` + arrow icon;
   arrow shifts 4px right on hover, 150ms.

Card: `shadow-card` → `shadow-raised` on hover, 150ms. Whole card is one
`<a>` (block link); inner text remains selectable. Grid: 3-up desktop /
2-up tablet / 1-up mobile, gutter gaps.

## 4. Package Card

Used on /packages, home teaser, destination-detail sidebar.

**Anatomy:**
1. Image (destination hero crop, 16:9) with **tier badge** top-left: pill,
   Standard = `paper-100` bg + `ink-600` text · Premium = `primary-100` +
   `primary-700` · Luxury = `accent-100` + `accent-700`. `small` 600.
2. Body (space-3): name h3 Fraunces `ink-900`; meta line `small` `ink-600`
   — duration · **audience tag** (pill, `paper-100`, `ink-600`, e.g.
   "Couples").
3. Highlights: first 3 of `highlights[]`, `small`, check icon
   `primary-600`, single line each with ellipsis.
4. **Price node — P2 slot:** renders "From ₹X per person" (`body` 700
   `ink-900`) **only if** a `price_from` field exists in the package JSON.
   No field → node absent, layout collapses cleanly. Never a placeholder.
5. CTA row: primary **"Enquire on WhatsApp"** button (see §10 Button) using
   this package's `whatsapp_enquiry_prefill` URL-encoded into
   `https://wa.me/916361877187?text=…` — the old site's proven pattern,
   upgraded: package name + duration are pre-filled so enquiries arrive
   pre-qualified. Secondary: "View itinerary" text link `primary-600` →
   `/packages/[slug]`.

## 5. Attraction Grid (destination detail)

Grid, not carousel — carousels are banned by the design system and 5–6
items fit a grid honestly.

- Layout: desktop 3-up (rows of 3+3 or 3+2), tablet 2-up, mobile 1-up.
- Item: image (4:3, `radius-md`, hover zoom) — `image_needed: true` maps to
  the licensed-stock convention until real photography lands (P2); name h3
  Fraunces `ink-900`; description `body` `ink-600` (full text — these are
  the checkable-detail sentences, never clamped).
- First item may span 2 columns on desktop (editorial emphasis) — optional,
  controlled by index, no content change.
- Fade-in on scroll per design system (once, 80ms stagger cap).

## 6. Testimonial Card — built, shipped hidden (P2)

Fully specced so wiring real quotes later is a data change, not a design
task. **Render rule: the section returns `null` unless
`company/testimonials.json` exists and contains ≥3 entries. No dummy
quotes, no grayed placeholders, no "coming soon".**

- Data shape: `{ quote, name, city, trip_taken, planner_name? }` — matches
  the Pickyourtrail pattern from the competitor scan (name + city + actual
  trip + who helped).
- Card: `paper-0`, `radius-md`, `shadow-card`, space-3 padding. Opening
  quote mark in Fraunces `primary-300` at 40px (decorative,
  `aria-hidden`). Quote `body` `ink-900`, max ~50 words. Footer row:
  initials avatar (40px circle, `primary-100` bg, `primary-700` initials) +
  name Nunito 600 `ink-900` + "· <city>" `ink-600`; below in `small`
  `ink-600`: trip_taken, and "Planned by <planner_name>" if present.
- Section: h2 + 3-up grid (no carousel). Never star ratings — we have no
  rating system; stars would imply one.

## 7. Sticky WhatsApp FAB

- 56×56px circle, `accent-600` bg, white WhatsApp glyph 28px,
  `shadow-raised`. Fixed bottom-right: 24px offsets desktop, 16px mobile.
- Link: `wa.me/916361877187` + generic template (contact.json). On
  destination/package pages, swaps to the page-specific prefill (package
  prefill, or generic-with-destination-name).
- Hover: `accent-700`, 150ms. `aria-label="Chat with us on WhatsApp"`.
- Appears after 400px scroll (fade, 300ms); always present on mobile.
  Never overlaps footer contact block: stops 16px above footer via
  IntersectionObserver. Client component.
- z-index above content, below mobile-menu overlay.

## 8. Enquiry Form (client component)

Static site, no database — the form is an honest client-side composer with
two delivery paths and zero servers:

- **Primary submit — "Send on WhatsApp":** composes a structured message
  from the fields and opens `wa.me/916361877187?text=…`.
- **Secondary — "Send by email":** `mailto:showkath@prestigeholidays4u.com`
  with subject + body prefilled from the same fields.

Variants:
- `contact`: Full Name* · Phone · Email* · Message* (textarea).
- `customize`: Destination (select: 14 + "Somewhere else") · Travel dates
  (month + year selects) · Adults / Children (steppers, min 1/0) · Budget
  range (radio pills — bands only, no invented package prices) · Departure
  city (text) · Hotel preference (3★/4★/5★ radio pills) · Requirements
  (textarea). Mirrors the proven WhatsApp template field-for-field.

Field spec: visible `<label>` above every input (never placeholder-as-label);
input 48px height, `paper-0` bg, 1px `paper-200` border, `radius-sm`;
focus: border `primary-600` + ring. Radio/steppers ≥44px targets.
Validation on submit only: required + email/phone format; error text
`warning-700` + icon below field, `aria-describedby` wired,
`aria-invalid`, focus moves to first error. Success state: `success-100`
panel, `success-600` text + icon ("Opening WhatsApp — your message is
ready to send"). No spinners (nothing loads).

## 9. Footer

`primary-700` bg, white/tinted text — all pairs AA (white on primary-700 =
10.83:1). Four columns desktop (4/3/3/2 of 12), stacked mobile:

1. **Brand:** wordmark Fraunces white, tagline `primary-100`, 2-line
   description. **Founding-year line — P2 slot:** renders "Planning
   holidays from Bengaluru since <year>" only when `founded_year` exists in
   about.json; absent until then (the old site's broken "since years" is
   the cautionary tale).
2. **Quick links:** the 7 nav routes. `primary-100` text, hover white.
3. **Destinations:** 6 curated links (must be live routes only — the old
   site's footer 404s are the cautionary tale here).
4. **Contact:** address, tel:, mailto:, office hours from contact.json.
   **Membership badges (IATA/TAAI/TAFI) — P2 slot: ships empty** until the
   owner confirms real memberships.

Bottom bar: 1px `primary-600` divider, `small` `primary-100`:
"© <build year> Prestige Holidays 4U. All rights reserved." Social icons
only if real profile URLs are supplied (contact.json `social` — currently
absent; the old site's `href="#"` icons are not carried forward).

## 10. Shared primitives

- **Button.** Primary: `accent-600` bg, white, `radius-sm`, 48px,
  space-3 horizontal padding, Nunito 600; hover `accent-700`. Secondary:
  transparent, 1.5px `primary-600` border, `primary-600` text; hover
  `primary-100` bg. On-dark variant: white border/text, hover white 10%
  overlay. Max one primary per viewport-height (design-system rule).
- **Badge/pill:** `radius-full`, `small` 600, space-0.5 × space-2 padding —
  color pairs per usage (tier mapping in §4; all pairs from §1 of the
  design system).
- **Section heading block:** eyebrow (`eyebrow`, `accent-700`) + h2
  Fraunces `ink-900` + optional lede `ink-600`; space-2 internal gaps,
  space-4 below.
- **CTA band:** `primary-700` bg full-width band, space-8 padding, h2
  white, one primary Button (accent) + one on-dark secondary.

## Future Ideas (not in v1) — logged, not designed

Everything here was consciously excluded to keep v1 a static content site.
None of it is specced, scaffolded, or stubbed:

- Form-to-inbox backend (Formspree-style) or any server-side enquiry
  handling — v1 composes WhatsApp/mailto client-side instead.
- Package filtering/search UI — pointless at 7 packages.
- Reviews/ratings integration (Google Reviews import) — revisit when real
  testimonials exist.
- Blog/travel-guides section.
- Per-destination photo galleries/lightbox — needs the P2 photography
  first.
- And the explicit out-of-scope list: user accounts, online
  payments/booking engine, GDS/flight/hotel search, admin console/CRM, AI
  trip planner, multi-currency/multi-language, databases of any kind.
