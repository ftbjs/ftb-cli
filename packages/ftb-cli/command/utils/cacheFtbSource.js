const shelljs = require('shelljs')
const path = require('path')

const { downloadLatestRepo } = require('./index')
const resolveApp = (src) => path.resolve(__dirname, src)

module.exports = async () => {
  const cacheFtbPath = resolveApp(`../../ftb-cli-cache`)

  shelljs.rm('-rf', cacheFtbPath)
  
  let cacheStatus = await downloadLatestRepo('github:ftb-family/ftb-cli#master', cacheFtbPath)

  return new Promise((resove, reject) => {
    if (cacheStatus) {
      resove(true)
    } else {
      resolve(false)
    }
  })
}