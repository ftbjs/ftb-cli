
const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackDevConfig = require('../config/dev')

module.exports = (api) => {
  const  { entry, output, publicPath, frame } = api
  
  const ftbDevConfig = webpackDevConfig({
    entry,
    output,
    publicPath,
    frame
  })

  Object.keys(ftbDevConfig.entry).map(item => {
    ftbDevConfig.entry[item] = [
      'webpack-dev-server/client?http://127.0.0.1:8080/',
      ftbDevConfig.entry[item]
    ]
  })

  const compiler = webpack(ftbDevConfig)
  const devServer = new WebpackDevServer(compiler, {
    contentBase: path.resolve(`${process.cwd()}`, '../dist/index.html'),
    publicPath: '/',
    compress: true,
    noInfo: true,
    disableHostCheck: true,
    open: true
  })

  devServer.listen(8080, 'localhost', () => {
    console.log('[FTB-CLI] Starting server on http://localhost:8080')
  })
}