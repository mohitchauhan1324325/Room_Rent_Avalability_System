import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      // 1. Force Vite to check for changes (fixes WSL/Windows issues)
      usePolling: true, 
    },
    // 2. Ensures the HMR connection remains stable
    hmr: {
      overlay: true, 
    },
  },
})
