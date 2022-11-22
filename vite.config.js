const path = require('path')
const { defineConfig } = require('vite')
import vue from '@vitejs/plugin-vue2'
import libCss from 'vite-plugin-libcss'

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
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue(), libCss()],
})
