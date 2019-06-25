const path = require('path')
const { renderTemplate } = require('./utils/index')

const packageJson = (options) => {
  const { appName, frameName } = options
  return new Promise((resolve, reject) => {
    const packageTpl = path.resolve(__dirname, `../templates/package/${frameName}.package.json.hbs`)
    renderTemplate(packageTpl, `${process.cwd()}/${appName}/package.json`, options)
    resolve()
  })
}

module.exports = packageJson