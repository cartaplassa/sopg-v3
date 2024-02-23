import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest.json';

const workbox = {
  globDirectory: "dist/",
  globPatterns: ["**/*/.{html,css,js,png,svg,ico,webp,txt}"],
  swDest: "dist/sw.js",
  maximumFileSizeToCacheInBytes: 3145728,
  navigateFallback: null,
}

const vitePWA = VitePWA({
  registerType: 'autoUpdate',
  outDir: "dist",
  devOptions: {
    enabled: true
  },
  manifest,
  workbox
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    vitePWA,
  ],
  base: "/sopg-v3",
});
