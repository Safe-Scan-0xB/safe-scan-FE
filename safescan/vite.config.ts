import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  // server.proxy는 로컬 개발용
  server: {
    proxy: {
      '/api': {
        target: 'http://13.124.192.14:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
