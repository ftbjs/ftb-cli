const path = require('path')
const fs = require('fs-extra')
const shelljs = require('shelljs')
const resolveApp = (src) => path.resolve(__dirname, src)

module.exports = (api) => {
  return new Promise(async (resolve, reject) => {
    const rootTemplatePath = resolveApp('./js-package')
    fs.copySync(rootTemplatePath, `${process.cwd()}/${api.appName}`)

    const fileLists = [
      path.resolve(__dirname, `./template/build/utils.js.hbs`),
      path.resolve(__dirname, `./template/build/webpack.base.config.js.hbs`),
      path.resolve(__dirname, `./template/build/webpack.dev.config.js.hbs`),
      path.resolve(__dirname, `./template/build/webpack.prod.config.js.hbs`),
      path.resolve(__dirname, `./template/package.json.hbs`)
    ]
    const filePath = [
      'build/utils.js',
      'build/webpack.base.config.js',
      'build/webpack.dev.config.js',
      'build/webpack.prod.config.js',
      'package.json'
    ]

    if ( api.jest ) {
      fileLists.push(path.resolve(__dirname, `./template/test/index.test.js.hbs`))
      filePath.push('test/index.test.js')
    } else {
      shelljs.rm('-rf', `${process.cwd()}/${api.appName}/test`)
    }

    if ( !api.eslint ) {
      shelljs.rm('-rf', `${process.cwd()}/${api.appName}/.eslintignore`)
      shelljs.rm('-rf', `${process.cwd()}/${api.appName}/.eslintrc.js`)
      shelljs.rm('-rf', `${process.cwd()}/${api.appName}/.prettierignore`)
      shelljs.rm('-rf', `${process.cwd()}/${api.appName}/.prettierrc.js`)
    }

    
    api.render({
      fileLists,
      filePath,
      api
    }).then(() => {
      resolve()
    }).catch((e) => resolve(false))
  })
}