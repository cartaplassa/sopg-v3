import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

import vitePWA from "./vitePWA.config.ts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    vitePWA,
  ],
  base: "/sopg-v3",
  build: {
    minify: {
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.log statements
          drop_debugger: true // Remove debugger statements
        }
      }
    }
  }
});
