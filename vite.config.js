import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => ({
  plugins: [react()],
  // main/docs 배포를 위한 기본 경로
  base: '/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
}))
