const fs = require('fs-extra')
const { writeTemplateToProject, resolveApp } = require('./utils/index')

const jest = (api) => {
  const { appName } = api
  const jestTestFolder = resolveApp('../../templates/jest/__test__')

  const fileLists = [
    'templates/jest/enzyme.setup.js.hbs',
    'templates/jest/jest.config.js.hbs',
    'templates/jest/jest.styleMock.js.hbs'
  ]

  return new Promise((resolve, reject) => {
    writeTemplateToProject({
      renderRule: '^templates\/jest\/',
      fileLists,
      api
    }).then(() => {
      // copy test folder to src
      fs.copySync(jestTestFolder, `${process.cwd()}/${appName}/src/__test__`)
      resolve()
    }).catch((e) => {
      reject(e)
    })
  })
}

module.exports = jest