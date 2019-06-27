const { writeTemplateToProject } = require('./utils/index')

const packageJson = (options) => {
  const { frameName } = options
  const fileLists = [
    `templates/package/${frameName}.package.json.hbs`
  ]

  return new Promise((resolve, reject) => {
    writeTemplateToProject({
      renderRule: `^templates\/package\/${frameName}\.`,
      fileLists,
      options
    }).then(() => {
      resolve()
    }).catch((e) => {
      reject(e)
    })
  })
}

module.exports = packageJson