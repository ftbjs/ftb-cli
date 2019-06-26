const path = require('path')
const { renderTemplate } = require('./utils/index')

const jest = (options) => {
  const { appName } = options
  const fileLists = [
    'templates/jest/enzyme.setup.js.hbs',
    'templates/jest/jest.config.js.hbs',
    'templates/jest/jest.styleMock.js.hbs'
  ]
  
  return new Promise((resolve, reject) => {
    for (let i = 0; i < fileLists.length; i++) {
      const packageTpl = path.resolve(__dirname, `../${fileLists[i]}`)
      const createTpl = fileLists[i].replace(/^templates\/jest\//, '').replace(/\.hbs$/, '')
      renderTemplate(packageTpl, `${process.cwd()}/${appName}/${createTpl}`, options)
    }
    resolve()
  })
}

module.exports = jest