const path = require('path')
const { renderTemplate } = require('./utils/index')

const eslint = (options) => {
  const { appName } = options
  const fileLists = [
    'templates/eslint/.eslintignore.hbs',
    'templates/eslint/.eslintrc.js.hbs',
    'templates/eslint/.prettierignore.hbs',
    'templates/eslint/.prettierrc.js.hbs'
  ]
  
  return new Promise((resolve, reject) => {
    for (let i = 0; i < fileLists.length; i++) {
      const packageTpl = path.resolve(__dirname, `../${fileLists[i]}`)
      const createTpl = fileLists[i].replace(/^templates\/eslint\//, '').replace(/\.hbs$/, '')
      renderTemplate(packageTpl, `${process.cwd()}/${appName}/${createTpl}`, options)
    }
    resolve()
  })
}

module.exports = eslint