import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Lê os arquivos .env.<mode> da raiz do repositório
  envDir: "..",
  plugins: [
    react(),
    tailwindcss(),
  ],
})
