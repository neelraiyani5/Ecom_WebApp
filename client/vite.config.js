import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy : {
      "/api": {
        target: "https://nextcart-qcqi.onrender.com",
        changeOrigin: true,
        secure: false,
      },
      "/user": {
        target: "https://nextcart-qcqi.onrender.com",
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
