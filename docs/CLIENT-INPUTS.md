# Client Inputs Checklist

Items needed to remove provisional copy / wiring placeholders and go fully live for conversion.

| Input | Status | Notes |
|-------|--------|-------|
| Book title | **Done** | *Meet Yourself, Differently.* |
| Landing copy | **Done** | FINAL PDF (27 pp.) — on-page verbatim, main scroll + extensions |
| Cover / book art | **Done** | `BOOK_MAP DESIGN/` + `book-plate` assets |
| Booking URL | **Done** | Calendly free 30min (`#clarity` CTA) + paid 90min Clarity Session |
| Social links | **Done** | IG / YT / TikTok @alchemistways; Skool community (World section) |
| About portrait | **Done** | `Malek Portrait_ABOUT SECTION.jpg` → `src/assets/malek-portrait.jpg` |
| Map visual references | **Done** | Client MAP artwork — CircularMap restyled; stage copy from FINAL PDF |

## Still needed

| Input | Status | Notes |
|-------|--------|-------|
| **$14 Tool payment link** (Meet What’s Here) | **Needed** | `TOOL_PURCHASE_URL` in `src/lib/offers.ts` anchors to `#tool` until then |
| **$28 Book payment link** (Meet Yourself, Differently.) | **Needed** | `BOOK_PURCHASE_URL` in `src/lib/offers.ts` anchors to `#book` until then |
| Gumroad / checkout pages | Needed with the above | Do not invent URLs — ask the client |
| **French (FR) page copy** | **Needed** | EN|FR control ships in header (`src/lib/locale.ts`); FR stores preference only until client supplies translations — do not invent FR copy |

## Demoted / deferred

| Input | Status | Notes |
|-------|--------|-------|
| Kit waitlist | **Demoted** | FINAL PDF has no waitlist on the main path; `WaitlistForm` + Kit form `9699624` kept in repo for possible reintroduction |
| Book reviews band | Demoted | `BookReviews` unrendered, kept in repo |
| Multi-route split | Deferred | Extensions are in-page anchors (v1); split only if the single page feels too long |
| Client-supplied new Map artwork | Deferred | Beyond CircularMap |
| Higgsfield 4K hero regen | Optional | Existing native-2K ladder ships; not part of this flow pass |
| Long-term coaching funnel | Out of Phase 1 | Roadmap only — Clarity Session → Private Coaching |