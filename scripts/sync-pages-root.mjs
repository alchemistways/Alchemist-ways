#!/usr/bin/env node
/**
 * Copy the SPA build into the repo root so GitHub Pages (main /) serves
 * the real site instead of the Jekyll-rendered README.
 *
 * Usage: npm run build && node scripts/sync-pages-root.mjs
 */
import { cpSync, copyFileSync, mkdirSync, rmSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pub = join(root, ".output", "public");

/** Prefer prerendered index.html (hashed asset links). _shell.html can lag. */
const prerendered = join(pub, "index.html");
const shell = join(pub, "_shell.html");
const htmlSource = existsSync(prerendered) ? prerendered : shell;

if (!existsSync(htmlSource)) {
  console.error("Missing .output/public/index.html (or _shell.html) — run `npm run build` first.");
  process.exit(1);
}

const dirs = ["assets", "brand"];
for (const dir of dirs) {
  const from = join(pub, dir);
  const to = join(root, dir);
  if (!existsSync(from)) continue;
  rmSync(to, { recursive: true, force: true });
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
}

// Drop stale publish dirs from older builds
for (const stale of ["hero", "models"]) {
  const to = join(root, stale);
  if (existsSync(to)) rmSync(to, { recursive: true, force: true });
}

copyFileSync(htmlSource, join(root, "index.html"));

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

const preview = readFileSync(join(root, "index.html"), "utf8").slice(0, 280);
console.log(`Synced Pages root from ${htmlSource.includes("_shell") ? "_shell.html" : "index.html"}`);
console.log("index head:", preview.replace(/\s+/g, " ").slice(0, 180) + "…");
