const fs = require('fs-extra')
const rewriteCss = require('./utils/rewriteCss')

module.exports = async (api) => {
  return new Promise((resolve, reject) => {
    fs.copySync(`./template/${api.frameName}`, `${process.cwd()}/${api.appName}`)

    if (api.scss) {
      await rewriteCss(api)
    }
  })
}