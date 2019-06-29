const { writeTemplateToProject } = require('./utils/index')

const webpackConfig = (api) => {
  const fileLists = [
    'templates/build/utils.js.hbs',
    'templates/build/webpack.base.config.js.hbs',
    'templates/build/webpack.dev.config.js.hbs',
    'templates/build/webpack.prod.config.js.hbs'
  ]
  
  return new Promise((resolve, reject) => {
    writeTemplateToProject({
      renderRule: '^templates\/',
      fileLists,
      api
    }).then(() => {
      resolve()
    }).catch((e) => {
      reject(e)
    })
  })
}

module.exports = webpackConfig