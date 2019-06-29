const path = require('path')
const fs = require('fs')
const axios = require('axios')
const handlebars = require('handlebars')
const downloadRepo = require('download-git-repo')
const isOnline = require('is-online')

const GITHUB_REACT_URL = 'https://raw.githubusercontent.com/ftb-family/ftb-cli/master/templates/react/package.json'
const GITHUB_VUE_URL = 'https://raw.githubusercontent.com/ftb-family/ftb-cli/master/templates/vue/package.json'

const resolveApp = source => path.resolve(__dirname, source)

/**
 * Download repo to cache
 * @param {String} gitRepo 
 * @param {String} cachePath 
 */
const downloadLatestRepo = async (gitRepo, cachePath) => {
  const online = await isOnline()
  return new Promise((resolve, reject) => {
    // if offline, use cli templates
    if (!online) {
      resolve(false)
      return
    }
    downloadRepo(gitRepo, cachePath, (err) => {
      if (err) {
        resolve(false)
      }
      resolve(true)
    })
  })
}

/**
 * Get remote template version
 * @param {String} frameName 
 */
const getRemoteVersion = (frameName) => {
  const requestUrl = frameName === 'react' ? GITHUB_REACT_URL : GITHUB_VUE_URL
  return new Promise((resolve, reject) => {
    axios.get(requestUrl).then(response => {
      resolve(response.data.version)
    }).catch(e => resolve(false))
  })
}

/**
 * Get local package path
 * @param {String} type 
 */
const getLocalFilePath = (type) => {
  return resolveApp(`../cache/templates/${type}/package.json`)
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
 * @param {Optional} api 
 */
const renderTemplate = (template, file, api) => {
  if (fs.existsSync(template)) {
    const templateContent = fs.readFileSync(template).toString()
    const result = handlebars.compile(templateContent)(api)
    fs.writeFileSync(file, result)
  }
}

/**
 * renderRule 替换规则
 * fileLists 文件模板位置
 * api 数据
 * @param {*} param
 */
const writeTemplateToProject = ({ renderRule, fileLists, api }) => {
  return new Promise((resolve, reject) => {
    if (!fileLists) {
      reject(false)
    }
    for (let i = 0; i < fileLists.length; i++) {
      const file = fileLists[i]
      const rule = new RegExp(renderRule)
      const packageTpl = resolveApp(`../../${file}`)
      const writeToFilePath = file.replace(rule, '').replace(/\.hbs$/, '')
      renderTemplate(packageTpl, `${process.cwd()}/${api.appName}/${writeToFilePath}`, api)
    }
    resolve()
  })
}

module.exports = {
  downloadLatestRepo,
  compareVersion,
  renderTemplate,
  writeTemplateToProject,
  resolveApp
}
