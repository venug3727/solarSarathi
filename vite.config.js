// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/gemini-api": {
        target: "https://generativelanguage.googleapis.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gemini-api/, ""),
      },
    },
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"], // Ensure these extensions are resolved
  },
  define: {
    "process.env": process.env,
  },
});
