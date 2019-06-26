const fs = require('fs-extra')
const chalk = require('chalk')
const inquirer = require('inquirer')
const shelljs = require('shelljs')

const app = (options) => {
  return new Promise((resolve, reject) => {
    inquirer
    .prompt([
      {
        name: 'appName',
        message: 'Please input the application name:',
        validate: (appname) => {
          appname = appname.split(/\s/)
          const getAppName = appname[0]
          const getForceCreate = appname[1]
          if (fs.existsSync(`./${getAppName}`)) {
            if (getForceCreate && getForceCreate == '-f') {
              shelljs.rm('-rf', `./${getAppName}`)
              return true
            } else {
              return `Directory is exists, if you want to delete it, you can input: ${chalk.green(getAppName + ' -f')}`
            }
          } else {
            return true
          }
        }
      },
      {
        type: 'list',
        name: 'cssType',
        message: 'Please select a css preprocessor:',
        choices: [
          'scss',
          'less'
        ]
      },
      {
        type: 'list',
        name: 'jest',
        message: 'Do you want to add jest to test your code?',
        choices: [
          'Yes',
          'No'
        ]
      },
      {
        type: 'list',
        name: 'eslint',
        message: 'Do you want to add eslint and prettier to format your code?',
        choices: [
          'Yes',
          'No'
        ]
      }
    ])
    .then(answer => {
      // ignore space
      options.appName = answer.appName.split(/\s/)[0]
      options.scss = answer.cssType === 'scss'
      options.less = answer.cssType === 'less'
      options.jest = answer.jest === 'Yes'
      options.eslint = answer.eslint === 'Yes'
      resolve()
    })
  })
}

module.exports = app