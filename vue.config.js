const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  transpileDependencies: true
})
