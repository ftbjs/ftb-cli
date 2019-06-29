const path = require('path')

module.exports = (api) => {
  return new Promise((resolve, reject) => {
    const fileLists = [
      path.resolve(__dirname, `./template/${api.frameName}/.eslintignore.hbs`),
      path.resolve(__dirname, `./template/${api.frameName}/.eslintrc.js.hbs`),
      path.resolve(__dirname, `./template/${api.frameName}/.prettierignore.hbs`),
      path.resolve(__dirname, `./template/${api.frameName}/.prettierrc.js.hbs`)
    ]
    const filePath = [
      '.eslintignore',
      '.eslintrc.js',
      '.prettierignore',
      '.prettierrc.js'
    ]

    api.render({
      fileLists,
      filePath,
      api
    }).then(() => {
      resolve()
    })
  })
}