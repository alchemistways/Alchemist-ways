# Workflow

## How we ship

1. **Edit** — Work in `src/` (routes, components, styles). Keep Phase 1 scope: landing + waitlist.
2. **Local test** — `bun install` then `bun run dev` (or npm). Confirm A•C branding, waitlist CTA, and map before committing.
3. **Commit** — Only when asked. Do not commit secrets or Formspree keys in public if sensitive.
4. **Push to `main`** — Only when explicitly asked. Never push untested local work.
5. **Live** — Confirm on [https://alchemistways.com](https://alchemistways.com) after deploy.

## Folder conventions

| Path | Role |
|------|------|
| `src/routes/` | TanStack file routes (`index.tsx` = landing) |
| `src/components/` | CircularMap, WaitlistForm, UI primitives |
| `src/assets/` | Book image and app media |
| `docs/` | BRIEF, BRAND, blueprint, client inputs, changelog |
| `archive/` | Legacy static HTML — do not serve as the site |
| `CNAME` | Custom domain record for hosting |

## Agent rules of thumb

- Brand: **A•C** + Alchemist Ways only — no Lovable (or other builder) logos, links, or packages.
- Read `docs/BRIEF.md` and `docs/BRAND.md` before visual/copy changes.
- Prefer client / source copy over invented marketing language.
- Update `docs/CHANGELOG.md` when something meaningful ships.

## Local preview

```bash
bun run dev
# or
npm run dev
```
