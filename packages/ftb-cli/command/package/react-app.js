const fs = require('fs-extra')
const chalk = require('chalk')
const inquirer = require('inquirer')
const shelljs = require('shelljs')
const { npmPackageNameRule, upperCamelCase } = require('../utils/helper')

const app = async (api) => {
  return new Promise((resolve, reject) => {
    inquirer
    .prompt([
      {
        name: 'appName',
        message: 'Please enter your project name',
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
        name: 'packageName',
        message: 'Please input your package name:',
        validate: name => {
          if (!npmPackageNameRule.test(name)) {
            return `Invalid package name.`
          }
          return true
        }
      },
      {
        type: 'list',
        name: 'css',
        message: 'Do you want to add CSS preprocessor in your code?',
        choices: [
          'Scss',
          'Less'
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
      api.appName = answer.appName.split(/\s/)[0]
      api.packageName = upperCamelCase(answer.packageName)
      api.jest = answer.jest === 'Yes'
      api.eslint = answer.eslint === 'Yes'
      api.scss = answer.css === 'Scss'
      api.less = answer.css === 'Less'
      resolve()
    })
  })
}

module.exports = app