const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { getBabelLoaderOptions, getOutputParams, isProd } = require('./utils')

const app = (api) => {
  const { entry, output, publicPath, frame } = api

  return {
    entry: entry,
    output: {
      path: output,
      publicPath: publicPath,
      ...getOutputParams(isProd)
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: getBabelLoaderOptions(frame)
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: !isProd ? 'style-loader' : MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            },
            {
              loader: 'postcss-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../index.html')
      })
    ]
  }
}

module.exports = app