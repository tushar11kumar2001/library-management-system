import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server :{
    proxy : {
      '/user': "http://localhost:1100",
      '/book': "http://localhost:1100",
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
