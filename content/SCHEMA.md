# Content Schema

## Destination (`/content/destinations/<slug>.json`)

```json
{
  "slug": "goa",
  "name": "Goa",
  "country": "India",
  "category": "domestic",
  "tagline": "",
  "hero_description": "",
  "best_time_to_visit": "",
  "top_attractions": [
    { "name": "", "description": "", "image_needed": true }
  ],
  "activities": [],
  "sample_itinerary_days": null,
  "content_status": "not_started",
  "source": "researched_fresh"
}
```

Field rules:

- `category` — `"domestic"` or `"international"`.
- `tagline` — short, place-specific; never interchangeable copy.
- `hero_description` — 2–3 sentences, specific to this place.
- `best_time_to_visit` — season/months plus a one-line reason.
- `top_attractions` — 5–6 entries, each with one specific, checkable detail.
- `activities` — 6–8 strings, specific to this place.
- `sample_itinerary_days` — integer matching our package duration for this
  destination (null if no matching package); the itinerary itself lives in the
  matching package file.
- `content_status` — `"not_started"` → `"researched_complete"`.
- `source` — always `"researched_fresh"`; carried-forward hard facts are the
  only exception and live in `/content/company/`.

Never invent specific prices, hotel names, or partnership claims — omit
rather than fabricate.

## Package (`/content/packages/<slug>.json`)

```json
{
  "slug": "goa-family-holiday",
  "name": "Goa Family Holiday",
  "destination_slug": "goa",
  "category": "domestic",
  "duration": "4 Nights / 5 Days",
  "tier": "Standard",
  "audience": "Families",
  "summary": "",
  "highlights": [],
  "itinerary": [ { "day": 1, "title": "", "description": "" } ],
  "inclusions": [],
  "exclusions": [],
  "whatsapp_enquiry_prefill": "",
  "content_status": "not_started",
  "source": "researched_fresh"
}
```

Carried-forward facts per package: name, duration, tier, audience (from the
old site's inventory — these define what the business actually sells). All
copy fields are written fresh.

## Company (`/content/company/*.json`)

`contact.json` holds carried-forward hard facts only (phone, email, WhatsApp,
address, hours). `about.json` and `services.json` hold freshly written copy;
unverifiable stats from the old site (e.g. "1000+ travelers") are **not**
carried forward.
