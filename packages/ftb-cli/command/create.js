const fs = require('fs-extra')
const { downloadLatestRepo, compareVersion, resolveApp } = require('./utils')
const ensureDirAsync = require('./utils/ensureDirAsync')

const create = async (options) => {
  const { appName, frameName } = options
  const isUpdate = await compareVersion(options)
  const cacheBase = '../../cache'
  const cacheTemplateDir = resolveApp(`${cacheBase}/templates/${frameName}`)
  const currentTemplateDir = resolveApp(`../../templates/${frameName}`)

  let downStatus
  if (!isUpdate) {
    downStatus = await downloadLatestRepo('github:ftb-family/ftb-cli#master', resolveApp(cacheBase))
  }

  await ensureDirAsync(appName)
  
  if (!downStatus) {
    fs.copySync(currentTemplateDir, `${process.cwd()}/${appName}`)
  } else {
    fs.copySync(cacheTemplateDir, `${process.cwd()}/${appName}`)
  }
}

module.exports = create
