const ora = require('ora')
const chalk = require('chalk')

// tasks
const update = require('./update')
const app = require('./app')
const create = require('./create')
const packageJson = require('./package')
const jest = require('./jest')
const eslint = require('./eslint')
const webpackConfig = require('./webpack')
const help = require('./help')

const spinner = ora('Please wait while creating the application...')

const generateApplaction = ({ frameName }) => {
  const options = {}
  // vue or react pass by init
  options.frameName = frameName

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
    await update(options)

    // get user config
    await app(options)

    // start
    spinner.start()

    // create project according user config
    await create(options)

    // create unit test according user config
    options.jest && await jest(options)

    // create eslint and prettier according user config
    options.eslint && await eslint(options)

    // create package.json according user config
    await packageJson(options)

    // create webpack config according user config
    await webpackConfig(options)

    spinner.succeed()

    await help(options)

    spinner.stop()

    process.exit()
  }

  task()
}

module.exports = generateApplaction
