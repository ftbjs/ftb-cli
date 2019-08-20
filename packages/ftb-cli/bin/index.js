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
    require('../command/project/index.js')({ frameName: name })
  })

program
  .command('add [name]')
  .description('Support create project publish to npm')
  .action((name, other) => {
    console.log(chalk.red('Only support create react project now'))
    console.log(chalk.red('Will support create npm packge later.'))
    console.log(chalk.greenBright('You can join us: https://github.com/ftb-family/ftb-cli'))
  })

program
  .command('*')
  .description('A wrong operation, Please see above all command.')
  .action((name, other) => {
    console.log(chalk.greenBright('I guess you lost your goal, no warrries, try again'))
  })

program.parse(process.argv)

