import { Outlet, createRootRoute, HeadContent } from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import poppins400 from "@fontsource/poppins/files/poppins-latin-400-normal.woff2?url";

const SITE_URL = "https://alchemistways.com/";
const TITLE = "Alchemist Ways | Meet Yourself, Differently.";
const DESCRIPTION =
  "A Map from emotional reactivity to creative agency. See what's been choosing for you, and free what wants to move through you.";

function NotFoundComponent() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-white px-6 text-center">
      <p className="font-display text-sm tracking-[0.35em] text-ink uppercase">Alchemist Ways</p>
      <h1 className="text-3xl font-semibold text-ink">This page could not be found.</h1>
      <a href="./" className="btn-outline">
        Return home
      </a>
    </main>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "author", content: "Malek Najm Ghaleb" },
      { name: "theme-color", content: "#f3e8d6" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Alchemist Ways" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "The book Meet Yourself, Differently. by Malek Najm Ghaleb",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: `${SITE_URL}og-image.jpg` },
    ],
    links: [
      {
        rel: "preload",
        href: poppins400,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", href: "./favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "./apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: Outlet,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Open at the top on refresh instead of restoring the old scroll position. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "history.scrollRestoration='manual';if(!location.hash)scrollTo(0,0);",
          }}
        />
        <HeadContent />
      </head>
      <body>{children}</body>
    </html>
  );
}
