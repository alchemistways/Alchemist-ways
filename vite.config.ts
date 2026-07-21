import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
      // Client-only shell for GitHub Pages (static hosting, no Node server).
      spa: {
        enabled: true,
      },
      prerender: {
        enabled: true,
      },
    }),
    viteReact(),
    tailwindcss(),
    nitro(),
  ],
});
