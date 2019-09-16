const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const base = require('./webpack.base.config.js')
const { resolve } = require('./utils')

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: 'ftb-library.min.js',
    path: resolve('../dist'),
    library: 'ftbJS',
    libraryTarget: 'umd'
  },
  optimization: {
    splitChunks: {},
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          cache: true,
          parallel: true,
          warnings: false,
          comments: false,
          compress: {
            warnings: false,
            drop_console: true
          }
        }
      })
    ]
  },
  plugins: [
     new CleanWebpackPlugin(['dist'], {
      root: resolve('../'),
      verbose: true
     })
   ]
})
