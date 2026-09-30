/**
 * HERO ART SLOT (right of the book in the hero).
 *
 * Replace src/assets/hero-art.png with the final artwork (keep the file name, or
 * change the import below), set `alt` to describe it and `ready` to true, then run
 * `bun run build:pages`. The slot is square; transparent PNG or SVG works best.
 * While `ready` is false the slot is an empty, transparent area on desktop and is
 * not rendered on phones/tablets.
 */
import heroArt from "../assets/hero-art.png";

export const HERO_ART = {
  src: heroArt,
  alt: "",
  ready: false,
};
