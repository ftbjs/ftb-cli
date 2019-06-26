const path = require('path')
const { renderTemplate } = require('./utils/index')

const prettier = (options) => {
  const { appName } = options
  const fileLists = [
    'templates/prettier/.prettierignore.hbs',
    'templates/prettier/.prettierrc.js.hbs'
  ]
  
  return new Promise((resolve, reject) => {
    for (let i = 0; i < fileLists.length; i++) {
      const packageTpl = path.resolve(__dirname, `../${fileLists[i]}`)
      const createTpl = fileLists[i].replace(/(templates\/prettier\/)/, '').replace(/\.hbs$/, '')
      renderTemplate(packageTpl, `${process.cwd()}/${appName}/${createTpl}`, options)
    }
    resolve()
  })
}

module.exports = prettier