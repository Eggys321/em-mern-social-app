import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    target: 'es2018',
    sourcemap: mode !== 'production',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['react-bootstrap', 'bootstrap', 'react-icons'],
          'data-vendor': ['@tanstack/react-query', 'react-hook-form', 'yup', '@hookform/resolvers'],
        },
      },
    },
  },
}))
