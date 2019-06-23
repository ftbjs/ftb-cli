const fs = require('fs-extra')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { spawn } = require('child_process')

module.exports = (options) => {
  return new Promise((resolve, reject) => {
    inquirer
    .prompt([
      {
        name: 'appName',
        message: 'Please input the project name:',
        validate: (appname) => {
          appname = appname.split(/\s/)
          const getAppName = appname[0]
          const getForceCreate = appname[1]
          if (fs.existsSync(`./${getAppName}`)) {
            if (getForceCreate && getForceCreate == '-f') {
              spawn(`rm -rf ./${getAppName}`, [], { cwd: `./`, shell: true })
              return true
            } else {
              return `当前文件夹下含有您要创建 ${getAppName} 的应用名称文件,是否强制删除文件 继续初始化? 请输入 ${chalk.green(getAppName + ' -f')}`
            }
          } else {
            return true
          }
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
        name: 'eslint',
        message: 'Do you want to add eslint to format your code?',
        choices: [
          'Yes',
          'No'
        ]
      },
      {
        type: 'list',
        name: 'prettier',
        message: 'Do you want to add prettier to beautify your code?',
        choices: [
          'Yes',
          'No'
        ]
      },
      {
        type: 'list',
        name: 'NpmOrYarn',
        message: 'Please select a package management tool',
        choices: [
          'NPM',
          'YARN'
        ]
      }
    ])
    .then(answer => {
      options.appName = answer.appName
      options.cssType = answer.cssType
      options.eslint = answer.eslint
      options.prettir = answer.prettir
      options.NpmOrYarn = answer.NpmOrYarn
      resolve()
    })
  })
}