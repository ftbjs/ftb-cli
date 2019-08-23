const { getRemoteVersion } = require('./index')

const update = (api) => {
  return new Promise(async (resolve, reject) => {
    const remoteVersion = await getRemoteVersion(api)
    if (typeof remoteVersion === 'boolean') {
      api.update = false
      resolve(false)
      return
    }

    if (remoteVersion !== api.version) {
      api.update = true
      api.remoteVersion = remoteVersion
      resolve(true)
      return
    }
    api.update = false
    resolve(false)
  })
}

module.exports = update