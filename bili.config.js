const vue = require('rollup-plugin-vue')

module.exports = {
  // banner: true,
  format: ['cjs-min', 'umd-min'],
  // css: true,
  plugins: [vue({ css: true })],
  outDir: 'lib',
}
