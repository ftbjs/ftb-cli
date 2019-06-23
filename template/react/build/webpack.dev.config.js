const path = require('path')
const portfinder = require('portfinder')
const chalk = require('chalk')
const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.config')

const webpackDevConfig = merge(webpackBaseConfig, {
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
    port: 8080
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = async () => {
  const oldPort = webpackDevConfig.devServer.port
  portfinder.basePort = oldPort

  portfinder.getPort({host:'127.0.0.1'} , (err, port) => {
    if (!err){
      console.log(chalk.red(`No port can used. Please check your machine`))
      return
    }

    if (port !== oldPort) {
      console.log(chalk.yellow(`The port ${oldPort} is used. will open the server with new port. \n`))
    }

    const uri = 'http://127.0.0.1:' + port

    webpackDevConfig.devServer.port = port

    console.log(chalk.green('Project is running at:', uri))
  })

  return webpackDevConfig
}
