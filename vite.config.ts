import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig(({ mode }) => {
  // Загружаем переменные окружения из .env
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    plugins: [
      react(),
      legacy({
        targets: ['defaults', 'not IE 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      })
    ],
    server: {
      port: 5174,
      proxy: {
        '/api/syncthing': {
          target: 'http://127.0.0.1:8384',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/syncthing/, '/rest'),
          headers: {
            'X-API-Key': env.VITE_SYNCTHING_API_KEY
          }
        }
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: false,
    }
  };
});