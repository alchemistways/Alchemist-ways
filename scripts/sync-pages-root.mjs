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
const assetsDir = join(root, "assets");

function assetRefs(html) {
  return [...html.matchAll(/\/assets\/([A-Za-z0-9._-]+)/g)].map((m) => m[1]);
}

function missingAssets(html, dir) {
  return [...new Set(assetRefs(html))].filter((name) => !existsSync(join(dir, name)));
}

/** Pick an HTML entry whose hashed /assets/* refs all exist on disk. */
function pickHtmlSource(candidates, builtAssets) {
  const available = [];
  for (const file of candidates) {
    if (!existsSync(file)) continue;
    available.push(file);
    const miss = missingAssets(readFileSync(file, "utf8"), builtAssets);
    if (miss.length === 0) return { file, miss: [] };
  }
  if (available.length === 0) {
    return { file: null, miss: [] };
  }
  // Prefer the first candidate but report its gaps (caller fails the sync).
  const file = available[0];
  return { file, miss: missingAssets(readFileSync(file, "utf8"), builtAssets) };
}

const builtAssets = join(pub, "assets");
if (!existsSync(builtAssets)) {
  console.error("Missing .output/public/assets — run `npm run build` first.");
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

// Prerendered index can lag behind hashed assets; _shell.html can too.
// Always choose an entry whose refs resolve against the just-copied assets.
const prerendered = join(pub, "index.html");
const shell = join(pub, "_shell.html");
const { file: htmlSource, miss } = pickHtmlSource([prerendered, shell], assetsDir);

if (!htmlSource) {
  console.error("Missing .output/public/index.html (or _shell.html) — run `npm run build` first.");
  process.exit(1);
}

if (miss.length > 0) {
  console.error("Pages sync refused: index asset hashes do not match built assets.");
  console.error("Missing:", miss.map((n) => `/assets/${n}`).join(", "));
  console.error("This is the classic white-screen failure — fix the build entry before publishing.");
  process.exit(1);
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
const label = htmlSource.endsWith("_shell.html") ? "_shell.html" : "index.html";
console.log(`Synced Pages root from ${label}`);
console.log("index head:", preview.replace(/\s+/g, " ").slice(0, 180) + "…");
