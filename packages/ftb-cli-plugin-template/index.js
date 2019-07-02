const fs = require('fs-extra')
const path = require('path')
const rewriteCss = require('./utils/rewriteCss')

const resolveApp = (src) => path.resolve(__dirname, src)

const template = (api) => {
  return new Promise(async (resolve, reject) => {
    const { update, download, frameName, appName } = api
    const templatePath = resolveApp(`./template/${frameName}`)
    const cacheName = resolveApp('../../ftb-cli-cache')
    const cacheTemplateDir = resolveApp(`${cacheName}/packages/ftb-cli-plugin-template/template/${frameName}`)
    
    let downloadStatus

    if (update) {
      downloadStatus = await download('github:ftb-family/ftb-cli#master', cacheName)
      if (downloadStatus) {
        fs.copySync(cacheTemplateDir, `${process.cwd()}/${appName}`)
      } else {
        fs.copySync(templatePath, `${process.cwd()}/${appName}`)
      }
    } else {
      fs.copySync(templatePath, `${process.cwd()}/${appName}`)
    }

    if (api.less) {
      rewriteCss(api)
    }
    resolve()
  })
}

module.exports = template