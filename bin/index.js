#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const log = require('../utils/log')

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
    require('../command/run')({ frameName: name })
  })

program
  .command('*')
  .description('A wrong operation. Please see above all command.')
  .action((name, others) => {
    log('greenBright', 'I guess you lost your goal, no warrries, try again')
  })

program.parse(process.argv)
