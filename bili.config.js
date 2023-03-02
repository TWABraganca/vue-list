const vue = require('rollup-plugin-vue');

module.exports = {
  banner: true,
  plugins: {
    vue: { css: true }
  },
  input: 'src/main.js',
  output: {
	dir: 'lib',
	fileName: 'vue-list.[format].js',
	moduleName: 'vue-list',
	format: ['umd-min'],
    extractCSS: false,
  }
};
