import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const DEFAULT_API_PROXY = 'https://clouddropdesigns.web.app'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiProxy = env.VITE_API_PROXY || DEFAULT_API_PROXY

  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) {
              if (id.includes('/pages/vibenmed/')) return 'vibenmed'
              if (id.includes('/pages/studio/')) return 'studio'
              return undefined
            }

            if (id.includes('firebase')) return 'firebase'
            if (id.includes('@react-spring') || id.includes('react-spring')) return 'motion'
            if (id.includes('@reduxjs') || id.includes('react-redux')) return 'redux'
            if (
              id.includes('react-dom') ||
              id.includes('react-router') ||
              id.includes('/react/')
            ) {
              return 'react-vendor'
            }

            return undefined
          },
        },
      },
    },
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