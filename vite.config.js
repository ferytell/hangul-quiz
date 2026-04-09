import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change 'hangul-quiz' to your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/hangul-quiz/',
})
