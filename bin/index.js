#! /usr/bin/env node

const path = require('path')
const program = require('commander')
const serve = require('../command/serve')
const build = require('../command/build')
const fileExist = require('../utils/fileExist')
const log = require('../utils/log')

const matchEntryFile = /.*\.js$/

program
  .version('0.0.1', '-v, --version')
  .option('-init, --debug', 'Support create a react or vue project')
  .option('-dev, --debug', 'Support as command run a project')
  .option('-build, --debug', 'Support as command build a project')

program
  .command('init [name]')
  .action((name, other) => {
    switch(name) {
      case 'react':
        log('green', 'Please wait a moment, will support create react project in the feature')
        break
      case 'vue':
        log('green', 'Please wait a moment, will support create vue project in the feature')
        break
      default:
        log('yellow', 'Currently, init command only support create vue and react project')
    }
  })

program
  .command('dev [path] [Start a server use path, defalut: src/index.js]')
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
  .action((path, others) => {
    log('greenBright', 'Please wait a moment, let me try to finish this feature')
    // build(commandArg)
  })

program
  .command('*')
  .action((name, others) => {
    log('greenBright', 'I guess you lost your goal, no warrries, try again')
  })

program.parse(process.argv)