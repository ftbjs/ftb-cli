
const path = require('path')
const webpack = require('webpack')
const portfinder = require('portfinder')
const WebpackDevServer = require('webpack-dev-server')
const webpackDevConfig = require('../../config/dev')

module.exports = async (api) => {
  const  { entry, output, publicPath, frame, port=8080 } = api

  portfinder.basePort = port

  portfinder.getPort({host:'127.0.0.1'} , (err, port) => {
    if (err){
      return;
    }
    const uri = 'http://127.0.0.1:' + port

    const ftbDevConfig = webpackDevConfig({
      entry,
      output,
      publicPath,
      frame,
      port
    })
  
    Object.keys(ftbDevConfig.entry).map(item => {
      ftbDevConfig.entry[item] = [
        `webpack-dev-server/client?${uri}/`,
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

    devServer.listen(port, 'localhost', () => {
      console.log(`[FTB-CLI] Starting server on http://localhost:${port}`)
    })
  })
}