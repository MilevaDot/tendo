import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), compression()],
  resolve: {
    alias: {
      '@hooks': '/src/shared/hooks',
      '@context': '/src/shared/context',
      '@helpers': '/src/helpers',
    }
  }
})
