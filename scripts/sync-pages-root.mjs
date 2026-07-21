#!/usr/bin/env node
/**
 * Copy the SPA build into the repo root so GitHub Pages (main /) serves
 * the real site instead of the Jekyll-rendered README.
 *
 * Usage: npm run build && node scripts/sync-pages-root.mjs
 */
import { cpSync, copyFileSync, mkdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pub = join(root, ".output", "public");
const shell = join(pub, "_shell.html");

if (!existsSync(shell)) {
  console.error("Missing .output/public/_shell.html — run `npm run build` first.");
  process.exit(1);
}

const dirs = ["assets", "brand", "hero", "models"];
for (const dir of dirs) {
  const from = join(pub, dir);
  const to = join(root, dir);
  if (!existsSync(from)) continue;
  rmSync(to, { recursive: true, force: true });
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
}

copyFileSync(shell, join(root, "index.html"));

for (const file of [
  "apple-touch-icon.png",
  "favicon-16.png",
  "favicon-32.png",
  "favicon.png",
  "favicon.ico",
]) {
  const from = join(pub, file);
  if (existsSync(from)) copyFileSync(from, join(root, file));
}

writeFileSync(join(root, ".nojekyll"), "");
console.log("Synced Pages root: index.html, assets/, brand/, hero/, .nojekyll");
