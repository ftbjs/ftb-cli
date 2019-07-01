const ora = require('ora')
const chalk = require('chalk')

// ftb cli plugin
const renderPackageJson = require('ftb-cli-plugin-package')
const renderJest = require('ftb-cli-plugin-jest')
const renderEslint = require('ftb-cli-plugin-eslint')
const renderWebpack = require('ftb-cli-plugin-build')

// tasks
const update = require('./update')
const app = require('./app')
const create = require('./create')
const help = require('./help')
const rewriteCss = require('./rewriteCss')

// combine to api
const { render, copy } = require('./utils/GeneratorAPI')
const ftbCliVersion = require('../package.json').version

const spinner = ora('Please wait while creating the application...')

const generateApplaction = ({ frameName }) => {
  const api = {}
  api.render = render
  api.copy = copy
  api.version = ftbCliVersion
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

    // TODO: refactor > use ftb-cli-plugin-template
    // create project according user config
    await create(api)

    // TODO: refactor
    // rename source scss file when select less
    api.less && await rewriteCss(api)

    // create unit test according user config
    api.jest && await renderJest(api)

    // create eslint and prettier according user config
    api.eslint && await renderEslint(api)

    // create package.json according user config
    await renderPackageJson(api)

    // create webpack config according user config
    await renderWebpack(api)

    spinner.succeed()

    await help(api)

    spinner.stop()

    process.exit()
  }

  task()
}

module.exports = generateApplaction
