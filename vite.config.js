import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => ({
  plugins: [react()],
  // default: Netlify/로컬(/), GitHub Pages는 deploy 스크립트에서 주입
  base: process.env.VITE_BASE_PATH || '/',
}))
