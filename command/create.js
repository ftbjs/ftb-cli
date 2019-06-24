const fs = require('fs-extra')
const path = require('path')
const { downloadLatestRepo, compareVersion } = require('./utils')
const { ensureDir } = require('./utils/file')

const create = async (options) => {
  const { appName, frameName } = options
  const isUpdate = await compareVersion(options)
  const cacheBase = '../cache'
  const cacheTemplateDir = path.resolve(__dirname, `${cacheBase}/templates/${frameName}`)
  const currentTemplateDir = path.resolve(__dirname, `templates/${frameName}`)

  let downStatus
  if (!isUpdate) {
    downStatus = await downloadLatestRepo('github:ftb-family/ftb-cli#master', path.resolve(__dirname, cacheBase))
  }

  await ensureDir(appName)
  
  if (!downStatus) {
    fs.copySync(currentTemplateDir, `${process.cwd()}/${appName}`)
  } else {
    fs.copySync(cacheTemplateDir, `${process.cwd()}/${appName}`)
  }
}

module.exports = create
