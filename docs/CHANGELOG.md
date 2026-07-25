# Changelog

## Native 2K book stills via Nano Banana Pro (branch1)

- Regenerated mid-page book scenes at native `nano_banana_pro` **2k** (2752×1536) — no AI upscale of prior 1K shots
- **Gallery standing** (`scene-gallery`): accepted job `10ccdf60` (ref `ebb14bb3`); front cover letter-perfect; spine micro-typo OK
- **Droplet** (`scene-droplet`): accepted job `03d605f4` — Invitation atmosphere; author/subtitle clean
- **Closeup** (`scene-closeup`): accepted job `a3ebdb6e` as unused archive alternate
- **Hero / Book plate**: kept existing letter-perfect `book-plate-{960…4096}` set (4096 already sharp)
- Rejected closeups with mangled `DIFFERENTLY` / extra letters; masters in `src/assets/scenes/hf-*.png`

---

## Sync Pages entry for gallery build

- Align root `index.html` + hashed JS/CSS with gallery standing-book build (`index-CpFgHdWY.js`, `routes-B0_XcBFL.js`, `styles-DdLgH3Ml.css`, `scene-gallery-*`)
- Unblocks `deploy-pages` sync (template hashes must match Vite emit)

---

## Gallery standing-book mid-page (branch1)

- Second book beat (“The book is the map”) + Book section second-angle now use `scene-gallery` (Higgsfield gallery standing-book), soft-blended into cream
- Hero / Book corridor plate unchanged (`BookPlateImage`)
- Assets: `src/assets/scene-gallery.{jpg,webp}` + master `src/assets/scenes/hf-gallery-standing.jpg` (native 1024; no AI upscale)
- Front cover lettering clean; spine micro-typo (`DIFFERNTLY`) acceptable at display size

---

## Fix live white screen (asset hash mismatch)

- Root cause: Pages sync updated hashed JS/CSS but left root `index.html` pointing at prior hashes → 404 → blank page
- Pointed `index.html` at the assets actually on `main` (`index-iE0xYUnO.js`, `routes-CoQjIkII.js`, `styles-DHg4NUnN.css`)
- Hardened `scripts/sync-pages-root.mjs` to refuse publish when HTML asset refs don’t exist on disk

---

## Scene blend + map bridge + Begin columns (branch1)

- Soft edge fades on book close-ups so dark floor / hard crop melts into the page
- Map intro bridges from “book is the map” (“Walk what the book maps”); continuous section join
- Begin cards: equal CTA rail, matched button heights, shortened Clarity copy for even columns

---

## Premium book scenes (branch1)

- Audited 8 Higgsfield 3D book stills; shipped only letter-perfect (or near-perfect at display size) shots
- Added `scene-closeup` + `scene-droplet` (JPEG/WebP via Vite) — kept existing letter-perfect `BookPlateImage` hero/book corridor plate
- New “The book is the map” beat after Triggers (close-up + client map line + Waitlist / Explore Map)
- Invitation: droplet detail as full-bleed atmosphere with manifesto copy
- Book section: second-angle close-up under the corridor plate
- Rejected corridor/flat/gallery variants with mangled brand, subtitle, or author text

---

## Landing polish pass (branch1)

- Waitlist: hairline sits above “Continue the exploration.”; denser closer stack; footer border + Twitter/X removed
- BeginCarousel labels enlarged; book block type bumped; Invitation densified with faint map rings (no fake cards)
- About Malek: real section title, tighter photo/copy gap, fewer paragraphs
- Middle narrative compressed; map detail left-aligned with active-node pulse/glow

---

## Dead-weight cleanup (branch1)

- Removed unused shadcn `src/components/ui/` kit + `components.json` + `hooks/`
- Removed unused `Book3D` / Three.js path and `public/models`
- Removed orphan media: `hero-corridor*`, `book.jpg`, `book-meet.jpg`, `src/assets/archive`, root portrait duplicate, `public/hero`
- Pruned unused npm deps (Radix, three, recharts, form libs, etc.)
- Kept client source: `BOOK_MAP DESIGN/`, brief PDFs

---

## Helvetica type trial (branch1)

- Swapped Fraunces/Inter for system **Helvetica Neue / Helvetica** (display + body)
- Semibold headlines, tighter tracking, uppercase spaced CTAs — sharper / game-adjacent energy without game UI
- Dropped Google Fonts load for this trial (system stack on macOS; Arial fallback elsewhere)
- Client preview only — easy to revert if they prefer another option

---

## Book plate refresh — letter-perfect front cover (branch1)

- Regenerated corridor plate with Higgsfield `nano_banana_pro` from clean Alchemist Ways cover + sand corridor refs (Alchemist Ways only)
- Front cover verified letter-perfect: `ALCHEMIST WAYS` / `MEET YOURSELF,` / upside-down `DIFFERENTLY.` / full subtitle / `MALEK NAJM GHALEB`
- Shipped via local Lanczos → responsive `book-plate-{960…4096}.{jpg,webp}` (no blind AI upscale — that mangled type before)
- Spine still has a near-invisible micro-typo at hero scale; AI spine edits reintroduced worse errors, so left alone for now

---

## GitHub Pages: serve the real app (not README)


- SPA/prerender build; `npm run build:pages` syncs `index.html` + assets to repo root
- `.nojekyll` so Pages stops rendering the README as the live site
- Actions workflow keeps the root build in sync on pushes to `main`

---

## Book plate rebuild — correct typography (branch1)

- Regenerated hero/book plate with Higgsfield `nano_banana_pro` from clean cover + corridor refs
- Fixes mangled text from prior upscale (`ALCHENIST WAYE` → `ALCHEMIST WAYS`; restored subtitle `A MAP FROM EMOTIONAL REACTIVITY TO CREATIVE AGENCY`)
- Responsive `BookPlateImage`: WebP + JPEG srcset (960→4096) for phone / tablet / desktop / 4K; shared plate for hero + book
- Mobile crops favor the book (`object-position`); slightly taller mobile hero/book media bands

---

## Mobile welcome pass (branch1)

- Mobile nav menu (Map / Book / Conversations / About / Clarity / Begin Here)
- Map sticky chapter denser on phones; larger tap targets; safe-area padding
- Begin carousel: full-width CTAs, larger controls; swipe container cleaned up
- Global: overflow-x clip, viewport-fit, scroll-padding, tap highlight
- Tighter mobile spacing on About, Invitation, Ways to Begin, waitlist, footer

---

## Narrative density (layout only, branch1)

- Regrouped post-hero Sections One–Four + Emotional Reactivity + Triggers into 3 denser chapters in `index.tsx`
- Left-aligned measures, tighter vertical rhythm; no new copy — client Landing PDF wording retained verbatim

---

## Site formatting cleanup pass (branch1)

- Assets: refreshed `hero-meet` plates; added `begin-book-bg` (+ 4k) — Higgsfield upscale failed, used local sharpen/resample
- Map: CircularMap / MapScrollJourney spacing and label cleanup
- About / Invitation copy layout tightened in `index.tsx`
- Book section: full-bleed begin-book background + BeginCarousel
- Waitlist remains primary CTA

---

## Landing page rebuild — Meet Yourself, Differently. (branch1)

- Fully rewrote `src/routes/index.tsx` from client landing PDF + Brand OS (verbatim copy)
- Hero: Higgsfield book-in-corridor plate (`hero-meet`); copy left-aligned on open wall; DIFFERENTLY. flipped to match cover
- Map: open numbered nodes (labels outside circles) — fixes congested oversized stage pills
- Narrative sections One–Four, Emotional Reactivity triptych, triggers doorway, About Malek + portrait
- Ways to Begin: Book (`book-meet.jpg`), Conversations, Clarity Call (Calendly), Community (Skool)
- Kit waitlist form `9699624`; ivory + terracotta palette
- Removed FAQ, practices strip, waitlist count / localStorage

---

## Hero image sharpening (local; not pushed)

- Higgsfield upload API still failing (`media_upload`/`balance` both error) — used local fallback
- Rebuilt `hero-corridor-4k.jpg` + `hero-corridor.jpg` from the 1536px PNG source with Lanczos resample + unsharp mask; smaller files, visibly crisper cover text and droplet
- Original derivatives backed up at `/tmp/backup-hero-4k.jpg` / `/tmp/backup-hero.jpg`
- For a true detail upscale later: retry Higgsfield `upscale_image` (4K) on `hero-corridor-source.png` when their API recovers

---

## Desktop hero layout fix (local; not pushed)

- Book no longer overlaps headline: copy locked to a narrow left column; image framed so book sits right
- Headline broken into shorter lines; sand wash only on left wall for contrast
- Header glass lightened so it blends with the corridor
- Map: ring sized to fit sticky viewport (`min()` of width/vh) so it no longer clips off-screen

---

## Mobile responsive pass (local; not pushed)

- Hero: phones stack corridor image + readable cream copy; desktop keeps wall overlay (no dark wash)
- Map journey: compact ring/panel only below `md`; desktop restores full side-by-side map
- Header: shorter “Waitlist” label, safe-area, secondary links hide on small screens
- Practices: horizontal snap strip on phones → 5-col grid from `md`
- Waitlist inputs: `16px` on mobile to avoid iOS zoom; full-width CTA

---

## Client copy alignment (local; not pushed)

- Hero: “A map. A practice. A return.” + accent on creative agency; sensitive-creators subcopy
- Map stages aligned to client 01–05 wording (Reactivity → Creative Agency)
- Map intro: “From reactivity to creative agency” / 5-stage path
- Added five practices row + doorway / what’s inside sections from client example
- Kept corridor hero + circular scroll map visual system

---

## New book cover in corridor hero (local; not pushed)

- Replaced the plain chrome book with the new A · W cover (droplet + yin-yang, map subtitle, Malek Najm Ghaleb)
- Kept the sand corridor environment / lighting; live headline + CTAs unchanged
- Hero assets: `src/assets/hero-corridor-4k.jpg` (desktop) + `hero-corridor.jpg` (mobile)

---

## Audit fixes (local; not pushed)

- Fixed header: was `absolute` (vanished after hero) → `fixed` so nav/CTAs stay available
- Map sticky journey: clicking a circle now scrolls to that chapter instead of fighting the scroll driver
- Waitlist: harden localStorage parse, dedupe by email, clear errors on edit
- FAQ: `aria-expanded` / `aria-controls` for accessibility
- Hero: serve lighter image on mobile, full plate on desktop
- Page entrance: opacity-only (no transform) so sticky map still works

---

## Live 3D hero book (local; not pushed)

- Hero rebuilt to match studio mockup layout (A · C mark, Book a Call / Join Waitlist, dual CTAs)
- Added React Three Fiber / drei / three — procedural chrome hardcover with drag-to-turn
- Drop-in path: `public/models/alchemist-book.glb` auto-replaces procedural book
- Removed cropped screenshot hero assets; no image paste for the 3D volume
- Favicon + apple-touch-icon set to A · C Alchemist Ways brand mark (`public/favicon.ico`, `public/brand/ac-logo.png`) — Lovable heart removed

---

## Main app = TanStack site (local; not pushed)

### Framework promotion

- Promoted Lovable-exported app from `a-c-folder/` to **repo root** as the main Alchemist Ways site
- Retired static HTML to `archive/legacy-landing.html` (not served)
- Stack: TanStack Start + Vite + React + Tailwind — owned in this repo

### Lovable removed

- Dropped `@lovable.dev/vite-tanstack-config`; replaced with standard Vite plugins (`tanstackStart`, React, Tailwind, Nitro, tsconfig paths)
- Removed Lovable error telemetry (`lovable-error-reporting.ts`) and `.lovable/` metadata
- Rewrote `AGENTS.md` / README / workflow — no Lovable connection
- Regenerated npm lockfile without Lovable packages

### Brand

- Logo mark set to **A•C** + Alchemist Ways (nav + footer)
- Package name: `alchemist-ways`

### Still blocked / next

- Real waitlist email endpoint (form still has localStorage demo behavior)
- Local test: `npm run dev` before any push

---

## Earlier phases (archived)

Previous static HTML work lives in `archive/legacy-landing.html`. Design docs under `docs/` remain reference material for brand and CTA hierarchy.
