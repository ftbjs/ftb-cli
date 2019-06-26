const ora = require('ora')

// tasks
const update = require('./update')
const app = require('./app')
const create = require('./create')
const packageJson = require('./package')
const eslint = require('./eslint')
const prettier = require('./prettier')
const webpackConfig = require('./webpack')

const spinner = ora('Please wait while initialize the application...')

const generateApplaction = ({ frameName }) => {
  const options = {}
  // vue or react pass by init
  options.frameName = frameName

  const session = async () => {
    // check remote new version
    await update(options)

    // get user config
    await app(options)

    // start
    spinner.start()

    // create project according user config
    await create(options)

    // create eslint according user config
    await eslint(options)

    // create prettier file according user config
    await prettier(options)

    // create package.json according user config
    await packageJson(options)

    // create webpack config according user config
    webpackConfig(options)
    spinner.succeed()
  }

  session()
}

module.exports = generateApplaction
