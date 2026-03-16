import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/funcionario/', // Base path para servir la aplicación desde /funcionario
  plugins: [react(), tailwindcss()],
  
  // Configuración del servidor de desarrollo
  server: {
    port: 5174,
    host: true, // Permite acceso desde fuera del contenedor
    strictPort: true,
    watch: {
      usePolling: true, // Necesario para algunos sistemas de archivos
    },
  },


  // Resolución de paths
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@api': path.resolve(__dirname, './src/api'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@config': path.resolve(__dirname, './src/config'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
    },
  },

  // Configuración del build
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'recharts'],
        },
      },
    },
  },
})
