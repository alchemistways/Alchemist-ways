# Alchemist Ways — Page Blueprint (Phase 1)

## Nav

| Item | Target |
|------|--------|
| Logo / brand | Top of page / hero |
| Book | `#book` |
| Vision | `#vision` |
| Community | `#community` (or waitlist community tease until real community exists) |
| Join Waitlist | `#waitlist` |

## Section flow

```
Nav → Hero → Book/Vision → Circular Map → Trust (“Why Alchemist Ways”) → Final Waitlist CTA
```

### 1. Hero

- Brand as hero-level signal (not just nav text)
- Short book/vision line (use `[BOOK TITLE]` / placeholder promise until client copy arrives)
- One primary CTA: Join the Waitlist
- No equal secondary button (no “Explore the Map” competing in hero)

### 2. Book / Vision (`#book`)

- Feature the book and core vision
- Cover imagery + placeholder title/blurb until client assets arrive
- Benefit bullets may use placeholders

### 3. Circular journey map (`#map`)

- Five existing stages as a symbolic circular ring (CSS only)
- Stages: Reactivity → Awareness → Integration → Sovereignty → Creative Agency
- Gold/orange ring + nodes; subtle motion
- Mobile: stack cleanly (not forced circle on small screens)

### 4. Why Alchemist Ways / Vision & trust (`#vision`)

- Why the project exists
- Two strong trust blocks (no empty placeholder cards)
- Provisional grounded copy until client-approved language arrives

### 5. Community tease (`#community`) optional link target

- Light community promise or waitlist as community entry — not a full product

### 6. Final CTA (`#waitlist`)

- Email-only waitlist form (primary)
- Success message on-page
- Secondary: muted “Book a 1-on-1 Call” text link (placeholder `href` until booking URL provided)

## CTA rules

- **Primary everywhere:** Join the Waitlist
- **Secondary only** in final section: 1-on-1 call (muted, not button-equal)
- Form: email field only; no name/intention on Phase 1 first ship

## Placeholders vs provisional copy

- Keep machine-facing placeholders only where wiring is truly unknown: `[BOOKING URL]`, `[FORM_ENDPOINT]`.
- Prefer provisional grounded copy (clearly noted in `CLIENT-INPUTS.md` / `CHANGELOG.md`) for book title, blurbs, waitlist benefit, and vision — empty `[PLACEHOLDER]` cards hurt client confidence.
