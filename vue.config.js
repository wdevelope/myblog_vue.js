const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve('./dist'),
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: `${process.env.VUE_APP_BACKEND_PROXY_URL}`,
        changeOrigin: true,
      },
    },
  },
});
