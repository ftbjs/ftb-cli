const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./app')

const webpackDevConfig = (options) => {
  return merge(baseWebpackConfig(options), {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}

module.exports = webpackDevConfig
