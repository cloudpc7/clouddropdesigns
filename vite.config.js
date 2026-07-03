import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const DEFAULT_API_PROXY = 'https://clouddropdesigns.web.app'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiProxy = env.VITE_API_PROXY || DEFAULT_API_PROXY

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: apiProxy,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  }
})
