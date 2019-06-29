const fs = require('fs-extra')

const ensureDir = (path) => {
  return new Promise((resolve, reject) => {
    fs.ensureDir(path, (err) => {
      if (err) {
        reject(err)
      }
      resolve(true)
    })
  })
}

module.exports = {
  ensureDir
}