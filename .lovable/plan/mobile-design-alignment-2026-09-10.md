# Mobile design alignment

Match the phone screens in the client's new mobile design deck. Desktop stays exactly as it is today — every change below is scoped to small screens only.

## What changes, screen by screen

**1. Top bar**
- Menu icon on the left, "Alchemist Ways" centred, orange "BEGIN" pill on the right (today the pill only appears on desktop).
- Small "EN | FR" language toggle under the pill, as shown in the deck.

**2. Opening screen (The Map hero)**
- Order on a phone: title, tagline, the circular Map diagram, then the book, then the two rounded buttons "GET THE BOOK" and "EXPLORE THE MAP" side by side.
- The circle diagram now shows on phones too (today phones get a plain numbered list). Sized down with short labels sitting outside the ring so nothing clips.

**3. "It can look and feel like who you are" (protection circles)**
- Keep swiping, but restyle to match the deck: one large centred circle with the neighbouring circles peeking in from both edges, faded, plus left/right arrow marks.
- Wording and details for the active circle sit centred beneath it.

**4. The Map stages and "What becomes available"**
- On phones the five items become a stacked list: big number on the left, thin vertical divider, then name, italic keyword and description on the right — exactly like the deck instead of today's plain stack.

**5. Founder story**
- Text first, then the full-width portrait beneath it (currently the photo comes first on phones).

**6. "Begin where you are"**
- Turns into a swipeable set of three panels over the background: the two side pedestals peek at the edges, round arrow buttons on the left and right, and dots underneath showing which panel you're on. No boxed card look.

**7. Type and spacing pass**
- Headline, body and label sizes on phones tuned to the deck's proportions; section padding tightened so screens read like the mockups.

## Technical notes

- `SiteNav.tsx`: restructure the mobile row (menu / wordmark / BEGIN pill), re-add a compact EN·FR toggle wired to the existing `setLang` store; desktop nav untouched.
- `MapWheel.tsx`: add a `phone` render path — same SVG geometry at a smaller radius with `text-[0.6rem]` labels — replacing the `lg:hidden` list in the hero; keep the list available for the stage sections via a new `list` prop/variant with the number-plus-rule layout.
- `index.tsx`:
  - Hero: reorder the mobile flex order values (title 1, wheel 2, book 3, CTAs 4) and keep the desktop grid placement classes as-is.
  - Protection: convert the existing snap row into a peek carousel (`w-[72%]` slides, `snap-center`, side items dimmed via `opacity` on non-centre items using scroll-snap only, arrow glyphs as static decoration).
  - Map/Available: add a `lg:hidden` list markup block beside the existing `ColumnGrid` (grid gets `hidden lg:grid`) so desktop columns are unchanged.
  - Founder: change image wrapper to `order-2 lg:order-2` and text to `order-1`.
  - Begin: mobile snap carousel with dot indicators (local `useState` + scroll listener) and round arrow buttons; desktop 3-column grid kept behind `md:`.
- No copy, translation, link or asset changes; all existing `content.ts` keys reused.
- Verify with Playwright at 393×852 and 1440×900 plus `bun run build:dev`.
