import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Agentic-AI-Hackathon/', // ← required for GitHub Pages
  plugins: [
    tailwindcss(),
  ],
})
