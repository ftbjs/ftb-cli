const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')

module.exports = ({
  appName
}) => {
  inquirer
    .prompt([
      {
        name: 'appName',
        message: 'Please input the project name.',
        validate: (text) => {
          return true
        }
      },
      {
        type: 'list',
        name: 'cssType',
        message: 'Please select a css preprocessor',
        choices: [
          'scss',
          'less'
        ]
      },
      {
        type: 'list',
        name: 'NpmOrYarn',
        message: 'Please select a package management tool',
        choices: [
          'Npm',
          'Yarn'
        ]
      }
    ])
    .then(answer => {
      console.log(answer)
    })
}