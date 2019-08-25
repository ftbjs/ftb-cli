const path = require('path')

const resolve = dir => path.join(__dirname, dir)

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  resolve,
  devMode
}
