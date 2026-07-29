# Reference Crawl Summary — prestigeholidays4u.com

Crawled 2026-07-29. Purpose: **facts audit only** — contact details, inventory
of destinations/packages, and known gaps. No copy from this crawl is reused.

## Page inventory

| Page | Status | Extracted text | Flags |
|---|---|---|---|
| `/` | 200 | 3,829 chars | OK |
| `/about` | 200 | 2,983 chars | Unverifiable stat claims (see gaps) |
| `/contact` | 200 | 1,253 chars | OK — primary source of hard facts |
| `/domestic` | 200 | 1,871 chars | OK |
| `/international` | 200 | 2,023 chars | OK |
| `/packages` | 200 | 3,340 chars | OK — 7 packages, no prices shown |
| `/customize-trip` | 200 | 965 chars | THIN |
| `/destinations/goa` | 200 | 1,651 chars | THIN — only 2 attractions |
| `/destinations/kerala` | 200 | 1,707 chars | THIN |
| `/destinations/rajasthan` | 200 | 1,665 chars | THIN |
| `/destinations/delhi` | 200 | 1,604 chars | THIN |
| `/destinations/sikkim` | 200 | 1,679 chars | THIN |
| `/destinations/kashmir` | 200 | 1,744 chars | THIN |
| `/destinations/france` | 200 | 1,616 chars | THIN |
| `/destinations/switzerland` | 200 | 1,685 chars | THIN |
| `/destinations/uae` | 200 | 1,635 chars | THIN |
| `/destinations/thailand` | 200 | 1,632 chars | THIN |
| `/destinations/azerbaijan` | 200 | 1,715 chars | THIN |
| `/destinations/singapore` | 200 | 1,671 chars | THIN |
| `/destinations/maldives` | **404** | — | **BROKEN — linked from footer "Popular Destinations"** |
| `/destinations/dubai` | **404** | — | **BROKEN — linked from footer; Dubai *package* exists but page doesn't** |
| `/sitemap.xml` | 200 | — | Lists 19 URLs; maldives/dubai correctly absent |
| `/robots.txt` | 200 | — | Standard allow-all + sitemap pointer |

## Hard facts (carried forward as-is)

- **Business name:** Prestige Holidays 4U
- **Tagline in use:** "Where Great Journey Begins"
- **Phone:** +91 63618 77187 (`tel:+916361877187`)
- **Email:** showkath@prestigeholidays4u.com
- **WhatsApp:** wa.me/916361877187 — with a pre-filled enquiry template
  (Destination / Travel Dates / Adults / Children / Budget Range / Departure
  City / Hotel Preference 3★-5★ / Additional Requirements). This pattern works
  and should be kept.
- **Address:** No 638/G, HBR 1st Stage, 2nd Block, HBR Layout, Bengaluru,
  Karnataka – 560043
- **Office hours:** Mon–Sat 9:00 AM – 7:00 PM; Sun 10:00 AM – 5:00 PM
- **Base city:** Bengaluru (packages marketed "from Bangalore")

## Destination inventory (12 live pages + 2 broken links)

- **Domestic (6):** Goa, Kerala, Rajasthan, Delhi, Sikkim, Kashmir
- **International (6 live):** France, Switzerland, UAE, Thailand, Azerbaijan,
  Singapore
- **Broken (2):** Maldives, Dubai — linked in footer, 404 pages. (Dubai content
  presumably intended to live under UAE or as its own page.)

## Package inventory (7, no prices displayed)

| Package | Duration | Tier | Audience |
|---|---|---|---|
| Goa Family Holiday | 4N/5D | Standard | Families |
| Kerala Backwaters Tour | 5N/6D | Luxury | Couples |
| Rajasthan Heritage Tour | 6N/7D | Premium | All |
| Sikkim Himalayan Adventure | 5N/6D | Standard | Adventure seekers |
| Dubai Luxury Tour | 5N/6D | Luxury | Couples |
| Switzerland Romantic Escape | 6N/7D | Premium | Couples |
| Paris & French Riviera | 7N/8D | Premium | All |

All packages use "Enquire on WhatsApp" as the sole CTA.

## Known gaps / flags for the rebuild

1. **Broken footer links** — Maldives and Dubai 404 (fix: build the pages or
   drop the links).
2. **No pricing anchors anywhere** — packages show duration/tier only.
3. **No testimonials or reviews** — zero social proof site-wide.
4. **Thin destination pages** — every one has exactly 2 attractions and
   near-identical structure; content reads templated/interchangeable.
5. **Broken copy string** — footer reads "Creating memorable journeys since
   years." (missing founding year).
6. **Unverifiable stat claims on /about** — "1000+", "50+", "5+ Years" with no
   substantiation; only 12 destination pages actually exist vs "50+" claim.
7. **No photo evidence** — imagery is generic; only real asset is `/logo.png`.
8. **Customize-trip page is thin** (965 chars) despite being the primary CTA
   target from multiple pages.
9. **Packages have no detail pages** — cards only, no itineraries.
