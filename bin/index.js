#! /usr/bin/env node

const path = require('path')
const program = require('commander')
const chalk = require('chalk')
const serve = require('../command/scripts/serve')
const build = require('../command/scripts/build')
const fileExist = require('../utils/fileExist')
const log = require('../utils/log')

const matchEntryFile = /.*\.js$/

program
  .version(require('../package').version, '-v, --version')
  .usage(`${chalk.green('<command>')} [options]`)

program
  .command('init [name]')
  .description('Support create a react or vue project')
  .action((name, other) => {
    if (!['vue', 'react'].includes(name)) {
      log('yellow', 'Please input a framework name you want to create');
      return
    }
    require('../command/cli/init')({ frameName: name })
  })

program
  .command('dev [path] [Start a server use path, defalut: src/index.js]')
  .description('Support as command run a project')
  .action((path, other) => {
    const entry = path ? path : 'src/index.js'    

    if (!matchEntryFile.test(entry)) {
      log('yellowBright', 'Please input a valid entry file as webpack entry!')
      return
    }

    if (!fileExist(entry)) {
      log('yellowBright', process.cwd() + entry + ' is not exists')
      return
    }

    const commandArg = {
      entry: path.resolve(`${process.cwd()}`, entry),
      output: path.resolve(`${process.cwd()}`, 'dist'),
      publicPath: '/',
      frame: 'react'
    }

    serve(commandArg)
  })

program
  .command('build [path] [Start a build use path, defalut: src/index.js]')
  .description('Support as command build a project')
  .action((path, others) => {
    log('greenBright', 'Please wait a moment, let me try to finish this feature')
    // build(commandArg)
  })

program
  .command('*')
  .description('A wrong operation. Please see above all command.')
  .action((name, others) => {
    log('greenBright', 'I guess you lost your goal, no warrries, try again')
  })

program.parse(process.argv)