const path = require('path')
const fs = require('fs')
const axios = require('axios')
const handlebars = require('handlebars')
const downloadRepo = require('download-git-repo')

const GITHUB_REACT_URL = 'https://raw.githubusercontent.com/ftb-family/ftb-cli/master/templates/react/package.json'
const GITHUB_VUE_URL = 'https://raw.githubusercontent.com/ftb-family/ftb-cli/master/templates/vue/package.json'

const downloadLatestRepo = (gitRepo, cachePath) => {
  return new Promise((resolve, reject) => {
    downloadRepo(gitRepo, cachePath, (err) => {
      if (err) {
        reject(false)
      }
      resolve(true)
    })
  })
}

/**
 * Get remote template version
 * @param {Object} options 
 */
const getRemoteVersion = (frameName) => {
  const requestUrl = frameName === 'react' ? GITHUB_REACT_URL : GITHUB_VUE_URL
  return new Promise((resolve, reject) => {
    axios.get(requestUrl).then(response => {
      resolve(response.data.version)
    }).catch(e => reject(e))
  })
}

/**
 * Get local package path
 * @param {String} type 
 */
const getLocalFilePath = (type) => {
  return path.resolve(__dirname, `../cache/templates/${type}/package.json`)
}

/**
 * @param {String} frameName
 */
const compareVersion = async ({ frameName }) => {
  const isExists = fs.existsSync(getLocalFilePath(frameName))
  if (isExists) {
      const remoteVersion = await getRemoteVersion(frameName)
      const localVersion = require(getLocalFilePath(frameName)).version
      return localVersion === remoteVersion
  }
  return false
}

/**
 * render handlebars
 * @param {String} template 
 * @param {String} file 
 * @param {Optional} options 
 */
const renderTemplate = (template, file, options) => {
  if (fs.existsSync(template)) {
    const templateContent = fs.readFileSync(template).toString()
    const result = handlebars.compile(templateContent)(options)
    fs.writeFileSync(file, result)
  }
}

const writeTemplateToProject = ({ renderRule, fileLists, options }) => {
  return new Promise((resolve, reject) => {
    if (!fileLists) {
      reject(false)
    }
    for (let i = 0; i < fileLists.length; i++) {
      const file = fileLists[i]
      const rule = new RegExp(renderRule)
      const packageTpl = path.resolve(__dirname, `../../${file}`)
      const writeToFilePath = file.replace(rule, '').replace(/\.hbs$/, '')
      renderTemplate(packageTpl, `${process.cwd()}/${options.appName}/${writeToFilePath}`, options)
    }
    resolve()
  })
}

module.exports = {
  downloadLatestRepo,
  compareVersion,
  renderTemplate,
  writeTemplateToProject
}
