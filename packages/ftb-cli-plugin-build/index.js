const path = require('path')

module.exports = (api) => {
  return new Promise((resolve, reject) => {
    const fileLists = [
      path.resolve(__dirname, `./template/${api.frameName}/utils.js.hbs`),
      path.resolve(__dirname, `./template/${api.frameName}/webpack.base.config.js.hbs`),
      path.resolve(__dirname, `./template/${api.frameName}/webpack.dev.config.js.hbs`),
      path.resolve(__dirname, `./template/${api.frameName}/webpack.prod.config.js.hbs`)
    ]
    const filePath = [
      'build/utils.js',
      'build/webpack.base.config.js',
      'build/webpack.dev.config.js',
      'build/webpack.prod.config.js'
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