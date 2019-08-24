const fs = require('fs-extra')
const path = require('path')
const rewriteCss = require('./utils/rewriteCss')

const resolveApp = (src) => path.resolve(__dirname, src)

const template = (api) => {
  return new Promise(async (resolve, reject) => {
    const { frameName, appName } = api
    const templatePath = resolveApp(`./template/${frameName}`)
    
    fs.copySync(templatePath, `${process.cwd()}/${appName}`)

    if (api.less) {
      rewriteCss(api)
    }
    resolve()
  })
}

module.exports = template