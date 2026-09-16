# Alchemist Ways publishing contract

This repository publishes `alchemistways.com` from GitHub Pages using **Deploy from a branch → main /**.

## Rules that must remain intact

- Keep `.github/workflows/deploy-pages.yml` as the branch-root publisher.
- Keep `scripts/sync-pages-root.mjs` and the `build:pages` package script.
- Keep `public/CNAME` containing `alchemistways.com` and keep `public/.nojekyll`.
- Keep Vite `base: "./"` so assets work on both the project Pages URL and custom domain.
- Keep static prerendering enabled for `/`.
- Do not replace this with an Actions artifact-only Pages deployment.
- Do not delete the generated-root sync files.
- Do not add editor badges, “Made with Lovable” branding, or editor-only telemetry.
- Keep application source in `src/`, static files in `public/`, and all image dependencies local.

## Downloadable handoff

Keep `src/`, `public/`, and `bun.lock`. Run:

```sh
bun install
bun run build:pages
```

The second command rebuilds and copies `index.html`, `404.html`, `assets/`, `CNAME`, `.nojekyll`, `favicon.png`, and `robots.txt` to the repository root.