const path = require('path')
const fs = require('fs-extra')
const shelljs = require('shelljs')
const resolveApp = (src) => path.resolve(__dirname, src)

class CreateTask {
  constructor(api) {
    this.api = api
  }

  copySource() {
    return new Promise((resolve, reject) => {
      const { frameName } = this.api
      const rootTemplatePath = resolveApp(`./${frameName}-package`)
      fs.copy(rootTemplatePath, `${process.cwd()}/${this.api.appName}`, (err) => {
        if (err) {
          reject(`copy ${frameName} package error, please try again`)
        }
        resolve(true)
      })
    })
  }

  createReact() {
    const { api } = this
    return new Promise(async (resolve, reject) => {
      await this.copySource()

      const fileLists = [
        resolveApp('./template/build/utils.js.hbs'),
        resolveApp('./template/build/webpack.base.config.js.hbs'),
        resolveApp('./template/build/webpack.dev.config.js.hbs'),
        resolveApp('./template/build/webpack.prod.config.js.hbs'),
        resolveApp('./template/package.json.hbs')
      ]
      const filePath = [
        'build/utils.js',
        'build/webpack.base.config.js',
        'build/webpack.dev.config.js',
        'build/webpack.prod.config.js',
        'package.json'
      ]
  
      if ( !api.jest ) {
        shelljs.rm('-rf', `${process.cwd()}/${api.appName}/src/components/__test__`)
        shelljs.rm('-rf', `${process.cwd()}/${api.appName}/enzyme.setup.js`)
        shelljs.rm('-rf', `${process.cwd()}/${api.appName}/jest.config.js`)
        shelljs.rm('-rf', `${process.cwd()}/${api.appName}/jest.styleMock.js`)
      }
  
      if ( !api.eslint ) {
        shelljs.rm('-rf', `${process.cwd()}/${api.appName}/.eslintignore.js`)
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
}

module.exports = CreateTask