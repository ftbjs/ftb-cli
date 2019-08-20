const chalk = require('chalk')
const portfinder = require('portfinder')
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

    const URI = 'http://127.0.0.1:' + port

    webpackDevConfig.devServer.port = port

    console.log(chalk.greenBright('Project is running at:', URI))
  })

  return webpackDevConfig
}
