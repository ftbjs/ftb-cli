const fs = require('fs-extra')

const create = (api) => {
  return new Promise((resolve, reject) => {
    const appJS = `${process.cwd()}/${api.appName}/src/index.js`
    const appCss = `${process.cwd()}/${api.appName}/src/index.scss`
    const appLessCssPath = `${process.cwd()}/${api.appName}/src/index.less`

    const fileJs = fs.readFileSync(appJS).toString()
    const fileCss = fs.readFileSync(appCss).toString()

    fs.writeFileSync(appJS, fileJs.replace(/\.scss/, '.less'))
    fs.writeFileSync(appLessCssPath, fileCss)
    fs.remove(appCss).then(() => {
      resolve()
    })
  })
}

module.exports = create
