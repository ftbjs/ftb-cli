const ora = require('ora')
const chalk = require('chalk')
const renderJsPackage = require('ftb-js-package')

// tasks
const update = require('../utils/update')

// combine to api
const { render, copy, download } = require('../utils/generatorAPI')
const ftbCliVersion = require('../../package.json').version

const spinner = ora('Please wait while init the application...')
const spinnerFeatchUpdate = ora('Checking remote version...')
const spinnerFeatchDone = ora('Created success!!!')

const generateApplaction = ({ frameName }) => {
  const api = {}
  api.render = render
  api.copy = copy
  api.version = ftbCliVersion
  api.download = download

  const task = async () => {
    spinnerFeatchUpdate.start()
    // check remote new version
    await update(api)

    spinnerFeatchUpdate.stop()

    // get user config
    await require(`./js-app`)(api)

    // start
    spinner.start()

    // create project according user config
    await renderJsPackage(api)

    spinner.stop()

    spinnerFeatchDone.start()
    spinnerFeatchDone.succeed()
    
    process.exit()
  }

  task()
}

module.exports = generateApplaction
