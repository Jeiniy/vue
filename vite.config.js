import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/video_feed': 'http://100.122.39.78:5000',
      '/events': 'http://100.122.39.78:5000',
      '/fall_status': 'http://100.122.39.78:5000',
    }
  }
})
