const chalk = require('chalk')
const webpackAutoFindPort = require('webpack-auto-find-port')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const base = require('./webpack.base.config.js')
const { resolve } = require('./utils')

const webpackDevConfig = merge(base, {
  mode: "development",
  output: {
    filename: 'ftb-library.js',
    path: resolve('../dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: resolve('../dist'),
    compress: true,
    port: 8899
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html')
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