const fs = require('fs-extra')
const path = require('path')
const download = require('download-git-repo')
const versionOnline = require('./utils/versionOnline')
const { versionLog } = require('./utils/compareVersion')

module.exports = options => {
  const { appName, frameName } = options
  const cacheBase = '../../cache'
  const cacheDir = `${cacheBase}/templates/${frameName}`

  return versionOnline(options)
    .then(value => new Promise((resolve, reject) => {
        if (!value) {
          download(`github:ftb-family/ftb-cli#master`, path.resolve(__dirname, cacheBase), (err) => {
            if (!err) {
              const packagejsonPath = path.resolve(__dirname, `${cacheDir}/package.json`)
              const version = require(packagejsonPath).version
              versionLog(options, version)
              resolve()
            } else {
              console.log(err)
              reject()
            }
          })
        } else {
          resolve()
        }
    }))
    .then(() => new Promise((resolve, reject) => {
      fs.ensureDirSync(appName)
      resolve()
    }))
    .then(() => new Promise((resolve, reject) => {
      fs.copySync(path.resolve(__dirname, cacheDir), `${process.cwd()}/${appName}`)
      resolve()
    }))
}
