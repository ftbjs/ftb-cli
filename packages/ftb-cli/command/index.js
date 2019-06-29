const ora = require('ora')
const chalk = require('chalk')

// ftb cli plugin
const renderPackageJson = require('ftb-cli-plugin-package')
const renderJest = require('ftb-cli-plugin-jest')

// tasks
const update = require('./update')
const app = require('./app')
const create = require('./create')
const eslint = require('./eslint')
const webpackConfig = require('./webpack')
const help = require('./help')

// combine to api
const { render, copy } = require('./utils/GeneratorAPI')

const spinner = ora('Please wait while creating the application...')

const generateApplaction = ({ frameName }) => {
  const api = {}
  api.render = render
  api.copy = copy
  // vue or react pass by init
  api.frameName = frameName

  if (!['vue', 'react'].includes(frameName)) { 
    console.log(chalk.yellow('Only support create vue and react project.'))
    return
  }

  if (frameName === 'vue') {
    console.log(chalk.yellow('Only support react project now, Please wait later.'))
    console.log(`You can create react project now: ${chalk.greenBright('ftb init react')}`)
    return
  }

  const task = async () => {
    // check remote new version
    await update(api)

    // get user config
    await app(api)

    // start
    spinner.start()

    // create project according user config
    await create(api)

    // create unit test according user config
    api.jest && await renderJest(api)

    // create eslint and prettier according user config
    api.eslint && await eslint(api)

    // create package.json according user config
    await renderPackageJson(api)

    // create webpack config according user config
    await webpackConfig(api)

    spinner.succeed()

    await help(api)

    spinner.stop()

    process.exit()
  }

  task()
}

module.exports = generateApplaction
