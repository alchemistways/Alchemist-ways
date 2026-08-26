# Alchemist Ways — Brand & Color

## Direction

Light, breathable **paper-white** page — not café cream. Gold does structural work (rings, hairlines, soft washes). Ember/orange is reserved for the primary waitlist CTA. Keep the gold/ember DNA; never default to purple/indigo mystical templates.

See also: [DESIGN-PRINCIPLES.md](DESIGN-PRINCIPLES.md) for distinctive-design critique guidance.

## Color tokens (`:root`)

| Token | Role | Value |
|-------|------|-------|
| `--bg` | Page background | `#FFFEFB` (paper white) |
| `--bg-soft` | Soft section tint | `#F7F5F1` |
| `--ink` | Primary text | `#1A1814` |
| `--muted` | Secondary copy | `#6A6560` |
| `--gold` | Structure & highlight | `#C9A05A` |
| `--soft-gold` | Softer highlight / brand accents | `#E8C98A` |
| `--ember` | Primary waitlist CTA only | `#E46D2C` |
| `--line` | Hairline borders | Soft gold at low opacity |
| `--white` | Panels / inputs | `#FFFEFB` |

## Usage rules

- **Base:** Paper white (`#FFFEFB` / `#F7F5F1`). Plenty of negative space between sections. Avoid peach/cream washes that read as the AI “café cream + clay” cluster.
- **Structure:** Gold for nav cues, circular map ring + nodes, hairlines, subtle radial washes — blended, low-contrast.
- **CTA:** Ember **only** on the primary waitlist button (and its focus/hover). No gold→ember gradients on every control, node, or underline.
- **Surfaces:** Light panels with thin gold hairlines. Avoid heavy frosted dark glass cards.
- **Hero media:** Cover image as soft atmosphere / restrained wash — not a heavy dark veil over the whole site.
- **Signature:** The circular journey map is the memorable artifact; keep other chrome quiet (no grain, no decorative dividers/eyebrows unless they encode meaning).
- **Avoid:** Purple/indigo themes, pure black backgrounds, glowing purple effects, Inter-on-dark mystical template look.

## Brand mark

- **Umbrella brand lives in the sticky header** — Royalmount-style stack: large centered **Alchemist Ways** wordmark on its own row; nav centered on the row below with bird-chevron separators; **Book Clarity Call** as the in-nav highlight pill; **EN | FR** pinned far right (preference only until FR copy ships — see `src/lib/locale.ts`).
- Mobile: centered wordmark + hamburger; menu carries links, Clarity Call, then locale.
- Never show Lovable or other builder branding.

## Opening hero

- Full-bleed book-in-corridor plate via `BookPlateImage` (`src/assets/book-plate-*`).
- Headline + single Explore the Map CTA on the open wall — no duplicate brand eyebrow (header owns the name).
- Signature below: CircularMap ring stays geometrically centered (optical hub label, no active-node scale warp).

## Typography

- **Trial (client interest):** Helvetica Neue / Helvetica for display + body (system stack). Semibold headlines, tight tracking, uppercase CTAs — sharp / slightly game-adjacent without game UI chrome.
- **Light game-adjacent touch (live):** wider tracking on eyebrows/CTAs/nav; Map stage indexes as `01` / `02 / 05` tabular HUD labels (`.aw-hud`, `.aw-stage-num`). No pixel fonts, glows, or gamer slang in body copy.
- Prior: Fraunces (display) + Inter (body) via Google Fonts — kept in git history if we revert.
- Letter-spacing used for the A · C mark and small uppercase labels.

## Assets

- Responsive book plate: `src/assets/book-plate-{960…2752}.{jpg,webp}` from native `nano_banana_pro` **2k** master (`hf-corridor-hero-master.png`, 2752×1536) — no fake 4096 upscale
- Mid-page scenes (native Higgsfield `nano_banana_pro` **2k**, 2752×1536): `src/assets/scene-gallery.{jpg,webp}` (gallery standing-book), `src/assets/scene-droplet.{jpg,webp}`, optional archive `scene-closeup.{jpg,webp}` — masters `src/assets/scenes/hf-*.png`
- About portrait: `src/assets/malek-portrait.jpg`
- Brand mark: `public/brand/ac-logo.png`
- Design source stills (optional): `BOOK_MAP DESIGN/`

