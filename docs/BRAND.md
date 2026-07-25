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

- Logo presentation (hero): **A · C  Alchemist Ways** — small caps tracking, top-left.
- Top nav pills: **Book a Call** · **Join Waitlist**.
- Never show Lovable or other builder branding.

## Opening hero

- Full-bleed book-in-corridor plate via `BookPlateImage` (`src/assets/book-plate-*`).
- Headline + waitlist CTA on the open wall; secondary book CTA muted.

## Typography

- **Trial (client interest):** Helvetica Neue / Helvetica for display + body (system stack). Semibold headlines, tight tracking, uppercase CTAs — sharp / slightly game-adjacent without game UI chrome.
- Prior: Fraunces (display) + Inter (body) via Google Fonts — kept in git history if we revert.
- Letter-spacing used for the A · C mark and small uppercase labels.

## Assets

- Responsive book plate: `src/assets/book-plate-{960…4096}.{jpg,webp}`
- Mid-page scenes: `src/assets/scene-closeup.{jpg,webp}`, `src/assets/scene-droplet.{jpg,webp}` (letter-perfect Higgsfield stills; originals in `src/assets/scenes/`)
- About portrait: `src/assets/malek-portrait.jpg`
- Brand mark: `public/brand/ac-logo.png`
- Design source stills (optional): `BOOK_MAP DESIGN/`

