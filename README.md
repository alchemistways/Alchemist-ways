# Alchemist Ways

Front door for [alchemistways.com](https://alchemistways.com) — TanStack Start + Vite + React.

**Brand mark:** A · W · Alchemist Ways

## Local development (required before push)

```bash
bun install   # or: npm install
bun run dev   # or: npm run dev
```

Open the URL Vite prints (usually `http://localhost:3000`). That is the real site — not the GitHub README.

Live site: [alchemistways.com](https://alchemistways.com) (GitHub Pages deploys the built app from `main` via Actions). Do not push until the page looks right locally.

## Stack

- TanStack Start / Router
- React 19 + Vite 8
- Tailwind CSS 4
- Waitlist form + circular journey map in `src/`

## Repo layout

| Path | Role |
|------|------|
| `src/` | App routes, components, styles |
| `public/` | Favicon and static public assets |
| `docs/` | Brief, brand, workflow, client inputs |
| `CNAME` | Custom domain for future GitHub Pages / hosting |

## Docs

- [docs/BRIEF.md](docs/BRIEF.md) — goal & CTA hierarchy
- [docs/BRAND.md](docs/BRAND.md) — palette & type
- [docs/WORKFLOW.md](docs/WORKFLOW.md) — edit → local test → commit → push
- [docs/CLIENT-INPUTS.md](docs/CLIENT-INPUTS.md) — still needed from client
- [AGENTS.md](AGENTS.md) — agent rules (no Lovable)

## Ownership

This codebase is owned and developed as Alchemist Ways. Lovable scaffolding has been removed (config, telemetry, badges).
