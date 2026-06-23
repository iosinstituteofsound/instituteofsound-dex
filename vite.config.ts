import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import path from 'path'
import { resolve } from 'path'

const dexRoot = path.resolve(__dirname, '.')

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

  if (isLib) {
    return {
      plugins: [
        react(),
        tailwindcss(),
        dts({
          include: ['src'],
          exclude: ['src/dev/**'],
          rollupTypes: false,
          insertTypesEntry: true,
        }),
      ],
      resolve: {
        alias: { '@dex': path.resolve(__dirname, './src'), '@dex/': path.resolve(__dirname, './src/') },
      },
      build: {
        lib: {
          entry: resolve(dexRoot, 'src/index.ts'),
          name: 'InstituteOfSoundDex',
          formats: ['es'],
          fileName: 'index',
        },
        rollupOptions: {
          external: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            '@tanstack/react-query',
            'framer-motion',
            'zustand',
            'axios',
            'three',
            '@react-three/fiber',
            '@react-three/drei',
            '@react-three/postprocessing',
            '@tanstack/react-virtual',
          ],
        },
        cssCodeSplit: false,
      },
    }
  }

  const rawApiTarget = process.env.VITE_API_BASE_URL?.trim() || 'http://127.0.0.1:4000'
  const apiTarget = rawApiTarget.replace(/\/\/localhost\b/i, '//127.0.0.1')

  return {
    envDir: dexRoot,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { '@dex': path.resolve(__dirname, './src'), '@dex/': path.resolve(__dirname, './src/') },
    },
    server: {
      host: true,
      port: 5174,
      strictPort: false,
      proxy: {
        '/api/v1': { target: apiTarget, changeOrigin: true },
        '/api/auth': { target: apiTarget, changeOrigin: true },
      },
    },
    build: {
      outDir: 'dist-dev',
    },
  }
})
