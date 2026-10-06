import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    // three.js is most of the bundle; it is a single, cacheable chunk.
    chunkSizeWarningLimit: 700,
  },
});
