import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: true, // 或 host: '0.0.0.0'
    port: 8000, // 指定端口
  },
})
