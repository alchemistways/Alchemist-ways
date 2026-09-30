import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const rootEntries = [
  "index.html",
  "404.html",
  "assets",
  "CNAME",
  ".nojekyll",
  "favicon.png",
  "apple-touch-icon.png",
  "og-image.jpg",
  "robots.txt",
];

if (process.argv.includes("--clean")) {
  await Promise.all(rootEntries.map((entry) => rm(entry, { recursive: true, force: true })));
  process.exit(0);
}

const candidates = [".output/public", "dist/client"];
let source;

for (const candidate of candidates) {
  try {
    if ((await stat(join(candidate, "index.html"))).isFile()) {
      source = candidate;
      break;
    }
  } catch {
    // Try the next supported static output folder.
  }
}

if (!source) {
  throw new Error("Static build output was not found.");
}

await rm("assets", { recursive: true, force: true });

for (const entry of rootEntries.filter((entry) => entry !== "404.html")) {
  const from = join(source, entry);
  try {
    const info = await stat(from);
    if (info.isDirectory()) await mkdir(entry, { recursive: true });
    await cp(from, entry, { recursive: true, force: true });
  } catch {
    throw new Error(`Required Pages output is missing: ${entry}`);
  }
}

await cp(join(source, "index.html"), "404.html", { force: true });

for (const page of ["index.html", "404.html"]) {
  const html = await readFile(page, "utf8");
  await writeFile(
    page,
    html
      .replaceAll('/./assets/', './assets/')
      .replaceAll('href="/favicon.png"', 'href="./favicon.png"')
      // The page is fully prerendered and needs no framework JS (the menu uses a tiny
      // inline script), so drop the hydration bundle links and bootstrap script.
      .replace(/<link rel="modulepreload"[^>]*>/g, "")
      .replace(/<script>\(self\.\$R=[\s\S]*?<\/script>/g, ""),
  );
}

// Remove JS chunks nothing references any more.
const pages = (await readFile("index.html", "utf8")) + (await readFile("404.html", "utf8"));
for (const file of await readdir("assets")) {
  if (file.endsWith(".js") && !pages.includes(file)) await rm(join("assets", file));
}

console.log(`Synced GitHub Pages files from ${source}: ${(await readdir("assets")).length} assets.`);