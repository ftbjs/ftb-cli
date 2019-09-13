const chalk = require('chalk')

module.exports = async (api) => {
  const { jest, eslint, update } = api
  const outPutCliLog = {
    succ1: chalk`🎉 Successfully created project ${api.appName}.`,
    succ2: chalk`👉 Get started with the following commands: \n`,
    install: chalk`🛠  {cyanBright npm install} to install dependencies! \n`,
    dev: chalk`🚀 {cyanBright npm run dev} to start local server!`,
    build: chalk`🚀 {cyanBright npm run build} to build project! \n`,
    test: chalk`🤹 {cyanBright npm run test} to test your code! \n`,
    eslint: chalk`🍭 {cyanBright npm run fix} to format your code!`,
    prettier: chalk`🍭 {cyanBright npm run prettier} to prettier your code!`
  }

  if (!jest) {
    delete outPutCliLog.test
  }
  if (!eslint) {
    delete outPutCliLog.eslint
    delete outPutCliLog.prettier
  }

  Object.keys(outPutCliLog).forEach(item => {
    console.log(`${outPutCliLog[item]}`)
  })

  if (!update) return
  console.log(`
    ${chalk.yellow('---------------------------------------------------------')}
    Found new version: ${chalk.green(`${api.remoteVersion}`)}, current version: ${chalk.yellow(api.version)}
    Please run ${chalk.green('npm install ftb-cli -g')} to update your local version.
    ${chalk.yellow('---------------------------------------------------------')}
    `
  )
}