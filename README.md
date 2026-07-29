# Prestige Holidays 4U — Website Rebuild

A from-scratch rebuild of the Prestige Holidays 4U travel agency website.
The old live site at prestigeholidays4u.com is used **only as a fact-reference**
(phone, address, destination list, known gaps). None of its copy, design, or
code is reused or adapted — every piece of content here is freshly researched
and freshly written.

## Workflow

The build moves through four strictly ordered phases:

1. **Reference crawl** — audit the old site for hard facts (contact details,
   which destinations/packages exist, what's broken). Raw extractions live in
   `/content/raw/`, summarized in `/content/raw/CRAWL_SUMMARY.md`.
2. **Research notes** — every destination, package, and company page is
   researched fresh via web search. Notes live in `/research/notes/`.
3. **Structured content** — research is written up (in our own words) into
   JSON files under `/content/` following `/content/SCHEMA.md`. Carried-forward
   hard facts stay as-is; everything else is written fresh. No invented prices,
   hotel names, or partnership claims — omit rather than fabricate.
4. **Site build** — a static Next.js (App Router) + Tailwind site in `/site`,
   generated from the `/content` JSON files. Design tokens come from
   `/site/DESIGN_SYSTEM.md`.

## Directory layout

```
/content
  /raw            raw crawl extractions from the old site (facts audit)
  /destinations   one JSON per destination (see SCHEMA.md)
  /packages       one JSON per package
  /company        about / contact / services facts + fresh copy
/research/notes   per-destination research notes, competitor scan
/assets/images    real photography (collected later)
/site             the Next.js site
```

## Ground rules

- Old-site copy is never pasted, paraphrased, or adapted.
- Content status is tracked per destination (`not_started` →
  `researched_complete`) — the site build refuses placeholder content.
- Testimonial slots exist in the design but stay empty until real quotes exist.
- Out of scope: accounts, payments/booking engine, flight/hotel search, admin
  console, AI trip planner, multi-currency/language, databases.
