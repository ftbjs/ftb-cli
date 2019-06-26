const path = require('path')
const { renderTemplate } = require('./utils/index')

const webpackConfig = (options) => {
  const { appName } = options
  const fileLists = [
    'templates/build/utils.js.hbs',
    'templates/build/webpack.base.config.js.hbs',
    'templates/build/webpack.dev.config.js.hbs',
    'templates/build/webpack.prod.config.js.hbs'
  ]
  
  return new Promise((resolve, reject) => {
    for (let i = 0; i < fileLists.length; i++) {
      const packageTpl = path.resolve(__dirname, `../${fileLists[i]}`)
      const createTpl = fileLists[i].replace(/(templates\/)/, '').replace(/\.hbs$/, '')
      renderTemplate(packageTpl, `${process.cwd()}/${appName}/${createTpl}`, options)
    }
    resolve()
  })
}

module.exports = webpackConfig