# Page Architecture — Prestige Holidays 4U

Static Next.js (App Router) + Tailwind, generated entirely from `/content`
JSON. Nine routes — exactly this site map, nothing more:

```
/                        home
/domestic                domestic destination listing (6)
/international           international destination listing (8)
/destinations/[slug]     destination detail (14 static params)
/packages                all packages, grouped
/packages/[slug]         package detail (7 static params)
/customize-trip          guided enquiry
/about                   company
/contact                 contact + enquiry form
```

## The /packages/[slug] decision

Checked actual content depth before deciding: each package JSON carries a
summary, 4–5 highlights, and a complete day-by-day itinerary (5–8 days,
~190 words average) — plus its destination's best-time and attractions can
be cross-rendered. That is exactly the content competitors put on package
pages, and our P1 recommendation is to show itineraries *before* enquiry.
Standalone pages also give each package a shareable URL — which matters for
a WhatsApp-first business, where the owner will paste links into chats.
**Verdict: standalone pages, not cards-with-modals.** Inclusions/exclusions
sections render only if the arrays are non-empty (they're currently empty
pending owner input — P2 rule).

## Global elements (every page)

- **Header/nav** (sticky) · **WhatsApp FAB** (sticky, bottom-right) ·
  **Footer**. Specs in COMPONENTS.md.
- Page background `paper-50`; content in the 1200px container per
  DESIGN_SYSTEM.md grid.
- Metadata: per-page `<title>` + description generated from content JSON
  (destination hero_description, package summary). `lang="en-IN"`.

---

## `/` — Home

| # | Section | Content source | Notes |
|---|---|---|---|
| 1 | Hero | hand-written home copy + hero image | Full-bleed image with scrim, display type, dual CTA: primary "Explore packages" (accent-600), secondary "Customize a trip" (outline primary-600) |
| 2 | Trust intro | company/about.json `who_we_are` (trimmed) | Short 2-sentence band. **No stats strip** — hidden slot until owner supplies real figures (P2) |
| 3 | Featured destinations | 6 curated slugs (mix of both categories) | DestinationCard grid 3-up; "View all" links to /domestic + /international |
| 4 | Packages teaser | 3 packages (one per tier) | PackageCard grid 3-up → /packages |
| 5 | How it works | static 3-step copy | "Tell us on WhatsApp → get an itinerary → travel with support" — mirrors the real business flow |
| 6 | Testimonials | company (empty) | TestimonialCard section — **renders nothing until ≥3 real quotes exist** (P2) |
| 7 | Customize CTA band | static | primary-700 band, white text, accent CTA |

## `/domestic` and `/international` — Listings

Identical template, filtered by `category` field:

1. Compact hero (h1 + one intro sentence, paper-100 band — no image scrim
   needed).
2. DestinationCard grid — 3-up desktop / 2-up tablet / 1-up mobile — all
   destinations in category (domestic 6, international 8), ordered as in
   DESTINATION_LIST.md.
3. Related packages strip: PackageCards where `category` matches.
4. Customize CTA band (shared with home).

## `/destinations/[slug]` — Destination detail (14 pages)

`generateStaticParams` over `/content/destinations/*.json`. Build fails
loudly if any file has `content_status !== "researched_complete"` — the
Step 8 no-placeholder guarantee.

| # | Section | Content source |
|---|---|---|
| 1 | Hero | `name`, `tagline` over hero image with scrim; eyebrow = category + country |
| 2 | Intro | `hero_description` (body-lg, 8-col centered) |
| 3 | Best time to visit | `best_time_to_visit` in a primary-100 callout card with calendar icon |
| 4 | Top attractions | `top_attractions[]` → AttractionGrid (5–6 items) |
| 5 | Things to do | `activities[]` → two-column checklist (check icons, primary-600) |
| 6 | Plan your trip | If a package exists for this slug: embedded PackageCard + link. Else: customize-trip CTA card. Desktop: 4-col sidebar sticky beside sections 3–5; mobile: after section 5 |
| 7 | Related destinations | 3 DestinationCards, same category, excluding self |

## `/packages` — Package listing

1. Compact hero (h1 + one sentence).
2. "Domestic packages" h2 → PackageCard grid (4 cards, 3-up wrap).
3. "International packages" h2 → PackageCard grid (3 cards).
4. "Don't see your trip?" band → /customize-trip.

No filters/search — 7 items don't need them (out-of-scope temptation
logged in COMPONENTS.md Future Ideas).

## `/packages/[slug]` — Package detail (7 pages)

| # | Section | Content source |
|---|---|---|
| 1 | Hero | `name`, meta strip (duration · tier badge · audience tag) over destination hero image |
| 2 | Summary | `summary` (body-lg) |
| 3 | Highlights | `highlights[]` — 2×2 card-lets with icons, primary-100 bg, primary-700 text |
| 4 | Day-by-day itinerary | `itinerary[]` — vertical timeline: day number in a primary-600 circle, `title` h3, `description` body. All days expanded (static site — no accordion needed, better for SEO/print) |
| 5 | Inclusions / exclusions | Rendered **only if arrays non-empty** (currently empty — P2). Collapses without residue |
| 6 | About the destination | Cross-render from destination JSON: `best_time_to_visit` callout + first 3 `top_attractions` → link to full destination page |
| 7 | Enquiry CTA | Full-width band: WhatsApp button using this package's `whatsapp_enquiry_prefill`, phone number as secondary |

## `/customize-trip`

The old page was 965 chars of thin copy; this one earns its role as the
primary conversion target:

1. Compact hero: "Built from scratch, just for you."
2. **Guided enquiry form** (EnquiryForm variant `customize`): the WhatsApp
   template fields as real inputs — destination (select from 14 + "somewhere
   else"), travel dates (month picker), adults/children (steppers), budget
   band (radio pills), departure city (text), hotel preference (3★/4★/5★
   radio), requirements (textarea). Submit composes the structured message
   and opens wa.me — same data, better UX than a blank chat.
3. How-it-works 3-step strip (shared with home).
4. "Prefer to just talk?" — tel: + WhatsApp links.

## `/about`

1. Compact hero: "The people behind the plans."
2. Who we are — `company/about.json.who_we_are`.
3. Mission + vision — two cards side by side.
4. Core values — `core_values[]` 4-up icon cards.
5. **Stats strip slot — ships hidden** (P2: real founding year/figures only).
6. Services — `company/services.json.services[]` 3-up grid (6 cards).
7. Customize CTA band.

## `/contact`

1. Compact hero: "Get in touch."
2. Two-column (8+4): **EnquiryForm** (variant `contact`: name, phone,
   email, message) | contact facts card from `company/contact.json` —
   phone (tel:), email (mailto:), WhatsApp chat link (generic template),
   address with "open in Google Maps" link, office hours table.
3. No embedded map iframe (external dependency, layout jank) — the Maps
   link does the job.

---

## Build rules

- All routes statically generated; no runtime data fetching, no database.
- Content read at build time from `/content` via a single `lib/content.ts`
  loader with type guards matching SCHEMA.md.
- **Placeholder guard:** build throws if any destination is not
  `researched_complete` (all 14 currently are).
- Images: `/assets/images/<slug>/…` referenced by convention; until real
  photography exists (P2), a single restrained licensed-stock image per
  destination — never watermarked, never AI-generated-looking, alt text
  from content.
- Fonts self-hosted (next/font) — no external font CDN at runtime.
