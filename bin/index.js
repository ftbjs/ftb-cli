#! /usr/bin/env node

const path = require('path')
const command = process.argv[2]
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const webpackDevConfig = require('../config/dev')
const entry = process.argv[3] ? process.argv[3] : 'src/index.js'

const commandArg = {
  entry: path.resolve(`${process.cwd()}`, entry),
  outputDir: path.resolve(`${process.cwd()}`, 'dist'),
  publicPath: '/',
  frame: 'react'
}

const ftbDevConfig = webpackDevConfig(commandArg)

Object.keys(ftbDevConfig.entry).map(item => {
  ftbDevConfig.entry[item] = [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    ftbDevConfig.entry[item]
  ]
})

if (command === 'dev') {
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