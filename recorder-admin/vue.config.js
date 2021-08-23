const path = require('path')
const name = 'Recorder Admin'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/recorder-admin/' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  pwa: {
    name
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack(config) {
    config.plugin('html').tap(args => {
      args[0].title = name
      return args
    })
  }
}