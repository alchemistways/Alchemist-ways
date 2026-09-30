# Alchemist Ways

Source for [alchemistways.com](https://alchemistways.com): a single static page built with
Vite + TanStack Start, prerendered at build time and served by GitHub Pages from the `main`
branch root. See `PUBLISHING.md` for the publishing contract.

## Run locally

Requires [Bun](https://bun.sh).

```sh
bun install
bun run dev          # local dev server
bun run build:pages  # rebuild index.html, 404.html, assets/ … in the repo root
```

## Where things live

| Path                     | Contents                                                      |
| ------------------------ | ------------------------------------------------------------- |
| `src/routes/index.tsx`   | All page sections and copy, in design order                   |
| `src/components/`        | Header/menu, footer/social icons and the Map diagram          |
| `src/content/links.ts`   | Every button, social and booking link (Calendly, Skool, …)    |
| `src/content/heroArt.ts` | Settings for the hero art slot (see below)                    |
| `src/assets/`            | Optimised artwork (webp), bundled with hashed file names      |
| `src/styles.css`         | Tailwind setup, colours, self-hosted fonts, button styles     |
| `public/`                | `CNAME`, `.nojekyll`, favicon, Open Graph image, `robots.txt` |

## Hero art slot

The area to the right of the book in the hero is reserved for a hand-drawn sketch. It is a
single swappable image: **`src/assets/hero-art.png`** (currently a transparent placeholder, so
nothing shows). To add the artwork:

1. Replace `src/assets/hero-art.png` with the sketch (square, transparent background works
   best; to use SVG/WebP instead, change the import in `src/content/heroArt.ts`).
2. In `src/content/heroArt.ts` set `alt` to a short description and `ready: true`
   (this also shows the art on phones and tablets, between the book and the buttons).
3. Run `bun run build:pages`.

Fonts: **Poppins** (primary) and **Barlow Condensed** (letter-spaced display text), self-hosted via
Fontsource.

## Publishing

Push to `main`. `.github/workflows/deploy-pages.yml` runs `bun run build:pages` and commits the
generated root files; GitHub Pages (Deploy from a branch → `main` / root) serves them.
