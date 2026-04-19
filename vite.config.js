import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => ({
  plugins: [react()],
  // 커스텀 도메인 루트(time-of-resonance-2026.com) 및 gh-pages 루트 배포
  base: '/',
}))
