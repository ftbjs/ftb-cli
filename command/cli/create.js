const fs = require('fs-extra')
const path = require('path')
const download = require('download-git-repo')

module.exports = ({ appName, frameName }) => {
  const cacheBase = '../../cache'
  const cacheDir = `${cacheBase}/template-${frameName}`

  return new Promise((resolve, reject) => {
    fs.ensureDirSync(appName)

    // TODO need to check version
    download(`github:ftb-family/ftb-cli#master`, path.resolve(__dirname, cacheBase), (err) => {
      if (!err) {
        const packagejsonPath = path.resolve(__dirname, `${cacheDir}/package.json`)
      }
    })
    fs.copySync(path.resolve(__dirname, cacheDir), `${process.cwd()}/${appName}`)
    resolve()
  })
}
