const { writeTemplateToProject } = require('./utils/index')

const eslint = (options) => {
  const fileLists = [
    'templates/eslint/.eslintignore.hbs',
    'templates/eslint/.eslintrc.js.hbs',
    'templates/eslint/.prettierignore.hbs',
    'templates/eslint/.prettierrc.js.hbs'
  ]
  
  return new Promise((resolve, reject) => {
    writeTemplateToProject({
      renderRule: '^templates\/eslint\/',
      fileLists,
      options
    }).then(() => {
      resolve()
    }).catch((e) => {
      reject(e)
    })
  })
}

module.exports = eslint