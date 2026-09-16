# Alchemist Ways

The Alchemist Ways website. It is a fully static site: the pages are generated once when the
site is built, so it can be hosted anywhere, including GitHub Pages.

## Run it on your computer

You need [Bun](https://bun.sh) installed.

```sh
bun install
bun run dev
```

Then open the address shown in the terminal (usually http://localhost:8080).

## Build the branch-root site

```sh
bun run build:pages
```

The built page and its assets are copied into the repository root for GitHub Pages.

## Publishing to GitHub Pages

This repository already contains everything needed:

- `.github/workflows/deploy-pages.yml` rebuilds and commits the root site on every source push
  to the `main` branch.
- `public/CNAME` holds the domain `alchemistways.com`.
- `public/.nojekyll` stops GitHub from stripping files it doesn't recognise.

One-time setup in the repository that hosts the domain:

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**, then `main` and `/ (root)`.
3. Under **Custom domain**, enter `alchemistways.com` and save, then tick **Enforce HTTPS**
   once the certificate is ready.

DNS records to set at the domain registrar:

| Type  | Name  | Value                                                      |
| ----- | ----- | ---------------------------------------------------------- |
| A     | @     | 185.199.108.153                                            |
| A     | @     | 185.199.109.153                                            |
| A     | @     | 185.199.110.153                                            |
| A     | @     | 185.199.111.153                                            |
| CNAME | www   | `<your-github-username>.github.io`                          |

After a push, the workflow regenerates the root files and GitHub Pages serves them from `main`.
