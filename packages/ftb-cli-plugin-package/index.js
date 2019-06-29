const path = require('path')

module.exports = (api) => {
  return new Promise((resolve, reject) => {
    const fileLists = [
      path.resolve(__dirname, `./template/${api.frameName}/package.json.hbs`)
    ]
    const filePath = 'package.json'
    
    api.render({
      fileLists,
      filePath,
      api
    }).then(() => {
      resolve()
    })
  })
}