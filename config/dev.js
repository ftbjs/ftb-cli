const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./app')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = webpackConfig
