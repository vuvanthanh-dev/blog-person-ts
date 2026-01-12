import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // ⚡ Performance: Bundle analysis plugin
    // Run "npm run build" to generate stats.html
    visualizer({
      open: false, // Set to true to open report automatically
      gzipSize: true,
      brotliSize: true,
      filename: "dist/stats.html", // Output file
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // ⚡ Performance: Manual chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk: Core React libraries
          "vendor-react": ["react", "react-dom", "react-router-dom"],

          // Redux chunk: State management
          "vendor-redux": [
            "@reduxjs/toolkit",
            "react-redux",
            "redux-persist",
          ],

          // UI chunk: Material-UI and styling
          "vendor-ui": [
            "@mui/material",
            "@mui/icons-material",
            "@emotion/react",
            "@emotion/styled",
          ],

          // Form chunk: Form libraries (heavy, used only in forms)
          "vendor-form": ["react-hook-form", "react-select"],

          // Editor chunk: React Quill (very heavy, lazy loaded)
          "vendor-editor": ["react-quill"],

          // Utils chunk: Utilities
          "vendor-utils": ["axios", "clsx"],
        },
      },
    },
    // Increase chunk size warning limit (default 500kb)
    chunkSizeWarningLimit: 1000,
  },
});
