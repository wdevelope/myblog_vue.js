const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: process.env.BACKEND_SERVER_PORT,
  },
});
