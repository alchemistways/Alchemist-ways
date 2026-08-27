# Client Inputs Checklist

Items needed to remove provisional copy / wiring placeholders and go fully live for conversion.

| Input | Status | Notes |
|-------|--------|-------|
| Book title | **Done** | *Meet Yourself, Differently.* |
| Landing copy | **Done** | **FINAL PDF is the live hero→Map source** (`Alchemist Ways_Landing Page Design_ [FINAL] .pdf`); REVISED PDF is archive / spacing reference only |
| Cover / book art | **Done** | `BOOK_MAP DESIGN/` + `book-plate` assets |
| Booking URL | **Done** | Calendly free 30min (`#clarity` CTA) + paid 90min Clarity Session |
| Social links | **Done** | IG / YT / TikTok @alchemistways; Conversations → YouTube; Community → Skool |
| About portrait | **Done** | `Malek Portrait_ABOUT SECTION.jpg` → `src/assets/malek-portrait.jpg` |
| Map visual references | **Done** | Client MAP artwork — CircularMap restyled; stage copy from FINAL PDF (Automatic / Visible / Met / Choosable / Available) |

## Still needed

| Input | Status | Notes |
|-------|--------|-------|
| **$28 Book payment link** (Meet Yourself, Differently.) | **Needed** | `BOOK_PURCHASE_URL` in `src/lib/offers.ts` anchors to `#book` until then |
| Gumroad / checkout pages | Needed with the above | Do not invent URLs — ask the client |
| **French Canadian (FR / fr-CA)** | **Done** | Live EN\|FR toggle; catalogs in `src/lib/i18n/messages.ts` (`fr` → fr-CA). Brand + book title kept EN. Client may refine wording. |

## Demoted / deferred

| Input | Status | Notes |
|-------|--------|-------|
| Kit waitlist | **Demoted** | Not on the main path; `WaitlistForm` + Kit form `9699624` kept in repo for possible reintroduction |
| $14 Tool (Meet What’s Here) | **Demoted** | FINAL Begin triad not on live Ways to Begin; `BeginWhereYouAre` / `#tool` kept in repo, unrendered |
| Book reviews band | Demoted | `BookReviews` unrendered, kept in repo |
| FINAL PDF long `#map-deep` / Fruits / World band | Demoted | Unrendered from main path; files kept if useful later |
| Nav “Practice” label | Deferred | FINAL PDF nav says Practice; live keeps **Conversations** → YouTube until Practice destination is defined |
| Multi-route split | Deferred | Single-page flow; split only if needed later |
| Client-supplied new Map artwork | Deferred | Beyond CircularMap |
| Higgsfield 4K hero regen | Optional | Existing native-2K ladder ships; not part of this flow pass |
| Long-term coaching funnel | Out of Phase 1 | Roadmap only — Clarity Session → Private Coaching |
