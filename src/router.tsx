import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/**
 * The site is a single prerendered page that must hydrate from any URL:
 * alchemistways.com/, the github.io project folder, /index.html, a local static
 * server subfolder, or GitHub Pages' 404.html fallback. On the client every URL is
 * read as "/" and written back unchanged, so the page never fails to match.
 */
const pagePath = typeof window === "undefined" ? "/" : window.location.pathname;

export const getRouter = () =>
  createRouter({
    routeTree,
    // Always open at the top (or at #hash); never restore a previous scroll position.
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
    rewrite: {
      input: ({ url }) => {
        url.pathname = "/";
        return url;
      },
      output: ({ url }) => {
        url.pathname = pagePath;
        return url;
      },
    },
  });
