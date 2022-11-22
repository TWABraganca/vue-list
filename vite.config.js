const path = require('path')
const { defineConfig } = require('vite')
import vue from '@vitejs/plugin-vue2'
import injectCss from '@cxing/vitejs-plugin-inject-css'

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
  plugins: [vue(), injectCss()],
})
