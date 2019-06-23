const https = require('https')
const { versionCompare, deleteVersionLog } = require('./compareVersion')
const { react, vue } = require('./versionConfig')

module.exports = options => {
  return new Promise((resolve, reject) => {
    let content = ''
    const requestUrl = options.frameName === 'react' ? react : vue
    https.get(requestUrl, (res) => {
      res.on('data', (buffer) => {
        content += buffer.toString()
      })

      res.on('error', async (err) => {
        console.log('请求版本文件时发生错误', err)
        await deleteVersionLog(options)
        resolve(false)
      })

      res.on('end', async () => {
        if (content !== '') {
          try {
            packagejson = JSON.parse(content)
            const version = packagejson.version
            const result = versionCompare(options, version)
            if (!result) {
              await deleteVersionLog(options)
            }
            resolve(result)
          } catch (ex) {
            await deleteVersionLog(options)
            resolve(false)
          }
        } else {
          await deleteVersionLog(options)
          resolve(false)
        }
      })
    })
  })
}