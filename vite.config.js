// import path from 'path'
// import { createVuePlugin } from 'vite-plugin-vue2'

const path = require('path')
const { defineConfig } = require('vite')
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'VueList',
      fileName: (format) => `vue-list.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue()],
})
