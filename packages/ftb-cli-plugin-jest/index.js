const path = require('path')

module.exports = (api) => {
  return new Promise((resolve, reject) => {
    const fileLists = [
      path.resolve(__dirname, `./template/${api.frameName}/enzyme.setup.js.hbs`),
      path.resolve(__dirname, `./template/${api.frameName}/jest.config.js.hbs`),
      path.resolve(__dirname, `./template/${api.frameName}/jest.styleMock.js.hbs`)
    ]
    const filePath = [
      'enzyme.setup.js',
      'jest.config.js',
      'jest.styleMock.js'
    ]
    const jestTestFolder = path.resolve(__dirname, `./template/${api.frameName}/__test__`)

    api.render({
      fileLists,
      filePath,
      api
    }).then(() => {
      api.copy({
        source: jestTestFolder,
        target: 'src/__test__',
        api
      })
      resolve()
    })
  })
}