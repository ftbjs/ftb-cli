const chalk = require('chalk')
const portfinder = require('portfinder')
const merge = require('webpack-merge')
const webpack = require('webpack')
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
    port: 8899,
    noInfo: true,
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
module.exports = async () => {
  const oldPort = webpackDevConfig.devServer.port
  portfinder.basePort = oldPort

  portfinder.getPort({host:'127.0.0.1'} , (err, port) => {
    if (err){
      console.log(chalk.red(`No port can used. Please check your machine`))
      return
    }

    if (port !== oldPort) {
      console.log(chalk.yellow(`The port ${oldPort} is used. will open the server with new port. \n`))
    }

    const URI = 'http://localhost:' + port

    webpackDevConfig.devServer.port = port

    console.log(chalk.greenBright('Project is running at:', URI))
  })

  return webpackDevConfig
}
