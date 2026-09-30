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

| Path                   | Contents                                                      |
| ---------------------- | ------------------------------------------------------------- |
| `src/routes/index.tsx` | All page sections and copy, in design order                   |
| `src/components/`      | Header/menu, hero wheel (SVG) and the Map diagram             |
| `src/content/links.ts` | Every button destination. Swap in real URLs here              |
| `src/assets/`          | Optimised artwork (webp), bundled with hashed file names      |
| `src/styles.css`       | Tailwind setup, colours, self-hosted fonts, button styles     |
| `public/`              | `CNAME`, `.nojekyll`, favicon, Open Graph image, `robots.txt` |

Fonts: **Poppins** (primary) and **Barlow Condensed** (letter-spaced display text), self-hosted via
Fontsource.

## Publishing

Push to `main`. `.github/workflows/deploy-pages.yml` runs `bun run build:pages` and commits the
generated root files; GitHub Pages (Deploy from a branch → `main` / root) serves them.
