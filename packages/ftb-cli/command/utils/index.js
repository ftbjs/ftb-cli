const axios = require('axios')
const downloadRepo = require('download-git-repo')
const isOnline = require('is-online')

const GITHUB_REACT_URL = 'https://raw.githubusercontent.com/ftb-family/ftb-cli/master/packages/ftb-cli/package.json'
const GITHUB_VUE_URL = 'https://raw.githubusercontent.com/ftb-family/ftb-cli/master/packages/ftb-cli/package.json'

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
const getRemoteVersion = ({ frameName }) => {
  const requestUrl = frameName === 'react' ? GITHUB_REACT_URL : GITHUB_VUE_URL
  return new Promise((resolve, reject) => {
    axios.get(requestUrl, { timeout: 10000 }).then(response => {
      resolve(response.data.version)
    }).catch(e => resolve(false))
  })
}

module.exports = {
  downloadLatestRepo,
  getRemoteVersion
}
