// Import Libraries
import { defineConfig } from 'vite'
import strip from 'vite-plugin-strip'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    minify: true,
    sourcemap: false,
    target: 'modules',
  },
  base: '/web-app/',
  plugins: [
    react(),
    strip({
      functions: ['use client'],
    }),
  ]
})
