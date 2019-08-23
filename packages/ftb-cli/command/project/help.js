const chalk = require('chalk')

module.exports = async (api) => {
  const { jest, eslint } = api
  const outPutCliLog = {
    install: chalk`Run {green npm install} to install dependencies!`,
    dev: chalk`Run {green npm run dev} to start local server!`,
    build: chalk`Run {green npm run build} to build project!`,
    test: chalk`Run {green npm run test} to test your code!`,
    eslint: chalk`Run {green npm run fix} to format your code!`,
    prettier: chalk`Run {green npm run prettier} to prettier your code!`
  }
  console.log(`
      Run ${chalk.green(`cd ${api.appName}`)}

      ${outPutCliLog.install}

      ${outPutCliLog.dev}

      ${outPutCliLog.build}
    `
  )
  if (jest) {
    console.log(`      ${outPutCliLog.test}`)
  }
  if (eslint) {
    console.log(`
      ${outPutCliLog.eslint}

      ${outPutCliLog.prettier}
    `)
  }
  if (!api.update) {return}
  console.log(`
      ${chalk.yellow('---------------------------------------------------------')}

      Found new version: ${chalk.green(`${api.remoteVersion}`)}

      Please run ${chalk.green('npm install ftb-cli -g')} to update your local version.

      ${chalk.yellow('---------------------------------------------------------')}
    `
  )
}