import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      'niswah-app': fileURLToPath(new URL('./vendor/niswah-app', import.meta.url)),
    },
  },
  server: {
    fs: {
      allow: ['.', './vendor/niswah-app'],
    },
  },
});
