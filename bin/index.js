#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

program
  .version(require('../package').version, '-v, --version')
  .usage(`${chalk.green('<command>')} [options]`)

program
  .command('init [name]')
  .alias('i')
  .description('Support create a react or vue project')
  .action((name, other) => {
    require('../command/index.js')({ frameName: name })
  })

program
  .command('*')
  .description('A wrong operation, Please see above all command.')
  .action((name, others) => {
    console.log(chalk.greenBright('I guess you lost your goal, no warrries, try again'))
  })

program.parse(process.argv)

