#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const { packageCommand } = require('../command/utils/helper')

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
    if (!packageCommand.includes(name)) {
      console.log(chalk.yellow(`Only support create one of [${packageCommand.join(', ')}] project.`))
      return
    }
    
    if (name === 'vue' || name === 'react') {
      console.log(chalk.yellow(`Only support create js package, vue and react will be later`))
      return
    }

    require(`../command/package/${name}-index`)()
  })

program
  .command('*')
  .description('A wrong operation, Please see above all command.')
  .action((name, other) => {
    console.log(chalk.greenBright('I guess you lost your goal, no warrries, try again'))
  })

program.parse(process.argv)

