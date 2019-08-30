const ora = require('ora')
const renderReactPackage = require('ftb-react-package')

// tasks
const update = require('../utils/update')
const appInquire = require('./react-app')
// const cacheFtbSource = require('../utils/cacheFtbSource')

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
  api.frameName = frameName

  const task = async () => {
    spinnerFeatchUpdate.start()

    // check remote new version
    await update(api)

    // TODO add cache strategy
    // await cacheFtbSource(api)

    spinnerFeatchUpdate.stop()

    // get user config
    await appInquire(api)

    // start
    spinner.start()

    // create project according user config
    await renderReactPackage(api)

    spinner.stop()

    spinnerFeatchDone.start()
    spinnerFeatchDone.succeed()
    
    process.exit()
  }

  task()
}

module.exports = generateApplaction
