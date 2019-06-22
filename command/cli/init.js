const ora = require('ora')

// tasks
const updateVersion = require('./update')
const appConfig = require('./app')
const create = require('./create')
const packageJson = require('./package')
const webpack = require('./webpack')

const spinner = ora('Please wait while downloading...')

const generateApplaction = ({ frameName }) => {
  const options = {}
  // vue or react pass by init
  options.frameName = frameName

  const session = async () => {
    await updateVersion(options)
    await appConfig(options)
    spinner.start()
    await create(options)
    await packageJson(options)
    await webpack(options)
    spinner.succeed()
  }

  session()
}

module.exports = generateApplaction