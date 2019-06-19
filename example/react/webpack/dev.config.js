const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./base.config')

const webpackDevConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(`${process.cwd()}`, '../dist/index.html'),
    publicPath: '/',
    compress: true,
    noInfo: true,
    disableHostCheck: true,
    open: true,
    inline: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = webpackDevConfig
