const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const getBabelLoaderOptions = (frame = 'react') => {
  return frame === 'react'
  ? ['@babel/preset-env', '@babel/preset-react']
  : ['@babel/preset-env']
}

const getOutputParams = (env) => {
  return env ? {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[id].[chunkhash].js'
  } : {
    filename: 'js/[name].js',
  }
}

const isProd = process.env.NODE_ENV === 'production'

const app = (api) => {
  const { entry, outputDir, publicPath, frame } = api

  return {
    entry: entry,
    output: {
      path: outputDir,
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
      new HtmlWebpackPlugin()
    ]
  }
}

module.exports = app