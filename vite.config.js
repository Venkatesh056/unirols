import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Serve static files from public/ folder
  publicDir: 'public',
  server: {
    // Configure static file serving
    fs: {
      // Allow serving files from parent directory
      allow: ['..']
    },
    // Proxy API during development to Flask backend
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  // Configure build output
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Copy static files to build
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})
