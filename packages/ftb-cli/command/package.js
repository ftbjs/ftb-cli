const { writeTemplateToProject } = require('./utils/index')

const packageJson = (api) => {
  const { frameName } = api
  const fileLists = [
    `templates/package/${frameName}.package.json.hbs`
  ]

  return new Promise((resolve, reject) => {
    writeTemplateToProject({
      renderRule: `^templates\/package\/${frameName}\.`,
      fileLists,
      api
    }).then(() => {
      resolve()
    }).catch((e) => {
      reject(e)
    })
  })
}

module.exports = packageJson