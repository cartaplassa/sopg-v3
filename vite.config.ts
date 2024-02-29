import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { splitVendorChunkPlugin } from 'vite'

import vitePWA from "./vitePWA.config.ts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    splitVendorChunkPlugin(),
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
    },
    /* rollupOptions: {
      output:{
        manualChunks(id) {
          if (id.indexOf('node_modules') !== -1) {
            const basic = id.toString().split('node_modules/')[1];
            const sub1 = basic.split('/')[0];
            if (sub1 !== '.pnpm') {
              return sub1.toString();
            }
            const name2 = basic.split('/')[1];
            return name2.split('@')[name2[0] === '@' ? 1 : 0].toString();
          }
        }
      }
    } */
  }
});
