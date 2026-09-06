import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' -> relative Pfade im Build.
// Dadurch laeuft der Ordner dist/ sowohl auf einer eigenen Domain (Root)
// als auch in einem Unterordner (z.B. example.de/portfolio/) ohne Aenderung.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
