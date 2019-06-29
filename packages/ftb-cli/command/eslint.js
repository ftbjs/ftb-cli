const { writeTemplateToProject } = require('./utils/index')

const eslint = (api) => {
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
      api
    }).then(() => {
      resolve()
    }).catch((e) => {
      reject(e)
    })
  })
}

module.exports = eslint