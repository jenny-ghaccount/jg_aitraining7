import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,          // bind to 0.0.0.0 so Codespace port-forwarding works
    allowedHosts: 'all', // allow *.app.github.dev Codespace URLs
  },
})
