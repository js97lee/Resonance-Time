import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // GitHub Pages 등 서브패스 배포 시 상대 경로로 빌드
})
