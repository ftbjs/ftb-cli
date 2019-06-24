const ora = require('ora')

// tasks
const update = require('./update')
const app = require('./app')
const create = require('./create')
const package = require('./package')
const eslint = require('./eslint')
const prettier = require('./prettier')
const webpack = require('./webpack')

const spinner = ora('Please wait while downloading...')

const generateApplaction = ({ frameName }) => {
  const options = {}
  // vue or react pass by init
  options.frameName = frameName

  const session = async () => {
    await update(options)
    await app(options)
    spinner.start()
    await create(options)
    await eslint(options)
    await prettier(options)
    await package(options)
    await webpack(options)
    spinner.succeed()
  }

  session()
}

module.exports = generateApplaction
