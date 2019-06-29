const fs = require('fs-extra')

const ensureDirAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs.ensureDir(path, (err) => {
      if (err) {
        reject(err)
      }
      resolve(true)
    })
  })
}

module.exports = ensureDirAsync