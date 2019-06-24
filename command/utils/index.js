const path = require('path')
const fs = require('fs')
const axios = require('axios')
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

const compareVersion = async ({ frameName }) => {
  const isExists = fs.existsSync(getLocalFilePath(frameName))
  if (isExists) {
      const remoteVersion = await getRemoteVersion(frameName)
      const localVersion = require(getLocalFilePath(frameName)).version
      return localVersion === remoteVersion
  }
  return false
}


module.exports = {
  downloadLatestRepo,
  compareVersion
}
