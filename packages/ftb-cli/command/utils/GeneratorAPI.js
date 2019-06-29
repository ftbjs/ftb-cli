const { renderTemplate } = require('./index')

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
      renderTemplate(file, `${process.cwd()}/${api.appName}/${filePath}`, api)
    }
    resolve()
  })
}

module.exports = {
  render
}