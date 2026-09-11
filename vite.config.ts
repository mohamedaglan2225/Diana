import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// Vite config — https://vitejs.dev/config/
// `base` is configurable so the built site works at the domain root or
// from a sub-path (e.g. GitHub Pages) without touching any image path.
export default defineConfig({
  base: process.env.PUBLIC_BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    assetsInlineLimit: 0,
  },
})
