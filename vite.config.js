import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Forward API calls to `vercel dev` (run separately, e.g. `vercel dev --listen 3001`)
      // so local frontend dev can exercise the real serverless functions + database.
      "/api": "http://localhost:3001",
    },
  },
})
