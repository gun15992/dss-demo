// Import Libraries
import { resolve } from 'path'
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
  ],
  // optimizeDeps: {
  //   exclude: ['react-qr-scanner'],
  // },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      '@assets': resolve(__dirname, './src/assets'),
      '@components': resolve(__dirname, './src/components'),
      '@layouts': resolve(__dirname, './src/components/layouts'),
      '@contexts': resolve(__dirname, './src/contexts'),
      '@data': resolve(__dirname, './src/data'),
      '@features': resolve(__dirname, './src/features'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@libs': resolve(__dirname, './src/libs'),
      '@pages': resolve(__dirname, './src/pages'),
      '@routes': resolve(__dirname, './src/routes'),
      '@services': resolve(__dirname, './src/services'),
      '@utils': resolve(__dirname, './src/utils'),
    }
  },
})
