import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest.json';

const workbox = {
  globDirectory: "dist/",
  // globPatterns: ["**/*/.{html,css,js,png,svg,ico,webp,txt}"],
  globPatterns: ["**/*"],
  swDest: "dist/sw.js",
  maximumFileSizeToCacheInBytes: 3145728,
  navigateFallback: null,
};

const vitePWA = VitePWA({
  registerType: "autoUpdate",
  strategies: "networkFirst",
  outDir: "dist",
  // outDir: "./dev-dist",
  includeAssets: ["**/*"],
  devOptions: {
    enabled: true,
    type: "module",
  },
  manifest,
  workbox
});

export default vitePWA;
