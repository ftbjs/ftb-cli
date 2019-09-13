const chalk = require('chalk')
const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackAutoFindPort = require('webpack-auto-find-port')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')
const { resolve } = require('./utils')

const webpackDevConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: resolve('../dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    // Local environment setup
    contentBase: resolve('../dist/index.html'),
    publicPath: '/',
    compress: true,
    port: 8090,
    noInfo: true,
    hot: true,
    open: true,
    disableHostCheck: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      filename: resolve('../dist/index.html'),
      inject: true
    })
  ]
})

// prevent the port conflict
module.exports = webpackAutoFindPort({
  config: webpackDevConfig,
  logger: port => {
    console.log(chalk.green(`Project is Running at ${port}`))
  }
})