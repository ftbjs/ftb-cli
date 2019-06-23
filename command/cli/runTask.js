const ora = require('ora')

// tasks
const checkUpdate = require('./checkUpdate')
const appConfig = require('./appConfig')
const createProject = require('./createProject')
const packageJson = require('./packageJson')
const eslint = require('./eslint')
const prettier = require('./prettier')
const webpack = require('./webpack')

const spinner = ora('Please wait while downloading...')

const generateApplaction = ({ frameName }) => {
  const options = {}
  // vue or react pass by init
  options.frameName = frameName

  const session = async () => {
    await checkUpdate(options)
    await appConfig(options)
    spinner.start()
    await createProject(options)
    await eslint(options)
    await prettier(options)
    await packageJson(options)
    await webpack(options)
    spinner.succeed()
  }

  session()
}

module.exports = generateApplaction