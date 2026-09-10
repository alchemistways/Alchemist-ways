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

## Build the finished site

```sh
bun run build:static
```

Everything that needs to be published ends up in the `dist/client` folder.

## Publishing to GitHub Pages

This repository is set up for **Deploy from branch → `main` /`** (legacy Pages):

- `.github/workflows/deploy-pages.yml` builds on every push to `main`, then commits
  `index.html`, `assets/`, `CNAME`, `.nojekyll`, etc. into the repo root so Pages serves
  the site instead of the README.
- `public/CNAME` holds the domain `alchemistways.com`.
- `public/.nojekyll` stops GitHub from stripping files it doesn't recognise.

One-time setup in the repository that hosts the domain:

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**, branch
   `main`, folder `/` (root).
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

After the first push, the workflow runs on its own and the site goes live at the domain.
