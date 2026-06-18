import { defineConfig } from "vite";

// In produzione (GitHub Pages) il sito è servito sotto /<nome-repo>/,
// in sviluppo locale resta sulla root.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/il-lungo-viaggio/" : "/",
  test: {
    environment: "jsdom",
    globals: true
  }
}));
