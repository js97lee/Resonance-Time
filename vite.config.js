import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => ({
  plugins: [react()],
  // 커스텀 도메인 루트 배포 기준
  base: '/',
}))
