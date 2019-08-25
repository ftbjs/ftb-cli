const fs = require('fs-extra')
const renderTemplate = require('./renderTemplate')
const { downloadLatestRepo } = require('./index')

/**
 * @author BiYuqi
 * @param {Array} fileLists template with absolute path
 * @param {String} filePath render folder in project
 * @param {Object} api global data
 */
const render = ({ fileLists, api, filePath }) => {
  return new Promise((resolve, reject) => {
    if (!fileLists) {
      reject(false)
    }
    for (let i = 0; i < fileLists.length; i++) {
      const file = fileLists[i]
      const filePathReal = typeof filePath === 'string' ? filePath : filePath[i]
      renderTemplate(file, `${process.cwd()}/${api.appName}/${filePathReal}`, api)
    }
    resolve()
  })
}

const copy = ({ source, target, api }) => {
  return new Promise((resolve, reject) => {
    fs.copySync(source, `${process.cwd()}/${api.appName}/${target}`)
    resolve()
  })
}

const download = downloadLatestRepo

module.exports = {
  render,
  copy,
  download
}
