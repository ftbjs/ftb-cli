const path = require('path')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

/**
 * set eslint
 */
const webpackEsLintConfig = () => ({
  test: /\.js$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: resolve('../src'),
  options: {
    formatter: require('eslint-friendly-formatter')
  }
})

module.exports = {
  resolve,
  isProd,
  webpackEsLintConfig
}