// Import Libraries
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    sourcemap: true, 
  },

  server: {
    // Domain Name Configuration
    // host: 'http://localhost:8000/',
    // port: 5173,

    // Proxy Configuration
    // proxy: {
    //     '/api': {
    //         target: 'http://localhost:8000/',
    //         changeOrigin: true,
    //         secure: true
    //     },
    // },

    // HTTPS Configuration
    // https: {
    //   key: './certs/cert.key',
    //   cert: './certs/cert.crt'
    // }
  },

  plugins: [react()]
})
